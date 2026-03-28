// Nurture sequence — Scale Labs methodology
// Todos os emails gerados por Claude com pesquisa da empresa
// Nenhum email parece automático — todos parecem escritos pelo Daniel após pesquisa

import type { Sector } from "@/lib/sector-classifier";
import type { CompanyResearch } from "@/lib/company-research";

const BASE_STYLE = `font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 20px;color:#222;font-size:15px;line-height:1.8`;
const FOOTER = `<p style="color:#999;font-size:13px;margin-top:40px;border-top:1px solid #eee;padding-top:20px">Daniel Lopes · <a href="https://beyondfocus.pt" style="color:#999">beyondfocus.pt</a> · <a href="mailto:daniel@beyondfocus.pt" style="color:#999">daniel@beyondfocus.pt</a></p>`;

function bodyToHtml(text: string): string {
  return text
    .split("\n")
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .map(l => `<p>${l}</p>`)
    .join("\n");
}

async function claudeWrite(prompt: string): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  try {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic({ apiKey });
    const res = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 350,
      messages: [{ role: "user", content: prompt }],
    });
    const text = res.content[0].type === "text" ? res.content[0].text.trim() : null;
    return text || null;
  } catch {
    return null;
  }
}

const DANIEL_CONTEXT = `
És o Daniel Lopes, CEO da Beyond Focus — produtora audiovisual em Lisboa (beyondfocus.pt).
Trabalhas com hotéis, restaurantes, empresas corporate e projectos especiais.
O teu portfólio inclui: Hotel Casa Palmela (5 estrelas, Small Luxury Hotels), Carl Zeiss Portugal, Sóçe by Mauro Loureiro, Once Upon Lisboa.
Escreves em PT-PT. Tom: directo, pessoal, sem filler corporativo. Curto. Sem negrito, sem listas, sem markdown.
Termina sempre com: "Abraço,\\nDaniel"
`.trim();

// ─── EMAIL 1 — 15-30 segundos após submissão (after() background) ─────────────
// Parece que o Daniel viu a notificação, pesquisou a empresa e escreveu de imediato

export async function generateEmail1(data: {
  name: string;
  company?: string;
  services?: string[];
  message?: string;
  sector: Sector;
  research: CompanyResearch;
}): Promise<{ subject: string; html: string }> {
  const firstName = data.name.split(" ")[0];

  const companyCtx = data.research.hasData
    ? `Website deles: ${data.research.website}\nDescrição: ${data.research.description}\nO que fazem: ${data.research.whatTheyDo.slice(0, 600)}`
    : data.company
    ? `Empresa: ${data.company} (sem dados online disponíveis)`
    : `Lead sem empresa — email: sem domínio identificado`;

  const prompt = `${DANIEL_CONTEXT}

Esta pessoa acabou de submeter um pedido no teu site. Recebes a notificação no Telegram, pesquisas a empresa e respondes.

LEAD:
- Nome: ${data.name} (tratar por ${firstName})
- Serviços pedidos: ${data.services?.join(", ") || "não especificado"}
- Mensagem: ${data.message || "sem mensagem"}
${companyCtx}

Escreve o primeiro email de resposta.
- Parece que foi o Daniel a escrever directamente, não um sistema automático
- Se tiveres dados da empresa: referencia algo específico do que fazem (1 detalhe concreto)
- Se não tiveres dados: foca no que pediram e mostra interesse genuíno
- Confirma que vais responder (sem dar prazo fixo — soa a robô)
- Se houver case study relevante ao sector deles, podes mencionar: Casa Palmela (hotelaria), Sóçe (restauração), Carl Zeiss (corporate)
- Máximo 4 frases
- NÃO uses: "Recebi o teu pedido", "entrei em contacto", "não hesite", "qualquer dúvida"`;

  const body = await claudeWrite(prompt);

  if (!body) {
    // Fallback se sem API key
    return {
      subject: `${firstName}, recebi o teu pedido`,
      html: `<div style="${BASE_STYLE}"><p>Olá ${firstName},</p><p>Recebi. Respondo pessoalmente em breve.</p><p>Abraço,<br>Daniel</p>${FOOTER}</div>`,
    };
  }

  return {
    subject: `${firstName}, recebi`,
    html: `<div style="${BASE_STYLE}">${bodyToHtml(body)}${FOOTER}</div>`,
  };
}

