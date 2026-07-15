"use client";
import React, { useState, useEffect } from "react";
import { NavigationMenuDemo } from "./NavBar copy";
import { useStateMachine } from "little-state-machine";
import { updateForm } from "../holdings/WizardForm/formWizardStore";
import CurrentOptionPopup from "./CurrentOptionPopup";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { X, ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import MobileSettingsBar from "./MobileSettingsBar";

const navLinks = [
  { label: "View Your Fund", href: "/holdings" },
  { label: "About", href: "/about" },
];

const superTools = [
  { label: "Super Gap Calculator", href: "/SuperGap" },
  { label: "FHSS Calculator", href: "/FHSS" },
];

const NavBar = () => {
  const { state, actions } = useStateMachine({ actions: { updateForm } });
  const pathname = usePathname();
  const onHoldings = pathname === "/holdings";

  // Wait for hydration before reading localStorage-backed state.
  // Otherwise server-render and client-render disagree and React throws.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const hasBalance = mounted && state.balance > 0;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [localBalance, setLocalBalance] = useState<number>(state.balance);
  const [toolsOpen, setToolsOpen] = useState(false);

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
        <div className="mx-auto w-full max-w-[85rem] px-4 md:px-8 h-20 grid grid-cols-3 items-center">
          <div className="flex items-center justify-center md:justify-start">
            <a
              href="/"
              className="text-xl md:text-xl font-bold transition text-slate-900"
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
            {onHoldings && state.currentStep === "StepFour" && (
              <>
                <CurrentOptionPopup />
                <MobileSettingsBar />
              </>
            )}

            <Drawer direction="right">
              <DrawerTrigger asChild>
                <button
                  className="md:hidden rounded-3xl flex p-[0.7rem] px-4 justify-center items-center bg-[#F59E0B]/30"
                  aria-label="Menu"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    id="fi_7710488"
                    className="w-4 h-4"
                  >
                    <path
                      d="m19 11h-18c-.265216 0-.51957-.1054-.707107-.2929-.187536-.1875-.292893-.4419-.292893-.7071 0-.26522.105357-.51957.292893-.70711.187537-.18753.441891-.29289.707107-.29289h18c.2652 0 .5196.10536.7071.29289.1875.18754.2929.44189.2929.70711 0 .2652-.1054.5196-.2929.7071s-.4419.2929-.7071.2929zm0-7h-18c-.265216 0-.51957-.10536-.707107-.29289-.187536-.18754-.292893-.44189-.292893-.70711s.105357-.51957.292893-.70711c.187537-.18753.441891-.29289.707107-.29289h18c.2652 0 .5196.10536.7071.29289.1875.18754.2929.44189.2929.70711s-.1054.51957-.2929.70711c-.1875.18753-.4419.29289-.7071.29289zm0 14h-18c-.265216 0-.51957-.1054-.707107-.2929-.187536-.1875-.292893-.4419-.292893-.7071s.105357-.5196.292893-.7071c.187537-.1875.441891-.2929.707107-.2929h18c.2652 0 .5196.1054.7071.2929s.2929.4419.2929.7071-.1054.5196-.2929.7071-.4419.2929-.7071.2929z"
                      fill="rgb(0,0,0)"
                    ></path>
                  </svg>
                </button>
              </DrawerTrigger>

              <DrawerContent className="inset-y-0 right-0 left-auto mt-0 h-full w-full">
                <div className="flex items-center justify-between px-6 pt-6 pb-4">
                  <span className="text-xl font-bold text-slate-900">
                    Clear<span className="text-emerald-600">Super</span>
                  </span>
                  <DrawerClose asChild>
                    <button
                      aria-label="Close menu"
                      className="rounded-3xl flex h-12 w-12 justify-center items-center bg-[#F59E0B]/30 text-slate-900 hover:bg-[#F59E0B]/50 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </DrawerClose>
                </div>

                <nav className="flex flex-col px-4 mt-2 gap-1">
                  <DrawerClose asChild>
                    <Link
                      href="/holdings"
                      className="group flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      <span>View Your Fund</span>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </DrawerClose>

                  <div className="flex flex-col">
                    <button
                      onClick={() => setToolsOpen((o) => !o)}
                      aria-expanded={toolsOpen}
                      className="flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      <span>Super Tools</span>
                      <ChevronDown
                        className={`h-5 w-5 text-slate-400 transition-transform ${
                          toolsOpen ? "rotate-180 text-emerald-600" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {toolsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col pl-3 border-l-2 border-emerald-100 ml-4 my-1">
                            {superTools.map((tool) => (
                              <DrawerClose asChild key={tool.href}>
                                <Link
                                  href={tool.href}
                                  className="group flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                                >
                                  <span>{tool.label}</span>
                                  <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                                </Link>
                              </DrawerClose>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <DrawerClose asChild>
                    <Link
                      href="/about"
                      className="group flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      <span>About</span>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </DrawerClose>
                </nav>

                <div className="mt-auto px-4 pb-8 pt-4">
                  <DrawerClose asChild>
                    <Link
                      href="/holdings"
                      className="block w-full text-center bg-[#F59E0B] text-slate-900 font-bold py-4 rounded-full text-base hover:bg-[#d97706] transition-colors shadow-lg"
                    >
                      Check My Holdings
                    </Link>
                  </DrawerClose>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
