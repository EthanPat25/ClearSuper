"use client";

import React from "react";
import { Medicare } from "../AnimationComponents/Medicare";
import { Superannuation } from "../AnimationComponents/Superannuation";
import { Taxes } from "../AnimationComponents/Taxes";
import { House } from "../AnimationComponents/House";
import { MoneyBag } from "../AnimationComponents/MoneyBag";
import Info from "../FHSS/Info";
import { motion } from "motion/react";
import { Upload } from "../AnimationComponents/Upload";
import { Bar } from "../AnimationComponents/Bar";
import { Button } from "@/components/ui/button";
import { Piee } from "../AnimationComponents/Piee";

export default function SuperContributions() {
  const salary = 70000;
  const marginalTaxRate = 0.325; // Example: 32.5% tax rate
  const superTaxRate = 0.15;
  const extraSuper = 2;

  // Calculate the tax savings if contributing extra to super
  const taxSavings = extraSuper * (marginalTaxRate - superTaxRate);
  const takeHomePay =
    salary - salary * marginalTaxRate - extraSuper + taxSavings;

  return (
    <div className="w-screen p-6 bg-[RGB(3,181,183)] relative">
      <div className="mt-24"></div>

      <div className="flex justify-evenly">
        <div className="flex flex-col items-center p-10 w-full">
          <div className="flex rounded-full bg-[RGB(82,105,127)]  w-24 h-24 justify-center items-center mb-5">
            <Superannuation></Superannuation>
          </div>

          <h2 className="text-center text-[RGB(255,255,255)] font-bold xs:text-[2.5rem] sm:text-[3rem] md:text-[3.7rem]">
            Get a Clearer View of <br></br>Your Super
          </h2>
        </div>
      </div>

      {/*
      <div className="flex flex-col items-center">
        <div className="bg-white rounded-3xl p-6 shadow-md w-[70%] text-center">
    
          {/* Slider for extra super contributions 

          <div className="w-full flex">
            <div className="flex flex-col w-1/2 justify-center items-center">
              <h2 className="font-bold text-xl text-[RGB(82,83,127)]">Your Income: $70,000</h2>
              <p>Your Pay After Tax: ${takeHomePay.toLocaleString()}</p>
              <p className="text-sm text-[RGB(251,99,64)] font-semibold mt-52 mb-3">10% Higher than the Median</p>

              <div className="bg-[RGB(82,83,127)] rounded-3xl p-4 shadow-md text-center w-80 relative">
              <Info className = {"absolute top-2 right-2 w-6 h-6 flex justify-center items-center"}></Info>
                <h2 className="font-semibold text-white text-center">The Median Salary is $65,000</h2>
              </div>
            </div>
            <div className=" h-96 w-1/2 flex justify-center items-center">
              <Pie1></Pie1>
            </div>

          </div>
                
        </div>
      </div>

*/}

      <div className="flex flex-row items-center justify-evenly">
        <div className="flex justify-center">
          <Button className="flex items-center justify-center gap-2 bg-[rgb(251,99,64)] w-56 h-12 text-[1rem] font-bold text-white">
            Start With My Balance
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
        <motion.div
          key={1}
          className="relative bg-[RGB(82,105,127)] rounded-3xl p-6 shadow-md w-80 text-white"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <div className="flex items-center">
            <h2 className=" text-2xl font-[700] text-white">{"Super Scan"}</h2>
            <p className="text-sm text-[RGB(251,99,64)] font-semibold ml-5">
              (AI-powered)
            </p>
          </div>
          <p className="text-sm text-white font-[600] ">
            Upload Your Statements and demystify your Super
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>

      <div className="flex bg-[RGB(255,255,255)] w-full h-[30rem]">
        <div className="bg-[RGB(0,142,244)] rounded-xl p-6 shadow-md w-[24rem] h-[23rem] ml-20 mt-10">
          {/* Slider for extra super contributions */}
          <div className="flex flex-col justify-evenly">
            <h2 className="font-bold text-[1.7rem] text-[RGB(255,255,255)]">
              Super Gap Calculator
            </h2>
            <div className="flex justify-center">
              <Bar></Bar>
            </div>

            <p className="text-sm text-[RGB(251,99,64)] font-semibold">
              Explore your Savings
            </p>
            <div className="flex justify-center">
              <Button className="w-52 h-10 bg-[RGB(82,105,127)]">
                Calculate
              </Button>
            </div>
          </div>

          <div className="w-1/2 flex justify-center items-center"></div>
        </div>

        <div className="bg-[RGB(133,211,61)] rounded-xl p-6 shadow-md w-[24rem] h-[23rem] ml-5 mt-10">
          {/* Slider for extra super contributions */}

          <div className=" flex flex-col justify-evenly">
            <h2 className="font-bold text-center text-[1.5rem] text-[RGB(255,255,255)]">
              See How Super Can Boost Your First Home Deposit
            </h2>

            <div className="flex justify-center">
              <House></House>
            </div>

            <p className="text-sm text-[RGB(255,255,255)] font-semibold mb-5">
              Super contributions are taxed differently. FHSS Scheme turns this
              into a first home advantage.
            </p>
            <div className="flex justify-center">
              <Button className=" w-52 h-10 bg-[RGB(82,105,127)]">
                Calculate
              </Button>
            </div>
          </div>

          <div className="w-1/2 flex justify-center items-center"></div>
        </div>

        <div className="bg-[RGB(255,119,119)] rounded-xl p-6 shadow-md w-[24rem] h-[23rem] ml-5 mt-10">
          {/* Slider for extra super contributions */}
          <div className=" flex flex-col justify-evenly">
            <h2 className="font-bold text-center text-[1.5rem] text-[RGB(82,83,127)]">
              See What Your Super Fund Actually Invests In
            </h2>
            <div className="flex justify-center">
              <Piee></Piee>
            </div>
            <p className="text-bas text-center text-[RGB(251,99,64)] font-semibold mb-5">
              Discover the companies and sectors your money is funding
            </p>
            <div className="flex justify-center">
              <Button className="bg-[RGB(82,105,127)] w-52 h-10">
                Calculate
              </Button>
            </div>
          </div>

          <div className="w-1/2 flex justify-center items-center"></div>
        </div>
      </div>

      <div className="flex justify-evenly mt-20">
        {[
          {
            label: "Super Scan",
            icon: <MoneyBag initialSize={50}></MoneyBag>,
            amount: takeHomePay,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="relative bg-[RGB(82,105,127)] rounded-3xl p-6 shadow-md w-80"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <div className="flex items-center">
              <h2 className=" text-2xl font-[700] text-white">{item.label}</h2>
              <p className="text-sm text-[RGB(251,99,64)] font-semibold ml-5">
                (AI-powered)
              </p>
            </div>
            <p className="text-sm text-white font-[600] ">
              Upload Your Statements and demystify your Super
            </p>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center p-6 w-full mt-96">
        <p className="text-sm text-[RGB(251,99,64)] font-semibold">Visualise</p>
        <h2 className="font-bold xs:text-[1.5rem] sm:text-[2rem] md:text-[2.5rem]">
          Where Does My Salary Go?
        </h2>
      </div>

      <div className="flex justify-evenly mt-20">
        {[
          {
            label: "Paid to you",
            icon: <MoneyBag initialSize={150}></MoneyBag>,
            amount: takeHomePay,
          },
          {
            label: "Paid in taxes",
            icon: <Taxes></Taxes>,
            amount: salary * marginalTaxRate,
          },
          {
            label: "Paid into Medicare",
            icon: <Medicare></Medicare>,
            amount: 2000,
          },
          {
            label: "Paid into Super",
            icon: <Superannuation></Superannuation>,
            amount: 7000,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="relative bg-[RGB(82,105,127)] rounded-3xl p-6 shadow-md text-center w-1/5"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Info
              className={
                "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
              }
            ></Info>
            <h2 className="font-semibold text-white">{item.label}</h2>
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h2 className="font-semibold text-white">
              ${item.amount.toLocaleString()}
            </h2>
          </motion.div>
        ))}
      </div>

      <div className="mt-20"></div>

      <div className="flex flex-col items-start ml-10">
        <div className="bg-white rounded-xl p-6 shadow-md w-96 text-center">
          {/* Slider for extra super contributions */}

          <h2 className="font-bold text-[1.5rem] text-[RGB(82,83,127)] text-center">
            Super Balance: $21,555
          </h2>

          {/*<div className="bg-[RGB(82,83,127)] rounded-3xl p-4 shadow-md text-center w-80 relative">
              <Info className = {"absolute top-2 right-2 w-6 h-6 flex justify-center items-center"}></Info>
                <h2 className="font-semibold text-white text-center">The Median Salary is $65,000</h2>
              </div>*/}
        </div>
      </div>

      <div className="flex justify-evenly mt-20">
        {[
          {
            label: "Upload Your Super Statements",
            icon: <Upload></Upload>,
            amount: takeHomePay,
          },
          {
            label: "Enter Your Information",
            icon: <Upload></Upload>,
            amount: takeHomePay,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="relative bg-[RGB(82,105,127)] rounded-3xl p-6 shadow-md text-center w-1/5"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <h2 className="font-semibold text-white">{item.label}</h2>
            <div className="flex justify-center mb-4">{item.icon}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-start ml-10 mt-10">
        <div className="bg-white rounded-xl p-6 shadow-md w-96 text-center">
          {/* Slider for extra super contributions */}

          <h2 className="font-bold text-[1.5rem] text-[RGB(82,83,127)] text-center">
            Savings: $10,555
          </h2>

          {/*<div className="bg-[RGB(82,83,127)] rounded-3xl p-4 shadow-md text-center w-80 relative">
              <Info className = {"absolute top-2 right-2 w-6 h-6 flex justify-center items-center"}></Info>
                <h2 className="font-semibold text-white text-center">The Median Salary is $65,000</h2>
              </div>*/}
        </div>
      </div>

      <div className="flex flex-col items-start ml-10 mt-10">
        <div className="bg-white rounded-xl p-6 shadow-md w-96 text-center">
          {/* Slider for extra super contributions */}

          <h2 className="font-bold text-[1.5rem] text-[RGB(82,83,127)] text-center">
            Investments: $5,555
          </h2>

          {/*<div className="bg-[RGB(82,83,127)] rounded-3xl p-4 shadow-md text-center w-80 relative">
              <Info className = {"absolute top-2 right-2 w-6 h-6 flex justify-center items-center"}></Info>
                <h2 className="font-semibold text-white text-center">The Median Salary is $65,000</h2>
              </div>*/}
        </div>
      </div>

      <div className="flex flex-col items-start ml-10 mt-10">
        <div className="bg-white rounded-xl p-6 shadow-md w-96 text-center">
          {/* Slider for extra super contributions */}

          <h2 className="font-bold text-[1.5rem] text-[RGB(82,83,127)] text-center">
            Debt: $34,555
          </h2>

          {/*<div className="bg-[RGB(82,83,127)] rounded-3xl p-4 shadow-md text-center w-80 relative">
              <Info className = {"absolute top-2 right-2 w-6 h-6 flex justify-center items-center"}></Info>
                <h2 className="font-semibold text-white text-center">The Median Salary is $65,000</h2>
              </div>*/}
        </div>
      </div>

      <div className="flex justify-evenly mt-20">
        {[
          {
            label: "Higher Education",
            icon: <MoneyBag initialSize={150}></MoneyBag>,
            amount: takeHomePay,
          },
          {
            label: "Car",
            icon: <Taxes></Taxes>,
            amount: salary * marginalTaxRate,
          },
          { label: "Personal", icon: <Medicare></Medicare>, amount: 2000 },
          {
            label: "Paid into Super",
            icon: <Superannuation></Superannuation>,
            amount: 7000,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="relative bg-[RGB(82,105,127)] rounded-3xl p-6 shadow-md text-center w-1/5"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <Info
              className={
                "absolute top-4 right-4 w-8 h-8 flex justify-center items-center"
              }
            ></Info>
            <h2 className="font-semibold text-white">{item.label}</h2>
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h2 className="font-semibold text-white">
              ${item.amount.toLocaleString()}
            </h2>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-start ml-10 mt-10">
        <div className="bg-white rounded-xl p-6 shadow-md w-96 text-center">
          {/* Slider for extra super contributions */}

          <h2 className="font-bold text-[1.5rem] text-[RGB(82,83,127)] text-center">
            Net Worth: $34,555
          </h2>

          {/*<div className="bg-[RGB(82,83,127)] rounded-3xl p-4 shadow-md text-center w-80 relative">
              <Info className = {"absolute top-2 right-2 w-6 h-6 flex justify-center items-center"}></Info>
                <h2 className="font-semibold text-white text-center">The Median Salary is $65,000</h2>
              </div>*/}
        </div>
      </div>
    </div>
  );
}
