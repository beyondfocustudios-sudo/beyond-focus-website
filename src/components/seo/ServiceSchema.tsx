interface ServiceSchemaProps {
  name: string;
  description: string;
  slug: string;
  image: string;
}

export function ServiceSchema({ name, description, slug, image }: ServiceSchemaProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `https://beyondfocus.pt/servicos/${slug}`,
    image: `https://beyondfocus.pt${image}`,
    provider: {
      "@type": "VideoProductionCompany",
      name: "Beyond Focus",
      url: "https://beyondfocus.pt",
      logo: "https://beyondfocus.pt/images/logo-symbol.png",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lisboa",
        addressRegion: "Lisboa",
        addressCountry: "PT",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "Portugal",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
