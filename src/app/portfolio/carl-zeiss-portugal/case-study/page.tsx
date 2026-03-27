import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Case Study: Carl Zeiss Portugal — Filme Institucional com Nota 9.5/10 | Beyond Focus",
  description:
    "Como produzimos o filme institucional da fábrica Carl Zeiss em Setúbal — com NDA rigoroso, aprovação por múltiplos stakeholders e nota 9.5/10. Aprovado sem revisões estruturais e usado em comunicação interna global.",
  openGraph: {
    title: "Case Study: Carl Zeiss Portugal — Beyond Focus",
    description:
      "Filme institucional para multinacional alemã: nota 9.5/10, aprovado sem revisões estruturais, usado em comunicação interna global.",
    url: "https://beyondfocus.pt/portfolio/carl-zeiss-portugal/case-study",
    images: [
      {
        url: "/images/portfolio/zeiss-thumb.jpg",
        width: 1200,
        height: 630,
        alt: "Carl Zeiss Portugal — Beyond Focus",
      },
    ],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/portfolio/carl-zeiss-portugal/case-study",
  },
};

const METRICS = [
  { value: "9.5/10", label: "avaliação da equipa Zeiss Portugal" },
  { value: "~10 min", label: "de filme institucional produzido" },
  { value: "0", label: "revisões estruturais pedidas" },
];

const RESULTS = [
  "Nota 9.5/10 atribuída pelo responsável do projecto na Zeiss Portugal",
  "Filme aprovado sem revisões estruturais após primeira entrega",
  "Conteúdo usado em comunicação interna a nível global",
  "Produção realizada com equipa reduzida para cumprir requisitos de NDA",
  "Processo de aprovação documentado com revisões em múltiplos stakeholders",
];

const GALLERY = [
  "/images/portfolio/gallery/carl-zeiss/zeiss-bts-002.jpg",
  "/images/portfolio/gallery/carl-zeiss/zeiss-bts-016.jpg",
  "/images/portfolio/gallery/carl-zeiss/zeiss-bts-023.jpg",
  "/images/portfolio/gallery/carl-zeiss/zeiss-bts-034.jpg",
  "/images/portfolio/gallery/carl-zeiss/zeiss-bts-037.jpg",
  "/images/portfolio/gallery/carl-zeiss/zeiss-bts-038.jpg",
];

export default function ZeissCaseStudyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Portfolio", href: "/portfolio" },
          { name: "Carl Zeiss Portugal", href: "/portfolio/carl-zeiss-portugal" },
          { name: "Case Study", href: "/portfolio/carl-zeiss-portugal/case-study" },
        ]}
      />
      <Navbar variant="light" />
      <main className="bg-white">
        {/* Hero */}
        <section className="mx-auto max-w-[1200px] px-6 pt-[180px] pb-16 md:px-10 lg:px-[60px]">
          <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
            Vídeos Institucionais · Indústria · 2024
          </p>
          <h1 className="mt-4 max-w-[800px] text-[clamp(36px,4.5vw,60px)] font-bold leading-[1.05] tracking-tight text-petrol">
            Carl Zeiss Portugal
          </h1>
          <p className="mt-4 max-w-[560px] text-lg leading-relaxed text-petrol/60">
            Filme institucional para uma das marcas mais reconhecidas da indústria óptica mundial — com NDA rigoroso, múltiplos stakeholders e nota 9.5/10.
          </p>
        </section>

        {/* Hero video (BTS) */}
        <section className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-[60px]">
          <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
            <video
              src="/videos/portfolio/zeiss-bts.mp4"
              poster="/images/portfolio/zeiss-thumb.jpg"
              controls
              controlsList="nodownload noremoteplayback noplaybackrate"
              disablePictureInPicture
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[2px] text-petrol/30">
            Behind the scenes — o vídeo institucional final é de uso exclusivo interno da Zeiss
          </p>
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
                Documentar precisão óptica de classe mundial com restrições de confidencialidade rigorosas.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-petrol/60">
                A Carl Zeiss — multinacional alemã com fábrica em Setúbal — precisava de documentar o processo de fabrico de óptica de precisão para uso interno global. O projecto impunha condicionantes exigentes: NDA estrito que limitava o que podia ser filmado e como, processo de aprovação estruturado com múltiplos stakeholders em Portugal e na Alemanha, e uma equipa de produção necessariamente reduzida para aceder às áreas de fabrico. Era o nosso primeiro vídeo institucional — e para uma marca desta dimensão.
              </p>
            </div>
            <div>
              <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">A solução</p>
              <h2 className="mt-4 text-[clamp(26px,3vw,36px)] font-bold leading-tight text-petrol">
                Processo documentado, equipa cirúrgica, aprovação estruturada.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-petrol/60">
                Desenvolvemos um processo de aprovação documentado por etapas — conceito, guião, primeiro corte, corte final — que permitiu à equipa da Zeiss validar cada fase sem sobressaltos. A equipa de produção foi mantida no mínimo necessário para aceder às áreas de fabrico. O resultado foi um filme institucional de quase dez minutos que cobre todas as áreas da fábrica — linhas de montagem, laboratórios de precisão, controlo de qualidade — e um BTS que podemos partilhar publicamente.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {GALLERY.length > 0 && (
          <section className="mx-auto max-w-[1200px] px-6 pb-12 md:px-10 lg:px-[60px]">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {GALLERY.map((src, i) => (
                <div
                  key={src}
                  className="relative overflow-hidden rounded-xl"
                  style={{ aspectRatio: "3/2" }}
                >
                  <Image
                    src={src}
                    alt={`Carl Zeiss Portugal — BTS ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
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
              &ldquo;Superaram as expectativas numa produção tecnicamente muito exigente.&rdquo;
            </p>
            <p className="mt-6 font-mono text-[13px] uppercase tracking-[3px] text-petrol/40">
              Zeiss Portugal
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
            Institucional, industrial ou corporativo — conte-nos o que precisa.
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
            href="/portfolio/once-upon-a-house/case-study"
            className="group flex items-center justify-between gap-6"
          >
            <div>
              <p className="text-[clamp(22px,3vw,36px)] font-bold text-petrol transition-colors group-hover:text-orange">
                Once Upon Lisboa
              </p>
              <p className="mt-1 text-sm text-petrol/40">Fotografia · Lançamento de hotel</p>
            </div>
            <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-xl max-md:hidden">
              <Image
                src="/images/portfolio/gallery/once-upon-a-house/oul-sessao2-01.jpg"
                alt="Once Upon Lisboa"
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
