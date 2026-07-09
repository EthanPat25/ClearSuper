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
import { NumericFormat } from "react-number-format";
import { ChevronDown } from "lucide-react";

export default function SuperContributions() {
  const router = useRouter();
  return (
    <div className="w-screen flex flex-col bg-slate-50 font-sans overflow-x-hidden">
      <div className="bg-gradient-to-tr from-emerald-100 to-emerald-300 text-white pt-20 pb-32 lg:pt-32 lg:pb-48 relative overflow-visible min-h-[calc(100dvh-4rem)] flex justify-center items-center">
        <div
          className="absolute inset-0 opacity-[0.05] overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-6xl justify-center items-center grid grid-cols-1 sm:mt-[5rem] lg:mt-0 lg:grid-cols-2 gap-0 md:gap-12 lg:gap-12 relative z-10">
          <div className="flex flex-col items-center text-center order-1 p-6">
            <div className="sm:bg-none lg:bg-transparent py-10 gap-6 sm:gap-0 px-8 sm:py-10 lg:p-0 flex flex-col justify-center items-center w-full">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex rounded-full bg-emerald-600 ring-4 ring-emerald-950/20 shadow-inner border border-[#4FB3B8]/30 w-20 h-20 sm:w-24 sm:h-24 2xl:w-28 2xl:h-28 justify-center items-center sm:mb-8"
              >
                <Superannuation responsiveSizing="w-full h-full" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className=" text-5xl sm:text-6xl lg:text-7xl 2xl:text-8xl text-emerald-950 font-extrabold tracking-tight drop-shadow-sm leading-[1.1] sm:mt-0 sm:mb-6 text-center"
              >
                Understand <span className="text-emerald-600">Super</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sm:hidden text-lg text-emerald-800 font-medium leading-relaxed max-w-xs text-center"
              >
                See exactly what companies and industries your fund invests in.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.95, transition: { duration: 0.4 } }}
                whileHover={{ scale: 1.05 }}
                onClick={() => router.push("/holdings")}
                className="sm:hidden bg-[#F59E0B] text-slate-900 font-bold py-3 px-6 rounded-full text-base mt-2 hover:bg-[#d97706] transition-colors shadow-xl hover:shadow-2xl"
              >
                Check My Holdings
              </motion.button>
            </div>

            {/* DESKTOP subtitle + CTA */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[1.5rem] hidden sm:block 2xl:text-[2rem] text-emerald-700 font-medium leading-relaxed mb-10 max-w-lg text-center"
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
              className="bg-[#F59E0B] hidden sm:block text-slate-900 font-bold px-6 py-7 md:px-8 md:py-5 2xl:px-10 2xl:py-6 rounded-full text-base sm:text-xl 2xl:text-2xl lg:w-auto max-w-[300px] 2xl:max-w-[340px] hover:bg-[#d97706] transition-colors shadow-xl hover:shadow-2xl"
            >
              Check My Holdings
            </motion.button>
          </div>

          <div className="relative flex flex-col items-center order-2 mt-5 lg:mt-0 z-20 -mb-48 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[310px] sm:max-w-[360px] lg:max-w-[340px]"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: -25, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute -left-3 sm:-left-8 lg:-left-20 top-16 lg:top-24 z-30 scale-75 lg:scale-100"
              >
                <div className="bg-white py-2 px-3 sm:p-3 rounded-2xl shadow-xl shadow-teal-900/20 border border-slate-100 flex items-center gap-3 transform -rotate-3 hover:rotate-0 transition-transform">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Tech responsiveSizing="h-[1.5rem] w-[1.5rem] sm:h-[2rem] sm:w-[2rem]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] sm:text-[9px] text-slate-400 font-bold uppercase">
                      Industry
                    </p>
                    <p className="text-slate-800 font-bold text-[10px] sm:text-xs">
                      Tech & Software
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="mx-auto w-[220px] sm:w-[280px] lg:w-[340px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
                <Phone />
              </div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 25, opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute -right-3 sm:-right-8 lg:-right-20 bottom-32 lg:bottom-40 z-30 scale-75 lg:scale-100"
              >
                <div className="bg-white py-2 px-3 sm:py-3 sm:px-4 rounded-2xl shadow-xl shadow-teal-900/20 border border-slate-100 flex items-center gap-3 transform rotate-3 hover:rotate-0 transition-transform">
                  <div className="bg-red-50 p-2 rounded-lg text-red-500">
                    <Money responsiveSizing="h-[1.5rem] w-[1.5rem] sm:h-[2rem] sm:w-[2rem]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] sm:text-[9px] text-slate-400 font-bold uppercase">
                      Fees
                    </p>
                    <p className="text-slate-800 font-bold text-[10px] sm:text-xs">
                      $450 / yr
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pt-[10rem] lg:pt-32 pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="lg:pr-10 flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex w-full justify-start items-start">
              <span className="inline-block bg-amber-100 text-amber-800 text-sm font-medium tracking-wider px-3 py-2 mb-6 rounded-xl">
                Behind The Balance
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              From industries <br />
              <span className="text-teal-600">down to companies.</span>
            </h2>

            <p className="text-xl text-slate-600 mb-4 leading-relaxed font-medium">
              Curious how much of your super is in mining? Tech? Banks?
            </p>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed font-medium">
              ClearSuper breaks every industry down to the underlying companies,
              so you can explore as deep as you want.
            </p>

            <div className="w-full flex justify-start items-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="border-2 border-emerald-600 hover:fill-[#F59E0B] text-emerald-700 px-7 py-3 text-base font-bold rounded-full hover:bg-emerald-50 hover:border-[#F59E0B] hover:text-[#F59E0B] hover:scale-105 transition-all"
              >
                <Link
                  href={"/holdings"}
                  className="flex gap-3 justify-center items-center w-full h-full"
                >
                  <p>Start Exploring </p>
                  <svg
                    version="1.1"
                    id="fi_271226"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="w-[1rem] fill-emerald-700 "
                    viewBox="0 0 492.004 492.004"
                    enableBackground="new 0 0 492.004 492.004"
                    xmlSpace="preserve"
                  >
                    <g>
                      <g>
                        <path
                          d="M484.14,226.886L306.46,49.202c-5.072-5.072-11.832-7.856-19.04-7.856c-7.216,0-13.972,2.788-19.044,7.856l-16.132,16.136
			c-5.068,5.064-7.86,11.828-7.86,19.04c0,7.208,2.792,14.2,7.86,19.264L355.9,207.526H26.58C11.732,207.526,0,219.15,0,234.002
			v22.812c0,14.852,11.732,27.648,26.58,27.648h330.496L252.248,388.926c-5.068,5.072-7.86,11.652-7.86,18.864
			c0,7.204,2.792,13.88,7.86,18.948l16.132,16.084c5.072,5.072,11.828,7.836,19.044,7.836c7.208,0,13.968-2.8,19.04-7.872
			l177.68-177.68c5.084-5.088,7.88-11.88,7.86-19.1C492.02,238.762,489.228,231.966,484.14,226.886z"
                        ></path>
                      </g>
                    </g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                  </svg>
                </Link>
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="relative bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden min-h-[36rem] sm:aspect-square sm:min-h-0 w-full max-w-lg md:max-w-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[24%] sm:translate-y-[29%] bg-white rounded-[2rem] border border-slate-100 flex flex-col overflow-hidden shadow-2xl w-[calc(100%-2rem)] max-w-[21.5rem]">
              {/* Header */}
              <div className="px-8 pt-10 pb-10 flex flex-col items-center text-center gap-4 bg-amber-100 border-b border-white">
                <div className="w-24 h-24 flex items-center justify-center bg-white rounded-3xl shadow-xl border-4 border-white">
                  <Mining responsiveSizing="w-[5rem] h-[5rem]" />
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
            <h2 className="font-extrabold text-2xl lg:text-5xl text-slate-900">
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
