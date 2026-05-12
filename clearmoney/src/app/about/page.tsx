"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { LightBulb } from "../AnimationComponents/LightBulb";

const faqSections = [
  {
    title: "Logos & Fund Affiliation",
    body: "ClearSuper is not affiliated with, endorsed by, or associated with any super fund or company displayed on this site. Logos are used for identification purposes only. ClearSuper is a proof of concept based on publicly available fund data and is not a financial product. Do not make financial decisions based on information displayed on this site — always refer to your fund's official PDS or holdings data available on your fund's website.",
  },
  {
    title: "How Dollar Amounts Are Calculated",
    body: "Superannuation works by pooling member money together. When you contribute to a super fund, your money doesn't sit in a separate account invested individually on your behalf — instead it joins a large pool of money managed collectively by the fund.\n\nClearSuper uses the fund's reported asset allocations to give an indication of how that pooled money is structured. The dollar figures shown are not a breakdown of your exact personal holdings. Rather, they show how much of the fund's total pooled assets are held in each company or asset class, scaled proportionally to your entered balance.\n\nFor example, if a fund holds 2% of its pooled assets in BHP, and your balance is $50,000, ClearSuper would show approximately $1,000 against BHP. This is not $1,000 of your money directly invested in BHP shares — it reflects the structure of the option your money sits within.",
  },
  {
    title: "Why ClearSuper Doesn't Compare Funds",
    body: "ClearSuper does not compare different super funds. Holdings are displayed for a single fund at a time. Where multiple options within the same fund are shown, these are presented as a visual representation of how each option is structured relative to the industry or company being viewed — not as a recommendation or comparison.",
  },
  {
    title: "Industry Classification",
    body: "Industries displayed on ClearSuper are generated using a large language model (LLM) to classify companies into industry categories. While best efforts have been made to manually review these classifications, this is not a perfect method and classifications may be incorrect or inconsistent in some cases. Industry classification can also be subjective — some companies may arguably fit into two or more categories. If you want to verify which industries your fund invests in, cross-reference with the official holdings data released directly by your fund.",
  },
  {
    title: "Holdings Data & Accuracy",
    body: "Data for fund holdings is taken from the latest available release. Under APRA, funds are required to disclose holdings every 6 months. There is a 2-month grace period on this requirement, and as a result, different funds will not always update their holdings on the same date.\n\nThis is not a live or current breakdown. Differences in share trading values and the buying and selling of assets by funds may mean the true holdings on today's date are different.\n\nNo one outside of the fund has access to this information — ClearSuper operates only on what is publicly available. Your entered balance is stored only in your browser's local storage to persist your session. It is never sent to or stored on any server.",
  },
  {
    title: "Option Comparisons",
    body: "ClearSuper displays how a given company or industry sector is represented across different investment options within the same super fund. This is shown for informational purposes only and does not constitute a recommendation to change your investment option. Any such decision should be made in consultation with your fund or a licensed financial adviser.",
  },
  {
    title: "Accumulation Phase Only",
    body: "ClearSuper currently displays accumulation phase options only. Pension or retirement phase options are not included. This is not an exclusion by design — it reflects the current scope of the project, which is primarily focused on the accumulation phase relevant to most working Australians.",
  },
  {
    title: "Calculators & Tools",
    body: "Any calculators or tools within ClearSuper are models that operate on a number of assumptions. They are designed for illustrative and engagement purposes only — for example, contextualising the impact of career breaks on your super balance in everyday terms such as coffees, dental appointments, or international trips. These are not predictions of future financial outcomes.",
  },
];

