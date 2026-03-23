"use client";

import { motion } from "framer-motion";

const ROWS = [
  { without: "Emails perdidos", with: "Mensagens organizadas por projecto" },
  { without: "\"Em que fase está?\"", with: "Dashboard em tempo real" },
  { without: "Feedback por email confuso", with: "Comentários ao segundo exacto" },
  { without: "Ficheiros espalhados", with: "Tudo num só sítio" },
  { without: "Aprovações demoradas", with: "Aprovação com um clique" },
];

export function PortalComparison() {
  return (
    <section className="bg-bg-light py-20 lg:py-28">
      <div className="mx-auto max-w-[900px] px-6 md:px-10">
        <div className="text-center">
          <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
            A diferença
          </p>
          <h2 className="mx-auto mt-3 max-w-lg text-[clamp(28px,3vw,40px)] leading-tight text-petrol">
            Antes e depois do portal.
          </h2>
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-petrol/10 bg-white">
          {/* Header */}
          <div className="grid grid-cols-2 border-b border-petrol/10 bg-petrol/[0.03]">
            <div className="px-6 py-4 text-center">
              <span className="font-mono text-[11px] uppercase tracking-[2px] text-petrol/30">Sem portal</span>
            </div>
            <div className="border-l border-petrol/10 px-6 py-4 text-center">
              <span className="font-mono text-[11px] uppercase tracking-[2px] text-orange">Com Beyond Focus Portal</span>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className={`grid grid-cols-2 ${i < ROWS.length - 1 ? "border-b border-petrol/5" : ""}`}
            >
              <div className="px-6 py-4 text-center text-sm text-petrol/40 line-through decoration-petrol/15">
                {row.without}
              </div>
              <div className="border-l border-petrol/10 px-6 py-4 text-center text-sm font-medium text-petrol">
                {row.with}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
