"use client";
import React from "react";

import { Tablet } from "./Tablet";
import PieOne, { PieSuperPropArray } from ".././holdings/PieOne";
import { Button } from "@/components/ui/button";
import { MoneyBag } from "../AnimationComponents/MoneyBag";

const data1: PieSuperPropArray = {
  data: [
    {
      name: "Public Companies",
      value: 69.5,
      dollars: 112500,
      colour: "#00C49F",
    },
    {
      name: "Private Assets",
      value: 10.9,
      dollars: 22500,
      colour: "#0088FE",
    },
    { name: "Cash + Bonds", value: 19.6, dollars: 15000, colour: "#FFBB28" },
  ],
  dimension: "w-[15rem] h-[12rem]",
};

const data2: PieSuperPropArray = {
  data: [
    {
      name: "Public Companies",
      value: 75.6,
      dollars: 112500,
      colour: "#00C49F",
    },
    {
      name: "Private Assets",
      value: 19.4,
      dollars: 22500,
      colour: "#0088FE",
    },
    { name: "Cash + Bonds", value: 5, dollars: 15000, colour: "#FFBB28" },
  ],
  dimension: "w-[15rem] h-[12rem]",
};

const ComparisonTable = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-y-5 mt-20">
      <div className="md:flex-2 flex gap-4  justify-center bg-emerald-50 rounded-2xl items-center shadow-md px-4 py-3">
        <div className="rounded-lg bg-red-300 h-10 w-10 flex justify-center items-center">
          <MoneyBag responsiveSizing="w-7 h-7"></MoneyBag>
        </div>
        <div className="flex-col text-left">
          <p className="xs:text-[0.8em] md:text-xs text-slate-400 font-semiboldr">
            Balance: $10,000
          </p>
          <h2 className="font-medium xs:text-[1rem] sm:text-[1rem] md:text-[1.2rem]">
            June 2025
          </h2>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 place-items-center items-center">
        <div className="grid grid-cols-1  w-[32rem] shadow-lg rounded-[4rem]  justify-center">
          <div className=" flex flex-col items-center pt-10">
            <span className="text-[1rem] text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
              Your Fund
            </span>
            {/* Logo + name */}
            <div className="flex items-center gap-3 mb-4 mt-4">
              <img
                src="https://cdn.brandfetch.io/australiansuper.com/icon.png"
                alt="REST Super logo"
                className="w-[4rem] h-[4rem] rounded-md bg-white p-1 shadow-sm opacity-80"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-gray-900">
                  AustralianSuper
                </span>
                <span className="text-lg font-medium text-gray-500">
                  High Growth
                </span>
              </div>
            </div>

            {/* Pie */}
            <div className="w-full flex justify-center items-center p-5">
              <PieOne data={data1.data} dimension={data1.dimension} />
            </div>
          </div>

          <div className="bg-[#334155] rounded-[3rem] py-10 px-6">
            <h1 className="text-base font-medium  text-slate-200 pb-2 mt-3 ">
              Asset Allocation
            </h1>
            <Tablet></Tablet>
          </div>
        </div>
        <div className="grid grid-cols-1 w-[32rem] shadow-lg rounded-[1.7rem] justify-center">
          <div className="bg-[#F9FAFB] rounded-[4rem] flex flex-col items-center pt-8 pb-4">
            <span className="text-[1rem] text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
              Other Fund
            </span>
            {/* Fund Header */}
            <div className="flex items-center gap-3 mb-4 mt-4">
              <img
                src="https://cdn.brandfetch.io/rest.com.au/icon.png"
                alt="REST Super logo"
                className="w-[4rem] h-[4rem] rounded-md bg-white p-1 shadow-sm opacity-80"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-gray-900">REST</span>
                <span className="text-lg font-medium text-gray-500">
                  High Growth
                </span>
              </div>
            </div>

            {/* Pie */}
            <div className="w-full flex justify-center items-center p-4">
              <PieOne data={data2.data} dimension={data1.dimension} />
            </div>
          </div>

          <div className="bg-[#334155] rounded-[1.7rem] py-10 px-6">
            <Button className="text-base font-medium text-slate-200 pb-2 mt-3">
              Asset Allocation
            </Button>
            <Button className="text-base font-medium text-slate-200 pb-2 mt-3">
              Top Industries
            </Button>
            <Tablet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
