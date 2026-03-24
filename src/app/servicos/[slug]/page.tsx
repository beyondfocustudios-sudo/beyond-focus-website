import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ServicePageContent } from "@/components/features/services/ServicePageContent";
import { getServicePage, SERVICE_PAGES } from "@/lib/services-data";
import { PROJECTS } from "@/lib/portfolio-data";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://beyondfocus.pt/servicos/${slug}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: service.title }],
    },
    alternates: {
      canonical: `https://beyondfocus.pt/servicos/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServicePage(slug);
  if (!service) notFound();

  const relatedProjects = service.relatedSlugs
    .map((s) => PROJECTS.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Serviços", href: "/servicos" },
          { name: service.title, href: `/servicos/${slug}` },
        ]}
      />
      <ServiceSchema
        name={service.title}
        description={service.metaDescription}
        slug={slug}
        image={service.image}
      />
      {service.faq && service.faq.length > 0 && (
        <FAQSchema items={service.faq} />
      )}
      <Navbar />
      <main>
        <ServicePageContent service={service} relatedProjects={relatedProjects} />
      </main>
      <Footer />
    </>
  );
}
