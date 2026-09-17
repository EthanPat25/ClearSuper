"use client";

import React from "react";
import GapWizard from "./GapWizard";
import { SuperGapResult } from "./Forumula2";

type SuperGapCalcSectionProps = {
  result: SuperGapResult | null;
  onCalculate: (result: SuperGapResult) => void;
};

const SuperGapCalcSection = ({
  result,
  onCalculate,
}: SuperGapCalcSectionProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-12 sm:mt-20">
      <GapWizard result={result} onCalculate={onCalculate} />
    </div>
  );
};

export default SuperGapCalcSection;
