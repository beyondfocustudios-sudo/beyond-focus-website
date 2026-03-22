"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionHeading } from "@/components/shared/SectionHeading";

const PORTFOLIO_ITEMS = [
  { category: "FILME COMERCIAL", title: "Projecto Alpha", gradient: "from-petrol-deep/80 to-petrol/60" },
  { category: "VÍDEO INSTITUCIONAL", title: "Projecto Bravo", gradient: "from-petrol/70 to-petrol-deep/80" },
  { category: "DOCUMENTÁRIO", title: "Projecto Charlie", gradient: "from-petrol-deep/70 to-petrol/50" },
  { category: "EVENTOS", title: "Projecto Delta", gradient: "from-petrol/60 to-petrol-deep/70" },
];

export function Portfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-petrol py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <Eyebrow light>TRABALHOS SELECCIONADOS</Eyebrow>
            <SectionHeading light className="mt-3">
              O nosso trabalho fala por nós.
            </SectionHeading>
          </div>
          <Link
            href="/portfolio"
            className="hidden text-sm font-medium text-white/60 transition-colors hover:text-orange sm:block"
          >
            Ver tudo →
          </Link>
        </div>
      </div>

      {/* Horizontal Scroll Cards */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-5 overflow-x-auto px-6 pb-4 lg:px-10"
        style={{ cursor: "grab", scrollSnapType: "x mandatory" }}
      >
        {PORTFOLIO_ITEMS.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative min-w-[clamp(340px,40vw,520px)] flex-shrink-0 overflow-hidden rounded-xl"
            style={{ scrollSnapAlign: "start", aspectRatio: "3/4" }}
          >
            {/* Placeholder background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />

            {/* Hover scale effect area */}
            <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
              <div className={`h-full w-full bg-gradient-to-br ${item.gradient}`} />
            </div>

            {/* Dark overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
              <span className="mb-2 inline-block font-mono text-[10px] tracking-[2px] uppercase text-orange">
                {item.category}
              </span>
              <h3 className="text-2xl font-bold text-white transition-transform duration-300 group-hover:-translate-y-1">
                {item.title}
              </h3>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Mobile "Ver tudo" */}
      <div className="mt-6 px-6 sm:hidden">
        <Link href="/portfolio" className="text-sm font-medium text-white/60 hover:text-orange">
          Ver tudo →
        </Link>
      </div>
    </section>
  );
}
