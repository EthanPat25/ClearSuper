"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  IconBuildingSkyscraper,
  IconBriefcase,
  IconBuildingBank,
  IconChartPie,
} from "@tabler/icons-react";
import { PopUpShell, SectorStyle } from "./PopUpShell";
import { ExposureCard } from "./ExposureCard";
import { Money } from "@/app/AnimationComponents/Money";
import { Bond } from "@/app/AnimationComponents/Bond";
import { fetch_options } from "@/app/fe-api/options/options";
import { fetch_MySuper } from "@/app/fe-api/MySuper/MySuper";
import { funds } from "../data/SuperFunds";
import Loading from "./Loading";
import { AnimatePresence, motion } from "framer-motion";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "../WizardForm/formWizardStore";
import { CrossOptionsList } from "./CrossOptionsList";
import { CrossOption, AllocationPie } from "../types/holdings";

type UnlistedHolding = {
  Full_Name: string;
  Asset_Class?: string | null;
  Weighting_Percentage_Clean: number;
  Super_Fund: string;
  Option_Id?: string | null;
  options?: { as_of_date?: string | null };
};

function CategoryDetails({
  fund,
  optionId,
  category,
  balance,
  sectorStyle,
  title,
  children,
}: {
  fund: string;
  optionId?: string | null;
  category: string;
  balance: number;
  sectorStyle: SectorStyle;
  title: string;
  children: React.ReactNode;
}) {
  const { actions, state } = useStateMachine({ actions: { updateForm } });
  const [optionsData, setOptionsData] = useState<CrossOption[]>([]);
  const [defaultOptionId, setDefaultOptionId] = useState<string | null>(null);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [switchingOption, setSwitchingOption] = useState(false);
  const [minimumLoadingElapsed, setMinimumLoadingElapsed] = useState(true);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentOptionId = optionId ?? "";
  const hasSingleDefault = funds.some(
    (item) => item.name === fund && !item.mysuper_is_lifecycle,
  );
  const isSwitching = switchingOption && (!minimumLoadingElapsed || currentOptionId !== state.option_id);

  useEffect(() => {
    if (!fund || !optionId) return;
    let cancelled = false;
    const load = async () => {
      setLoadingOptions(true);
      try {
        const [options, defaultData] = await Promise.all([
          fetch_options(fund),
          hasSingleDefault
            ? fetch_MySuper(fund).catch(() => null)
            : Promise.resolve(null),
        ]);
        if (cancelled) return;
        setDefaultOptionId(defaultData?.option?.id ?? null);
        const results = await Promise.all(
          (options ?? []).map(async (option: { id: string; option_name: string }) => {
            const response = await fetch(
              `/api/holdings?fund=${encodeURIComponent(fund)}&option=${encodeURIComponent(option.id)}`,
            );
            if (!response.ok) return null;
            const data = await response.json();
            const source = category === "CASH"
              ? data.cash ?? []
              : category === "FIXED INCOME"
                ? data.bonds ?? []
                : data.private_investments ?? [];
            const percentage = source.reduce(
              (sum: number, row: { Asset_Class?: string; Weighting_Percentage_Clean?: number }) =>
                category === "CASH" || category === "FIXED INCOME" ||
                row.Asset_Class?.toUpperCase().includes(category)
                  ? sum + Number(row.Weighting_Percentage_Clean ?? 0)
                  : sum,
              0,
            );
            return { id: option.id, optionName: option.option_name, weightPercent: percentage };
          }),
        );
        const allocationMap: Record<string, AllocationPie> = {};
        for (const option of options ?? []) {
          allocationMap[option.id] = { listed: 0, unlisted: 0, cashAndBonds: 0 };
          for (const row of option.allocations ?? []) {
            if (row.category === "Listed") allocationMap[option.id].listed = row.percentage;
            if (row.category === "Unlisted") allocationMap[option.id].unlisted = row.percentage;
            if (row.category === "Fixed Interest & Cash") allocationMap[option.id].cashAndBonds = row.percentage;
          }
        }
        if (cancelled) return;
        if (!cancelled) {
          const sorted = results
            .filter(Boolean)
            .sort((a, b) => (b?.weightPercent ?? 0) - (a?.weightPercent ?? 0));
          setOptionsData(
            sorted.map((row) => ({ ...row!, allocation: allocationMap[row!.id] })) as CrossOption[],
          );
        }
      } catch {
        if (!cancelled) setOptionsData([]);
      } finally {
        if (!cancelled) setLoadingOptions(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [fund, optionId, category, hasSingleDefault]);

  function switchOption(id: string, name: string) {
    if (loadingTimer.current) clearTimeout(loadingTimer.current);
    setSwitchingOption(true);
    setMinimumLoadingElapsed(false);
    loadingTimer.current = setTimeout(() => setMinimumLoadingElapsed(true), 2600);
    actions.updateForm({ option_id: id, option_name: name });
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isSwitching ? (
        <motion.div key="loading" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex min-h-48 items-center justify-center">
          <Loading classname="flex h-[5rem] w-[5rem] items-center justify-center rounded-full bg-emerald-300" />
        </motion.div>
      ) : (
        <motion.div key="content" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-8">
          {children}
          <CrossOptionsList title={title} loading={loadingOptions} options={optionsData} currentOptionId={currentOptionId} defaultOptionId={defaultOptionId} balance={balance} sectorStyle={sectorStyle} onSwitchOption={switchOption} allowZeroSelection />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type UnlistedHoldingPopUpProps = {
  trigger: React.ReactNode;
  holding: UnlistedHolding;
  balance: number;
  displayValue?: number;
  icon?: React.ReactNode;
};

type HoldingInfo = {
  title: string;
  label: string;
  description: string;
  examples: string[];
  style: SectorStyle;
  icon: React.ReactNode;
};
const HOLDING_INFO: Record<string, HoldingInfo> = {
  "UNLISTED EQUITY": {
    title: "Equity",
    label: "Unlisted Equity",
    description:
      "Privately held companies you can't buy on the sharemarket. This can include startups, private businesses, and private equity funds.",
    examples: [
      "Private companies",
      "Startups",
      "Buyouts",
      "Private equity funds",
    ],
    style: {
      bg: "bg-violet-100",
      text: "text-violet-700",
      border: "border-violet-500",
    },
    icon: <IconBriefcase className="w-12 h-12 text-violet-700" />,
  },
  "UNLISTED INFRASTRUCTURE": {
    title: "Infrastructure",
    label: "Unlisted infrastructure",
    description:
      "Private infrastructure like airports, toll roads, energy networks and ports. Not bought and sold on the sharemarket.",
    examples: [
      "Airports",
      "Ports",
      "Toll roads",
      "Energy networks",
      "Data centres",
    ],
    style: { bg: "bg-sky-100", text: "text-sky-700", border: "border-sky-500" },
    icon: <IconBuildingSkyscraper className="w-12 h-12 text-sky-700" />,
  },
  "UNLISTED PROPERTY": {
    title: "Property",
    label: "unlisted property",
    description:
      "Private real estate like offices, warehouses and shopping centres. Not bought and sold on the sharemarket.",
    examples: [
      "Office buildings",
      "Warehouses",
      "Shopping centres",
      "Industrial property",
    ],
    style: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      border: "border-amber-500",
    },
    icon: <IconBuildingBank className="w-12 h-12 text-amber-700" />,
  },
  ALTERNATIVES: {
    title: "Alternatives",
    label: "Alternative investment",
    description:
      "Investments that don't fit the usual groups of shares, bonds, property or cash. This can include hedge funds, private credit, and commodities like gold.",
    examples: ["Hedge funds", "Private credit", "Commodities"],
    style: {
      bg: "bg-slate-100",
      text: "text-slate-700",
      border: "border-slate-500",
    },
    icon: <IconChartPie className="w-12 h-12 text-slate-700" />,
  },

  CASH: {
    title: "Cash",
    label: "Cash",
    description:
      "Cash and short-term deposits held by the fund. Think bank accounts.",
    examples: [],
    style: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      border: "border-emerald-500",
    },
    icon: <Money responsiveSizing="w-[5rem] h-[5rem]" />,
  },

  "FIXED INCOME": {
    title: "Fixed Interest",
    label: "Fixed Interest",
    description:
      "Money lent to governments or companies, usually in return for a set rate of interest over time. Returns are generally more predictable than shares, but typically lower over the long term.",
    examples: ["Government bonds", "Corporate bonds", "Term deposits"],
    style: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-500",
    },
    icon: <Bond responsiveSizing="w-[5rem] h-[5rem]" />,
  },
};

function getHoldingInfo(assetClass?: string | null): HoldingInfo | null {
  const ac = assetClass?.toUpperCase() ?? "";
  const key = Object.keys(HOLDING_INFO).find((k) =>
    ac.includes(k.replace("UNLISTED ", "")),
  );
  return key ? HOLDING_INFO[key] : null;
}

export function UnlistedHoldingPopUp({
  trigger,
  holding,
  balance,
  displayValue,
  icon,
}: UnlistedHoldingPopUpProps) {
  const [open, setOpen] = useState(false);
  const { Asset_Class, Weighting_Percentage_Clean, Super_Fund } =
    holding;
  const info = getHoldingInfo(Asset_Class);
  if (!info) return <>{trigger}</>;

  // Prefer the category total passed from the parent; fall back to the
  // single holding's weight if nothing is passed in.
  const scaledValue =
    displayValue ?? ((Weighting_Percentage_Clean ?? 0) / 100) * balance;

  return (
    <PopUpShell
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      sectorStyle={info.style}
      icon={icon ?? info.icon}
      title={info.title}
      meta={
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${info.style.bg} ${info.style.text} border-2 ${info.style.border}`}
        >
          {info.label}
        </span>
      }
      asOfDate={holding.options?.as_of_date ?? undefined}
    >
      <CategoryDetails
        fund={Super_Fund}
        optionId={holding.Option_Id}
        category={Asset_Class?.toUpperCase().includes("CASH") ? "CASH" : Asset_Class?.toUpperCase().includes("FIXED INCOME") ? "FIXED INCOME" : Asset_Class?.toUpperCase().replace("UNLISTED ", "") ?? ""}
        balance={balance}
        sectorStyle={info.style}
        title={`${info.title} across other ${Super_Fund} options`}
      >
        <ExposureCard
          value={scaledValue}
          weight={Weighting_Percentage_Clean ?? 0}
          decimalScale={2}
          superFund={Super_Fund}
          helperText={`Estimated from ${Super_Fund}'s publicly disclosed APRA holdings.`}
        />

        <div className={`${info.style.bg} rounded-[2rem] p-6 border border-white shadow-sm`}>
        <p
          className={`text-sm font-bold ${info.style.text} tracking-widest mb-3 opacity-70`}
        >
          What his can include
        </p>
        <p className="text-[15px] text-slate-800 leading-relaxed font-semibold">
          {info.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-5">
          {info.examples.map((example) => (
            <span
              key={example}
              className={`px-3 py-1 rounded-full bg-white/70 text-[11px] font-bold ${info.style.text} border border-white`}
            >
              {example}
            </span>
          ))}
        </div>
        </div>
      </CategoryDetails>
    </PopUpShell>
  );
}
