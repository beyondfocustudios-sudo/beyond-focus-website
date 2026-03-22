"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/portfolio-data";

export function CaseStudyBrief({ project }: { project: Project }) {
  return (
    <section className="mx-auto mt-[100px] max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[7fr_3fr_2fr] lg:gap-0">
        {/* Left — Brief text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-5 text-[clamp(28px,3vw,40px)] font-bold leading-[1.2] text-petrol">
            O briefing.
          </h2>
          <p className="text-[clamp(16px,1.4vw,20px)] leading-[1.6] text-petrol/60">
            {project.briefText}
          </p>
        </motion.div>

        {/* Spacer */}
        <div className="hidden lg:block" />

        {/* Right — Project info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="space-y-6">
            <div>
              <h5 className="mb-1 font-mono text-[11px] uppercase tracking-[2px] text-petrol/30">Cliente</h5>
              <p className="text-[15px] font-medium text-petrol">{project.client}</p>
            </div>
            <div>
              <h5 className="mb-1 font-mono text-[11px] uppercase tracking-[2px] text-petrol/30">Categoria</h5>
              <p className="text-[15px] font-medium text-petrol">{project.category}</p>
            </div>
            <div>
              <h5 className="mb-1 font-mono text-[11px] uppercase tracking-[2px] text-petrol/30">Serviços</h5>
              {project.services.map((s) => (
                <p key={s} className="text-[15px] text-petrol/70">{s}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
