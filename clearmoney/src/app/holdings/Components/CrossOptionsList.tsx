// components/popups/CrossOptionsList.tsx
"use client";

import React from "react";
import { NumericFormat } from "react-number-format";
import { IconChevronRight } from "@tabler/icons-react";
import { SectorStyle } from "./PopUpShell";
import { CrossOption } from "../types/holdings";

type CrossOptionsListProps = {
  title: string;
  loading: boolean;
  options: Array<CrossOption>;
  currentOptionId: string;
  balance: number;
  sectorStyle: SectorStyle;
  onSwitchOption: (id: string, name: string) => void;
};

function getAbbreviation(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return words
    .map((w) => w.charAt(0).toUpperCase())
    .join("")
    .slice(0, 3);
}

export function CrossOptionsList({
  title,
  loading,
  options,
  currentOptionId,
  balance,
  sectorStyle,
  onSwitchOption,
}: CrossOptionsListProps) {
  if (!loading && options.length <= 1) return null;

  return (
    <div className="space-y-4 pt-4 border-t border-slate-100">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        {loading && (
          <div className="w-4 h-4 border-2 border-slate-200 border-t-slate-500 rounded-full animate-spin" />
        )}
      </div>

      <div className="grid gap-3">
        {!loading &&
          options.map((opt) => {
            const isCurrent = opt.id === currentOptionId;
            const isZero = opt.weightPercent === 0;
            const optValue = (opt.weightPercent / 100) * balance;
            const abbr = getAbbreviation(opt.optionName);

            return (
              <button
                key={opt.id}
                disabled={isCurrent || isZero}
                onClick={() => onSwitchOption(opt.id, opt.optionName)}
                className={`w-full group text-left rounded-2xl p-4 hover:shadow-md transition-all border ${
                  isCurrent
                    ? `${sectorStyle.bg} ${sectorStyle.border} shadow-sm`
                    : isZero
                      ? "bg-slate-50 border-slate-100 opacity-40"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md active:scale-[0.98] cursor-pointer"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex-shrink-0 w-10 h-10 flex items-center justify-center bg-slate-100 rounded-2xl`}
                  >
                    <span className="text-xs font-bold tracking-tight">
                      {abbr}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs sm:text-sm font-bold truncate ${
                        isCurrent ? sectorStyle.text : "text-slate-900"
                      }`}
                    >
                      {opt.optionName}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <p
                        className={`text-[10px] font-bold ${
                          isCurrent ? sectorStyle.text : "text-orange-500"
                        }`}
                      >
                        {isZero
                          ? "Not held"
                          : `${opt.weightPercent.toFixed(2)}% of portfolio`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-base sm:text-lg font-black tabular-nums ${
                        isCurrent ? sectorStyle.text : "text-slate-900"
                      }`}
                    >
                      {isZero ? (
                        "—"
                      ) : (
                        <NumericFormat
                          value={optValue}
                          thousandSeparator
                          prefix="$"
                          decimalScale={0}
                          displayType="text"
                        />
                      )}
                    </span>
                    <IconChevronRight
                      size={14}
                      className={`transition-colors ${
                        !isCurrent && !isZero
                          ? "text-slate-400 group-hover:text-slate-600"
                          : "invisible"
                      }`}
                    />
                  </div>
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
}
