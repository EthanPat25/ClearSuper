"use client";

import React from "react";

type Row = {
  id: string;
  label: string;
  color: string;
  percentage: string;
  value: string;
  children?: Row[];
};

export function Tablet() {
  const [openRow, setOpenRow] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<"region" | "sector">("region");

  const toggleRow = (rowId: string) => {
    setOpenRow(openRow === rowId ? null : rowId);
  };

  // Public Companies breakdowns
  const publicCompaniesByRegion: Row = {
    id: "publicCompanies",
    label: "Public Companies",
    color: "#00C49F",
    percentage: "50%",
    value: "$2,000",
    children: [
      {
        id: "australia",
        label: "Australia",
        color: "#34D399",
        percentage: "20%",
        value: "$800",
      },
      {
        id: "international",
        label: "International (Developed)",
        color: "#10B981",
        percentage: "25%",
        value: "$1,000",
      },
      {
        id: "emerging",
        label: "Emerging Markets",
        color: "#059669",
        percentage: "5%",
        value: "$200",
      },
    ],
  };

  const publicCompaniesBySector: Row = {
    id: "publicCompanies",
    label: "Public Companies",
    color: "#00C49F",
    percentage: "50%",
    value: "$2,000",
    children: [
      {
        id: "tech",
        label: "Technology",
        color: "#3B82F6",
        percentage: "15%",
        value: "$600",
      },
      {
        id: "healthcare",
        label: "Healthcare",
        color: "#9333EA",
        percentage: "10%",
        value: "$400",
      },
      {
        id: "financials",
        label: "Financials",
        color: "#F59E0B",
        percentage: "10%",
        value: "$400",
      },
      {
        id: "resources",
        label: "Resources & Energy",
        color: "#EF4444",
        percentage: "8%",
        value: "$320",
      },
      {
        id: "consumer",
        label: "Consumer Goods/Services",
        color: "#14B8A6",
        percentage: "7%",
        value: "$280",
      },
    ],
  };

  // Pick the correct version depending on view mode
  const publicCompaniesRow =
    viewMode === "region" ? publicCompaniesByRegion : publicCompaniesBySector;

  const rows: Row[] = [
    publicCompaniesRow,
    {
      id: "privateAssets",
      label: "Private Assets",
      color: "#0088FE",
      percentage: "30%",
      value: "$2,000",
      children: [
        {
          id: "property",
          label: "Property",
          color: "#5AA9E6",
          percentage: "10%",
          value: "$700",
        },
        {
          id: "infrastructure",
          label: "Infrastructure",
          color: "#7FC8F8",
          percentage: "8%",
          value: "$500",
        },
        {
          id: "privateEquity",
          label: "Private Equity",
          color: "#9BBDF9",
          percentage: "7%",
          value: "$500",
        },
        {
          id: "alternatives",
          label: "Alternatives",
          color: "#C1D3FE",
          percentage: "5%",
          value: "$300",
        },
      ],
    },
    {
      id: "cashBonds",
      label: "Cash + Bonds",
      color: "#FFBB28",
      percentage: "20%",
      value: "$2,000",
      children: [
        {
          id: "fixedInterest",
          label: "Fixed Interest",
          color: "#FFD166",
          percentage: "12%",
          value: "$1,200",
        },
        {
          id: "cash",
          label: "Cash",
          color: "#FFE066",
          percentage: "8%",
          value: "$800",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4 bg-[#334155]  w-full">
      {/* Toggle button */}

      <table className="table-fixed w-full border-collapse">
        <colgroup>
          <col className="w-1/2" />
          <col className="w-1/4" />
          <col className="w-1/4" />
        </colgroup>
        <tbody>
          {rows.map((row) => (
            <React.Fragment key={row.id}>
              <tr
                className={`text-slate-200 border-b border-slate-600 ${
                  row.children ? "cursor-pointer hover:bg-slate-800" : ""
                }`}
              >
                <td className="py-3 pl-1 pr-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: row.color }}
                    />
                    <span>{row.label}</span>
                  </div>
                </td>

                <td className="px-4 py-3 text-left font-medium">
                  {row.percentage}
                </td>
                <td className="px-4 py-3 text-left font-medium">{row.value}</td>
              </tr>

              {/* Expandable children */}
              {openRow === row.id &&
                row.children?.map((child) => (
                  <tr key={child.id} className="text-slate-300 bg-[#334155]">
                    <td className="pl-8 py-2 flex items-center gap-2">
                      <div
                        className="w-2 h-1 rounded-sm"
                        style={{ backgroundColor: child.color }}
                      />
                      {child.label}
                    </td>
                    <td className="px-4 py-2 text-left">{child.percentage}</td>
                    <td className="px-4 py-2 text-left">{child.value}</td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
