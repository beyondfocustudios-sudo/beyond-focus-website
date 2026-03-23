import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { AboutHero } from "@/components/features/about/AboutHero";
import { AboutValues } from "@/components/features/about/AboutValues";
import { AboutFounder } from "@/components/features/about/AboutFounder";
import { AboutPortal } from "@/components/features/about/AboutPortal";

export const metadata: Metadata = {
  title: "Sobre | A Nossa História",
  description: "Fundada em 2023 por Daniel Lopes em Setúbal. Produtora audiovisual para marcas que querem mais do que conteúdo — querem resultados.",
};

export default function SobrePage() {
  return (
    <>
      <Navbar variant="light" />
      <main className="bg-bg-light">
        <AboutHero />
        <AboutFounder />
        <AboutValues />
        <AboutPortal />

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
