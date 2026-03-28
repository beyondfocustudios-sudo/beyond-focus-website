export interface CityData {
  slug: string;
  name: string;
  region: string;
  description: string;
  landmarks: string[];
  businessDistricts: string[];
  notableContext: string;
}

export interface ServiceSeoData {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  mainServiceSlug: string;
}

export interface SectorSeoData {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
  challenge: string;
}

export const CITIES: CityData[] = [
  {
    slug: "lisboa",
    name: "Lisboa",
    region: "Grande Lisboa",
    description: "capital de Portugal e principal polo económico e cultural do país",
    landmarks: ["Baixa Pombalina", "Bairro Alto", "Belém", "Parque das Nações", "Alfama"],
    businessDistricts: ["Marquês de Pombal", "Parque das Nações", "Entrecampos", "Avenida da Liberdade"],
    notableContext:
      "Lisboa concentra as maiores empresas, agências e marcas nacionais, com um ecossistema de comunicação visual cada vez mais exigente e um mercado turístico de grande escala.",
  },
  {
    slug: "porto",
    name: "Porto",
    region: "Grande Porto",
    description: "segunda maior cidade portuguesa e capital cultural do Norte",
    landmarks: ["Ribeira", "Baixa do Porto", "Foz do Douro", "Bonfim", "Matosinhos"],
    businessDistricts: ["Boavista", "Matosinhos", "Exponor", "Parque Empresarial da Maia"],
    notableContext:
      "O Porto tem uma identidade visual inconfundível — azulejo, granito, luz dourada e o rio Douro. Marcas do Norte com conteúdo diferenciado têm vantagem clara num mercado cada vez mais competitivo.",
  },
  {
    slug: "setubal",
    name: "Setúbal",
    region: "Península de Setúbal",
    description: "cidade industrial e portuária com uma Área Metropolitana de Lisboa em forte crescimento",
    landmarks: ["Parque Natural da Arrábida", "Serra do Risco", "Praias do Portinho", "Centro Histórico de Setúbal"],
    businessDistricts: ["Zona Industrial de Setúbal", "Palmela Business Park", "Parque de Negócios do Lavradio"],
    notableContext:
      "A Península de Setúbal combina indústria pesada, turismo de natureza na Arrábida e uma crescente comunidade de PMEs a crescer fora da Grande Lisboa.",
  },
  {
    slug: "algarve",
    name: "Algarve",
    region: "Algarve",
    description: "região turística mais visitada de Portugal, com resorts, hotéis e marcas de lifestyle internacionais",
    landmarks: ["Praia da Marinha", "Vilamoura Marina", "Lagos", "Tavira", "Sagres"],
    businessDistricts: ["Faro Business Center", "Vilamoura", "Portimão", "Loulé"],
    notableContext:
      "O Algarve tem 300 dias de sol e 500 hotéis a competir pelo mesmo mercado. A diferença entre ocupação máxima e quartos vazios está na percepção — e a percepção constrói-se com conteúdo.",
  },
  {
    slug: "coimbra",
    name: "Coimbra",
    region: "Centro de Portugal",
    description: "cidade universitária histórica e capital da região Centro",
    landmarks: ["Universidade de Coimbra", "Alta Universitária", "Mondego", "Baixa de Coimbra"],
    businessDistricts: ["Parque Tecnológico de Coimbra", "Coimbra Business Park", "BIOCANT Park"],
    notableContext:
      "Coimbra é um polo de tecnologia, saúde e educação com uma comunidade empresarial jovem e inovadora — e marcas que precisam de comunicar rigor e credibilidade.",
  },
  {
    slug: "braga",
    name: "Braga",
    region: "Minho",
    description: "cidade com maior crescimento económico do Norte, referência em tecnologia e empreendedorismo",
    landmarks: ["Bom Jesus do Monte", "Sé de Braga", "Parque de Exposições", "Nogueira"],
    businessDistricts: ["AvePark", "Braga Parque", "Zona Industrial de Braga", "INL — Instituto de Nanociência"],
    notableContext:
      "Braga é a capital do empreendedorismo tecnológico português, com startups, empresas de software e indústria têxtil que precisam de comunicação visual que acompanhe o seu crescimento.",
  },
  {
    slug: "funchal",
    name: "Funchal",
    region: "Madeira",
    description: "capital da Região Autónoma da Madeira, com um mercado turístico e hoteleiro de grande expressão internacional",
    landmarks: ["Mercado dos Lavradores", "Monte", "Zona Velha", "Praia Formosa", "Pico Ruivo"],
    businessDistricts: ["Zona Franca da Madeira", "Centro Empresarial da Madeira", "Calheta"],
    notableContext:
      "A Madeira atrai turistas de toda a Europa com um produto diferenciado de natureza, gastronomia e cultura. Marcas que comunicam bem esse contexto capturam um mercado disposto a pagar mais.",
  },
  {
    slug: "cascais",
    name: "Cascais",
    region: "Linha de Cascais",
    description: "município costeiro da Área Metropolitana de Lisboa, com grande concentração de marcas de lifestyle e turismo de alto valor",
    landmarks: ["Centro Histórico de Cascais", "Estoril", "Guincho", "Boca do Inferno", "Marina de Cascais"],
    businessDistricts: ["Cascais Business Park", "Estoril", "Parede", "Alcabideche"],
    notableContext:
      "Cascais é um dos territórios com maior densidade de marcas de lifestyle, hotelaria de valor e empresas multinacionais instaladas em Portugal. Um mercado exigente que recompensa quem comunica com distinção.",
  },
];

