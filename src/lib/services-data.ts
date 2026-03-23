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
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "filmes-comerciais",
    num: "01",
    title: "Filmes Comerciais",
    tagline: "Spots que ninguém salta.",
    description:
      "Criamos filmes publicitários que captam atenção nos primeiros 3 segundos e geram resultados mensuráveis. Do guião à entrega — cada frame é pensado para converter.",
    image: "/images/services/filmes-comerciais.jpg",
    includes: [
      "Direcção criativa",
      "Guião",
      "Casting (se necessário)",
      "Produção",
      "Pós-produção",
      "Colour grading",
      "Sound design",
      "Formatos para TV, digital e redes sociais",
    ],
    process: [
      { step: "01", title: "Briefing", description: "Percebemos o teu objectivo, público e mensagem." },
      { step: "02", title: "Guião e storyboard", description: "Escrevemos o guião e planeamos cada plano." },
      { step: "03", title: "Produção", description: "Gravamos com equipa profissional e equipamento cinematográfico." },
      { step: "04", title: "Edição e entrega", description: "Editamos, corrigimos cor, adicionamos som e entregamos em todos os formatos." },
    ],
    relatedSlugs: ["hotel-casa-palmela", "soce-mauro-loureiro"],
    metaTitle: "Filmes Comerciais — Beyond Focus | Produtora Audiovisual em Lisboa",
    metaDescription:
      "Criamos filmes publicitários que captam atenção e geram resultados. Produtora audiovisual em Lisboa — do guião à entrega.",
  },
  {
    slug: "videos-institucionais",
    num: "02",
    title: "Vídeos Institucionais",
    tagline: "A história da tua marca, contada a sério.",
    description:
      "Contamos a história da tua empresa com rigor cinematográfico. Ideal para apresentar a marca, a cultura e os valores a clientes, investidores e novos colaboradores.",
    image: "/images/services/institucionais.jpg",
    includes: [
      "Entrevistas",
      "Filmagem on-location",
      "Direcção de conteúdo",
      "Edição narrativa",
      "Legendagem",
      "Versões curtas para redes sociais",
    ],
    process: [
      { step: "01", title: "Reunião de alinhamento", description: "Definimos a história, o tom e os intervenientes." },
      { step: "02", title: "Roteiro", description: "Estruturamos a narrativa e as perguntas das entrevistas." },
      { step: "03", title: "Filmagem", description: "Captamos em locação real com iluminação e som profissional." },
      { step: "04", title: "Pós-produção", description: "Editamos a narrativa, corrigimos cor e entregamos." },
    ],
    relatedSlugs: ["carl-zeiss-portugal"],
    metaTitle: "Vídeos Institucionais — Beyond Focus | Produtora Audiovisual em Lisboa",
    metaDescription:
      "Vídeos institucionais com narrativa cinematográfica. Contamos a história da tua marca com profissionalismo. Produtora audiovisual em Lisboa.",
  },
  {
    slug: "documentarios",
    num: "03",
    title: "Documentários",
    tagline: "Profundidade, não visibilidade.",
    description:
      "Histórias reais contadas com profundidade e sensibilidade. Documentários que informam, emocionam e deixam marca — para marcas, instituições ou projectos pessoais.",
    image: "/images/services/documentarios.jpg",
    includes: [
      "Pesquisa e pré-produção",
      "Filmagem ao longo de dias/semanas",
      "Entrevistas",
      "Narração",
      "Edição cinematográfica",
      "Música original ou licenciada",
    ],
    process: [
      { step: "01", title: "Pesquisa", description: "Investigamos o tema e identificamos as histórias a contar." },
      { step: "02", title: "Pré-produção", description: "Planeamos filmagens, locais e intervenientes." },
      { step: "03", title: "Filmagem", description: "Captamos ao longo de dias ou semanas, conforme necessário." },
      { step: "04", title: "Montagem e finalização", description: "Montagem narrativa, cor, som e entrega final." },
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
      "Produzimos conteúdo nativo para Instagram, TikTok e LinkedIn que se destaca no feed. Não é só bonito — é estratégico, pensado para gerar engagement e conversão.",
    image: "/images/services/redes-sociais.jpg",
    includes: [
      "Estratégia de conteúdo",
      "Planeamento editorial",
      "Filmagem de reels/stories",
      "Edição optimizada por plataforma",
      "Copywriting",
      "Calendário de publicações",
    ],
    process: [
      { step: "01", title: "Estratégia", description: "Definimos objectivos, plataformas e formatos." },
      { step: "02", title: "Planeamento", description: "Criamos o calendário editorial e os conceitos." },
      { step: "03", title: "Produção", description: "Gravamos conteúdo optimizado para cada plataforma." },
      { step: "04", title: "Edição e publicação", description: "Editamos, legendamos e entregamos pronto a publicar." },
    ],
    relatedSlugs: ["soce-mauro-loureiro", "lobsters"],
    metaTitle: "Conteúdos de Redes Sociais — Beyond Focus | Produtora Audiovisual em Lisboa",
    metaDescription:
      "Conteúdo de vídeo e fotografia para Instagram, TikTok e LinkedIn. Estratégia + produção + edição. Produtora audiovisual em Lisboa.",
  },
  {
    slug: "fotografia",
    num: "05",
    title: "Fotografia",
    tagline: "Cada frame é uma decisão.",
    description:
      "Fotografia editorial, corporativa e de produto com direcção criativa. Cada imagem é pensada para comunicar a essência da tua marca.",
    image: "/images/services/fotografia.jpg",
    includes: [
      "Direcção de arte",
      "Fotografia on-location ou em estúdio",
      "Retoque e tratamento de cor",
      "Formatos para web, print e redes sociais",
      "Banco de imagens de marca",
    ],
    process: [
      { step: "01", title: "Briefing visual", description: "Definimos o estilo, referências e objectivo de cada imagem." },
      { step: "02", title: "Direcção de arte", description: "Criamos moodboard e planeamos a sessão." },
      { step: "03", title: "Sessão fotográfica", description: "Fotografamos com atenção ao detalhe e à luz." },
      { step: "04", title: "Tratamento e entrega", description: "Retocamos, tratamos cor e entregamos em todos os formatos." },
    ],
    relatedSlugs: ["amoretti-lux"],
    metaTitle: "Fotografia Comercial — Beyond Focus | Produtora Audiovisual em Lisboa",
    metaDescription:
      "Fotografia editorial, corporativa e de produto com direcção criativa. Cada imagem comunica a essência da tua marca. Lisboa, Portugal.",
  },
  {
    slug: "eventos",
    num: "06",
    title: "Eventos",
    tagline: "Um dia. Meses de conteúdo.",
    description:
      "Cobertura completa de eventos corporativos, lançamentos, conferências e festas. Vídeo, foto e conteúdo para redes — tudo num pacote, para que um evento de um dia gere conteúdo para meses.",
    image: "/images/services/videos-eventos.jpg",
    includes: [
      "Cobertura vídeo multi-câmara",
      "Fotografia do evento",
      "Highlight reel",
      "Conteúdo para redes sociais",
      "Aftermovie",
      "Entrevistas on-site",
    ],
    process: [
      { step: "01", title: "Reunião pré-evento", description: "Alinhamos momentos-chave, agenda e logística." },
      { step: "02", title: "Planeamento de cobertura", description: "Definimos posições de câmara, equipa e equipamento." },
      { step: "03", title: "Dia do evento", description: "Captamos cada momento com múltiplas câmaras." },
      { step: "04", title: "Edição e entrega faseada", description: "Entregamos highlight reel, aftermovie e conteúdo para redes." },
    ],
    relatedSlugs: ["highgate", "lobsters"],
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
      "Definimos a direcção criativa, o tom e a narrativa antes de ligar a câmara. Estratégia de conteúdo alinhada com os objectivos do teu negócio — para que cada peça audiovisual tenha propósito.",
    image: "/images/services/estrategia.jpg",
    includes: [
      "Auditoria de conteúdo actual",
      "Definição de tom de voz visual",
      "Estratégia de conteúdo trimestral/anual",
      "Moodboards e referências",
      "Planeamento de campanhas",
      "Consultoria criativa",
    ],
    process: [
      { step: "01", title: "Auditoria", description: "Analisamos o conteúdo actual e identificamos oportunidades." },
      { step: "02", title: "Estratégia", description: "Definimos objectivos, tom e linha criativa." },
      { step: "03", title: "Moodboard", description: "Criamos referências visuais e de estilo." },
      { step: "04", title: "Plano de acção", description: "Entregamos um roadmap de conteúdo pronto a executar." },
    ],
    relatedSlugs: [],
    metaTitle: "Estratégia de Conteúdo — Beyond Focus | Produtora Audiovisual em Lisboa",
    metaDescription:
      "Estratégia de conteúdo audiovisual: direcção criativa, tom de voz visual e planeamento de campanhas. Consultoria criativa em Lisboa.",
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
