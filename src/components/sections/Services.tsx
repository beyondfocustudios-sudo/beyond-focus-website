"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionHeading } from "@/components/shared/SectionHeading";

const services = [
  { num: "01", name: "Filmes Comerciais", tagline: "Spots que ninguém salta.", gradient: "from-[#1a3a4a] to-[#0a2029]" },
  { num: "02", name: "Vídeos Institucionais", tagline: "A história da tua marca, contada a sério.", gradient: "from-[#2a1a2a] to-[#1a0a1a]" },
  { num: "03", name: "Documentários", tagline: "Profundidade, não visibilidade.", gradient: "from-[#1a2a1a] to-[#0a1a0a]" },
  { num: "04", name: "Conteúdos de Redes Sociais", tagline: "Conteúdo que pára o scroll.", gradient: "from-[#2a2a1a] to-[#1a1a0a]" },
  { num: "05", name: "Fotografia", tagline: "Cada frame é uma decisão.", gradient: "from-[#1a1a2a] to-[#0a0a1a]" },
  { num: "06", name: "Eventos", tagline: "Um dia. Meses de conteúdo.", gradient: "from-[#2a1a1a] to-[#1a0a0a]" },
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

  return (
    <section className="bg-bg-light py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-10">
        <Eyebrow>O QUE FAZEMOS</Eyebrow>
        <SectionHeading className="mt-3 max-w-md text-[clamp(28px,2.8vw,36px)]">
          Seis formas de ir mais longe.
        </SectionHeading>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
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
                {/* Orange bar — 3px wide, left side */}
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

          {/* Right — Image with crossfade + number watermark */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl"
            style={{ aspectRatio: "4/5" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 bg-gradient-to-br ${services[active].gradient}`}
              />
            </AnimatePresence>

            {/* Big watermark number */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-[120px] font-bold text-white/[0.05] select-none md:text-[160px]"
                >
                  {services[active].num}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Bottom label */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-6 md:p-8">
              <span className="font-mono text-[10px] tracking-[2px] uppercase text-orange">
                {services[active].num}
              </span>
              <p className="mt-1 text-lg font-semibold text-white">{services[active].name}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