export const SERVICES_SEO: ServiceSeoData[] = [
  {
    slug: "video-institucional",
    name: "Vídeo Institucional",
    shortName: "vídeo institucional",
    description: "Produção de vídeos institucionais que apresentam a história, cultura e valores da empresa com narrativa cinematográfica.",
    mainServiceSlug: "videos-institucionais",
  },
  {
    slug: "filme-comercial",
    name: "Filme Comercial",
    shortName: "filme comercial",
    description: "Produção de filmes publicitários e comerciais para campanhas de marca, lançamentos de produto e posicionamento.",
    mainServiceSlug: "filmes-comerciais",
  },
  {
    slug: "conteudo-redes-sociais",
    name: "Conteúdo para Redes Sociais",
    shortName: "conteúdo para redes sociais",
    description: "Produção de reels, stories e conteúdo nativo para Instagram, TikTok e LinkedIn — estratégico, mensal e pronto a publicar.",
    mainServiceSlug: "redes-sociais",
  },
  {
    slug: "fotografia-profissional",
    name: "Fotografia Profissional",
    shortName: "fotografia profissional",
    description: "Fotografia com direcção de arte para comunicação de marca, produto, gastronomia e ambiente corporativo.",
    mainServiceSlug: "fotografia",
  },
  {
    slug: "cobertura-eventos",
    name: "Cobertura de Eventos",
    shortName: "cobertura de eventos",
    description: "Cobertura fotográfica e vídeo de eventos corporativos, lançamentos e conferências — conteúdo que dura meses.",
    mainServiceSlug: "eventos",
  },
  {
    slug: "brand-film",
    name: "Brand Film",
    shortName: "brand film",
    description: "Filmes de marca que comunicam a essência, os valores e a identidade de uma empresa de forma cinematográfica e duradoura.",
    mainServiceSlug: "brand-film",
  },
  {
    slug: "video-drone",
    name: "Vídeo Drone",
    shortName: "vídeo drone",
    description: "Filmagem aérea profissional com drone para propriedades, eventos e conteúdo visual diferenciado.",
    mainServiceSlug: "eventos",
  },
];

