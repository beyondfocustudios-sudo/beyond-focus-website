import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function saveToSupabase(data: {
  name: string;
  email: string;
  phone?: string;
  source: string;
}) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return;

  const headers = {
    "Content-Type": "application/json",
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    Prefer: "return=minimal",
  };

  // Save to leads table
  fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  }).catch(() => {});

  // Save to CRM contacts table
  fetch(`${supabaseUrl}/rest/v1/crm_contacts`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email: data.email,
      name: data.name,
      phone: data.phone || null,
      status: "lead",
      source: data.source,
      notes: "Lead inbound via website",
    }),
  }).catch(() => {});
}

async function notifyTelegram(name: string, email: string, phone?: string, source?: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) return;

  const phoneText = phone ? `\n📞 ${phone}` : "";
  const sourceText = source ? `\n🔗 Origem: ${source}` : "";
  const text = `📥 *Novo lead — guia gratuito*\n\n👤 *${name}*\n📧 ${email}${phoneText}${sourceText}\n\n_Guardado no CRM_`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: 6114268953,
        text,
        parse_mode: "Markdown",
      }),
    });
  } catch {
    // non-critical
  }
}

async function sendGuideEmail(name: string, email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    resend.emails.send({
      from: "Daniel Lopes — Beyond Focus <website@beyondfocus.pt>",
      to: [email],
      subject: "O teu guia está aqui — Como o vídeo transforma resultados em empresas",
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px">
          <div style="background:#0E3A45;padding:32px;border-radius:12px;margin-bottom:32px">
            <h1 style="color:#FFF;font-size:24px;margin:0">Olá ${name.split(" ")[0]},</h1>
            <p style="color:rgba(255,255,255,0.6);font-size:14px;margin:8px 0 0">O teu guia está pronto.</p>
          </div>
          <div style="padding:0 8px">
            <p style="color:#333;font-size:16px;line-height:1.8">
              Criámos este guia para empresas que querem usar vídeo de forma estratégica — não apenas ter conteúdo bonito, mas conteúdo que gera resultados reais.
            </p>
            <div style="background:#F5F5F5;border-radius:12px;padding:24px;margin:24px 0">
              <h2 style="color:#0E3A45;font-size:18px;margin:0 0 16px">O que vais encontrar:</h2>
              <ul style="color:#333;font-size:14px;line-height:2;margin:0;padding-left:20px">
                <li>Exemplos reais de hotelaria, restauração, imobiliário e corporate</li>
                <li>Que tipos de conteúdo funcionam em cada canal e sector</li>
                <li>O processo completo de produção sem surpresas no orçamento</li>
                <li>Como começar com orçamento controlado</li>
              </ul>
            </div>
            <div style="text-align:center;margin:32px 0">
              <a href="https://beyondfocus.pt/servicos"
                 style="background:#FA8334;color:#FFF;padding:16px 32px;border-radius:30px;text-decoration:none;font-weight:600;font-size:15px;display:inline-block">
                Ver os nossos serviços →
              </a>
            </div>
            <p style="color:#333;font-size:15px;line-height:1.8">
              Se tiveres questões sobre o teu projecto específico, responde directamente a este email. Leio pessoalmente.
            </p>
            <p style="color:#888;font-size:14px;margin-top:32px">
              Daniel Lopes<br>
              <strong style="color:#0E3A45">Beyond Focus</strong><br>
              <span style="color:#888">Produtora Audiovisual · Lisboa</span>
            </p>
          </div>
          <div style="margin-top:40px;padding-top:20px;border-top:1px solid #eee;text-align:center">
            <a href="https://beyondfocus.pt" style="color:#888;font-size:12px;text-decoration:none">beyondfocus.pt</a>
          </div>
        </div>
      `,
    }).catch(() => {});
  } catch {
    // non-critical
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, source } = body as {
      name?: string;
      email?: string;
      phone?: string;
      source?: string;
    };

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: "Nome é obrigatório." }, { status: 400 });
    }

    const safeSource = source || "guia-video-empresas";

    saveToSupabase({ name, email, phone, source: safeSource }).catch(() => {});
    notifyTelegram(name, email, phone, safeSource).catch(() => {});
    sendGuideEmail(name, email).catch(() => {});

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro ao processar pedido." }, { status: 500 });
  }
}
