"use client";

import React from "react";
import { motion } from "motion/react";
import { updateForm } from "./formWizardStore";
import { useStateMachine } from "little-state-machine";
import {
  fetch_options,
  fetch_option_allocations,
} from "@/app/fe-api/options/options";
import { Check } from "lucide-react";
import { AllocationPie } from "../types/holdings";
import AllocationPieComponent from "../Components/AllocationPie";

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const AssetClassKey = () => {
  const assetClass = [
    { name: "Public Companies", colour: "#00C49F" },
    { name: "Private Assets", colour: "#3B82F6" },
    { name: "Cash & Bonds", colour: "#F59E0B" },
  ];

  return (
    <div className="flex gap-3 justify-center flex-wrap mb-2">
      {assetClass.map((asset, index) => (
        <div
          key={index}
          className="flex items-center gap-1 text-xs text-slate-400"
        >
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: asset.colour }}
          />
          {asset.name}
        </div>
      ))}
    </div>
  );
};

const Step3a_DefaultOption = ({
  updateStep,
  ref,
}: {
  updateStep: (step: string) => void;
  ref?: React.RefObject<HTMLDivElement>;
}) => {
  const { actions, state } = useStateMachine({ actions: { updateForm } });
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState<{
    id: string;
    name: string;
    as_of_date?: string;
  } | null>(null);

  const [options, setOptions] = React.useState([]);
  const [allocations, setAllocations] = React.useState<
    Record<string, AllocationPie>
  >({});

  React.useEffect(() => {
    if (!state.Fund) return;
    const loadOptions = async () => {
      setLoading(true);
      try {
        const data = await fetch_options(state.Fund);
        const sorted = data.sort((a, b) =>
          a.option_name.localeCompare(b.option_name),
        );
        setOptions(sorted);

        // Fetch real allocations for all options in one call
        const ids = sorted.map((o) => o.id);
        const allocationRows = await fetch_option_allocations(ids);

        // Transform flat rows into { [option_id]: AllocationPie }
        const allocationMap: Record<string, AllocationPie> = {};
        for (const row of allocationRows) {
          if (!allocationMap[row.Option_Id]) {
            allocationMap[row.Option_Id] = {
              listed: 0,
              unlisted: 0,
              cashAndBonds: 0,
            };
          }
          if (row.category === "Listed")
            allocationMap[row.Option_Id].listed = row.percentage;
          if (row.category === "Unlisted")
            allocationMap[row.Option_Id].unlisted = row.percentage;
          if (row.category === "Fixed Interest & Cash")
            allocationMap[row.Option_Id].cashAndBonds = row.percentage;
        }
        setAllocations(allocationMap);
      } catch {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };
    loadOptions();
  }, [state.Fund]);

  function handleContinue() {
    if (!selected) return;
    actions.updateForm({
      option_id: selected.id,
      option_name: selected.name,
      as_of_date: selected.as_of_date,
    });
    updateStep("StepBalance");
  }

  const canContinue = !!selected;

  return (
    <motion.div className="flex flex-col gap-6 max-w-full px-4 mt-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center font-bold text-lg sm:text-xl"
      >
        Step 3: Select Your Option
      </motion.h1>

      <div className="w-full bg-slate-100 rounded-[3rem] p-10 shadow-sm flex flex-col gap-3 sm:max-w-3xl">
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          </div>
        ) : options.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">
            No options found for {state.Fund}
          </p>
        ) : (
          <>
            <AssetClassKey />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {options.map((opt) => {
                const isSelected = selected?.id === opt.id;
                const allocation = allocations[opt.id];

                return (
                  <motion.div
                    key={opt.id}
                    onClick={() =>
                      setSelected({ id: opt.id, name: opt.option_name })
                    }
                    whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
                    className={`cursor-pointer bg-white p-4 rounded-2xl border flex items-center gap-4 shadow-sm transition-all ${
                      isSelected
                        ? "border-teal-500 shadow-md"
                        : "border-slate-200"
                    }`}
                  >
                    <div className="p-1 flex items-center justify-center rounded-2xl bg-slate-100 w-10 h-10 flex-shrink-0">
                      {allocation ? (
                        <AllocationPieComponent allocation={allocation} />
                      ) : (
                        <span className="text-xs font-bold text-slate-400">
                          {getInitials(opt.option_name)}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-800 font-bold text-[0.8rem] flex-1">
                      {opt.option_name}
                    </p>
                    {isSelected ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-4 h-4 flex items-center justify-center flex-shrink-0"
                      >
                        <Check className="w-4 h-4 text-teal-600" />
                      </motion.div>
                    ) : (
                      <div className="w-4 h-4 flex-shrink-0" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        <div className="text-slate-400 pt-4 flex w-full justify-center items-center">
          <p className="text-[0.65rem] leading-relaxed text-center">
            Displayed pie charts are ClearSuper's own interpretation of a fund's
            published holdings data, not something produced or endorsed by the
            fund itself. Figures are proportional estimates at time of
            reporting, rounded and simplified for clarity, always check your
            fund's official data for exact numbers. ClearSuper currently only
            supports accumulation phase options.
            <br />
            <a
              href="/about"
              className="inline-flex items-center font-bold gap-0.5 underline hover:text-slate-600 transition-colors"
            >
              Read full disclaimer.
            </a>
          </p>
        </div>
      </div>

      <div className="sticky md:static bottom-4 md:bottom-auto w-full px-4 md:px-0 mt-4 md:mt-0 pb-[env(safe-area-inset-bottom)] md:pb-0">
        <div className="flex justify-between gap-3 w-full">
          <button
            onClick={() => updateStep("StepTwo")}
            className="px-6 py-4 md:py-2 bg-slate-200 text-slate-800 rounded-2xl md:rounded-lg font-bold transition hover:bg-slate-300 shadow-lg md:shadow-none shrink-0"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`flex-1 md:flex-none px-6 py-4 md:py-2 rounded-2xl md:rounded-lg font-bold transition shadow-lg md:shadow-none ${
              canContinue
                ? "bg-black text-white hover:-translate-y-1"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Step3a_DefaultOption;
