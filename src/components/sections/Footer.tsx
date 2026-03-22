import Link from "next/link";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Serviços", href: "/servicos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

const SERVICE_LINKS = [
  "Filmes Comerciais",
  "Vídeos Institucionais",
  "Documentários",
  "Redes Sociais",
  "Fotografia",
  "Eventos",
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {/* Col 1 — Brand */}
          <div>
            <h3 className="text-lg font-bold tracking-tight">Beyond Focus</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/40">
              Produtora audiovisual em Setúbal. Estratégia, direcção criativa e produção para marcas que querem resultados.
            </p>
            <div className="mt-5 flex gap-4">
              <a
                href="https://instagram.com/beyondfocus.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 transition-colors hover:text-orange"
              >
                Instagram
              </a>
              <a
                href="https://vimeo.com/beyondfocus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 transition-colors hover:text-orange"
              >
                Vimeo
              </a>
              <a
                href="https://linkedin.com/company/beyondfocus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 transition-colors hover:text-orange"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-[2px] uppercase text-white/25">Navegação</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
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
            <h4 className="mb-4 text-xs font-semibold tracking-[2px] uppercase text-white/25">Serviços</h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((service) => (
                <li key={service}>
                  <span className="text-sm text-white/50">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-[2px] uppercase text-white/25">Contacto</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:hello@beyondfocus.pt"
                  className="text-sm text-white/50 transition-colors hover:text-orange"
                >
                  hello@beyondfocus.pt
                </a>
              </li>
              <li>
                <span className="text-sm text-white/50">Setúbal, Portugal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/25">
            © 2026 Beyond Focus. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidade" className="text-xs text-white/25 transition-colors hover:text-white/50">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="text-xs text-white/25 transition-colors hover:text-white/50">
              Termos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
