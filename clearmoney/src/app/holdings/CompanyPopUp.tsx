import { Button } from "@/components/ui/button";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type CompanyPopUpProps = {
  trigger: React.ReactNode;
  element: {
    fullName: string;
    parsedName: string;
    domain: string;
  };
};

export function CompanyPopUp({ trigger, element }: CompanyPopUpProps) {
  return (
    <Dialog>
      <form className="w-full h-full flex justify-center items-center">
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="flex flex-col w-[30rem] h-[24rem] p-6 bg-white gap-y-6">
          <div className="w-full flex">
            <div className="flex justify-center items-center gap-x-4">
              <img
                className="w-[6rem] h-[6rem] rounded-2xl object-contain"
                src={`https://cdn.brandfetch.io/${element.domain}/icon.png`}
                alt="BHP logo"
              />
              <div className="flex-col">
                <h1 className="font-bold text-xl">{element.fullName}</h1>
                <div className="rounded-3xl bg-[#dbeafe] px-2 py-[0.1rem] text-sm text-center mt-2">
                  <p className="text-blue-700 text-sm">Mining & Resources</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[3rem]">
            <p className="text-sm text-slate-500">
              A leading global resources company, extracting and processing
              minerals like iron ore and copper
            </p>
          </div>
          <div className="flex flex-col w-full gap-y-3">
            <p className="text-base font-medium text-slate-700">
              Show funds where:
            </p>
            <Button className="w-full bg-[#e6e7eb] hover:bg-[#d4d5da] active:bg-[#c4c5c9] h-[3rem] rounded-3xl transition">
              <p className="text-[#222c3a] text-base">
                More of your super is in BHP
              </p>
            </Button>

            <Button className="w-full bg-[#e6e7eb] hover:bg-[#d4d5da] active:bg-[#c4c5c9] h-[3rem] rounded-3xl transition">
              <p className="text-[#222c3a] text-base">
                Less of your super is in BHP
              </p>
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default CompanyPopUp;
