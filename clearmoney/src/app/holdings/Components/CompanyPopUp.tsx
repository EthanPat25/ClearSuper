// CompanyPopUp.tsx
"use client";

import { useState, useEffect } from "react";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "../WizardForm/formWizardStore";
import { fetch_company_weightings } from "../../fe-api/company_weightings/company_weightings";
import { PopUpShell, SECTOR_COLORS, DEFAULT_SECTOR_STYLE } from "./PopUpShell";
import { ExposureCard } from "./ExposureCard";
import { CrossOptionsList, CrossOption } from "./CrossOptionsList";
import { Holding } from "./PopUpShell";

type CompanyPopUpProps = {
  trigger: React.ReactNode;
  holding: Holding;
  balance: number;
};

export function CompanyPopUp({ trigger, holding, balance }: CompanyPopUpProps) {
  const [open, setOpen] = useState(false);
  const [optionsData, setOptionsData] = useState<CrossOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const { actions } = useStateMachine({ actions: { updateForm } });

  const { companies, Weighting_Percentage_Clean, Super_Fund } = holding;
  const scaledValue = (Weighting_Percentage_Clean / 100) * balance;
  const sectorStyle = SECTOR_COLORS[companies?.Sector] ?? DEFAULT_SECTOR_STYLE;
  const companyName = companies?.Parsed_Name ?? holding.Full_Name;
  const currentOptionId = holding.Option_Id ?? "";

  useEffect(() => {
    if (!open || !companies?.id) return;

    const loadOptionsForCompany = async () => {
      setLoadingOptions(true);
      try {
        const data = await fetch_company_weightings(Super_Fund, companies.id);
        setOptionsData(
          (data.options ?? []).map((o: any) => ({
            id: o.id,
            optionName: o.option_name,
            weightPercent: o.Weighting_Percentage_Clean,
            as_of_date: o.as_of_date,
          })),
        );
      } catch {
        setOptionsData([]);
      } finally {
        setLoadingOptions(false);
      }
    };

    loadOptionsForCompany();
  }, [open, Super_Fund, companies?.id]);

  function handleSwitchOption(optionId: string, optionName: string) {
    actions.updateForm({
      option_id: optionId,
      option_name: optionName,
    });
    setOpen(false);
  }

  return (
    <PopUpShell
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
      sectorStyle={sectorStyle}
      icon={
        <img
          className="w-full h-full object-contain p-2 rounded-full"
          src={`https://cdn.brandfetch.io/${companies?.id}/icon/theme/dark/c=1idfCQLm9sumx6VuVu3`}
          alt={companyName}
          onError={(e) => {
            e.currentTarget.src = `https://www.google.com/s2/favicons?sz=128&domain=${companies?.id}`;
          }}
        />
      }
      title={companyName}
      meta={
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${sectorStyle.bg} ${sectorStyle.text} border-2 ${sectorStyle.border}`}
        >
          {companies?.Sector || "Investment"}
        </span>
      }
      holding={holding}
    >
      <ExposureCard
        value={scaledValue}
        weight={Weighting_Percentage_Clean ?? 0}
        decimalScale={2}
        superFund={Super_Fund}
      />

      {companies?.Description && (
        <div
          className={`${sectorStyle.bg} rounded-[2rem] p-6 border border-white shadow-sm`}
        >
          <p
            className={`text-xs font-bold ${sectorStyle.text} uppercase tracking-widest mb-3 opacity-70`}
          >
            What they do
          </p>
          <p className="text-[15px] text-slate-800 leading-relaxed font-semibold">
            {companies.Description}
          </p>
        </div>
      )}

      <CrossOptionsList
        title={`${companyName} across other ${Super_Fund} options`}
        loading={loadingOptions}
        options={optionsData}
        currentOptionId={currentOptionId}
        balance={balance}
        sectorStyle={sectorStyle}
        onSwitchOption={handleSwitchOption}
      />
    </PopUpShell>
  );
}

export default CompanyPopUp;
