import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Her type scale (tailwind.config.ts fontSize) registered as font sizes, so cn() never reads
// text-h3 as a text colour and drops it next to text-deep-teal.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["h1", "h2", "h3", "body", "small", "nav", "btn"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "smooth", or "auto" (an instant jump) when the visitor has asked for reduced motion. */
export function scrollMotion(): ScrollBehavior {
  if (typeof window === "undefined" || !window.matchMedia) return "smooth";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}
