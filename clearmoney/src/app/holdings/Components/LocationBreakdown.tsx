// components/LocationBreakdown.tsx
import React from "react";
import { NumericFormat } from "react-number-format";
import UnitedKingdom from "../LandMarkIcons/UnitedKingdom";
import Japan from "../LandMarkIcons/Japan";
import Germany from "../LandMarkIcons/Germany";
import Other from "../LandMarkIcons/Other";
import Australia from "../LandMarkIcons/Australia";
import UnitedStates from "../LandMarkIcons/UnitedStates";

type Holding = {
  Weighting_Percentage_Clean: number;
  companies: {
    Country: string;
  };
};

type LocationBreakdownProps = {
  holdings: Holding[];
  balance: number;
};

const MOCK_LOCATIONS = [
  { country: "United States", weight: 42.3, Landmark: UnitedStates },
  { country: "Australia", weight: 21.7, Landmark: Australia },
  { country: "Japan", weight: 8.4, Landmark: Japan },
  { country: "United Kingdom", weight: 6.2, Landmark: UnitedKingdom },
  { country: "Germany", weight: 4.8, Landmark: Germany },
  { country: "Other", weight: 6.7, Landmark: Other },
];

const LocationBreakdown: React.FC<LocationBreakdownProps> = ({ balance }) => {
  const maxWeight = Math.max(...MOCK_LOCATIONS.map((l) => l.weight));

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-3xl w-full">
        <p className="text-base sm:text-lg font-bold text-white mb-4">
          Where these companies are based
        </p>

        <div className="flex flex-col gap-4">
          {MOCK_LOCATIONS.map(({ country, weight, Landmark }) => {
            const amount = (weight / 100) * balance;
            const barWidth = (weight / maxWeight) * 100;

            return (
              <div key={country} className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Landmark className="w-8 h-8" />
                </div>

                <span className="text-sm font-medium text-slate-300 w-28 sm:w-40 truncate">
                  {country}
                </span>

                <div className="flex-1 h-1.5 bg-white/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>

                <span className="text-sm font-semibold tabular-nums text-white w-20 text-right">
                  <NumericFormat
                    value={amount}
                    thousandSeparator
                    prefix="$"
                    decimalScale={0}
                    displayType="text"
                  />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LocationBreakdown;
