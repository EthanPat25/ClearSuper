"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus, X, ArrowLeft } from "lucide-react";
import { useForm, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Pause } from "../AnimationComponents/Pause";
import { Slider } from "@/components/ui/slider";
import { IconX } from "@tabler/icons-react";

export type Inputs = {
  currentAge: number;
  retireAge: number;
  salary: number;
  superBalance: number;
  careerBreakStartAge?: number | null;
  careerBreakEndAge?: number | null;
  incomeDuringBreak?: number | null;
};

type Scenario = "yearOff" | "partTime" | "fourDay";
type ModalView = "choice" | "scenarios" | "manual";

export function Calc({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { register, watch, setValue, handleSubmit, getValues } =
    useForm<Inputs>({
      defaultValues: {
        currentAge: 30,
        retireAge: 67,
        salary: 75000,
        superBalance: 50000,
        incomeDuringBreak: 0,
      },
    });

  const salary = watch("salary") ?? 0;
  const breakStart = watch("careerBreakStartAge");
  const breakEnd = watch("careerBreakEndAge");
  const incomeDuringBreak = watch("incomeDuringBreak") ?? 0;
  const hasBreak = breakStart != null && breakEnd != null;

  const onSubmit = (data: Inputs) => {
    console.log("Form Submitted:", data);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    }).format(amount);

  const applyScenario = (scenario: Scenario) => {
    const currentAge = getValues("currentAge") || 30;
    if (scenario === "yearOff") {
      setValue("careerBreakStartAge", currentAge);
      setValue("careerBreakEndAge", currentAge + 1);
      setValue("incomeDuringBreak", 0);
    } else if (scenario === "partTime") {
      setValue("careerBreakStartAge", currentAge);
      setValue("careerBreakEndAge", currentAge + 3);
      setValue("incomeDuringBreak", 50);
    } else if (scenario === "fourDay") {
      setValue("careerBreakStartAge", currentAge);
      setValue("careerBreakEndAge", currentAge + 5);
      setValue("incomeDuringBreak", 80);
    }
  };

  const clearBreak = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setValue("careerBreakStartAge", null);
    setValue("careerBreakEndAge", null);
    setValue("incomeDuringBreak", null);
  };

  const handleFormattedInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "salary" | "superBalance",
  ) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setValue(fieldName, rawValue ? parseInt(rawValue, 10) : 0, {
      shouldValidate: true,
    });
  };

  const inputStyles =
    "h-14 bg-[#f6f6f6] text-lg tabular-nums border border-slate-200 rounded-2xl font-bold text-slate-900 placeholder:text-slate-300 placeholder:font-normal shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-emerald-900 outline-none transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <Card className="w-full h-full max-w-[32rem] p-4 mx-auto flex flex-col bg-white border border-slate-100 rounded-3xl shadow-md">
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-900">
            Your details
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Fill in your info, then add any time off or reduced hours.
          </p>
        </div>

        <CardContent className="h-full flex flex-col pt-6 gap-4">
          <form
            className="flex flex-col h-full gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Age row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="currentAge"
                  className="text-xs font-medium text-slate-600"
                >
                  Your age
                </Label>
                <Input
                  id="currentAge"
                  type="number"
                  required
                  placeholder="30"
                  className={inputStyles}
                  {...register("currentAge", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="retireAge"
                  className="text-xs font-medium text-slate-600"
                >
                  Retirement age
                </Label>
                <Input
                  id="retireAge"
                  type="number"
                  required
                  placeholder="67"
                  className={inputStyles}
                  {...register("retireAge", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>

            {/* Salary */}
            <div className="space-y-2">
              <Label
                htmlFor="salary"
                className="text-xs font-medium text-slate-600"
              >
                Current salary
              </Label>
              <div className="relative flex items-center">
                <span
                  className="absolute left-4 text-lg font-bold text-slate-300 pointer-events-none z-10"
                  aria-hidden="true"
                >
                  $
                </span>
                <Input
                  id="salary"
                  type="text"
                  inputMode="numeric"
                  required
                  placeholder="75,000"
                  className={cn(inputStyles, "pl-10 pr-20")}
                  value={salary ? salary.toLocaleString("en-AU") : ""}
                  onChange={(e) => handleFormattedInputChange(e, "salary")}
                  aria-label="Current annual salary in Australian dollars"
                />
                <span
                  className="absolute right-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider pointer-events-none z-10"
                  aria-hidden="true"
                >
                  per year
                </span>
              </div>
            </div>

            {/* Super balance */}
            <div className="space-y-2">
              <Label
                htmlFor="superBalance"
                className="text-xs font-medium text-slate-600"
              >
                Super balance
              </Label>
              <div className="relative flex items-center">
                <span
                  className="absolute left-4 text-lg font-bold text-slate-300 pointer-events-none z-10"
                  aria-hidden="true"
                >
                  $
                </span>
                <Input
                  id="superBalance"
                  type="text"
                  inputMode="numeric"
                  required
                  placeholder="50,000"
                  className={cn(inputStyles, "pl-10 pr-20")}
                  value={
                    watch("superBalance")
                      ? watch("superBalance").toLocaleString("en-AU")
                      : ""
                  }
                  onChange={(e) =>
                    handleFormattedInputChange(e, "superBalance")
                  }
                  aria-label="Current superannuation balance in Australian dollars"
                />
                <span
                  className="absolute right-4 text-[10px] font-semibold text-slate-400 uppercase tracking-wider pointer-events-none z-10"
                  aria-hidden="true"
                >
                  current
                </span>
              </div>
            </div>

            {/* Career break */}
            <div className="space-y-2 pt-2">
              <Label className="text-xs font-medium text-slate-600">
                Time off or reduced hours
              </Label>
              <Dialog>
                {!hasBreak ? (
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="w-full group flex items-center justify-between gap-3 border border-slate-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md hover:border-emerald-950 active:scale-[0.99] transition-all duration-200 text-left"
                      aria-label="Add time off or reduced hours"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-10 h-10 rounded-xl bg-[#f6f6f6] border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors"
                          aria-hidden="true"
                        >
                          <Pause responsiveSizing="w-[2rem] h-[2rem]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900">
                            Career break
                          </p>
                          <p className="text-xs text-slate-400">None added</p>
                        </div>
                      </div>
                      <div
                        className="bg-[#f6f6f6] inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 group-hover:text-emerald-700 transition-colors text-xs font-semibold text-slate-700 flex-shrink-0"
                        aria-hidden="true"
                      >
                        <Plus className="w-3 h-3" /> Add
                      </div>
                    </button>
                  </DialogTrigger>
                ) : (
                  <div className="flex items-center justify-between gap-3 border border-slate-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition-all duration-200 relative">
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="absolute inset-0 w-full h-full text-left rounded-2xl active:scale-[0.99] transition-transform"
                        aria-label="Edit career break"
                      />
                    </DialogTrigger>
                    <div className="flex items-center gap-3 min-w-0 pointer-events-none">
                      <div
                        className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0"
                        aria-hidden="true"
                      >
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">
                          Career break
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          Age {breakStart}–{breakEnd} ·{" "}
                          {formatCurrency(salary * (incomeDuringBreak / 100))}{" "}
                          per year
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0 relative z-10">
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="px-2.5 py-1.5 rounded-full hover:bg-slate-100 transition-colors text-xs font-medium text-slate-600"
                        >
                          Edit
                        </button>
                      </DialogTrigger>
                      <button
                        type="button"
                        onClick={clearBreak}
                        className="p-1.5 rounded-full hover:bg-slate-100 transition-colors z-20 relative"
                        aria-label="Remove career break"
                      >
                        <X className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    </div>
                  </div>
                )}

                <CareerBreakModal
                  applyScenario={applyScenario}
                  register={register}
                  setValue={setValue}
                  incomeDuringBreak={incomeDuringBreak}
                  salary={salary}
                  inputStyles={inputStyles}
                  formatCurrency={formatCurrency}
                />
              </Dialog>
            </div>

            {/* Submit */}
            <div className="mt-auto pt-4">
              <Button
                type="submit"
                className="w-full h-14 text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 rounded-2xl"
              >
                Calculate
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function CareerBreakModal({
  applyScenario,
  register,
  setValue,
  incomeDuringBreak,
  salary,
  inputStyles,
  formatCurrency,
}: {
  applyScenario: (s: Scenario) => void;
  register: UseFormRegister<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  incomeDuringBreak: number;
  salary: number;
  inputStyles: string;
  formatCurrency: (amount: number) => string;
}) {
  const [view, setView] = React.useState<ModalView>("choice");
  const incomeAmount = salary * (incomeDuringBreak / 100);

  const scenarios: {
    id: Scenario;
    label: string;
    description: string;
    detail: string;
  }[] = [
    {
      id: "yearOff",
      label: "Taking a year off",
      description: "No paid work for 12 months",
      detail: "Starts at your current age · $0 income",
    },
    {
      id: "partTime",
      label: "Working part-time",
      description: "Common for caring, study, or family",
      detail: "3 years · 50% of usual income",
    },
    {
      id: "fourDay",
      label: "Working a 4-day week",
      description: "Slightly reduced hours, slightly reduced pay",
      detail: "5 years · 80% of usual income",
    },
  ];

  return (
    <DialogContent
      className="max-w-md p-0 gap-0 overflow-hidden rounded-[2rem]"
      onOpenAutoFocus={(e) => e.preventDefault()}
      aria-label="Add career break or reduced hours"
    >
      <DialogClose
        className="absolute top-5 right-5 z-50 p-1.5 rounded-lg text-rose-600 bg-rose-100 hover:bg-rose-200 transition-colors"
        aria-label="Close"
        onClick={() => setView("choice")}
      >
        <IconX size={18} />
      </DialogClose>

      {/* Choice */}
      {view === "choice" && (
        <div className="p-8 flex flex-col gap-5">
          <div>
            <p className="text-lg font-bold text-slate-900">
              Add a career break
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Choose how to enter it.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setView("scenarios")}
              className="w-full text-left rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all focus-visible:ring-2 focus-visible:ring-emerald-900"
            >
              <p className="text-sm font-bold text-slate-900">Use a scenario</p>
              <p className="text-xs text-slate-500 mt-1">
                Year off, part-time, or 4-day week
              </p>
            </button>
            <button
              type="button"
              onClick={() => setView("manual")}
              className="w-full text-left rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all focus-visible:ring-2 focus-visible:ring-emerald-900"
            >
              <p className="text-sm font-bold text-slate-900">Enter manually</p>
              <p className="text-xs text-slate-500 mt-1">
                Set your own ages and income
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Scenarios */}
      {view === "scenarios" && (
        <div className="p-8 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setView("choice")}
              className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 focus-visible:ring-2 focus-visible:ring-emerald-900"
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <p className="text-lg font-bold text-slate-900">
              Choose a scenario
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {scenarios.map((s) => (
              <DialogClose key={s.id} asChild>
                <button
                  type="button"
                  onClick={() => {
                    applyScenario(s.id);
                    setView("choice");
                  }}
                  className="w-full text-left rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all focus-visible:ring-2 focus-visible:ring-emerald-900"
                >
                  <p className="text-sm font-bold text-slate-900">{s.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {s.description}
                  </p>
                  <p className="text-xs text-emerald-700 font-medium mt-2">
                    {s.detail}
                  </p>
                </button>
              </DialogClose>
            ))}
          </div>
          <p className="text-[0.65rem] text-slate-400 text-center">
            Illustrative examples — you can edit after selecting.
          </p>
        </div>
      )}

      {/* Manual */}
      {view === "manual" && (
        <div className="p-8 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setView("choice")}
              className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 focus-visible:ring-2 focus-visible:ring-emerald-900"
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <p className="text-lg font-bold text-slate-900">Enter your own</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="careerBreakStartAge"
                className="text-xs font-medium text-slate-600"
              >
                Start age
              </Label>
              <Input
                id="careerBreakStartAge"
                type="number"
                placeholder="32"
                className={inputStyles}
                {...register("careerBreakStartAge", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="careerBreakEndAge"
                className="text-xs font-medium text-slate-600"
              >
                End age
              </Label>
              <Input
                id="careerBreakEndAge"
                type="number"
                placeholder="33"
                className={inputStyles}
                {...register("careerBreakEndAge", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-600">
                Income during this time
              </p>
              <p className="text-2xl font-bold text-slate-900 tabular-nums mt-1">
                {formatCurrency(incomeAmount)}
                <span className="text-sm font-normal text-slate-400 ml-1">
                  per year
                </span>
              </p>
            </div>
            <Slider
              id="income-slider"
              value={[incomeDuringBreak]}
              onValueChange={(vals) => setValue("incomeDuringBreak", vals[0])}
              min={0}
              max={100}
              step={1}
              aria-label="Income as a percentage of usual salary"
              aria-valuetext={`${incomeDuringBreak}% of usual salary`}
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>No income</span>
              <span className="font-medium text-emerald-700">
                {incomeDuringBreak}% of usual
              </span>
              <span>Full salary</span>
            </div>
          </div>

          <DialogClose asChild>
            <Button
              type="button"
              className="w-full h-12 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all text-sm font-semibold"
            >
              Save
            </Button>
          </DialogClose>
        </div>
      )}
    </DialogContent>
  );
}
