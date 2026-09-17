import React from "react";

type infoProps = {
  className: string;
  onClick?: () => void;
  ariaLabel?: string;
};

const Info = ({ className, onClick, ariaLabel = "Show more information" }: infoProps) => {
  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <svg
        className={"mx-auto cursor-pointer"}
        id="fi_5683325"
        enableBackground="new 0 0 32 32"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" fill="#2196f3" r="18"></circle>
        <g fill="#fff">
          <circle cx="24" cy="15.5" r="2.5"></circle>
          <path d="m22 21h4v14h-4z"></path>
        </g>
      </svg>
    </button>
  );
};

export default Info;
