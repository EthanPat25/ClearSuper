"use client";

import React from "react";
import { motion } from "motion/react";
import { updateForm } from "./formWizardStore";
import { useStateMachine } from "little-state-machine";
import { fetch_options } from "@/app/fe-api/options/options";
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
  const [selected, setSelected] = React.useState<{
    id: string;
    name: string;
  } | null>(null);

  const [options, setOptions] = React.useState<
    { id: string; option_name: string }[]
  >([]);

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
    <div className="flex flex-col gap-6 max-w-full px-4" ref={ref}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center font-bold text-lg sm:text-xl"
      >
        Step 3: Select Your Option
      </motion.h1>

      <div className="w-full bg-slate-100 rounded-[3rem] p-10 shadow-sm flex flex-col gap-3 sm:max-w-2xl">
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          </div>
        ) : options.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">
            No options found for {state.Fund}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
            {options.map((opt) => {
              const isSelected = selected?.id === opt.id;

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

        <div className="bg-slate-50 border sm:mx-auto border-slate-200 text-slate-600 rounded-2xl w-full max-w-[40rem] p-4 mt-6 flex gap-3 items-start">
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
            Show my holdings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3a_DefaultOption;
