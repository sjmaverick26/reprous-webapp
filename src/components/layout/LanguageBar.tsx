"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface LanguageBarProps {
  currentLang: string;
  onSelectLang: (lang: string) => void;
}

export function LanguageBar({ currentLang, onSelectLang }: LanguageBarProps) {
  const [textSize, setTextSize] = useState<"" | "text-lg" | "text-xl">("");
  const [isHighContrast, setIsHighContrast] = useState(false);

  const languages = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "ko", label: "한국어" },
    { code: "vi", label: "Tiếng Việt" },
    { code: "ar", label: "العربية" },
    { code: "more", label: "+ More" },
  ];

  const handleTextSize = (size: "" | "text-lg" | "text-xl") => {
    setTextSize(size);
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("text-lg", "text-xl");
      if (size) document.documentElement.classList.add(size);
    }
  };

  const handleToggleContrast = () => {
    const nextVal = !isHighContrast;
    setIsHighContrast(nextVal);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("contrast", nextVal);
    }
  };

  return (
    <div className="bg-ivory/95 border-b border-plum/10 transition-colors">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4 flex-wrap">
        {/* Language Switcher */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[12.5px] font-semibold font-sans uppercase tracking-wider text-plum/70 mr-1">
            Viewing in:
          </span>
          {languages.map((lang) => {
            const isActive = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelectLang(lang.code)}
                className={cn(
                  "px-2.5 py-0.5 rounded text-[13px] font-medium font-sans transition-all",
                  isActive
                    ? "bg-plum text-ivory font-bold shadow-xs"
                    : "text-plum/80 hover:text-berry hover:bg-ivory-darker"
                )}
              >
                {lang.label}
              </button>
            );
          })}
        </div>

        {/* Accessibility Tools (Text Size & Contrast) */}
        <div className="flex items-center gap-1.5">
          <span className="text-[12.5px] font-semibold font-sans uppercase tracking-wider text-plum/70 mr-1">
            Text:
          </span>
          <button
            onClick={() => handleTextSize("")}
            className={cn(
              "px-2 py-0.5 rounded text-[13px] font-semibold font-sans transition-colors",
              textSize === ""
                ? "bg-plum text-ivory font-bold"
                : "text-plum/80 hover:bg-ivory-darker"
            )}
            aria-label="Default text size"
          >
            A
          </button>
          <button
            onClick={() => handleTextSize("text-lg")}
            className={cn(
              "px-2 py-0.5 rounded text-[13px] font-semibold font-sans transition-colors",
              textSize === "text-lg"
                ? "bg-plum text-ivory font-bold"
                : "text-plum/80 hover:bg-ivory-darker"
            )}
            aria-label="Large text size"
          >
            A+
          </button>
          <button
            onClick={() => handleTextSize("text-xl")}
            className={cn(
              "px-2 py-0.5 rounded text-[13px] font-semibold font-sans transition-colors",
              textSize === "text-xl"
                ? "bg-plum text-ivory font-bold"
                : "text-plum/80 hover:bg-ivory-darker"
            )}
            aria-label="Extra large text size"
          >
            A++
          </button>

          <button
            onClick={handleToggleContrast}
            className={cn(
              "ml-1.5 px-2.5 py-0.5 rounded text-[12.5px] font-semibold font-sans transition-colors border",
              isHighContrast
                ? "bg-plum border-plum text-ivory font-bold ring-2 ring-gold"
                : "border-plum/20 text-plum hover:bg-ivory-darker"
            )}
          >
            {isHighContrast ? "High Contrast On" : "High Contrast"}
          </button>
        </div>
      </div>
    </div>
  );
}
