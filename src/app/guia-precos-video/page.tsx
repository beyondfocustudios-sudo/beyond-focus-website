import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BlogEmailCapture } from "@/components/features/blog/BlogEmailCapture";

export const metadata: Metadata = {
  title: "Guia de Preços de Vídeo Marketing em Portugal 2026 | Beyond Focus",
  description: "Tabela completa de preços de produção de vídeo em Portugal. Spots, brand films, documentários, vídeos para redes sociais. Download gratuito.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Guia de Preços de Vídeo Marketing Portugal 2026 — Beyond Focus",
    description: "Quanto custa produzir um vídeo em Portugal? Tabela de referência, checklist e os erros mais comuns. Grátis.",
    url: "https://beyondfocus.pt/guia-precos-video",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://beyondfocus.pt/guia-precos-video" },
};

const PRICE_TABLE = [
  { type: "Vídeo para redes sociais (30-60s)", range: "€800 – €3.000", includes: "1 dia de filmagens, edição, legenda" },
  { type: "Spot publicitário (15-30s)", range: "€3.000 – €8.000", includes: "Pré-produção, filmagens, pós-produção" },
  { type: "Vídeo institucional (2-3 min)", range: "€4.000 – €12.000", includes: "Guião, filmagens multi-dia, voice-over" },
  { type: "Brand Film (60-90s)", range: "€8.000 – €20.000", includes: "Conceito criativo completo, direção de arte" },
  { type: "Documentário corporativo", range: "€10.000 – €30.000", includes: "Pesquisa, múltiplas filmagens, narrativa" },
  { type: "Pacote mensal de conteúdo", range: "€1.500 – €4.000/mês", includes: "4-12 peças/mês, gestão contínua" },
];

const CHECKLIST = [
  "Objectivo do vídeo (brand awareness, conversão, recrutamento?)",
  "Onde vai ser publicado (LinkedIn, YouTube, TV, evento?)",
  "Duração aproximada que imaginas",
  "Data limite de entrega",
  "Referências de estilo (vídeos que admiras)",
  "Quem aparece (equipa, actores, sem pessoas?)",
  "Locais de filmagem disponíveis",
  "Budget indicativo (ajuda a calibrar a proposta)",
];

export default function GuiaPrecosVideoPage() {
  return (
    <>
      <Navbar variant="light" />
      <main className="bg-bg-light">
        {/* Hero */}
        <section className="mx-auto max-w-[900px] px-6 pt-[180px] pb-16 text-center md:px-10">
          <span className="inline-block rounded-full border border-orange/30 bg-orange/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[3px] text-orange">
            Recurso gratuito
          </span>
          <h1 className="mt-6 text-[clamp(32px,4vw,52px)] font-bold leading-[1.1] tracking-tight text-petrol">
            Quanto custa produzir vídeo<br className="hidden md:block" /> em Portugal em 2026?
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-petrol/60">
            Tabela de referência, checklist de briefing e os erros mais comuns ao contratar uma produtora. Tudo grátis — sem spam.
          </p>
        </section>

        {/* Email capture */}
        <section className="mx-auto max-w-[680px] px-6 pb-16 md:px-10">
          <BlogEmailCapture
            variant="banner"
            title="Recebe o guia completo por email"
            description="O link chega imediatamente. Mais o checklist de briefing em PDF."
            ctaLabel="Enviar guia"
            source="guia-precos-video"
            magnet="guia-precos-video"
          />
        </section>

        {/* Price table preview */}
        <section className="mx-auto max-w-[900px] px-6 pb-20 md:px-10">
          <h2 className="mb-2 text-2xl font-bold text-petrol">Tabela de referência</h2>
          <p className="mb-8 text-sm text-petrol/50">Valores orientativos para Portugal. Cada projecto é único — usa como ponto de partida.</p>

          <div className="overflow-hidden rounded-2xl border border-petrol/8">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-petrol text-white">
                  <th className="px-6 py-4 text-left font-mono text-[11px] uppercase tracking-[2px]">Tipo de vídeo</th>
                  <th className="px-6 py-4 text-left font-mono text-[11px] uppercase tracking-[2px]">Referência de preço</th>
                  <th className="hidden px-6 py-4 text-left font-mono text-[11px] uppercase tracking-[2px] md:table-cell">Inclui</th>
                </tr>
              </thead>
              <tbody>
                {PRICE_TABLE.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-bg-light"}>
                    <td className="px-6 py-4 font-medium text-petrol">{row.type}</td>
                    <td className="px-6 py-4 font-semibold text-orange">{row.range}</td>
                    <td className="hidden px-6 py-4 text-petrol/50 md:table-cell">{row.includes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-petrol/40">* Valores sem IVA. Variam consoante localização, complexidade e necessidades específicas.</p>
        </section>

        {/* Checklist */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-[900px] px-6 md:px-10">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold text-petrol">Checklist de briefing</h2>
                <p className="mt-3 text-sm text-petrol/50">As informações que precisas de ter prontas antes de pedir uma proposta.</p>
                <ul className="mt-6 space-y-3">
                  {CHECKLIST.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-petrol/70">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-petrol/20">
                        <span className="h-2 w-2 rounded-full bg-orange" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-petrol">O que faz variar o preço?</h2>
                <div className="mt-6 space-y-4">
                  {[
                    { factor: "Número de dias de filmagem", impact: "Maior impacto no custo total" },
                    { factor: "Actores vs. equipa real", impact: "Casting profissional acresce €500-2.000" },
                    { factor: "Locais de filmagem", impact: "Exterior vs. estúdio vs. licenças especiais" },
                    { factor: "Pós-produção (VFX, animação)", impact: "Pode duplicar o custo base" },
                    { factor: "Urgência", impact: "Prazos < 2 semanas: +20-40%" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl bg-bg-light p-4">
                      <p className="font-semibold text-petrol text-sm">{item.factor}</p>
                      <p className="mt-1 text-xs text-petrol/50">{item.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 text-center">
          <p className="text-sm text-petrol/50">Tens um projecto em mente?</p>
          <a
            href="/contacto"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-petrol px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-petrol/90"
          >
            Falar com a equipa Beyond Focus →
          </a>
          <p className="mt-4 text-xs text-petrol/40">Respondemos em 24h. Sem compromisso.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
