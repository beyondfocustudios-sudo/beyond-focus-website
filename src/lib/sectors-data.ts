export interface SectorPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroTitle: string;
  heroSubtitle: string;
  challenge: { title: string; text: string };
  services: string[];
  caseStudySlugs: string[];
  faq: { question: string; answer: string }[];
}

export const SECTOR_PAGES: SectorPage[] = [
  {
    slug: "hotelaria",
    title: "Produção audiovisual para hotelaria",
    metaTitle: "Vídeo para Hotéis em Portugal — Beyond Focus",
    metaDescription:
      "Produzimos filmes e fotografia para hotéis que querem mais reservas. Experiência com Hotel Casa Palmela e Once Upon Lisboa.",
    keywords: ["vídeo hotel portugal", "produtora vídeo hotelaria", "fotografia hotel"],
    heroTitle: "Produção audiovisual para hotelaria",
    heroSubtitle:
      "Um hóspede decide em segundos se vai reservar o teu hotel. Um vídeo profissional mostra a experiência antes de a viver — e transforma visitas em reservas.",
    challenge: {
      title: "O desafio",
      text: "A maioria dos hotéis em Portugal ainda depende apenas de fotografias para vender quartos. Num mercado onde os hóspedes comparam dezenas de opções em plataformas de booking, o hotel que mostra a experiência em vídeo tem vantagem imediata.",
    },
    services: [
      "Filmes comerciais de apresentação do espaço",
      "Fotografia profissional para booking e redes sociais",
      "Conteúdo de redes sociais (reels, stories)",
      "Cobertura de eventos no hotel",
    ],
    caseStudySlugs: ["hotel-casa-palmela", "once-upon-a-house"],
    faq: [
      {
        question: "Quanto custa um vídeo para hotel?",
        answer:
          "Entre €3.000 e €8.000 dependendo da complexidade. Tipicamente 1-2 dias de filmagem.",
      },
      {
        question: "Podem filmar durante a operação do hotel?",
        answer:
          "Sim. Planeamos a produção para não interferir com os hóspedes.",
      },
      {
        question: "Que plataformas beneficiam do vídeo?",
        answer:
          "Booking.com, Expedia, website próprio, Instagram e Google Business Profile.",
      },
    ],
  },
  {
    slug: "restauracao",
    title: "Produção audiovisual para restauração",
    metaTitle: "Vídeo para Restaurantes em Portugal — Beyond Focus",
    metaDescription:
      "Conteúdo audiovisual para restaurantes que querem mais clientes. Filmagem gastronómica, reels e vídeos de apresentação.",
    keywords: ["vídeo restaurante portugal", "filmagem gastronómica", "produtora vídeo restauração"],
    heroTitle: "Produção audiovisual para restauração",
    heroSubtitle:
      "Um prato bem filmado faz mais do que abrir o apetite — faz o cliente reservar mesa.",
    challenge: {
      title: "O desafio",
      text: "As redes sociais são o novo cartão de visita de um restaurante. Mas conteúdo filmado com telemóvel, sem iluminação e sem direcção criativa, passa exactamente a mensagem errada.",
    },
    services: [
      "Filmagem gastronómica (processo do prato, da cozinha ao prato)",
      "Vídeo de apresentação do espaço",
      "Conteúdo para redes sociais (reels, stories, posts)",
      "Fotografia de menu e ambiente",
    ],
    caseStudySlugs: ["soce-mauro-loureiro"],
    faq: [
      {
        question: "Quanto custa filmar para um restaurante?",
        answer:
          "Um pacote de conteúdo para redes sociais começa em €1.500. Um vídeo de apresentação completo entre €2.500 e €5.000.",
      },
      {
        question: "Filmam durante o serviço?",
        answer:
          "Podemos filmar antes da abertura ou durante o serviço com equipa discreta. Definimos na pré-produção.",
      },
      {
        question: "Entregam conteúdo pronto para Instagram?",
        answer:
          "Sim. Todos os formatos optimizados por plataforma — reels verticais, posts quadrados, stories.",
      },
    ],
  },
  {
    slug: "imobiliario",
    title: "Produção audiovisual para imobiliário",
    metaTitle: "Vídeo para Imobiliário em Portugal — Beyond Focus",
    metaDescription:
      "Vídeos e fotografia profissional para imóveis e promotoras imobiliárias. Vende mais rápido com conteúdo visual de qualidade.",
    keywords: ["vídeo imobiliário portugal", "fotografia imóveis", "tour virtual imóvel"],
    heroTitle: "Produção audiovisual para imobiliário",
    heroSubtitle:
      "Um imóvel com vídeo profissional vende mais rápido. A qualidade da apresentação visual diferencia um imóvel que atrai visitas de um que passa despercebido.",
    challenge: {
      title: "O desafio",
      text: "Fotografias tiradas com telemóvel, ângulos errados, iluminação pobre — a maioria dos imóveis em Portugal é apresentada de forma que não faz justiça ao espaço.",
    },
    services: [
      "Vídeo de apresentação de imóvel (walkthrough cinematográfico)",
      "Fotografia profissional de interiores e exteriores",
      "Filmagem com drone (vistas aéreas, envolvente)",
      "Conteúdo para portais imobiliários e redes sociais",
    ],
    caseStudySlugs: [],
    faq: [
      {
        question: "Quanto custa filmar um imóvel?",
        answer:
          "Uma sessão fotográfica + vídeo curto começa em €800. Produções com drone e storytelling entre €2.000 e €5.000.",
      },
      {
        question: "Fazem filmagem com drone?",
        answer: "Sim. Temos licença e equipamento para filmagem aérea.",
      },
      {
        question: "Quanto tempo demora a entrega?",
        answer:
          "Fotografia em 3-5 dias úteis. Vídeo em 7-10 dias úteis.",
      },
    ],
  },
  {
    slug: "corporate",
    title: "Produção audiovisual para empresas",
    metaTitle: "Vídeo Corporativo em Portugal — Beyond Focus",
    metaDescription:
      "Produção de vídeo corporativo para empresas em Lisboa. Institucionais, eventos, formação e conteúdo para comunicação interna e externa.",
    keywords: ["vídeo corporativo Portugal", "produtora vídeo empresas Lisboa", "vídeo institucional empresa"],
    heroTitle: "Produção audiovisual para empresas",
    heroSubtitle:
      "Da comunicação interna à apresentação a investidores — o vídeo é a forma mais eficaz de uma empresa transmitir a sua mensagem.",
    challenge: {
      title: "O desafio",
      text: "Muitas empresas em Portugal ainda comunicam apenas com texto e apresentações estáticas. O vídeo é o formato que mais engagement gera — mas exige qualidade profissional para transmitir credibilidade.",
    },
    services: [
      "Vídeos institucionais",
      "Cobertura de eventos corporativos",
      "Vídeos de formação e onboarding",
      "Conteúdo para redes sociais corporativas",
      "Fotografia corporativa",
    ],
    caseStudySlugs: ["carl-zeiss-portugal", "highgate"],
    faq: [
      {
        question: "Quanto custa um vídeo institucional?",
        answer:
          "Entre €1.500 e €15.000 dependendo da complexidade. A maioria das empresas investe entre €3.000 e €7.000.",
      },
      {
        question: "Podem filmar na nossa empresa?",
        answer:
          "Sim. Filmamos on-location nas vossas instalações, escritório ou fábrica.",
      },
      {
        question: "Entregam versões para diferentes plataformas?",
        answer:
          "Sim. Versão completa + versões curtas adaptadas para LinkedIn, Instagram, website e apresentações.",
      },
    ],
  },
];

export function getSectorPage(slug: string): SectorPage | undefined {
  return SECTOR_PAGES.find((s) => s.slug === slug);
}
