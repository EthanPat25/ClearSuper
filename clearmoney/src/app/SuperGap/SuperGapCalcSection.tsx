import React from "react";
import { Calc } from "./Calc";
import { Button } from "@/components/ui/button";
import Info from "../FHSS/Info";
import Breakdown from "./Breakdown";
import InsightCard from "./InsightCard";

import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";

const SuperGapCalcSection = () => {
  const [inflation, setInflation] = React.useState(true);

  return (
    <div className="flex mt-20 justify-evenly xs:flex-col lg:flex-row">
      <div className="flex justify-center">
        <div className="xs:max-w-[30rem] lg:max-w-[42rem] xl:max-w-[50rem]">
          <Calc />
        </div>
      </div>

      <div className="flex flex-col xs:w-full md:max-w-[38rem] lg:max-w-[42rem] items-center justify-center">
        {/* Inflation toggle row */}
        <div className="flex justify-center lg:justify-start mb-5 w-full md:ml-12 items-center space-x-3">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setInflation(true)}
                  className="rounded-xl w-36 bg-[rgb(82,105,127)] border p-5"
                  variant={inflation ? "default" : "outline"}
                >
                  <p className="font-normal">Adjust For Inflation</p>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  What your projected balance will be worth in today’s money.
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setInflation(false)}
                  variant={inflation ? "outline" : "default"}
                  className="rounded-xl w-36 border p-5"
                >
                  <p className="font-normal">Ignore Inflation</p>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>The raw number of your projected balance at retirement.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Info className="w-7 h-7 ml-2 hover:scale-105" />
        </div>

        <Breakdown />
        <InsightCard />
      </div>
    </div>
  );
};

export default SuperGapCalcSection;
