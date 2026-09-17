"use client";

import React from "react";
import { NumericFormat } from "react-number-format";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { clamp } from "./model";
import EditPencilIcon from "./EditPencilIcon";

export default function SliderRow({
  label,
  display,
  value,
  min,
  max,
  step,
  currency = false,
  onChange,
}: {
  label: string;
  display: string;
  value: number;
  min: number;
  max: number;
  step: number;
  currency?: boolean;
  onChange: (v: number) => void;
}) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState<number | null>(null);

  function startEdit() {
    setDraft(null); // start empty; placeholder shows the current value
    setEditing(true);
  }

  function commit() {
    // Empty = keep current value; otherwise clamp the typed number to range.
    onChange(draft == null ? value : clamp(draft, min, max));
    setEditing(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2 min-h-[1.75rem]">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        {editing ? (
          <NumericFormat
            autoFocus
            thousandSeparator={currency}
            prefix={currency ? "$" : undefined}
            placeholder={display}
            value={draft ?? ""}
            onValueChange={(v) => setDraft(v.floatValue ?? null)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") setEditing(false);
            }}
            className="font-numeric text-sm font-bold text-slate-900 tabular-nums text-right w-28 rounded-lg border border-emerald-300 px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-300 placeholder:font-normal"
          />
        ) : (
          <button
            type="button"
            onClick={startEdit}
            className="group inline-flex items-center gap-1.5 rounded-lg px-1.5 py-0.5 hover:bg-slate-100 transition-colors"
            aria-label={`Edit ${label}`}
          >
            <span className="font-numeric text-sm font-bold text-slate-900 tabular-nums">
              {display}
            </span>
            <EditPencilIcon />
          </button>
        )}
      </div>
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center py-1.5"
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-200">
          <SliderPrimitive.Range className="absolute h-full bg-emerald-500" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          aria-label={label}
          className="block h-5 w-5 rounded-full border-2 border-emerald-500 bg-white shadow-md transition-transform hover:scale-110 active:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-grab active:cursor-grabbing"
        />
      </SliderPrimitive.Root>
    </div>
  );
}
