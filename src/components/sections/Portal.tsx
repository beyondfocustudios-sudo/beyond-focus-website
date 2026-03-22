"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionHeading } from "@/components/shared/SectionHeading";

/* ── Inline SVG Icons (from lucide, matching the real portal) ── */
const s = 14; // sidebar icon size
const d = 16; // dashboard icon size
const f = 20; // feature icon size

function IconLayoutDashboard({ size = s }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>);
}
function IconFolderKanban({ size = s }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 002-2V8a2 2 0 00-2-2h-7.93a2 2 0 01-1.66-.9l-.82-1.2A2 2 0 007.93 3H4a2 2 0 00-2 2v13a2 2 0 002 2z"/><path d="M8 10v4"/><path d="M12 10v2"/><path d="M16 10v6"/></svg>);
}
function IconRocket({ size = s }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>);
}
function IconCheckCircle({ size = s }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
}
function IconCalendarDays({ size = s }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>);
}
function IconFolder({ size = s }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 002-2V8a2 2 0 00-2-2h-7.93a2 2 0 01-1.66-.9l-.82-1.2A2 2 0 007.93 3H4a2 2 0 00-2 2v13a2 2 0 002 2z"/></svg>);
}
function IconLightbulb({ size = s }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 006 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>);
}
function IconSettings({ size = s }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z"/><circle cx="12" cy="12" r="3"/></svg>);
}
function IconShieldAlert({ size = d }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>);
}
function IconMailWarning({ size = d }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10.5V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12c0 1.1.9 2 2 2h12.5"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/><path d="M20 14v4"/><path d="M20 22v.01"/></svg>);
}
function IconFilm({ size = d }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/></svg>);
}
function IconMessageSquare({ size = d }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>);
}
function IconFileText({ size = d }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>);
}
function IconBellRing({ size = d }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 003.4 0"/><path d="M4 2C2.8 3.7 2 5.7 2 8"/><path d="M22 8c0-2.3-.8-4.3-2-6"/></svg>);
}
function IconSearch({ size = d }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
}
function IconDownload({ size = d }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
}
function IconPlay({ size = d }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>);
}
function IconCheck({ size = d }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);
}
function IconPaperclip({ size = d }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>);
}
function IconSend({ size = d }: { size?: number }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>);
}

