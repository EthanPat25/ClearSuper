import React from "react";
import { Superannuation } from "../AnimationComponents/Superannuation";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-tr from-emerald-100 to-emerald-300 p-6 pb-20">
      <div className="mt-24 flex flex-col items-center p-10">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="flex rounded-full ring-4 ring-emerald-400 bg-emerald-600 w-24 h-24 justify-center items-center mb-5"
        >
          <Superannuation />
        </motion.div>
        <h2 className="text-center text-emerald-950 font-[800] xs:text-[2rem] sm:text-[3rem] md:text-[3.7rem] leading-tight tracking-tight mb-5">
          The Super Gap
          <br />
          <span className="text-center text-emerald-600 font-[800] xs:text-[2rem] sm:text-[3rem] md:text-[3.7rem]">
            is Real
          </span>
        </h2>

        <h3 className="text-center font-[500] text-emerald-700 xs:text-[1rem] sm:text-[1.5rem] text-[RGB(255,255,255)]">
          Life happens can mean less super.
          <br></br>Check your gap and help raise awareness.
        </h3>
      </div>
      <div className="flex justify-center mb-3">
        <Button className="bg-[#F59E0B] text-slate-900 font-bold px-8 py-4 rounded-full text-lg h-auto hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
          Calculate My Gap
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
