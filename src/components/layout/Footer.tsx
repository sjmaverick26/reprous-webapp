"use client";

import React from "react";
import { ReproUsMark } from "@/components/shared/ReproUsMark";
import { PageId } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

interface FooterProps {
  onNavigate?: (page: PageId, categoryOrTab?: string) => void;
}

type FooterLink = { id: PageId; label: string; href: string };

const MAIN_LINKS: FooterLink[] = [
  { id: "story", label: "About", href: "/#/about" },
  { id: "hub", label: "Learn", href: "/#/learn" },
  { id: "resources", label: "Resources", href: "/#/resources" },
  { id: "voices", label: "Youth Voices", href: "/#/voices" },
];

const MORE_LINKS: FooterLink[] = [
  { id: "contact", label: "Contact", href: "/#/contact" },
  { id: "workshops", label: "Workshops", href: "/#/workshops" },
  { id: "privacy", label: "Privacy", href: "/#/privacy" },
];

const LINK_CLASS =
  "inline-flex items-center min-h-11 rounded transition-colors duration-150 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-pink focus-visible:ring-offset-2 focus-visible:ring-offset-deep-teal";

export function Footer({ onNavigate }: FooterProps) {
  // Real links (work on the 404 page too); inside the app they route through the view switcher.
  const renderLink = (link: FooterLink) => (
    <li key={link.id}>
      <a
        href={link.href}
        onClick={(e) => {
          if (!onNavigate) return;
          e.preventDefault();
          onNavigate(link.id);
        }}
        className={cn(LINK_CLASS)}
      >
        {link.label}
      </a>
    </li>
  );

  return (
    // A clean edge: every page ends on a light band, so the deep-teal footer needs no seam.
    <footer className="mt-auto bg-deep-teal text-white font-sans" dir="ltr">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 flex flex-col gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <ReproUsMark size={32} variant="light" />
            <div>
              <span className="font-serif text-2xl tracking-tight inline-flex items-center text-light-teal">
                <span>Repro</span>
                <span className="w-2 h-2 rounded-full bg-coral mx-1 inline-block" aria-hidden="true" />
                <span>Us</span>
              </span>
              <p className="text-sm text-soft-pink m-0 text-pretty">
                Evidence-based education and self-advocacy tools for girls &amp; youth.
              </p>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-1">
            <ul className="grid grid-cols-2 gap-x-6 list-none m-0 p-0 text-base font-semibold sm:flex sm:flex-wrap">
              {MAIN_LINKS.map(renderLink)}
            </ul>
            <ul className="grid grid-cols-2 gap-x-6 list-none m-0 p-0 text-sm text-soft-pink sm:flex sm:flex-wrap">
              {MORE_LINKS.map(renderLink)}
            </ul>
          </nav>
        </div>

        <div className="p-4 md:p-5 rounded-2xl bg-deep-teal-dark border border-deep-teal-light text-sm text-white leading-relaxed text-pretty">
          <strong className="text-light-teal">Educational Notice:</strong> ReproUs is an educational platform designed for health literacy and self-advocacy preparation. This is health education, not medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for personalized medical care or questions about your body.
        </div>

        <p className="m-0 text-base text-white text-pretty">
          In an emergency, call 911. In crisis, call or text 988 (Suicide &amp; Crisis Lifeline).
        </p>

        <p className="m-0 text-sm text-light-teal text-pretty">
          <strong className="text-white">Your privacy:</strong> ReproUs has no accounts, no tracking and no cookies. Your lesson
          progress is saved only in this browser on your device, and clearing your browser data removes it.{" "}
          <a
            href="/#/privacy"
            onClick={(e) => {
              if (!onNavigate) return;
              e.preventDefault();
              onNavigate("privacy");
            }}
            className="font-semibold text-white underline underline-offset-4 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soft-pink focus-visible:ring-offset-2 focus-visible:ring-offset-deep-teal"
          >
            Read the privacy page
          </a>
        </p>

        <p className="m-0 pt-6 border-t border-deep-teal-light text-sm text-soft-pink">
          © {new Date().getFullYear()} ReproUs Network. All education is provided for informational empowerment.
        </p>
      </div>
    </footer>
  );
}
