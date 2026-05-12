"use client";

import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";

export type PieSuperPropArray = {
  data: Array<PieSuperBreakDownProp>;
  dimension: string;
};

export type PieSuperBreakDownProp = {
  name: string;
  value: number;
  dollars: number;
  colour: string;
};

// Hover effect: keep same size so it doesn’t extend the div
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;
  return (
    <g>
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-[#00C49F] text-[0.9rem] font-semibold"
      >
        $6,946.08
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke={fill}
        fillOpacity={1}
        style={{ transition: "all 0.25s ease-out" }}
      ></Sector>
    </g>
  );
};

export default function PieOne({ data, dimension }: PieSuperPropArray) {
  return (
    <div className={`${dimension} flex justify-center items-center`}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius="100%" // fixed pixel radius
            innerRadius="65%"
            dataKey="value"
            activeShape={renderActiveShape}
            activeIndex={0}
            fillOpacity={0.3}
          >
            <text>hello</text>

            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.colour} />
            ))}
          </Pie>
          {/*<Tooltip content={<CustomTooltip />} />*/}
          {/*"55%"*/}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
