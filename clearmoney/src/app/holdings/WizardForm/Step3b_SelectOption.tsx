"use client";

import React from "react";
import { motion } from "motion/react";
import { NumericFormat } from "react-number-format";
import { Label } from "@/components/ui/label";

const Step3b_SelectOption = ({ updateStep, ref }) => {
  return (
    <div className="flex flex-col gap-8 w-[33rem] max-w-full" ref={ref}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center font-bold text-xl"
      >
        Step 3: Your Details
      </motion.h1>

      <div className="w-full bg-slate-100 rounded-[3rem] p-10 shadow-sm">
        <form className="flex flex-col gap-6">
          <div className="space-y-1">
            <Label
              htmlFor="age"
              className="text-base font-medium text-gray-900"
            >
              Your Age
            </Label>

            <div className="relative">
              <NumericFormat
                thousandSeparator={false}
                placeholder="21"
                className="pl-[1.1rem] h-[2.7rem] w-full text-sm rounded-xl font-normal text-gray-900 placeholder:text-gray-400"
              />

              <p className="text-xs text-gray-500 mt-3 leading-snug">
                We use your age because many MySuper options adjust your
                investments over time.
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
            option for your age. This may not be your actual option — please
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
          onClick={() => updateStep("StepFour")}
          className="px-6 py-2 bg-black text-white rounded-lg font-bold transition hover:-translate-y-1"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default Step3b_SelectOption;
