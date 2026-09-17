import assert from "node:assert/strict";
import test from "node:test";
import { calculateFhss } from "./fhssCalc.ts";

const inputs = { income: 90000, annualContribution: 10000, years: 1 };
const close = (actual, expected) =>
  assert.ok(Math.abs(actual - expected) < 0.000001, `${actual} ≈ ${expected}`);

test("personal contributions compare equal cash and retain the tax saving once", () => {
  const result = calculateFhss({ ...inputs, method: "noticeOfIntent" });
  close(result.bankContributions, 10000);
  close(result.savingsNetDeposit, 10306);
  close(result.taxSaving, 3200);
  close(result.fhssNetDeposit, 8704.85);
  close(result.totalFhssDeposit, 11904.85);
  close(result.difference, 1598.85);
});

test("salary sacrifice compares take-home cost without a separate refund", () => {
  const result = calculateFhss({ ...inputs, method: "salarySacrifice" });
  close(result.bankContributions, 6800);
  close(result.savingsNetDeposit, 7008.08);
  close(result.taxSaving, 0);
  close(result.totalFhssDeposit, result.fhssNetDeposit);
  close(result.difference, 1696.77);
});

test("switching methods changes the cash comparison, not the super release", () => {
  const personal = calculateFhss({
    ...inputs,
    years: 3,
    method: "noticeOfIntent",
  });
  const sacrifice = calculateFhss({
    ...inputs,
    years: 3,
    method: "salarySacrifice",
  });
  close(personal.fhssNetDeposit, sacrifice.fhssNetDeposit);
  close(personal.bankContributions, 30000);
  close(sacrifice.bankContributions, 20400);
  close(personal.taxSaving, 9600);
  close(
    personal.difference,
    personal.totalFhssDeposit - personal.savingsNetDeposit,
  );
});

test("growth continues after reaching the cap, without additional tax savings", () => {
  for (const method of ["noticeOfIntent", "salarySacrifice"]) {
    const capped = calculateFhss({
      ...inputs,
      annualContribution: 15000,
      years: 4,
      method,
    });
    const later = calculateFhss({
      ...inputs,
      annualContribution: 15000,
      years: 5,
      method,
    });
    close(capped.grossContributions, 50000);
    close(later.grossContributions, 50000);
    close(later.taxSaving, capped.taxSaving);
    close(later.bankContributions, capped.bankContributions);
    assert.ok(later.earnings > capped.earnings);
    assert.ok(later.savingsNetDeposit > capped.savingsNetDeposit);
  }
});

test("zero contribution or zero years produces no benefit", () => {
  for (const method of ["noticeOfIntent", "salarySacrifice"]) {
    for (const changes of [{ annualContribution: 0 }, { years: 0 }]) {
      const result = calculateFhss({ ...inputs, ...changes, method });
      close(result.totalFhssDeposit, 0);
      close(result.taxSaving, 0);
      close(result.difference, 0);
    }
  }
});
