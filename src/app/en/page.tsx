import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { EnglishHomePage } from "@/components/pages/EnglishHomePage";

const FAQ_ITEMS_EN = [
  { question: "How much does a video project cost?", answer: "Every project is unique, so we work with custom budgets. After an initial conversation to understand your goals, we present a detailed proposal with no commitment." },
  { question: "How long does a project take?", answer: "It depends on complexity, but most projects take between 2 to 6 weeks from briefing to final delivery. We always provide a clear timeline before we start." },
  { question: "Do you only work in Lisbon or across Portugal?", answer: "We work across the country and internationally. Our base is in Lisbon but we have produced in Porto, the Algarve and outside Portugal." },
  { question: "Do I need a script before reaching out?", answer: "No. You can come with just an idea or a business goal. Creative direction and scripting are part of our process — we handle everything." },
  { question: "How many revisions are included?", answer: "All our proposals include revision rounds. The exact number varies by project, but we ensure you are satisfied with the final result." },
  { question: "What is the Beyond Focus Portal?", answer: "It is our exclusive platform where you track your project in real time, approve deliverables, communicate with the team and access all documents — all in one place." },
];

export const metadata: Metadata = {
  title: "Beyond Focus — Video Production Studio in Lisbon, Portugal",
  description: "Video production studio in Lisbon, Portugal. Commercial films, corporate videos, photography and events for brands that want results.",
  openGraph: {
    title: "Beyond Focus — Video Production Studio in Lisbon, Portugal",
    description: "Commercial films, corporate videos, photography and events for brands that want results.",
    url: "https://beyondfocus.pt/en",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Beyond Focus" }],
  },
  alternates: {
    canonical: "https://beyondfocus.pt/en",
    languages: { "pt-PT": "https://beyondfocus.pt", en: "https://beyondfocus.pt/en" },
  },
};

export default function EnHomePage() {
  return (
    <>
      <FAQSchema items={FAQ_ITEMS_EN} />
      <Navbar locale="en" />
      <main>
        <EnglishHomePage />
      </main>
      <Footer />
    </>
  );
}
