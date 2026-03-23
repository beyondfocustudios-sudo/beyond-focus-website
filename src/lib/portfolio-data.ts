export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  thumbnail: string;
  video: string | null;
  services: string[];
  briefText: string;
  bodyCopy1Title: string;
  bodyCopy1Text: string;
  bodyCopy2Title: string;
  bodyCopy2Text: string;
  heroVideo: string | null;
  gallery: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "hotel-casa-palmela",
    title: "Hotel Casa Palmela",
    client: "Hotel Casa Palmela",
    category: "Filmes Comerciais",
    thumbnail: "/images/portfolio/hcp-thumb.jpg",
    video: "/videos/portfolio/hcp-final.mp4",
    services: ["Direcção criativa", "Produção", "Pós-produção"],
    briefText:
      "Situado no coração do Parque Natural da Arrábida, o Hotel Casa Palmela exigia uma narrativa visual que transmitisse a elegância intemporal e a serenidade aristocrática da propriedade.",
    bodyCopy1Title: "A luz natural da Arrábida dita o ritmo.",
    bodyCopy1Text:
      "Cada plano é uma decisão. Procurámos transportar o espectador para a experiência única de habitar este refúgio histórico, onde cada detalhe conta uma história de tradição e sofisticação.",
    bodyCopy2Title: "Onde a arquitectura encontra a natureza.",
    bodyCopy2Text:
      "Na Beyond Focus, não fazemos apenas vídeos — criamos narrativas visuais que transformam a percepção de uma marca. O resultado é uma peça que convida a descobrir.",
    heroVideo: "/videos/portfolio/hcp-final.mp4",
    gallery: [
      "/images/portfolio/gallery/hotel-casa-palmela/hcp-vdm-stills-06.jpg",
      "/images/portfolio/gallery/hotel-casa-palmela/hcp-vdm-stills-07.jpg",
    ],
  },
  {
    slug: "carl-zeiss-portugal",
    title: "Behind the Scenes",
    client: "Carl Zeiss Portugal",
    category: "Vídeos Institucionais",
    thumbnail: "/images/portfolio/zeiss-thumb.jpg",
    video: "/videos/portfolio/zeiss-bts.mp4",
    services: ["Captação", "Edição", "Colour grading"],
    briefText:
      "A Carl Zeiss queria documentar o processo criativo por trás de uma sessão de teste de lentes cinematográficas em cenários reais na região de Setúbal.",
    bodyCopy1Title: "Mostrar o processo é tão importante como o resultado.",
    bodyCopy1Text:
      "Acompanhámos a equipa da Zeiss durante uma jornada completa de testes de campo, capturando cada momento de descoberta e precisão técnica com autenticidade.",
    bodyCopy2Title: "Tecnologia e criatividade em harmonia.",
    bodyCopy2Text:
      "O resultado é um behind the scenes que funciona tanto como conteúdo institucional quanto como peça de storytelling para as redes sociais da marca.",
    heroVideo: "/videos/portfolio/zeiss-bts.mp4",
    gallery: [
      "/images/portfolio/gallery/carl-zeiss/zeiss-bts-002.jpg",
      "/images/portfolio/gallery/carl-zeiss/zeiss-bts-016.jpg",
      "/images/portfolio/gallery/carl-zeiss/zeiss-bts-023.jpg",
      "/images/portfolio/gallery/carl-zeiss/zeiss-bts-034.jpg",
      "/images/portfolio/gallery/carl-zeiss/zeiss-bts-037.jpg",
      "/images/portfolio/gallery/carl-zeiss/zeiss-bts-038.jpg",
      "/images/portfolio/gallery/carl-zeiss/zeiss-bts-43.jpg",
      "/images/portfolio/gallery/carl-zeiss/zeiss-bts-49.jpg",
      "/images/portfolio/gallery/carl-zeiss/zeiss-bts-51.jpg",
      "/images/portfolio/gallery/carl-zeiss/zeiss-bts-60.jpg",
      "/images/portfolio/gallery/carl-zeiss/zeiss-bts-70.jpg",
      "/images/portfolio/gallery/carl-zeiss/zeiss-bts-71.jpg",
      "/images/portfolio/gallery/carl-zeiss/zeiss-bts-73.jpg",
      "/images/portfolio/gallery/carl-zeiss/zeiss-bts-83.jpg",
      "/images/portfolio/gallery/carl-zeiss/zeiss-bts-91.jpg",
      "/images/portfolio/gallery/carl-zeiss/zeiss-bts.jpg",
    ],
  },
  {
    slug: "highgate",
    title: "Christmas Party",
    client: "Highgate Portugal",
    category: "Eventos",
    thumbnail: "/images/portfolio/highgate-thumb.jpg",
    video: "/videos/portfolio/highgate-sesimbra.mp4",
    services: ["Cobertura vídeo", "Fotografia", "Edição"],
    briefText:
      "A Highgate confiou-nos a cobertura completa do seu evento anual de Natal, um momento de celebração que reuniu toda a equipa numa noite memorável.",
    bodyCopy1Title: "Cada momento conta.",
    bodyCopy1Text:
      "Com múltiplas câmaras e uma equipa dedicada, capturámos a energia e a emoção de uma noite que reflecte os valores e a cultura da empresa.",
    bodyCopy2Title: "Um dia. Meses de conteúdo.",
    bodyCopy2Text:
      "De um único evento, produzimos conteúdo para redes sociais, comunicação interna e memória institucional — maximizando o retorno do investimento.",
    heroVideo: "/videos/portfolio/highgate-sesimbra.mp4",
    gallery: [
      "/images/portfolio/gallery/highgate/highgate-natal-005.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-02.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-03.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-04.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-05.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-07.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-072.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-076.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-08.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-081.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-09.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-10.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-11.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-12.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-13.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-16.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-17.jpg",
      "/images/portfolio/gallery/highgate/highgate-natal-18.jpg",
    ],
  },
  {
    slug: "amoretti-lux",
    title: "Ferrari Editorial",
    client: "Amoretti Lux",
    category: "Fotografia",
    thumbnail: "/images/portfolio/amoretti-thumb.jpg",
    video: null,
    services: ["Direcção criativa", "Fotografia", "Retoque"],
    briefText:
      "A Amoretti Lux precisava de um editorial fotográfico de luxo que capturasse a essência da marca e dos automóveis que representa, com elegância e atenção ao detalhe.",
    bodyCopy1Title: "Cada frame é uma decisão.",
    bodyCopy1Text:
      "A fotografia de luxo exige paciência, precisão e uma compreensão profunda da luz. Cada imagem foi pensada para comunicar exclusividade e sofisticação.",
    bodyCopy2Title: "O detalhe faz a diferença.",
    bodyCopy2Text:
      "O resultado final é um conjunto de imagens que elevam a presença digital da marca e funcionam em múltiplos formatos — do social media à impressão.",
    heroVideo: null,
    gallery: [],
  },
  {
    slug: "soce-mauro-loureiro",
    title: "Soce by Mauro Loureiro",
    client: "Soce",
    category: "Filmes Comerciais",
    thumbnail: "/images/portfolio/gallery/soce/soce-fotos-02.jpg",
    video: "/videos/portfolio/soce-mauro.mp4",
    services: ["Direcção criativa", "Produção", "Fotografia"],
    briefText:
      "O restaurante Soce, do chef Mauro Loureiro, precisava de uma peça audiovisual que capturasse a essência da experiência gastronómica — desde o ingrediente ao prato, da cozinha à mesa.",
    bodyCopy1Title: "A cozinha como palco.",
    bodyCopy1Text:
      "Cada movimento do chef é uma coreografia de precisão e paixão. Capturámos o ritmo frenético da cozinha e a serenidade do resultado final — dois mundos que coexistem no mesmo espaço.",
    bodyCopy2Title: "Do ingrediente ao prato.",
    bodyCopy2Text:
      "O vídeo e a fotografia trabalham em conjunto para contar a história completa — a textura, a cor, o aroma que a imagem sugere. Conteúdo que convida a reservar.",
    heroVideo: "/videos/portfolio/soce-mauro.mp4",
    gallery: [
      "/images/portfolio/gallery/soce/soce-fotos-02.jpg",
      "/images/portfolio/gallery/soce/soce-fotos-02b.jpg",
      "/images/portfolio/gallery/soce/soce-fotos-10.jpg",
      "/images/portfolio/gallery/soce/soce-fotos-11.jpg",
      "/images/portfolio/gallery/soce/soce-fotos-12.jpg",
      "/images/portfolio/gallery/soce/soce-fotos-19.jpg",
      "/images/portfolio/gallery/soce/soce-fotos-41.jpg",
      "/images/portfolio/gallery/soce/soce-fotos-45.jpg",
      "/images/portfolio/gallery/soce/soce-fotos-47.jpg",
    ],
  },
  {
    slug: "once-upon-a-house",
    title: "Once Upon Lisboa",
    client: "Once Upon a House",
    category: "Filmes Comerciais",
    thumbnail: "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-01.jpg",
    video: null,
    services: ["Produção", "Fotografia", "Pós-produção"],
    briefText:
      "A Once Upon a House precisava de conteúdo visual que comunicasse a qualidade e o estilo de vida dos seus empreendimentos imobiliários em Lisboa.",
    bodyCopy1Title: "Mostrar o espaço como experiência.",
    bodyCopy1Text:
      "Mais do que fotografar imóveis, criámos imagens que transmitem a sensação de habitar cada espaço — a luz que entra, os materiais, a relação com a cidade.",
    bodyCopy2Title: "Conteúdo que vende.",
    bodyCopy2Text:
      "Cada imagem foi pensada para funcionar em múltiplas plataformas — do website à brochura, das redes sociais aos portais imobiliários internacionais.",
    heroVideo: null,
    gallery: [
      "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-01.jpg",
      "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-02.jpg",
      "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-03.jpg",
      "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-04.jpg",
      "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-05.jpg",
      "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-06.jpg",
      "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-07.jpg",
      "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-08.jpg",
      "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-09.jpg",
      "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-46.jpg",
      "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-50.jpg",
      "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-57.jpg",
      "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-60.jpg",
      "/images/portfolio/gallery/once-upon-a-house/oul-v3-010.jpg",
      "/images/portfolio/gallery/once-upon-a-house/oul-v3-010b.jpg",
    ],
  },
  {
    slug: "lobsters",
    title: "Lobsters",
    client: "Lobsters",
    category: "Redes Sociais",
    thumbnail: "/images/portfolio/lobsters-thumb.jpg",
    video: "/videos/portfolio/lobsters.mp4",
    services: ["Captação", "Edição", "Redes Sociais"],
    briefText:
      "O Lobsters precisava de conteúdo dinâmico para redes sociais que capturasse a energia dos seus eventos e a experiência do espaço.",
    bodyCopy1Title: "Conteúdo que pára o scroll.",
    bodyCopy1Text:
      "Criámos peças curtas e impactantes, pensadas para o formato vertical e para captar a atenção nos primeiros segundos — o essencial no mundo das redes sociais.",
    bodyCopy2Title: "Um evento. Meses de conteúdo.",
    bodyCopy2Text:
      "De cada produção, extraímos múltiplas peças para diferentes plataformas — Instagram, TikTok, stories — maximizando o investimento do cliente.",
    heroVideo: "/videos/portfolio/lobsters.mp4",
    gallery: [],
  },
];

export const CATEGORIES = [
  "Todos os projectos",
  "Filmes Comerciais",
  "Vídeos Institucionais",
  "Fotografia",
  "Eventos",
  "Redes Sociais",
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getNextProjects(currentSlug: string): Project[] {
  const currentIndex = PROJECTS.findIndex((p) => p.slug === currentSlug);
  const next = [];
  for (let i = 1; i <= 2; i++) {
    next.push(PROJECTS[(currentIndex + i) % PROJECTS.length]);
  }
  return next;
}
