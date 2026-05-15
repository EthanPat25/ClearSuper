import React from "react";
import { motion } from "framer-motion";
import { NumericFormat } from "react-number-format";
import Industries from "./industries";
import CompanyPopUp from "./CompanyPopUp";

const PublicHoldings = ({ companyMode, pager, balance, holdingsData }) => {
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
                  <motion.svg
                    version="1.1"
                    id="fi_471662"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="absolute top-4 right-4 w-6 h-6 fill-slate-400 hover:fill-slate-600 transition-colors"
                    viewBox="0 0 512 512"
                    whileHover={{ scale: 1.05 }}
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

                  <h2 className="xs:text-sm md:text-base font-medium text-slate-800 mb-1">
                    {holding.companies?.Parsed_Name || "Unknown Asset"}
                  </h2>

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
