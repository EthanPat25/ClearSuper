import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { YearPoint } from "./Forumula2";

const FALLBACK_SERIES: YearPoint[] = Array.from({ length: 11 }, (_, i) => ({
  age: 30 + i * 4,
  baseline: 50000 + i * 45000,
  withBreak: 50000 + i * 45000,
}));

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
    notation: "compact",
  }).format(value);

type GraphProps = {
  series?: YearPoint[];
};

const Graph = ({ series }: GraphProps) => {
  const data = series && series.length > 0 ? series : FALLBACK_SERIES;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="age"
          tickFormatter={(age) => `${age}`}
          label={{ value: "Age", position: "insideBottom", offset: -5 }}
        />
        <YAxis tickFormatter={formatCurrency} width={64} />
        <Tooltip
          formatter={(value: number) => formatCurrency(value)}
          labelFormatter={(age) => `Age ${age}`}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="baseline"
          name="Without a break"
          stroke="#144A38"
          fill="#144A38"
          fillOpacity={0.15}
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="withBreak"
          name="With your career break"
          stroke="#F59E0B"
          fill="#F59E0B"
          fillOpacity={0.25}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Graph;