export const SECTORS_SEO: SectorSeoData[] = [
  {
    slug: "hotelaria",
    name: "Hotelaria",
    description: "hotéis, resorts, pousadas e estabelecimentos de alojamento turístico",
    keywords: ["hotel", "resort", "pousada", "alojamento", "turismo", "hospedagem"],
    challenge:
      "Num mercado onde hóspedes comparam dezenas de opções em segundos, o hotel que mostra a experiência em vídeo converte mais do que o que apenas a descreve.",
  },
  {
    slug: "restauracao",
    name: "Restauração",
    description: "restaurantes, bares, cafés e estabelecimentos de food & beverage",
    keywords: ["restaurante", "fine dining", "gastronomia", "café", "bar", "food"],
    challenge:
      "Um restaurante é uma experiência sensorial — e o conteúdo que o apresenta precisa de ser capaz de despertar apetite e desejo antes do cliente entrar pela porta.",
  },
  {
    slug: "imobiliario",
    name: "Imobiliário",
    description: "promotores imobiliários, agências e projetos de desenvolvimento urbano",
    keywords: ["imobiliário", "promotor", "desenvolvimento", "construção", "propriedade"],
    challenge:
      "No imobiliário, a primeira impressão é quase sempre visual. Projetos bem apresentados em vídeo vendem mais rápido e a melhores condições.",
  },
  {
    slug: "corporate",
    name: "Corporate",
    description: "empresas, multinacionais e organizações que precisam de comunicação interna e externa de alto valor",
    keywords: ["corporate", "empresarial", "institucional", "multinacional", "B2B"],
    challenge:
      "Empresas corporate precisam de conteúdo que combine rigor técnico com narrativa humana — para recrutar talento, apresentar resultados ou comunicar cultura.",
  },
  {
    slug: "saude",
    name: "Saúde",
    description: "clínicas, hospitais, grupos de saúde e profissionais de medicina",
    keywords: ["saúde", "clínica", "hospital", "medicina", "saúde privada", "bem-estar"],
    challenge:
      "Na saúde, confiança é tudo. Um vídeo institucional bem feito humaniza a clínica, reduz a ansiedade do paciente e diferencia numa área onde a percepção de qualidade é decisiva.",
  },
  {
    slug: "educacao",
    name: "Educação",
    description: "universidades, escolas, centros de formação e plataformas de e-learning",
    keywords: ["educação", "universidade", "escola", "formação", "ensino", "e-learning"],
    challenge:
      "Instituições de ensino que investem em conteúdo audiovisual diferenciado atraem mais candidatos, comunicam melhor os seus valores e constroem reputação de longo prazo.",
  },
  {
    slug: "tecnologia",
    name: "Tecnologia",
    description: "startups, scale-ups e empresas de software, SaaS e tecnologia",
    keywords: ["tecnologia", "startup", "SaaS", "software", "tech", "inovação"],
    challenge:
      "Empresas de tecnologia têm produtos complexos que precisam de ser explicados de forma simples e visualmente apelativa para captar clientes, investidores e talento.",
  },
  {
    slug: "moda-lifestyle",
    name: "Moda e Lifestyle",
    description: "marcas de moda, lifestyle, cosmética e produtos de consumo",
    keywords: ["moda", "lifestyle", "cosmética", "beleza", "vestuário", "acessórios"],
    challenge:
      "Em moda e lifestyle, a identidade visual é o produto. Conteúdo fotográfico e de vídeo de qualidade não é opcional — é o que define se a marca comunica ao nível do mercado onde quer competir.",
  },
];

export interface HighIntentCombination {
  service: string;
  city: string;
  sector: string;
}

