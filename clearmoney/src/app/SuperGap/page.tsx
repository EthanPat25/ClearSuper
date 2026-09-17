"use client";

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import UnderStand from "./UnderStand";
import HeroSection from "./HeroSection";
import SuperGapCalcSection from "./SuperGapCalcSection";
import { SuperGapResult } from "./Forumula2";

export default function SuperContributions() {
  const [started, setStarted] = React.useState(false);
  const reduceMotion = useReducedMotion();
  const [result, setResult] = React.useState<SuperGapResult | null>(null);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="grid w-full flex-1 relative overflow-x-clip px-3 sm:px-6 bg-[RGB(250,251,252)]">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={started ? "wizard" : "intro"}
            className={`col-start-1 row-start-1 min-w-0 ${started ? "w-full origin-top py-16" : "flex w-full items-center pt-28 pb-8 sm:pt-32 sm:pb-12"}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: reduceMotion ? 0 : 0.38,
                delay: reduceMotion ? 0 : 0.1,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            exit={{
              opacity: 0,
              transition: { duration: reduceMotion ? 0 : 0.2, ease: "easeOut" },
            }}
          >
            {started ? (
              <div tabIndex={-1} ref={(node) => { node?.focus({ preventScroll: true }); }} className="w-full outline-none" aria-label="SuperGap calculator">
                <SuperGapCalcSection result={result} onCalculate={setResult} />
              </div>
            ) : (
              <div className="w-full">
                <HeroSection onStart={() => setStarted(true)} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {result?.hasBreak && (
        <section id="gap-lenses" className="mt-16 w-full scroll-mt-24">
          <div className="max-w-8xl mx-auto px-6 py-8">
          

          <UnderStand />
        
          </div>
        </section>
      )}
    </div>
  );
}
