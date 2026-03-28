import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import {
  CITIES,
  SERVICES_SEO,
  SECTORS_SEO,
  getCity,
  getServiceSeo,
  BLOG_LINKS_BY_SERVICE,
} from "@/lib/programmatic-seo-data";

interface PageParams {
  service: string;
  city: string;
}

export function generateStaticParams(): PageParams[] {
  const params: PageParams[] = [];
  for (const service of SERVICES_SEO) {
    for (const city of CITIES) {
      params.push({ service: service.slug, city: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getServiceSeo(serviceSlug);
  const city = getCity(citySlug);
  if (!service || !city) return {};

  const title = `${service.name} em ${city.name} — Produtora Audiovisual | Beyond Focus`;
  const description = `${service.name} em ${city.name} para empresas que querem resultados. Beyond Focus: produção audiovisual diferenciada na ${city.region}. Pede orçamento gratuito.`;
  const canonical = `https://beyondfocus.pt/servicos/pseo/${serviceSlug}/${citySlug}`;

  return {
    title,
    description,
    keywords: [
      `${service.shortName} ${city.name.toLowerCase()}`,
      `produtora audiovisual ${city.name.toLowerCase()}`,
      `produção audiovisual ${city.name.toLowerCase()}`,
      `${service.shortName} empresa ${city.name.toLowerCase()}`,
      `produtora vídeo ${city.name.toLowerCase()}`,
      `beyond focus ${city.name.toLowerCase()}`,
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

function buildFAQs(
  service: ReturnType<typeof getServiceSeo>,
  city: ReturnType<typeof getCity>
): { question: string; answer: string }[] {
  if (!service || !city) return [];

  const serviceLabel = service.shortName;
  const cityName = city.name;
  const region = city.region;

  const base: { question: string; answer: string }[] = [
    {
      question: `A Beyond Focus faz ${serviceLabel} em ${cityName}?`,
      answer: `Sim. Trabalhamos regularmente em ${cityName} e na ${region}. A equipa desloca-se para produção e o processo de briefing e aprovação corre em remoto através do nosso portal exclusivo.`,
    },
    {
      question: `Qual o investimento para ${serviceLabel} em ${cityName}?`,
      answer: `O investimento varia conforme a complexidade do projecto. Para empresas em ${cityName} e na ${region}, oferecemos propostas adaptadas ao objectivo e ao contexto — sem pacotes rígidos. Pede um orçamento gratuito para receberes uma proposta específica para o teu projecto.`,
    },
    {
      question: `Quanto tempo demora a produção?`,
      answer: `A maioria dos projectos demora entre 2 a 6 semanas do briefing à entrega final, dependendo da complexidade. Projectos em ${cityName} seguem o mesmo processo que projectos em Lisboa — com o mesmo rigor e os mesmos prazos.`,
    },
    {
      question: `Como funciona o acompanhamento do projecto à distância?`,
      answer: `Todos os clientes têm acesso ao Beyond Focus Portal, onde acompanham cada fase, enviam referências, comunicam com a equipa e revêem o material com comentários ao segundo. Trabalhar com clientes fora de Lisboa é parte do nosso modelo — não uma excepção.`,
    },
  ];

  return base;
}

function buildLocalBusinessSchema(
  service: ReturnType<typeof getServiceSeo>,
  city: ReturnType<typeof getCity>
) {
  if (!service || !city) return null;

  return {
    "@context": "https://schema.org",
    "@type": ["VideoProductionCompany", "LocalBusiness"],
    name: "Beyond Focus",
    description: `${service.name} em ${city.name} — produtora audiovisual diferenciada`,
    url: `https://beyondfocus.pt/servicos/pseo/${service.slug}/${city.slug}`,
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.name,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.description,
          },
        },
      ],
    },
  };
}

function getServiceBodyContent(
  service: ReturnType<typeof getServiceSeo>,
  city: ReturnType<typeof getCity>
): { intro: string; bodyParagraphs: string[]; whySection: string; processNote: string } {
  if (!service || !city) {
    return { intro: "", bodyParagraphs: [], whySection: "", processNote: "" };
  }

  const cityName = city.name;
  const serviceName = service.name;
  const region = city.region;

  const intros: Record<string, string> = {
    "video-institucional": `Um vídeo institucional em ${cityName} não é apenas uma apresentação de empresa — é a forma como o mundo te vê pela primeira vez. Na ${region}, onde o tecido empresarial cresce e a concorrência por talento, clientes e parceiros é cada vez mais intensa, uma empresa que comunica com clareza e rigor visual tem uma vantagem real. A Beyond Focus produz vídeos institucionais para empresas em ${cityName} que querem ser levadas a sério — por investidores, clientes e colaboradores.`,
    "filme-comercial": `Um filme comercial produzido em ${cityName} tem o potencial de transformar a percepção de uma marca num mercado local e nacional. Na ${region}, marcas que investem em conteúdo audiovisual diferenciado capturam atenção onde antes eram invisíveis. A Beyond Focus cria filmes comerciais para empresas em ${cityName} com um processo criativo rigoroso: tratamento completo antes de filmar, sem surpresas, com resultados mensuráveis.`,
    "conteudo-redes-sociais": `Produzir conteúdo para redes sociais em ${cityName} exige mais do que uma câmara e uma conta de Instagram. Exige estratégia, consistência e conhecimento do mercado local. Na ${region}, as marcas que dominam o conteúdo nas redes ganham clientes que a concorrência não consegue alcançar com publicidade convencional. A Beyond Focus produz conteúdo mensal para marcas em ${cityName} — estratégico, diferenciado e pronto a publicar.`,
    "fotografia-profissional": `Fotografia profissional em ${cityName} é um investimento que trabalha continuamente para a tua marca. Cada imagem no website, nas redes sociais ou em materiais de comunicação é uma oportunidade de causar uma primeira impressão — ou confirmar a qualidade que o cliente espera. Na ${region}, marcas com identidade visual forte fecham mais negócio, atraem melhores clientes e comunicam ao nível do mercado onde querem competir.`,
    "cobertura-eventos": `Cobrir um evento em ${cityName} com qualidade profissional é transformar horas de acontecimento em meses de conteúdo. Conferências, lançamentos, gala-jantares — a Beyond Focus garante que cada momento fica registado com rigor fotográfico e cinematográfico, pronto para publicar nas redes, no website e em comunicação corporativa. Equipas dedicadas, entrega faseada, conteúdo que continua a trabalhar depois do evento acabar.`,
    "brand-film": `Um brand film feito em ${cityName} é mais do que um vídeo bonito — é a alma da tua marca em movimento. Para empresas na ${region} que querem construir uma identidade visual sólida e duradoura, um brand film é o activo de comunicação com maior retorno ao longo do tempo. A Beyond Focus desenvolve brand films com rigor cinematográfico e profundidade estratégica — conteúdo que representa a marca durante anos, não meses.`,
    "video-drone": `Filmagem aérea com drone em ${cityName} abre perspectivas que nenhuma câmara no chão consegue capturar. Na ${region}, propriedades, hotéis, eventos e projectos de desenvolvimento imobiliário beneficiam de imagens aéreas que contextualizam, impressionam e vendem. A Beyond Focus opera drones profissionais com pilotos certificados — filmagem aérea que cumpre regulamentação, sem compromissos na qualidade.`,
  };

  const bodyMap: Record<string, string[]> = {
    "video-institucional": [
      `O processo começa com uma reunião de alinhamento onde percebemos o que a empresa faz, para quem faz e o que quer comunicar. Não apresentamos orçamentos genéricos sem antes entender o negócio. A partir daí, desenvolvemos um roteiro narrativo — a estrutura da história que o vídeo vai contar — antes de qualquer dia de filmagem.`,
      `Para empresas em ${cityName}, a logística de produção é simples: a equipa desloca-se, o cliente acompanha tudo no portal exclusivo da Beyond Focus e as aprovações correm de forma organizada, sem email chains confusos. Entregamos a versão principal e versões curtas optimizadas para todas as plataformas — website, LinkedIn, Instagram, apresentações.`,
      `O resultado é um activo de comunicação com vida útil de 2 a 5 anos. Empresas em ${cityName} que investem num vídeo institucional bem feito usam-no em reuniões com clientes, no website, em feiras sectoriais e no recrutamento. Um vídeo com estratégia por trás trabalha continuamente — não desaparece numa pasta de ficheiros.`,
    ],
    "filme-comercial": [
      `Um filme comercial para uma marca em ${cityName} começa com um tratamento criativo completo — o processo inteiro do filme descrito cena a cena, antes de filmar um único frame. Quando o cliente aprova o tratamento, entra em pré-produção com visibilidade total sobre o que vai acontecer.`,
      `A produção em ${cityName} e na ${region} segue o mesmo processo rigoroso que projectos em Lisboa: equipa dedicada, planning detalhado, dia de filmagem focado no resultado. Entregamos múltiplos formatos — horizontal para YouTube e websites, vertical para Reels e TikTok, quadrado para feed — produzidos na mesma sessão.`,
      `Para marcas em ${cityName} que querem lançar um produto, reposicionar uma oferta ou criar uma campanha de awareness, um filme comercial bem feito é o investimento com maior impacto percebido a custo controlado. O diferencial não é a câmara — é a estratégia criativa por trás de cada plano.`,
    ],
    "conteudo-redes-sociais": [
      `A produção mensal de conteúdo para redes sociais para marcas em ${cityName} funciona num ciclo simples: no início do mês definimos temas e formatos, agendamos o dia de produção, filmamos e editamos, e entregamos ficheiros prontos a publicar com sugestões de copy e timing.`,
      `Para marcas na ${region}, a frequência de publicação é o que separa os perfis com crescimento orgânico dos que ficam estagnados. Conteúdo profissional consistente — reels, stories, vídeos curtos — posiciona a marca onde o cliente está: no feed, todos os dias.`,
      `Não fazemos gestão de redes — fazemos algo mais valioso: garantimos que a tua equipa nunca fica sem conteúdo profissional para publicar. A tua marca em ${cityName} mantém presença visual de qualidade sem precisar de uma equipa interna de produção.`,
    ],
    "fotografia-profissional": [
      `Uma sessão de fotografia profissional em ${cityName} começa com direcção de arte — definimos o estilo, as referências e o objectivo de cada imagem antes de apertar o obturador. Não chegamos com uma câmara e improvisamos. Chegamos com um plano visual que serve os objectivos da marca.`,
      `Para empresas e estabelecimentos na ${region}, entregamos sempre uma selecção curada de alta qualidade em múltiplos formatos — alta resolução para impressão e versões optimizadas para web e redes sociais. O banco de imagens que construímos numa sessão bem planeada dura meses de comunicação.`,
      `Fotografia corporativa, de produto, gastronómica ou de ambiente — cada tipo de sessão tem uma abordagem específica adaptada ao sector e ao objectivo. Marcas em ${cityName} que investem em fotografia com direcção de arte têm um nível de consistência visual que se reflecte na percepção de qualidade.`,
    ],
    "cobertura-eventos": [
      `A cobertura de um evento em ${cityName} começa antes do dia: numa reunião de pré-produção percebemos o programa, os momentos-chave e o tipo de conteúdo necessário. Definimos equipa, posições e prioridades — para que no dia não haja improviso.`,
      `Durante o evento, a equipa trabalha de forma discreta e profissional, cobrindo todos os ângulos: discursos, prémios, interacções, bastidores. Entregamos conteúdo faseado — material rápido para redes no dia seguinte e o pacote completo em 5 a 7 dias.`,
      `Para empresas e organizações em ${cityName} que realizam eventos regularmente, ter um parceiro de produção de confiança é uma decisão que poupa tempo e garante qualidade consistente. Um evento que não foi bem documentado é uma oportunidade de comunicação perdida.`,
    ],
    "brand-film": [
      `Um brand film para uma empresa em ${cityName} é desenvolvido ao longo de um processo criativo rigoroso: imersão na marca, desenvolvimento do conceito, tratamento criativo aprovado pelo cliente e só então produção. Nada é filmado sem uma visão clara do que o filme vai comunicar.`,
      `Na ${region}, marcas que investem num brand film de qualidade distinguem-se imediatamente da concorrência que ainda usa vídeos institucionais genéricos. Um brand film bem feito conta a história da marca de forma que ressoa emocionalmente — e é esse o conteúdo que as pessoas partilham, guardam e associam à marca a longo prazo.`,
      `O brand film entregue inclui sempre a versão principal e adaptações para redes sociais. É um activo de comunicação que vai ao website, ao LinkedIn, a apresentações comerciais e a qualquer contexto onde a marca precisa de se apresentar ao melhor nível.`,
    ],
    "video-drone": [
      `A filmagem aérea com drone em ${cityName} requer pilotos certificados pela ANAC e equipamento profissional para garantir qualidade de imagem e conformidade legal. A Beyond Focus opera com drones de grau profissional e pilotos com certificação para voos em contexto comercial.`,
      `Na ${region}, a filmagem aérea é especialmente valorizada para propriedades imobiliárias, hotéis, eventos ao ar livre e projectos de construção que precisam de mostrar dimensão, localização e contexto. Uma perspectiva aérea comunica em segundos o que nenhuma câmara no chão consegue.`,
      `O vídeo drone pode ser integrado numa produção maior ou funcionar como peça autónoma. Para projectos em ${cityName} que incluem filmagem terrestre e aérea, a combinação dos dois pontos de vista resulta em conteúdo mais rico e com maior impacto visual.`,
    ],
  };

  const whyMap: Record<string, string> = {
    "video-institucional": `Empresas em ${cityName} que trabalham com a Beyond Focus têm acesso ao mesmo nível de produção que empresas de Lisboa — sem deslocações à capital, sem processos lentos, sem surpresas no orçamento. O nosso portal garante que o cliente acompanha cada fase em tempo real, de qualquer lugar.`,
    "filme-comercial": `A Beyond Focus não é uma produtora que chega, filma e desaparece. Somos um parceiro criativo que investe na compreensão do negócio do cliente antes de ligar uma câmara. Para marcas em ${cityName}, isso significa filmes que comunicam com precisão — não apenas que parecem bonitos.`,
    "conteudo-redes-sociais": `Produzir conteúdo para redes com consistência e qualidade é difícil sem uma equipa dedicada. Para marcas em ${cityName}, a Beyond Focus funciona como departamento criativo externo — sem os custos fixos de uma equipa interna e com o nível de qualidade de uma produtora profissional.`,
    "fotografia-profissional": `A Beyond Focus trata cada sessão fotográfica como um projecto criativo com objectivo claro — não um serviço de tirar fotos. Para marcas em ${cityName} que querem imagens que comunicam e convertem, a direcção de arte faz toda a diferença entre imagens bonitas e imagens úteis.`,
    "cobertura-eventos": `Para organizações em ${cityName} que realizam eventos com regularidade, a Beyond Focus garante consistência no nível de qualidade de cobertura a cobertura. O conteúdo produzido num evento bem documentado tem utilidade durante meses — em newsletter, redes sociais, relatórios e comunicação institucional.`,
    "brand-film": `Um brand film feito pela Beyond Focus não é um vídeo produzido por indicação — é o resultado de um processo criativo profundo que começa com a compreensão da marca, dos seus valores e do público a quem se dirige. Para empresas em ${cityName}, o resultado é conteúdo que representa a marca com fidelidade e distinção.`,
    "video-drone": `A Beyond Focus combina filmagem aérea com visão criativa — não usamos drones apenas para planos de overview. A filmagem aérea é integrada na narrativa de cada projecto para maximizar o seu impacto. Para empresas em ${cityName}, o resultado é conteúdo aéreo com propósito, não apenas altamente técnico.`,
  };

  const processNotes: Record<string, string> = {
    "video-institucional": "Briefing → Roteiro → Pré-produção → Filmagem → Pós-produção → Revisão no portal → Entrega em todos os formatos",
    "filme-comercial": "Briefing → Tratamento criativo → Pré-produção → 1-2 dias de filmagem → Pós-produção → Aprovação no portal → Entrega múltiplos formatos",
    "conteudo-redes-sociais": "Briefing mensal → Planeamento → Dia de produção → Edição → Entrega de ficheiros prontos + sugestões de copy",
    "fotografia-profissional": "Briefing visual → Direcção de arte → Sessão fotográfica → Retoque e tratamento → Entrega curada em todos os formatos",
    "cobertura-eventos": "Reunião pré-evento → Planeamento de cobertura → Dia do evento → Entrega faseada (social no dia seguinte + pacote completo em 5-7 dias)",
    "brand-film": "Imersão na marca → Tratamento criativo → Aprovação → Pré-produção → Filmagem → Pós-produção → Revisão no portal → Entrega",
    "video-drone": "Briefing → Reconhecimento de localização → Autorizações → Dia de filmagem → Edição e entrega",
  };

  return {
    intro: intros[service.slug] || service.description,
    bodyParagraphs: bodyMap[service.slug] || [],
    whySection: whyMap[service.slug] || "",
    processNote: processNotes[service.slug] || "",
  };
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getServiceSeo(serviceSlug);
  const city = getCity(citySlug);
  if (!service || !city) notFound();

  const faqs = buildFAQs(service, city);
  const localBusinessSchema = buildLocalBusinessSchema(service, city);
  const content = getServiceBodyContent(service, city);
  const relatedBlogPosts = BLOG_LINKS_BY_SERVICE[serviceSlug] ?? [];
  const relatedSectors = SECTORS_SEO.slice(0, 4);

  return (
    <>
      {localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      )}
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: "Início", href: "/" },
          { name: "Serviços", href: "/servicos" },
          { name: service.name, href: `/servicos/${service.mainServiceSlug}` },
          { name: city.name, href: `/servicos/pseo/${serviceSlug}/${citySlug}` },
        ]}
      />
      <Navbar variant="light" />
      <main className="bg-[#F5F5F5]">
        {/* Hero */}
        <section className="mx-auto max-w-[900px] px-6 pt-[200px] pb-16 md:px-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[2px] text-[#FA8334]">
              {city.region}
            </span>
            <span className="text-[11px] text-[#0E3A45]/25">·</span>
            <span className="font-mono text-[11px] uppercase tracking-[2px] text-[#0E3A45]/50">
              {service.name}
            </span>
          </div>
          <h1 className="text-[clamp(32px,4vw,52px)] font-bold leading-[1.1] tracking-tight text-[#0E3A45]">
            {service.name} em {city.name}
          </h1>
          <p className="mt-6 text-[clamp(17px,1.5vw,20px)] leading-[1.7] text-[#0E3A45]/70 max-w-[680px]">
            {content.intro}
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

        {/* Body content */}
        <section className="mx-auto max-w-[720px] px-6 pb-16 md:px-10">
          {content.bodyParagraphs.map((paragraph, i) => (
            <p key={i} className="mb-6 text-[18px] leading-[1.8] text-[#0E3A45]/70">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Process note */}
        {content.processNote && (
          <section className="mx-auto max-w-[900px] px-6 pb-16 md:px-10">
            <div className="rounded-2xl border border-[#0E3A45]/10 bg-white p-8">
              <p className="font-mono text-[11px] uppercase tracking-[2px] text-[#FA8334] mb-3">
                Processo
              </p>
              <p className="text-[15px] leading-[1.8] text-[#0E3A45]/70">
                {content.processNote}
              </p>
            </div>
          </section>
        )}

        {/* Why Beyond Focus */}
        <section className="mx-auto max-w-[900px] px-6 pb-16 md:px-10">
          <h2 className="text-[clamp(22px,2.5vw,30px)] font-bold text-[#0E3A45] mb-4">
            Porque a Beyond Focus em {city.name}?
          </h2>
          <p className="text-[18px] leading-[1.8] text-[#0E3A45]/70 max-w-[680px]">
            {content.whySection}
          </p>
        </section>

        {/* Local context */}
        <section className="mx-auto max-w-[900px] px-6 pb-16 md:px-10">
          <div className="rounded-2xl bg-[#0E3A45] p-8 text-white">
            <p className="font-mono text-[11px] uppercase tracking-[2px] text-[#FA8334] mb-3">
              {city.region}
            </p>
            <h2 className="text-[clamp(20px,2vw,26px)] font-bold mb-3">
              {city.name}: {city.description}
            </h2>
            <p className="text-white/75 text-[16px] leading-[1.7]">
              {city.notableContext}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {city.businessDistricts.map((district) => (
                <span
                  key={district}
                  className="rounded-full border border-white/20 px-3 py-1 text-[12px] text-white/60"
                >
                  {district}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Related sectors */}
        <section className="mx-auto max-w-[900px] px-6 pb-16 md:px-10">
          <h2 className="text-[clamp(20px,2vw,26px)] font-bold text-[#0E3A45] mb-6">
            {service.name} por sector em {city.name}
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {relatedSectors.map((sector) => (
              <Link
                key={sector.slug}
                href={`/servicos/pseo/${serviceSlug}/${citySlug}/${sector.slug}`}
                className="group rounded-xl border border-[#0E3A45]/10 bg-white p-4 transition-all hover:border-[#FA8334]/40 hover:shadow-md"
              >
                <span className="block text-[13px] font-semibold text-[#0E3A45] group-hover:text-[#FA8334] transition-colors">
                  {sector.name}
                </span>
                <span className="block mt-1 text-[12px] text-[#0E3A45]/50 leading-snug">
                  {service.shortName}
                </span>
              </Link>
            ))}
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
              Ver serviço: {service.name}
            </Link>
            <Link
              href="/servicos"
              className="rounded-full border border-[#0E3A45]/20 px-4 py-2 text-[#0E3A45]/60 hover:text-[#0E3A45] hover:border-[#0E3A45]/40 transition-colors"
            >
              Todos os serviços
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-[#0E3A45]/20 px-4 py-2 text-[#0E3A45]/60 hover:text-[#0E3A45] hover:border-[#0E3A45]/40 transition-colors"
            >
              Ver portfolio
            </Link>
            <Link
              href="/contacto"
              className="rounded-full border border-[#0E3A45]/20 px-4 py-2 text-[#0E3A45]/60 hover:text-[#0E3A45] hover:border-[#0E3A45]/40 transition-colors"
            >
              Contacto
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-[720px] px-6 pb-24 md:px-10">
          <div className="rounded-2xl bg-[#0E3A45] p-10 text-center text-white">
            <h2 className="mb-3 text-[clamp(22px,2.5vw,30px)] font-bold">
              {service.name} em {city.name}
            </h2>
            <p className="mb-6 text-white/70 text-[16px] leading-[1.7] max-w-[480px] mx-auto">
              Conta-nos o projecto. Respondemos em 24 horas com uma proposta inicial — sem compromisso.
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
