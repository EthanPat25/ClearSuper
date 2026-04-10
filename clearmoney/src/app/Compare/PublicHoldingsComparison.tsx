"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NumericFormat } from "react-number-format";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconSearch,
} from "@tabler/icons-react";
import CompanyPopUp from "../holdings/CompanyPopUp";
import SearchBar from "./SearchBar";

type PublicHoldingsProps = {
  holdingsData?: Holding[] | null;
  balance?: number;
};

type Holding = {
  Name: string;
  Weighting_Percentage: number;
  Super_Fund: string;
  Option_Name: string;
  Listing_Status: string;
  Dollar_Value?: number;
  Domain?: string;
  Parsed_Name: string;
  Weighting_Percentage_Clean: number;
};

const PublicHoldingsComparison: React.FC<PublicHoldingsProps> = ({}) => {
  const [startIndex, setStartIndex] = React.useState(0);
  const [activeFilter, setActiveFilter] = React.useState("Both");
  const [searchQuery, setSearchQuery] = React.useState("");
  const pageSize = 9;
  const [view, setView] = React.useState<"public" | "private" | "bonds">(
    "public"
  );

  const filters = [
    { key: "Your", label: "Your Fund Only" },
    { key: "Both", label: "Shared by Both" },
    { key: "Rest", label: "Other Fund Only" },
  ];

  const publicCompanies = [
    {
      fullName: "Microsoft Corp.",
      parsedName: "Microsoft",
      domain: "microsoft.com",
    },
    { fullName: "Apple Inc.", parsedName: "Apple", domain: "apple.com" },
    { fullName: "NVIDIA Corp.", parsedName: "NVIDIA", domain: "nvidia.com" },
    { fullName: "Amazon.com Inc.", parsedName: "Amazon", domain: "amazon.com" },
    {
      fullName: "Alphabet Inc. (Google)",
      parsedName: "Alphabet",
      domain: "abc.xyz",
    },
    { fullName: "BHP Group Ltd", parsedName: "BHP", domain: "bhp.com" },
  ];

  const filteredCompanies = React.useMemo(() => {
    if (!searchQuery) return publicCompanies;
    return publicCompanies.filter((company) =>
      company.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, publicCompanies]);

  return (
    <div className="bg-gray-100 w-full mt-20 rounded-[5rem]">
      {/* Header */}
      <div className="flex flex-col items-center text-center py-6 mt-4 mb-2">
        <h2 className="font-bold xs:text-xl sm:text-2xl md:text-[2.3rem] leading-snug">
          Compare What's Inside
        </h2>
      </div>
      <div className="flex justify-center gap-2 mb-6">
        {/* Public */}
        <button
          onClick={() => setView("public")}
          className={`
      flex items-center justify-center gap-2
      px-4 py-2 rounded-3xl text-sm font-medium
      xs:w-[7.5rem] sm:w-[9rem] md:w-[11rem]
      transition-all duration-200
      ${
        view === "public"
          ? "bg-gray-900 text-white shadow-sm"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
      }
    `}
        >
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: "#00C49F" }}
          />
          <span>Public Companies</span>
        </button>

        {/* Private */}
        <button
          onClick={() => setView("private")}
          className={`
      flex items-center justify-center gap-2
      px-4 py-2 rounded-3xl text-sm font-medium
      xs:w-[7.5rem] sm:w-[9rem] md:w-[11rem]
      transition-all duration-200
      ${
        view === "private"
          ? "bg-gray-900 text-white shadow-sm"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
      }
    `}
        >
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: "#3B82F6" }}
          />
          <span>Private Assets</span>
        </button>

        {/* Bonds */}
        <button
          onClick={() => setView("bonds")}
          className={`
      flex items-center justify-center gap-2
      px-4 py-2 rounded-3xl text-sm font-medium
      xs:w-[7.5rem] sm:w-[9rem] md:w-[11rem]
      transition-all duration-200
      ${
        view === "bonds"
          ? "bg-gray-900 text-white shadow-sm"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
      }
    `}
        >
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: "#F59E0B" }}
          />
          <span>Bonds + Cash</span>
        </button>
      </div>

      {/* Toolbar with integrated pagination */}
      <div className="w-full flex justify-center items-center">
        <SearchBar></SearchBar>
      </div>

      {/* Grid Section */}
      <div className="w-full flex flex-col justify-center items-center">
        <div className="grid grid-cols-2 md:grid-cols-3 mt-6 gap-y-6 gap-x-8 justify-items-center w-[60rem] max-w-[90%]">
          {filteredCompanies
            .slice(startIndex, startIndex + pageSize)
            .map((element, index) => {
              const yourFundValue = 350;
              const restValue =
                index % 2 === 0 ? yourFundValue + 113.55 : yourFundValue - 89.4;
              const restValueColor =
                restValue > yourFundValue ? "text-green-600" : "text-red-600";
              const restValueBg =
                restValue > yourFundValue ? "bg-green-50" : "bg-red-50";

              return (
                <CompanyPopUp
                  key={index}
                  element={element}
                  trigger={
                    <motion.div
                      key={element.fullName}
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{
                        scale: 1,
                        opacity: 1,
                        transition: {
                          duration: 0.4,
                          delay: 0.1 * index,
                          ease: "easeOut",
                        },
                      }}
                      whileHover={{ y: -6 }}
                      className="bg-white rounded-3xl p-4 shadow-md w-full max-w-[17rem] flex flex-col hover:translate-y-1 hover:shadow-xl cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <p
                          className="text-xs text-gray-400 font-medium truncate"
                          title={element.fullName}
                        >
                          {element.fullName}
                        </p>
                      </div>
                      <div className="flex justify-center items-center">
                        <img
                          className="w-[5rem] h-[5rem] rounded-[2rem]"
                          src={`https://cdn.brandfetch.io/${element.domain}/icon.png`}
                          alt={`${element.parsedName} logo`}
                        />
                      </div>
                      <h1 className="text-center mt-3 font-medium">
                        {element.parsedName}
                      </h1>

                      <div className="text-center mt-3">
                        <div className="flex flex-col w-full justify-center items-center gap-2">
                          <div className="flex items-baseline justify-between text-[0.9rem] bg-gray-50 p-3 rounded-2xl w-[95%]">
                            <span className="text-gray-500 font-medium">
                              Fund A:
                            </span>
                            <div
                              className={`font-medium text-[1rem] text-gray-800 flex gap-1 justify-center items-center`}
                            >
                              <NumericFormat
                                value={yourFundValue}
                                thousandSeparator
                                prefix="$"
                                decimalScale={2}
                                fixedDecimalScale
                                displayType="text"
                              />{" "}
                              <p className="text-center text-xs"> (0.3%)</p>
                            </div>
                          </div>
                          <div
                            className={`flex items-baseline justify-between text-[0.9rem] ${restValueBg} p-3 rounded-2xl w-[95%]`}
                          >
                            <span className="text-gray-500 font-medium">
                              Fund B:
                            </span>
                            <span
                              className={`flex gap-1 items-center justify-end font-medium text-[1rem] ${restValueColor}`}
                            >
                              <NumericFormat
                                value={restValue}
                                thousandSeparator
                                prefix="$"
                                decimalScale={2}
                                fixedDecimalScale
                                displayType="text"
                              />
                              <p className="text-xs"> (0.3%)</p>
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  }
                />
              );
            })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-14 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span>Higher allocation</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span>Lower allocation</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col justify-center items-center text-center pb-10 mt-3">
          <p className="mt-3 text-xs xxs:text-sm text-gray-500 max-w-[35rem] leading-relaxed">
            Based on official holdings data from
            <span className="font-medium"> December 2024</span>. Holdings are
            updated every 6 months. These results are estimates, intended to
            give an overview of where your money is invested, not a live or
            exact breakdown.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicHoldingsComparison;
