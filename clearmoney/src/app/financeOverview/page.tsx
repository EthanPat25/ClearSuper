"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Superannuation } from "../AnimationComponents/Superannuation";
import { House } from "../AnimationComponents/House";
import { Bar } from "../AnimationComponents/Bar";
import { Phone } from "./Iphone";
import { Tech } from "../AnimationComponents/Tech";
import { Money } from "../AnimationComponents/Money";

export default function SuperContributions() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-slate-50 font-sans overflow-x-hidden">
      <div className="bg-gradient-to-tr from-emerald-100 to-emerald-300 text-white pt-10 pb-20 lg:pt-32 lg:pb-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex flex-col items-center text-center lg:text-left order-2 lg:order-1">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex rounded-full bg-emerald-600
ring-4 ring-emerald-950/20 shadow-inner border border-[#4FB3B8]/30 w-24 h-24 justify-center items-center mb-5"
            >
              <Superannuation />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-6xl text-emerald-950 font-extrabold text-center tracking-tight drop-shadow-sm leading-tight mb-6"
            >
              Understand <br />
              <span className="text-emerald-600 text-center">Super</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-[1.5rem] text-emerald-700 font-medium text-center leading-relaxed mb-10 max-w-lg"
            >
              See exactly what companies and industries your fund invests in.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center lg:items-start"
            >
              {/* GOLD BUTTON */}
              <Button
                asChild
                className="bg-[#F59E0B] text-slate-900 font-bold px-10 py-4 rounded-full text-xl h-auto hover:bg-[#d97706] transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <Link href="/holdings">Check My Holdings</Link>
              </Button>
            </motion.div>
          </div>
          <div className="relative flex justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-20 w-full max-w-[320px] lg:max-w-[380px]"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: -40, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute -left-4 lg:-left-12 top-10 lg:top-20 z-30 hidden md:block"
              >
                <div className="bg-white p-3 rounded-2xl shadow-xl shadow-teal-900/20 border border-slate-100 flex items-center gap-3 transform -rotate-3 hover:rotate-0 transition-transform">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Tech initialSize={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] text-slate-400 font-bold uppercase">
                      Industry
                    </p>
                    <p className="text-slate-800 font-bold text-xs">
                      Tech & Software
                    </p>
                  </div>
                </div>
              </motion.div>
              <div className="drop-shadow-2xl">
                <Phone />
              </div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 40, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-4 lg:-right-12 bottom-20 lg:bottom-32 z-30 hidden md:block"
              >
                <div className="bg-white py-3 px-4 rounded-2xl shadow-xl shadow-teal-900/20 border border-slate-100 flex items-center gap-3 transform rotate-3 hover:rotate-0 transition-transform">
                  <div className="bg-red-50 p-2 rounded-lg text-red-500">
                    <Money responsiveSizing="h-[2rem] w-[2rem]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] text-slate-400 font-bold uppercase">
                      Fees
                    </p>
                    <p className="text-slate-800 font-bold text-xs">
                      $450 / yr
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ==================================================================
          SECTION 2: FEATURE GRID (White BG)
      ================================================================== */}
      <div className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="lg:pr-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block bg-teal-50 text-teal-800 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-6">
              Transparency
            </span>

            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              What Is Your Super <br />
              <span className="text-teal-600">Really Invested In?</span>
            </h2>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              ClearSuper breaks your balance into the real companies and dollar
              amounts your fund invests in. No PDFs, no mystery.
            </p>

            <Button
              asChild
              className="bg-emerald-600 text-white px-8 py-4 text-lg font-bold rounded-full transition-all duration-200 hover:bg-emerald-700 hover:scale-105 shadow-lg shadow-emerald-200"
            >
              <Link href={"/holdings"}>See My Holdings →</Link>
            </Button>
          </motion.div>

          <motion.div
            className="relative bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 aspect-square flex flex-col items-center justify-center text-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
            <div className="z-10 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 max-w-xs w-full">
              <div className="flex justify-between items-center mb-4">
                <div className="font-bold text-slate-700">Holdings</div>
                <div className="text-xs text-green-500 font-bold">Live</div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center text-xs">
                    🍎
                  </div>
                  <div className="flex-1 h-2 bg-slate-100 rounded">
                    <div className="h-full w-3/4 bg-slate-800 rounded"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-xs">
                    🏦
                  </div>
                  <div className="flex-1 h-2 bg-slate-100 rounded">
                    <div className="h-full w-1/2 bg-slate-400 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ==================================================================
          SECTION 3: TOOLS (Slate-50 BG)
      ================================================================== */}
      <div className="bg-slate-50 py-32 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <p className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-3">
              Tools & Calculators
            </p>
            <h2 className="font-extrabold text-4xl lg:text-5xl text-slate-900">
              Plan for the Future
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {/* Card 1 */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center w-full max-w-[22rem]"
            >
              <span className="text-[0.65rem] font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full mb-4">
                First Home Saver
              </span>
              <h3 className="text-slate-900 font-bold text-xl mb-4 leading-tight">
                Could you save a deposit faster using Super?
              </h3>
              <div className="mb-6 h-32 flex items-center justify-center w-full">
                <House initialSize={100} />
              </div>
              <Button
                asChild
                className="w-full rounded-xl h-12 mt-auto bg-slate-900 hover:bg-emerald-600 text-white font-bold shadow-md transition-all"
              >
                <Link href="/FHSS">Estimate Savings</Link>
              </Button>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center w-full max-w-[22rem]"
            >
              <span className="text-[0.65rem] font-bold tracking-widest text-blue-600 uppercase bg-blue-50 px-3 py-1 rounded-full mb-4">
                Gap Calculator
              </span>
              <h3 className="text-slate-900 font-bold text-xl mb-4 leading-tight">
                Are you on track for a comfortable retirement?
              </h3>
              <div className="mb-6 h-32 flex items-center justify-center w-full relative">
                <div className="absolute inset-0 bg-slate-50 rounded-full scale-90 -z-10" />
                <Bar />
              </div>
              <Button
                asChild
                className="w-full rounded-xl h-12 mt-auto bg-slate-900 hover:bg-blue-600 text-white font-bold shadow-md transition-all"
              >
                <Link href="/SuperGap">Check My Gap</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
