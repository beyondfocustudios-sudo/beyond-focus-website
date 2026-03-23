"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PAIN_POINTS = [
  {
    pain: "Mandas um email com feedback e ninguém responde durante dias.",
    solution: "Mensagens directas organizadas por projecto. Resposta garantida.",
    icon: "✉️",
    solveIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    pain: "\"Em que fase está o meu projecto?\" — perguntas sem resposta clara.",
    solution: "Dashboard em tempo real. Progresso, milestones e timeline sempre visíveis.",
    icon: "❓",
    solveIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    pain: "Feedback num email de 500 palavras. O editor não sabe a que momento te referes.",
    solution: "Comentários ao segundo exacto no vídeo. Claro, visual, sem ambiguidade.",
    icon: "😵",
    solveIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    pain: "Ficheiros no WeTransfer, contratos no email, facturas no WhatsApp.",
    solution: "Tudo num só sítio. Documentos, entregas e contratos sempre acessíveis.",
    icon: "📂",
    solveIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20h16a2 2 0 002-2V8a2 2 0 00-2-2h-7.93a2 2 0 01-1.66-.9l-.82-1.2A2 2 0 007.93 3H4a2 2 0 00-2 2v13a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    pain: "\"Podes reenviar o vídeo? Não sei qual é a versão final.\"",
    solution: "Histórico de versões completo. A versão certa, sempre à mão.",
    icon: "🔄",
    solveIcon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
];

export function PortalComparison() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-bg-light py-24 lg:py-32">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
            Reconheces-te nisto?
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-[clamp(28px,3vw,40px)] leading-tight text-petrol">
            As dores que resolvemos.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-petrol/40">
            Se já trabalhaste com uma produtora, provavelmente passaste por isto.
          </p>
        </motion.div>

        {/* Pain → Solution cards */}
        <div className="mt-16 space-y-4">
          {PAIN_POINTS.map((item, i) => {
            const isActive = hoveredIndex === null || hoveredIndex === i;
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`grid grid-cols-1 overflow-hidden rounded-2xl border transition-all duration-300 md:grid-cols-2 ${
                  isActive ? "opacity-100" : "opacity-40"
                } ${
                  isHovered
                    ? "border-orange/20 shadow-lg shadow-orange/5"
                    : "border-petrol/8"
                }`}
              >
                {/* Pain — left */}
                <div className={`flex items-start gap-4 p-6 transition-colors duration-300 lg:p-8 ${
                  isHovered ? "bg-petrol/[0.03]" : "bg-white"
                }`}>
                  <span className="mt-0.5 text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <span className="mb-1 inline-block font-mono text-[10px] uppercase tracking-[2px] text-red-400/60">O problema</span>
                    <p className={`text-[15px] leading-relaxed transition-colors duration-300 ${
                      isHovered ? "text-petrol/40 line-through decoration-petrol/15" : "text-petrol/60"
                    }`}>
                      {item.pain}
                    </p>
                  </div>
                </div>

                {/* Solution — right */}
                <div className={`flex items-start gap-4 border-t border-petrol/5 p-6 transition-colors duration-300 md:border-l md:border-t-0 lg:p-8 ${
                  isHovered ? "bg-orange/[0.03]" : "bg-bg-light"
                }`}>
                  <div className={`mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                    isHovered ? "text-orange" : "text-petrol/25"
                  }`}>
                    {item.solveIcon}
                  </div>
                  <div>
                    <span className="mb-1 inline-block font-mono text-[10px] uppercase tracking-[2px] text-orange/60">A solução</span>
                    <p className={`text-[15px] font-medium leading-relaxed transition-colors duration-300 ${
                      isHovered ? "text-petrol" : "text-petrol/70"
                    }`}>
                      {item.solution}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
