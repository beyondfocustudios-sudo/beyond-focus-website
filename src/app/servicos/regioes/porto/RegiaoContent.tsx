"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { faqItems } from "./porto-data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-petrol/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 text-lg font-medium text-petrol">{question}</span>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-content rounded-full bg-petrol/5 text-petrol transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-base leading-relaxed text-petrol/70">{answer}</p>
      </motion.div>
    </div>
  );
}

export function PortoContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-petrol-deep pt-[200px] pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-4 font-mono text-xs font-semibold tracking-[3px] uppercase text-orange"
          >
            Regiões
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              ...fadeUp,
              visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: 0.1 } },
            }}
            className="max-w-3xl text-4xl leading-tight text-white md:text-5xl lg:text-6xl"
          >
            Produção audiovisual no Porto
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={{
              ...fadeUp,
              visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: 0.2 } },
            }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            Produtora de vídeo com base em Lisboa, a trabalhar regularmente no Porto e Norte de Portugal.
            Filmes comerciais, vídeos institucionais e fotografia para marcas que querem resultados.
          </motion.p>
        </div>
      </section>

      {/* Vantagem */}
      <section className="bg-bg-light py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h2 className="text-3xl text-petrol md:text-4xl">O Porto como palco para marcas com ambição</h2>
            <p className="mt-6 text-lg leading-relaxed text-petrol/70">
              O Porto é uma das cidades mais fotografadas da Europa — e também uma das mais exigentes para captar bem.
              A luz do Douro, a arquitectura azulejar, a energia dos bairros históricos e a modernidade da Foz criam
              um contexto visual único que poucas equipas sabem realmente aproveitar.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-petrol/70">
              Trabalhamos com marcas no Porto que querem comunicar qualidade, autenticidade e identidade — hotéis
              boutique, restaurantes de fine dining, empresas de tecnologia e lifestyle que precisam de conteúdo
              audiovisual à altura das suas ambições.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Serviços */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="max-w-3xl text-3xl text-petrol md:text-4xl">
              O que produzimos para empresas no Porto
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
              {[
                "Filmes comerciais para hotéis e restaurantes",
                "Brand films para marcas com identidade forte",
                "Vídeos institucionais para empresas do Norte",
                "Fotografia de espaços, produtos e equipas",
                "Conteúdo para redes sociais (reels, stories, posts)",
                "Filmagem com drone no Douro e litoral norte",
              ].map((service) => (
                <li key={service} className="flex items-start gap-3">
                  <span className="mt-2 block h-2.5 w-2.5 shrink-0 rounded-full bg-orange" />
                  <span className="text-base leading-relaxed text-petrol/80">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Contexto local */}
      <section className="bg-bg-light py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h2 className="text-3xl text-petrol md:text-4xl">Do Douro à Foz — contexto visual incomparável</h2>
            <p className="mt-6 text-lg leading-relaxed text-petrol/70">
              O Vale do Douro é Património da Humanidade e um dos mais procurados destinos de enoturismo do mundo.
              O Porto histórico combina granito, azulejo e contemporaneidade num cenário que praticamente se filma
              sozinho — se tiveres a equipa certa.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-petrol/70">
              Para hotéis, quintas do Douro, restaurantes e marcas de turismo no Norte, o audiovisual é o principal
              motor de atracção de clientes internacionais. Um filme bem produzido comunica em qualquer língua — e
              converte antes do cliente sequer entrar em contacto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h2 className="text-3xl text-petrol md:text-4xl">Perguntas frequentes</h2>
            <div className="mt-10">
              {faqItems.map((item) => (
                <FAQItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-petrol py-20 text-center text-white">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl">Tens um projecto no Porto ou Norte de Portugal?</h2>
            <p className="mt-4 text-lg text-white/60">Conta-nos o que precisas. A primeira conversa é nossa.</p>
            <Link
              href="/contacto"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-orange/90 active:scale-[0.97]"
            >
              Fala Connosco
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
