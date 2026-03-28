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

// ─── EMAIL 4 — Dia 14, case study Carl Zeiss ─────────────────────────────────
// Prova social corporate — multinacional que confiou numa produtora portuguesa

export async function generateEmail4(data: {
  name: string;
  company?: string;
  sector: Sector;
  research: CompanyResearch;
}): Promise<{ subject: string; html: string }> {
  const firstName = data.name.split(" ")[0];

  const companyCtx = data.company || data.research.companyName
    ? `Empresa: ${data.company || data.research.companyName}`
    : "";

  const prompt = `${DANIEL_CONTEXT}

É o quarto email — passaram 14 dias desde o pedido. Nunca responderam. Vais partilhar um case study real.
${companyCtx}
- Nome: ${data.name} (tratar por ${firstName})

Escreve um email sobre o projecto Carl Zeiss Portugal:
- Abre com uma frase que gera curiosidade sobre como uma multinacional alemã escolheu uma produtora portuguesa
- Menciona que o resultado foi usado internacionalmente pela marca
- Convida a ver o portfólio: https://beyondfocus.pt/portfolio
- Tom: confiante, factual, sem exageros
- Máximo 4 frases
- NÃO uses: "incrível", "fantástico", "premium", "exclusivo"`;

  const body = await claudeWrite(prompt);

  if (!body) {
    return {
      subject: `Como a Carl Zeiss escolheu Lisboa`,
      html: `<div style="${BASE_STYLE}"><p>Olá ${firstName},</p><p>A Carl Zeiss Portugal precisava de conteúdo para o mercado europeu. Escolheram-nos a nós — uma produtora portuguesa.</p><p>O resultado foi distribuído internacionalmente. Se quiseres ver o que fizemos: <a href="https://beyondfocus.pt/portfolio" style="color:#FA8334">beyondfocus.pt/portfolio</a></p><p>Abraço,<br>Daniel</p>${FOOTER}</div>`,
    };
  }

  return {
    subject: `Como a Carl Zeiss escolheu Lisboa`,
    html: `<div style="${BASE_STYLE}">${bodyToHtml(body)}${FOOTER}</div>`,
  };
}

// ─── EMAIL 5 — Dia 18, transparência de preços ───────────────────────────────
// Diferenciação por honestidade — a maioria das produtoras não fala de valores

export async function generateEmail5(data: {
  name: string;
  company?: string;
  sector: Sector;
  research: CompanyResearch;
}): Promise<{ subject: string; html: string }> {
  const firstName = data.name.split(" ")[0];

  const companyCtx = data.company || data.research.companyName
    ? `Empresa: ${data.company || data.research.companyName}`
    : "";

  const PRICING_TIERS = `
Os nossos três níveis de investimento:
- Entrada (1.500€–3.000€): vídeo institucional simples, entrevista, social content
- Standard (3.000€–7.000€): campanha com narrativa, multi-formato, edição avançada
- Avançado (7.000€–15.000€+): projecto estratégico, múltiplos dias de rodagem, distribuição
  `.trim();

  const prompt = `${DANIEL_CONTEXT}

É o quinto email — dia 18. Vais ser transparente sobre preços, algo raro no sector.
${companyCtx}
- Nome: ${data.name} (tratar por ${firstName})

${PRICING_TIERS}

Escreve um email sobre transparência de preços:
- Abre dizendo que a maioria das produtoras não fala de valores — tu falas
- Apresenta os três níveis de forma natural, sem lista formal — integrado no texto
- CTA: marcar uma conversa de 15 minutos para perceber qual o melhor investimento para o projecto deles
- Link para agendar: https://calendly.com/beyondfocus-/discovery_call
- Máximo 5 frases
- NÃO uses: "orçamento personalizado", "preço justo", "premium"`;

  const body = await claudeWrite(prompt);

  if (!body) {
    return {
      subject: `O que custa trabalhar connosco`,
      html: `<div style="${BASE_STYLE}"><p>Olá ${firstName},</p><p>A maioria das produtoras não fala de preços. Nós falamos.</p><p>Os projectos começam entre 1.500€ e 3.000€ para trabalhos mais directos. Projectos com narrativa e múltiplos formatos ficam entre 3.000€ e 7.000€. Projectos estratégicos com vários dias de rodagem a partir de 7.000€.</p><p>Se fizer sentido explorar qual o nível certo para o teu projecto, 15 minutos chegam: <a href="https://calendly.com/beyondfocus-/discovery_call" style="color:#FA8334">cal.com/beyondfocus/conversa</a></p><p>Abraço,<br>Daniel</p>${FOOTER}</div>`,
    };
  }

  return {
    subject: `O que custa trabalhar connosco`,
    html: `<div style="${BASE_STYLE}">${bodyToHtml(body)}${FOOTER}</div>`,
  };
}

// ─── EMAIL 6 — Dia 24, objecções frequentes ──────────────────────────────────
// Responde directamente às três objecções mais comuns antes que as pensem

