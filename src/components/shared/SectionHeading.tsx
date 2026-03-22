"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

export function SectionHeading({ children, light, className = "" }: SectionHeadingProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`text-[clamp(28px,3vw,40px)] font-bold leading-tight tracking-tight ${
        light ? "text-white" : "text-petrol"
      } ${className}`}
    >
      {children}
    </motion.h2>
  );
}
