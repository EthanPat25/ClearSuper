"use client";

import React from "react";
import HeroSection from "./HeroSection";
import { createStore, useStateMachine } from "little-state-machine";
import FinalStep from "./WizardForm/Results";
import Step1_SelectFund from "./WizardForm/Step1_SelectFund";
import Step2_KnowledgeLevel from "./WizardForm/Step2_KnowledgeLevel";
import Step3a_DefaultOption from "./WizardForm/Step3a_DefaultOption";
import Step3b_SelectOption from "./WizardForm/Step3b_SelectOption";
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

createStore({
  Fund: "",
  option: "",
  age: 0,
  balance: 0,
});

export default function Page() {
  const actionButton = React.useRef<HTMLDivElement | null>(null);
  const [step, updateStep] = React.useState("StepOne");

  // Defines how to update form
  function updateForm(currentState, newDataToAdd) {
    return {
      ...currentState,
      ...newDataToAdd,
    };
  }

  const { actions, state } = useStateMachine({
    actions: {
      updateForm: updateForm,
    },
  });

  return (
    <div className="w-full flex flex-col">
      <HeroSection reference={actionButton}></HeroSection>
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

        {step === "StepFour" && (
          <div className="pl-[9rem] pr-[9rem] w-full flex justify-center items-center">
            <Results ref={actionButton} updateStep={updateStep}></Results>
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