export async function generateEmail6(data: {
  name: string;
  company?: string;
  sector: Sector;
  research: CompanyResearch;
}): Promise<{ subject: string; html: string }> {
  const firstName = data.name.split(" ")[0];

  const companyCtx = data.company || data.research.companyName
    ? `Empresa: ${data.company || data.research.companyName}`
    : "";

  const prompt = `${DANIEL_CONTEXT}

É o sexto email — dia 24. Vais responder às três objecções mais comuns que as pessoas têm mas não dizem.
${companyCtx}
- Nome: ${data.name} (tratar por ${firstName})

As três objecções a responder:
1. "Não tenho orçamento" — resposta: projectos estruturados a partir de 1.500€; o custo de não ter conteúdo diferenciado é maior
2. "Já tentei e não resultou" — resposta: o problema costuma ser estratégia, não produção; vídeo sem distribuição não serve ninguém
3. "Não sei se preciso de vídeo" — resposta: se tens concorrentes com vídeo e tu não tens, já sabes a resposta

Escreve o email:
- Apresenta as objecções de forma natural, sem numeração nem listas
- Cada resposta em 1 frase directa
- CTA: uma conversa de 15 minutos não custa nada — link https://calendly.com/beyondfocus-/discovery_call
- Máximo 6 frases no total
- NÃO uses: "entendo a tua preocupação", "é normal sentir", "garanto que"`;

  const body = await claudeWrite(prompt);

  if (!body) {
    return {
      subject: `As três razões para não avançar (e as respostas)`,
      html: `<div style="${BASE_STYLE}"><p>Olá ${firstName},</p><p>Três coisas que ouço com frequência:</p><p>"Não tenho orçamento" — projectos estruturados começam em 1.500€. O custo de não ter conteúdo diferenciado é maior.</p><p>"Já tentei e não resultou" — o problema costuma ser estratégia, não produção. Vídeo sem distribuição não serve ninguém.</p><p>"Não sei se preciso" — se os teus concorrentes têm vídeo e tu não tens, já sabes a resposta.</p><p>Uma conversa de 15 minutos custa zero: <a href="https://calendly.com/beyondfocus-/discovery_call" style="color:#FA8334">cal.com/beyondfocus/conversa</a></p><p>Abraço,<br>Daniel</p>${FOOTER}</div>`,
    };
  }

  return {
    subject: `As três razões para não avançar (e as respostas)`,
    html: `<div style="${BASE_STYLE}">${bodyToHtml(body)}${FOOTER}</div>`,
  };
}

// ─── EMAIL 7 — Dia 30, último email ──────────────────────────────────────────
// Encerra a sequência com dignidade — sem urgência falsa, com porta aberta

export async function generateEmail7(data: {
  name: string;
  company?: string;
  sector: Sector;
  research: CompanyResearch;
}): Promise<{ subject: string; html: string }> {
  const firstName = data.name.split(" ")[0];

  const companyCtx = data.company || data.research.companyName
    ? `Empresa: ${data.company || data.research.companyName}`
    : "";

  const prompt = `${DANIEL_CONTEXT}

É o último email da sequência — dia 30. Vais encerrar o contacto com elegância, sem pressão.
${companyCtx}
- Nome: ${data.name} (tratar por ${firstName})

Escreve o email final:
- Diz claramente que é a última mensagem que vais enviar sobre isto
- Recapitula brevemente o que a Beyond Focus faz de diferente: parceiro estratégico (não fornecedor), Portal do Cliente para acompanhamento em tempo real, portfólio desde hotelaria até multinacionais
- Deixa a porta aberta: se algum dia precisarem, basta responder a este email
- Link de agendamento para quem quiser avançar agora: https://calendly.com/beyondfocus-/discovery_call
- Tom: sereno, confiante, sem arrependimento
- Máximo 5 frases
- NÃO uses: "última oportunidade", "não perca", "urgente", "oferta limitada"`;

  const body = await claudeWrite(prompt);

  if (!body) {
    return {
      subject: `${firstName}, esta é a última mensagem`,
      html: `<div style="${BASE_STYLE}"><p>Olá ${firstName},</p><p>Esta é a última mensagem que te envio sobre isto.</p><p>A Beyond Focus trabalha como parceiro estratégico — não como fornecedor. Os nossos clientes têm acesso ao Portal do Cliente para acompanhar cada projecto em tempo real, e o portfólio vai desde hotelaria de referência até multinacionais como a Carl Zeiss.</p><p>Se algum dia o momento for certo, responde a este email ou agenda aqui: <a href="https://calendly.com/beyondfocus-/discovery_call" style="color:#FA8334">cal.com/beyondfocus/conversa</a></p><p>Abraço,<br>Daniel</p>${FOOTER}</div>`,
    };
  }

  return {
    subject: `${firstName}, esta é a última mensagem`,
    html: `<div style="${BASE_STYLE}">${bodyToHtml(body)}${FOOTER}</div>`,
  };
}
