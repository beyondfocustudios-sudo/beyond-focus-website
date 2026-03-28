import { NextResponse } from "next/server";

interface LeadRow {
  id: string;
  nurture_step: number;
}

async function fetchPendingLeads(): Promise<LeadRow[]> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return [];

  const now = new Date().toISOString();
  const url =
    `${supabaseUrl}/rest/v1/website_leads` +
    `?nurture_step=lt.7` +
    `&nurture_next_at=lte.${encodeURIComponent(now)}` +
    `&nurture_paused=eq.false` +
    `&select=id,nurture_step` +
    `&limit=50`;

  try {
    const res = await fetch(url, {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function triggerNurtureForLead(
  leadId: string,
  step: number,
  baseUrl: string,
  cronSecret: string
): Promise<boolean> {
  const sequenceStep = (step + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7;

  try {
    const res = await fetch(`${baseUrl}/api/nurture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cronSecret}`,
      },
      body: JSON.stringify({ lead_id: leadId, sequence_step: sequenceStep }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;

  // Rejeitar se CRON_SECRET configurado e header não bate exatamente
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    `https://${request.headers.get("host")}`;

  const leads = await fetchPendingLeads();

  let processed = 0;
  for (const lead of leads) {
    const ok = await triggerNurtureForLead(
      lead.id,
      lead.nurture_step,
      baseUrl,
      cronSecret ?? ""
    );
    if (ok) processed++;
  }

  return NextResponse.json({ processed, total: leads.length });
}
