// CompanyPopUp.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "../WizardForm/formWizardStore";
import { fetch_company_weightings } from "../../fe-api/company_weightings/company_weightings";
import { PopUpShell, SECTOR_COLORS, DEFAULT_SECTOR_STYLE } from "./PopUpShell";
import { ExposureCard } from "./ExposureCard";
import { CrossOptionsList, CrossOption } from "./CrossOptionsList";
import { fetch_option_allocations } from "@/app/fe-api/options/options";
import { fetch_MySuper } from "@/app/fe-api/MySuper/MySuper";
import { AllocationPie, PublicCompanyHolding } from "../types/holdings";
import Loading from "./Loading";

type CompanyPopUpProps = {
  trigger: React.ReactNode;
  holding: PublicCompanyHolding;
  balance: number;
};

export function CompanyPopUp({ trigger, holding, balance }: CompanyPopUpProps) {
  const [open, setOpen] = useState(false);
  const [optionsData, setOptionsData] = useState<CrossOption[]>([]);
  const [defaultOptionId, setDefaultOptionId] = useState<string | null>(null);
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [switchingOption, setSwitchingOption] = useState(false);
  const [minimumLoadingElapsed, setMinimumLoadingElapsed] = useState(true);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { actions, state } = useStateMachine({ actions: { updateForm } });

  const { companies, Weighting_Percentage_Clean, Super_Fund } = holding;
  const scaledValue = (Weighting_Percentage_Clean / 100) * balance;
  const sectorStyle = SECTOR_COLORS[companies?.Sector] ?? DEFAULT_SECTOR_STYLE;
  const companyName = companies?.Parsed_Name ?? holding.Full_Name;
  const currentOptionId = holding.Option_Id ?? "";

  const isSwitching =
    switchingOption &&
    (!minimumLoadingElapsed || currentOptionId !== state.option_id);

  useEffect(() => {
    if (!open || !companies?.id) return;

    const loadOptionsForCompany = async () => {
      setLoadingOptions(true);
      try {
        const [data, defaultData] = await Promise.all([
          fetch_company_weightings(Super_Fund, companies.id),
          fetch_MySuper(Super_Fund).catch(() => null),
        ]);
        setDefaultOptionId(defaultData.option?.id ?? null);
        const mapped = (data.options ?? []).map((o: any) => ({
          id: o.id,
          optionName: o.option_name,
          weightPercent: o.Weighting_Percentage_Clean,
          as_of_date: o.as_of_date,
        }));

        const allocationRows = await fetch_option_allocations(
          mapped.map((o) => o.id),
        );
        const allocationMap: Record<string, AllocationPie> =
          allocationRows.reduce((acc, row) => {
            if (!acc[row.Option_Id])
              acc[row.Option_Id] = { listed: 0, unlisted: 0, cashAndBonds: 0 };
            if (row.category === "Listed")
              acc[row.Option_Id].listed = row.percentage;
            if (row.category === "Unlisted")
              acc[row.Option_Id].unlisted = row.percentage;
            if (row.category === "Fixed Interest & Cash")
              acc[row.Option_Id].cashAndBonds = row.percentage;
            return acc;
          }, {});

        setOptionsData(
          mapped.map((o) => ({ ...o, allocation: allocationMap[o.id] })),
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
    if (loadingTimer.current) clearTimeout(loadingTimer.current);
    setSwitchingOption(true);
    setMinimumLoadingElapsed(false);
    loadingTimer.current = setTimeout(() => {
      setMinimumLoadingElapsed(true);
    }, 2600);
    actions.updateForm({
      option_id: optionId,
      option_name: optionName,
    });
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
          className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${sectorStyle.bg} ${sectorStyle.text} border-2 ${sectorStyle.border}`}
        >
          {companies?.Sector || "Investment"}
        </span>
      }
      asOfDate={holding.options?.as_of_date}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isSwitching ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex min-h-48 items-center justify-center"
          >
            <Loading classname="flex h-[5rem] w-[5rem] justify-center items-center rounded-full bg-emerald-300" />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-8"
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
                className={`text-sm font-bold ${sectorStyle.text} mb-3 opacity-70`}
              >
                What They Do
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
            defaultOptionId={defaultOptionId}
            balance={balance}
            sectorStyle={sectorStyle}
            onSwitchOption={handleSwitchOption}
            allowZeroSelection
          />
          </motion.div>
        )}
      </AnimatePresence>
    </PopUpShell>
  );
}

export default CompanyPopUp;
