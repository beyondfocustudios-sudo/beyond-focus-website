"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionHeading } from "@/components/shared/SectionHeading";

const PORTFOLIO_ITEMS = [
  { category: "FILME COMERCIAL", title: "Projecto Alpha", gradient: "from-[#0a2029] to-[#1a3a4a]" },
  { category: "VÍDEO INSTITUCIONAL", title: "Projecto Bravo", gradient: "from-[#1a2a3a] to-[#0a1520]" },
  { category: "DOCUMENTÁRIO", title: "Projecto Charlie", gradient: "from-[#15201a] to-[#0a1510]" },
  { category: "EVENTOS", title: "Projecto Delta", gradient: "from-[#1a1520] to-[#0a0a15]" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Portfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  return (
    <section className="bg-petrol py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
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
            data-cursor="hover-link"
            className="hidden text-sm font-medium text-white/60 transition-colors hover:text-orange sm:block"
          >
            Ver tudo →
          </Link>
        </div>
      </div>

      {/* Horizontal Scroll — drag to navigate, wheel scrolls page normally */}
      <motion.div
        ref={scrollRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        data-cursor="gallery"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={`scrollbar-hide flex gap-5 overflow-x-auto px-6 pb-4 md:px-10 lg:px-12 ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        style={{ scrollSnapType: isDragging ? "none" : "x mandatory" }}
      >
        {PORTFOLIO_ITEMS.map((item) => (
          <motion.article
            key={item.title}
            variants={cardVariants}
            data-cursor="hover-link"
            className="group relative min-w-[clamp(280px,40vw,520px)] flex-shrink-0 overflow-hidden rounded-xl md:min-w-[clamp(320px,35vw,480px)]"
            style={{ scrollSnapAlign: "start", aspectRatio: "3/4" }}
          >
            {/* Hover scale effect */}
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
      </motion.div>

      {/* Mobile "Ver tudo" */}
      <div className="mt-6 px-6 sm:hidden">
        <Link href="/portfolio" className="text-sm font-medium text-white/60 hover:text-orange">
          Ver tudo →
        </Link>
      </div>
    </section>
  );
}
