"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { SectorPage } from "@/lib/sectors-data";
import type { Project } from "@/lib/portfolio-data";

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
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-petrol/5 text-petrol transition-transform duration-200"
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

export function SectorPageContent({
  sector,
  caseStudies,
}: {
  sector: SectorPage;
  caseStudies: (Project | undefined)[];
}) {
  const validCaseStudies = caseStudies.filter(Boolean) as Project[];

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
            Sectores
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: 0.1 } } }}
            className="max-w-3xl text-4xl leading-tight text-white md:text-5xl lg:text-6xl"
          >
            {sector.heroTitle}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: 0.2 } } }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            {sector.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Challenge */}
      <section className="bg-bg-light py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h2 className="text-3xl text-petrol md:text-4xl">{sector.challenge.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-petrol/70">{sector.challenge.text}</p>
          </motion.div>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <h2 className="max-w-3xl text-3xl text-petrol md:text-4xl">
              O que fazemos para {sector.title.replace("Produção audiovisual para ", "")}
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:max-w-3xl">
              {sector.services.map((service) => (
                <li key={service} className="flex items-start gap-3">
                  <span className="mt-2 block h-2.5 w-2.5 shrink-0 rounded-full bg-orange" />
                  <span className="text-base leading-relaxed text-petrol/80">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      {validCaseStudies.length > 0 && (
        <section className="bg-bg-light py-20">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <h2 className="text-3xl text-petrol md:text-4xl">Experiência no sector</h2>
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {validCaseStudies.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/portfolio/${project.slug}`}
                    className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-petrol">{project.title}</h3>
                      <p className="mt-1 text-sm text-petrol/50">{project.client}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

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
              {sector.faq.map((item) => (
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
            <h2 className="text-3xl md:text-4xl">
              Tens um projecto em {sector.title.replace("Produção audiovisual para ", "")}?
            </h2>
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
