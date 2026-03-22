"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, CATEGORIES } from "@/lib/portfolio-data";

function PortfolioCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      data-cursor="hover-link"
      onMouseEnter={() => {
        setHovered(true);
        if (videoRef.current && project.video) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        }
      }}
      onMouseLeave={() => {
        setHovered(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
      className="group block"
    >
      {/* Media */}
      <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-700 ${
            hovered && project.video ? "opacity-0" : "opacity-100"
          } ${hovered ? "scale-[1.03]" : "scale-100"}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {project.video && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* Info below card — Fortem style */}
      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <h3
            className={`text-lg font-semibold text-petrol transition-colors duration-300 lg:text-xl ${
              hovered ? "text-orange" : ""
            }`}
          >
            {project.title}
          </h3>
          <p className="mt-0.5 text-sm text-petrol/40">{project.client}</p>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[2px] text-petrol/25">
          {project.category}
        </span>
      </div>
    </Link>
  );
}

export function PortfolioGrid() {
  const [filter, setFilter] = useState("Todos os projectos");

  const filtered =
    filter === "Todos os projectos"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      {/* Filters — horizontal text, Fortem style */}
      <div className="mx-auto max-w-[1800px] border-b border-petrol/8 px-6 pb-4 md:px-10 lg:px-12">
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[14px] transition-colors duration-200 ${
                filter === cat
                  ? "font-medium text-petrol"
                  : "text-petrol/30 hover:text-petrol/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid — 2 columns desktop, Fortem style */}
      <motion.div
        layout
        className="mx-auto mt-10 grid max-w-[1800px] grid-cols-1 gap-x-5 gap-y-12 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:px-12"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <PortfolioCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
