import { NextResponse } from "next/server";
import {
  getOnlineMeetingByJoinUrl,
  getMeetingTranscripts,
  getTranscriptContent,
} from "@/lib/ms-graph";
import Anthropic from "@anthropic-ai/sdk";

const CRON_SECRET = process.env.CRON_SECRET;
const DANIEL_EMAIL = "daniellopes@beyondfocus.pt";

interface CallRow {
  id: string;
  event_subject: string;
  attendee_email: string;
  attendee_name: string;
  call_datetime: string;
  meeting_url: string | null;
  lead_id: string | null;
}

interface LeadRow {
  name: string;
  email: string;
  company?: string;
  sector?: string;
}

async function getPendingCalls(): Promise<CallRow[]> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return [];

  // Calls que já aconteceram (há pelo menos 90 min) e ainda não foram processadas
  const cutoff = new Date(Date.now() - 90 * 60 * 1000).toISOString();

  const res = await fetch(
    `${supabaseUrl}/rest/v1/calls` +
      `?transcript_processed=eq.false` +
      `&call_datetime=lt.${encodeURIComponent(cutoff)}` +
      `&status=neq.declined` +
      `&select=id,event_subject,attendee_email,attendee_name,call_datetime,meeting_url,lead_id` +
      `&limit=10`,
    { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
  );
  if (!res.ok) return [];
  return await res.json();
}

async function getLeadById(leadId: string): Promise<LeadRow | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return null;

  const res = await fetch(
    `${supabaseUrl}/rest/v1/website_leads?id=eq.${encodeURIComponent(leadId)}&select=name,email,company,sector&limit=1`,
    { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
  );
  if (!res.ok) return null;
  const rows = await res.json();
  return rows[0] || null;
}

