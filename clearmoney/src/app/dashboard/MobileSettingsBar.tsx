"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Drawer,
  DrawerClose,
  DrawerContentTop,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "../holdings/WizardForm/formWizardStore";
import { NumericFormat } from "react-number-format";
import { IconX } from "@tabler/icons-react";
import { ChevronDown } from "lucide-react";
import FundPickerView from "./FundPickerView";
import MainSettingsView from "./MainSettingsView";
import OptionPickerView, { Option } from "./OptionPickerView";
import { fetch_options } from "../fe-api/options/options";
import { AllocationPie } from "../holdings/types/holdings";
import { funds } from "../holdings/data/SuperFunds";

type View = "main" | "fund" | "option";

const MobileSettingsBar = () => {
  const { state, actions } = useStateMachine({ actions: { updateForm } });
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("main");
  const [mounted, setMounted] = useState(false);
  const [options, setOptions] = React.useState<Array<Option>>([]);
  const [optionsLoadedForFund, setOptionsLoadedForFund] = React.useState<
    string | null
  >(null);
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const [fundDomain, updateFundDomain] = React.useState<any>();

  const currentFund = state.Fund;
  const currentOption = state.option_name;

  const currentAllocation = options.find(
    (o) => o.option_name === currentOption,
  )?.allocation;

  const handleOpenChange = (next: boolean) => {
    if (!next && !currentOption) {
      setView("main");
      setShakeTrigger((c) => c + 1);
      return;
    }
    if (!next) setView("main");
    setOpen(next);
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!state.Fund) {
      setOptions([]);
      setOptionsLoadedForFund(null);
      return;
    }

    let cancelled = false;
    const requestedFund = state.Fund;

    const fund = funds.find((element) => element.name === currentFund);
    updateFundDomain(fund?.domain);

    setOptions([]);
    setOptionsLoadedForFund(null);

    const loadOptions = async () => {
      try {
        const data = await fetch_options(requestedFund);
        const sorted = data.sort((a, b) =>
          a.option_name.localeCompare(b.option_name),
        );
        const allocationMap: Record<string, AllocationPie> = {};
        for (const option of sorted) {
          allocationMap[option.id] = {
            listed: 0,
            unlisted: 0,
            cashAndBonds: 0,
          };
          for (const row of option.allocations ?? []) {
            if (row.category === "Listed")
              allocationMap[option.id].listed = row.percentage;
            if (row.category === "Unlisted")
              allocationMap[option.id].unlisted = row.percentage;
            if (row.category === "Fixed Interest & Cash")
              allocationMap[option.id].cashAndBonds = row.percentage;
          }
        }
        if (cancelled) return;

        setOptions(
          sorted.map((o) => ({ ...o, allocation: allocationMap[o.id] })),
        );
        setOptionsLoadedForFund(requestedFund);
      } catch {
        if (cancelled) return;
        setOptions([]);
        setOptionsLoadedForFund(requestedFund);
      }
    };
    loadOptions();

    return () => {
      cancelled = true;
    };
  }, [state.Fund]);

  if (!mounted) return null;

  return (
    <Drawer
      open={open}
      onOpenChange={handleOpenChange}
      direction="top"
      shouldScaleBackground={false}
    >
      <DrawerTrigger asChild>
        <button className="md:hidden fixed top-20 left-0 right-0 z-40 w-full bg-white border-b border-slate-100 shadow-sm px-4 py-2.5 flex items-center gap-3">
          <img
            className="w-7 h-7 rounded-lg object-contain flex-shrink-0"
            src={`https://cdn.brandfetch.io/${fundDomain}/icon.png`}
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span className="text-sm font-semibold text-slate-800 truncate">
            {currentFund}
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-sm text-slate-500 truncate flex-1">
            {currentOption || "Select option"}
          </span>
          <NumericFormat
            value={state.balance}
            thousandSeparator
            prefix="$"
            displayType="text"
            className="text-sm font-semibold text-slate-800 tabular-nums flex-shrink-0"
          />
          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
        </button>
      </DrawerTrigger>

      <DrawerContentTop className="p-0 gap-0 overflow-hidden rounded-b-2xl bg-slate-100">
        <DrawerTitle className="sr-only">Super fund settings</DrawerTitle>
        <DrawerClose
          className="absolute top-4 right-4 z-50 p-1.5 rounded-lg text-rose-600 bg-rose-100 hover:bg-rose-200 transition-colors"
          aria-label="Close"
        >
          <IconX size={18} />
        </DrawerClose>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {view === "main" && (
              <MainSettingsView
                setView={setView}
                state={state}
                actions={actions}
                currentFund={currentFund}
                currentOption={currentOption}
                shakeTrigger={shakeTrigger}
                fundDomain={fundDomain}
                allocation={currentAllocation}
              />
            )}
            {view === "fund" && (
              <FundPickerView
                setView={setView}
                actions={actions}
                currentFund={currentFund}
              />
            )}
            {view === "option" && (
              <OptionPickerView
                setView={setView}
                currentOption={currentOption}
                currentFund={currentFund}
                options={options}
                optionsLoadedForFund={optionsLoadedForFund}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </DrawerContentTop>
    </Drawer>
  );
};

export default MobileSettingsBar;
