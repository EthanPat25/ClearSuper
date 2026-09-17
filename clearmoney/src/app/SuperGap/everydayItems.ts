/**
 * Everyday-price reference values for the SuperGap comparison cards.
 *
 * This is the one file to edit when a price needs updating. These are useful,
 * rounded Australian reference prices in AUD — not claims about what every
 * person pays, or national average prices where no reliable national unit
 * price exists. See docs/everyday-price-assumptions.md before changing one.
 */
export type EverydayPrice = {
  key: "coffee" | "trip" | "dinner" | "dental" | "iphone" | "hotel";
  price: number;
  singular: string;
  plural: string;
  definition: string;
  source: string;
  sourceUrl: string;
  asOf: string;
};

export const EVERYDAY_PRICES: EverydayPrice[] = [
  {
    key: "coffee",
    price: 4.7,
    singular: "coffee",
    plural: "coffees",
    definition: "A regular barista-made coffee.",
    source: "Hey You / Westpac DataX survey",
    sourceUrl:
      "https://www.timeout.com/australia/news/good-news-australias-coffee-price-hikes-are-slowing-down-heres-what-a-cuppa-costs-in-each-state-082526",
    asOf: "June 2026",
  },
  {
    key: "trip",
    price: 1800,
    singular: "overseas trip",
    plural: "overseas trips",
    definition: "A modest international holiday budget.",
    source: "Editorial Australian reference price",
    sourceUrl:
      "https://www.tra.gov.au/en/tourism-statistics/international-tourism-results",
    asOf: "September 2026",
  },
  {
    key: "dinner",
    price: 60,
    singular: "dinner out",
    plural: "dinners out",
    definition: "Two casual restaurant meals, excluding drinks.",
    source: "Editorial Australian reference price",
    sourceUrl:
      "https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/jul-2026",
    asOf: "September 2026",
  },
  {
    key: "dental",
    price: 220,
    singular: "dental checkup",
    plural: "dental checkups",
    definition: "Check-up, scale and clean, including fluoride treatment.",
    source: "CHOICE / ADA fee survey",
    sourceUrl:
      "https://www.choice.com.au/health-and-body/dentists-and-dental-care/dental-treatment/articles/dental-fees",
    asOf: "September 2026",
  },
  {
    key: "iphone",
    price: 1249,
    singular: "iPhone",
    plural: "iPhones",
    definition: "Apple's entry iPhone 16, 128GB, before accessories.",
    source: "Apple Australia",
    sourceUrl:
      "https://www.apple.com/au/shop/buy-iphone/iphone-16/6.1-inch-display-128gb-black",
    asOf: "September 2026",
  },
  {
    key: "hotel",
    price: 220,
    singular: "hotel night",
    plural: "hotel nights",
    definition: "One standard hotel room night in Australia.",
    source: "Editorial Australian reference price",
    sourceUrl: "https://www.tra.gov.au/en/tourism-statistics",
    asOf: "September 2026",
  },
];

// Picks whichever item reads most naturally at this dollar amount — not "1
// iPhone" and not "16,000 coffees" — for use as a single headline comparison.
export function pickHeadlineEquivalent(amount: number) {
  const candidates = EVERYDAY_PRICES.map((item) => ({
    ...item,
    count: Math.max(1, Math.round(amount / item.price)),
  }));
  const readable = candidates.find((c) => c.count >= 2 && c.count <= 200);
  const chosen =
    readable ??
    candidates.reduce((a, b) =>
      Math.abs(a.count - 20) < Math.abs(b.count - 20) ? a : b,
    );
  return {
    count: chosen.count,
    label: chosen.count === 1 ? chosen.singular : chosen.plural,
  };
}
