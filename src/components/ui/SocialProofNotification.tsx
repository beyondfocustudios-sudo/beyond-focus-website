"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Factos REAIS e credíveis — sem nomes falsos
const MESSAGES = [
  { icon: "📊", text: "Mais de 50 projectos entregues em Portugal" },
  { icon: "⭐", text: "Avaliação 5.0 no Google — 100% satisfação" },
  { icon: "🎬", text: "Carl Zeiss, Once Upon a House, Highgate Hotels" },
  { icon: "🔒", text: "Portal exclusivo do cliente — único em Portugal" },
  { icon: "📅", text: "Disponibilidade limitada — 2 vagas em Abril" },
  { icon: "⚡", text: "Resposta a pedidos de orçamento em 24 horas" },
];

const SESSION_KEY = "social-proof-count";
const MAX_SHOWS = 3;
const INITIAL_DELAY_MS = 20_000;
const INTERVAL_MS = 35_000;
const VISIBLE_MS = 5_000;

export function SocialProofNotification() {
  const [current, setCurrent] = useState<(typeof MESSAGES)[0] | null>(null);
  const indexRef = useRef(0);
  const pathname = usePathname();

  const skipPages = ["/contacto", "/en/contact", "/simulador-orcamento", "/auditoria-gratuita"];
  const isSkipPage = skipPages.some((p) => pathname === p);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isSkipPage) return;

    const shown = parseInt(sessionStorage.getItem(SESSION_KEY) || "0", 10);
    if (shown >= MAX_SHOWS) return;

    let showCount = shown;
    let visibleTimer: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    const showNext = () => {
      if (showCount >= MAX_SHOWS) {
        clearInterval(interval);
        return;
      }

      const msg = MESSAGES[indexRef.current % MESSAGES.length];
      indexRef.current += 1;
      showCount += 1;
      sessionStorage.setItem(SESSION_KEY, String(showCount));

      setCurrent(msg);
      visibleTimer = setTimeout(() => {
        setCurrent(null);
      }, VISIBLE_MS);
    };

    const initialTimer = setTimeout(() => {
      showNext();
      interval = setInterval(showNext, INTERVAL_MS);
    }, INITIAL_DELAY_MS);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(visibleTimer);
      clearInterval(interval);
    };
  }, [isSkipPage]);

  if (isSkipPage) return null;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key={current.text}
          initial={{ opacity: 0, y: 16, x: -8 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-20 left-6 z-40 flex max-w-[300px] items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-[0_4px_24px_rgba(14,58,69,0.12)]"
        >
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#0E3A45]/8 text-lg">
            {current.icon}
          </div>
          <p className="text-xs font-medium leading-snug text-[#0E3A45]">
            {current.text}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
