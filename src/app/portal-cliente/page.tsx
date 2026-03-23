import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PortalHero } from "@/components/features/portal-page/PortalHero";
import { PortalFeatures } from "@/components/features/portal-page/PortalFeatures";
import { PortalHowItWorks } from "@/components/features/portal-page/PortalHowItWorks";
import { PortalComparison } from "@/components/features/portal-page/PortalComparison";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Portal do Cliente | Acompanhamento de Projectos",
  description:
    "Uma plataforma exclusiva onde acompanhas cada fase do projecto, aprovas entregas com timecode, comunicas com a equipa e acedes a todos os documentos.",
  openGraph: {
    title: "Portal do Cliente — Beyond Focus",
    description: "Plataforma exclusiva para acompanhar o teu projecto audiovisual em tempo real.",
    url: "https://beyondfocus.pt/portal-cliente",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Beyond Focus Portal do Cliente" }],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/portal-cliente",
  },
};

export default function PortalClientePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Portal do Cliente", href: "/portal-cliente" },
        ]}
      />
      <Navbar variant="light" />
      <main className="bg-bg-light">
        <PortalHero />

        {/* Statement */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-[900px] px-6 text-center md:px-10">
            <h2 className="text-[clamp(24px,3vw,36px)] leading-tight text-petrol">
              Nenhuma outra produtora em Portugal te oferece isto.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-petrol/50">
              O Beyond Focus Portal é o teu espaço dedicado. Sem emails perdidos, sem ficheiros espalhados, sem incertezas.
            </p>
          </div>
        </section>

        <PortalFeatures />
        <PortalHowItWorks />
        <PortalComparison />

        {/* CTA Final */}
        <section className="bg-petrol-deep py-28 text-center lg:py-36">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="text-[clamp(28px,3.5vw,44px)] leading-tight text-white">
              Pronto para experimentar uma forma diferente de trabalhar?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-white/50">
              O portal é incluído em todos os projectos da Beyond Focus. Sem custos extra.
            </p>
            <Link
              href="/contacto"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-petrol transition-all duration-200 hover:bg-white/90 hover:scale-[1.03]"
            >
              Começa um projecto <span>→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
