import { calculateSuperGap } from "../Forumula2";

export const PRESERVATION_AGE = 60;

export type WizardValues = {
  currentAge: number;
  retireAge: number;
  salary: number;
  superBalance: number;
  breakStart: number;
  breakEnd: number;
  breakIncome: number;
  annualAdminFee: number;
  investmentFeePct: number;
  investmentReturnPct: number;
  inflationPct: number;
  superGuaranteePct: number;
};

export const initialValues: WizardValues = {
  currentAge: 30,
  retireAge: 67,
  salary: 75000,
  superBalance: 50000,
  breakStart: 30,
  breakEnd: 40,
  breakIncome: 40,
  annualAdminFee: 59,
  investmentFeePct: 0.85,
  investmentReturnPct: 8.2,
  inflationPct: 3.7,
  superGuaranteePct: 12,
};

export const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));
export const money = (n: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(n);

export function clampBreak(values: WizardValues): WizardValues {
  const breakStart = clamp(
    values.breakStart,
    values.currentAge,
    values.retireAge - 1,
  );
  const breakEnd = clamp(values.breakEnd, breakStart + 1, values.retireAge);
  return { ...values, breakStart, breakEnd };
}

export function calculate(values: WizardValues) {
  return calculateSuperGap({
    currentAge: values.currentAge,
    retireAge: values.retireAge,
    salary: values.salary,
    superBalance: values.superBalance,
    careerBreakStartAge: values.breakStart,
    careerBreakEndAge: values.breakEnd,
    incomeDuringBreak: values.breakIncome,
    annualAdminFee: values.annualAdminFee,
    investmentFeePct: values.investmentFeePct,
    investmentReturnPct: values.investmentReturnPct,
    inflationPct: values.inflationPct,
    superGuaranteePct: values.superGuaranteePct,
  });
}
