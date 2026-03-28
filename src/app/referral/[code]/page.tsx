import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ContactFormReferral } from "@/components/features/contact/ContactFormReferral";

interface Props {
  params: Promise<{ code: string }>;
}

async function getReferrer(code: string): Promise<{ referrerName: string } | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) return null;

  const sanitized = code.replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 6);
  if (sanitized.length !== 6) return null;

  const res = await fetch(
    `${supabaseUrl}/rest/v1/website_leads?referral_code=eq.${encodeURIComponent(sanitized)}&select=name&limit=1`,
    {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) return null;
  const rows = await res.json() as { name: string }[];
  if (!rows[0]) return null;

  return { referrerName: rows[0].name.split(" ")[0] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const data = await getReferrer(code);
  const referrerName = data?.referrerName ?? "Um cliente";

  return {
    title: `${referrerName} recomenda a Beyond Focus`,
    description: "Produção audiovisual para marcas que querem resultados. Contacta-nos e recebe 10% de desconto no teu primeiro projecto.",
    robots: { index: false, follow: false },
  };
}

export default async function ReferralPage({ params }: Props) {
  const { code } = await params;
  const sanitized = code.replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 6);

  const data = await getReferrer(sanitized);
  if (!data) notFound();

  const { referrerName } = data;

  return (
    <>
      <Navbar variant="light" />
      <main className="bg-bg-light">
        <section className="mx-auto max-w-[1440px] px-6 pt-[200px] pb-20 md:px-10 lg:px-[60px]">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
            <div>
              <p className="font-mono text-[13px] uppercase tracking-[3px] text-orange">
                Referido por {referrerName}
              </p>
              <h1 className="mt-3 text-[clamp(36px,4vw,56px)] font-bold leading-[1.1] tracking-tight text-petrol">
                {referrerName} acha que podemos ajudar o teu negócio.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-petrol/50">
                Produção audiovisual para marcas que querem crescer. Vídeos que vendem, que comunicam, que ficam na memória.
              </p>

              <div className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-orange/10 px-6 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange text-white text-lg font-bold">
                  %
                </div>
                <div>
                  <p className="text-sm font-semibold text-petrol">10% de desconto</p>
                  <p className="text-xs text-petrol/50">Reservado para ti por {referrerName}. Válido no primeiro projecto.</p>
                </div>
              </div>

              <div className="mt-12 space-y-6">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[2px] text-petrol/30">Email</p>
                  <a href="mailto:geral@beyondfocus.pt" className="mt-1 block text-base font-medium text-petrol transition-colors hover:text-orange">
                    geral@beyondfocus.pt
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[2px] text-petrol/30">Localização</p>
                  <p className="mt-1 text-base text-petrol">Lisboa, Portugal</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm lg:p-12">
              <ContactFormReferral referralCode={sanitized} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
