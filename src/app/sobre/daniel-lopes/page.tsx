import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Daniel Lopes — Fundador & Director Criativo | Beyond Focus",
  description:
    "Daniel Lopes, fundador da Beyond Focus em 2023. Director criativo e realizador com experiência em filmes comerciais, vídeos institucionais e estratégia audiovisual para marcas em Lisboa e Portugal.",
  openGraph: {
    locale: "pt_PT",
    type: "profile",
    title: "Daniel Lopes — Fundador & Director Criativo da Beyond Focus",
    description:
      "Realizador e director criativo. Fundou a Beyond Focus em 2023 com o objetivo de criar produção audiovisual estratégica para marcas que querem resultados reais.",
    url: "https://beyondfocus.pt/sobre/daniel-lopes",
    images: [
      {
        url: "/images/daniel-lopes-fundador.jpg",
        width: 1200,
        height: 800,
        alt: "Daniel Lopes — Fundador & Director Criativo da Beyond Focus",
      },
    ],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/sobre/daniel-lopes",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Daniel Lopes",
  jobTitle: "Fundador & Director Criativo",
  description:
    "Realizador e director criativo português. Fundou a Beyond Focus em 2023 para oferecer produção audiovisual estratégica a marcas que procuram resultados mensuráveis — não apenas conteúdo bonito.",
  url: "https://beyondfocus.pt/sobre/daniel-lopes",
  image: "https://beyondfocus.pt/images/daniel-lopes-fundador.jpg",
  email: "daniellopes@beyondfocus.pt",
  nationality: {
    "@type": "Country",
    name: "Portugal",
  },
  birthPlace: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lisboa",
      addressCountry: "PT",
    },
  },
  worksFor: {
    "@type": "Organization",
    name: "Beyond Focus",
    url: "https://beyondfocus.pt",
    foundingDate: "2023",
    description: "Produtora audiovisual em Lisboa especializada em filmes comerciais, vídeos institucionais e estratégia criativa.",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "ISEC Lisboa",
    description: "Licenciatura em Multimédia",
  },
  knowsAbout: [
    "Produção Audiovisual",
    "Direcção Criativa",
    "Filmes Comerciais",
    "Vídeos Institucionais",
    "Fotografia Comercial",
    "Estratégia de Conteúdo",
    "Vídeo Marketing",
    "Storytelling Visual",
    "DaVinci Resolve",
    "Adobe Premiere Pro",
    "Sony FX6",
    "RED Komodo 6K",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Realizador e Director Criativo",
    occupationLocation: {
      "@type": "City",
      name: "Lisboa",
    },
  },
  sameAs: [
    "https://www.linkedin.com/in/daniel-lopes-filmmaker-42957b1a3/",
    "https://vimeo.com/beyondfocus",
    "https://instagram.com/beyondfocus.pt",
  ],
};

const CLIENTS = [
  { name: "Carl Zeiss", sector: "Óptica & Tecnologia", type: "Filme Comercial" },
  { name: "Once Upon a House", sector: "Hotelaria Boutique", type: "Brand Film + Fotografia" },
  { name: "Highgate Hotels", sector: "Hotelaria Internacional", type: "Conteúdo Digital" },
  { name: "Sirius Park", sector: "Desenvolvimento Imobiliário", type: "Filme Institucional" },
  { name: "Corinthia Lisbon", sector: "Hotelaria 5 Estrelas", type: "Conteúdo Redes Sociais" },
  { name: "Abbott", sector: "Saúde & Farmacêutica", type: "Vídeo Institucional" },
];

const EXPERTISE = [
  {
    area: "Filmes Comerciais",
    description:
      "Criação de spots publicitários com narrativa cinematográfica. Trabalho com marcas de hotelaria, gastronomia, tecnologia e lifestyle para criar filmes que convertem.",
  },
  {
    area: "Direcção Criativa",
    description:
      "Definição de narrativa, tom visual e estratégia criativa antes de ligar a câmara. O ponto diferenciador da Beyond Focus é pensar antes de gravar.",
  },
  {
    area: "Vídeos Institucionais",
    description:
      "Histórias de marca contadas com profundidade. Projectos para apresentar empresas, cultura organizacional e valores a clientes, investidores e parceiros.",
  },
  {
    area: "Estratégia Audiovisual",
    description:
      "Planeamento de conteúdo audiovisual alinhado com objectivos de negócio. Não apenas produção — mas um plano claro de como o conteúdo vai trabalhar para a marca.",
  },
];

