"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HotelLeadFormProps {
  source?: string;
}

export function HotelLeadForm({ source = "guia-video-empresas" }: HotelLeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: phone || undefined, source }),
      });
      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== "undefined" && (window as { gtag?: (...args: unknown[]) => void }).gtag) {
          (window as { gtag?: (...args: unknown[]) => void }).gtag!("event", "lead_form_submit", {
            event_category: "engagement",
            event_label: source,
          });
        }
      } else {
        const data = await res.json().catch(() => ({}));
        setError((data as { error?: string }).error || "Ocorreu um erro. Tenta novamente.");
      }
    } catch {
      setError("Ocorreu um erro de ligação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FA8334]">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white">Guia enviado!</h3>
          <p className="mt-2 text-sm text-white/60">Verifica o teu email — chega em menos de 5 minutos.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
        >
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
              required
              className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#FA8334] focus:bg-white/15"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#FA8334] focus:bg-white/15"
            />
          </div>
          <div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefone (opcional)"
              className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#FA8334] focus:bg-white/15"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#FA8334] px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-[#e5732e] disabled:opacity-60"
          >
            {loading ? "A enviar..." : "Enviar guia gratuito"}
          </button>
          <p className="text-center text-xs text-white/30">
            Sem spam. Podes cancelar a qualquer momento.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
