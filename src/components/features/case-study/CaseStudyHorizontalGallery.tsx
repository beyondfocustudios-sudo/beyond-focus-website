"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import type { Project } from "@/lib/portfolio-data";

export function CaseStudyHorizontalGallery({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    let gsapModule: typeof import("gsap") | null = null;
    let scrollTriggerModule: { ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger } | null = null;
    let trigger: { kill: () => void } | null = null;

    async function init() {
      gsapModule = await import("gsap");
      scrollTriggerModule = await import("gsap/ScrollTrigger") as unknown as typeof scrollTriggerModule;
      if (!gsapModule || !scrollTriggerModule || !sectionRef.current || !trackRef.current) return;

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

    return () => {
      if (trigger) trigger.kill();
    };
  }, []);

  // Gallery cards from project thumbnail (repeated with different crops as placeholder)
  const galleryItems = [
    { src: project.thumbnail, aspect: "portrait" as const },
    { src: project.thumbnail, aspect: "landscape" as const },
    { src: project.thumbnail, aspect: "portrait" as const },
    { src: project.thumbnail, aspect: "landscape" as const },
    { src: project.thumbnail, aspect: "portrait" as const },
  ];

  return (
    <section
      ref={sectionRef}
      className="mt-20 overflow-hidden bg-white"
      data-cursor="gallery"
    >
      <div
        ref={trackRef}
        className="flex items-center gap-5 px-10 py-20"
        style={{ width: "fit-content" }}
      >
        {/* Title card */}
        <div className="flex h-[500px] w-[400px] flex-shrink-0 items-end p-10 lg:h-[600px]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[3px] text-orange">
              Galeria
            </p>
            <h3 className="mt-2 text-[clamp(28px,3vw,40px)] font-bold leading-tight text-petrol">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Gallery cards */}
        {galleryItems.map((item, i) => (
          <div
            key={i}
            className={`relative flex-shrink-0 overflow-hidden rounded-xl ${
              item.aspect === "portrait"
                ? "h-[500px] w-[350px] lg:h-[600px] lg:w-[400px]"
                : "h-[500px] w-[700px] lg:h-[600px] lg:w-[850px]"
            }`}
          >
            <Image
              src={item.src}
              alt={`${project.title} — ${i + 1}`}
              fill
              className="object-cover"
              style={{
                objectPosition: i % 2 === 0 ? "center" : "center 30%",
              }}
              sizes="850px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