export default function DanielLopesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Sobre", href: "/sobre" },
          { name: "Daniel Lopes", href: "/sobre/daniel-lopes" },
        ]}
      />
      <Navbar variant="light" />
      <main className="bg-bg-light">
        {/* Hero */}
        <section className="bg-petrol-deep pt-[200px] pb-20">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">
              <div>
                <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
                  Fundador & Director Criativo
                </p>
                <h1 className="mt-4 text-[clamp(40px,5vw,72px)] font-bold leading-[1.05] tracking-tight text-white">
                  Daniel Lopes
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-white/60 max-w-xl">
                  Realizador português, fundador da Beyond Focus. Especializado em filmes comerciais e direcção criativa para marcas que querem resultados mensuráveis — não apenas vídeos bonitos.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/70">
                    Lisboa, Portugal
                  </span>
                  <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/70">
                    Fundado em 2023
                  </span>
                  <span className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/70">
                    ISEC Lisboa — Multimédia
                  </span>
                </div>
                <div className="mt-8 flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/daniel-lopes-filmmaker-42957b1a3/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/20"
                  >
                    LinkedIn
                  </a>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange/90"
                  >
                    Contactar
                  </Link>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "3/4" }}>
                <Image
                  src="/images/daniel-lopes-fundador.jpg"
                  alt="Daniel Lopes — Fundador & Director Criativo da Beyond Focus, realizador em Lisboa"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Biografia */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
            <div className="max-w-3xl">
              <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">Percurso</p>
              <h2 className="mt-3 text-[clamp(28px,3vw,40px)] font-bold leading-tight text-petrol">
                A pessoa por trás da câmara
              </h2>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-petrol/70">
                <p>
                  A paixão pelo audiovisual não começou numa sala de aula — começou numa sala de estar, a ver filmes. Enquanto a maioria via séries, Daniel passava horas a ver cinema. Quando a sua mãe lhe ofereceu a primeira câmara, o que era curiosidade passou a ser direcção.
                </p>
                <p>
                  Estudou Multimédia no ISEC, em Lisboa. Aprendeu o básico, mas o que realmente o formou foi o trabalho autónomo — horas a filmar, a editar, a errar e a repetir. Terminou a faculdade, fez o estágio, e em 2023, com 20 anos, fundou a Beyond Focus.
                </p>
                <p>
                  O primeiro cliente foi também o primeiro teste de confiança. Desde então, a Beyond Focus trabalhou com marcas como Carl Zeiss, Once Upon a House, Highgate e Corinthia — projectos que exigem mais do que técnica. Exigem narrativa, estratégia e compreensão profunda do que uma marca quer comunicar.
                </p>
                <p>
                  Hoje, o objectivo é claro: quando alguém em Portugal pensar em produção audiovisual estratégica, que pense na Beyond Focus. Não por ser a maior — mas por ser a que trata cada projecto como se fosse o único.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Áreas de Especialização */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
            <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">Especialização</p>
            <h2 className="mt-3 text-[clamp(28px,3vw,40px)] font-bold leading-tight text-petrol">
              O que Daniel faz
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {EXPERTISE.map((item) => (
                <div key={item.area} className="rounded-2xl border border-petrol/8 bg-bg-light p-8">
                  <h3 className="text-lg font-bold text-petrol">{item.area}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-petrol/60">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clientes notáveis */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
            <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">Trabalho Real</p>
            <h2 className="mt-3 text-[clamp(28px,3vw,40px)] font-bold leading-tight text-petrol">
              Marcas com quem trabalhou
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CLIENTS.map((client) => (
                <div
                  key={client.name}
                  className="rounded-xl border border-petrol/10 bg-white p-6"
                >
                  <p className="font-semibold text-petrol">{client.name}</p>
                  <p className="mt-1 text-sm text-petrol/50">{client.sector}</p>
                  <p className="mt-2 text-xs font-mono uppercase tracking-[2px] text-orange">{client.type}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-petrol py-20 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="text-[clamp(28px,3vw,40px)] font-bold text-white">
              Quer trabalhar com Daniel?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              A primeira conversa é por nossa conta. Conta-nos o teu projecto e percebemos juntos o melhor caminho.
            </p>
            <Link
              href="/contacto"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-petrol transition hover:bg-white/90"
            >
              Fala Connosco →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
