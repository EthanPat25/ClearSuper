"use client";

import React from "react";
import { motion } from "motion/react";
import { Coffee } from "../AnimationComponents/Coffee";
import { Passport } from "../AnimationComponents/Passport";
import { Dinner } from "../AnimationComponents/Dinner";
import { Dental } from "../AnimationComponents/Dental";
import { Iphone } from "../AnimationComponents/Iphone";
import { Hotelbed } from "../AnimationComponents/Hotelbed";
import Info from "../FHSS/Info";
import { EVERYDAY_PRICES } from "./everydayItems";

const DEFAULT_EXAMPLE_GAP = 80000;

const ICONS: Record<
  string,
  React.ComponentType<{ responsiveSizing: string }>
> = {
  coffee: Coffee,
  trip: Passport,
  dinner: Dinner,
  dental: Dental,
  iphone: Iphone,
  hotel: Hotelbed,
};

const ITEMS = EVERYDAY_PRICES.map((item) => ({
  ...item,
  Icon: ICONS[item.key],
}));

const money = (n: number) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(n);

type EverydayTermsProps = {
  gap?: number | null;
  gapReal?: number | null;
  futureDollars?: boolean;
  showPriceContext?: boolean;
};

const EverydayTerms = ({ gap, gapReal, futureDollars = false, showPriceContext = true }: EverydayTermsProps) => {
  const isExample = !gap || gap <= 0;
  const amount = isExample ? DEFAULT_EXAMPLE_GAP : gap;
  // Item prices are in today's dollars, so use the real gap for purchasing power.
  const purchasingPower = isExample ? DEFAULT_EXAMPLE_GAP : (gapReal ?? amount);
  const [flippedCards, setFlippedCards] = React.useState<Record<string, boolean>>({});

  return (
    <div className="w-full">
      <div className="w-full rounded-[3rem] bg-slate-100 p-5 sm:p-6 lg:p-7">
        {/* Much tighter heading */}
        <div className="mb-6 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-950">
            What{" "}
            <span className="font-numeric tabular-nums">
              {money(amount)}
            </span>{" "}
            could buy
          </h2>
          {!isExample && showPriceContext && (
            <p className="mx-auto mt-2 max-w-sm text-xs text-slate-500">
              {futureDollars
                ? "Future dollars, with item prices adjusted for the same inflation."
                : "Today’s dollars, compared with today’s estimated prices."}
            </p>
          )}

          {isExample && (
            <p className="mx-auto mt-2 max-w-sm text-xs text-slate-400">
              Example based on a {money(amount)} gap — run the calculator to see
              your own.
            </p>
          )}
        </div>

        {/* Keep all six original illustrated cards */}
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
          {ITEMS.map(({ Icon, price, singular, plural, asOf }, i) => {
            const count = Math.max(1, Math.round(purchasingPower / price));
            const label = count === 1 ? singular : plural;
            const flipped = Boolean(flippedCards[singular]);

            return (
              <motion.div
                key={singular}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.35,
                }}
                className="relative min-h-[11rem] [perspective:1000px]"
              >
                <motion.div
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative min-h-[11rem] w-full [transform-style:preserve-3d]"
                >
                  <div className="absolute inset-0 flex min-h-[11rem] flex-col items-center justify-center rounded-3xl bg-white p-5 text-center shadow-md [backface-visibility:hidden]">
                    <Info
                      className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center"
                      onClick={() => setFlippedCards((current) => ({ ...current, [singular]: true }))}
                      ariaLabel={`Show how the ${label} comparison is calculated`}
                    />

                    <div className="mb-3 flex justify-center">
                      <Icon responsiveSizing="w-[5rem] h-[5rem]" />
                    </div>

                    <h3 className="font-semibold leading-snug text-slate-950">
                      <span className="tabular-nums">
                        {count.toLocaleString()}
                      </span>{" "}
                      {label}
                    </h3>
                  </div>

                  <div className="absolute inset-0 flex min-h-[11rem] flex-col rounded-3xl bg-slate-900 p-5 text-left text-white shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <button
                      type="button"
                      onClick={() => setFlippedCards((current) => ({ ...current, [singular]: false }))}
                      className="mb-3 self-end text-xs font-semibold text-white/70 transition hover:text-white"
                    >
                      Back
                    </button>
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/70">Assumed price</p>
                    <p className="mt-3 text-2xl font-semibold tabular-nums text-white">
                      {money(price)}
                    </p>
                    <p className="mt-1 text-xs text-white/80">per {singular}</p>
                    <p className="mt-auto pt-3 text-[10px] text-white/60">
                      As of {asOf}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EverydayTerms;
