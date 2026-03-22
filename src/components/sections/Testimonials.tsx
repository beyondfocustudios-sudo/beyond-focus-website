"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TESTIMONIALS, PARTNERS } from "@/lib/constants";

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section className="bg-petrol py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        {/* Header with arrows */}
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

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.company}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl bg-white p-6 lg:p-8 transition-all duration-300 ${
                i === current ? "ring-2 ring-orange/30" : ""
              }`}
            >
              {/* Score + Company pills */}
              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-petrol px-3 py-1 text-xs font-bold text-white">
                  {t.score}
                </span>
                <span className="rounded-full bg-petrol/5 px-3 py-1 text-xs font-medium text-petrol/60">
                  {t.company}
                </span>
              </div>

              {/* Quote */}
              <div className="relative">
                <span className="absolute -top-2 -left-1 text-4xl leading-none text-orange/15">&ldquo;</span>
                <p className="relative z-10 pl-4 text-[15px] leading-relaxed text-petrol/80">
                  {t.quote}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 flex items-center gap-3 border-t border-petrol/8 pt-4">
                <div className="h-8 w-[3px] rounded-full bg-orange" />
                <div>
                  <p className="text-xs font-semibold text-petrol">{t.company}</p>
                  <p className="text-[11px] text-petrol/40">{t.type}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile arrows */}
        <div className="mt-6 flex justify-center gap-3 sm:hidden">
          <button
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
          >
            ←
          </button>
          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
          >
            →
          </button>
        </div>

        {/* Marquee — Animated */}
        <div className="mt-14 overflow-hidden border-t border-white/10 pt-8">
          <p className="mb-4 text-center font-mono text-[10px] tracking-[2px] uppercase text-white/30">
            Parceiros
          </p>
          <div className="relative overflow-hidden">
            <div className="animate-marquee flex whitespace-nowrap">
              {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                <span
                  key={`${partner}-${i}`}
                  className="mx-6 inline-block text-sm font-medium text-white/30 lg:mx-10 lg:text-base"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
