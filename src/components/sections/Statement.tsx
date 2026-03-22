"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { PARTNERS } from "@/lib/constants";

export function Statement() {
  return (
    <section className="bg-white py-20 lg:py-28">
      {/* 3-column grid: headline | divider | subtitle */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-[1fr_1px_1fr] lg:gap-16 lg:px-10">
        {/* Headline — left */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(32px,3.5vw,48px)] font-bold leading-[1.1] tracking-[-0.02em] text-petrol"
        >
          Somos o teu departamento criativo externo.{" "}
          <em className="font-normal italic">Ou a equipa por trás do teu próximo projecto.</em>
        </motion.h2>

        {/* Vertical divider — hidden on mobile */}
        <div className="hidden min-h-[120px] w-px self-center bg-petrol/10 lg:block" />

        {/* Subtitle — right, vertically centered */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[420px] self-center text-[clamp(16px,1.3vw,18px)] leading-[1.7] text-petrol/60"
        >
          Estratégia, direcção criativa e produção audiovisual para marcas que querem resultados — uma vez ou sempre.
        </motion.p>
      </div>

      {/* Partner logos — animated marquee */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mt-16 max-w-[1200px] border-t border-petrol/[0.06] px-6 pt-16 md:px-10 lg:px-10"
      >
        <p className="mb-8 text-center text-[11px] font-medium uppercase tracking-[3px] text-petrol/30">
          Marcas que confiam em nós
        </p>
        <div className="overflow-hidden">
          <div className="animate-marquee flex items-center whitespace-nowrap">
            {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="mx-8 flex-shrink-0 opacity-70 transition-opacity duration-300 hover:opacity-100"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={120}
                  height={28}
                  className="h-[40px] w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
