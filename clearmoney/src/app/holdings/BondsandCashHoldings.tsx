import React from "react";

import { NumericFormat } from "react-number-format";
import { motion } from "framer-motion";
import { Banknote } from "../AnimationComponents/Banknote";
import { Bond } from "../AnimationComponents/Bond";

export type BondsandCashHoldingsProps = {
  holdingsCashData: Holding[] | null;
  holdingsbondsData: Holding[] | null;
  balance: number;
};

export type dataforwardProps = {
  cashAmount: number;
  bondsAmount: number;
  percentageCash: number;
  totalamount: number;
  totalpercentage: number;
};

type Holding = {
  Name: string;
  Weighting_Percentage: number;
  Super_Fund: string;
  Option_Name: string;
  Listing_Status: string;
  Dollar_Value?: number;
  Domain?: string;
  Source_Name: string;
  Asset_Class: string;
  Weighting_Percentage_Clean: number;
};

const BondsandCashHoldings: React.FC<BondsandCashHoldingsProps> = ({
  holdingsCashData,
  holdingsbondsData,
  balance,
}) => {
  const percentageCash =
    holdingsCashData?.reduce(
      (sum, h) => sum + (h.Weighting_Percentage_Clean ?? 0),
      0
    ) ?? 0;

  const cashAmount = (percentageCash / 100) * balance;

  const percentageBonds =
    holdingsbondsData?.reduce(
      (sum, h) => sum + (h.Weighting_Percentage_Clean ?? 0),
      0
    ) ?? 0;

  const bondsAmount = (percentageBonds / 100) * balance;

  const amount = cashAmount + bondsAmount;

  const percentage = percentageCash + percentageBonds;

  const dataforward = {
    cashAmount: cashAmount,
    bondsAmount: bondsAmount,
    percentageCash: percentageCash,
    totalamount: amount,
    totalpercentage: percentage,
  };

  function getColorForAssetClass(assetClass: string) {
    switch (assetClass) {
      case "Infrastructure":
        return "bg-blue-100 text-blue-700";
      case "Property":
        return "bg-green-100 text-green-700";
      case "Equity":
        return "bg-slate-100 text-slate-700";
      case "Alternatives":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-500";
    }
  }

  console.log(percentageCash);
  return (
    <div className="bg-gray-100 w-full rounded-[5rem]">
      {/* Cards + compact arrows */}
      <div className="flex items-center justify-center gap-4 mt-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[17rem] relative"
        >
          {/* Original name in top-left */}
          <p className="absolute top-4 left-4 text-xs text-gray-400 font-medium leading-none truncate max-w-[65%]">
            {}
          </p>

          {/* Info icon */}

          {/* Logo container */}
          <div className="flex flex-col justify-between items-center gap-6">
            <Banknote></Banknote>
          </div>

          {/* Company name + hard-coded dollar value */}
          <h2 className="xs:text-sm md:text-base font-medium">
            <span
              className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold ${getColorForAssetClass(
                "Property"
              )}`}
            >
              {"Cash"}
            </span>
            {}
          </h2>
          <h2 className="xs:text-sm md:text-base font-medium mt-2">
            <NumericFormat
              value={dataforward.cashAmount}
              thousandSeparator
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
              displayType="text"
            />
          </h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[17rem] relative"
        >
          {/* Original name in top-left */}
          <p className="absolute top-4 left-4 text-xs text-gray-400 font-medium leading-none truncate max-w-[65%]">
            {}
          </p>

          {/* Info icon */}

          {/* Logo container */}
          <div className="flex flex-col justify-between items-center">
            <Bond></Bond>
          </div>

          {/* Company name + hard-coded dollar value */}
          <h2 className="xs:text-sm md:text-base font-medium">
            <span
              className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold ${getColorForAssetClass(
                "Equity"
              )}`}
            >
              {"Fixed Interest (Bonds)"}
            </span>
            {}
          </h2>
          <h2 className="xs:text-sm md:text-base font-medium mt-2">
            <NumericFormat
              value={dataforward.bondsAmount}
              thousandSeparator
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
              displayType="text"
            />
          </h2>
        </motion.div>
      </div>
    </div>
  );
};

export default BondsandCashHoldings;
