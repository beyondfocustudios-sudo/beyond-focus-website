"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/lib/portfolio-data";

const CATEGORIES_EN = [
  "All Projects",
  "Filmes Comerciais",
  "Vídeos Institucionais",
  "Fotografia",
  "Eventos",
  "Redes Sociais",
];

const CATEGORY_LABELS_EN: Record<string, string> = {
  "Filmes Comerciais": "Commercial Films",
  "Vídeos Institucionais": "Corporate Videos",
  "Fotografia": "Photography",
  "Eventos": "Events",
  "Redes Sociais": "Social Media",
};

function PortfolioCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="group">
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
        className="block"
      >
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
              preload="none"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>
      </Link>
      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <Link href={`/portfolio/${project.slug}`}>
            <h3
              className={`text-lg font-semibold text-petrol transition-colors duration-300 lg:text-xl ${
                hovered ? "text-orange" : ""
              }`}
            >
              {project.title}
            </h3>
          </Link>
          <p className="mt-0.5 text-sm text-petrol/40">{project.client}</p>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[2px] text-petrol/25">
          {CATEGORY_LABELS_EN[project.category] || project.category}
        </span>
      </div>
    </div>
  );
}

export function PortfolioGridEN() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("filter") || "All Projects";
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    const urlFilter = searchParams.get("filter");
    if (urlFilter && CATEGORIES_EN.includes(urlFilter)) {
      setFilter(urlFilter);
    }
  }, [searchParams]);

  const filtered =
    filter === "All Projects"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      {/* Filters */}
      <div className="mx-auto max-w-[1800px] border-b border-petrol/8 px-6 pb-4 md:px-10 lg:px-12">
        <div className="scrollbar-hide flex gap-x-6 overflow-x-auto whitespace-nowrap md:flex-wrap md:gap-x-8 md:gap-y-2 md:overflow-visible">
          {CATEGORIES_EN.map((cat) => {
            const label = cat === "All Projects" ? cat : (CATEGORY_LABELS_EN[cat] || cat);
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[14px] transition-colors duration-200 ${
                  filter === cat
                    ? "font-medium text-petrol"
                    : "text-petrol/30 hover:text-petrol/60"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="scrollbar-hide mx-auto mt-10 flex max-w-[1800px] snap-x snap-mandatory gap-5 overflow-x-auto px-6 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-12 md:overflow-visible md:px-10 lg:grid-cols-3 lg:px-12"
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
              className="w-[85vw] flex-shrink-0 snap-center md:w-auto md:flex-shrink md:snap-align-none"
            >
              <PortfolioCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
