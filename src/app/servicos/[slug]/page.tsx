import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ServicePageContent } from "@/components/features/services/ServicePageContent";
import { getServicePage, SERVICE_PAGES } from "@/lib/services-data";
import { PROJECTS } from "@/lib/portfolio-data";

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
      <Navbar />
      <main>
        <ServicePageContent service={service} relatedProjects={relatedProjects} />
      </main>
      <Footer />
    </>
  );
}
