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
    <div className="w-full flex justify-center items-center px-4">
      <div className="w-full bg-white max-w-3xl border border-gray-200 rounded-2xl px-3 sm:px-6 py-2 sm:py-3 flex flex-col gap-3">
        <div className="flex w-full flex-row items-center">
          <div className="flex-1 flex justify-start">
            <div className="flex items-center bg-gray-100/80 p-1 rounded-xl">
              <button
                onClick={() => setCompanyMode("company")}
                className={`px-3 py-2 sm:py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${
                  companyMode === "company"
                    ? "bg-white text-gray-900 shadow-sm ring-1 ring-black/5"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Companies
              </button>
              <button
                onClick={() => setCompanyMode("industry")}
                className={`px-3 py-2 sm:py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${
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
              {searchOpen && (
                <svg
                  height="365pt"
                  viewBox="0 0 365.71733 365"
                  width="365pt"
                  xmlns="http://www.w3.org/2000/svg"
                  id="fi_1828665"
                  className="w-[0.6rem] h-[0.6rem]"
                >
                  <g fill="#f44336">
                    <path d="m356.339844 296.347656-286.613282-286.613281c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503906-12.5 32.769532 0 45.25l286.613281 286.613282c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082032c12.523438-12.480468 12.523438-32.75.019532-45.25zm0 0"></path>
                    <path d="m295.988281 9.734375-286.613281 286.613281c-12.5 12.5-12.5 32.769532 0 45.25l15.082031 15.082032c12.503907 12.5 32.769531 12.5 45.25 0l286.632813-286.59375c12.503906-12.5 12.503906-32.765626 0-45.246094l-15.082032-15.082032c-12.5-12.523437-32.765624-12.523437-45.269531-.023437zm0 0"></path>
                  </g>
                </svg>
              )}
              <span>{searchOpen ? "Clear Search" : "Search"}</span>
            </button>

            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="flex sm:hidden items-center justify-center h-10 w-10 bg-slate-900 text-white rounded-xl shadow-lg"
                >
                  <IconSearch size={18} />
                </button>
              </DialogTrigger>
              <DialogContent className="fixed inset-x-0 bottom-0 top-auto translate-x-0 translate-y-0 w-full max-w-none rounded-t-[2rem] border-0 p-6 pb-[calc(env(safe-area-inset-bottom)+2rem)] max-h-[75svh] overflow-y-auto sm:hidden">
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
              <div className=" p-1">
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
    </div>
  );
};

export default ControlsBar;
