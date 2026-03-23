"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/portfolio-data";

export function CaseStudyHorizontalGallery({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

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
  }, [isDesktop]);

  const images = project.gallery.length > 0 ? project.gallery : [project.thumbnail];
  if (images.length < 2) return null;

  // Mobile: horizontal scroll carousel
  if (!isDesktop) {
    return (
      <section className="mt-[40px] bg-bg-light py-10" data-cursor="gallery">
        <div className="px-6 md:px-10">
          <p className="font-mono text-[11px] uppercase tracking-[3px] text-orange">Galeria</p>
          <h3 className="mt-2 text-2xl font-bold text-petrol">{project.title}</h3>
        </div>
        <div className="scrollbar-hide mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 md:px-10">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative h-[280px] w-[85vw] flex-shrink-0 snap-center overflow-hidden rounded-xl md:h-[350px] md:w-[70vw]"
            >
              <Image
                src={src}
                alt={`${project.title} — ${i + 1}`}
                fill
                className="object-cover"
                sizes="85vw"
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop: GSAP horizontal scroll
  return (
    <section
      ref={sectionRef}
      className="mt-[60px] overflow-hidden bg-bg-light"
      data-cursor="gallery"
    >
      <div
        ref={trackRef}
        className="flex items-center gap-5 p-[60px]"
        style={{ width: "fit-content" }}
      >
        {/* Title card */}
        <div className="flex h-[600px] w-[400px] flex-shrink-0 items-end p-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[3px] text-orange">Galeria</p>
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
                ? "h-[600px] w-[900px]"
                : "h-[600px] w-[420px]"
            }`}
          >
            <Image
              src={src}
              alt={`${project.title} — ${i + 1}`}
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
