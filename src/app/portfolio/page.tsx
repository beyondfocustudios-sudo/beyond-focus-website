import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PortfolioGrid } from "@/components/features/portfolio/PortfolioGrid";

export default function PortfolioPage() {
  return (
    <>
      <Navbar variant="light" />
      <main className="bg-bg-light min-h-screen">
        {/* Hero */}
        <section className="mx-auto max-w-[1200px] px-6 pt-[160px] pb-16 md:px-10 lg:px-12">
          <div className="grid items-end gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
            {/* Left — Title */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[3px] text-orange">
                PORTFOLIO
              </p>
              <h1 className="mt-3 text-[clamp(36px,5vw,64px)] font-bold leading-[1.1] tracking-tight text-petrol">
                O trabalho que fazemos é a nossa melhor apresentação.
              </h1>
            </div>
            {/* Right — Paragraph */}
            <div>
              <p className="text-base leading-relaxed text-petrol/50">
                De filmes comerciais a cobertura de eventos, cada projecto é pensado para criar impacto e contar uma história que ressoa com a audiência.
              </p>
              <Link
                href="/contacto"
                className="mt-4 inline-block text-sm font-medium text-petrol underline underline-offset-4 transition-colors hover:text-orange"
              >
                Fala connosco ↗
              </Link>
            </div>
          </div>
        </section>

        {/* Grid + Filters */}
        <PortfolioGrid />

        {/* CTA */}
        <section className="mx-auto max-w-[1200px] px-6 py-28 text-center md:px-10 lg:px-12">
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
