"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/portfolio-data";

export function CaseStudyNextProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="mx-auto mt-[250px] max-w-[1440px] px-6 pb-20 md:px-10 lg:px-[60px] max-lg:mt-[100px]">
      {/* Header row */}
      <div className="mb-8 flex items-baseline justify-between">
        <h3 className="text-[40px] font-medium text-white max-md:text-[28px]">
          Other projects to check out
        </h3>
        <Link
          href="/portfolio"
          data-cursor="hover-link"
          className="font-mono text-[15px] uppercase text-white underline underline-offset-4 max-md:hidden"
        >
          Ver todos
        </Link>
      </div>

      {/* 2 cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              href={`/portfolio/${project.slug}`}
              data-cursor="hover-link"
              className="group block"
            >
              <div className="mb-3 overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-[17px] font-medium text-white">{project.title}</p>
                <p className="text-[17px] font-light text-white/50">{project.client}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
