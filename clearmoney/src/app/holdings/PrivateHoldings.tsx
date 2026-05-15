import React from "react";
import { NumericFormat } from "react-number-format";
import { Highway } from "../AnimationComponents/Highway";
import { House } from "../AnimationComponents/House";
import { Briefcase } from "../AnimationComponents/Briefcase";
import { Puzzle } from "../AnimationComponents/Puzzle";
import { motion } from "framer-motion";

type Holding = {
  Full_Name: string;
  Super_Fund: string;
  Option_Name: string;
  Listing_Status: string;
  Asset_Class: string;
  Dollar_Value?: number;
  Weighting_Percentage_Clean: number;
};

type PrivateHoldingsProps = {
  holdingsData: Holding[] | null;
  balance: number;
};

const PrivateHoldings: React.FC<PrivateHoldingsProps> = ({
  holdingsData,
  balance,
}) => {
  const categories = [
    {
      name: "Infrastructure",
      icon: <Highway responsiveSizing="w-[9rem] h-[7rem]" />,
    },
    {
      name: "Property",
      icon: <House responsiveSizing="w-[9rem] h-[7rem]" />,
    },
    {
      name: "Equity",
      icon: <Briefcase responsiveSizing="w-[9rem] h-[7rem]" />,
    },
    {
      name: "Alternatives",
      icon: <Puzzle responsiveSizing="w-[9rem] h-[7rem]" />,
    },
  ];

  function getCategoryValue(assetClass: string) {
    const pct =
      holdingsData
        ?.filter((h) => h.Asset_Class === assetClass)
        .reduce((sum, h) => sum + (h.Weighting_Percentage_Clean ?? 0), 0) ?? 0;
    return (pct / 100) * balance;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-2 w-full px-3 md:px-10 xl:px-72 pt-6 gap-x-3 gap-y-4 sm:gap-6 justify-items-center">
        {categories.map((cat, index) => (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            key={index}
            className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[16rem] relative hover:shadow-xl cursor-pointer select-none"
          >
            <motion.svg
              version="1.1"
              id="fi_471662"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="absolute top-4 right-4 w-6 h-6 fill-slate-400 hover:fill-slate-600 transition-colors"
              viewBox="0 0 512 512"
              whileHover={{ scale: 1.05 }}
              enable-background="new 0 0 512 512"
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
              {cat.icon}
            </div>

            <h2 className="text-xs sm:text-sm md:text-base font-medium mb-2">
              {cat.name}
            </h2>

            <p className="font-semibold text-xl">
              <NumericFormat
                value={getCategoryValue(cat.name)}
                thousandSeparator
                prefix="$"
                decimalScale={2}
                fixedDecimalScale
                displayType="text"
              />
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PrivateHoldings;
