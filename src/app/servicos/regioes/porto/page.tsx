import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { RegiaoPageTemplate, type RegiaoData } from "@/components/sections/RegiaoPageTemplate";

export const metadata: Metadata = {
  title: "Produtora Audiovisual no Porto e Norte de Portugal | Beyond Focus",
  description:
    "Brand films, reels e fotografia para hotéis, restaurantes e marcas no Porto e Norte de Portugal. Produção audiovisual que converte — não apenas impressiona.",
  keywords: [
    "produtora audiovisual porto",
    "produtora video porto",
    "brand film porto",
    "filmagem norte portugal",
    "producao audiovisual norte portugal",
    "filmagem douro",
    "video institucional porto",
  ],
  openGraph: {
    title: "Produtora Audiovisual no Porto — Beyond Focus",
    description:
      "Brand films, reels e fotografia para hotéis, restaurantes e marcas no Porto. A equipa que transforma a cidade mais fotogénica da Europa em conteúdo que converte.",
    url: "https://beyondfocus.pt/servicos/regioes/porto",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Produção Audiovisual Porto — Beyond Focus" }],
  },
  alternates: { canonical: "https://beyondfocus.pt/servicos/regioes/porto" },
};

const data: RegiaoData = {
  regiao: "Porto",
  slug: "porto",
  label: "Norte de Portugal",
  hero: {
    title: "Produção audiovisual no Porto e Norte de Portugal",
    subtitle:
      "Brand films, reels e fotografia para hotéis, restaurantes e marcas com identidade no Norte.",
  },
  problem: {
    title: "Marcas no Porto com conteúdo fraco perdem clientes para Lisboa todos os dias.",
    p1: "A capital concentra orçamentos de marketing maiores e produtoras mais visíveis. Uma marca no Porto que não investe em conteúdo diferenciado perde para quem investe — independentemente de ter um produto melhor.",
    p2: "Vídeos genéricos, fotos de telemóvel e reels sem estratégia não comunicam o que torna uma marca do Norte única. O resultado é invisibilidade num mercado cada vez mais competitivo.",
  },
  solution: {
    title: "Tens a cidade mais fotogénica da Europa. Precisas da equipa certa para a captar.",
    p1: "O Porto tem uma identidade visual inconfundível — luz dourada, azulejo, granito, rio. Sabemos como usar esse contexto para criar conteúdo que distingue imediatamente a tua marca.",
    p2: "Não chegamos, filmamos e desaparecemos. Conhecemos o Norte, os seus ritmos, as suas histórias. Criamos conteúdo que serve meses de publicações — um investimento que trabalha continuamente.",
  },
  portfolio: [
    {
      slug: "hotel-casa-palmela",
      client: "Hotel Casa Palmela",
      category: "Hotelaria · 5 estrelas",
      thumb: "/images/portfolio/hcp-thumb.jpg",
    },
    {
      slug: "highgate",
      client: "Highgate",
      category: "Eventos Corporativos",
      thumb: "/images/portfolio/highgate-thumb.jpg",
    },
  ],
  faqs: [
    {
      q: "A equipa desloca-se ao Porto e Norte de Portugal?",
      a: "Sim. Trabalhamos regularmente no Porto, Braga, Guimarães, Viana do Castelo e Vale do Douro. Deslocação incluída em projectos a partir de meio dia de produção.",
    },
    {
      q: "Que tipo de clientes trabalham no Norte?",
      a: "Hotéis boutique, restaurantes de fine dining, quintas do Douro, marcas de lifestyle e empresas industriais com necessidade de comunicação visual diferenciada.",
    },
    {
      q: "Quanto tempo demora um Brand Film?",
      a: "Um Brand Film standard demora 2-4 semanas desde briefing até entrega. Pacotes de reels mensais podem começar em menos de uma semana.",
    },
    {
      q: "Trabalham no Vale do Douro e vinícolas?",
      a: "Sim. O enoturismo é uma das áreas onde mais trabalhamos no Norte. Conhecemos a luz, a sazonalidade e as necessidades de comunicação das quintas produtoras.",
    },
  ],
  ctaTitle: "O Porto merece conteúdo à altura.",
  ctaSubtitle: "Conta-nos o projecto. Respondemos em 24h com uma proposta inicial.",
  emailTitle: "Recebe o guia de vídeo marketing para o Norte de Portugal",
  emailDesc:
    "Como marcas no Porto e Norte estão a usar conteúdo para crescer além da região. Gratuito.",
};

export default function PortoPage() {
  const faqItems = data.faqs.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", href: "/" },
          { name: "Serviços", href: "/servicos" },
          { name: "Regiões", href: "/servicos" },
          { name: "Porto", href: "/servicos/regioes/porto" },
        ]}
      />
      <FAQSchema items={faqItems} />
      <RegiaoPageTemplate data={data} />
    </>
  );
}
