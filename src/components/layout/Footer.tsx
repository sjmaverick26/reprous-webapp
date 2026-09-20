import React from "react";
import { ReproUsMark } from "@/components/shared/ReproUsMark";
import { PageId } from "@/components/layout/Navbar";

interface FooterProps {
  onNavigate?: (page: PageId, categoryOrTab?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const links: { id: PageId; label: string; tab?: string }[] = [
    { id: "home", label: "Home" },
    { id: "hub", label: "Learn" },
    { id: "workshops", label: "Workshops" },
    { id: "resources", label: "Resources" },
    { id: "qa", label: "Q&A" },
    { id: "voices", label: "Youth Voices" },
    { id: "story", label: "About" },
    { id: "contact", label: "Contact Us" },
    { id: "qa", tab: "ask", label: "Ask a Question →" },
  ];

  return (
    <footer className="mt-auto border-t border-berry/10 bg-cream-card/80 py-12 transition-colors">
      <div className="max-w-[1100px] mx-auto px-6 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <ReproUsMark size={32} />
            <div>
              <span className="font-serif font-normal text-berry text-2xl block">ReproUs</span>
              <p className="text-[13.5px] text-ink/75 m-0 font-sans">
                Free, honest reproductive health education for youth, students &amp; communities.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[13.5px] font-semibold text-berry/80 flex-wrap justify-center font-sans">
            <span>Always Free</span>
            <span>•</span>
            <span>100% Anonymous</span>
            <span>•</span>
            <span>Medical Review Board</span>
            <span>•</span>
            <span>Youth-Led Movement</span>
          </div>
        </div>

        {/* Quick Links Row */}
        {onNavigate && (
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 pt-4 border-t border-berry/10 text-[14px] md:text-[14.5px] font-semibold text-berry font-sans">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id, link.tab)}
                className="hover:underline hover:text-ink transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-berry/10 text-[13px] md:text-[13.5px] text-ink/70 text-center sm:text-left font-sans">
          <p className="m-0">
            © {new Date().getFullYear()} ReproUs Network. All education is provided for informational empowerment.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate?.("contact", "ambassador")}
              className="hover:underline text-berry font-bold"
            >
              Ambassador Portal
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate?.("contact", "feedback")}
              className="hover:underline text-berry font-bold"
            >
              Program Feedback
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
