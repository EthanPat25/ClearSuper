import { Inputs } from "./Calc"; // Your import statement is now included

export const projectInvestmentGrowth = (data: Inputs) => {
  // --- 1. VALIDATION BLOCK ---
  const inputs = {
    currentAge: Number(data.currentAge),
    retireAge: Number(data.retireAge),
    salary: Number(data.salary),
    superSG: Number(data.superSG),
    superBalance: Number(data.superBalance),
    superReturn: Number(data.superReturn),
  };

  for (const [key, value] of Object.entries(inputs)) {
    if (isNaN(value)) {
      console.error(
        `Error: Input '${key}' is not a valid number. Received:`,
        data[key as keyof Inputs],
      );
      return { nominal: 0, real: 0, fees: 0 };
    }
  }

  // --- 2. SETUP USING YOUR VALIDATED INPUTS ---
  let realBalance = inputs.superBalance;
  const realSalary = inputs.salary;
  const years = inputs.retireAge - inputs.currentAge;
  let totalFeesPaid = 0;

  // --- DEFINE THE RATES (Now using your inputs) ---
  const grossReturn = inputs.superReturn / 100; // Using your superReturn
  const sgRate = inputs.superSG / 100; // Using your superSG

  // These rates are based on the ASIC assumptions
  const earningsTax = 0.07;
  const inflation = 0.037;
  const contributionsTax = 0.15;

  // --- CALCULATE REAL RETURN RATE ---
  const netNominalReturnRate = grossReturn * (1 - earningsTax);
  const realNetReturnRate = (1 + netNominalReturnRate) / (1 + inflation) - 1;

  // --- DEFINE FEES (in today's dollars) ---
  const baseAdminFee = 74;
  const investFeePct = 0.0085;

  // Handle case where user retires immediately or in the past
  if (years <= 0) {
    return { nominal: realBalance, real: realBalance, fees: 0 };
  }

  // --- SIMULATE YEAR BY YEAR ---
  for (let j = 0; j < years; j++) {
    const grossRealSG = realSalary * sgRate;
    const netRealSGContribution = grossRealSG * (1 - contributionsTax);

    const realAdminFee = baseAdminFee;
    const realInvestmentFee = realBalance * investFeePct;
    const totalRealFees = realAdminFee + realInvestmentFee;
    totalFeesPaid += totalRealFees;

    const earnedOnBalance = realBalance * realNetReturnRate;
    const earnedOnContributions =
      netRealSGContribution * realNetReturnRate * 0.5;
    const lostOnFees = totalRealFees * realNetReturnRate * 0.5;
    const actualEarnedRealReturn =
      earnedOnBalance + earnedOnContributions - lostOnFees;

    realBalance =
      realBalance +
      netRealSGContribution +
      actualEarnedRealReturn -
      totalRealFees;
  }

  // --- FINAL CALCULATIONS ---
  const nominalBalance = realBalance * Math.pow(1 + inflation, years);

  return { nominal: nominalBalance, real: realBalance, fees: totalFeesPaid };
};
