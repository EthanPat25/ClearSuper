"use client";

import React from "react";
import HeroSection from "./Components/HeroSection";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "./WizardForm/formWizardStore";
import Step1_SelectFund from "./WizardForm/Step1_SelectFund";
import Step2_KnowledgeLevel from "./WizardForm/Step2_KnowledgeLevel";
import Step3a_DefaultOption from "./WizardForm/Step3a_DefaultOption";
import StepBalance from "./WizardForm/Step4_EnterBalance";
import Step3b_SelectOption from "./WizardForm/Step3b_SelectOption";
import Step3c_Lifecycle from "./WizardForm/Step3c_Lifecycle";
import { funds } from "./data/SuperFunds";
import HoldingsResultsLoader from "./WizardForm/HoldingsResultsLoader";

export default function Page() {
  const actionButton = React.useRef<HTMLDivElement | null>(null);
  const [step, setStep] = React.useState("StepOne");
  const [prevStep, setPrevStep] = React.useState("StepThree_One");

  function handleStepAnimationComplete() {
    actionButton.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  function updateStep(next: string) {
    if (next === "StepThree_Two" && funds.some((fund) => fund.name === state.Fund && fund.mysuper_is_lifecycle)) {
      next = "StepThree_Lifecycle";
    }
    if (next === "StepBalance") setPrevStep(step);
    setStep(next);
    actions.updateForm({ currentStep: next });
  }

  const { actions, state } = useStateMachine({
    actions: {
      updateForm: updateForm,
    },
  });

  React.useEffect(() => {
    actions.updateForm({ currentStep: "StepOne" });
  }, []);

  return (
    <div className="w-full flex flex-col">
      {step !== "StepFour" && (
        <HeroSection
          reference={actionButton}
          fund={state.Fund}
          option={state.option_name}
          showSelectedFund={step === "StepFour"}
          onSelectFund={(fund) => {
            actions.updateForm({
              Fund: fund.name,
              option_name: "",
              option_id: "",
              age: 0,
              balance: 0,
            });
            updateStep("StepTwo");
          }}
        />
      )}

      <div
        className={`flex w-full min-h-[55rem] items-center flex-col pb-16 ${
          step === "StepThree_Lifecycle"
            ? "justify-start pt-24 md:justify-center md:pt-16"
            : "justify-center pt-16"
        }`}
      >
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

        {step === "StepThree_Lifecycle" && (
          <Step3c_Lifecycle key={state.Fund} ref={actionButton} updateStep={updateStep} />
        )}

        {step === "StepBalance" && (
          <StepBalance
            ref={actionButton}
            updateStep={updateStep}
            prevStep={prevStep}
          />
        )}

        {step === "StepFour" && (
          <div className="w-full flex flex-col items-center gap-4 px-0 pt-14">
            <HoldingsResultsLoader ref={actionButton} />
            {prevStep === "StepThree_Lifecycle" && state.option_name && (
              <div className="mx-4 rounded-2xl bg-teal-50 p-4 text-center text-sm text-teal-950">
                <p>Exploring {state.option_name} on its own with your example balance.</p>
                <button
                  type="button"
                  onClick={() => updateStep("StepThree_Lifecycle")}
                  className="mt-2 font-semibold underline underline-offset-4"
                >
                  Explore another lifecycle option
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
