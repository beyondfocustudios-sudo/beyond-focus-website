"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, CATEGORIES } from "@/lib/portfolio-data";

const BLUR_DATA = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54teledu/9k=";

function PortfolioCard({ project, priority = false }: { project: (typeof PROJECTS)[0]; priority?: boolean }) {
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
        {/* Media */}
        <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
          <Image
            src={project.thumbnail}
            alt={`${project.category} — ${project.title} | Beyond Focus`}
            fill
            className={`object-cover transition-all duration-700 ${
              hovered && project.video ? "opacity-0" : "opacity-100"
            } ${hovered ? "scale-[1.03]" : "scale-100"}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA}
            priority={priority}
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

      {/* Info below card */}
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
        <Link
          href={`/portfolio?filter=${encodeURIComponent(project.category)}`}
          className="font-mono text-[11px] uppercase tracking-[2px] text-petrol/25 transition-colors hover:text-orange"
        >
          {project.category}
        </Link>
      </div>
    </div>
  );
}

export function PortfolioGrid() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("filter") || "Todos os projectos";
  const [filter, setFilter] = useState(initialFilter);

  // Sync with URL params
  useEffect(() => {
    const urlFilter = searchParams.get("filter");
    if (urlFilter && CATEGORIES.includes(urlFilter)) {
      setFilter(urlFilter);
    }
  }, [searchParams]);

  const filtered =
    filter === "Todos os projectos"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      {/* Filters */}
      <div className="mx-auto max-w-[1800px] border-b border-petrol/8 px-6 pb-4 md:px-10 lg:px-12">
        <div className="scrollbar-hide flex gap-x-6 overflow-x-auto whitespace-nowrap md:flex-wrap md:gap-x-8 md:gap-y-2 md:overflow-visible">
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

      {/* Grid — horizontal scroll on mobile, grid on tablet+ */}
      <motion.div
        layout
        className="scrollbar-hide mx-auto mt-10 flex max-w-[1800px] snap-x snap-mandatory gap-5 overflow-x-auto px-6 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-12 md:overflow-visible md:px-10 lg:grid-cols-3 lg:px-12"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="w-[85vw] flex-shrink-0 snap-center md:w-auto md:flex-shrink md:snap-align-none"
            >
              <PortfolioCard project={project} priority={i === 0} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
