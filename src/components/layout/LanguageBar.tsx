"use client";

import React, { useState } from "react";
import { Globe2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageBarProps {
  currentLang: string;
  onSelectLang: (lang: string) => void;
}

export interface LanguageOption {
  code: string;
  label: string;
  englishName: string;
  dir?: "ltr" | "rtl";
  greeting: string;
  motto: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: "en",
    label: "English",
    englishName: "English",
    dir: "ltr",
    greeting: "Welcome to ReproUs — Know your body. Know what to ask.",
    motto: "Learn · Recognize · Advocate",
  },
  {
    code: "es",
    label: "Español",
    englishName: "Spanish",
    dir: "ltr",
    greeting: "Bienvenido a ReproUs — Conoce tu cuerpo, aprende qué preguntar.",
    motto: "Aprende · Reconoce · Defiende",
  },
  {
    code: "zh",
    label: "中文",
    englishName: "Chinese",
    dir: "ltr",
    greeting: "欢迎来到 ReproUs — 了解自己的身体，知道该问什么。",
    motto: "学习 · 识别 · 倡导",
  },
  {
    code: "ar",
    label: "العربية",
    englishName: "العربية",
    dir: "rtl",
    greeting: "مرحبًا بكِ في ReproUs — اعرفي جسمكِ، واعرفي ما تسألين عنه.",
    motto: "تعلّمي · تعرّفي · دافعي",
  },
  {
    code: "fr",
    label: "Français",
    englishName: "French",
    dir: "ltr",
    greeting: "Bienvenue sur ReproUs — Comprenez votre corps, sachez quoi demander.",
    motto: "Apprendre · Reconnaître · Défendre",
  },
  {
    code: "ur",
    label: "اردو",
    englishName: "Urdu",
    dir: "rtl",
    greeting: "ReproUs میں خوش آمدید — اپنے جسم کو سمجھیں اور جانیں کہ کیا پوچھنا ہے۔",
    motto: "سیکھیں · پہچانیں · آواز اٹھائیں",
  },
  {
    code: "sw",
    label: "Kiswahili",
    englishName: "Swahili",
    dir: "ltr",
    greeting: "Karibu ReproUs — Elewa mwili wako, na ujue cha kuuliza.",
    motto: "Jifunze · Tambua · Jitetea",
  },
  {
    code: "prs",
    label: "دری (Dari)",
    englishName: "Dari (Afghan Persian)",
    dir: "rtl",
    greeting: "به ReproUs خوش آمدید — بدن خود را بشناسید و بدانید چه بپرسید.",
    motto: "بیاموزید · تشخیص دهید · دفاع کنید",
  },
  {
    code: "ko",
    label: "한국어",
    englishName: "Korean",
    dir: "ltr",
    greeting: "ReproUs에 오신 것을 환영합니다 — 내 몸을 알고, 무엇을 물어볼지 알아보세요.",
    motto: "배우기 · 인식하기 · 옹호하기",
  },
  {
    code: "vi",
    label: "Tiếng Việt",
    englishName: "Vietnamese",
    dir: "ltr",
    greeting: "Chào mừng đến với ReproUs — Hiểu cơ thể bạn, biết những gì cần hỏi.",
    motto: "Học hỏi · Nhận biết · Tự vận động",
  },
];

