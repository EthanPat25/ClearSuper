"use client";

import React from "react";
import { Calc } from "./Calc";
import Breakdown from "./Breakdown";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SuperGapCalcSection = () => {
  const [inflation, setInflation] = React.useState(true);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[6rem] md:gap-8 px-4 max-w-7xl mx-auto mt-20">
      <div className="flex justify-center">
        <Calc className="w-full max-w-[50rem]" />
      </div>
      <Breakdown />
    </div>
  );
};

export default SuperGapCalcSection;
