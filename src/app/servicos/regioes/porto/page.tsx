import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { PortoContent } from "./RegiaoContent";
import { faqItems } from "./porto-data";

export const metadata: Metadata = {
  title: "Produtora Audiovisual no Porto — Beyond Focus",
  description:
    "Produtora de vídeo no Porto e Norte de Portugal. Filmes comerciais, brand films e vídeos institucionais para hotéis, restaurantes e marcas com ambição.",
  keywords: [
    "produtora audiovisual porto",
    "produtora video porto",
    "filmagem porto",
    "video institucional porto",
    "producao audiovisual norte portugal",
    "filmagem douro",
    "brand film porto",
  ],
  openGraph: {
    title: "Produtora Audiovisual no Porto — Beyond Focus",
    description:
      "Produtora de vídeo no Porto e Norte de Portugal. Filmes comerciais, brand films e vídeos institucionais para hotéis, restaurantes e marcas com ambição.",
    url: "https://beyondfocus.pt/servicos/regioes/porto",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Produção Audiovisual Porto — Beyond Focus" }],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/servicos/regioes/porto",
  },
};

export default function PortoPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", href: "/" },
          { name: "Serviços", href: "/servicos" },
          { name: "Regiões", href: "/servicos" },
          { name: "Porto", href: "/servicos/regioes/porto" },
        ]}
      />
      <FAQSchema items={faqItems} />
      <Navbar variant="light" />
      <main>
        <PortoContent />
      </main>
      <Footer />
    </>
  );
}
