import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CaseStudyHero } from "@/components/features/case-study/CaseStudyHero";
import { CaseStudyBrief } from "@/components/features/case-study/CaseStudyBrief";
import { CaseStudyBodyCopy } from "@/components/features/case-study/CaseStudyBodyCopy";
import { CaseStudyHorizontalGallery } from "@/components/features/case-study/CaseStudyHorizontalGallery";
import { CaseStudyNextProjects } from "@/components/features/case-study/CaseStudyNextProjects";
import { getProject, getNextProjects, PROJECTS } from "@/lib/portfolio-data";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const PROJECT_SERVICE_MAP: Record<string, { label: string; href: string }> = {
  "hotel-casa-palmela": { label: "Filmes Comerciais", href: "/servicos/filmes-comerciais" },
  "carl-zeiss-portugal": { label: "Vídeos Institucionais", href: "/servicos/videos-institucionais" },
  "amoretti-lux": { label: "Fotografia", href: "/servicos/fotografia" },
  "highgate": { label: "Eventos", href: "/servicos/eventos" },
  "soce-mauro-loureiro": { label: "Filmes Comerciais", href: "/servicos/filmes-comerciais" },
  "once-upon-a-house": { label: "Fotografia", href: "/servicos/fotografia" },
};

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.client}`,
    description: project.briefText.slice(0, 155) + "...",
    openGraph: {
      title: `${project.title} — Beyond Focus`,
      description: project.briefText.slice(0, 155) + "...",
      url: `https://beyondfocus.pt/portfolio/${slug}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: project.title }],
    },
    alternates: {
      canonical: `https://beyondfocus.pt/portfolio/${slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const nextProjects = getNextProjects(slug);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Portfolio", href: "/portfolio" },
          { name: project.title, href: `/portfolio/${slug}` },
        ]}
      />
      <Navbar variant="light" />
      <main className="bg-white">
        <CaseStudyHero project={project} />
        <CaseStudyBrief project={project} />
        <CaseStudyBodyCopy title={project.bodyCopy1Title} text={project.bodyCopy1Text} />
        <CaseStudyHorizontalGallery project={project} />
        <CaseStudyBodyCopy title={project.bodyCopy2Title} text={project.bodyCopy2Text} />

        {/* Related Service */}
        {PROJECT_SERVICE_MAP[slug] && (
          <section className="mx-auto max-w-[1800px] px-6 py-10 text-center md:px-10 lg:px-[60px]">
            <p className="text-sm text-petrol/40">
              Este projecto enquadra-se no nosso serviço de{" "}
              <Link
                href={PROJECT_SERVICE_MAP[slug].href}
                className="font-medium text-orange underline underline-offset-2 hover:text-orange/80"
              >
                {PROJECT_SERVICE_MAP[slug].label}
              </Link>
            </p>
          </section>
        )}

        {/* CTA */}
        <section className="py-[200px] text-center max-md:py-[100px]">
          <h2 className="mx-auto max-w-2xl px-6 text-[clamp(28px,3.5vw,48px)] font-bold leading-[1.15] text-petrol max-md:text-[28px]">
            Vamos criar algo que faça a diferença.
          </h2>
          <p className="mt-4 text-base text-petrol/40">
            A primeira conversa é por nossa conta.
          </p>
          <Link
            href="/contacto"
            data-cursor="hover-link"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-petrol px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-petrol/90 hover:scale-[1.03] active:scale-[0.97]"
          >
            Fala Connosco <span>→</span>
          </Link>
        </section>

        <CaseStudyNextProjects projects={nextProjects} />
      </main>
      <Footer />
    </>
  );
}
