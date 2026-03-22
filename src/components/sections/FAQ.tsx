"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQ_ITEMS } from "@/lib/constants";

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="border-b border-petrol/10"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 text-base font-semibold text-petrol lg:text-lg">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-petrol/15 text-sm text-petrol/50"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-petrol/50 lg:text-base">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-bg-light py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 md:grid-cols-2 md:gap-16 md:px-10 lg:gap-20 lg:px-10">
        {/* Left — Sticky */}
        <div className="md:sticky md:top-28 md:self-start">
          <Eyebrow>PERGUNTAS FREQUENTES</Eyebrow>
          <SectionHeading className="mt-3">
            Tudo o que precisas de saber.
          </SectionHeading>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-sm text-petrol/50 leading-relaxed lg:text-base"
          >
            Se não encontrares a resposta que procuras, estamos a uma mensagem de distância.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6"
          >
            <Link
              href="/contacto"
              className="text-sm font-semibold text-petrol underline decoration-orange/40 underline-offset-4 transition-colors hover:text-orange hover:decoration-orange"
            >
              Fala connosco →
            </Link>
          </motion.div>
        </div>

        {/* Right — Accordion */}
        <div>
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
