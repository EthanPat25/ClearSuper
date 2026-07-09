export type SuperFund = {
  name: string;
  domain: string;
  mysuper_is_lifecycle: boolean;
};

export const funds: Array<SuperFund> = [
  {
    name: "AustralianSuper",
    domain: "australiansuper.com",
    mysuper_is_lifecycle: false,
  },
  {
    name: "Rest",
    domain: "rest.com.au",
    mysuper_is_lifecycle: false,
  },
  {
    name: "HostPlus",
    domain: "hostplus.com.au",
    mysuper_is_lifecycle: false,
  },
  {
    name: "ART",
    domain: "australianretirementtrust.com",
    mysuper_is_lifecycle: true,
  },
  {
    name: "AwareSuper",
    domain: "aware.com.au",
    mysuper_is_lifecycle: true,
  },
  {
    name: "Hesta",
    domain: "hesta.com.au",
    mysuper_is_lifecycle: false,
  },
];
