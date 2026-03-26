import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { getBlogPost, BLOG_POSTS } from "@/lib/blog-data";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BlogEmailCapture } from "@/components/features/blog/BlogEmailCapture";

const POST_FAQS: Record<string, { question: string; answer: string }[]> = {
  "quanto-custa-video-institucional-portugal": [
    { question: "Quanto custa um vídeo institucional em Portugal?", answer: "Um vídeo institucional em Portugal custa entre €1.500 e €15.000+, dependendo da complexidade, duração e nível de produção. A maioria das empresas médias investe entre €3.000 e €7.000 para um vídeo de 2 a 3 minutos com qualidade profissional." },
    { question: "O que influencia o preço de um vídeo institucional?", answer: "Os principais factores são: complexidade do guião e narrativa, número de dias de filmagem, dimensão da equipa, extensão da pós-produção (colour grading, motion graphics, sound design) e número de versões entregues para diferentes plataformas." },
    { question: "Qual é o prazo típico para produzir um vídeo institucional?", answer: "O prazo típico é de 3 a 6 semanas: 1-2 semanas de pré-produção (guião, localizações, casting), 1-2 dias de filmagem, e 2-4 semanas de pós-produção. Projectos mais complexos podem levar até 8 semanas." },
    { question: "Vale a pena investir num vídeo institucional?", answer: "Sim. Um vídeo institucional bem feito é um activo de comunicação com vida útil de 2 a 5 anos. Fica no website, nas redes sociais, em apresentações comerciais. O retorno é medível em tempo poupado em reuniões de apresentação e em credibilidade junto de clientes e investidores." },
  ],
  "como-escolher-produtora-audiovisual": [
    { question: "Como escolher a produtora audiovisual certa?", answer: "Avalia o portfolio com espírito crítico (não apenas os trabalhos mais vistosos), verifica se fazem perguntas sobre o teu negócio antes de apresentar soluções, pede referências de clientes anteriores e compara propostas com o mesmo nível de detalhe." },
    { question: "O que devo pedir numa proposta de produção audiovisual?", answer: "Pede: tratamento criativo detalhado, cronograma de produção, equipa envolvida, número de revisões incluídas, formatos de entrega e condições de pagamento. Propostas genéricas sem detalhe criativo são sinal de alerta." },
    { question: "Qual a diferença entre uma produtora cara e uma barata?", answer: "A diferença raramente está apenas na qualidade da imagem. Está na profundidade estratégica, no processo de aprovação, na qualidade da pós-produção (colour grading, sound design) e no compromisso com o resultado final — não apenas com a entrega técnica." },
  ],
};


