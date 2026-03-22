import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
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

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Beyond Focus — Produtora Audiovisual em Setúbal",
    template: "%s — Beyond Focus",
  },
  description:
    "O teu Departamento Criativo Externo. Produtora audiovisual baseada em Setúbal, Portugal. Vamos além do expectável.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Beyond Focus — Produtora Audiovisual",
    description: "Estratégia, direcção criativa e produção audiovisual para marcas que querem resultados.",
    locale: "pt_PT",
    type: "website",
    siteName: "Beyond Focus",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "VideoProductionCompany",
  name: "Beyond Focus",
  url: "https://beyond-focus-website.vercel.app",
  logo: "https://beyond-focus-website.vercel.app/images/logo-symbol.png",
  description: "Produtora audiovisual em Setúbal, Portugal. Estratégia, direcção criativa e produção para marcas que querem resultados.",
  address: { "@type": "PostalAddress", addressLocality: "Setúbal", addressCountry: "PT" },
  email: "hello@beyondfocus.pt",
  sameAs: [
    "https://instagram.com/beyondfocus.pt",
    "https://vimeo.com/beyondfocus",
    "https://linkedin.com/company/beyondfocus",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
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
