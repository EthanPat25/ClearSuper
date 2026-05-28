import React from "react";
import { Wallet } from "../AnimationComponents/Wallet";
import { CompoundGrowth } from "../AnimationComponents/CompoundGrowth";
import { Graph } from "../AnimationComponents/Graph";
import { PotPlant } from "../AnimationComponents/PotPlant";
import { ParentA } from "../AnimationComponents/ParentA";
import { ParentB } from "../AnimationComponents/ParentB";

const points = [
  {
    title: "Income breaks = contribution breaks",
    body: "Time away from paid work, whether it's caring, study, or illness, can mean less super.",
    Icon: Wallet,
  },
  {
    title: "Compounding matters",
    body: "Early and steady contributions grow the most over decades.",
    Icon: CompoundGrowth,
  },
  {
    title: "Not the same for everyone",
    body: "Women, carers, First Nations Australians, and part-time workers on average retire with less.",
    Icon: Graph,
  },
  {
    title: "Not always obvious",
    body: "Super sits in the background for decades, so gaps can build up without being obvious year to year.",

    Icon: PotPlant,
  },
];

const UnderStand = () => {
  return (
    <div className="flex w-full justify-center items-center px-4 mb-20">
      <div className="bg-slate-100 max-w-6xl rounded-[3rem] w-full overflow-hidden">
        <div className="flex flex-col items-center px-6 md:px-14 p-10">
          <p className="text-sm md:text-base text-emerald-600 font-semibold tracking-wide">
            The Bigger Picture
          </p>
          <h2 className="font-bold text-3xl text-slate-900 mt-2 text-center">
            Why super gaps matter
          </h2>
        </div>

        <div className="px-6 md:px-20 pb-16">
          <div className="space-y-12 md:space-y-16">
            {points.map(({ title, body, Icon }, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1 max-w-xl">
                  <div className="flex items-baseline gap-3">
                    <span className="font-bold text-3xl text-emerald-600 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-semibold text-xl text-slate-900">
                      {title}
                    </h3>
                  </div>
                  <p className="text-lg mt-4 text-slate-600 leading-relaxed">
                    {body}
                  </p>
                </div>

                <div className="md:w-[20rem] flex justify-center flex-shrink-0">
                  <Icon responsiveSizing="w-[7rem] h-[7rem] md:w-[8rem] md:h-[8rem]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[RGB(82,105,127)] px-8 md:px-14 py-14 md:py-16 flex flex-col md:flex-row items-center gap-10 rounded-[2rem]">
          <div className="flex w-full md:flex-1 flex-col items-center text-center">
            <div className="rounded-full bg-white/90 px-5 py-2 shadow-sm">
              <p className="text-sm font-bold text-slate-600">Case Study</p>
            </div>

            <h3 className="mt-5 text-3xl font-bold text-white">
              Meet Parent A and Parent B
            </h3>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/80">
              After their first child, Parent B works part-time for 10 years. By
              retirement, Parent B ends up{" "}
              <span className="font-bold text-white">$80,000 behind</span>. That
              difference is the{" "}
              <span className="font-bold text-amber-400">super gap</span>.
            </p>

            <a
              href="https://moneysmart.gov.au/budgeting/compound-interest-calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-bold text-slate-900 shadow-sm hover:bg-amber-400 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
            >
              Learn more about compound interest
            </a>
          </div>

          <div className="flex items-end gap-6 md:gap-8 flex-shrink-0">
            {[
              { Icon: ParentA, name: "Parent A", amount: "$500,000" },
              { Icon: ParentB, name: "Parent B", amount: "$420,000" },
            ].map(({ Icon, name, amount }) => (
              <div key={name} className="flex flex-col items-center gap-3">
                <Icon responsiveSizing="w-[8rem] h-[8rem] md:w-[10rem] md:h-[10rem]" />
                <p className="text-sm font-bold text-white">{name}</p>
                <div className="rounded-full bg-white/90 px-5 py-2 text-sm font-bold text-slate-600 tabular-nums shadow-sm">
                  {amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderStand;
