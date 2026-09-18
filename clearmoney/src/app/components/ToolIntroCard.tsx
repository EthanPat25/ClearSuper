"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

type ToolIntroCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tone: "green" | "blue";
  onStart: () => void;
  status?: string;
  disabled?: boolean;
};

const tones = {
  green: {
    card: "bg-[#24594F]",
    circle: "bg-[#5B907C]/25",
    circleBorder: "border-[#B0D1BD]/20 bg-[#5B907C]/10",
    icon: "bg-[#F59E0B]/20",
    eyebrow: "text-[#C6DECF]",
    body: "text-[#D7E7DD]",
    button: "bg-[#F59E0B] text-[#173D34] hover:bg-[#FBBF24] focus-visible:ring-[#F59E0B]",
    offset: "focus-visible:ring-offset-[#24594F]",
  },
  blue: {
    card: "bg-[#245477]",
    circle: "bg-[#6EA4C2]/25",
    circleBorder: "border-[#B8D7E8]/20 bg-[#6EA4C2]/10",
    icon: "bg-[#FDE7A9]/35",
    eyebrow: "text-[#D7EAF4]",
    body: "text-[#DCECF4]",
    button: "bg-[#F59E0B] text-[#21465E] hover:bg-[#FBBF24] focus-visible:ring-[#F59E0B]",
    offset: "focus-visible:ring-offset-[#245477]",
  },
} as const;

export default function ToolIntroCard({ eyebrow, title, description, icon, tone, onStart, status, disabled = false }: ToolIntroCardProps) {
  const colors = tones[tone];
  return (
    <motion.section
      aria-labelledby={`${tone}-tool-intro`}
      initial={{ opacity: 0, scale: 0.9, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, type: "spring", stiffness: 170, damping: 20 }}
      className={`relative isolate mx-auto flex w-full max-w-4xl flex-col items-center overflow-hidden rounded-[2rem] px-6 py-14 text-center shadow-sm sm:rounded-[3rem] sm:px-16 sm:py-20 ${colors.card}`}
    >
      <div aria-hidden="true" className={`pointer-events-none absolute -right-24 -top-28 z-0 h-72 w-72 rounded-full ${colors.circle}`} />
      <div aria-hidden="true" className={`pointer-events-none absolute -bottom-44 -left-24 z-0 h-80 w-80 rounded-full border ${colors.circleBorder}`} />
      <div className="relative z-10">
        <div className={`mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-[1.75rem] p-1.5 sm:h-28 sm:w-28 ${colors.icon}`}>
          {icon}
        </div>
        {status && (
          <span className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/80">
            {status}
          </span>
        )}
        <p className={`mb-5 text-sm font-semibold tracking-[0.16em] ${colors.eyebrow}`}>{eyebrow}</p>
        <h1 id={`${tone}-tool-intro`} className="mx-auto max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-[#F7FBFD] sm:text-5xl">{title}</h1>
        <p className={`mx-auto mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${colors.body}`}>{description}</p>
        <button type="button" onClick={onStart} disabled={disabled} className={`mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-8 py-3.5 text-base font-bold shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 ${disabled ? "cursor-not-allowed border border-[#FDE7A9]/30 bg-[#FDE7A9]/20 text-[#FFF1B8]" : `hover:-translate-y-0.5 hover:shadow-md ${colors.button}`} ${colors.offset}`}>
          {disabled ? "Coming soon" : status ?? "Get started"} {!disabled && <ArrowRight aria-hidden="true" className="h-4 w-4" />}
        </button>
      </div>
    </motion.section>
  );
}
