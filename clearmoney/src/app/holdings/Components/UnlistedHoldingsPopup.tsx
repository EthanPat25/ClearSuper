"use client";

import React, { useState } from "react";
import {
  IconBuildingSkyscraper,
  IconBriefcase,
  IconBuildingBank,
  IconChartPie,
  IconHelpCircle,
} from "@tabler/icons-react";
import { PopUpShell, DEFAULT_SECTOR_STYLE, SectorStyle } from "./PopUpShell";
import { ExposureCard } from "./ExposureCard";
import { Money } from "@/app/AnimationComponents/Money";

type UnlistedHolding = {
  Full_Name: string;
  Asset_Class?: string | null;
  Weighting_Percentage_Clean: number;
  Super_Fund: string;
  Option_Id?: string | null;
  options?: { as_of_date?: string | null };
};

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
    icon: <Money className="w-12 h-12 text-slate-700" />,
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
  const { Full_Name, Asset_Class, Weighting_Percentage_Clean, Super_Fund } =
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
      holding={holding}
    >
      <ExposureCard
        value={scaledValue}
        weight={Weighting_Percentage_Clean ?? 0}
        decimalScale={2}
        superFund={Super_Fund}
        helperText={`Estimated from ${Super_Fund}'s publicly disclosed APRA holdings.`}
      />

      <div
        className={`${info.style.bg} rounded-[2rem] p-6 border border-white shadow-sm`}
      >
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
    </PopUpShell>
  );
}
