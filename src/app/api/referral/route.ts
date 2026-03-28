import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function findReferralCode(email: string): Promise<string | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return null;

  const res = await fetch(
    `${supabaseUrl}/rest/v1/website_leads?email=eq.${encodeURIComponent(email)}&select=referral_code&limit=1`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    }
  );
  if (!res.ok) return null;
  const rows = await res.json() as { referral_code: string | null }[];
  return rows[0]?.referral_code ?? null;
}

async function saveReferralCode(email: string, name: string, code: string): Promise<boolean> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return false;

  const res = await fetch(`${supabaseUrl}/rest/v1/website_leads?on_conflict=email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({
      email,
      name,
      referral_code: code,
      source: "referral_program",
      updated_at: new Date().toISOString(),
    }),
  });
  return res.ok;
}

async function getReferrerByCode(code: string): Promise<{ name: string; email: string } | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return null;

  const res = await fetch(
    `${supabaseUrl}/rest/v1/website_leads?referral_code=eq.${encodeURIComponent(code)}&select=name,email&limit=1`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    }
  );
  if (!res.ok) return null;
  const rows = await res.json() as { name: string; email: string }[];
  return rows[0] ?? null;
}

async function sendReferralEmail(name: string, email: string, code: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const { generateReferralEmail } = await import("@/lib/email-templates/referral");
  const template = generateReferralEmail({ name, code });

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  await resend.emails.send({
    from: "Daniel Lopes — Beyond Focus <website@beyondfocus.pt>",
    to: [email],
    subject: template.subject,
    html: template.html,
  });
}

async function notifyTelegram(referrerName: string, referrerEmail: string, code: string): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return;

  const link = `https://beyondfocus.pt/referral/${code}`;
  const text = `🔗 *Programa de referidos*\n\nLink criado para *${referrerName}* (${referrerEmail})\nCódigo: \`${code}\`\n${link}`;

  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
  }).catch(() => {});
}

export async function POST(request: Request) {
  if (!rateLimit(request, { limit: 10, windowMs: 60_000 })) {
    return NextResponse.json({ error: "Demasiados pedidos." }, { status: 429 });
  }

  try {
    const body = await request.json() as { email?: string; name?: string };
    const { email, name } = body;

    if (!email || !name) {
      return NextResponse.json({ error: "email e name são obrigatórios." }, { status: 400 });
    }

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Formato de email inválido." }, { status: 400 });
    }

    // Reuse existing code if client already has one
    const existing = await findReferralCode(email);
    const code = existing ?? generateCode();

    if (!existing) {
      const saved = await saveReferralCode(email, name, code);
      if (!saved) {
        return NextResponse.json({ error: "Erro ao guardar código." }, { status: 500 });
      }
    }

    await Promise.allSettled([
      sendReferralEmail(name, email, code),
      notifyTelegram(name, email, code),
    ]);

    return NextResponse.json({
      success: true,
      code,
      link: `https://beyondfocus.pt/referral/${code}`,
      existing: !!existing,
    });
  } catch (error) {
    console.error("Referral POST error:", error);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Parâmetro 'code' obrigatório." }, { status: 400 });
  }

  const sanitized = code.replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 6);
  if (sanitized.length !== 6) {
    return NextResponse.json({ error: "Código inválido." }, { status: 400 });
  }

  const referrer = await getReferrerByCode(sanitized);
  if (!referrer) {
    return NextResponse.json({ error: "Código não encontrado." }, { status: 404 });
  }

  return NextResponse.json({
    valid: true,
    referrerName: referrer.name.split(" ")[0],
    code: sanitized,
  });
}
