import { NextResponse } from "next/server";
import { getTomorrowMeetingsWithExternals, getExternalAttendees } from "@/lib/ms-graph";
import { generateLeadConfirmationEmail, generateDanielBriefingEmail } from "@/lib/email-templates/call-confirmation";

const CRON_SECRET = process.env.CRON_SECRET;
const DANIEL_EMAIL = "daniellopes@beyondfocus.pt";

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

interface CallRecord {
  id: string;
  event_id: string;
  attendee_email: string;
  status: string;
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

async function getExistingCall(eventId: string, email: string): Promise<CallRecord | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return null;

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/calls?event_id=eq.${encodeURIComponent(eventId)}&attendee_email=eq.${encodeURIComponent(email)}&select=id,event_id,attendee_email,status&limit=1`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
    );
    if (!res.ok) return null;
    const rows = await res.json();
    return rows[0] || null;
  } catch {
    return null;
  }
}

async function createCallRecord(data: {
  event_id: string;
  event_subject: string;
  attendee_email: string;
  attendee_name: string;
  call_datetime: string;
  lead_id?: string;
  meeting_url?: string;
}): Promise<string | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return null;

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/calls`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        ...data,
        status: "pending",
        confirmation_sent_at: new Date().toISOString(),
      }),
    });
    if (!res.ok) return null;
    const rows = await res.json();
    return rows[0]?.id || null;
  } catch {
    return null;
  }
}

async function pauseNurtureForLead(leadId: string): Promise<void> {
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

export async function GET(request: Request) {
  // Verificar auth — header deve bater exatamente Bearer {secret}
  if (CRON_SECRET) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ error: "Resend not configured" }, { status: 500 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${request.headers.get("host")}`;

  let events;
  try {
    events = await getTomorrowMeetingsWithExternals();
  } catch (err) {
    console.error("Graph API error:", err);
    return NextResponse.json({ error: "Failed to fetch calendar" }, { status: 500 });
  }

  if (events.length === 0) {
    return NextResponse.json({ message: "No meetings tomorrow", processed: 0 });
  }

  const { Resend } = await import("resend");
  const resend = new Resend(resendKey);

  let processed = 0;
  const results = [];

  for (const event of events) {
    const externals = getExternalAttendees(event);

    for (const attendee of externals) {
      const email = attendee.emailAddress.address;
      const name = attendee.emailAddress.name || email.split("@")[0];
      const callDatetime = event.start.dateTime;
      const callDateFormatted = formatDatePT(callDatetime);
      const meetingUrl = event.onlineMeeting?.joinUrl;

      // Já enviámos confirmação para este evento+pessoa?
      const existing = await getExistingCall(event.id, email);
      if (existing) {
        results.push({ email, status: "already_sent", call_status: existing.status });
        continue;
      }

      // Só processar leads que estão no CRM — reuniões internas ou externas não-leads são ignoradas
      const lead = await findLeadByEmail(email);
      if (!lead) {
        results.push({ email, status: "skipped_not_a_lead" });
        continue;
      }

      const emailParams = {
        name: lead.name || name,
        email,
        company: lead.company,
        message: lead.message,
        services: lead.services,
        sector: lead.sector,
        callDatetime,
        callDateFormatted,
        meetingUrl,
        leadScore: scoreLead(lead),
        nurtureEmails: lead.nurture_step,
      };

      // Criar registo na tabela calls
      const callId = await createCallRecord({
        event_id: event.id,
        event_subject: event.subject,
        attendee_email: email,
        attendee_name: lead.name || name,
        call_datetime: callDatetime,
        lead_id: lead.id,
        meeting_url: meetingUrl,
      });

      // Pausar nurture
      await pauseNurtureForLead(lead.id);

      // Links de confirmação com callId
      const confirmUrl = callId
        ? `${baseUrl}/api/call-status?id=${callId}&status=confirmed`
        : undefined;
      const declineUrl = callId
        ? `${baseUrl}/api/call-status?id=${callId}&status=declined`
        : undefined;

      // Gerar emails com botões de confirmação
      const [leadEmail, danielEmail] = await Promise.all([
        generateLeadConfirmationEmail({ ...emailParams, confirmUrl, declineUrl }),
        generateDanielBriefingEmail(emailParams),
      ]);

      // Enviar
      const [leadResult, danielResult] = await Promise.allSettled([
        resend.emails.send({
          from: "Daniel Lopes — Beyond Focus <website@beyondfocus.pt>",
          to: [email],
          subject: leadEmail.subject,
          html: leadEmail.html,
        }),
        resend.emails.send({
          from: "ALFRED — Beyond Focus <website@beyondfocus.pt>",
          to: [DANIEL_EMAIL],
          subject: danielEmail.subject,
          html: danielEmail.html,
        }),
      ]);

      processed++;
      results.push({
        email,
        event: event.subject,
        call: callDateFormatted,
        lead_found: !!lead,
        emails: {
          lead: leadResult.status === "fulfilled" ? "sent" : "failed",
          daniel: danielResult.status === "fulfilled" ? "sent" : "failed",
        },
      });
    }
  }

  return NextResponse.json({ processed, total_events: events.length, results });
}
