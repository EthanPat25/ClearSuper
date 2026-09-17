"use client";

import StepFrame from "./StepFrame";
import type { StepProps } from "./types";
import ChipGroup from "./ChipGroup";
import { money } from "./model";

export default function BalanceStep({
  values,
  onChange,
  onBack,
  onNext,
}: StepProps) {
  const { superBalance } = values;
  const changeSuperBalance = (value: number) =>
    onChange({ superBalance: value });
  return (
    <StepFrame
      heading="How much super do you have now?"
      onBack={onBack}
      onNext={onNext}
      hideFrameBack
    >
      <ChipGroup
        presets={[10000, 25000, 50000, 100000]}
        value={superBalance}
        onValue={changeSuperBalance}
        columns={2}
        format={money}
        exactLabel="Enter exact balance"
        currency
      />
    </StepFrame>
  );
}
