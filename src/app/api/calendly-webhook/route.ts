import { NextResponse } from "next/server";
import { createHmac } from "crypto";
import { generateLeadConfirmationEmail, generateDanielBriefingEmail } from "@/lib/email-templates/call-confirmation";

// Calendly envia os eventos via webhook com esta estrutura
interface CalendlyWebhookPayload {
  event: string; // "invitee.created" | "invitee.canceled"
  payload: {
    name: string;
    email: string;
    scheduled_event: {
      start_time: string; // ISO
      location?: {
        join_url?: string;
        type?: string;
      };
    };
    questions_and_answers?: Array<{
      question: string;
      answer: string;
    }>;
    cancel_url?: string;
    reschedule_url?: string;
  };
}

interface LeadRow {
  id: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
  services?: string[];
  sector?: string;
  nurture_step?: number;
  budget?: string;
}

function formatDatePT(isoString: string): string {
  const date = new Date(isoString);
  const months = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} de ${month} às ${hours}h${minutes}`;
}

function scoreLead(lead: LeadRow): string {
  let score = 0;
  const budget = lead.budget || "";
  if (budget.includes("10000") || budget.includes("15000") || budget.includes("+")) score += 40;
  else if (budget.includes("5000") || budget.includes("7500")) score += 25;
  else if (budget.includes("2500")) score += 10;
  if (lead.company) score += 10;
  if ((lead.services?.length ?? 0) >= 2) score += 15;
  if (score >= 60) return "HOT";
  if (score >= 30) return "WARM";
  return "COLD";
}

async function findLeadByEmail(email: string): Promise<LeadRow | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return null;

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/website_leads?email=eq.${encodeURIComponent(email)}&select=id,name,email,company,message,services,sector,nurture_step,budget&order=created_at.desc&limit=1`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
    );
    if (!res.ok) return null;
    const rows = await res.json();
    return rows[0] || null;
  } catch {
    return null;
  }
}

async function pauseNurture(leadId: string): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return;

  await fetch(`${supabaseUrl}/rest/v1/website_leads?id=eq.${encodeURIComponent(leadId)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({ nurture_paused: true }),
  }).catch(() => {});
}

function verifyCalendlySignature(body: string, signature: string, secret: string): boolean {
  const hmac = createHmac("sha256", secret);
  hmac.update(body);
  const expected = hmac.digest("hex");
  return signature === expected;
}

export async function POST(request: Request) {
  const rawBody = await request.text();

  // Verificar assinatura Calendly (opcional mas recomendado)
  const signingKey = process.env.CALENDLY_SIGNING_KEY;
  if (signingKey) {
    const signature = request.headers.get("calendly-webhook-signature") || "";
    // Formato: "t=timestamp,v1=hash"
    const v1Match = signature.match(/v1=([a-f0-9]+)/);
    const tMatch = signature.match(/t=(\d+)/);
    if (v1Match && tMatch) {
      const toVerify = `${tMatch[1]}.${rawBody}`;
      if (!verifyCalendlySignature(toVerify, v1Match[1], signingKey)) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }
  }

  let payload: CalendlyWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Só processar agendamentos novos
  if (payload.event !== "invitee.created") {
    return NextResponse.json({ skipped: true, event: payload.event });
  }

  const { name, email, scheduled_event, questions_and_answers } = payload.payload;
  const callDatetime = scheduled_event.start_time;
  const callDateFormatted = formatDatePT(callDatetime);
  const meetingUrl = scheduled_event.location?.join_url;

  // Enriquecer com dados do Supabase
  const lead = await findLeadByEmail(email);

  // Extrair contexto adicional das perguntas do Calendly (se existirem)
  const calendlyNotes = questions_and_answers
    ?.map((qa) => `${qa.question}: ${qa.answer}`)
    .join("\n");

  const enrichedMessage = lead?.message
    ? lead.message + (calendlyNotes ? `\n\nNotas Calendly:\n${calendlyNotes}` : "")
    : calendlyNotes || undefined;

  const leadScore = lead ? scoreLead(lead) : undefined;

  const emailParams = {
    name: lead?.name || name,
    email,
    company: lead?.company,
    message: enrichedMessage,
    services: lead?.services,
    sector: lead?.sector,
    callDatetime,
    callDateFormatted,
    meetingUrl,
    leadScore,
    nurtureEmails: lead?.nurture_step,
  };

  // Pausar nurture automaticamente — lead agendou, não mandar mais emails de nurture
  if (lead?.id) {
    await pauseNurture(lead.id);
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ error: "Resend not configured" }, { status: 500 });
  }

  const { Resend } = await import("resend");
  const resend = new Resend(resendKey);

  // Gerar ambos os emails em paralelo
  const [leadEmail, danielEmail] = await Promise.all([
    generateLeadConfirmationEmail(emailParams),
    generateDanielBriefingEmail(emailParams),
  ]);

  // Enviar em paralelo
  const [leadResult, danielResult] = await Promise.allSettled([
    resend.emails.send({
      from: "Daniel Lopes — Beyond Focus <website@beyondfocus.pt>",
      to: [email],
      subject: leadEmail.subject,
      html: leadEmail.html,
    }),
    resend.emails.send({
      from: "ALFRED — Beyond Focus <website@beyondfocus.pt>",
      to: ["daniellopes@beyondfocus.pt"],
      subject: danielEmail.subject,
      html: danielEmail.html,
    }),
  ]);

  return NextResponse.json({
    success: true,
    call: callDateFormatted,
    lead_found: !!lead,
    nurture_paused: !!lead?.id,
    emails: {
      lead: leadResult.status === "fulfilled" ? "sent" : "failed",
      daniel: danielResult.status === "fulfilled" ? "sent" : "failed",
    },
  });
}
