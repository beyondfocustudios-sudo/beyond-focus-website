import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Case Study: Hotel Casa Palmela — Brand Film que aumentou CTR em 40% | Beyond Focus",
  description:
    "Como produzimos um brand film de 90 segundos para o Hotel Casa Palmela (5 estrelas, Small Luxury Hotels) que resultou em +40% de CTR no Booking.com e 3 meses de conteúdo numa única sessão de produção.",
  openGraph: {
    title: "Case Study: Hotel Casa Palmela — Beyond Focus",
    description:
      "Brand film de 90 segundos para hotel 5 estrelas: +40% CTR no Booking.com, 3 meses de conteúdo numa sessão.",
    url: "https://beyondfocus.pt/portfolio/hotel-casa-palmela/case-study",
    images: [
      {
        url: "/images/portfolio/hcp-thumb.jpg",
        width: 1200,
        height: 630,
        alt: "Hotel Casa Palmela — Beyond Focus",
      },
    ],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/portfolio/hotel-casa-palmela/case-study",
  },
};

const METRICS = [
  { value: "90s", label: "Brand film entregue" },
  { value: "+40%", label: "CTR nas listagens Booking.com" },
  { value: "3 meses", label: "de conteúdo numa sessão" },
];

const RESULTS = [
  "+40% de CTR nas listagens Booking.com após publicação do vídeo",
  "Vídeo integrado na homepage do hotel e em campanhas pagas",
  "3 meses de conteúdo social gerados numa única sessão de produção",
  "Fotografia de produto e de espaços usada em todas as OTAs",
  "Entrada da Beyond Focus no sector hoteleiro de alto valor",
];

const GALLERY = [
  "/images/portfolio/gallery/hotel-casa-palmela/hcp-vdm-stills-06.jpg",
  "/images/portfolio/gallery/hotel-casa-palmela/hcp-vdm-stills-07.jpg",
];

export default function HCPCaseStudyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Portfolio", href: "/portfolio" },
          { name: "Hotel Casa Palmela", href: "/portfolio/hotel-casa-palmela" },
          { name: "Case Study", href: "/portfolio/hotel-casa-palmela/case-study" },
        ]}
      />
      <Navbar variant="light" />
      <main className="bg-white">
        {/* Hero */}
        <section className="mx-auto max-w-[1200px] px-6 pt-[180px] pb-16 md:px-10 lg:px-[60px]">
          <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
            Hotelaria · Filmes Comerciais · 2024
          </p>
          <h1 className="mt-4 max-w-[800px] text-[clamp(36px,4.5vw,60px)] font-bold leading-[1.05] tracking-tight text-petrol">
            Hotel Casa Palmela
          </h1>
          <p className="mt-4 max-w-[560px] text-lg leading-relaxed text-petrol/60">
            Um brand film de 90 segundos para um hotel cinco estrelas boutique aos pés da Serra da Arrábida — e o início de uma nova era para a Beyond Focus.
          </p>
        </section>

        {/* Hero video */}
        <section className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-[60px]">
          <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
            <video
              src="/videos/portfolio/hcp-final.mp4"
              poster="/images/portfolio/hcp-thumb.jpg"
              controls
              controlsList="nodownload noremoteplayback noplaybackrate"
              disablePictureInPicture
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
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
                Competir com grandes grupos hoteleiros com conteúdo que mostre o hotel como realmente é.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-petrol/60">
                O Hotel Casa Palmela — um cinco estrelas boutique integrado no grupo Small Luxury Hotels, situado aos pés da Serra da Arrábida — enfrentava um problema comum aos hotéis independentes: o conteúdo visual não estava à altura da experiência real. Com um público maioritariamente internacional e a competir directamente com grandes cadeias nas plataformas de booking, precisavam de um brand film que capturasse a atmosfera única do espaço, desde o amanhecer até ao anoitecer, e que funcionasse tanto no website como nas OTAs e campanhas pagas.
              </p>
            </div>
            <div>
              <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">A solução</p>
              <h2 className="mt-4 text-[clamp(26px,3vw,36px)] font-bold leading-tight text-petrol">
                Dois momentos de filmagem. Um dia de produção. Meses de conteúdo.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-petrol/60">
                Desenvolvemos o conceito em torno do percurso natural de um hóspede ao longo de um dia inteiro no hotel. Filmámos em dois momentos distintos — uma manhã dourada com a luz característica da Arrábida e uma tarde — capturando o pequeno-almoço, as actividades, os detalhes do espaço e o ambiente de fim de tarde. O resultado foi um brand film de 90 segundos para uso no website e campanhas pagas, complementado por fotografia de produto e de espaços optimizada para todas as OTAs.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {GALLERY.length > 0 && (
          <section className="mx-auto max-w-[1200px] px-6 pb-12 md:px-10 lg:px-[60px]">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {GALLERY.map((src, i) => (
                <div
                  key={src}
                  className="relative overflow-hidden rounded-xl"
                  style={{ aspectRatio: "16/9" }}
                >
                  <Image
                    src={src}
                    alt={`Hotel Casa Palmela — still ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
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
              &ldquo;Finalmente temos um vídeo que mostra o hotel como realmente é.&rdquo;
            </p>
            <p className="mt-6 font-mono text-[13px] uppercase tracking-[3px] text-petrol/40">
              Direcção — Hotel Casa Palmela
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
            Conte-nos o hotel e o que precisa. Respondemos em 24h.
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
            href="/portfolio/carl-zeiss-portugal/case-study"
            className="group flex items-center justify-between gap-6"
          >
            <div>
              <p className="text-[clamp(22px,3vw,36px)] font-bold text-petrol transition-colors group-hover:text-orange">
                Carl Zeiss Portugal
              </p>
              <p className="mt-1 text-sm text-petrol/40">Vídeos Institucionais</p>
            </div>
            <div
              className="relative h-24 w-40 shrink-0 overflow-hidden rounded-xl max-md:hidden"
            >
              <Image
                src="/images/portfolio/zeiss-thumb.jpg"
                alt="Carl Zeiss Portugal"
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
