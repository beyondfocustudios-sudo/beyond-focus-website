"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { faqItems } from "./setubal-data";

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
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-petrol/5 text-petrol transition-transform duration-200"
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

export function SetúbalContent() {
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
            Produção audiovisual em Setúbal
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
            Produtora de vídeo em Lisboa, a trabalhar em Setúbal, Arrábida, Tróia e Costa Azul.
            Filmes comerciais, vídeos institucionais e fotografia para empresas da região.
          </motion.p>
        </div>
      </section>

      {/* Proximidade e vantagem local */}
      <section className="bg-bg-light py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h2 className="text-3xl text-petrol md:text-4xl">A vantagem de trabalhar com uma equipa que conhece a região</h2>
            <p className="mt-6 text-lg leading-relaxed text-petrol/70">
              Setúbal tem um dos mais belos enquadramentos naturais de Portugal — a Serra da Arrábida, o estuário do Sado,
              as praias da Costa Azul. Para empresas da região, esse contexto é um activo visual que raras vezes é aproveitado
              com a qualidade que merece.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-petrol/70">
              Trabalhamos regularmente na região, com deslocações a partir de Lisboa em menos de uma hora. Conhecemos os
              locais, as condições de luz, as permissões necessárias para filmagem nos parques naturais, e os melhores
              momentos do ano para captar cada tipo de conteúdo.
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
              O que produzimos para empresas em Setúbal
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
              {[
                "Filmes comerciais para hotéis e turismo rural",
                "Vídeos institucionais para empresas locais",
                "Fotografia de espaços, produtos e equipas",
                "Conteúdo para redes sociais (reels, stories, posts)",
                "Cobertura de eventos e cerimónias",
                "Filmagem com drone na Arrábida e Costa Azul",
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
            <h2 className="text-3xl text-petrol md:text-4xl">Arrábida, Tróia e Costa Azul como cenário</h2>
            <p className="mt-6 text-lg leading-relaxed text-petrol/70">
              Poucos territórios em Portugal oferecem a diversidade visual da região de Setúbal. A Arrábida tem as águas
              mais claras do país. Tróia oferece praias desertas e arquitectura contemporânea de resort. A Costa Azul combina
              paisagem atlântica com autenticidade local — palco perfeito para marcas que querem associar a sua imagem a
              qualidade de vida e território.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-petrol/70">
              Para hotéis, quintas, restaurantes e empresas de turismo da região, o conteúdo audiovisual é o principal meio
              de atracção de clientes nacionais e internacionais. O retorno de um filme bem produzido mede-se em reservas,
              em tráfego orgânico, e na percepção diferenciada que os clientes têm antes de entrar pela porta.
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
            <h2 className="text-3xl md:text-4xl">Tens um projecto em Setúbal ou Costa Azul?</h2>
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
