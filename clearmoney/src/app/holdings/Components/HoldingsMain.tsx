import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NumericFormat } from "react-number-format";
import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";
import PublicHoldings from "./PublicHoldings";
import PrivateHoldings from "./PrivateHoldings";
import BondsandCashHoldings from "./BondsandCashHoldings";
import ControlsBar from "./ControlsBar";
import AssetTabs from "./AssetTab";
import LocationBreakdown from "../_experimental/LocationBreakdown";
import { PublicCompanyHolding } from "../types/holdings";
import { HoldingRow } from "../types/holdings";
import Fuse from "fuse.js";

type AssetViewType = "public" | "private" | "bonds";

type HoldingsMainProps = {
  publicHoldings: Array<PublicCompanyHolding>;
  privateInvestments: Array<HoldingRow>;
  bonds: Array<HoldingRow>;
  cash: Array<HoldingRow>;
  balance: number;
};

const sumWeight = (holdings: Array<PublicCompanyHolding>) =>
  holdings.reduce((sum, h) => sum + (h.Weighting_Percentage_Clean ?? 0), 0);

const HoldingsMain: React.FC<HoldingsMainProps> = ({
  publicHoldings,
  privateInvestments,
  bonds,
  cash,
  balance,
}) => {
  const [AssetView, setAssetView] = React.useState<AssetViewType>("public");
  const [startIndex, setStartIndex] = React.useState(0);
  const pageSize = 9;
  const mobileBatchSize = 12;
  const [mobileVisibleCount, setMobileVisibleCount] =
    React.useState(mobileBatchSize);

  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [companyMode, setCompanyMode] = React.useState<"company" | "industry">(
    "company",
  );

  const fuse = React.useMemo(
    () =>
      new Fuse(publicHoldings, {
        keys: ["Full_Name", "companies.Parsed_Name", "companies.Sector"],
        threshold: 0.3,
      }),
    [publicHoldings],
  );

  const filteredHoldings = React.useMemo(() => {
    if (!searchTerm.trim()) return publicHoldings;
    return fuse.search(searchTerm).map((result) => result.item);
  }, [fuse, searchTerm]);

  React.useEffect(() => {
    setStartIndex(0);
    setMobileVisibleCount(mobileBatchSize);
  }, [searchTerm, AssetView, companyMode]);

  const pager = filteredHoldings.slice(startIndex, startIndex + pageSize);
  const mobilePager = filteredHoldings.slice(0, mobileVisibleCount);

  // Weight totals — straight reductions, no filters
  const publicWeight = sumWeight(publicHoldings);
  const privateWeight = sumWeight(privateInvestments);
  const bondsWeight = sumWeight(bonds) + sumWeight(cash);

  const listedAmount = (publicWeight / 100) * balance;

  const totalResults = filteredHoldings.length;
  const rangeLabel =
    totalResults === 0
      ? "0 results"
      : `${startIndex + 1}-${Math.min(
          startIndex + pageSize,
          totalResults,
        )} of ${totalResults} results`;

  return (
    <>
      <motion.div className="mt-10 md:mt-0 bg-slate-100 w-full rounded-[3rem] sm:rounded-[2rem] overflow-hidden max-w-5xl">
        <AssetTabs
          AssetView={AssetView}
          setAssetView={setAssetView}
          weight={{ bondsWeight, privateWeight, publicWeight }}
        />

        <div className="w-full relative">
          <AnimatePresence mode="wait">
            {AssetView === "public" ? (
              <motion.div
                key="public-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full flex flex-col gap-6"
              >
                <ControlsBar
                  companyMode={companyMode}
                  setCompanyMode={setCompanyMode}
                  searchOpen={searchOpen}
                  setSearchOpen={setSearchOpen}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  startIndex={startIndex}
                  setStartIndex={setStartIndex}
                  totalResults={totalResults}
                  pageSize={pageSize}
                  rangeLabel={rangeLabel}
                />

                <div className="w-full">
                  {totalResults === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                      <IconSearch size={48} className="mb-4 opacity-20" />
                      <p className="text-lg font-medium">No results found</p>
                    </div>
                  ) : (
                    <>
                      <div className="hidden sm:block">
                        <PublicHoldings
                          companyMode={companyMode}
                          pager={pager}
                          balance={balance}
                          holdingsData={publicHoldings}
                        />
                      </div>
                      <div className="sm:hidden">
                        <PublicHoldings
                          companyMode={companyMode}
                          pager={mobilePager}
                          balance={balance}
                          holdingsData={publicHoldings}
                        />
                        {companyMode === "company" &&
                          totalResults > mobileVisibleCount && (
                            <button
                              onClick={() =>
                                setMobileVisibleCount(
                                  (c) => c + mobileBatchSize,
                                )
                              }
                              className="mt-6 mx-auto block rounded-full bg-gray-900 px-6 py-2 text-sm font-semibold text-white shadow-sm"
                            >
                              Show more
                            </button>
                          )}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ) : AssetView === "private" ? (
              <motion.div
                key="private-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <PrivateHoldings
                  holdingsData={privateInvestments}
                  balance={balance}
                />
              </motion.div>
            ) : (
              <motion.div
                key="bonds-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <BondsandCashHoldings
                  holdingsCashData={cash}
                  holdingsbondsData={bonds}
                  balance={balance}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-center items-center mt-12 text-center pb-10 mx-5 sm:mx-0">
          <div className="text-slate-600 p-4 flex max-w-3xl">
            <p className="text-xs leading-relaxed">
              Based on the selected fund's official holdings data as of{" "}
              <strong>
                {publicHoldings[0]?.options?.as_of_date &&
                  new Date(
                    publicHoldings[0].options.as_of_date,
                  ).toLocaleDateString("en-AU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
              </strong>{" "}
              Data is typically released every 6 months. Dollar amounts assume
              the fund holds the same weights at reporting time and are
              estimates only.{" "}
              <Link
                href="/about"
                className="underline font-medium hover:text-slate-900 transition-colors"
              >
                <strong>Read full disclaimer</strong>
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default HoldingsMain;
