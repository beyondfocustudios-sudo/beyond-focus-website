export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  thumbnail: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "5-razoes-investir-video-institucional-2026",
    title: "5 razões para investir em vídeo institucional em 2026",
    excerpt: "O vídeo institucional continua a ser uma das ferramentas mais eficazes para comunicar a essência de uma marca. Descobre porquê.",
    category: "Estratégia",
    date: "15 Mar 2026",
    readTime: "5 min",
    thumbnail: "/images/services/institucionais.jpg",
    content: `O vídeo institucional evoluiu. Já não se trata de um vídeo corporativo genérico com stock footage e música de elevador. Em 2026, o vídeo institucional é uma peça estratégica que define como o mundo vê a tua marca.

Aqui ficam 5 razões para investir:

1. O vídeo é o formato preferido dos decisores. Antes de marcar uma reunião, o teu potencial cliente vai ver o teu site. E o que retém mais atenção? Vídeo.

2. Humaniza a marca. Num mundo cada vez mais digital, mostrar rostos reais, processos reais e histórias reais cria uma ligação emocional que nenhum texto consegue.

3. Versatilidade de uso. Um bom vídeo institucional funciona no website, nas redes sociais, em apresentações, em feiras e em pitches a investidores.

4. Diferenciação. A maioria dos teus concorrentes ainda não tem um. Ou tem um mau. Ter um vídeo institucional de qualidade cinematográfica é um diferenciador imediato.

5. Retorno a longo prazo. Ao contrário de um anúncio pago, um vídeo institucional continua a trabalhar para ti durante anos.`,
  },
  {
    slug: "como-preparar-empresa-rodagem",
    title: "Como preparar a tua empresa para uma rodagem",
    excerpt: "Vais gravar um vídeo para a tua empresa? Aqui ficam as dicas para que o dia de rodagem corra na perfeição.",
    category: "Produção",
    date: "8 Mar 2026",
    readTime: "4 min",
    thumbnail: "/images/services/filmes-comerciais.jpg",
    content: `O dia de rodagem é apenas a ponta do iceberg. A verdadeira magia acontece na preparação. Aqui ficam as nossas dicas para garantir que tudo corre bem.

Antes da rodagem:
- Define objectivos claros. O que queres comunicar? A quem? Porquê?
- Prepara os espaços. Arruma, limpa, e garante que a iluminação natural funciona a teu favor.
- Briefing à equipa. Todos devem saber o que esperar e o que se espera deles.
- Guarda-roupa. Se vão aparecer pessoas, define o dress code com antecedência.

No dia:
- Sê pontual. Tempo é luz, e luz é tudo em vídeo.
- Confia na equipa de produção. Estamos lá para guiar o processo.
- Sê natural. As melhores imagens vêm de momentos autênticos.
- Diverte-te. Se estiveres relaxado, o resultado final reflecte isso.`,
  },
  {
    slug: "o-que-torna-filme-comercial-eficaz",
    title: "O que torna um filme comercial eficaz",
    excerpt: "Nem todo o vídeo bonito é eficaz. Descobre o que separa um filme comercial bom de um que realmente gera resultados.",
    category: "Tendências",
    date: "1 Mar 2026",
    readTime: "6 min",
    thumbnail: "/images/services/estrategia.jpg",
    content: `Um filme comercial eficaz não é apenas bonito — é estratégico. A diferença entre um vídeo que impressiona e um que converte está nos detalhes.

Os primeiros 3 segundos decidem tudo. Se não captares atenção nos primeiros instantes, perdeste o espectador. O hook inicial é a decisão mais importante do filme.

Conta uma história, não vendas um produto. As pessoas não querem ver anúncios. Querem ser transportadas para uma narrativa que ressoa com os seus valores e aspirações.

O som é 50% do filme. A música, o sound design, e a mistura de áudio são tão importantes quanto a imagem. Um filme sem bom som é um filme incompleto.

Call-to-action claro. Depois de emocionar, diz ao espectador o que fazer. Sem ambiguidade. Sem rodeios.

Formato adequado ao canal. Um filme para cinema é diferente de um para Instagram. Adapta a duração, o formato e o ritmo ao sítio onde vai ser visto.`,
  },
];

export const BLOG_CATEGORIES = ["Todos", "Estratégia", "Produção", "Tendências", "Bastidores"];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
