"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// ─── Types ──────────────────────────────────────────────────────────────────

type ServiceKey =
  | "video-institucional"
  | "filme-comercial"
  | "redes-sociais"
  | "fotografia"
  | "evento"
  | "brand-film";

type ScaleKey = "pequeno" | "medio" | "grande";

interface Selections {
  service: ServiceKey | null;
  sector: string | null;
  scale: ScaleKey | null;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES: { key: ServiceKey; label: string; icon: string }[] = [
  { key: "video-institucional", label: "Vídeo Institucional", icon: "▶" },
  { key: "filme-comercial", label: "Filme Comercial / Spot", icon: "◼" },
  { key: "redes-sociais", label: "Conteúdo Redes Sociais (mensal)", icon: "◈" },
  { key: "fotografia", label: "Fotografia Profissional", icon: "◉" },
  { key: "evento", label: "Cobertura de Evento", icon: "◆" },
  { key: "brand-film", label: "Brand Film", icon: "◐" },
];

const SECTORS = [
  "Hotelaria / Turismo",
  "Restauração",
  "Imobiliário",
  "Corporate / Empresarial",
  "Saúde",
  "Tecnologia",
  "Outro",
];

const SCALE_OPTIONS: Record<ServiceKey, { key: ScaleKey; label: string }[]> = {
  "video-institucional": [
    { key: "pequeno", label: "Até 2 min" },
    { key: "medio", label: "2 — 5 min" },
    { key: "grande", label: "5+ min" },
  ],
  "filme-comercial": [
    { key: "pequeno", label: "Até 2 min" },
    { key: "medio", label: "2 — 5 min" },
    { key: "grande", label: "5+ min" },
  ],
  "redes-sociais": [
    { key: "pequeno", label: "4 vídeos / mês" },
    { key: "medio", label: "8 vídeos / mês" },
    { key: "grande", label: "12+ vídeos / mês" },
  ],
  fotografia: [
    { key: "pequeno", label: "Meio dia" },
    { key: "medio", label: "Dia completo" },
    { key: "grande", label: "2+ dias" },
  ],
  evento: [
    { key: "pequeno", label: "Meio dia" },
    { key: "medio", label: "Dia completo" },
    { key: "grande", label: "Multi-dia" },
  ],
  "brand-film": [
    { key: "pequeno", label: "Até 2 min" },
    { key: "medio", label: "2 — 5 min" },
    { key: "grande", label: "5+ min" },
  ],
};

// ─── Pricing ─────────────────────────────────────────────────────────────────

interface PriceRange {
  low: number;
  high: number;
  unit?: string;
}

const PRICE_MATRIX: Record<ServiceKey, Record<ScaleKey, PriceRange>> = {
  "video-institucional": {
    pequeno: { low: 1500, high: 3000 },
    medio: { low: 3000, high: 5500 },
    grande: { low: 5500, high: 7000 },
  },
  "filme-comercial": {
    pequeno: { low: 3000, high: 6000 },
    medio: { low: 6000, high: 10000 },
    grande: { low: 10000, high: 15000 },
  },
  "redes-sociais": {
    pequeno: { low: 800, high: 1200, unit: "/mês" },
    medio: { low: 1200, high: 2000, unit: "/mês" },
    grande: { low: 2000, high: 2500, unit: "/mês" },
  },
  fotografia: {
    pequeno: { low: 500, high: 900 },
    medio: { low: 900, high: 1800 },
    grande: { low: 1800, high: 3000 },
  },
  evento: {
    pequeno: { low: 550, high: 1000 },
    medio: { low: 1000, high: 2000 },
    grande: { low: 2000, high: 3000 },
  },
  "brand-film": {
    pequeno: { low: 5000, high: 8000 },
    medio: { low: 8000, high: 12000 },
    grande: { low: 12000, high: 15000 },
  },
};

// ─── Inclusions ──────────────────────────────────────────────────────────────

const INCLUSIONS: Record<ServiceKey, string[]> = {
  "video-institucional": [
    "Briefing estratégico e guião",
    "Dia(s) de filmagens em locação",
    "Edição, colour grading e sound design",
    "Versões para web e redes sociais",
    "Revisões incluídas",
  ],
  "filme-comercial": [
    "Conceito criativo e guião",
    "Pré-produção (casting, localizações, logística)",
    "Filmagens com equipa especializada",
    "Pós-produção completa (edição, VFX, música)",
    "Entrega em múltiplos formatos",
  ],
  "redes-sociais": [
    "Estratégia de conteúdo mensal",
    "Sessões de filmagem recorrentes",
    "Edição optimizada por plataforma",
    "Legendas e adaptação de formatos",
    "Gestão e calendário editorial",
  ],
  fotografia: [
    "Sessão fotográfica profissional",
    "Selecção e retoque de imagens",
    "Entrega em alta resolução e web",
    "Licença comercial total",
    "Arquivo digital organizado",
  ],
  evento: [
    "Cobertura fotográfica e/ou vídeo",
    "Edição e selecção de momentos chave",
    "Highlight reel para redes sociais",
    "Entrega em 48-72h úteis",
    "Arquivo completo do evento",
  ],
  "brand-film": [
    "Conceito e narrativa de marca",
    "Direcção criativa completa",
    "Filmagens cinematográficas",
    "Pós-produção de nível cinema",
    "Versões adaptadas a todos os canais",
  ],
};

// ─── Formatters ───────────────────────────────────────────────────────────────

function formatPrice(n: number): string {
  return `€${n.toLocaleString("pt-PT")}`;
}

function getRange(service: ServiceKey, scale: ScaleKey): PriceRange {
  return PRICE_MATRIX[service][scale];
}

function getRangeLabel(service: ServiceKey, scale: ScaleKey): string {
  const r = getRange(service, scale);
  const unit = r.unit ?? "";
  return `${formatPrice(r.low)} — ${formatPrice(r.high)}${unit}`;
}

// ─── Component ───────────────────────────────────────────────────────────────

const stepVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 40 : -40,
  }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -40 : 40,
  }),
};

