import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { RegiaoPageTemplate, type RegiaoData } from "@/components/sections/RegiaoPageTemplate";

export const metadata: Metadata = {
  title: "Produtora Audiovisual em Setúbal e Costa Azul | Beyond Focus",
  description:
    "Filmes comerciais, vídeos institucionais e fotografia para empresas na região de Setúbal, Arrábida e Tróia. Produção audiovisual que mostra o melhor da Costa Azul.",
  keywords: [
    "produtora audiovisual setubal",
    "producao video setubal",
    "brand film arrabida",
    "filmagem costa azul",
    "video institucional setubal",
    "producao audiovisual troia",
    "filmagem parque natural arrabida",
  ],
  openGraph: {
    title: "Produtora Audiovisual em Setúbal — Beyond Focus",
    description:
      "Filmes comerciais e fotografia para empresas na região de Setúbal, Arrábida e Tróia. Conhecemos cada canto da Costa Azul.",
    url: "https://beyondfocus.pt/servicos/regioes/setubal",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Produção Audiovisual Setúbal — Beyond Focus" }],
  },
  alternates: { canonical: "https://beyondfocus.pt/servicos/regioes/setubal" },
};

const data: RegiaoData = {
  regiao: "Setúbal",
  slug: "setubal",
  label: "Costa Azul",
  hero: {
    title: "Produção audiovisual em Setúbal e Costa Azul",
    subtitle:
      "Filmes comerciais, vídeos institucionais e fotografia para empresas na região de Setúbal, Arrábida e Tróia.",
  },
  problem: {
    title: "A Arrábida tem as águas mais claras do país. O teu conteúdo não mostra isso.",
    p1: "A região de Setúbal tem um dos ambientes naturais mais impressionantes da Europa — e a maioria das empresas locais comunica com imagens genéricas que poderiam ser de qualquer lugar.",
    p2: "Quando o produto ou serviço que vendes está inserido num contexto visual extraordinário e o teu conteúdo não o mostra, estás a deixar o teu maior activo de marketing por usar.",
  },
  solution: {
    title: "Conhecemos cada canto da Arrábida, Tróia e Costa Azul. Filmamos onde outros não chegam.",
    p1: "Trabalhamos regularmente nesta região e conhecemos as condições de luz, os acessos e os melhores momentos para filmar. Essa proximidade traduz-se em conteúdo mais autêntico e mais rápido de produzir.",
    p2: "Seja um hotel na Arrábida, uma empresa industrial em Setúbal ou um empreendimento em Tróia — criamos conteúdo que posiciona a tua marca no contexto certo e atrai os clientes certos.",
  },
  portfolio: [
    {
      slug: "hotel-casa-palmela",
      client: "Hotel Casa Palmela",
      category: "Hotelaria · Palmela, Setúbal",
      thumb: "/images/portfolio/hcp-thumb.jpg",
    },
    {
      slug: "carl-zeiss",
      client: "Carl Zeiss",
      category: "Industrial · Setúbal",
      thumb: "/images/portfolio/zeiss-thumb.jpg",
    },
  ],
  faqs: [
    {
      q: "A equipa desloca-se à região de Setúbal?",
      a: "Sim. Trabalhamos regularmente em Setúbal, Palmela, Sesimbra, Arrábida e Tróia. A proximidade a Lisboa facilita logística e reduz custos de deslocação.",
    },
    {
      q: "Que tipo de empresas trabalham na região?",
      a: "Hotéis e resorts na Costa Azul, empresas industriais em Setúbal, empreendimentos turísticos em Tróia e propriedades rurais em Palmela e Azeitão.",
    },
    {
      q: "Trabalham no Parque Natural da Arrábida?",
      a: "Sim, com os devidos condicionalismos ambientais. Conhecemos as regras de acesso e garantimos filmagens responsáveis que respeitam o ecossistema protegido.",
    },
    {
      q: "Quanto tempo demora uma produção?",
      a: "Um Brand Film standard demora 2-4 semanas desde briefing até entrega. Para empresas industriais com necessidades específicas, o prazo pode ser ajustado.",
    },
  ],
  ctaTitle: "A Costa Azul é o teu maior activo visual. Vamos usá-lo.",
  ctaSubtitle: "Conta-nos o projecto. Respondemos em 24h com uma proposta inicial.",
  emailTitle: "Recebe o guia de vídeo marketing para empresas em Setúbal",
  emailDesc:
    "Como empresas na Costa Azul estão a usar conteúdo visual para crescer. Gratuito.",
};

export default function SetubalPage() {
  const faqItems = data.faqs.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", href: "/" },
          { name: "Serviços", href: "/servicos" },
          { name: "Regiões", href: "/servicos" },
          { name: "Setúbal", href: "/servicos/regioes/setubal" },
        ]}
      />
      <FAQSchema items={faqItems} />
      <RegiaoPageTemplate data={data} />
    </>
  );
}
