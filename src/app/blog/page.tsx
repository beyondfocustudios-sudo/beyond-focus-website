import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BLOG_POSTS } from "@/lib/blog-data";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { BlogCategoryFilter } from "@/components/features/blog/BlogCategoryFilter";

export const metadata: Metadata = {
  title: "Blog de Vídeo Marketing e Produção Audiovisual | Beyond Focus",
  description: "Artigos sobre vídeo marketing, produção audiovisual e estratégia de conteúdo para empresas em Portugal.",
  openGraph: {
    locale: "pt_PT",
    type: "website",
    title: "Blog — Beyond Focus",
    description: "Artigos sobre vídeo marketing, produção audiovisual e estratégia de conteúdo para empresas em Portugal.",
    url: "https://beyondfocus.pt/blog",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Beyond Focus Blog" }],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/blog",
    types: {
      "application/rss+xml": "https://beyondfocus.pt/feed.xml",
    },
  },
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />
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

        {/* Grid with category filter */}
        <section className="mx-auto max-w-[1440px] px-6 pb-20 md:px-10 lg:px-[60px]">
          <BlogCategoryFilter posts={BLOG_POSTS} />
        </section>
      </main>
      <Footer />
    </>
  );
}
