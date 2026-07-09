import React from "react";

import { NumericFormat } from "react-number-format";
import { motion } from "framer-motion";
import { Banknote } from "../../AnimationComponents/Banknote";
import { Bond } from "../../AnimationComponents/Bond";
import { HoldingRow } from "../types/holdings";

export type BondsandCashHoldingsProps = {
  holdingsCashData: Array<HoldingRow> | null;
  holdingsbondsData: Array<HoldingRow> | null;
  balance: number;
};

export type dataforwardProps = {
  cashAmount: number;
  bondsAmount: number;
  percentageCash: number;
  totalamount: number;
  totalpercentage: number;
};

const BondsandCashHoldings: React.FC<BondsandCashHoldingsProps> = ({
  holdingsCashData,
  holdingsbondsData,
  balance,
}) => {
  const percentageCash =
    holdingsCashData?.reduce(
      (sum, h) => sum + (h.Weighting_Percentage_Clean ?? 0),
      0,
    ) ?? 0;

  const cashAmount = (percentageCash / 100) * balance;

  const percentageBonds =
    holdingsbondsData?.reduce(
      (sum, h) => sum + (h.Weighting_Percentage_Clean ?? 0),
      0,
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

  const parentVariant = {
    hidden: { scale: 0.9, opacity: 0 },
    rest: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    active: { y: -6, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const childVariant = {
    rest: { scale: 1, fill: "#94a3b8" },
    active: { scale: 1.1, fill: "#0f172a", transition: { duration: 0 } },
  };

  return (
    <div className="w-full flex justify-center pt-6">
      <div className="grid grid-cols-2 gap-x-3 md:gap-x-0 gap-y-6 sm:gap-y-8 w-full max-w-xl px-6 justify-items-center">
        <motion.div
          whileHover="active"
          initial="hidden"
          animate="rest"
          variants={parentVariant}
          className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[14rem] relative"
        >
          <motion.svg
            version="1.1"
            id="fi_471662"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="absolute top-4 right-4 w-6 h-6 fill-slate-400 hover:fill-slate-600 transition-colors"
            viewBox="0 0 512 512"
            variants={childVariant}
            enableBackground="new 0 0 512 512"
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path
                  d="M256,0C114.509,0,0,114.496,0,256c0,141.489,114.496,256,256,256c141.491,0,256-114.496,256-256
                            C512,114.511,397.504,0,256,0z M256,476.279c-121.462,0-220.279-98.816-220.279-220.279S134.538,35.721,256,35.721
                            S476.279,134.537,476.279,256S377.462,476.279,256,476.279z"
                ></path>
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M256.006,213.397c-15.164,0-25.947,6.404-25.947,15.839v128.386c0,8.088,10.783,16.174,25.947,16.174
                            c14.49,0,26.283-8.086,26.283-16.174V229.234C282.289,219.8,270.496,213.397,256.006,213.397z"
                ></path>
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M256.006,134.208c-15.501,0-27.631,11.12-27.631,23.925c0,12.806,12.131,24.263,27.631,24.263
                            c15.164,0,27.296-11.457,27.296-24.263C283.302,145.328,271.169,134.208,256.006,134.208z"
                ></path>
              </g>
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
          </motion.svg>
          <p className="absolute top-4 left-4 text-xs text-gray-400 font-medium leading-none truncate max-w-[65%]">
            {}
          </p>
          <div className="flex flex-col justify-between items-center gap-6">
            <Banknote responsiveSizing="w-[4rem] h-[4rem]"></Banknote>
          </div>

          <h2 className="text-xs sm:text-sm font-medium mb-2">Cash</h2>

          <p className="font-semibold text-xl">
            <NumericFormat
              value={dataforward.cashAmount}
              thousandSeparator
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
              displayType="text"
            />
          </p>
        </motion.div>

        <motion.div
          transition={{ duration: 0.4, ease: "easeOut" }}
          whileHover="active"
          initial="hidden"
          animate="rest"
          variants={parentVariant}
          className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[14rem] relative"
        >
          <motion.svg
            version="1.1"
            id="fi_471662"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="absolute top-4 right-4 w-6 h-6 fill-slate-400 hover:fill-slate-600 transition-colors"
            viewBox="0 0 512 512"
            variants={childVariant}
            enableBackground="new 0 0 512 512"
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path
                  d="M256,0C114.509,0,0,114.496,0,256c0,141.489,114.496,256,256,256c141.491,0,256-114.496,256-256
                            C512,114.511,397.504,0,256,0z M256,476.279c-121.462,0-220.279-98.816-220.279-220.279S134.538,35.721,256,35.721
                            S476.279,134.537,476.279,256S377.462,476.279,256,476.279z"
                ></path>
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M256.006,213.397c-15.164,0-25.947,6.404-25.947,15.839v128.386c0,8.088,10.783,16.174,25.947,16.174
                            c14.49,0,26.283-8.086,26.283-16.174V229.234C282.289,219.8,270.496,213.397,256.006,213.397z"
                ></path>
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M256.006,134.208c-15.501,0-27.631,11.12-27.631,23.925c0,12.806,12.131,24.263,27.631,24.263
                            c15.164,0,27.296-11.457,27.296-24.263C283.302,145.328,271.169,134.208,256.006,134.208z"
                ></path>
              </g>
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
          </motion.svg>
          <div className="flex flex-col justify-between items-center">
            <Bond responsiveSizing="w-[4rem] h-[4rem]"></Bond>
          </div>

          <h2 className="text-xs sm:text-sm font-medium mb-2">
            Fixed Interest
          </h2>

          <p className="font-semibold text-xl">
            <NumericFormat
              value={dataforward.bondsAmount}
              thousandSeparator
              prefix="$"
              decimalScale={2}
              fixedDecimalScale
              displayType="text"
            />
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BondsandCashHoldings;
