"use client";

import ToolIntroCard from "../components/ToolIntroCard";
import { WorkLifeBalance } from "../AnimationComponents/WorkLifeBalance";

export default function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <ToolIntroCard
      tone="green"
      eyebrow="SUPERGAP"
      title="See how less paid work could affect your super."
      description="Compare a career break or reduced hours with continuing at your current income."
      icon={<WorkLifeBalance responsiveSizing="h-full w-full" />}
      onStart={onStart}
    />
  );
}
