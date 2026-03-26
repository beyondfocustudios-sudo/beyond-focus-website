import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BrandFilmContent } from "./BrandFilmContent";
import { faqItems } from "./brand-film-data";

export const metadata: Metadata = {
  title: "Brand Film | Filme de Marca para Empresas — Beyond Focus",
  description:
    "Um brand film conta a história da tua marca em 60 a 90 segundos. Produção audiovisual em Lisboa para empresas que querem comunicar com impacto.",
  keywords: [
    "brand film lisboa",
    "filme de marca portugal",
    "brand film portugal",
    "produção brand film lisboa",
    "filme institucional marca",
  ],
  openGraph: {
    title: "Brand Film | Filme de Marca para Empresas — Beyond Focus",
    description:
      "Um brand film conta a história da tua marca em 60 a 90 segundos. Produção audiovisual em Lisboa para empresas que querem comunicar com impacto.",
    url: "https://beyondfocus.pt/servicos/brand-film",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Brand Film — Beyond Focus" }],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/servicos/brand-film",
  },
};

export default function BrandFilmPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", href: "/" },
          { name: "Serviços", href: "/servicos" },
          { name: "Brand Film", href: "/servicos/brand-film" },
        ]}
      />
      <FAQSchema items={faqItems} />
      <Navbar variant="light" />
      <main>
        <BrandFilmContent />
      </main>
      <Footer />
    </>
  );
}
