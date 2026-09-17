"use client";

import StepFrame from "./StepFrame";
import type { StepProps } from "./types";
import { NumericFormat } from "react-number-format";

export default function AgeStep({
  values,
  onChange,
  onBack,
  onNext,
}: StepProps) {
  const { currentAge } = values;
  const changeCurrentAge = (value: number) => onChange({ currentAge: value });
  return (
    <StepFrame
      heading="How old are you?"
      onBack={onBack}
      onNext={onNext}
      showBack={false}
      compactBody
      nextDisabled={currentAge < 18 || currentAge > 70}
    >
      <div className="flex flex-col items-center justify-center py-2">
        <NumericFormat
          autoFocus
          inputMode="numeric"
          decimalScale={0}
          allowNegative={false}
          value={currentAge || ""}
          placeholder="30"
          isAllowed={(values) =>
            values.floatValue == null || values.floatValue <= 99
          }
          onValueChange={(values) => changeCurrentAge(values.floatValue ?? 0)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && currentAge >= 18 && currentAge <= 70) {
              onNext();
            }
          }}
          aria-label="Your age"
          className="font-numeric w-28 border-0 border-b-2 border-slate-300 bg-transparent pb-2 text-center text-5xl font-bold tabular-nums text-slate-950 outline-none transition-colors placeholder:text-slate-300 focus:border-emerald-500"
        />

        <p className="mt-3 text-sm font-medium text-slate-400">years old</p>

        {currentAge > 0 && (currentAge < 18 || currentAge > 70) && (
          <p className="mt-3 text-xs font-medium text-rose-500">
            Enter an age between 18 and 70.
          </p>
        )}
      </div>
    </StepFrame>
  );
}
