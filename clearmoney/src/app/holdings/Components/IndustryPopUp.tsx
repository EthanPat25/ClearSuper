// IndustryPopUp.tsx
"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "../WizardForm/formWizardStore";
import { IconChevronRight } from "@tabler/icons-react";
import { NumericFormat } from "react-number-format";
import { fetch_industry_weightings } from "../../fe-api/industry_weightings/industry_weightings";
import { fetch_option_allocations } from "@/app/fe-api/options/options";
import { PopUpShell, SECTOR_COLORS, DEFAULT_SECTOR_STYLE } from "./PopUpShell";

import { ExposureCard } from "./ExposureCard";

import { CrossOptionsList } from "./CrossOptionsList";

import { CrossOption, AllocationPie } from "../types/holdings";
import { PublicCompanyHolding } from "../types/holdings";
import Loading from "./Loading";
import CompanyDetailsContent from "./CompanyDetailsContent";
import { IconArrowLeft } from "@tabler/icons-react";

type IndustryPopUpProps = {
  trigger: React.ReactNode;
  industry: string;
  animation: React.ReactNode;
  holdings: Array<PublicCompanyHolding>;
  balance: number;
  fund?: string;
  optionId?: string;
  asOfDate?: string;
};

const TOP_N = 5;

export function IndustryPopUp({
  trigger,
  industry,
  animation,
  holdings,
  balance,
  fund = "",
  optionId = "",
  asOfDate,
}: IndustryPopUpProps) {
  const [open, setOpen] = useState(false);
  const [optionsData, setOptionsData] = useState<CrossOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [switchingOption, setSwitchingOption] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<PublicCompanyHolding | null>(null);
  const [minimumLoadingElapsed, setMinimumLoadingElapsed] = useState(true);
  const loadingTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const { actions, state } = useStateMachine({ actions: { updateForm } });

  const userBalance = Number(balance) || 0;
  const superFund = holdings[0]?.Super_Fund ?? fund;
  const currentOptionId = holdings[0]?.Option_Id ?? optionId;

  const isSwitching =
    switchingOption &&
    (!minimumLoadingElapsed || currentOptionId !== state.option_id);

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
  const activeCompany = selectedCompany
    ? holdings.find((holding) => holding.companies?.id === selectedCompany.companies?.id) ?? selectedCompany
    : null;

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
        const mapped = (data.options ?? []).map((o: { id: string; option_name: string; Weighting_Percentage_Clean: number }) => ({
          id: o.id,
          optionName: o.option_name,
          weightPercent: o.Weighting_Percentage_Clean,
        }));

        const allocationRows = await fetch_option_allocations(
          mapped.map((o) => o.id),
        );
        const allocationMap: Record<string, AllocationPie> =
          allocationRows.reduce((acc, row) => {
            if (!acc[row.Option_Id])
              acc[row.Option_Id] = { listed: 0, unlisted: 0, cashAndBonds: 0 };
            if (row.category === "Listed")
              acc[row.Option_Id].listed = row.percentage;
            if (row.category === "Unlisted")
              acc[row.Option_Id].unlisted = row.percentage;
            if (row.category === "Fixed Interest & Cash")
              acc[row.Option_Id].cashAndBonds = row.percentage;
            return acc;
          }, {});

        setOptionsData(
          mapped.map((o) => ({ ...o, allocation: allocationMap[o.id] })),
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
    if (loadingTimer.current) clearTimeout(loadingTimer.current);
    setSwitchingOption(true);
    setMinimumLoadingElapsed(false);
    loadingTimer.current = setTimeout(() => {
      setMinimumLoadingElapsed(true);
    }, 2600);
    actions.updateForm({
      option_id: optionId,
      option_name: selected?.optionName ?? "",
    });
  }

  return (
    <PopUpShell
      trigger={trigger}
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setSelectedCompany(null);
      }}
      sectorStyle={activeCompany ? SECTOR_COLORS[activeCompany.companies?.Sector] ?? DEFAULT_SECTOR_STYLE : sectorStyle}
      backButton={activeCompany ? (
        <button
          type="button"
          onClick={() => setSelectedCompany(null)}
          aria-label="Back to industry"
          className="absolute left-5 top-5 z-50 rounded-full bg-white/70 p-2 text-slate-700 transition-colors hover:bg-white"
        >
          <IconArrowLeft className="h-5 w-5" />
        </button>
      ) : undefined}
      icon={activeCompany ? (
        <img
          className="h-full w-full rounded-3xl object-contain p-3"
          src={`https://cdn.brandfetch.io/${activeCompany.companies?.id}/icon/theme/dark/c=1idfCQLm9sumx6VuVu3`}
          alt=""
        />
      ) : smallAnimation}
      title={activeCompany?.companies?.Parsed_Name ?? activeCompany?.Full_Name ?? industry}
      asOfDate={activeCompany?.options?.as_of_date ?? holdings[0]?.options?.as_of_date ?? asOfDate}
      meta={
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${sectorStyle.bg} ${sectorStyle.text} border-2 ${sectorStyle.border}`}
        >
          {activeCompany ? "Company" : `${holdings.length} ${holdings.length === 1 ? "Company" : "Companies"}`}
        </span>
      }
    >
      {activeCompany ? (
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <CompanyDetailsContent holding={activeCompany} balance={userBalance} />
        </motion.div>
      ) : <AnimatePresence mode="wait" initial={false}>
        {isSwitching ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex min-h-48 items-center justify-center"
          >
            <Loading classname="flex h-[5rem] w-[5rem] justify-center items-center rounded-full bg-emerald-300" />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-8"
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
                    <button
                      key={h.companies?.id || h.Full_Name || i}
                      type="button"
                      onClick={() => setSelectedCompany(h)}
                      className="w-full group text-left rounded-2xl p-4 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all active:scale-[0.98]"
                    >
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
            allowZeroSelection
          />
          </motion.div>
        )}
      </AnimatePresence>}
    </PopUpShell>
  );
}

export default IndustryPopUp;
