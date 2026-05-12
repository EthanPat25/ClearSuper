"use client";

import React from "react";
import { motion } from "motion/react";
import { NumericFormat } from "react-number-format";
import { Label } from "@/components/ui/label";
import { updateForm } from "./formWizardStore";
import { useStateMachine } from "little-state-machine";

const StepFour = ({ updateStep, ref }) => {
  const { actions, state } = useStateMachine({ actions: { updateForm } });
  const [balancevalue, updateBalance] = React.useState<number>(0);
  return (
    <div className="flex flex-col gap-8 w-[33rem] max-w-full" ref={ref}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center font-bold text-xl"
      >
        Step 4: Your Balance
      </motion.h1>
      <div className="w-full bg-slate-100 rounded-[3rem] p-10 shadow-sm">
        <form className="flex flex-col gap-6">
          <div className="space-y-1">
            <Label
              htmlFor="balance"
              className="text-base font-medium text-gray-900"
            >
              Your Super Balance
            </Label>

            <div className="relative">
              <NumericFormat
                thousandSeparator
                placeholder="10,000"
                className="pl-[1.1rem] h-[2.7rem] w-full text-sm rounded-xl font-normal text-gray-900 placeholder:text-gray-400"
                onValueChange={(values) => {
                  updateBalance(Number(values.value));
                }}
              />

              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm">
                $
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-1">
              Don’t know your balance? Check your fund’s member portal.
            </p>
          </div>
        </form>
        <div className="bg-orange-50 border border-orange-200 text-orange-800 rounded-2xl w-full p-2 mt-4 flex justify-center items-center">
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
          onClick={() => {
            actions.updateForm({ balance: balancevalue });
            updateStep("FinalStep");
          }}
          className="px-6 py-2 bg-black text-white rounded-lg font-bold transition hover:-translate-y-1"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default StepFour;
