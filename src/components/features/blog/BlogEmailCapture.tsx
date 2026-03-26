"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogEmailCaptureProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  source?: string;
  magnet?: string;
  variant?: "inline" | "banner";
}

export function BlogEmailCapture({
  title = "Recebe o guia completo de preços",
  description = "Tabela de referência, checklist de briefing e os erros mais comuns a evitar. Grátis.",
  ctaLabel = "Receber guia",
  source = "blog",
  magnet = "guia-precos-video",
  variant = "inline",
}: BlogEmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, source, magnet }),
      });
      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== "undefined" && (window as { gtag?: (...args: unknown[]) => void }).gtag) {
          (window as { gtag?: (...args: unknown[]) => void }).gtag!("event", "lead_magnet_submit", {
            event_category: "engagement",
            event_label: magnet,
          });
        }
      } else {
        setError("Ocorreu um erro. Tenta novamente.");
      }
    } catch {
      setError("Ocorreu um erro de ligação.");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "banner") {
    return (
      <div className="my-12 rounded-2xl bg-petrol px-8 py-10 text-white md:px-12">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Enviado!</h3>
              <p className="mt-2 text-sm text-white/60">Verifica o teu email em breve.</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="font-mono text-[11px] uppercase tracking-[3px] text-orange">Recurso gratuito</p>
              <h3 className="mt-2 text-2xl font-bold">{title}</h3>
              <p className="mt-2 text-sm text-white/60">{description}</p>
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="O teu nome"
                  className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-orange"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="O teu email"
                  required
                  className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-orange"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-orange/90 disabled:opacity-60"
                >
                  {loading ? "A enviar..." : ctaLabel}
                </button>
              </form>
              {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Inline variant
  return (
    <div className="my-10 rounded-xl border border-petrol/10 bg-bg-light p-6 md:p-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-petrol">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-petrol">Enviado! Verifica o teu email.</p>
              <p className="text-sm text-petrol/50">O guia está a caminho.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[2px] text-orange">Grátis</p>
                <p className="mt-1 font-semibold text-petrol">{title}</p>
                <p className="mt-1 text-sm text-petrol/50">{description}</p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row md:flex-shrink-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="O teu email"
                  required
                  className="rounded-full border border-petrol/15 bg-white px-5 py-2.5 text-sm text-petrol outline-none focus:border-orange"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-petrol px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-petrol/90 disabled:opacity-60"
                >
                  {loading ? "..." : ctaLabel}
                </button>
              </form>
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
