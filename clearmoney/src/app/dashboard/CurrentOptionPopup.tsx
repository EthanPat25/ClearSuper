import { useState, useEffect } from "react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "../holdings/WizardForm/formWizardStore";
import { NumericFormat } from "react-number-format";
import { IconX } from "@tabler/icons-react";
import FundPickerView from "./FundPickerView";
import MainSettingsView from "./MainSettingsView";
import OptionPickerView from "./OptionPickerView";

type View = "main" | "fund" | "option";

const options = [
  {
    id: "high-growth",
    name: "High Growth",
  },
  {
    id: "balanced",
    name: "Balanced",
  },
  {
    id: "conservative",
    name: "Conservative",
  },
];

const CurrentOptionPopup = () => {
  const { state, actions } = useStateMachine({ actions: { updateForm } });
  const [view, setView] = useState<View>("main");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open) setView("main");
  };

  const currentFund = state.Fund;
  const currentOption = state.option_name;

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 hover:border-emerald-700 hover:bg-slate-50 transition-all"
          aria-label="Viewing Settings"
        >
          <span className="text-xs font-semibold text-slate-500">
            {mounted ? (
              <>
                {currentFund}: {currentOption}
              </>
            ) : (
              "Loading..."
            )}
          </span>
          <span className="text-xs font-semibold text-slate-800 tabular-nums">
            {mounted && (
              <NumericFormat
                value={state.balance}
                thousandSeparator
                prefix="$"
                displayType="text"
              />
            )}
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden rounded-2xl">
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
