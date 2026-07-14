"use client";

import React from "react";
import { motion } from "motion/react";
import { Slider } from "../../AnimationComponents/Slider";
import { Question } from "../../AnimationComponents/Question";
import { updateForm } from "./formWizardStore";
import { useStateMachine } from "little-state-machine";

const OPTIONS = [
  {
    id: 1,
    title: "I don't know my investment option",
    desc: "We'll show your fund's default (MySuper) option.",
    icon: "question",
    nextStep: "StepThree_Two",
  },
  {
    id: 2,
    title: "I know my investment option",
    desc: "Let me pick from my fund's options (like Balanced or High Growth).",
    icon: "slider",
    nextStep: "StepThree_One",
  },
];

type Step2_KnowledgeLevelProps = {
  updateStep: (step: string) => void;
  ref: React.RefObject<HTMLDivElement>;
}

const Step2_KnowledgeLevel = ({ updateStep, ref }: Step2_KnowledgeLevelProps) => {
  const [selectedKnowledgeLevel, setSelectedKnowledgeLevel] = React.useState(null);
  const { actions, state } = useStateMachine({ actions: { updateForm } });

  return (
    <div
      className="flex flex-col gap-8 w-full p-4 md:p-0 md:max-w-[34rem]"
      ref={ref}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center font-bold text-lg sm:text-xl"
      >
        Step 2: Tell us what you know
      </motion.h1>

      <div className="flex flex-col gap-4">
        {OPTIONS.map((opt) => {
          const isSelected = selectedKnowledgeLevel === opt.id;
          return (
            <motion.div
              key={opt.id}
              whileTap={{
                scale: 0.99,

                transition: { duration: 0.1 },
              }}
              className={`
                cursor-pointer bg-white p-6 rounded-xl border-[3px]
                flex items-center gap-4 shadow-sm transition-all
                ${
                  isSelected
                    ? "border-teal-500 shadow-md"
                    : "border-gray-200 hover:border-green-400/50"
                }
              `}
              onClick={() => setSelectedKnowledgeLevel(opt.id)}
            >
              <div className="bg-gray-200 rounded-3xl w-[6rem] h-[6rem] p-2 flex justify-center items-center">
                {opt.icon === "question" && (
                  <Question responsiveSizing="h-full w-full" />
                )}
                {opt.icon === "slider" && (
                  <Slider responsiveSizing="h-full w-full" />
                )}
              </div>

              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-[0.95rem] md:text-xl">
                  {opt.title}
                </h1>
                <p className="text-sm md:text-sm text-gray-700 leading-snug">
                  {opt.desc}
                </p>
              </div>

              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto text-teal-600 font-bold text-xl"
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="sticky md:static bottom-4 md:bottom-auto w-full px-4 md:px-0 mt-4 md:mt-0 pb-[env(safe-area-inset-bottom)] md:pb-0">
        <div className="flex justify-between gap-3 w-full">
          <button
            onClick={() => updateStep("StepOne")}
            className="px-6 py-4 md:py-2 bg-slate-200 text-slate-800 rounded-2xl md:rounded-lg font-bold transition hover:bg-slate-300 shadow-lg md:shadow-none shrink-0"
          >
            Back
          </button>
          <button
            disabled={!selectedKnowledgeLevel}
            onClick={() => {
              const chosen = OPTIONS.find((option) => option.id === selectedKnowledgeLevel);
              actions.updateForm({ option_name: chosen?.title });
              updateStep(chosen?.nextStep);
            }}
            className={`flex-1 md:flex-none px-6 py-4 md:py-2 rounded-2xl md:rounded-lg font-bold transition shadow-lg md:shadow-none ${
              selectedKnowledgeLevel
                ? "bg-black text-white hover:-translate-y-1"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2_KnowledgeLevel;
