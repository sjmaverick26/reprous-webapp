import React from "react";
import { Globe2 } from "lucide-react";
import { ReproUsMark } from "@/components/shared/ReproUsMark";
import { PageId } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";
import { SUPPORTED_LANGUAGES } from "@/components/layout/LanguageBar";

interface FooterProps {
  onNavigate?: (page: PageId, categoryOrTab?: string) => void;
  currentLang?: string;
  onSelectLang?: (lang: string) => void;
}

export function Footer({ onNavigate, currentLang = "en", onSelectLang }: FooterProps) {
  const links: { id: PageId; label: string; tab?: string }[] = [
    { id: "home", label: "Home" },
    { id: "story", label: "About" },
    { id: "hub", label: "Learn" },
    { id: "myths", label: "Myths & Facts" },
    { id: "workshops", label: "Workshops" },
    { id: "resources", label: "Resources" },
    { id: "qa", label: "Q&A" },
    { id: "voices", label: "Youth Voices" },
    { id: "contact", label: "Contact Us" },
    { id: "qa", tab: "ask", label: "Ask a Question →" },
  ];

  return (
    <footer className="mt-auto border-t border-deep-teal-dark bg-deep-teal text-white py-12 transition-colors font-sans" dir="ltr">
      <div className="max-w-[1100px] mx-auto px-6 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <ReproUsMark size={32} variant="light" />
            <div>
              <span className="font-serif font-bold text-light-teal text-2xl block tracking-tight inline-flex items-center">
                <span>Repro</span>
                <span className="w-2 h-2 rounded-full bg-coral mx-1 inline-block" aria-hidden="true" />
                <span className="text-light-teal">Us</span>
              </span>
              <p className="text-[13.5px] text-white/80 m-0 font-sans">
                Evidence-based education and self-advocacy tools for girls &amp; youth.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 text-[13.5px] font-medium text-white/85 flex-wrap justify-center font-sans">
            <span>Always Free</span>
            <span className="text-coral">•</span>
            <span>100% Anonymous</span>
            <span className="text-coral">•</span>
            <span>Clinical Research Grounding</span>
            <span className="text-coral">•</span>
            <span>Youth-Led Movement</span>
          </div>
        </div>

        {/* Quick Links Row */}
        {onNavigate && (
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 pt-4 border-t border-white/15 text-[14px] md:text-[14.5px] font-semibold text-white/90 font-sans">
            {links.map((link) => {
              const isCta = link.label.includes("→");
              return (
                <button
                  key={link.id + (link.tab || "")}
                  onClick={() => onNavigate(link.id, link.tab)}
                  className={cn(
                    "transition-colors",
                    isCta
                      ? "text-coral font-bold hover:underline"
                      : "hover:text-coral hover:underline"
                  )}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Languages in Footer */}
        <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-white/80 font-sans">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="font-bold text-coral text-xs uppercase tracking-wider flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Languages:</span>
            </span>
            {SUPPORTED_LANGUAGES.map((lang, idx) => {
              const isSelected = currentLang === lang.code;
              return (
                <React.Fragment key={lang.code}>
                  {idx > 0 && <span className="text-white/30">•</span>}
                  <button
                    onClick={() => {
                      onSelectLang?.(lang.code);
                      if (typeof document !== "undefined") {
                        document.documentElement.lang = lang.code;
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className={cn(
                      "transition-colors text-[13px]",
                      isSelected
                        ? "text-coral font-bold underline"
                        : "text-white/80 hover:text-coral hover:underline"
                    )}
                    title={`${lang.label} (${lang.englishName})`}
                  >
                    {lang.label}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/15 text-[13px] md:text-[13.5px] text-white/70 text-center sm:text-left font-sans">
          <p className="m-0">
            © {new Date().getFullYear()} ReproUs Network. All education is provided for informational empowerment.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate?.("contact", "ambassador")}
              className="hover:underline text-coral font-semibold"
            >
              Ambassador Portal
            </button>
            <span className="text-coral">•</span>
            <button
              onClick={() => onNavigate?.("contact", "feedback")}
              className="hover:underline text-coral font-semibold"
            >
              Program Feedback
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
