"use client";

import React from "react";
import { updateForm } from "./formWizardStore";
import { useStateMachine } from "little-state-machine";
import HoldingsMain from "../HoldingsMain";
import Loading from "../Loading";
import { WizardFormSubmit } from "./fetchHoldings";

const Results = ({ ref }) => {
  const { actions, state } = useStateMachine({ actions: { updateForm } });
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const returnedData = await WizardFormSubmit(state);

      console.log("fund:", state.Fund);
      console.log("option:", state.option);

      // We combine the categories here so HoldingsMain has everything it needs to filter
      const combinedData = [
        ...(returnedData.public_holdings || []),
        ...(returnedData.private_investments || []),
        ...(returnedData.bonds || []),
        ...(returnedData.cash || []),
      ];

      setData(combinedData);
    };

    fetchData();
  }, [state.Fund, state.option]); // Runs again if they change their mind in the wizard

  return data ? (
    <HoldingsMain holdingsData={data} balance={state.balance} />
  ) : (
    <Loading classname="flex h-[5rem] w-[5rem] justify-center items-center rounded-full bg-emerald-300"></Loading>
  );
};

export default Results;
