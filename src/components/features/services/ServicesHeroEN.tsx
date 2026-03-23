"use client";

import { motion } from "framer-motion";

export function ServicesHeroEN() {
  return (
    <section className="bg-petrol-deep pt-[200px] pb-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-mono text-[13px] uppercase tracking-[3px] text-orange"
        >
          Services
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-3xl text-[clamp(36px,5vw,64px)] font-bold leading-[1.05] tracking-tight text-white"
        >
          Everything you need to tell your story.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/50"
        >
          From strategy to final delivery, we cover every stage of audiovisual production. Each service is designed to generate real results.
        </motion.p>
      </div>
    </section>
  );
}