export function LanguageBar({ currentLang, onSelectLang }: LanguageBarProps) {
  const [textSize, setTextSize] = useState<"" | "text-lg" | "text-xl">("");
  const [isHighContrast, setIsHighContrast] = useState(false);

  const activeLang = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang);

  const handleSelectLang = (code: string) => {
    onSelectLang(code);
    if (typeof document !== "undefined") {
      document.documentElement.lang = code;
      // Do not mutate documentElement.dir globally: the site remains in ltr,
      // and RTL text (Arabic/Urdu/Dari) is handled locally on its own containers.
      // This prevents the LanguageBar from flipping under the cursor and triggering contrast!
    }
  };

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
    <div className="bg-ivory/95 border-b border-plum/10 transition-colors" dir="ltr">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4 flex-wrap">
        {/* Language Switcher */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[12px] font-bold font-sans uppercase tracking-wider text-plum mr-1 flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-coral inline-block" />
            <span>Languages:</span>
          </span>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isActive = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelectLang(lang.code)}
                title={`${lang.label} (${lang.englishName})`}
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-[12px] font-medium font-sans transition-all border",
                  isActive
                    ? "bg-deep-teal border-deep-teal text-white font-bold shadow-xs ring-2 ring-coral/40"
                    : "bg-white/80 border-deep-teal/20 text-deep-teal hover:text-raspberry hover:border-coral hover:bg-white"
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
                ? "bg-deep-teal text-white font-bold hover:bg-deep-teal hover:text-white active:text-white focus:text-white"
                : "text-deep-teal/80 hover:bg-soft-pink hover:text-deep-teal active:text-deep-teal"
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
                ? "bg-deep-teal text-white font-bold hover:bg-deep-teal hover:text-white active:text-white focus:text-white"
                : "text-deep-teal/80 hover:bg-soft-pink hover:text-deep-teal active:text-deep-teal"
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
                ? "bg-deep-teal text-white font-bold hover:bg-deep-teal hover:text-white active:text-white focus:text-white"
                : "text-deep-teal/80 hover:bg-soft-pink hover:text-deep-teal active:text-deep-teal"
            )}
            aria-label="Extra large text size"
          >
            A++
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleContrast();
            }}
            className={cn(
              "ml-1.5 px-2.5 py-0.5 rounded text-[12.5px] font-semibold font-sans transition-colors border",
              isHighContrast
                ? "bg-deep-teal border-deep-teal text-white font-bold ring-2 ring-coral hover:bg-deep-teal hover:text-white active:text-white focus:text-white"
                : "border-deep-teal/20 text-deep-teal hover:bg-soft-pink hover:text-deep-teal active:text-deep-teal"
            )}
          >
            {isHighContrast ? "High Contrast On" : "High Contrast"}
          </button>
        </div>
      </div>

      {/* Multilingual Notice Banner when non-English is active */}
      {activeLang && activeLang.code !== "en" && (
        <div
          className="w-full bg-soft-pink/60 border-t border-deep-teal/10 py-2.5 px-4 text-center font-sans text-[13.5px] text-deep-teal shadow-xs animate-in fade-in duration-200"
          dir={activeLang.dir || "ltr"}
        >
          <div className="max-w-[1140px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <span className="inline-flex items-center gap-1 font-bold text-raspberry uppercase tracking-wider text-xs">
                <Globe2 className="w-3.5 h-3.5" />
                <span>
                  {activeLang.code === "ar"
                    ? "العربية"
                    : `${activeLang.label} (${activeLang.englishName})`}
                </span>
              </span>
              <span className="hidden sm:inline text-deep-teal/30">•</span>
              <span className="font-medium text-charcoal/90">
                &ldquo;{activeLang.greeting}&rdquo;
              </span>
              <span className="hidden md:inline px-2 py-0.5 rounded-full bg-white/80 text-[11.5px] font-bold text-coral border border-coral/30">
                {activeLang.motto}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-charcoal/70 hidden lg:inline">
                {activeLang.code === "ar"
                  ? "الترجمة السريرية قيد المراجعة"
                  : "Clinical translation in progress"}
              </span>
              <button
                type="button"
                onClick={() => handleSelectLang("en")}
                className="text-xs font-bold text-raspberry hover:text-raspberry-dark hover:underline underline flex items-center gap-1"
                dir="ltr"
              >
                <span>
                  {activeLang.code === "ar"
                    ? "العودة إلى الإنجليزية ✕"
                    : "Reset to English"}
                </span>
                {activeLang.code !== "ar" && <X className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
