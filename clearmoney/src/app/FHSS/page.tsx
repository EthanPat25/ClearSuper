"use client";

import FhssWizard from "./FhssWizard";

export default function FhssPage() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="grid w-full flex-1 relative overflow-x-clip px-3 sm:px-6 bg-[RGB(250,251,252)]">
        <FhssWizard />
      </div>
    </div>
  );
}
