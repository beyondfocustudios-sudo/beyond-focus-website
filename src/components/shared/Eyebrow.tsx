"use client";

import { motion } from "framer-motion";

interface EyebrowProps {
  children: React.ReactNode;
  light?: boolean;
}

export function Eyebrow({ children, light }: EyebrowProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`inline-block font-mono text-[11px] font-medium tracking-[3px] uppercase ${
        light ? "text-orange" : "text-orange"
      }`}
    >
      {children}
    </motion.span>
  );
}
