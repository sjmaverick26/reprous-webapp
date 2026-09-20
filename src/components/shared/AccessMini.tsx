import React from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccessMiniProps {
  text?: string;
  languages?: string[];
  onSelectLang?: (lang: string) => void;
  onDark?: boolean;
  className?: string;
}

export function AccessMini({
  text = "Need resources in another language?",
  languages = ["English", "Español", "한국어", "Tiếng Việt", "العربية"],
  onSelectLang,
  onDark = false,
  className = "",
}: AccessMiniProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 rounded-full px-5 py-2.5 text-[13.5px] font-sans transition-colors shadow-sm",
        onDark
          ? "bg-white/20 text-white backdrop-blur-sm border border-white/20"
          : "bg-light-teal/70 text-deep-teal border border-deep-teal/15",
        className
      )}
    >
      <div className="flex items-center gap-2 font-semibold whitespace-nowrap">
        <Globe className="w-4 h-4 flex-shrink-0 text-coral" aria-hidden="true" />
        <span>{text}</span>
      </div>

      <span className="hidden sm:inline text-deep-teal/30 select-none" aria-hidden="true">
        |
      </span>

      <div className="flex items-center gap-2 font-medium flex-wrap justify-center text-[13.5px]">
        {languages.map((lang, idx) => (
          <React.Fragment key={lang}>
            {idx > 0 && (
              <span className="text-deep-teal/40 select-none" aria-hidden="true">
                ·
              </span>
            )}
            <button
              type="button"
              onClick={() => onSelectLang?.(lang)}
              className="hover:text-raspberry transition-colors focus-visible:outline-none focus-visible:underline rounded"
            >
              {lang}
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
