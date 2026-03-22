import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CaseStudyHero } from "@/components/features/case-study/CaseStudyHero";
import { CaseStudyBrief } from "@/components/features/case-study/CaseStudyBrief";
import { CaseStudyBodyCopy } from "@/components/features/case-study/CaseStudyBodyCopy";
import { CaseStudyTwoColVideos } from "@/components/features/case-study/CaseStudyTwoColVideos";
import { CaseStudyHorizontalGallery } from "@/components/features/case-study/CaseStudyHorizontalGallery";
import { CaseStudyNextProjects } from "@/components/features/case-study/CaseStudyNextProjects";
import { getProject, getNextProjects, PROJECTS } from "@/lib/portfolio-data";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
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
      <Navbar />
      <main className="bg-black">
        <CaseStudyHero project={project} />
        <CaseStudyBrief project={project} />
        <CaseStudyTwoColVideos project={project} />
        <CaseStudyBodyCopy title={project.bodyCopy1Title} text={project.bodyCopy1Text} />
        <CaseStudyHorizontalGallery project={project} />
        <CaseStudyBodyCopy title={project.bodyCopy2Title} text={project.bodyCopy2Text} />
        <CaseStudyTwoColVideos project={project} />

        {/* CTA — Fortem style */}
        <section className="py-[200px] text-center max-md:py-[100px]">
          <h2 className="mx-auto max-w-2xl px-6 text-[40px] font-medium italic leading-[1.2] text-white max-md:text-[28px]">
            Vamos fazer algo diferente...
          </h2>
          <Link
            href="/contacto"
            data-cursor="hover-link"
            className="mt-6 inline-block font-mono text-[15px] uppercase text-white underline underline-offset-4 transition-colors hover:text-orange"
          >
            Fala Connosco
          </Link>
        </section>

        <CaseStudyNextProjects projects={nextProjects} />
      </main>
      <Footer />
    </>
  );
}