/** Render inline markdown: **bold**, [link](url) */
function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-petrol font-semibold">$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-orange underline underline-offset-2 hover:text-orange/80">$1</a>');
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Artigo não encontrado" };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: `${post.metaTitle || post.title} — Beyond Focus`,
      description: post.metaDescription || post.excerpt,
      url: `https://beyondfocus.pt/blog/${slug}`,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: post.title }],
      type: "article",
    },
    alternates: {
      canonical: `https://beyondfocus.pt/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const sameCategory = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === post.category);
  const otherCategory = BLOG_POSTS.filter((p) => p.slug !== slug && p.category !== post.category);
  const otherPosts = [...sameCategory, ...otherCategory].slice(0, 2);

  const publishedDate = (() => {
    const months: Record<string, string> = { Jan: "Jan", Fev: "Feb", Mar: "Mar", Abr: "Apr", Mai: "May", Jun: "Jun", Jul: "Jul", Ago: "Aug", Set: "Sep", Out: "Oct", Nov: "Nov", Dez: "Dec" };
    const [d, m, y] = post.date.split(" ");
    return new Date(`${d} ${months[m] || m} ${y}`).toISOString();
  })();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    image: `https://beyondfocus.pt${post.thumbnail}`,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: { "@type": "Person", name: "Daniel Lopes", url: "https://beyondfocus.pt/sobre" },
    publisher: { "@type": "Organization", name: "Beyond Focus", url: "https://beyondfocus.pt", logo: { "@type": "ImageObject", url: "https://beyondfocus.pt/images/logo-symbol.png" } },
    mainEntityOfPage: `https://beyondfocus.pt/blog/${slug}`,
    inLanguage: "pt-PT",
  };

  const postFaqs = POST_FAQS[slug];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {postFaqs && <FAQSchema items={postFaqs} />}
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${slug}` },
        ]}
      />
      <Navbar variant="light" />
      <main className="bg-bg-light">
        {/* Hero */}
        <section className="mx-auto max-w-[900px] px-6 pt-[200px] text-center md:px-10">
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[2px] text-orange">{post.category}</span>
            <span className="text-[11px] text-petrol/25">·</span>
            <span className="text-[11px] text-petrol/30">{post.date}</span>
            <span className="text-[11px] text-petrol/25">·</span>
            <span className="text-[11px] text-petrol/30">{post.readTime} de leitura</span>
          </div>
          <h1 className="mt-4 text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.15] tracking-tight text-petrol">
            {post.title}
          </h1>
        </section>

        {/* Image */}
        <div className="mx-auto mt-10 max-w-[1200px] px-6 md:px-10">
          <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
            <Image src={post.thumbnail} alt={post.title} fill className="object-cover" sizes="100vw" priority />
          </div>
        </div>

        {/* Content */}
        <article className="prose-bf mx-auto max-w-[720px] px-6 py-16 md:px-10">
          {post.content.split("\n\n").map((block, i) => {
            // ## Heading
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="mb-4 mt-12 text-[clamp(22px,2.5vw,28px)] font-bold leading-tight text-petrol">
                  {block.replace("## ", "")}
                </h2>
              );
            }
            // Bullet list (lines starting with -)
            if (block.startsWith("- ")) {
              return (
                <ul key={i} className="mb-5 space-y-2 pl-5">
                  {block.split("\n").filter(l => l.startsWith("- ")).map((li, j) => (
                    <li key={j} className="text-[17px] leading-[1.8] text-petrol/70 list-disc" dangerouslySetInnerHTML={{ __html: renderInline(li.replace("- ", "")) }} />
                  ))}
                </ul>
              );
            }
            // Regular paragraph
            return (
              <p key={i} className="mb-5 text-[18px] leading-[1.8] text-petrol/70" dangerouslySetInnerHTML={{ __html: renderInline(block) }} />
            );
          })}
        </article>

        {/* Email capture */}
        <div className="mx-auto max-w-[720px] px-6 md:px-10">
          <BlogEmailCapture
            variant="banner"
            source={`blog-${slug}`}
            magnet="guia-precos-video"
          />
        </div>

        {/* Related posts */}
        {otherPosts.length > 0 && (
          <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10">
            <h2 className="mb-8 text-xl font-bold text-petrol">Artigos relacionados</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {otherPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-xl" data-cursor="hover-link">
                  <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
                    <Image src={p.thumbnail} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="50vw" />
                  </div>
                  <div className="mt-3">
                    <span className="font-mono text-[10px] uppercase tracking-[2px] text-orange">{p.category}</span>
                    <h3 className="mt-1 text-base font-semibold text-petrol group-hover:text-orange transition-colors">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mx-auto max-w-[720px] px-6 pb-24 md:px-10">
          <div className="mt-8 rounded-2xl bg-[#0E3A45] p-8 text-center text-white">
            <h3 className="mb-4 font-serif text-2xl">Tens um projecto em mente?</h3>
            <p className="mb-6 text-white/80">A primeira conversa é por nossa conta. Sem compromisso.</p>
            <Link
              href="/contacto"
              className="inline-block rounded-full bg-[#FA8334] px-8 py-3 font-medium text-white transition-colors hover:bg-[#e5732e]"
            >
              Falar com a Beyond Focus
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
