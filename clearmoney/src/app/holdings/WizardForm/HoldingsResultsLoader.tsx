"use client";

import React from "react";
import { updateForm } from "./formWizardStore";
import { useStateMachine } from "little-state-machine";
import HoldingsMain from "../Components/HoldingsMain";
import Loading from "../Components/Loading";
import { WizardFormSubmit } from "./wizardFormSubmit";
import { HoldingsApiResponse } from "../types/holdings";

const HoldingsResultsLoader = ({ ref }) => {
  const { actions, state } = useStateMachine({ actions: { updateForm } });
  const [data, setData] = React.useState<HoldingsApiResponse | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const returnedData = await WizardFormSubmit(state);
      setData(returnedData);
    };

    fetchData();
  }, [state.Fund, state.option_id]);

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

export default HoldingsResultsLoader;
