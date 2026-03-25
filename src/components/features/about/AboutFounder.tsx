"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutFounder() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 lg:px-[60px]">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-xl"
          style={{ aspectRatio: "3/4" }}
        >
          <Image
            src="/images/daniel-lopes-fundador.jpg"
            alt="Daniel Lopes — Fundador & Director Criativo da Beyond Focus"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
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

      {/* Collaborators */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20"
      >
        <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
          A nossa rede
        </p>
        <h3 className="mt-3 text-[clamp(24px,2.5vw,36px)] font-bold text-petrol">
          Colaboramos com mais de 30+ profissionais
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-petrol/60">
          Para garantir o melhor resultado em cada projecto, trabalhamos com uma rede de mais de 30 profissionais especializados de diversas áreas — desde directores de fotografia e actores, a músicos, motion designers, copy writers e especialistas em marketing digital. Cada equipa é construída à medida do projecto.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {[
            "Directores de Fotografia",
            "Operadores de Câmara",
            "Pilotos de Drone",
            "Motion Designers",
            "Actores & Casting",
            "Músicos & Sound Design",
            "Copywriters",
            "Fotógrafos",
            "Coloristas",
            "Especialistas em Marketing",
            "Produtores de Eventos",
            "Designers Gráficos",
          ].map((area, i) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-2 rounded-xl border border-petrol/10 bg-petrol/[0.03] px-4 py-3"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
              <span className="text-[13px] font-medium text-petrol/70">{area}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
