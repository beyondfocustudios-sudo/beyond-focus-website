import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beyondfocus.pt"),
  title: {
    default: "Beyond Focus — Produtora Audiovisual em Lisboa | Vídeo, Fotografia e Estratégia",
    template: "%s — Beyond Focus",
  },
  description:
    "Produtora audiovisual em Lisboa, Portugal. Filmes comerciais, vídeos institucionais, documentários, fotografia e estratégia criativa para marcas em todo o país. O teu departamento criativo externo.",
  keywords: [
    "produtora audiovisual Lisboa",
    "produtora de vídeo Portugal",
    "filme comercial Lisboa",
    "vídeo institucional Portugal",
    "produção audiovisual Lisboa",
    "fotografia comercial Lisboa",
    "documentário Portugal",
    "produtora vídeo Lisboa",
    "conteúdo redes sociais Lisboa",
    "cobertura eventos Lisboa",
    "produtora audiovisual Portugal",
    "Beyond Focus",
  ],
  authors: [{ name: "Beyond Focus", url: "https://beyondfocus.pt" }],
  creator: "Beyond Focus",
  publisher: "Beyond Focus",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "https://beyondfocus.pt",
    siteName: "Beyond Focus",
    title: "Beyond Focus — Produtora Audiovisual em Lisboa",
    description: "Filmes comerciais, vídeos institucionais, documentários, fotografia e estratégia criativa. Produtora audiovisual para marcas em Lisboa e todo o Portugal.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Beyond Focus — Produtora Audiovisual" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beyond Focus — Produtora Audiovisual em Lisboa",
    description: "Filmes comerciais, vídeos institucionais, documentários e fotografia para marcas em Portugal.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://beyondfocus.pt",
    languages: { "pt-PT": "https://beyondfocus.pt", en: "https://beyondfocus.pt/en" },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "VideoProductionCompany",
  name: "Beyond Focus",
  alternateName: "Beyond Focus — Produtora Audiovisual",
  url: "https://beyondfocus.pt",
  logo: "https://beyondfocus.pt/images/logo-symbol.png",
  image: "https://beyondfocus.pt/images/logo-symbol.png",
  description: "Produtora audiovisual em Lisboa, Portugal. Filmes comerciais, vídeos institucionais, documentários, fotografia e estratégia criativa para marcas em todo o país.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lisboa",
    addressRegion: "Lisboa",
    addressCountry: "PT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.7223,
    longitude: -9.1393,
  },
  areaServed: [
    { "@type": "Country", name: "Portugal" },
    { "@type": "City", name: "Lisboa" },
    { "@type": "City", name: "Porto" },
    { "@type": "City", name: "Setúbal" },
    { "@type": "City", name: "Faro" },
  ],
  email: "geral@beyondfocus.pt",
  telephone: "+351937350178",
  knowsLanguage: ["pt", "en"],
  slogan: "Vamos além do expectável.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços de Produção Audiovisual",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Filmes Comerciais" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vídeos Institucionais" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Documentários" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conteúdos de Redes Sociais" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fotografia Comercial" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cobertura de Eventos" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Estratégia Criativa" } },
    ],
  },
  sameAs: [
    "https://instagram.com/beyondfocus.pt",
    "https://vimeo.com/beyondfocus",
    "https://linkedin.com/company/beyondfocus",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "9.6",
    bestRating: "10",
    worstRating: "1",
    ratingCount: "4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${dmSans.variable} ${dmSerif.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <link rel="preload" href="/videos/loading.mp4" as="video" type="video/mp4" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen font-body">
        <GoogleAnalytics />
        <MetaPixel />
        <LoadingScreen />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
