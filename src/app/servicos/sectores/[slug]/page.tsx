import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { PROJECTS } from "@/lib/portfolio-data";
import { SECTOR_PAGES, getSectorPage } from "@/lib/sectors-data";
import { SectorPageContent } from "./SectorPageContent";

export function generateStaticParams() {
  return SECTOR_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSectorPage(slug);
  if (!sector) return {};
  return {
    title: sector.metaTitle,
    description: sector.metaDescription,
    keywords: sector.keywords,
    openGraph: {
      title: sector.metaTitle,
      description: sector.metaDescription,
      url: `https://beyondfocus.pt/servicos/sectores/${slug}`,
    },
    alternates: {
      canonical: `https://beyondfocus.pt/servicos/sectores/${slug}`,
    },
  };
}

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = getSectorPage(slug);
  if (!sector) notFound();

  const caseStudies = sector.caseStudySlugs
    .map((s) => PROJECTS.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", href: "/" },
          { name: "Serviços", href: "/servicos" },
          { name: "Sectores", href: "/servicos" },
          { name: sector.title, href: `/servicos/sectores/${slug}` },
        ]}
      />
      <FAQSchema items={sector.faq} />
      <Navbar variant="light" />
      <main>
        <SectorPageContent sector={sector} caseStudies={caseStudies} />
      </main>
      <Footer />
    </>
  );
}
