import React from "react";
import { ReproUsMark } from "@/components/shared/ReproUsMark";
import { PageId } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

interface FooterProps {
  onNavigate?: (page: PageId, categoryOrTab?: string) => void;
}

const MAIN_LINKS: { id: PageId; label: string }[] = [
  { id: "story", label: "About" },
  { id: "hub", label: "Learn" },
  { id: "resources", label: "Resources" },
  { id: "voices", label: "Youth Voices" },
];

const MORE_LINKS: { id: PageId; label: string }[] = [
  { id: "contact", label: "Contact" },
  { id: "workshops", label: "Workshops" },
];

const LINK_CLASS =
  "inline-flex items-center min-h-11 rounded transition-colors duration-150 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-pink focus-visible:ring-offset-2 focus-visible:ring-offset-deep-teal";

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="mt-auto bg-deep-teal text-white font-sans" dir="ltr">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <ReproUsMark size={32} variant="light" />
            <div>
              <span className="font-serif text-2xl tracking-tight inline-flex items-center text-light-teal">
                <span>Repro</span>
                <span className="w-2 h-2 rounded-full bg-coral mx-1 inline-block" aria-hidden="true" />
                <span>Us</span>
              </span>
              <p className="text-sm text-soft-pink m-0">
                Evidence-based education and self-advocacy tools for girls &amp; youth.
              </p>
            </div>
          </div>

          {onNavigate && (
            <nav aria-label="Footer" className="flex flex-col gap-1">
              <ul className="flex flex-wrap gap-x-6 list-none m-0 p-0 text-base font-semibold">
                {MAIN_LINKS.map((link) => (
                  <li key={link.id}>
                    <button type="button" onClick={() => onNavigate(link.id)} className={cn(LINK_CLASS)}>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-wrap gap-x-6 list-none m-0 p-0 text-sm text-soft-pink">
                {MORE_LINKS.map((link) => (
                  <li key={link.id}>
                    <button type="button" onClick={() => onNavigate(link.id)} className={cn(LINK_CLASS)}>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div className="p-4 md:p-5 rounded-2xl bg-deep-teal-dark border border-deep-teal-light text-sm text-white leading-relaxed">
          <strong className="text-light-teal">Educational Notice:</strong> ReproUs is an educational platform designed for health literacy and self-advocacy preparation. This is health education, not medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for personalized medical care or questions about your body.
        </div>

        <p className="m-0 text-base text-white text-pretty">
          In an emergency, call 911. In crisis, call or text 988 (Suicide &amp; Crisis Lifeline).
        </p>

        <p className="m-0 pt-6 border-t border-deep-teal-light text-sm text-soft-pink">
          © {new Date().getFullYear()} ReproUs Network. All education is provided for informational empowerment.
        </p>
      </div>
    </footer>
  );
}
