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
    <div className="p-4 w-full flex justify-center items-center">
      <div className="max-w-3xl w-full">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="h-3 w-3 rounded-sm bg-[#00C49F]" />
            <span className="text-base font-medium text-slate-700">
              Public Companies
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
            By Location
          </h2>
        </div>

        <div className="grid gap-5">
          {MOCK_LOCATIONS.map(({ country, weight, Landmark }) => {
            const amount = (weight / 100) * balance;
            const barWidth = (weight / maxWeight) * 100;

            return (
              <div
                key={country}
                className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4"
              >
                <div className="p-2 bg-slate-100 rounded-2xl flex justify-center items-center flex-shrink-0">
                  <Landmark className="w-10 h-10" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-900">
                      {country}
                    </span>
                    <span className="text-sm sm:text-base font-black tabular-nums text-slate-900">
                      <NumericFormat
                        value={amount}
                        thousandSeparator
                        prefix="$"
                        decimalScale={0}
                        displayType="text"
                      />
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LocationBreakdown;
