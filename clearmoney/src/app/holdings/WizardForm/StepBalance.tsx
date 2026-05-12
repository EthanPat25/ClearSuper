"use client";

import React from "react";
import { motion } from "motion/react";
import { NumericFormat } from "react-number-format";
import { updateForm } from "./formWizardStore";
import { useStateMachine } from "little-state-machine";

const PRESETS = [10000, 25000, 50000, 100000];

const StepBalance = ({
  updateStep,
  prevStep,
  ref,
}: {
  updateStep: (step: string) => void;
  prevStep: string;
  ref?: React.RefObject<HTMLDivElement>;
}) => {
  const { actions, state } = useStateMachine({ actions: { updateForm } });
  const [balance, setBalance] = React.useState<number | null>(
    state.balance || null,
  );
  const [showExact, setShowExact] = React.useState(false);

  function handleContinue() {
    actions.updateForm({ balance: balance ?? 0 });
    updateStep("StepFour");
  }

  return (
    <div className="flex flex-col gap-8 w-[33rem] max-w-full" ref={ref}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center font-bold text-xl"
      >
        What&apos;s your super balance?
      </motion.h1>

      <div className="w-full bg-slate-100 rounded-[3rem] p-10 shadow-sm flex flex-col gap-4">
        <p className="text-sm font-semibold text-slate-700">
          Pick the closest amount
        </p>

        <div className="grid grid-cols-2 gap-3">
          {PRESETS.map((preset) => (
            <motion.button
              key={preset}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setBalance(preset);
                setShowExact(false);
              }}
              className={`rounded-2xl py-4 text-base font-bold transition-all border shadow-sm ${
                balance === preset && !showExact
                  ? "bg-teal-500 border-teal-500 text-white shadow-md"
                  : "bg-white border-slate-200 text-slate-800 hover:border-teal-400"
              }`}
            >
              ${preset.toLocaleString()}
            </motion.button>
          ))}
        </div>

        {!showExact ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setShowExact(true);
              setBalance(null);
            }}
            className="rounded-2xl py-4 text-base font-bold transition-all border shadow-sm bg-white border-slate-200 text-slate-800 hover:border-teal-400 col-span-2"
          >
            Enter exact amount
          </motion.button>
        ) : (
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-500">
              $
            </span>
            <NumericFormat
              thousandSeparator
              autoFocus
              placeholder="50,000"
              value={balance ?? ""}
              onValueChange={(v) => setBalance(v.floatValue ?? null)}
              className="pl-7 pr-4 h-11 w-full text-sm rounded-xl border border-slate-200 bg-white font-normal text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => updateStep(prevStep)}
          className="px-6 py-2 bg-slate-200 text-slate-800 rounded-lg font-bold transition hover:bg-slate-300"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!balance || balance <= 0}
          className="px-6 py-2 bg-black text-white rounded-lg font-bold transition hover:-translate-y-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          Show my holdings
        </button>
      </div>
    </div>
  );
};

export default StepBalance;
