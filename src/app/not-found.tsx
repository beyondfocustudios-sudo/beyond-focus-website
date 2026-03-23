"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";

export default function NotFound() {
  return (
    <>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <Navbar variant="light" />
      <main className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-bg-light px-6">
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
          className="relative z-10 text-center text-[clamp(28px,4vw,44px)] text-petrol"
        >
          Página não encontrada.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-10 mt-4 max-w-md text-center text-base text-petrol/50"
        >
          Parece que te perdeste. Mas estamos aqui para te guiar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/"
            className="relative z-10 mt-8 inline-flex items-center gap-2 rounded-full bg-petrol px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-petrol/90 hover:scale-[1.03]"
          >
            Voltar ao início →
          </Link>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
