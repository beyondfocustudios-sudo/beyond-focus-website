import { NextResponse, after } from "next/server";
import { detectSector } from "@/lib/sector-classifier";
import { researchCompany } from "@/lib/company-research";
import { generateEmail1 } from "@/lib/email-templates/nurture";
import { rateLimit } from "@/lib/rate-limit";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  services?: string[];
  message?: string;
  budget?: string;
  startDate?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

function scoreLeadNotif(data: ContactFormData): { score: number; label: string; flag: string } {
  let score = 0;

  const budget = data.budget || "";
  if (budget.includes("10000") || budget.includes("15000") || budget.includes("20000") || budget.includes("+") || budget.includes(">")) score += 40;
  else if (budget.includes("5000") || budget.includes("7500")) score += 25;
  else if (budget.includes("2500") || budget.includes("3000")) score += 10;

  const services = data.services || [];
  if (services.length >= 3) score += 15;
  if (services.includes("filme-comercial") || services.includes("documentario") || services.includes("filmes-comerciais") || services.includes("documentarios")) score += 10;

  if (data.company) score += 10;
  if (data.website) score += 5;
  if (data.startDate) score += 10;
  if (data.phone) score += 10;

  if (score >= 60) return { score, label: "HOT", flag: "🔥" };
  if (score >= 30) return { score, label: "WARM", flag: "🌡️" };
  return { score, label: "COLD", flag: "❄️" };
}

const SECTOR_EMOJI: Record<string, string> = {
  hotelaria: "🏨",
  restauracao: "🍽️",
  imobiliario: "🏠",
  corporate: "🏢",
  generic: "📋",
};

async function notifyTelegram(name: string, email: string, company?: string, services?: string[], phone?: string, leadScore?: { score: number; label: string; flag: string }, sector?: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return;

  const servicesText = services?.length ? `\n🎯 Serviços: ${services.join(", ")}` : "";
  const companyText = company ? `\n🏢 Empresa: ${company}` : "";
  const phoneText = phone ? `\n📞 ${phone}` : "";
  const scoreText = leadScore ? `\n\n${leadScore.flag} *${leadScore.label} LEAD* (score: ${leadScore.score})` : "";
  const sectorText = sector && sector !== "generic" ? `\n${SECTOR_EMOJI[sector] || "📋"} Sector: ${sector}` : "";

  const text = `🔔 *Novo lead — beyondfocus.pt*${scoreText}\n\n👤 *${name}*\n📧 ${email}${phoneText}${companyText}${sectorText}${servicesText}\n\n_Guardado no CRM_`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
    });
  } catch {
    // non-critical
  }
}

async function syncLeadToCRM(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  services?: string[];
  sector?: string;
}): Promise<void> {
  const crmUrl = process.env.BEYOND_PRICING_URL;
  const crmKey = process.env.BEYOND_PRICING_WEBHOOK_KEY;
  if (!crmUrl || !crmKey) return;

  await fetch(`${crmUrl}/api/webhooks/lead-capture`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": crmKey },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
      source: "website_contact_form",
      notes: [
        data.sector ? `Sector: ${data.sector}` : null,
        data.services?.length ? `Serviços: ${data.services.join(", ")}` : null,
      ].filter(Boolean).join(" | ") || undefined,
    }),
  }).catch(() => {});
}

