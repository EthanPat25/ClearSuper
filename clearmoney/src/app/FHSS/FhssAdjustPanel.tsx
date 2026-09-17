"use client";

import SliderRow from "../SuperGap/wizard/SliderRow";
import { money } from "../SuperGap/wizard/model";
import type { FhssInputs } from "./fhssCalc";

export default function FhssAdjustPanel({
  values,
  onUpdate,
}: {
  values: FhssInputs;
  onUpdate: (changes: Partial<FhssInputs>) => void;
}) {
  return (
    <div className="flex-1 rounded-3xl bg-white border border-slate-200 shadow-md p-5 sm:p-7 w-full">
      <h2 className="flex items-center gap-2 mb-6 text-sm font-bold text-slate-900">
        <i aria-hidden className="fi fi-rr-settings-sliders text-emerald-600" />
        Adjust assumptions
      </h2>
      <div className="flex flex-col gap-6">
        <SliderRow
          label="Annual income"
          display={money(values.income)}
          value={values.income}
          min={0}
          max={Math.max(250000, values.income)}
          step={1000}
          currency
          onChange={(income) => onUpdate({ income })}
        />
        <SliderRow
          label={
            values.method === "noticeOfIntent"
              ? "Annual cash transfer"
              : "Annual pre-tax contribution"
          }
          display={money(values.annualContribution)}
          value={values.annualContribution}
          min={0}
          max={15000}
          step={500}
          currency
          onChange={(annualContribution) => onUpdate({ annualContribution })}
        />
        <SliderRow
          label="Years of saving"
          display={`${values.years} years`}
          value={values.years}
          min={1}
          max={Math.max(10, values.years)}
          step={1}
          onChange={(years) => onUpdate({ years: Math.round(years) })}
        />
        <fieldset>
          <legend className="mb-3 text-xs font-medium text-slate-600">
            Contribution method
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { id: "salarySacrifice", label: "Salary sacrifice" },
                { id: "noticeOfIntent", label: "Contribute yourself" },
              ] as const
            ).map((method) => (
              <button
                key={method.id}
                type="button"
                aria-pressed={values.method === method.id}
                onClick={() => onUpdate({ method: method.id })}
                className={`min-h-12 rounded-xl border px-3 py-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${values.method === method.id ? "bg-emerald-600 border-emerald-600 text-white" : "bg-white border-slate-200 text-slate-700 hover:border-emerald-400"}`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
