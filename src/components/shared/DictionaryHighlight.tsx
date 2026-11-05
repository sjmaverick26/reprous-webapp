"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { DICTIONARY_ENTRIES, DictionaryEntry } from "@/components/shared/LittleHealthDictionary";

interface DictionaryHighlightProps {
  term: string; // The word or phrase to look up in the dictionary
  children?: React.ReactNode; // Optional custom display text
  className?: string;
  showIcon?: boolean; // kept for backwards compatibility; the highlight is now a plain underline
}

export function DictionaryHighlight({
  term,
  children,
  className = "",
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

  // Close the popover with Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      {/* Plain underlined text that wraps with the sentence; the ::before widens the tap area to 24px+ without changing line layout. */}
      <span
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(true);
          }
        }}
        title={`What does '${term}' mean? Tap for the plain-English meaning.`}
        className={`relative cursor-pointer font-semibold underline decoration-2 decoration-coral underline-offset-4 hover:decoration-raspberry transition-colors duration-150 before:content-[''] before:absolute before:-inset-y-1.5 before:inset-x-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal rounded-sm ${className}`}
      >
        {children || term}
      </span>

      {/* Definition popover */}
      {isOpen && entry && (
        <div
          className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={entry.term}
            className="bg-white rounded-2xl p-5 md:p-6 max-w-lg w-full border border-deep-teal shadow-sm space-y-4 text-left relative max-h-[90vh] overflow-y-auto font-sans font-normal no-underline"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center rounded-full text-charcoal-light hover:text-charcoal hover:bg-warm-cream transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal"
              aria-label="Close word definition"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="pr-10">
              <h3 className="font-serif text-2xl text-deep-teal leading-tight text-balance m-0">{entry.term}</h3>
              <p className="text-small text-charcoal-light m-0 mt-1">&ldquo;{entry.pronunciation}&rdquo;</p>
            </div>

            <div>
              <p className="text-base font-bold text-deep-teal m-0 mb-1">Plain English Meaning</p>
              <p className="text-base text-charcoal text-pretty leading-relaxed m-0">{entry.plainEnglish}</p>
            </div>

            {entry.chartJargon && (
              <div className="border-l-4 border-deep-teal pl-4">
                <p className="text-base font-bold text-deep-teal m-0 mb-1">Real Clinic / Chart Example</p>
                <p className="font-mono text-small text-charcoal leading-relaxed m-0">{entry.chartJargon}</p>
              </div>
            )}

            {entry.howToSayIt && (
              <div className="border-l-4 border-raspberry pl-4">
                <p className="text-base font-bold text-deep-teal m-0 mb-1">How to Say It to a Doctor</p>
                <p className="text-base text-charcoal text-pretty leading-relaxed m-0">{entry.howToSayIt}</p>
              </div>
            )}

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="min-h-[44px] px-6 rounded-full bg-deep-teal text-white font-sans font-semibold text-sm hover:bg-deep-teal-dark transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-2"
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
