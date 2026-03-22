"use client";

import { motion } from "framer-motion";

interface CaseStudyBodyCopyProps {
  title: string;
  text: string;
}

export function CaseStudyBodyCopy({ title, text }: CaseStudyBodyCopyProps) {
  return (
    <section className="mx-auto mt-[60px] max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
      <div className="max-w-[50%] max-lg:max-w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[40px] font-medium leading-[48px] text-white"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 text-[20px] font-light leading-[30px] text-white"
        >
          {text}
        </motion.p>
      </div>
    </section>
  );
}
