"use client";

import StepFrame from "./StepFrame";
import type { StepProps } from "./types";
import React from "react";
import { NumericFormat } from "react-number-format";
import BreakTimeline from "./BreakTimeline";
import { money } from "./model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CareerBreakStep({
  values,
  onChange,
  onBack,
  onNext,
}: StepProps) {
  const { currentAge, retireAge, salary, breakStart, breakEnd, breakIncome } =
    values;
  const changeBreakIncome = (value: number) => onChange({ breakIncome: value });
  const [customBreakIncomeOpen, setCustomBreakIncomeOpen] = React.useState(
    ![0, 40, 60, 80].includes(breakIncome),
  );
  const [period, setPeriod] = React.useState("year");
  const annualIncome = (salary * breakIncome) / 100;
  const [customAnnualIncome, setCustomAnnualIncome] = React.useState(annualIncome);
  const customIncomeId = React.useId();

  return (
    <StepFrame
      heading="Set your work pattern"
      onBack={onBack}
      onNext={onNext}
      nextLabel="See my gap"
      hideFrameBack
    >
      <div className="flex flex-col gap-7">
        <BreakTimeline
          currentAge={currentAge}
          retireAge={retireAge}
          start={breakStart}
          end={breakEnd}
          onChange={(start, end) =>
            onChange({ breakStart: start, breakEnd: end })
          }
        />

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-center">
          <div className="mx-auto mt-1 flex w-full max-w-md items-center">
            <p className="min-w-0 flex-1 px-3 text-center font-numeric text-xl font-black tabular-nums text-slate-900 sm:px-4 sm:text-2xl">
              {money(annualIncome)}
              <span className="mt-0.5 block text-xs font-semibold text-slate-500">
                Income during this period
              </span>
            </p>
            <p className="min-w-0 flex-1 border-l border-emerald-200 px-3 text-center sm:px-4">
              <span className="block font-numeric text-xl font-bold tabular-nums text-slate-700 sm:text-2xl">
                {money(salary)}
              </span>
              <span className="mt-0.5 block text-xs font-medium text-slate-500">
                Current salary
              </span>
            </p>
          </div>
        </div>

        <div>
          <div className="mb-3">
            <p className="text-sm font-bold text-slate-800">Work each week</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { v: 0, label: "Not working" },
              { v: 40, label: "2 days" },
              { v: 60, label: "3 days" },
              { v: 80, label: "4 days" },
            ].map((opt) => (
              <button
                key={opt.v}
                type="button"
                aria-pressed={breakIncome === opt.v && !customBreakIncomeOpen}
                onClick={() => {
                  changeBreakIncome(opt.v);
                  setCustomAnnualIncome((salary * opt.v) / 100);
                  setCustomBreakIncomeOpen(false);
                }}
                className={`min-h-12 rounded-xl px-2 py-3 text-sm font-bold border transition-all ${
                  breakIncome === opt.v && !customBreakIncomeOpen
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:border-emerald-400"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="mt-3">
            {!customBreakIncomeOpen ? (
              <button
                type="button"
                onClick={() => {
                  setCustomAnnualIncome(annualIncome);
                  setCustomBreakIncomeOpen(true);
                }}
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-all hover:border-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Set a custom income
              </button>
            ) : (
              <div className="w-full">
                <label
                  htmlFor={customIncomeId}
                  className="mb-2 block text-xs font-semibold text-slate-600"
                >
                  Income before tax
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex h-14 min-w-0 flex-1 items-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500">
                    <span
                      aria-hidden="true"
                      className="pl-4 text-lg text-slate-500"
                    >
                      $
                    </span>
                    <NumericFormat
                      id={customIncomeId}
                      autoFocus
                      onFocus={(event) => event.target.select()}
                      inputMode="decimal"
                      value={customAnnualIncome / (period === "week" ? 52 : 1)}
                      thousandSeparator
                      decimalScale={2}
                      allowNegative={false}
                      onValueChange={(values, sourceInfo) => {
                        if (sourceInfo.source !== "event") return;
                        const annual =
                          (values.floatValue ?? 0) *
                          (period === "week" ? 52 : 1);
                        setCustomAnnualIncome(annual);
                        changeBreakIncome(
                          salary > 0 ? (annual / salary) * 100 : 0,
                        );
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          setCustomBreakIncomeOpen(false);
                        }
                      }}
                      className="font-numeric h-full w-full min-w-0 bg-transparent px-4 text-lg font-semibold tabular-nums text-slate-900 focus:outline-none"
                    />
                  </div>
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger aria-label="Income period" className="h-14 w-[7.5rem] shrink-0 rounded-2xl border-slate-200 bg-white text-base text-slate-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="year">Per year</SelectItem>
                      <SelectItem value="week">Per week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {salary > 0 && customAnnualIncome > salary && (
                  <p
                    role="status"
                    className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800"
                  >
                    This is higher than your current salary. If you’re modelling reduced work, check that you entered the amount you expect to earn during this period.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </StepFrame>
  );
}
