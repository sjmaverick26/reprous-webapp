"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { LEARN_GROUPS, LEARN_QUICK_LINKS } from "@/data/learnGroups";
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

/**
 * Her Learn menu (nav commits, 11 Nov): "Explore All Topics", her three groups (collapsed until clicked)
 * and her quick links. A disclosure, not an ARIA menu: plain buttons in tab order.
 */
function LearnMenuContent({
  idPrefix,
  onPick,
}: {
  idPrefix: string;
  onPick: (page: PageId, tab?: string) => void;
}) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={() => onPick("hub")}
        className={cn(
          "motion-arrow flex min-h-11 w-full items-center justify-between gap-2 rounded-lg px-3 text-left text-base font-semibold text-deep-teal transition-colors duration-150 hover:bg-light-teal",
          FOCUS_RING
        )}
      >
        <span>Explore All Topics</span>
        <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      </button>

      {LEARN_GROUPS.map((group) => {
        const isOpen = openGroup === group.id;
        const panelId = `${idPrefix}-${group.id}`;
        return (
          <div key={group.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenGroup(isOpen ? null : group.id)}
              className={cn(
                "flex min-h-11 w-full items-center justify-between gap-2 rounded-lg px-3 text-left text-base font-semibold transition-colors duration-150",
                FOCUS_RING,
                isOpen ? "bg-warm-cream text-deep-teal" : "text-charcoal hover:bg-warm-cream"
              )}
            >
              <span className="flex items-center gap-2.5">
                <span aria-hidden="true" className={cn("h-2.5 w-2.5 shrink-0 rounded-full", group.dot)} />
                <span className="text-balance">{group.label}</span>
              </span>
              <ChevronDown
                className={cn("h-4 w-4 shrink-0 text-deep-teal transition-transform duration-200", isOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <ul id={panelId} className="motion-menu m-0 flex list-none flex-col gap-0.5 py-1 pl-5 pr-1">
                {group.categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => onPick("hub", cat.id)}
                      className={cn(
                        "flex min-h-10 w-full items-center gap-2.5 rounded-md px-3 text-left text-sm font-semibold text-charcoal-light transition-colors duration-150 hover:bg-light-teal hover:text-deep-teal",
                        FOCUS_RING
                      )}
                    >
                      <span aria-hidden="true" className={cn("h-1.5 w-1.5 shrink-0 rounded-full", group.dot)} />
                      <span>{cat.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      <div className="mt-1 flex flex-col gap-0.5 border-t border-[#E5E1DC] pt-2">
        {LEARN_QUICK_LINKS.map((link) => (
          <button
            key={link.label}
            type="button"
            onClick={() => onPick(link.page, link.tab)}
            className={cn(
              "motion-arrow flex min-h-10 w-full items-center justify-between gap-2 rounded-md px-3 text-left text-sm font-semibold text-deep-teal transition-colors duration-150 hover:bg-light-teal",
              FOCUS_RING
            )}
          >
            <span>{link.label}</span>
            <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [learnOpen, setLearnOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);
  const learnRef = useRef<HTMLLIElement>(null);
  const learnToggleRef = useRef<HTMLButtonElement>(null);
  // True while the menu is open because a mouse is resting on Learn: the first chevron click then keeps it open
  // instead of closing it. Touch and pen never hover-open, so their first tap opens the menu.
  const hoverOpenedRef = useRef(false);

  // Browser Back/Forward (or any hash change) closes every menu; in-app links close them in go().
  useEffect(() => {
    const closeAll = () => {
      setMenuOpen(false);
      setLearnOpen(false);
      setMobileLearnOpen(false);
    };
    window.addEventListener("popstate", closeAll);
    window.addEventListener("hashchange", closeAll);
    return () => {
      window.removeEventListener("popstate", closeAll);
      window.removeEventListener("hashchange", closeAll);
    };
  }, []);

  // Learn menu: Escape closes it (focus back on its toggle); a click outside closes it.
  useEffect(() => {
    if (!learnOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLearnOpen(false);
        learnToggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (learnRef.current && !learnRef.current.contains(event.target as Node)) setLearnOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [learnOpen]);

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

  const go = (page: PageId, tab?: string) => {
    setMenuOpen(false);
    setLearnOpen(false);
    setMobileLearnOpen(false);
    onNavigate(page, tab);
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
            const isLearn = item.id === "hub";
            return (
              <li
                key={item.id}
                ref={isLearn ? learnRef : undefined}
                className={isLearn ? "relative flex items-center" : undefined}
                onPointerEnter={
                  isLearn
                    ? (e) => {
                        if (e.pointerType !== "mouse") return;
                        hoverOpenedRef.current = true;
                        setLearnOpen(true);
                      }
                    : undefined
                }
                onPointerLeave={
                  isLearn
                    ? (e) => {
                        if (e.pointerType !== "mouse") return;
                        hoverOpenedRef.current = false;
                        setLearnOpen(false);
                      }
                    : undefined
                }
                onBlur={
                  isLearn
                    ? (e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setLearnOpen(false);
                      }
                    : undefined
                }
              >
                <button
                  type="button"
                  onClick={() => go(item.id)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative min-h-11 px-1 text-base font-sans whitespace-nowrap rounded transition-colors duration-150",
                    "after:absolute after:left-0 after:right-0 after:bottom-1.5 after:h-0.5 after:origin-left after:rounded-full after:bg-raspberry after:transition-transform after:duration-200 after:ease-out",
                    FOCUS_RING,
                    active
                      ? "text-deep-teal font-semibold after:scale-x-100"
                      : "text-charcoal-light font-semibold hover:text-raspberry after:scale-x-0 hover:after:scale-x-100"
                  )}
                >
                  {item.label}
                </button>
                {isLearn && (
                  <>
                    <button
                      ref={learnToggleRef}
                      type="button"
                      onClick={() => {
                        if (hoverOpenedRef.current && learnOpen) {
                          hoverOpenedRef.current = false; // opened by hover: this click keeps it open
                          return;
                        }
                        setLearnOpen((o) => !o);
                      }}
                      aria-expanded={learnOpen}
                      aria-controls="learn-menu"
                      aria-label="Learn topics"
                      className={cn(
                        "inline-flex min-h-11 min-w-7 items-center justify-center rounded text-charcoal-light transition-colors duration-150 hover:text-raspberry",
                        FOCUS_RING
                      )}
                    >
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform duration-200", learnOpen && "rotate-180")}
                        aria-hidden="true"
                      />
                    </button>
                    {learnOpen && (
                      <div id="learn-menu" className="absolute left-1/2 top-full z-50 w-[23rem] -translate-x-1/2 pt-2">
                        <div className="motion-menu rounded-2xl border border-[#E5E1DC] bg-white p-2 shadow-lg">
                          <LearnMenuContent idPrefix="learn-desktop" onPick={go} />
                        </div>
                      </div>
                    )}
                  </>
                )}
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
        <div id="mobile-menu" className="motion-menu md:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-white border-t border-deep-teal/15 px-4 py-3">
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
                        ? "text-deep-teal font-semibold bg-light-teal"
                        : "text-charcoal-light font-semibold hover:bg-soft-pink"
                    )}
                  >
                    {item.label}
                  </button>
                  {item.id === "hub" && (
                    <>
                      <button
                        type="button"
                        onClick={() => setMobileLearnOpen((o) => !o)}
                        aria-expanded={mobileLearnOpen}
                        aria-controls="mobile-learn-menu"
                        className={cn(
                          "flex min-h-11 w-full items-center justify-between rounded-lg px-3 text-left text-base font-semibold text-deep-teal transition-colors duration-150 hover:bg-soft-pink",
                          FOCUS_RING
                        )}
                      >
                        <span>Learn topics</span>
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform duration-200", mobileLearnOpen && "rotate-180")}
                          aria-hidden="true"
                        />
                      </button>
                      {mobileLearnOpen && (
                        <div id="mobile-learn-menu" className="motion-menu pb-2 pl-3">
                          <LearnMenuContent idPrefix="learn-mobile" onPick={go} />
                        </div>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
