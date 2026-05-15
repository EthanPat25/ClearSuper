import React from "react";
import { motion } from "framer-motion";
import { House } from "../AnimationComponents/House";
import { NumericFormat } from "react-number-format";
import { Bank } from "../AnimationComponents/Bank";
import { Casino } from "../AnimationComponents/Casino";
import { Hospital } from "../AnimationComponents/Hospital";
import { Tech } from "../AnimationComponents/Tech";
import { Trolley } from "../AnimationComponents/Trolley";
import { Defence } from "../AnimationComponents/Defence";
import { Mining } from "../AnimationComponents/Mining";
import { Oil } from "../AnimationComponents/Oil";
import { Media } from "../AnimationComponents/Media";
import { Telecommunications } from "../AnimationComponents/Telecommunications";
import { Truck } from "../AnimationComponents/Truck";
import IndustryPopUp from "./IndustryPopUp";

const industryConfig = [
  { industry: "Technology & Software", animation: Tech },
  { industry: "Banks & Finance", animation: Bank },
  { industry: "Healthcare & Biotech", animation: Hospital },
  { industry: "Consumer Goods & Retail", animation: Trolley },
  { industry: "Real Estate & Construction", animation: House },
  { industry: "Casinos & Gaming", animation: Casino },
  { industry: "Aerospace & Defence", animation: Defence },
  { industry: "Mining & Minerals", animation: Mining },
  { industry: "Oil, Gas & Energy", animation: Oil },
  { industry: "Industrial & Transport", animation: Truck },
  { industry: "Media & Entertainment", animation: Media },
  { industry: "Telecommunications", animation: Telecommunications },
];

const Industries = ({ holdingsData, balance }) => {
  const userBalance = Number(balance) || 0;

  const holdingsBySector = React.useMemo(() => {
    if (!holdingsData) return {} as Record<string, typeof holdingsData>;
    const result: Record<string, typeof holdingsData> = {};
    holdingsData.forEach((holding) => {
      const sector = holding.companies?.Sector;
      if (sector) {
        if (!result[sector]) result[sector] = [];
        result[sector].push(holding);
      }
    });
    return result;
  }, [holdingsData]);

  return (
    <>
      {industryConfig.map((element, index) => {
        const AnimComponent = element.animation;
        const sectorHoldings = holdingsBySector[element.industry] ?? [];
        const industryTotal = sectorHoldings.reduce(
          (sum: number, h: { Weighting_Percentage_Clean: number }) =>
            sum + (Number(h.Weighting_Percentage_Clean) / 100) * userBalance,
          0,
        );

        return (
          <IndustryPopUp
            key={index}
            industry={element.industry}
            animation={<AnimComponent responsiveSizing="w-[5rem] h-[5rem]" />}
            holdings={sectorHoldings}
            balance={userBalance}
            trigger={
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                whileHover={{ y: -6 }}
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
                  <AnimComponent responsiveSizing="w-[9rem] h-[7rem]" />
                </div>
                <h2 className="text-xs sm:text-sm md:text-base font-medium mb-2">
                  {element.industry}
                </h2>
                <p className="font-semibold text-xl">
                  <NumericFormat
                    value={industryTotal}
                    thousandSeparator
                    prefix="$"
                    decimalScale={2}
                    fixedDecimalScale
                    displayType="text"
                  />
                </p>
              </motion.div>
            }
          />
        );
      })}
    </>
  );
};

export default Industries;
