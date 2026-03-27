import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { RegiaoPageTemplate, type RegiaoData } from "@/components/sections/RegiaoPageTemplate";

export const metadata: Metadata = {
  title: "Produtora Audiovisual no Algarve — Resorts, Hotéis e Turismo | Beyond Focus",
  description:
    "Brand films e conteúdo para resorts, hotéis e marcas de turismo no Algarve. Produção audiovisual que mostra o que torna o teu espaço único — não apenas bonito.",
  keywords: [
    "produtora audiovisual algarve",
    "producao video algarve",
    "brand film hotel algarve",
    "filmagem resort algarve",
    "video turismo algarve",
    "producao audiovisual faro",
    "brand film algarve",
  ],
  openGraph: {
    title: "Produtora Audiovisual no Algarve — Beyond Focus",
    description:
      "Brand films e conteúdo para resorts e hotéis no Algarve. Criamos conteúdo que distingue o teu espaço de 500 outros com 300 dias de sol.",
    url: "https://beyondfocus.pt/servicos/regioes/algarve",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Produção Audiovisual Algarve — Beyond Focus" }],
  },
  alternates: { canonical: "https://beyondfocus.pt/servicos/regioes/algarve" },
};

const data: RegiaoData = {
  regiao: "Algarve",
  slug: "algarve",
  label: "Turismo & Resorts",
  hero: {
    title: "Produção audiovisual no Algarve",
    subtitle:
      "Brand films e conteúdo para resorts, hotéis e marcas de turismo que querem liderar o mercado.",
  },
  problem: {
    title: "O Algarve tem 300 dias de sol. O teu hotel parece igual a 500 outros.",
    p1: "O mercado de hotelaria no Algarve é ultra-competitivo. Preço, localização e amenidades são quase iguais entre propriedades concorrentes. A diferença está na percepção — e a percepção constrói-se com conteúdo.",
    p2: "Fotos de drone da costa, piscinas ao pôr-do-sol e cocktails na praia — todos têm. O hóspede que queres atrair já viu isso milhares de vezes e não decide com base nisso.",
  },
  solution: {
    title: "Criamos conteúdo que mostra o que torna o teu espaço único — não apenas bonito, mas diferente.",
    p1: "Trabalhamos na narrativa antes de ligar a câmara. O que é que o teu hotel tem que os outros não têm? Qual é a experiência que o hóspede certo procura? Esse é o conteúdo que produzimos.",
    p2: "Brand films com personagem, reels com história, fotografia com contexto. Conteúdo que atrai o perfil de hóspede que o teu hotel serve melhor — e que está disposto a pagar o teu preço.",
  },
  portfolio: [
    {
      slug: "hotel-casa-palmela",
      client: "Hotel Casa Palmela",
      category: "Hotelaria · Referência Luxury",
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
      q: "A equipa desloca-se ao Algarve?",
      a: "Sim. Trabalhamos no Algarve durante todo o ano. Para projectos de maior dimensão, podemos combinar várias propriedades numa mesma deslocação para optimizar custos.",
    },
    {
      q: "Trabalham com resorts grandes e boutiques?",
      a: "Sim, com abordagens diferentes. Um resort precisa de conteúdo que mostre escala e variedade. Um boutique precisa de conteúdo que mostre personalidade e detalhe. Sabemos fazer os dois.",
    },
    {
      q: "Época alta vs época baixa — quando é melhor filmar?",
      a: "Depende do objectivo. Época alta tem movimento e energia. Época baixa tem luz mais suave, menos pessoas e mais tempo de acesso ao espaço. Recomendamos filmar nas duas para ter conteúdo para o ano todo.",
    },
    {
      q: "Trabalham com grupos hoteleiros com múltiplas unidades no Algarve?",
      a: "Sim. Já trabalhámos com grupos com múltiplas unidades, criando sistemas de conteúdo com estilo visual consistente para toda a colecção. Escalável e eficiente.",
    },
  ],
  ctaTitle: "O Algarve é o mercado mais competitivo de Portugal. O teu conteúdo tem de ser o melhor.",
  ctaSubtitle: "Conta-nos o projecto. Respondemos em 24h com uma proposta inicial.",
  emailTitle: "Recebe o guia de vídeo marketing para hotéis no Algarve",
  emailDesc:
    "Como resorts e hotéis no Algarve estão a usar conteúdo para se distinguir e aumentar reservas directas. Gratuito.",
};

export default function AlgarvePage() {
  const faqItems = data.faqs.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", href: "/" },
          { name: "Serviços", href: "/servicos" },
          { name: "Regiões", href: "/servicos" },
          { name: "Algarve", href: "/servicos/regioes/algarve" },
        ]}
      />
      <FAQSchema items={faqItems} />
      <RegiaoPageTemplate data={data} />
    </>
  );
}
