import React, { useState, useEffect } from "react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "../holdings/WizardForm/formWizardStore";
import { NumericFormat } from "react-number-format";
import { IconX } from "@tabler/icons-react";
import FundPickerView from "./FundPickerView";
import MainSettingsView from "./MainSettingsView";
import OptionPickerView, { Option } from "./OptionPickerView";
import {
  fetch_option_allocations,
  fetch_options,
} from "../fe-api/options/options";
import { AllocationPie } from "../holdings/types/holdings";
import { funds } from "../holdings/data/SuperFunds";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type View = "main" | "fund" | "option";

const CurrentOptionPopup = () => {
  const { state, actions } = useStateMachine({ actions: { updateForm } });
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("main");
  const [mounted, setMounted] = useState(false);
  const [options, setOptions] = React.useState<Array<Option>>([]);
  const [loading, setLoading] = React.useState(true);
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const [fundDomain, updateFundDomain] = React.useState<any>();

  const currentFund = state.Fund;
  const currentOption = state.option_name;

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
    if (!state.Fund) return;

    const fund = funds.find((element) => element.name === currentFund);
    updateFundDomain(fund?.domain);

    const loadOptions = async () => {
      setLoading(true);
      try {
        const data = await fetch_options(state.Fund);
        const sorted = data.sort((a, b) =>
          a.option_name.localeCompare(b.option_name),
        );

        const ids = sorted.map((o) => o.id);
        const allocationRows = await fetch_option_allocations(ids);

        const allocationMap: Record<string, AllocationPie> = {};
        for (const row of allocationRows) {
          if (!allocationMap[row.Option_Id]) {
            allocationMap[row.Option_Id] = {
              listed: 0,
              unlisted: 0,
              cashAndBonds: 0,
            };
          }
          if (row.category === "Listed")
            allocationMap[row.Option_Id].listed = row.percentage;
          if (row.category === "Unlisted")
            allocationMap[row.Option_Id].unlisted = row.percentage;
          if (row.category === "Fixed Interest & Cash")
            allocationMap[row.Option_Id].cashAndBonds = row.percentage;
        }
        setOptions(
          sorted.map((o) => ({ ...o, allocation: allocationMap[o.id] })),
        );
      } catch {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [state.Fund]);

  // Don't render to server if not mounted: avoid hydration error
  if (!mounted) return null;

  const currentAllocation = options.find((o) => o.option_name === currentOption)?.allocation;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <VisuallyHidden>
        <DialogTitle>Viewing settings</DialogTitle>
      </VisuallyHidden>

      <DialogTrigger asChild>
        <button
          className="hidden md:flex items-center gap-2.5 pl-1.5 pr-4 py-2 rounded-[2rem] bg-white border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 transition-all"
          aria-label="Viewing Settings"
        >
          {" "}
          <span className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-slate-700 flex-shrink-0">
            {mounted && currentFund ? (
              <img
                className="w-full h-full rounded-2xl object-contain flex-shrink-0"
                src={`https://cdn.brandfetch.io/${fundDomain}/icon.png`}
                alt=""
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              ""
            )}
          </span>
          <span className="flex flex-col items-start leading-tight">
            {" "}
            <span className="text-[13px] font-semibold text-slate-800">
              {mounted ? currentFund : "Loading..."}
            </span>
            <span className="text-xs text-slate-500 tabular-nums">
              {mounted && (
                <>
                  {currentOption || "Select option"} ·{" "}
                  <NumericFormat
                    value={state.balance}
                    thousandSeparator
                    prefix="$"
                    displayType="text"
                  />
                </>
              )}
            </span>
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden rounded-2xl bg-slate-100">
        <DialogClose
          className="absolute top-5 right-5 z-50 p-1.5 rounded-lg text-rose-600 bg-rose-100 hover:bg-rose-200 transition-colors"
          aria-label="Close"
        >
          <IconX size={18} />
        </DialogClose>
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
            actions={actions}
            currentOption={currentOption}
            currentFund={currentFund}
            options={options}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CurrentOptionPopup;