function AccordionItem({ title, body }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left gap-4"
      >
        <span className="text-sm font-medium text-slate-700">{title}</span>
        <span className="text-slate-400 flex-shrink-0 text-xl leading-none">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="pb-5 space-y-3">
          {body.split("\n\n").map((p, i) => (
            <p key={i} className="text-sm text-slate-500 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-slate-50 font-sans overflow-x-hidden">
      <div className="bg-gradient-to-tr from-emerald-100 to-emerald-300 text-white pt-20 pb-32 lg:pt-32 lg:pb-48 relative overflow-visible">
        <div
          className="absolute inset-0 opacity-[0.05] overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 gap-0 md:gap-12 lg:gap-8 items-center relative z-10">
          <div className="w- full flex flex-col items-center text-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex rounded-full bg-emerald-600 ring-4 ring-emerald-950/20 shadow-inner border border-[#4FB3B8]/30 w-20 h-20 lg:w-24 lg:h-24 justify-center items-center mb-6 overflow-hidden"
            >
              <LightBulb responsiveSizing="h-[5rem] w-[5rem]"></LightBulb>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl text-emerald-950 font-extrabold tracking-tight drop-shadow-sm leading-[1.1] mb-6 text-center"
            >
              The idea behind
              <br />
              <span className="text-emerald-600">ClearSuper.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-[1.5rem] text-emerald-700 font-medium leading-relaxed mb-4 max-w-lg text-center"
            >
              What if superannuation data was actually designed for people?
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base text-emerald-600 leading-relaxed max-w-md text-center"
            >
              ClearSuper is a proof of concept not financial advice.
            </motion.p>
            <div className="flex gap-4 mt-8 justify-center">
              <button
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-full hover:bg-emerald-700 transition"
              >
                About the Project
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("disclaimer")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white text-emerald-800 font-bold px-6 py-3 rounded-full border border-emerald-200 hover:bg-emerald-50 transition"
              >
                Read Disclaimer
              </button>
            </div>
          </div>
          <div className="relative flex flex-col items-center order-2 mt-20 lg:mt-0 z-20 -mb-48 lg:mb-0"></div>
        </div>
      </div>

      {/* ── About the Developer ── */}
      <div className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="lg:pr-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block bg-emerald-50 text-emerald-800 text-sm font-bold tracking-wider uppercase px-3 py-1 rounded-[1rem] shadow-sm mb-6">
              About the Developer
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Hi there, <br />
              <span className="text-emerald-600">I'm Ethan</span>
            </h2>
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed text-pretty text-justify">
              <p>
                I'm a computer science student based in Australia with a deep
                interest in technology and.
              </p>
              <p>
                ClearSuper started from a simple realisation. I didn't
                understand my own super, and neither did most people I knew.
              </p>
              <p>
                Super is a big deal. It touches almost every working Australian
                across their entire career. Working as a disability support
                worker, I've seen firsthand how much the interaction between
                people, technology and systems matter. Technology when used
                responsibility, has the ability to address gaps in the systems
                we all depend on.
              </p>
              <p>ClearSuper is my attempt at that.</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            <img
              src="/Ethan.JPG"
              alt="Ethan"
              className=" ring-8 ring-emerald-900 w-[30rem] h-[30rem] rounded-[8rem] object-cover object-top flex-shrink-0 shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-32 border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">
              About ClearSuper
            </p>
            <h2 className="font-extrabold text-4xl lg:text-5xl text-slate-900 max-w-2xl leading-tight">
              Why I Built ClearSuper
            </h2>
          </div>

          <div className="max-w-[50rem] mx-auto space-y-5 text-lg text-slate-600">
            <p className="text-justify">
              A few years ago I was doing Menulog deliveries during the
              pandemic. As a gig worker I wasn't earning super, and a family
              member told me to put some of what I earned in. I didn't. At 19, I
              wasn't interested. Truth be told, I'd never even opened my super
              account to have a look.
            </p>
            <p className="text-justify">
              Turns out I wasn't unusual. Research from AMP found a quarter of
              Australians have never engaged with their super fund at all, and
              almost half only check once or twice a year. CSBA research also
              found Gen Z are the least likely generation to feel their super
              fund actively supports their understanding of superannuation.
              Engagement is an ongoing challenge. And I was a clear example of
              it.
            </p>
            <p className="text-justify">
              To me, super never really felt real. Until one day it suddenly
              felt personal. I saw how it could play out over a lifetime. And
              that it didn't always play out evenly.
            </p>
            <p className="text-justify">
              I often wonder what could have made my 19-year-old self stop and
              think a little longer. Just to even open it. Here's the thing.
              Even if I had, would I have understood what I was looking at?
              Would I have cared? Super is long-term. In an online space that
              competes for our limited attention, how do you engage people
              responsibly with something as long-term as super?
            </p>
            <p className="text-justify">
              I don't have a clean answer. But it's a question I keep coming
              back to.
            </p>
            <p className="text-justify">
              People increasingly expect digital experiences to feel visual,
              personal and tangible. And I believe the digital side of super is
              only going to become more important in making super feel personal.
              ClearSuper is a proof of concept that explores some of that. One
              attempt at what more accessible, visual engagement with super
              could look like. The data is public. Making it engaging is the
              challenge.
            </p>
            <p>If you have thoughts, I'd genuinely like to hear them.</p>

            <div className="w-full flex justify-center items-center mt-36">
              <button className="inline-block bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-6 py-3 rounded-full transition">
                Leave Feedback
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 px-6 bg-white border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            className="lg:pr-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block bg-teal-50 text-teal-800 text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-6">
              The Approach
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Two things <br />
              <span className="text-teal-600">ClearSuper explores.</span>
            </h2>
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
              <p>
                ClearSuper takes public holdings data and makes it easier to
                digest, turning abstract holdings into something tangible on
                your screen. Real companies. Dollar amounts that reflect the
                structure of your fund at the time it was reported, scaled to
                your balance.
              </p>
              <p>
                It also includes a super gap calculator. Career breaks, reduced
                hours, lower salaries. These happen for very human reasons. They
                are real experiences that are hard to make tangible. But they
                create real gaps. How do you translate a gap into something
                concrete? Coffees. Dental appointments. Overseas trips. The goal
                is to communicate these concepts digitally in a way that feels
                understandable and less abstract to a younger audience.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-[2.5rem] border border-slate-100 p-8 space-y-4"
          >
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Example
            </p>
            <div className="bg-white rounded-2xl p-5 border border-slate-100">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white text-xs font-black">
                    B
                  </div>
                  <span className="font-bold text-slate-900 text-sm">
                    BHP Group
                  </span>
                </div>
                <span className="text-xs text-slate-400">2% of fund</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">
                  $1,000
                </span>
                <span className="text-sm text-slate-400">
                  on a $50,000 balance
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                This is not $1,000 of your money in BHP shares — it reflects the
                structure of the option your money sits within.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 space-y-2">
              {[
                { label: "Funds compared", value: "None — single fund only" },
                { label: "Data source", value: "Fund public disclosures" },
                { label: "Update frequency", value: "Every 6 months (APRA)" },
                {
                  label: "Balance stored",
                  value: "Browser only, never server",
                },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-slate-400">{row.label}</span>
                  <span className="font-medium text-slate-700">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div
        id="disclaimer"
        className="bg-slate-50 py-32 border-t border-slate-200/60"
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
              Disclaimer
            </p>
            <h2 className="font-extrabold text-4xl text-slate-900">
              The full picture.
            </h2>
          </div>

          {/* Short version sits here now */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">
              The short version
            </p>
            <p className="text-sm text-amber-900 leading-relaxed">
              ClearSuper is not a financial product and is not licensed to
              provide financial advice. Holdings show the structure of a fund
              relative to your entered balance, using reported weights to
              calculate dollar amounts. This is not an exact or live breakdown.
              Calculators are models based on assumptions and are not
              predictions of future outcomes. Do not use ClearSuper to make
              financial decisions. Refer to the{" "}
              <a
                href="https://www.ato.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium"
              >
                ATO
              </a>
              ,{" "}
              <a
                href="https://moneysmart.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium"
              >
                Moneysmart
              </a>
              , or your fund's PDS for licensed resources.
            </p>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            {faqSections.map((s) => (
              <AccordionItem key={s.title} title={s.title} body={s.body} />
            ))}
          </div>
          <p className="text-xs text-slate-400 text-center mt-10">
            Feedback is very welcome.
          </p>
        </div>
      </div>
    </div>
  );
}
