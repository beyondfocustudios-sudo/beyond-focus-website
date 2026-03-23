import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, website, services, message, budget, startDate } = body;

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Nome, email e telefone são obrigatórios." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Fallback: log to server if no API key configured
      console.log("=== NEW CONTACT (no Resend key) ===");
      console.log(JSON.stringify(body, null, 2));
      return NextResponse.json({ success: true });
    }

    // Dynamic import to avoid build errors when resend isn't configured
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
         </table>`
      : "";

    // Email to Beyond Focus
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

    // Confirmation email to client
    await resend.emails.send({
      from: "Beyond Focus <website@beyondfocus.pt>",
      to: [email],
      subject: "Recebemos a tua mensagem — Beyond Focus",
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px">
          <div style="background:#0E3A45;padding:32px;border-radius:12px;margin-bottom:32px">
            <h1 style="color:#FFF;font-size:24px;margin:0">Obrigado, ${name}!</h1>
          </div>
          <div style="padding:0 8px">
            <p style="color:#333;font-size:16px;line-height:1.7">
              Recebemos a tua mensagem e vamos responder nas próximas 24 horas.
            </p>
            <p style="color:#333;font-size:16px;line-height:1.7">
              Entretanto, podes ver o nosso trabalho em <a href="https://beyondfocus.pt/portfolio" style="color:#0E3A45;font-weight:500">beyondfocus.pt/portfolio</a>.
            </p>
            <p style="color:#888;font-size:14px;margin-top:32px">
              Até já,<br><strong style="color:#0E3A45">Equipa Beyond Focus</strong>
            </p>
          </div>
          <div style="margin-top:40px;padding-top:20px;border-top:1px solid #eee;text-align:center">
            <p style="color:#888;font-size:12px">Beyond Focus · Produtora Audiovisual · Lisboa, Portugal</p>
          </div>
        </div>
      `,
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
