export const BRAND = {
  colors: {
    cream: "#FAF9F7",
    bgLight: "#F5F5F5",
    bgAlt: "#eceef4",
    petrol: "#0E3A45",
    petrolDeep: "#070f13",
    orange: "#FA8334",
  },
  fonts: {
    display: "DM Serif Display",
    body: "DM Sans",
    mono: "JetBrains Mono",
  },
} as const;

export const NAV_ITEMS = [
  { label: "Início", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Serviços", href: "/servicos" },
  { label: "Portal", href: "/portal-cliente" },
  { label: "Sobre", href: "/sobre" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
] as const;
