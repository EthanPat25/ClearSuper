"use client";
import React, { useState, useEffect } from "react";
import { NavigationMenuDemo } from "./NavBar copy";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "../holdings/WizardForm/formWizardStore";
import { NumericFormat } from "react-number-format";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ChevronDown, X, Pencil } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import CurrentOptionPopup from "./CurrentOptionPopup";

const NavBar = () => {
  const { state, actions } = useStateMachine({ actions: { updateForm } });

  // Wait for hydration before reading localStorage-backed state.
  // Otherwise server-render and client-render disagree and React throws.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const hasBalance = mounted && state.balance > 0;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [localBalance, setLocalBalance] = useState<number>(state.balance);

  const fundName = state.Fund;
  const optionName = state.option;

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
        <div className="mx-auto w-full max-w-[85rem] px-4 md:px-8 h-16 grid grid-cols-3 items-center">
          <div className="flex items-center">
            <a
              href="/"
              className="text-lg md:text-xl font-bold transition text-slate-900"
            >
              Clear<span className="text-emerald-600">Super</span>
            </a>
          </div>

          <div className="flex items-center justify-center">
            <div className="hidden md:block">
              <NavigationMenuDemo />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <CurrentOptionPopup></CurrentOptionPopup>

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
    </>
  );
};

export default NavBar;
