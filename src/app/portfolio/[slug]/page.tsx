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
    description: project.briefText,
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
      <Navbar variant="light" />
      <main className="bg-white">
        <CaseStudyHero project={project} />
        <CaseStudyBrief project={project} />
        <CaseStudyBodyCopy title={project.bodyCopy1Title} text={project.bodyCopy1Text} />
        <CaseStudyHorizontalGallery project={project} />
        <CaseStudyBodyCopy title={project.bodyCopy2Title} text={project.bodyCopy2Text} />

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
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-petrol px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-petrol/90 hover:scale-[1.03]"
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
