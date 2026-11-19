"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * The one tab strip (Resources and Youth Voices). A real tablist: arrow keys, Home/End, roving tabindex,
 * a visible focus ring. Deep-teal fill marks only the active tab.
 * Phones: an equal-height grid (columns from `phoneCols`), labels whole on up to 2 lines.
 * From 768: a row of pills on one line.
 */
export function TabStrip<T extends string>({
  tabs,
  selected,
  onSelect,
  onKeySelect,
  label,
  phoneCols,
  className,
}: {
  tabs: { id: T; label: string }[];
  selected: T;
  /** Click / tap. */
  onSelect: (id: T) => void;
  /** Arrow keys, Home, End (defaults to onSelect). */
  onKeySelect?: (id: T) => void;
  label: string;
  /** A literal Tailwind grid-cols class for phones, e.g. "grid-cols-[1.5fr_1fr_1fr]". */
  phoneCols: string;
  className?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const n = tabs.length;
    let next = -1;
    if (e.key === "ArrowRight") next = (idx + 1) % n;
    else if (e.key === "ArrowLeft") next = (idx - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    (onKeySelect ?? onSelect)(tabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn("grid gap-2 md:flex md:flex-wrap md:gap-3", phoneCols, className)}
    >
      {tabs.map((t, idx) => {
        const isSelected = selected === t.id;
        return (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={isSelected}
            aria-controls={t.id}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelect(t.id)}
            onKeyDown={(e) => onKeyDown(e, idx)}
            className={cn(
              "flex min-h-[52px] min-w-0 items-center justify-center rounded-2xl px-2 text-center text-sm font-semibold leading-[18px] text-balance transition-colors duration-200",
              "md:min-h-11 md:shrink-0 md:whitespace-nowrap md:rounded-full md:px-6 md:text-base",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-2",
              isSelected ? "bg-deep-teal text-white" : "text-deep-teal hover:bg-light-teal"
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
