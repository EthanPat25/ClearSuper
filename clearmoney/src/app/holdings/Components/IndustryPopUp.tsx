// IndustryPopUp.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "../WizardForm/formWizardStore";
import { IconChevronRight } from "@tabler/icons-react";
import { NumericFormat } from "react-number-format";
import { CompanyPopUp } from "./CompanyPopUp";
import { fetch_industry_weightings } from "../../fe-api/industry_weightings/industry_weightings";
import { PopUpShell, SECTOR_COLORS, DEFAULT_SECTOR_STYLE } from "./PopUpShell";

import { ExposureCard } from "./ExposureCard";

import { CrossOptionsList } from "./CrossOptionsList";

import { CrossOption } from "../types/holdings";
import { PublicCompanyHolding } from "../types/holdings";

type IndustryPopUpProps = {
  trigger: React.ReactNode;
  industry: string;
  animation: React.ReactNode;
  holdings: Array<PublicCompanyHolding>;
  balance: number;
};

const TOP_N = 5;

export function IndustryPopUp({
  trigger,
  industry,
  animation,
  holdings,
  balance,
}: IndustryPopUpProps) {
  const [open, setOpen] = useState(false);
  const [optionsData, setOptionsData] = useState<CrossOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const { actions } = useStateMachine({ actions: { updateForm } });

  const userBalance = Number(balance) || 0;
  const superFund = holdings[0]?.Super_Fund ?? "";
  const currentOptionId = holdings[0]?.Option_Id ?? "";

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

  const sectorStyle = SECTOR_COLORS[industry] ?? DEFAULT_SECTOR_STYLE;

  const smallAnimation = React.cloneElement(
    animation as React.ReactElement<{ initialSize: number }>,
    { initialSize: 10 },
  );

  useEffect(() => {
    if (!open || !superFund) return;

    const load = async () => {
      setLoadingOptions(true);
      try {
        const data = await fetch_industry_weightings(superFund, industry);
        setOptionsData(
          (data.options ?? []).map((o: any) => ({
            id: o.id,
            optionName: o.option_name,
            weightPercent: o.Weighting_Percentage_Clean,
          })),
        );
      } catch {
        setOptionsData([]);
      } finally {
        setLoadingOptions(false);
      }
    };

    load();
  }, [open, superFund, industry]);

  function handleSwitchOption(optionId: string) {
    const selected = optionsData.find((o) => o.id === optionId);
    actions.updateForm({
      option_id: optionId,
      option_name: selected?.optionName ?? "",
    });
    setOpen(false);
  }

  return (
    <PopUpShell
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      sectorStyle={sectorStyle}
      icon={smallAnimation}
      title={industry}
      asOfDate={holdings[0]?.options?.as_of_date}
      meta={
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${sectorStyle.bg} ${sectorStyle.text} border-2 ${sectorStyle.border}`}
        >
          {holdings.length} {holdings.length === 1 ? "Company" : "Companies"}
        </span>
      }
    >
      <ExposureCard
        value={totalValue}
        weight={totalWeight}
        superFund={superFund}
      />

      {topHoldings.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Biggest pieces of the pie
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
                          <span className="text-base sm:text-lg font-black text-slate-900 tabular-nums">
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

      <CrossOptionsList
        title={`${industry} across other ${superFund} options`}
        loading={loadingOptions}
        options={optionsData}
        currentOptionId={currentOptionId}
        balance={userBalance}
        sectorStyle={sectorStyle}
        onSwitchOption={handleSwitchOption}
      />

      {holdings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm font-bold text-slate-300 uppercase tracking-widest">
            No holdings in this sector
          </p>
        </div>
      )}
    </PopUpShell>
  );
}

export default IndustryPopUp;