export function SimuladorContent() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [selections, setSelections] = useState<Selections>({
    service: null,
    sector: null,
    scale: null,
  });

  // Lead form state
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const totalSteps = 4;

  const goTo = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const selectService = (key: ServiceKey) => {
    setSelections((s) => ({ ...s, service: key }));
    goTo(2);
  };

  const selectSector = (sector: string) => {
    setSelections((s) => ({ ...s, sector }));
    goTo(3);
  };

  const selectScale = (scale: ScaleKey) => {
    setSelections((s) => ({ ...s, scale }));
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "simulator_complete", {
        event_category: "lead",
        event_label: selections.service ?? "unknown",
      });
    }
    goTo(4);
  };

  const handleLeadSubmit = async () => {
    if (!leadName || !leadEmail || !leadPhone) {
      setFormError("Nome, email e telefone são obrigatórios.");
      return;
    }
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_RE.test(leadEmail)) {
      setFormError("Formato de email inválido.");
      return;
    }

    setLoading(true);
    setFormError("");

    const budgetLabel =
      selections.service && selections.scale
        ? getRangeLabel(selections.service, selections.scale)
        : "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          phone: leadPhone || undefined,
          services: selections.service ? [selections.service] : [],
          budget: budgetLabel,
          message: `Sector: ${selections.sector ?? "n/a"}. Escala: ${selections.scale ?? "n/a"}.`,
          source: "simulador-orcamento",
        }),
      });

      if (res.ok) {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "simulator_lead", {
            event_category: "lead",
            event_label: selections.service ?? "unknown",
          });
        }
        if (typeof window !== "undefined" && typeof window.fbq === "function") {
          window.fbq("track", "Lead", { content_name: "Simulador de Orçamento" });
        }
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({})) as { error?: string };
        setFormError(data.error ?? "Ocorreu um erro. Tenta novamente.");
      }
    } catch {
      setFormError("Erro de ligação. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  };

  const serviceLabel = SERVICES.find((s) => s.key === selections.service)?.label ?? "";
  const rangeLabel =
    selections.service && selections.scale
      ? getRangeLabel(selections.service, selections.scale)
      : "";
  const inclusions = selections.service ? INCLUSIONS[selections.service] : [];

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex gap-1 p-3 sm:gap-1.5 sm:p-4">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <motion.div
            key={i}
            className="h-1 flex-1 rounded-full"
            animate={{
              backgroundColor: i + 1 <= step ? "#FA8334" : "rgba(14,58,69,0.12)",
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-[640px] px-5 pt-16 pb-20 sm:px-8 sm:pt-20">
        <AnimatePresence mode="wait" custom={dir}>
          {/* Step 1 — Tipo de projecto */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={dir}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              <StepHeader
                step={1}
                total={totalSteps}
                question="Que tipo de projecto precisa?"
                sub="Selecciona o que melhor descreve o teu projecto."
              />
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <ServiceCard
                    key={s.key}
                    icon={s.icon}
                    label={s.label}
                    selected={selections.service === s.key}
                    onClick={() => selectService(s.key)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 — Sector */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={dir}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              <StepHeader
                step={2}
                total={totalSteps}
                question="Para que sector é?"
                sub="Ajuda-nos a calibrar a proposta certa para o teu contexto."
              />
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {SECTORS.map((sector) => (
                  <button
                    key={sector}
                    onClick={() => selectSector(sector)}
                    className={`flex items-center rounded-2xl border-2 px-5 py-4 text-left text-base font-medium transition-all duration-200 ${
                      selections.sector === sector
                        ? "border-orange bg-orange/8 text-petrol"
                        : "border-petrol/10 bg-white text-petrol hover:border-orange/40 hover:bg-orange/4"
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
              <BackButton onClick={() => goTo(1)} />
            </motion.div>
          )}

          {/* Step 3 — Escala */}
          {step === 3 && selections.service && (
            <motion.div
              key="step3"
              custom={dir}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              <StepHeader
                step={3}
                total={totalSteps}
                question="Qual a duração / escala?"
                sub="Escolhe a dimensão que melhor se adapta ao projecto."
              />
              <div className="mt-8 grid grid-cols-1 gap-3">
                {SCALE_OPTIONS[selections.service].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => selectScale(key)}
                    className={`flex items-center justify-between rounded-2xl border-2 px-6 py-5 text-left transition-all duration-200 ${
                      selections.scale === key
                        ? "border-orange bg-orange/8"
                        : "border-petrol/10 bg-white hover:border-orange/40 hover:bg-orange/4"
                    }`}
                  >
                    <span className="text-base font-semibold text-petrol">{label}</span>
                    <span className="font-mono text-sm text-petrol/40">
                      {formatPrice(PRICE_MATRIX[selections.service!][key].low)}+
                    </span>
                  </button>
                ))}
              </div>
              <BackButton onClick={() => goTo(2)} />
            </motion.div>
          )}

          {/* Step 4 — Resultado */}
          {step === 4 && selections.service && selections.scale && (
            <motion.div
              key="step4"
              custom={dir}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              {submitted ? (
                <SubmittedState serviceLabel={serviceLabel} />
              ) : (
                <>
                  {/* Result card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-3xl bg-petrol px-7 py-8 text-white"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[3px] text-white/40">
                      Investimento estimado
                    </p>
                    <p className="mt-3 text-[clamp(28px,5vw,40px)] font-bold leading-tight tracking-tight">
                      {rangeLabel}
                    </p>
                    <p className="mt-2 text-sm text-white/50">
                      {serviceLabel}
                      {selections.sector ? ` · ${selections.sector}` : ""}
                    </p>
                    <p className="mt-4 text-xs text-white/30">
                      Valores orientativos. Orçamento final após briefing detalhado.
                    </p>
                  </motion.div>

                  {/* Inclusions */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 rounded-2xl border border-petrol/8 bg-white px-6 py-6"
                  >
                    <p className="mb-4 font-mono text-[11px] uppercase tracking-[2px] text-petrol/40">
                      O que está incluído
                    </p>
                    <ul className="space-y-3">
                      {inclusions.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-petrol">
                          <span className="mt-0.5 flex-shrink-0 text-orange">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Lead form */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 rounded-2xl border border-petrol/8 bg-white px-6 py-7"
                  >
                    <p className="text-lg font-bold text-petrol">
                      Pedir orçamento personalizado
                    </p>
                    <p className="mt-1 text-sm text-petrol/50">
                      Enviamos uma proposta detalhada em 24 horas, sem compromisso.
                    </p>

                    <div className="mt-6 space-y-4">
                      <div>
                        <label
                          htmlFor="sim-name"
                          className="mb-1 block font-mono text-[11px] uppercase tracking-[2px] text-petrol/40"
                        >
                          Nome *
                        </label>
                        <input
                          id="sim-name"
                          type="text"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-base text-petrol outline-none transition-colors focus:border-orange"
                          placeholder="O teu nome"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="sim-email"
                          className="mb-1 block font-mono text-[11px] uppercase tracking-[2px] text-petrol/40"
                        >
                          Email *
                        </label>
                        <input
                          id="sim-email"
                          type="email"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-base text-petrol outline-none transition-colors focus:border-orange"
                          placeholder="email@empresa.pt"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="sim-phone"
                          className="mb-1 block font-mono text-[11px] uppercase tracking-[2px] text-petrol/40"
                        >
                          Telefone *
                        </label>
                        <input
                          id="sim-phone"
                          type="tel"
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          className="w-full border-b-2 border-petrol/10 bg-transparent py-3 text-base text-petrol outline-none transition-colors focus:border-orange"
                          placeholder="+351"
                        />
                      </div>

                      {formError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500"
                        >
                          {formError}
                        </motion.p>
                      )}

                      <button
                        onClick={handleLeadSubmit}
                        disabled={loading || !leadName || !leadEmail || !leadPhone}
                        className={`w-full rounded-full py-4 text-sm font-semibold text-white transition-all duration-200 ${
                          loading || !leadName || !leadEmail || !leadPhone
                            ? "cursor-not-allowed bg-orange/40"
                            : "bg-orange hover:scale-[1.02] hover:bg-orange/90"
                        }`}
                      >
                        {loading ? "A enviar..." : "Pedir orçamento personalizado →"}
                      </button>
                    </div>
                  </motion.div>

                  {/* WhatsApp CTA */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 text-center"
                  >
                    <a
                      href="https://wa.me/351937350178?text=Ol%C3%A1%2C%20vim%20do%20simulador%20de%20or%C3%A7amento%20do%20website%20e%20gostava%20de%20saber%20mais."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-petrol/50 transition-colors hover:text-petrol"
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.845L.057 23.57a.75.75 0 0 0 .92.92l5.725-1.463A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.01-1.373l-.36-.214-3.727.952.97-3.644-.234-.374A9.818 9.818 0 1 1 12 21.818z" />
                      </svg>
                      Prefiro falar no WhatsApp
                    </a>
                  </motion.div>

                  <div className="mt-8 text-center">
                    <button
                      onClick={() => {
                        setSelections({ service: null, sector: null, scale: null });
                        setLeadName("");
                        setLeadEmail("");
                        setLeadPhone("");
                        setFormError("");
                        goTo(1);
                      }}
                      className="text-xs text-petrol/30 transition-colors hover:text-petrol/60"
                    >
                      Recomeçar simulação
                    </button>
                  </div>
                </>
              )}
              {!submitted && <BackButton onClick={() => goTo(3)} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Logo link — bottom of page */}
      <div className="pb-8 text-center">
        <Link
          href="/"
          className="font-mono text-xs text-petrol/25 transition-colors hover:text-petrol/50"
        >
          beyondfocus.pt
        </Link>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepHeader({
  step,
  total,
  question,
  sub,
}: {
  step: number;
  total: number;
  question: string;
  sub: string;
}) {
  return (
    <div className="pt-8">
      <p className="font-mono text-[11px] uppercase tracking-[3px] text-orange">
        Passo {step} de {total}
      </p>
      <h2 className="mt-3 text-[clamp(24px,4vw,34px)] font-bold leading-[1.15] tracking-tight text-petrol">
        {question}
      </h2>
      <p className="mt-2 text-sm text-petrol/50">{sub}</p>
    </div>
  );
}

function ServiceCard({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 rounded-2xl border-2 px-5 py-5 text-left transition-all duration-200 ${
        selected
          ? "border-orange bg-orange/8 text-petrol"
          : "border-petrol/10 bg-white text-petrol hover:border-orange/40 hover:bg-orange/4"
      }`}
    >
      <span
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg transition-colors ${
          selected ? "bg-orange text-white" : "bg-petrol/5 text-petrol"
        }`}
      >
        {icon}
      </span>
      <span className="text-sm font-semibold leading-snug">{label}</span>
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="mt-8 text-center">
      <button
        onClick={onClick}
        className="text-sm text-petrol/40 transition-colors hover:text-petrol"
      >
        ← Voltar
      </button>
    </div>
  );
}

function SubmittedState({ serviceLabel }: { serviceLabel: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-8 text-center"
    >
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-petrol">
        <svg
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="font-serif text-[clamp(28px,3vw,38px)] text-petrol">
        Pedido recebido!
      </h3>
      <p className="mx-auto mt-4 max-w-sm text-base text-petrol/50">
        Vamos analisar o teu projecto de <strong className="text-petrol">{serviceLabel}</strong> e responder nas próximas 24 horas com uma proposta personalizada.
      </p>
      <a
        href="/"
        className="mt-8 inline-block rounded-full bg-petrol px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-petrol/90"
      >
        Voltar à homepage →
      </a>
      <p className="mt-4 text-xs text-petrol/30">
        Podes também seguir-nos no{" "}
        <a
          href="https://instagram.com/beyondfocus.pt"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-petrol/60"
        >
          Instagram
        </a>
        {" "}enquanto esperas.
      </p>
    </motion.div>
  );
}
