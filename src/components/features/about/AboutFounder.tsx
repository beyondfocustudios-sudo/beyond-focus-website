"use client";

import { motion } from "framer-motion";

export function AboutFounder() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 lg:px-[60px]">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Photo placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-xl bg-petrol/5"
          style={{ aspectRatio: "3/4" }}
        >
          <div className="absolute inset-0 flex items-end p-8">
            <p className="font-mono text-[11px] uppercase tracking-[2px] text-petrol/20">
              Foto do fundador — em breve
            </p>
          </div>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
            A história por trás da câmara
          </p>
          <h2 className="mt-3 text-[clamp(28px,3vw,40px)] font-bold leading-tight text-petrol">
            Daniel Lopes
          </h2>
          <p className="mt-1 text-base font-medium text-petrol/40">Fundador & Director Criativo</p>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-petrol/60">
            <p>
              A Beyond Focus nasceu da convicção de que as marcas portuguesas merecem produção audiovisual ao nível das melhores do mundo — sem precisar de ir a Lisboa ou ao estrangeiro.
            </p>
            <p>
              Baseados em Setúbal, trabalhamos com marcas em todo o país e internacionalmente. Desde filmes comerciais a cobertura de eventos, o nosso foco é sempre o mesmo: contar histórias que geram resultados reais.
            </p>
            <p>
              Acreditamos que um bom vídeo não é apenas bonito — é estratégico. Cada projecto começa com um objectivo de negócio claro e termina com conteúdo que o cumpre.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
