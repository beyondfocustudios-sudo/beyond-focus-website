"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionHeading } from "@/components/shared/SectionHeading";

const PORTFOLIO_ITEMS = [
  {
    title: "Hotel Casa Palmela",
    category: "FILME COMERCIAL",
    thumbnail: "/images/portfolio/hcp-thumb.jpg",
    video: "/videos/portfolio/hcp-final.mp4",
  },
  {
    title: "Carl Zeiss Portugal",
    category: "VÍDEO INSTITUCIONAL",
    thumbnail: "/images/portfolio/zeiss-thumb.jpg",
    video: "/videos/portfolio/zeiss-bts.mp4",
  },
  {
    title: "Highgate Portugal",
    category: "EVENTOS",
    thumbnail: "/images/portfolio/highgate-thumb.jpg",
    video: "/videos/portfolio/highgate-sesimbra.mp4",
  },
  {
    title: "Amoretti Lux",
    category: "FOTOGRAFIA",
    thumbnail: "/images/portfolio/amoretti-thumb.jpg",
    video: null,
  },
  {
    title: "Soce by Mauro Loureiro",
    category: "REDES SOCIAIS",
    thumbnail: "/images/portfolio/soce-mauro-thumb.jpg",
    video: "/videos/portfolio/soce-mauro.mp4",
  },
  {
    title: "Lobsters",
    category: "REDES SOCIAIS · EVENTOS",
    thumbnail: "/images/portfolio/lobsters-thumb.jpg",
    video: "/videos/portfolio/lobsters.mp4",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ── Portfolio Card with hover video ── */
function PortfolioCard({
  title,
  category,
  thumbnail,
  video,
}: {
  title: string;
  category: string;
  thumbnail: string;
  video: string | null;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Preload video when component mounts
  useEffect(() => {
    if (!video || !videoRef.current) return;
    const v = videoRef.current;
    v.load();
    const onCanPlay = () => setVideoReady(true);
    v.addEventListener("canplaythrough", onCanPlay);
    return () => v.removeEventListener("canplaythrough", onCanPlay);
  }, [video]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && video) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const showVideo = isHovered && video && videoReady;

  return (
    <motion.article
      variants={cardVariants}
      data-cursor="hover-link"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative min-w-[clamp(280px,40vw,520px)] flex-shrink-0 overflow-hidden rounded-xl md:min-w-[clamp(320px,35vw,480px)]"
      style={{ scrollSnapAlign: "start", aspectRatio: "3/4" }}
    >
      {/* Thumbnail — always rendered as base layer */}
      <Image
        src={thumbnail}
        alt={title}
        fill
        className={`object-cover transition-all duration-500 ${
          showVideo ? "opacity-0" : "opacity-100"
        } ${isHovered && !video ? "scale-105" : "scale-100"}`}
        sizes="(max-width: 768px) 85vw, 40vw"
      />

      {/* Video — preloaded, fills card with crop */}
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Dark overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
        <span className="mb-2 inline-block font-mono text-[10px] tracking-[2px] uppercase text-orange">
          {category}
        </span>
        <h3
          className={`text-2xl font-bold text-white transition-transform duration-300 ${
            isHovered ? "-translate-y-1" : "translate-y-0"
          }`}
        >
          {title}
        </h3>
      </div>
    </motion.article>
  );
}

export function Portfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleDragLeave = () => setIsDragging(false);

  return (
    <section className="bg-petrol py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <Eyebrow light>TRABALHOS SELECCIONADOS</Eyebrow>
            <SectionHeading light className="mt-3">
              O nosso trabalho fala por nós.
            </SectionHeading>
          </div>
          <Link
            href="/portfolio"
            data-cursor="hover-link"
            className="hidden text-sm font-medium text-white/60 transition-colors hover:text-orange sm:block"
          >
            Ver tudo →
          </Link>
        </div>
      </div>

      {/* Horizontal Scroll — drag to navigate */}
      <motion.div
        ref={scrollRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        data-cursor="gallery"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleDragLeave}
        className={`scrollbar-hide flex gap-5 overflow-x-auto px-6 pb-4 md:px-10 lg:px-12 ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        style={{ scrollSnapType: isDragging ? "none" : "x mandatory" }}
      >
        {PORTFOLIO_ITEMS.map((item) => (
          <PortfolioCard
            key={item.title}
            title={item.title}
            category={item.category}
            thumbnail={item.thumbnail}
            video={item.video}
          />
        ))}
      </motion.div>

      {/* Mobile "Ver tudo" */}
      <div className="mt-6 px-6 sm:hidden">
        <Link href="/portfolio" className="text-sm font-medium text-white/60 hover:text-orange">
          Ver tudo →
        </Link>
      </div>
    </section>
  );
}
