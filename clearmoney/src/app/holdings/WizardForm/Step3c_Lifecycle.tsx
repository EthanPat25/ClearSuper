"use client";

import React from "react";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

type BlendOption = {
  option_id: string;
  option_name: string;
  as_of_date?: string;
};

type LifecycleBand = {
  id: string;
  age_label: string;
  option_id: string | null;
  option_name: string | null;
  as_of_date?: string;
  is_blend: boolean;
  blend_description?: string;
  blend_options?: BlendOption[];
  tone?: "growth" | "blend" | "conservative";
  stage_note?: string;
};

const MOCK_FUND = "Aware";
const MOCK_BANDS: LifecycleBand[] = [
  {
    id: "1",
    age_label: "Under 55",
    option_id: "Aware_HighGrowth",
    option_name: "High Growth",
    is_blend: false,
    tone: "growth",
    stage_note: "Where your super starts while you're younger",
  },
  {
    id: "2",
    age_label: "56-65",
    option_id: null,
    option_name: null,
    is_blend: true,
    blend_description:
      "Gradually shifts across High Growth, Balanced and Conservative Balanced.",
    blend_options: [
      { option_id: "Aware_HighGrowth", option_name: "High Growth" },
      { option_id: "Aware_Balanced", option_name: "Balanced" },
      {
        option_id: "Aware_ConservativeBalanced",
        option_name: "Conservative Balanced",
      },
    ],
    tone: "blend",
    stage_note: "Your super gradually shifts across these options",
  },
  {
    id: "3",
    age_label: "65+",
    option_id: "Aware_ConservativeBalanced",
    option_name: "Conservative Balanced",
    is_blend: false,
    tone: "conservative",
    stage_note: "Where your super sits as you approach retirement",
  },
];

const chipTone: Record<string, string> = {
  growth: "text-emerald-800 bg-emerald-200",
  blend: "text-emerald-700 bg-emerald-50",
  conservative: "text-slate-600 bg-slate-100",
};

const trackGradient =
  "bg-gradient-to-b from-emerald-300 via-slate-300 to-sky-300";

type View = { name: "bands" } | { name: "blend"; band: LifecycleBand };

const Step3c_Lifecycle = ({
  ref,
  updateStep,
}: {
  ref?: React.RefObject<HTMLDivElement>;
  updateStep: (step: string) => void;
}) => {
  const bands = MOCK_BANDS;
  const loading = false;
  const [view, setView] = React.useState<View>({ name: "bands" });

  function handleSelectBand(band: LifecycleBand) {
    if (band.is_blend) {
      setView({ name: "blend", band });
      return;
    }
    if (!band.option_id || !band.option_name) return;
    console.log("selected option", band.option_name);
    // real: actions.updateForm({...}); updateStep("StepBalance");
  }

  function handleSelectBlendOption(opt: BlendOption) {
    console.log("selected blend option", opt.option_name);
    // real: actions.updateForm({...}); updateStep("StepBalance");
  }

  if (view.name === "blend") {
    const band = view.band;
    return (
      <div className="flex flex-col gap-6 max-w-full px-4" ref={ref}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center font-bold text-lg sm:text-xl"
        >
          Ages {band.age_label}: a blend of options
        </motion.h1>

        <div className="w-full bg-slate-100 rounded-[3rem] p-10 shadow-sm flex flex-col gap-3 sm:max-w-xl">
          {band.blend_options?.map((opt) => (
            <div
              key={opt.option_id}
              onClick={() => handleSelectBlendOption(opt)}
              className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 cursor-pointer hover:border-teal-500 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-teal-700">
                  {opt.option_name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-900 font-bold text-sm leading-tight">
                  {opt.option_name}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
            </div>
          ))}

          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 mb-1">
            <p className="text-xs text-slate-600 leading-relaxed font-medium text-center">
              Between ages 56 and 65, Aware&apos;s lifecycle strategy gradually
              changes how much of your money goes into each of these three
              options. ClearSuper shows the options, but not the exact split for
              your age.
            </p>
          </div>

          <p className="text-[0.7rem] text-slate-500 text-center leading-relaxed mt-3 px-2">
            ClearSuper can&apos;t know which option you&apos;re actually in.
            This reflects your fund&apos;s lifecycle structure, not your
            personal account.{" "}
            <span className="underline cursor-pointer hover:text-slate-700 transition-colors">
              Read full disclaimer
            </span>
          </p>
        </div>

        <div className="w-full mt-4">
          <div className="flex justify-between gap-3 w-full">
            <button
              onClick={() => setView({ name: "bands" })}
              className="px-6 py-4 md:py-2 bg-slate-200 text-slate-800 rounded-2xl md:rounded-lg font-bold transition hover:bg-slate-300 shrink-0"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-full px-4" ref={ref}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center font-bold text-lg sm:text-xl"
      >
        {MOCK_FUND} uses a lifecyle strategy
      </motion.h1>

      <div className="w-full bg-slate-100 rounded-[3rem] p-10 shadow-sm flex flex-col sm:max-w-xl">
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          </div>
        ) : bands.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">
            We couldn&apos;t load the lifecycle stages for {MOCK_FUND}.
          </p>
        ) : (
          <div className="relative pl-1">
            <div
              className={`absolute w-[3px] rounded-full ${trackGradient}`}
              style={{ left: "39px", top: "28px", bottom: "28px" }}
            />

            <div className="flex flex-col gap-4">
              {bands.map((band) => {
                const selectable = !band.is_blend && band.option_name;
                return (
                  <div
                    key={band.id}
                    onClick={() => handleSelectBand(band)}
                    className={`relative z-10 rounded-2xl border p-4 flex items-center gap-4 transition-all ${
                      selectable
                        ? "bg-white cursor-pointer border-slate-200 hover:border-teal-500"
                        : band.is_blend
                          ? "bg-white cursor-pointer border-slate-200 hover:border-teal-500"
                          : "bg-white border-slate-200 cursor-default"
                    }`}
                  >
                    <div
                      className={`w-16 h-12 flex justify-center px-3 items-center flex-shrink-0 text-center font-bold text-xs rounded-xl py-2 leading-tight ${
                        chipTone[band.tone ?? "blend"]
                      }`}
                    >
                      {band.age_label}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-bold text-sm leading-tight text-slate-800`}
                      >
                        {band.is_blend
                          ? "A blend of options"
                          : band.option_name}
                      </p>
                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <p className="text-[0.7rem] text-slate-500 text-center leading-relaxed mt-3 px-2">
          ClearSuper can&apos;t know which option you&apos;re actually in. This
          reflects your fund&apos;s lifecycle structure, not your personal
          account.{" "}
          <span className="underline cursor-pointer hover:text-slate-700 transition-colors">
            Read full disclaimer
          </span>
        </p>
      </div>

      <div className="w-full mt-4">
        <div className="flex justify-between gap-3 w-full">
          <button
            onClick={() => updateStep("StepTwo")}
            className="px-6 py-4 md:py-2 bg-slate-200 text-slate-800 rounded-2xl md:rounded-lg font-bold transition hover:bg-slate-300 shrink-0"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3c_Lifecycle;
