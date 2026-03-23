"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES_OPTIONS = [
  "Filmes Comerciais",
  "Vídeos Institucionais",
  "Documentários",
  "Redes Sociais",
  "Fotografia",
  "Eventos",
  "Estratégia",
  "Outro",
];

const BUDGETS = [
  "Ainda não sei",
  "< €2.000",
  "€2.000 - €5.000",
  "€5.000 - €10.000",
  "> €10.000",
];

export function ContactForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    services: [] as string[],
    message: "",
    budget: "",
    startDate: "",
  });

  const updateField = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleService = (s: string) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(s)
        ? f.services.filter((x) => x !== s)
        : [...f.services, s],
    }));

  const canProceed =
    step === 1 ? form.name && form.email && form.phone :
    step === 2 ? form.services.length > 0 :
    true;

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Ocorreu um erro. Tenta novamente.");
      }
    } catch {
      setError("Ocorreu um erro de ligação. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-petrol">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-[clamp(28px,3vw,40px)] text-petrol">Mensagem enviada!</h3>
        <p className="mx-auto mt-4 max-w-md text-base text-petrol/50">
          Obrigado pelo teu contacto. Vamos responder nas próximas 24 horas.
        </p>
        <a
          href="/"
          className="mt-8 inline-block text-sm font-medium text-petrol underline underline-offset-4 transition-colors hover:text-orange"
        >
          Voltar à homepage →
        </a>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-10 flex gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              s <= step ? "bg-orange" : "bg-petrol/10"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <h3 className="text-2xl font-bold text-petrol">Fala-nos de ti.</h3>
            <p className="text-sm text-petrol/40">Campos com * são obrigatórios.</p>

            <div>
              <label className="mb-1 block font-mono text-[11px] uppercase tracking-[2px] text-petrol/40">Nome *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-base text-petrol outline-none transition-colors focus:border-orange"
                name="name" placeholder="O teu nome"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-[11px] uppercase tracking-[2px] text-petrol/40">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-base text-petrol outline-none transition-colors focus:border-orange"
                name="email" placeholder="email@exemplo.com"
              />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-mono text-[11px] uppercase tracking-[2px] text-petrol/40">Telefone *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-base text-petrol outline-none transition-colors focus:border-orange"
                  name="phone" placeholder="+351"
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-[11px] uppercase tracking-[2px] text-petrol/40">Empresa</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-base text-petrol outline-none transition-colors focus:border-orange"
                  name="company" placeholder="Nome da empresa"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block font-mono text-[11px] uppercase tracking-[2px] text-petrol/40">Website / Redes sociais</label>
              <input
                type="text"
                value={form.website}
                onChange={(e) => updateField("website", e.target.value)}
                className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-base text-petrol outline-none transition-colors focus:border-orange"
                name="website" placeholder="https://"
              />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <h3 className="text-2xl font-bold text-petrol">O que procuras?</h3>
            <p className="text-sm text-petrol/40">Selecciona um ou mais serviços.</p>

            <div className="flex flex-wrap gap-3">
              {SERVICES_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleService(s)}
                  className={`rounded-full border px-3 py-2 text-xs md:px-5 md:py-2.5 md:text-sm font-medium transition-all duration-200 ${
                    form.services.includes(s)
                      ? "border-orange bg-orange/10 text-petrol"
                      : "border-petrol/15 text-petrol/50 hover:border-petrol/30"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div>
              <label className="mb-1 block font-mono text-[11px] uppercase tracking-[2px] text-petrol/40">
                Conta-nos mais sobre o teu projecto
              </label>
              <textarea
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                rows={4}
                className="w-full resize-none border-b-2 border-petrol/10 bg-transparent py-3 text-base text-petrol outline-none transition-colors focus:border-orange"
                name="message" placeholder="O que tens em mente?"
              />
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <h3 className="text-2xl font-bold text-petrol">Últimos detalhes.</h3>

            <div>
              <label className="mb-1 block font-mono text-[11px] uppercase tracking-[2px] text-petrol/40">
                Orçamento estimado
              </label>
              <div className="flex flex-wrap gap-3">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    onClick={() => updateField("budget", b)}
                    className={`rounded-full border px-3 py-2 text-xs md:px-5 md:py-2.5 md:text-sm font-medium transition-all duration-200 ${
                      form.budget === b
                        ? "border-orange bg-orange/10 text-petrol"
                        : "border-petrol/15 text-petrol/50 hover:border-petrol/30"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block font-mono text-[11px] uppercase tracking-[2px] text-petrol/40">
                Data ideal de início
              </label>
              <input
                name="startDate"
                type="text"
                value={form.startDate}
                onChange={(e) => updateField("startDate", e.target.value)}
                className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-base text-petrol outline-none transition-colors focus:border-orange"
                placeholder="Ex: Abril 2026, O mais rápido possível..."
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="text-sm font-medium text-petrol/50 transition-colors hover:text-petrol"
          >
            ← Voltar
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            onClick={() => canProceed && setStep(step + 1)}
            className={`rounded-full px-8 py-3 text-sm font-semibold transition-all duration-200 ${
              canProceed
                ? "bg-petrol text-white hover:bg-petrol/90"
                : "bg-petrol/20 text-petrol/30 cursor-not-allowed"
            }`}
          >
            Seguinte →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`rounded-full px-8 py-3 text-sm font-semibold text-white transition-all duration-200 ${
              loading
                ? "bg-orange/60 cursor-wait"
                : "bg-orange hover:bg-orange/90 hover:scale-[1.03]"
            }`}
          >
            {loading ? "A enviar..." : "Enviar mensagem"}
          </button>
        )}
      </div>
    </div>
  );
}
