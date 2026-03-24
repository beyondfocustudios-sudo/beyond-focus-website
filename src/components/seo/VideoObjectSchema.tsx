interface VideoObjectSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl?: string;
  uploadDate?: string;
}

export function VideoObjectSchema({
  name,
  description,
  thumbnailUrl,
  contentUrl,
  uploadDate = "2024-01-01",
}: VideoObjectSchemaProps) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: thumbnailUrl.startsWith("http")
      ? thumbnailUrl
      : `https://beyondfocus.pt${thumbnailUrl}`,
    uploadDate,
    publisher: {
      "@type": "Organization",
      name: "Beyond Focus",
      url: "https://beyondfocus.pt",
      logo: {
        "@type": "ImageObject",
        url: "https://beyondfocus.pt/images/logo-symbol.png",
      },
    },
  };

  if (contentUrl) {
    data.contentUrl = contentUrl.startsWith("http")
      ? contentUrl
      : `https://beyondfocus.pt${contentUrl}`;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
