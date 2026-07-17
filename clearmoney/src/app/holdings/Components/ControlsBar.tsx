import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconArrowLeft,
  IconSearch,
  IconX,
} from "@tabler/icons-react";

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
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const currentPage = Math.floor(startIndex / pageSize) + 1;
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
  const atStart = startIndex === 0;
  const atEnd = startIndex + pageSize >= totalResults;

  const pageLabel = atStart
    ? "Biggest holdings"
    : `Page ${currentPage} of ${totalPages}`;

  const clearSearch = () => {
    setSearchTerm("");
    setSearchOpen(false);
    inputRef.current?.blur();
  };

  // iOS requires focus() to be called synchronously inside the gesture —
  // so we focus first, then update state.
  const openSearch = () => {
    inputRef.current?.focus();
    setSearchOpen(true);
  };

  return (
    <div className="w-full flex justify-center items-center px-4">
      <div className="w-full bg-white max-w-3xl border border-gray-200 rounded-2xl px-3 sm:px-6 py-2 sm:py-3 flex flex-col overflow-hidden">

        {/* ── Mobile section ── */}
        <div className="flex sm:hidden w-full">

          {/* Back arrow — only visible when open */}
          {searchOpen && (
            <button
              type="button"
              aria-label="Close search"
              onClick={clearSearch}
              className="flex-shrink-0 p-2 -ml-1 text-gray-500 hover:text-gray-800 transition"
            >
              <IconArrowLeft size={20} />
            </button>
          )}

          {/* Input — always in DOM so focus() works synchronously on iOS */}
          <div className={`relative flex-1 ${searchOpen ? "flex" : "hidden"}`}>
            <IconSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
            <input
              ref={inputRef}
              type="search"
              enterKeyHint="search"
              placeholder="e.g. Apple, BHP, Banks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") inputRef.current?.blur(); }}
              className="w-full pl-9 pr-3 h-10 border border-slate-200 rounded-xl text-[16px] focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
            />
          </div>

          {/* Clear X when there's a term */}
          {searchOpen && searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition"
            >
              <IconX size={16} />
            </button>
          )}

          {/* Normal controls — hidden when search open */}
          {!searchOpen && (
            <div className="flex w-full flex-row items-center">
              <div className="flex-1 flex justify-start">
                <div className="flex items-center bg-gray-100/80 p-1 rounded-xl">
                  <button
                    onClick={() => setCompanyMode("company")}
                    className={`px-3 py-1 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      companyMode === "company"
                        ? "bg-white text-gray-900 shadow-sm ring-1 ring-black/5"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Companies
                  </button>
                  <button
                    onClick={() => setCompanyMode("industry")}
                    className={`px-3 py-1 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      companyMode === "industry"
                        ? "bg-white text-gray-900 shadow-sm ring-1 ring-black/5"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Industries
                  </button>
                </div>
              </div>
              {companyMode === "company" && (
                <div className="flex-1 flex justify-end">
                  <button
                    type="button"
                    aria-label="Search companies"
                    onClick={openSearch}
                    className="flex items-center justify-center h-10 w-10 bg-slate-900 text-white rounded-xl shadow-lg"
                  >
                    <IconSearch size={20} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Desktop controls row (unchanged) ── */}
        <div className="hidden sm:flex w-full flex-row items-center">
          <div className="flex-1 flex justify-start">
            <div className="flex items-center bg-gray-100/80 p-1 rounded-xl">
              <button
                onClick={() => setCompanyMode("company")}
                className={`px-3 py-1 sm:py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  companyMode === "company"
                    ? "bg-white text-gray-900 shadow-sm ring-1 ring-black/5"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Companies
              </button>
              <button
                onClick={() => setCompanyMode("industry")}
                className={`px-3 py-1 sm:py-1.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
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
            className={`flex-1 items-center gap-1 justify-center ${
              companyMode === "company" && totalResults > 0 ? "flex" : "hidden"
            }`}
          >
            <button
              aria-label="Previous page"
              className="rounded-lg p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition disabled:opacity-30 disabled:hover:bg-transparent"
              onClick={() => setStartIndex(Math.max(0, startIndex - pageSize))}
              disabled={atStart}
            >
              <IconArrowNarrowLeft size={18} />
            </button>
            <span className="text-xs sm:text-sm text-gray-500 min-w-[10rem] text-center tabular-nums">
              {pageLabel}
            </span>
            <button
              aria-label="Next page"
              className="rounded-lg p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition disabled:opacity-30 disabled:hover:bg-transparent"
              onClick={() =>
                setStartIndex(
                  Math.min(
                    startIndex + pageSize,
                    Math.max(totalResults - pageSize, 0),
                  ),
                )
              }
              disabled={atEnd}
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
              onClick={() => (searchOpen ? clearSearch() : setSearchOpen(true))}
              className="inline-flex justify-center items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50 transition"
            >
              {searchOpen ? <IconX size={14} /> : <IconSearch size={14} />}
              <span>{searchOpen ? "Clear" : "Search"}</span>
            </button>
          </div>
        </div>

        {/* ── Desktop inline search expand ── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              key="desktop-search-input"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="hidden sm:block overflow-hidden"
            >
              <div className="pt-3 px-1 pb-1 relative mt-1">
                <IconSearch
                  className="absolute left-4 top-1/2 mt-1 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
                <input
                  type="text"
                  autoFocus
                  placeholder="e.g. Apple, BHP, Banks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 h-10 border border-slate-200 rounded-xl text-base sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
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