import React from "react";
import Bargraph from "./Bargraph";
import { Button } from "@/components/ui/button";
import Info from "../FHSS/Info";
import { InfoIcon } from "lucide-react";

const Tap = () => {
  return (
    <div className="bg-gray-100 w-[37rem] h-[40rem] rounded-[5rem] mt-14 p-2 flex flex-col items-center">
      <div className="p-4">
        <p className="xs:text-[0.8em] md:text-sm text-[RGB(251,99,64)] font-semibold text-center">
          Your Funds
        </p>
        <h2 className="font-bold xs:text-[1.3rem] sm:text-[1.5rem] md:text-[1.5rem] text-center">
          Performance
        </h2>
      </div>

      <div className="flex w-full justify-around mt-2">
        <div className="bg-white flex rounded-3xl w-[13rem] h-[10rem] flex-col justify-center items-center ml-10 shadow-lg">
          <div className="flex justify-center items-center">
            <p className="text-sm">10 Year Net (Avg)</p>
            <InfoIcon className="w-4 h-4 ml-1 hover:scale-110"></InfoIcon>
          </div>

          <p className="font-semibold text-[2rem]">7.2% pa</p>
        </div>

        <div className="bg-white flex rounded-3xl w-[13rem] h-[10rem] flex-col justify-center items-center mr-10 shadow-lg">
          <div className="flex justify-center items-center">
            <p className="text-sm">1 Year Net (Avg)</p>
            <InfoIcon
              onClick={() => {
                console.log("Hello");
              }}
              className="w-4 h-4 ml-1 hover:scale-110"
            ></InfoIcon>
          </div>
          <p className="font-semibold text-[2rem]">10% pa</p>
        </div>
      </div>

      <div className="h-[33rem] w-[23rem] mt-10">
        <Bargraph />
      </div>

      <div className="flex justify-center items-center mt-5 mb-5">
        <Button className="flex items-center justify-center gap-2 bg-[rgb(251,99,64)] hover:bg-[rgb(230,85,55)] active:bg-[rgb(200,70,40)] w-[15rem] h-12 text-[0.9rem] font-bold text-white rounded-3xl">
          Compare Your Performance
        </Button>
      </div>
    </div>
  );
};
export default Tap;
