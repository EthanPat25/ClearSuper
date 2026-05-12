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
      <div className="grid grid-cols-2 w-full px-3 md:px-10 xl:px-72 pt-6 gap-6 justify-items-center">
        {categories.map((cat, index) => (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            key={index}
            className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[16rem] relative hover:shadow-xl cursor-pointer select-none"
          >
            <div className="flex flex-col justify-between items-center gap-6">
              {cat.icon}
            </div>

            <h2 className="xs:text-sm md:text-base font-medium mb-2">
              {cat.name}
            </h2>
            <p className="font-semibold text-xl">
              <NumericFormat
                value={getCategoryValue(cat.name)}
                thousandSeparator
                prefix="$"
                decimalScale={0}
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
