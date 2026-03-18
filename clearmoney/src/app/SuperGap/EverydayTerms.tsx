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
    <div className=" bg-gray-100 w-full rounded-[5rem] pb-16">
      <div className="flex flex-col items-center p-10 w-full">
        <p className="text-sm text-emerald-700 font-semibold">
          Understand Your Gap
        </p>
        <h2 className="font-bold xs:text-[1rem] sm:text-[1.7rem] md:text-[2.3rem]">
          In Everyday Terms.
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-8 ">
        <div className="bg-white rounded-3xl p-6 shadow-md text-center md:w-[18rem] lg:w-[18rem] sm:h-[15rem] lg:h-[15rem] relative">
          <Info
            className={
              "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
            }
          ></Info>
          <div className="flex justify-center mb-4">
            <Coffee initialSize={150}></Coffee>
          </div>
          <h2 className="font-semibold">3750 Coffees</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md text-center md:w-[18rem] lg:w-[18rem] sm:h-[15rem] lg:h-[15rem] relative">
          <Info
            className={
              "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
            }
          ></Info>
          <div className="flex justify-center mb-4">
            <Passport initialSize={150}></Passport>
          </div>
          <h2 className="font-semibold">2 International Trips</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md text-center md:w-[18rem] lg:w-[18rem] sm:h-[15rem] lg:h-[15rem] relative">
          <Info
            className={
              "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
            }
          ></Info>
          <div className="flex justify-center mb-4">
            <Dinner initialSize={150}></Dinner>
          </div>
          <h2 className="font-semibold">214 Dinners Out</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md text-center md:w-[18rem] lg:w-[18rem] sm:h-[15rem] lg:h-[15rem] relative">
          <Info
            className={
              "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
            }
          ></Info>
          <div className="flex justify-center mb-4">
            <Dental initialSize={150}></Dental>
          </div>
          <h2 className="font-semibold">100 Dental Check-Ups</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md text-center md:w-[18rem] lg:w-[18rem] sm:h-[15rem] lg:h-[15rem] relative">
          <Info
            className={
              "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
            }
          ></Info>
          <div className="flex justify-center mb-2">
            <Iphone initialSize={150}></Iphone>
          </div>
          <h2 className="font-semibold">10 iPhones</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md text-center md:w-[18rem] lg:w-[18rem] sm:h-[15rem] lg:h-[15rem] relative">
          <Info
            className={
              "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
            }
          ></Info>
          <div className="flex justify-center mb-4">
            <Hotelbed initialSize={150}></Hotelbed>
          </div>
          <h2 className="font-semibold">100 Nights Away</h2>
        </div>
      </div>
    </div>
  );
};

export default EverydayTerms;
