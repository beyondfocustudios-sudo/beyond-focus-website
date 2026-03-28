"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dismiss = useCallback(() => {
    setVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("exit-popup-shown", "1");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("exit-popup-shown")) return;
    if (localStorage.getItem("bf_lead_captured")) return;
    if (window.location.pathname === "/contacto") return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setVisible(true);
        sessionStorage.setItem("exit-popup-shown", "1");
        document.removeEventListener("mouseleave", handleMouseLeave);
        if (typeof window !== "undefined" && typeof (window as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
          (window as { gtag?: (...args: unknown[]) => void }).gtag!("event", "lead_magnet_view", { event_category: "engagement" });
        }
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: email.split("@")[0],
          email,
          source: "exit-intent",
          magnet: "guia-video-marketing",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("bf_lead_captured", "1");
          if (typeof (window as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
            (window as { gtag?: (...args: unknown[]) => void }).gtag!("event", "lead_magnet_submit", {
              event_category: "lead",
              event_label: "exit_popup",
            });
          }
        }
        setTimeout(dismiss, 3000);
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
    <AnimatePresence>
      {visible && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-4 top-1/2 z-[9999] mx-auto max-w-[480px] -translate-y-1/2 rounded-2xl bg-[#0E3A45] p-8 shadow-2xl md:inset-x-auto md:left-1/2 md:-translate-x-1/2"
          >
            {/* Close button */}
            <button
              onClick={dismiss}
              aria-label="Fechar"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-4 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FA8334]">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Guia enviado!</h3>
                  <p className="mt-2 text-sm text-white/60">Verifica o teu email em breve.</p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="font-mono text-[11px] uppercase tracking-[3px] text-[#FA8334]">
                    Antes de sair
                  </p>
                  <h2 className="mt-3 text-2xl font-bold leading-tight text-white">
                    Recebe o guia gratuito de vídeo marketing
                  </h2>
                  <p className="mt-2 text-sm text-white/60">
                    Como empresas portuguesas estão a usar vídeo para crescer — hotelaria, restauração, imobiliário e corporate. Sem spam.
                  </p>
                  <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="O teu email"
                      required
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#FA8334] focus:bg-white/15"
                    />
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl bg-[#FA8334] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#e5732e] disabled:opacity-60"
                    >
                      {loading ? "A enviar..." : "Enviar guia gratuito"}
                    </button>
                  </form>
                  <button
                    onClick={dismiss}
                    className="mt-4 w-full text-center text-xs text-white/30 transition hover:text-white/60"
                  >
                    Não, obrigado
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
