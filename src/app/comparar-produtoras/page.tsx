import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Como Comparar Produtoras Audiovisuais em Portugal — 7 Critérios Objectivos",
  description:
    "Antes de escolher uma produtora audiovisual, usa estes 7 critérios objectivos. Portfolio, processo, portal do cliente, formatos, pós-produção, comunicação e valor real.",
  keywords: [
    "melhor produtora audiovisual portugal",
    "como escolher produtora video",
    "produtora video lisboa comparação",
    "comparar produtoras audiovisuais",
    "escolher produtora audiovisual",
    "critérios produtora video portugal",
    "produtora audiovisual lisboa recomendação",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Como Comparar Produtoras Audiovisuais em Portugal — 7 Critérios Objectivos",
    description:
      "7 critérios objectivos para avaliar qualquer produtora audiovisual. Portfolio, processo, portal do cliente, pós-produção e mais.",
    url: "https://beyondfocus.pt/comparar-produtoras",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Comparar Produtoras Audiovisuais Portugal" }],
    type: "article",
    locale: "pt_PT",
  },
  alternates: { canonical: "https://beyondfocus.pt/comparar-produtoras" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Como escolher uma produtora audiovisual em Portugal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Avalia 7 critérios: portfolio com resultados documentados, processo transparente desde o briefing, portal do cliente para acompanhamento, múltiplos formatos incluídos, pós-produção profissional (colour grading e sound design), comunicação sem falhas e valor real vs preço base. Uma produtora de referência mostra provas concretas em cada ponto.",
      },
    },
    {
      "@type": "Question",
      name: "O que é um portal do cliente numa produtora de vídeo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Um portal do cliente é uma plataforma onde podes acompanhar o estado do projecto em tempo real, rever versões, deixar feedback e descarregar os ficheiros finais. É um indicador de maturidade operacional — poucas produtoras em Portugal oferecem esta funcionalidade.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto custa uma produtora audiovisual de qualidade em Portugal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O investimento varia consoante a complexidade do projecto, duração, localizações e formatos incluídos. Produtoras sérias apresentam orçamentos detalhados sem custos escondidos. Usa o nosso simulador de orçamento para ter uma estimativa personalizada em menos de 2 minutos.",
      },
    },
    {
      "@type": "Question",
      name: "Qual a diferença entre vídeo institucional e brand film?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Um vídeo institucional apresenta a empresa de forma directa — quem somos, o que fazemos. Um brand film conta uma história com carga emocional, construindo identidade de marca. Ambos têm propósitos distintos e devem estar no plano de conteúdo da empresa. A Beyond Focus produz os dois formatos.",
      },
    },
  ],
};

