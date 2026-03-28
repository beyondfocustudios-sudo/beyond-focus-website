import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { AuditoriaForm } from "./AuditoriaForm";

export const metadata: Metadata = {
  title: "Auditoria Gratuita do Conteúdo Visual da Sua Empresa | Beyond Focus",
  description:
    "Envie o link do seu website e em 48 horas recebe um relatório personalizado com recomendações de vídeo e fotografia para o seu negócio. Totalmente gratuito.",
  keywords: [
    "auditoria video empresa",
    "analise conteudo visual",
    "auditoria audiovisual gratuita",
    "analise video marketing",
    "consultoria video gratuita Portugal",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    locale: "pt_PT",
    type: "website",
    title: "Auditoria Gratuita do Conteúdo Visual da Sua Empresa — Beyond Focus",
    description:
      "Relatório personalizado com recomendações de vídeo e fotografia para o teu negócio. Grátis, sem compromisso, entregue em 48 horas.",
    url: "https://beyondfocus.pt/auditoria-gratuita",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Auditoria Gratuita — Beyond Focus" }],
  },
  alternates: { canonical: "https://beyondfocus.pt/auditoria-gratuita" },
};

const STEPS = [
  {
    number: "01",
    title: "Envias o teu website",
    description: "Preenches o formulário com o link do teu website e redes sociais.",
  },
  {
    number: "02",
    title: "Analisamos tudo",
    description: "A nossa equipa audita a tua presença visual: website, Instagram, LinkedIn, YouTube.",
  },
  {
    number: "03",
    title: "Criamos o relatório",
    description: "3 recomendações específicas para o teu sector com estimativa de investimento.",
  },
  {
    number: "04",
    title: "Recebes em 48 horas",
    description: "Relatório detalhado por email. Sem spam, sem compromisso, sem custo.",
  },
];

const DELIVERABLES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Análise da presença visual actual",
    description: "Website, redes sociais e canais de vídeo avaliados em detalhe.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    title: "3 recomendações específicas",
    description: "Acções concretas adaptadas ao teu sector e dimensão de negócio.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    title: "Estimativa de investimento",
    description: "Valores orientativos para cada recomendação, sem surpresas.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: "Comparação com concorrentes",
    description: "Onde estás relativamente aos teus concorrentes directos no digital.",
  },
];

export default function AuditoriaGratuitaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Auditoria Gratuita", href: "/auditoria-gratuita" },
        ]}
      />
      <Navbar variant="light" />
      <main className="bg-[#F5F5F5]">

        {/* Hero */}
        <section className="mx-auto max-w-[960px] px-6 pt-[180px] pb-16 text-center md:px-10">
          <span className="inline-block rounded-full border border-[#FA8334]/30 bg-[#FA8334]/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[3px] text-[#FA8334]">
            Totalmente gratuito
          </span>
          <h1 className="mt-6 text-[clamp(32px,4vw,56px)] leading-[1.1] tracking-tight text-[#0E3A45]">
            Auditoria Gratuita do<br className="hidden md:block" /> Conteúdo Visual da Sua Empresa
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#0E3A45]/60">
            Envie o link do seu website. Em 48 horas recebe um relatório personalizado com recomendações de vídeo e fotografia adaptadas ao seu sector — sem compromisso.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#0E3A45]/50">
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FA8334" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Sem custo
            </span>
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FA8334" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Entrega em 48h
            </span>
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FA8334" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Sem spam
            </span>
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FA8334" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Personalizado para o teu sector
            </span>
          </div>
        </section>

        {/* What you get */}
        <section className="mx-auto max-w-[960px] px-6 pb-20 md:px-10">
          <h2 className="mb-2 text-center text-2xl text-[#0E3A45]">O que recebes no relatório</h2>
          <p className="mb-10 text-center text-sm text-[#0E3A45]/50">Análise real, feita por humanos. Não automática.</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {DELIVERABLES.map((item) => (
              <div key={item.title} className="rounded-2xl bg-white p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0E3A45]/5 text-[#0E3A45]">
                  {item.icon}
                </div>
                <h3 className="mb-1 text-sm font-semibold text-[#0E3A45]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#0E3A45]/60">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process steps */}
        <section className="bg-[#0E3A45] py-20">
          <div className="mx-auto max-w-[960px] px-6 md:px-10">
            <h2 className="mb-2 text-center text-2xl text-white">Como funciona</h2>
            <p className="mb-12 text-center text-sm text-white/50">4 passos. 48 horas. Sem complicações.</p>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#FA8334]/30 font-mono text-sm font-bold text-[#FA8334]">
                    {step.number}
                  </div>
                  <h3 className="mb-2 text-sm font-semibold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form section */}
        <section className="mx-auto max-w-[640px] px-6 py-20 md:px-10">
          <div className="mb-8 text-center">
            <h2 className="text-2xl text-[#0E3A45]">Pedir a minha auditoria</h2>
            <p className="mt-2 text-sm text-[#0E3A45]/50">
              Preenche o formulário. A equipa da Beyond Focus analisa e envia o relatório em 48 horas.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <AuditoriaForm />
          </div>
        </section>

        {/* Testimonial */}
        <section className="mx-auto max-w-[640px] px-6 pb-20 md:px-10">
          <figure className="rounded-2xl bg-[#0E3A45] p-8 text-center">
            <blockquote className="text-base leading-relaxed text-white/80">
              &ldquo;A Beyond Focus transformou a forma como comunicamos visualmente. O nosso website ficou completamente diferente depois de implementarmos as recomendações deles.&rdquo;
            </blockquote>
            <figcaption className="mt-5">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#FA8334]/20 font-semibold text-[#FA8334]">
                R
              </div>
              <p className="text-sm font-semibold text-white">Ricardo Fonseca</p>
              <p className="text-xs text-white/40">Director Geral — Hotel Boutique, Lisboa</p>
            </figcaption>
          </figure>
        </section>

      </main>
      <Footer />
    </>
  );
}
