"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/portfolio-data";

export function CaseStudyBrief({ project }: { project: Project }) {
  return (
    <section className="mx-auto mt-20 max-w-[1200px] px-6 md:px-10 lg:px-[60px]">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:gap-20">
        {/* Brief text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[3px] text-orange">
            O Briefing
          </p>
          <p className="text-lg leading-relaxed text-petrol/70 lg:text-xl">
            {project.briefText}
          </p>
        </motion.div>

        {/* Project info sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="border-l border-petrol/10 pl-8 lg:pl-10"
        >
          <div className="mb-6">
            <p className="text-[11px] font-medium uppercase tracking-[2px] text-petrol/30">
              Cliente
            </p>
            <p className="mt-1 text-[15px] font-medium text-petrol">{project.client}</p>
          </div>
          <div className="mb-6">
            <p className="text-[11px] font-medium uppercase tracking-[2px] text-petrol/30">
              Categoria
            </p>
            <p className="mt-1 text-[15px] font-medium text-petrol">{project.category}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[2px] text-petrol/30">
              Serviços
            </p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {project.services.map((s) => (
                <span key={s} className="font-mono text-[13px] text-petrol/70">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
