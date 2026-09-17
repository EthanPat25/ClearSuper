"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";

export default function BreakTimeline({
  currentAge,
  retireAge,
  start,
  end,
  onChange,
}: {
  currentAge: number;
  retireAge: number;
  start: number;
  end: number;
  onChange: (start: number, end: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Age {Math.round(currentAge)}
        </span>
        <span className="font-numeric text-sm font-bold text-emerald-700 tabular-nums">
          Age {start}–{end} · {end - start} {end - start === 1 ? "yr" : "yrs"}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Retire {Math.round(retireAge)}
        </span>
      </div>
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center py-2"
        min={currentAge}
        max={retireAge}
        step={1}
        minStepsBetweenThumbs={1}
        value={[start, end]}
        onValueChange={([s, e]) => onChange(s, e)}
      >
        <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-full bg-slate-200">
          <SliderPrimitive.Range className="absolute h-full bg-emerald-500" />
        </SliderPrimitive.Track>
        {[0, 1].map((i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block h-6 w-6 rounded-full border-2 border-emerald-500 bg-white shadow-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-110 cursor-grab active:cursor-grabbing"
            aria-label={i === 0 ? "Break start age" : "Break end age"}
          />
        ))}
      </SliderPrimitive.Root>
    </div>
  );
}
