import React from "react";

interface ReproUsMarkProps {
  size?: number;
  className?: string;
}

export function ReproUsMark({ size = 32, className = "" }: ReproUsMarkProps) {
  return (
    <span className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="38" cy="50" r="28" fill="#175B5C" opacity="0.9" />
        <circle cx="62" cy="50" r="28" fill="#B83F68" opacity="0.9" />
        <circle cx="50" cy="50" r="14" fill="#F47A6A" />
      </svg>
    </span>
  );
}
