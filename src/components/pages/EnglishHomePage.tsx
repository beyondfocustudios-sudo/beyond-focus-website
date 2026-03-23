"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { LazyVideo } from "@/components/shared/LazyVideo";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PARTNERS, TESTIMONIALS } from "@/lib/constants";

/* ── Data ── */

const PORTFOLIO_ITEMS = [
  { title: "Hotel Casa Palmela", category: "COMMERCIAL FILM", thumbnail: "/images/portfolio/hcp-thumb.jpg", video: "/videos/portfolio/hcp-final.mp4" },
  { title: "Carl Zeiss Portugal", category: "CORPORATE VIDEO", thumbnail: "/images/portfolio/zeiss-thumb.jpg", video: "/videos/portfolio/zeiss-bts.mp4" },
  { title: "Highgate Portugal", category: "EVENTS", thumbnail: "/images/portfolio/highgate-thumb.jpg", video: "/videos/portfolio/highgate-sesimbra.mp4" },
  { title: "Amoretti Lux", category: "PHOTOGRAPHY", thumbnail: "/images/portfolio/amoretti-thumb.jpg", video: null },
  { title: "Soce by Mauro Loureiro", category: "COMMERCIAL FILM", thumbnail: "/images/portfolio/soce-mauro-thumb.jpg", video: "/videos/portfolio/soce-mauro.mp4" },
];

const SERVICES_EN = [
  { num: "01", name: "Commercial Films", tagline: "Ads nobody skips.", image: "/images/services/filmes-comerciais.jpg" },
  { num: "02", name: "Corporate Videos", tagline: "Your brand story, told right.", image: "/images/services/institucionais.jpg" },
  { num: "03", name: "Documentaries", tagline: "Depth, not visibility.", image: "/images/services/documentarios.jpg" },
  { num: "04", name: "Social Media Content", tagline: "Content that stops the scroll.", image: "/images/services/redes-sociais.jpg" },
  { num: "05", name: "Photography", tagline: "Every frame is a decision.", image: "/images/services/fotografia.jpg" },
  { num: "06", name: "Events", tagline: "One day. Months of content.", image: "/images/services/videos-eventos.jpg" },
  { num: "07", name: "Strategy", tagline: "Before we film, we think.", image: "/images/services/estrategia.jpg" },
];

const PROCESS_STEPS_EN = [
  { number: "01", title: "Proposal", description: "We listen to your goal, analyse the context and present a clear proposal." },
  { number: "02", title: "Concept", description: "We define the creative direction, tone and narrative of the project." },
  { number: "03", title: "Pre-Production", description: "We plan every detail — team, locations, script, logistics." },
  { number: "04", title: "Production", description: "We execute with rigour, flexibility and attention to every shot." },
  { number: "05", title: "Post-Production", description: "Editing, colour, sound and final delivery with revisions included." },
];

const FAQ_ITEMS_EN = [
  { question: "How much does a video project cost?", answer: "Every project is unique, so we work with custom budgets. After an initial conversation to understand your goals, we present a detailed proposal with no commitment." },
  { question: "How long does a project take?", answer: "It depends on complexity, but most projects take between 2 to 6 weeks from briefing to final delivery. We always provide a clear timeline before we start." },
  { question: "Do you only work in Lisbon or across Portugal?", answer: "We work across the country and internationally. Our base is in Lisbon but we have produced in Porto, the Algarve and outside Portugal." },
  { question: "Do I need a script before reaching out?", answer: "No. You can come with just an idea or a business goal. Creative direction and scripting are part of our process — we handle everything." },
  { question: "How many revisions are included?", answer: "All our proposals include revision rounds. The exact number varies by project, but we ensure you are satisfied with the final result." },
  { question: "What is the Beyond Focus Portal?", answer: "It is our exclusive platform where you track your project in real time, approve deliverables, communicate with the team and access all documents — all in one place." },
];

/* ── Animation variants ── */

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { y: 15 },
  show: { y: 0, transition: { duration: 0.4 } },
};

/* ── Portfolio Card ── */

