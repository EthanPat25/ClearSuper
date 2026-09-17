"use client";

import React from "react";
import { NumericFormat } from "react-number-format";
import { money } from "./model";

export default function ChipGroup({
  presets,
  value,
  onValue,
  columns,
  format,
  exactLabel,
  inputLabel,
  presetHint,
  placeholder,
  currency = false,
  suffix,
  onBlur,
  inputRef,
  error,
}: {
  presets: number[];
  value: number;
  onValue: (n: number) => void;
  columns: 2 | 3;
  format: (n: number) => string;
  exactLabel: string;
  inputLabel?: string;
  presetHint?: string;
  placeholder?: string;
  currency?: boolean;
  suffix?: string;
  onBlur?: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: string;
}) {
  const errorId = React.useId();
  const inputId = React.useId();
  const [exact, setExact] = React.useState(!presets.includes(value));

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <span className="font-numeric text-3xl sm:text-4xl font-bold text-slate-900 tabular-nums">
          {currency ? money(value) : value}
        </span>
        {suffix && (
          <span className="block text-xs text-slate-400 mt-1">{suffix}</span>
        )}
      </div>

      {presetHint && (
        <p className="text-sm font-semibold text-slate-700">{presetHint}</p>
      )}
      <div
        className={`grid gap-3 ${columns === 3 ? "grid-cols-3" : "grid-cols-2"}`}
      >
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            aria-pressed={value === preset && !exact}
            onClick={() => {
              onValue(preset);
              setExact(false);
            }}
            className={`h-14 rounded-2xl px-3 text-base font-bold border shadow-sm transition-all ${
              value === preset && !exact
                ? "bg-emerald-600 border-emerald-600 text-white"
                : "bg-white border-slate-200 text-slate-800 hover:border-emerald-400"
            }`}
          >
            {format(preset)}
          </button>
        ))}
      </div>

      {exact ? (
        <div className="flex flex-col gap-2">
          {inputLabel && (
            <label
              htmlFor={inputId}
              className="text-sm font-semibold text-slate-700"
            >
              {inputLabel}
            </label>
          )}
          <div className="flex h-14 items-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500">
            {currency && (
              <span
                aria-hidden="true"
                className="font-numeric pointer-events-none flex h-full w-12 shrink-0 items-center justify-center border-r border-slate-200 bg-slate-50 text-lg font-medium text-slate-500"
              >
                $
              </span>
            )}
            <NumericFormat
              id={inputId}
              autoFocus
              inputMode="numeric"
              thousandSeparator={currency}
              decimalScale={0}
              allowNegative={false}
              aria-label={inputLabel ? undefined : exactLabel}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
              onBlur={onBlur}
              getInputRef={inputRef}
              value={value || ""}
              placeholder={placeholder ?? (currency ? "50,000" : "67")}
              onValueChange={(v) => onValue(v.floatValue ?? 0)}
              className="font-numeric h-full w-full min-w-0 border-0 bg-transparent px-4 text-lg font-semibold tabular-nums text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:outline-none"
            />
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setExact(true)}
          className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base font-bold text-slate-800 shadow-sm transition-colors hover:border-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          {exactLabel}
        </button>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
