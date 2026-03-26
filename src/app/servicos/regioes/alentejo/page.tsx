import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { AlentejoContent } from "./RegiaoContent";
import { faqItems } from "./alentejo-data";

export const metadata: Metadata = {
  title: "Produtora Audiovisual no Alentejo — Beyond Focus",
  description:
    "Produção de vídeo no Alentejo. Brand films, conteúdo para hotéis e vinícolas, fotografia de espaços e eventos.",
  keywords: [
    "produtora audiovisual alentejo",
    "producao video alentejo",
    "filmagem alentejo",
    "video enoturismo alentejo",
    "brand film alentejo",
    "filmagem hotel rural alentejo",
  ],
  openGraph: {
    title: "Produtora Audiovisual no Alentejo — Beyond Focus",
    description:
      "Produção de vídeo no Alentejo. Brand films, conteúdo para hotéis e vinícolas, fotografia de espaços e eventos.",
    url: "https://beyondfocus.pt/servicos/regioes/alentejo",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Produção Audiovisual Alentejo — Beyond Focus" }],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/servicos/regioes/alentejo",
  },
};

export default function AlentejoPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Início", href: "/" },
          { name: "Serviços", href: "/servicos" },
          { name: "Regiões", href: "/servicos" },
          { name: "Alentejo", href: "/servicos/regioes/alentejo" },
        ]}
      />
      <FAQSchema items={faqItems} />
      <Navbar variant="light" />
      <main>
        <AlentejoContent />
      </main>
      <Footer />
    </>
  );
}
