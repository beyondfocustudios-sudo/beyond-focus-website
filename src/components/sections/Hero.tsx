"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-petrol-deep">
      {/* Background gradient simulating cinematic lens */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-petrol-deep via-petrol to-petrol-deep" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(14,58,69,0.6),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-32 lg:px-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 inline-block font-mono text-[11px] font-medium tracking-[3px] uppercase text-orange"
          >
            Beyond Focus · Produção Audiovisual
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-[clamp(36px,5.5vw,72px)] font-bold leading-[1.05] tracking-[-0.03em] text-white"
          >
            A tua marca merece mais do que um{" "}
            <em className="text-orange/90 not-italic font-bold italic">vídeo bonito.</em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 max-w-xl text-[clamp(16px,1.4vw,20px)] leading-relaxed text-white/50"
          >
            Estratégia, direcção criativa e produção audiovisual para marcas que querem resultados.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-10"
          >
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-orange/90 hover:scale-[1.03]"
            >
              Fala Connosco
              <span className="text-lg">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-medium tracking-[2px] uppercase text-white/30">Scroll</span>
            <div className="h-8 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
