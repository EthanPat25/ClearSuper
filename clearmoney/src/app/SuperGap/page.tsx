"use client";

import React from "react";
import EverydayTerms from "./EverydayTerms";
import Graph from "./Graph";
import UnderStand from "./UnderStand";
import { CloseGapCalculator } from "./CloseGapCalculator";
import HeroSection from "./HeroSection";
import SuperGapCalcSection from "./SuperGapCalcSection";
import { motion } from "motion/react";

export default function SuperContributions() {
  const [view, setView] = React.useState<"terms" | "case" | "close">("terms");

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <HeroSection></HeroSection>
      <div className="w-screen p-6 bg-[RGB(250,251,252)] relative h-[100svh]">
        <SuperGapCalcSection></SuperGapCalcSection>
      </div>
      <section className="mt-16 w-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-center flex-wrap gap-2 mb-6 w-full">
            <button
              onClick={() => setView("terms")}
              className={`px-4 py-2 rounded-3xl text-sm flex justify-center items-center gap-2 min-w-[11rem] ${view === "terms" ? "bg-gray-900 text-white border" : "border"}`}
            >
              <div className="h-2 w-2 sm:h-3 sm:w-3 shrink-0 rounded-full sm:rounded-sm bg-red-500" />
              In Everyday Terms
            </button>
            <button
              onClick={() => setView("case")}
              className={`px-4 py-2 rounded-3xl flex text-sm gap-2 justify-center items-center min-w-[11rem] ${view === "case" ? "bg-gray-900 text-white border" : "border"}`}
            >
              <div className="h-2 w-2 sm:h-3 sm:w-3 shrink-0 rounded-full sm:rounded-sm bg-blue-500" />
              Why Gaps Matter
            </button>
            <button
              onClick={() => setView("close")}
              className={`px-4 py-2 rounded-3xl flex gap-2 text-sm justify-center items-center min-w-[11rem] ${view === "close" ? "bg-gray-900 text-white border" : "border"}`}
            >
              <div className="h-2 w-2 sm:h-3 sm:w-3 shrink-0 rounded-full sm:rounded-sm bg-green-500" />
              Close the Gap
            </button>
          </div>

          {/* Content */}
          {view === "terms" && <EverydayTerms />}
          {view === "case" && <UnderStand />}
          {view === "close" && (
            <div className="flex justify-evenly mt-10">
              <div className="w-[45%]">
                <CloseGapCalculator />
              </div>
              <div className=" flex justify-center items-center w-[55%]">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 w-full">
                  <h4 className="text-base font-medium mb-2">Impact</h4>
                  <div className="h-[360px] bg-gray-50 rounded-xl p-3">
                    <Graph />
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Adjust the weekly amount to see how your trajectory changes.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
