import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description: "Termos e condições de utilização do website da Beyond Focus.",
  alternates: {
    canonical: "https://beyondfocus.pt/termos",
  },
};

export default function TermosPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Termos e Condições", href: "/termos" },
        ]}
      />
      <Navbar variant="light" />
      <main className="bg-bg-light pt-[140px] pb-20">
        <div className="mx-auto max-w-[800px] px-6 md:px-10">
          <h1 className="text-[clamp(32px,4vw,48px)] font-bold text-petrol">
            Termos e Condições
          </h1>
          <p className="mt-4 text-sm text-petrol/40">Última actualização: Março 2026</p>

          <div className="mt-12 space-y-8 text-base leading-relaxed text-petrol/70">
            <section>
              <h2 className="mb-3 text-xl font-bold text-petrol">1. Identificação</h2>
              <p>Este website é propriedade da Beyond Focus, Lda., produtora audiovisual com sede em Lisboa, Portugal.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-petrol">2. Utilização do website</h2>
              <p>O conteúdo deste website é fornecido para fins informativos. A Beyond Focus reserva-se o direito de alterar ou remover conteúdo a qualquer momento sem aviso prévio.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-petrol">3. Propriedade intelectual</h2>
              <p>Todos os conteúdos deste website — incluindo textos, imagens, vídeos, logótipos e design — são propriedade da Beyond Focus ou dos respectivos clientes e estão protegidos por direitos de autor. A reprodução sem autorização é proibida.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-petrol">4. Portfolio</h2>
              <p>Os projectos apresentados no portfolio representam trabalho realizado pela Beyond Focus para os respectivos clientes. A utilização destas imagens e vídeos fora deste contexto requer autorização prévia.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-petrol">5. Limitação de responsabilidade</h2>
              <p>A Beyond Focus não se responsabiliza por eventuais danos decorrentes da utilização deste website ou da indisponibilidade temporária do mesmo.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-petrol">6. Lei aplicável</h2>
              <p>Estes termos são regidos pela lei portuguesa. Qualquer litígio será submetido à jurisdição dos tribunais de Lisboa.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