async function saveLeadToSupabase(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  services?: string[];
  message?: string;
  budget?: string;
  start_date?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  sector?: string;
}): Promise<{ nurture_step: number } | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return null;

  try {
    // Fetch existing record first to preserve nurture progress
    const existing = await fetch(
      `${supabaseUrl}/rest/v1/website_leads?email=eq.${encodeURIComponent(data.email)}&select=nurture_step,nurture_paused&limit=1`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
      }
    ).then((r) => r.ok ? r.json() : []).catch(() => []) as { nurture_step: number; nurture_paused: boolean }[];

    const existingRecord = existing[0] || null;
    const existingStep = existingRecord?.nurture_step ?? 0;

    const res = await fetch(`${supabaseUrl}/rest/v1/website_leads?on_conflict=email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify({
        ...data,
        source: data.source || "contact_form",
        // Keep the higher nurture_step — preserve sequence progress on re-engagement
        nurture_step: existingStep >= 1 ? existingStep : 1,
        nurture_next_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        // Only reset nurture_paused if there was no prior record
        ...(existingRecord === null && { nurture_paused: false }),
        updated_at: new Date().toISOString(),
      }),
    });
    if (res.ok) {
      const rows = await res.json();
      return rows[0] ?? { nurture_step: existingStep || 1 };
    }
    return existingRecord ? { nurture_step: existingStep } : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!rateLimit(request, { limit: 5, windowMs: 60_000 })) {
    return NextResponse.json({ error: "Demasiados pedidos. Tenta novamente em breve." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { name, email, phone, company, website, services, message, budget, startDate, source, utmSource, utmMedium, utmCampaign } = body;

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Nome, email e telefone são obrigatórios." },
        { status: 400 }
      );
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Formato de email inválido." },
        { status: 400 }
      );
    }

    // Detectar sector automaticamente
    const sector = detectSector({ company, website, message });

    // Save to Supabase CRM — await to get nurture state before deciding on Email 1
    const savedLead = await saveLeadToSupabase({
      name,
      email,
      phone,
      company,
      website,
      services,
      message,
      budget,
      start_date: startDate,
      source: source || "contact_form",
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      sector,
    }).catch(() => null);

    const alreadyInSequence = (savedLead?.nurture_step ?? 0) >= 2;

    // Lead scoring
    const leadScore = scoreLeadNotif({ name, email, phone, company, website, services, message, budget, startDate, source });

    // Notify JARVIS via Telegram (non-blocking)
    notifyTelegram(name, email, company, services, phone, leadScore, sector).catch(() => {});

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.log("=== NEW CONTACT (no Resend key) ===");
      console.log(JSON.stringify(body, null, 2));
      return NextResponse.json({ success: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const servicesHtml = services?.length
      ? `<h2 style="color:#0E3A45;font-size:18px;margin:32px 0 16px">Serviços pretendidos</h2>
         <div>${(services as string[]).map((s: string) => `<span style="background:#F5F5F5;color:#0E3A45;padding:4px 12px;border-radius:20px;font-size:13px;display:inline-block;margin:4px">${s}</span>`).join("")}</div>`
      : "";

    const messageHtml = message
      ? `<h2 style="color:#0E3A45;font-size:18px;margin:32px 0 16px">Mensagem</h2>
         <p style="color:#333;font-size:14px;line-height:1.7;background:#F9F9F9;padding:16px;border-radius:8px;border-left:3px solid #FA8334">${message}</p>`
      : "";

    const detailsHtml = budget
      ? `<h2 style="color:#0E3A45;font-size:18px;margin:32px 0 16px">Detalhes</h2>
         <table style="width:100%;border-collapse:collapse">
           <tr><td style="padding:8px 0;color:#888;font-size:13px;width:120px">Orçamento</td><td style="padding:8px 0;color:#0E3A45;font-size:14px">${budget}</td></tr>
           ${startDate ? `<tr><td style="padding:8px 0;color:#888;font-size:13px">Data início</td><td style="padding:8px 0;color:#0E3A45;font-size:14px">${startDate}</td></tr>` : ""}
           ${source ? `<tr><td style="padding:8px 0;color:#888;font-size:13px">Origem</td><td style="padding:8px 0;color:#0E3A45;font-size:14px">${source}</td></tr>` : ""}
         </table>`
      : "";

    await resend.emails.send({
      from: "Beyond Focus Website <website@beyondfocus.pt>",
      to: ["geral@beyondfocus.pt"],
      reply_to: email,
      subject: `Novo contacto: ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px">
          <div style="background:#0E3A45;padding:32px;border-radius:12px;margin-bottom:32px">
            <h1 style="color:#FFF;font-size:24px;margin:0">Novo contacto via website</h1>
            <p style="color:rgba(255,255,255,0.5);font-size:14px;margin:8px 0 0">beyondfocus.pt/contacto</p>
          </div>
          <div style="padding:0 8px">
            <h2 style="color:#0E3A45;font-size:18px;margin-bottom:16px">Dados pessoais</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#888;font-size:13px;width:120px">Nome</td><td style="padding:8px 0;color:#0E3A45;font-size:14px;font-weight:500">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#888;font-size:13px">Email</td><td style="padding:8px 0;color:#0E3A45;font-size:14px"><a href="mailto:${email}" style="color:#0E3A45">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding:8px 0;color:#888;font-size:13px">Telefone</td><td style="padding:8px 0;color:#0E3A45;font-size:14px">${phone}</td></tr>` : ""}
              ${company ? `<tr><td style="padding:8px 0;color:#888;font-size:13px">Empresa</td><td style="padding:8px 0;color:#0E3A45;font-size:14px">${company}</td></tr>` : ""}
              ${website ? `<tr><td style="padding:8px 0;color:#888;font-size:13px">Website</td><td style="padding:8px 0;color:#0E3A45;font-size:14px"><a href="${website}" style="color:#0E3A45">${website}</a></td></tr>` : ""}
            </table>
            ${servicesHtml}
            ${messageHtml}
            ${detailsHtml}
          </div>
          <div style="margin-top:40px;padding-top:20px;border-top:1px solid #eee;text-align:center">
            <p style="color:#888;font-size:12px">Responde directamente a este email para contactar ${name}.</p>
          </div>
        </div>
      `,
    });

    // Email 1 + sync CRM — em background após resposta ao browser
    after(async () => {
      await Promise.allSettled([
        // Nurture email 1 — skip se o lead já está na sequência (nurture_step >= 2)
        alreadyInSequence
          ? Promise.resolve()
          : (async () => {
              const research = await researchCompany({ company, website, email });
              const email1 = await generateEmail1({ name, company, services, message, sector, research });
              await resend.emails.send({
                from: "Daniel Lopes — Beyond Focus <website@beyondfocus.pt>",
                to: [email],
                subject: email1.subject,
                html: email1.html,
              });
            })(),
        // Sync para beyond-pricing CRM
        syncLeadToCRM({ name, email, phone, company, message, services, sector }),
      ]);
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem. Tenta novamente." },
      { status: 500 }
    );
  }
}
