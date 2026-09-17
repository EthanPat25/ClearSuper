"use client";

import SliderRow from "./SliderRow";
import { money, type WizardValues } from "./model";

export default function AssumptionsPanel({
  annualAdminFee,
  investmentFeePct,
  investmentReturnPct,
  inflationPct,
  superGuaranteePct,
  onUpdate,
}: Pick<WizardValues, "annualAdminFee" | "investmentFeePct" | "investmentReturnPct" | "inflationPct" | "superGuaranteePct"> & {
  onUpdate: (changes: Partial<WizardValues>) => void;
}) {
  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-md sm:p-7">
      <div className="mb-6 flex items-center gap-2">
        <i className="fi fi-rr-settings-sliders text-emerald-600" />
        <div>
          <p className="text-sm font-bold text-slate-900">Adjust assumptions</p>
          <p className="text-xs text-slate-500">These settings affect the projection.</p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <SliderRow
          label="Annual admin fee"
          display={money(annualAdminFee)}
          value={annualAdminFee}
          min={0}
          max={300}
          step={1}
          currency
          onChange={(v) => onUpdate({ annualAdminFee: v })}
        />
        <SliderRow
          label="Investment fee"
          display={`${investmentFeePct.toFixed(2)}%`}
          value={investmentFeePct}
          min={0}
          max={2}
          step={0.05}
          onChange={(v) => onUpdate({ investmentFeePct: v })}
        />
        <SliderRow
          label="Investment return before tax and fees"
          display={`${investmentReturnPct.toFixed(1)}%`}
          value={investmentReturnPct}
          min={0}
          max={12}
          step={0.1}
          onChange={(v) => onUpdate({ investmentReturnPct: v })}
        />
        <SliderRow
          label="Inflation"
          display={`${inflationPct.toFixed(1)}%`}
          value={inflationPct}
          min={0}
          max={8}
          step={0.1}
          onChange={(v) => onUpdate({ inflationPct: v })}
        />
        <SliderRow
          label="Employer super contribution"
          display={`${superGuaranteePct.toFixed(1)}%`}
          value={superGuaranteePct}
          min={12}
          max={20}
          step={0.1}
          onChange={(v) => onUpdate({ superGuaranteePct: v })}
        />
      </div>
    </div>
  );
}
