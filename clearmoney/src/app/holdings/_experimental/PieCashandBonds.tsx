import React from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Sector,
} from "recharts";
import { dataforwardProps } from "./Components/BondsandCashHoldings";

const data = [
  { name: "Cash", value: 49, color: "#1A8C8C" }, // dark navy
  { name: "Fixed Interest (Bonds)", value: 43, color: "#FF6600" }, // blue
];

// Hover effect (enlarges slice)
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 10}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

// Custom tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value, color } = payload[0].payload;
    return (
      <div className="bg-white shadow-md rounded-lg px-3 py-2 text-sm flex items-center gap-2">
        {/* Colored box */}
        <div
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: color }}
        />
        <span className="font-medium">{name}</span>
        <span className="text-gray-500 ml-2">{value}%</span>
      </div>
    );
  }
  return null;
};

export default function PieCashandBonds({
  dataforward,
}: {
  dataforward: dataforwardProps;
}) {
  const cashPct = (dataforward.cashAmount / dataforward.totalamount) * 100;
  const bondsPct = (dataforward.bondsAmount / dataforward.totalamount) * 100;

  data[0].value = Number(cashPct.toFixed(1));
  data[1].value = Number(bondsPct.toFixed(1));
  return (
    <ResponsiveContainer width="100%" aspect={1}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius="80%"
          dataKey="value"
          activeShape={renderActiveShape}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
