"use client";

import { motion } from "framer-motion";

export function SocialProofBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-[#F5F5F5] border-b border-[#0E3A45]/8"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[2px] text-[#0E3A45]/50">
            Mais de 50 projectos entregues
          </span>
          <span className="hidden h-3 w-px bg-[#0E3A45]/15 md:block" />
          <span className="font-mono text-[11px] uppercase tracking-[2px] text-[#0E3A45]/40">
            Carl Zeiss · Once Upon a House · Highgate
          </span>
          <span className="hidden h-3 w-px bg-[#0E3A45]/15 md:block" />
          <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[2px] text-[#0E3A45]/50">
            <span className="text-[#FA8334]">★</span>
            4.9/5 satisfação
          </span>
        </div>
      </div>
    </motion.div>
  );
}
