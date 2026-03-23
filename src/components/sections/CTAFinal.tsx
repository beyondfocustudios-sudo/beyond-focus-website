"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LazyVideo } from "@/components/shared/LazyVideo";

export function CTAFinal() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      {/* Showreel video background — lazy loaded (below fold) */}
      <div className="absolute inset-0">
        <LazyVideo
          src="/videos/showreel.mp4"
          poster="/images/showreel-poster.jpg"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="relative z-10 px-6 text-center md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-[clamp(36px,5vw,64px)] font-bold leading-[1.08] tracking-[-0.02em] text-white"
        >
          Vamos criar algo que faça a diferença.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-5 max-w-md text-base text-white/50"
        >
          A primeira conversa é por nossa conta.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white hover:text-petrol-deep hover:scale-[1.03]"
          >
            Fala Connosco
            <span className="text-lg">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
