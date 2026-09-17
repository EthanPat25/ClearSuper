"use client";

import { motion, AnimatePresence } from "motion/react";
import type { SuperGapResult } from "./Forumula2";
import GapResults from "./wizard/GapResults";
import useGapWizard from "./wizard/useGapWizard";
import { wizardSteps } from "./wizard/steps";

const variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 40 : -40 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -40 : 40 }),
};

type GapWizardProps = {
  result: SuperGapResult | null;
  onCalculate: (result: SuperGapResult) => void;
};

export default function GapWizard({ result, onCalculate }: GapWizardProps) {
  const {
    step,
    direction: dir,
    values,
    change,
    update,
    next: handleNext,
    back: handleBack,
  } = useGapWizard(onCalculate);
  const activeStep = wizardSteps[step];
  const isReveal = !activeStep;
  const wizardStepCount = wizardSteps.length;
  const wizardProgress = Math.min(100, ((step + 1) / wizardStepCount) * 100);

  return (
    <div
      className={`w-full mx-auto px-2 sm:px-4 transition-[max-width] duration-300 ${
        isReveal ? "max-w-7xl" : "max-w-5xl"
      }`}
    >
      {!isReveal && (
        <div className="w-full mb-10 sm:mb-12">
          <div className="grid grid-cols-[3rem_minmax(0,1fr)_3rem] items-center gap-4 sm:gap-5">
            <div className="flex h-10 w-12 justify-center">
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
                initial={false}
                animate={{ width: `${wizardProgress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <span className="text-center whitespace-nowrap text-sm font-semibold text-slate-500 tabular-nums">
              {step + 1} of {wizardStepCount}
            </span>
          </div>
        </div>
      )}

      <div
        className={`w-full overflow-hidden ${!isReveal ? "max-w-xl mx-auto" : ""}`}
      >
        <AnimatePresence mode="wait" custom={dir} initial={false}>
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
            {activeStep ? (
              <activeStep.component
                values={values}
                onChange={change}
                onBack={handleBack}
                onNext={handleNext}
              />
            ) : (
              <GapResults result={result} values={values} onUpdate={update} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
