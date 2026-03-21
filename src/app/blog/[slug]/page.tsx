export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main>
      <h1 className="font-display text-4xl text-petrol">Artigo: {slug}</h1>
    </main>
  );
}
