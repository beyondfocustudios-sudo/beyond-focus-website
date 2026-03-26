import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BlogEmailCapture } from "@/components/features/blog/BlogEmailCapture";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Vídeo Marketing para Hotéis e Hotelaria em Portugal | Beyond Focus",
  description: "Produção de vídeo especializada para hotéis boutique, resorts e grupos hoteleiros em Portugal. Brand films, reels para redes sociais, cobertura de espaços. Lisboa e todo o país.",
  keywords: ["vídeo marketing hotéis", "produção vídeo hotelaria", "brand film hotel portugal", "vídeo hotel boutique", "marketing hotelaria", "produtora audiovisual hotelaria"],
  openGraph: {
    title: "Vídeo Marketing para Hotéis em Portugal — Beyond Focus",
    description: "Especialistas em conteúdo visual para hotelaria. Brand films, reels, fotografia — conteúdo que converte visitantes em hóspedes.",
    url: "https://beyondfocus.pt/hotelaria",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://beyondfocus.pt/hotelaria" },
};

const RESULTS = [
  { metric: "+40%", label: "reservas directas com brand film" },
  { metric: "3x", label: "mais engagement em reels vs. fotos" },
  { metric: "60s", label: "é o formato que mais converte" },
];

const SERVICES = [
  {
    title: "Brand Film",
    desc: "Um filme que conta a história do teu hotel — a atmosfera, a equipa, a experiência única que o hóspede vai viver. Para usar no website, nas redes sociais e em campanhas.",
    duration: "60-90s",
  },
  {
    title: "Reels & Conteúdo Social",
    desc: "Conteúdo semanal ou mensal optimizado para Instagram, TikTok e YouTube Shorts. Filmar uma vez, distribuir durante meses.",
    duration: "15-60s por peça",
  },
  {
    title: "Fotografia de Espaços",
    desc: "Fotografia arquitectónica e de lifestyle para website, OTAs (Booking, Expedia) e materiais de marketing.",
    duration: "Meio ou dia completo",
  },
  {
    title: "Pacote Mensal",
    desc: "Produção contínua de conteúdo. Tornamo-nos o teu departamento criativo externo — disponível sempre que precisas.",
    duration: "A partir de €1.500/mês",
  },
];

const FAQS = [
  {
    q: "Trabalham fora de Lisboa?",
    a: "Sim. Trabalhamos em todo o Portugal continental, ilhas e eventualmente no estrangeiro para clientes com operações internacionais.",
  },
  {
    q: "Quanto tempo demora uma produção de hotel?",
    a: "Um Brand Film standard demora 2-4 semanas desde briefing até entrega. Pacotes de reels mensais podem começar em menos de uma semana.",
  },
  {
    q: "Precisamos de ter hóspedes presentes nas filmagens?",
    a: "Depende do conceito. Trabalhamos com situações com e sem hóspedes — a escolha depende da narrativa que queremos construir.",
  },
  {
    q: "Têm experiência com grupos hoteleiros?",
    a: "Sim. Já trabalhámos com grupos com múltiplas unidades, criando sistemas de conteúdo escaláveis — um estilo visual consistente para toda a colecção.",
  },
];

export default function HotelariaPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Produção de Vídeo para Hotelaria",
    provider: { "@type": "Organization", name: "Beyond Focus", url: "https://beyondfocus.pt" },
    areaServed: "PT",
    description: "Produção audiovisual especializada para hotéis, resorts e grupos hoteleiros em Portugal.",
    url: "https://beyondfocus.pt/hotelaria",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Hotelaria", href: "/hotelaria" },
        ]}
      />
      <Navbar variant="light" />
      <main className="bg-bg-light">
        {/* Hero */}
        <section className="mx-auto max-w-[1200px] px-6 pt-[180px] pb-20 md:px-10 lg:px-[60px]">
          <div className="max-w-[700px]">
            <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">Hotelaria & Turismo</p>
            <h1 className="mt-4 text-[clamp(36px,4.5vw,60px)] font-bold leading-[1.05] tracking-tight text-petrol">
              Conteúdo visual que transforma visitas em reservas.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-petrol/60">
              Produzimos brand films, reels e fotografia para hotéis em Portugal que querem atrair o hóspede certo — não apenas mais hóspedes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contacto"
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

        {/* Problem/Solution */}
        <section className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 lg:px-[60px]">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <h2 className="text-[clamp(26px,3vw,36px)] font-bold leading-tight text-petrol">
                Hotéis com conteúdo fraco perdem reservas directas todos os dias.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-petrol/60">
                O viajante moderno decide em segundos. Se o primeiro vídeo que vê não captura a essência do espaço — a luz, a textura, o silêncio, a experiência — escolhe outro hotel.
              </p>
              <p className="mt-4 text-base leading-relaxed text-petrol/60">
                Fotos de stock, vídeos de drone genéricos e conteúdo sem personalidade comunicam que o teu hotel é igual a todos os outros. Quando não é.
              </p>
            </div>
            <div>
              <h2 className="text-[clamp(26px,3vw,36px)] font-bold leading-tight text-petrol">
                Tornamo-nos o teu departamento criativo externo.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-petrol/60">
                Não chegamos, filmamos e desaparecemos. Conhecemos a história do teu hotel, os valores da marca, o tipo de hóspede que queres atrair.
              </p>
              <p className="mt-4 text-base leading-relaxed text-petrol/60">
                Criamos conteúdo que serve meses de publicações — website, OTAs, Instagram, LinkedIn, campanhas pagas. Um investimento que trabalha para ti continuamente.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-[60px]">
            <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">O que fazemos</p>
            <h2 className="mt-3 text-[clamp(28px,3vw,40px)] font-bold text-petrol">Serviços para hotelaria</h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {SERVICES.map((s, i) => (
                <div key={i} className="rounded-2xl border border-petrol/8 bg-bg-light p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-petrol">{s.title}</h3>
                    <span className="rounded-full bg-orange/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[1px] text-orange">{s.duration}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-petrol/60">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Email capture */}
        <section className="mx-auto max-w-[860px] px-6 py-12 md:px-10">
          <BlogEmailCapture
            variant="banner"
            title="Recebe o guia de vídeo marketing para hotelaria"
            description="Como hotéis em Portugal estão a usar conteúdo para aumentar reservas directas. Gratuito."
            ctaLabel="Receber guia"
            source="hotelaria-page"
            magnet="guia-hotelaria-video"
          />
        </section>

        {/* FAQ */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-[860px] px-6 md:px-10">
            <h2 className="mb-10 text-[clamp(26px,3vw,36px)] font-bold text-petrol">Perguntas frequentes</h2>
            <div className="space-y-6">
              {FAQS.map((faq, i) => (
                <div key={i} className="border-b border-petrol/8 pb-6">
                  <h3 className="text-base font-semibold text-petrol">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-petrol/60">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-24 text-center">
          <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">Próximo passo</p>
          <h2 className="mx-auto mt-3 max-w-xl text-[clamp(28px,3vw,40px)] font-bold leading-tight text-petrol">
            Pronto para mostrar o teu hotel como merece?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-petrol/50">
            Conta-nos o projecto. Respondemos em 24h com uma proposta inicial.
          </p>
          <Link
            href="/contacto?sector=hotelaria"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-petrol px-10 py-4 text-sm font-semibold text-white transition-all hover:bg-petrol/90"
          >
            Pedir proposta para o teu hotel →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