const FEATURES = [
  { title: "Progresso em tempo real", description: "Sabe sempre em que fase está o teu projecto.", Icon: IconLayoutDashboard },
  { title: "Aprovações com timecode", description: "Comenta ao segundo exacto. Aprova com um clique.", Icon: IconCheckCircle },
  { title: "Mensagens directas", description: "Sem emails perdidos. Tudo num sítio.", Icon: IconMessageSquare },
  { title: "Documentos e contratos", description: "Propostas, facturas e contratos sempre acessíveis.", Icon: IconFolder },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ── Sidebar (real portal icons) ── */
function MockSidebar({ activeIndex }: { activeIndex: number }) {
  const sidebarMap = [0, 3, 1, 5];
  const items = [
    { Icon: IconLayoutDashboard, label: "Dashboard" },
    { Icon: IconFolderKanban, label: "Projetos" },
    { Icon: IconRocket, label: "Entregas" },
    { Icon: IconCheckCircle, label: "Aprovações" },
    { Icon: IconCalendarDays, label: "Calendário" },
    { Icon: IconFolder, label: "Documentos" },
    { Icon: IconLightbulb, label: "Referências" },
  ];
  return (
    <div className="hidden w-[52px] flex-shrink-0 bg-petrol sm:flex sm:flex-col sm:items-center sm:py-3 sm:gap-0.5">
      <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-[8px] font-bold text-white">BF</div>
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
            sidebarMap[activeIndex] === i ? "bg-white/15 text-white" : "text-white/30"
          }`}
        >
          <item.Icon size={13} />
        </div>
      ))}
      <div className="mt-auto text-white/20"><IconSettings size={13} /></div>
    </div>
  );
}

/* ── Topbar ── */
function MockTopbar({ breadcrumb }: { breadcrumb: string }) {
  return (
    <div className="flex items-center justify-between border-b border-black/[0.04] bg-white px-3 py-2">
      <div className="flex items-center gap-1.5">
        <span className="text-[7px] text-petrol/30">Portal</span>
        <span className="text-[7px] text-petrol/15">/</span>
        <span className="text-[7px] font-medium text-petrol/50">{breadcrumb}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex h-4 items-center gap-1 rounded bg-petrol/[0.03] px-1.5">
          <span className="text-petrol/20"><IconSearch size={8} /></span>
          <span className="text-[6px] text-petrol/20">Pesquisar</span>
        </div>
        <div className="relative text-petrol/30">
          <IconBellRing size={12} />
          <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-orange" />
        </div>
        <div className="flex -space-x-1">
          <div className="h-4 w-4 rounded-full bg-petrol/15 border border-white text-[5px] text-white flex items-center justify-center font-bold">MS</div>
          <div className="h-4 w-4 rounded-full bg-orange/30 border border-white text-[5px] text-white flex items-center justify-center font-bold">AS</div>
        </div>
      </div>
    </div>
  );
}

/* ── View 0: Dashboard (FULL WIDTH) ── */
function DashboardView() {
  return (
    <div className="flex-1 overflow-hidden bg-[#F5F5F5]">
      <MockTopbar breadcrumb="Dashboard" />
      <div className="p-2.5 md:p-3 h-[calc(100%-33px)] flex flex-col">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="text-[6px] text-petrol/30">Portal / Dashboard</p>
            <p className="text-[9px] font-bold text-petrol/80">Portal do Cliente</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 rounded bg-petrol/5 px-1.5 flex items-center gap-0.5">
              <span className="text-petrol/25"><IconCalendarDays size={7} /></span>
              <span className="text-[6px] text-petrol/30">Mar 2025</span>
            </div>
            <div className="h-4 rounded-full bg-petrol/90 px-2 flex items-center">
              <span className="text-[5px] font-semibold text-white">+ Novo pedido</span>
            </div>
          </div>
        </div>

        {/* Cards grid — FILLS REMAINING SPACE */}
        <div className="grid flex-1 grid-cols-8 grid-rows-[1fr_1fr] gap-1.5">
          {/* Activity — tall, spans 2 rows */}
          <div className="col-span-2 row-span-2 rounded-lg bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex flex-col">
            <p className="mb-1.5 text-[7px] font-semibold text-petrol/60">Atividade Recente</p>
            <div className="flex-1 space-y-1.5">
              {[
                { Icon: IconFilm, text: "Teaser V3 enviado para revisão", time: "2h", color: "text-orange/60" },
                { Icon: IconMessageSquare, text: "Nova mensagem de André Silva", time: "4h", color: "text-petrol/40" },
                { Icon: IconCheck, text: "Milestone: Rough Cut aprovado", time: "1d", color: "text-green-500/60" },
                { Icon: IconFileText, text: "Contrato assinado", time: "2d", color: "text-petrol/40" },
                { Icon: IconPlay, text: "Preview do Colour Grade", time: "3d", color: "text-orange/50" },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <div className={`mt-0.5 flex-shrink-0 ${a.color}`}><a.Icon size={10} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[5.5px] leading-tight text-petrol/60 truncate">{a.text}</p>
                    <p className="text-[4.5px] text-petrol/25">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-1 text-[5px] font-medium text-orange/60">Ver toda a atividade →</div>
          </div>

          {/* Action needed */}
          <div className="col-span-2 rounded-lg bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="mb-1 text-[7px] font-semibold text-petrol/60">Ação Necessária</p>
            <p className="text-[18px] font-bold text-petrol/80 leading-none mb-1.5">3</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-orange/70"><IconShieldAlert size={10} /></span>
                <span className="text-[5.5px] text-petrol/50">2 aprovações pendentes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-orange/50"><IconMailWarning size={10} /></span>
                <span className="text-[5.5px] text-petrol/40">1 mensagem por responder</span>
              </div>
            </div>
          </div>

          {/* Active project */}
          <div className="col-span-2 rounded-lg bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="mb-1 text-[7px] font-semibold text-petrol/60">Projeto Ativo</p>
            <div className="mb-1 flex items-center gap-1">
              <span className="text-[6px] font-semibold text-petrol/70">Campanha Porto 2025</span>
            </div>
            <span className="inline-block rounded-full bg-petrol/10 px-1 py-px text-[4.5px] font-medium text-petrol/50 mb-1.5">Pós-Produção</span>
            <div className="h-1.5 w-full rounded-full bg-petrol/5">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-petrol/40 to-petrol/25" />
            </div>
            <div className="mt-0.5 flex justify-between">
              <span className="text-[5px] text-petrol/30">68%</span>
              <span className="text-[5px] text-green-500/60">● On Track</span>
            </div>
          </div>

          {/* Next delivery — accent card */}
          <div className="col-span-2 rounded-lg bg-petrol/90 p-2 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
            <p className="text-[6px] text-white/40 mb-1">Próxima Entrega</p>
            <p className="text-[8px] font-bold text-white">Teaser Porto</p>
            <p className="text-[5px] text-white/30">BF-2025-007</p>
            <p className="mt-1.5 text-[12px] font-bold text-white/80">15 Mar</p>
          </div>

          {/* Milestones — bottom left */}
          <div className="col-span-3 rounded-lg bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="mb-1.5 text-[7px] font-semibold text-petrol/60">Próximos Milestones</p>
            <div className="flex gap-4">
              {[
                { date: "12 Mar", day: "Qua", title: "Rough Cut", active: true },
                { date: "19 Mar", day: "Qua", title: "Colour Grade", active: false },
                { date: "25 Mar", day: "Ter", title: "Entrega Final", active: false },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className={`h-2.5 w-2.5 rounded-full ${m.active ? "bg-orange/60" : "border border-dashed border-petrol/20"}`} />
                  <div>
                    <p className="text-[5px] text-petrol/25">{m.date} · {m.day}</p>
                    <p className="text-[6px] font-medium text-petrol/50">{m.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent deliveries — bottom right */}
          <div className="col-span-3 rounded-lg bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="mb-1.5 text-[7px] font-semibold text-petrol/60">Entregas Recentes</p>
            {[
              { name: "Teaser_Porto_V3.mp4", size: "245 MB", badge: true },
              { name: "BTS_Footage.zip", size: "1.2 GB", badge: false },
              { name: "Fotos_Selecção.zip", size: "890 MB", badge: false },
            ].map((file, i) => (
              <div key={i} className="mb-1 flex items-center gap-1.5">
                <span className="text-petrol/30"><IconFilm size={9} /></span>
                <span className="flex-1 text-[5.5px] text-petrol/60 truncate">{file.name}</span>
                <span className="text-[4.5px] text-petrol/25">{file.size}</span>
                {file.badge && <span className="rounded bg-orange/15 px-1 text-[4px] font-bold text-orange/70">NOVO</span>}
                <span className="text-petrol/20"><IconDownload size={8} /></span>
              </div>
            ))}
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
      <MockTopbar breadcrumb="Aprovações" />
      <div className="flex h-[calc(100%-33px)]">
        <div className="flex-1 p-2.5 md:p-3 flex flex-col">
          <div className="relative flex-1 rounded-lg bg-petrol/90 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white">
                <IconPlay size={14} />
              </div>
            </div>
            <div className="absolute top-2 left-2 rounded bg-black/40 px-1.5 py-0.5">
              <span className="text-[5px] font-mono text-white/70">Teaser_Porto_V3.mp4</span>
            </div>
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
              <span className="text-[6px] font-mono text-white/50">01:24</span>
              <span className="text-[5px] text-white/30">/</span>
              <span className="text-[6px] font-mono text-white/30">02:14</span>
            </div>
            <div className="absolute bottom-2 right-2 flex items-center gap-1">
              <span className="text-[5px] font-mono text-white/30">4K · 30fps</span>
            </div>
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <div className="h-1 flex-1 rounded-full bg-petrol/10">
              <div className="relative h-full w-[55%] rounded-full bg-orange/60">
                <div className="absolute top-[-3px] right-0 h-[7px] w-[3px] rounded-full bg-orange" />
              </div>
            </div>
          </div>
          <div className="mt-2 flex gap-1.5">
            <div className="flex h-5 flex-1 items-center justify-center gap-1 rounded-full bg-petrol/90">
              <span className="text-white/80"><IconCheck size={8} /></span>
              <span className="text-[6px] font-semibold text-white">Aprovar</span>
            </div>
            <div className="flex h-5 w-28 items-center justify-center rounded-full border border-petrol/15">
              <span className="text-[6px] font-medium text-petrol/40">Pedir alterações</span>
            </div>
          </div>
        </div>
        <div className="hidden w-[35%] border-l border-black/[0.04] bg-white p-2.5 md:flex md:flex-col">
          <p className="mb-2 text-[7px] font-semibold text-petrol/60">Comentários (5)</p>
          <div className="flex-1 space-y-2 overflow-hidden">
            {[
              { name: "Maria S.", time: "00:34", text: "A transição aqui podia ser mais suave", role: "team" },
              { name: "Tu", time: "00:34", text: "Concordo, vou ajustar no próximo corte", role: "client" },
              { name: "André S.", time: "01:12", text: "Cor neste plano precisa de warm up", role: "team" },
            ].map((c, i) => (
              <div key={i} className="flex gap-1.5">
                <div className={`h-4 w-4 flex-shrink-0 rounded-full flex items-center justify-center text-[4px] font-bold text-white ${c.role === "team" ? "bg-petrol/60" : "bg-orange/60"}`}>
                  {c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[5px] font-semibold text-petrol/60">{c.name}</span>
                    <span className="rounded bg-orange/10 px-0.5 text-[4px] font-mono text-orange/60">{c.time}</span>
                  </div>
                  <p className="text-[5px] leading-tight text-petrol/40">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1 rounded-full border border-petrol/10 px-2 py-1">
            <span className="text-[5px] text-petrol/20">Adicionar comentário...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── View 2: Inbox ── */
function InboxView() {
  return (
    <div className="flex-1 overflow-hidden bg-[#F5F5F5]">
      <MockTopbar breadcrumb="Mensagens" />
      <div className="flex h-[calc(100%-33px)]">
        <div className="w-[38%] border-r border-black/[0.04] bg-white p-2">
          <div className="mb-1.5 flex items-center gap-1 rounded-lg bg-petrol/[0.03] px-2 py-1">
            <span className="text-petrol/20"><IconSearch size={8} /></span>
            <span className="text-[6px] text-petrol/25">Pesquisar conversas</span>
          </div>
          {[
            { name: "Campanha Porto 2025", preview: "André: Teaser V3 está pronto", time: "2h", unread: true },
            { name: "Documentário Setúbal", preview: "Maria: Guião final aprovado", time: "1d", unread: true },
            { name: "Evento Gala Zeiss", preview: "Tu: Envio as fotos amanhã", time: "3d", unread: false },
            { name: "Website Beyond Focus", preview: "Sofia: Homepage aprovada", time: "5d", unread: false },
          ].map((c, i) => (
            <div key={i} className={`mb-0.5 flex gap-1.5 rounded-lg p-1.5 ${i === 0 ? "bg-petrol/[0.04]" : ""}`}>
              <div className="h-5 w-5 flex-shrink-0 rounded-full bg-petrol/10 flex items-center justify-center text-[5px] font-bold text-petrol/40">{c.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-0.5">
                  <span className="text-[6px] font-semibold text-petrol/70 truncate">{c.name}</span>
                  <span className="text-[5px] text-petrol/25 flex-shrink-0">{c.time}</span>
                </div>
                <p className="text-[5px] text-petrol/35 truncate">{c.preview}</p>
              </div>
              {c.unread && <div className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange" />}
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col bg-[#FAFAFA]">
          <div className="border-b border-black/[0.04] bg-white px-3 py-1.5">
            <p className="text-[7px] font-semibold text-petrol/70">Campanha Porto 2025</p>
            <p className="text-[5px] text-petrol/30">André Silva, Maria Santos, Tu</p>
          </div>
          <div className="flex-1 p-2.5 space-y-2">
            <div className="flex gap-1.5">
              <div className="h-4 w-4 rounded-full bg-petrol/15 flex items-center justify-center text-[4px] font-bold text-petrol/50 flex-shrink-0">A</div>
              <div className="max-w-[75%] rounded-xl rounded-tl-sm bg-white p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <p className="text-[5px] font-semibold text-petrol/50 mb-0.5">André Silva</p>
                <p className="text-[5px] text-petrol/60">Teaser V3 está pronto para review. Ajustei a transição dos 00:34.</p>
                <p className="text-[4px] text-petrol/20 mt-0.5">14:32</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[75%] rounded-xl rounded-tr-sm bg-petrol/90 p-1.5">
                <p className="text-[5px] text-white/80">Vou ver agora. A deadline é quarta, certo?</p>
                <p className="text-[4px] text-white/30 mt-0.5">14:45</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <div className="h-4 w-4 rounded-full bg-petrol/15 flex items-center justify-center text-[4px] font-bold text-petrol/50 flex-shrink-0">A</div>
              <div className="max-w-[75%] rounded-xl rounded-tl-sm bg-white p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <p className="text-[5px] text-petrol/60">Sim, quarta dia 12. Se aprovares hoje, entrego a tempo.</p>
                <p className="text-[4px] text-petrol/20 mt-0.5">14:46</p>
              </div>
            </div>
          </div>
          <div className="border-t border-black/[0.04] bg-white p-1.5 flex items-center gap-1.5">
            <span className="text-petrol/20"><IconPaperclip size={10} /></span>
            <div className="flex-1 rounded-full bg-petrol/[0.03] px-2 py-1">
              <span className="text-[5px] text-petrol/20">Escrever mensagem...</span>
            </div>
            <div className="h-4 w-4 rounded-full bg-orange/20 flex items-center justify-center text-orange/60">
              <IconSend size={8} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── View 3: Documents ── */
function DocumentsView() {
  const categories = [
    {
      Icon: IconShieldAlert, label: "Contratos & Jurídico",
      docs: [
        { name: "NDA_BeyondFocus_Cliente.pdf", size: "2.4 MB", date: "12 Jan", type: "PDF", status: "signed", statusLabel: "Assinado" },
        { name: "Contrato_Campanha_Porto.pdf", size: "1.8 MB", date: "18 Jan", type: "PDF", status: "pending", statusLabel: "A aguardar" },
      ],
    },
    {
      Icon: IconFileText, label: "Briefings & Guiões",
      docs: [
        { name: "Briefing_Campanha_Porto.docx", size: "890 KB", date: "5 Fev", type: "DOC", status: "signed", statusLabel: "Aprovado" },
        { name: "Guiao_Teaser_V2.docx", size: "1.2 MB", date: "20 Fev", type: "DOC", status: "signed", statusLabel: "Aprovado" },
      ],
    },
    {
      Icon: IconFolder, label: "Orçamentos & Faturação",
      docs: [
        { name: "Proposta_BF-2025-007.pdf", size: "520 KB", date: "8 Jan", type: "PDF", status: "signed", statusLabel: "Aceite" },
        { name: "Fatura_001_2025.xlsx", size: "340 KB", date: "1 Mar", type: "XLS", status: "pending", statusLabel: "Pendente" },
      ],
    },
  ];
  const typeColors: Record<string, string> = { PDF: "bg-red-400/80", DOC: "bg-blue-400/80", XLS: "bg-green-400/80" };
  const statusColors: Record<string, string> = { signed: "bg-green-100 text-green-600", pending: "bg-amber-100 text-amber-600" };

  return (
    <div className="flex-1 overflow-hidden bg-[#F5F5F5]">
      <MockTopbar breadcrumb="Documentos" />
      <div className="p-2.5 md:p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[9px] font-bold text-petrol/80">Documentos</p>
          <div className="flex h-4 items-center gap-1 rounded bg-petrol/5 px-1.5">
            <span className="text-petrol/20"><IconSearch size={8} /></span>
            <span className="text-[5px] text-petrol/30">Pesquisar</span>
          </div>
        </div>
        {categories.map((cat) => (
          <div key={cat.label} className="mb-2.5">
            <div className="mb-1 flex items-center gap-1.5">
              <span className="text-petrol/40"><cat.Icon size={11} /></span>
              <p className="text-[7px] font-semibold text-petrol/60">{cat.label}</p>
            </div>
            {cat.docs.map((doc) => (
              <div key={doc.name} className="mb-1 flex items-center gap-2 rounded-lg bg-white px-2 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className={`flex h-5 w-4 items-center justify-center rounded-sm text-[4px] font-bold text-white ${typeColors[doc.type]}`}>{doc.type}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[6px] font-medium text-petrol/70 truncate">{doc.name}</p>
                  <p className="text-[4px] text-petrol/30">{doc.size} · {doc.date}</p>
                </div>
                <div className={`rounded-full px-1.5 py-0.5 text-[4px] font-semibold ${statusColors[doc.status]}`}>{doc.statusLabel}</div>
                <span className="text-petrol/20"><IconDownload size={9} /></span>
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
                {(() => { const V = VIEWS[activeView]; return <V />; })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Features with real icons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-14 grid max-w-[900px] grid-cols-2 gap-8 lg:grid-cols-4"
        >
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              variants={itemVariants}
              onMouseEnter={() => setActiveView(i)}
              onClick={() => setActiveView(i)}
              className={`cursor-pointer text-center transition-opacity duration-300 ${
                activeView === i ? "opacity-100" : "opacity-50 hover:opacity-80"
              }`}
            >
              <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${
                activeView === i ? "bg-orange/10 text-orange" : "bg-petrol/5 text-petrol/30"
              }`}>
                <feat.Icon size={f} />
              </div>
              <h3 className="text-sm font-semibold text-petrol">{feat.title}</h3>
              <p className="mt-1 text-xs text-petrol/50 leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
