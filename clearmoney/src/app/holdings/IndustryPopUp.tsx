"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NumericFormat } from "react-number-format";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "./WizardForm/formWizardStore";
import { IconChevronRight } from "@tabler/icons-react";
import { CompanyPopUp } from "./CompanyPopUp";

const SECTOR_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  "Technology & Software": {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-500",
  },
  "Banks & Finance": {
    bg: "bg-violet-100",
    text: "text-violet-700",
    border: "border-violet-500",
  },
  "Healthcare & Biotech": {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-500",
  },
  "Consumer Goods & Retail": {
    bg: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-500",
  },
  "Real Estate & Construction": {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-500",
  },
  "Mining & Minerals": {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-500",
  },
  "Oil, Gas & Energy": {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-500",
  },
  "Industrial & Transport": {
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-500",
  },
  "Media & Entertainment": {
    bg: "bg-pink-100",
    text: "text-pink-700",
    border: "border-pink-500",
  },
  Telecommunications: {
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    border: "border-indigo-500",
  },
  "Casinos & Gaming": {
    bg: "bg-rose-100",
    text: "text-rose-700",
    border: "border-rose-500",
  },
  "Aerospace & Defence": {
    bg: "bg-sky-100",
    text: "text-sky-700",
    border: "border-sky-500",
  },
};

type OptionRow = {
  Option_Name: string;
  Weighting_Percentage_Clean: number;
};

type Holding = {
  Full_Name: string;
  Super_Fund: string;
  Option_Name: string;
  Weighting_Percentage_Clean: number;
  companies: {
    id: string;
    Parsed_Name: string;
    Sector: string;
    Description: string;
    Country: string;
  };
};

type IndustryPopUpProps = {
  trigger: React.ReactNode;
  industry: string;
  animation: React.ReactNode;
  holdings: Holding[];
  balance: number;
};

const TOP_N = 5;

function formatOptionName(name: string) {
  if (!name) return "";
  const parts = name.split(":");
  if (parts.length > 1) {
    return parts[0]
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }
  return name.replace(/_/g, " ");
}

function getOptionDate(name: string) {
  if (!name) return "";
  const parts = name.split(":");
  if (parts.length > 1) {
    const datePart = parts[1].split(".")[0];
    const dateParts = datePart.split("-");
    if (dateParts.length === 3) {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const monthIdx = parseInt(dateParts[1]) - 1;
      return `${monthNames[monthIdx]} 20${dateParts[2]}`;
    }
  }
  return "";
}

