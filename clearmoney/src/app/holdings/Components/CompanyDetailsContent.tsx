"use client";

import { useEffect, useRef, useState } from "react";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "../WizardForm/formWizardStore";
import { fetch_company_weightings } from "../../fe-api/company_weightings/company_weightings";
import { fetch_options } from "@/app/fe-api/options/options";
import { ExposureCard } from "./ExposureCard";
import { CrossOptionsList } from "./CrossOptionsList";
import { CrossOption } from "../types/holdings";
import { AllocationPie, PublicCompanyHolding } from "../types/holdings";
import Loading from "./Loading";

export default function CompanyDetailsContent({
  holding,
  balance,
}: {
  holding: PublicCompanyHolding;
  balance: number;
}) {
  const { actions, state } = useStateMachine({ actions: { updateForm } });
  const [optionsData, setOptionsData] = useState<CrossOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [switchingOption, setSwitchingOption] = useState(false);
  const [minimumLoadingElapsed, setMinimumLoadingElapsed] = useState(true);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { companies, Weighting_Percentage_Clean, Super_Fund } = holding;
  const currentOptionId = holding.Option_Id ?? "";
  const companyName = companies?.Parsed_Name ?? holding.Full_Name;
  const isSwitching =
    switchingOption &&
    (!minimumLoadingElapsed || currentOptionId !== state.option_id);

  useEffect(() => {
    const load = async () => {
      setLoadingOptions(true);
      try {
        const [data, allOptions] = await Promise.all([
          fetch_company_weightings(Super_Fund, companies.id),
          fetch_options(Super_Fund).catch(() => []),
        ]);
        const mapped = (data.options ?? []).map((o: { id: string; option_name: string; Weighting_Percentage_Clean: number; as_of_date?: string }) => ({
          id: o.id,
          optionName: o.option_name,
          weightPercent: o.Weighting_Percentage_Clean,
          as_of_date: o.as_of_date,
        }));
        const allocationMap: Record<string, AllocationPie> = {};
        for (const option of allOptions ?? []) {
          allocationMap[option.id] = { listed: 0, unlisted: 0, cashAndBonds: 0 };
          for (const row of option.allocations ?? []) {
            if (row.category === "Listed") allocationMap[option.id].listed = row.percentage;
            if (row.category === "Unlisted") allocationMap[option.id].unlisted = row.percentage;
            if (row.category === "Fixed Interest & Cash") allocationMap[option.id].cashAndBonds = row.percentage;
          }
        }
        setOptionsData(mapped.map((o: { id: string }) => ({ ...o, allocation: allocationMap[o.id] })));
      } catch {
        setOptionsData([]);
      } finally {
        setLoadingOptions(false);
      }
    };
    load();
  }, [Super_Fund, companies?.id]);

  function switchOption(optionId: string, optionName: string) {
    if (loadingTimer.current) clearTimeout(loadingTimer.current);
    setSwitchingOption(true);
    setMinimumLoadingElapsed(false);
    loadingTimer.current = setTimeout(() => setMinimumLoadingElapsed(true), 2600);
    actions.updateForm({ option_id: optionId, option_name: optionName });
  }

  return isSwitching ? (
    <div className="flex min-h-48 items-center justify-center">
      <Loading classname="flex h-[5rem] w-[5rem] justify-center items-center rounded-full bg-emerald-300" />
    </div>
  ) : (
    <div className="space-y-8">
      <ExposureCard
        value={(Number(Weighting_Percentage_Clean) / 100) * balance}
        weight={Weighting_Percentage_Clean ?? 0}
        decimalScale={2}
        superFund={Super_Fund}
      />
      {companies?.Description && (
        <div className="rounded-[2rem] border border-white bg-slate-100 p-6 shadow-sm">
          <p className="mb-3 text-sm font-bold text-slate-700">What They Do</p>
          <p className="text-[15px] font-semibold leading-relaxed text-slate-800">{companies.Description}</p>
        </div>
      )}
      <CrossOptionsList
        title={`${companyName} across other ${Super_Fund} options`}
        loading={loadingOptions}
        options={optionsData}
        currentOptionId={currentOptionId}
        balance={balance}
        sectorStyle={{ bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-500" }}
        onSwitchOption={switchOption}
        allowZeroSelection
      />
    </div>
  );
}
