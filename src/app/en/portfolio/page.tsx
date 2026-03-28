import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PROJECTS } from "@/lib/portfolio-data";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Portfolio | Audiovisual Production Projects",
  description: "Commercial films, corporate videos, documentaries and photography. See the projects we have created for brands in Portugal.",
  openGraph: {
    locale: "en_GB",
    type: "website",
    title: "Portfolio — Beyond Focus",
    description: "Commercial films, corporate videos, documentaries and photography for brands in Portugal.",
    url: "https://beyondfocus.pt/en/portfolio",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Beyond Focus Portfolio" }],
  },
  alternates: { canonical: "https://beyondfocus.pt/en/portfolio", languages: { "pt-PT": "https://beyondfocus.pt/portfolio", en: "https://beyondfocus.pt/en/portfolio" } },
};

export default function EnPortfolioPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/en" }, { name: "Portfolio", href: "/en/portfolio" }]} />
      <Navbar variant="light" locale="en" />
      <main className="min-h-screen bg-bg-light">
        <section className="mx-auto max-w-[1800px] px-6 pt-[160px] pb-10 md:px-10 lg:px-12">
          <h1 className="max-w-3xl text-[clamp(40px,5.5vw,72px)] font-bold leading-[1.05] tracking-tight text-petrol">
            Our work speaks for itself.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-petrol/45">
            From commercial films to event coverage, every project is designed to create impact.
          </p>
        </section>
        <section className="mx-auto max-w-[1800px] px-6 pb-20 md:px-10 lg:px-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
                  <Image src={p.thumbnail} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 p-5">
                    <span className="font-mono text-[10px] uppercase tracking-[2px] text-orange">{p.category}</span>
                    <p className="mt-1 text-lg font-semibold text-white">{p.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-[1800px] px-6 py-28 text-center md:px-10 lg:px-12">
          <h2 className="text-[clamp(28px,3vw,40px)] font-bold text-petrol">Have a project in mind?</h2>
          <Link href="/en/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-petrol px-8 py-4 text-base font-semibold text-white hover:bg-petrol/90 active:scale-[0.97]">
            Let&apos;s Talk <span>→</span>
          </Link>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
