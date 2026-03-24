import { NextResponse } from "next/server";

const KEY = "beyondfocus2026indexnow";
const HOST = "beyondfocus.pt";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/portfolio`,
  `https://${HOST}/servicos`,
  `https://${HOST}/sobre`,
  `https://${HOST}/contacto`,
  `https://${HOST}/blog`,
  `https://${HOST}/portal-cliente`,
  // Portfolio
  `https://${HOST}/portfolio/hotel-casa-palmela`,
  `https://${HOST}/portfolio/carl-zeiss-portugal`,
  `https://${HOST}/portfolio/amoretti-lux`,
  `https://${HOST}/portfolio/highgate`,
  `https://${HOST}/portfolio/soce-mauro-loureiro`,
  `https://${HOST}/portfolio/once-upon-a-house`,
  // Services
  `https://${HOST}/servicos/filmes-comerciais`,
  `https://${HOST}/servicos/videos-institucionais`,
  `https://${HOST}/servicos/documentarios`,
  `https://${HOST}/servicos/redes-sociais`,
  `https://${HOST}/servicos/fotografia`,
  `https://${HOST}/servicos/eventos`,
  `https://${HOST}/servicos/estrategia`,
];

export async function POST() {
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: URLS,
      }),
    });

    if (res.ok || res.status === 202) {
      return NextResponse.json({ success: true, submitted: URLS.length });
    }

    return NextResponse.json({ success: false, status: res.status }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ key: KEY, keyLocation: KEY_LOCATION, urls: URLS.length });
}
