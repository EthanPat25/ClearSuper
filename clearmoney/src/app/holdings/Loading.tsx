import React from "react";
import { motion } from "motion/react";
import { MoneyBag } from "../AnimationComponents/MoneyBag";

type LoadingProps = {
  classname: string;
};

const Loading = ({ classname }: LoadingProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0.8, scale: 0.9 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{
          duration: 2,
          ease: "easeIn",
          repeat: Infinity,
        }}
        className={`${classname}`}
      >
        <MoneyBag responsiveSizing="w-[4rem] h-[4rem]"></MoneyBag>
      </motion.div>
    </>
  );
};

export default Loading;
