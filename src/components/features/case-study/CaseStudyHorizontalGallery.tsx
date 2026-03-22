"use client";

import { useRef, useEffect } from "react";
import type { Project } from "@/lib/portfolio-data";

export function CaseStudyHorizontalGallery({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    let trigger: { kill: () => void } | null = null;

    async function init() {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      if (!sectionRef.current || !trackRef.current) return;

      gsapModule.gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);

      const track = trackRef.current;
      const scrollWidth = track.scrollWidth - window.innerWidth;

      trigger = gsapModule.gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }).scrollTrigger as unknown as { kill: () => void };
    }

    init();
    return () => { if (trigger) trigger.kill(); };
  }, []);

  // Use real gallery images, alternate portrait/landscape
  const images = project.gallery.length > 0 ? project.gallery : [project.thumbnail];

  if (images.length < 2) return null;

  return (
    <section
      ref={sectionRef}
      className="mt-[60px] overflow-hidden bg-bg-light"
      data-cursor="gallery"
    >
      <div
        ref={trackRef}
        className="flex items-center gap-5 p-5 lg:p-[60px]"
        style={{ width: "fit-content" }}
      >
        {/* Title card */}
        <div className="flex h-[500px] w-[350px] flex-shrink-0 items-end p-10 lg:h-[600px] lg:w-[400px]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[3px] text-orange">
              Galeria
            </p>
            <h3 className="mt-2 text-[clamp(28px,3vw,40px)] font-bold leading-tight text-petrol">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Gallery images */}
        {images.map((src, i) => (
          <div
            key={i}
            className={`relative flex-shrink-0 overflow-hidden rounded-xl ${
              i % 3 === 1
                ? "h-[500px] w-[700px] lg:h-[600px] lg:w-[900px]"
                : "h-[500px] w-[350px] lg:h-[600px] lg:w-[420px]"
            }`}
          >
            <img
              src={src}
              alt={`${project.title} — ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
