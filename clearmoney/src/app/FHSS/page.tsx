"use client";

import React from "react";
import { LoginForm } from "@/components/login-form";

import EverydayTerms from "./EverydayTerms";
import Breakdown from "./Breakdown";
import { Button } from "@/components/ui/button";
import SideBySide from "./SideBySide";
import { Superannuation } from "../AnimationComponents/Superannuation";

export default function SuperContributions() {
  // Calculate the tax savings if contributing extra to super
  // bg-[RGB(250,251,252)]
  //  bg-gray-100
  // Potential colour: bg-[RGB(82,105,127)]

  return (
    <div className="w-full bg-[RGB(250,251,252)] relative">
      <div className="bg-gradient-to-b from-[rgb(3,181,183)] to-[#9bdbdc] p-6 pb-16 w-full">
        <div className="mt-24 flex flex-col items-center p-10">
          <div className="flex rounded-full bg-[RGB(82,105,127)] w-24 h-24 justify-center items-center mb-5">
            <Superannuation />
          </div>
          <h2 className="text-center text-[RGB(255,255,255)] font-bold xs:text-[2.2rem] sm:text-[3rem] md:text-[3.7rem]">
            Boost your desposit <br />
          </h2>
        </div>

        <div className="flex justify-center mb-5">
          <div className="flex w-[31rem] justify-center">
            <Button className="flex items-center justify-center gap-2 bg-[rgb(251,99,64)] xs:w-[13.5rem] sm:w-[15rem] h-12 text-[0.9rem] font-bold text-white">
              FHSS Calc
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-10"></div>

      <div className="flex mt-20 justify-evenly">
        <div className="flex justify-center items-center">
          <div className="w-[30rem]">
            <h1 className="ml-4 mb-1 text-[0.8rem] hover:underline hover:cursor-pointer">
              <a>Confused by the Difference?</a>
            </h1>
            <LoginForm />
          </div>
        </div>

        <div className="flex flex-col w-1/2 items-center">
          <Breakdown></Breakdown>
        </div>
      </div>

      <div className="w-full h-[50rem] flex flex-col items-center pt-12">
        <div className="flex flex-col items-center p-6 w-full">
          <p className="text-sm text-[RGB(251,99,64)] font-semibold">
            Understand
          </p>
          <h2 className="font-bold xs:text-[2rem] sm:text-[2.5rem] md:text-[3.5rem]">
            The Breakdown
          </h2>
        </div>

        <div className="w-[75%]">
          <SideBySide></SideBySide>
        </div>
      </div>

      <EverydayTerms></EverydayTerms>
    </div>
  );
}
