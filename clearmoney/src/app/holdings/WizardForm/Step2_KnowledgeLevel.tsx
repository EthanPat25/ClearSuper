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
    title: "I don't know my super option",
    desc: "That's okay! We'll use your fund’s default MySuper option.",
    icon: "question",
    nextStep: "StepThree_Two",
  },
  {
    id: 2,
    title: "I know my super option",
    desc: "Let me pick it (Balanced, High Growth, and more).",
    icon: "slider",
    nextStep: "StepThree_One",
  },
];

const Step2_KnowledgeLevel = ({ updateStep, ref }) => {
  const [selected, setSelected] = React.useState(null);
  const { actions, state } = useStateMachine({ actions: { updateForm } });

  return (
    <div
      className="flex flex-col gap-8 w-full p-4 md:p-0 md:max-w-[33rem]"
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
          const isSelected = selected === opt.id;

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
              onClick={() => setSelected(opt.id)}
            >
              <div className="bg-gray-200 rounded-3xl w-[5rem] h-[5rem] md:w-[6rem] md:h-[6rem] flex justify-center items-center">
                {opt.icon === "question" && (
                  <Question responsiveSizing="h-[4rem] w-[4rem] md:h-[5rem] md:w-[5rem]" />
                )}
                {opt.icon === "slider" && (
                  <Slider responsiveSizing="h-[4rem] w-[4rem] md:h-[5rem] md:w-[5rem]" />
                )}
              </div>

              <div className="flex flex-col gap-1">
                <h1 className="font-bold text-[0.95rem] md:text-lg">
                  {opt.title}
                </h1>
                <p className="text-xs md:text-sm text-gray-700 leading-snug">
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
      <div className="flex justify-between mt-4">
        <button
          onClick={() => updateStep("StepOne")}
          className="px-6 py-2 bg-slate-200 text-slate-800 rounded-lg font-bold transition hover:bg-slate-300"
        >
          Back
        </button>

        <button
          disabled={!selected}
          onClick={() => {
            const chosen = OPTIONS.find((o) => o.id === selected);

            actions.updateForm({
              option: chosen?.title,
            });

            updateStep(chosen?.nextStep);
          }}
          className={`
            px-6 py-2 rounded-lg font-bold transition
            ${
              selected
                ? "bg-black text-white hover:-translate-y-1"
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }
          `}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Step2_KnowledgeLevel;
