"use client";

import { motion } from "framer-motion";

const VALUES = [
  { title: "Rigor", description: "Cada detalhe conta. Da preparação à entrega, não deixamos nada ao acaso." },
  { title: "Proximidade", description: "Trabalhamos como extensão da tua equipa. Sem barreiras, sem formalidades." },
  { title: "Resultados", description: "Bonito não chega. O nosso trabalho tem de mover, conectar e converter." },
  { title: "Transparência", description: "Sem surpresas. Processos claros, comunicação directa, expectativas alinhadas." },
];

export function AboutValues() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
        <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
          Os nossos valores
        </p>
        <h2 className="mt-3 max-w-lg text-[clamp(28px,3vw,40px)] font-bold text-petrol">
          No que acreditamos.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
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
