"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PROCESS_STEPS_EN = [
  { number: "01", title: "Proposal", description: "We listen to your goal, analyse the context and present a clear proposal." },
  { number: "02", title: "Concept", description: "We define the creative direction, tone and narrative of the project." },
  { number: "03", title: "Pre-Production", description: "We plan every detail — team, locations, script, logistics." },
  { number: "04", title: "Production", description: "We execute with rigour, flexibility and attention to every shot." },
  { number: "05", title: "Post-Production", description: "Editing, colour, sound and final delivery with revisions included." },
];

export function ServicesProcessEN() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
        <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
          Our process
        </p>
        <h2 className="mt-3 max-w-lg text-[clamp(28px,3vw,40px)] text-petrol">
          From briefing to delivery. No surprises.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-0 md:grid-cols-5">
          {PROCESS_STEPS_EN.map((step, i) => {
            const isActive = hovered === null || hovered === i;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`cursor-default border-l-2 py-6 pl-6 transition-all duration-300 ${
                  isActive
                    ? "border-l-orange opacity-100"
                    : "border-l-petrol/10 opacity-30"
                }`}
              >
                <span className={`font-mono text-[13px] transition-colors duration-300 ${
                  isActive ? "text-orange" : "text-petrol/30"
                }`}>
                  {step.number}
                </span>
                <h4 className="mt-2 text-lg font-bold text-petrol">{step.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-petrol/50">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
