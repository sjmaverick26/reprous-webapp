"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageId } from "@/components/layout/Navbar";

interface AccessMiniProps {
  text?: string;
  subtext?: string;
  languages?: string[];
  onNavigate?: (page: PageId, categoryOrTab?: string) => void;
  onSelectLang?: (lang: string) => void;
  className?: string;
}

export function AccessMini({
  text = "Healthcare should be easier to navigate.",
  subtext = "Languages · Accessibility · Free resources · Find support",
  languages = ["English", "Español", "한국어", "Tiếng Việt", "العربية"],
  onNavigate,
  onSelectLang,
  className = "",
}: AccessMiniProps) {
  const [showLanguages, setShowLanguages] = useState(false);

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto rounded-lg bg-ivory-darker/90 border border-plum/15 px-5 py-3 text-plum shadow-xs font-sans transition-all",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        {/* Primary line with subtle gold accent pip */}
        <div className="flex items-center gap-2.5">
          <span
            className="w-2 h-2 rounded-full bg-gold shrink-0 inline-block ring-2 ring-gold/30"
            aria-hidden="true"
          />
          <span className="font-semibold text-[14.5px] text-plum tracking-tight">
            {text}
          </span>
        </div>

        {/* Supporting navigation & resources list */}
        <div className="flex items-center gap-2 flex-wrap justify-center text-[13px] text-plum/75 font-medium">
          <button
            type="button"
            onClick={() => setShowLanguages(!showLanguages)}
            className="hover:text-berry inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:underline"
          >
            <span>Languages</span>
            <ChevronDown
              className={cn(
                "w-3 h-3 transition-transform text-plum/50",
                showLanguages && "rotate-180"
              )}
            />
          </button>
          <span className="text-gold font-bold select-none">•</span>

          <button
            type="button"
            onClick={() => {
              if (typeof document !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="hover:text-berry transition-colors focus-visible:outline-none focus-visible:underline"
          >
            Accessibility
          </button>
          <span className="text-gold font-bold select-none">•</span>

          <button
            type="button"
            onClick={() => onNavigate?.("resources")}
            className="hover:text-berry transition-colors focus-visible:outline-none focus-visible:underline"
          >
            Free resources
          </button>
          <span className="text-gold font-bold select-none">•</span>

          <button
            type="button"
            onClick={() => onNavigate?.("qa")}
            className="hover:text-berry transition-colors focus-visible:outline-none focus-visible:underline"
          >
            Find support
          </button>
        </div>
      </div>

      {/* Expandable Languages Drawer */}
      {showLanguages && (
        <div className="mt-3 pt-3 border-t border-plum/10 flex items-center justify-center sm:justify-start gap-2 flex-wrap text-xs text-plum animate-in fade-in duration-150">
          <span className="font-semibold text-berry uppercase tracking-wider text-[11px] mr-1">
            Available In:
          </span>
          {languages.map((lang, idx) => (
            <React.Fragment key={lang}>
              {idx > 0 && <span className="text-plum/30">·</span>}
              <button
                type="button"
                onClick={() => onSelectLang?.(lang)}
                className="px-2 py-0.5 rounded bg-white border border-plum/10 hover:border-berry hover:text-berry font-medium transition-colors"
              >
                {lang}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
