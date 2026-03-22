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
      <main className="bg-bg-light">
        <CaseStudyHero project={project} />
        <CaseStudyBrief project={project} />
        <CaseStudyTwoColVideos project={project} />
        <CaseStudyBodyCopy title={project.bodyCopy1Title} text={project.bodyCopy1Text} />
        <CaseStudyHorizontalGallery project={project} />
        <CaseStudyBodyCopy title={project.bodyCopy2Title} text={project.bodyCopy2Text} />

        {/* CTA */}
        <section className="mx-auto max-w-[1200px] px-6 py-20 text-center md:px-10 lg:px-[60px]">
          <h2 className="text-[clamp(28px,3vw,40px)] font-bold text-petrol">
            Vamos fazer algo diferente?
          </h2>
          <Link
            href="/contacto"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-petrol px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-petrol/90 hover:scale-[1.03]"
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
