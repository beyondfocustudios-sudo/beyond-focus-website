"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";

const LINKS = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/servicos", label: "Serviços" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export default function NotFound() {
  return (
    <>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <Navbar variant="light" />
      <main className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-bg-light px-6">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute text-[clamp(200px,30vw,400px)] font-bold leading-none text-petrol/[0.03] select-none"
        >
          404
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center text-[clamp(28px,4vw,44px)] font-bold text-petrol"
        >
          Página não encontrada.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-10 mt-4 max-w-md text-center text-base text-petrol/50"
        >
          Esta página não existe ou foi movida. Escolhe um destino abaixo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#0E3A45] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0E3A45]/90 hover:scale-[1.03] active:scale-[0.97]"
          >
            Início
          </Link>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-2 rounded-full border border-[#0E3A45]/15 bg-white px-7 py-3.5 text-sm font-medium text-[#0E3A45] transition-all duration-200 hover:border-[#FA8334] hover:text-[#FA8334] hover:scale-[1.03] active:scale-[0.97]"
            >
              {l.label}
            </Link>
          ))}
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
