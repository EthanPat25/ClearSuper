import React from "react";
import { motion } from "framer-motion";
import { NumericFormat } from "react-number-format";
import Industries from "./industries";

const PublicHoldings = ({ companyMode, pager, balance }) => {
  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-y-6 justify-items-center xs:px-5 sm:px-10 lg:px-40">
      {companyMode === "company" ? (
        pager.map((holding, index) => {
          const scaledValue =
            balance && holding.Weighting_Percentage_Clean
              ? (holding.Weighting_Percentage_Clean / 100) * balance
              : 0;

          return (
            <motion.div
              key={`${index}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[16rem] relative hover:shadow-xl"
            >
              <p
                className="absolute top-4 left-4 text-xs text-gray-400 font-medium leading-none truncate max-w-[65%]"
                title={holding.Name}
              >
                {holding.Name}
              </p>

              <div className="flex flex-col justify-between items-center">
                <img
                  className="xs:w-[5rem] xs:h-[5rem] sm:w-[6rem] sm:h-[6rem] md:w-[6rem] md:h-[6rem] rounded-[3rem] mb-4"
                  src={`https://cdn.brandfetch.io/${holding.Domain}/icon/theme/dark/c=1idfCQLm9sumx6VuVu3`}
                  alt={`${holding.Name} logo`}
                />
              </div>

              <h2 className="xs:text-sm md:text-base font-medium mb-2">
                {holding.Parsed_Name}
              </h2>

              <p className="font-semibold text-xl ">
                <NumericFormat
                  value={scaledValue.toFixed(2)}
                  thousandSeparator
                  prefix="$"
                  displayType="text"
                />
              </p>
            </motion.div>
          );
        })
      ) : (
        <Industries></Industries>
      )}
    </div>
  );
};

export default PublicHoldings;