function PortfolioCard({ title, category, thumbnail, video }: { title: string; category: string; thumbnail: string; video: string | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!video || !videoRef.current) return;
    const v = videoRef.current;
    const onCanPlay = () => setVideoReady(true);
    v.addEventListener("canplaythrough", onCanPlay);
    return () => v.removeEventListener("canplaythrough", onCanPlay);
  }, [video]);

  const showVideo = isHovered && video && videoReady;

  return (
    <motion.article
      variants={cardVariants}
      onMouseEnter={() => { setIsHovered(true); if (videoRef.current && video) { videoRef.current.currentTime = 0; videoRef.current.play().catch(() => {}); } }}
      onMouseLeave={() => { setIsHovered(false); if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } }}
      className="group relative min-w-[clamp(280px,40vw,520px)] flex-shrink-0 overflow-hidden rounded-xl md:min-w-[clamp(320px,35vw,480px)]"
      style={{ scrollSnapAlign: "start", aspectRatio: "3/4" }}
    >
      <Image src={thumbnail} alt={title} fill className={`object-cover transition-all duration-500 ${showVideo ? "opacity-0" : "opacity-100"} ${isHovered && !video ? "scale-105" : "scale-100"}`} sizes="(max-width: 768px) 85vw, 40vw" />
      {video && <video ref={videoRef} src={video} muted loop playsInline preload="none" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${showVideo ? "opacity-100" : "opacity-0"}`} />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
        <span className="mb-2 inline-block font-mono text-[10px] tracking-[2px] uppercase text-orange">{category}</span>
        <h3 className={`text-2xl font-bold text-white transition-transform duration-300 ${isHovered ? "-translate-y-1" : "translate-y-0"}`}>{title}</h3>
      </div>
    </motion.article>
  );
}

/* ── FAQ Accordion Item ── */

function AccordionItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="border-b border-petrol/10">
      <button onClick={onToggle} aria-expanded={isOpen} className="flex w-full items-center justify-between py-5 text-left">
        <span className="pr-4 text-base font-semibold text-petrol lg:text-lg">{question}</span>
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-petrol/15 text-sm text-petrol/50">+</motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="overflow-hidden">
            <p className="pb-5 text-sm leading-relaxed text-petrol/50 lg:text-base">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main Component ── */

export function EnglishHomePage() {
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const serviceScrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setDragging(true);
    startX.current = e.clientX;
    startScroll.current = scrollRef.current?.scrollLeft || 0;
    if (scrollRef.current) scrollRef.current.style.scrollBehavior = "auto";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const dx = e.clientX - startX.current;
    scrollRef.current.scrollLeft = startScroll.current - dx;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setDragging(false);
    if (scrollRef.current) scrollRef.current.style.scrollBehavior = "smooth";
  };

  const handleServiceScroll = useCallback(() => {
    if (!serviceScrollRef.current || !isMobile) return;
    const container = serviceScrollRef.current;
    const cardWidth = container.scrollWidth / SERVICES_EN.length;
    const index = Math.round(container.scrollLeft / cardWidth);
    if (index >= 0 && index < SERVICES_EN.length) setActiveService(index);
  }, [isMobile]);

  const scrollToService = useCallback((index: number) => {
    if (!serviceScrollRef.current || !isMobile) return;
    const cardWidth = serviceScrollRef.current.scrollWidth / SERVICES_EN.length;
    serviceScrollRef.current.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  }, [isMobile]);

  return (
    <>
      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-petrol-deep">
        <div className="absolute inset-0">
          <video src="/videos/showreel.mp4" poster="/images/showreel-poster.jpg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-32 md:px-10 lg:px-12">
          <div className="max-w-3xl">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="text-[clamp(36px,5.5vw,72px)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
              Your brand deserves more than a{" "}<em className="italic text-white/80">pretty video.</em>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-6 max-w-xl text-[clamp(16px,1.4vw,20px)] leading-relaxed text-white/50">
              Strategy, creative direction and audiovisual production for brands that want results.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }} className="mt-10">
              <Link href="/en/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-petrol transition-all duration-200 hover:bg-white/90 hover:scale-[1.03]">
                Let&apos;s Talk <span className="text-lg">→</span>
              </Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
              <span className="text-[11px] font-medium tracking-[3px] uppercase text-white/50">Scroll to discover</span>
              <span className="text-lg text-white/50">↓</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ STATEMENT ════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-[1fr_1px_1fr] lg:gap-16 lg:px-10">
          <motion.h2 initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-[clamp(32px,3.5vw,48px)] font-bold leading-[1.1] tracking-[-0.02em] text-petrol">
            We are your external creative department.{" "}<em className="font-normal italic">Or the team behind your next project.</em>
          </motion.h2>
          <div className="hidden min-h-[120px] w-px self-center bg-petrol/10 lg:block" />
          <motion.p initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="max-w-[420px] self-center text-[clamp(16px,1.3vw,18px)] leading-[1.7] text-petrol/60">
            Strategy, creative direction and audiovisual production for brands that want results — once or always.
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mx-auto mt-16 max-w-[1200px] border-t border-petrol/[0.06] px-6 pt-16 md:px-10 lg:px-10">
          <p className="mb-8 text-center text-[11px] font-medium uppercase tracking-[3px] text-petrol/30">Brands that trust us</p>
          <div className="overflow-hidden">
            <div className="animate-marquee flex items-center whitespace-nowrap">
              {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => (
                <div key={`${partner.name}-${i}`} className="mx-8 flex-shrink-0 opacity-70 transition-opacity duration-300 hover:opacity-100">
                  <Image src={partner.logo} alt={partner.name} width={120} height={28} className="h-[40px] w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════ PORTFOLIO ════════════════════ */}
      <section className="bg-petrol py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <Eyebrow>SELECTED WORK</Eyebrow>
              <SectionHeading light className="mt-3">Our work speaks for itself.</SectionHeading>
            </div>
            <Link href="/en/portfolio" className="hidden text-sm font-medium text-white/60 transition-colors hover:text-orange sm:block">View all →</Link>
          </div>
        </div>
        <motion.div
          ref={scrollRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`scrollbar-hide flex gap-5 overflow-x-auto px-6 pb-4 md:px-10 lg:px-12 scroll-smooth ${dragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
          style={{ scrollSnapType: dragging ? "none" : "x mandatory" }}
        >
          {PORTFOLIO_ITEMS.map((item) => (
            <PortfolioCard key={item.title} {...item} />
          ))}
        </motion.div>
        <div className="mt-6 px-6 sm:hidden">
          <Link href="/en/portfolio" className="text-sm font-medium text-white/60 hover:text-orange">View all →</Link>
        </div>
      </section>

      {/* ════════════════════ SERVICES ════════════════════ */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-10">
          <Eyebrow>WHAT WE DO</Eyebrow>
          <SectionHeading className="mt-3 max-w-md text-[clamp(28px,2.8vw,36px)]">Seven ways to go further.</SectionHeading>

          {/* Mobile: Image carousel */}
          <div className="mt-10 lg:hidden">
            <div ref={serviceScrollRef} onScroll={handleServiceScroll} className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto">
              {SERVICES_EN.map((service) => (
                <div key={service.num} className="relative w-[85vw] flex-shrink-0 snap-center overflow-hidden rounded-2xl" style={{ aspectRatio: "4/5" }}>
                  <Image src={service.image} alt={service.name} fill className="object-cover" sizes="85vw" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                    <span className="font-mono text-[10px] tracking-[2px] uppercase text-orange">{service.num}</span>
                    <p className="mt-1 text-lg font-semibold text-white">{service.name}</p>
                    <p className="mt-0.5 text-sm text-white/60">{service.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {SERVICES_EN.map((_, i) => (
                <button key={i} onClick={() => { setActiveService(i); scrollToService(i); }} className={`h-3 rounded-full transition-all duration-300 ${activeService === i ? "w-8 bg-orange" : "w-3 bg-petrol/15"}`} aria-label={`Service ${i + 1}`} />
              ))}
            </div>
          </div>

          {/* Desktop: 2-column layout */}
          <div className="mt-14 hidden items-center gap-16 lg:grid lg:grid-cols-2">
            <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              {SERVICES_EN.map((service, i) => (
                <motion.button key={service.num} variants={itemVariants} onClick={() => setActiveService(i)} onMouseEnter={() => setActiveService(i)} animate={{ opacity: activeService === i ? 1 : 0.4 }} whileHover={{ opacity: activeService === i ? 1 : 0.6 }} transition={{ duration: 0.3 }} className="group flex w-full items-start gap-4 border-b border-petrol/10 py-5 text-left">
                  <div className={`mt-1.5 h-10 w-[3px] rounded-full transition-all duration-300 ${activeService === i ? "bg-orange" : "bg-transparent"}`} />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-petrol/40">{service.num}</span>
                      <span className="text-lg font-semibold text-petrol">{service.name}</span>
                    </div>
                    <AnimatePresence>
                      {activeService === i && (
                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="mt-1 overflow-hidden text-sm text-petrol/50">{service.tagline}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              ))}
            </motion.div>
            <div className="flex items-center justify-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/5" }}>
                <AnimatePresence initial={false}>
                  <motion.div key={activeService} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="absolute inset-0">
                    <Image src={SERVICES_EN[activeService].image} alt={SERVICES_EN[activeService].name} fill className="object-cover" sizes="50vw" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 md:p-8">
                  <span className="font-mono text-[10px] tracking-[2px] uppercase text-orange">{SERVICES_EN[activeService].num}</span>
                  <p className="mt-1 text-lg font-semibold text-white">{SERVICES_EN[activeService].name}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ TESTIMONIALS ════════════════════ */}
      <section className="bg-petrol py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-10">
          <div className="flex items-end justify-between">
            <div>
              <Eyebrow>WHAT THEY SAY ABOUT US</Eyebrow>
              <SectionHeading light className="mt-3">Results that speak for themselves.</SectionHeading>
            </div>
          </div>
          <div className="scrollbar-hide mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
            {TESTIMONIALS.map((t) => (
              <motion.div key={t.company} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="w-[85vw] flex-shrink-0 snap-center md:w-[45vw] lg:w-[400px]">
                <div className="rounded-2xl bg-white p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-5"><span className="rounded-full bg-petrol px-3 py-1 text-xs font-bold text-white">{t.score}</span></div>
                  <span className="mb-3 block text-6xl font-serif leading-none text-orange/15">&ldquo;</span>
                  <p className="text-[15px] leading-relaxed text-petrol/80">{t.quote}</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-petrol/8 pt-4">
                    <div className="h-8 w-[3px] rounded-full bg-orange" />
                    <div>
                      <p className="text-xs font-semibold text-petrol">{t.company}</p>
                      <p className="text-[11px] text-petrol/40">{t.type}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ PROCESS ════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-10">
          <div className="text-center">
            <Eyebrow>HOW WE WORK</Eyebrow>
            <SectionHeading className="mx-auto mt-3 max-w-lg">From briefing to delivery. No surprises.</SectionHeading>
          </div>
          <div className="mt-16 space-y-0">
            {PROCESS_STEPS_EN.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div key={step.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className={`relative flex flex-col items-center gap-4 border-b border-petrol/8 py-12 lg:flex-row lg:gap-16 ${isLeft ? "" : "lg:flex-row-reverse"}`}>
                  <div className="relative flex-shrink-0">
                    <motion.span initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="block text-[clamp(100px,15vw,180px)] font-bold leading-none text-petrol/[0.05] select-none">{step.number}</motion.span>
                  </div>
                  <div className={`flex-1 text-center lg:text-left ${isLeft ? "" : "lg:text-right"}`}>
                    <div className={`inline-flex items-center gap-3 ${isLeft ? "" : "lg:flex-row-reverse"}`}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }} className="h-[3px] rounded-full bg-orange" />
                      <h3 className="text-xl font-bold text-petrol lg:text-2xl">{step.title}</h3>
                    </div>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }} className={`mt-3 max-w-md text-sm leading-relaxed text-petrol/50 lg:text-base ${isLeft ? "" : "lg:ml-auto"}`}>{step.description}</motion.p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════ FAQ ════════════════════ */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-10 lg:gap-20 lg:px-10">
          <div className="md:sticky md:top-28 md:self-start">
            <Eyebrow>FAQ</Eyebrow>
            <SectionHeading className="mt-3">Everything you need to know.</SectionHeading>
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-4 text-sm text-petrol/50 leading-relaxed lg:text-base">
              If you cannot find the answer you are looking for, we are just a message away.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-6">
              <Link href="/en/contact" className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange/90 hover:scale-[1.03] active:scale-[0.97]">
                Let&apos;s Talk <span>→</span>
              </Link>
            </motion.div>
          </div>
          <div>
            {FAQ_ITEMS_EN.map((item, i) => (
              <AccordionItem key={item.question} question={item.question} answer={item.answer} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ CTA FINAL ════════════════════ */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <LazyVideo src="/videos/showreel.mp4" poster="/images/showreel-poster.jpg" className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative z-10 px-6 text-center md:px-10">
          <motion.h2 initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mx-auto max-w-3xl text-[clamp(36px,5vw,64px)] font-bold leading-[1.08] tracking-[-0.02em] text-white">
            Let&apos;s create something that makes a difference.
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="mx-auto mt-5 max-w-md text-base text-white/50">
            The first conversation is on us.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8">
            <Link href="/en/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white hover:text-petrol-deep hover:scale-[1.03] active:scale-[0.97]">
              Let&apos;s Talk <span className="text-lg">→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
