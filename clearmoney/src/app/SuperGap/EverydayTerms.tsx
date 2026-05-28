import React from "react";
import { Coffee } from "../AnimationComponents/Coffee";
import { Passport } from "../AnimationComponents/Passport";
import { Dinner } from "../AnimationComponents/Dinner";
import { Dental } from "../AnimationComponents/Dental";
import { Iphone } from "../AnimationComponents/Iphone";
import { Hotelbed } from "../AnimationComponents/Hotelbed";
import Info from "../FHSS/Info";

const EverydayTerms = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-slate-100 w-full rounded-[3rem] pb-16 max-w-5xl">
        <div className="flex flex-col items-center p-10 w-full">
          <p className="text-base text-emerald-700">
            What does <span className="font-bold  tabular-nums">$11,000</span>{" "}
            actually buy?
          </p>
          <h2 className="font-bold xs:text-[1rem] sm:text-[1.7rem] md:text-3xl mt-1">
            In Everyday Terms.
          </h2>
        </div>

        <div className="w-full flex justify-center items-center">
          <div className="w-full grid grid-cols-2 md:grid-cols-3 justify-center max-w-3xl pb-5 gap-6">
            <div className="bg-white flex justify-center items-center flex-col rounded-3xl p-6 shadow-md text-center relative">
              <Info className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center" />
              <div className="flex justify-center mb-4">
                <Coffee responsiveSizing="w-[7rem] h-[7rem]" />
              </div>
              <h2 className="font-semibold">10 iPhones</h2>
            </div>

            <div className="bg-white flex justify-center items-center flex-col rounded-3xl p-6 shadow-md text-center relative">
              <Info className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center" />
              <div className="flex justify-center mb-4">
                <Passport responsiveSizing="w-[7rem] h-[7rem]" />
              </div>
              <h2 className="font-semibold">10 iPhones</h2>
            </div>

            <div className="bg-white flex justify-center items-center flex-col rounded-3xl p-6 shadow-md text-center relative">
              <Info className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center" />
              <div className="flex justify-center mb-4">
                <Dinner responsiveSizing="w-[7rem] h-[7rem]" />
              </div>
              <h2 className="font-semibold">10 iPhones</h2>
            </div>

            <div className="bg-white flex justify-center items-center flex-col rounded-3xl p-6 shadow-md text-center relative">
              <Info className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center" />
              <div className="flex justify-center mb-4">
                <Dental responsiveSizing="w-[7rem] h-[7rem]" />
              </div>
              <h2 className="font-semibold">10 iPhones</h2>
            </div>

            <div className="bg-white flex justify-center items-center flex-col rounded-3xl p-6 shadow-md text-center relative">
              <Info className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center" />
              <div className="flex justify-center mb-4">
                <Iphone responsiveSizing="w-[7rem] h-[7rem]" />
              </div>
              <h2 className="font-semibold">10 iPhones</h2>
            </div>

            <div className="bg-white flex justify-center items-center flex-col rounded-3xl p-6 shadow-md text-center relative">
              <Info className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center" />
              <div className="flex justify-center mb-4">
                <Hotelbed responsiveSizing="w-[7rem] h-[7rem]" />
              </div>
              <h2 className="font-semibold">100 Nights Away</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EverydayTerms;
