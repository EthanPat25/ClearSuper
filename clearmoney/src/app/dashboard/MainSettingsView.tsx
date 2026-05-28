import { DialogClose } from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { NumericFormat } from "react-number-format";

type View = "main" | "fund" | "option";

type MainSettingsViewProps = {
  setView: (view: View) => void;
  state: { balance: number };
  actions: { updateForm: (data: { balance?: number }) => void };
  currentFund: string;
  currentOption: string;
};

const MainSettingsView = ({
  setView,
  state,
  actions,
  currentFund,
  currentOption,
}: MainSettingsViewProps) => {
  return (
    <>
      <div className="px-6 pt-6 pb-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">
          Viewing Settings
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
                src={`https://cdn.brandfetch.io/${currentFund}.com.au/icon.png`}
                alt={`${currentFund} logo`}
              />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Fund</p>
              <p className="text-sm font-bold text-slate-900">{currentFund}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        <button
          className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100 text-left"
          onClick={() => setView("option")}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
              <span className="text-xs font-semibold text-slate-700">HG</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">
                Investment option
              </p>
              <p className="text-sm font-semibold text-slate-900">
                {currentOption}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

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
              className="w-full pl-7 pr-3 py-2.5 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:outline-none tabular-nums"
              placeholder="100,000"
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
        <DialogClose asChild>
          <button className="w-full px-4 py-2.5 text-sm font-semibold bg-black text-white rounded-2xl hover:bg-slate-800 transition-colors">
            Done
          </button>
        </DialogClose>
      </div>
    </>
  );
};

export default MainSettingsView;
