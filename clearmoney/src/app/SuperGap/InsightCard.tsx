import Link from "next/link";
import React from "react";

const InsightCard = () => {
  return (
    <div className="bg-orange-50 border border-orange-200 text-orange-800 rounded-2xl w-full p-2 mt-4 flex justify-center items-center">
      <p className="text-[0.75rem]">
        A model, not a prediction or financial advice. Speak to a licensed
        adviser before making decisions.{" "}
        <Link href="/about" className="underline hover:text-slate-600">
          Read disclaimer
        </Link>
      </p>
    </div>
  );
};

export default InsightCard;
