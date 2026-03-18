"use client";
import React from "react";
import { NavigationMenuDemo } from "./NavBar copy";

/**
 * NavBar with a compact "Fund + Option" context selector in the top-right.
 *
 * Usage example:
 * <NavBar
 *   selection={selection}
 *   onChangeSelection={setSelection}
 *   fundOptions={fundOptions}
 * />
 *
 * Where:
 * selection = { fundId: "aus_super", optionId: "high_growth" } OR null
 * fundOptions = [
 *   { id: "aus_super", name: "AustralianSuper", options: [{ id: "high_growth", name: "High Growth" }, ...] },
 *   ...
 * ]
 */

const NavBar = ({
  selection = null,
  onChangeSelection = () => {},
  fundOptions = [],
}) => {
  // Resolve display label for current selection
  const current = React.useMemo(() => {
    if (!selection) return null;
    const fund = fundOptions.find((f) => f.id === selection.fundId);
    const option = fund?.options?.find((o) => o.id === selection.optionId);
    if (!fund || !option) return null;
    return { fund, option };
  }, [selection, fundOptions]);

  const displayLabel = current
    ? `${current.fund.name} — ${current.option.name}`
    : "Select fund & option";

  // Handy helpers
  const clearSelection = () => onChangeSelection(null);

  const setFundAndFirstOption = (fundId) => {
    const fund = fundOptions.find((f) => f.id === fundId);
    const firstOpt = fund?.options?.[0];
    if (!fund || !firstOpt) return;
    onChangeSelection({ fundId: fund.id, optionId: firstOpt.id });
  };

  const setOption = (fundId, optionId) => {
    onChangeSelection({ fundId, optionId });
  };

  return (
    <div className="navbar bg-white fixed top-0 z-50 w-full border-b border-base-200">
      <div className="mx-auto w-full max-w-[76rem] px-4 md:px-8 grid grid-cols-3 items-center">
        {/* Left */}
        <div className="justify-self-start">
          <a className="text-[1.3rem] font-semibold hover:opacity-80 transition">
            <span className="font-semibold">ClearSuper</span>
          </a>
        </div>

        {/* Center */}
        <div className="justify-self-center">
          <NavigationMenuDemo />
        </div>

        {/* Right */}
        <div className="justify-self-end flex items-center gap-2">
          {/* Desktop selector */}
          <div className="hidden md:block">
            <div className="dropdown dropdown-end">
              <button className="btn btn-ghost rounded-full border border-base-200">
                <span className="font-semibold">{displayLabel}</span>
                <svg
                  className="ml-2 h-4 w-4 opacity-60"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="dropdown-content z-[1] mt-2 w-[360px] rounded-box bg-base-100 shadow border border-base-200">
                {/* Header */}
                <div className="px-4 pt-4 pb-2">
                  <div className="text-sm opacity-70">Currently viewing</div>
                  <div className="font-semibold">{displayLabel}</div>
                </div>

                <div className="divider my-0" />

                {/* Fund list + option list */}
                <div className="p-3">
                  {fundOptions.length === 0 ? (
                    <div className="text-sm opacity-70 px-1 py-2">
                      No funds loaded.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {/* Funds column */}
                      <div className="min-w-0">
                        <div className="text-xs font-semibold opacity-60 px-2 pb-2">
                          Funds
                        </div>
                        <ul className="menu bg-base-100 rounded-box p-1 max-h-64 overflow-auto">
                          {fundOptions.map((f) => {
                            const isActive = current?.fund?.id === f.id;
                            return (
                              <li key={f.id}>
                                <button
                                  className={isActive ? "active" : ""}
                                  onClick={() => setFundAndFirstOption(f.id)}
                                  title={f.name}
                                >
                                  <span className="truncate">{f.name}</span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Options column */}
                      <div className="min-w-0">
                        <div className="text-xs font-semibold opacity-60 px-2 pb-2">
                          Options
                        </div>

                        {!current ? (
                          <div className="text-sm opacity-70 px-2 py-2">
                            Select a fund to view options.
                          </div>
                        ) : (
                          <ul className="menu bg-base-100 rounded-box p-1 max-h-64 overflow-auto">
                            {current.fund.options?.map((opt) => {
                              const isActive = current.option.id === opt.id;
                              return (
                                <li key={opt.id}>
                                  <button
                                    className={isActive ? "active" : ""}
                                    onClick={() =>
                                      setOption(current.fund.id, opt.id)
                                    }
                                    title={opt.name}
                                  >
                                    <span className="truncate">{opt.name}</span>
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Footer actions */}
                  <div className="flex items-center justify-between pt-3">
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={clearSelection}
                      disabled={!selection}
                    >
                      Clear
                    </button>

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        // If nothing selected, pick first fund+option to avoid dead-end
                        if (!current && fundOptions[0]?.options?.[0]) {
                          onChangeSelection({
                            fundId: fundOptions[0].id,
                            optionId: fundOptions[0].options[0].id,
                          });
                        }
                        // Otherwise do nothing (dropdown closes automatically on click outside;
                        // DaisyUI doesn't auto-close on button click in all configs)
                      }}
                    >
                      Done
                    </button>
                  </div>

                  <div className="text-xs opacity-60 pt-2">
                    Tip: holdings can differ by option.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile overflow button (keep your existing icon) */}
          <button
            className="btn btn-square btn-ghost block md:hidden"
            aria-label="More"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 0 012 0zm7 0a1 1 0 11-2 0 1 0 012 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
