"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const SLUG_MAP: Record<string, string> = {
  "01": "filmes-comerciais",
  "02": "videos-institucionais",
  "03": "documentarios",
  "04": "redes-sociais",
  "05": "fotografia",
  "06": "eventos",
  "07": "estrategia",
};

interface ServiceBlockProps {
  service: {
    num: string;
    title: string;
    tagline: string;
    description: string;
    image: string;
  };
  reversed: boolean;
}

export function ServiceBlock({ service, reversed }: ServiceBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`grid grid-cols-1 items-center gap-10 border-b border-petrol/8 py-16 lg:grid-cols-2 lg:gap-20 ${
        reversed ? "lg:[direction:rtl]" : ""
      }`}
    >
      {/* Text */}
      <div className={reversed ? "lg:[direction:ltr]" : ""}>
        <span className="font-mono text-[13px] text-orange">{service.num}</span>
        <h2 className="mt-2 text-[clamp(24px,2.5vw,36px)] font-bold leading-tight text-petrol">
          {service.title}
        </h2>
        <p className="mt-2 text-base font-medium italic text-petrol/50">{service.tagline}</p>
        <p className="mt-4 text-base leading-relaxed text-petrol/60">{service.description}</p>
        <Link
          href={`/servicos/${SLUG_MAP[service.num] || ""}`}
          className="mt-5 inline-block text-sm font-semibold text-petrol underline decoration-orange/40 underline-offset-4 transition-colors hover:text-orange hover:decoration-orange"
        >
          Saber mais →
        </Link>
      </div>

      {/* Image */}
      <div className={`relative overflow-hidden rounded-xl ${reversed ? "lg:[direction:ltr]" : ""}`} style={{ aspectRatio: "4/3" }}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </motion.div>
  );
}
