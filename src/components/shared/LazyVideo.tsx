"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

export function LazyVideo({
  src,
  poster,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
}: LazyVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div ref={ref} className={className}>
      {isInView ? (
        <video
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload="metadata"
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      ) : poster ? (
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      ) : (
        <div className="h-full w-full bg-petrol-deep" />
      )}
    </div>
  );
}
