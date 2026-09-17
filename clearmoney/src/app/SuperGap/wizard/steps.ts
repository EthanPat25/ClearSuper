import type { ComponentType } from "react";
import AgeStep from "./AgeStep";
import RetirementStep from "./RetirementStep";
import SalaryStep from "./SalaryStep";
import BalanceStep from "./BalanceStep";
import CareerBreakStep from "./CareerBreakStep";
import { clampBreak, type WizardValues } from "./model";
import type { StepProps } from "./types";

type WizardStep = {
  id: string;
  component: ComponentType<StepProps>;
  onEnter?: (values: WizardValues) => WizardValues;
};

// Navigation follows this order; step-specific setup belongs with the definition.
export const wizardSteps: readonly WizardStep[] = [
  { id: "age", component: AgeStep },
  { id: "retire", component: RetirementStep },
  { id: "salary", component: SalaryStep },
  { id: "balance", component: BalanceStep },
  {
    id: "career-break",
    component: CareerBreakStep,
    onEnter: (values) =>
      clampBreak({
        ...values,
        breakStart: values.currentAge,
        breakEnd: values.currentAge + 10,
      }),
  },
];
