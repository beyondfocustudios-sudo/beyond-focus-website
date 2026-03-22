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
      className="group relative block overflow-hidden rounded-xl"
      style={{ aspectRatio: "4/3" }}
    >
      <Image
        src={project.thumbnail}
        alt={project.title}
        fill
        className={`object-cover transition-all duration-500 ${
          hovered && project.video ? "opacity-0" : "opacity-100"
        } ${hovered ? "scale-105" : "scale-100"}`}
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <span className="mb-1.5 inline-block font-mono text-[10px] tracking-[2px] uppercase text-orange">
          {project.category}
        </span>
        <h3
          className={`text-lg font-bold text-white transition-transform duration-300 md:text-xl ${
            hovered ? "-translate-y-1" : ""
          }`}
        >
          {project.title}
        </h3>
        <p className="mt-0.5 text-xs text-white/50">{project.client}</p>
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
      {/* Filters */}
      <div className="mx-auto mt-10 flex max-w-[1200px] flex-wrap gap-6 px-6 md:gap-8 md:px-10 lg:px-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-sm transition-colors duration-200 ${
              filter === cat
                ? "font-medium text-petrol"
                : "text-petrol/35 hover:text-petrol/70"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="mx-auto mt-10 grid max-w-[1200px] grid-cols-1 gap-5 px-6 md:grid-cols-2 md:px-10 lg:grid-cols-3 lg:px-12"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <PortfolioCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
