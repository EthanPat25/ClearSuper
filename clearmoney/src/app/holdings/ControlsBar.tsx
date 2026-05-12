import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

type ControlsBarProps = {
  companyMode: "company" | "industry";
  setCompanyMode: (mode: "company" | "industry") => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  startIndex: number;
  setStartIndex: (index: number) => void;
  totalResults: number;
  pageSize: number;
  rangeLabel: string;
};

const ControlsBar: React.FC<ControlsBarProps> = ({
  companyMode,
  setCompanyMode,
  searchOpen,
  setSearchOpen,
  searchTerm,
  setSearchTerm,
  startIndex,
  setStartIndex,
  totalResults,
  pageSize,
  rangeLabel,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[0.4fr,2fr,0.4fr] w-full px-3 sm:px-10">
      <div className="hidden sm:block" />
      <div className="w-full bg-white shadow-sm border border-gray-200 rounded-2xl px-3 sm:px-6 py-2 sm:py-3 flex flex-col gap-3">
        <div className="flex w-full flex-row items-center">
          <div className="flex-1 flex justify-start">
            <div className="flex items-center bg-gray-100/80 p-1 rounded-xl">
              <button
                onClick={() => setCompanyMode("company")}
                className={`px-3 py-2 sm:py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all duration-200 ${
                  companyMode === "company"
                    ? "bg-white text-gray-900 shadow-sm ring-1 ring-black/5"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Companies
              </button>
              <button
                onClick={() => setCompanyMode("industry")}
                className={`px-3 py-2 sm:py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all duration-200 ${
                  companyMode === "industry"
                    ? "bg-white text-gray-900 shadow-sm ring-1 ring-black/5"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Industries
              </button>
            </div>
          </div>

          <div
            className={`flex-1 items-center gap-3 justify-center ${
              companyMode === "company" && totalResults > 0
                ? "hidden sm:flex"
                : "hidden"
            }`}
          >
            <button
              className="rounded-full p-2 bg-slate-200 hover:bg-slate-300 transition disabled:opacity-40"
              onClick={() => setStartIndex(Math.max(0, startIndex - pageSize))}
              disabled={startIndex === 0}
            >
              <IconArrowNarrowLeft size={18} />
            </button>
            <h3 className="text-xs sm:text-sm text-gray-500">{rangeLabel}</h3>
            <button
              className="rounded-full p-2 bg-slate-200 hover:bg-slate-300 transition disabled:opacity-40"
              onClick={() =>
                setStartIndex(
                  Math.min(
                    startIndex + pageSize,
                    Math.max(totalResults - pageSize, 0),
                  ),
                )
              }
              disabled={startIndex + pageSize >= totalResults}
            >
              <IconArrowNarrowRight size={18} />
            </button>
          </div>

          <div
            className={`flex-1 flex justify-end items-center gap-2 ${
              companyMode === "company" ? "flex" : "hidden"
            }`}
          >
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 transition"
            >
              <IconSearch
                size={16}
                className={searchOpen ? "hidden" : "block"}
              />
              <span>{searchOpen ? "Close Search" : "Search"}</span>
            </button>

            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="flex sm:hidden items-center justify-center h-10 w-10 bg-slate-900 text-white rounded-xl shadow-lg active:scale-95 transition-transform"
                >
                  <IconSearch size={18} />
                </button>
              </DialogTrigger>
              <DialogContent className="fixed bottom-0 top-auto left-0 right-0 translate-x-0 translate-y-0 w-full max-w-none rounded-t-[2rem] border-0 p-6 pb-12 sm:hidden animate-in slide-in-from-bottom duration-300">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">
                      Search Companies
                    </h3>
                    <DialogClose className="rounded-full p-2 bg-slate-100 text-slate-500">
                      <IconX size={20} />
                    </DialogClose>
                  </div>
                  <div className="relative">
                    <IconSearch
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      autoFocus
                      type="text"
                      placeholder="e.g. Apple, BHP, Banks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 h-14 bg-slate-50 border-2 border-slate-100 rounded-2xl text-base focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:outline-none transition-all"
                    />
                  </div>
                  {searchTerm && (
                    <div className="text-center py-2">
                      <DialogClose asChild>
                        <button className="text-emerald-600 font-bold text-sm">
                          Show {totalResults} results
                        </button>
                      </DialogClose>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              key="search-input"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="hidden sm:block overflow-hidden"
            >
              <div className="relative pt-3">
                <IconSearch
                  className="absolute left-3 bottom-3 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search a company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 h-10 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-800 focus:outline-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="hidden sm:block" />
    </div>
  );
};

export default ControlsBar;
