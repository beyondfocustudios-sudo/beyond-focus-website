import type { Metadata } from "next";
import { SimuladorContent } from "./SimuladorContent";

export const metadata: Metadata = {
  title: "Simulador de Orçamento — Quanto Custa Produção Audiovisual | Beyond Focus",
  description:
    "Calcule o investimento estimado para o seu projecto de vídeo, fotografia ou conteúdo. Simulador gratuito da Beyond Focus.",
  openGraph: {
    title: "Simulador de Orçamento — Produção Audiovisual | Beyond Focus",
    description:
      "Descubra o investimento estimado para o seu projecto de vídeo, fotografia ou conteúdo em menos de 2 minutos.",
    url: "https://beyondfocus.pt/simulador-orcamento",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Beyond Focus — Simulador de Orçamento" }],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/simulador-orcamento",
  },
  robots: { index: true, follow: true },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quanto custa um vídeo institucional em Portugal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Um vídeo institucional em Portugal tem um investimento que varia entre €1.500 e €7.000, dependendo da duração, complexidade de produção e sector. A Beyond Focus apresenta propostas personalizadas após briefing detalhado.",
      },
    },
    {
      "@type": "Question",
      name: "Qual o investimento para um brand film?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Um brand film produzido pela Beyond Focus tem um investimento orientativo entre €5.000 e €15.000+, incluindo conceito criativo, direcção, filmagens e pós-produção completa.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto custa produção de conteúdo mensal para redes sociais?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Os pacotes mensais de conteúdo para redes sociais da Beyond Focus partem de €800/mês para 4 vídeos e vão até €2.500/mês para 12 ou mais peças, com estratégia e gestão incluída.",
      },
    },
  ],
};

export default function SimuladorOrcamentoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SimuladorContent />
    </>
  );
}
