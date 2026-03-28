import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SERVICES_EN = [
  { num: "01", name: "Commercial Films", tagline: "Ads nobody skips.", href: "/servicos/filmes-comerciais", image: "/images/services/filmes-comerciais.jpg" },
  { num: "02", name: "Corporate Videos", tagline: "Your brand story, told right.", href: "/servicos/videos-institucionais", image: "/images/services/institucionais.jpg" },
  { num: "03", name: "Documentaries", tagline: "Depth, not visibility.", href: "/servicos/documentarios", image: "/images/services/documentarios.jpg" },
  { num: "04", name: "Social Media Content", tagline: "Content that stops the scroll.", href: "/servicos/redes-sociais", image: "/images/services/redes-sociais.jpg" },
  { num: "05", name: "Photography", tagline: "Every frame is a decision.", href: "/servicos/fotografia", image: "/images/services/fotografia.jpg" },
  { num: "06", name: "Events", tagline: "One day. Months of content.", href: "/servicos/eventos", image: "/images/services/videos-eventos.jpg" },
  { num: "07", name: "Strategy", tagline: "Before we film, we think.", href: "/servicos/estrategia", image: "/images/services/estrategia.jpg" },
];

export const metadata: Metadata = {
  title: "Services | Audiovisual Production",
  description: "Commercial films, corporate videos, documentaries, photography, events and content strategy. Audiovisual production in Portugal.",
  openGraph: {
    locale: "en_GB",
    type: "website",
    title: "Services — Beyond Focus",
    description: "Commercial films, corporate videos, documentaries, photography, events and content strategy.",
    url: "https://beyondfocus.pt/en/services",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Beyond Focus Services" }],
  },
  alternates: { canonical: "https://beyondfocus.pt/en/services", languages: { "pt-PT": "https://beyondfocus.pt/servicos", en: "https://beyondfocus.pt/en/services" } },
};

export default function EnServicesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/en" }, { name: "Services", href: "/en/services" }]} />
      <Navbar variant="light" locale="en" />
      <main className="bg-bg-light">
        <section className="mx-auto max-w-[1440px] px-6 pt-[160px] pb-10 md:px-10 lg:px-[60px]">
          <span className="font-mono text-[11px] font-medium tracking-[3px] uppercase text-orange">Services</span>
          <h1 className="mt-3 max-w-2xl text-[clamp(36px,5vw,64px)] font-bold leading-[1.08] text-petrol">
            Everything you need, one partner.
          </h1>
          <p className="mt-4 max-w-xl text-base text-petrol/50">From strategy to delivery, we handle every stage of audiovisual production.</p>
        </section>
        <section className="mx-auto max-w-[1440px] px-6 pb-20 md:px-10 lg:px-[60px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {SERVICES_EN.map((s) => (
              <Link key={s.num} href={s.href} className="group flex gap-6 rounded-xl bg-white p-6 transition-all hover:shadow-lg">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image src={s.image} alt={s.name} fill className="object-cover" sizes="96px" />
                </div>
                <div>
                  <span className="font-mono text-xs text-petrol/30">{s.num}</span>
                  <h2 className="mt-1 text-lg font-bold text-petrol group-hover:text-orange transition-colors">{s.name}</h2>
                  <p className="mt-1 text-sm text-petrol/50">{s.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className="bg-white py-28 text-center">
          <h2 className="text-[clamp(28px,3vw,40px)] font-bold text-petrol">Ready to start?</h2>
          <Link href="/en/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-petrol px-8 py-4 text-base font-semibold text-white hover:bg-petrol/90 active:scale-[0.97]">
            Let&apos;s Talk <span>→</span>
          </Link>
        </section>
      </main>
      <Footer locale="en" />
    </>
  );
}
