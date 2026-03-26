"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HotelLeadForm } from "@/components/features/leads/HotelLeadForm";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const WHAT_YOU_LEARN = [
  "Como empresas em Portugal estão a usar vídeo para aumentar vendas — com exemplos reais de hotelaria, restauração, imobiliário e corporate",
  "Que tipos de conteúdo funcionam em cada canal e sector — website, Instagram, LinkedIn, campanhas pagas",
  "O processo completo de produção: do briefing à entrega, sem surpresas no orçamento",
];

const SOCIAL_PROOF = [
  { client: "Zeiss", sector: "Corporate", rating: "9.5/10", quote: "Profissionalismo e resultados acima do esperado." },
  { client: "Once Upon a House", sector: "Hotelaria", rating: "10/10", quote: "Captaram exactamente a essência do espaço." },
  { client: "Amoretti", sector: "Restauração", rating: "10/10", quote: "O conteúdo superou todas as expectativas." },
  { client: "Saboranalítico", sector: "Gastronomia", rating: "10/10", quote: "Trabalho impecável do início ao fim." },
];

const SECTORS = [
  { name: "Hotelaria", desc: "Brand films, reels e conteúdo para OTAs que aumentam reservas directas." },
  { name: "Restauração", desc: "Vídeos de produto e espaço que convertem seguidores em clientes." },
  { name: "Imobiliário", desc: "Tours virtuais e brand films para projectos residenciais e comerciais." },
  { name: "Corporate", desc: "Vídeos institucionais, recrutamento e comunicação interna." },
];

const FAQS = [
  {
    q: "O guia é mesmo gratuito?",
    a: "Sim, sem condições. Preenches o formulário e enviamos imediatamente para o teu email. Sem subscrições obrigatórias nem compromissos.",
  },
  {
    q: "Serve para qualquer tipo de empresa?",
    a: "Sim. Trabalhamos com hotéis, restaurantes, empresas imobiliárias, marcas corporate e muito mais. O guia cobre estratégias para diferentes sectores.",
  },
  {
    q: "Quanto tempo demora a receber o guia?",
    a: "O email chega nos primeiros 5 minutos após submissão. Se não encontrares, verifica a pasta de spam.",
  },
];

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

export function GuiaVideoEmpresasContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-petrol-deep pt-[200px] pb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:items-start">
            {/* Left */}
            <div>
              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="mb-4 font-mono text-xs font-semibold tracking-[3px] uppercase text-orange"
              >
                Recurso gratuito
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
                Como o vídeo transforma resultados em empresas.
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
                Guia com exemplos reais de empresas portuguesas em hotelaria, restauração, imobiliário e corporate — o que funciona, o que falha, e como começar.
              </motion.p>

              {/* What you learn */}
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  ...fadeUp,
                  visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: 0.3 } },
                }}
                className="mt-10 space-y-4"
              >
                {WHAT_YOU_LEARN.map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-1.5 block h-2.5 w-2.5 shrink-0 rounded-full bg-orange" />
                    <span className="text-base leading-relaxed text-white/70">{point}</span>
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* Right — Form */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                ...fadeUp,
                visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: 0.2 } },
              }}
              className="lg:sticky lg:top-8"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
                <p className="font-mono text-xs font-semibold tracking-[3px] uppercase text-orange">
                  Download gratuito
                </p>
                <h2 className="mt-3 text-2xl leading-tight text-white">
                  Recebe o guia no teu email
                </h2>
                <p className="mt-2 text-sm text-white/50">Enviamos imediatamente. Sem spam.</p>
                <HotelLeadForm source="guia-video-empresas" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sectores */}
      <section className="bg-bg-light py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="max-w-3xl text-3xl text-petrol md:text-4xl">O que encontras no guia</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
              {SECTORS.map((s) => (
                <div key={s.name} className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="font-mono text-xs font-semibold tracking-[2px] uppercase text-orange">{s.name}</p>
                  <p className="mt-2 text-base leading-relaxed text-petrol/60">{s.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social proof */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="max-w-3xl text-3xl text-petrol md:text-4xl">Clientes que já confiam no nosso trabalho</h2>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:max-w-3xl">
              {SOCIAL_PROOF.map((sp) => (
                <div key={sp.client} className="rounded-2xl border border-petrol/10 p-5 text-center">
                  <p className="font-mono text-xs font-semibold tracking-[2px] uppercase text-orange">{sp.client}</p>
                  <p className="mt-2 text-xl font-semibold text-petrol">{sp.rating}</p>
                  <p className="mt-1 text-xs text-petrol/40">{sp.sector}</p>
                  <p className="mt-3 text-sm leading-relaxed text-petrol/60">&ldquo;{sp.quote}&rdquo;</p>
                </div>
              ))}
            </div>
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
              {FAQS.map((faq) => (
                <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
