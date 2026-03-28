import Anthropic from "@anthropic-ai/sdk";

interface CallConfirmationParams {
  name: string;
  email: string;
  company?: string;
  message?: string;
  services?: string[];
  sector?: string;
  callDatetime: string; // ISO string
  callDateFormatted: string; // "27 de março às 15h00"
  meetingUrl?: string;
  leadScore?: string;
  nurtureEmails?: number; // quantos emails abriu
  confirmUrl?: string;
  declineUrl?: string;
}

// Email para o LEAD — confirmação personalizada
export async function generateLeadConfirmationEmail(params: CallConfirmationParams): Promise<{ subject: string; html: string }> {
  const {
    name,
    company,
    message,
    services,
    sector,
    callDateFormatted,
    meetingUrl,
    confirmUrl,
    declineUrl,
  } = params;

  const firstName = name.split(" ")[0];
  const sectorContext =
    sector === "hotelaria" ? "hotelaria e turismo"
    : sector === "restauracao" ? "restauração"
    : sector === "imobiliario" ? "imobiliário"
    : sector === "corporate" ? "empresarial"
    : "vídeo marketing";

  const servicesText = services?.length ? `sobre ${services.slice(0, 2).join(" e ")}` : "sobre vídeo marketing";
  const companyText = company ? ` para ${company}` : "";
  const requestContext = message
    ? `O ${firstName} pediu especificamente: "${message.slice(0, 150)}${message.length > 150 ? "..." : ""}"`
    : `Interesse em ${sectorContext} ${servicesText}`;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (apiKey) {
    try {
      const client = new Anthropic({ apiKey });
      const confirmButtons = confirmUrl && declineUrl
        ? `\n\nNo final do email, ANTES da assinatura, adiciona este bloco HTML exatamente:\n<div style="margin:24px 0;display:flex;gap:12px">\n  <a href="${confirmUrl}" style="background:#000;color:#fff;padding:12px 24px;text-decoration:none;font-weight:bold;display:inline-block">Confirmar reunião</a>\n  <a href="${declineUrl}" style="background:#fff;color:#000;padding:12px 24px;text-decoration:none;font-weight:bold;display:inline-block;border:1px solid #000">Não posso comparecer</a>\n</div>`
        : "";

      const response = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 700,
        messages: [
          {
            role: "user",
            content: `Escreve um email de confirmação de reunião para ${firstName}${companyText}.

Contexto do pedido: ${requestContext}
Data/hora da reunião: ${callDateFormatted}
${meetingUrl ? `Link da reunião: ${meetingUrl}` : ""}

REGRAS:
- Tom: pessoal, directo, exclusivo. Assina como Daniel Lopes, Beyond Focus.
- NÃO usar palavras como "premium", "incrível", "fantástico"
- Máx 4 parágrafos curtos
- Mencionar especificamente o que o ${firstName} pediu
- Criar expectativa para a reunião sem prometer nada concreto
- Terminar com algo como "Até ${callDateFormatted.split(" ")[2] || "lá"},"
- Responde APENAS com o corpo do email em HTML simples (sem <html>, <head>, só <p> e <strong> tags)
- Assunto do email na primeira linha como: ASSUNTO: [texto aqui]${confirmButtons}`,
          },
        ],
      });

      const raw = response.content[0].type === "text" ? response.content[0].text : "";
      const subjectMatch = raw.match(/ASSUNTO:\s*(.+)/);
      const subject = subjectMatch ? subjectMatch[1].trim() : `Reunião confirmada — ${callDateFormatted}`;
      const html = raw.replace(/ASSUNTO:.+\n?/, "").trim();
      return { subject, html };
    } catch {
      // fallback abaixo
    }
  }

  // Fallback sem IA
  const subject = `Reunião confirmada — ${callDateFormatted}`;
  const confirmButtons = confirmUrl && declineUrl ? `
<div style="margin:24px 0;display:flex;gap:12px">
  <a href="${confirmUrl}" style="background:#000;color:#fff;padding:12px 24px;text-decoration:none;font-weight:bold;display:inline-block">Confirmar reunião</a>
  <a href="${declineUrl}" style="background:#fff;color:#000;padding:12px 24px;text-decoration:none;font-weight:bold;display:inline-block;border:1px solid #000">Não posso comparecer</a>
</div>` : "";
  const html = `
<p>Olá ${firstName},</p>
<p>Confirmado. Falamos no dia <strong>${callDateFormatted}</strong>${meetingUrl ? ` — <a href="${meetingUrl}">entra aqui na hora</a>` : ""}.</p>
<p>${requestContext}</p>
${confirmButtons}
<p>Qualquer coisa antes, responde a este email.<br><br>Até lá,<br><strong>Daniel Lopes</strong><br>Beyond Focus</p>
  `.trim();
  return { subject, html };
}

// Email para o DANIEL — briefing pré-call
export async function generateDanielBriefingEmail(params: CallConfirmationParams): Promise<{ subject: string; html: string }> {
  const {
    name,
    email,
    company,
    message,
    services,
    sector,
    callDateFormatted,
    leadScore,
    nurtureEmails,
  } = params;

  const sectorEmoji =
    sector === "hotelaria" ? "🏨"
    : sector === "restauracao" ? "🍽️"
    : sector === "imobiliario" ? "🏠"
    : sector === "corporate" ? "🏢"
    : "📋";

  const scoreEmoji = leadScore === "HOT" ? "🔥" : leadScore === "WARM" ? "🌡️" : "❄️";

  const subject = `${scoreEmoji} Call amanhã — ${name}${company ? ` · ${company}` : ""} · ${callDateFormatted}`;

  const html = `
<h2 style="margin-bottom:4px">${scoreEmoji} Briefing Pré-Call</h2>
<p style="color:#888;margin-top:0">${callDateFormatted}</p>

<table style="border-collapse:collapse;width:100%;font-size:14px">
  <tr><td style="padding:6px 0;color:#888;width:120px">Nome</td><td><strong>${name}</strong></td></tr>
  ${company ? `<tr><td style="padding:6px 0;color:#888">Empresa</td><td>${company}</td></tr>` : ""}
  <tr><td style="padding:6px 0;color:#888">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
  <tr><td style="padding:6px 0;color:#888">Sector</td><td>${sectorEmoji} ${sector || "Não detectado"}</td></tr>
  ${services?.length ? `<tr><td style="padding:6px 0;color:#888">Serviços</td><td>${services.join(", ")}</td></tr>` : ""}
  <tr><td style="padding:6px 0;color:#888">Score</td><td>${scoreEmoji} ${leadScore || "?"}</td></tr>
  ${nurtureEmails !== undefined ? `<tr><td style="padding:6px 0;color:#888">Nurture</td><td>${nurtureEmails} email(s) enviado(s)</td></tr>` : ""}
</table>

${message ? `
<hr style="margin:16px 0;border:none;border-top:1px solid #eee">
<h3 style="font-size:14px;margin-bottom:4px">O que pediu</h3>
<p style="background:#f9f9f9;padding:12px;border-left:3px solid #000;margin:0;font-style:italic">"${message}"</p>
` : ""}

<hr style="margin:16px 0;border:none;border-top:1px solid #eee">
<p style="font-size:12px;color:#aaa">Gerado automaticamente pelo ALFRED · Beyond Focus</p>
  `.trim();

  return { subject, html };
}
