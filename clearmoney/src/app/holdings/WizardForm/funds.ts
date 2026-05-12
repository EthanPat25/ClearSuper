export type FundOption = {
  name: string;
  domain: string;
  logoOverride?: string | null;
};

export const funds: FundOption[] = [
  {
    name: "AustralianSuper",
    domain: "australiansuper.com",
    logoOverride: null,
  },
  {
    name: "Rest",
    domain: "rest.com.au",
  },
  {
    name: "HostPlus",
    domain: "hostplus.com.au",
  },
  {
    name: "ART",
    domain: "australianretirementtrust.com",
  },
  {
    name: "Aware",
    domain: "aware.com.au",
  },
  {
    name: "Hesta",
    domain: "hesta.com.au",
  },
];