export const HIGH_INTENT_COMBINATIONS: HighIntentCombination[] = [
  // Lisboa combinations
  { service: "video-institucional", city: "lisboa", sector: "corporate" },
  { service: "video-institucional", city: "lisboa", sector: "tecnologia" },
  { service: "video-institucional", city: "lisboa", sector: "saude" },
  { service: "video-institucional", city: "lisboa", sector: "educacao" },
  { service: "filme-comercial", city: "lisboa", sector: "hotelaria" },
  { service: "filme-comercial", city: "lisboa", sector: "restauracao" },
  { service: "filme-comercial", city: "lisboa", sector: "moda-lifestyle" },
  { service: "brand-film", city: "lisboa", sector: "hotelaria" },
  { service: "brand-film", city: "lisboa", sector: "restauracao" },
  { service: "brand-film", city: "lisboa", sector: "corporate" },
  { service: "fotografia-profissional", city: "lisboa", sector: "hotelaria" },
  { service: "fotografia-profissional", city: "lisboa", sector: "restauracao" },
  { service: "fotografia-profissional", city: "lisboa", sector: "imobiliario" },
  { service: "conteudo-redes-sociais", city: "lisboa", sector: "restauracao" },
  { service: "conteudo-redes-sociais", city: "lisboa", sector: "moda-lifestyle" },
  { service: "cobertura-eventos", city: "lisboa", sector: "corporate" },
  // Porto combinations
  { service: "video-institucional", city: "porto", sector: "corporate" },
  { service: "video-institucional", city: "porto", sector: "tecnologia" },
  { service: "filme-comercial", city: "porto", sector: "hotelaria" },
  { service: "filme-comercial", city: "porto", sector: "restauracao" },
  { service: "brand-film", city: "porto", sector: "hotelaria" },
  { service: "brand-film", city: "porto", sector: "restauracao" },
  { service: "fotografia-profissional", city: "porto", sector: "hotelaria" },
  { service: "fotografia-profissional", city: "porto", sector: "restauracao" },
  { service: "fotografia-profissional", city: "porto", sector: "imobiliario" },
  { service: "conteudo-redes-sociais", city: "porto", sector: "restauracao" },
  { service: "cobertura-eventos", city: "porto", sector: "corporate" },
  { service: "video-drone", city: "porto", sector: "imobiliario" },
  // Algarve combinations
  { service: "brand-film", city: "algarve", sector: "hotelaria" },
  { service: "filme-comercial", city: "algarve", sector: "hotelaria" },
  { service: "fotografia-profissional", city: "algarve", sector: "hotelaria" },
  { service: "conteudo-redes-sociais", city: "algarve", sector: "hotelaria" },
  { service: "video-drone", city: "algarve", sector: "hotelaria" },
  { service: "fotografia-profissional", city: "algarve", sector: "restauracao" },
  { service: "brand-film", city: "algarve", sector: "restauracao" },
  // Cascais combinations
  { service: "brand-film", city: "cascais", sector: "hotelaria" },
  { service: "fotografia-profissional", city: "cascais", sector: "imobiliario" },
  { service: "filme-comercial", city: "cascais", sector: "moda-lifestyle" },
  { service: "video-institucional", city: "cascais", sector: "corporate" },
  { service: "video-drone", city: "cascais", sector: "imobiliario" },
  // Funchal combinations
  { service: "brand-film", city: "funchal", sector: "hotelaria" },
  { service: "filme-comercial", city: "funchal", sector: "hotelaria" },
  { service: "fotografia-profissional", city: "funchal", sector: "hotelaria" },
  { service: "video-drone", city: "funchal", sector: "hotelaria" },
  { service: "conteudo-redes-sociais", city: "funchal", sector: "hotelaria" },
  // Braga combinations
  { service: "video-institucional", city: "braga", sector: "tecnologia" },
  { service: "video-institucional", city: "braga", sector: "corporate" },
  { service: "brand-film", city: "braga", sector: "tecnologia" },
  { service: "fotografia-profissional", city: "braga", sector: "corporate" },
  { service: "conteudo-redes-sociais", city: "braga", sector: "tecnologia" },
  // Coimbra combinations
  { service: "video-institucional", city: "coimbra", sector: "saude" },
  { service: "video-institucional", city: "coimbra", sector: "educacao" },
  { service: "brand-film", city: "coimbra", sector: "saude" },
  { service: "fotografia-profissional", city: "coimbra", sector: "saude" },
  { service: "conteudo-redes-sociais", city: "coimbra", sector: "educacao" },
  // Setúbal combinations
  { service: "video-institucional", city: "setubal", sector: "corporate" },
  { service: "brand-film", city: "setubal", sector: "hotelaria" },
  { service: "fotografia-profissional", city: "setubal", sector: "imobiliario" },
  { service: "video-drone", city: "setubal", sector: "imobiliario" },
  { service: "conteudo-redes-sociais", city: "setubal", sector: "restauracao" },
];

