import { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/portfolio-data";
import { SERVICE_PAGES } from "@/lib/services-data";
import { SECTOR_PAGES } from "@/lib/sectors-data";
import { BLOG_POSTS } from "@/lib/blog-data";
import { CITIES, SERVICES_SEO, HIGH_INTENT_COMBINATIONS } from "@/lib/programmatic-seo-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://beyondfocus.pt";

  const projectUrls = PROJECTS.map((p) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    lastModified: "2025-10-01",
    changeFrequency: "monthly" as const,
    priority: 0.8 as const,
  }));

  const serviceUrls = SERVICE_PAGES.map((s) => ({
    url: `${baseUrl}/servicos/${s.slug}`,
    lastModified: "2025-10-01",
    changeFrequency: "monthly" as const,
    priority: 0.7 as const,
  }));

  const sectorUrls = SECTOR_PAGES.map((s) => ({
    url: `${baseUrl}/servicos/sectores/${s.slug}`,
    lastModified: "2025-10-01",
    changeFrequency: "monthly" as const,
    priority: 0.7 as const,
  }));

  const blogUrls = BLOG_POSTS.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: "2026-03-28",
    changeFrequency: "monthly" as const,
    priority: 0.6 as const,
  }));

  const regionalUrls = [
    { url: `${baseUrl}/servicos/brand-film`, lastModified: "2025-10-01", changeFrequency: "monthly" as const, priority: 0.8 as const },
    { url: `${baseUrl}/servicos/regioes/porto`, lastModified: "2026-03-28", changeFrequency: "monthly" as const, priority: 0.7 as const },
    { url: `${baseUrl}/servicos/regioes/setubal`, lastModified: "2025-10-01", changeFrequency: "monthly" as const, priority: 0.7 as const },
    { url: `${baseUrl}/servicos/regioes/alentejo`, lastModified: "2025-10-01", changeFrequency: "monthly" as const, priority: 0.7 as const },
    { url: `${baseUrl}/servicos/regioes/algarve`, lastModified: "2025-10-01", changeFrequency: "monthly" as const, priority: 0.7 as const },
  ];

  const pseoServiceCityUrls = SERVICES_SEO.flatMap((service) =>
    CITIES.map((city) => ({
      url: `${baseUrl}/servicos/pseo/${service.slug}/${city.slug}`,
      lastModified: "2026-03-28",
      changeFrequency: "monthly" as const,
      priority: 0.65 as const,
    }))
  );

  const pseoTripleUrls = HIGH_INTENT_COMBINATIONS.map((combo) => ({
    url: `${baseUrl}/servicos/pseo/${combo.service}/${combo.city}/${combo.sector}`,
    lastModified: "2025-10-01",
    changeFrequency: "monthly" as const,
    priority: 0.6 as const,
  }));

  return [
    { url: baseUrl, lastModified: "2026-03-28", changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/portfolio`, lastModified: "2026-03-28", changeFrequency: "weekly", priority: 0.9 },
    ...projectUrls,
    {
      url: `${baseUrl}/portfolio/hotel-casa-palmela/case-study`,
      lastModified: "2025-10-01",
      changeFrequency: "monthly" as const,
      priority: 0.7 as const,
    },
    {
      url: `${baseUrl}/portfolio/carl-zeiss-portugal/case-study`,
      lastModified: "2025-10-01",
      changeFrequency: "monthly" as const,
      priority: 0.7 as const,
    },
    {
      url: `${baseUrl}/portfolio/once-upon-a-house/case-study`,
      lastModified: "2025-10-01",
      changeFrequency: "monthly" as const,
      priority: 0.7 as const,
    },
    { url: `${baseUrl}/servicos`, lastModified: "2025-10-01", changeFrequency: "monthly", priority: 0.8 },
    ...serviceUrls,
    ...sectorUrls,
    ...regionalUrls,
    ...pseoServiceCityUrls,
    ...pseoTripleUrls,
    { url: `${baseUrl}/hotelaria`, lastModified: "2026-03-28", changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/simulador-orcamento`, lastModified: "2026-03-27", changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/guia-precos-video`, lastModified: "2026-03-28", changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/portal-cliente`, lastModified: "2025-10-01", changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/sobre`, lastModified: "2025-10-01", changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/sobre/daniel-lopes`, lastModified: "2026-03-28", changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contacto`, lastModified: "2025-10-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: "2026-03-28", changeFrequency: "weekly", priority: 0.7 },
    ...blogUrls,
    { url: `${baseUrl}/guia-video-empresas`, lastModified: "2025-10-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/comparar-produtoras`, lastModified: "2026-03-27", changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacidade`, lastModified: "2024-01-01", changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/termos`, lastModified: "2024-01-01", changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/en`, lastModified: "2026-03-28", changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/en/portfolio`, lastModified: "2026-03-28", changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/en/services`, lastModified: "2026-03-28", changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/en/about`, lastModified: "2026-03-28", changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/en/contact`, lastModified: "2026-03-28", changeFrequency: "monthly", priority: 0.7 },
  ];
}
