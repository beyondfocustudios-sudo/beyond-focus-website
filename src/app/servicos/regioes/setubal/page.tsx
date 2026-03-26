import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { SetúbalContent } from "./RegiaoContent";
import { faqItems } from "./setubal-data";

export const metadata: Metadata = {
  title: "Produtora Audiovisual em Setúbal — Beyond Focus",
  description:
    "Produtora de vídeo em Setúbal. Filmes comerciais, vídeos institucionais e fotografia para empresas na região de Setúbal e Costa Azul.",
  keywords: [
    "produtora audiovisual setubal",
    "produtora video setubal",
    "filmagem setubal",
    "video institucional setubal",
    "producao audiovisual costa azul",
    "filmagem arrabida",
  ],
  openGraph: {
    title: "Produtora Audiovisual em Setúbal — Beyond Focus",
    description:
      "Produtora de vídeo em Setúbal. Filmes comerciais, vídeos institucionais e fotografia para empresas na região de Setúbal e Costa Azul.",
    url: "https://beyondfocus.pt/servicos/regioes/setubal",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Produção Audiovisual Setúbal — Beyond Focus" }],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/servicos/regioes/setubal",
  },
};

export default function SetúbalPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", href: "/" },
          { name: "Serviços", href: "/servicos" },
          { name: "Regiões", href: "/servicos" },
          { name: "Setúbal", href: "/servicos/regioes/setubal" },
        ]}
      />
      <FAQSchema items={faqItems} />
      <Navbar variant="light" />
      <main>
        <SetúbalContent />
      </main>
      <Footer />
    </>
  );
}
