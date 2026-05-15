import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Info } from "lucide-react";
import { Slide } from "./Slider";
import { useForm, SubmitHandler } from "react-hook-form";
import { projectInvestmentGrowth } from "./Forumula2";
import { Calendar28 } from "./Calendar";
import Link from "next/link";

export type Inputs = {
  currentAge: number;
  retireAge: number;
  salary: number;
  superSG: number;
  superBalance: number;
  superReturn: number;
  careerBreakStartAge?: number | null;
  careerBreakEndAge?: number | null;
  incomeDuringBreak?: number | null;
};

export function Calc({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { register, handleSubmit, watch, setValue } = useForm<Inputs>({
    defaultValues: {
      currentAge: 25,
      retireAge: 65,
      superSG: 11.5,
      superReturn: 7,
    },
  });

  const age = watch("currentAge");

  // Median super balance by age (Approx ABS/ASFA 2024 data)
  const medianBalances: Record<number, number> = {
    20: 5000,
    25: 15000,
    30: 45000,
    35: 80000,
    40: 120000,
    45: 170000,
    50: 220000,
    55: 290000,
    60: 360000,
    65: 420000,
  };

  const getMedian = (currentAge: number) => {
    const roundedAge = Math.floor(Number(currentAge) / 5) * 5;
    return medianBalances[roundedAge] || null;
  };

  const median = getMedian(age);

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    console.log(projectInvestmentGrowth(data));

  return (
    <div
      className={cn("flex flex-col gap-4 xs:mb-16 md:mb-0", className)}
      {...props}
    >
      <Card className="xs:w-[28rem] md:w-[31.75rem] min-h-[640px] relative flex flex-col shadow-sm">
        {/* Settings */}
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Super Gap Calculator
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            See how time off or reduced hours compare to staying full-time.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between pt-0">
          <form
            className="flex flex-col h-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Age */}
                <div className="space-y-1">
                  <Label
                    htmlFor="age"
                    className="text-sm font-medium text-gray-900"
                  >
                    Your Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    required
                    placeholder="23"
                    className="h-10 text-sm font-normal text-gray-900"
                    {...register("currentAge", { required: true })}
                  />
                </div>

                {/* Retirement Age */}
                <div className="space-y-1">
                  <Label
                    htmlFor="retire"
                    className="text-sm font-medium text-gray-900"
                  >
                    Retirement Age
                  </Label>
                  <Input
                    id="retire"
                    type="number"
                    required
                    placeholder="65"
                    className="h-10 text-sm font-normal text-gray-900"
                    {...register("retireAge", { required: true })}
                  />
                </div>

                {/* Salary */}
                <div className="space-y-1">
                  <Label
                    htmlFor="salary"
                    className="text-sm font-medium text-gray-900"
                  >
                    Current Salary
                  </Label>
                  <div className="relative">
                    <Input
                      id="salary"
                      type="number"
                      required
                      placeholder="70,000"
                      className="pl-7 h-10 text-sm font-normal text-gray-900"
                      {...register("salary", { required: true })}
                    />
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      $
                    </span>
                  </div>
                </div>

                {/* Super Balance */}
                <div className="space-y-1">
                  <div className="flex justify-between items-end">
                    <Label
                      htmlFor="balance"
                      className="text-sm font-medium text-gray-900"
                    >
                      Super Balance
                    </Label>
                    {median && (
                      <button
                        type="button"
                        onClick={() => setValue("superBalance", median)}
                        className="text-[10px] font-semibold text-emerald-600 hover:underline"
                      >
                        Use Median (${median.toLocaleString()})
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      id="balance"
                      type="number"
                      required
                      placeholder="10,000"
                      className="pl-7 h-10 text-sm font-normal text-gray-900"
                      {...register("superBalance", { required: true })}
                    />
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                      $
                    </span>
                  </div>
                </div>
              </div>

              {/* Accordion for breaks and advanced settings */}
              <div className="col-span-2 space-y-2">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="career-break" className="border-b-0">
                    <AccordionTrigger className="hover:no-underline py-2">
                      <div className="flex items-center gap-2">
                        <Plus className="w-4 h-4 text-gray-700" />
                        <span className="text-sm font-medium text-gray-900">
                          Add a career break or reduced hours
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 bg-gray-50 rounded-lg p-4">
                        <Calendar28
                          SubscriptionDate="Start Age"
                          defaultDate={new Date()}
                        />
                        <Calendar28
                          SubscriptionDate={"End Age"}
                          defaultDate={
                            new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() + 1,
                              ),
                            )
                          }
                        />
                        <div className="col-span-2 space-y-2">
                          <div className="flex justify-between items-center mb-2">
                            <Label className="text-sm font-medium text-gray-900">
                              Workload During Break
                            </Label>
                            <span className="text-xs font-medium text-gray-500">
                              0% of salary
                            </span>
                          </div>
                          <Slide className="w-full" />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="advanced" className="border-b-0">
                    <AccordionTrigger className="hover:no-underline py-2">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-500">
                          Advanced Model Settings
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2">
                      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50/50 rounded-lg border border-dashed">
                        <div className="space-y-1">
                          <Label
                            htmlFor="sg"
                            className="text-xs font-medium text-gray-600"
                          >
                            Super SG %
                          </Label>
                          <div className="relative">
                            <Input
                              id="sg"
                              type="number"
                              defaultValue={11.5}
                              className="h-9 text-xs"
                              {...register("superSG")}
                            />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">
                              %
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label
                            htmlFor="return"
                            className="text-xs font-medium text-gray-600"
                          >
                            Est. Return %
                          </Label>
                          <div className="relative">
                            <Input
                              id="return"
                              type="number"
                              step="any"
                              defaultValue={7}
                              className="h-9 text-xs"
                              {...register("superReturn")}
                            />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <Button type="submit" className="w-full">
                Calculate
              </Button>
              <p className="text-[10px] text-center text-gray-400 mt-4">
                This is a model, not financial advice.{" "}
                <Link href="/about" className="underline">
                  Read disclaimer
                </Link>
                .
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
