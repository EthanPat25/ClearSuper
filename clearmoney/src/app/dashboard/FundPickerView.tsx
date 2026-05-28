import { ChevronLeft } from "lucide-react";
import { funds } from "../holdings/data/SuperFunds";

type View = "main" | "fund" | "option";

type FundPickerViewProps = {
  setView: (view: View) => void;
  actions: {
    updateForm: (data: { Fund?: string }) => void;
  };
  currentFund: string;
};

const FundPickerView = ({
  setView,
  actions,
  currentFund,
}: FundPickerViewProps) => {
  const handleClick = (fundName: string) => {
    actions.updateForm({ Fund: fundName });
    setView("main");
  };

  return (
    <>
      <div className="px-4 pt-4 pb-3 border-b border-slate-100 flex items-center gap-2">
        <button
          onClick={() => setView("main")}
          className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Back"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h2 className="text-lg font-semibold text-slate-900">Choose fund</h2>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {funds.map((fund) => {
          const isSelected = fund.name === currentFund;
          return (
            <button
              key={fund.name}
              onClick={() => handleClick(fund.name)}
              className="w-full flex items-center gap-3 px-6 py-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-100 last:border-b-0"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                <img
                  className="w-6 h-6 object-contain"
                  src={`https://cdn.brandfetch.io/${fund.domain}/icon.png`}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <span className="text-sm font-medium text-slate-900 flex-1">
                {fund.name}
              </span>
              {isSelected && (
                <div className="w-2 h-2 rounded-full bg-emerald-600" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default FundPickerView;
