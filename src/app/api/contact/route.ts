import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  // Log to server for now — replace with email service (Resend, SendGrid, etc.) later
  console.log("=== NEW CONTACT FORM SUBMISSION ===");
  console.log(JSON.stringify(data, null, 2));
  console.log("===================================");

  // TODO: Send email to geral@beyondfocus.pt via Resend/SendGrid
  // Example with Resend:
  // await resend.emails.send({
  //   from: 'Beyond Focus <noreply@beyondfocus.pt>',
  //   to: 'geral@beyondfocus.pt',
  //   subject: `Novo contacto: ${data.name} — ${data.company || 'Sem empresa'}`,
  //   html: `<p><strong>Nome:</strong> ${data.name}</p>
  //          <p><strong>Email:</strong> ${data.email}</p>
  //          <p><strong>Telefone:</strong> ${data.phone}</p>
  //          <p><strong>Empresa:</strong> ${data.company}</p>
  //          <p><strong>Website:</strong> ${data.website}</p>
  //          <p><strong>Serviços:</strong> ${data.services?.join(', ')}</p>
  //          <p><strong>Orçamento:</strong> ${data.budget}</p>
  //          <p><strong>Mensagem:</strong> ${data.message}</p>`,
  // });

  return NextResponse.json({ success: true });
}
