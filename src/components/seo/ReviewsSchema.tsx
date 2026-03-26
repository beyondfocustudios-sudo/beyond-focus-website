import { TESTIMONIALS } from "@/lib/constants";

function parseRatingValue(score: string): number {
  return parseFloat(score.replace("/10", ""));
}

export function ReviewsSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: TESTIMONIALS.map((t, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Review",
        reviewBody: t.quote,
        reviewRating: {
          "@type": "Rating",
          ratingValue: parseRatingValue(t.score),
          bestRating: 10,
          worstRating: 1,
        },
        author: {
          "@type": "Organization",
          name: t.company,
        },
        itemReviewed: {
          "@type": "LocalBusiness",
          name: "Beyond Focus",
          url: "https://beyondfocus.pt",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
