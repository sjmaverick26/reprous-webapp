"use client";

import React, { useState, useEffect } from "react";
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
    { code: "ht", label: "Kreyòl" },
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
    <div className="bg-cream-card border-b border-berry/10 transition-colors">
      <div className="max-w-[1100px] mx-auto px-6 py-2 flex items-center justify-between gap-4 flex-wrap">
        {/* Language Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11.5px] font-extrabold uppercase tracking-wider text-berry/75 mr-1">
            Viewing in:
          </span>
          {languages.map((lang) => {
            const isActive = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelectLang(lang.code)}
                className={cn(
                  "px-3 py-1 rounded-full text-[12.5px] font-extrabold transition-all border",
                  isActive
                    ? "bg-berry border-berry text-cream-card shadow-sm"
                    : "bg-transparent border-berry/30 text-berry hover:bg-blush-deep"
                )}
              >
                {lang.label}
              </button>
            );
          })}
        </div>

        {/* Accessibility Tools (Text Size & Contrast) */}
        <div className="flex items-center gap-2">
          <span className="text-[11.5px] font-extrabold uppercase tracking-wider text-berry/75">
            Text:
          </span>
          <button
            onClick={() => handleTextSize("")}
            className={cn(
              "px-2.5 py-0.5 rounded-full text-xs font-extrabold border transition-colors",
              textSize === ""
                ? "bg-berry border-berry text-cream-card"
                : "border-berry/30 text-berry hover:bg-blush-deep"
            )}
            aria-label="Default text size"
          >
            A
          </button>
          <button
            onClick={() => handleTextSize("text-lg")}
            className={cn(
              "px-2.5 py-0.5 rounded-full text-xs font-extrabold border transition-colors",
              textSize === "text-lg"
                ? "bg-berry border-berry text-cream-card"
                : "border-berry/30 text-berry hover:bg-blush-deep"
            )}
            aria-label="Large text size"
          >
            A+
          </button>
          <button
            onClick={() => handleTextSize("text-xl")}
            className={cn(
              "px-2.5 py-0.5 rounded-full text-xs font-extrabold border transition-colors",
              textSize === "text-xl"
                ? "bg-berry border-berry text-cream-card"
                : "border-berry/30 text-berry hover:bg-blush-deep"
            )}
            aria-label="Extra large text size"
          >
            A++
          </button>

          <button
            onClick={handleToggleContrast}
            className={cn(
              "ml-1 px-3 py-0.5 rounded-full text-xs font-extrabold border transition-colors",
              isHighContrast
                ? "bg-berry border-berry text-cream-card font-black ring-2 ring-yellow-deep"
                : "border-berry/30 text-berry hover:bg-blush-deep"
            )}
          >
            {isHighContrast ? "High Contrast On" : "High Contrast"}
          </button>
        </div>
      </div>
    </div>
  );
}
