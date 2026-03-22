"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { SectionHeading } from "@/components/shared/SectionHeading";

const FEATURES = [
  { title: "Progresso em tempo real", description: "Sabe sempre em que fase está o teu projecto." },
  { title: "Aprovações com timecode", description: "Comenta ao segundo exacto. Aprova com um clique." },
  { title: "Mensagens directas", description: "Sem emails perdidos. Tudo num sítio." },
  { title: "Documentos e contratos", description: "Propostas, facturas e contratos sempre acessíveis." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ── Sidebar ── */
function MockSidebar({ activeIndex }: { activeIndex: number }) {
  const sidebarMap = [0, 3, 1, 5];
  const labels = ["Da", "Pj", "En", "Ap", "Ca", "Do", "Rf"];
  return (
    <div className="hidden w-[52px] flex-shrink-0 bg-petrol sm:flex sm:flex-col sm:items-center sm:py-3 sm:gap-0.5">
      <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-[8px] font-bold text-white">BF</div>
      {labels.map((l, i) => (
        <div
          key={i}
          className={`flex h-7 w-7 items-center justify-center rounded-lg text-[7px] font-semibold transition-colors ${
            sidebarMap[activeIndex] === i ? "bg-white/15 text-white" : "text-white/30"
          }`}
        >
          {l}
        </div>
      ))}
      <div className="mt-auto flex h-7 w-7 items-center justify-center rounded-lg text-white/20 text-[7px]">⚙</div>
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
      <div className="flex items-center gap-1.5">
        <div className="flex h-4 w-16 items-center rounded bg-petrol/[0.03] px-1.5">
          <span className="text-[6px] text-petrol/20">⌘K Pesquisar</span>
        </div>
        <div className="relative h-4 w-4 rounded-full bg-petrol/5 flex items-center justify-center">
          <span className="text-[7px] text-petrol/30">🔔</span>
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

/* ── View 0: Dashboard ── */
function DashboardView() {
  return (
    <div className="flex-1 overflow-hidden bg-[#F5F5F5]">
      <MockTopbar breadcrumb="Dashboard" />
      <div className="p-2.5 md:p-3">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="text-[6px] text-petrol/30">Portal / Dashboard</p>
            <p className="text-[9px] font-bold text-petrol/80">Portal do Cliente</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 rounded bg-petrol/5 px-1.5 flex items-center">
              <span className="text-[6px] text-petrol/30">Mar 2025</span>
            </div>
            <div className="h-4 rounded-full bg-petrol/90 px-2 flex items-center">
              <span className="text-[5px] font-semibold text-white">+ Novo pedido</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {/* Activity — tall */}
          <div className="col-span-2 row-span-2 rounded-lg bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="mb-1.5 text-[7px] font-semibold text-petrol/60">Atividade Recente</p>
            {[
              { icon: "🎬", text: "Teaser V3 enviado para revisão", time: "2h" },
              { icon: "💬", text: "Nova mensagem de André Silva", time: "4h" },
              { icon: "✅", text: "Milestone: Rough Cut aprovado", time: "1d" },
              { icon: "📄", text: "Contrato assinado", time: "2d" },
            ].map((a, i) => (
              <div key={i} className="mb-1.5 flex items-start gap-1">
                <span className="text-[7px] mt-0.5">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[6px] leading-tight text-petrol/60 truncate">{a.text}</p>
                  <p className="text-[5px] text-petrol/25">{a.time}</p>
                </div>
              </div>
            ))}
            <div className="mt-1 text-[5px] font-medium text-orange/60">Ver toda a atividade →</div>
          </div>
          {/* Action needed */}
          <div className="col-span-2 rounded-lg bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="mb-1 text-[7px] font-semibold text-petrol/60">Ação Necessária</p>
            <p className="text-[16px] font-bold text-petrol/80 leading-none mb-1">3</p>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <div className="h-1 w-1 rounded-full bg-orange" />
                <span className="text-[5px] text-petrol/50">2 aprovações pendentes</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-1 w-1 rounded-full bg-orange/50" />
                <span className="text-[5px] text-petrol/40">1 mensagem por responder</span>
              </div>
            </div>
          </div>
          {/* Active project */}
          <div className="col-span-2 rounded-lg bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="mb-1 text-[7px] font-semibold text-petrol/60">Projeto Ativo</p>
            <div className="mb-1 flex items-center gap-1">
              <span className="text-[6px] font-semibold text-petrol/70">Campanha Porto 2025</span>
              <span className="rounded-full bg-petrol/10 px-1 py-px text-[4px] font-medium text-petrol/50">Pós-Produção</span>
            </div>
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
            <p className="mt-1 text-[10px] font-bold text-white/80">15 Mar</p>
          </div>
          {/* Milestones */}
          <div className="col-span-4 rounded-lg bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="mb-1.5 text-[7px] font-semibold text-petrol/60">Próximos Milestones</p>
            <div className="flex gap-3">
              {[
                { date: "12 Mar", day: "Qua", title: "Rough Cut", active: true },
                { date: "19 Mar", day: "Qua", title: "Colour Grade", active: false },
                { date: "25 Mar", day: "Ter", title: "Entrega Final", active: false },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className={`h-2 w-2 rounded-full ${m.active ? "bg-orange/60" : "border border-petrol/15"}`} />
                  <div>
                    <p className="text-[5px] text-petrol/25">{m.date} · {m.day}</p>
                    <p className="text-[6px] font-medium text-petrol/50">{m.title}</p>
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
      <MockTopbar breadcrumb="Aprovações" />
      <div className="flex h-[calc(100%-33px)]">
        <div className="flex-1 p-2.5 md:p-3">
          {/* Video player */}
          <div className="relative aspect-video w-full rounded-lg bg-petrol/90 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <div className="ml-0.5 h-0 w-0 border-l-[6px] border-y-[4px] border-l-white border-y-transparent" />
              </div>
            </div>
            <div className="absolute top-2 left-2 rounded bg-black/40 px-1 py-0.5">
              <span className="text-[5px] font-mono text-white/70">Teaser_Porto_V3.mp4</span>
            </div>
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
              <span className="text-[6px] font-mono text-white/50">01:24</span>
              <span className="text-[5px] text-white/30">/</span>
              <span className="text-[6px] font-mono text-white/30">02:14</span>
            </div>
          </div>
          {/* Timeline */}
          <div className="mt-1.5 flex items-center gap-2">
            <div className="h-1 flex-1 rounded-full bg-petrol/10">
              <div className="relative h-full w-[55%] rounded-full bg-orange/60">
                {/* Timecode markers */}
                <div className="absolute top-[-3px] right-0 h-[7px] w-[3px] rounded-full bg-orange" />
              </div>
              {/* Comment markers on timeline */}
              <div className="relative -mt-1">
                <div className="absolute left-[20%] h-1 w-1 rounded-full bg-petrol/30 -top-0.5" />
                <div className="absolute left-[45%] h-1 w-1 rounded-full bg-petrol/30 -top-0.5" />
                <div className="absolute left-[72%] h-1 w-1 rounded-full bg-orange/40 -top-0.5" />
              </div>
            </div>
            <span className="text-[5px] font-mono text-petrol/30">4K · 30fps</span>
          </div>
          {/* Approval buttons */}
          <div className="mt-2 flex gap-1.5">
            <div className="flex h-5 flex-1 items-center justify-center rounded-full bg-petrol/90">
              <span className="text-[6px] font-semibold text-white">✓ Aprovar</span>
            </div>
            <div className="flex h-5 w-24 items-center justify-center rounded-full border border-petrol/15">
              <span className="text-[6px] font-medium text-petrol/40">Pedir alterações</span>
            </div>
          </div>
        </div>
        {/* Comments panel */}
        <div className="hidden w-[35%] border-l border-black/[0.04] bg-white p-2.5 md:flex md:flex-col">
          <p className="mb-2 text-[7px] font-semibold text-petrol/60">Comentários (5)</p>
          <div className="flex-1 space-y-2 overflow-hidden">
            {[
              { name: "Maria S.", time: "00:34", text: "A transição aqui podia ser mais suave", role: "team" },
              { name: "Tu", time: "00:34", text: "Concordo, vou ajustar no próximo corte", role: "client" },
              { name: "André S.", time: "01:12", text: "Cor neste plano precisa de warm up", role: "team" },
            ].map((c, i) => (
              <div key={i} className="flex gap-1.5">
                <div className={`h-4 w-4 flex-shrink-0 rounded-full flex items-center justify-center text-[4px] font-bold text-white ${
                  c.role === "team" ? "bg-petrol/60" : "bg-orange/60"
                }`}>
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
        {/* Conversation list */}
        <div className="w-[38%] border-r border-black/[0.04] bg-white p-2">
          <div className="mb-1.5 flex items-center rounded-lg bg-petrol/[0.03] px-2 py-1">
            <span className="text-[6px] text-petrol/25">🔍 Pesquisar conversas</span>
          </div>
          {[
            { name: "Campanha Porto 2025", preview: "André: Teaser V3 está pronto para review", time: "2h", unread: true },
            { name: "Documentário Setúbal", preview: "Maria: Guião final aprovado ✓", time: "1d", unread: true },
            { name: "Evento Gala Zeiss", preview: "Tu: Vou enviar as fotos amanhã", time: "3d", unread: false },
            { name: "Website Beyond Focus", preview: "Sofia: Design da homepage aprovado", time: "5d", unread: false },
          ].map((c, i) => (
            <div key={i} className={`mb-0.5 flex gap-1.5 rounded-lg p-1.5 ${i === 0 ? "bg-petrol/[0.04]" : ""}`}>
              <div className="h-5 w-5 flex-shrink-0 rounded-full bg-petrol/10 flex items-center justify-center text-[5px] font-bold text-petrol/40">
                {c.name[0]}
              </div>
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
        {/* Chat */}
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
                <p className="text-[5px] text-petrol/60">Teaser V3 está pronto para review. Ajustei a cor e a transição dos 00:34.</p>
                <p className="text-[4px] text-petrol/20 mt-0.5">14:32</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[75%] rounded-xl rounded-tr-sm bg-petrol/90 p-1.5">
                <p className="text-[5px] text-white/80">Vou ver agora. A deadline para o rough cut é quarta, certo?</p>
                <p className="text-[4px] text-white/30 mt-0.5">14:45</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <div className="h-4 w-4 rounded-full bg-petrol/15 flex items-center justify-center text-[4px] font-bold text-petrol/50 flex-shrink-0">A</div>
              <div className="max-w-[75%] rounded-xl rounded-tl-sm bg-white p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <p className="text-[5px] text-petrol/60">Sim, quarta dia 12. Se aprovares hoje, consigo entregar a tempo 👍</p>
                <p className="text-[4px] text-petrol/20 mt-0.5">14:46</p>
              </div>
            </div>
          </div>
          <div className="border-t border-black/[0.04] bg-white p-1.5 flex items-center gap-1.5">
            <span className="text-[7px] text-petrol/20">📎</span>
            <div className="flex-1 rounded-full bg-petrol/[0.03] px-2 py-1">
              <span className="text-[5px] text-petrol/20">Escrever mensagem...</span>
            </div>
            <div className="h-4 w-4 rounded-full bg-orange/20 flex items-center justify-center">
              <span className="text-[6px] text-orange/60">↑</span>
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
      icon: "⚖️",
      label: "Contratos & Jurídico",
      docs: [
        { name: "NDA_BeyondFocus_Cliente.pdf", size: "2.4 MB", date: "12 Jan", type: "PDF", status: "signed", statusLabel: "Assinado" },
        { name: "Contrato_Campanha_Porto.pdf", size: "1.8 MB", date: "18 Jan", type: "PDF", status: "pending", statusLabel: "A aguardar" },
      ],
    },
    {
      icon: "📝",
      label: "Briefings & Guiões",
      docs: [
        { name: "Briefing_Campanha_Porto.docx", size: "890 KB", date: "5 Fev", type: "DOC", status: "signed", statusLabel: "Aprovado" },
        { name: "Guiao_Teaser_V2.docx", size: "1.2 MB", date: "20 Fev", type: "DOC", status: "signed", statusLabel: "Aprovado" },
      ],
    },
    {
      icon: "💰",
      label: "Orçamentos & Faturação",
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
          <div className="flex items-center gap-1">
            <div className="h-4 rounded bg-petrol/5 px-1.5 flex items-center">
              <span className="text-[5px] text-petrol/30">🔍 Pesquisar</span>
            </div>
          </div>
        </div>
        {categories.map((cat) => (
          <div key={cat.label} className="mb-2.5">
            <div className="mb-1 flex items-center gap-1">
              <span className="text-[8px]">{cat.icon}</span>
              <p className="text-[7px] font-semibold text-petrol/60">{cat.label}</p>
            </div>
            {cat.docs.map((doc) => (
              <div key={doc.name} className="mb-1 flex items-center gap-2 rounded-lg bg-white px-2 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className={`flex h-5 w-4 items-center justify-center rounded-sm text-[4px] font-bold text-white ${typeColors[doc.type]}`}>
                  {doc.type}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[6px] font-medium text-petrol/70 truncate">{doc.name}</p>
                  <p className="text-[4px] text-petrol/30">{doc.size} · {doc.date}</p>
                </div>
                <div className={`rounded-full px-1.5 py-0.5 text-[4px] font-semibold ${statusColors[doc.status]}`}>
                  {doc.statusLabel}
                </div>
                <span className="text-[7px] text-petrol/20">⬇</span>
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

        {/* Mockup */}
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

        {/* Features — hover switches view */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-14 grid max-w-[900px] grid-cols-2 gap-8 lg:grid-cols-4"
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
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
              <h3 className="text-sm font-semibold text-petrol">{f.title}</h3>
              <p className="mt-1 text-xs text-petrol/50 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