const CRITERIA = [
  {
    number: "01",
    title: "Portfolio e resultados documentados",
    subtitle: "Vídeos bonitos não chegam",
    body: "Uma produtora séria não mostra apenas peças visualmente cuidadas — documenta o que aconteceu depois. Taxas de engagement, reservas geradas, cobertura mediática, feedback do cliente. Pede estudos de caso concretos, não só uma reel.",
    redFlag: "Portfolio sem contexto, sem cliente identificado, sem resultados. Vídeos genéricos que podiam ser de qualquer empresa.",
    beyondFocus: "Os nossos case studies documentam o projecto do início ao fim — briefing, processo, entrega e resultado. Ver portfolio.",
    link: "/portfolio",
    linkLabel: "Ver os nossos case studies",
    blogLink: "/blog/como-escolher-produtora-audiovisual",
    blogLabel: "Artigo: Como escolher uma produtora audiovisual",
  },
  {
    number: "02",
    title: "Processo transparente",
    subtitle: "Do briefing à entrega, sem surpresas",
    body: "Qualquer produtora competente tem um processo definido: briefing criativo → pré-produção → gravação → pós-produção → entrega. O que distingue as melhores é a transparência em cada fase — sabes exactamente o que acontece, quando acontece e quem é responsável.",
    redFlag: "Orçamentos vagos. Prazos sem detalhe. Revisões cobradas sem aviso. Comunicação que pára após assinatura de contrato.",
    beyondFocus: "Processo estruturado em 4 fases com entregas claras. Cada projecto tem timeline detalhado e ponto de contacto directo.",
    link: "/servicos",
    linkLabel: "Ver como trabalhamos",
    blogLink: "/blog/como-preparar-empresa-filmagem",
    blogLabel: "Artigo: Como preparar a tua empresa para uma filmagem",
  },
  {
    number: "03",
    title: "Portal do cliente",
    subtitle: "Acompanhamento em tempo real",
    body: "Este critério separa imediatamente as produtoras operacionalmente maduras das restantes. Um portal do cliente permite acompanhar o estado do projecto, rever versões, deixar feedback centralizado e descarregar ficheiros finais — tudo num só lugar, sem cadeias de email.",
    redFlag: "Actualizações por WhatsApp. Ficheiros enviados por WeTransfer sem histórico. Sem plataforma para gerir feedback de equipa.",
    beyondFocus: "A Beyond Focus disponibiliza portal dedicado a cada cliente. Acesso à timeline, revisões e entrega de ficheiros num ambiente organizado.",
    link: "/portal-cliente",
    linkLabel: "Conhecer o portal do cliente",
  },
  {
    number: "04",
    title: "Múltiplos formatos incluídos",
    subtitle: "Um projecto, vários destinos",
    body: "Uma produção bem pensada gera conteúdo para vários canais: formato 16:9 para website e YouTube, 9:16 para stories e Reels, 1:1 para feed. Produtoras que cobram cada formato separadamente estão a facturar o que devia estar incluído no planeamento base.",
    redFlag: "Orçamento inicial baixo, depois adicionais para cada formato, cada corte, cada rede social. O projecto final custa o dobro do previsto.",
    beyondFocus: "Os pacotes Beyond Focus incluem múltiplos formatos de saída. Um briefing, produção única, distribuição para todos os canais.",
    link: "/simulador-orcamento",
    linkLabel: "Simular orçamento com formatos incluídos",
    blogLink: "/blog/formatos-video-redes-sociais-2026",
    blogLabel: "Artigo: Formatos de vídeo para redes sociais em 2026",
  },
  {
    number: "05",
    title: "Pós-produção profissional",
    subtitle: "Colour grading e sound design fazem a diferença",
    body: "O que separa um vídeo funcional de uma peça que representa bem a tua marca é a pós-produção. Colour grading consistente com a identidade visual, sound design cuidado, música licenciada. Estes elementos não são opcionais — são o que faz o vídeo parecer profissional.",
    redFlag: "Edição básica sem color grading. Música de stock sem licença. Som ambiente sem tratamento. Grafismos genéricos que não alinham com a marca.",
    beyondFocus: "Todos os projectos Beyond Focus incluem colour grading em DaVinci Resolve, sound design e música licenciada. Sem extra.",
    link: "/servicos",
    linkLabel: "Ver o que está incluído",
    blogLink: "/blog/colour-grading-video-profissional",
    blogLabel: "Artigo: O que é colour grading e porque importa",
  },
  {
    number: "06",
    title: "Comunicação e prazos",
    subtitle: "Sem ghosting, sem atrasos silenciosos",
    body: "A comunicação durante o projecto é tão importante quanto o produto final. Respostas atempadas, prazos cumpridos ou comunicados com antecedência, e um interlocutor definido são básicos que muitas produtoras falham. Pergunta: qual o tempo médio de resposta? Quem é o teu ponto de contacto?",
    redFlag: "Demora dias a responder a emails. Prazos ultrapassados sem aviso. Revisions que ficam em aberto. O cliente a fazer follow-up constantemente.",
    beyondFocus: "Resposta em 24h úteis garantida. Cada projecto tem gestor de conta dedicado. Prazos no contrato, cumpridos.",
    link: "/contacto",
    linkLabel: "Falar com a equipa",
  },
  {
    number: "07",
    title: "Preço vs valor real",
    subtitle: "Investimento, não custo",
    body: "O preço mais baixo raramente é o melhor investimento. Uma produção que não representa bem a tua marca, que precisa de ser refeita, ou que não gera resultados, custa mais do que uma produção bem feita desde o início. Avalia o custo total do projecto — incluindo o teu tempo de gestão e possíveis revisões.",
    redFlag: "Orçamentos sem detalhe de itens. Custos adicionais que surgem a meio. Produção rápida demais para a complexidade prometida.",
    beyondFocus: "Orçamentos detalhados linha a linha. Simulador online para ter estimativa imediata. Sem surpresas no final.",
    link: "/simulador-orcamento",
    linkLabel: "Usar o simulador de orçamento",
    blogLink: "/blog/quanto-custa-video-institucional-portugal",
    blogLabel: "Artigo: Quanto custa um vídeo institucional em Portugal",
  },
];

