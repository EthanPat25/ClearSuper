"use client";

import StepFrame from "./StepFrame";
import type { StepProps } from "./types";
import ChipGroup from "./ChipGroup";
import { useController, useForm } from "react-hook-form";
import { PRESERVATION_AGE } from "./model";

export default function RetirementStep({
  values,
  onChange,
  onBack,
  onNext,
}: StepProps) {
  const { control, handleSubmit } = useForm<{ retireAge: number }>({
    defaultValues: { retireAge: values.retireAge },
    mode: "onChange",
  });
  const { field, fieldState } = useController({
    name: "retireAge",
    control,
    rules: {
      min: {
        value: PRESERVATION_AGE,
        message: `Retirement age must be at least ${PRESERVATION_AGE} (preservation age).`,
      },
    },
  });
  const changeRetireAge = (value: number) => {
    field.onChange(value);
    if (value >= PRESERVATION_AGE) onChange({ retireAge: value });
  };
  return (
    <StepFrame
      heading="When do you want to retire?"
      onBack={onBack}
      onNext={handleSubmit((data) => {
        onChange(data);
        onNext();
      })}
      nextDisabled={fieldState.invalid}
      hideFrameBack
    >
      <ChipGroup
        presets={[60, 65, 67, 70]}
        value={field.value}
        onValue={changeRetireAge}
        columns={2}
        format={(n) => `Age ${n}`}
        exactLabel="Enter exact age"
        onBlur={field.onBlur}
        inputRef={field.ref}
        error={fieldState.error?.message}
      />
    </StepFrame>
  );
}
