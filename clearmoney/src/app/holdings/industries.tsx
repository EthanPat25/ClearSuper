import React from "react";
import { motion } from "framer-motion";
import { House } from "../AnimationComponents/House";
import { NumericFormat } from "react-number-format";
import { Bank } from "../AnimationComponents/Bank";
import { Casino } from "../AnimationComponents/Casino";
import { Hospital } from "../AnimationComponents/Hospital";
import { Tech } from "../AnimationComponents/Tech";
import { Trolley } from "../AnimationComponents/Trolley";
import { Defence } from "../AnimationComponents/Defence";
import { Mining } from "../AnimationComponents/Mining";
import { Oil } from "../AnimationComponents/Oil";

const array = [
  {
    industry: "Technology & Software",
    animation: <Tech initialSize={120}></Tech>,
  },
  { industry: "Banks & Finance", animation: <Bank initialSize={120}></Bank> },
  {
    industry: "Healthcare & Biotech",
    animation: <Hospital initialSize={120}></Hospital>,
  },
  {
    industry: "Consumer Goods & Retail",
    animation: <Trolley initialSize={120}></Trolley>,
  },
  { industry: "Real Estate", animation: <House initialSize={120}></House> },
  {
    industry: "Casinos & Gaming",
    animation: <Casino initialSize={120}></Casino>,
  },
  {
    industry: "Aerospace & Defence",
    animation: <Defence initialSize={120}></Defence>,
  },
  {
    industry: "Mining & Minerals",
    animation: <Mining initialSize={120}></Mining>,
  },
  {
    industry: "Oil & Gas",
    animation: <Oil initialSize={120}></Oil>,
  },
];

const Industries = () => {
  return (
    <>
      {array.map((element, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          whileHover={{ y: -6 }}
          className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[16rem] relative hover:shadow-xl"
        >
          <div className="flex flex-col justify-between items-center">
            {element.animation}
          </div>

          <h2 className="xs:text-sm md:text-base font-medium mb-2">
            {element.industry}
          </h2>

          <p className="font-semibold text-xl ">
            <NumericFormat
              value={0}
              thousandSeparator
              prefix="$"
              displayType="text"
            />
          </p>
        </motion.div>
      ))}
    </>
  );
};

export default Industries;
