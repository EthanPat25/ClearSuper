import React from "react";
import { motion } from "motion/react";

const SideBySide = () => {
  return (
    <div className="flex w-full justify-evenly hidden">
      <motion.div
        className="bg-white rounded-3xl shadow-md w-[30rem] text-center mt-5 h-[22rem]"
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 14,
          ease: "easeInOut",
        }}
        viewport={{ once: true }}
      >
        <div className="p-6 pb-0 w-full border-solid border-[RGB(246,246,249)] border-b">
          <h1 className="mb-4 text-left text-lg font-bold">FHSS</h1>
        </div>
        <div className="p-6 pt-0">
          <div className="mt-4 flex justify-between">
            <h2 className="text-left">Starting balance</h2>
            <h2 className="text-left">$40,000</h2>
          </div>
          <div className="mt-4 mb-4 flex justify-between">
            <h2 className="text-left">Administration fees</h2>
            <h2 className="text-left">$1,720</h2>
          </div>

          <div className="mt-4 mb-4 flex justify-between">
            <h2 className="text-left">Time Period</h2>
            <h2 className="text-left">10 Years</h2>
          </div>
          <div className="mt-4 mb-4 flex justify-between">
            <h2 className="text-left">Investment returns</h2>
            <h2 className="text-left">$10,000 (7.8%)</h2>
          </div>
          <div className="mt-4 mb-4 flex justify-between">
            <h2 className="text-left">SG (employer) contributions</h2>
            <h2 className="text-left">$10,000</h2>
          </div>
          <div className="mt-4 mb-4 flex justify-between">
            <div className="flex justify-center items-center">
              <h2 className="text-left font-bold">End Balance</h2>
            </div>
            <h2 className="text-left font-bold">$50,000</h2>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SideBySide;
