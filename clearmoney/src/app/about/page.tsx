"use client";

import React from "react";
import { motion } from "motion/react";
import { LightBulb } from "../AnimationComponents/LightBulb";
import { Pencil } from "../AnimationComponents/Pencil";

const faqSections = [
  {
    title: "Not Financial Advice",
    body: "ClearSuper is not a financial product, is not licensed to provide financial advice, and does not constitute a recommendation. The information displayed is factual data about fund holdings, transformed for clarity. It does not take into account your personal objectives, financial situation, or needs.\n\nBefore making any decision about your superannuation, refer to Moneysmart (moneysmart.gov.au), your fund's Product Disclosure Statement (PDS), or a licensed financial adviser. ClearSuper should not be the sole basis for any financial decision.",
  },
  {
    title: "Logos & Fund Affiliation",
    body: "ClearSuper is not affiliated with, endorsed by, or associated with any super fund or company displayed on this site. Logos are used for identification purposes only. ClearSuper is a non-commercial proof of concept based on publicly available fund data and is not a financial product. Do not make financial decisions based on information displayed on this site — always refer to your fund's official PDS or holdings data available on your fund's website.",
  },
  {
    title: "How Dollar Amounts Are Calculated",
    body: "Super funds generally invest members' money collectively through large pooled investment portfolios, rather than as separately managed portfolios in each person's name.\n\nClearSuper uses the fund's reported asset allocations to give an indication of how that pooled money is structured. The dollar figures shown are not a breakdown of your exact personal holdings. Rather, they show how much of the fund's total pooled assets are held in each company or asset class, scaled proportionally to your entered balance.\n\nFor example, if a fund holds 2% of its pooled assets in BHP, and your balance is $50,000, ClearSuper would show approximately $1,000 against BHP. This does not mean you directly own $1,000 of BHP shares in your own name - it is an approximation intended to reflect how the investment option your balance sits within is structured.",
  },

  {
    title: "Why ClearSuper Doesn't Compare Funds",
    body: "ClearSuper does not compare different super funds. Holdings are displayed for a single fund at a time. Where multiple options within the same fund are shown, these are presented as a visual representation of how each option is structured relative to the industry or company being viewed - not as a recommendation or comparison.",
  },
  {
    title: "Industry Classification",
    body: "Industry classifications shown on ClearSuper are created by ClearSuper and applied to the reported holdings. They are our own categorisation, not your fund's. Funds may group holdings into sectors differently, or use different category names. The categories themselves are a fixed set chosen by us. ClearSuper uses an LLM to aid in sorting companies into these categories. While best efforts have been made to review this, it's not a perfect method and classifications may be incorrect or inconsistent. Classification can also be subjective. For example, some companies may arguably fit two or more categories. To verify what your fund actually holds, refer to the official holdings data released by your fund.",
  },
  {
    title: "Holdings Data & Accuracy",
    body: "Data for fund holdings is taken from the latest available release. Under APRA, funds are required to disclose holdings every 6 months. There is a 2-month grace period on this requirement, and as a result, different funds will not always update their holdings on the same date.\n\nThis is not a live or current breakdown. Differences in share trading values and the buying and selling of assets by funds may mean the true holdings on today's date are different.\n\nNo one outside of the fund has access to this information - ClearSuper operates only on what is publicly available. Your entered balance is stored only in your browser's local storage to persist your session. It is never sent to or stored on any server. \n\n Some assets, such as a listed company, may appear more than once in disclosed holdings data. To improve readability, ClearSuper may combine or simplify certain entries.",
  },
  {
    title: "Derivatives & Excluded Holdings",
    body: "Some asset types disclosed by funds such as derivative contracts (forwards, futures, swaps) are excluded or simplified in ClearSuper's holdings display. These instruments are commonly used by funds for portfolio management, hedging, or risk reduction rather than as direct investments in individual companies.\n\nAs a result, some figures shown in ClearSuper may differ slightly from official fund disclosures or total reported percentages. For the complete picture, refer to your fund's full APRA holdings disclosure.",
  },

  {
    title: "Option Comparisons",
    body: "ClearSuper displays how a given company or industry sector is represented across different investment options within the same super fund. This is shown for informational purposes only and does not constitute a recommendation to change your investment option. Any such decision should be made in consultation with your fund or a licensed financial adviser.",
  },
  {
    title: "Accumulation Phase Only",
    body: "ClearSuper currently displays accumulation phase options only. Pension or retirement phase options are not included. This is not an exclusion by design - it reflects the current scope of the project, which is primarily focused on the accumulation phase relevant to most working Australians.",
  },
  {
    title: "Calculators & Tools",
    body: "Any calculators or tools within ClearSuper are models that operate on a number of assumptions. They are designed for illustrative and engagement purposes only - for example, contextualising the impact of career breaks on your super balance in everyday terms such as coffees, dental appointments, or international trips. These are not predictions of future financial outcomes.",
  },
];

