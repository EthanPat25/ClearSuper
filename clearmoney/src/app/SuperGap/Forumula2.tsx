export type Inputs = {
  currentAge: number;
  retireAge: number;
  salary: number;
  superBalance: number;
  careerBreakStartAge?: number | null;
  careerBreakEndAge?: number | null;
  incomeDuringBreak?: number | null;
  annualAdminFee?: number | null;
  investmentFeePct?: number | null;
  investmentReturnPct?: number | null;
  inflationPct?: number | null;
  superGuaranteePct?: number | null;
};

// Illustrative assumptions (consistent with the "Calculators & Tools" disclaimer
// on the About page: these are models for engagement, not predictions).
const SG_RATE = 0.12; // Superannuation Guarantee rate
const CONTRIBUTIONS_TAX = 0.15;
// 8.2% before tax and investment fees produces a 6.1% net return after the
// 15% earnings tax and the 0.85% fee below — MoneySmart's current Balanced
// reference return.
const GROSS_RETURN = 0.082;
const EARNINGS_TAX = 0.15;
const INFLATION = 0.037;
const BASE_ADMIN_FEE = 59; // flat annual fee, today's dollars
const INVESTMENT_FEE_PCT = 0.0085;


export type YearPoint = {
  age: number;
  baseline: number;
  withBreak: number;
};

export type SuperGapResult = {
  hasBreak: boolean;
  gapNominal: number;
  gapReal: number;
  baselineFinalReal: number;
  withBreakFinalReal: number;
  baselineFinalNominal: number;
  withBreakFinalNominal: number;
  series: YearPoint[];
  closeWeekly: number;

  retirementWeeklyGap: number;
};

type SimParams = {
  currentAge: number;
  retireAge: number;
  salary: number;
  superBalance: number;
  annualAdminFee: number;
  investmentFeePct: number;
  investmentReturnPct: number;
  inflationPct: number;
  superGuaranteePct: number;
  breakStart: number | null;
  breakEnd: number | null;
  incomeDuringBreak: number; // 0-100
};

// All balance figures are kept in today's dollars. Salary and dollar fees are
// therefore held level, and each nominal investment return is converted to a
// real return before it is applied. We only inflate once at the end when a
// future-dollar result is requested.
function simulateBalance({
  currentAge,
  retireAge,
  salary,
  superBalance,
  annualAdminFee,
  investmentFeePct,
  investmentReturnPct,
  inflationPct,
  superGuaranteePct,
  breakStart,
  breakEnd,
  incomeDuringBreak,
}: SimParams) {
  const years = Math.max(0, Math.round(retireAge - currentAge));
  let balance = superBalance;
  const series: number[] = [balance];

  for (let i = 0; i < years; i++) {
    const age = currentAge + i;
    const onBreak =
      breakStart != null &&
      breakEnd != null &&
      age >= breakStart &&
      age < breakEnd;
    const incomeFactor = onBreak ? incomeDuringBreak / 100 : 1;

    const yearSalary = salary * incomeFactor;
    const sgContribution = yearSalary * superGuaranteePct * (1 - CONTRIBUTIONS_TAX);

    // Inputs are nominal rates, while the simulation keeps balances, salary and
    // dollar fees in today's dollars. Convert the after-tax, after-fee return to
    // a real return before applying it; otherwise inflation would be deducted
    // from the result but never from the investment growth.
    //
    // Contributions and percentage fees occur through the year, so both are
    // applied to the mid-year balance.
    const netNominalReturn =
      investmentReturnPct * (1 - EARNINGS_TAX) - investmentFeePct;
    const netReturn = (1 + netNominalReturn) / (1 + inflationPct) - 1;
    const earnings = (balance + sgContribution / 2) * netReturn;

    balance = Math.max(0, balance + sgContribution + earnings - annualAdminFee);
    series.push(balance);
  }

  return { finalBalance: balance, series };
}

export function calculateSuperGap(data: Inputs): SuperGapResult {
  const currentAge = Number(data.currentAge);
  const retireAge = Number(data.retireAge);
  const salary = Number(data.salary);
  const superBalance = Number(data.superBalance);
  const breakStart = data.careerBreakStartAge ?? null;
  const breakEnd = data.careerBreakEndAge ?? null;
  const incomeDuringBreak = data.incomeDuringBreak ?? 0;
  const annualAdminFee = data.annualAdminFee ?? BASE_ADMIN_FEE;
  const investmentFeePct = (data.investmentFeePct ?? INVESTMENT_FEE_PCT * 100) / 100;
  const investmentReturnPct = (data.investmentReturnPct ?? GROSS_RETURN * 100) / 100;
  const inflationPct = (data.inflationPct ?? INFLATION * 100) / 100;
  const superGuaranteePct = (data.superGuaranteePct ?? SG_RATE * 100) / 100;

  const hasBreak =
    breakStart != null && breakEnd != null && breakEnd > breakStart;

  const baseline = simulateBalance({
    currentAge,
    retireAge,
    salary,
    superBalance,
    annualAdminFee,
    investmentFeePct,
    investmentReturnPct,
    inflationPct,
    superGuaranteePct,
    breakStart: null,
    breakEnd: null,
    incomeDuringBreak: 0,
  });

  const withBreak = hasBreak
    ? simulateBalance({
        currentAge,
        retireAge,
        salary,
        superBalance,
        annualAdminFee,
        investmentFeePct,
        investmentReturnPct,
        inflationPct,
        superGuaranteePct,
        breakStart,
        breakEnd,
        incomeDuringBreak,
      })
    : baseline;

  const years = Math.max(0, Math.round(retireAge - currentAge));
  const series: YearPoint[] = baseline.series.map((b, i) => ({
    age: currentAge + i,
    baseline: Math.round(b),
    withBreak: Math.round(withBreak.series[i] ?? b),
  }));

  const baselineFinalReal = baseline.finalBalance;
  const withBreakFinalReal = withBreak.finalBalance;
  const gapReal = Math.max(0, baselineFinalReal - withBreakFinalReal);

  const nominalFactor = Math.pow(1 + inflationPct, years);
  const baselineFinalNominal = baselineFinalReal * nominalFactor;
  const withBreakFinalNominal = withBreakFinalReal * nominalFactor;
  const gapNominal = Math.max(0, baselineFinalNominal - withBreakFinalNominal);

  // How much extra to contribute each year (level, today's dollars) so the
  // compounded total equals the gap. Contributions are assumed mid-year, matching
  // the balance sim, and grow at the same net return.
  let fvPerDollarPerYear = 0;
  for (let j = 0; j < years; j++) {
    const netNominalReturn =
      investmentReturnPct * (1 - EARNINGS_TAX) - investmentFeePct;
    const netReturn = (1 + netNominalReturn) / (1 + inflationPct) - 1;
    fvPerDollarPerYear += Math.pow(1 + netReturn, years - j - 0.5);
  }
  const closeAnnual = fvPerDollarPerYear > 0 ? gapReal / fvPerDollarPerYear : 0;

  const closeWeekly = closeAnnual / 52;

  const retirementYears = Math.max(1, 90 - retireAge);

  const retirementWeeklyGap =
    gapReal / (retirementYears * 52);

  return {
    hasBreak,
    gapNominal,
    gapReal,
    baselineFinalReal,
    withBreakFinalReal,
    baselineFinalNominal,
    withBreakFinalNominal,
    series,
    closeWeekly,
    retirementWeeklyGap,
  };
}
