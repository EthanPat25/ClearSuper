"use client";

import React from "react";
import { motion } from "motion/react";
import { NumericFormat } from "react-number-format";
import { updateForm } from "./formWizardStore";
import { useStateMachine } from "little-state-machine";

const Step3b_SelectOption = ({
  updateStep,
  ref,
}: {
  updateStep: (step: string) => void;
  ref?: React.RefObject<HTMLDivElement>;
}) => {
  const { actions, state } = useStateMachine({ actions: { updateForm } });
  const [age, setAge] = React.useState<number | null>(state.age || null);

  function handleContinue() {
    actions.updateForm({ age: age ?? 0 });
    updateStep("StepBalance");
  }

  const canContinue = !!age && age > 0;

  return (
    <div className="flex flex-col gap-8 w-[33rem] max-w-full px-4" ref={ref}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center font-bold text-xl"
      >
        What&apos;s your age?
      </motion.h1>

      <div className="w-full bg-slate-100 rounded-[3rem] p-10 shadow-sm flex flex-col gap-4">
        <p className="text-sm font-semibold text-slate-700">Enter your age</p>

        <div className="relative">
          <NumericFormat
            id="age"
            thousandSeparator={false}
            autoFocus
            placeholder="21"
            value={age ?? ""}
            onValueChange={(v) => {
              const val = v.floatValue ?? null;
              if (val !== null && (val < 15 || val > 100)) return;
              setAge(val);
            }}
            className="px-5 py-4 w-full text-base font-bold rounded-2xl border border-slate-200 bg-white text-slate-800 shadow-sm placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
          />
        </div>

        <p className="text-xs text-slate-500 leading-snug">
          We use your age because many MySuper options adjust your investments
          over time.{" "}
          <a
            href="https://moneysmart.gov.au/how-super-works/types-of-super-funds"
            target="_blank"
            className="underline"
          >
            Learn more
          </a>
        </p>

        <div className="bg-orange-50 border border-orange-200 text-orange-800 rounded-2xl w-full p-3 mt-2 flex justify-center items-center">
          <p className="text-[0.75rem] text-center">
            <strong>Notice:</strong> ClearSuper shows the likely default MySuper
            option for your age. This may not be your actual option - please
            check your super account to confirm.{" "}
            <a className="underline cursor-pointer">Full Disclaimer</a>
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => updateStep("StepFour")}
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

export default Step3b_SelectOption;
