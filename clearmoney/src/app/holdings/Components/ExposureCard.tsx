// components/popups/ExposureCard.tsx
"use client";

import React from "react";
import { NumericFormat } from "react-number-format";

type ExposureCardProps = {
  value: number;
  weight: number;
  decimalScale?: number;
  superFund: string;
  helperText?: string;
};

export function ExposureCard({
  value,
  weight,
  decimalScale = 0,
  superFund,
  helperText,
}: ExposureCardProps) {
  return (
    <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100/50 relative overflow-hidden">
      <p className="text-sm font-bold text-slate-400 tracking-widest mb-2">
        Your proportional exposure
      </p>
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-black text-slate-900 tabular-nums tracking-tighter">
          <NumericFormat
            value={value}
            thousandSeparator
            prefix="$"
            decimalScale={decimalScale}
            fixedDecimalScale
            displayType="text"
          />
        </span>
        <span className="text-xl font-bold text-orange-600  px-2 py-0.5 rounded-lg tracking-tighter">
          {weight.toFixed(2)}%
        </span>
      </div>
      <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
        {helperText ??
          `For illustrative purposes, estimated from ${superFund}'s publicly disclosed APRA holdings.`}
      </p>
    </div>
  );
}
