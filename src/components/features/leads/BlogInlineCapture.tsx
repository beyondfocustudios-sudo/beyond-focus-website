"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogInlineCaptureProps {
  source?: string;
}

export function BlogInlineCapture({ source = "blog-cta" }: BlogInlineCaptureProps) {
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ name: email.split("@")[0], email, source, magnet: "guia-video-empresas" }),
      });
      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== "undefined" && typeof (window as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
          (window as { gtag?: (...args: unknown[]) => void }).gtag!("event", "blog_cta_submit", {
            event_category: "lead",
            event_label: "blog_capture",
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
    <section className="mt-12 p-8 rounded-2xl bg-[#F5F5F5] border border-gray-200">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0E3A45]">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-[#0E3A45]">Guia enviado! Verifica o teu email.</p>
              <p className="text-sm text-[#0E3A45]/50">Chega em menos de 5 minutos.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-xl font-serif text-[#0E3A45] mb-2">Guia Gratuito</h3>
            <p className="text-gray-600 mb-4">
              Como o vídeo pode transformar o teu negócio — com exemplos reais de hotelaria, restauração, imobiliário e corporate. Enviamos para o teu email.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="O teu email"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#0E3A45] outline-none focus:border-[#FA8334] transition"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#FA8334] text-white rounded-lg font-medium hover:bg-[#e5732e] disabled:opacity-60 transition-colors"
              >
                {loading ? "A enviar..." : "Enviar Guia"}
              </button>
            </form>
            {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
