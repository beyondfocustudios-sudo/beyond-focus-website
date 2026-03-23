import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PortfolioGrid } from "@/components/features/portfolio/PortfolioGrid";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Portfolio | Projectos de Produção Audiovisual",
  description:
    "Filmes comerciais, vídeos institucionais, documentários e fotografia. Vê os projectos que criámos para marcas em Portugal.",
  openGraph: {
    title: "Portfolio — Beyond Focus",
    description:
      "Filmes comerciais, vídeos institucionais, documentários e fotografia para marcas em Portugal.",
    url: "https://beyondfocus.pt/portfolio",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Beyond Focus Portfolio" }],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/portfolio",
    languages: { "pt-PT": "https://beyondfocus.pt/portfolio", en: "https://beyondfocus.pt/en/portfolio" },
  },
};

export default function PortfolioPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Portfolio", href: "/portfolio" },
        ]}
      />
      <Navbar variant="light" />
      <main className="min-h-screen bg-bg-light">
        {/* Hero */}
        <section className="mx-auto max-w-[1800px] px-6 pt-[160px] pb-10 md:px-10 lg:px-12">
          <h1 className="max-w-3xl text-[clamp(40px,5.5vw,72px)] font-bold leading-[1.05] tracking-tight text-petrol">
            O nosso trabalho fala por nós.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-petrol/45">
            De filmes comerciais a cobertura de eventos, cada projecto é pensado para criar impacto e contar uma história que ressoa com a audiência.
          </p>
        </section>

        {/* Grid + Filters — Suspense required for useSearchParams */}
        <Suspense>
          <PortfolioGrid />
        </Suspense>

        {/* CTA */}
        <section className="mx-auto max-w-[1800px] px-6 py-28 text-center md:px-10 lg:px-12">
          <h2 className="text-[clamp(28px,3vw,40px)] font-bold text-petrol">
            Tens um projecto em mente?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-petrol/50">
            A primeira conversa é por nossa conta.
          </p>
          <Link
            href="/contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-petrol px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-petrol/90 hover:scale-[1.03]"
          >
            Fala Connosco <span>→</span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
