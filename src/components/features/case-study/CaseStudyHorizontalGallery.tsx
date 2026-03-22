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

  // Gallery items — mix of portrait and landscape
  const items = [
    { aspect: "portrait" as const, position: "center" },
    { aspect: "landscape" as const, position: "center 30%" },
    { aspect: "portrait" as const, position: "center 60%" },
    { aspect: "landscape" as const, position: "center" },
    { aspect: "portrait" as const, position: "center 40%" },
  ];

  return (
    <section
      ref={sectionRef}
      className="mt-[60px] overflow-hidden bg-white"
      data-cursor="gallery"
    >
      <div
        ref={trackRef}
        className="flex items-center gap-5 p-5 lg:p-[60px]"
        style={{ width: "fit-content" }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={`relative flex-shrink-0 overflow-hidden ${
              item.aspect === "portrait"
                ? "h-[500px] w-[340px] lg:h-[738px] lg:w-[512px]"
                : "h-[500px] w-[700px] lg:h-[738px] lg:w-[1332px]"
            }`}
          >
            <img
              src={project.thumbnail}
              alt={`${project.title} — ${i + 1}`}
              className="h-full w-full object-cover"
              style={{ objectPosition: item.position }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
