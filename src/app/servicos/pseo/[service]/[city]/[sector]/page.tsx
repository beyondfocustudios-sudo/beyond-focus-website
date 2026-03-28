import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import {
  HIGH_INTENT_COMBINATIONS,
  getCity,
  getServiceSeo,
  getSectorSeo,
  BLOG_LINKS_BY_SERVICE,
} from "@/lib/programmatic-seo-data";

const SERVICE_IMAGES: Record<string, string> = {
  "video-institucional": "/images/services/institucionais.jpg",
  "filme-comercial": "/images/services/filmes-comerciais.jpg",
  "conteudo-redes-sociais": "/images/services/redes-sociais.jpg",
  "fotografia-profissional": "/images/services/fotografia.jpg",
  "cobertura-eventos": "/images/services/videos-eventos.jpg",
  "brand-film": "/images/services/filmes-comerciais.jpg",
  "video-drone": "/images/blog/video-imobiliario-vender-rapido.jpg",
};

interface PageParams {
  service: string;
  city: string;
  sector: string;
}

export function generateStaticParams(): PageParams[] {
  return HIGH_INTENT_COMBINATIONS.map((c) => ({
    service: c.service,
    city: c.city,
    sector: c.sector,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug, sector: sectorSlug } = await params;
  const service = getServiceSeo(serviceSlug);
  const city = getCity(citySlug);
  const sector = getSectorSeo(sectorSlug);
  if (!service || !city || !sector) return {};

  const title = `${service.name} para ${sector.name} em ${city.name} | Beyond Focus`;
  const description = `${service.name} para ${sector.name} em ${city.name}. Beyond Focus produz conteúdo audiovisual diferenciado para ${sector.description} na ${city.region}. Pede orçamento gratuito.`;
  const canonical = `https://beyondfocus.pt/servicos/pseo/${serviceSlug}/${citySlug}/${sectorSlug}`;

  return {
    title,
    description,
    keywords: [
      `${service.shortName} ${sector.name.toLowerCase()} ${city.name.toLowerCase()}`,
      `produtora audiovisual ${sector.name.toLowerCase()} ${city.name.toLowerCase()}`,
      `vídeo ${sector.name.toLowerCase()} ${city.name.toLowerCase()}`,
      `produção audiovisual ${sector.name.toLowerCase()} ${city.name.toLowerCase()}`,
      `${service.shortName} ${city.name.toLowerCase()}`,
      ...sector.keywords.map((k) => `${k} ${city.name.toLowerCase()}`),
    ],
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
    },
    alternates: { canonical },
  };
}

function buildTripleFAQs(
  service: ReturnType<typeof getServiceSeo>,
  city: ReturnType<typeof getCity>,
  sector: ReturnType<typeof getSectorSeo>
): { question: string; answer: string }[] {
  if (!service || !city || !sector) return [];

  return [
    {
      question: `Produzem ${service.shortName} para ${sector.name} em ${city.name}?`,
      answer: `Sim. Trabalhamos com ${sector.description} em ${city.name} e na ${city.region}. Conhecemos as necessidades específicas do sector e o tipo de conteúdo que mais impacto tem neste mercado.`,
    },
    {
      question: `Qual o investimento para ${service.shortName} no sector da ${sector.name}?`,
      answer: `O investimento varia com a complexidade do projecto, mas para ${sector.description} em ${city.name} trabalhamos com propostas adaptadas ao sector e ao objectivo concreto — não pacotes rígidos. Pede um orçamento gratuito para uma proposta específica.`,
    },
    {
      question: `O que distingue a Beyond Focus neste sector?`,
      answer: `Experiência directa com ${sector.description} e um processo criativo que começa com a compreensão do negócio — não com a câmara. Apresentamos tratamento criativo completo antes de filmar, para que o cliente saiba exactamente o que vai receber.`,
    },
    {
      question: `Quanto tempo demora o projecto?`,
      answer: `A maioria dos projectos em ${city.name} tem um prazo de 2 a 6 semanas do briefing à entrega. Projectos de ${service.shortName} para ${sector.name} seguem um processo claro com fases definidas e acompanhamento em tempo real pelo portal da Beyond Focus.`,
    },
  ];
}

function buildTripleLocalSchema(
  service: ReturnType<typeof getServiceSeo>,
  city: ReturnType<typeof getCity>,
  sector: ReturnType<typeof getSectorSeo>
) {
  if (!service || !city || !sector) return null;

  return {
    "@context": "https://schema.org",
    "@type": ["VideoProductionCompany", "LocalBusiness"],
    name: "Beyond Focus",
    description: `${service.name} para ${sector.name} em ${city.name}`,
    url: `https://beyondfocus.pt/servicos/pseo/${service.slug}/${city.slug}/${sector.slug}`,
    logo: "https://beyondfocus.pt/images/logo-symbol.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lisboa",
      addressRegion: "Lisboa",
      addressCountry: "PT",
    },
    areaServed: [
      { "@type": "City", name: city.name },
      { "@type": "AdministrativeArea", name: city.region },
    ],
    knowsAbout: [sector.name, service.name, "Produção Audiovisual"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} para ${sector.name}`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `${service.name} para ${sector.name}`,
            description: `${service.description} Especializado para ${sector.description}.`,
          },
        },
      ],
    },
  };
}

function getSectorServiceIntro(
  service: ReturnType<typeof getServiceSeo>,
  city: ReturnType<typeof getCity>,
  sector: ReturnType<typeof getSectorSeo>
): string {
  if (!service || !city || !sector) return "";

  const map: Record<string, Record<string, string>> = {
    "hotelaria": {
      "video-institucional": `Um vídeo institucional para um hotel em ${city.name} não é apenas uma apresentação do espaço — é a decisão de reserva antecipada. Os hóspedes escolhem com base na percepção que têm antes de chegar. A Beyond Focus produz vídeos para ${sector.description} em ${city.name} que mostram a experiência completa: a atmosfera, os espaços, o serviço — tudo o que um hóspede quer sentir antes de reservar.`,
      "filme-comercial": `Um filme comercial para hotelaria em ${city.name} tem um objectivo simples e de alto impacto: converter visualizações em reservas. ${sector.challenge} A Beyond Focus cria filmes para ${sector.description} em ${city.name} que comunicam a experiência de forma que provoca desejo imediato — o tipo de conteúdo que gera reservas directas e reduz dependência de OTAs.`,
      "brand-film": `O brand film de um hotel em ${city.name} é o activo de comunicação de maior longevidade e maior impacto. ${sector.challenge} Um brand film bem feito comunica o que torna o espaço único — não apenas belo — e constrói o tipo de posicionamento que permite cobrar mais e fidelizar hóspedes.`,
      "fotografia-profissional": `A fotografia de hotelaria em ${city.name} tem impacto directo nas reservas. Plataformas de booking como Booking.com e Expedia mostram que propriedades com fotografia profissional têm taxas de conversão significativamente superiores. ${sector.challenge}`,
      "conteudo-redes-sociais": `Conteúdo mensal para redes sociais para hotéis em ${city.name} é a forma mais consistente de manter a marca presente no feed dos potenciais hóspedes. Reels, stories e conteúdo de atmosfera — produzido com direcção de arte e adaptado a cada plataforma.`,
      "video-drone": `A filmagem aérea de um hotel em ${city.name} mostra a localização, o contexto e a escala de uma propriedade de uma forma que nenhuma câmara no chão consegue. Para resorts, hotéis com piscina e propriedades com jardins ou vistas, o drone é a ferramenta que vende antes de o hóspede chegar.`,
      "cobertura-eventos": `Cobrir eventos de hotelaria em ${city.name} — galas, lançamentos, congressos corporativos — com qualidade profissional transforma cada evento num activo de comunicação. Conteúdo que documenta o evento serve marketing, relações públicas e comunicação de marca durante meses.`,
    },
    "restauracao": {
      "video-institucional": `Um vídeo para restaurante em ${city.name} comunica o que nenhum menu consegue — a atmosfera, a equipa, o nível de detalhe na cozinha. Na ${city.region}, restaurantes com conteúdo audiovisual diferenciado atraem mais clientes e posicionam-se acima da média no mercado cada vez mais competitivo de F&B.`,
      "filme-comercial": `Um filme comercial para restauração em ${city.name} tem o poder de despertar apetite antes de o cliente entrar. ${sector.challenge} A Beyond Focus produz conteúdo gastronómico com direcção de arte e conhecimento das especificidades de iluminação e ritmo necessárias para fazer comida e experiência comunicarem ao melhor nível.`,
      "brand-film": `O brand film de um restaurante em ${city.name} conta a história que está por trás da cozinha — o chef, a filosofia, os ingredientes, o espaço. ${sector.challenge} Para restaurantes de fine dining ou com identidade forte na ${city.region}, um brand film é o conteúdo que transforma visitantes ocasionais em clientes fidelizados.`,
      "fotografia-profissional": `Fotografia gastronómica em ${city.name} é uma especialidade que exige domínio de iluminação, composição e tempo. ${sector.challenge} A Beyond Focus produz fotografia de restauração com direcção de arte — imagens que funcionam no menu, no website, nas redes e nas plataformas de reservas.`,
      "conteudo-redes-sociais": `Conteúdo mensal para restaurantes em ${city.name}: reels de pratos, processos de cozinha, atmosfera e momentos de serviço — tudo produzido com qualidade que se distingue no feed e gera reservas orgânicas consistentes.`,
      "video-drone": `Filmagem aérea para restaurantes em ${city.name} com esplanadas, terraços ou localizações únicas — perspectivas que comunicam a experiência completa do espaço antes de qualquer visita.`,
      "cobertura-eventos": `Eventos gastronómicos em ${city.name} — jantares temáticos, lançamentos de menu, noites especiais — documentados com rigor fotográfico e cinematográfico para alimentar semanas de comunicação nas redes sociais.`,
    },
    "corporate": {
      "video-institucional": `Empresas corporate em ${city.name} precisam de um vídeo institucional que combine rigor e humanidade. ${sector.challenge} A Beyond Focus produz institucionais para ${sector.description} na ${city.region} que apresentam a empresa ao mais alto nível — para clientes, investidores e candidatos a colaboradores.`,
      "filme-comercial": `Filmes comerciais para o sector corporate em ${city.name}: campanhas B2B, lançamentos de produto, vídeos de posicionamento de marca. Conteúdo com estratégia criativa sólida para empresas que sabem que a comunicação visual é um factor competitivo.`,
      "brand-film": `O brand film para uma empresa corporate em ${city.name} é o activo que comunica cultura, valores e identidade de forma que atrai talento e fideliza clientes. Para empresas na ${city.region} que competem por pessoas e por mercado, um brand film diferenciado é um investimento de longa duração.`,
      "fotografia-profissional": `Fotografia corporativa em ${city.name}: equipas, instalações, liderança e produto — com direcção de arte e um olhar que vai além da foto de equipa genérica. Para empresas na ${city.region} que querem que a sua comunicação visual reflicta o nível de qualidade do negócio.`,
      "conteudo-redes-sociais": `Conteúdo mensal para LinkedIn e redes sociais para empresas em ${city.name}: conteúdo de cultura, produto, equipa e thought leadership — produzido com qualidade de produtora, publicado com consistência de equipa interna.`,
      "cobertura-eventos": `Cobertura de eventos corporativos em ${city.name}: conferências, gala-jantares, lançamentos e team-building — documentados com profissionalismo e entregues prontos para comunicação interna e externa.`,
    },
    "imobiliario": {
      "video-institucional": `Vídeo institucional para promotores imobiliários em ${city.name}: apresentação da empresa, do portefólio e da metodologia para clientes de alto valor na ${city.region}. ${sector.challenge}`,
      "filme-comercial": `Filmes comerciais para projectos imobiliários em ${city.name}: lançamentos, visitas virtuais e comunicação de desenvolvimento. ${sector.challenge} Conteúdo que acelera o processo de decisão de compra.`,
      "brand-film": `Brand film para empresas de imobiliário em ${city.name}: narrativa que comunica a visão, os projectos e os valores de um promotor para um público exigente na ${city.region}.`,
      "fotografia-profissional": `Fotografia imobiliária em ${city.name} com direcção de arte: apartamentos, moradias, espaços comerciais e empreendimentos — captados para vender, não apenas para documentar. ${sector.challenge}`,
      "video-drone": `Filmagem aérea para imobiliário em ${city.name}: contexto de localização, dimensão de terreno, relação com a envolvente urbana — perspectivas que o comprador precisa de ver e que nenhuma câmara no chão oferece. ${sector.challenge}`,
      "cobertura-eventos": `Cobertura de lançamentos de projectos imobiliários em ${city.name}: eventos de apresentação, visitas guiadas e conferências de imprensa documentados para prolongar o impacto de comunicação do lançamento.`,
    },
    "tecnologia": {
      "video-institucional": `Vídeo institucional para empresas de tecnologia em ${city.name}: transformar produtos complexos em histórias acessíveis. ${sector.challenge} A Beyond Focus produz institucionais para tech na ${city.region} que comunicam com precisão e impacto.`,
      "filme-comercial": `Filmes comerciais para startups e scale-ups em ${city.name}: product demos, campanhas de lançamento e vídeos de posicionamento para um mercado que consome conteúdo em velocidade. ${sector.challenge}`,
      "brand-film": `Brand film para empresas de tecnologia em ${city.name}: cultura de equipa, visão do produto e história do fundador — conteúdo que atrai talento e valida a empresa perante investidores e clientes na ${city.region}.`,
      "fotografia-profissional": `Fotografia para empresas de tecnologia em ${city.name}: equipas, produto, escritório e eventos — com uma estética que reflicta o nível de inovação da empresa e a diferencie na comunicação.`,
      "conteudo-redes-sociais": `Conteúdo mensal para redes sociais de empresas tech em ${city.name}: cultura de equipa, product updates, behind-the-scenes e thought leadership — estratégico e consistente para crescimento orgânico.`,
      "cobertura-eventos": `Cobertura de eventos tech em ${city.name}: meetups, demos day, hackathons e conferências — documentados com qualidade para comunicação institucional e geração de conteúdo.`,
    },
    "saude": {
      "video-institucional": `Vídeo institucional para clínicas e grupos de saúde em ${city.name}: apresentação das instalações, da equipa médica e dos serviços de forma que inspire confiança. ${sector.challenge}`,
      "filme-comercial": `Filmes para o sector da saúde em ${city.name}: comunicação de serviços, apresentação de especialidades e campanhas de awareness — com o rigor e a sensibilidade que o sector exige.`,
      "brand-film": `Brand film para clínicas em ${city.name}: a história da instituição, os valores clínicos e o compromisso com os pacientes — conteúdo que humaniza e diferencia num sector onde a confiança é o activo mais valioso.`,
      "fotografia-profissional": `Fotografia para o sector da saúde em ${city.name}: instalações, equipa médica e ambiente clínico — captados com uma abordagem que inspira confiança e comunica o nível de qualidade dos serviços.`,
      "conteudo-redes-sociais": `Conteúdo mensal para clínicas e profissionais de saúde em ${city.name}: educação para a saúde, apresentação de serviços e humanização da equipa — conteúdo que constrói credibilidade e acompanhamento.`,
    },
    "educacao": {
      "video-institucional": `Vídeo institucional para instituições de ensino em ${city.name}: apresentação da escola, dos valores pedagógicos e do ambiente para famílias e candidatos — conteúdo que diferencia numa área de concorrência crescente.`,
      "brand-film": `Brand film para escolas e universidades em ${city.name}: a identidade da instituição, os resultados dos alunos e a visão pedagógica — conteúdo que atrai candidatos e comunica excelência educativa.`,
      "fotografia-profissional": `Fotografia para instituições de educação em ${city.name}: campus, equipa docente, alunos e actividades — captados com uma estética que reflicta o nível de qualidade do ensino.`,
      "conteudo-redes-sociais": `Conteúdo mensal para escolas em ${city.name}: vida no campus, projectos de alunos, eventos e conquistas — produzido com consistência para manter a comunidade educativa activa e atrair novos candidatos.`,
      "cobertura-eventos": `Cobertura de eventos académicos em ${city.name}: cerimónias de graduação, conferências, festas de faculdade e feiras de emprego — documentados para memória institucional e comunicação externa.`,
    },
    "moda-lifestyle": {
      "filme-comercial": `Filmes comerciais para marcas de moda e lifestyle em ${city.name}: campanhas de colecção, lançamentos de produto e conteúdo de marca — com a estética e o ritmo que as marcas de lifestyle exigem para competir na atenção do consumidor.`,
      "brand-film": `Brand film para marcas de moda e lifestyle em ${city.name}: identidade, valores e estética da marca em formato cinematográfico. ${sector.challenge}`,
      "fotografia-profissional": `Fotografia de moda e produto em ${city.name}: lookbooks, e-commerce e editorial — com direcção de arte que traduz a identidade da marca em imagens que vendem. ${sector.challenge}`,
      "conteudo-redes-sociais": `Conteúdo mensal para marcas de moda e lifestyle em ${city.name}: reels de produto, campanha e lifestyle — produzido com uma estética consistente que posiciona a marca onde o consumidor está.`,
      "video-institucional": `Vídeo institucional para marcas de moda em ${city.name}: a história da marca, o processo criativo e os valores — conteúdo B2B que abre portas com distribuidores, retalhistas e parceiros de negócio.`,
    },
  };

  const sectorMap = map[sector.slug];
  if (sectorMap) {
    const specificContent = sectorMap[service.slug];
    if (specificContent) return specificContent;
  }

  return `${service.name} para ${sector.description} em ${city.name}. Na ${city.region}, ${sector.challenge.toLowerCase()} A Beyond Focus produz conteúdo audiovisual especializado para ${sector.name.toLowerCase()} com um processo criativo rigoroso — briefing, tratamento criativo aprovado, produção e entrega em todos os formatos.`;
}

export default async function ServiceCitySectorPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { service: serviceSlug, city: citySlug, sector: sectorSlug } = await params;
  const service = getServiceSeo(serviceSlug);
  const city = getCity(citySlug);
  const sector = getSectorSeo(sectorSlug);
  if (!service || !city || !sector) notFound();

  const faqs = buildTripleFAQs(service, city, sector);
  const localSchema = buildTripleLocalSchema(service, city, sector);
  const intro = getSectorServiceIntro(service, city, sector);
  const relatedBlogPosts = BLOG_LINKS_BY_SERVICE[serviceSlug] ?? [];
  const heroImage = SERVICE_IMAGES[serviceSlug] ?? "/images/services/institucionais.jpg";

  return (
    <>
      {localSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
        />
      )}
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Início", href: "/" },
          { name: "Serviços", href: "/servicos" },
          { name: service.name, href: `/servicos/${service.mainServiceSlug}` },
          { name: city.name, href: `/servicos/pseo/${serviceSlug}/${citySlug}` },
          { name: sector.name, href: `/servicos/pseo/${serviceSlug}/${citySlug}/${sectorSlug}` },
        ]}
      />
      <Navbar variant="light" />
      <main className="bg-[#F5F5F5]">
        {/* Hero */}
        <section className="mx-auto max-w-[900px] px-6 pt-[200px] pb-16 md:px-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[2px] text-[#FA8334]">
              {sector.name}
            </span>
            <span className="text-[11px] text-[#0E3A45]/25">·</span>
            <span className="font-mono text-[11px] uppercase tracking-[2px] text-[#0E3A45]/50">
              {city.name}
            </span>
            <span className="text-[11px] text-[#0E3A45]/25">·</span>
            <span className="font-mono text-[11px] uppercase tracking-[2px] text-[#0E3A45]/50">
              {service.name}
            </span>
          </div>
          <h1 className="text-[clamp(28px,3.5vw,48px)] font-bold leading-[1.1] tracking-tight text-[#0E3A45]">
            {service.name} para {sector.name} em {city.name}
          </h1>
          <p className="mt-6 text-[clamp(17px,1.5vw,20px)] leading-[1.7] text-[#0E3A45]/70 max-w-[680px]">
            {intro}
          </p>
          <div className="mt-8">
            <Link
              href="/contacto"
              className="inline-block rounded-full bg-[#FA8334] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[#e5732e]"
            >
              Pedir orçamento gratuito
            </Link>
          </div>
        </section>

        {/* Hero image */}
        <section className="mx-auto max-w-[900px] px-6 pb-16 md:px-10">
          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/7" }}>
            <Image
              src={heroImage}
              alt={`${service.name} para ${sector.name} em ${city.name} — Beyond Focus`}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Sector challenge */}
        <section className="mx-auto max-w-[900px] px-6 pb-16 md:px-10">
          <div className="rounded-2xl border border-[#0E3A45]/10 bg-white p-8">
            <p className="font-mono text-[11px] uppercase tracking-[2px] text-[#FA8334] mb-3">
              O desafio do sector
            </p>
            <p className="text-[17px] leading-[1.8] text-[#0E3A45]/70">
              {sector.challenge}
            </p>
          </div>
        </section>

        {/* Service description */}
        <section className="mx-auto max-w-[720px] px-6 pb-16 md:px-10">
          <h2 className="text-[clamp(20px,2.5vw,28px)] font-bold text-[#0E3A45] mb-4">
            O que inclui a produção
          </h2>
          <p className="text-[17px] leading-[1.8] text-[#0E3A45]/70">
            {service.description}
          </p>
        </section>

        {/* City context */}
        <section className="mx-auto max-w-[900px] px-6 pb-16 md:px-10">
          <div className="rounded-2xl bg-[#0E3A45] p-8 text-white">
            <p className="font-mono text-[11px] uppercase tracking-[2px] text-[#FA8334] mb-3">
              {city.region}
            </p>
            <h2 className="text-[clamp(18px,2vw,24px)] font-bold mb-3">
              {sector.name} em {city.name}
            </h2>
            <p className="text-white/75 text-[16px] leading-[1.7]">
              {city.notableContext}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {city.landmarks.map((landmark) => (
                <span
                  key={landmark}
                  className="rounded-full border border-white/20 px-3 py-1 text-[12px] text-white/60"
                >
                  {landmark}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-[720px] px-6 pb-16 md:px-10">
          <h2 className="text-[clamp(22px,2.5vw,30px)] font-bold text-[#0E3A45] mb-8">
            Perguntas frequentes
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[#0E3A45]/10 pb-6">
                <h3 className="font-semibold text-[17px] text-[#0E3A45] mb-2">
                  {faq.question}
                </h3>
                <p className="text-[16px] leading-[1.7] text-[#0E3A45]/70">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related blog posts */}
        {relatedBlogPosts.length > 0 && (
          <section className="mx-auto max-w-[900px] px-6 pb-16 md:px-10">
            <h2 className="text-[clamp(20px,2vw,26px)] font-bold text-[#0E3A45] mb-6">
              Artigos relacionados
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedBlogPosts.map((post) => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="group flex items-start gap-3 rounded-xl border border-[#0E3A45]/10 bg-white p-5 transition-all hover:border-[#FA8334]/40 hover:shadow-md"
                >
                  <span className="mt-0.5 text-[#FA8334] text-lg">→</span>
                  <span className="text-[15px] font-medium text-[#0E3A45] group-hover:text-[#FA8334] transition-colors leading-snug">
                    {post.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal links */}
        <section className="mx-auto max-w-[900px] px-6 pb-16 md:px-10">
          <div className="flex flex-wrap gap-3 text-[13px]">
            <Link
              href={`/servicos/${service.mainServiceSlug}`}
              className="rounded-full border border-[#0E3A45]/20 px-4 py-2 text-[#0E3A45]/60 hover:text-[#0E3A45] hover:border-[#0E3A45]/40 transition-colors"
            >
              Serviço: {service.name}
            </Link>
            <Link
              href={`/servicos/pseo/${serviceSlug}/${citySlug}`}
              className="rounded-full border border-[#0E3A45]/20 px-4 py-2 text-[#0E3A45]/60 hover:text-[#0E3A45] hover:border-[#0E3A45]/40 transition-colors"
            >
              {service.name} em {city.name}
            </Link>
            <Link
              href={`/servicos/sectores/${sectorSlug}`}
              className="rounded-full border border-[#0E3A45]/20 px-4 py-2 text-[#0E3A45]/60 hover:text-[#0E3A45] hover:border-[#0E3A45]/40 transition-colors"
            >
              Sector: {sector.name}
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-[#0E3A45]/20 px-4 py-2 text-[#0E3A45]/60 hover:text-[#0E3A45] hover:border-[#0E3A45]/40 transition-colors"
            >
              Portfolio
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-[720px] px-6 pb-24 md:px-10">
          <div className="rounded-2xl bg-[#0E3A45] p-10 text-center text-white">
            <h2 className="mb-3 text-[clamp(22px,2.5vw,30px)] font-bold">
              {service.name} para {sector.name} em {city.name}
            </h2>
            <p className="mb-6 text-white/70 text-[16px] leading-[1.7] max-w-[480px] mx-auto">
              Conta-nos o projecto. Respondemos em 24 horas com uma proposta adaptada ao teu sector e à tua cidade.
            </p>
            <Link
              href="/contacto"
              className="inline-block rounded-full bg-[#FA8334] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[#e5732e]"
            >
              Pedir orçamento gratuito
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
