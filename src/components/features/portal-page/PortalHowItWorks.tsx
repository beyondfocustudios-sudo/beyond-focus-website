"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Recebes o convite",
    description: "Após fechar projecto, recebes acesso ao portal com as tuas credenciais. Login simples, sem instalações.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="3 7 12 13 21 7" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Acompanhas tudo",
    description: "Vês o progresso em tempo real, aprovas entregas com comentários ao timecode e comunicas directamente com a equipa.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Recebes a entrega",
    description: "Download directo dos ficheiros finais — vídeos, fotos e documentos. Tudo organizado, tudo acessível.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

export function PortalHowItWorks() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
            Como funciona
          </p>
          <h2 className="mx-auto mt-3 max-w-lg text-[clamp(28px,3vw,40px)] leading-tight text-petrol">
            Simples como deve ser.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-petrol/40">
            Três passos. Sem complicações. Sem curva de aprendizagem.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mx-auto mt-20 grid max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => {
            const isActive = hovered === null || hovered === i;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative rounded-2xl border border-petrol/8 bg-bg-light p-8 transition-all duration-400 lg:p-10 ${
                  isActive ? "opacity-100" : "opacity-40"
                } ${hovered === i ? "border-orange/30 shadow-lg shadow-orange/5 -translate-y-1" : ""}`}
              >
                {/* Number watermark */}
                <span className="absolute top-4 right-6 font-mono text-[60px] font-bold leading-none text-petrol/[0.04] select-none lg:text-[80px]">
                  {step.num}
                </span>

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.1 }}
                  className={`flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300 ${
                    hovered === i ? "bg-orange/10 text-orange" : "bg-petrol/5 text-petrol/40"
                  }`}
                >
                  {step.icon}
                </motion.div>

                {/* Connecting line (between cards) */}
                {i < STEPS.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-petrol/10 md:block" />
                )}

                {/* Content */}
                <h3 className="mt-6 text-xl font-bold text-petrol">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-petrol/50">
                  {step.description}
                </p>

                {/* Step indicator line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                  className={`mt-6 h-[3px] rounded-full transition-colors duration-300 ${
                    hovered === i ? "bg-orange" : "bg-petrol/10"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
