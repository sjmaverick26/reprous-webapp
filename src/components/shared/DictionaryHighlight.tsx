"use client";

import React, { useState } from "react";
import { BookOpen, Volume2, Sparkles, X, ExternalLink, FileText, ArrowDown } from "lucide-react";
import { DICTIONARY_ENTRIES, DictionaryEntry } from "@/components/shared/LittleHealthDictionary";

interface DictionaryHighlightProps {
  term: string; // The word or phrase to look up in the dictionary
  children?: React.ReactNode; // Optional custom display text
  className?: string;
  showIcon?: boolean;
}

export function DictionaryHighlight({
  term,
  children,
  className = "",
  showIcon = true,
}: DictionaryHighlightProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Look up matching dictionary entry
  const entry: DictionaryEntry | undefined = React.useMemo(() => {
    const q = term.toLowerCase().trim();
    return (
      DICTIONARY_ENTRIES.find((e) => e.term.toLowerCase() === q) ||
      DICTIONARY_ENTRIES.find((e) => e.id.toLowerCase() === q) ||
      DICTIONARY_ENTRIES.find((e) => e.term.toLowerCase().includes(q)) ||
      DICTIONARY_ENTRIES.find((e) => e.plainEnglish.toLowerCase().includes(q))
    );
  }, [term]);

  const handleJumpToDictionary = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);

    // Look for dictionary container on current page
    const dictElem = document.getElementById("health-dictionary");
    if (dictElem) {
      dictElem.scrollIntoView({ behavior: "smooth", block: "start" });
      // Trigger search if possible
      const searchInput = dictElem.querySelector("input") as HTMLInputElement | null;
      if (searchInput && entry) {
        searchInput.value = entry.term.split("(")[0].trim();
        searchInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    } else {
      // If inside full-screen lesson, jump to bottom or alert
      window.location.hash = "health-dictionary";
    }
  };

  return (
    <>
      <span
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        title={`Click to view '${term}' in the Health Dictionary`}
        className={`bg-amber-100 hover:bg-amber-200 text-charcoal border-b-2 border-amber-400 px-1 py-0.2 rounded font-semibold cursor-pointer transition-all inline-flex items-center gap-1 group shadow-2xs text-inherit select-none ${className}`}
      >
        <span>{children || term}</span>
        {showIcon && (
          <BookOpen className="w-3 h-3 text-amber-800 opacity-60 group-hover:opacity-100 shrink-0 transition-opacity" />
        )}
      </span>

      {/* Interactive Definition Popover Modal */}
      {isOpen && entry && (
        <div
          className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full border-2 border-amber-300 shadow-2xl space-y-4 text-left relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-charcoal/60 hover:text-charcoal transition-colors cursor-pointer"
              aria-label="Close word definition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Term & Pronunciation */}
            <div className="space-y-1.5 pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-950 border border-amber-300">
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>Health Dictionary Term</span>
              </div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-deep-teal leading-tight">
                {entry.term}
              </h3>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                <span>&ldquo;{entry.pronunciation}&rdquo;</span>
              </div>
            </div>

            {/* Plain English Meaning */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-charcoal/90 leading-relaxed font-sans space-y-1">
              <strong className="block text-amber-950 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>Plain English Meaning:</span>
              </strong>
              <p className="m-0 text-charcoal/90">{entry.plainEnglish}</p>
            </div>

            {/* Real Doctor / Clinic Example */}
            {entry.chartJargon && (
              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 space-y-1">
                <strong className="block text-purple-900 font-extrabold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-purple-700" />
                  <span>Real Clinic / Chart Example:</span>
                </strong>
                <p className="italic font-mono text-[11px] text-purple-900 m-0">
                  {entry.chartJargon}
                </p>
              </div>
            )}

            {/* How to Say It (Self-Advocacy) */}
            {entry.howToSayIt && (
              <div className="p-3.5 rounded-2xl bg-light-teal/50 border border-deep-teal/20 text-xs text-deep-teal space-y-1">
                <strong className="block text-deep-teal font-extrabold uppercase tracking-wider text-[10px]">
                  How to Say It to a Doctor:
                </strong>
                <p className="italic text-[12px] text-charcoal/90 m-0">
                  {entry.howToSayIt}
                </p>
              </div>
            )}

            {/* Footer Actions */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100 flex-wrap">
              <button
                onClick={handleJumpToDictionary}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-teal hover:text-raspberry underline transition-colors cursor-pointer"
              >
                <ArrowDown className="w-3.5 h-3.5" />
                <span>Jump down to Dictionary on page</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-xl bg-deep-teal text-white font-sans font-bold text-xs hover:bg-deep-teal/90 transition-all cursor-pointer shadow-xs ml-auto"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
