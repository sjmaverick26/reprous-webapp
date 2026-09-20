import React from "react";

interface ReproUsMarkProps {
  size?: number;
  className?: string;
  variant?: "default" | "light";
  tealColor?: string;
}

export function ReproUsMark({
  size = 32,
  className = "",
  variant = "default",
  tealColor,
}: ReproUsMarkProps) {
  const isLight = variant === "light";
  const primaryTeal = tealColor || (isLight ? "#D8EFED" : "#175B5C");
  const raspberry = isLight ? "#E05380" : "#B83F68";
  const coral = "#F47A6A";

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
        <circle cx="38" cy="50" r="28" fill={primaryTeal} opacity={isLight ? "1" : "0.9"} />
        <circle cx="62" cy="50" r="28" fill={raspberry} opacity={isLight ? "0.95" : "0.9"} />
        <circle cx="50" cy="50" r="14" fill={coral} />
      </svg>
    </span>
  );
}
