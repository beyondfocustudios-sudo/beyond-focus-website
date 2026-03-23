import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { Portal } from "@/components/sections/Portal";
import { Testimonials } from "@/components/sections/Testimonials";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { FAQ_ITEMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Beyond Focus — Produtora Audiovisual em Lisboa | Vídeo, Fotografia e Estratégia",
  description:
    "Produtora audiovisual em Lisboa, Portugal. Filmes comerciais, vídeos institucionais, documentários, fotografia e estratégia criativa para marcas em todo o país.",
  openGraph: {
    title: "Beyond Focus — Produtora Audiovisual em Lisboa",
    description:
      "Filmes comerciais, vídeos institucionais, documentários, fotografia e estratégia criativa. Produtora audiovisual para marcas em Lisboa e todo o Portugal.",
    url: "https://beyondfocus.pt",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Beyond Focus — Produtora Audiovisual" }],
  },
  alternates: {
    canonical: "https://beyondfocus.pt",
    languages: { "pt-PT": "https://beyondfocus.pt", en: "https://beyondfocus.pt/en" },
  },
};

export default function Home() {
  return (
    <>
      <FAQSchema items={[...FAQ_ITEMS]} />
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <Portfolio />
        <Services />
        <Portal />
        <Testimonials />
        <Process />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
