import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { getBlogPost, BLOG_POSTS } from "@/lib/blog-data";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { BlogEmailCapture } from "@/components/features/blog/BlogEmailCapture";

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

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
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
            <Image src={post.thumbnail} alt={post.title} fill className="object-cover" sizes="100vw" />
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

        {/* CTA + Service link */}
        <section className="bg-white py-16 text-center">
          <p className="text-base text-petrol/50">Gostaste deste artigo?</p>
          <Link
            href="/contacto"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-petrol px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-petrol/90 active:scale-[0.97]"
          >
            Fala connosco <span>→</span>
          </Link>
          <p className="mt-6 text-sm text-petrol/40">
            Descobre os nossos{" "}
            <Link href="/servicos" className="text-orange underline underline-offset-2 hover:text-orange/80">
              serviços de produção audiovisual
            </Link>
          </p>
        </section>

        {/* Related posts */}
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
      </main>
      <Footer />
    </>
  );
}
