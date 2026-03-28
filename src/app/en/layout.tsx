import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    languages: {
      "pt-PT": "https://beyondfocus.pt",
      en: "https://beyondfocus.pt/en",
      "x-default": "https://beyondfocus.pt",
    },
  },
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
