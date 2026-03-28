import { NextResponse } from "next/server";
import { generateEmail1, generateEmail2, generateEmail3 } from "@/lib/email-templates/nurture";
import { researchCompany } from "@/lib/company-research";
import type { Sector } from "@/lib/sector-classifier";

const CRON_SECRET = process.env.CRON_SECRET;

interface NurtureRequestBody {
  lead_id: string;
  sequence_step: 1 | 2 | 3;
}

interface LeadRow {
  name: string;
  email: string;
  company?: string;
  website?: string;
  services?: string[];
  message?: string;
  sector?: string;
  nurture_paused?: boolean;
}


async function getLeadFromSupabase(leadId: string): Promise<LeadRow | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return null;

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/website_leads?id=eq.${encodeURIComponent(leadId)}&select=name,email,company,website,services,message,sector,nurture_paused`,
      { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } }
    );
    if (!res.ok) return null;
    const rows = await res.json();
    return rows[0] || null;
  } catch {
    return null;
  }
}

async function updateNurtureStep(leadId: string, nextStep: number, daysUntilNext: number): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return;

  const nextAt = new Date(Date.now() + daysUntilNext * 24 * 60 * 60 * 1000).toISOString();
  await fetch(`${supabaseUrl}/rest/v1/website_leads?id=eq.${encodeURIComponent(leadId)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({ nurture_step: nextStep, nurture_next_at: nextAt }),
  }).catch(() => {});
}

export async function POST(request: Request) {
  // Sempre exigir auth — sem CRON_SECRET configurado, recusar
  if (!CRON_SECRET) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  }
  const authHeader = request.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ error: "Resend not configured" }, { status: 500 });
  }

  let body: NurtureRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { lead_id, sequence_step } = body;
  if (!lead_id || ![1, 2, 3].includes(sequence_step)) {
    return NextResponse.json({ error: "lead_id e sequence_step (1|2|3) são obrigatórios." }, { status: 400 });
  }

  const lead = await getLeadFromSupabase(lead_id);
  if (!lead) return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
  if (lead.nurture_paused) return NextResponse.json({ skipped: true, reason: "nurture_paused" });

  const sector = (lead.sector as Sector) || "generic";
  let emailData: { subject: string; html: string };

  // Pesquisa empresa para todos os emails
  const research = await researchCompany({
    company: lead.company,
    website: lead.website,
    email: lead.email,
  });

  if (sequence_step === 1) {
    emailData = await generateEmail1({ name: lead.name, company: lead.company, services: lead.services, message: lead.message, sector, research });
  } else if (sequence_step === 2) {
    emailData = await generateEmail2({ name: lead.name, company: lead.company, services: lead.services, message: lead.message, sector, research });
  } else {
    emailData = await generateEmail3({ name: lead.name, company: lead.company, sector, research });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);

    await resend.emails.send({
      from: "Daniel Lopes — Beyond Focus <website@beyondfocus.pt>",
      to: [lead.email],
      subject: emailData.subject,
      html: emailData.html,
    });

    const daysMap: Record<number, number> = { 1: 3, 2: 4 };
    if (sequence_step < 3) {
      await updateNurtureStep(lead_id, sequence_step + 1, daysMap[sequence_step]);
    } else {
      await updateNurtureStep(lead_id, 3, 9999);
    }

    return NextResponse.json({ success: true, step: sequence_step, email: lead.email });
  } catch (error) {
    console.error("Nurture email error:", error);
    return NextResponse.json({ error: "Erro ao enviar email." }, { status: 500 });
  }
}
