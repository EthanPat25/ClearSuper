"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NumericFormat } from "react-number-format";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "./WizardForm/formWizardStore";
import { IconChevronRight, IconX } from "@tabler/icons-react";

const SECTOR_COLORS: Record<string, { bg: string; text: string }> = {
  "Technology & Software": { bg: "bg-blue-100", text: "text-blue-700" },
  "Banks & Finance": { bg: "bg-violet-100", text: "text-violet-700" },
  "Healthcare & Biotech": { bg: "bg-emerald-100", text: "text-emerald-700" },
  "Consumer Goods & Retail": { bg: "bg-orange-100", text: "text-orange-700" },
  "Real Estate & Construction": {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },
  "Mining & Minerals": { bg: "bg-amber-100", text: "text-amber-700" },
  "Oil, Gas & Energy": { bg: "bg-red-100", text: "text-red-700" },
  "Industrial & Transport": { bg: "bg-slate-100", text: "text-slate-600" },
  "Media & Entertainment": { bg: "bg-pink-100", text: "text-pink-700" },
  Telecommunications: { bg: "bg-indigo-100", text: "text-indigo-700" },
  "Casinos & Gaming": { bg: "bg-rose-100", text: "text-rose-700" },
  "Aerospace & Defence": { bg: "bg-sky-100", text: "text-sky-700" },
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

type CompanyPopUpProps = {
  trigger: React.ReactNode;
  holding: Holding;
  balance: number;
};

function formatOptionName(name: string) {
  if (!name) return "";
  // Handles formats like "HIGH_GROWTH:31-12-25.NORMALISED"
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
    const datePart = parts[1].split(".")[0]; // "31-12-25"
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
      return `as of ${monthNames[monthIdx]} 20${dateParts[2]}`;
    }
  }
  return "";
}

export function CompanyPopUp({ trigger, holding, balance }: CompanyPopUpProps) {
  const [open, setOpen] = useState(false);
  const [optionsData, setOptionsData] = useState<OptionRow[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const { actions } = useStateMachine({ actions: { updateForm } });

  const { companies, Weighting_Percentage_Clean, Super_Fund, Option_Name } =
    holding;
  const scaledValue = (Weighting_Percentage_Clean / 100) * balance;
  const sectorStyle = SECTOR_COLORS[companies?.Sector] ?? {
    bg: "bg-gray-100",
    text: "text-gray-600",
  };

  const companyName = companies?.Parsed_Name ?? holding.Full_Name;

  useEffect(() => {
    if (!open || !companies?.id) return;
    setLoadingOptions(true);
    fetch(
      `/api/company-options?fund=${encodeURIComponent(Super_Fund)}&companyId=${encodeURIComponent(companies.id)}`,
    )
      .then((r) => r.json())
      .then((d) => setOptionsData(d.options ?? []))
      .catch(() => setOptionsData([]))
      .finally(() => setLoadingOptions(false));
  }, [open, Super_Fund, companies?.id]);

  const maxWeighting = Math.max(
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

      <DialogContent className="w-full max-w-sm sm:max-w-lg md:max-w-xl gap-0 border-0 p-0 overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
        <DialogClose className="absolute top-5 right-5 z-50 p-2 rounded-full bg-white/60 hover:bg-white transition-colors">
          <IconX size={20} className="text-red-600" />
        </DialogClose>
        <div
          className={`px-8 pt-10 pb-10 flex flex-col items-center text-center gap-4 ${sectorStyle.bg} border-b border-white`}
        >
          <div className="relative">
            <img
              className="w-24 h-24 rounded-3xl object-contain bg-white shadow-xl border-4 border-white flex-shrink-0 transition-transform hover:scale-105 duration-300"
              src={`https://cdn.brandfetch.io/${companies?.id}/icon/theme/dark/c=1idfCQLm9sumx6VuVu3`}
              alt={companyName}
              onError={(e) => {
                e.currentTarget.src = `https://www.google.com/s2/favicons?sz=128&domain=${companies?.id}`;
              }}
            />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {companyName}
            </h2>
            <p
              className={`text-xs font-bold uppercase tracking-[0.2em] ${sectorStyle.text}`}
            >
              {companies?.Sector || "Investment"}
            </p>
          </div>
        </div>

        <div className="px-8 pb-10 space-y-8 max-h-[60vh] overflow-y-auto pt-8">
          <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100/50 relative overflow-hidden group">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Your Proportional Exposure
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900 tabular-nums tracking-tighter">
                <NumericFormat
                  value={scaledValue}
                  thousandSeparator
                  prefix="$"
                  decimalScale={2}
                  fixedDecimalScale
                  displayType="text"
                />
              </span>
              <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                {Weighting_Percentage_Clean != null
                  ? `${Weighting_Percentage_Clean.toFixed(2)}%`
                  : "—"}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              For illustrative purposes, based on {Super_Fund}&apos;s publicly
              disclosed APRA holdings. Members do not directly own these shares.
            </p>
          </div>

          {/* What they do card */}
          {companies?.Description && (
            <div
              className={`${sectorStyle.bg} rounded-[2rem] p-6 border border-white shadow-sm relative overflow-hidden`}
            >
              <p
                className={`text-xs font-bold ${sectorStyle.text} uppercase tracking-widest mb-3 opacity-70`}
              >
                What they do
              </p>
              <p className="text-[15px] text-slate-800 leading-relaxed font-semibold relative z-10">
                {companies.Description}
              </p>
            </div>
          )}

          {/* Cross-option comparison */}
          {showCrossOptions && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  {companyName} across other {Super_Fund} options
                </h3>
                {loadingOptions && (
                  <div className="w-4 h-4 border-2 border-slate-200 border-t-slate-500 rounded-full animate-spin" />
                )}
              </div>

              <div className="grid gap-3">
                {!loadingOptions &&
                  optionsData.map((opt) => {
                    const isCurrent = opt.Option_Name === Option_Name;
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
                            ? "bg-slate-900 border-slate-900 shadow-lg scale-[1.02]"
                            : isZero
                              ? "bg-slate-50 border-transparent opacity-40 cursor-not-allowed"
                              : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-md cursor-pointer active:scale-95"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex flex-col">
                            <span
                              className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? "text-slate-400" : "text-slate-500"}`}
                            >
                              {formatOptionName(opt.Option_Name)}
                            </span>
                            <span
                              className={`text-[10px] font-medium ${isCurrent ? "text-slate-500" : "text-slate-400"}`}
                            >
                              {getOptionDate(opt.Option_Name)}
                            </span>
                          </div>
                          {isCurrent && (
                            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                              Selected
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
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
                          {!isCurrent && !isZero && (
                            <div className="bg-slate-50 p-1.5 rounded-full group-hover:bg-white transition-colors">
                              <IconChevronRight
                                size={16}
                                className="text-slate-400"
                              />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
              </div>
              <p className="text-[10px] text-slate-400 text-center font-medium">
                Comparing holdings across different investment options.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CompanyPopUp;
