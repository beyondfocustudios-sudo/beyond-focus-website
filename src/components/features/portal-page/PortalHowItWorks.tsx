"use client";

import { motion } from "framer-motion";

const STEPS = [
  { num: "1", title: "Recebes o convite", description: "Após fechar projecto, recebes acesso ao portal com as tuas credenciais." },
  { num: "2", title: "Acompanhas tudo", description: "Vês o progresso em tempo real, aprovas entregas e comunicas com a equipa." },
  { num: "3", title: "Recebes a entrega", description: "Download directo dos ficheiros finais — vídeos, fotos e documentos." },
];

export function PortalHowItWorks() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
        <div className="text-center">
          <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
            Como funciona
          </p>
          <h2 className="mx-auto mt-3 max-w-lg text-[clamp(28px,3vw,40px)] leading-tight text-petrol">
            Simples como deve ser.
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1000px] grid-cols-1 gap-10 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center"
            >
              <motion.span
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 + 0.1 }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange/10 text-2xl font-bold text-orange"
              >
                {step.num}
              </motion.span>
              <h3 className="mt-5 text-lg font-bold text-petrol">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-petrol/50">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
