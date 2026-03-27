import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BlogEmailCapture } from "@/components/features/blog/BlogEmailCapture";

export interface RegiaoData {
  regiao: string;
  slug: string;
  label: string;
  hero: { title: string; subtitle: string };
  problem: { title: string; p1: string; p2: string };
  solution: { title: string; p1: string; p2: string };
  portfolio: Array<{ slug: string; client: string; category: string; thumb: string }>;
  faqs: Array<{ q: string; a: string }>;
  ctaTitle: string;
  ctaSubtitle: string;
  emailTitle: string;
  emailDesc: string;
}

const RESULTS = [
  { metric: "+40%", label: "reservas directas com brand film" },
  { metric: "3x", label: "mais engagement em reels vs. fotos" },
  { metric: "60s", label: "é o formato que mais converte" },
];

const SERVICES = [
  {
    title: "Brand Film",
    desc: "Um filme que conta a história da tua marca — a atmosfera, a equipa, a experiência única. Para usar no website, nas redes sociais e em campanhas.",
    duration: "60-90s",
  },
  {
    title: "Reels & Conteúdo Social",
    desc: "Conteúdo semanal ou mensal optimizado para Instagram, TikTok e YouTube Shorts. Filmar uma vez, distribuir durante meses.",
    duration: "15-60s por peça",
  },
  {
    title: "Fotografia",
    desc: "Fotografia arquitectónica e de lifestyle para website, redes sociais e materiais de marketing. Meio ou dia completo de produção.",
    duration: "Meio ou dia completo",
  },
  {
    title: "Pacote Mensal",
    desc: "Produção contínua de conteúdo. Tornamo-nos o teu departamento criativo externo — disponível sempre que precisas.",
    duration: "A partir de €1.500/mês",
  },
];

const PARTNERS = [
  { src: "/images/partners/hotel-casa-palmela.png", alt: "Hotel Casa Palmela" },
  { src: "/images/partners/highgate.png", alt: "Highgate" },
  { src: "/images/partners/once-upon-a-house.png", alt: "Once Upon a House" },
  { src: "/images/partners/amoretti-lux.png", alt: "Amoretti Lux" },
  { src: "/images/partners/carl-zeiss.png", alt: "Carl Zeiss" },
];

export function RegiaoPageTemplate({ data }: { data: RegiaoData }) {
  return (
    <>
      <Navbar variant="light" />
      <main className="bg-bg-light">
        {/* Hero */}
        <section className="mx-auto max-w-[1200px] px-6 pt-[180px] pb-20 md:px-10 lg:px-[60px]">
          <div className="max-w-[700px]">
            <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">{data.label}</p>
            <h1 className="mt-4 text-[clamp(36px,4.5vw,60px)] font-bold leading-[1.05] tracking-tight text-petrol">
              {data.hero.title}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-petrol/60">
              {data.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/contacto?sector=${data.slug}`}
                className="rounded-full bg-petrol px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-petrol/90"
              >
                Pedir proposta →
              </Link>
              <Link
                href="/portfolio"
                className="rounded-full border border-petrol/20 px-8 py-4 text-sm font-semibold text-petrol transition-all hover:border-petrol/40"
              >
                Ver portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="bg-petrol py-16">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-[60px]">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {RESULTS.map((r, i) => (
                <div key={i} className="text-center md:text-left">
                  <p className="text-[clamp(36px,4vw,52px)] font-bold text-orange">{r.metric}</p>
                  <p className="mt-1 text-base text-white/60">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem / Solution */}
        <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 lg:px-[60px]">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <h2 className="text-[clamp(26px,3vw,36px)] font-bold leading-tight text-petrol">
                {data.problem.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-petrol/60">{data.problem.p1}</p>
              <p className="mt-4 text-base leading-relaxed text-petrol/60">{data.problem.p2}</p>
            </div>
            <div>
              <h2 className="text-[clamp(26px,3vw,36px)] font-bold leading-tight text-petrol">
                {data.solution.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-petrol/60">{data.solution.p1}</p>
              <p className="mt-4 text-base leading-relaxed text-petrol/60">{data.solution.p2}</p>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-[60px]">
            <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">Trabalho real</p>
            <h2 className="mt-3 text-[clamp(28px,3vw,40px)] font-bold text-petrol">Portfolio</h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {data.portfolio.map((item, i) => (
                <Link key={i} href={`/portfolio/${item.slug}`} className="group block overflow-hidden rounded-2xl">
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.thumb}
                      alt={item.client}
                      width={600}
                      height={400}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3 px-1">
                    <p className="font-mono text-[11px] uppercase tracking-[2px] text-orange">{item.category}</p>
                    <p className="mt-1 text-base font-semibold text-petrol">{item.client}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-bg-light py-20">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-[60px]">
            <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">O que fazemos</p>
            <h2 className="mt-3 text-[clamp(28px,3vw,40px)] font-bold text-petrol">Serviços para a região</h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {SERVICES.map((s, i) => (
                <div key={i} className="rounded-2xl border border-petrol/8 bg-white p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-petrol">{s.title}</h3>
                    <span className="rounded-full bg-orange/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[1px] text-orange">
                      {s.duration}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-petrol/60">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clientes */}
        <section className="bg-petrol py-16">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-[60px]">
            <p className="mb-10 text-center font-mono text-[13px] uppercase tracking-[3px] text-white/40">
              Clientes que confiam em nós
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10">
              {PARTNERS.map((p, i) => (
                <Image
                  key={i}
                  src={p.src}
                  alt={p.alt}
                  width={120}
                  height={40}
                  className="object-contain opacity-60 brightness-0 invert"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Email Capture */}
        <section className="mx-auto max-w-[860px] px-6 py-12 md:px-10">
          <BlogEmailCapture
            variant="banner"
            title={data.emailTitle}
            description={data.emailDesc}
            ctaLabel="Receber guia"
            source={`regiao-${data.slug}`}
            magnet={`guia-${data.slug}-video`}
          />
        </section>

        {/* FAQ */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-[860px] px-6 md:px-10">
            <h2 className="mb-10 text-[clamp(26px,3vw,36px)] font-bold text-petrol">Perguntas frequentes</h2>
            <div className="space-y-6">
              {data.faqs.map((faq, i) => (
                <div key={i} className="border-b border-petrol/8 pb-6">
                  <h3 className="text-base font-semibold text-petrol">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-petrol/60">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 text-center">
          <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">Próximo passo</p>
          <h2 className="mx-auto mt-3 max-w-xl text-[clamp(28px,3vw,40px)] font-bold leading-tight text-petrol">
            {data.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-petrol/50">{data.ctaSubtitle}</p>
          <Link
            href={`/contacto?sector=${data.slug}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-petrol px-10 py-4 text-sm font-semibold text-white transition-all hover:bg-petrol/90"
          >
            Pedir proposta →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
