"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { fetch_MySuper } from "@/app/fe-api/MySuper/MySuper";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "./formWizardStore";
import AllocationPieComponent from "../Components/AllocationPie";
import { AllocationPie } from "../types/holdings";
import { fetch_option_allocations } from "@/app/fe-api/options/options";
import { AssetClassKey } from "./Step3a_DefaultOption";

type ResolvedOption = {
  id: string;
  option_name: string;
  as_of_date?: string;
};

const Step3b_SelectOption = ({
  ref,
  updateStep,
}: {
  ref?: React.RefObject<HTMLDivElement>;
  updateStep: (step: string) => void;
}) => {
  const { actions, state } = useStateMachine({ actions: { updateForm } });
  const [option, updateOption] = React.useState<ResolvedOption | null>(null);
  const [loading, setLoading] = React.useState(true);
  
  const [allocation, setAllocation] = React.useState<AllocationPie>({
  listed: 0,
  unlisted: 0,
  cashAndBonds: 0,
});

  React.useEffect(() => {
    const load_option = async () => {

      try {
        const data = await fetch_MySuper(state.Fund);
        updateOption(data.option);
        const allocationRows = await fetch_option_allocations([data.option.id]);
        console.log("hello:" + allocationRows.map(r => r.category));
        const pie: AllocationPie = {
          listed: 0,
          unlisted: 0,
          cashAndBonds: 0,
        };
        for (const row of allocationRows) {
          if (row.category === "Listed") pie.listed = row.percentage;
          if (row.category === "Unlisted") pie.unlisted = row.percentage;
          if (row.category === "Fixed Interest & Cash")
            pie.cashAndBonds = row.percentage;
        }
        setAllocation(pie);

      } finally {
        setLoading(false);
    }
    };
    load_option();

  }, [state.Fund]);

  function handleContinue() {
    if (!option) return;
    actions.updateForm({
      option_id: option.id,
      option_name: option.option_name,
      as_of_date: option.as_of_date,
    });
    updateStep("StepBalance");
  }

  return (
    <div className="flex flex-col gap-6 max-w-full px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center font-bold text-lg sm:text-xl"
      >
        Your fund's default option
      </motion.h1>

      <div className="w-full bg-slate-100 rounded-[3rem] p-10 shadow-sm flex flex-col gap-4 sm:max-w-xl">
     
  <AssetClassKey />
          {loading ? (
             <div className="flex justify-center py-6">
            <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          </div>
       
          ) : (     <div className="bg-white p-4 rounded-2xl border border-teal-500 flex items-center gap-4">
              {option && (
                <>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex-shrink-0 flex items-center justify-center">
                    <span className="text-base font-bold text-teal-700">
                      <AllocationPieComponent allocation={allocation} />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-900 font-bold text-base leading-tight">
                      {option.option_name}
                    </p>
                  </div>
                </>
              )}
              <span className="text-xs font-bold tracking-wide text-teal-950 bg-teal-100 px-2 py-1 rounded-full flex-shrink-0">
                MySuper
              </span>
            </div>)}

      
        <div className="text-slate-600 pt-6 p-4 flex max-w-3xl">
          <p className="text-xs leading-relaxed text-center ">
            ClearSuper can&apos;t know which option you&apos;re actually in. It
            can only preselect a fund&apos;s MySuper default, so it&apos;s worth
            checking your account to be sure. <br></br>
            <Link
              href="/about"
              className="underline font-medium hover:text-slate-900 transition-colors"
            >
              Read full disclaimer
            </Link>
          </p>
        </div>
      </div>

      <div className="w-full mt-4">
        <div className="flex justify-between gap-3 w-full">
          <button
            onClick={() => updateStep("StepTwo")}
            className="px-6 py-4 md:py-2 bg-slate-200 text-slate-800 rounded-2xl md:rounded-lg font-bold transition hover:bg-slate-300 shrink-0"
          >
            Back
          </button>
          <button
            onClick={() => handleContinue()}
            className="flex-1 md:flex-none px-6 py-4 md:py-2 rounded-2xl md:rounded-lg font-bold transition bg-black text-white hover:-translate-y-1"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3b_SelectOption;
