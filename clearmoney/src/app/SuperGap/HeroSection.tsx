"use client";

import ToolIntroCard from "../components/ToolIntroCard";
import { WorkLifeBalance } from "../AnimationComponents/WorkLifeBalance";

function CalculatorIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="m18.5 22.75h-13a2.25 2.25 0 0 1 -2.25-2.25v-17a2.25 2.25 0 0 1 2.25-2.25h13a2.25 2.25 0 0 1 2.25 2.25v17a2.25 2.25 0 0 1 -2.25 2.25zm-13-20a.75.75 0 0 0 -.75.75v17a.75.75 0 0 0 .75.75h13a.75.75 0 0 0 .75-.75v-17a.75.75 0 0 0 -.75-.75z" />
      <path d="m17 9.75h-10a.76.76 0 0 1 -.75-.75v-4a.75.75 0 0 1 .75-.75h10a.75.75 0 0 1 .75.75v4a.76.76 0 0 1 -.75.75zm-9.25-1.5h8.5v-2.5h-8.5z" />
      <circle cx="8" cy="12.5" r="1" />
      <circle cx="12" cy="12.5" r="1" />
      <circle cx="16" cy="12.5" r="1" />
      <circle cx="8" cy="15.5" r="1" />
      <circle cx="12" cy="15.5" r="1" />
      <circle cx="8" cy="18.5" r="1" />
      <circle cx="12" cy="18.5" r="1" />
      <path d="m16 19.5a.76.76 0 0 1 -.75-.75v-3.5a.75.75 0 0 1 1.5 0v3.5a.76.76 0 0 1 -.75.75z" />
    </svg>
  );
}

export default function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <ToolIntroCard
      tone="green"
      eyebrow="SUPERGAP"
      title="See how less paid work could affect your super."
      description="Compare a career break or reduced hours with continuing at your current income."
      icon={<WorkLifeBalance responsiveSizing="h-full w-full" />}
      actionIcon={<CalculatorIcon />}
      onStart={onStart}
    />
  );
}
