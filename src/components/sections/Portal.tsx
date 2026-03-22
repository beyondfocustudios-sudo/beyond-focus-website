"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionHeading } from "@/components/shared/SectionHeading";

const FEATURES = [
  {
    title: "Progresso em tempo real",
    description: "Sabe sempre em que fase está o teu projecto.",
  },
  {
    title: "Aprovações com timecode",
    description: "Comenta ao segundo exacto. Aprova com um clique.",
  },
  {
    title: "Mensagens directas",
    description: "Sem emails perdidos. Tudo num sítio.",
  },
  {
    title: "Documentos e contratos",
    description: "Propostas, facturas e contratos sempre acessíveis.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ── Sidebar (shared by all views) ── */
function MockSidebar({ activeIndex }: { activeIndex: number }) {
  const icons = [
    /* Dashboard */ <rect key="d" x="4" y="4" width="7" height="7" rx="1" fill="currentColor" opacity="0.5" />,
    /* Projects */ <><rect key="p1" x="3" y="3" width="12" height="3" rx="1" fill="currentColor" opacity="0.4" /><rect key="p2" x="3" y="8" width="12" height="3" rx="1" fill="currentColor" opacity="0.4" /><rect key="p3" x="3" y="13" width="8" height="3" rx="1" fill="currentColor" opacity="0.4" /></>,
    /* Deliveries */ <circle key="r" cx="9" cy="9" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />,
    /* Approvals */ <path key="a" d="M6 9l3 3 5-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />,
    /* Calendar */ <><rect key="c1" x="3" y="4" width="12" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4" /><line key="c2" x1="3" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.3" /></>,
    /* Documents */ <><rect key="f1" x="4" y="3" width="10" height="13" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4" /><line key="f2" x1="6" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1" opacity="0.3" /><line key="f3" x1="6" y1="10" x2="10" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.3" /></>,
    /* References */ <circle key="l" cx="9" cy="6" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />,
  ];

  // Map feature index to sidebar highlight
  const sidebarActive = [0, 3, 1, 5]; // Dashboard, Approvals, Projects(inbox), Documents

  return (
    <div className="hidden w-[52px] flex-shrink-0 bg-petrol sm:flex sm:flex-col sm:items-center sm:py-4 sm:gap-1">
      {/* Logo dot */}
      <div className="mb-4 h-6 w-6 rounded-lg bg-white/15" />
      {/* Nav icons */}
      {icons.map((icon, i) => (
        <div
          key={i}
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
            sidebarActive[activeIndex] === i ? "bg-white/15 text-white" : "text-white/40"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">{icon}</svg>
        </div>
      ))}
    </div>
  );
}

/* ── Topbar (shared) ── */
function MockTopbar() {
  return (
    <div className="flex items-center justify-between border-b border-black/[0.04] bg-white px-4 py-2.5">
      <div className="flex items-center gap-2">
        <div className="h-2 w-16 rounded-full bg-petrol/10" />
        <div className="h-2 w-2 rounded-full bg-petrol/5" />
        <div className="h-2 w-20 rounded-full bg-petrol/8" />
      </div>
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded-full bg-petrol/5" />
        <div className="flex -space-x-1.5">
          <div className="h-5 w-5 rounded-full bg-petrol/10 border-2 border-white" />
          <div className="h-5 w-5 rounded-full bg-orange/15 border-2 border-white" />
        </div>
      </div>
    </div>
  );
}

/* ── View 0: Dashboard ── */
function DashboardView() {
  return (
    <div className="flex-1 overflow-hidden bg-[#F5F5F5]">
      <MockTopbar />
      <div className="p-3 md:p-4">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="h-1.5 w-10 rounded-full bg-petrol/8 mb-1" />
            <div className="h-2.5 w-24 rounded-full bg-petrol/15" />
          </div>
          <div className="h-6 w-20 rounded-full bg-petrol/90 flex items-center justify-center">
            <div className="h-1.5 w-12 rounded-full bg-white/40" />
          </div>
        </div>
        {/* Cards grid — replicates real dashboard */}
        <div className="grid grid-cols-6 gap-2">
          {/* Activity card — tall */}
          <div className="col-span-2 row-span-2 rounded-lg bg-white p-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="mb-2 h-1.5 w-16 rounded-full bg-petrol/10" />
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="mb-2 flex items-start gap-1.5">
                <div className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-petrol/8" />
                <div className="flex-1">
                  <div className="h-1.5 w-full rounded-full bg-petrol/8 mb-1" />
                  <div className="h-1 w-3/4 rounded-full bg-petrol/5" />
                </div>
              </div>
            ))}
          </div>
          {/* Action needed */}
          <div className="col-span-2 rounded-lg bg-white p-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="mb-1.5 h-1.5 w-14 rounded-full bg-petrol/10" />
            <div className="mb-2 text-[18px] font-bold text-petrol/80 leading-none">3</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="h-1 w-1 rounded-full bg-orange" />
                <div className="h-1.5 flex-1 rounded-full bg-petrol/8" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-1 w-1 rounded-full bg-orange/50" />
                <div className="h-1.5 w-3/4 rounded-full bg-petrol/6" />
              </div>
            </div>
          </div>
          {/* Active project */}
          <div className="col-span-2 rounded-lg bg-white p-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="mb-1.5 h-1.5 w-20 rounded-full bg-petrol/10" />
            <div className="mb-1 flex items-center gap-1.5">
              <div className="h-3 w-14 rounded-full bg-petrol/8" />
              <div className="h-3 w-12 rounded-full bg-orange/15" />
            </div>
            {/* Progress bar */}
            <div className="mt-2 h-1.5 w-full rounded-full bg-petrol/5">
              <div className="h-full w-[68%] rounded-full bg-petrol/30" />
            </div>
            <div className="mt-1 flex justify-between">
              <div className="h-1 w-6 rounded-full bg-petrol/8" />
              <div className="h-1 w-4 rounded-full bg-petrol/5" />
            </div>
          </div>
          {/* Milestones */}
          <div className="col-span-4 rounded-lg bg-white p-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="mb-2 h-1.5 w-20 rounded-full bg-petrol/10" />
            <div className="flex gap-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex items-center gap-1.5">
                  <div className={`h-2.5 w-2.5 rounded-full ${n === 1 ? "bg-orange/50" : "border border-petrol/15"}`} />
                  <div>
                    <div className="h-1 w-8 rounded-full bg-petrol/8 mb-0.5" />
                    <div className="h-1.5 w-14 rounded-full bg-petrol/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── View 1: Review / Approvals ── */
function ReviewView() {
  return (
    <div className="flex-1 overflow-hidden bg-[#F5F5F5]">
      <MockTopbar />
      <div className="flex h-[calc(100%-37px)]">
        {/* Video player area */}
        <div className="flex-1 p-3 md:p-4">
          {/* Video */}
          <div className="relative aspect-video w-full rounded-lg bg-petrol/90 overflow-hidden">
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <div className="ml-0.5 h-0 w-0 border-l-[8px] border-y-[5px] border-l-white border-y-transparent" />
              </div>
            </div>
            {/* Timecode */}
            <div className="absolute bottom-2 left-2 flex items-center gap-1">
              <div className="h-1.5 w-10 rounded-full bg-white/30" />
            </div>
          </div>
          {/* Timeline scrubber */}
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1 flex-1 rounded-full bg-petrol/10">
              <div className="h-full w-[35%] rounded-full bg-orange/60" />
            </div>
            <div className="h-1.5 w-8 rounded-full bg-petrol/8" />
          </div>
          {/* Approval buttons */}
          <div className="mt-2 flex gap-2">
            <div className="h-6 flex-1 rounded-full bg-petrol/90 flex items-center justify-center">
              <div className="h-1.5 w-12 rounded-full bg-white/40" />
            </div>
            <div className="h-6 w-20 rounded-full border border-petrol/15 flex items-center justify-center">
              <div className="h-1.5 w-10 rounded-full bg-petrol/15" />
            </div>
          </div>
        </div>
        {/* Comments panel */}
        <div className="hidden w-[35%] border-l border-black/[0.04] bg-white p-3 md:block">
          <div className="mb-3 h-2 w-16 rounded-full bg-petrol/10" />
          {[1, 2, 3].map((n) => (
            <div key={n} className="mb-3 flex gap-2">
              <div className="h-5 w-5 flex-shrink-0 rounded-full bg-petrol/10" />
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="h-1.5 w-10 rounded-full bg-petrol/10" />
                  <div className="h-3 w-8 rounded-full bg-orange/10 flex items-center justify-center">
                    <div className="h-1 w-5 rounded-full bg-orange/30" />
                  </div>
                </div>
                <div className="h-1 w-full rounded-full bg-petrol/6 mb-0.5" />
                <div className="h-1 w-2/3 rounded-full bg-petrol/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── View 2: Inbox / Messages ── */
function InboxView() {
  return (
    <div className="flex-1 overflow-hidden bg-[#F5F5F5]">
      <MockTopbar />
      <div className="flex h-[calc(100%-37px)]">
        {/* Conversation list */}
        <div className="w-[40%] border-r border-black/[0.04] bg-white p-2.5">
          <div className="mb-2 h-6 w-full rounded-lg bg-petrol/5 flex items-center px-2">
            <div className="h-1.5 w-14 rounded-full bg-petrol/10" />
          </div>
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`mb-1 flex gap-2 rounded-lg p-2 ${n === 1 ? "bg-petrol/5" : ""}`}
            >
              <div className="h-6 w-6 flex-shrink-0 rounded-full bg-petrol/10" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-0.5">
                  <div className="h-1.5 w-16 rounded-full bg-petrol/12" />
                  <div className="h-1 w-6 rounded-full bg-petrol/6" />
                </div>
                <div className="h-1 w-full rounded-full bg-petrol/6" />
                {n <= 2 && <div className="mt-1 h-1.5 w-1.5 rounded-full bg-orange" />}
              </div>
            </div>
          ))}
        </div>
        {/* Chat area */}
        <div className="flex flex-1 flex-col bg-[#FAFAFA]">
          <div className="flex-1 p-3 space-y-2">
            {/* Messages */}
            <div className="flex gap-2">
              <div className="h-5 w-5 rounded-full bg-petrol/10 flex-shrink-0" />
              <div className="max-w-[70%] rounded-xl rounded-tl-sm bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <div className="h-1 w-24 rounded-full bg-petrol/8 mb-1" />
                <div className="h-1 w-16 rounded-full bg-petrol/6" />
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[70%] rounded-xl rounded-tr-sm bg-petrol/90 p-2">
                <div className="h-1 w-20 rounded-full bg-white/30 mb-1" />
                <div className="h-1 w-28 rounded-full bg-white/25" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-5 w-5 rounded-full bg-petrol/10 flex-shrink-0" />
              <div className="max-w-[70%] rounded-xl rounded-tl-sm bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <div className="h-1 w-32 rounded-full bg-petrol/8 mb-1" />
                <div className="h-1 w-20 rounded-full bg-petrol/6" />
              </div>
            </div>
          </div>
          {/* Input */}
          <div className="border-t border-black/[0.04] bg-white p-2 flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-petrol/8" />
            <div className="h-7 flex-1 rounded-full bg-petrol/5" />
            <div className="h-5 w-5 rounded-full bg-orange/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── View 3: Documents ── */
function DocumentsView() {
  return (
    <div className="flex-1 overflow-hidden bg-[#F5F5F5]">
      <MockTopbar />
      <div className="p-3 md:p-4">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="h-2.5 w-20 rounded-full bg-petrol/15" />
          <div className="h-5 w-16 rounded-full bg-petrol/8 flex items-center justify-center">
            <div className="h-1.5 w-10 rounded-full bg-petrol/15" />
          </div>
        </div>
        {/* Category sections */}
        {["Contratos", "Briefings", "Faturação"].map((cat, ci) => (
          <div key={cat} className="mb-3">
            <div className="mb-1.5 flex items-center gap-1.5">
              <div className="h-3.5 w-3.5 rounded bg-petrol/8" />
              <div className="h-1.5 w-16 rounded-full bg-petrol/10" />
            </div>
            {[1, 2].map((n) => (
              <div
                key={n}
                className="mb-1 flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
              >
                {/* File icon */}
                <div className={`h-6 w-5 rounded-sm flex items-center justify-center text-[6px] font-bold text-white ${
                  ci === 0 ? "bg-red-400/80" : ci === 1 ? "bg-blue-400/80" : "bg-green-400/80"
                }`}>
                  {ci === 0 ? "PDF" : ci === 1 ? "DOC" : "XLS"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="h-1.5 w-28 rounded-full bg-petrol/10 mb-0.5" />
                  <div className="h-1 w-16 rounded-full bg-petrol/6" />
                </div>
                {/* Status badge */}
                <div className={`h-4 w-14 rounded-full flex items-center justify-center ${
                  n === 1 ? "bg-green-100" : "bg-amber-100"
                }`}>
                  <div className={`h-1 w-8 rounded-full ${
                    n === 1 ? "bg-green-400/50" : "bg-amber-400/50"
                  }`} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const VIEWS = [DashboardView, ReviewView, InboxView, DocumentsView];

export function Portal() {
  const [activeView, setActiveView] = useState(0);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 text-center md:px-10 lg:px-10">
        <Eyebrow>BEYOND FOCUS PORTAL</Eyebrow>
        <SectionHeading className="mx-auto mt-3 max-w-lg">
          O teu projecto. Sempre à mão.
        </SectionHeading>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-base text-petrol/50 leading-relaxed"
        >
          Um espaço dedicado onde acompanhas cada fase do projecto, aprovas entregas e comunicas com a equipa — tudo num só sítio.
        </motion.p>

        {/* Portal Mockup — with view switching */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-[900px] overflow-hidden rounded-2xl border border-petrol/10 bg-[#F5F5F5] shadow-xl"
          style={{ aspectRatio: "16/10" }}
        >
          <div className="flex h-full">
            <MockSidebar activeIndex={activeView} />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-1"
              >
                {(() => {
                  const View = VIEWS[activeView];
                  return <View />;
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 4 Features — hover to switch view */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-14 grid max-w-[900px] grid-cols-2 gap-8 lg:grid-cols-4"
        >
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              onMouseEnter={() => setActiveView(i)}
              onClick={() => setActiveView(i)}
              className={`cursor-pointer text-center transition-opacity duration-300 ${
                activeView === i ? "opacity-100" : "opacity-50 hover:opacity-80"
              }`}
            >
              <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${
                activeView === i ? "bg-orange/10" : "bg-petrol/5"
              }`}>
                <div className={`h-4 w-4 rounded-full transition-colors duration-300 ${
                  activeView === i ? "bg-orange/50" : "bg-petrol/10"
                }`} />
              </div>
              <h3 className="text-sm font-semibold text-petrol">{feature.title}</h3>
              <p className="mt-1 text-xs text-petrol/50 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
