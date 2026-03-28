import { NextResponse } from "next/server";

const VALID_STATUSES = ["confirmed", "declined", "rescheduled"];

async function updateCallStatus(id: string, status: string): Promise<boolean> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return false;

  const res = await fetch(
    `${supabaseUrl}/rest/v1/calls?id=eq.${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({ status, responded_at: new Date().toISOString() }),
    }
  );
  return res.ok;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const status = searchParams.get("status");

  if (!id || !status || !VALID_STATUSES.includes(status)) {
    return new Response("Link inválido.", { status: 400, headers: { "Content-Type": "text/plain" } });
  }

  const ok = await updateCallStatus(id, status);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://beyondfocus.pt";

  const messages: Record<string, { title: string; body: string }> = {
    confirmed: {
      title: "Reunião confirmada",
      body: "Perfeito. Até lá.",
    },
    declined: {
      title: "Reunião cancelada",
      body: "Recebido. Se quiseres reagendar, responde a este email ou usa o link de agendamento.",
    },
    rescheduled: {
      title: "Pedido de reagendamento recebido",
      body: "Recebido. Entraremos em contacto para confirmar nova data.",
    },
  };

  const msg = messages[status];

  const html = `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${msg.title} — Beyond Focus</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #fafafa; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .card { background: #fff; border: 1px solid #eee; padding: 48px 40px; max-width: 400px; text-align: center; }
    h1 { font-size: 22px; margin: 0 0 12px; }
    p { color: #555; margin: 0 0 24px; }
    a { color: #000; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${msg.title}</h1>
    <p>${msg.body}</p>
    <a href="${baseUrl}">beyondfocus.pt</a>
  </div>
</body>
</html>`;

  if (!ok) {
    // Ainda mostrar página de sucesso — link pode ter sido clicado duas vezes
    return new Response(html, { status: 200, headers: { "Content-Type": "text/html" } });
  }

  return new Response(html, { status: 200, headers: { "Content-Type": "text/html" } });
}
