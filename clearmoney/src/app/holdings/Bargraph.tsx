import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Your Fund",
    "performance (%)": 7.5,
    amt: 7,
  },
  {
    name: "Median",
    "performance (%)": 6,
    amt: 7,
  },
];

const Bargraph = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={100} height={400} data={data}>
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis dataKey="name" />
        <YAxis hide />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="performance (%)"
          barSize={70}
          stackId="a"
          fill="#8884d8"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Bargraph;
