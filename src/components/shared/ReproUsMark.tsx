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
        <circle cx="40" cy="56" r="30" fill="var(--yellow-deep)" opacity="0.9" />
        <circle cx="80" cy="64" r="30" fill="var(--blush-deep)" opacity="0.9" />
        <circle cx="60" cy="60" r="12" fill="var(--berry)" />
      </svg>
    </span>
  );
}
