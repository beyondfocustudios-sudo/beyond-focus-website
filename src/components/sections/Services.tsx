"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionHeading } from "@/components/shared/SectionHeading";

const services = [
  { num: "01", name: "Filmes Comerciais", tagline: "Spots que ninguém salta.", image: "/images/services/filmes-comerciais.jpg", gradient: "from-[#1a3a4a] to-[#0a2029]" },
  { num: "02", name: "Vídeos Institucionais", tagline: "A história da tua marca, contada a sério.", image: "/images/services/institucionais.jpg", gradient: "from-[#2a1a2a] to-[#1a0a1a]" },
  { num: "03", name: "Documentários", tagline: "Profundidade, não visibilidade.", image: "/images/services/documentarios.jpg", gradient: "from-[#1a2a1a] to-[#0a1a0a]" },
  { num: "04", name: "Conteúdos de Redes Sociais", tagline: "Conteúdo que pára o scroll.", image: "/images/services/redes-sociais.jpg", gradient: "from-[#2a2a1a] to-[#1a1a0a]" },
  { num: "05", name: "Fotografia", tagline: "Cada frame é uma decisão.", image: "/images/services/fotografia.jpg", gradient: "from-[#1a1a2a] to-[#0a0a1a]" },
  { num: "06", name: "Eventos", tagline: "Um dia. Meses de conteúdo.", image: "/images/services/videos-eventos.jpg", gradient: "from-[#2a1a1a] to-[#1a0a0a]" },
  { num: "07", name: "Estratégia", tagline: "A direcção certa antes do primeiro plano.", image: "/images/services/estrategia.jpg", gradient: "from-[#0a1a2a] to-[#1a2a3a]" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { y: 15 },
  show: { y: 0, transition: { duration: 0.4 } },
};

export function Services() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Sync scroll position → active index on mobile
  const handleScroll = useCallback(() => {
    if (!scrollRef.current || !isMobile) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.scrollWidth / services.length;
    const index = Math.round(scrollLeft / cardWidth);
    if (index !== active && index >= 0 && index < services.length) {
      setActive(index);
    }
  }, [active, isMobile]);

  // Scroll to active card when tapping list on mobile
  const scrollToCard = useCallback((index: number) => {
    if (!scrollRef.current || !isMobile) return;
    const cardWidth = scrollRef.current.scrollWidth / services.length;
    scrollRef.current.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  }, [isMobile]);

  return (
    <section className="bg-bg-light py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-10">
        <Eyebrow>O QUE FAZEMOS</Eyebrow>
        <SectionHeading className="mt-3 max-w-md text-[clamp(28px,2.8vw,36px)]">
          Sete formas de ir mais longe.
        </SectionHeading>

        {/* ── Mobile: Image carousel FIRST ── */}
        <div className="mt-10 lg:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto"
          >
            {services.map((service, i) => (
              <div
                key={service.num}
                className="relative w-[85vw] flex-shrink-0 snap-center overflow-hidden rounded-2xl"
                style={{ aspectRatio: "4/5" }}
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="85vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                  <span className="font-mono text-[10px] tracking-[2px] uppercase text-orange">
                    {service.num}
                  </span>
                  <p className="mt-1 text-lg font-semibold text-white">{service.name}</p>
                  <p className="mt-0.5 text-sm text-white/60">{service.tagline}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); scrollToCard(i); }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  active === i ? "w-8 bg-orange" : "w-3 bg-petrol/15"
                }`}
                aria-label={`Serviço ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop: 2-column layout ── */}
        <div className="mt-14 hidden items-center gap-16 lg:grid lg:grid-cols-2">
          {/* Left — Service list */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {services.map((service, i) => (
              <motion.button
                key={service.num}
                variants={itemVariants}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                animate={{ opacity: active === i ? 1 : 0.4 }}
                whileHover={{ opacity: active === i ? 1 : 0.6 }}
                transition={{ duration: 0.3 }}
                className="group flex w-full items-start gap-4 border-b border-petrol/10 py-5 text-left"
              >
                <div
                  className={`mt-1.5 h-10 w-[3px] rounded-full transition-all duration-300 ${
                    active === i ? "bg-orange" : "bg-transparent"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-petrol/40">{service.num}</span>
                    <span className="text-lg font-semibold text-petrol">{service.name}</span>
                  </div>
                  <AnimatePresence>
                    {active === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-1 overflow-hidden text-sm text-petrol/50"
                      >
                        {service.tagline}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Right — Image with crossfade */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: "4/5" }}
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {services[active].image ? (
                    <Image
                      src={services[active].image}
                      alt={services[active].name}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${services[active].gradient}`} />
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 md:p-8">
                <span className="font-mono text-[10px] tracking-[2px] uppercase text-orange">
                  {services[active].num}
                </span>
                <p className="mt-1 text-lg font-semibold text-white">{services[active].name}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile list removed — carousel cards already show name + tagline */}
      </div>
    </section>
  );
}
