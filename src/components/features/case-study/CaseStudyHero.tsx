"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/lib/portfolio-data";

export function CaseStudyHero({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <section className="bg-bg-light pt-[160px] pb-10">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
        {/* Client + Title */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-mono text-[11px] uppercase tracking-[3px] text-petrol/40"
        >
          {project.client}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-[clamp(36px,4vw,64px)] font-bold leading-[1.1] tracking-tight text-petrol"
        >
          {project.title}
        </motion.h1>
      </div>

      {/* Hero Video with simple play/pause */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="mx-auto mt-10 max-w-[1440px] px-6 md:px-10 lg:px-[60px]"
      >
        {project.heroVideo ? (
          <div
            className="group relative cursor-pointer overflow-hidden rounded-xl"
            onClick={togglePlay}
            data-cursor="hover-link"
          >
            {/* Video */}
            <video
              ref={videoRef}
              src={project.heroVideo}
              muted
              playsInline
              preload="metadata"
              className="aspect-video w-full object-cover"
              onEnded={() => setIsPlaying(false)}
            />

            {/* Thumbnail overlay — hides when playing */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Play/Pause button — centered, simple */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-200 hover:scale-110">
                {isPlaying ? (
                  /* Pause icon */
                  <div className="flex gap-1.5">
                    <div className="h-5 w-1.5 rounded-sm bg-petrol" />
                    <div className="h-5 w-1.5 rounded-sm bg-petrol" />
                  </div>
                ) : (
                  /* Play icon */
                  <div className="ml-1 h-0 w-0 border-l-[18px] border-y-[11px] border-l-petrol border-y-transparent" />
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Photography — just thumbnail, no player */
          <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}
      </motion.div>
    </section>
  );
}
