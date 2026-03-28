"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const MESSAGES = [
  { name: "Maria", location: "Lisboa", action: "pediu orçamento", time: "12 minutos" },
  { name: "Hotel", location: "Cascais", action: "marcou reunião", time: "2 horas" },
  { name: "Restaurante", location: "Porto", action: "pediu guia gratuito", time: "45 minutos" },
  { name: "João", location: "Braga", action: "pediu orçamento", time: "1 hora" },
  { name: "Empresa", location: "Setúbal", action: "viu o simulador", time: "20 minutos" },
  { name: "Sofia", location: "Faro", action: "pediu auditoria gratuita", time: "3 horas" },
];

const SESSION_KEY = "social-proof-count";
const MAX_SHOWS = 3;
const INITIAL_DELAY_MS = 15_000;
const INTERVAL_MS = 30_000;
const VISIBLE_MS = 5_000;

export function SocialProofNotification() {
  const [current, setCurrent] = useState<(typeof MESSAGES)[0] | null>(null);
  const indexRef = useRef(0);
  const pathname = usePathname();

  const isContactPage = pathname === "/contacto" || pathname === "/en/contact";

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isContactPage) return;

    const shown = parseInt(sessionStorage.getItem(SESSION_KEY) || "0", 10);
    if (shown >= MAX_SHOWS) return;

    let showCount = shown;
    let visibleTimer: ReturnType<typeof setTimeout>;

    const showNext = () => {
      if (showCount >= MAX_SHOWS) return;

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
      const interval = setInterval(() => {
        if (showCount >= MAX_SHOWS) {
          clearInterval(interval);
          return;
        }
        showNext();
      }, INTERVAL_MS);
    }, INITIAL_DELAY_MS);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(visibleTimer);
    };
  }, [isContactPage]);

  if (isContactPage) return null;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key={`${current.name}-${current.time}`}
          initial={{ opacity: 0, y: 16, x: -8 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-6 left-6 z-50 flex max-w-[280px] items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-[0_4px_24px_rgba(14,58,69,0.12)]"
        >
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#0E3A45]/10 text-base font-semibold text-[#0E3A45]">
            {current.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold leading-snug text-[#0E3A45]">
              {current.name} de {current.location}
            </p>
            <p className="text-xs leading-snug text-[#0E3A45]/60">
              {current.action} há {current.time}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
