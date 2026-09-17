"use client";

import BreakTimeline from "./BreakTimeline";
import SliderRow from "./SliderRow";
import { money, PRESERVATION_AGE, type WizardValues } from "./model";

export default function AdjustPanel({
  currentAge,
  retireAge,
  salary,
  superBalance,
  breakStart,
  breakEnd,
  breakIncome,
  onUpdate,
}: WizardValues & {
  onUpdate: (changes: Partial<WizardValues>) => void;
}) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-md p-5 sm:p-7 w-full">
      <div className="flex items-center gap-2 mb-6">
        <i className="fi fi-rr-settings-sliders text-emerald-600" />
        <p className="text-sm font-bold text-slate-900">Adjust inputs</p>
      </div>

      <div className="flex flex-col gap-6">
        <SliderRow
          label="Your age"
          display={`${currentAge}`}
          value={currentAge}
          min={18}
          max={70}
          step={1}
          onChange={(v) => onUpdate({ currentAge: v })}
        />
        <SliderRow
          label="Retirement age"
          display={`${retireAge}`}
          value={retireAge}
          min={PRESERVATION_AGE}
          max={75}
          step={1}
          onChange={(v) => onUpdate({ retireAge: v })}
        />
        <SliderRow
          label="Salary"
          display={money(salary)}
          value={salary}
          min={30000}
          max={250000}
          step={5000}
          currency
          onChange={(v) => onUpdate({ salary: v })}
        />
        <SliderRow
          label="Super balance"
          display={money(superBalance)}
          value={superBalance}
          min={0}
          max={1000000}
          step={5000}
          currency
          onChange={(v) => onUpdate({ superBalance: v })}
        />

        <div className="border-t border-slate-100 pt-5">
          <p className="text-xs font-medium text-slate-600 mb-3">
            Career break
          </p>
          <BreakTimeline
            currentAge={currentAge}
            retireAge={retireAge}
            start={breakStart}
            end={breakEnd}
            onChange={(s, e) => onUpdate({ breakStart: s, breakEnd: e })}
          />
          <p className="text-xs font-medium text-slate-600 mt-5 mb-2">
            Income during it
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { v: 0, label: "None" },
              { v: 40, label: "40%" },
              { v: 60, label: "60%" },
              { v: 80, label: "80%" },
            ].map((opt) => (
              <button
                key={opt.v}
                type="button"
                onClick={() => onUpdate({ breakIncome: opt.v })}
                className={`rounded-xl py-2 text-xs font-bold border transition-all ${
                  breakIncome === opt.v
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "bg-white border-slate-200 text-slate-700 hover:border-emerald-400"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
