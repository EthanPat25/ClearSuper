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
import { useRouter } from "next/navigation";
import { Mining } from "../AnimationComponents/Mining";

export default function SuperContributions() {
  const router = useRouter();
  return (
    <div className="w-screen min-h-screen flex flex-col bg-slate-50 font-sans overflow-x-hidden">
      <div className="bg-gradient-to-tr from-emerald-100 to-emerald-300 text-white pt-20 pb-32 lg:pt-32 lg:pb-48 relative overflow-visible">
        <div
          className="absolute inset-0 opacity-[0.05] overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-0 md:gap-12 lg:gap-8 items-center relative z-10">
          <div className="flex flex-col items-center text-center order-1">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex rounded-full bg-emerald-600
ring-4 ring-emerald-950/20 shadow-inner border border-[#4FB3B8]/30 w-20 h-20 lg:w-24 lg:h-24 justify-center items-center mb-6"
            >
              <Superannuation />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl text-emerald-950 font-extrabold tracking-tight drop-shadow-sm leading-[1.1] mb-6 text-center"
            >
              Understand <br />
              <span className="text-emerald-600">Super</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-[1.5rem] text-emerald-700 font-medium leading-relaxed mb-10 max-w-lg text-center"
            >
              See exactly what companies and industries your fund invests in.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.4 },
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push("/holdings")}
              className="bg-[#F59E0B] text-slate-900 font-bold py-3 md:px-8 md:py-5 rounded-full text-xl w-full lg:w-auto max-w-[300px] hover:bg-[#d97706] transition-colors shadow-xl hover:shadow-2xl"
            >
              Check My Holdings
            </motion.button>
          </div>

          <div className="relative flex flex-col items-center order-2 mt-20 lg:mt-0 z-20 -mb-48 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px]"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: -30, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute -left-10 lg:-left-20 top-16 lg:top-24 z-30 scale-75 lg:scale-100"
              >
                <div className="bg-white p-3 rounded-2xl shadow-xl shadow-teal-900/20 border border-slate-100 flex items-center gap-3 transform -rotate-3 hover:rotate-0 transition-transform">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Tech responsiveSizing="h-[2rem] w-[2rem]" />
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

              <div className="drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
                <Phone />
              </div>

              {/* Fees Card */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 30, opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute -right-10 lg:-right-20 bottom-32 lg:bottom-40 z-30 scale-75 lg:scale-100"
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

      <div className="pt-64 lg:pt-32 pb-24 px-6 bg-white">
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
            className="relative bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden aspect-square"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute bottom-0 left-[15%] translate-y-[29%] bg-white rounded-[2rem] border border-slate-100 flex flex-col overflow-hidden shadow-2xl w-[60%]">
              {/* Header */}
              <div className="px-8 pt-10 pb-10 flex flex-col items-center text-center gap-4 bg-amber-100 border-b border-white">
                <div className="w-24 h-24 flex items-center justify-center bg-white rounded-3xl shadow-xl border-4 border-white">
                  <Mining responsiveSizing="w-[5rem] h-[5rem]"></Mining>
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Mining & Minerals
                  </h2>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700 border border-amber-700">
                    85 Companies
                  </span>
                </div>
              </div>

              <div className="px-6 pt-6 pb-6">
                <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100/50">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Your Proportional Exposure
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-black text-slate-900 tabular-nums tracking-tighter">
                      $3,324.74
                    </span>
                    <span className="text-base font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg">
                      6.65%
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    Biggest Pieces of the Pie
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Showing top 3
                  </span>
                </div>

                {[
                  {
                    name: "BHP",
                    domain: "bhp.com",
                    weight: "2.10",
                    value: "$1,052",
                  },
                  {
                    name: "Rio Tinto",
                    domain: "riotinto.com",
                    weight: "1.27",
                    value: "$636",
                  },
                  {
                    name: "Fortescue",
                    domain: "fmgl.com.au",
                    weight: "0.54",
                    value: "$271",
                  },
                ].map((c) => (
                  <div
                    key={c.name}
                    className="w-full text-left rounded-2xl p-4 bg-slate-50 border border-slate-100 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        className="w-8 h-8 rounded-lg object-contain bg-white border border-slate-100 p-1"
                        src={`https://cdn.brandfetch.io/${c.domain}/icon/theme/dark/c=1idfCQLm9sumx6VuVu3`}
                        onError={(e) => {
                          e.currentTarget.src = `https://www.google.com/s2/favicons?sz=64&domain=${c.domain}`;
                        }}
                        alt={c.name}
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          {c.name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {c.weight}% of super
                        </p>
                      </div>
                    </div>
                    <span className="text-lg font-black text-slate-900">
                      {c.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-slate-50 py-32 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <p className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-3">
              Tools & Calculators
            </p>
            <h2 className="font-extrabold text-4xl lg:text-5xl text-slate-900">
              Calculators that Feel Human
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
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
              <div className="mb-6 h-32 flex items-center justify-center w-full"></div>
              <Button
                asChild
                className="w-full rounded-xl h-12 mt-auto bg-slate-900 hover:bg-emerald-600 text-white font-bold shadow-md transition-all"
              >
                <Link href="/FHSS">Estimate Savings</Link>
              </Button>
            </motion.div>

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
