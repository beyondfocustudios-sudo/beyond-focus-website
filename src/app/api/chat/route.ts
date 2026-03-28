import Anthropic from "@anthropic-ai/sdk";
import { rateLimit } from "@/lib/rate-limit";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Tu és o assistente virtual da Beyond Focus, produtora audiovisual em Lisboa.

SOBRE NÓS:
- Produtora audiovisual fundada por Daniel Lopes
- Serviços: filmes comerciais, vídeos institucionais, conteúdo redes sociais, fotografia, eventos, brand films
- Operamos em todo o Portugal (Lisboa, Porto, Algarve, Setúbal, etc.)
- Diferenciador: Portal do Cliente exclusivo — nenhuma outra produtora em Portugal tem
- Processo: briefing → tratamento criativo → produção → pós-produção → entrega via portal

PREÇOS (dar apenas RANGES, nunca valores exactos):
- Vídeo institucional: €1.500 — €7.000
- Filme comercial: €3.000 — €15.000
- Conteúdo mensal redes sociais: €800 — €2.500/mês
- Fotografia: €500 — €3.000
- Cobertura eventos: €550 — €3.000
- Brand film: €5.000 — €15.000+

REGRAS:
- Responde SEMPRE em PT-PT (Português Europeu)
- Nunca dizer "premium" — dizer "diferenciado" ou "de alto valor"
- Máximo 3 frases por resposta (curto e directo)
- Se a pergunta é sobre preço exacto: "Os valores dependem do projecto. Posso ajudar-te a pedir um orçamento personalizado?"
- Se o visitante parece interessado (pede preço, menciona projecto): sugere "Quer que preparemos um orçamento? Só preciso do seu nome e email."
- Se pergunta algo que não sabes: "Essa é uma boa pergunta para o Daniel. Posso encaminhá-lo?"
- Sê profissional mas acessível. Não uses emojis excessivos.`;

export const runtime = "edge";

export async function POST(request: Request) {
  if (!rateLimit(request, { limit: 10, windowMs: 60_000 })) {
    return new Response(
      JSON.stringify({ error: "Demasiados pedidos. Tenta novamente em breve." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { message: string; history: Array<{ role: string; content: string }> };
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Pedido inválido." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { message, history = [] } = body;
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return new Response(
      JSON.stringify({ error: "Mensagem vazia." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const sanitizedMessage = message.slice(0, 1000);

  const messages: Anthropic.MessageParam[] = [
    ...history
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-10)
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: String(m.content).slice(0, 500),
      })),
    { role: "user", content: sanitizedMessage },
  ];

  const stream = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 300,
    system: SYSTEM_PROMPT,
    messages,
    stream: true,
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text));
        }
        if (event.type === "message_stop") {
          controller.close();
        }
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
