import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { Portal } from "@/components/sections/Portal";
import { Testimonials } from "@/components/sections/Testimonials";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Statement />
        <Portfolio />
        <Services />
        <Portal />
        <Testimonials />
        <Process />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
