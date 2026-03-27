import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Case Study: Once Upon Lisboa — Fotografia de Lançamento com Nota 10/10 | Beyond Focus",
  description:
    "Como entregámos o portfólio fotográfico completo para o lançamento do Once Upon Lisboa (Small Luxury Hotels) em Setembro 2025 — nota 10/10, abertura com todas as OTAs cobertas e transparência total no processo.",
  openGraph: {
    title: "Case Study: Once Upon Lisboa — Beyond Focus",
    description:
      "Fotografia de lançamento para hotel boutique em Lisboa: nota 10/10, abertura com portfólio completo em todas as OTAs no primeiro dia.",
    url: "https://beyondfocus.pt/portfolio/once-upon-a-house/case-study",
    images: [
      {
        url: "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-01.jpg",
        width: 1200,
        height: 630,
        alt: "Once Upon Lisboa — Beyond Focus",
      },
    ],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/portfolio/once-upon-a-house/case-study",
  },
};

const METRICS = [
  { value: "10/10", label: "avaliação do cliente" },
  { value: "2", label: "sessões fotográficas completas" },
  { value: "Dia 1", label: "abertura com OTAs cobertas" },
];

const RESULTS = [
  "Nota 10/10 atribuída pelo cliente",
  "Hotel abriu em Setembro 2025 com portfólio fotográfico completo",
  "Listagens em todas as OTAs com fotografia profissional no primeiro dia de abertura",
  "Entrega optimizada por plataforma: horizontal para Booking/Expedia, vertical para Instagram",
  "Segunda sessão realizada sem custo adicional após revisão de briefing — transparência assumida",
];

const GALLERY = [
  "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-01.jpg",
  "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-02.jpg",
  "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-03.jpg",
  "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-04.jpg",
  "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-05.jpg",
  "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-06.jpg",
  "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-07.jpg",
  "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-08.jpg",
  "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-09.jpg",
  "/images/portfolio/gallery/once-upon-a-house/oul-v3-010.jpg",
  "/images/portfolio/gallery/once-upon-a-house/oul-v3-010b.jpg",
  "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-46.jpg",
];

