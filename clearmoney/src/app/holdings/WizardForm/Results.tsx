"use client";

import React from "react";
import { WizardFormSubmit } from "./fetchHoldings";
import { updateForm } from "./formWizardStore";
import { useStateMachine } from "little-state-machine";
import HoldingsMain from "../HoldingsMain";
import Loading from "../Loading";

const Results = ({ ref }) => {
  const { actions, state } = useStateMachine({ actions: { updateForm } });
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      const returnedData = await WizardFormSubmit(state);
      setData(returnedData);
    };
    fetchData();
  }, []);

  return data ? (
    <HoldingsMain
      holdingsData={data.public_companies}
      balance={state.balance}
    />
  ) : (
    <Loading classname="flex h-[5rem] w-[5rem] justify-center items-center rounded-full bg-emerald-300"></Loading>
  );
};

export default Results;
