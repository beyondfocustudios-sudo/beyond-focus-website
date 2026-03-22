import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { CustomCursor } from "@/components/ui/CustomCursor";
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
  title: "Beyond Focus — Produtora Audiovisual",
  description:
    "O teu Departamento Criativo Externo. Produtora audiovisual baseada em Setúbal, Portugal. Vamos além do expectável.",
  openGraph: {
    title: "Beyond Focus — Produtora Audiovisual",
    description: "Estratégia, direcção criativa e produção audiovisual para marcas que querem resultados.",
    locale: "pt_PT",
    type: "website",
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
      className={`${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen font-body">
        <LoadingScreen />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
