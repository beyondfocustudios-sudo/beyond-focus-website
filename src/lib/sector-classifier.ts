// Classificador automático de sector por keywords
// Inputs: company name, website URL, message text
// Output: sector slug (hotelaria | restauracao | imobiliario | corporate | generic)

export type Sector = "hotelaria" | "restauracao" | "imobiliario" | "corporate" | "generic";

const SECTOR_KEYWORDS: Record<Sector, string[]> = {
  hotelaria: [
    "hotel", "resort", "hostel", "pousada", "quinta", "turismo", "lodge",
    "boutique hotel", "airbnb", "alojamento", "spa hotel", "parque hoteleiro",
    "unidade hoteleira", "hospedaria", "pensão", "inn", "suites", "villas",
    "accommodation", "hospitality", "travel", "viagem", "booking",
  ],
  restauracao: [
    "restaurante", "restaurant", "café", "cafetaria", "bar", "tasca", "taberna",
    "pizzaria", "hamburguer", "sushi", "pastelaria", "padaria", "bakery",
    "gastro", "gastronomy", "food", "chef", "cozinha", "menu", "brunch",
    "bistrô", "cantina", "cervejaria", "marisqueira", "snack", "takeaway",
  ],
  imobiliario: [
    "imobiliária", "imobiliário", "real estate", "properties", "property",
    "construção", "promotora", "promoção imobiliária", "arquitectura",
    "architecture", "realty", "housing", "homes", "apartamentos", "moradia",
    "condomínio", "empreendimento", "loteamento", "mediação imobiliária",
  ],
  corporate: [
    "consultora", "consultoria", "software", "tech", "startup", "fintech",
    "agência", "agency", "marketing", "comunicação", "corporate", "empresa",
    "group", "grupo", "holding", "clínica", "saúde", "health", "wellness",
    "spa", "fitness", "ginásio", "gym", "farmácia", "pharmacy", "eventos",
    "event", "wedding", "casamento", "indústria", "industry", "fábrica",
    "logistics", "logística", "transportes", "seguros", "insurance", "banco",
    "bank", "finance", "financeira", "energia", "energy",
  ],
  generic: [],
};

export function detectSector(data: {
  company?: string;
  website?: string;
  message?: string;
}): Sector {
  const text = [data.company, data.website, data.message]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // Score cada sector pelo número de keywords encontradas
  const scores: Record<Sector, number> = {
    hotelaria: 0,
    restauracao: 0,
    imobiliario: 0,
    corporate: 0,
    generic: 0,
  };

  for (const [sector, keywords] of Object.entries(SECTOR_KEYWORDS) as [Sector, string[]][]) {
    for (const kw of keywords) {
      if (text.includes(kw)) {
        scores[sector] += kw.split(" ").length; // multi-word keywords valem mais
      }
    }
  }

  // Encontrar sector com maior score
  const best = (Object.entries(scores) as [Sector, number][])
    .filter(([s]) => s !== "generic")
    .sort((a, b) => b[1] - a[1])[0];

  return best && best[1] > 0 ? best[0] : "generic";
}
