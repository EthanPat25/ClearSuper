"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import StepFrame from "../SuperGap/wizard/StepFrame";
import ChipGroup from "../SuperGap/wizard/ChipGroup";
import FhssResults from "./FhssResults";
import { calculateFhss, FhssMethod } from "./fhssCalc";
import { House } from "../AnimationComponents/House";
import ToolIntroCard from "../components/ToolIntroCard";

const INCOME_PRESETS = [55000, 75000, 90000, 120000];
const CONTRIB_PRESETS = [5000, 10000, 15000];
const YEARS_PRESETS = [2, 3, 4, 5];

const METHODS: {
  id: FhssMethod;
  icon: string;
  title: string;
  desc: string;
  detail: string;
}[] = [
  {
    id: "salarySacrifice",
    icon: "fi-rr-time-fast",
    title: "Salary sacrifice",
    desc: "Your employer sends part of your pre-tax pay to super for you.",
    detail: "The tax benefit shows up as less tax in each pay.",
  },
  {
    id: "noticeOfIntent",
    icon: "fi-rr-receipt",
    title: "Contribute yourself",
    desc: "Transfer money from your bank account into super, then claim a tax deduction.",
    detail: "Tax savings when you lodge your tax return.",
  },
];

// Four inputs followed by the result.
const STEPS = ["income", "method", "contribution", "years"] as const;
const REVEAL = STEPS.length;

const money = (n: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(n);

export default function FhssWizard() {
  const [started, setStarted] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [dir, setDir] = React.useState(1);

  const [income, setIncome] = React.useState(90000);
  const [contribution, setContribution] = React.useState(10000);
  const [years, setYears] = React.useState(3);
  const [method, setMethod] = React.useState<FhssMethod | null>(null);
  const result = method
    ? calculateFhss({ income, annualContribution: contribution, years, method })
    : null;

  function goToReveal() {
    if (!method) return;
    setDir(1);
    setStep(REVEAL);
  }

  function handleNext() {
    if (step === STEPS.length - 1) {
      goToReveal();
      return;
    }
    setDir(1);
    setStep((s) => s + 1);
  }

  function handleBack() {
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
  };

  if (!started) {
    return (
      <div className="flex w-full items-center pt-28 pb-8 sm:pt-32 sm:pb-12">
        <ToolIntroCard
          tone="blue"
          eyebrow="First Home Super Saver"
          title="Save through super or a savings account?"
          description="Compare how the same contribution could build your first-home deposit."
          icon={<House responsiveSizing="h-full w-full" />}
          disabled
          onStart={() => setStarted(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`w-full mx-auto px-4 flex flex-col items-center transition-[max-width] duration-300 ${
        step === REVEAL ? "max-w-7xl" : "max-w-5xl"
      }`}
    >
      {step < REVEAL && (
        <div className="w-full mb-10 sm:mb-12">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="h-10 w-10 shrink-0">
              {step > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  aria-label="Go back"
                  className="h-10 w-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <span aria-hidden>←</span>
                </button>
              )}
            </div>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
              <motion.div
                className="h-full rounded-full bg-emerald-500"
                initial={{ width: "0%" }}
                animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <span className="shrink-0 text-sm font-semibold text-slate-500 tabular-nums">
              {step + 1} of {STEPS.length}
            </span>
          </div>
        </div>
      )}

      <div
        className={`w-full overflow-hidden ${step < REVEAL ? "max-w-xl mx-auto" : ""}`}
      >
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full"
          >
            {step === 0 && (
              <StepFrame
                hideFrameBack
                heading="What do you earn a year?"
                onBack={handleBack}
                onNext={handleNext}
                showBack={false}
              >
                <ChipGroup
                  presets={INCOME_PRESETS}
                  value={income}
                  onValue={setIncome}
                  columns={2}
                  currency
                  format={money}
                  exactLabel="Enter custom income"
                  inputLabel="Your annual income"
                />
              </StepFrame>
            )}

            {STEPS[step] === "contribution" && (
              <StepFrame
                hideFrameBack
                heading={
                  method === "noticeOfIntent"
                    ? "How much will you transfer each year?"
                    : "How much will you salary sacrifice each year?"
                }
                nextDisabled={contribution <= 0}
                onBack={handleBack}
                onNext={handleNext}
              >
                <ChipGroup
                  presets={CONTRIB_PRESETS}
                  value={contribution}
                  onValue={(n) => setContribution(Math.min(15000, n))}
                  columns={3}
                  currency
                  format={(n) => `$${n / 1000}k`}
                  exactLabel="Enter custom amount"
                  inputLabel={
                    method === "noticeOfIntent"
                      ? "Annual amount you’ll transfer"
                      : "Annual pre-tax contribution"
                  }
                />
                <p className="mt-4 text-xs text-slate-500 text-center">
                  Up to $15,000 a year, $50,000 in total.
                </p>
              </StepFrame>
            )}

            {STEPS[step] === "years" && (
              <StepFrame
                hideFrameBack
                heading="How many years until you buy?"
                nextLabel="See the difference"
                nextDisabled={years < 1}
                onBack={handleBack}
                onNext={handleNext}
              >
                <ChipGroup
                  presets={YEARS_PRESETS}
                  value={years}
                  onValue={(n) => setYears(Math.min(50, n))}
                  columns={2}
                  format={(n) => `${n} yrs`}
                  exactLabel="Enter custom years"
                  inputLabel="Years of saving"
                  placeholder="3"
                  suffix="years of saving"
                />
              </StepFrame>
            )}

            {STEPS[step] === "method" && (
              <StepFrame
                hideFrameBack
                heading="How would you contribute?"
                onBack={handleBack}
                onNext={handleNext}
                nextDisabled={!method}
              >
                <div className="flex flex-col gap-3">
                  {METHODS.map((m) => {
                    const active = method === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMethod(m.id)}
                        aria-pressed={active}
                        className={`w-full text-left rounded-2xl border p-4 flex items-start gap-4 transition-all ${
                          active
                            ? "border-emerald-500 bg-white shadow-md"
                            : "border-slate-200 bg-white hover:border-emerald-300"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                            active
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <i className={`fi ${m.icon} text-lg`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-slate-900">
                            {m.title}
                          </p>
                          <p className="text-xs text-slate-500 leading-snug">
                            {m.desc}
                          </p>
                          <span
                            className={`inline-block mt-2 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                              active
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {m.detail}
                          </span>
                        </div>
                        {active && (
                          <motion.i
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="fi fi-rr-check text-emerald-600 flex-shrink-0"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-400 text-center mt-4">
                  Both receive concessional tax treatment. The upfront cost and
                  timing of the tax benefit differ.
                </p>
              </StepFrame>
            )}

            {step === REVEAL && result && (
              <FhssResults
                result={result}
                values={{
                  income,
                  annualContribution: contribution,
                  years,
                  method: method!,
                }}
                onUpdate={(changes) => {
                  if (changes.income !== undefined) setIncome(changes.income);
                  if (changes.annualContribution !== undefined)
                    setContribution(changes.annualContribution);
                  if (changes.years !== undefined) setYears(changes.years);
                  if (changes.method !== undefined) setMethod(changes.method);
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
