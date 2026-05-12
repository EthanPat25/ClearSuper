import React from "react";
import { motion } from "framer-motion";
import { NumericFormat } from "react-number-format";
import Industries from "./industries";
import CompanyPopUp from "./CompanyPopUp";

const PublicHoldings = ({ companyMode, pager, balance, holdingsData }) => {
  console.log("--- PublicHoldings Debug ---");
  console.log("Balance received:", balance);
  console.log("Total holdings in list:", holdingsData?.length);

  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4 justify-items-center px-3 sm:gap-y-6 sm:px-10 lg:px-40">
      {companyMode === "company" ? (
        pager?.map((holding, index) => {
          const userBalance = Number(balance) || 0;
          const weighting = Number(holding.Weighting_Percentage_Clean) || 0;
          const scaledValue = (weighting / 100) * userBalance;

          return (
            <CompanyPopUp
              key={`${index}-${holding.companies?.id || index}`}
              holding={holding}
              balance={userBalance}
              trigger={
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[16rem] relative hover:shadow-xl cursor-pointer select-none"
                >
                  <p
                    className="absolute top-4 left-4 text-[10px] text-gray-400 font-medium leading-none truncate max-w-[80%]"
                    title={holding.Full_Name}
                  >
                    {holding.Full_Name}
                  </p>

                  <div className="flex flex-col justify-between items-center">
                    <img
                      className="xs:w-[5rem] xs:h-[5rem] sm:w-[6rem] sm:h-[6rem] md:w-[6rem] md:h-[6rem] rounded-[3rem] mb-4 object-contain bg-slate-50"
                      src={`https://cdn.brandfetch.io/${holding.companies?.id}/icon/theme/dark/c=1idfCQLm9sumx6VuVu3`}
                      alt="logo"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://www.google.com/s2/favicons?sz=128&domain=google.com";
                      }}
                    />
                  </div>

                  <h2 className="xs:text-sm md:text-base font-bold text-slate-800 mb-1">
                    {holding.companies?.Parsed_Name || "Unknown Asset"}
                  </h2>

                  <p className="text-[10px] uppercase tracking-wider text-emerald-600 mb-3 font-bold">
                    {holding.companies?.Sector || "Diversified"}
                  </p>

                  <div className="font-semibold text-xl text-slate-900">
                    <NumericFormat
                      value={scaledValue}
                      thousandSeparator
                      prefix="$"
                      decimalScale={2}
                      fixedDecimalScale={true}
                      displayType="text"
                    />
                  </div>
                </motion.div>
              }
            />
          );
        })
      ) : (
        <Industries holdingsData={holdingsData} balance={balance} />
      )}
    </div>
  );
};

export default PublicHoldings;
