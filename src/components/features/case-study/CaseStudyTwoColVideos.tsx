"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/portfolio-data";

export function CaseStudyTwoColVideos({ project }: { project: Project }) {
  if (!project.heroVideo) return null;

  return (
    <section className="mt-[100px]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="h-[60vh] overflow-hidden lg:h-screen"
          >
            <video
              src={project.heroVideo}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="h-[60vh] overflow-hidden lg:h-screen"
          >
            <video
              src={project.heroVideo}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              style={{ objectPosition: "center 30%" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
