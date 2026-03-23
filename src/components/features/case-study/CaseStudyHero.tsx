"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/lib/portfolio-data";

export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <section className="bg-white pt-[200px]">
      {/* Client + Title */}
      <div className="mx-auto max-w-[1800px] px-6 md:px-10 lg:pl-[60px]">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-5 font-mono text-[13px] uppercase tracking-[3px] text-orange"
        >
          {project.client}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-[60px] max-w-[66%] text-[clamp(36px,4vw,50px)] font-bold leading-[1.15] tracking-tight text-petrol max-lg:max-w-full"
        >
          {project.title}
        </motion.h1>
      </div>

      {/* Hero Video — native controls, 16:9, rounded 12px */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mx-auto max-w-[1800px] px-6 md:px-10 lg:px-[60px]"
      >
        {project.heroVideo ? (
          <div className="overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
            <video
              src={project.heroVideo}
              controls
              controlsList="nodownload noremoteplayback noplaybackrate"
              disablePictureInPicture
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        )}
      </motion.div>
    </section>
  );
}
