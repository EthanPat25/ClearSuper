const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");

function loadCalculator() {
  const sourcePath = path.join(
    __dirname,
    "../src/app/SuperGap/Forumula2.tsx",
  );
  const source = fs.readFileSync(sourcePath, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const calculatorModule = new module.constructor();
  calculatorModule.paths = module.paths;
  calculatorModule._compile(compiled, sourcePath);
  return calculatorModule.exports.calculateSuperGap;
}

const calculateSuperGap = loadCalculator();

const moneySmartAssumptions = {
  annualAdminFee: 59,
  investmentFeePct: 0.85,
  investmentReturnPct: 8.2,
  inflationPct: 3.7,
  superGuaranteePct: 12,
};

const calculate = (inputs) =>
  calculateSuperGap({ ...moneySmartAssumptions, ...inputs });

const percentDifference = (actual, expected) =>
  Math.abs(actual - expected) / expected;

// These were recorded against MoneySmart's live Superannuation Calculator on
// 17 September 2026. Insurance and adviser fees were set to $0 in both tools.
// MoneySmart models calendar dates and contribution timing more precisely, so a
// 6% tolerance protects the comparison from timing detail without hiding a
// material formula regression.
const moneySmartBenchmarks = [
  {
    name: "full career at 60% income",
    expectedGap: 178966,
    inputs: {
      currentAge: 30,
      retireAge: 67,
      salary: 75000,
      superBalance: 0,
      careerBreakStartAge: 30,
      careerBreakEndAge: 67,
      incomeDuringBreak: 60,
    },
  },
  {
    name: "early 60% hours for seven years",
    expectedGap: 44304,
    inputs: {
      currentAge: 30,
      retireAge: 67,
      salary: 75000,
      superBalance: 0,
      careerBreakStartAge: 30,
      careerBreakEndAge: 37,
      incomeDuringBreak: 60,
    },
  },
  {
    name: "mid-career 60% hours for five years",
    expectedGap: 34692,
    inputs: {
      currentAge: 35,
      retireAge: 67,
      salary: 100000,
      superBalance: 100000,
      careerBreakStartAge: 40,
      careerBreakEndAge: 45,
      incomeDuringBreak: 60,
    },
  },
  {
    name: "later five-year full break",
    expectedGap: 96581,
    inputs: {
      currentAge: 45,
      retireAge: 65,
      salary: 150000,
      superBalance: 250000,
      careerBreakStartAge: 52,
      careerBreakEndAge: 57,
      incomeDuringBreak: 0,
    },
  },
  {
    name: "ten years at 80% hours",
    expectedGap: 23987,
    inputs: {
      currentAge: 25,
      retireAge: 70,
      salary: 55000,
      superBalance: 10000,
      careerBreakStartAge: 30,
      careerBreakEndAge: 40,
      incomeDuringBreak: 80,
    },
  },
];

for (const benchmark of moneySmartBenchmarks) {
  test(`stays within 6% of MoneySmart: ${benchmark.name}`, () => {
    const result = calculate(benchmark.inputs);
    assert.ok(
      percentDifference(result.gapReal, benchmark.expectedGap) <= 0.06,
      `Expected $${Math.round(result.gapReal).toLocaleString()} to remain within 6% of MoneySmart's $${benchmark.expectedGap.toLocaleString()}`,
    );
  });
}

test("100% income during a period produces no super gap", () => {
  const result = calculate({
    currentAge: 30,
    retireAge: 67,
    salary: 75000,
    superBalance: 50000,
    careerBreakStartAge: 35,
    careerBreakEndAge: 45,
    incomeDuringBreak: 100,
  });

  assert.equal(result.gapReal, 0);
  assert.equal(result.gapNominal, 0);
});

test("a zero balance and zero income never creates a negative balance", () => {
  const result = calculate({
    currentAge: 30,
    retireAge: 67,
    salary: 0,
    superBalance: 0,
    careerBreakStartAge: 30,
    careerBreakEndAge: 37,
    incomeDuringBreak: 0,
  });

  assert.equal(result.baselineFinalReal, 0);
  assert.equal(result.withBreakFinalReal, 0);
  assert.ok(result.series.every((point) => point.baseline >= 0 && point.withBreak >= 0));
});

test("a lower income creates a smoothly larger gap", () => {
  const base = {
    currentAge: 30,
    retireAge: 67,
    salary: 75000,
    superBalance: 50000,
    careerBreakStartAge: 35,
    careerBreakEndAge: 45,
  };
  const gaps = [100, 80, 60, 40, 0].map(
    (incomeDuringBreak) => calculate({ ...base, incomeDuringBreak }).gapReal,
  );

  assert.deepEqual(gaps.slice(0, 1), [0]);
  for (let index = 1; index < gaps.length; index += 1) {
    assert.ok(gaps[index] > gaps[index - 1]);
  }
});

test("a higher employer contribution creates a larger absolute missed-contribution gap", () => {
  const base = {
    currentAge: 30,
    retireAge: 67,
    salary: 75000,
    superBalance: 50000,
    careerBreakStartAge: 35,
    careerBreakEndAge: 45,
    incomeDuringBreak: 60,
  };
  const gaps = [12, 15, 20].map(
    (superGuaranteePct) => calculate({ ...base, superGuaranteePct }).gapReal,
  );

  assert.ok(gaps[1] > gaps[0]);
  assert.ok(gaps[2] > gaps[1]);
});

test("future-dollar results correctly inflate today's-dollar results", () => {
  const inputs = {
    currentAge: 30,
    retireAge: 67,
    salary: 75000,
    superBalance: 50000,
    careerBreakStartAge: 35,
    careerBreakEndAge: 45,
    incomeDuringBreak: 60,
    inflationPct: 3.7,
  };
  const result = calculate(inputs);
  const expectedFutureGap =
    result.gapReal * Math.pow(1 + inputs.inflationPct / 100, inputs.retireAge - inputs.currentAge);

  assert.ok(Math.abs(result.gapNominal - expectedFutureGap) < 0.01);
});
