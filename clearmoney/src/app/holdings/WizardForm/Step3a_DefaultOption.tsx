"use client";

import React from "react";
import { motion } from "motion/react";
import { updateForm } from "./formWizardStore";
import { useStateMachine } from "little-state-machine";
import { fetch_options } from "./fetchHoldings";
import { IconExternalLink } from "@tabler/icons-react";

const Step3a_DefaultOption = ({
  updateStep,
  ref,
}: {
  updateStep: (step: string) => void;
  ref?: React.RefObject<HTMLDivElement>;
}) => {
  const { actions, state } = useStateMachine({ actions: { updateForm } });
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState<string>(state.option ?? "");
  const [options, setOptions] = React.useState<
    { id: string; option_name: string }[]
  >([]);

  React.useEffect(() => {
    if (!state.Fund) return;
    setLoading(true);
    fetch_options(state.Fund)
      .then((data: { id: string; option_name: string }[]) => {
        setOptions(
          data.sort((a, b) => a.option_name.localeCompare(b.option_name)),
        );
      })

      .catch(() => setOptions([]))
      .finally(() => setLoading(false));
  }, [state.Fund]);

  function handleContinue() {
    actions.updateForm({ option: selected });
    updateStep("StepBalance");
  }

  const canContinue = !!selected;

  return (
    <div className="flex flex-col gap-8 w-[33rem] max-w-full" ref={ref}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center font-bold text-xl"
      >
        Step 3: Select Your Option
      </motion.h1>

      <div className="w-full bg-slate-100 rounded-[3rem] p-10 shadow-sm flex flex-col gap-3">
        <p className="text-sm font-semibold text-slate-700">
          Select your option
        </p>

        {loading ? (
          <div className="flex justify-center py-6">
            <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          </div>
        ) : options.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">
            No options found for {state.Fund}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {options.map((opt) => {
              const isSelected = selected === opt.id;

              return (
                <motion.div
                  key={opt.id}
                  onClick={() => setSelected(opt.id)}
                  whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
                  className={`cursor-pointer bg-white p-4 rounded-2xl border flex items-center gap-4 shadow-sm transition-all ${
                    isSelected
                      ? "border-teal-500 shadow-md"
                      : "border-slate-200"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg transition-colors flex-shrink-0 flex items-center justify-center ${isSelected ? "bg-teal-100" : "bg-orange-100"}`}
                  >
                    <span
                      className={`text-sm font-bold ${isSelected ? "text-teal-700" : "text-orange-700"}`}
                    >
                      {opt.option_name.charAt(0)}
                    </span>
                  </div>
                  <p className="text-slate-800 font-bold text-sm flex-1">
                    {opt.option_name}
                  </p>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto text-teal-600 font-bold text-lg flex-shrink-0"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        <p className="text-xs text-slate-400 text-center">
          ClearSuper currently only supports accumulation phase options.{" "}
          <span>Understand what this means. Learn more at </span>
          <a
            href="https://moneysmart.gov.au/how-super-works/types-of-super-funds"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 underline hover:text-slate-600 transition-colors"
          >
            moneysmart.gov.au
            <IconExternalLink size={11} className="inline" />
          </a>
        </p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => updateStep("StepTwo")}
          className="px-6 py-2 bg-slate-200 text-slate-800 rounded-lg font-bold transition hover:bg-slate-300"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="px-6 py-2 bg-black text-white rounded-lg font-bold transition hover:-translate-y-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          Show my holdings
        </button>
      </div>
    </div>
  );
};

export default Step3a_DefaultOption;
