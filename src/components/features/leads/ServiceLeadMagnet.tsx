"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceLeadMagnetProps {
  serviceName: string;
  serviceSlug: string;
}

export function ServiceLeadMagnet({ serviceName, serviceSlug }: ServiceLeadMagnetProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          source: `service-page-${serviceSlug}`,
          magnet: "guia-video-empresas",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("bf_lead_captured", "1");
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
    <section className="bg-[#0E3A45] py-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-[60px]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[3px] text-[#FA8334]">
            Guia gratuito
          </p>
          <h2 className="mt-3 text-[clamp(24px,3vw,36px)] font-bold leading-tight text-white">
            Recebe o nosso guia gratuito
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/60">
            Como o vídeo transforma resultados para empresas como a tua — exemplos reais, métricas e processo completo para {serviceName.toLowerCase()}.
          </p>

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
                <p className="text-lg font-semibold text-white">Guia enviado!</p>
                <p className="mt-1 text-sm text-white/60">Verifica o teu email — chega em menos de 5 minutos.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome"
                  required
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#FA8334] focus:bg-white/15 sm:w-48"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#FA8334] focus:bg-white/15 sm:w-64"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-[#FA8334] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#e5732e] disabled:opacity-60"
                >
                  {loading ? "A enviar..." : "Enviar guia"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          {!submitted && (
            <p className="mt-3 text-xs text-white/30">Sem spam. Cancela a qualquer momento.</p>
          )}
        </div>
      </div>
    </section>
  );
}
