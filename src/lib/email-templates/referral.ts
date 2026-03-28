const FOOTER = `<p style="color:#999;font-size:13px;margin-top:40px;border-top:1px solid #eee;padding-top:20px">Daniel Lopes · <a href="https://beyondfocus.pt" style="color:#999">beyondfocus.pt</a> · <a href="mailto:daniel@beyondfocus.pt" style="color:#999">daniel@beyondfocus.pt</a></p>`;

export function generateReferralEmail(params: {
  name: string;
  code: string;
}): { subject: string; html: string } {
  const firstName = params.name.split(" ")[0];
  const link = `https://beyondfocus.pt/referral/${params.code}`;

  const subject = `${firstName}, conheces alguém que precise de vídeo profissional?`;

  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 20px;color:#222;font-size:15px;line-height:1.8">
      <div style="background:#0E3A45;padding:32px;border-radius:12px;margin-bottom:32px">
        <p style="color:#FA8334;font-size:12px;font-family:monospace;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px">Beyond Focus</p>
        <h1 style="color:#fff;font-size:24px;margin:0;line-height:1.3">Tens alguém em mente?</h1>
      </div>

      <p>${firstName},</p>

      <p>Trabalhámos juntos e isso significa muito para nós. Se conheces uma empresa ou marca que precise de vídeo profissional, o teu link dá-lhes 10% de desconto — e tu recebes 10% também sobre o valor do projecto.</p>

      <p>Sem complicações. Partilhas o link, eles contactam-nos através dele, e nós tratamos do resto.</p>

      <div style="text-align:center;margin:40px 0">
        <a href="${link}" style="background:#FA8334;color:#fff;text-decoration:none;padding:16px 36px;border-radius:100px;font-size:15px;font-weight:600;display:inline-block">
          Partilhar o meu link →
        </a>
      </div>

      <p style="font-size:13px;color:#888;background:#F5F5F5;padding:12px 16px;border-radius:8px;word-break:break-all">
        ${link}
      </p>

      <p>Abraço,<br>Daniel</p>

      ${FOOTER}
    </div>
  `;

  return { subject, html };
}
