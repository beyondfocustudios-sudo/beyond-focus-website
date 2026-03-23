"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    eyebrow: "Progresso em tempo real",
    title: "Sabe sempre onde está o teu projecto.",
    description: "Dashboard intuitivo com o estado de cada fase — desde a proposta até à entrega final. Milestones, calendário e timeline num só ecrã.",
    mockup: "dashboard",
  },
  {
    eyebrow: "Aprovações com timecode",
    title: "Comenta ao segundo exacto. Aprova com um clique.",
    description: "Player de vídeo integrado com comentários por timecode. Marca o momento exacto, escreve o teu feedback, e aprova ou pede alterações — sem sair do portal.",
    mockup: "review",
  },
  {
    eyebrow: "Mensagens directas",
    title: "Sem emails perdidos. Tudo num sítio.",
    description: "Comunica directamente com a equipa da Beyond Focus. Mensagens organizadas por projecto, sem ruído, sem threads perdidas.",
    mockup: "inbox",
  },
  {
    eyebrow: "Documentos e contratos",
    title: "Propostas, facturas e contratos sempre acessíveis.",
    description: "Todos os documentos do projecto num único local. Acesso 24/7, download imediato, histórico completo.",
    mockup: "documents",
  },
];

/* ── Mockup views ── */
function DashboardMock() {
  return (
    <div className="h-full bg-[#F5F5F5] p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="h-2 w-20 rounded-full bg-petrol/10" />
        <div className="h-4 w-16 rounded-full bg-petrol/90"><div className="mx-auto mt-1 h-1.5 w-10 rounded-full bg-white/40" /></div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-1 row-span-2 rounded-lg bg-white p-2 shadow-sm">
          <div className="h-1.5 w-14 rounded-full bg-petrol/10 mb-2" />
          {[1,2,3].map(n => (<div key={n} className="mb-2 flex gap-1.5"><div className="h-4 w-4 rounded-full bg-petrol/8 flex-shrink-0" /><div className="flex-1"><div className="h-1 w-full rounded-full bg-petrol/6 mb-0.5" /><div className="h-1 w-2/3 rounded-full bg-petrol/4" /></div></div>))}
        </div>
        <div className="rounded-lg bg-white p-2 shadow-sm">
          <div className="h-1.5 w-12 rounded-full bg-petrol/10 mb-1" />
          <p className="text-[14px] font-bold text-petrol/60">3</p>
          <div className="mt-1 flex gap-1"><div className="h-1 w-1 rounded-full bg-orange" /><div className="h-1 flex-1 rounded-full bg-petrol/6" /></div>
        </div>
        <div className="rounded-lg bg-white p-2 shadow-sm">
          <div className="h-1.5 w-16 rounded-full bg-petrol/10 mb-1" />
          <div className="h-1.5 w-full rounded-full bg-petrol/5 mt-2"><div className="h-full w-[68%] rounded-full bg-petrol/25" /></div>
          <div className="mt-0.5 flex justify-between"><div className="h-1 w-4 rounded-full bg-petrol/6" /><div className="h-1 w-3 rounded-full bg-green-500/30" /></div>
        </div>
        <div className="col-span-2 rounded-lg bg-white p-2 shadow-sm">
          <div className="h-1.5 w-20 rounded-full bg-petrol/10 mb-1.5" />
          <div className="flex gap-3">{[1,2,3].map(n => (<div key={n} className="flex items-center gap-1"><div className={`h-2 w-2 rounded-full ${n===1?"bg-orange/50":"border border-dashed border-petrol/15"}`}/><div><div className="h-1 w-6 rounded-full bg-petrol/5" /><div className="h-1 w-10 rounded-full bg-petrol/8 mt-0.5" /></div></div>))}</div>
        </div>
      </div>
    </div>
  );
}

function ReviewMock() {
  return (
    <div className="flex h-full bg-[#F5F5F5]">
      <div className="flex-1 p-3 flex flex-col">
        <div className="relative flex-1 rounded-lg bg-petrol/90 flex items-center justify-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <div className="ml-0.5 h-0 w-0 border-l-[7px] border-y-[4px] border-l-white border-y-transparent" />
          </div>
          <div className="absolute bottom-2 left-2"><div className="h-1 w-10 rounded-full bg-white/30" /></div>
        </div>
        <div className="mt-2 h-1 w-full rounded-full bg-petrol/8"><div className="h-full w-[45%] rounded-full bg-orange/50" /></div>
        <div className="mt-2 flex gap-1.5">
          <div className="h-5 flex-1 rounded-full bg-petrol/90"><div className="mx-auto mt-1.5 h-1.5 w-10 rounded-full bg-white/40" /></div>
          <div className="h-5 w-20 rounded-full border border-petrol/15" />
        </div>
      </div>
      <div className="hidden w-[35%] border-l border-black/[0.04] bg-white p-2.5 md:block">
        <div className="h-1.5 w-14 rounded-full bg-petrol/10 mb-2" />
        {[1,2,3].map(n => (<div key={n} className="mb-2 flex gap-1.5"><div className={`h-4 w-4 rounded-full flex-shrink-0 ${n%2?"bg-petrol/15":"bg-orange/20"}`}/><div className="flex-1"><div className="flex gap-1 mb-0.5"><div className="h-1 w-8 rounded-full bg-petrol/10" /><div className="h-2.5 w-6 rounded bg-orange/10" /></div><div className="h-1 w-full rounded-full bg-petrol/5" /></div></div>))}
      </div>
    </div>
  );
}

