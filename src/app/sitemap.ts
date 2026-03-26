import { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/portfolio-data";
import { SERVICE_PAGES } from "@/lib/services-data";
import { SECTOR_PAGES } from "@/lib/sectors-data";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://beyondfocus.pt";

  const projectUrls = PROJECTS.map((p) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8 as const,
  }));

  const serviceUrls = SERVICE_PAGES.map((s) => ({
    url: `${baseUrl}/servicos/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7 as const,
  }));

  const sectorUrls = SECTOR_PAGES.map((s) => ({
    url: `${baseUrl}/servicos/sectores/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7 as const,
  }));

  const blogUrls = BLOG_POSTS.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6 as const,
  }));

  const regionalUrls = [
    { url: `${baseUrl}/servicos/brand-film`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 as const },
    { url: `${baseUrl}/servicos/regioes/setubal`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 as const },
    { url: `${baseUrl}/servicos/regioes/alentejo`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 as const },
    { url: `${baseUrl}/servicos/regioes/algarve`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 as const },
  ];

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...projectUrls,
    { url: `${baseUrl}/servicos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...serviceUrls,
    ...sectorUrls,
    ...regionalUrls,
    { url: `${baseUrl}/portal-cliente`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/sobre`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...blogUrls,
    { url: `${baseUrl}/privacidade`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/termos`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    // English pages
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/en/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/en/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/en/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/en/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
