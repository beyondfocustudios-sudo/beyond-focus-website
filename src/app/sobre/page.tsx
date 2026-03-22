import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { AboutHero } from "@/components/features/about/AboutHero";
import { AboutValues } from "@/components/features/about/AboutValues";
import { AboutFounder } from "@/components/features/about/AboutFounder";

export const metadata: Metadata = {
  title: "Sobre | Quem Somos",
  description: "Produtora audiovisual fundada em Setúbal. Conheça a equipa e a história por trás da Beyond Focus.",
};

export default function SobrePage() {
  return (
    <>
      <Navbar variant="light" />
      <main className="bg-bg-light">
        <AboutHero />
        <AboutFounder />
        <AboutValues />

        {/* CTA */}
        <section className="bg-white py-28 text-center">
          <h2 className="text-[clamp(28px,3vw,40px)] font-bold text-petrol">
            Queres conhecer-nos melhor?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-petrol/50">
            Marca uma conversa. Sem compromisso, sem formalidades.
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
