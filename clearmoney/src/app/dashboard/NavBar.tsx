"use client";
import React, { useState } from "react";
import { NavigationMenuDemo } from "./NavBar copy";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "../holdings/WizardForm/formWizardStore";
import { NumericFormat } from "react-number-format";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ChevronDown, X } from "lucide-react";

const NavBar = () => {
  const { state, actions } = useStateMachine({ actions: { updateForm } });
  const hasBalance = state.balance > 0;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [localBalance, setLocalBalance] = useState<number>(state.balance);

  const fundName = state.fundName ?? "Rest Super";
  const optionName = state.optionName ?? "High Growth";

  const handleSave = () => {
    actions.updateForm({ balance: localBalance });
    setDrawerOpen(false);
  };

  const openDrawer = () => {
    setLocalBalance(state.balance);
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="bg-white fixed top-0 z-50 w-full border-b border-slate-100 shadow-sm">
        <div className="mx-auto w-full max-w-[85rem] px-4 md:px-8 h-16 relative flex items-center">
          <div className="absolute left-4 md:left-8 flex items-center">
            <a
              href="/"
              className="text-lg md:text-xl font-bold transition text-slate-900"
            >
              Clear<span className="text-emerald-600">Super</span>
            </a>
          </div>

          <div className="w-full flex justify-center items-center">
            <div className="hidden md:block">
              <NavigationMenuDemo />
            </div>

            {/* Mobile: balance pill */}
            {hasBalance && (
              <button
                onClick={openDrawer}
                className="flex md:hidden items-center gap-1.5 bg-slate-100 hover:bg-slate-200 transition-colors px-4 py-1.5 rounded-full border border-slate-200/50 shadow-inner"
              >
                <span className="text-xs font-bold text-slate-400 tracking-widest">
                  Balance:
                </span>
                <span className="text-xs font-black text-slate-900 tabular-nums">
                  <NumericFormat
                    value={state.balance}
                    thousandSeparator
                    prefix="$"
                    displayType="text"
                  />
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            )}
          </div>

          {/* Right: absolute, out of flow */}
          <div className="absolute right-4 md:right-8 flex items-center gap-3">
            {/* Desktop: fund + option + balance pill */}
            {hasBalance && (
              <button
                onClick={openDrawer}
                className="hidden md:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition-colors px-4 py-2 rounded-full border border-slate-200/50 shadow-inner group"
              >
                <span className="text-sm font-bold text-slate-400 group-hover:text-slate-500 transition-colors">
                  {fundName} · {optionName} ·
                </span>
                <span className="text-sm font-black text-slate-900 tabular-nums">
                  <NumericFormat
                    value={state.balance}
                    thousandSeparator
                    prefix="$"
                    displayType="text"
                  />
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}

            {/* Mobile: hamburger */}
            <button
              className="btn btn-square btn-ghost block md:hidden"
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Drawer / Dropdown */}
      <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

          <Dialog.Content
            className="
              fixed z-50 bg-white shadow-xl focus:outline-none
              data-[state=open]:animate-in data-[state=closed]:animate-out
              data-[state=closed]:duration-200 data-[state=open]:duration-300
              bottom-0 left-0 right-0 rounded-t-2xl px-5 pt-4 pb-8
              data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom
              md:bottom-auto md:top-[68px] md:left-auto md:right-6
              md:w-72 md:rounded-2xl md:px-5 md:pt-5 md:pb-5
              md:data-[state=closed]:slide-out-to-top-2 md:data-[state=open]:slide-in-from-top-2
            "
          >
            <VisuallyHidden.Root>
              <Dialog.Title>Viewing settings</Dialog.Title>
            </VisuallyHidden.Root>

            {/* Mobile drag handle */}
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-slate-200 md:hidden" />

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-semibold text-slate-900">
                Viewing settings
              </p>
              <Dialog.Close className="rounded-full p-1 hover:bg-slate-100 transition-colors">
                <X className="w-4 h-4 text-slate-400" />
              </Dialog.Close>
            </div>

            {/* Fund */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div>
                <p className="text-xs text-slate-400 mb-0.5">Fund</p>
                <p className="text-sm font-medium text-slate-900">{fundName}</p>
              </div>
              <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                Change
              </button>
            </div>

            {/* Option */}
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div>
                <p className="text-xs text-slate-400 mb-0.5">
                  Investment option
                </p>
                <p className="text-sm font-medium text-slate-900">
                  {optionName}
                </p>
              </div>
              <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                Change
              </button>
            </div>

            {/* Balance */}
            <div className="py-3">
              <p className="text-xs text-slate-400 mb-1.5">Your balance</p>
              <NumericFormat
                value={localBalance}
                thousandSeparator
                prefix="$"
                onValueChange={(values) =>
                  setLocalBalance(values.floatValue ?? 0)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="$0"
              />
              <p className="text-xs text-slate-400 mt-1.5">
                Used to estimate your proportional exposure
              </p>
            </div>

            {/* Save */}
            <button
              onClick={handleSave}
              className="mt-2 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 transition-colors px-4 py-2.5 text-sm font-semibold text-white"
            >
              Save
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default NavBar;
