"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ReproUsMark } from "@/components/shared/ReproUsMark";
import { cn } from "@/lib/utils";

export type PageId =
  | "home"
  | "story"
  | "hub"
  | "workshops"
  | "resources"
  | "qa"
  | "myths"
  | "voices"
  | "contact";

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId, categoryId?: string) => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: "story", label: "About" },
  { id: "hub", label: "Learn" },
  { id: "resources", label: "Resources" },
  { id: "voices", label: "Youth Voices" },
];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry focus-visible:ring-offset-2";

export function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the phone menu and hands focus back to its button.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const go = (page: PageId) => {
    setMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-deep-teal/15" dir="ltr">
      <nav aria-label="Main" className="max-w-6xl mx-auto px-4 md:px-6 min-h-16 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go("home")}
          className={cn("flex items-center gap-2.5 text-left rounded-lg shrink-0 min-h-11", FOCUS_RING)}
          aria-label="ReproUs home"
        >
          <ReproUsMark size={30} />
          <span className="font-serif text-2xl tracking-tight inline-flex items-center">
            <span className="text-deep-teal">Repro</span>
            <span className="w-2 h-2 rounded-full bg-coral mx-1 inline-block" aria-hidden="true" />
            <span className="text-raspberry">Us</span>
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_ITEMS.map((item) => {
            const active = activePage === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => go(item.id)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative min-h-11 px-1 text-base font-sans whitespace-nowrap rounded transition-colors duration-150",
                    FOCUS_RING,
                    active
                      ? "text-deep-teal font-bold after:absolute after:left-0 after:right-0 after:bottom-1.5 after:h-0.5 after:bg-raspberry"
                      : "text-charcoal-light font-medium hover:text-raspberry"
                  )}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Phone menu button */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className={cn(
            "md:hidden inline-flex items-center justify-center min-h-11 min-w-11 rounded-lg text-deep-teal hover:bg-soft-pink transition-colors duration-150",
            FOCUS_RING
          )}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-deep-teal/15 px-4 py-3">
          <ul className="flex flex-col list-none m-0 p-0">
            {NAV_ITEMS.map((item) => {
              const active = activePage === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "w-full text-left min-h-12 px-3 rounded-lg text-lg font-sans transition-colors duration-150",
                      FOCUS_RING,
                      active
                        ? "text-deep-teal font-bold bg-light-teal"
                        : "text-charcoal-light font-medium hover:bg-soft-pink"
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
