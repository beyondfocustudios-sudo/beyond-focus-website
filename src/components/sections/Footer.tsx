import Link from "next/link";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Serviços", href: "/servicos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

const NAV_LINKS_EN = [
  { label: "Home", href: "/en" },
  { label: "Portfolio", href: "/en/portfolio" },
  { label: "Services", href: "/en/services" },
  { label: "About", href: "/en/about" },
  { label: "Contact", href: "/en/contact" },
];

const SERVICE_LINKS = [
  { label: "Filmes Comerciais", href: "/servicos/filmes-comerciais" },
  { label: "Vídeos Institucionais", href: "/servicos/videos-institucionais" },
  { label: "Documentários", href: "/servicos/documentarios" },
  { label: "Redes Sociais", href: "/servicos/redes-sociais" },
  { label: "Fotografia", href: "/servicos/fotografia" },
  { label: "Eventos", href: "/servicos/eventos" },
  { label: "Estratégia", href: "/servicos/estrategia" },
];

/* Inline SVG icons — no extra dependency needed */
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function VimeoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197a315 315 0 0 0 3.501-3.123C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.48 4.807z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface FooterProps {
  locale?: "pt" | "en";
}

export function Footer({ locale = "pt" }: FooterProps) {
  const isEn = locale === "en";
  const navLinks = isEn ? NAV_LINKS_EN : NAV_LINKS;

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {/* Col 1 — Brand */}
          <div>
            <h3 className="text-lg font-bold tracking-tight">Beyond Focus</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {isEn
                ? "Audiovisual production studio in Lisbon. Strategy, creative direction and production for brands that want results."
                : "Produtora audiovisual em Lisboa. Estratégia, direcção criativa e produção para marcas que querem resultados."}
            </p>
            <div className="mt-5 flex gap-4">
              <a
                href="https://instagram.com/beyondfocus.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://vimeo.com/beyondfocus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-white"
                aria-label="Vimeo"
              >
                <VimeoIcon />
              </a>
              <a
                href="https://linkedin.com/company/beyondfocus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-white"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-[2px] uppercase text-white/50">
              {isEn ? "Navigation" : "Navegação"}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-[2px] uppercase text-white/50">
              {isEn ? "Services" : "Serviços"}
            </h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="mb-4 mt-6 text-xs font-semibold tracking-[2px] uppercase text-white/50">Sectores</h4>
            <ul className="space-y-2.5">
              <li><Link href="/servicos/sectores/hotelaria" className="text-sm text-white/50 transition-colors hover:text-white">Hotelaria</Link></li>
              <li><Link href="/servicos/sectores/restauracao" className="text-sm text-white/50 transition-colors hover:text-white">Restauração</Link></li>
              <li><Link href="/servicos/sectores/imobiliario" className="text-sm text-white/50 transition-colors hover:text-white">Imobiliário</Link></li>
              <li><Link href="/servicos/sectores/corporate" className="text-sm text-white/50 transition-colors hover:text-white">Corporate</Link></li>
            </ul>
            <h4 className="mb-4 mt-6 text-xs font-semibold tracking-[2px] uppercase text-white/50">Regiões</h4>
            <ul className="space-y-2.5">
              <li><Link href="/servicos/regioes/porto" className="text-sm text-white/50 transition-colors hover:text-white">Porto</Link></li>
              <li><Link href="/servicos/regioes/algarve" className="text-sm text-white/50 transition-colors hover:text-white">Algarve</Link></li>
              <li><Link href="/servicos/regioes/setubal" className="text-sm text-white/50 transition-colors hover:text-white">Setúbal</Link></li>
              <li><Link href="/servicos/regioes/alentejo" className="text-sm text-white/50 transition-colors hover:text-white">Alentejo</Link></li>
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-[2px] uppercase text-white/50">
              {isEn ? "Contact" : "Contacto"}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:geral@beyondfocus.pt"
                  className="text-sm text-white/50 transition-colors hover:text-orange"
                >
                  geral@beyondfocus.pt
                </a>
              </li>
              <li>
                <a
                  href="tel:+351937350178"
                  className="text-sm text-white/50 transition-colors hover:text-orange"
                >
                  +351 937 350 178
                </a>
              </li>
              <li>
                <span className="text-sm text-white/50">Lisboa, Portugal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © 2026 Beyond Focus. {isEn ? "All rights reserved." : "Todos os direitos reservados."}
          </p>
          <div className="flex gap-6">
            <Link href="/privacidade" className="text-xs text-white/50 transition-colors hover:text-white/50">
              {isEn ? "Privacy Policy" : "Política de Privacidade"}
            </Link>
            <Link href="/termos" className="text-xs text-white/50 transition-colors hover:text-white/50">
              {isEn ? "Terms" : "Termos"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
