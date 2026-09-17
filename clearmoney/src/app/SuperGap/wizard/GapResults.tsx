"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import Breakdown from "../Breakdown";
import EverydayTerms from "../EverydayTerms";
import type { SuperGapResult } from "../Forumula2";
import AdjustPanel from "./AdjustPanel";
import AssumptionsPanel from "./AssumptionsPanel";
import { money, type WizardValues } from "./model";
import { Wallet } from "@/app/AnimationComponents/Wallet";

const desktopQuery = "(min-width: 1024px)";

function subscribeToLayout(onChange: () => void) {
  const query = window.matchMedia(desktopQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function isDesktopLayout() {
  return window.matchMedia(desktopQuery).matches;
}

function serverLayout() {
  return true;
}

export default function GapResults({
  result,
  values,
  onUpdate,
}: {
  result: SuperGapResult | null;
  values: WizardValues;
  onUpdate: (changes: Partial<WizardValues>) => void;
}) {
  const isDesktop = React.useSyncExternalStore(
    subscribeToLayout,
    isDesktopLayout,
    serverLayout,
  );
  const [adjusting, setAdjusting] = React.useState(false);
  const [adjustingAssumptions, setAdjustingAssumptions] = React.useState(false);
  const [inflation, setInflation] = React.useState(true);
  const gap = result ? (inflation ? result.gapReal : result.gapNominal) : 0;
  const weeklyGap =
    result && result.gapReal > 0
      ? result.retirementWeeklyGap * (gap / result.gapReal)
      : 0;
  return (
    <div className="w-full">
      {/* Mobile control */}
      <div className="mb-5 flex justify-end gap-2 lg:hidden">
        <button
          type="button"
          aria-expanded={adjusting}
          onClick={() => setAdjusting((open) => !open)}
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold shadow-sm transition-all ${
            adjusting
              ? "border-slate-900 bg-slate-900 text-white hover:bg-slate-800"
              : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
          }`}
        >
          <i
            className={`fi ${
              adjusting ? "fi-rr-check" : "fi-rr-settings-sliders"
            } text-sm`}
          />
          {adjusting ? "Done" : "Adjust inputs"}
        </button>
        <button
          type="button"
          aria-expanded={adjustingAssumptions}
          onClick={() => { setAdjustingAssumptions((open) => !open); setAdjusting(false); }}
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold shadow-sm transition-all ${adjustingAssumptions ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:text-emerald-700"}`}
        >
          <i className={`fi ${adjustingAssumptions ? "fi-rr-check" : "fi-rr-settings-sliders"} text-sm`} />
          {adjustingAssumptions ? "Done" : "Adjust assumptions"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 xl:gap-10 items-start w-full">
        {/* Mobile edits replace the result; desktop keeps it visible. */}
        <div className="flex flex-col gap-5 w-full max-w-xl mx-auto lg:mx-0">
          <AnimatePresence mode="wait" initial={false}>
            {adjusting && !isDesktop ? (
              <motion.div
                key="mobile-adjust-panel"
                initial={{ opacity: 0, y: 10, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.985 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <AdjustPanel {...values} onUpdate={onUpdate} />
              </motion.div>
            ) : adjustingAssumptions && !isDesktop ? (
              <motion.div key="mobile-assumptions-panel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <AssumptionsPanel {...values} onUpdate={onUpdate} />
              </motion.div>
            ) : (
              <motion.div
                key="result"
                className="flex flex-col gap-5"
                initial={{ opacity: 0, y: 10, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.985 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Breakdown
                  result={result}
                  inflation={inflation}
                  onInflationChange={setInflation}
                />

                {result?.hasBreak && result.retirementWeeklyGap > 0 && (
              <motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="rounded-3xl border border-emerald-100 bg-[#168C68]/80 p-5 sm:p-6 flex items-center gap-4"
>
  <div className="p-2 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
    <Wallet responsiveSizing={"h-10 w-10"} />
  </div>

  <div className="min-w-0">
    <p className="text-sm font-medium text-emerald-50">
      Your balance gap, per week
    </p>

    <p className="text-xl font-bold leading-tight text-white">
      <span className="font-numeric">{money(weeklyGap)}</span> a week
    </p>

    <p className="text-xs text-emerald-50/80 mt-1">
      Spread evenly from age {values.retireAge} to 90, in{" "}
      {inflation ? "today’s" : "future"} dollars.
    </p>
  </div>
</motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT — Everyday Terms swaps to Adjust Assumptions in-place. */}
        <div className="w-full min-w-0">
          <div className="hidden lg:flex h-11 items-center justify-end gap-2 mb-5">
            <button
              type="button"
              aria-expanded={adjusting}
              onClick={() => setAdjusting((open) => !open)}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold shadow-sm transition-all ${
                adjusting
                  ? "border-slate-900 bg-slate-900 text-white hover:bg-slate-800"
                  : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
              }`}
            >
              <i
                className={`fi ${
                  adjusting ? "fi-rr-check" : "fi-rr-settings-sliders"
                } text-sm`}
              />
              {adjusting ? "Done" : "Adjust inputs"}
            </button>
            <button
              type="button"
              aria-expanded={adjustingAssumptions}
              onClick={() => { setAdjustingAssumptions((open) => !open); setAdjusting(false); }}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold shadow-sm transition-all ${adjustingAssumptions ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:text-emerald-700"}`}
            >
              <i className={`fi ${adjustingAssumptions ? "fi-rr-check" : "fi-rr-settings-sliders"} text-sm`} />
              {adjustingAssumptions ? "Done" : "Adjust assumptions"}
            </button>
          </div>

          <section id="gap-lenses" className="w-full min-w-0 scroll-mt-24">
            <AnimatePresence mode="wait" initial={false}>
              {adjusting && isDesktop ? (
                <motion.div
                  key="adjust-panel"
                  initial={{ opacity: 0, y: 10, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.985 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <AdjustPanel {...values} onUpdate={onUpdate} />
                </motion.div>
              ) : adjustingAssumptions && isDesktop ? (
                <motion.div key="assumptions-panel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <AssumptionsPanel {...values} onUpdate={onUpdate} />
                </motion.div>
              ) : (
                <motion.div
                  key="everyday-terms"
                  initial={{ opacity: 0, y: 10, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.985 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <EverydayTerms
                    gap={gap}
                    gapReal={result?.gapReal}
                    futureDollars={!inflation}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </div>
  );
}
