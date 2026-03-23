"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function AboutPortal() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 lg:px-[60px]">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
            O nosso diferenciador
          </p>
          <h2 className="mt-3 text-[clamp(28px,3vw,40px)] leading-tight text-petrol">
            O Beyond Focus Portal.
          </h2>
          <p className="mt-4 max-w-[480px] text-base leading-relaxed text-petrol/60">
            Não somos apenas uma produtora — oferecemos uma plataforma exclusiva onde os nossos clientes acompanham cada fase do projecto, aprovam entregas com comentários ao segundo exacto, comunicam com a equipa e acedem a todos os documentos. Tudo num só sítio.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block text-sm font-medium text-petrol underline underline-offset-4 transition-colors hover:text-orange"
          >
            Ver na homepage →
          </Link>
        </motion.div>

        {/* Portal preview */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="overflow-hidden rounded-2xl border border-petrol/10 bg-bg-light shadow-lg"
          style={{ aspectRatio: "16/10" }}
        >
          <div className="flex h-full">
            {/* Mini sidebar */}
            <div className="hidden w-10 flex-shrink-0 bg-petrol sm:flex sm:flex-col sm:items-center sm:py-3 sm:gap-1">
              <div className="h-5 w-5 rounded bg-white/15 mb-2" />
              {[1,2,3,4,5].map(n => (
                <div key={n} className={`h-4 w-4 rounded ${n === 1 ? "bg-white/15" : "bg-white/5"}`} />
              ))}
            </div>
            {/* Content area */}
            <div className="flex-1 bg-[#F5F5F5] p-3 md:p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="h-2 w-20 rounded-full bg-petrol/10" />
                <div className="h-5 w-14 rounded-full bg-petrol/90 flex items-center justify-center">
                  <div className="h-1 w-8 rounded-full bg-white/40" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {[1,2,3,4,5,6].map(n => (
                  <div key={n} className="rounded-lg bg-white p-2 shadow-sm">
                    <div className="h-1.5 w-10 rounded-full bg-petrol/8 mb-1.5" />
                    <div className="h-10 rounded bg-petrol/5" />
                    <div className="mt-1.5 h-1 w-14 rounded-full bg-petrol/6" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
