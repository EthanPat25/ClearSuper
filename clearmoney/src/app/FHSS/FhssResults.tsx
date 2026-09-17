"use client";

import React from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  animate,
  useReducedMotion,
} from "motion/react";
import EverydayTerms from "../SuperGap/EverydayTerms";
import { money } from "../SuperGap/wizard/model";
import type { FhssInputs, FhssResult } from "./fhssCalc";
import FhssAdjustPanel from "./FhssAdjustPanel";
import { House } from "../AnimationComponents/House";

function subscribeToLayout(onChange: () => void) {
  const query = window.matchMedia("(min-width: 1024px)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function desktopSnapshot() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

export default function FhssResults({
  result,
  values,
  onUpdate,
}: {
  result: FhssResult;
  values: FhssInputs;
  onUpdate: (changes: Partial<FhssInputs>) => void;
}) {
  const [adjusting, setAdjusting] = React.useState(false);
  const isDesktop = React.useSyncExternalStore(
    subscribeToLayout,
    desktopSnapshot,
    () => true,
  );
  const [animated, setAnimated] = React.useState(0);
  React.useEffect(() => {
    const controls = animate(animated, result.difference, {
      duration: 0.7,
      ease: "easeOut",
      onUpdate: (v) => setAnimated(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.difference]);

  const isNoi = result.method === "noticeOfIntent";
  const bankInterest = Math.max(
    0,
    result.savingsNetDeposit - result.bankContributions,
  );
  const incomeTax = result.grossContributions - result.bankContributions;

  const summary = (
    <div className="flex flex-col gap-5 w-full lg:flex-1">
      {/* Headline — factual difference, not a "boost" */}
      <motion.div
        className="flex w-full items-center gap-4 bg-[#12294d] rounded-3xl shadow-md p-5 sm:p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div
          aria-hidden="true"
          className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white p-2 flex items-center justify-center flex-shrink-0"
        >
          <House responsiveSizing="w-full" />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-blue-200 font-medium">
            Estimated difference
          </p>
          <h2 className="font-numeric font-bold text-[2.25rem] sm:text-[2.5rem] md:text-[3rem] text-white tabular-nums leading-tight">
            {money(Math.abs(Math.round(animated)))}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-blue-100/80">
            {result.difference > 0
              ? "More with FHSS than a savings account"
              : result.difference < 0
                ? "Less with FHSS than a savings account"
                : "Same deposit with FHSS and a savings account"}
          </p>
        </div>
      </motion.div>

      <section className="flex flex-col rounded-3xl border border-slate-100 bg-white shadow-md">
        <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
          <h3 className="text-base font-semibold text-slate-800">
            Your deposit
          </h3>
        </div>
        <dl className="flex flex-col gap-5 p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <dt className="text-sm text-slate-600">
              {isNoi ? "Available from super" : "Through super (FHSS)"}
            </dt>
            <dd className="font-numeric text-xl font-bold tabular-nums text-slate-900">
              {money(result.fhssNetDeposit)}
            </dd>
          </div>
          {isNoi && (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <dt className="text-sm text-slate-600">
                  Tax saving outside super
                </dt>
                <dd className="font-numeric text-xl font-bold tabular-nums text-slate-900">
                  +{money(result.taxSaving)}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-slate-100 pt-4">
                <dt className="text-sm font-semibold text-slate-900">
                  Total with FHSS
                </dt>
                <dd className="font-numeric text-xl font-bold tabular-nums text-slate-900">
                  {money(result.totalFhssDeposit)}
                </dd>
              </div>
            </>
          )}
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <dt className="text-sm text-slate-600">In a savings account</dt>
            <dd className="font-numeric text-xl font-bold tabular-nums text-slate-900">
              {money(result.savingsNetDeposit)}
            </dd>
          </div>
        </dl>
        {isNoi && (
          <p className="px-5 pb-5 sm:px-6 text-xs text-slate-500">
            Assumes you keep the estimated tax saving for your deposit.
          </p>
        )}
      </section>
      <div className="flex items-center rounded-3xl bg-slate-100 p-5 sm:p-6 lg:flex-1">
        <p className="text-xs text-slate-500 leading-relaxed">
          Illustrative model only, not financial advice. Based on simplified
          assumptions about tax and earnings. Check the ATO and your fund, or a
          licensed adviser, before making decisions.{" "}
          <Link
            href="/about#disclaimer"
            className="underline font-semibold hover:text-slate-900 transition-colors"
          >
            Read full disclaimer
          </Link>
        </p>
      </div>
    </div>
  );

  const adjustments = <FhssAdjustPanel values={values} onUpdate={onUpdate} />;
  const toggle = (
    <button
      type="button"
      aria-expanded={adjusting}
      onClick={() => setAdjusting((open) => !open)}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold shadow-sm transition-all ${adjusting ? "border-slate-900 bg-slate-900 text-white hover:bg-slate-800" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:text-emerald-700"}`}
    >
      <i
        aria-hidden
        className={`fi ${adjusting ? "fi-rr-check" : "fi-rr-settings-sliders"} text-sm`}
      />
      {adjusting ? "Done" : "Adjust assumptions"}
    </button>
  );
  return (
    <div className="w-full">
      <div className="mb-5 flex justify-end">{toggle}</div>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 xl:gap-10 items-start lg:items-stretch">
        <div className="flex flex-col w-full min-w-0 max-w-xl mx-auto lg:mx-0">
          <ResultPanel
            panelKey={adjusting && !isDesktop ? "adjustments" : "summary"}
          >
            {adjusting && !isDesktop ? adjustments : summary}
          </ResultPanel>
        </div>
        <div className="flex flex-col w-full min-w-0">
          <ResultPanel
            panelKey={adjusting && isDesktop ? "adjustments" : "everyday"}
          >
            {adjusting && isDesktop ? (
              adjustments
            ) : result.difference > 0 ? (
              <EverydayTerms gap={result.difference} showPriceContext={false} />
            ) : (
              <div className="rounded-[2.5rem] bg-slate-100 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900">
                  Compare your options
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  With these inputs, the model doesn’t show a larger deposit
                  through FHSS. Adjust the assumptions to explore another
                  scenario.
                </p>
              </div>
            )}
          </ResultPanel>
        </div>
      </div>
      <section className="mt-12 sm:mt-16">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
            The breakdown
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <CalculationCard
              title="FHSS"
              total={result.totalFhssDeposit}
              rows={[
                [
                  isNoi ? "Cash transferred" : "Set aside before tax",
                  money(result.grossContributions),
                ],
                ["Contributions tax", `−${money(result.contributionsTax)}`],
                ["Earnings", `+${money(result.earnings)}`],
                ["Tax on release", `−${money(result.withdrawalTax)}`],
                ...(isNoi
                  ? [
                      [
                        "Tax saving outside super",
                        `+${money(result.taxSaving)}`,
                      ] as [string, string],
                    ]
                  : []),
              ]}
            />
            <CalculationCard
              title="Savings account"
              total={result.savingsNetDeposit}
              rows={[
                [
                  isNoi ? "Cash transferred" : "Set aside before tax",
                  money(result.grossContributions),
                ],
                ...(isNoi
                  ? []
                  : [
                      ["Income tax", `−${money(incomeTax)}`] as [
                        string,
                        string,
                      ],
                    ]),
                ["Interest", `+${money(bankInterest)}`],
                ["Tax on release", "—"],
              ]}
            />
          </div>

          {/* Method-specific tax note — factual */}
          <p className="mx-auto max-w-3xl text-sm text-slate-500 leading-relaxed">
            {isNoi ? (
              <>
                The comparison uses the same cash transfer for super and the
                bank. The estimated tax saving is kept outside super for your
                deposit, with no interest added. It may reduce a tax bill rather
                than arrive as a refund, and is assumed available by purchase.
                You must lodge a valid notice of intent and receive your fund’s
                acknowledgment before claiming the deduction. Complete this
                before releasing those contributions under FHSS.{" "}
                <a
                  href="https://www.ato.gov.au/print/section/070cfb0b-0299-47a3-a81c-c222280ebe90"
                  className="underline hover:text-slate-900"
                >
                  ATO requirements
                </a>
              </>
            ) : (
              <>
                The bank comparison uses the equivalent take-home pay. Salary
                sacrifice provides the tax benefit through your pay, so there is
                no separate tax saving added to the deposit.
              </>
            )}
          </p>
        </div>
      </section>
    </div>
  );
}

function ResultPanel({
  panelKey,
  children,
}: {
  panelKey: string;
  children: React.ReactNode;
}) {
  const [height, setHeight] = React.useState<number>();
  const observer = React.useRef<ResizeObserver | null>(null);
  const measurePanel = React.useCallback(
    (element: HTMLDivElement | null) => {
      observer.current?.disconnect();
      if (!element || panelKey === "adjustments") return;
      observer.current = new ResizeObserver(() => {
        setHeight(element.offsetHeight);
      });
      observer.current.observe(element);
    },
    [panelKey],
  );

  return (
    <div
      className="flex flex-1 flex-col"
      style={{ minHeight: panelKey === "adjustments" ? height : undefined }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={panelKey}
          ref={measurePanel}
          className="flex flex-1 flex-col"
          initial={{ opacity: 0, y: 10, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.985 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CalculationCard({
  title,
  rows,
  total,
}: {
  title: string;
  rows: [string, string][];
  total: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section
      className="min-w-0 rounded-3xl bg-white shadow-md"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.15 }}
    >
      <h3 className="border-b border-slate-100 px-6 py-5 text-lg font-bold text-slate-900 sm:px-7">
        {title}
      </h3>
      <dl className="space-y-5 p-6 sm:p-7">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
          >
            <dt className="text-sm text-slate-600">{label}</dt>
            <dd className="font-numeric text-sm font-semibold tabular-nums text-slate-900">
              {value}
            </dd>
          </div>
        ))}
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-slate-100 pt-5">
          <dt className="text-lg font-bold text-slate-900">For your deposit</dt>
          <dd className="font-numeric text-2xl font-bold tabular-nums text-[#FB6340]">
            {money(total)}
          </dd>
        </div>
      </dl>
    </motion.section>
  );
}
