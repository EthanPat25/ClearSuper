import type { WizardValues } from "./model";
export type StepProps = {
  values: WizardValues;
  onChange: (changes: Partial<WizardValues>) => void;
  onBack: () => void;
  onNext: () => void;
};
