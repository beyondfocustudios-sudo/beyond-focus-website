import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { AboutHero } from "@/components/features/about/AboutHero";
import { AboutValues } from "@/components/features/about/AboutValues";
import { AboutFounder } from "@/components/features/about/AboutFounder";
import { AboutPortal } from "@/components/features/about/AboutPortal";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Sobre | A Nossa História",
  description: "Fundada em 2023 por Daniel Lopes. Produtora audiovisual em Lisboa para marcas que querem mais do que conteúdo — querem resultados.",
  openGraph: {
    title: "Sobre — Beyond Focus",
    description: "Fundada em 2023 por Daniel Lopes. Produtora audiovisual em Lisboa para marcas que querem resultados.",
    url: "https://beyondfocus.pt/sobre",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Beyond Focus — Sobre Nós" }],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/sobre",
    languages: { "pt-PT": "https://beyondfocus.pt/sobre", en: "https://beyondfocus.pt/en/about" },
  },
};

export default function SobrePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Sobre", href: "/sobre" },
        ]}
      />
      <Navbar variant="light" />
      <main className="bg-bg-light">
        <AboutHero />
        <AboutFounder />
        <AboutValues />
        <AboutPortal />

        {/* Portfolio link */}
        <section className="mx-auto max-w-[1440px] px-6 pb-10 text-center md:px-10 lg:px-[60px]">
          <Link
            href="/portfolio"
            className="text-sm font-medium text-petrol underline underline-offset-4 transition-colors hover:text-orange"
          >
            Ver o nosso portfolio →
          </Link>
        </section>

        {/* CTA */}
        <section className="bg-white py-28 text-center">
          <h2 className="text-[clamp(28px,3vw,40px)] font-bold text-petrol">
            Queres conhecer-nos melhor?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-petrol/50">
            A primeira conversa é por nossa conta. Sem compromisso, sem pressão — só para perceber se faz sentido trabalharmos juntos.
          </p>
          <Link
            href="/contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-petrol px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-petrol/90 hover:scale-[1.03]"
          >
            Marca uma conversa <span>→</span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
