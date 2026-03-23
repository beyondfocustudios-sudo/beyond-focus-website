export const BRAND = {
  colors: {
    cream: "#FAF9F7",
    bgLight: "#F5F5F5",
    white: "#FFFFFF",
    petrol: "#0E3A45",
    petrolDeep: "#070f13",
    orange: "#FA8334",
    black: "#000000",
  },
} as const;

export const NAV_ITEMS = [
  { label: "Início", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Serviços", href: "/servicos" },
  { label: "Portal", href: "/portal-cliente" },
  { label: "Sobre", href: "/sobre" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const SERVICES = [
  { number: "01", title: "Filmes Comerciais", tagline: "Spots que ninguém salta." },
  { number: "02", title: "Vídeos Institucionais", tagline: "A história da tua marca, contada a sério." },
  { number: "03", title: "Documentários", tagline: "Profundidade, não visibilidade." },
  { number: "04", title: "Conteúdos de Redes Sociais", tagline: "Conteúdo que pára o scroll." },
  { number: "05", title: "Fotografia", tagline: "Cada frame é uma decisão." },
  { number: "06", title: "Eventos", tagline: "Um dia. Meses de conteúdo." },
  { number: "07", title: "Estratégia", tagline: "A direcção certa antes do primeiro plano." },
] as const;

export const TESTIMONIALS = [
  {
    score: "9.5/10",
    company: "Carl Zeiss Portugal",
    quote: "O acompanhamento ao vivo nas filmagens permitiu ajustar planos em tempo real e elevar o resultado final.",
    type: "Filme Institucional",
  },
  {
    score: "10/10",
    company: "Once Upon a House",
    quote: "A Beyond Focus interpretou o briefing com precisão. O trabalho em equipa funcionou na perfeição.",
    type: "Filme Comercial",
  },
  {
    score: "9/10",
    company: "Once Upon Lisboa",
    quote: "Profissionalismo, disponibilidade e transparência em todo o processo. Perante um imprevisto, a equipa respondeu com rapidez e compromisso. O resultado correspondeu às expectativas.",
    type: "Filme Comercial",
  },
  {
    score: "10/10",
    company: "Amoretti Lux",
    quote: "A Beyond superou expectativas: pessoas incríveis, dedicadas e com respeito pela nossa ambição.",
    type: "Fotografia",
  },
] as const;

export const PARTNERS = [
  { name: "Carl Zeiss", logo: "/images/partners/carl-zeiss.png" },
  { name: "Highgate", logo: "/images/partners/highgate.png" },
  { name: "Joplins", logo: "/images/partners/joplins.png" },
  { name: "Once Upon a House", logo: "/images/partners/once-upon-a-house.png" },
  { name: "Amoretti Lux", logo: "/images/partners/amoretti-lux.png" },
  { name: "Hotel Cristal", logo: "/images/partners/hotel-cristal.png" },
  { name: "Hotel Casa Palmela", logo: "/images/partners/hotel-casa-palmela.png" },
  { name: "Soce", logo: "/images/partners/soce.png" },
  { name: "ifoffice", logo: "/images/partners/ifoffice.png" },
] as const;

export const PROCESS_STEPS = [
  { number: "01", title: "Proposta", description: "Ouvimos o teu objectivo, analisamos o contexto e apresentamos uma proposta clara." },
  { number: "02", title: "Conceito", description: "Definimos a direcção criativa, o tom e a narrativa do projecto." },
  { number: "03", title: "Pré-Produção", description: "Planeamos cada detalhe — equipa, locais, guião, logística." },
  { number: "04", title: "Gravação", description: "Executamos com rigor, flexibilidade e atenção a cada plano." },
  { number: "05", title: "Pós-Produção", description: "Edição, cor, som e entrega final com revisões incluídas." },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Quanto custa um projecto de vídeo?",
    answer: "Cada projecto é único, por isso trabalhamos com orçamentos personalizados. Após uma conversa inicial para perceber os teus objectivos, apresentamos uma proposta detalhada sem compromisso.",
  },
  {
    question: "Quanto tempo demora um projecto?",
    answer: "Depende da complexidade, mas a maioria dos projectos demora entre 2 a 6 semanas desde o briefing até à entrega final. Damos sempre um timeline claro antes de começar.",
  },
  {
    question: "Trabalham só em Setúbal ou em todo o país?",
    answer: "Trabalhamos em todo o país e também internacionalmente. A nossa base é em Setúbal mas já produzimos em Lisboa, Porto, Algarve e fora de Portugal.",
  },
  {
    question: "Preciso de ter um guião antes de contactar?",
    answer: "Não. Podes vir só com uma ideia ou objectivo de negócio. A direcção criativa e o guião fazem parte do nosso processo — tratamos de tudo.",
  },
  {
    question: "Quantas revisões estão incluídas?",
    answer: "Todas as nossas propostas incluem rondas de revisão. O número exacto varia com o projecto, mas garantimos que ficas satisfeito com o resultado final.",
  },
  {
    question: "O que é o Portal Beyond Focus?",
    answer: "É a nossa plataforma exclusiva onde acompanhas o teu projecto em tempo real, aprovas entregas, comunicas com a equipa e acedes a todos os documentos — tudo num só sítio.",
  },
] as const;
