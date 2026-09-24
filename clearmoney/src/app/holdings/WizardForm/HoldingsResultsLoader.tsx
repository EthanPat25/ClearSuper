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
  const [loadError, setLoadError] = React.useState(false);
  const [retryCount, setRetryCount] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;
    setLoadError(false);

    // A fund change clears the option while the user chooses a replacement.
    if (!state.Fund || !state.option_id) return;

    const fetchData = async () => {
      try {
        const returnedData = await WizardFormSubmit(state);
        if (!cancelled) {
          setData(returnedData);
        }
      } catch {
        if (!cancelled) {
          setLoadError(true);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [state.Fund, state.option_id, retryCount]);

  if (loadError) {
    return (
      <div
        role="alert"
        className="flex min-h-48 flex-col items-center justify-center gap-4 px-4 text-center"
      >
        <p className="text-sm font-semibold text-slate-700">
          We couldn&apos;t load these holdings. Please try again.
        </p>
        <button
          type="button"
          onClick={() => {
            setData(null);
            setLoadError(false);
            setRetryCount((count) => count + 1);
          }}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
        >
          Try again
        </button>
      </div>
    );
  }

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