export function IndustryPopUp({
  trigger,
  industry,
  animation,
  holdings,
  balance,
}: IndustryPopUpProps) {
  const [open, setOpen] = useState(false);
  const [optionsData, setOptionsData] = useState<OptionRow[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const { actions } = useStateMachine({ actions: { updateForm } });

  const userBalance = Number(balance) || 0;
  const superFund = holdings[0]?.Super_Fund ?? "";
  const currentOption = holdings[0]?.Option_Name ?? "";

  const totalValue = holdings.reduce(
    (sum, h) =>
      sum + (Number(h.Weighting_Percentage_Clean) / 100) * userBalance,
    0,
  );
  const totalWeight = holdings.reduce(
    (sum, h) => sum + Number(h.Weighting_Percentage_Clean),
    0,
  );

  const sorted = [...holdings].sort(
    (a, b) =>
      Number(b.Weighting_Percentage_Clean) -
      Number(a.Weighting_Percentage_Clean),
  );
  const topHoldings = sorted.slice(0, TOP_N);
  const remainingCount = Math.max(0, sorted.length - TOP_N);
  const maxTopWeight =
    Number(topHoldings[0]?.Weighting_Percentage_Clean) || 0.001;

  const sectorStyle = SECTOR_COLORS[industry] ?? {
    bg: "bg-gray-100",
    text: "text-gray-600",
  };

  const smallAnimation = React.cloneElement(
    animation as React.ReactElement<{ initialSize: number }>,
    { initialSize: 10 },
  );

  useEffect(() => {
    if (!open || !superFund) return;
    setLoadingOptions(true);
    fetch(
      `/api/industry-options?fund=${encodeURIComponent(superFund)}&sector=${encodeURIComponent(industry)}`,
    )
      .then((r) => r.json())
      .then((d) => setOptionsData(d.options ?? []))
      .catch(() => setOptionsData([]))
      .finally(() => setLoadingOptions(false));
  }, [open, superFund, industry]);

  const maxOptionWeighting = Math.max(
    ...optionsData
      .filter((o) => o.Weighting_Percentage_Clean > 0)
      .map((o) => o.Weighting_Percentage_Clean),
    0.001,
  );
  const showCrossOptions = loadingOptions || optionsData.length > 1;

  function handleSwitchOption(optionName: string) {
    actions.updateForm({ option: optionName });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-xl gap-0 border-0 p-0 overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
        <div
          className={`px-8 pt-10 pb-10 flex flex-col items-center text-center gap-4 ${sectorStyle.bg} border-b border-white`}
        >
          <div className="absolute top-4 left-6">
            <span
              className={`text-[10px] font-bold uppercase tracking-widest ${sectorStyle.text} opacity-60`}
            >
              Reported {getOptionDate(currentOption)}
            </span>
          </div>
          <div className="w-24 h-24 flex items-center justify-center bg-white rounded-3xl shadow-xl border-4 border-white transition-transform hover:scale-105 duration-300">
            {smallAnimation}
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {industry}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${sectorStyle.bg} ${sectorStyle.text} border-2 ${sectorStyle.border}`}
              >
                {holdings.length}{" "}
                {holdings.length === 1 ? "Company" : "Companies"}
              </span>
            </div>
          </div>
        </div>

        <div className="px-8 pb-10 space-y-8 max-h-[60vh] overflow-y-auto pt-8">
          <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100/50 relative overflow-hidden group">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Your Proportional Exposure
            </p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-slate-900 tabular-nums tracking-tighter">
                <NumericFormat
                  value={totalValue}
                  thousandSeparator
                  prefix="$"
                  decimalScale={2}
                  fixedDecimalScale
                  displayType="text"
                />
              </span>
              <span className="text-lg font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg">
                {totalWeight.toFixed(2)}%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              For illustrative purposes, based on {superFund}&apos;s publicly
              disclosed APRA holdings. Read Our Disclaimer.
            </p>
          </div>

          {topHoldings.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  Biggest Pieces of the Pie
                </h3>
              </div>
              <div className="grid gap-3">
                {topHoldings.map((h, i) => {
                  const value =
                    (Number(h.Weighting_Percentage_Clean) / 100) * userBalance;

                  return (
                    <CompanyPopUp
                      key={i}
                      holding={h}
                      balance={userBalance}
                      trigger={
                        <button className="w-full group text-left rounded-2xl p-4 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all active:scale-[0.98]">
                          <div className="flex items-center gap-3">
                            <img
                              className="w-10 h-10 rounded-xl object-contain bg-slate-50 border border-slate-100 p-1 flex-shrink-0"
                              src={`https://cdn.brandfetch.io/${h.companies?.id}/icon/theme/dark/c=1idfCQLm9sumx6VuVu3`}
                              alt={h.companies?.Parsed_Name}
                              onError={(e) => {
                                e.currentTarget.src = `https://www.google.com/s2/favicons?sz=64&domain=${h.companies?.id}`;
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-slate-900 truncate">
                                {h.companies?.Parsed_Name || h.Full_Name}
                              </p>
                              <p className="text-[10px] font-bold text-orange-500">
                                {h.Weighting_Percentage_Clean.toFixed(2)}% of
                                portfolio
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-lg font-black text-slate-900 tabular-nums">
                                <NumericFormat
                                  value={value}
                                  thousandSeparator
                                  prefix="$"
                                  decimalScale={0}
                                  displayType="text"
                                />
                              </span>
                              <IconChevronRight
                                size={14}
                                className="text-slate-400 group-hover:text-slate-600 transition-colors"
                              />
                            </div>
                          </div>
                        </button>
                      }
                    />
                  );
                })}
              </div>
            </div>
          )}

          {showCrossOptions && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  {industry} across other {superFund} options
                </h3>
                {loadingOptions && (
                  <div className="w-4 h-4 border-2 border-slate-200 border-t-slate-500 rounded-full animate-spin" />
                )}
              </div>

              <div className="grid gap-3">
                {!loadingOptions &&
                  optionsData.map((opt) => {
                    const isCurrent = opt.Option_Name === currentOption;
                    const isZero = opt.Weighting_Percentage_Clean === 0;
                    const optValue =
                      (opt.Weighting_Percentage_Clean / 100) * balance;

                    return (
                      <button
                        key={opt.Option_Name}
                        disabled={isCurrent || isZero}
                        onClick={() => handleSwitchOption(opt.Option_Name)}
                        className={`w-full text-left rounded-[1.25rem] p-4 transition-all duration-200 border-2 ${
                          isCurrent
                            ? "bg-slate-900 border-slate-900 shadow-lg"
                            : isZero
                              ? "bg-slate-50 border-transparent opacity-40 cursor-not-allowed"
                              : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-md cursor-pointer active:scale-95"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? "text-white" : "text-slate-500"}`}
                              >
                                {formatOptionName(opt.Option_Name)}
                              </span>
                              <span
                                className={`text-[10px] font-medium ${isCurrent ? "text-slate-300" : "text-orange-500"}`}
                              >
                                {getOptionDate(opt.Option_Name)}
                              </span>
                              {isCurrent && (
                                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                  Selected
                                </span>
                              )}
                            </div>
                            <span
                              className={`text-lg font-black tabular-nums ${isCurrent ? "text-white" : "text-slate-900"}`}
                            >
                              {isZero ? (
                                "Not held"
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
                          </div>
                          {!isCurrent && !isZero && (
                            <IconChevronRight
                              size={20}
                              className="text-slate-400 group-hover:text-slate-600 transition-colors flex-shrink-0"
                            />
                          )}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          {holdings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm font-bold text-slate-300 uppercase tracking-widest">
                No holdings in this sector
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default IndustryPopUp;
