import React from "react";
import SideBySide from "./SideBySide";
import { motion } from "motion/react";
import Info from "../FHSS/Info";

const Tapp3 = () => {
  return (
    <div className="bg-gray-100 w-full rounded-[2.5rem] mt-14 p-6">
      <p className="xs:text-[0.8em] md:text-sm text-[RGB(251,99,64)] font-semibold text-center">
        Public Holdings
      </p>
      <h2 className="font-bold xs:text-[1.3rem] sm:text-[1.5rem] md:text-[1.5rem] text-center">
        Only in Rest
      </h2>
      <div className="grid grid-cols-2 justify-items-center gap-6 w-full mt-7">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[13rem] max-h-[9rem] relative"
        >
          <p
            className="absolute top-4 left-4 text-xs text-gray-400 font-medium leading-none truncate max-w-[65%]"
            title="apple"
          >
            apple
          </p>

          {/* Info icon */}
          <Info className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center" />

          {/* Logo container */}
          <div className="flex flex-col justify-between items-center">
            <img
              className="xs:w-[5rem] xs:h-[5rem] sm:w-[6rem] sm:h-[6rem] md:w-[4rem] md:h-[4rem] rounded-[3rem] mb-4"
              src={`https://cdn.brandfetch.io/foxnews.com/icon/theme/dark/c=1idfCQLm9sumx6VuVu3`}
            />
          </div>

          {/* Company name + hard-coded dollar value */}
          <h2 className="xs:text-sm md:text-base font-medium">
            Apple:
            <span className="font-semibold text-base"> $100</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[11rem] max-h-[9rem] relative"
        >
          <p
            className="absolute top-4 left-4 text-xs text-gray-400 font-medium leading-none truncate max-w-[65%]"
            title="apple"
          >
            apple
          </p>

          {/* Info icon */}
          <Info className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center" />

          {/* Logo container */}
          <div className="flex flex-col justify-between items-center">
            <img
              className="xs:w-[5rem] xs:h-[5rem] sm:w-[6rem] sm:h-[6rem] md:w-[4rem] md:h-[4rem] rounded-[3rem] mb-4"
              src={`https://cdn.brandfetch.io/apple.com/icon/theme/dark/c=1idfCQLm9sumx6VuVu3`}
            />
          </div>

          {/* Company name + hard-coded dollar value */}
          <h2 className="xs:text-sm md:text-base font-medium">
            Apple:
            <span className="font-semibold text-base"> $100</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[11rem] max-h-[9rem] relative"
        >
          <p
            className="absolute top-4 left-4 text-xs text-gray-400 font-medium leading-none truncate max-w-[65%]"
            title="apple"
          >
            apple
          </p>

          {/* Info icon */}
          <Info className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center" />

          {/* Logo container */}
          <div className="flex flex-col justify-between items-center">
            <img
              className="xs:w-[5rem] xs:h-[5rem] sm:w-[6rem] sm:h-[6rem] md:w-[4rem] md:h-[4rem] rounded-[3rem] mb-4"
              src={`https://cdn.brandfetch.io/apple.com/icon/theme/dark/c=1idfCQLm9sumx6VuVu3`}
            />
          </div>

          {/* Company name + hard-coded dollar value */}
          <h2 className="xs:text-sm md:text-base font-medium">
            Apple:
            <span className="font-semibold text-base"> $100</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-3xl p-6 pt-10 shadow-md text-center w-full max-w-[11rem] max-h-[9rem] relative"
        >
          <p
            className="absolute top-4 left-4 text-xs text-gray-400 font-medium leading-none truncate max-w-[65%]"
            title="apple"
          >
            apple
          </p>

          {/* Info icon */}
          <Info className="absolute top-4 right-4 w-8 h-8 flex justify-center items-center" />

          {/* Logo container */}
          <div className="flex flex-col justify-between items-center">
            <img
              className="xs:w-[5rem] xs:h-[5rem] sm:w-[6rem] sm:h-[6rem] md:w-[4rem] md:h-[4rem] rounded-[3rem] mb-4"
              src={`https://cdn.brandfetch.io/apple.com/icon/theme/dark/c=1idfCQLm9sumx6VuVu3`}
            />
          </div>

          {/* Company name + hard-coded dollar value */}
          <h2 className="xs:text-sm md:text-base font-medium">
            Apple:
            <span className="font-semibold text-base"> $100</span>
          </h2>
        </motion.div>

        <SideBySide></SideBySide>
      </div>
    </div>
  );
};
export default Tapp3;
