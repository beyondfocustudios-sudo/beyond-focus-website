import { BLOG_POSTS } from "@/lib/blog-data";

const SITE_URL = "https://beyondfocus.pt";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function parsePostDate(date: string): string {
  const months: Record<string, string> = {
    Jan: "Jan", Fev: "Feb", Mar: "Mar", Abr: "Apr", Mai: "May", Jun: "Jun",
    Jul: "Jul", Ago: "Aug", Set: "Sep", Out: "Oct", Nov: "Nov", Dez: "Dec",
  };
  const [d, m, y] = date.split(" ");
  const parsed = new Date(`${d} ${months[m] || m} ${y}`);
  return isNaN(parsed.getTime()) ? new Date().toUTCString() : parsed.toUTCString();
}

export async function GET() {
  const items = BLOG_POSTS.map((post) => {
    const url = `${SITE_URL}/blog/${post.slug}`;
    const pubDate = parsePostDate(post.date);
    const imageUrl = post.thumbnail.startsWith("/")
      ? `${SITE_URL}${post.thumbnail}`
      : post.thumbnail;

    return `
    <item>
      <title>${escapeXml(post.metaTitle || post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.metaDescription || post.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <enclosure url="${imageUrl}" type="image/jpeg" length="0" />
      <dc:creator>Daniel Lopes</dc:creator>
    </item>`.trim();
  }).join("\n    ");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog — Beyond Focus</title>
    <link>${SITE_URL}/blog</link>
    <description>Artigos sobre vídeo marketing, produção audiovisual e estratégia de conteúdo para empresas em Portugal.</description>
    <language>pt-PT</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <copyright>Beyond Focus ${new Date().getFullYear()}</copyright>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
