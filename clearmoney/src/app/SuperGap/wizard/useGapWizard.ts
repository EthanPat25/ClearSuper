"use client";

import { useState } from "react";
import type { SuperGapResult } from "../Forumula2";
import {
  calculate,
  clampBreak,
  initialValues,
  type WizardValues,
} from "./model";
import { wizardSteps } from "./steps";

export default function useGapWizard(
  onCalculate: (result: SuperGapResult) => void,
) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState(initialValues);

  function change(changes: Partial<WizardValues>) {
    setValues((current) => ({ ...current, ...changes }));
  }

  function update(changes: Partial<WizardValues>) {
    const nextValues = clampBreak({ ...values, ...changes });
    setValues(nextValues);
    onCalculate(calculate(nextValues));
  }

  function next() {
    const nextStep = step + 1;
    const enter = wizardSteps[nextStep]?.onEnter;
    if (enter) setValues(enter(values));
    if (nextStep === wizardSteps.length) onCalculate(calculate(values));
    setDirection(1);
    setStep(nextStep);
  }

  function back() {
    setDirection(-1);
    setStep((current) => Math.max(0, current - 1));
  }

  return { step, direction, values, change, update, next, back };
}
