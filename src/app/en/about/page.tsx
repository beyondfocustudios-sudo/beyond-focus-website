import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "About | Our Story",
  description: "Founded in 2023 by Daniel Lopes. Video production studio in Lisbon for brands that want more than content — they want results.",
  alternates: { canonical: "https://beyondfocus.pt/en/about", languages: { "pt-PT": "https://beyondfocus.pt/sobre", en: "https://beyondfocus.pt/en/about" } },
};

const VALUES = [
  { title: "Rigour", description: "Every detail counts. From preparation to delivery, we treat every project with the best care we can give." },
  { title: "Proximity", description: "We work as an extension of your team. No barriers, no unnecessary formalities." },
  { title: "Results", description: "Pretty is not enough. Everything we create has a purpose: to move, connect and convert." },
  { title: "Transparency", description: "No surprises. Clear processes, direct communication, aligned expectations from day one." },
];

export default function EnAboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", href: "/en" }, { name: "About", href: "/en/about" }]} />
      <Navbar variant="light" locale="en" />
      <main className="bg-bg-light">
        <section className="bg-petrol-deep pt-[200px] pb-20">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
            <span className="font-mono text-[13px] uppercase tracking-[3px] text-orange">About us</span>
            <h1 className="mt-4 max-w-3xl text-[clamp(36px,5vw,64px)] font-bold leading-[1.05] text-white">We go beyond expectations.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/50">Founded in 2023 and based in Lisbon, we work with brands that want more than content — they want results you can feel.</p>
          </div>
        </section>
        <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 lg:px-[60px]">
          <span className="font-mono text-[13px] uppercase tracking-[3px] text-orange">The story behind the camera</span>
          <h2 className="mt-3 text-[clamp(28px,3vw,40px)] font-bold text-petrol">Daniel Lopes</h2>
          <p className="mt-1 text-base font-medium text-petrol/40">Founder & Creative Director</p>
          <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-petrol/60">
            <p>The passion for video didn&apos;t start in a classroom — it started watching films. When my mother gave me my first camera, what was curiosity became direction.</p>
            <p>I studied Multimedia in Lisbon, but what really shaped me was autonomous work — hours filming, editing, failing and repeating. In 2023, at 20, I founded Beyond Focus.</p>
            <p>Today, the goal is clear: when someone in Portugal thinks of high-quality video with real results, I want them to think of Beyond Focus.</p>
          </div>
        </section>
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
            <span className="font-mono text-[13px] uppercase tracking-[3px] text-orange">Our values</span>
            <h2 className="mt-3 text-[clamp(28px,3vw,40px)] font-bold text-petrol">What guides us.</h2>
            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((v) => (
                <div key={v.title} className="border-t-2 border-orange/30 pt-6">
                  <h3 className="text-xl font-bold text-petrol">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-petrol/50">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-bg-light py-28 text-center">
          <h2 className="text-[clamp(28px,3vw,40px)] font-bold text-petrol">Want to know us better?</h2>
          <p className="mx-auto mt-3 max-w-md text-base text-petrol/50">The first conversation is on us.</p>
          <Link href="/en/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-petrol px-8 py-4 text-base font-semibold text-white hover:bg-petrol/90">
            Get in touch <span>→</span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
