"use client";

import { motion } from "framer-motion";

const VALUES = [
  {
    title: "Rigor",
    description: "Cada detalhe conta. Da preparação à entrega, tratamos cada projecto com o melhor cuidado que podemos dar. Não há atalhos — há processo, atenção e respeito pelo trabalho.",
  },
  {
    title: "Proximidade",
    description: "Trabalhamos como extensão da tua equipa. Sem barreiras, sem formalidades desnecessárias. Quando trabalhas connosco, sentes que estamos do teu lado — porque estamos.",
  },
  {
    title: "Resultados",
    description: "Bonito não chega. Cada peça que criamos tem um propósito: mover, conectar e converter. Se o vídeo não gera resultados, não fizemos o nosso trabalho.",
  },
  {
    title: "Transparência",
    description: "Sem surpresas. Processos claros, comunicação directa, expectativas alinhadas desde o primeiro dia. Se erramos, assumimos — e resolvemos.",
  },
];

export function AboutValues() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
        <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
          Os nossos valores
        </p>
        <h2 className="mt-3 max-w-lg text-[clamp(28px,3vw,40px)] font-bold text-petrol">
          O que nos guia.
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
