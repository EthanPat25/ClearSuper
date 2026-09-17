export type LifecycleStrategy = {
  name: string;
  source: string;
  poolNote?: string;
  bands: { age: string; note: string; options: string[] }[];
};

// Reviewed against the linked fund publications on 16 September 2026.
// Bands group ages with the same constituent options; no split is implied.
export const lifecycleStrategies: Record<string, LifecycleStrategy> = {
  AwareSuper: {
    name: "Aware Super",
    source:
      "https://aware.com.au/content/dam/aware/au/en/documents/member/disclosure/pds/Investment-and-Fees-Handbook.pdf",
    bands: [
      { age: "55 and under", note: "One option", options: ["High Growth"] },
      {
        age: "56–59",
        note: "Gradually moving towards Balanced",
        options: ["High Growth", "Balanced"],
      },
      { age: "60", note: "One option", options: ["Balanced"] },
      {
        age: "61–64",
        note: "Gradually moving towards Conservative Balanced",
        options: ["Balanced", "Conservative Balanced"],
      },
      {
        age: "65 and over",
        note: "One option",
        options: ["Conservative Balanced"],
      },
    ],
  },
  ART: {
    name: "Australian Retirement Trust",
    source:
      "https://www.australianretirementtrust.com.au/investments/lifecycle-investment-strategy",
    poolNote:
      "ART uses investment pools. Explore each pool where holdings are available.",
    bands: [
      {
        age: "Under 50",
        note: "High Growth Pool",
        options: ["High Growth Pool"],
      },
      {
        age: "50–59",
        note: "Gradually moving into Balanced and Cash pools",
        options: ["High Growth Pool", "Balanced Pool", "Cash Pool"],
      },
      {
        age: "60–64",
        note: "Continuing the shift towards the Cash Pool",
        options: ["Balanced Pool", "Cash Pool"],
      },
      {
        age: "65 and over",
        note: "Balanced and Cash pools",
        options: ["Balanced Pool", "Cash Pool"],
      },
    ],
  },
};
