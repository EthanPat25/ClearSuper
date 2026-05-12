import React from "react";

const sections = [
  {
    title: "Logos & Fund Affiliation",
    body: "ClearSuper is not affiliated with, endorsed by, or associated with any super fund or company displayed on this site. Logos are used for identification purposes only. ClearSuper is a proof of concept based on publicly available fund data and is not a financial product. Do not make financial decisions based on information displayed on this site — always refer to your fund's official PDS or holdings data available on your fund's website.",
  },
  {
    title: "Industry Classification",
    body: "Industries displayed on ClearSuper are generated using a large language model (LLM) to classify companies into industry categories. While best efforts have been made to manually review these classifications, this is not a perfect method and classifications may be incorrect or inconsistent in some cases. Industry classification can also be subjective — some companies may arguably fit into two or more categories. If you want to verify which industries your fund invests in, cross-reference with the official holdings data released directly by your fund. Links to official holdings disclosures can usually be found on your fund's website or PDS.",
  },
  {
    title: "Holdings Data & Accuracy",
    body: "Data for fund holdings is taken from the latest available release. Under APRA, funds are required to disclose holdings every 6 months. There is a 2-month grace period on this requirement, and as a result, different funds will not always update their holdings on the same date.\n\nIt's important to understand that the holdings view aims to give a snapshot of how your balance was invested in dollar terms at the date the data was released. This is not a live or current breakdown. Differences in share trading values and the buying and selling of assets by funds may mean the true holdings on today's date are different.\n\nNo one outside of the fund has access to this information — ClearSuper operates only on what is publicly available. Be mindful that funds may display holdings from different release dates. As a result, the holdings data shown may reflect different points in time and should not be treated as a direct comparison. Please check the release date when viewing and cross-reference with your fund's official holdings data, as ClearSuper may not always display the most current release.\n\nYour entered balance is stored only in your browser's local storage to persist your session. It is never sent to or stored on any server.",
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
    body: "Any calculators or tools within ClearSuper are models that operate on a number of assumptions. They are designed for illustrative and engagement purposes only — for example, contextualising the impact of career breaks on your super balance in everyday terms such as coffees, doctors appointments, or international trips. These are not predictions of future financial outcomes.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 w-full">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            About ClearSuper
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            A proof of concept by a university student. Not financial advice.
          </p>
        </div>

        {/* TL;DR */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mb-2">
            The short version
          </p>
          <p className="text-sm text-amber-900 leading-relaxed">
            ClearSuper is not a financial product and is not licensed to provide
            financial advice. Dollar amounts are estimates. Data may not be
            current. Do not use ClearSuper to make financial decisions — refer
            to the{" "}
            <a
              href="https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/comparing-super-funds"
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

        {/* Main body */}
        <div className="bg-white rounded-3xl p-7 mb-6 shadow-sm">
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            ClearSuper is a proof of concept built by a university student. The
            goal is to explore whether engagement with and understanding of
            superannuation can be improved through more visual presentation of
            publicly available data.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Superannuation is a $4 trillion industry that relates to almost
            every working Australian. This project was inspired by the ATO's
            YourSuper comparison tool and a number of reports discussing
            engagement and financial literacy with superannuation.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Given the breadth of the industry, there are limitations to any
            application or tool relating to superannuation — ClearSuper
            included. Holdings data is normalised to 100% and dollar amounts are
            estimates based on reported fund allocations applied to your entered
            balance. The core purpose is to give an indication of how funds
            invest member money — not to provide an exact or live breakdown.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            All data ClearSuper is based on is publicly available in CSV format
            on each fund's website. If accuracy is important to you, we
            encourage you to access and cross-reference this data directly.
            ClearSuper is focused on representation and accessibility of this
            data — not a substitute for it. This is a one-person project and a
            continual work in progress. While best efforts have been made,
            errors or inconsistencies may exist in how ClearSuper processes and
            displays this data.
          </p>
        </div>

        {/* How dollar amounts work */}
        <div className="bg-white rounded-3xl p-7 mb-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">
            How Dollar Amounts Are Calculated
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Superannuation works by pooling member money together. When you
            contribute to a super fund, your money doesn't sit in a separate
            account invested individually on your behalf — instead it joins a
            large pool of money managed collectively by the fund.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            ClearSuper uses the fund's reported asset allocations to give an
            indication of how that pooled money is structured. The dollar
            figures shown are not a breakdown of your exact personal holdings.
            Rather, they show how much of the fund's total pooled assets are
            held in each company or asset class, scaled proportionally to your
            entered balance.
          </p>
          <div className="bg-slate-50 rounded-2xl px-4 py-4 mb-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              For example, if a fund holds 2% of its pooled assets in BHP, and
              your balance is $50,000, ClearSuper would show approximately
              $1,000 against BHP. This is not $1,000 of your money directly
              invested in BHP shares — it reflects the structure of the option
              your money sits within.
            </p>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            The purpose is to give an intuitive sense of where a fund invests,
            not to provide an exact or personal breakdown of your balance.
          </p>
        </div>

        {/* Why funds aren't compared */}
        <div className="bg-white rounded-3xl p-7 mb-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">
            Why ClearSuper Doesn't Compare Funds
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            For this reason, ClearSuper does not compare different super funds.
            Holdings are displayed for a single fund at a time, using data from
            the same release date. Where multiple options within the same fund
            are shown, these are presented as a visual representation of how
            each option is structured relative to the industry or company being
            viewed — not as a recommendation or comparison.
          </p>
        </div>

        {/* Detail sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-sm font-semibold text-slate-900 mb-3">
                {section.title}
              </h2>
              {section.body.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm text-slate-500 leading-relaxed mb-3 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 text-center mt-10">
          Feedback is very welcome.
        </p>
      </div>
    </div>
  );
}
