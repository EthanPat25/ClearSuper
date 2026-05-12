"use client";

import React from "react";
import { motion } from "motion/react";
import { NumericFormat } from "react-number-format";
import { Label } from "@/components/ui/label";
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
    <div className="flex flex-col gap-8 w-[33rem] max-w-full" ref={ref}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center font-bold text-xl"
      >
        Step 3: Your details
      </motion.h1>

      <div className="w-full bg-slate-100 rounded-[3rem] p-10 shadow-sm">
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-1">
            <Label
              htmlFor="age"
              className="text-base font-medium text-gray-900"
            >
              Your Age
            </Label>
            <div className="relative">
              <NumericFormat
                id="age"
                thousandSeparator={false}
                placeholder="21"
                value={age ?? ""}
                onValueChange={(v) => setAge(v.floatValue ?? null)}
                className="pl-[1.1rem] h-[2.7rem] w-full text-sm rounded-xl font-normal text-gray-900 placeholder:text-gray-400 border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <p className="text-xs text-gray-500 mt-3 leading-snug">
                We use your age because many MySuper options adjust your
                investments over time.{" "}
                <a
                  href="https://moneysmart.gov.au/how-super-works/types-of-super-funds"
                  target="_blank"
                  className="underline ml-1"
                >
                  Learn more
                </a>
              </p>
            </div>
          </div>
        </form>

        <div className="bg-orange-50 border border-orange-200 text-orange-800 rounded-2xl w-full p-2 mt-6 flex justify-center items-center">
          <p className="text-[0.75rem]">
            <strong>Notice:</strong> ClearSuper shows the likely default MySuper
            option for your age. This may not be your actual option - please
            check your super account to confirm.{" "}
            <a className="underline cursor-pointer">Full Disclaimer</a>
          </p>
        </div>
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

export default Step3b_SelectOption;
