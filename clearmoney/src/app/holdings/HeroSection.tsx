import React from "react";
import { Superannuation } from "../AnimationComponents/Superannuation";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { funds, type FundOption } from "./WizardForm/funds";

type referenceProp = {
  reference: any;
  fund?: string;
  option?: string;
  showSelectedFund?: boolean;
  onSelectFund?: (fund: FundOption) => void;
};

const fundDomains: Record<string, string> = {
  AustralianSuper: "australiansuper.com",
  Rest: "rest.com.au",
  Hostplus: "hostplus.com.au",
  "Australian Retirement Trust": "australianretirementtrust.com",
  "Aware Super": "aware.com.au",
};

const HeroSection = ({
  reference,
  fund,
  option,
  showSelectedFund,
  onSelectFund,
}: referenceProp) => {
  const selectedFundDomain = fund ? fundDomains[fund] : undefined;
  const [changeFundOpen, setChangeFundOpen] = React.useState(false);

  return (
    // Background: Your "Daylight Teal" (Bright & Engaging)
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
          className="flex rounded-full bg-[#a7d7f3] shadow-inner border border-[#4FB3B8]/30 w-24 h-24 justify-center items-center mb-5"
        >
          <Superannuation />
        </motion.div>

        <h2 className="text-center text-emerald-900 font-bold xs:text-[2rem] sm:text-[3rem] md:text-[3.7rem] drop-shadow-sm">
          How your fund invests
        </h2>

        <h3 className="text-center text-emerald-800 xs:text-sm sm:text-lg md:text-xl max-w-xl mx-auto mt-3 leading-snug font-medium">
          See how your super is invested. <br></br> Enter your balance to view
          your share of the companies, property, and assets it owns.
        </h3>
      </div>

      <div className="flex justify-center mb-5 relative z-10">
        {showSelectedFund && fund ? (
          <Button
            className="rounded-full bg-[#F59E0B] px-10 py-5 text-xl font-bold text-[#451a03] shadow-sm hover:bg-[#d97706] sm:flex-none"
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
            Select fund
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
