import { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { DialogClose } from "@/components/ui/dialog";
import { ChevronRight, AlertCircle } from "lucide-react";
import { NumericFormat } from "react-number-format";
import AllocationPieComponent from "../holdings/Components/AllocationPie";
import { AllocationPie } from "../holdings/types/holdings";
import React from "react";

type View = "main" | "fund" | "option";

type MainSettingsViewProps = {
  setView: (view: View) => void;
  state: { balance: number };
  actions: { updateForm: (data: { balance?: number }) => void };
  currentFund: string;
  currentOption: string;
  shakeTrigger: number;
  fundDomain: any;
  allocation?: AllocationPie;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const MainSettingsView = ({
  setView,
  state,
  actions,
  currentFund,
  currentOption,
  shakeTrigger,
  fundDomain,
  allocation
}: MainSettingsViewProps) => {
  const hasOption = !!currentOption;
  const controls = useAnimation();
  const isFirstRender = useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Only shake if this was actually a blocked close attempt
    // AND there's still genuinely no option selected.
    if (shakeTrigger > 0 && !hasOption) {
      controls.start({
        x: [0, -6, 6, -6, 6, 0],
        transition: { duration: 0.4 },
      });
    }
  }, [shakeTrigger, hasOption, controls]);

  return (
    <>
      <div className="px-6 pt-6 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">
          Viewing settings
        </h2>
      </div>

      <div className="flex flex-col">
        <button
          className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100 text-left"
          onClick={() => setView("fund")}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
              <img
                className="w-10 h-10 object-contain"
                src={`https://cdn.brandfetch.io/${fundDomain}/icon.png`}
                alt={`${currentFund} logo`}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Fund</p>
              <p className="text-sm font-bold text-slate-900">{currentFund}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <motion.button
          animate={controls}
          className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100 text-left w-full"
          onClick={() => setView("option")}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                hasOption ? "bg-slate-100" : "bg-amber-100"
              }`}
            >
              {hasOption ? (
                allocation ? (
                  <AllocationPieComponent allocation={allocation} />
                ) : (
                  <span className="text-xs font-semibold text-slate-700">
                    {getInitials(currentOption)}
                  </span>
                )
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600" />
              )}
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">
                Investment option
              </p>
              <p
                className={`text-sm font-semibold ${
                  hasOption ? "text-slate-900" : "text-amber-600"
                }`}
              >
                {hasOption ? currentOption : "None selected"}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </motion.button>

        <div className="px-6 py-4">
          <label
            htmlFor="balance-input"
            className="text-xs text-slate-500 font-medium block mb-2"
          >
            Your balance
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
              $
            </span>
         <NumericFormat
  id="balance-input"
  value={state.balance}
  onValueChange={(values) =>
    actions.updateForm({ balance: values.floatValue ?? 0 })
  }
  thousandSeparator
  inputMode="decimal"
  enterKeyHint="done"
  onKeyDown={(e) => {
    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
  }}
  className="w-full pl-7 pr-3 py-2.5 text-base sm:text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none tabular-nums"
  placeholder="100,000"
/>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
        {hasOption ? (
          <DialogClose asChild>
            <button className="w-full px-4 py-2.5 text-sm font-semibold bg-black text-white rounded-2xl hover:bg-slate-800 transition-colors">
              Done
            </button>
          </DialogClose>
        ) : (
          <button
            onClick={() => setView("option")}
            className="w-full px-4 py-2.5 text-sm font-semibold bg-amber-500 text-white rounded-2xl hover:bg-amber-600 transition-colors"
          >
            Select an option to continue
          </button>
        )}
      </div>
    </>
  );
};

export default MainSettingsView;
