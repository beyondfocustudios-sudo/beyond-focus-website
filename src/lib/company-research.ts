// Pesquisa automática de empresa antes de enviar nurture personalizado
// Fontes: website fornecido → domínio do email → fallback sem dados

export interface CompanyResearch {
  companyName: string;
  website: string | null;
  description: string;       // tagline / meta description
  whatTheyDo: string;        // texto extraído do site
  hasData: boolean;          // se encontrámos dados úteis
}

function extractDomain(email: string): string | null {
  const match = email.match(/@([^.]+\.[a-z]{2,})$/i);
  if (!match) return null;
  const domain = match[1].toLowerCase();
  // Ignorar providers genéricos
  const generic = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "sapo.pt", "iol.pt", "live.com"];
  if (generic.includes(domain)) return null;
  return domain;
}

function cleanText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#\d+;/g, "")
    .trim();
}

function extractMeta(html: string, name: string): string {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, "i"),
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m?.[1]) return m[1].trim();
  }
  return "";
}

function extractTitle(html: string): string {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m?.[1]?.trim() || "";
}

function extractVisibleText(html: string, maxChars = 1200): string {
  // Extrair texto dos elementos principais — ignora nav/footer/scripts
  const mainContent = html
    .replace(/<(nav|footer|header|aside|script|style|noscript)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<(h[1-6]|p|li|td|div|span)[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "");

  const cleaned = mainContent
    .split("\n")
    .map(l => l.trim())
    .filter(l => l.length > 20)
    .join(" ")
    .replace(/\s+/g, " ")
    .slice(0, maxChars);

  return cleaned;
}

async function fetchSite(url: string, timeoutMs = 6000): Promise<string | null> {
  if (!url.startsWith("http")) url = "https://" + url;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; BeyondFocusBot/1.0)" },
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("html")) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export async function researchCompany(data: {
  company?: string;
  website?: string;
  email: string;
}): Promise<CompanyResearch> {
  const { company, website, email } = data;

  // Determinar URL a pesquisar
  let targetUrl = website || null;
  if (!targetUrl) {
    const domain = extractDomain(email);
    if (domain) targetUrl = domain;
  }

  if (!targetUrl) {
    return {
      companyName: company || "",
      website: null,
      description: "",
      whatTheyDo: "",
      hasData: false,
    };
  }

  const html = await fetchSite(targetUrl);
  if (!html) {
    return {
      companyName: company || "",
      website: targetUrl,
      description: "",
      whatTheyDo: "",
      hasData: false,
    };
  }

  const title = extractTitle(html);
  const metaDescription = extractMeta(html, "description");
  const ogDescription = extractMeta(html, "og:description");
  const visibleText = extractVisibleText(html);

  const description = metaDescription || ogDescription || title;
  const whatTheyDo = visibleText;

  return {
    companyName: company || title.split("|")[0].split("–")[0].split("-")[0].trim(),
    website: targetUrl,
    description,
    whatTheyDo,
    hasData: !!(description || whatTheyDo),
  };
}
