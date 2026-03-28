import { NextResponse } from "next/server";

/**
 * Daily Inbound Machine Monitor
 * Runs every morning at 7:30 AM via Vercel Cron
 * Checks: lead flow, nurture health, site status
 * Reports to Daniel via Telegram
 */

const CRON_SECRET = process.env.CRON_SECRET;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TELEGRAM_BOT = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT = process.env.TELEGRAM_CHAT_ID;

async function supabaseQuery(table: string, params: string = "") {
  if (!SUPABASE_URL || !SERVICE_KEY) return null;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
  });
  if (!res.ok) return null;
  return res.json();
}

async function sendTelegram(text: string) {
  if (!TELEGRAM_BOT || !TELEGRAM_CHAT) return;
  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT,
      text,
      parse_mode: "Markdown",
    }),
  }).catch(() => {});
}

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const yesterdayISO = yesterday.toISOString();
  const weekAgoISO = weekAgo.toISOString();

  // 1. Leads last 24h
  const recentLeads = await supabaseQuery(
    "website_leads",
    `select=id,name,email,source,nurture_step,created_at&created_at=gte.${yesterdayISO}&order=created_at.desc`
  );
  const leadsToday = Array.isArray(recentLeads) ? recentLeads.length : 0;

  // 2. Leads last 7 days
  const weekLeads = await supabaseQuery(
    "website_leads",
    `select=id&created_at=gte.${weekAgoISO}`
  );
  const leadsWeek = Array.isArray(weekLeads) ? weekLeads.length : 0;

  // 3. Nurture health — leads stuck (step < 7, nurture_next_at in past, not paused)
  const stuckLeads = await supabaseQuery(
    "website_leads",
    `select=id,name,email,nurture_step,nurture_next_at&nurture_step=lt.7&nurture_paused=eq.false&nurture_next_at=lt.${yesterdayISO}`
  );
  const stuckCount = Array.isArray(stuckLeads) ? stuckLeads.length : 0;

  // 4. Total leads in database
  const allLeads = await supabaseQuery("website_leads", "select=id");
  const totalLeads = Array.isArray(allLeads) ? allLeads.length : 0;

  // 5. Nurture completion rate
  const completedNurture = await supabaseQuery(
    "website_leads",
    "select=id&nurture_step=gte.7"
  );
  const completedCount = Array.isArray(completedNurture) ? completedNurture.length : 0;
  const completionRate = totalLeads > 0 ? Math.round((completedCount / totalLeads) * 100) : 0;

  // 6. Source breakdown (last 7 days)
  const sourceBreakdown: Record<string, number> = {};
  if (Array.isArray(recentLeads)) {
    for (const lead of recentLeads) {
      const src = (lead as { source?: string }).source || "directo";
      sourceBreakdown[src] = (sourceBreakdown[src] || 0) + 1;
    }
  }
  const sourceText = Object.entries(sourceBreakdown)
    .map(([src, count]) => `  ${src}: ${count}`)
    .join("\n") || "  (sem leads)";

  // 7. Recent lead names (last 24h)
  const recentNames = Array.isArray(recentLeads)
    ? (recentLeads as { name?: string; source?: string }[])
        .slice(0, 5)
        .map((l) => `  ${l.name || "?"} (${l.source || "?"})`)
        .join("\n")
    : "  (nenhum)";

  // Build report
  const date = now.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" });

  const report = `📊 *INBOUND MONITOR — ${date}*

📥 *Leads (24h):* ${leadsToday}
📅 *Leads (7 dias):* ${leadsWeek}
📊 *Total na base:* ${totalLeads}

🔄 *Nurture:*
  Completo: ${completedCount}/${totalLeads} (${completionRate}%)
  Presos: ${stuckCount}${stuckCount > 0 ? " ⚠️" : " ✅"}

📍 *Origens (24h):*
${sourceText}

👤 *Ultimos leads:*
${recentNames}

${leadsToday === 0 ? "⚠️ _Zero leads ontem. Verificar site + ads._" : leadsToday >= 2 ? "🎯 _Meta de 1-2/dia atingida!_" : "📈 _1 lead ontem. Proximo passo: optimizar conversao._"}`;

  await sendTelegram(report);

  return NextResponse.json({
    date: now.toISOString(),
    leads_24h: leadsToday,
    leads_7d: leadsWeek,
    total: totalLeads,
    stuck: stuckCount,
    nurture_completion: `${completionRate}%`,
  });
}