function AccordionItem({ title, body }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left gap-4"
      >
        <span className="text-sm font-medium text-slate-700">{title}</span>
        <span className="text-slate-400 flex-shrink-0 text-xl leading-none">
          {open ? (
            <svg
              height="512"
              viewBox="0 0 512 512"
              width="512"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 hover:scale-110"
              id="fi_10308996"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="minus">
                  <circle
                    id="background"
                    cx="256"
                    cy="256"
                    fill="#064e3b"
                    r="256"
                  ></circle>
                  <rect
                    fill="#fff"
                    height="280"
                    rx="18.26"
                    transform="matrix(0 -1 1 0 0 512)"
                    width="65.74"
                    x="223.13"
                    y="116"
                  ></rect>
                </g>
              </g>
            </svg>
          ) : (
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              className="w-6 h-6 hover:scale-110"
              imageRendering="optimizeQuality"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
              viewBox="0 0 21.0001 21.0001"
              xmlns="http://www.w3.org/2000/svg"
              id="fi_14090273"
            >
              <g id="图层_x0020_1">
                <path d="m0 0h21v21h-21z" fill="none"></path>
                <path
                  d="m10.5 1.3124c5.07328 0 9.1876 4.11432 9.1876 9.1876s-4.11432 9.1876-9.1876 9.1876-9.1876-4.11432-9.1876-9.1876 4.11432-9.1876 9.1876-9.1876zm-.9843 13.1257v-2.95384h-2.95384c-.54063 0-.9843-.4422-.9843-.9843 0-.54211.4422-.9843.9843-.9843h2.95384v-2.95384c0-.54211.4422-.9843.9843-.9843.54211 0 .9843.44367.9843.9843v2.95384h2.95384c.54211 0 .9843.4422.9843.9843 0 .54211-.44367.9843-.9843.9843h-2.95384v2.95384c0 .54063-.4422.9843-.9843.9843-.54211 0-.9843-.4422-.9843-.9843z"
                  fill="#064e3b"
                ></path>
              </g>
            </svg>
          )}
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
      <div className="bg-gradient-to-tr from-emerald-100 to-emerald-300 text-white relative pt-32 pb-32 overflow-visible min-h-[calc(100dvh-4rem)] flex justify-center items-center">
        <div className="max-w-7xl px-6 gap-0 md:gap-12 lg:gap-8 items-center relative z-10">
          <div className="w- full flex flex-col items-center justify-center text-center">
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
              className="text-4xl lg:text-7xl text-emerald-950 font-extrabold tracking-tight drop-shadow-sm leading-[1.1] mb-6 text-center"
            >
              The idea behind
              <br />
              <span className="text-emerald-600">ClearSuper.</span>
            </motion.h1>

            <div className="w-full flex justify-center items-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl lg:text-2xl text-emerald-800 italic font-normal leading-relaxed max-w-lg text-center"
              >
                What if superannuation data was actually designed for people?
              </motion.p>
            </div>
            <div className="flex gap-4 mt-8 justify-center">
              <motion.button
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                  delay: 0.15,
                }}
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-emerald-600 text-white font-bold text-sm md:text-base px-6 py-3 rounded-full hover:bg-emerald-700 transition"
              >
                About the Project
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                  delay: 0.25,
                }}
                onClick={() =>
                  document
                    .getElementById("disclaimer")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white text-emerald-800 font-bold text-sm md:text-base px-6 py-3 rounded-full border border-emerald-200 hover:bg-emerald-50 transition"
              >
                Read Disclaimer
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="lg:pr-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="inline-block bg-emerald-50 text-emerald-800 text-base font-bold px-3 py-2 rounded-[1rem] shadow-sm mb-6">
              About the Developer
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Hi, <span className="text-emerald-600">I'm Ethan</span>
            </h2>
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed text-pretty text-left">
              <p>
                I'm a computer science student based in Australia with a deep
                interest in technology and building products that solve problems.
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
                responsibly, has the ability to address gaps in the systems we
                all depend on.
              </p>
              <p>ClearSuper is my attempt at that.</p>
            </div>
          </motion.div>
          <div className="relative flex items-center justify-center md:gap-4">
            <img
              src="/Ethan.JPG"
              alt="Ethan"
              className="ring-8 ring-[#F59E0B]/60 w-[20rem] h-[20rem] md:w-[32rem] md:h-[32rem] rounded-full object-cover object-top shadow-lg"
            />
            <div className="absolute bottom-6 left-16 md:bottom-8 md:left-20 w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-full bg-white shadow-md ring-2 ring-[#F59E0B]/40 flex items-center justify-center">
              <Pencil responsiveSizing="w-[3rem] h-[3rem]" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-32 ">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-8">
            <span className="inline-block bg-emerald-50 text-emerald-600 text-base font-bold px-3 py-2 rounded-[1rem] shadow-[1rem] mb-6">
              About ClearSuper
            </span>

            <h2 className="font-extrabold text-4xl lg:text-5xl text-slate-900 max-w-2xl leading-tight">
              Why I Built ClearSuper
            </h2>
          </div>

          <div className="flex flex-col max-w-[52rem] mx-auto space-y-5 text-lg text-slate-600">
            <p className="text-justify">
              A few years ago I was doing Menulog deliveries during the
              pandemic. As a gig worker I wasn't earning super, so a family
              member suggested I contribute some of my earnings myself. I
              didn't. At 19, I wasn't interested. Truth be told, I had never
              even logged into my account.
            </p>
            <p className="text-justify">
              Turns out I wasn't unusual. Research from AMP found a quarter of
              Australians have never checked their super. I was a clear example
              of it.
            </p>
            <p className="text-justify">
              Since then I've spent time trying to understand it, both at a
              system and a personal level. I often wonder what could have made
              my 19-year-old self stop and think a little longer. To me, super
              never really felt real. Until one day it did. I saw how it could
              play out over a lifetime. And that it didn't always play out
              evenly.
            </p>
            <p>
              Engagement is a hard problem. Super is long term by design, yet
              the digital spaces around us increasingly compete for our
              attention in the short term.
            </p>

            <p className="text-justify">
              It's something I don't have a clean answer for. But it's something
              I keep coming back to.
            </p>
            <p className="text-justify">
              I keep coming back to the psychological distance I felt at 19. I
              don't feel that same distance when I walk into a home, even though
              a home is also partly an abstraction: boundaries, contracts, legal
              title, and lines on a map that we have collectively agreed to
              recognise. What makes it feel real is the physical material. The
              bricks, the walls, the very space you can stand in. A place
              belonging to a community. A home belongs to the present and the
              future at the same time.
            </p>

            <p className="text-justify">
              Super funds invest in real things too. Companies that power our
              phones, airports we fly from, the roads we drive on, the buildings
              we work in. The ownership and the impact on the future can be just
              as real as a brick home. But without something to make it felt, it
              still appears as a number on a screen. Something distant and
              technical.
            </p>

            <p>
              {" "}
              Here's my theory: if the average Aussie can understand what their
              super fund is, what it's doing, and how it connects to the wider
              world, that understanding could help build more confidence around
              their finances.
            </p>

            <p className="text-justify">
              I think this is where digital tools and services have an important
              role. Making the abstract feel present. The way bricks make lines
              on a map feel like a home.
            </p>

            <p>
              I don't think anyone is getting it wrong. I think it shows how
              hard the engagement problem is, and It's part of what has led me
              to start building something. ClearSuper is a proof of concept. One
              attempt at what a more visual relationship with super could look
              like.
            </p>
            <p>If you have thoughts, I'd genuinely like to hear them.</p>
          </div>
          <div className="w-full flex justify-center items-center mt-12">
            <button className="bg-[#F59E0B] hover:bg-amber-500 text-black font-bold px-6 py-3 rounded-full transition text-xl hover:scale-105">
              Leave Feedback
            </button>
          </div>
        </div>
      </div>

      <div
        id="disclaimer"
        className="bg-slate-50 py-32 border-t border-slate-200/60"
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="font-extrabold text-4xl text-slate-900">
              Full Disclaimer
            </h2>
          </div>

          <div className="rounded-[2rem] p-8 mb-8 shadow-sm border bg-white border-slate-100">
            <p className="text-xs text-justify leading-relaxed">
              <strong>A Summary:</strong> ClearSuper is not a financial product
              and is not licensed to provide financial advice. Holdings show the
              structure of a fund relative to your entered balance. Dollar
              amounts are calculated using reported weights. This is not an
              exact or live breakdown. It's the proportional exposure to
              holdings, applied to the date at which the holdings were reproted.
              Calculators are models based on assumptions and are not
              predictions of future outcomes. ClearSuper's intention is data
              visualisation. It's a work in progress, in beta, and subject to
              errors. Do not make financial decisions based on what's shown.
              Consider speaking to a licensed financial adviser, and always
              check the fund's official PDS and reported holdings data. For
              factual information, refer to the{" "}
              <a
                href="https://www.ato.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium"
              >
                ATO
              </a>{" "}
              and{" "}
              <a
                href="https://moneysmart.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium"
              >
                Moneysmart
              </a>
              .
            </p>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            {faqSections.map((s) => (
              <AccordionItem key={s.title} title={s.title} body={s.body} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
