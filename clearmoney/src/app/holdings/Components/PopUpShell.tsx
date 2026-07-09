// components/popups/PopUpShell.tsx
"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconX } from "@tabler/icons-react";

export const SECTOR_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  "Technology & Software": {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-500",
  },
  "Banks & Finance": {
    bg: "bg-violet-100",
    text: "text-violet-700",
    border: "border-violet-500",
  },
  "Healthcare & Biotech": {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-500",
  },
  "Consumer Goods & Retail": {
    bg: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-500",
  },
  "Real Estate & Construction": {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-500",
  },
  "Mining & Minerals": {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-500",
  },
  "Oil, Gas & Energy": {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-500",
  },
  "Industrial & Transport": {
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-500",
  },
  "Media & Entertainment": {
    bg: "bg-pink-100",
    text: "text-pink-700",
    border: "border-pink-500",
  },
  Telecommunications: {
    bg: "bg-indigo-100",
    text: "text-indigo-700",
    border: "border-indigo-500",
  },
  "Casinos & Gaming": {
    bg: "bg-rose-100",
    text: "text-rose-700",
    border: "border-rose-500",
  },
  "Aerospace & Defence": {
    bg: "bg-sky-100",
    text: "text-sky-700",
    border: "border-sky-500",
  },
};

export type SectorStyle = {
  bg: string;
  text: string;
  border: string;
};

export const DEFAULT_SECTOR_STYLE: SectorStyle = {
  bg: "bg-gray-100",
  text: "text-gray-600",
  border: "border-gray-500",
};

type PopUpShellProps = {
  trigger: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sectorStyle: SectorStyle;
  icon: React.ReactNode;
  title: string;
  meta: React.ReactNode;
  children: React.ReactNode;
  asOfDate?: string;
};

export function PopUpShell({
  trigger,
  open,
  onOpenChange,
  sectorStyle,
  icon,
  title,
  meta,
  children,
  asOfDate,
}: PopUpShellProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-full max-h-[95svh] flex flex-col max-w-[23rem] sm:max-w-lg md:max-w-xl gap-0 border-0 p-0 overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
        <DialogClose className="absolute top-5 right-5 z-50 p-2 rounded-full bg-white/60 hover:bg-white transition-colors">
          <IconX className="text-red-600 w-[1.3rem] h-[1.3rem]" />
        </DialogClose>

        <div
          className={`px-8 pt-10 pb-10 flex flex-col items-center text-center gap-4 ${sectorStyle.bg} border-b border-white`}
        >
          <div className="w-24 h-24 flex items-center justify-center bg-white rounded-3xl shadow-xl border-4 border-white transition-transform hover:scale-105 duration-300 overflow-hidden">
            {icon}
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {title}
            </h2>
            <div className="flex items-center justify-center gap-2">{meta}</div>
          </div>
        </div>

        <div className="px-8 pb-10 flex-1 min-h-0 space-y-8 overflow-y-auto pt-8">
          {children}
          {asOfDate && (
            <div className="flex w-full justify-center items-center">
              <span
                className={`text-[10px] font-bold uppercase tracking-widest ${sectorStyle.text} opacity-70`}
              >
                Reported as of{" "}
                {new Date(asOfDate).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
