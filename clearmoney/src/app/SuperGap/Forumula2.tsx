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
  // Internal/test hook. The calculator defaults to the date it is run.
  projectionStartDate?: string | Date;
};

// Illustrative assumptions (consistent with the "Calculators & Tools" disclaimer
// on the About page: these are models for engagement, not predictions).
const SG_RATE = 0.12; // Superannuation Guarantee rate
const CONTRIBUTIONS_TAX = 0.15;
export const MIN_RETIREMENT_AGE = 60;
export const MAX_RETIREMENT_AGE = 75;
// 8.2% before tax and investment fees produces a 6.1% net return after the
// 15% earnings tax and the 0.85% fee below — MoneySmart's current Balanced
// reference return.
const GROSS_RETURN = 0.082;
const EARNINGS_TAX = 0.15;
const INFLATION = 0.037;
const BASE_ADMIN_FEE = 59; // flat annual fee, today's dollars
const INVESTMENT_FEE_PCT = 0.0085;

const CONTRIBUTIONS_CAP_2025_26 = 30_000;
const CONTRIBUTIONS_CAP_2026_27 = 32_500;
const CONTRIBUTIONS_CAP_INCREMENT = 2_500;

// MoneySmart states that future concessional caps increase with wage inflation
// in $2,500 steps. Its future wage schedule is not published, so this is a
// documented ClearSuper projection assumption, not a legislated future cap.
// Keep this separate from INFLATION: INFLATION is the today's-dollar deflator.
const PROJECTED_WAGE_GROWTH = 0.037;


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

export function retirementAgeValidationError(
  currentAge: number,
  retireAge: number,
) {
  if (!Number.isInteger(retireAge)) {
    return "Retirement age must be a whole number.";
  }
  if (currentAge >= MAX_RETIREMENT_AGE) {
    return `SuperGap supports retirement ages up to ${MAX_RETIREMENT_AGE}, so your current age must be below ${MAX_RETIREMENT_AGE}.`;
  }
  if (retireAge < MIN_RETIREMENT_AGE || retireAge > MAX_RETIREMENT_AGE) {
    return `Retirement age must be between ${MIN_RETIREMENT_AGE} and ${MAX_RETIREMENT_AGE}.`;
  }
  if (retireAge <= currentAge) {
    return "Retirement age must be after your current age.";
  }
  return null;
}

function assertValidRetirementAge(currentAge: number, retireAge: number) {
  const error = retirementAgeValidationError(currentAge, retireAge);
  if (error) throw new RangeError(error);
}

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
  projectionFinancialYearStart: number;
  breakStart: number | null;
  breakEnd: number | null;
  incomeDuringBreak: number; // 0-100
};

function financialYearStart(date: Date) {
  return date.getMonth() >= 6 ? date.getFullYear() : date.getFullYear() - 1;
}

function projectedConcessionalCap(financialYear: number) {
  if (financialYear <= 2025) return CONTRIBUTIONS_CAP_2025_26;
  if (financialYear === 2026) return CONTRIBUTIONS_CAP_2026_27;

  const yearsSince2026_27 = financialYear - 2026;
  const wageIndexedCap =
    CONTRIBUTIONS_CAP_2026_27 *
    Math.pow(1 + PROJECTED_WAGE_GROWTH, yearsSince2026_27);

  return (
    CONTRIBUTIONS_CAP_2026_27 +
    Math.floor(
      (wageIndexedCap - CONTRIBUTIONS_CAP_2026_27) /
        CONTRIBUTIONS_CAP_INCREMENT,
    ) *
      CONTRIBUTIONS_CAP_INCREMENT
  );
}

function concessionalCapInTodaysDollars(
  financialYear: number,
  yearsIntoProjection: number,
  inflationPct: number,
) {
  return (
    projectedConcessionalCap(financialYear) /
    Math.pow(1 + inflationPct, yearsIntoProjection)
  );
}

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
  projectionFinancialYearStart,
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
    const grossEmployerContribution = Math.min(
      yearSalary * superGuaranteePct,
      concessionalCapInTodaysDollars(
        projectionFinancialYearStart + i,
        i,
        inflationPct,
      ),
    );
    const sgContribution = grossEmployerContribution * (1 - CONTRIBUTIONS_TAX);

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
  assertValidRetirementAge(currentAge, retireAge);
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
  const requestedProjectionStartDate = data.projectionStartDate
    ? new Date(data.projectionStartDate)
    : new Date();
  const projectionStartDate = Number.isNaN(requestedProjectionStartDate.getTime())
    ? new Date()
    : requestedProjectionStartDate;
  const projectionFinancialYearStart = financialYearStart(projectionStartDate);

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
    projectionFinancialYearStart,
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
        projectionFinancialYearStart,
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
