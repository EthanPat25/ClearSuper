"use client";

import StepFrame from "./StepFrame";
import type { StepProps } from "./types";
import ChipGroup from "./ChipGroup";
import { money } from "./model";

export default function SalaryStep({
  values,
  onChange,
  onBack,
  onNext,
}: StepProps) {
  const { salary } = values;
  const changeSalary = (value: number) => onChange({ salary: value });
  return (
    <StepFrame
      heading="What do you earn a year?"
      onBack={onBack}
      onNext={onNext}
      hideFrameBack
    >
      <ChipGroup
        presets={[50000, 75000, 100000, 150000]}
        value={salary}
        onValue={changeSalary}
        columns={2}
        format={money}
        exactLabel="Enter custom salary"
        inputLabel="Your annual salary"
        currency
      />
    </StepFrame>
  );
}
