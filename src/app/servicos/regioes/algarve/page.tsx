import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { AlgarveContent } from "./RegiaoContent";
import { faqItems } from "./algarve-data";

export const metadata: Metadata = {
  title: "Produtora Audiovisual no Algarve — Beyond Focus",
  description:
    "Produção de vídeo no Algarve. Conteúdo para resorts, hotéis e marcas de turismo na região mais visitada de Portugal.",
  keywords: [
    "produtora audiovisual algarve",
    "producao video algarve",
    "filmagem algarve",
    "video hotel algarve",
    "brand film algarve",
    "producao audiovisual faro",
  ],
  openGraph: {
    title: "Produtora Audiovisual no Algarve — Beyond Focus",
    description:
      "Produção de vídeo no Algarve. Conteúdo para resorts, hotéis e marcas de turismo na região mais visitada de Portugal.",
    url: "https://beyondfocus.pt/servicos/regioes/algarve",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Produção Audiovisual Algarve — Beyond Focus" }],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/servicos/regioes/algarve",
  },
};

export default function AlgarvePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", href: "/" },
          { name: "Serviços", href: "/servicos" },
          { name: "Regiões", href: "/servicos" },
          { name: "Algarve", href: "/servicos/regioes/algarve" },
        ]}
      />
      <FAQSchema items={faqItems} />
      <Navbar variant="light" />
      <main>
        <AlgarveContent />
      </main>
      <Footer />
    </>
  );
}
