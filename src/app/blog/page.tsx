import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BLOG_POSTS } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Ideias, bastidores e reflexões sobre comunicação audiovisual e estratégia de conteúdo.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar variant="light" />
      <main className="min-h-screen bg-bg-light">
        {/* Hero */}
        <section className="mx-auto max-w-[1440px] px-6 pt-[200px] pb-10 md:px-10 lg:px-[60px]">
          <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">Blog</p>
          <h1 className="mt-3 max-w-2xl text-[clamp(36px,4vw,56px)] font-bold leading-[1.1] tracking-tight text-petrol">
            Ideias, bastidores e reflexões.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-petrol/50">
            Sobre comunicação audiovisual e estratégia de conteúdo.
          </p>
        </section>

        {/* Grid */}
        <section className="mx-auto max-w-[1440px] px-6 pb-20 md:px-10 lg:px-[60px]">
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto md:grid md:grid-cols-2 md:gap-8 md:overflow-visible lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                data-cursor="hover-link"
                className="group block w-[85vw] flex-shrink-0 snap-center md:w-auto md:flex-shrink md:snap-align-none"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[2px] text-orange">{post.category}</span>
                    <span className="text-[11px] text-petrol/25">{post.date}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-petrol transition-colors group-hover:text-orange">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-petrol/50">{post.excerpt}</p>
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
