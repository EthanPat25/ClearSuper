"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
        <CardHeader className="pb-5">
          <CardTitle className="text-base font-semibold text-slate-900">
            Your details
          </CardTitle>
          <p className="text-xs text-slate-500 mt-1">
            Add your current details, then include any time off or reduced
            hours.
          </p>
        </CardHeader>

        <CardContent className="h-full flex flex-col pt-0">
          <form
            className="flex flex-col h-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label
                    htmlFor="age"
                    className="text-xs font-medium text-slate-700"
                  >
                    Your age
                  </Label>
                  <Input
                    id="age"
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

                <div className="space-y-3">
                  <Label
                    htmlFor="retire"
                    className="text-xs font-medium text-slate-700"
                  >
                    Retirement age
                  </Label>
                  <Input
                    id="retire"
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

              <div className="space-y-3">
                <Label
                  htmlFor="salary"
                  className="text-xs font-medium text-slate-700"
                >
                  Current salary
                </Label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-lg font-bold text-stone-400 pointer-events-none z-10">
                    $
                  </span>
                  <Input
                    id="salary"
                    type="text"
                    inputMode="numeric"
                    required
                    placeholder="75,000"
                    className={cn(inputStyles, "pl-10 pr-20")}
                    value={salary ? salary.toLocaleString() : ""}
                    onChange={(e) => handleFormattedInputChange(e, "salary")}
                  />
                  <span className="absolute right-4 text-[10px] font-semibold text-stone-500 uppercase tracking-wider pointer-events-none z-10">
                    per year
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="balance"
                  className="text-xs font-medium text-slate-700"
                >
                  Super balance
                </Label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-lg font-bold text-stone-400 pointer-events-none z-10">
                    $
                  </span>
                  <Input
                    id="balance"
                    type="text"
                    inputMode="numeric"
                    required
                    placeholder="50,000"
                    className={cn(inputStyles, "pl-10 pr-16")}
                    value={
                      watch("superBalance")
                        ? watch("superBalance").toLocaleString()
                        : ""
                    }
                    onChange={(e) =>
                      handleFormattedInputChange(e, "superBalance")
                    }
                  />
                  <span className="absolute right-4 text-[10px] font-semibold text-stone-500 uppercase tracking-wider pointer-events-none z-10">
                    current
                  </span>
                </div>
              </div>

              <div className="pt-6">
                <Dialog>
                  {!hasBreak ? (
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="w-full group flex items-center justify-between gap-3 border border-slate-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md hover:border-emerald-950 active:scale-[0.99] transition-all duration-200 text-left"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-[#f6f6f6] border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-colors">
                            <Pause responsiveSizing="w-[2rem] h-[2rem]" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900">
                              Time off or reduced hours
                            </p>
                            <p className="text-xs text-slate-400">None added</p>
                          </div>
                        </div>

                        <div className="bg-[#f6f6f6] inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-200 group-hover:text-emerald-700 transition-colors text-xs font-semibold text-slate-700 flex-shrink-0">
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
                          aria-label="Edit time off or reduced hours"
                        />
                      </DialogTrigger>

                      <div className="flex items-center gap-3 min-w-0 pointer-events-none">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900">
                            Time off or reduced hours
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
                          aria-label="Remove time off or reduced hours"
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
            </div>

            <div className="md:hidden mt-auto pt-8">
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
  const incomeAmount = salary * (incomeDuringBreak / 100);

  return (
    <DialogContent className="max-w-xl p-6 rounded-[2rem] gap-0">
      <DialogClose
        className="absolute top-5 right-5 z-50 p-1.5 rounded-lg text-rose-600 bg-rose-100 hover:bg-rose-200 transition-colors"
        aria-label="Close"
      >
        <IconX size={18} />
      </DialogClose>
      <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-slate-200 md:hidden" />

      <DialogHeader className="mb-6"></DialogHeader>

      <div className="space-y-7">
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Quick examples
          </p>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => applyScenario("yearOff")}
              className="w-full px-4 py-3.5 text-left rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors"
            >
              <div className="flex justify-start items-center gap-2">
                <div className="bg-indigo-200 rounded-xl p-3">
                  <svg
                    version="1.1"
                    id="fi_591576"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="h-[1.5rem] w-[1.5rem]"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                    enableBackground="new 0 0 512 512"
                    xmlSpace="preserve"
                  >
                    <path
                      fill="#BABABA"
                      d="M453.319,85.089c0-18.661-15.129-33.788-33.79-33.788h-21.994c-13.607,0-282.563,0-291.552,0
	c-8.235,0-61.508,0-72.194,0C15.13,51.301,0,66.429,0,85.089v385.738c0,9.658,4.059,18.362,10.556,24.52h408.973v9.269h59.186
	c14.542,0,26.938-9.188,31.702-22.076C514.365,472.105,515.761,492.056,453.319,85.089z"
                    ></path>
                    <path
                      fill="#A8A8A8"
                      d="M473.952,470.828v-251.26L453.319,85.089c0-18.661-15.129-33.788-33.79-33.788
	c-11.063,0-277.506,0-292.912,0h-20.633h-8.253c-19.112,0-12.683,0-43.307,0c-18.659,0-33.789,15.127-33.789,33.788v385.738
	c0,9.658,4.059,18.362,10.556,24.52h388.34v9.269h20.633C458.823,504.617,473.952,489.49,473.952,470.828z"
                    ></path>
                    <path
                      fill="#E6E6E6"
                      d="M419.529,51.301c-11.824,0-294.074,0-313.546,0c-11.658,0-64.312,0-72.194,0
	C15.13,51.301,0,66.429,0,85.089v385.738c0,18.662,15.13,33.789,33.789,33.789h385.739c18.661,0,33.79-15.127,33.79-33.789V85.089
	C453.319,66.429,438.189,51.301,419.529,51.301z"
                    ></path>
                    <path
                      fill="#CCCBCA"
                      d="M20.633,470.828V85.089c0-18.661,15.13-33.788,33.789-33.788c-11.63,0-8.966,0-20.633,0
	C15.13,51.301,0,66.429,0,85.089v385.738c0,18.662,15.13,33.789,33.789,33.789h20.633C35.764,504.617,20.633,489.49,20.633,470.828z
	"
                    ></path>
                    <path
                      fill="#EA473B"
                      d="M419.529,51.301c-13.424,0-291.141,0-313.546,0c-79.997,0,2.69,0-72.194,0
	C15.13,51.301,0,66.429,0,85.089v86.796h453.319V85.089C453.319,66.429,438.189,51.301,419.529,51.301z"
                    ></path>
                    <path
                      fill="#D63322"
                      d="M20.633,85.089c0-18.661,15.13-33.788,33.789-33.788c-11.63,0-8.966,0-20.633,0
	C15.13,51.301,0,66.429,0,85.089v86.796h20.633V85.089z"
                    ></path>
                    <g>
                      <path
                        fill="#414356"
                        d="M361.837,81.509v7.034c0,6.838-5.542,7.222-12.38,7.222h-4.127c-6.837,0-12.38-0.384-12.38-7.222
		V81.51c-6.546,4.568-10.833,12.15-10.833,20.738c0,13.96,11.317,25.276,25.276,25.276
		C372.15,127.523,381.984,95.569,361.837,81.509z"
                      ></path>
                      <path
                        fill="#414356"
                        d="M233.91,81.509v7.034c0,6.838-5.542,6.19-12.38,6.19h-4.127c-6.837,0-12.38,0.648-12.38-6.19V81.51
		c-6.546,4.568-10.833,12.15-10.833,20.738c0,13.96,11.317,25.276,25.276,25.276c13.96,0,25.276-11.316,25.276-25.276
		C244.742,93.66,240.455,86.077,233.91,81.509z"
                      ></path>
                      <path
                        fill="#414356"
                        d="M105.983,81.509v7.034c0,7.972-7.503,7.222-16.507,7.222c-6.837,0-12.38-0.384-12.38-7.222V81.51
		c-20.167,14.074-10.282,46.014,14.443,46.014c13.96,0,25.276-11.316,25.276-25.276C116.815,93.66,112.528,86.077,105.983,81.509z"
                      ></path>
                    </g>
                    <g>
                      <path
                        fill="#2F3242"
                        d="M343.783,102.248c0-0.479,0.018-0.953,0.044-1.425c-6.127-0.743-10.877-5.952-10.877-12.28V81.51
		c-6.546,4.568-10.833,12.15-10.833,20.738c0,13.96,11.317,25.276,25.276,25.276c3.877,0,7.549-0.875,10.833-2.436
		C349.687,121.031,343.783,112.33,343.783,102.248z"
                      ></path>
                      <path
                        fill="#2F3242"
                        d="M215.856,102.248c0-0.479,0.018-0.953,0.044-1.425c-6.127-0.743-10.877-5.952-10.877-12.28V81.51
		c-6.546,4.568-10.833,12.15-10.833,20.738c0,13.96,11.317,25.276,25.276,25.276c3.877,0,7.549-0.875,10.833-2.436
		C221.76,121.031,215.856,112.33,215.856,102.248z"
                      ></path>
                      <path
                        fill="#2F3242"
                        d="M87.973,100.823c-6.127-0.743-10.877-5.952-10.877-12.28V81.51
		c-6.546,4.568-10.833,12.15-10.833,20.738c0,18.616,19.444,30.759,36.108,22.84C93.317,120.785,87.387,111.38,87.973,100.823z"
                      ></path>
                    </g>
                    <rect
                      y="171.881"
                      fill="#F77C79"
                      width="453.32"
                      height="28.887"
                    ></rect>
                    <rect
                      y="171.881"
                      fill="#DD6464"
                      width="20.633"
                      height="28.887"
                    ></rect>
                    <path
                      id="SVGCleanerId_0"
                      fill="#585A60"
                      d="M93.603,7.385c6.838,0,12.38,5.543,12.38,12.38v68.778
	c0,6.838-5.542,12.38-12.38,12.38h-4.127c-6.837,0-12.38-5.542-12.38-12.38V19.765c0-6.837,5.543-12.38,12.38-12.38H93.603z"
                    ></path>
                    <path
                      id="SVGCleanerId_1"
                      fill="#585A60"
                      d="M221.53,7.385c6.838,0,12.38,5.543,12.38,12.38v68.778
	c0,6.838-5.542,12.38-12.38,12.38h-4.127c-6.837,0-12.38-5.542-12.38-12.38V19.765c0-6.837,5.543-12.38,12.38-12.38H221.53z"
                    ></path>
                    <path
                      id="SVGCleanerId_2"
                      fill="#585A60"
                      d="M349.457,7.385c6.838,0,12.38,5.543,12.38,12.38v68.778
	c0,6.838-5.542,12.38-12.38,12.38h-4.127c-6.837,0-12.38-5.542-12.38-12.38V19.765c0-6.837,5.543-12.38,12.38-12.38H349.457z"
                    ></path>
                    <g>
                      <path
                        id="SVGCleanerId_0_1_"
                        fill="#585A60"
                        d="M93.603,7.385c6.838,0,12.38,5.543,12.38,12.38v68.778
		c0,6.838-5.542,12.38-12.38,12.38h-4.127c-6.837,0-12.38-5.542-12.38-12.38V19.765c0-6.837,5.543-12.38,12.38-12.38H93.603z"
                      ></path>
                    </g>
                    <g>
                      <path
                        id="SVGCleanerId_1_1_"
                        fill="#585A60"
                        d="M221.53,7.385c6.838,0,12.38,5.543,12.38,12.38v68.778
		c0,6.838-5.542,12.38-12.38,12.38h-4.127c-6.837,0-12.38-5.542-12.38-12.38V19.765c0-6.837,5.543-12.38,12.38-12.38H221.53z"
                      ></path>
                    </g>
                    <g>
                      <path
                        id="SVGCleanerId_2_1_"
                        fill="#585A60"
                        d="M349.457,7.385c6.838,0,12.38,5.543,12.38,12.38v68.778
		c0,6.838-5.542,12.38-12.38,12.38h-4.127c-6.837,0-12.38-5.542-12.38-12.38V19.765c0-6.837,5.543-12.38,12.38-12.38H349.457z"
                      ></path>
                    </g>
                    <g>
                      <path
                        fill="#414356"
                        d="M91.539,88.543V19.765c0-4.994,2.964-9.286,7.222-11.244c-1.572-0.722-3.315-1.136-5.158-1.136
		h-4.127c-6.837,0-12.38,5.543-12.38,12.38v68.778c0,6.838,5.543,12.38,12.38,12.38h4.127c1.844,0,3.587-0.414,5.158-1.136
		C94.503,97.83,91.539,93.537,91.539,88.543z"
                      ></path>
                      <path
                        fill="#414356"
                        d="M219.466,88.543V19.765c0-4.994,2.964-9.286,7.222-11.244c-1.572-0.722-3.315-1.136-5.158-1.136
		h-4.127c-6.837,0-12.38,5.543-12.38,12.38v68.778c0,6.838,5.543,12.38,12.38,12.38h4.127c1.844,0,3.587-0.414,5.158-1.136
		C222.43,97.83,219.466,93.537,219.466,88.543z"
                      ></path>
                      <path
                        fill="#414356"
                        d="M347.393,88.543V19.765c0-4.994,2.964-9.286,7.222-11.244c-1.572-0.722-3.315-1.136-5.158-1.136
		h-4.127c-6.837,0-12.38,5.543-12.38,12.38v68.778c0,6.838,5.543,12.38,12.38,12.38h4.127c1.844,0,3.587-0.414,5.158-1.136
		C350.357,97.83,347.393,93.537,347.393,88.543z"
                      ></path>
                    </g>
                    <g>
                      <path
                        fill="#585A60"
                        d="M168.606,248.179h-25.474c-4.273,0-7.738,3.464-7.738,7.738c0,4.273,3.465,7.738,7.738,7.738h25.474
		c4.274,0,7.738-3.464,7.738-7.738C176.344,251.644,172.88,248.179,168.606,248.179z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M239.427,248.179H213.95c-4.273,0-7.738,3.464-7.738,7.738c0,4.273,3.465,7.738,7.738,7.738h25.477
		c4.274,0,7.738-3.464,7.738-7.738C247.164,251.644,243.701,248.179,239.427,248.179z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M310.247,248.179h-25.478c-4.273,0-7.738,3.464-7.738,7.738c0,4.273,3.465,7.738,7.738,7.738h25.478
		c4.273,0,7.738-3.464,7.738-7.738C317.985,251.644,314.52,248.179,310.247,248.179z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M381.065,248.179h-25.477c-4.273,0-7.738,3.464-7.738,7.738c0,4.273,3.465,7.738,7.738,7.738h25.477
		c4.274,0,7.738-3.464,7.738-7.738C388.802,251.644,385.339,248.179,381.065,248.179z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M97.789,310.519H72.312c-4.273,0-7.738,3.464-7.738,7.738c0,4.273,3.465,7.738,7.738,7.738h25.477
		c4.274,0,7.738-3.464,7.738-7.738C105.526,313.983,102.063,310.519,97.789,310.519z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M168.606,310.519h-25.474c-4.273,0-7.738,3.464-7.738,7.738c0,4.273,3.465,7.738,7.738,7.738h25.474
		c4.274,0,7.738-3.464,7.738-7.738C176.344,313.983,172.88,310.519,168.606,310.519z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M239.427,310.519H213.95c-4.273,0-7.738,3.464-7.738,7.738c0,4.273,3.465,7.738,7.738,7.738h25.477
		c4.274,0,7.738-3.464,7.738-7.738C247.164,313.983,243.701,310.519,239.427,310.519z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M310.247,310.519h-25.478c-4.273,0-7.738,3.464-7.738,7.738c0,4.273,3.465,7.738,7.738,7.738h25.478
		c4.273,0,7.738-3.464,7.738-7.738C317.985,313.983,314.52,310.519,310.247,310.519z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M381.065,310.519h-25.477c-4.273,0-7.738,3.464-7.738,7.738c0,4.273,3.465,7.738,7.738,7.738h25.477
		c4.274,0,7.738-3.464,7.738-7.738C388.802,313.983,385.339,310.519,381.065,310.519z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M97.789,372.859H72.312c-4.273,0-7.738,3.464-7.738,7.738s3.465,7.738,7.738,7.738h25.477
		c4.274,0,7.738-3.464,7.738-7.738S102.063,372.859,97.789,372.859z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M168.606,372.859h-25.474c-4.273,0-7.738,3.464-7.738,7.738s3.465,7.738,7.738,7.738h25.474
		c4.274,0,7.738-3.464,7.738-7.738S172.88,372.859,168.606,372.859z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M239.427,372.859H213.95c-4.273,0-7.738,3.464-7.738,7.738s3.465,7.738,7.738,7.738h25.477
		c4.274,0,7.738-3.464,7.738-7.738S243.701,372.859,239.427,372.859z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M310.247,372.859h-25.478c-4.273,0-7.738,3.464-7.738,7.738s3.465,7.738,7.738,7.738h25.478
		c4.273,0,7.738-3.464,7.738-7.738S314.52,372.859,310.247,372.859z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M381.065,372.859h-25.477c-4.273,0-7.738,3.464-7.738,7.738s3.465,7.738,7.738,7.738h25.477
		c4.274,0,7.738-3.464,7.738-7.738S385.339,372.859,381.065,372.859z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M97.789,435.2H72.312c-4.273,0-7.738,3.464-7.738,7.738c0,4.273,3.465,7.738,7.738,7.738h25.477
		c4.274,0,7.738-3.464,7.738-7.738C105.526,438.664,102.063,435.2,97.789,435.2z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M168.606,435.2h-25.474c-4.273,0-7.738,3.464-7.738,7.738c0,4.273,3.465,7.738,7.738,7.738h25.474
		c4.274,0,7.738-3.464,7.738-7.738C176.344,438.664,172.88,435.2,168.606,435.2z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M239.427,435.2H213.95c-4.273,0-7.738,3.464-7.738,7.738c0,4.273,3.465,7.738,7.738,7.738h25.477
		c4.274,0,7.738-3.464,7.738-7.738C247.164,438.664,243.701,435.2,239.427,435.2z"
                      ></path>
                      <path
                        fill="#585A60"
                        d="M310.247,435.2h-25.478c-4.273,0-7.738,3.464-7.738,7.738c0,4.273,3.465,7.738,7.738,7.738h25.478
		c4.273,0,7.738-3.464,7.738-7.738C317.985,438.664,314.52,435.2,310.247,435.2z"
                      ></path>
                    </g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                  </svg>
                </div>
                <div className="flex-col">
                  <p className="text-sm font-semibold text-slate-900">
                    Taking a year off
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    No paid work for 12 months
                  </p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => applyScenario("partTime")}
              className="w-full px-4 py-3.5 text-left rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors"
            >
              <div className="flex justify-start items-center gap-2">
                <div className="bg-indigo-200 rounded-xl p-3">
                  <svg
                    id="fi_4593182"
                    enable-background="new 0 0 512 512"
                    height="512"
                    viewBox="0 0 512 512"
                    className="h-[1.5rem] w-[1.5rem]"
                    width="512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <g>
                        <g>
                          <path
                            d="m147.772 20.813v35.382h33.301v-18.894c0-2.209 1.791-4 4-4h141.854c2.209 0 4 1.791 4 4v18.894h33.301v-35.382c0-11.495-9.319-20.813-20.813-20.813h-174.83c-11.494 0-20.813 9.318-20.813 20.813z"
                            fill="#9c9c9c"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m330.927 37.301v18.894h33.301v-22.894h-37.301c2.209 0 4 1.791 4 4z"
                            fill="#838383"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m147.772 56.195h33.301v-18.894c0-2.209 1.791-4 4-4h-37.301z"
                            fill="#838383"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m199.805 64.52v24.976h-70.764v-24.976c0-4.598 3.727-8.325 8.325-8.325h54.114c4.598 0 8.325 3.727 8.325 8.325z"
                            fill="#ffe07d"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m447.48 412.098h-382.96c-11.495 0-20.813-9.318-20.813-20.813v-202.927h424.585v202.927c.001 11.494-9.318 20.813-20.812 20.813z"
                            fill="#30569f"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m468.293 391.285v-202.927h-33.301v202.927c0 11.495-9.318 20.813-20.813 20.813h33.301c11.494 0 20.813-9.319 20.813-20.813z"
                            fill="#26447e"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m447.48 89.496h-382.96c-11.495 0-20.813 9.318-20.813 20.813v86.371c0 10.202 7.395 18.9 17.464 20.542l174.016 28.372h41.626l174.016-28.372c10.069-1.642 17.464-10.34 17.464-20.542v-86.371c0-11.495-9.319-20.813-20.813-20.813z"
                            fill="#4172ca"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m434.992 110.309v109.494l15.837-2.582c10.069-1.642 17.464-10.34 17.464-20.542v-86.371c0-11.495-9.318-20.813-20.813-20.813h-33.301c11.495.001 20.813 9.319 20.813 20.814z"
                            fill="#3a67c1"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m312.195 64.52v24.976h70.764v-24.976c0-4.598-3.727-8.325-8.325-8.325h-54.114c-4.598 0-8.325 3.727-8.325 8.325z"
                            fill="#ffe07d"
                          ></path>
                        </g>
                      </g>
                      <g>
                        <g>
                          <circle
                            cx="256"
                            cy="366.309"
                            fill="#91dafa"
                            r="145.691"
                          ></circle>
                        </g>
                        <g>
                          <path
                            d="m329.019 240.216c12.46 21.469 19.599 46.41 19.599 73.019 0 80.463-65.228 145.691-145.691 145.691-26.61 0-51.55-7.139-73.019-19.598 25.215 43.45 72.239 72.672 126.092 72.672 80.463 0 145.691-65.228 145.691-145.691 0-53.853-29.222-100.877-72.672-126.093z"
                            fill="#75cff9"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m340.57 423.796c-3.587-2.07-4.816-6.657-2.745-10.245 2.07-3.588 6.656-4.815 10.245-2.745l8.781 5.069c6.336-12.839 10.289-27.054 11.283-42.066h-10.151c-4.143 0-7.5-3.357-7.5-7.5s3.357-7.5 7.5-7.5h10.151c-.994-15.012-4.947-29.226-11.283-42.065l-8.781 5.069c-1.182.682-2.471 1.006-3.743 1.006-2.592 0-5.113-1.345-6.502-3.751-2.071-3.588-.842-8.175 2.745-10.245l8.763-5.059c-8.167-12.147-18.64-22.62-30.787-30.787l-5.059 8.762c-1.389 2.406-3.91 3.751-6.502 3.751-1.272 0-2.562-.324-3.743-1.006-3.587-2.071-4.816-6.658-2.745-10.245l5.069-8.78c-12.839-6.336-27.054-10.289-42.066-11.283v10.15c0 4.143-3.357 7.5-7.5 7.5s-7.5-3.357-7.5-7.5v-10.15c-15.012.994-29.227 4.948-42.066 11.283l5.069 8.78c2.071 3.587.842 8.174-2.745 10.245-1.181.682-2.471 1.006-3.743 1.006-2.592 0-5.112-1.345-6.502-3.751l-5.059-8.762c-12.147 8.167-22.62 18.64-30.787 30.787l8.763 5.059c3.587 2.07 4.816 6.657 2.745 10.245-1.389 2.406-3.91 3.751-6.502 3.751-1.272 0-2.562-.324-3.743-1.006l-8.781-5.069c-6.336 12.839-10.289 27.053-11.283 42.065h10.151c4.143 0 7.5 3.357 7.5 7.5s-3.357 7.5-7.5 7.5h-10.151c.994 15.012 4.947 29.227 11.283 42.066l8.781-5.069c3.589-2.069 8.175-.843 10.245 2.745 2.071 3.588.842 8.175-2.745 10.245l-8.763 5.059c8.167 12.147 18.64 22.62 30.787 30.787l5.059-8.762c2.07-3.588 6.658-4.815 10.245-2.745 3.587 2.071 4.816 6.658 2.745 10.245l-5.069 8.78c12.839 6.336 27.054 10.289 42.066 11.283v-10.15c0-4.143 3.357-7.5 7.5-7.5s7.5 3.357 7.5 7.5v10.15c15.012-.994 29.227-4.947 42.066-11.283l-5.069-8.78c-2.071-3.587-.842-8.174 2.745-10.245 3.585-2.069 8.174-.843 10.245 2.745l5.059 8.762c12.147-8.167 22.62-18.64 30.787-30.787z"
                            fill="#f5fcff"
                          ></path>
                        </g>
                        <g>
                          <g>
                            <path
                              d="m340.57 423.796c-3.587-2.07-4.816-6.657-2.745-10.245 2.07-3.588 6.656-4.815 10.245-2.745l8.781 5.069c6.336-12.839 10.289-27.054 11.283-42.066h-10.151c-4.143 0-7.5-3.357-7.5-7.5s3.357-7.5 7.5-7.5h10.141c-.995-15.011-4.939-29.226-11.277-42.063l-8.477 4.894c-4.196 73.77-63.271 132.845-137.041 137.041l-4.894 8.476c12.838 6.337 27.053 10.281 42.064 11.277v-10.14c0-4.143 3.357-7.5 7.5-7.5s7.5 3.357 7.5 7.5v10.15c15.012-.994 29.227-4.947 42.066-11.283l-5.069-8.78c-2.071-3.587-.842-8.174 2.745-10.245 3.585-2.069 8.174-.843 10.245 2.745l5.059 8.762c12.147-8.167 22.62-18.64 30.787-30.787z"
                              fill="#e6f7fe"
                            ></path>
                          </g>
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="m256 271.825c4.143 0 7.5-3.357 7.5-7.5v-9.895c-2.48-.164-4.979-.255-7.5-.255s-5.02.092-7.5.255v9.895c0 4.143 3.357 7.5 7.5 7.5z"
                            fill="#4172ca"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m198.513 281.738c1.39 2.406 3.91 3.751 6.502 3.751 1.272 0 2.562-.324 3.743-1.006 3.587-2.071 4.816-6.658 2.745-10.245l-4.958-8.588c-4.507 2.219-8.845 4.727-12.986 7.508z"
                            fill="#4172ca"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m206.545 466.968 4.958-8.588c2.071-3.587.842-8.174-2.745-10.245-3.587-2.07-8.175-.843-10.245 2.745l-4.954 8.58c4.141 2.781 8.479 5.289 12.986 7.508z"
                            fill="#4172ca"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m348.07 410.806c-3.589-2.07-8.175-.843-10.245 2.745-2.071 3.588-.842 8.175 2.745 10.245l8.581 4.954c2.781-4.141 5.29-8.479 7.508-12.986z"
                            fill="#4172ca"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m337.825 319.067c1.389 2.406 3.91 3.751 6.502 3.751 1.272 0 2.562-.324 3.743-1.006l8.589-4.958c-2.219-4.507-4.727-8.845-7.508-12.986l-8.581 4.954c-3.587 2.071-4.816 6.657-2.745 10.245z"
                            fill="#4172ca"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m350.483 366.309c0 4.143 3.357 7.5 7.5 7.5h9.895c.164-2.479.255-4.979.255-7.5s-.092-5.021-.255-7.5h-9.895c-4.142 0-7.5 3.357-7.5 7.5z"
                            fill="#4172ca"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m305.456 265.65-4.958 8.588c-2.071 3.587-.842 8.174 2.745 10.245 1.181.682 2.471 1.006 3.743 1.006 2.592 0 5.113-1.345 6.502-3.751l4.954-8.58c-4.141-2.781-8.48-5.289-12.986-7.508z"
                            fill="#4172ca"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m161.517 366.309c0-4.143-3.357-7.5-7.5-7.5h-9.895c-.164 2.48-.255 4.979-.255 7.5s.092 5.02.255 7.5h9.895c4.142 0 7.5-3.358 7.5-7.5z"
                            fill="#4172ca"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m171.43 423.796c3.587-2.07 4.816-6.657 2.745-10.245-2.07-3.588-6.656-4.814-10.245-2.745l-8.589 4.958c2.219 4.507 4.727 8.845 7.508 12.986z"
                            fill="#4172ca"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m313.487 450.88c-2.071-3.588-6.66-4.814-10.245-2.745-3.587 2.071-4.816 6.658-2.745 10.245l4.958 8.588c4.507-2.219 8.845-4.727 12.986-7.508z"
                            fill="#4172ca"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m263.5 478.188v-9.895c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v9.895c2.48.164 4.979.256 7.5.256s5.02-.093 7.5-.256z"
                            fill="#4172ca"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="m163.93 321.812c1.182.682 2.471 1.006 3.743 1.006 2.592 0 5.113-1.345 6.502-3.751 2.071-3.588.842-8.175-2.745-10.245l-8.581-4.954c-2.781 4.141-5.289 8.479-7.508 12.986z"
                            fill="#4172ca"
                          ></path>
                        </g>
                      </g>
                      <g>
                        <path
                          d="m256 373.809c-4.143 0-7.5-3.357-7.5-7.5v-68.683c0-4.143 3.357-7.5 7.5-7.5s7.5 3.357 7.5 7.5v68.683c0 4.142-3.357 7.5-7.5 7.5z"
                          fill="#df646e"
                        ></path>
                      </g>
                      <g>
                        <path
                          d="m256 373.809h-49.951c-4.143 0-7.5-3.357-7.5-7.5s3.357-7.5 7.5-7.5h49.951c4.143 0 7.5 3.357 7.5 7.5s-3.357 7.5-7.5 7.5z"
                          fill="#df646e"
                        ></path>
                      </g>
                      <g>
                        <circle
                          cx="256"
                          cy="366.309"
                          fill="#75cff9"
                          r="16.65"
                        ></circle>
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-slate-900">
                    Working part-time
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Common for caring, study or family reasons
                  </p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => applyScenario("fourDay")}
              className="w-full px-4 py-3.5 text-left rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors"
            >
              <div className="flex justify-start items-center gap-2">
                <div className="bg-indigo-200 rounded-xl p-3">
                  <svg
                    id="fi_3200159"
                    enable-background="new 0 0 512 512"
                    height="512"
                    viewBox="0 0 512 512"
                    width="512"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[1.5rem] w-[1.5rem]"
                  >
                    <g>
                      <path
                        d="m472.252 148.077h-438.223l-13.097 11.556v333.318c0 10.521 8.529 19.049 19.049 19.049h432.037c10.521 0 19.049-8.529 19.049-19.049v-333.319z"
                        fill="#ecf4ff"
                      ></path>
                      <path
                        d="m75.103 492.951v-333.319l13.097-11.555h-54.171l-13.097 11.556v333.318c0 10.521 8.529 19.049 19.049 19.049h54.171c-10.52 0-19.049-8.529-19.049-19.049z"
                        fill="#cbe2ff"
                      ></path>
                      <path
                        d="m498.271 53.211h-435.371c-7.582 0-13.729 6.146-13.729 13.729v78.964c0 7.582 6.146 13.729 13.729 13.729h435.372c7.582 0 13.729-6.146 13.729-13.729v-78.964c-.001-7.583-6.148-13.729-13.73-13.729z"
                        fill="#f27182"
                      ></path>
                      <path
                        d="m54.171 145.904v-78.964c0-7.582 6.146-13.729 13.729-13.729h-54.171c-7.583 0-13.729 6.146-13.729 13.729v78.964c0 7.582 6.146 13.729 13.729 13.729h54.171c-7.583-.001-13.729-6.147-13.729-13.729z"
                        fill="#ed5469"
                      ></path>
                      <g>
                        <path
                          d="m327.426 114.148h-142.852c-4.267 0-7.726-3.459-7.726-7.726s3.459-7.726 7.726-7.726h142.852c4.267 0 7.726 3.459 7.726 7.726s-3.459 7.726-7.726 7.726z"
                          fill="#ed5469"
                        ></path>
                      </g>
                      <path
                        d="m320.012 350.317h-23.923c-1.667 0-3.017-1.351-3.017-3.017v-120.561c0-21.068-26.767-30.098-39.603-13.575l-111.189 143.125c-7.872 10.134-.627 24.933 12.203 24.933h104.666c1.666 0 3.017 1.351 3.017 3.017v64.832c0 8.321 6.394 15.48 14.705 15.872 8.874.418 16.2-6.653 16.2-15.435v-65.269c0-1.666 1.351-3.017 3.017-3.017h24.36c8.782 0 15.853-7.326 15.435-16.2-.391-8.311-7.551-14.705-15.871-14.705zm-57.846-3.017c0 1.667-1.351 3.017-3.017 3.017h-66.929c-2.51 0-3.923-2.886-2.383-4.868l66.929-86.153c1.763-2.269 5.4-1.023 5.4 1.851z"
                        fill="#80b4fb"
                      ></path>
                      <g fill="#61a2f9">
                        <path d="m259.149 350.317h18.543c1.666 0 3.017-1.351 3.017-3.017v-106.937c0-2.874-3.637-4.12-5.4-1.851l-15.435 19.713c1.243.313 2.292 1.379 2.292 2.921v86.154c0 1.666-1.351 3.017-3.017 3.017z"></path>
                        <path d="m280.709 449.072v-64.832c0-1.667-1.351-3.017-3.017-3.017h-18.543c1.666 0 3.017 1.351 3.017 3.017v64.832c0 8.321 6.394 15.48 14.705 15.872 3.796.179 7.303-1.021 10.08-3.13-3.808-2.935-6.242-7.615-6.242-12.742z"></path>
                        <path d="m160.823 356.289 111.189-143.126c2.314-2.979 5.084-5.115 8.065-6.512-8.654-3.875-19.666-2.425-26.608 6.512l-111.189 143.126c-7.872 10.134-.627 24.933 12.203 24.933h18.543c-12.83 0-20.075-14.799-12.203-24.933z"></path>
                      </g>
                      <g fill="#ffe07d">
                        <path d="m58.736 0h-9.13c-5.444 0-9.858 4.413-9.858 9.858v69.537c0 5.444 4.413 9.858 9.858 9.858h9.13c5.444 0 9.857-4.413 9.857-9.858v-69.537c0-5.445-4.413-9.858-9.857-9.858z"></path>
                        <path d="m116.426 0h-9.13c-5.444 0-9.858 4.413-9.858 9.858v69.537c0 5.444 4.413 9.858 9.858 9.858h9.13c5.444 0 9.857-4.413 9.857-9.858v-69.537c0-5.445-4.413-9.858-9.857-9.858z"></path>
                        <path d="m404.705 0h-9.13c-5.444 0-9.858 4.413-9.858 9.858v69.537c0 5.444 4.413 9.858 9.858 9.858h9.13c5.444 0 9.857-4.413 9.857-9.858v-69.537c0-5.445-4.413-9.858-9.857-9.858z"></path>
                        <path d="m462.395 0h-9.13c-5.444 0-9.858 4.413-9.858 9.858v69.537c0 5.444 4.413 9.858 9.858 9.858h9.13c5.444 0 9.857-4.413 9.857-9.858v-69.537c0-5.445-4.413-9.858-9.857-9.858z"></path>
                      </g>
                      <path
                        d="m54.171 79.395v-69.537c0-4.526 3.055-8.33 7.211-9.488-.843-.235-1.727-.37-2.646-.37h-9.13c-5.444 0-9.858 4.413-9.858 9.858v69.537c0 5.444 4.413 9.858 9.858 9.858h9.13c.918 0 1.803-.135 2.646-.37-4.157-1.158-7.211-4.962-7.211-9.488z"
                        fill="#ffd064"
                      ></path>
                      <path
                        d="m111.861 79.395v-69.537c0-4.526 3.055-8.33 7.212-9.488-.844-.235-1.729-.37-2.647-.37h-9.13c-5.444 0-9.858 4.413-9.858 9.858v69.537c0 5.444 4.413 9.858 9.858 9.858h9.13c.918 0 1.803-.135 2.646-.37-4.157-1.158-7.211-4.962-7.211-9.488z"
                        fill="#ffd064"
                      ></path>
                      <path
                        d="m400.139 79.395v-69.537c0-4.526 3.054-8.33 7.212-9.488-.843-.235-1.728-.37-2.646-.37h-9.13c-5.444 0-9.858 4.413-9.858 9.858v69.537c0 5.444 4.413 9.858 9.858 9.858h9.13c.918 0 1.803-.135 2.646-.37-4.157-1.158-7.212-4.962-7.212-9.488z"
                        fill="#ffd064"
                      ></path>
                      <path
                        d="m457.829 79.395v-69.537c0-4.526 3.054-8.33 7.212-9.488-.843-.235-1.728-.37-2.646-.37h-9.13c-5.444 0-9.858 4.413-9.858 9.858v69.537c0 5.444 4.413 9.858 9.858 9.858h9.13c.918 0 1.803-.135 2.646-.37-4.157-1.158-7.212-4.962-7.212-9.488z"
                        fill="#ffd064"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-slate-900">
                    Working a 4-day week
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    About 80% of your usual income
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
            or enter your own
          </span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-slate-700">
                Start age
              </Label>
              <Input
                type="number"
                placeholder="32"
                className={inputStyles}
                {...register("careerBreakStartAge", { valueAsNumber: true })}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium text-slate-700">
                End age
              </Label>
              <Input
                type="number"
                placeholder="33"
                className={inputStyles}
                {...register("careerBreakEndAge", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="space-y-3 rounded-2xl bg-slate-50 border border-slate-100 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <Label
                  htmlFor="income-slider"
                  className="text-sm font-semibold text-slate-900"
                >
                  Income during this time
                </Label>

                <p className="text-xl font-bold text-slate-900 tabular-nums mt-1">
                  {formatCurrency(incomeAmount)} per year
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-700 tabular-nums bg-white px-3 py-1.5 rounded-full border border-emerald-100 whitespace-nowrap">
                {incomeDuringBreak}% of usual
              </span>
            </div>

            <div className="px-1 pt-2">
              <Slider
                id="income-slider"
                value={[incomeDuringBreak]}
                onValueChange={(vals) => setValue("incomeDuringBreak", vals[0])}
                min={0}
                max={100}
                step={1}
              />
            </div>

            <div className="flex justify-between text-xs font-medium text-slate-500 px-1">
              <span>No income</span>
              <span>Usual income</span>
            </div>
          </div>
        </div>

        <div className="pt-1">
          <DialogClose asChild>
            <Button
              type="button"
              className="w-full h-12 rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition-all text-sm font-semibold"
            >
              Save
            </Button>
          </DialogClose>
        </div>
      </div>
    </DialogContent>
  );
}
