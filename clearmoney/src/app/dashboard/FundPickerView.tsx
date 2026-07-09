import { ChevronLeft } from "lucide-react";
import { funds } from "../holdings/data/SuperFunds";
import { motion } from "framer-motion";

type View = "main" | "fund" | "option";

type FundPickerViewProps = {
  setView: (view: View) => void;
  actions: {
    updateForm: (data: {
      Fund?: string;
      option_id: string;
      option_name: string;
    }) => void;
  };
  currentFund: string;
};

const FundPickerView = ({
  setView,
  actions,
  currentFund,
}: FundPickerViewProps) => {
  const handleClick = (fundName: string) => {
    actions.updateForm({
      Fund: fundName,
      option_id: "",
      option_name: "",
    });
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

      <div className="overflow-y-auto bg-slate-100 flex flex-col gap-3 justify-center items-center py-4 px-4">
        {funds.map((fund) => {
          const isSelected = fund.name === currentFund;
          return (
            <button
              key={fund.name}
              onClick={() => handleClick(fund.name)}
              className={`cursor-pointer bg-white p-4 rounded-2xl border flex items-center gap-4 shadow-sm transition-all w-full ${
                isSelected
                  ? "border-emerald-500 shadow-md"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <img
                  className="w-8 h-8 object-contain flex-shrink-0"
                  src={`https://cdn.brandfetch.io/${fund.domain}/icon.png`}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="text-sm font-medium text-slate-900 truncate">
                  {fund.name}
                </span>
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto text-emerald-600 font-bold text-lg flex-shrink-0"
                >
                  ✓
                </motion.div>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default FundPickerView;
