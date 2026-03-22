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
  },
  {
    slug: "highgate",
    title: "Christmas Party",
    client: "Highgate",
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
  },
];

export const CATEGORIES = [
  "Todos os projectos",
  "Filmes Comerciais",
  "Vídeos Institucionais",
  "Fotografia",
  "Eventos",
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
