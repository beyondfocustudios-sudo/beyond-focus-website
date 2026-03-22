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
          className="lg:col-span-1"
        >
          <h2 className="mb-5 text-[40px] font-medium leading-[1.2] text-white">
            The brief.
          </h2>
          <p className="text-[20px] font-light leading-[30px] text-white">
            {project.briefText}
          </p>
        </motion.div>

        {/* Spacer */}
        <div className="hidden lg:block" />

        {/* Right — Project info (Fortem style, monospace) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="space-y-6">
            <div>
              <h5 className="mb-1 text-[17px] font-medium text-white">Cliente</h5>
              <p className="font-mono text-[17px] text-white">{project.client}</p>
            </div>
            <div>
              <h5 className="mb-1 text-[17px] font-medium text-white">Categoria</h5>
              <p className="font-mono text-[17px] text-white">{project.category}</p>
            </div>
            <div>
              <h5 className="mb-1 text-[17px] font-medium text-white">Serviços</h5>
              {project.services.map((s) => (
                <p key={s} className="font-mono text-[17px] text-white">{s}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