export default function OnceUponCaseStudyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Portfolio", href: "/portfolio" },
          { name: "Once Upon Lisboa", href: "/portfolio/once-upon-a-house" },
          { name: "Case Study", href: "/portfolio/once-upon-a-house/case-study" },
        ]}
      />
      <Navbar variant="light" />
      <main className="bg-white">
        {/* Hero */}
        <section className="mx-auto max-w-[1200px] px-6 pt-[180px] pb-16 md:px-10 lg:px-[60px]">
          <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
            Fotografia · Hotelaria · 2025
          </p>
          <h1 className="mt-4 max-w-[800px] text-[clamp(36px,4.5vw,60px)] font-bold leading-[1.05] tracking-tight text-petrol">
            Once Upon Lisboa
          </h1>
          <p className="mt-4 max-w-[560px] text-lg leading-relaxed text-petrol/60">
            Portfólio fotográfico completo para o lançamento de um novo hotel boutique em Lisboa — entregue a tempo, com nota 10/10 e um exemplo de como se resolve um problema com transparência.
          </p>
        </section>

        {/* Hero image */}
        <section className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-[60px]">
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ aspectRatio: "16/9" }}
          >
            <Image
              src="/images/portfolio/gallery/once-upon-a-house/oul-sessao2-01.jpg"
              alt="Once Upon Lisboa — fotografia de lançamento"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Metrics */}
        <section className="bg-petrol mt-16 py-16">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-[60px]">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {METRICS.map((m) => (
                <div key={m.value} className="text-center md:text-left">
                  <p className="text-[clamp(40px,5vw,64px)] font-bold leading-none text-orange">
                    {m.value}
                  </p>
                  <p className="mt-2 text-base text-white/60">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenge + Solution */}
        <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 lg:px-[60px]">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">O desafio</p>
              <h2 className="mt-4 text-[clamp(26px,3vw,36px)] font-bold leading-tight text-petrol">
                Lançar um hotel sem imagens — com prazo de abertura fixo em Setembro 2025.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-petrol/60">
                O Once Upon Lisboa — novo hotel boutique em Lisboa pertencente ao mesmo grupo do Hotel Casa Palmela, integrado no programa Small Luxury Hotels — precisava de fotografia profissional para o lançamento. O hotel abria em Setembro de 2025 e não havia margem: website, plataformas de booking e redes sociais tinham de estar prontos no primeiro dia. Confiaram em nós pela experiência positiva anterior com o Casa Palmela. O prazo era curto e o volume de entregáveis era significativo.
              </p>
            </div>
            <div>
              <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">A solução</p>
              <h2 className="mt-4 text-[clamp(26px,3vw,36px)] font-bold leading-tight text-petrol">
                Duas sessões. Entrega optimizada por plataforma. Transparência total.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-petrol/60">
                Realizámos duas sessões fotográficas completas — quartos, áreas comuns, detalhes de decoração e vistas. Após a aprovação inicial, o CEO do grupo solicitou uma abordagem visual diferente. Em vez de cobrar uma nova sessão, assumimos que o briefing podia ter sido mais aprofundado da nossa parte, cobrimos os custos e entregámos a segunda sessão com uma equipa diferente e o resultado exacto que era pretendido. A entrega foi optimizada por plataforma: rácio horizontal para Booking e Expedia, vertical para Instagram e stories.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {GALLERY.length > 0 && (
          <section className="mx-auto max-w-[1200px] px-6 pb-12 md:px-10 lg:px-[60px]">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {GALLERY.map((src, i) => (
                <div
                  key={src}
                  className="relative overflow-hidden rounded-xl"
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image
                    src={src}
                    alt={`Once Upon Lisboa — fotografia ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Results */}
        <section className="bg-bg-light py-20">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-[60px]">
            <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">Resultados</p>
            <h2 className="mt-4 text-[clamp(26px,3vw,36px)] font-bold text-petrol">O que aconteceu depois.</h2>
            <ul className="mt-8 space-y-4">
              {RESULTS.map((r) => (
                <li key={r} className="flex items-start gap-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange" />
                  <p className="text-base leading-relaxed text-petrol/70">{r}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Quote */}
        <section className="mx-auto max-w-[860px] px-6 py-20 md:px-10">
          <div className="rounded-2xl border border-petrol/8 bg-bg-light p-10 text-center md:p-16">
            <p className="text-[clamp(20px,2.5vw,28px)] font-bold leading-snug text-petrol">
              &ldquo;Trabalho impecável, entrega dentro do prazo e transparência total no processo.&rdquo;
            </p>
            <p className="mt-6 font-mono text-[13px] uppercase tracking-[3px] text-petrol/40">
              Once Upon Lisboa
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">Próximo passo</p>
          <h2 className="mx-auto mt-4 max-w-xl text-[clamp(28px,3vw,40px)] font-bold leading-tight text-petrol">
            Tem um projecto similar?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-petrol/50">
            Lançamento, renovação ou campanha sazonal — conte-nos o hotel.
          </p>
          <Link
            href="/contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-petrol px-10 py-4 text-sm font-semibold text-white transition-all hover:bg-petrol/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            Fala connosco →
          </Link>
        </section>

        {/* Next project */}
        <section className="mx-auto max-w-[1200px] border-t border-petrol/8 px-6 py-16 md:px-10 lg:px-[60px]">
          <p className="mb-8 font-mono text-[13px] uppercase tracking-[3px] text-petrol/40">Próximo projecto</p>
          <Link
            href="/portfolio/hotel-casa-palmela/case-study"
            className="group flex items-center justify-between gap-6"
          >
            <div>
              <p className="text-[clamp(22px,3vw,36px)] font-bold text-petrol transition-colors group-hover:text-orange">
                Hotel Casa Palmela
              </p>
              <p className="mt-1 text-sm text-petrol/40">Filmes Comerciais · Brand Film</p>
            </div>
            <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-xl max-md:hidden">
              <Image
                src="/images/portfolio/hcp-thumb.jpg"
                alt="Hotel Casa Palmela"
                fill
                sizes="160px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
            </div>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
