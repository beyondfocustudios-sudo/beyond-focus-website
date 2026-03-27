import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { RegiaoPageTemplate, type RegiaoData } from "@/components/sections/RegiaoPageTemplate";

export const metadata: Metadata = {
  title: "Produtora Audiovisual no Alentejo — Herdades, Vinícolas e Hotéis Rurais | Beyond Focus",
  description:
    "Brand films para herdades, vinícolas e hotéis rurais no Alentejo. Captamos a luz dourada alentejana para atrair os hóspedes e visitantes certos.",
  keywords: [
    "produtora audiovisual alentejo",
    "producao video alentejo",
    "brand film herdade alentejo",
    "filmagem enoturismo alentejo",
    "video vinicola alentejo",
    "brand film hotel rural alentejo",
    "filmagem alentejo",
  ],
  openGraph: {
    title: "Produtora Audiovisual no Alentejo — Beyond Focus",
    description:
      "Brand films para herdades, vinícolas e hotéis rurais. A luz dourada do Alentejo é o teu activo visual mais valioso — sabemos como captá-la.",
    url: "https://beyondfocus.pt/servicos/regioes/alentejo",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Produção Audiovisual Alentejo — Beyond Focus" }],
  },
  alternates: { canonical: "https://beyondfocus.pt/servicos/regioes/alentejo" },
};

const data: RegiaoData = {
  regiao: "Alentejo",
  slug: "alentejo",
  label: "Herdades & Enoturismo",
  hero: {
    title: "Produção audiovisual no Alentejo",
    subtitle:
      "Brand films para herdades, vinícolas e hotéis rurais que querem atrair os hóspedes certos.",
  },
  problem: {
    title: "O turismo de vinho cresce 30% ao ano. A maioria das herdades ainda comunica com fotos de telemóvel.",
    p1: "O visitante de enoturismo é exigente, pesquisa antes de reservar e compara várias propriedades. Se o teu conteúdo não transmite a experiência que vais oferecer, ele escolhe outra herdade.",
    p2: "Fotos de garrafa em fundo branco, vídeos de drone sem narrativa e imagens de stock não comunicam o que torna a tua propriedade única. O resultado: visibilidade zero num mercado em crescimento.",
  },
  solution: {
    title: "A luz dourada do Alentejo é o activo visual mais valioso de uma herdade. Sabemos como captá-la.",
    p1: "Conhecemos a sazonalidade alentejana — a vindima, a floração, o Verão seco, o Inverno suave. Sabemos quando e como filmar para mostrar a tua propriedade no seu melhor momento.",
    p2: "Criamos brand films que contam a história da tua herdade — o terroir, a equipa, a filosofia. Conteúdo que serve o website, Instagram, LinkedIn e campanhas durante meses.",
  },
  portfolio: [
    {
      slug: "soce",
      client: "Sóçe",
      category: "Gastronomia & Lifestyle",
      thumb: "/images/portfolio/soce-thumb.jpg",
    },
    {
      slug: "highgate",
      client: "Highgate",
      category: "Eventos & Experiências",
      thumb: "/images/portfolio/highgate-thumb.jpg",
    },
  ],
  faqs: [
    {
      q: "A equipa desloca-se ao Alentejo?",
      a: "Sim. Trabalhamos regularmente no Alentejo — Évora, Beja, Portalegre e todo o interior. A deslocação é incluída em projectos a partir de um dia de produção.",
    },
    {
      q: "Qual o melhor período para filmar uma herdade?",
      a: "Depende do que queres mostrar. A vindima (Setembro/Outubro) é cinematograficamente extraordinária. A Primavera tem floração e verde. Trabalhamos em qualquer período conforme a narrativa.",
    },
    {
      q: "Trabalham com propriedades rurais e eco-turismo?",
      a: "Sim. Além de vinícolas, trabalhamos com turismo de natureza, glamping, herdades de eventos e hotéis rurais com identidade própria.",
    },
    {
      q: "Como gerem a sazonalidade na produção de conteúdo?",
      a: "Planeamos antecipadamente para captar as diferentes estações numa ou duas visitas anuais, criando conteúdo variado para usar ao longo do ano.",
    },
  ],
  ctaTitle: "A tua herdade tem uma história para contar. Vamos filmá-la.",
  ctaSubtitle: "Conta-nos o projecto. Respondemos em 24h com uma proposta inicial.",
  emailTitle: "Recebe o guia de vídeo marketing para enoturismo e hotelaria rural",
  emailDesc:
    "Como herdades e hotéis rurais em Portugal usam conteúdo para atrair mais visitantes. Gratuito.",
};

export default function AlentejoPage() {
  const faqItems = data.faqs.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", href: "/" },
          { name: "Serviços", href: "/servicos" },
          { name: "Regiões", href: "/servicos" },
          { name: "Alentejo", href: "/servicos/regioes/alentejo" },
        ]}
      />
      <FAQSchema items={faqItems} />
      <RegiaoPageTemplate data={data} />
    </>
  );
}
