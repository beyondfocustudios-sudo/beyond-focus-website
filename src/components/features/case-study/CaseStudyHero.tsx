"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/portfolio-data";

export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <section className="bg-bg-light pt-[160px] pb-10">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-[60px]">
        {/* Client + Title */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-mono text-[11px] uppercase tracking-[3px] text-petrol/40"
        >
          {project.client}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-[clamp(36px,4vw,64px)] font-bold leading-[1.1] tracking-tight text-petrol"
        >
          {project.title}
        </motion.h1>
      </div>

      {/* Hero Video/Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mx-auto mt-10 max-w-[1200px] px-6 md:px-10 lg:px-[60px]"
      >
        {project.heroVideo ? (
          <video
            src={project.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="aspect-video w-full rounded-xl object-cover"
          />
        ) : (
          <div className="aspect-video w-full rounded-xl bg-petrol/10" />
        )}
      </motion.div>
    </section>
  );
}
