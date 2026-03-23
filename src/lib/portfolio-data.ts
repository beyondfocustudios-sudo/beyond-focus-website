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
    services: ["Direcção criativa", "Produção", "Fotografia de produto", "Fotografia de hotel"],
    briefText:
      "Situado aos pés da Serra da Arrábida, o Hotel Casa Palmela é um cinco estrelas que faz parte do grupo Small Luxury Hotels. Com um público maioritariamente internacional, o hotel queria um filme que mostrasse a experiência completa de um hóspede — desde o despertar até ao final do dia — passando pelas diversas actividades e momentos que o espaço proporciona.\n\nEste projecto representou a entrada da Beyond Focus no mundo da hotelaria — um sector onde a imagem é tudo e onde a qualidade do conteúdo define a percepção do espaço.",
    bodyCopy1Title: "Um dia no Casa Palmela, do amanhecer ao anoitecer.",
    bodyCopy1Text:
      "O conceito era simples mas exigente: acompanhar o percurso natural de um hóspede ao longo de um dia inteiro. O despertar com a luz da Arrábida, o pequeno-almoço, as actividades, os detalhes do espaço, o final de tarde. Cada cena foi pensada para transmitir a serenidade e o luxo discreto que definem o Casa Palmela — um refúgio countryside a poucos quilómetros de Lisboa.",
    bodyCopy2Title: "Quando o cliente é cinco estrelas, a produção também tem de ser.",
    bodyCopy2Text:
      "Filmámos ao longo de dois momentos — uma manhã e uma tarde — num total de um dia de produção. Para além do filme comercial, produzimos fotografia de produto e fotografia do hotel que o cliente utiliza nas suas plataformas de booking e comunicação. O feedback foi directo e genuíno: um cliente que nos fez sentir que a hotelaria era onde devíamos estar.",
    heroVideo: "/videos/portfolio/hcp-final.mp4",
    gallery: [
      "/images/portfolio/gallery/hotel-casa-palmela/hcp-vdm-stills-06.jpg",
      "/images/portfolio/gallery/hotel-casa-palmela/hcp-vdm-stills-07.jpg",
    ],
  },
  {
    slug: "carl-zeiss-portugal",
    title: "Carl Zeiss Portugal",
    client: "Carl Zeiss Portugal",
    category: "Vídeos Institucionais",
    thumbnail: "/images/portfolio/zeiss-thumb.jpg",
    video: "/videos/portfolio/zeiss-bts.mp4",
    services: ["Produção", "Filmagem institucional", "Behind the Scenes"],
    briefText:
      "A Carl Zeiss, um dos nomes mais reconhecidos da indústria óptica mundial, tem uma fábrica em Setúbal — literalmente na rua ao lado do nosso estúdio. Quando nos contactaram, o pedido era claro: criar um vídeo institucional que mostrasse as instalações, os processos de fabrico e a dimensão da operação portuguesa, para uso interno em reuniões de equipa e apresentações da empresa.\n\nEste foi o nosso primeiro vídeo institucional e um dos momentos mais entusiasmantes para a equipa. Ter uma marca com a dimensão da Zeiss a confiar em nós validou o caminho que estávamos a construir.",
    bodyCopy1Title: "Por dentro de uma das fábricas mais avançadas do país.",
    bodyCopy1Text:
      "A produção incluiu a filmagem completa de todas as áreas da fábrica — desde as linhas de montagem aos laboratórios de precisão. Cada processo, cada detalhe, capturado num vídeo de quase dez minutos que serve como cartão de visita interno da operação portuguesa da Zeiss. O BTS (behind the scenes) que publicamos dá uma ideia da escala da produção.",
    bodyCopy2Title: "Um grande nome. Uma grande responsabilidade.",
    bodyCopy2Text:
      "Por razões de confidencialidade (NDA), apenas podemos mostrar o BTS da produção — o vídeo institucional final é de uso exclusivo interno da Zeiss. Mas o resultado fala por si: uma avaliação de 9.5 em 10 por parte do João, o responsável que acompanhou o projecto do lado da Zeiss. Para uma primeira incursão no mundo institucional, não podíamos ter pedido melhor.",
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
    title: "Highgate Portugal",
    client: "Highgate Portugal",
    category: "Eventos",
    thumbnail: "/images/portfolio/highgate-thumb.jpg",
    video: "/videos/portfolio/highgate-sesimbra.mp4",
    services: ["Cobertura vídeo", "Fotografia de evento"],
    briefText:
      "A Highgate é um grupo americano de gestão hoteleira com operações em Portugal. Para a festa de Natal corporativa da Highgate Portugal — um evento com mais de cem colaboradores — precisavam de uma equipa que capturasse o ambiente da noite: a celebração, os prémios, os momentos de equipa.",
    bodyCopy1Title: "Uma noite. Uma equipa de três. Todo o conteúdo que precisavam.",
    bodyCopy1Text:
      "Com uma equipa de três pessoas, cobrimos a totalidade do evento — fotografia e vídeo em simultâneo. O ambiente era íntimo e bem organizado, o que nos permitiu focar nos momentos que realmente importavam: os discursos, a entrega de prémios, as reacções genuínas. O tipo de produção onde menos é mais.",
    bodyCopy2Title: "Conteúdo que vai além da noite.",
    bodyCopy2Text:
      "O resultado foi um pacote completo: fotografia do evento para comunicação interna, vídeo highlight para redes sociais e memória visual para a equipa. Uma noite de produção, meses de conteúdo utilizável. É exactamente para isto que existimos.",
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
    title: "Amoretti Lux",
    client: "Amoretti Lux",
    category: "Fotografia",
    thumbnail: "/images/portfolio/amoretti-thumb.jpg",
    video: null,
    services: ["Direcção de arte", "Sessão fotográfica"],
    briefText:
      "A Amoretti Lux é uma marca de roupa criada por três jovens empreendedores com uma visão clara: posicionar as suas peças em ambientes de luxo. O pedido era traduzir essa visão em imagens — colocar as t-shirts em cenários que comunicassem exclusividade e aspiração, sem que a marca precisasse de o dizer por palavras.",
    bodyCopy1Title: "Luxo é contexto.",
    bodyCopy1Text:
      "Realizámos duas sessões fotográficas para a Amoretti Lux. O conceito foi construído em torno da ideia de que o luxo não está no produto isolado, mas no mundo que o rodeia. Supercarros, cenários cuidados e uma direcção de arte que colocava cada peça de roupa no centro da narrativa visual. Tudo filmado em Setúbal, provando que não é preciso ir longe para criar imagens que parecem internacionais.",
    bodyCopy2Title: "A primeira experiência com uma produtora. Nota máxima.",
    bodyCopy2Text:
      "Para a Amoretti Lux, esta foi a primeira colaboração com uma produtora audiovisual. O resultado: uma avaliação de 10 em 10. As imagens passaram a ser o rosto da marca nas redes sociais e na comunicação com parceiros — prova de que uma boa sessão fotográfica pode elevar uma marca inteira.",
    heroVideo: null,
    gallery: [],
  },
  {
    slug: "soce-mauro-loureiro",
    title: "Sóçe by Mauro Loureiro",
    client: "Sóçe — Restaurante do Chef Mauro Loureiro",
    category: "Filmes Comerciais",
    thumbnail: "/images/portfolio/gallery/soce/soce-fotos-02.jpg",
    video: "/videos/portfolio/soce-mauro.mp4",
    services: ["Direcção criativa", "Produção", "Filmagem gastronómica"],
    briefText:
      "O Sóçe é o restaurante do Chef Mauro Loureiro em Setúbal — um nome cada vez mais presente na televisão e na gastronomia portuguesa. O pedido era criar um filme que mostrasse um prato específico de bacalhau, desde o conceito inicial até à apresentação final, passando por todo o processo criativo na cozinha.\n\nPara a Beyond Focus, este era o primeiro passo no mundo da restauração — um sector onde a imagem é tudo.",
    bodyCopy1Title: "Do conceito ao prato. Cada etapa filmada.",
    bodyCopy1Text:
      "O filme acompanha o processo completo: a ideia do chef, a preparação dos ingredientes, a técnica na cozinha, a montagem do prato. Não é apenas food porn — é storytelling gastronómico. O espectador vê o prato nascer e entende a intenção por trás de cada elemento. Ao mesmo tempo, captámos o ambiente do restaurante, o espaço, a identidade do Sóçe.",
    bodyCopy2Title: "A nossa entrada no mundo da gastronomia.",
    bodyCopy2Text:
      "Este projecto abriu-nos uma porta importante. A restauração em Portugal precisa cada vez mais de conteúdo audiovisual de qualidade — e nós provámos que sabemos contar histórias à mesa tão bem como em qualquer outro cenário.",
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
    client: "Once Upon Lisboa",
    category: "Fotografia",
    thumbnail: "/images/portfolio/gallery/once-upon-a-house/oul-sessao2-01.jpg",
    video: null,
    services: ["Fotografia de hotel", "Fotografia para redes sociais", "Fotografia para plataformas de booking"],
    briefText:
      "O Once Upon Lisboa é um hotel em Lisboa que pertence ao mesmo grupo do Hotel Casa Palmela. Em Setembro de 2025, o hotel abriu portas e precisava de fotografia profissional para o lançamento — imagens para redes sociais, plataformas de booking e comunicação institucional. Confiaram em nós pela experiência positiva com o Casa Palmela.",
    bodyCopy1Title: "Fotografar um hotel antes do mundo o ver.",
    bodyCopy1Text:
      "Realizámos duas sessões fotográficas completas para o Once Upon Lisboa: a primeira para o lançamento inicial e a segunda para complementar o acervo visual. Quartos, áreas comuns, detalhes de decoração, vistas — tudo capturado com a mesma atenção ao detalhe que nos define.",
    bodyCopy2Title: "Um erro assumido. Um cliente conquistado.",
    bodyCopy2Text:
      "Ser transparente é um dos nossos valores — e este projecto testou-o. Após a aprovação inicial das fotografias, o CEO do grupo decidiu que queria uma abordagem diferente. Podíamos ter cobrado uma nova sessão. Em vez disso, assumimos a responsabilidade — o briefing inicial podia ter sido mais aprofundado da nossa parte. Cobrimos os custos, contratámos uma equipa nova e entregámos exactamente o que era pretendido. O resultado? Um cliente que nos deu 10 em 10 e a confirmação de que a forma como se resolve um problema vale mais do que nunca ter problemas.",
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
