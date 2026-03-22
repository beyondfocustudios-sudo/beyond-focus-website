"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-petrol-deep">
      {/* Showreel video background */}
      <div className="absolute inset-0">
        <video
          src="/videos/showreel.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-32 md:px-10 lg:px-12">
        <div className="max-w-3xl">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-[clamp(36px,5.5vw,72px)] font-bold leading-[1.05] tracking-[-0.03em] text-white"
          >
            A tua marca merece mais do que um{" "}
            <em className="italic text-white/80">vídeo bonito.</em>
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

          {/* CTA — White pill, NOT orange */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-10"
          >
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-petrol transition-all duration-200 hover:bg-white/90 hover:scale-[1.03]"
            >
              Fala Connosco
              <span className="text-lg">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator — animated bounce */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[11px] font-medium tracking-[3px] uppercase text-white/50">
              Desliza para descobrir
            </span>
            <span className="text-lg text-white/50">↓</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
