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
                <div className="flex flex-col justify-between items-center">
                  <AnimComponent responsiveSizing="w-[9rem] h-[7rem]" />
                </div>
                <h2 className="xs:text-sm md:text-base font-medium mb-2">
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
