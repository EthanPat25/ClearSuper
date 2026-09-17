"use client";

import React from "react";
import { MoneyBag } from "../AnimationComponents/MoneyBag";
import { motion, animate } from "motion/react";
import { Info, PauseIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SuperGapResult } from "./Forumula2";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(amount);

type BreakdownProps = {
  result: SuperGapResult | null;
  inflation: boolean;
  onInflationChange: (inflation: boolean) => void;
};

const Breakdown = ({ result, inflation, onInflationChange }: BreakdownProps) => {

  const hasGap = !!result && result.hasBreak;
  const gap = !result ? 0 : inflation ? result.gapReal : result.gapNominal;
  const displayGap = hasGap ? gap : 0;

  const [animatedGap, setAnimatedGap] = React.useState(0);
  React.useEffect(() => {
    const controls = animate(animatedGap, displayGap, {
      duration: 0.7,
      ease: "easeOut",
      onUpdate: (v) => setAnimatedGap(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayGap]);

  return (
    <div className="flex w-full flex-col md:flex-1 md:h-full">
      <div className="flex justify-center lg:justify-start mb-5 items-center gap-3">
        <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => onInflationChange(true)}
            aria-pressed={inflation}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              inflation
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Today&apos;s dollars
          </button>
          <button
            type="button"
            onClick={() => onInflationChange(false)}
            aria-pressed={!inflation}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !inflation
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Future dollars
          </button>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" aria-label="What does this mean?">
                <Info className="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs max-w-[200px]">
                Today&apos;s dollars adjust for inflation. Future dollars show
                the raw projected amount.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {/* Hero result card */}
      <motion.div
        className="flex w-full items-center gap-4 bg-[#144A38] rounded-3xl shadow-md p-5 sm:p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex-shrink-0 bg-white rounded-full h-14 w-14 sm:h-16 sm:w-16 flex items-center justify-center p-2">
          <MoneyBag responsiveSizing="w-full" />
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-xs sm:text-sm text-emerald-400 font-medium">
            Estimated gap at retirement
          </p>
          <h2 className="font-numeric font-bold text-[2.25rem] sm:text-[2.5rem] md:text-[3rem] text-white tabular-nums leading-tight">
            {formatCurrency(Math.round(animatedGap))}
          </h2>
       
        </div>
      </motion.div>

      {/* Breakdown card */}
      <motion.div
        className="bg-white rounded-3xl shadow-md mt-5 h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      >
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-left text-base font-semibold text-slate-800">
            Breakdown
          </h3>
        </div>
        {!hasGap ? (
          <div className="px-6 py-8 flex flex-col items-center justify-center text-center gap-2 h-full">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
              <PauseIcon className="w-5 h-5 text-slate-400" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-semibold text-slate-900">
              No career break added
            </p>
            <p className="text-sm text-slate-500 max-w-[28ch] leading-relaxed">
              Add a career break or reduced hours to see how it impacts your
              final balance.
            </p>
          </div>
        ) : (
          <div className="px-6 py-6 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-500">
                Balance if you worked without a break
              </p>
              <p className="font-numeric text-sm font-medium text-slate-900 tabular-nums">
                {formatCurrency(
                  inflation
                    ? result!.baselineFinalReal
                    : result!.baselineFinalNominal,
                )}
              </p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-500">
                Balance with your career break
              </p>
              <p className="font-numeric text-sm font-medium text-slate-900 tabular-nums">
                {formatCurrency(
                  inflation
                    ? result!.withBreakFinalReal
                    : result!.withBreakFinalNominal,
                )}
              </p>
            </div>
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <p className="text-sm font-semibold text-slate-900">
                Difference at retirement
              </p>
              <p className="font-numeric text-sm font-medium text-rose-600 tabular-nums">
                {formatCurrency(gap)}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Breakdown;
