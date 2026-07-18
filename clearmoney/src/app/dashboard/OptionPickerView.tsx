import { ChevronLeft, Check, Search } from "lucide-react";
import { useState } from "react";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "../holdings/WizardForm/formWizardStore";
import { motion } from "framer-motion";
import AllocationPieComponent from "../holdings/Components/AllocationPie";
import { AllocationPie } from "../holdings/types/holdings";

type View = "main" | "fund" | "option";

export type Option = {
  id: string;
  option_name: string;
  description?: string;
  allocation?: AllocationPie;
  as_of_date?: string;
};

const SEGMENTS = {
  listed: {
    color: "#00C49F",
    bgClass: "bg-[#00C49F]/10",
    textClass: "text-[#007a63]",
    label: "Public companies",
  },
  unlisted: {
    color: "#3B82F6",
    bgClass: "bg-blue-100",
    textClass: "text-blue-700",
    label: "Private assets",
  },
  cashAndBonds: {
    color: "#F59E0B",
    bgClass: "bg-amber-100",
    textClass: "text-amber-700",
    label: "Cash & bonds",
  },
} as const;

type SegmentKey = keyof typeof SEGMENTS;

const MOCK_ALLOCATIONS: Record<string, AllocationPie> = {
  "High Growth": { listed: 80, unlisted: 12, cashAndBonds: 4 },
  Growth: { listed: 65, unlisted: 10, cashAndBonds: 10 },
  Balanced: { listed: 45, unlisted: 8, cashAndBonds: 17 },
  Conservative: { listed: 25, unlisted: 5, cashAndBonds: 25 },
  "Sustainable Growth": { listed: 60, unlisted: 10, cashAndBonds: 12 },
};

const AllocationKey = () => (
  <div className="flex gap-4 justify-center flex-wrap px-2 py-5 border-t border-slate-100 bg-white">
    {(Object.keys(SEGMENTS) as SegmentKey[]).map((k) => (
      <span key={k} className="flex items-center gap-1.5 text-xs font-semibold">
        <span
          className="w-2 h-2 sm:w-[0.6rem] sm:h-[0.6rem] sm:rounded-sm flex-shrink-0"
          style={{ backgroundColor: SEGMENTS[k].color }}
        />
        {SEGMENTS[k].label}
      </span>
    ))}
  </div>
);

type OptionPickerViewProps = {
  setView: (view: View) => void;
  currentOption: string;
  currentFund: string;
  options: Option[];
};

const OptionPickerView = ({
  setView,
  currentOption,
  currentFund,
  options,
}: OptionPickerViewProps) => {
  const [search, setSearch] = useState("");
  const { actions } = useStateMachine({ actions: { updateForm } });

  const handleClick = (option: { id: string; option_name: string }) => {
    actions.updateForm({
      option_id: option.id,
      option_name: option.option_name,
    });
    setView("main");
  };

  const filtered = options.filter((o) =>
    o.option_name.toLowerCase().includes(search.toLowerCase()),
  );

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
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-slate-900">
            Choose option
          </h2>
        </div>
      </div>

      {options.length > 8 && (
        <div className="px-4 py-3 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search options..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>
      )}

      <div
  data-vaul-no-drag
  className="overflow-y-auto max-h-[27rem] bg-slate-100 flex flex-col gap-3 py-4 px-4"
>

        {filtered.map((option) => {
          const isSelected = option.option_name === currentOption;
          const allocation = option.allocation;

          return (
            <button
              key={option.id}
              onClick={() => handleClick(option)}
              aria-pressed={isSelected}
              className={`bg-white p-4 rounded-2xl border flex items-center gap-4 shadow-sm transition-all w-full ${
                isSelected
                  ? "border-emerald-500 shadow-md"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-2xl flex-shrink-0">
                {allocation ? (
                  <AllocationPieComponent allocation={allocation} />
                ) : (
                  <span className="text-xs font-bold text-slate-400">
                    {getInitials(option.option_name)}
                  </span>
                )}
              </div>
              <span className="flex flex-col flex-1 text-left min-w-0">
                <span className="text-sm font-bold text-slate-900 truncate">
                  {option.option_name}
                </span>
                {option.as_of_date && (
                  <span className="text-xs text-slate-400">
                    As of {option.as_of_date}
                  </span>
                )}
              </span>
              {isSelected ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-4 h-4 flex items-center justify-center flex-shrink-0"
                >
                  <Check className="w-4 h-4 text-emerald-600" />
                </motion.div>
              ) : (
                <div className="w-4 h-4 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      <AllocationKey />
    </>
  );
};

export default OptionPickerView;
