import React from "react";
import { Superannuation } from "../../AnimationComponents/Superannuation";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { SuperFund, funds } from "../data/SuperFunds";

type HeroSectionProps = {
  reference: React.RefObject<HTMLDivElement | null>;
  fund?: string;
  option?: string;
  showSelectedFund?: boolean;
  onSelectFund?: (fund: SuperFund) => void;
};

const HeroSection = ({
  reference,
  fund,
  option,
  showSelectedFund,
  onSelectFund,
}: HeroSectionProps) => {
  const selectedFund = fund
    ? funds.find((superFund) => superFund.name === fund)
    : undefined;

  const selectedFundDomain = selectedFund?.domain;

  return (
    <div className="bg-gradient-to-tr from-emerald-100 to-emerald-300 p-6 pb-24 relative">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #000000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="mt-24 flex flex-col items-center p-10 relative z-10">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex rounded-full ring-4 ring-emerald-950/20 bg-[#a7d7f3] shadow-inner border border-[#4FB3B8]/30 w-20 h-20 sm:w-24 sm:h-24 justify-center items-center mb-5"
        >
          <Superannuation responsiveSizing="h-full w-full" />
        </motion.div>

        <div className="text-4xl sm:text-5xl lg:text-6xl text-emerald-950 font-extrabold tracking-tight drop-shadow-sm leading-[1.1] text-center">
          How your fund <br />
          <span className="text-emerald-600">invests</span>
        </div>

        <h3 className="text-center font-medium text-emerald-900 text-[1.2rem] sm:text-[1.5rem] max-w-xl">
          <br></br> View exposure to the companies, property, and assets your
          fund invests in.
        </h3>
      </div>

      <div className="flex justify-center mb-5 relative z-10">
        {showSelectedFund && fund ? (
          <Button
            className="rounded-full bg-[#F59E0B] px-10 py-8 text-xl font-bold text-[#451a03] shadow-sm hover:bg-[#d97706] sm:flex-none"
            onClick={() => {
              reference.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
              });
            }}
          >
            View holdings
          </Button>
        ) : (
          <Button
            className="rounded-full bg-[#F59E0B] px-10 py-8 text-xl font-bold text-[#451a03] shadow-sm hover:bg-[#d97706] sm:ml-2"
            onClick={() => {
              reference.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
              });
            }}
          >
            Select fund{" "}
            <svg
              version="1.1"
              id="fi_32195"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="451.847px"
              height="451.847px"
              viewBox="0 0 451.847 451.847"
              enableBackground="new 0 0 451.847 451.847"
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
		c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
		c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
                ></path>
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
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
