import React from "react";
import { Superannuation } from "../AnimationComponents/Superannuation";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-tr from-emerald-100 to-emerald-300 p-6 pb-20 min-h-[calc(100dvh-4rem)] flex flex-col justify-center items-center">
      <div className="mt-24 flex flex-col items-center justify-center p-10">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="flex rounded-full ring-4 ring-emerald-950/20 border border-[#4FB3B8]/30 bg-emerald-600 w-20 h-20 sm:w-24 sm:h-24 justify-center items-center mb-5"
        >
          <Superannuation responsiveSizing="w-full h-full" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl lg:text-6xl text-emerald-950 font-extrabold tracking-tight drop-shadow-sm leading-[1.1] text-center"
        >
          The Super Gap
          <br />
          <span className="text-emerald-600">is real</span>
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center font-medium text-emerald-900 xs:text-[1rem] sm:text-[1.5rem] max-w-xl mt-5"
        >
          Life happens. See how career breaks and part-time work can shape your
          super.
        </motion.h3>
      </div>
      <div className="flex justify-center mb-3">
        <Button className="bg-amber-500 text-slate-900 font-bold px-8 py-4 rounded-full text-lg h-auto hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 shadow-lg gap-2">
          Calculate my gap
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
