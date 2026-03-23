import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade da Beyond Focus — produtora audiovisual em Lisboa.",
};

export default function PrivacidadePage() {
  return (
    <>
      <Navbar variant="light" />
      <main className="bg-bg-light pt-[140px] pb-20">
        <div className="mx-auto max-w-[800px] px-6 md:px-10">
          <h1 className="text-[clamp(32px,4vw,48px)] font-bold text-petrol">
            Política de Privacidade
          </h1>
          <p className="mt-4 text-sm text-petrol/40">Última actualização: Março 2026</p>

          <div className="mt-12 space-y-8 text-base leading-relaxed text-petrol/70">
            <section>
              <h2 className="mb-3 text-xl font-bold text-petrol">1. Responsável pelo tratamento</h2>
              <p>Beyond Focus, Lda. com sede em Lisboa, Portugal, é a entidade responsável pelo tratamento dos dados pessoais recolhidos através deste website.</p>
              <p className="mt-2">Email: geral@beyondfocus.pt</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-petrol">2. Dados recolhidos</h2>
              <p>Recolhemos apenas os dados que nos forneces voluntariamente através do formulário de contacto: nome, email, telefone, empresa e mensagem. Não recolhemos dados de navegação para além do estritamente necessário ao funcionamento do website.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-petrol">3. Finalidade</h2>
              <p>Os dados recolhidos são utilizados exclusivamente para responder ao teu contacto, preparar propostas comerciais e gerir a relação contratual. Não partilhamos dados com terceiros.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-petrol">4. Conservação</h2>
              <p>Os dados são conservados durante o período necessário para a finalidade para que foram recolhidos, ou pelo período exigido por lei.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-petrol">5. Direitos</h2>
              <p>Tens o direito de aceder, rectificar, apagar ou limitar o tratamento dos teus dados pessoais. Para exercer estes direitos, contacta-nos através de geral@beyondfocus.pt.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-petrol">6. Cookies</h2>
              <p>Este website utiliza cookies essenciais ao funcionamento e cookies de análise (Google Analytics) para compreender como os visitantes utilizam o site. Podes desactivar os cookies nas definições do teu browser.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