export function getCity(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getServiceSeo(slug: string): ServiceSeoData | undefined {
  return SERVICES_SEO.find((s) => s.slug === slug);
}

export function getSectorSeo(slug: string): SectorSeoData | undefined {
  return SECTORS_SEO.find((s) => s.slug === slug);
}

export function isHighIntentCombination(service: string, city: string, sector: string): boolean {
  return HIGH_INTENT_COMBINATIONS.some(
    (c) => c.service === service && c.city === city && c.sector === sector
  );
}

export const BLOG_LINKS_BY_SERVICE: Record<string, { title: string; href: string }[]> = {
  "video-institucional": [
    { title: "Quanto custa um vídeo institucional em Portugal?", href: "/blog/quanto-custa-video-institucional-portugal" },
    { title: "7 razões para a tua empresa investir em vídeo em 2026", href: "/blog/porque-empresa-precisa-video-2026" },
    { title: "Vídeo institucional vs filme comercial: qual é que a tua empresa precisa?", href: "/blog/video-institucional-vs-filme-comercial" },
    { title: "Como escolher a produtora audiovisual certa", href: "/blog/como-escolher-produtora-audiovisual" },
  ],
  "filme-comercial": [
    { title: "Como escolher a produtora audiovisual certa", href: "/blog/como-escolher-produtora-audiovisual" },
    { title: "7 razões para a tua empresa investir em vídeo em 2026", href: "/blog/porque-empresa-precisa-video-2026" },
    { title: "Vídeo institucional vs filme comercial: qual é que a tua empresa precisa?", href: "/blog/video-institucional-vs-filme-comercial" },
    { title: "Quanto custa um vídeo institucional em Portugal?", href: "/blog/quanto-custa-video-institucional-portugal" },
  ],
  "brand-film": [
    { title: "Como escolher a produtora audiovisual certa", href: "/blog/como-escolher-produtora-audiovisual" },
    { title: "Quanto custa um vídeo institucional em Portugal?", href: "/blog/quanto-custa-video-institucional-portugal" },
    { title: "7 razões para a tua empresa investir em vídeo em 2026", href: "/blog/porque-empresa-precisa-video-2026" },
    { title: "Vídeo institucional vs filme comercial: qual é que a tua empresa precisa?", href: "/blog/video-institucional-vs-filme-comercial" },
  ],
  "fotografia-profissional": [
    { title: "7 razões para a tua empresa investir em vídeo em 2026", href: "/blog/porque-empresa-precisa-video-2026" },
    { title: "Como escolher a produtora audiovisual certa", href: "/blog/como-escolher-produtora-audiovisual" },
    { title: "Quanto custa um vídeo institucional em Portugal?", href: "/blog/quanto-custa-video-institucional-portugal" },
  ],
  "conteudo-redes-sociais": [
    { title: "7 razões para a tua empresa investir em vídeo em 2026", href: "/blog/porque-empresa-precisa-video-2026" },
    { title: "Como escolher a produtora audiovisual certa", href: "/blog/como-escolher-produtora-audiovisual" },
    { title: "Vídeo institucional vs filme comercial: qual é que a tua empresa precisa?", href: "/blog/video-institucional-vs-filme-comercial" },
  ],
  "cobertura-eventos": [
    { title: "Como escolher a produtora audiovisual certa", href: "/blog/como-escolher-produtora-audiovisual" },
    { title: "7 razões para a tua empresa investir em vídeo em 2026", href: "/blog/porque-empresa-precisa-video-2026" },
    { title: "Quanto custa um vídeo institucional em Portugal?", href: "/blog/quanto-custa-video-institucional-portugal" },
  ],
  "video-drone": [
    { title: "Quanto custa um vídeo institucional em Portugal?", href: "/blog/quanto-custa-video-institucional-portugal" },
    { title: "7 razões para a tua empresa investir em vídeo em 2026", href: "/blog/porque-empresa-precisa-video-2026" },
    { title: "Como escolher a produtora audiovisual certa", href: "/blog/como-escolher-produtora-audiovisual" },
  ],
};
