"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function StickyHeaderCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  const skipPages = ["/contacto", "/en/contact", "/simulador-orcamento", "/auditoria-gratuita"];
  const isSkipPage = skipPages.some((p) => pathname === p);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("sticky-cta-dismissed")) {
      setDismissed(true);
      return;
    }

    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("sticky-cta-dismissed", "1");
  };

  if (isSkipPage || dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          exit={{ y: 60 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[55] flex h-14 items-center justify-between gap-4 border-t border-white/10 bg-[#0E3A45] px-4 md:px-8"
        >
          <div className="flex flex-1 items-center justify-center gap-3 md:gap-6">
            <span className="hidden text-sm text-white/80 sm:block">
              Precisa de vídeo profissional para a sua empresa?
            </span>
            <span className="block text-xs text-white/80 sm:hidden">
              Vídeo profissional?
            </span>
            <Link
              href="/contacto"
              className="flex-shrink-0 rounded-full bg-[#FA8334] px-5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Pedir orçamento →
            </Link>
          </div>
          <button
            onClick={handleDismiss}
            aria-label="Fechar barra"
            className="flex-shrink-0 p-1 text-white/40 transition-colors hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
