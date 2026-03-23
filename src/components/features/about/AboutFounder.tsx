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
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-petrol/10">
                <span className="text-2xl font-bold text-petrol/30">DL</span>
              </div>
              <p className="mt-4 text-sm font-medium text-petrol/30">Daniel Lopes</p>
              <p className="text-xs text-petrol/20">Fundador & Director Criativo</p>
            </div>
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
              A paixão pelo audiovisual não começou numa sala de aula — começou numa sala de estar, a ver filmes. Enquanto a maioria via séries, eu passava horas a ver cinema. Quando a minha mãe me ofereceu a minha primeira câmara, o que era curiosidade passou a ser direcção.
            </p>
            <p>
              Estudei Multimédia no ISEC, em Lisboa. Aprendi o básico, mas o que realmente me formou foi o trabalho autónomo — horas a filmar, a editar, a errar e a repetir. Terminei a faculdade, fiz o estágio, e em 2023, com 20 anos, fundei a Beyond Focus.
            </p>
            <p>
              Os primeiros dois anos não foram fáceis. Houve muitos altos, mas também muitos baixos. A diferença é que os baixos nunca nos pararam — serviram para nos lembrar porque é que começámos. Cada &ldquo;não&rdquo; que ouvimos foi um passo mais perto do &ldquo;sim&rdquo; que mudou tudo.
            </p>
            <p>
              Hoje, o objectivo é claro: quando alguém em Portugal pensar em vídeo de alta qualidade com resultados reais, quero que pense na Beyond Focus. Não por sermos os maiores — mas por sermos os que tratam cada projecto como se fosse o único.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Philosophy block */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 rounded-2xl bg-petrol p-10 lg:p-16"
      >
        <h3 className="text-[clamp(24px,2.5vw,36px)] font-bold text-white">
          99 nãos para chegar ao sim.
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
          Se soubesses que precisavas de ouvir 99 &ldquo;nãos&rdquo; para chegar ao teu primeiro &ldquo;sim&rdquo; — não ias querer ouvir cada &ldquo;não&rdquo; o mais rápido possível? Esta forma de pensar define como encaramos cada desafio. Cada recusa é um passo. Cada obstáculo é progresso. E quando o &ldquo;sim&rdquo; chega, sabemos exactamente quanto vale.
        </p>
      </motion.div>
    </section>
  );
}
