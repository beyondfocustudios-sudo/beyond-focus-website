"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PROCESS_STEPS } from "@/lib/constants";

export function Process() {
  return (
    <section className="bg-bg-light py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="text-center">
          <Eyebrow>COMO TRABALHAMOS</Eyebrow>
          <SectionHeading className="mx-auto mt-3 max-w-lg">
            Do briefing à entrega. Sem surpresas.
          </SectionHeading>
        </div>

        <div className="mt-16 space-y-0">
          {PROCESS_STEPS.map((step, i) => {
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`flex flex-col items-center gap-6 border-b border-petrol/8 py-12 lg:flex-row lg:gap-16 ${
                  isLeft ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Number */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-[clamp(100px,15vw,180px)] font-bold leading-none text-petrol/[0.07] select-none"
                >
                  {step.number}
                </motion.span>

                {/* Content */}
                <div className={`flex-1 ${isLeft ? "lg:text-left" : "lg:text-right"}`}>
                  <div className={`inline-flex items-center gap-3 ${isLeft ? "" : "lg:flex-row-reverse"}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: 40 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="h-[3px] rounded-full bg-orange"
                    />
                    <h3 className="text-xl font-bold text-petrol lg:text-2xl">{step.title}</h3>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="mt-3 max-w-md text-sm leading-relaxed text-petrol/50 lg:text-base"
                  >
                    {step.description}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