export default function ComparacaoProdutorasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", href: "/" },
          { name: "Comparar Produtoras", href: "/comparar-produtoras" },
        ]}
      />
      <Navbar variant="light" />

      <main>
        {/* Hero */}
        <section className="bg-petrol-deep pt-[200px] pb-20">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
            <p className="font-mono text-xs font-semibold tracking-[3px] uppercase text-orange">
              Guia objectivo
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl leading-tight text-white md:text-5xl lg:text-[56px]">
              Como comparar produtoras audiovisuais em Portugal — 7 critérios objectivos
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Antes de assinar qualquer contrato, usa esta lista para avaliar qualquer produtora de vídeo. Os critérios são concretos, verificáveis e baseados no que realmente importa para o resultado final.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/simulador-orcamento"
                className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Simular orçamento
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50"
              >
                Falar com a equipa
              </Link>
            </div>
          </div>
        </section>

        {/* Intro context */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
            <div className="max-w-3xl">
              <p className="text-lg leading-relaxed text-petrol/70">
                Em Portugal existem dezenas de produtoras audiovisuais — de freelancers a equipas consolidadas. A diferença de qualidade e de abordagem é enorme, e o preço por si só não é um indicador fiável. Esta página não nomeia concorrentes. Em vez disso, dá-te as ferramentas para avaliares qualquer produtora com critérios objectivos.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-petrol/70">
                Usa estes 7 critérios como checklist antes de qualquer reunião ou proposta.
              </p>
            </div>
          </div>
        </section>

        {/* Criteria */}
        <section className="bg-bg-light py-20">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
            <div className="space-y-16">
              {CRITERIA.map((criterion) => (
                <article
                  key={criterion.number}
                  className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-16"
                  id={`criterio-${criterion.number}`}
                >
                  {/* Number */}
                  <div className="flex items-start">
                    <span className="font-mono text-[56px] font-bold leading-none text-petrol/10 lg:text-[80px]">
                      {criterion.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <p className="font-mono text-xs font-semibold tracking-[3px] uppercase text-orange">
                      {criterion.subtitle}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-petrol md:text-3xl">
                      {criterion.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-petrol/70">
                      {criterion.body}
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {/* Red flag */}
                      <div className="rounded-xl border border-red-100 bg-red-50 p-5">
                        <p className="mb-2 font-mono text-xs font-semibold tracking-[2px] uppercase text-red-500">
                          Sinal de alerta
                        </p>
                        <p className="text-sm leading-relaxed text-red-800/80">
                          {criterion.redFlag}
                        </p>
                      </div>

                      {/* Beyond Focus */}
                      <div className="rounded-xl border border-[#0E3A45]/10 bg-[#0E3A45]/5 p-5">
                        <p className="mb-2 font-mono text-xs font-semibold tracking-[2px] uppercase text-[#0E3A45]">
                          Beyond Focus
                        </p>
                        <p className="text-sm leading-relaxed text-petrol/70">
                          {criterion.beyondFocus}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href={criterion.link}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-orange hover:underline"
                      >
                        {criterion.linkLabel} →
                      </Link>
                      {criterion.blogLink && (
                        <Link
                          href={criterion.blogLink}
                          className="inline-flex items-center gap-1.5 text-sm text-petrol/50 hover:text-petrol hover:underline"
                        >
                          {criterion.blogLabel}
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Summary checklist */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
            <div className="max-w-3xl">
              <p className="font-mono text-xs font-semibold tracking-[3px] uppercase text-orange">
                Checklist rápida
              </p>
              <h2 className="mt-3 text-3xl text-petrol md:text-4xl">
                7 perguntas a fazer antes de contratar
              </h2>
              <ol className="mt-8 space-y-4">
                {[
                  "Tens case studies com resultados documentados, não só vídeos no portfolio?",
                  "Qual o processo completo, do briefing à entrega?",
                  "Existe portal do cliente para acompanhar o projecto?",
                  "Os formatos para diferentes canais estão incluídos no orçamento?",
                  "A pós-produção inclui colour grading e sound design profissional?",
                  "Qual o tempo de resposta e quem é o meu ponto de contacto?",
                  "O orçamento é detalhado, sem custos adicionais ocultos?",
                ].map((q, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-petrol text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-base leading-relaxed text-petrol/80">{q}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-bg-light py-20">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl text-petrol md:text-4xl">Perguntas frequentes</h2>
              <div className="mt-10 space-y-8">
                {[
                  {
                    q: "Como escolher uma produtora audiovisual em Portugal?",
                    a: "Avalia 7 critérios: portfolio com resultados documentados, processo transparente desde o briefing, portal do cliente para acompanhamento, múltiplos formatos incluídos, pós-produção profissional, comunicação sem falhas e valor real vs preço base. Uma produtora de referência mostra provas concretas em cada ponto.",
                  },
                  {
                    q: "O que é um portal do cliente numa produtora de vídeo?",
                    a: "Um portal do cliente é uma plataforma onde podes acompanhar o estado do projecto em tempo real, rever versões, deixar feedback e descarregar os ficheiros finais. É um indicador de maturidade operacional — poucas produtoras em Portugal oferecem esta funcionalidade.",
                  },
                  {
                    q: "Quanto custa uma produtora audiovisual de qualidade em Portugal?",
                    a: "O investimento varia consoante a complexidade do projecto, duração, localizações e formatos incluídos. Produtoras sérias apresentam orçamentos detalhados sem custos escondidos. Usa o nosso simulador de orçamento para ter uma estimativa personalizada em menos de 2 minutos.",
                  },
                  {
                    q: "Qual a diferença entre vídeo institucional e brand film?",
                    a: "Um vídeo institucional apresenta a empresa de forma directa — quem somos, o que fazemos. Um brand film conta uma história com carga emocional, construindo identidade de marca. Ambos têm propósitos distintos e devem estar no plano de conteúdo da empresa.",
                  },
                ].map((faq) => (
                  <div key={faq.q} className="border-b border-petrol/10 pb-8">
                    <h3 className="text-lg font-medium text-petrol">{faq.q}</h3>
                    <p className="mt-3 text-base leading-relaxed text-petrol/70">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-petrol-deep py-24">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold tracking-[3px] uppercase text-orange">
                Próximo passo
              </p>
              <h2 className="mt-4 text-3xl leading-tight text-white md:text-4xl">
                Quer comparar por si mesmo?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/70">
                Usa o simulador de orçamento para ter uma estimativa detalhada do teu projecto. Ou fala directamente com a equipa — sem compromisso, sem pressão.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/simulador-orcamento"
                  className="inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Simular orçamento
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white transition-colors hover:border-white/50"
                >
                  Falar com a equipa
                </Link>
              </div>
              <p className="mt-6 text-sm text-white/40">
                Também podes ler o nosso{" "}
                <Link href="/blog/como-escolher-produtora-audiovisual" className="underline hover:text-white/70">
                  guia completo sobre como escolher uma produtora audiovisual
                </Link>
                {" "}ou ver os{" "}
                <Link href="/portfolio" className="underline hover:text-white/70">
                  nossos projectos
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
