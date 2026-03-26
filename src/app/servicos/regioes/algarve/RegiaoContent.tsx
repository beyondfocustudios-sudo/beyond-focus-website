"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { faqItems } from "./algarve-data";

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

export function AlgarveContent() {
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
            Produção audiovisual no Algarve
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
            Conteúdo audiovisual para resorts, hotéis e marcas de turismo na região mais visitada de Portugal.
            Da Costa Vicentina a Tavira — produção com qualidade para um mercado exigente e internacional.
          </motion.p>
        </div>
      </section>

      {/* O mercado do Algarve */}
      <section className="bg-bg-light py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h2 className="text-3xl text-petrol md:text-4xl">O mercado mais competitivo do turismo português</h2>
            <p className="mt-6 text-lg leading-relaxed text-petrol/70">
              O Algarve recebe mais de quatro milhões de turistas por ano. A concorrência entre hotéis, resorts e alojamentos
              locais é intensa — e o cliente internacional compara dezenas de opções antes de reservar. Nesse contexto, o
              conteúdo visual não é um extra: é o principal argumento de venda.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-petrol/70">
              Um resort com um brand film de qualidade, fotografia trabalhada e conteúdo regular para redes sociais comunica
              de forma completamente diferente de um que apenas actualiza o preço no booking. O nível de detalhe na
              apresentação visual é lido pelo cliente como sinal directo da qualidade da experiência.
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
              O que produzimos para empresas no Algarve
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
              {[
                "Brand films e filmes de apresentação de resorts e hotéis",
                "Fotografias de instalações, quartos e espaços comuns",
                "Conteúdo sazonal para épocas alta e baixa",
                "Vídeos para mercado internacional (UK, DE, NL, IE)",
                "Filmagem aérea com drone de costa e propriedades",
                "Conteúdo de gastronomia e experiências de lifestyle",
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

      {/* Sazonalidade e estratégia */}
      <section className="bg-bg-light py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h2 className="text-3xl text-petrol md:text-4xl">Conteúdo para cada estação</h2>
            <p className="mt-6 text-lg leading-relaxed text-petrol/70">
              O Algarve tem uma das melhores taxas de dias de sol da Europa — e isso é um argumento de marketing poderoso.
              Mas o erro comum é produzir conteúdo apenas no verão. Um hotel que mostra o Algarve em Outubro — a tranquilidade
              fora de época, o golfe, a gastronomia, as caminhadas na Costa Vicentina — atrai um segmento de cliente
              completamente diferente e muito mais fiel.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-petrol/70">
              Trabalhamos com propriedades no Algarve para planear produção ao longo do ano, garantindo conteúdo fresco para
              cada época — e uma presença digital consistente que não depende apenas da alta temporada para gerar reservas.
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
            <h2 className="text-3xl md:text-4xl">Tens um projecto no Algarve?</h2>
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
