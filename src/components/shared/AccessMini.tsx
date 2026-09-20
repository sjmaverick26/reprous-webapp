import React from "react";
import { Globe, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccessMiniProps {
  text?: string;
  subtext?: string;
  languages?: string[];
  onSelectLang?: (lang: string) => void;
  className?: string;
}

export function AccessMini({
  text = "Healthcare should be easier to navigate.",
  subtext = "Languages · Accessibility · Free resources · Find support",
  languages = ["English", "Español", "한국어", "Tiếng Việt", "العربية"],
  onSelectLang,
  className = "",
}: AccessMiniProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 rounded-lg px-5 py-2.5 text-[13.5px] font-sans transition-colors bg-ivory-darker text-plum border border-plum/15 shadow-xs",
        className
      )}
    >
      <div className="flex items-center gap-2 font-medium">
        <span className="w-2 h-2 rounded-full bg-gold shrink-0 inline-block" />
        <span className="font-semibold text-plum">{text}</span>
        <span className="hidden md:inline text-plum/60 text-xs">
          ({subtext})
        </span>
      </div>

      <span className="hidden sm:inline text-plum/25 select-none" aria-hidden="true">
        |
      </span>

      <div className="flex items-center gap-2 font-medium flex-wrap justify-center text-[13px]">
        <Globe className="w-3.5 h-3.5 text-berry shrink-0" aria-hidden="true" />
        {languages.map((lang, idx) => (
          <React.Fragment key={lang}>
            {idx > 0 && (
              <span className="text-plum/30 select-none" aria-hidden="true">
                ·
              </span>
            )}
            <button
              type="button"
              onClick={() => onSelectLang?.(lang)}
              className="text-plum/80 hover:text-berry transition-colors focus-visible:outline-none focus-visible:underline rounded"
            >
              {lang}
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
