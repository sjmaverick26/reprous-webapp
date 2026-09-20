import React from "react";

interface ReproUsMarkProps {
  size?: number;
  className?: string;
}

export function ReproUsMark({ size = 34, className = "" }: ReproUsMarkProps) {
  return (
    <span className={`inline-block flex-shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="42" cy="56" r="30" fill="var(--deep-teal)" opacity="0.85" />
        <circle cx="78" cy="64" r="30" fill="var(--coral)" opacity="0.9" />
        <circle cx="60" cy="60" r="14" fill="var(--raspberry)" />
      </svg>
    </span>
  );
}
