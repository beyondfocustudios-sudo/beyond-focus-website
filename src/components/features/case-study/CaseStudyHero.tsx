"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/portfolio-data";

export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <section className="bg-black pt-[200px]">
      {/* Client + Title */}
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:pl-[60px]">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-5 text-[20px] font-light text-white/50"
        >
          {project.client}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-[60px] max-w-[66%] text-[clamp(36px,4vw,50px)] font-medium leading-[1.15] text-white max-lg:max-w-full"
        >
          {project.title}
        </motion.h1>
      </div>

      {/* Hero Video — native controls, 16:9, rounded 10px */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]"
      >
        {project.heroVideo ? (
          <div className="overflow-hidden rounded-[10px]" style={{ aspectRatio: "16/9" }}>
            <video
              src={project.heroVideo}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="overflow-hidden rounded-[10px] bg-white/5" style={{ aspectRatio: "16/9" }}>
            <img
              src={project.thumbnail}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </motion.div>
    </section>
  );
}
