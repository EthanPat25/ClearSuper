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
import { fetch_MySuper } from "../fe-api/MySuper/MySuper";
import { fetch_isLifecycle } from "../fe-api/checkLifecycle/checkLifecycle";
import HoldingsResultsLoader from "./WizardForm/HoldingsResultsLoader";

export default function Page() {
  const actionButton = React.useRef<HTMLDivElement | null>(null);
  const [step, setStep] = React.useState("StepOne");
  const [prevStep, setPrevStep] = React.useState("StepThree_One");
  const [isLifecycle, setIsLifecycle] = React.useState(null);

  function handleStepAnimationComplete() {
    actionButton.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  function updateStep(next: string) {
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

  React.useEffect(() => {
    const fetchDefaultState = async () => {
      const data = await fetch_isLifecycle(state.Fund);
      console.log("lifecycle: ", data);
      setIsLifecycle(data.fund?.mysuper_is_lifecycle);
    };

    fetchDefaultState();
  }, [state.Fund]);

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
        {step === "StepThree_Two" &&
          (isLifecycle ? (
            <Step3c_Lifecycle
              ref={actionButton}
              updateStep={updateStep}
            ></Step3c_Lifecycle>
          ) : (
            <Step3b_SelectOption
              ref={actionButton}
              updateStep={updateStep}
            ></Step3b_SelectOption>
          ))}

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
          </div>
        )}
      </div>
    </div>
  );
}
