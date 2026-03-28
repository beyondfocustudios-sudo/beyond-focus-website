"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface BlogStickyBannerProps {
  title?: string;
  cta?: string;
  href?: string;
}

export function BlogStickyBanner({
  title = "Tens um projecto em mente?",
  cta = "Falar connosco",
  href = "/contacto",
}: BlogStickyBannerProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= 0.5 && !dismissed) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[560px]"
        >
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#0E3A45] px-5 py-4 shadow-2xl">
            <p className="text-sm font-medium text-white/90 leading-snug">
              {title}
            </p>
            <div className="flex flex-shrink-0 items-center gap-2">
              <Link
                href={href}
                className="rounded-full bg-[#FA8334] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#e5732e] whitespace-nowrap"
              >
                {cta}
              </Link>
              <button
                onClick={() => setDismissed(true)}
                aria-label="Fechar"
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-white/40 transition-colors hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
