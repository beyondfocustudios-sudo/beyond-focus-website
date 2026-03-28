"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormState {
  name: string;
  email: string;
  company: string;
  website: string;
}

type Status = "idle" | "loading" | "success" | "error";

const CALENDLY_URL = "https://calendly.com/beyondfocus/30min";

export function AuditoriaForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "", website: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.website) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          website: form.website,
          source: "auditoria-gratuita",
          message: `Pedido de auditoria gratuita. Website: ${form.website}`,
          phone: "n/a",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(data.error || "Erro ao enviar. Tenta novamente.");
      }

      if (typeof window !== "undefined" && typeof (window as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
        (window as { gtag?: (...args: unknown[]) => void }).gtag!("event", "audit_request_submit", {
          event_category: "lead",
          event_label: "auditoria_gratuita",
        });
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Erro ao enviar. Tenta novamente.");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-[#0E3A45] p-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FA8334]/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#FA8334" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">Obrigado!</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Vamos analisar o teu website e enviar o relatório em 48 horas.
            <br />
            Enquanto isso, podes agendar uma chamada para discutir os resultados.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-[#FA8334] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Agendar chamada →
          </a>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="audit-name" className="mb-1.5 block text-xs font-medium text-[#0E3A45]/70">
                Nome *
              </label>
              <input
                id="audit-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="O teu nome"
                className="w-full rounded-xl border border-[#0E3A45]/10 bg-white px-4 py-3 text-sm text-[#0E3A45] placeholder-[#0E3A45]/30 outline-none transition focus:border-[#0E3A45]/40 focus:ring-2 focus:ring-[#0E3A45]/10"
              />
            </div>
            <div>
              <label htmlFor="audit-email" className="mb-1.5 block text-xs font-medium text-[#0E3A45]/70">
                Email *
              </label>
              <input
                id="audit-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@empresa.pt"
                className="w-full rounded-xl border border-[#0E3A45]/10 bg-white px-4 py-3 text-sm text-[#0E3A45] placeholder-[#0E3A45]/30 outline-none transition focus:border-[#0E3A45]/40 focus:ring-2 focus:ring-[#0E3A45]/10"
              />
            </div>
          </div>
          <div>
            <label htmlFor="audit-company" className="mb-1.5 block text-xs font-medium text-[#0E3A45]/70">
              Empresa *
            </label>
            <input
              id="audit-company"
              name="company"
              type="text"
              required
              autoComplete="organization"
              value={form.company}
              onChange={handleChange}
              placeholder="Nome da tua empresa"
              className="w-full rounded-xl border border-[#0E3A45]/10 bg-white px-4 py-3 text-sm text-[#0E3A45] placeholder-[#0E3A45]/30 outline-none transition focus:border-[#0E3A45]/40 focus:ring-2 focus:ring-[#0E3A45]/10"
            />
          </div>
          <div>
            <label htmlFor="audit-website" className="mb-1.5 block text-xs font-medium text-[#0E3A45]/70">
              Website da empresa *
            </label>
            <input
              id="audit-website"
              name="website"
              type="url"
              required
              autoComplete="url"
              value={form.website}
              onChange={handleChange}
              placeholder="https://www.empresa.pt"
              className="w-full rounded-xl border border-[#0E3A45]/10 bg-white px-4 py-3 text-sm text-[#0E3A45] placeholder-[#0E3A45]/30 outline-none transition focus:border-[#0E3A45]/40 focus:ring-2 focus:ring-[#0E3A45]/10"
            />
          </div>

          {status === "error" && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-[#FA8334] px-6 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "loading" ? "A enviar..." : "Quero a minha auditoria gratuita →"}
          </button>

          <p className="text-center text-xs text-[#0E3A45]/40">
            Sem spam. Entregamos o relatório em até 48 horas.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
