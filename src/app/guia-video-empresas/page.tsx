import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { GuiaVideoEmpresasContent } from "./GuiaVideoEmpresasContent";

export const metadata: Metadata = {
  title: "Guia Gratuito: Como o Vídeo Transforma Resultados em Empresas — Beyond Focus",
  description:
    "Descobre como empresas portuguesas estão a usar vídeo para crescer. Exemplos reais de hotelaria, restauração, imobiliário e corporate. Guia gratuito.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Guia Gratuito: Como o Vídeo Transforma Resultados em Empresas — Beyond Focus",
    description:
      "Descobre como empresas portuguesas estão a usar vídeo para crescer. Exemplos reais de hotelaria, restauração, imobiliário e corporate.",
    url: "https://beyondfocus.pt/guia-video-empresas",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
    locale: "pt_PT",
  },
  alternates: { canonical: "https://beyondfocus.pt/guia-video-empresas" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O guia é mesmo gratuito?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim, sem condições. Preenches o formulário e enviamos imediatamente para o teu email. Sem subscrições obrigatórias nem compromissos.",
      },
    },
    {
      "@type": "Question",
      name: "Serve para qualquer tipo de empresa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. Trabalhamos com hotéis, restaurantes, empresas imobiliárias, marcas corporate e muito mais. O guia cobre estratégias para diferentes sectores.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto tempo demora a receber o guia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O email chega nos primeiros 5 minutos após submissão. Se não encontrares, verifica a pasta de spam.",
      },
    },
  ],
};

export default function GuiaVideoEmpresasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", href: "/" },
          { name: "Guia de Vídeo para Empresas", href: "/guia-video-empresas" },
        ]}
      />
      <Navbar variant="light" />
      <main>
        <GuiaVideoEmpresasContent />
      </main>
      <Footer />
    </>
  );
}
