"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TESTIMONIALS } from "@/lib/constants";

const COMPANY_LOGOS: Record<string, string> = {
  "Carl Zeiss Portugal": "/images/partners/carl-zeiss.png",
  "Once Upon a House": "/images/partners/hotel-casa-palmela.png",
  "Amoretti Lux": "/images/partners/amoretti-lux.png",
  "Once Upon Lisboa": "/images/partners/once-upon-a-house.png",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function TestimonialCard({ t, highlight }: { t: typeof TESTIMONIALS[number]; highlight?: boolean }) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 lg:p-8 transition-all duration-300 ${
        highlight ? "ring-2 ring-orange/30" : ""
      }`}
    >
      {/* Score pill */}
      <div className="mb-5">
        <span className="rounded-full bg-petrol px-3 py-1 text-xs font-bold text-white">
          {t.score}
        </span>
      </div>

      {/* Decorative quote */}
      <span className="mb-3 block text-6xl font-serif leading-none text-orange/15">
        &ldquo;
      </span>

      {/* Quote */}
      <p className="text-[15px] leading-relaxed text-petrol/80">
        {t.quote}
      </p>

      {/* Footer */}
      <div className="mt-6 flex items-center gap-3 border-t border-petrol/8 pt-4">
        <div className="h-8 w-[3px] rounded-full bg-orange" />
        {COMPANY_LOGOS[t.company] && (
          <Image
            src={COMPANY_LOGOS[t.company]}
            alt={t.company}
            width={80}
            height={24}
            className="h-[20px] w-auto object-contain"
          />
        )}
        <div>
          <p className="text-xs font-semibold text-petrol">{t.company}</p>
          <p className="text-[11px] text-petrol/40">{t.type}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section className="bg-petrol py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-10">
        {/* Header with arrows (desktop) */}
        <div className="flex items-end justify-between">
          <div>
            <Eyebrow light>O QUE DIZEM DE NÓS</Eyebrow>
            <SectionHeading light className="mt-3">
              Resultados que falam por si.
            </SectionHeading>
          </div>
          <div className="hidden gap-3 sm:flex">
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-orange hover:text-orange"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-orange hover:text-orange"
              aria-label="Seguinte"
            >
              →
            </button>
          </div>
        </div>

        {/* ── Horizontal scroll — like portfolio ── */}
        <div
          className="scrollbar-hide mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.company}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-[85vw] flex-shrink-0 snap-center md:w-[45vw] lg:w-[400px]"
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
