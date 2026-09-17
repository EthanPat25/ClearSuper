"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "./formWizardStore";
import {
  fetch_options,
  fetch_option_allocations,
} from "@/app/fe-api/options/options";
import { lifecycleStrategies } from "../data/lifecycle";
import AllocationPieComponent from "../Components/AllocationPie";
import { AllocationPie } from "../types/holdings";
import { AssetClassKey } from "./Step3a_DefaultOption";

type FundOption = { id: string; option_name: string; as_of_date?: string };
const normalize = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

export default function Step3c_Lifecycle({
  ref,
  updateStep,
}: {
  ref?: React.RefObject<HTMLDivElement>;
  updateStep: (step: string) => void;
}) {
  const { actions, state } = useStateMachine({ actions: { updateForm } });
  const strategy = lifecycleStrategies[state.Fund];
  const reduceMotion = useReducedMotion();
  const transition = { duration: reduceMotion ? 0 : 0.16 };
  const [options, setOptions] = React.useState<FundOption[]>([]);
  const [allocations, setAllocations] = React.useState<
    Record<string, AllocationPie>
  >({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [retry, setRetry] = React.useState(0);
  const [selectedBand, setSelectedBand] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<FundOption | null>(
    null,
  );
  const band = strategy?.bands[selectedBand] ?? strategy?.bands[0];
  const maxOptions = Math.max(
    1,
    ...(strategy?.bands.map((item) => item.options.length) ?? []),
  );

  React.useEffect(() => {
    let cancelled = false;
    fetch_options(state.Fund)
      .then((data: FundOption[]) => {
        if (!cancelled) setOptions(data);
        return fetch_option_allocations(data.map((option) => option.id))
          .then(
            (
              rows: {
                Option_Id: string;
                category: string;
                percentage: number;
              }[],
            ) => {
              const next: Record<string, AllocationPie> = {};
              for (const row of rows) {
                const allocation = (next[row.Option_Id] ??= {
                  listed: 0,
                  unlisted: 0,
                  cashAndBonds: 0,
                });
                if (row.category === "Listed")
                  allocation.listed = row.percentage;
                if (row.category === "Unlisted")
                  allocation.unlisted = row.percentage;
                if (row.category === "Fixed Interest & Cash")
                  allocation.cashAndBonds = row.percentage;
              }
              if (!cancelled) setAllocations(next);
            },
          )
          .catch(() => {
            /* Option links still work without allocation charts. */
          });
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [state.Fund, retry]);

  function explore(option: FundOption) {
    actions.updateForm({
      option_id: option.id,
      option_name: option.option_name,
      as_of_date: option.as_of_date,
    });
    updateStep("StepBalance");
  }

  return (
    <div ref={ref} className="flex w-full max-w-3xl scroll-mt-28 flex-col gap-6 px-4">
      <h1 className="mx-auto max-w-[20rem] px-2 text-center text-lg font-bold leading-tight sm:max-w-none sm:text-xl">
        {strategy?.name ?? state.Fund}&apos;s default changes with your age
      </h1>
      <div className="rounded-[3rem] bg-slate-100 p-5 shadow-sm sm:p-10">
        {!strategy ? (
          <p className="py-6 text-center text-sm text-slate-500">
            Lifecycle details aren&apos;t available for this fund yet.
          </p>
        ) : (
          <>
            <fieldset className="mb-6">
              <legend className="mb-3 text-sm font-semibold text-slate-700">
                Age range
              </legend>
              <div className="flex flex-wrap gap-2">
                {strategy.bands.map((ageBand, index) => (
                  <button
                    key={ageBand.age}
                    type="button"
                    aria-pressed={selectedBand === index}
                    onClick={() => {
                      setSelectedBand(index);
                      if (index !== selectedBand) setSelectedOption(null);
                    }}
                    className={`min-h-11 rounded-xl border px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${selectedBand === index ? "border-teal-500 bg-teal-100 text-teal-950 shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:border-teal-400"}`}
                  >
                    {ageBand.age}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-sm font-bold text-slate-800">
                {band?.options.length === 1
                  ? "Your fund uses one option"
                  : "Your fund uses a combination of options"}
              </h2>
            </div>
            <AssetClassKey align="left" />
            {/* Reserve the tallest band so age controls and navigation stay still. */}
            <div
              className="mt-4 min-h-[var(--options-height)] sm:min-h-[var(--options-height-sm)]"
              style={
                {
                  "--options-height": `${maxOptions * 74 + (maxOptions - 1) * 12}px`,
                  "--options-height-sm": `${maxOptions * 82 + (maxOptions - 1) * 12}px`,
                } as React.CSSProperties
              }
              aria-live="polite"
            >
              {loading ? (
                <div className="flex min-h-[var(--options-height)] items-center justify-center sm:min-h-[var(--options-height-sm)]">
                  <div
                    className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600"
                    aria-label="Loading"
                  />
                </div>
              ) : (
                <motion.div
                  key={selectedBand}
                  initial={{ opacity: reduceMotion ? 1 : 0 }}
                  animate={{ opacity: 1 }}
                  transition={transition}
                  className="grid grid-cols-1 gap-3"
                >
                  {band?.options.map((name) => {
                    const option = options.find(
                      (item) => normalize(item.option_name) === normalize(name),
                    );
                    const allocation = option && allocations[option.id];
                    const isSelected =
                      !!option && selectedOption?.id === option.id;
                    return (
                      <button
                        key={name}
                        type="button"
                        disabled={!option}
                        aria-pressed={isSelected}
                        onClick={() => option && setSelectedOption(option)}
                        className={`flex min-h-[74px] sm:min-h-[82px] w-full items-center gap-4 rounded-2xl border bg-white p-3 text-left transition hover:border-teal-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-default disabled:hover:border-slate-200 disabled:hover:shadow-sm sm:p-4 ${isSelected ? "border-teal-500 shadow-md" : "border-slate-200 shadow-sm"}`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100">
                          {allocation ? (
                            <AllocationPieComponent allocation={allocation} />
                          ) : (
                            <span className="text-xs font-bold text-slate-400">
                              {name
                                .split(" ")
                                .map((word) => word[0])
                                .slice(0, 2)
                                .join("")}
                            </span>
                          )}
                        </span>
                        <span className="min-w-0 flex-1 text-[0.8rem] font-bold text-slate-800">
                          {name}
                          {!option && (
                            <span className="mt-1 block text-xs font-normal text-slate-400">
                              Holdings unavailable
                            </span>
                          )}
                        </span>
                        {isSelected ? (
                          <Check
                            className="h-4 w-4 shrink-0 text-teal-600"
                            aria-hidden="true"
                          />
                        ) : null}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </div>
            {error && (
              <p
                role="alert"
                className="mt-5 text-center text-sm text-slate-600"
              >
                We couldn&apos;t load the options.{" "}
                <button
                  type="button"
                  onClick={() => {
                    setLoading(true);
                    setError(false);
                    setRetry((value) => value + 1);
                  }}
                  className="font-semibold underline"
                >
                  Try again
                </button>
              </p>
            )}
            <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
              Options are grouped by age; your exact split isn&apos;t shown.
              <br />
              <a
                href={strategy.source}
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline hover:text-slate-600"
              >
                Read your fund&apos;s lifecycle guide
              </a>
            </p>
          </>
        )}
      </div>
      <div className="sticky md:static bottom-4 md:bottom-auto w-full px-4 md:px-0 mt-4 md:mt-0 pb-[env(safe-area-inset-bottom)] md:pb-0">
        <div className="flex w-full items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => updateStep("StepTwo")}
            className="shrink-0 rounded-2xl bg-slate-200 px-6 py-4 font-bold text-slate-800 transition hover:bg-slate-300 md:rounded-lg md:py-2"
          >
            Back
          </button>
          <button
            type="button"
            disabled={loading || !selectedOption}
            onClick={() => selectedOption && explore(selectedOption)}
            className="flex-1 rounded-2xl bg-black px-6 py-4 font-bold text-white transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:hover:translate-y-0 md:flex-none md:rounded-lg md:py-2"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
