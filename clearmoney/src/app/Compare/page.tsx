"use client";
import React from "react";
import PublicHoldingsComparison from "./PublicHoldingsComparison";
import ComparisonTable from "./ComparisonTable";

const page = () => {
  return (
    <div className="flex w-full flex-col justify-center items-center">
      <ComparisonTable></ComparisonTable>
      <div className="w-full flex justify-center items-center px-20">
        <PublicHoldingsComparison></PublicHoldingsComparison>
      </div>
    </div>
  );
};

export default page;
