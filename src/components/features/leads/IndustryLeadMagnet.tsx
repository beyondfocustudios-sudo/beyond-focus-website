"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Sector = "hotelaria" | "restauracao" | "imobiliario" | "corporate" | "eventos" | "generic";

interface SectorConfig {
  icon: string;
  title: string;
  subtitle: string;
  cta: string;
  magnet: string;
}

const SECTOR_CONFIG: Record<Sector, SectorConfig> = {
  hotelaria: {
    icon: "🏨",
    title: "Checklist: 10 Ideias de Vídeo para Hotéis que Aumentam Reservas Directas",
    subtitle: "Estratégias visuais que hotéis portugueses usam para converter visitantes em hóspedes.",
    cta: "Receber Checklist",
    magnet: "checklist-video-hoteis",
  },
  restauracao: {
    icon: "🍽️",
    title: "Guia: Como Restaurantes Usam Vídeo para Lotar Mesas",
    subtitle: "O que os restaurantes com filas de espera fazem de diferente na sua comunicação visual.",
    cta: "Receber Guia",
    magnet: "guia-video-restaurantes",
  },
  imobiliario: {
    icon: "🏢",
    title: "Template: Plano de Conteúdo Visual para Imobiliárias",
    subtitle: "Estrutura pronta a usar para comunicar propriedades e captar compradores qualificados.",
    cta: "Receber Template",
    magnet: "template-conteudo-imobiliario",
  },
  corporate: {
    icon: "📊",
    title: "Framework: ROI de Vídeo Institucional — Como Calcular o Retorno",
    subtitle: "Metodologia para medir o impacto real do vídeo na captação de clientes e parceiros.",
    cta: "Receber Framework",
    magnet: "framework-roi-video-institucional",
  },
  eventos: {
    icon: "🎬",
    title: "Checklist: O que Pedir à Produtora Antes de um Evento",
    subtitle: "Tudo o que precisas de confirmar para não perder nenhum momento importante.",
    cta: "Receber Checklist",
    magnet: "checklist-eventos-producao",
  },
  generic: {
    icon: "📹",
    title: "Guia: Como Vídeo Transforma Resultados em Empresas",
    subtitle: "Exemplos reais de hotelaria, restauração, imobiliário e corporate. Enviado por email.",
    cta: "Receber Guia",
    magnet: "guia-video-empresas",
  },
};

interface IndustryLeadMagnetProps {
  sector?: Sector;
  source?: string;
}

export function IndustryLeadMagnet({ sector = "generic", source = "blog-inline" }: IndustryLeadMagnetProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const config = SECTOR_CONFIG[sector];

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
          name: name || email.split("@")[0],
          email,
          source,
          magnet: config.magnet,
          sector,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== "undefined" && typeof (window as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
          (window as { gtag?: (...args: unknown[]) => void }).gtag!("event", "content_upgrade_submit", {
            event_category: "lead",
            event_label: sector,
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
    <div className="my-10 rounded-xl overflow-hidden border border-[#0E3A45]/10" style={{ background: "#0E3A45" }}>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 px-6 py-5"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#FA8334]">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-white">Enviado! Verifica o teu email.</p>
              <p className="text-sm text-white/50">Chega em menos de 5 minutos.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 py-6 sm:px-8">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-2xl leading-none mt-0.5" aria-hidden="true">{config.icon}</span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[2px] text-[#FA8334] mb-1">Recurso gratuito</p>
                <h3 className="text-[15px] sm:text-base font-semibold text-white leading-snug">{config.title}</h3>
                <p className="mt-1 text-sm text-white/55 leading-relaxed">{config.subtitle}</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mt-4">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="O teu nome"
                className="flex-1 px-3 py-2.5 rounded-lg border border-white/15 bg-white/10 text-white placeholder-white/35 text-sm outline-none focus:border-[#FA8334] transition"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="O teu email"
                required
                className="flex-1 px-3 py-2.5 rounded-lg border border-white/15 bg-white/10 text-white placeholder-white/35 text-sm outline-none focus:border-[#FA8334] transition"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-[#FA8334] text-white rounded-lg text-sm font-medium hover:bg-[#e5732e] disabled:opacity-60 transition-colors whitespace-nowrap"
              >
                {loading ? "A enviar..." : config.cta}
              </button>
            </form>
            {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
