import React from "react";
import { motion } from "framer-motion";
import SideBySide from "./SideBySide";
import Info from "../FHSS/Info"; // Assuming correct path
import { IconArrowNarrowRight, IconArrowNarrowLeft } from "@tabler/icons-react";

// Helper function to format dollar values for readability
const formatCurrency = (value) => {
  if (value === undefined || value === null) return "";
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const Tapp2 = () => {
  return (
    <div className="bg-gray-100 w-full rounded-[2.5rem] mt-14 p-6">
      <p className="text-sm text-[RGB(251,99,64)] font-semibold text-center">
        Public Holdings
      </p>
      <h2 className="font-bold text-2xl text-center">Both</h2>
      <div className="flex justify-between mb-4">
        <IconArrowNarrowLeft className="hover:scale-110"></IconArrowNarrowLeft>
        <IconArrowNarrowRight className="hover:scale-110"></IconArrowNarrowRight>
      </div>
      <div className="flex justify-between"></div>
      <div className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="bg-white rounded-3xl p-4 shadow-md w-full max-w-[12rem] flex flex-col"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <p
              className="text-xs text-gray-400 font-medium truncate"
              title="BHP Group Ltd"
            >
              BHP Group Ltd
            </p>
            <Info className="w-6 h-6" />
          </div>
          <div className="flex justify-center items-center">
            <img
              className="w-20 h-15 rounded-2xl object-contain"
              src="https://cdn.brandfetch.io/bhp.com/icon.png"
              alt="BHP logo"
            />
          </div>

          <div className="text-center">
            <div className="w-full">
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-gray-500">ART</span>
                <span className="font-semibold text-base text-gray-800">
                  {formatCurrency(1500)}
                </span>
              </div>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-gray-500">Rest</span>
                <span className="font-semibold text-base text-gray-800">
                  {formatCurrency(1450)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="bg-white rounded-3xl p-4 shadow-md w-full max-w-[12rem] flex flex-col"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <p
              className="text-xs text-gray-400 font-medium truncate"
              title="BHP Group Ltd"
            >
              BHP Group Ltd
            </p>
            <Info className="w-6 h-6" />
          </div>
          <div className="flex justify-center items-center">
            <img
              className="w-20 h-15 rounded-2xl object-contain"
              src="https://cdn.brandfetch.io/bhp.com/icon.png"
              alt="BHP logo"
            />
          </div>

          <div className="text-center">
            <div className="w-full">
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-gray-500">ART</span>
                <span className="font-semibold text-base text-gray-800">
                  {formatCurrency(1500)}
                </span>
              </div>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-gray-500">Rest</span>
                <span className="font-semibold text-base text-gray-800">
                  {formatCurrency(1450)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Card 3 Placeholder --- */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="bg-white rounded-3xl p-4 shadow-md w-full max-w-[12rem] flex flex-col"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <p
              className="text-xs text-gray-400 font-medium truncate"
              title="BHP Group Ltd"
            >
              BHP Group Ltd
            </p>
            <Info className="w-6 h-6" />
          </div>
          <div className="flex justify-center items-center">
            <img
              className="w-20 h-15 rounded-2xl object-contain"
              src="https://cdn.brandfetch.io/bhp.com/icon.png"
              alt="BHP logo"
            />
          </div>

          <div className="text-center">
            <div className="w-full">
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-gray-500">ART</span>
                <span className="font-semibold text-base text-gray-800">
                  {formatCurrency(1500)}
                </span>
              </div>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-gray-500">Rest</span>
                <span className="font-semibold text-base text-gray-800">
                  {formatCurrency(1450)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="bg-white rounded-3xl p-4 shadow-md w-full max-w-[12rem] flex flex-col"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <p
              className="text-xs text-gray-400 font-medium truncate"
              title="BHP Group Ltd"
            >
              BHP Group Ltd
            </p>
            <Info className="w-6 h-6" />
          </div>
          <div className="flex justify-center items-center">
            <img
              className="w-20 h-15 rounded-2xl object-contain"
              src="https://cdn.brandfetch.io/bhp.com/icon.png"
              alt="BHP logo"
            />
          </div>

          <div className="text-center">
            <div className="w-full">
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-gray-500">ART</span>
                <span className="font-semibold text-base text-gray-800">
                  {formatCurrency(1500)}
                </span>
              </div>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-gray-500">Rest</span>
                <span className="font-semibold text-base text-gray-800">
                  {formatCurrency(1450)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        <SideBySide></SideBySide>
      </div>
    </div>
  );
};

export default Tapp2;
