"use client";

import { motion } from "framer-motion";

interface CaseStudyBodyCopyProps {
  title: string;
  text: string;
}

export function CaseStudyBodyCopy({ title, text }: CaseStudyBodyCopyProps) {
  return (
    <section className="mx-auto mt-20 max-w-[1200px] px-6 md:px-10 lg:px-[60px]">
      <div className="max-w-[66%] max-lg:max-w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[clamp(28px,3vw,48px)] font-bold leading-[1.15] tracking-tight text-petrol"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 text-lg leading-relaxed text-petrol/60"
        >
          {text}
        </motion.p>
      </div>
    </section>
  );
}
