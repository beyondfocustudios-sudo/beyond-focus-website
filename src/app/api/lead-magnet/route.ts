import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!rateLimit(request, { limit: 5, windowMs: 60_000 })) {
    return NextResponse.json({ error: "Demasiados pedidos. Tenta novamente em breve." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { email, name, company, source, magnet } = body;

    if (!email) {
      return NextResponse.json({ error: "Email é obrigatório." }, { status: 400 });
    }

    // Save to Supabase
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && serviceKey) {
      // Upsert — on conflict with email, update source only if null, preserve nurture state
      fetch(`${supabaseUrl}/rest/v1/website_leads?on_conflict=email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify({
          email,
          name: name || null,
          company: company || null,
          source: source || "lead_magnet",
          notes: magnet ? `Lead magnet: ${magnet}` : null,
          updated_at: new Date().toISOString(),
        }),
      }).catch(() => {});
    }

    // Send lead magnet via email
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    // Notify BF team
    resend.emails.send({
      from: "Beyond Focus Website <website@beyondfocus.pt>",
      to: ["geral@beyondfocus.pt"],
      reply_to: email,
      subject: `Novo lead magnet: ${email}${company ? ` — ${company}` : ""}`,
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px">
          <div style="background:#0E3A45;padding:24px;border-radius:12px;margin-bottom:24px">
            <h1 style="color:#FFF;font-size:20px;margin:0">Novo Lead — ${magnet || "Guia"}</h1>
          </div>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#888;font-size:13px;width:100px">Email</td><td style="color:#0E3A45">${email}</td></tr>
            ${name ? `<tr><td style="padding:8px 0;color:#888;font-size:13px">Nome</td><td style="color:#0E3A45">${name}</td></tr>` : ""}
            ${company ? `<tr><td style="padding:8px 0;color:#888;font-size:13px">Empresa</td><td style="color:#0E3A45">${company}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#888;font-size:13px">Origem</td><td style="color:#0E3A45">${source || "website"}</td></tr>
          </table>
        </div>
      `,
    }).catch(() => {});

    // Send guide to user
    await resend.emails.send({
      from: "Daniel Lopes — Beyond Focus <website@beyondfocus.pt>",
      to: [email],
      subject: "O teu guia está aqui — Quanto custa produzir vídeo em Portugal",
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px">
          <div style="background:#0E3A45;padding:32px;border-radius:12px;margin-bottom:32px">
            <h1 style="color:#FFF;font-size:24px;margin:0">${name ? `Olá ${name.split(" ")[0]},` : "Olá,"}</h1>
            <p style="color:rgba(255,255,255,0.6);font-size:14px;margin:8px 0 0">O teu guia está pronto.</p>
          </div>
          <div style="padding:0 8px">
            <p style="color:#333;font-size:16px;line-height:1.8">
              Obrigado pelo interesse. Criámos este guia para ajudar empresas a perceber o que envolve uma produção de vídeo — e como tomar decisões mais informadas.
            </p>

            <div style="background:#F5F5F5;border-radius:12px;padding:24px;margin:24px 0">
              <h2 style="color:#0E3A45;font-size:18px;margin:0 0 16px">O que vais encontrar:</h2>
              <ul style="color:#333;font-size:14px;line-height:2;margin:0;padding-left:20px">
                <li>Tabela de referência de preços por tipo de produção</li>
                <li>O que influencia o custo final</li>
                <li>Como avaliar propostas de diferentes produtoras</li>
                <li>Erros comuns a evitar no processo</li>
                <li>Checklist para o teu briefing</li>
              </ul>
            </div>

            <div style="text-align:center;margin:32px 0">
              <a href="https://beyondfocus.pt/blog/quanto-custa-video-institucional-portugal"
                 style="background:#FA8334;color:#FFF;padding:16px 32px;border-radius:30px;text-decoration:none;font-weight:600;font-size:15px;display:inline-block">
                Ler o Guia Completo →
              </a>
            </div>

            <p style="color:#333;font-size:15px;line-height:1.8">
              Se tiveres alguma questão específica sobre o teu projecto, responde directamente a este email. Leio pessoalmente.
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
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead magnet error:", error);
    return NextResponse.json({ error: "Erro ao processar pedido." }, { status: 500 });
  }
}