function InboxMock() {
  return (
    <div className="flex h-full bg-[#F5F5F5]">
      <div className="w-[40%] border-r border-black/[0.04] bg-white p-2">
        <div className="mb-1.5 h-5 rounded-lg bg-petrol/[0.03] px-2 flex items-center"><div className="h-1 w-12 rounded-full bg-petrol/10" /></div>
        {[1,2,3,4].map(n => (<div key={n} className={`mb-1 flex gap-1.5 rounded-lg p-1.5 ${n===1?"bg-petrol/[0.04]":""}`}><div className="h-5 w-5 rounded-full bg-petrol/10 flex-shrink-0" /><div className="flex-1 min-w-0"><div className="flex justify-between mb-0.5"><div className="h-1.5 w-16 rounded-full bg-petrol/10" /><div className="h-1 w-4 rounded-full bg-petrol/5" /></div><div className="h-1 w-full rounded-full bg-petrol/5" />{n<=2&&<div className="mt-1 h-1.5 w-1.5 rounded-full bg-orange" />}</div></div>))}
      </div>
      <div className="flex flex-1 flex-col bg-[#FAFAFA]">
        <div className="border-b border-black/[0.04] bg-white px-3 py-1.5"><div className="h-2 w-28 rounded-full bg-petrol/10" /><div className="h-1 w-20 rounded-full bg-petrol/5 mt-0.5" /></div>
        <div className="flex-1 p-2.5 space-y-2">
          <div className="flex gap-1.5"><div className="h-4 w-4 rounded-full bg-petrol/10 flex-shrink-0" /><div className="max-w-[70%] rounded-xl rounded-tl-sm bg-white p-1.5 shadow-sm"><div className="h-1 w-20 rounded-full bg-petrol/8 mb-0.5" /><div className="h-1 w-14 rounded-full bg-petrol/5" /></div></div>
          <div className="flex justify-end"><div className="max-w-[70%] rounded-xl rounded-tr-sm bg-petrol/90 p-1.5"><div className="h-1 w-16 rounded-full bg-white/30 mb-0.5" /><div className="h-1 w-24 rounded-full bg-white/20" /></div></div>
        </div>
        <div className="border-t border-black/[0.04] bg-white p-1.5 flex items-center gap-1.5"><div className="h-4 w-4 rounded-full bg-petrol/5" /><div className="h-6 flex-1 rounded-full bg-petrol/[0.03]" /><div className="h-4 w-4 rounded-full bg-orange/20" /></div>
      </div>
    </div>
  );
}

function DocumentsMock() {
  return (
    <div className="h-full bg-[#F5F5F5] p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="h-2.5 w-20 rounded-full bg-petrol/12" />
        <div className="h-4 w-14 rounded bg-petrol/5" />
      </div>
      {["red", "blue", "green"].map((color, ci) => (
        <div key={ci} className="mb-2.5">
          <div className="mb-1 flex items-center gap-1.5"><div className="h-3 w-3 rounded bg-petrol/8" /><div className="h-1.5 w-16 rounded-full bg-petrol/10" /></div>
          {[1,2].map(n => (
            <div key={n} className="mb-1 flex items-center gap-2 rounded-lg bg-white px-2 py-1.5 shadow-sm">
              <div className={`h-5 w-4 rounded-sm text-[4px] font-bold text-white flex items-center justify-center ${color==="red"?"bg-red-400/80":color==="blue"?"bg-blue-400/80":"bg-green-400/80"}`}>{color==="red"?"PDF":color==="blue"?"DOC":"XLS"}</div>
              <div className="flex-1 min-w-0"><div className="h-1.5 w-24 rounded-full bg-petrol/8 mb-0.5" /><div className="h-1 w-14 rounded-full bg-petrol/5" /></div>
              <div className={`h-3.5 w-12 rounded-full flex items-center justify-center ${n===1?"bg-green-100":"bg-amber-100"}`}><div className={`h-1 w-7 rounded-full ${n===1?"bg-green-400/50":"bg-amber-400/50"}`} /></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const MOCKUP_MAP: Record<string, React.FC> = {
  dashboard: DashboardMock,
  review: ReviewMock,
  inbox: InboxMock,
  documents: DocumentsMock,
};

export function PortalFeatures() {
  return (
    <section id="features" className="bg-bg-light py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-[60px]">
        {FEATURES.map((feature, i) => {
          const MockComponent = MOCKUP_MAP[feature.mockup];
          const reversed = i % 2 === 1;
          return (
            <motion.div
              key={feature.eyebrow}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`grid grid-cols-1 items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 ${
                i < FEATURES.length - 1 ? "border-b border-petrol/8" : ""
              } ${reversed ? "lg:[direction:rtl]" : ""}`}
            >
              {/* Text */}
              <div className={reversed ? "lg:[direction:ltr]" : ""}>
                <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
                  {feature.eyebrow}
                </p>
                <h2 className="mt-3 text-[clamp(24px,2.5vw,36px)] leading-tight text-petrol">
                  {feature.title}
                </h2>
                <p className="mt-4 max-w-[440px] text-base leading-relaxed text-petrol/60">
                  {feature.description}
                </p>
              </div>

              {/* Mockup */}
              <div className={`overflow-hidden rounded-2xl border border-petrol/10 bg-white shadow-lg ${reversed ? "lg:[direction:ltr]" : ""}`} style={{ aspectRatio: "16/10" }}>
                <div className="flex h-full">
                  <div className="hidden w-10 flex-shrink-0 bg-petrol sm:flex sm:flex-col sm:items-center sm:py-2 sm:gap-0.5">
                    <div className="mb-2 h-5 w-5 rounded bg-white/15" />
                    {[1,2,3,4,5].map(n => (<div key={n} className={`h-4 w-4 rounded ${n===1?"bg-white/15":"bg-white/5"}`} />))}
                  </div>
                  <div className="flex-1">
                    <MockComponent />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
