import React from "react";
import { Superannuation } from "../AnimationComponents/Superannuation";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-[rgb(3,181,183)] to-[#9bdbdc] p-6 pb-16">
      <div className="mt-24 flex flex-col items-center p-10">
        <div className="flex rounded-full bg-[RGB(82,105,127)] w-24 h-24 justify-center items-center mb-5">
          <Superannuation />
        </div>
        <h2 className="text-center text-[RGB(255,255,255)] font-bold xs:text-[2rem] sm:text-[3rem] md:text-[3.7rem]">
          The Super Gap is Real <br />
        </h2>
        <h3 className="text-center xs:text-[1rem] sm:text-[1.3rem] text-[RGB(255,255,255)]">
          Life happens — caring, part-time work, or time off can mean less
          super.
          <br></br>Check your gap and help raise awareness.
        </h3>
      </div>
      <div className="flex justify-center mb-5">
        <Button className="flex items-center justify-center gap-2 bg-[rgb(251,99,64)] w-[15rem] h-12 text-[0.9rem] font-bold text-white">
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
