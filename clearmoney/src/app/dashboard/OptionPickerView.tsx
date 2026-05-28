import { ChevronLeft, Search } from "lucide-react";
import { useState } from "react";
import React from "react";
import { fetch_options } from "../fe-api/options/options";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "../holdings/WizardForm/formWizardStore";

type View = "main" | "fund" | "option";

type Option = {
  id: string;
  name: string;
  description?: string;
};

type OptionPickerViewProps = {
  setView: (view: View) => void;
  actions: {
    updateForm: (data: {
      option_id?: string;
      option_name?: string;
      Fund?: string;
      age?: number;
      balance?: number;
    }) => void;
  };
  currentOption: string;
  currentFund: string;
  options: Option[];
};

const OptionPickerView = ({
  setView,
  currentOption,
  currentFund,
}: OptionPickerViewProps) => {
  const [search, setSearch] = useState("");
  const { actions, state } = useStateMachine({ actions: { updateForm } });
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleClick = (option: { id: string; option_name: string }) => {
    actions.updateForm({
      option_id: option.id,
      option_name: option.option_name,
    });
    setView("main");
  };
  const [options, setOptions] = React.useState<
    { id: string; option_name: string }[]
  >([]);

  React.useEffect(() => {
    if (!state.Fund) return;

    const loadOptions = async () => {
      setLoading(true);
      try {
        const data = await fetch_options(state.Fund);
        const sorted = data.sort((a, b) =>
          a.option_name.localeCompare(b.option_name),
        );
        setOptions(sorted);
      } catch {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [state.Fund]);

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
          <p className="text-xs text-slate-500">For {currentFund}</p>
        </div>
      </div>

      {options.length > 8 && (
        <div className="px-4 py-3 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search options..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>
        </div>
      )}

      <div className="max-h-96 overflow-y-auto">
        {options.map((option) => {
          const isSelected = option.option_name === currentOption;
          return (
            <button
              key={option.id}
              onClick={() => handleClick(option)}
              className={`w-full flex items-start gap-3 px-6 py-3 transition-colors text-left border-b border-slate-100 last:border-b-0 ${
                isSelected
                  ? "bg-emerald-50/50 hover:bg-emerald-50"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">
                  {option.option_name}
                </p>
              </div>
              {isSelected && (
                <div className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default OptionPickerView;
