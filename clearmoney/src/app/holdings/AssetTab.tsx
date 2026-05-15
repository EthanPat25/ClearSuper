"use client";
import React from "react";

const AssetTabs = ({ AssetView, setAssetView, weight }) => {
  const assetTabs = [
    {
      key: "public",
      desktopLabel: "Public Companies",
      mobileLabel: "Listed",
      color: "#00C49F",
      weight: weight.publicWeight,
    },
    {
      key: "private",
      desktopLabel: "Private Assets",
      mobileLabel: "Unlisted",
      color: "#3B82F6",
      weight: weight.privateWeight,
    },
    {
      key: "bonds",
      desktopLabel: "Cash & Bonds",
      mobileLabel: "Cash",
      color: "#F59E0B",
      weight: weight.bondsWeight,
    },
  ];
  return (
    <div className="grid grid-cols-3 sm:flex gap-2 px-4 sm:px-1 sm:justify-center w-full pt-5 sm:pt-6 mb-4 sm:mb-2 overflow-x-auto no-scrollbar pb-3">
      {assetTabs.map((item) => (
        <button
          key={item.key}
          onClick={() => setAssetView(item.key)}
          className={`
            flex items-center justify-center gap-1.5 sm:gap-2.5
            py-2.5 sm:min-w-[13.8rem] sm:flex-none
            px-2 sm:px-5
            rounded-xl sm:rounded-3xl
            text-xs sm:text-sm font-bold sm:font-medium
            transition-all duration-200 border
            ${
              AssetView === item.key
                ? "bg-slate-900 text-white border-slate-900 shadow-sm sm:bg-gray-900"
                : "bg-white border-slate-200 sm:border-gray-300 sm:text-gray-700 hover:bg-gray-50"
            }
          `}
        >
          <div
            className="h-2 w-2 sm:h-3 sm:w-3 shrink-0 rounded-full sm:rounded-sm"
            style={{ backgroundColor: item.color }}
          />
          <span className="sm:whitespace-nowrap">
            <span className="sm:hidden">{item.mobileLabel}</span>
            <span className="hidden sm:inline">{item.desktopLabel}</span>
          </span>
          <span className="text-orange-500 font-bold sm:text-sm">
            {item.weight.toFixed(1)}%
          </span>
        </button>
      ))}
    </div>
  );
};

export default AssetTabs;
