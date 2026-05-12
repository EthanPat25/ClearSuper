import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconSearch } from "@tabler/icons-react";
import PublicHoldings_copy from "./PublicHoldings";
import PrivateHoldings from "./PrivateHoldings";
import BondsandCashHoldings from "./BondsandCashHoldings";
import ControlsBar from "./ControlsBar";
import AssetTabs from "./AssetTab";

type PublicHoldingsProps = {
  holdingsData: Holding[] | null;
  balance: number;
};

type Holding = {
  Super_Fund: string;
  Option_Name: string;
  Listing_Status: string;
  Asset_Class: string;
  Management_Type: string;
  Dollar_Value: number;
  Weighting_Percentage_Clean: number;
  Full_Name: string;
  companies: {
    id: string;
    Parsed_Name: string;
    Sector: string;
    Description: string;
    Country: string;
  };
};
const HoldingsMain: React.FC<PublicHoldingsProps> = ({
  holdingsData,
  balance,
}) => {
  const [AssetView, setAssetView] = React.useState<
    "public" | "private" | "bonds"
  >("public");

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

  const filteredHoldings = React.useMemo(() => {
    if (!holdingsData) return [];
    if (!searchTerm.trim()) return holdingsData;

    const term = searchTerm.toLowerCase();
    return holdingsData.filter(
      (h) =>
        h.Full_Name.toLowerCase().includes(term) ||
        h.companies?.Parsed_Name.toLowerCase().includes(term) ||
        h.companies?.Sector.toLowerCase().includes(term),
    );
  }, [holdingsData, searchTerm]);

  React.useEffect(() => {
    setStartIndex(0);
    setMobileVisibleCount(mobileBatchSize);
  }, [searchTerm, AssetView, companyMode]);

  const pager = filteredHoldings.slice(startIndex, startIndex + pageSize);
  const mobilePager = filteredHoldings.slice(0, mobileVisibleCount);

  const publicWeight =
    holdingsData
      ?.filter((h) => h.Listing_Status === "Listed")
      .reduce((sum, h) => sum + (h.Weighting_Percentage_Clean ?? 0), 0) ?? 0;

  const privateWeight =
    holdingsData
      ?.filter((h) => h.Listing_Status === "Unlisted")
      .reduce((sum, h) => sum + (h.Weighting_Percentage_Clean ?? 0), 0) ?? 0;

  const bondsWeight =
    holdingsData
      ?.filter(
        (h) => h.Asset_Class === "Fixed Income" || h.Asset_Class === "Cash",
      )
      .reduce((sum, h) => sum + (h.Weighting_Percentage_Clean ?? 0), 0) ?? 0;

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
    <div className="bg-slate-100 w-full rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden max-w-7xl">
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
                      <PublicHoldings_copy
                        companyMode={companyMode}
                        pager={pager}
                        balance={balance}
                        holdingsData={holdingsData}
                      />
                    </div>
                    <div className="sm:hidden">
                      <PublicHoldings_copy
                        companyMode={companyMode}
                        pager={mobilePager}
                        balance={balance}
                        holdingsData={holdingsData}
                      />
                      {companyMode === "company" &&
                        totalResults > mobileVisibleCount && (
                          <button
                            onClick={() =>
                              setMobileVisibleCount((c) => c + mobileBatchSize)
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
                holdingsData={
                  holdingsData?.filter(
                    (h) => h.Listing_Status === "Unlisted",
                  ) ?? null
                }
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
                holdingsCashData={
                  holdingsData?.filter((h) => h.Asset_Class === "Cash") ?? null
                }
                holdingsbondsData={
                  holdingsData?.filter(
                    (h) => h.Asset_Class === "Fixed Income",
                  ) ?? null
                }
                balance={balance}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col justify-center items-center mt-12 text-center pb-10">
        <h1 className="text-xl font-semibold px-4">
          <NumericFormat
            value={listedAmount}
            thousandSeparator
            prefix="$"
            decimalScale={2}
            fixedDecimalScale
            displayType="text"
          />{" "}
          of your super is invested across{" "}
          {holdingsData?.filter((h) => h.Listing_Status === "Listed").length ||
            0}{" "}
          Publicly Listed Companies
        </h1>

        <div className="bg-orange-50 border border-orange-200 text-orange-800 rounded-2xl w-full max-w-[40rem] p-4 mt-6 flex justify-center items-center mx-4">
          <p className="text-[0.75rem] text-justify leading-relaxed">
            <strong>Notice:</strong> Based on your fund’s official holdings
            data. Holdings are typically released by funds every 6 months.
            Dollar amounts are calculated using your current balance, assuming
            the fund held the same weights at the time of reporting. Dollar
            values are estimates.{" "}
            <Link
              href="/about"
              className="underline font-medium hover:text-orange-950 transition-colors"
            >
              Read Full Disclaimer
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HoldingsMain;
