"use client";

import { motion } from "framer-motion";

const VALUES = [
  {
    title: "Rigour",
    description: "Every detail counts. From preparation to delivery, we treat every project with the best care we can give. No shortcuts — just process, attention and respect for the work.",
  },
  {
    title: "Proximity",
    description: "We work as an extension of your team. No barriers, no unnecessary formalities. When you work with us, you feel we are on your side — because we are.",
  },
  {
    title: "Results",
    description: "Pretty is not enough. Everything we create has a purpose: to move, connect and convert. If the video does not generate results, we have not done our job.",
  },
  {
    title: "Transparency",
    description: "No surprises. Clear processes, direct communication, aligned expectations from day one. If we make a mistake, we own it — and we fix it.",
  },
];

export function AboutValuesEN() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
        <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
          Our values
        </p>
        <h2 className="mt-3 max-w-lg text-[clamp(28px,3vw,40px)] font-bold text-petrol">
          What guides us.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-t-2 border-orange/30 pt-6"
            >
              <h3 className="text-xl font-bold text-petrol">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-petrol/50">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
