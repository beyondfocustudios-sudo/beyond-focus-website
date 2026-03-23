"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function PortalHero() {
  return (
    <section className="bg-bg-light pt-[200px] pb-10">
      <div className="mx-auto max-w-[1440px] px-6 text-center md:px-10 lg:px-[60px]">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-mono text-[13px] uppercase tracking-[3px] text-orange"
        >
          Beyond Focus Portal
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-3xl text-[clamp(36px,5vw,64px)] leading-[1.05] tracking-tight text-petrol"
        >
          O teu projecto. Sempre à mão.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-petrol/50"
        >
          Uma plataforma exclusiva onde acompanhas cada fase do projecto, aprovas entregas e comunicas com a equipa — tudo num só sítio.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-full bg-petrol px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-petrol/90 hover:scale-[1.03]"
          >
            Fala Connosco <span>→</span>
          </Link>
          <button
            onClick={() => {
              const el = document.getElementById("features");
              if (el) el.scrollIntoView({ behavior: "instant" });
            }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-petrol/20 px-8 py-4 text-base font-semibold text-petrol transition-all duration-200 hover:border-petrol/40 hover:scale-[1.03]"
          >
            Descobre como funciona <span>↓</span>
          </button>
        </motion.div>
      </div>

      {/* Hero mockup */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-14 max-w-[1100px] px-6 md:px-10"
      >
        <div className="overflow-hidden rounded-2xl border border-petrol/10 bg-white shadow-2xl" style={{ aspectRatio: "16/10" }}>
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="hidden w-[52px] flex-shrink-0 bg-petrol sm:flex sm:flex-col sm:items-center sm:py-3 sm:gap-1">
              <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-[8px] font-bold text-white">BF</div>
              {[1,2,3,4,5,6,7].map(n => (
                <div key={n} className={`h-6 w-6 rounded-lg ${n === 1 ? "bg-white/15" : "bg-white/5"}`} />
              ))}
            </div>
            {/* Main */}
            <div className="flex-1 bg-[#F5F5F5] p-4 md:p-6">
              {/* Topbar */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-12 rounded-full bg-petrol/10" />
                  <div className="h-2 w-2 rounded-full bg-petrol/5" />
                  <div className="h-2 w-16 rounded-full bg-petrol/8" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-20 rounded bg-petrol/5" />
                  <div className="h-5 w-5 rounded-full bg-petrol/8" />
                  <div className="flex -space-x-1">
                    <div className="h-5 w-5 rounded-full bg-petrol/12 border-2 border-white" />
                    <div className="h-5 w-5 rounded-full bg-orange/20 border-2 border-white" />
                  </div>
                </div>
              </div>
              {/* Dashboard cards */}
              <div className="grid grid-cols-6 gap-2 md:gap-3">
                {/* Activity */}
                <div className="col-span-2 row-span-2 rounded-xl bg-white p-3 shadow-sm">
                  <div className="mb-2 h-2 w-20 rounded-full bg-petrol/10" />
                  {[1,2,3,4].map(n => (
                    <div key={n} className="mb-2.5 flex items-start gap-2">
                      <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-petrol/8" />
                      <div className="flex-1">
                        <div className="h-1.5 w-full rounded-full bg-petrol/8 mb-1" />
                        <div className="h-1 w-2/3 rounded-full bg-petrol/5" />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Action */}
                <div className="col-span-2 rounded-xl bg-white p-3 shadow-sm">
                  <div className="mb-1 h-2 w-16 rounded-full bg-petrol/10" />
                  <p className="text-[22px] font-bold text-petrol/70 leading-none mb-2">3</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-orange" /><div className="h-1.5 flex-1 rounded-full bg-petrol/8" /></div>
                    <div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-orange/50" /><div className="h-1.5 w-3/4 rounded-full bg-petrol/6" /></div>
                  </div>
                </div>
                {/* Project */}
                <div className="col-span-2 rounded-xl bg-white p-3 shadow-sm">
                  <div className="mb-1 h-2 w-24 rounded-full bg-petrol/10" />
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="h-3 w-20 rounded-full bg-petrol/8" />
                    <div className="h-3 w-16 rounded-full bg-orange/15" />
                  </div>
                  <div className="h-2 w-full rounded-full bg-petrol/5"><div className="h-full w-[68%] rounded-full bg-petrol/25" /></div>
                </div>
                {/* Delivery */}
                <div className="col-span-2 rounded-xl bg-petrol/90 p-3">
                  <div className="h-1.5 w-14 rounded-full bg-white/20 mb-1.5" />
                  <div className="h-2 w-20 rounded-full bg-white/40 mb-1" />
                  <p className="text-[16px] font-bold text-white/70 leading-none mt-2">15 Mar</p>
                </div>
                {/* Milestones */}
                <div className="col-span-4 rounded-xl bg-white p-3 shadow-sm">
                  <div className="mb-2 h-2 w-24 rounded-full bg-petrol/10" />
                  <div className="flex gap-4">
                    {[1,2,3].map(n => (
                      <div key={n} className="flex items-center gap-1.5">
                        <div className={`h-3 w-3 rounded-full ${n === 1 ? "bg-orange/50" : "border border-dashed border-petrol/20"}`} />
                        <div><div className="h-1 w-8 rounded-full bg-petrol/6 mb-0.5" /><div className="h-1.5 w-14 rounded-full bg-petrol/10" /></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
