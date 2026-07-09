import React from "react";
import { NumericFormat } from "react-number-format";
import { Highway } from "../../AnimationComponents/Highway";
import { House } from "../../AnimationComponents/House";
import { Briefcase } from "../../AnimationComponents/Briefcase";
import { Puzzle } from "../../AnimationComponents/Puzzle";
import { motion } from "framer-motion";
import { HoldingRow } from "../types/holdings";
import { UnlistedHoldingPopUp } from "./UnlistedHoldingsPopup";

type Props = {
  holdingsData: Array<HoldingRow> | null;
  balance: number;
};

const CATEGORIES = [
  {
    name: "Infrastructure",
    keyword: "INFRASTRUCTURE",
    icon: (
      <Highway responsiveSizing="w-[3.5rem] h-[3.5rem] sm:w-[4rem] sm:h-[4rem]" />
    ),
  },
  {
    name: "Property",
    keyword: "PROPERTY",
    icon: (
      <House responsiveSizing="w-[3.5rem] h-[3.5rem] sm:w-[4rem] sm:h-[4rem]" />
    ),
  },
  {
    name: "Equity",
    keyword: "EQUITY",
    icon: (
      <Briefcase responsiveSizing="w-[3.5rem] h-[3.5rem] sm:w-[4rem] sm:h-[4rem]" />
    ),
  },
  {
    name: "Alternatives",
    keyword: "ALTERNATIVES",
    icon: (
      <Puzzle responsiveSizing="w-[3.5rem] h-[3.5rem] sm:w-[4rem] sm:h-[4rem]" />
    ),
  },
];

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

const PrivateHoldings: React.FC<Props> = ({ holdingsData, balance }) => {
  function getCategoryHoldings(keyword: string) {
    return (
      holdingsData?.filter((h) =>
        h.Asset_Class?.toUpperCase().includes(keyword),
      ) ?? []
    );
  }

  function getCategoryValue(keyword: string) {
    const pct = getCategoryHoldings(keyword).reduce(
      (sum, h) => sum + (h.Weighting_Percentage_Clean ?? 0),
      0,
    );
    return (pct / 100) * balance;
  }

  function getPrimaryHolding(keyword: string) {
    const holdings = getCategoryHoldings(keyword);
    if (holdings.length === 0) return null;
    return holdings.reduce((top, h) =>
      (h.Weighting_Percentage_Clean ?? 0) >
      (top.Weighting_Percentage_Clean ?? 0)
        ? h
        : top,
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-2 w-full px-3 max-w-xl pt-6 gap-2 gap-y-[2rem] justify-items-center">
        {CATEGORIES.map((cat) => {
          const holding = getPrimaryHolding(cat.keyword);

          const card = (
            <motion.div
              whileHover="active"
              initial="hidden"
              animate="rest"
              variants={parentVariant}
              className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[11rem] sm:max-w-[14rem] relative hover:shadow-xl cursor-pointer select-none"
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
              </motion.svg>

              <div className="flex flex-col items-center">{cat.icon}</div>

              <h2 className="text-xs sm:text-sm font-medium mb-2">
                {cat.name}
              </h2>
              <p className="font-semibold text-xl">
                <NumericFormat
                  value={getCategoryValue(cat.keyword)}
                  thousandSeparator
                  prefix="$"
                  decimalScale={2}
                  fixedDecimalScale
                  displayType="text"
                />
              </p>
            </motion.div>
          );

          return holding ? (
            <UnlistedHoldingPopUp
              key={cat.name}
              holding={holding}
              balance={balance}
              displayValue={getCategoryValue(cat.keyword)}
              icon={cat.icon}
              trigger={card}
            />
          ) : (
            <React.Fragment key={cat.name}>{card}</React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PrivateHoldings;
