// First Home Super Saver (FHSS) — an illustrative model, NOT financial advice.
// Salary sacrifice compares equal take-home cost. Personal contributions
// compare equal starting cash, retaining the tax saving outside super.
// Retained tax savings are assumed available by purchase, with no interest.
// All assumptions are simplifications; real outcomes depend on your own
// circumstances, the ATO's actual rates, and your fund. Figures are indicative.

export type FhssMethod = "salarySacrifice" | "noticeOfIntent";

export type FhssInputs = {
  income: number;
  annualContribution: number; // gross super contribution, before contributions tax
  years: number;
  method: FhssMethod;
};

export type FhssResult = {
  method: FhssMethod;
  marginalRate: number; // incl. Medicare levy
  grossContributions: number; // total pre-tax set aside (capped)
  contributionsTax: number; // 15% paid inside super
  earnings: number; // deemed earnings in the fund
  withdrawalTax: number; // tax on release (marginal − 30% offset)
  fhssNetDeposit: number; // available for your deposit via FHSS
  savingsNetDeposit: number; // same amount saved in a bank, after tax
  totalFhssDeposit: number; // net super release plus retained personal tax saving
  bankContributions: number; // actual cash deposited into the bank comparison
  difference: number; // totalFhssDeposit − savingsNetDeposit
  taxSaving: number; // personal deduction benefit retained outside super
};

// FHSS scheme limits (as at 2024-25).
const FHSS_ANNUAL_CAP = 15000;
const FHSS_TOTAL_CAP = 50000;

// Tax + growth assumptions (illustrative).
const CONTRIBUTIONS_TAX = 0.15; // tax on concessional contributions in super
const WITHDRAWAL_OFFSET = 0.3; // tax offset on the assessable released amount
const EARNINGS_RATE = 0.045; // deemed earnings in the fund (illustrative)
const SAVINGS_RATE = 0.045; // comparable savings-account interest rate

// 2024-25 resident marginal rates including the 2% Medicare levy.
export function marginalRate(income: number): number {
  if (income <= 18200) return 0;
  if (income <= 45000) return 0.16 + 0.02;
  if (income <= 135000) return 0.3 + 0.02;
  if (income <= 190000) return 0.37 + 0.02;
  return 0.45 + 0.02;
}

export function calculateFhss(data: FhssInputs): FhssResult {
  const income = Number(data.income) || 0;
  const perYear = Math.max(0, Number(data.annualContribution) || 0);
  const years = Math.max(0, Math.round(Number(data.years) || 0));
  const rate = marginalRate(income);

  let fund = 0; // FHSS balance (after 15% contributions tax), grows at EARNINGS_RATE
  let savings = 0; // bank savings of the same pre-tax amount, after income tax
  let gross = 0; // total pre-tax set aside
  let remaining = FHSS_TOTAL_CAP;
  let bankContributions = 0;
  let taxSaving = 0;
  const isPersonal = data.method === "noticeOfIntent";

  for (let i = 0; i < years; i++) {
    const c = Math.min(perYear, FHSS_ANNUAL_CAP, remaining);
    remaining -= c;
    gross += c;

    // FHSS: contribution taxed 15% going in, then grows.
    fund = (fund + c * (1 - CONTRIBUTIONS_TAX)) * (1 + EARNINGS_RATE);

    // Personal: the same cash transfer goes into either super or the bank.
    // Salary sacrifice: the bank receives the equivalent take-home pay.
    const bankContribution = isPersonal ? c : c * (1 - rate);
    bankContributions += bankContribution;
    if (isPersonal) taxSaving += c * rate;
    savings = (savings + bankContribution) * (1 + SAVINGS_RATE * (1 - rate));
  }

  const contributionsTax = gross * CONTRIBUTIONS_TAX;
  const netContribInFund = gross - contributionsTax;
  const earnings = Math.max(0, fund - netContribInFund);

  // On release, the assessable FHSS amount (concessional contributions + earnings)
  // is taxed at your marginal rate minus a 30% offset (never below zero).
  const withdrawalTax = fund * Math.max(0, rate - WITHDRAWAL_OFFSET);
  const fhssNetDeposit = fund - withdrawalTax;

  const totalFhssDeposit = fhssNetDeposit + taxSaving;
  const difference = totalFhssDeposit - savings;

  return {
    method: data.method,
    marginalRate: rate,
    grossContributions: gross,
    contributionsTax,
    earnings,
    withdrawalTax,
    fhssNetDeposit,
    savingsNetDeposit: savings,
    difference,
    taxSaving,
    totalFhssDeposit,
    bankContributions,
  };
}
