import React from "react";
import { NumericFormat } from "react-number-format";
import { Highway } from "../AnimationComponents/Highway";
import { House } from "../AnimationComponents/House";
import { Briefcase } from "../AnimationComponents/Briefcase";
import { Puzzle } from "../AnimationComponents/Puzzle";

type PrivateHoldingsProps = {
  holdingsData: Holding[] | null;
  balance: number;
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

const PrivateHoldings: React.FC<PrivateHoldingsProps> = ({}) => {
  const categories = [
    { name: "Infrastructure", icon: <Highway initialSize={90} /> },
    { name: "Property", icon: <House initialSize={90} /> },
    { name: "Equity", icon: <Briefcase initialSize={90}></Briefcase> },
    { name: "Alternatives", icon: <Puzzle initialSize={90} /> }, // placeholder
  ];

  function getColorForAssetClass(assetClass: string) {
    switch (assetClass) {
      case "Infrastructure":
        return "bg-sky-100 text-sky-700";
      case "Property":
        return "bg-green-100 text-green-700";
      case "Equity":
        return "bg-yellow-100 text-yellow-700";
      case "Alternatives":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-500";
    }
  }

  return (
    <div className="bg-gray-100 w-full rounded-[5rem]">
      {/* Category Cards */}
      <div className="mx-auto mt-10 grid grid-cols-2 gap-4 gap-y-7 max-w-2xl place-items-center">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[16rem] relative"
          >
            {/* Icon */}
            <div className="flex flex-col justify-between items-center gap-6">
              {cat.icon}
            </div>

            {/* Category pill */}
            <h2 className="mt-4">
              <span
                className={`px-3 py-1 rounded-full xs:text-sm md:text-base font-[500] ${getColorForAssetClass(
                  cat.name,
                )}`}
              >
                {cat.name}
              </span>
            </h2>

            {/* Dollar + percentage */}
            <h2 className="xs:text-sm md:text-base font-medium mt-2 flex justify-center text-center items-center gap-2">
              <p className="font-semibold text-xl ">
                <NumericFormat
                  value={0}
                  thousandSeparator
                  prefix="$"
                  displayType="text"
                />
              </p>
            </h2>
          </div>
        ))}
      </div>

      {/* Footer */}
    </div>
  );
};

export default PrivateHoldings;
