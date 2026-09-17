import React from "react";

// House (FHSS) icon. Inlined as SVG so it can wiggle on hover — inside a
// `group`, it does a quick playful shake, then settles.
const House = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-full w-full origin-bottom group-hover:[animation:wiggle_0.55s_ease-in-out]"
    >
      <path
        fill="#047857"
        d="M22 5.724V2a1 1 0 1 0-2 0v2.366L14.797.855a4.98 4.98 0 0 0-5.594 0l-7 4.724A4.995 4.995 0 0 0 0 9.724V19c0 2.757 2.243 5 5 5h2a1 1 0 0 0 1-1v-9c0-.551.448-1 1-1h6c.552 0 1 .449 1 1v9a1 1 0 0 0 1 1h2c2.757 0 5-2.243 5-5V9.724a4.995 4.995 0 0 0-2-4Z"
      />
    </svg>
  );
};

export default House;
