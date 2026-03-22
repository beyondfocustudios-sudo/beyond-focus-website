import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { getBlogPost, BLOG_POSTS } from "@/lib/blog-data";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
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

  return (
    <>
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
        <article className="mx-auto max-w-[720px] px-6 py-16 md:px-10">
          {post.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mb-5 text-[18px] leading-[1.8] text-petrol/70">
              {paragraph}
            </p>
          ))}
        </article>

        {/* CTA */}
        <section className="bg-white py-16 text-center">
          <p className="text-base text-petrol/50">Gostaste deste artigo?</p>
          <Link
            href="/contacto"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-petrol px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-petrol/90"
          >
            Fala connosco <span>→</span>
          </Link>
        </section>

        {/* Related posts */}
        <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10">
          <h3 className="mb-8 text-xl font-bold text-petrol">Artigos relacionados</h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {otherPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block" data-cursor="hover-link">
                <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
                  <Image src={p.thumbnail} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="50vw" />
                </div>
                <div className="mt-3">
                  <span className="font-mono text-[10px] uppercase tracking-[2px] text-orange">{p.category}</span>
                  <h4 className="mt-1 text-base font-semibold text-petrol group-hover:text-orange transition-colors">{p.title}</h4>
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
