import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ServicesHero } from "@/components/features/services/ServicesHero";
import { ServiceBlock } from "@/components/features/services/ServiceBlock";
import { ServicesProcess } from "@/components/features/services/ServicesProcess";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Serviços | Produtora Audiovisual",
  description:
    "Filmes comerciais, vídeos institucionais, documentários, fotografia, eventos e estratégia de conteúdo. Produção audiovisual em Portugal.",
  openGraph: {
    title: "Serviços — Beyond Focus",
    description: "Filmes comerciais, vídeos institucionais, documentários, fotografia, eventos e estratégia de conteúdo.",
    url: "https://beyondfocus.pt/servicos",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Beyond Focus Serviços" }],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/servicos",
    languages: { "pt-PT": "https://beyondfocus.pt/servicos", en: "https://beyondfocus.pt/en/services" },
  },
};

const SERVICES = [
  { num: "01", title: "Filmes Comerciais", tagline: "Spots que ninguém salta.", description: "Criamos filmes publicitários que captam atenção e geram resultados. Do conceito à entrega — cada frame é pensado para converter.", image: "/images/services/filmes-comerciais.jpg" },
  { num: "02", title: "Vídeos Institucionais", tagline: "A história da tua marca, contada a sério.", description: "Contamos a história da tua empresa com rigor cinematográfico. Ideal para apresentar a marca, a cultura e os valores a clientes e investidores.", image: "/images/services/institucionais.jpg" },
  { num: "03", title: "Documentários", tagline: "Profundidade, não visibilidade.", description: "Histórias reais contadas com profundidade e sensibilidade. Documentários que informam, emocionam e deixam marca.", image: "/images/services/documentarios.jpg" },
  { num: "04", title: "Conteúdos de Redes Sociais", tagline: "Conteúdo que pára o scroll.", description: "Produzimos conteúdo nativo para Instagram, TikTok e LinkedIn que se destaca no feed. Estratégia, gravação e edição incluídas.", image: "/images/services/redes-sociais.jpg" },
  { num: "05", title: "Fotografia", tagline: "Cada frame é uma decisão.", description: "Fotografia editorial, corporativa e de produto com direcção criativa. Cada imagem é pensada para comunicar.", image: "/images/services/fotografia.jpg" },
  { num: "06", title: "Eventos", tagline: "Um dia. Meses de conteúdo.", description: "Cobertura completa de eventos corporativos, lançamentos e conferências. Vídeo, foto e conteúdo para redes — tudo num pacote.", image: "/images/services/videos-eventos.jpg" },
  { num: "07", title: "Estratégia", tagline: "Antes de gravar, pensamos.", description: "Definimos a direcção criativa, o tom e a narrativa antes de ligar a câmara. Estratégia de conteúdo alinhada com os objectivos do teu negócio.", image: "/images/services/estrategia.jpg" },
];

export default function ServicosPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Serviços", href: "/servicos" },
        ]}
      />
      <Navbar variant="light" />
      <main className="bg-bg-light">
        <ServicesHero />
        <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 lg:px-[60px]">
          {SERVICES.map((service, i) => (
            <ServiceBlock key={service.num} service={service} reversed={i % 2 === 1} />
          ))}
        </section>
        <ServicesProcess />
        <section className="bg-white py-28 text-center">
          <h2 className="text-[clamp(28px,3vw,40px)] font-bold text-petrol">Vamos trabalhar juntos?</h2>
          <p className="mx-auto mt-3 max-w-md text-base text-petrol/50">Conta-nos o teu projecto. A primeira conversa é por nossa conta.</p>
          <Link href="/contacto" className="mt-8 inline-flex items-center gap-2 rounded-full bg-petrol px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-petrol/90 hover:scale-[1.03] active:scale-[0.97]">
            Fala Connosco <span>→</span>
          </Link>
          <p className="mt-6 text-sm text-petrol/40">
            Vê exemplos do nosso trabalho no{" "}
            <Link href="/portfolio" className="text-orange underline underline-offset-2 hover:text-orange/80">
              portfolio
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
