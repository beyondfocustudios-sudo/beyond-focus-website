"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ServicePage } from "@/lib/services-data";
import type { Project } from "@/lib/portfolio-data";
import { BLOG_POSTS } from "@/lib/blog-data";

const SERVICE_BLOG_MAP: Record<string, string[]> = {
  "filmes-comerciais": ["quanto-custa-video-institucional-portugal", "video-institucional-vs-filme-comercial", "como-preparar-empresa-filmagem"],
  "videos-institucionais": ["quanto-custa-video-institucional-portugal", "video-institucional-vs-filme-comercial", "como-preparar-empresa-filmagem"],
  "documentarios": ["porque-empresa-precisa-video-2026", "quanto-custa-video-institucional-portugal"],
  "redes-sociais": ["porque-empresa-precisa-video-2026", "como-escolher-produtora-audiovisual"],
  "fotografia": ["como-escolher-produtora-audiovisual", "como-preparar-empresa-filmagem"],
  "eventos": ["como-preparar-empresa-filmagem", "porque-empresa-precisa-video-2026"],
  "estrategia": ["como-escolher-produtora-audiovisual", "porque-empresa-precisa-video-2026"],
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicePageContent({
  service,
  relatedProjects,
}: {
  service: ServicePage;
  relatedProjects: (Project | undefined)[];
}) {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-petrol-deep pt-[160px] pb-0 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10 lg:px-[60px]">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-block font-mono text-[11px] font-medium uppercase tracking-[3px] text-orange"
          >
            {service.title}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl text-[clamp(36px,5vw,64px)] font-bold leading-[1.08] tracking-[-0.02em] text-white"
          >
            {service.tagline}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 max-w-xl space-y-3 text-base leading-relaxed text-white/50"
          >
            {service.description.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </motion.div>
        </div>

        {/* Hero image — cinematic 21:9 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-[60px]"
        >
          <div className="relative overflow-hidden rounded-t-xl" style={{ aspectRatio: "16/9" }}>
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* ── O QUE FAZEMOS ── */}
      <section className="bg-bg-light py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-20 lg:px-[60px]">
          {/* Left — description */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-3 inline-block font-mono text-[11px] font-medium uppercase tracking-[3px] text-orange">
              O QUE FAZEMOS
            </span>
            <h2 className="text-[clamp(28px,3vw,40px)] font-bold leading-tight text-petrol">
              {service.tagline}
            </h2>
            <div className="mt-5 space-y-3 text-base leading-relaxed text-petrol/60">
              {service.description.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {service.timeline && (
              <p className="mt-4 font-mono text-xs uppercase tracking-[2px] text-orange">
                {service.timeline}
              </p>
            )}
            {service.model && (
              <p className="mt-4 rounded-lg bg-orange/5 px-4 py-3 text-sm font-medium text-petrol/70 border border-orange/10">
                {service.model}
              </p>
            )}
            {service.note && (
              <p className="mt-4 rounded-lg bg-petrol/5 px-4 py-3 text-sm text-petrol/60 border-l-2 border-orange">
                {service.note}
              </p>
            )}
          </motion.div>

          {/* Right — what's included */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="border-l border-petrol/10 pl-8 lg:pl-12"
          >
            <h3 className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[2px] text-petrol/30">
              O que inclui
            </h3>
            <ul className="space-y-3">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-petrol/70">
                  <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-[60px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <span className="mb-3 inline-block font-mono text-[11px] font-medium uppercase tracking-[3px] text-orange">
              PROCESSO
            </span>
            <h2 className="text-[clamp(28px,3vw,40px)] font-bold text-petrol">
              Como funciona.
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5"
          >
            {service.process.map((step) => (
              <motion.div key={step.step} variants={fadeUp} className="relative">
                <span className="mb-3 block text-[48px] font-bold leading-none text-petrol/[0.06]">
                  {step.step}
                </span>
                <div className="mb-2 h-[3px] w-8 rounded-full bg-orange" />
                <h3 className="mb-2 text-lg font-bold text-petrol">{step.title}</h3>
                <p className="text-sm leading-relaxed text-petrol/50">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTOS RELACIONADOS ── */}
      {relatedProjects.length > 0 && (
        <section className="bg-bg-light py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-[60px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 flex items-baseline justify-between"
            >
              <div>
                <span className="mb-3 inline-block font-mono text-[11px] font-medium uppercase tracking-[3px] text-orange">
                  PORTFOLIO
                </span>
                <h2 className="text-[clamp(28px,3vw,40px)] font-bold text-petrol">
                  Projectos relacionados.
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="hidden font-mono text-[13px] uppercase tracking-[2px] text-orange underline underline-offset-4 md:block"
              >
                Ver todos
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => {
                if (!project) return null;
                return (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="group block"
                    >
                      <div className="relative mb-4 overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-0 p-5">
                          <span className="font-mono text-[10px] uppercase tracking-[2px] text-orange">
                            {project.category}
                          </span>
                          <p className="mt-1 text-lg font-semibold text-white">{project.title}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── ARTIGOS RELACIONADOS ── */}
      {(() => {
        const slugs = SERVICE_BLOG_MAP[service.slug] || [];
        const articles = slugs.map(s => BLOG_POSTS.find(p => p.slug === s)).filter(Boolean);
        if (articles.length === 0) return null;
        return (
          <section className="bg-white py-20 lg:py-28">
            <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-[60px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <span className="mb-3 inline-block font-mono text-[11px] font-medium uppercase tracking-[3px] text-orange">
                  ARTIGOS
                </span>
                <h2 className="text-[clamp(28px,3vw,40px)] font-bold text-petrol">
                  Lê mais sobre este tema.
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => {
                  if (!article) return null;
                  return (
                    <motion.div
                      key={article.slug}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <Link href={`/blog/${article.slug}`} className="group block">
                        <div className="relative mb-3 overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
                          <Image
                            src={article.thumbnail}
                            alt={article.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-[2px] text-orange">{article.category}</span>
                        <h3 className="mt-1 text-base font-semibold text-petrol transition-colors group-hover:text-orange">{article.title}</h3>
                        <p className="mt-1 text-xs text-petrol/40">{article.readTime} de leitura</p>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── CTA ── */}
      <section className="bg-bg-light py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[clamp(28px,3.5vw,48px)] font-bold text-petrol">
            Interessado em {service.title.toLowerCase()}?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-petrol/50">
            Fala connosco sobre o teu projecto. A primeira conversa é por nossa conta.
          </p>
          <Link
            href="/contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-petrol px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-petrol/90 hover:scale-[1.03] active:scale-[0.97]"
          >
            Fala Connosco <span>→</span>
          </Link>
        </motion.div>
      </section>
    </>
  );
}
