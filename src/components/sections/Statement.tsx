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
    </section>
  );
}
