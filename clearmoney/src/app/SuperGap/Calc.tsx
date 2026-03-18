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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

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
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    console.log(projectInvestmentGrowth(data));

  return (
    <div
      className={cn("flex flex-col gap-4 xs:mb-16 md:mb-0", className)}
      {...props}
    >
      <Card className="xs:w-[28rem] md:w-[31.75rem] relative flex flex-col">
        {/* Settings */}
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Super Gap Calculator
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            See how time off or reduced hours compare to staying full-time.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <form
            className="h-[34rem] flex flex-col justify-between"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Age */}
              <div className="space-y-1">
                <Label
                  htmlFor="age"
                  className="text-sm font-medium text-gray-900"
                >
                  Your Age (min: 18)
                </Label>
                <Input
                  id="age"
                  type="number"
                  required
                  placeholder="23"
                  className="h-10 text-sm font-normal text-gray-900 placeholder:text-gray-400"
                  {...register("currentAge", { required: true })}
                />
              </div>

              {/* Retirement Age */}
              <div className="space-y-1">
                <Label
                  htmlFor="retire"
                  className="text-sm font-medium text-gray-900"
                >
                  Retirement Age (min: 60)
                </Label>
                <Input
                  id="retire"
                  type="number"
                  required
                  placeholder="65"
                  className="h-10 text-sm font-normal text-gray-900 placeholder:text-gray-400"
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
                    className="pl-[1.3rem] h-10 text-sm font-normal text-gray-900 placeholder:text-gray-400"
                    {...register("salary", { required: true })}
                  />
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm">
                    $
                  </span>
                </div>
              </div>

              {/* Super SG % */}

              {/* Super Balance */}
              <div className="space-y-1">
                <Label
                  htmlFor="balance"
                  className="text-sm font-medium text-gray-900"
                >
                  Current Super Balance
                </Label>
                <div className="relative">
                  <Input
                    id="balance"
                    type="number"
                    required
                    placeholder="10,000"
                    className="pl-[1.3rem] h-10 text-sm font-normal text-gray-900 placeholder:text-gray-400"
                    {...register("superBalance", { required: true })}
                  />
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm">
                    $
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="sg"
                  className="text-sm font-medium text-gray-900"
                >
                  Super SG %
                </Label>
                <div className="relative">
                  <Input
                    id="sg"
                    type="number"
                    required
                    defaultValue={12}
                    placeholder="12"
                    className="pr-8 h-10 text-sm font-normal text-gray-900 placeholder:text-gray-400"
                    {...register("superSG", { required: true })}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                    %
                  </span>
                </div>
              </div>

              {/* Super Return % */}
              <div className="space-y-1">
                <Label
                  htmlFor="return"
                  className="text-sm font-medium text-gray-900"
                >
                  Super Return %
                </Label>
                <div className="relative">
                  <Input
                    id="return"
                    type="number"
                    step="any"
                    defaultValue={7.5}
                    placeholder="7.5"
                    className="pr-8 h-10 text-sm font-normal text-gray-900 placeholder:text-gray-400"
                    {...register("superReturn", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                    %
                  </span>
                </div>
              </div>

              {/* Accordion for breaks */}
              <div className="col-span-2">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="group">
                      <div className="flex w-full items-center justify-between">
                        <Label className="text-sm font-medium text-gray-900">
                          Periods of Reduced or No Work
                        </Label>
                        {/* Change this Button to something that won't render a <button> */}
                        <span className="inline-flex items-center justify-center w-9 h-7 rounded-lg border border-gray-300">
                          <Plus className="w-6 h-6 text-gray-700" />
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 bg-gray-50 rounded-lg p-4">
                        <Calendar28
                          SubscriptionDate="Start"
                          defaultDate={new Date()}
                        />

                        <Calendar28
                          SubscriptionDate={"End"}
                          defaultDate={
                            new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() + 1
                              )
                            )
                          }
                        />
                        <div className="col-span-2 space-y-2">
                          <div className="flex justify-between items-center mb-4">
                            <Label className="text-sm font-medium text-gray-900">
                              Workload During Break (% Current salary)
                            </Label>
                            <div className="flex items-center">
                              <Popover>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="w-32 h-7"
                                        >
                                          <Info className="h-3 w-3" />
                                          <p className="text-sm">
                                            Manual Input
                                          </p>
                                        </Button>
                                      </PopoverTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>
                                        Manually input salary instead of using
                                        the slider.
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>

                                <PopoverContent className="w-64 p-4 space-y-3">
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-900">
                                      Salary
                                    </Label>
                                    <div className="relative">
                                      <Input
                                        type="number"
                                        placeholder="35,000"
                                        className="pl-7 h-10 text-sm font-normal text-gray-900 placeholder:text-gray-400"
                                        {...register("incomeDuringBreak")}
                                      />
                                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
                                        $
                                      </span>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-900">
                                      SG%
                                    </Label>
                                    <div className="relative">
                                      <Input
                                        type="number"
                                        step="any"
                                        placeholder="e.g. 15"
                                        defaultValue={12}
                                        className="pr-8 h-10 text-sm font-normal text-gray-900 placeholder:text-gray-400"
                                      />
                                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                                        %
                                      </span>
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                          <Slide className="w-full" />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Calculate
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
