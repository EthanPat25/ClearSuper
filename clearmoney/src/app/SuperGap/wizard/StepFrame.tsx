"use client";

import type React from "react";

export default function StepFrame({
  heading,
  children,
  onBack,
  onNext,
  nextLabel = "Continue",
  showBack = true,
  hideFrameBack = false,
  nextDisabled = false,
  compactBody = false,
}: {
  heading: string;
  children: React.ReactNode;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  showBack?: boolean;
  hideFrameBack?: boolean;
  nextDisabled?: boolean;
  compactBody?: boolean;
}) {
  return (
    <div className="flex flex-col gap-6 w-full">
      <h1 className="text-center font-bold text-xl sm:text-2xl text-slate-900">
        {heading}
      </h1>

      <div
        className={`w-full bg-slate-100 rounded-[2.5rem] shadow-sm ${
          compactBody ? "px-8 py-10 sm:py-11" : "p-6 sm:p-8"
        }`}
      >
        {children}
      </div>

      <div className="flex justify-between gap-3 w-full">
        {showBack && !hideFrameBack ? (
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-4 md:py-3 bg-slate-200 text-slate-800 rounded-2xl font-bold transition hover:bg-slate-300 shrink-0"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className={`flex-1 md:flex-none px-8 py-4 md:py-3 rounded-2xl font-bold transition shadow-md ${
            nextDisabled
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-slate-900 text-white hover:-translate-y-0.5 hover:bg-slate-800"
          }`}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
