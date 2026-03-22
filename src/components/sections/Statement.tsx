"use client";

import { motion } from "framer-motion";

export function Statement() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 md:px-10 lg:grid-cols-2 lg:gap-20 lg:px-10">
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

        {/* Subtitle — right, aligned bottom */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="self-end text-[clamp(16px,1.3vw,18px)] leading-relaxed text-petrol/60"
        >
          Estratégia, direcção criativa e produção audiovisual para marcas que querem resultados — uma vez ou sempre.
        </motion.p>
      </div>

      {/* Partner logos — static row */}
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
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {[
            "Carl Zeiss",
            "Highgate",
            "Joplins",
            "Once Upon a House",
            "Amoretti Lux",
            "Hotel Cristal",
            "Hotel Casa Palmela",
            "Sóçe",
            "ifoffice",
          ].map((partner) => (
            <span
              key={partner}
              className="text-[13px] font-semibold uppercase tracking-[2px] text-petrol/20 transition-opacity duration-300 hover:text-petrol/40"
            >
              {partner}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
