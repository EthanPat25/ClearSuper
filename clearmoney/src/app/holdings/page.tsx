"use client";

import React from "react";
import HeroSection from "./HeroSection";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "./WizardForm/formWizardStore";
import FinalStep from "./WizardForm/Results";
import Step1_SelectFund from "./WizardForm/Step1_SelectFund";
import Step2_KnowledgeLevel from "./WizardForm/Step2_KnowledgeLevel";
import Step3a_DefaultOption from "./WizardForm/Step3a_DefaultOption";
import Step3b_SelectOption from "./WizardForm/Step3b_SelectOption";
import StepBalance from "./WizardForm/StepBalance";
import Results from "./WizardForm/Results";

type HoldingsData = {
  public_companies: any[];
  Private_Investments: any[];
  Bonds: any[];
  Cash: any[];
};

type Results = {
  holdingsData: HoldingsData;
  balance: number;
};

export type FormDataType = {
  Fund: string;
  option: string;
  age?: number;
  balance: number;
};

export default function Page() {
  const actionButton = React.useRef<HTMLDivElement | null>(null);
  const [step, setStep] = React.useState("StepOne");
  const [prevStep, setPrevStep] = React.useState("StepThree_One");

  function updateStep(next: string) {
    if (next === "StepBalance") setPrevStep(step);
    setStep(next);
  }

  const { actions, state } = useStateMachine({
    actions: {
      updateForm: updateForm,
    },
  });

  return (
    <div className="w-full flex flex-col">
      <HeroSection
        reference={actionButton}
        fund={state.Fund}
        option={state.option}
        showSelectedFund={step === "StepFour"}
        onSelectFund={(fund) => {
          actions.updateForm({
            Fund: fund.name,
            option: "",
            age: 0,
            balance: 0,
          });
          updateStep("StepTwo");
        }}
      ></HeroSection>
      <div className="flex w-full min-h-[55rem] justify-center items-center pt-16 pb-16 flex-col">
        {step === "StepOne" && (
          <Step1_SelectFund
            ref={actionButton}
            updateStep={updateStep}
          ></Step1_SelectFund>
        )}
        {step === "StepTwo" && (
          <Step2_KnowledgeLevel
            ref={actionButton}
            updateStep={updateStep}
          ></Step2_KnowledgeLevel>
        )}
        {step === "StepThree_One" && (
          <Step3a_DefaultOption
            ref={actionButton}
            updateStep={updateStep}
          ></Step3a_DefaultOption>
        )}
        {step === "StepThree_Two" && (
          <Step3b_SelectOption
            ref={actionButton}
            updateStep={updateStep}
          ></Step3b_SelectOption>
        )}

        {step === "StepBalance" && (
          <StepBalance
            ref={actionButton}
            updateStep={updateStep}
            prevStep={prevStep}
          />
        )}

        {step === "StepFour" && (
          <div className="w-full flex flex-col items-center gap-4 px-0 sm:px-8 lg:px-[9rem]">
            <Results ref={actionButton}></Results>
          </div>
        )}

        <div
          className={`py-8 w-full flex px-28 ${step === "FinalStep" ? "flex" : "hidden"}`}
        >
          {step === "FinalStep" && <FinalStep ref={actionButton}></FinalStep>}
        </div>
      </div>
    </div>
  );
}
