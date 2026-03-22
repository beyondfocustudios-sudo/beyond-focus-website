"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/portfolio-data";

export function CaseStudyNextProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="mx-auto mt-32 max-w-[1200px] px-6 pb-20 md:px-10 lg:mt-[250px] lg:px-[60px]">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-8 font-mono text-[11px] uppercase tracking-[3px] text-petrol/30"
      >
        Próximos projectos
      </motion.p>

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
              className="group relative block overflow-hidden rounded-xl"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="font-mono text-[10px] uppercase tracking-[2px] text-orange">
                  {project.category}
                </span>
                <h3 className="mt-1 text-xl font-bold text-white transition-transform duration-300 group-hover:-translate-y-1">
                  {project.title}
                </h3>
                <p className="text-xs text-white/50">{project.client}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
