"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/portfolio-data";

export function CaseStudyNextProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="mx-auto mt-[250px] max-w-[1800px] px-6 pb-20 md:px-10 lg:px-[60px] max-lg:mt-[100px]">
      {/* Header row */}
      <div className="mb-8 flex items-baseline justify-between">
        <h2 className="text-[clamp(24px,3vw,40px)] font-bold text-petrol">
          Outros projectos
        </h2>
        <Link
          href="/portfolio"
          data-cursor="hover-link"
          className="font-mono text-[13px] uppercase tracking-[2px] text-orange underline underline-offset-4 max-md:hidden"
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
              <div className="relative mb-4 overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-lg font-semibold text-petrol">{project.title}</p>
                  <Link
                    href={`/portfolio?filter=${encodeURIComponent(project.category)}`}
                    className="mt-0.5 inline-block font-mono text-[11px] uppercase tracking-[2px] text-orange transition-opacity hover:opacity-70"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.category}
                  </Link>
                </div>
                <p className="text-sm text-petrol/40">{project.client}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
