"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionHeading } from "@/components/shared/SectionHeading";

const FEATURES = [
  {
    title: "Progresso em tempo real",
    description: "Sabe sempre em que fase está o teu projecto.",
  },
  {
    title: "Aprovações com timecode",
    description: "Comenta ao segundo exacto. Aprova com um clique.",
  },
  {
    title: "Mensagens directas",
    description: "Sem emails perdidos. Tudo num sítio.",
  },
  {
    title: "Documentos e contratos",
    description: "Propostas, facturas e contratos sempre acessíveis.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Portal() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 text-center md:px-10 lg:px-10">
        <Eyebrow>BEYOND FOCUS PORTAL</Eyebrow>
        <SectionHeading className="mx-auto mt-3 max-w-lg">
          O teu projecto. Sempre à mão.
        </SectionHeading>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-base text-petrol/50 leading-relaxed"
        >
          Um espaço dedicado onde acompanhas cada fase do projecto, aprovas entregas e comunicas com a equipa — tudo num só sítio.
        </motion.p>

        {/* Portal Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-[900px] overflow-hidden rounded-2xl border border-petrol/10 bg-bg-light shadow-xl"
          style={{ aspectRatio: "16/10" }}
        >
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="hidden w-[200px] flex-shrink-0 border-r border-petrol/10 bg-petrol p-4 sm:block">
              <div className="mb-6 text-sm font-bold text-white">BF Portal</div>
              <div className="space-y-2">
                {["Dashboard", "Projectos", "Mensagens", "Documentos"].map((item, i) => (
                  <div
                    key={item}
                    className={`rounded-lg px-3 py-2 text-xs font-medium ${
                      i === 0 ? "bg-white/10 text-white" : "text-white/40"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            {/* Main area */}
            <div className="flex-1 p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="h-3 w-28 rounded-full bg-petrol/10" />
                <div className="h-3 w-16 rounded-full bg-orange/20" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="rounded-xl bg-white p-3 shadow-sm">
                    <div className="mb-2 h-2 w-12 rounded-full bg-petrol/10" />
                    <div className="h-12 rounded-lg bg-petrol/5 md:h-16" />
                    <div className="mt-2 h-2 w-20 rounded-full bg-petrol/8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4 Features — grid-cols-2 md → grid-cols-4 lg */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-14 grid max-w-[900px] grid-cols-2 gap-8 lg:grid-cols-4"
        >
          {FEATURES.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants} className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-petrol/5">
                <div className="h-4 w-4 rounded-full bg-orange/30" />
              </div>
              <h3 className="text-sm font-semibold text-petrol">{feature.title}</h3>
              <p className="mt-1 text-xs text-petrol/50 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