// ─── EMAIL 2 — Dia 3, sem resposta ───────────────────────────────────────────
// Follow-up com contexto — mostra que se lembra deles especificamente

export async function generateEmail2(data: {
  name: string;
  company?: string;
  services?: string[];
  message?: string;
  sector: Sector;
  research: CompanyResearch;
}): Promise<{ subject: string; html: string }> {
  const firstName = data.name.split(" ")[0];

  const companyCtx = data.research.hasData
    ? `Website: ${data.research.website}\nO que fazem: ${data.research.whatTheyDo.slice(0, 500)}`
    : data.company
    ? `Empresa: ${data.company}`
    : "Lead sem empresa identificada";

  const prompt = `${DANIEL_CONTEXT}

Esta pessoa submeteu um pedido há 3 dias e não respondeu. É o segundo email.

LEAD:
- Nome: ${data.name} (tratar por ${firstName})
- Serviços: ${data.services?.join(", ") || "não especificado"}
- Mensagem original: ${data.message || "sem mensagem"}
${companyCtx}

Escreve um follow-up.
- Não começar com "Só a garantir que..." — soa automático
- Referencia algo específico deles se tiveres dados
- Proposta concreta: call de 15 min para perceber se faz sentido
- Link para agendar: https://beyondfocus.pt/contacto
- Máximo 4 frases
- NÃO uses: "espero que", "conforme combinado", "na sequência de", "venho por este meio"`;

  const body = await claudeWrite(prompt);

  if (!body) {
    return {
      subject: `Re: ${firstName}`,
      html: `<div style="${BASE_STYLE}"><p>Olá ${firstName},</p><p>Queria perceber se o teu pedido ainda está em aberto. Se fizer sentido, 15 minutos de call chegam para ver se há match — https://beyondfocus.pt/contacto</p><p>Abraço,<br>Daniel</p>${FOOTER}</div>`,
    };
  }

  return {
    subject: `Re: ${firstName}`,
    html: `<div style="${BASE_STYLE}">${bodyToHtml(body)}${FOOTER}</div>`,
  };
}

// ─── EMAIL 3 — Dia 7, break-up (Scale Labs) ──────────────────────────────────
// Dá controlo à lead — "ainda em cima da mesa ou fecho contacto?"

export async function generateEmail3(data: {
  name: string;
  company?: string;
  sector: Sector;
  research: CompanyResearch;
}): Promise<{ subject: string; html: string }> {
  const firstName = data.name.split(" ")[0];

  const now = new Date();
  now.setMonth(now.getMonth() + 1);
  const nextMonth = now.toLocaleString("pt-PT", { month: "long" });

  const companyCtx = data.company || data.research.companyName
    ? `Empresa: ${data.company || data.research.companyName}`
    : "";

  const prompt = `${DANIEL_CONTEXT}

Esta pessoa submeteu um pedido há 7 dias, enviaste 2 emails, sem resposta. Último email antes de fechares o contacto.
${companyCtx}
- Nome: ${data.name} (tratar por ${firstName})

Escreve o break-up email da Scale Labs:
- Pergunta directa: o projecto ainda está em cima da mesa para ${nextMonth}, ou preferes que feche o contacto?
- Dá controlo à pessoa — não pedes interesse, deixas escolher
- Sem pressão, sem urgência falsa
- Máximo 3 frases
- NÃO uses: "última tentativa", "oportunidade única", "não perca"`;

  const body = await claudeWrite(prompt);

  if (!body) {
    return {
      subject: `${firstName} — ainda em cima da mesa?`,
      html: `<div style="${BASE_STYLE}"><p>Olá ${firstName},</p><p>Queria só perceber: o projecto ainda está em cima da mesa para ${nextMonth}, ou preferes que feche o contacto por agora?</p><p>Sem pressões.</p><p>Abraço,<br>Daniel</p>${FOOTER}</div>`,
    };
  }

  return {
    subject: `${firstName} — ainda em cima da mesa?`,
    html: `<div style="${BASE_STYLE}">${bodyToHtml(body)}${FOOTER}</div>`,
  };
}
