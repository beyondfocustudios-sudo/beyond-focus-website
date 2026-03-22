"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SERVICES } from "@/lib/constants";

const SERVICE_COLORS = [
  "from-petrol-deep/60 to-petrol/40",
  "from-petrol/50 to-petrol-deep/60",
  "from-petrol-deep/50 to-petrol/30",
  "from-petrol/40 to-petrol-deep/50",
  "from-petrol-deep/40 to-petrol/50",
  "from-petrol/60 to-petrol-deep/40",
];

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-bg-light py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <Eyebrow>O QUE FAZEMOS</Eyebrow>
        <SectionHeading className="mt-3 max-w-md text-[clamp(28px,2.8vw,36px)]">
          Seis formas de ir mais longe.
        </SectionHeading>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — Service list */}
          <div className="space-y-0">
            {SERVICES.map((service, i) => (
              <button
                key={service.number}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`group flex w-full items-start gap-4 border-b border-petrol/10 py-5 text-left transition-all duration-300 ${
                  active === i ? "opacity-100" : "opacity-25 hover:opacity-60"
                }`}
              >
                {/* Orange bar */}
                <div
                  className={`mt-2 h-[2px] w-5 transition-all duration-300 ${
                    active === i ? "bg-orange" : "bg-transparent"
                  }`}
                />

                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-petrol/40">{service.number}</span>
                    <span className="text-lg font-semibold text-petrol">{service.title}</span>
                  </div>
                  <AnimatePresence>
                    {active === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-1 overflow-hidden text-sm text-petrol/50"
                      >
                        {service.tagline}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            ))}
          </div>

          {/* Right — Image placeholder with crossfade */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[3/4]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={`absolute inset-0 bg-gradient-to-br ${SERVICE_COLORS[active]}`}
              />
            </AnimatePresence>
            {/* Service label overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-6">
              <span className="font-mono text-[10px] tracking-[2px] uppercase text-orange">
                {SERVICES[active].number}
              </span>
              <p className="mt-1 text-lg font-semibold text-white">{SERVICES[active].title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
