"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/portfolio-data";

export function CaseStudyBrief({ project }: { project: Project }) {
  return (
    <section className="mx-auto mt-20 max-w-[1200px] px-6 md:px-10 lg:px-[60px]">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_380px]">
        {/* Left — Brief text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[clamp(28px,3vw,40px)] font-bold leading-tight tracking-tight text-petrol">
            The brief.
          </h2>
          <p className="mt-6 text-lg leading-[1.7] text-petrol/60 lg:text-[19px]">
            {project.briefText}
          </p>
        </motion.div>

        {/* Right — Project info (Fortem style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="space-y-0 border-t border-petrol/10">
            {/* Client */}
            <div className="flex items-baseline justify-between border-b border-petrol/10 py-4">
              <span className="text-[13px] text-petrol/40">Cliente</span>
              <span className="text-[15px] font-medium text-petrol">{project.client}</span>
            </div>

            {/* Category */}
            <div className="flex items-baseline justify-between border-b border-petrol/10 py-4">
              <span className="text-[13px] text-petrol/40">Categoria</span>
              <span className="text-[15px] font-medium text-petrol">{project.category}</span>
            </div>

            {/* Services */}
            <div className="flex items-baseline justify-between border-b border-petrol/10 py-4">
              <span className="text-[13px] text-petrol/40">Serviços</span>
              <div className="flex flex-wrap justify-end gap-x-3 gap-y-1">
                {project.services.map((s, i) => (
                  <span key={s} className="text-[15px] font-medium text-petrol">
                    {s}{i < project.services.length - 1 ? "," : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