async function markCallProcessed(callId: string, data: {
  transcript_text?: string;
  transcript_summary?: string;
  next_steps?: string;
  deal_probability?: string;
  draft_email_subject?: string;
  draft_email_html?: string;
}): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return;

  await fetch(`${supabaseUrl}/rest/v1/calls?id=eq.${encodeURIComponent(callId)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({
      ...data,
      transcript_processed: true,
      draft_notified_at: new Date().toISOString(),
    }),
  }).catch(() => {});
}

async function updateCRMContact(lead: LeadRow, summary: string, nextSteps: string): Promise<void> {
  const crmUrl = process.env.BEYOND_PRICING_URL;
  const crmKey = process.env.BEYOND_PRICING_WEBHOOK_KEY;
  if (!crmUrl || !crmKey) return;

  // Registar nota de call no CRM via webhook
  await fetch(`${crmUrl}/api/webhooks/lead-capture`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": crmKey },
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      company: lead.company,
      source: "post_call_review",
      message: `Resumo call: ${summary}\n\nPróximos passos: ${nextSteps}`,
    }),
  }).catch(() => {});
}

interface AnalysisResult {
  summary: string;
  nextSteps: string;
  dealProbability: "HOT" | "WARM" | "COLD";
  draftSubject: string;
  draftHtml: string;
}

async function analyzeTranscriptWithClaude(
  transcript: string,
  attendeeName: string,
  attendeeEmail: string,
  eventSubject: string,
  lead: LeadRow | null
): Promise<AnalysisResult | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const client = new Anthropic({ apiKey });
  const firstName = (lead?.name || attendeeName).split(" ")[0];
  const company = lead?.company || "";

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: `Analisa esta transcrição de reunião de vendas e prepara um briefing e rascunho de email de follow-up.

REUNIÃO: ${eventSubject}
CLIENTE: ${lead?.name || attendeeName}${company ? ` · ${company}` : ""}
EMAIL: ${attendeeEmail}

TRANSCRIÇÃO:
${transcript.slice(0, 8000)}

RESPONDE NESTE FORMATO EXATO (cada secção separada por ---):
RESUMO: [3-5 bullet points do que foi discutido, em PT-PT]
---
PRÓXIMOS_PASSOS: [bullet points de ações concretas acordadas]
---
PROBABILIDADE: [HOT/WARM/COLD — com 1 frase de justificação]
---
ASSUNTO_EMAIL: [assunto do email de follow-up para o cliente]
---
EMAIL_HTML: [corpo do email em HTML simples com <p> e <strong>. Tom: profissional, directo, sem exageros. Assina como Daniel Lopes, Beyond Focus. Menciona o que foi discutido e os próximos passos acordados. Máx 4 parágrafos.]`,
      },
    ],
  });

  const raw = response.content[0].type === "text" ? response.content[0].text : "";
  const sections = raw.split("---").map((s) => s.trim());

  const get = (label: string) => {
    const section = sections.find((s) => s.startsWith(label));
    return section ? section.replace(label, "").trim() : "";
  };

  const probLine = get("PROBABILIDADE:");
  const dealProbability = probLine.startsWith("HOT") ? "HOT" : probLine.startsWith("WARM") ? "WARM" : "COLD";

  return {
    summary: get("RESUMO:"),
    nextSteps: get("PRÓXIMOS_PASSOS:"),
    dealProbability,
    draftSubject: get("ASSUNTO_EMAIL:"),
    draftHtml: get("EMAIL_HTML:"),
  };
}

async function notifyDaniel(
  call: CallRow,
  analysis: AnalysisResult,
  lead: LeadRow | null,
  transcriptAvailable: boolean
): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;

  const { Resend } = await import("resend");
  const resend = new Resend(resendKey);

  const scoreEmoji = analysis.dealProbability === "HOT" ? "🔥" : analysis.dealProbability === "WARM" ? "🌡️" : "❄️";
  const name = lead?.name || call.attendee_name;
  const company = lead?.company || "";

  const subject = `${scoreEmoji} Post-call — ${name}${company ? ` · ${company}` : ""} · ${new Date(call.call_datetime).toLocaleDateString("pt-PT")}`;

  const html = `
<h2 style="margin-bottom:4px">${scoreEmoji} Briefing Pós-Call — ALFRED</h2>
<p style="color:#888;margin-top:0">${new Date(call.call_datetime).toLocaleString("pt-PT")}</p>

<table style="border-collapse:collapse;width:100%;font-size:14px;margin-bottom:24px">
  <tr><td style="padding:6px 0;color:#888;width:130px">Cliente</td><td><strong>${name}</strong></td></tr>
  ${company ? `<tr><td style="padding:6px 0;color:#888">Empresa</td><td>${company}</td></tr>` : ""}
  <tr><td style="padding:6px 0;color:#888">Email</td><td><a href="mailto:${call.attendee_email}">${call.attendee_email}</a></td></tr>
  <tr><td style="padding:6px 0;color:#888">Reunião</td><td>${call.event_subject}</td></tr>
  <tr><td style="padding:6px 0;color:#888">Deal</td><td>${scoreEmoji} ${analysis.dealProbability}</td></tr>
</table>

<hr style="margin:16px 0;border:none;border-top:1px solid #eee">
<h3 style="font-size:14px;margin-bottom:8px">Resumo da reunião</h3>
<div style="background:#f9f9f9;padding:12px;border-left:3px solid #000;font-size:14px;white-space:pre-wrap">${analysis.summary}</div>

<hr style="margin:16px 0;border:none;border-top:1px solid #eee">
<h3 style="font-size:14px;margin-bottom:8px">Próximos passos acordados</h3>
<div style="background:#f9f9f9;padding:12px;border-left:3px solid #FA8334;font-size:14px;white-space:pre-wrap">${analysis.nextSteps}</div>

<hr style="margin:16px 0;border:none;border-top:1px solid #eee">
<h3 style="font-size:14px;margin-bottom:8px">📧 Rascunho de follow-up para o cliente</h3>
<p style="font-size:12px;color:#888">Assunto: <strong>${analysis.draftSubject}</strong></p>
<div style="background:#fff;border:1px solid #ddd;padding:16px;font-size:14px">${analysis.draftHtml}</div>

${!transcriptAvailable ? `<p style="font-size:12px;color:#aaa;margin-top:24px">⚠️ Transcrição não disponível — análise baseada em dados da reunião. Envia a transcrição para alfred@beyondfocus.pt para análise completa.</p>` : ""}

<hr style="margin:16px 0;border:none;border-top:1px solid #eee">
<p style="font-size:12px;color:#aaa">Gerado automaticamente pelo ALFRED · Beyond Focus</p>
  `.trim();

  await resend.emails.send({
    from: "ALFRED — Beyond Focus <website@beyondfocus.pt>",
    to: [DANIEL_EMAIL],
    subject,
    html,
  });
}

export async function GET(request: Request) {
  if (CRON_SECRET) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const calls = await getPendingCalls();
  if (calls.length === 0) {
    return NextResponse.json({ message: "No calls to review", processed: 0 });
  }

  let processed = 0;
  const results = [];

  for (const call of calls) {
    const lead = call.lead_id ? await getLeadById(call.lead_id) : null;

    let transcriptText: string | null = null;
    let transcriptAvailable = false;

    // Tentar buscar transcrição via MS Graph (requer OnlineMeetingTranscript.Read.All)
    if (call.meeting_url) {
      try {
        const meeting = await getOnlineMeetingByJoinUrl(call.meeting_url);
        if (meeting) {
          const transcripts = await getMeetingTranscripts(meeting.id);
          if (transcripts.length > 0) {
            // Pegar a transcrição mais recente
            const latest = transcripts[transcripts.length - 1];
            transcriptText = await getTranscriptContent(meeting.id, latest.id);
            transcriptAvailable = !!transcriptText;
          }
        }
      } catch {
        // Transcrição não disponível ainda ou sem permissão — continuar sem ela
      }
    }

    // Analisar com Claude (com ou sem transcrição)
    const contextForAnalysis = transcriptText ||
      `Reunião: ${call.event_subject}\nCliente: ${lead?.name || call.attendee_name}\nEmpresa: ${lead?.company || "N/D"}\n[Transcrição não disponível]`;

    const analysis = await analyzeTranscriptWithClaude(
      contextForAnalysis,
      call.attendee_name,
      call.attendee_email,
      call.event_subject,
      lead
    );

    if (!analysis) {
      results.push({ call_id: call.id, status: "claude_error" });
      continue;
    }

    // Guardar tudo na BD
    await markCallProcessed(call.id, {
      transcript_text: transcriptText || undefined,
      transcript_summary: analysis.summary,
      next_steps: analysis.nextSteps,
      deal_probability: analysis.dealProbability,
      draft_email_subject: analysis.draftSubject,
      draft_email_html: analysis.draftHtml,
    });

    // Actualizar CRM
    if (lead) await updateCRMContact(lead, analysis.summary, analysis.nextSteps);

    // Notificar Daniel com briefing + rascunho
    await notifyDaniel(call, analysis, lead, transcriptAvailable);

    processed++;
    results.push({
      call_id: call.id,
      attendee: call.attendee_email,
      transcript: transcriptAvailable ? "fetched" : "not_available",
      deal: analysis.dealProbability,
    });
  }

  return NextResponse.json({ processed, total: calls.length, results });
}
