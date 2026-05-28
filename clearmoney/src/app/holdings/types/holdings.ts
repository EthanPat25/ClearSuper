export type FormDataType = {
  Fund: string;
  option_name: string;
  option_id: string;
  age?: number;
  balance: number;
};

export type Company = {
  id: string;
  Parsed_Name: string;
  Sector: string;
  Description: string;
  Country: string;
};

export type PublicCompanyHolding = {
  Super_Fund: string;
  Full_Name: string;
  Listing_Status: string;
  Dollar_Value: number;
  Weighting_Percentage_Clean: number;
  Asset_Class: string;
  Management_Type: string;
  Company_Id: string;
  Option_Id: string;
  companies: Company;
  options?: {
    as_of_date: string;
  };
};
export type HoldingRow = {
  Full_Name: string;
  Super_Fund: string;
  Option_Name: string;
  Listing_Status: string;
  Asset_Class: string;
  Dollar_Value?: number;
  Weighting_Percentage_Clean: number;
};

export type HoldingsApiResponse = {
  public_holdings: Array<PublicCompanyHolding>;
  private_investments: Array<HoldingRow>;
  bonds: Array<HoldingRow>;
  cash: Array<HoldingRow>;
};

export type CrossOption = {
  id: string;
  optionName: string;
  weightPercent: number;
};
