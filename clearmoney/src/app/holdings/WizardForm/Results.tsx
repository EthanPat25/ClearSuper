"use client";

import React from "react";
import { updateForm } from "./formWizardStore";
import { useStateMachine } from "little-state-machine";
import HoldingsMain from "../HoldingsMain";
import Loading from "../Loading";
import { WizardFormSubmit } from "./fetchHoldings";

type Holding = {
  Super_Fund: string;
  Option_Name: string;
  Listing_Status: string;
  Asset_Class: string;
  Management_Type: string;
  Dollar_Value: number;
  Weighting_Percentage_Clean: number;
  Full_Name: string;
  companies: {
    id: string;
    Parsed_Name: string;
    Sector: string;
    Description: string;
    Country: string;
  };
};

type ApiResponse = {
  public_holdings: Holding[];
  private_investments: Holding[];
  bonds: Holding[];
  cash: Holding[];
};

const Results = ({ ref }) => {
  const { actions, state } = useStateMachine({ actions: { updateForm } });
  const [data, setData] = React.useState<ApiResponse | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const returnedData: ApiResponse = await WizardFormSubmit(state);
      setData(returnedData);
    };

    fetchData();
  }, [state.Fund, state.option]);

  return data ? (
    <HoldingsMain
      publicHoldings={data.public_holdings ?? []}
      privateInvestments={data.private_investments ?? []}
      bonds={data.bonds ?? []}
      cash={data.cash ?? []}
      balance={state.balance}
    />
  ) : (
    <Loading classname="flex h-[5rem] w-[5rem] justify-center items-center rounded-full bg-emerald-300" />
  );
};

export default Results;
