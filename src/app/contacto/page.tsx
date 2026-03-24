import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ContactForm } from "@/components/features/contact/ContactForm";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Contacto | Fala Connosco",
  description: "Tens um projecto em mente? Fala connosco — respondemos em 24 horas. Produção audiovisual, fotografia e estratégia de conteúdo para marcas em Lisboa e todo o Portugal.",
  openGraph: {
    locale: "pt_PT",
    type: "website",
    title: "Contacto — Beyond Focus",
    description: "Tens um projecto em mente? Fala connosco — respondemos em 24 horas. Produção audiovisual em Lisboa e todo o Portugal.",
    url: "https://beyondfocus.pt/contacto",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Beyond Focus — Contacto" }],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/contacto",
    languages: { "pt-PT": "https://beyondfocus.pt/contacto", en: "https://beyondfocus.pt/en/contact" },
  },
};

export default function ContactoPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Contacto", href: "/contacto" },
        ]}
      />
      <Navbar variant="light" />
      <main className="bg-bg-light">
        <section className="mx-auto max-w-[1440px] px-6 pt-[200px] pb-20 md:px-10 lg:px-[60px]">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            {/* Left — Info */}
            <div>
              <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
                Contacto
              </p>
              <h1 className="mt-3 text-[clamp(36px,4vw,56px)] font-bold leading-[1.1] tracking-tight text-petrol">
                Fala connosco.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-petrol/50">
                Tens um projecto em mente? Uma ideia por concretizar? Ou só queres saber mais sobre o que fazemos? Estamos a uma mensagem de distância.
              </p>

              {/* Contact details */}
              <div className="mt-12 space-y-6">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[2px] text-petrol/30">Email</p>
                  <a href="mailto:geral@beyondfocus.pt" className="mt-1 block text-base font-medium text-petrol transition-colors hover:text-orange">
                    geral@beyondfocus.pt
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[2px] text-petrol/30">Localização</p>
                  <p className="mt-1 text-base text-petrol">Lisboa, Portugal</p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[2px] text-petrol/30">Redes sociais</p>
                  <div className="mt-2 flex gap-4">
                    <a href="https://instagram.com/beyondfocus.pt" target="_blank" rel="noopener noreferrer" className="text-sm text-petrol/50 transition-colors hover:text-orange">Instagram</a>
                    <a href="https://vimeo.com/beyondfocus" target="_blank" rel="noopener noreferrer" className="text-sm text-petrol/50 transition-colors hover:text-orange">Vimeo</a>
                    <a href="https://linkedin.com/company/beyondfocus" target="_blank" rel="noopener noreferrer" className="text-sm text-petrol/50 transition-colors hover:text-orange">LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="rounded-2xl bg-white p-8 shadow-sm lg:p-12">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
