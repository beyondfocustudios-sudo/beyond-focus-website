"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { faqItems } from "./brand-film-data";

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

export function BrandFilmContent() {
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
            Serviços
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
            Um filme que conta quem tu és.
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
            O brand film é o formato mais poderoso para construir uma marca. Em 60 a 90 segundos,
            mostra quem és, o que defendes e porque é que isso importa — antes de qualquer conversa comercial.
          </motion.p>
        </div>
      </section>

      {/* O que é um brand film */}
      <section className="bg-bg-light py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h2 className="text-3xl text-petrol md:text-4xl">O que é um brand film?</h2>
            <p className="mt-6 text-lg leading-relaxed text-petrol/70">
              Um brand film não é publicidade. Não vende um produto, não anuncia uma promoção, não explica funcionalidades.
              Conta uma história — a tua história. Quem fundou a empresa e porquê. Quais os valores que guiam as decisões.
              Que impacto a marca quer ter no mundo.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-petrol/70">
              É o formato ideal para marcas que querem criar ligação emocional com o público, atrair talento alinhado com a
              sua cultura, ou estabelecer autoridade num mercado competitivo. Em Lisboa e em Portugal, ainda são poucas as
              marcas que investem num brand film — o que torna este activo uma vantagem imediata para quem o tem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Diferença para vídeo institucional */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="max-w-3xl text-3xl text-petrol md:text-4xl">
              Brand film vs. vídeo institucional
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:max-w-3xl">
              <div className="rounded-2xl border border-petrol/10 p-6">
                <p className="font-mono text-xs font-semibold tracking-[2px] uppercase text-orange">
                  Brand Film
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Conta uma história com emoção",
                    "Foca nos valores e na cultura",
                    "Cria ligação antes da venda",
                    "Dura anos sem perder relevância",
                    "Formato: 60 a 90 segundos",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 block h-2 w-2 shrink-0 rounded-full bg-orange" />
                      <span className="text-base text-petrol/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-petrol/10 p-6">
                <p className="font-mono text-xs font-semibold tracking-[2px] uppercase text-petrol/40">
                  Vídeo Institucional
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Apresenta factos e processos",
                    "Foca no produto ou serviço",
                    "Informa antes de convencer",
                    "Fica datado mais rapidamente",
                    "Formato: 2 a 5 minutos",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 block h-2 w-2 shrink-0 rounded-full bg-petrol/20" />
                      <span className="text-base text-petrol/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Processo */}
      <section className="bg-bg-light py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="max-w-3xl text-3xl text-petrol md:text-4xl">Como trabalhamos</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:max-w-5xl">
              {[
                {
                  step: "01",
                  title: "Diagnóstico",
                  text: "Começamos por perceber a marca em profundidade — história, valores, público, posicionamento. Sem atalhos.",
                },
                {
                  step: "02",
                  title: "Conceito criativo",
                  text: "Desenvolvemos a narrativa e o guião. Definimos estética, tom, música e estrutura antes de ligar uma câmara.",
                },
                {
                  step: "03",
                  title: "Produção",
                  text: "Filmagem em Lisboa ou em qualquer ponto de Portugal. Equipa experiente, sem improvisos.",
                },
                {
                  step: "04",
                  title: "Pós-produção",
                  text: "Edição, colorização, sound design e legendagem. Entrega em todos os formatos — para web, redes sociais e apresentações.",
                },
              ].map(({ step, title, text }) => (
                <div key={step} className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="font-mono text-xs font-semibold tracking-[2px] uppercase text-orange">{step}</p>
                  <h3 className="mt-3 text-lg font-semibold text-petrol">{title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-petrol/60">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quem precisa de um brand film */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h2 className="text-3xl text-petrol md:text-4xl">Quem beneficia de um brand film?</h2>
            <p className="mt-6 text-lg leading-relaxed text-petrol/70">
              Qualquer marca com uma história que valha a pena contar. Na prática, trabalhamos sobretudo com empresas em
              momentos de afirmação: startups que querem estabelecer credibilidade, marcas estabelecidas que relançam o
              posicionamento, e empresas familiares que querem preservar e comunicar a sua herança.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-petrol/70">
              O brand film funciona também como ferramenta de recrutamento — cada vez mais candidatos pesquisam a cultura de
              uma empresa antes de aceitar uma proposta. E como ponto de entrada em conversas comerciais de alto valor, onde
              a confiança precede a decisão.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Marcas em Lisboa e resto de Portugal que querem diferenciar-se no digital",
                "Empresas com história e cultura para comunicar",
                "Negócios de hotelaria, gastronomia, moda, tecnologia e serviços",
                "Fundadores que querem colocar a sua visão no centro da comunicação",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 block h-2.5 w-2.5 shrink-0 rounded-full bg-orange" />
                  <span className="text-base leading-relaxed text-petrol/80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bg-light py-20">
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
            <h2 className="text-3xl md:text-4xl">A tua marca merece um filme à sua altura.</h2>
            <p className="mt-4 text-lg text-white/60">Conta-nos a tua história. A primeira conversa é nossa.</p>
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
