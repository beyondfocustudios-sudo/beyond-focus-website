export interface ServicePage {
  slug: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  includes: string[];
  process: { step: string; title: string; description: string }[];
  relatedSlugs: string[];
  metaTitle: string;
  metaDescription: string;
  timeline?: string;
  note?: string;
  model?: string;
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "filmes-comerciais",
    num: "01",
    title: "Filmes Comerciais",
    tagline: "Spots que ninguém salta.",
    description:
      "Criamos filmes publicitários para marcas que querem fazer um grande movimento — seja o lançamento de um produto, uma campanha de posicionamento ou um vídeo que precisa de chegar às pessoas certas e fazê-las sentir alguma coisa. Trabalhamos tanto com agências como directamente com empresas que sabem que precisam de mais do que um vídeo bonito — precisam de um filme que converta.\n\nO nosso diferencial começa antes da câmara ligar. Apresentamos um tratamento completo — o processo inteiro de como o vídeo vai acontecer, cena a cena, antes de filmar um único frame. Quando o projecto entra em pré-produção, o cliente já tem acesso ao nosso portal exclusivo, onde pode enviar referências, comunicar com a equipa e acompanhar cada fase em tempo real.",
    image: "/images/services/filmes-comerciais.jpg",
    includes: [
      "Tratamento criativo e storyboard",
      "Reuniões de alinhamento a cada 15 dias",
      "1 a 2 dias de filmagem",
      "Pós-produção completa (edição, colour grading, sound design)",
      "Várias versões adaptadas para redes sociais (formatos verticais, quadrados, horizontais)",
      "Acesso ao Beyond Focus Portal durante todo o projecto",
    ],
    process: [
      { step: "01", title: "Briefing & Estratégia", description: "Percebemos o objectivo, o público-alvo e a mensagem." },
      { step: "02", title: "Tratamento criativo", description: "Apresentamos a visão completa do filme antes de produzir." },
      { step: "03", title: "Pré-produção", description: "Casting, localizações, logística. O cliente acompanha tudo no portal." },
      { step: "04", title: "Produção", description: "1 a 2 dias de filmagem com equipa dedicada." },
      { step: "05", title: "Pós-produção & Entrega", description: "Edição, revisões no portal com comentários ao segundo, entrega em todos os formatos." },
    ],
    timeline: "~15 dias do briefing à entrega final.",
    relatedSlugs: ["hotel-casa-palmela"],
    metaTitle: "Filmes Comerciais — Beyond Focus | Produtora Audiovisual em Lisboa",
    metaDescription:
      "Filmes publicitários que captam atenção e geram resultados. Tratamento criativo completo, portal exclusivo de acompanhamento. Produtora audiovisual em Lisboa.",
  },
  {
    slug: "videos-institucionais",
    num: "02",
    title: "Vídeos Institucionais",
    tagline: "A história da tua marca, contada a sério.",
    description:
      "Um vídeo institucional não é um vídeo \"sobre a empresa\" — é a forma como o mundo te vê pela primeira vez. Contamos a história da tua marca com rigor cinematográfico, mostrando as instalações, os processos, a cultura e os valores que fazem da tua empresa aquilo que ela é. Ideal para apresentações a clientes, investidores, novos colaboradores ou comunicação interna.\n\nCada institucional que fazemos é pensado para ter vida longa — um activo que a empresa usa durante anos, em múltiplos contextos.",
    image: "/images/services/institucionais.jpg",
    includes: [
      "Direcção de conteúdo e roteiro",
      "Filmagem on-location (escritório, fábrica, pontos-chave)",
      "Entrevistas com equipa e liderança",
      "Pós-produção completa",
      "Versão completa (até 10 minutos) + versões curtas (45s, 1min, 2min)",
      "Adaptações para todas as plataformas e formatos",
    ],
    process: [
      { step: "01", title: "Reunião de alinhamento", description: "Percebemos a empresa, a mensagem e o público." },
      { step: "02", title: "Roteiro", description: "Estrutura narrativa com os pontos-chave a comunicar." },
      { step: "03", title: "Filmagem", description: "Captação completa das instalações, processos e equipa." },
      { step: "04", title: "Pós-produção", description: "Edição narrativa, legendagem, versões múltiplas." },
      { step: "05", title: "Entrega", description: "Revisão no portal, ajustes e entrega final." },
    ],
    relatedSlugs: ["carl-zeiss-portugal"],
    metaTitle: "Vídeos Institucionais — Beyond Focus | Produtora Audiovisual em Lisboa",
    metaDescription:
      "Vídeos institucionais com narrativa cinematográfica. A história da tua marca contada com rigor e profissionalismo. Produtora audiovisual em Lisboa.",
  },
  {
    slug: "documentarios",
    num: "03",
    title: "Documentários",
    tagline: "Profundidade, não visibilidade.",
    description:
      "Histórias reais contadas com profundidade e sensibilidade. Um documentário não se faz num dia — é um compromisso com a verdade de uma história, seja ela sobre uma marca, uma comunidade, um projecto ou uma pessoa. Trabalhamos com empresas, instituições e criativos que querem contar histórias que vão além do superficial.\n\nEste é um serviço que nos entusiasma particularmente. Acreditamos que o formato documental é uma das formas mais poderosas de comunicar — e queremos trazer essa profundidade às marcas portuguesas.",
    image: "/images/services/documentarios.jpg",
    includes: [
      "Pesquisa e desenvolvimento de narrativa",
      "Pré-produção aprofundada",
      "Filmagem ao longo de múltiplos dias/semanas",
      "Entrevistas documentais",
      "Edição cinematográfica",
      "Narração (se aplicável)",
      "Música original ou licenciada",
      "Versões curtas para redes sociais",
    ],
    process: [
      { step: "01", title: "Pesquisa", description: "Imersão no tema, entrevistas preliminares, definição do arco narrativo." },
      { step: "02", title: "Pré-produção", description: "Planeamento de filmagens, autorizações, logística." },
      { step: "03", title: "Filmagem", description: "Captação ao longo do tempo necessário para a história." },
      { step: "04", title: "Montagem", description: "Edição focada na narrativa e no ritmo emocional." },
      { step: "05", title: "Finalização", description: "Colour grading, sound design, entrega." },
    ],
    relatedSlugs: [],
    metaTitle: "Documentários — Beyond Focus | Produtora Audiovisual em Lisboa",
    metaDescription:
      "Produção de documentários com profundidade e sensibilidade. Histórias reais que informam e emocionam. Produtora audiovisual em Lisboa.",
  },
  {
    slug: "redes-sociais",
    num: "04",
    title: "Conteúdos de Redes Sociais",
    tagline: "Conteúdo que pára o scroll.",
    description:
      "Não fazemos apenas vídeos para redes sociais — funcionamos como o teu departamento criativo externo. Trabalhamos lado a lado contigo numa base contínua: estratégia, planeamento, produção e entrega de conteúdo mensal optimizado para Instagram, TikTok e LinkedIn.\n\nCada peça de conteúdo é pensada para gerar engagement e conversão, não apenas likes. Percebemos as dores do teu negócio, analisamos o teu mercado, vemos o que está a resultar e criamos conteúdo único que posiciona a tua marca onde ela deve estar.",
    image: "/images/services/redes-sociais.jpg",
    includes: [
      "Estratégia de conteúdo mensal",
      "Planeamento editorial",
      "Dias de filmagem recorrentes (reels, stories, conteúdo estático)",
      "Edição optimizada por plataforma",
      "Copywriting para publicações",
      "Calendário de publicações",
      "Relatório mensal de resultados",
    ],
    process: [
      { step: "01", title: "Estratégia", description: "Análise do mercado, concorrência e dores do cliente." },
      { step: "02", title: "Planeamento", description: "Calendário editorial com temas, formatos e datas." },
      { step: "03", title: "Produção", description: "Dias de filmagem dedicados ao conteúdo do mês." },
      { step: "04", title: "Edição", description: "Conteúdo editado e optimizado para cada plataforma." },
      { step: "05", title: "Publicação & Análise", description: "Publicação nos timings certos, análise de resultados." },
    ],
    model: "Gestão contínua mensal (recorrência). Funcionamos como extensão da tua equipa.",
    relatedSlugs: ["soce-mauro-loureiro"],
    metaTitle: "Conteúdos de Redes Sociais — Beyond Focus | Produtora Audiovisual em Lisboa",
    metaDescription:
      "Departamento criativo externo: estratégia, planeamento e produção de conteúdo mensal para Instagram, TikTok e LinkedIn. Produtora audiovisual em Lisboa.",
  },
  {
    slug: "fotografia",
    num: "05",
    title: "Fotografia",
    tagline: "Cada frame é uma decisão.",
    description:
      "Fotografia com direcção criativa. Não tiramos fotos — criamos imagens com propósito. Seja fotografia corporativa para o teu website, fotografia de produto para e-commerce, ou fotografia editorial para comunicação de marca, cada sessão é planeada para comunicar exactamente o que a tua marca precisa.\n\nTrabalhamos com hotéis, restaurantes, marcas de moda e empresas que entendem que uma boa imagem vale mais do que mil palavras — vale clientes.",
    image: "/images/services/fotografia.jpg",
    includes: [
      "Direcção de arte e planeamento visual",
      "Sessão fotográfica on-location ou em estúdio",
      "Retoque e tratamento de cor profissional",
      "Entrega em todos os formatos (web, print, redes sociais)",
      "Banco de imagens de marca",
    ],
    process: [
      { step: "01", title: "Briefing visual", description: "Definimos o estilo, as referências e o objectivo de cada imagem." },
      { step: "02", title: "Direcção de arte", description: "Planeamento de cenários, props e composições." },
      { step: "03", title: "Sessão fotográfica", description: "Captação com atenção a cada detalhe." },
      { step: "04", title: "Tratamento", description: "Retoque, colour grading e selecção final." },
      { step: "05", title: "Entrega", description: "Ficheiros optimizados para cada utilização." },
    ],
    relatedSlugs: ["amoretti-lux", "hotel-casa-palmela", "once-upon-a-house"],
    metaTitle: "Fotografia Comercial — Beyond Focus | Produtora Audiovisual em Lisboa",
    metaDescription:
      "Fotografia com direcção criativa: corporativa, produto e editorial. Cada imagem comunica a essência da tua marca. Produtora audiovisual em Lisboa.",
  },
  {
    slug: "eventos",
    num: "06",
    title: "Eventos",
    tagline: "Um dia. Meses de conteúdo.",
    description:
      "Cobertura completa de eventos corporativos, lançamentos, conferências e festas. A ideia é simples: um evento dura horas, mas o conteúdo que produzimos dura meses. Foto, vídeo e reels para redes sociais — tudo capturado no dia, editado e entregue para que tires o máximo partido de cada momento.\n\nTrabalhamos com equipas dedicadas que cobrem todos os ângulos — os discursos, os prémios, as reacções, os bastidores. O tipo de conteúdo que faz quem não esteve presente querer ter estado.",
    image: "/images/services/videos-eventos.jpg",
    includes: [
      "Cobertura fotográfica completa do evento",
      "Cobertura vídeo (multi-câmara quando necessário)",
      "Reels e conteúdo curto para redes sociais",
      "Highlight reel / aftermovie (quando pedido)",
      "Entrevistas on-site (quando aplicável)",
      "Entrega faseada (conteúdo rápido no dia seguinte + pacote completo depois)",
    ],
    process: [
      { step: "01", title: "Reunião pré-evento", description: "Percebemos o programa, os momentos-chave e as expectativas." },
      { step: "02", title: "Planeamento de cobertura", description: "Definimos equipa, posições e prioridades." },
      { step: "03", title: "Dia do evento", description: "Cobertura total, discreta e profissional." },
      { step: "04", title: "Edição", description: "Selecção, tratamento e edição de todo o material." },
      { step: "05", title: "Entrega faseada", description: "Conteúdo rápido para redes + pacote completo." },
    ],
    relatedSlugs: ["highgate"],
    metaTitle: "Cobertura de Eventos — Beyond Focus | Produtora Audiovisual em Lisboa",
    metaDescription:
      "Cobertura completa de eventos: vídeo multi-câmara, fotografia e conteúdo para redes sociais. Um dia de evento, meses de conteúdo. Lisboa.",
  },
  {
    slug: "estrategia",
    num: "07",
    title: "Estratégia",
    tagline: "Antes de gravar, pensamos.",
    description:
      "A estratégia não é um serviço à parte — é a base de tudo o que fazemos. Antes de ligar a câmara, percebemos o teu negócio: quais são as tuas dores, quem é o teu público, o que está a resultar no teu mercado e o que falta. A partir daí, criamos uma direcção criativa única para o teu projecto.\n\nVamos buscar referências, analisamos a concorrência, identificamos oportunidades e desenhamos uma abordagem que transforma o teu problema em conteúdo com propósito. Não inventamos — investigamos, adaptamos e criamos.",
    image: "/images/services/estrategia.jpg",
    includes: [
      "Análise do negócio e do mercado",
      "Identificação de dores e oportunidades",
      "Pesquisa de referências e tendências do sector",
      "Definição de tom de voz visual",
      "Moodboards e direcção criativa",
      "Plano de conteúdo alinhado com objectivos de negócio",
      "Consultoria criativa contínua (nos pacotes de redes sociais)",
    ],
    process: [
      { step: "01", title: "Diagnóstico", description: "Percebemos onde estás e onde queres chegar." },
      { step: "02", title: "Pesquisa", description: "Analisamos o teu mercado, a concorrência e o que resulta." },
      { step: "03", title: "Estratégia", description: "Definimos a direcção criativa, o tom e a abordagem." },
      { step: "04", title: "Moodboard", description: "Criamos referências visuais que traduzem a estratégia." },
      { step: "05", title: "Plano de acção", description: "Entregamos um roadmap claro do que fazer e quando." },
    ],
    note: "A estratégia vem incluída em todos os nossos projectos. Não cobramos estratégia como serviço isolado — é parte integrante do nosso processo porque acreditamos que sem estratégia, produção é apenas conteúdo sem direcção.",
    relatedSlugs: [],
    metaTitle: "Estratégia de Conteúdo — Beyond Focus | Produtora Audiovisual em Lisboa",
    metaDescription:
      "Estratégia de conteúdo audiovisual: análise de mercado, direcção criativa e planeamento. Incluída em todos os projectos. Produtora audiovisual em Lisboa.",
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
