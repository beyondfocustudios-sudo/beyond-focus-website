"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";

export function ServicesProcess() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
        <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
          O nosso processo
        </p>
        <h2 className="mt-3 max-w-lg text-[clamp(28px,3vw,40px)] font-bold text-petrol">
          Do briefing à entrega. Sem surpresas.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-0 md:grid-cols-5">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="border-l-2 border-petrol/10 py-6 pl-6 first:border-l-orange"
            >
              <span className="font-mono text-[13px] text-orange">{step.number}</span>
              <h4 className="mt-2 text-lg font-bold text-petrol">{step.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-petrol/50">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
