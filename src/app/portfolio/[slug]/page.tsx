export default async function PortfolioProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main>
      <h1 className="font-display text-4xl text-petrol">Projecto: {slug}</h1>
    </main>
  );
}
