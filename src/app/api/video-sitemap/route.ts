import { NextResponse } from "next/server";
import { PROJECTS } from "@/lib/portfolio-data";

const BASE = "https://beyondfocus.pt";

export async function GET() {
  const videos = PROJECTS.filter((p) => p.video);

  const entries = videos
    .map(
      (p) => `
  <url>
    <loc>${BASE}/portfolio/${p.slug}</loc>
    <video:video>
      <video:thumbnail_loc>${BASE}${p.thumbnail}</video:thumbnail_loc>
      <video:title><![CDATA[${p.title} — Beyond Focus]]></video:title>
      <video:description><![CDATA[${p.briefText.slice(0, 200)}]]></video:description>
      <video:content_loc>${BASE}${p.video}</video:content_loc>
      <video:publication_date>2024-01-01</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
${entries}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
