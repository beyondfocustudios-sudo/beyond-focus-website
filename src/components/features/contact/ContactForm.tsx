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

  const handleSubmit = () => {
    console.log("Form submitted:", form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange/10">
          <span className="text-2xl">✓</span>
        </div>
        <h3 className="text-2xl font-bold text-petrol">Mensagem enviada!</h3>
        <p className="mt-3 text-base text-petrol/50">
          Vamos responder dentro de 24 horas. Até já!
        </p>
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
                name="name"
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-base text-petrol outline-none transition-colors focus:border-orange"
                placeholder="O teu nome"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-[11px] uppercase tracking-[2px] text-petrol/40">Email *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-base text-petrol outline-none transition-colors focus:border-orange"
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1 block font-mono text-[11px] uppercase tracking-[2px] text-petrol/40">Telefone *</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-base text-petrol outline-none transition-colors focus:border-orange"
                  placeholder="+351"
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-[11px] uppercase tracking-[2px] text-petrol/40">Empresa</label>
                <input
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-base text-petrol outline-none transition-colors focus:border-orange"
                  placeholder="Nome da empresa"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block font-mono text-[11px] uppercase tracking-[2px] text-petrol/40">Website / Redes sociais</label>
              <input
                name="website"
                type="text"
                value={form.website}
                onChange={(e) => updateField("website", e.target.value)}
                className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-base text-petrol outline-none transition-colors focus:border-orange"
                placeholder="https://"
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
                name="message"
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                rows={4}
                className="w-full resize-none border-b-2 border-petrol/10 bg-transparent py-3 text-base text-petrol outline-none transition-colors focus:border-orange"
                placeholder="O que tens em mente?"
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
            className="rounded-full bg-orange px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange/90 hover:scale-[1.03]"
          >
            Enviar mensagem
          </button>
        )}
      </div>
    </div>
  );
}
