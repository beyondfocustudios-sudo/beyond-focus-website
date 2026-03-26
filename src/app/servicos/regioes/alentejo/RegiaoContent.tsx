"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { faqItems } from "./alentejo-data";

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

export function AlentejoContent() {
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
            Produção audiovisual no Alentejo
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
            Produção de vídeo no Alentejo para hotéis de turismo rural, vinícolas, herdades e marcas
            gastronómicas. Conteúdo que comunica a autenticidade e o ritmo singular desta região.
          </motion.p>
        </div>
      </section>

      {/* Contexto e oportunidade */}
      <section className="bg-bg-light py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h2 className="text-3xl text-petrol md:text-4xl">O Alentejo como vantagem competitiva</h2>
            <p className="mt-6 text-lg leading-relaxed text-petrol/70">
              O Alentejo tornou-se um dos destinos mais procurados por turistas nacionais e internacionais que fogem do ritmo
              acelerado das cidades. Herdades, vinícolas e hotéis rurais têm uma oportunidade única: comunicar uma experiência
              que não existe em mais lado nenhum — a luz dourada do Alentejo, o silêncio, a gastronomia, o vinho.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-petrol/70">
              A maioria das propriedades alentejanas ainda comunica com fotografias estáticas e textos genéricos. Um brand film
              ou vídeo de experiência bem produzido posiciona-as num nível completamente diferente — e atrai o cliente que
              valoriza e paga pela autenticidade.
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
              O que produzimos para empresas no Alentejo
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
              {[
                "Brand films para hotéis rurais e turismo de natureza",
                "Vídeos para vinícolas e enoturismo",
                "Fotografia de interiores, gastronomia e paisagem",
                "Conteúdo para redes sociais orientado a turismo",
                "Filmagem aérea com drone de propriedades e paisagem",
                "Documentários curtos sobre história e tradição local",
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

      {/* Sectores específicos */}
      <section className="bg-bg-light py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h2 className="text-3xl text-petrol md:text-4xl">Turismo rural, vinho e gastronomia</h2>
            <p className="mt-6 text-lg leading-relaxed text-petrol/70">
              O turismo de vinho é um dos segmentos de maior crescimento em Portugal. As vinícolas alentejanas recebem
              visitantes de todo o mundo — e precisam de conteúdo que comunique em inglês, alemão, francês e espanhol, além
              do mercado interno. Produzimos vídeos de enoturismo que mostram desde a vinha à cave, passando pela experiência
              de prova e pela gastronomia local.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-petrol/70">
              Para hotéis rurais e herdades com alojamento, o conteúdo visual é o primeiro contacto com o cliente. A
              atmosfera de um espaço — a piscina ao amanhecer, a mesa posta sob as oliveiras, o silêncio do entardecer —
              só se comunica com imagem em movimento. O texto não chega.
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
            <h2 className="text-3xl md:text-4xl">Tens um projecto no Alentejo?</h2>
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
