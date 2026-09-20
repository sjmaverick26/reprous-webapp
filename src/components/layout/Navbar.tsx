"use client";

import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
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

export function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileLearnExpanded, setMobileLearnExpanded] = useState(false);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);

  const navItems: {
    id: PageId;
    label: string;
    dropdownType?: "learn" | "about";
  }[] = [
    { id: "home", label: "Home" },
    { id: "hub", label: "Learn", dropdownType: "learn" },
    { id: "workshops", label: "Workshops" },
    { id: "resources", label: "Resources" },
    { id: "qa", label: "Q&A" },
    { id: "voices", label: "Youth Voices" },
    { id: "story", label: "About", dropdownType: "about" },
  ];

  const learnCategories = [
    { id: "body", label: "Body Basics" },
    { id: "cycle", label: "Cycle Sense" },
    { id: "play", label: "Female Athlete Health" },
    { id: "pcos", label: "PCOS & Hormonal Health" },
    { id: "endo", label: "Endometriosis & Pain" },
    { id: "conditions", label: "Pregnancy & Reproductive Care" },
    { id: "realtalk", label: "Real Talk" },
    { id: "mind", label: "Mind & Self" },
    { id: "factors", label: "The Bigger Picture" },
  ];

  const aboutItems = [
    { id: "story" as PageId, label: "Our Story", description: "Our mission, youth journey & roots" },
    { id: "contact" as PageId, tab: "inquiry", label: "Contact Us", description: "Direct inquiries & partnerships" },
    { id: "contact" as PageId, tab: "ambassador", label: "Youth Ambassadors", description: "Join student leadership cohort" },
    { id: "contact" as PageId, tab: "feedback", label: "Program Feedback", description: "Anonymous input & suggestions" },
  ];

  const isItemActive = (id: PageId) => {
    if (id === "story") {
      return activePage === "story" || activePage === "contact";
    }
    return activePage === id;
  };

  return (
    <nav className="sticky top-0 z-50 bg-blush/95 backdrop-blur-md border-b border-berry/10 transition-colors">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <button
          onClick={() => {
            onNavigate("home");
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry rounded-lg flex-shrink-0"
          aria-label="ReproUs Homepage"
        >
          <ReproUsMark size={34} />
          <span className="font-serif text-2xl font-bold text-berry tracking-tight">ReproUs</span>
        </button>

        {/* Desktop Navigation Links + CTA Button */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          <ul className="flex items-center gap-1 list-none m-0 p-0">
            {navItems.map((item) => {
              const active = isItemActive(item.id);

              if (item.dropdownType === "learn") {
                return (
                  <li
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setLearnDropdownOpen(true)}
                    onMouseLeave={() => setLearnDropdownOpen(false)}
                  >
                    <button
                      onClick={() => onNavigate("hub")}
                      className={cn(
                        "flex items-center gap-1 px-3 py-1.5 rounded-full text-[14px] xl:text-[14.5px] font-semibold font-sans transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry whitespace-nowrap",
                        active
                          ? "bg-berry text-cream-card shadow-sm"
                          : "text-ink hover:bg-blush-deep/60"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                    </button>

                    {/* Learn Dropdown Menu */}
                    {learnDropdownOpen && (
                      <div className="absolute left-0 top-[105%] w-64 rounded-2xl bg-cream-card p-2 shadow-xl border border-berry/10 flex flex-col gap-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <button
                          onClick={() => {
                            onNavigate("hub");
                            setLearnDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-[14px] font-bold font-sans text-berry rounded-xl hover:bg-blush transition-colors border-b border-berry/10 pb-2.5 mb-1"
                        >
                          Explore All Topics →
                        </button>
                        {learnCategories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              onNavigate("hub", cat.id);
                              setLearnDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-1.5 text-[13.5px] font-semibold font-sans text-berry rounded-xl hover:bg-blush transition-colors"
                          >
                            {cat.label}
                          </button>
                        ))}
                        <div className="pt-1 border-t border-berry/10 mt-1">
                          <button
                            onClick={() => {
                              onNavigate("myths");
                              setLearnDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-1.5 text-[13.5px] font-bold font-sans text-gold-deep bg-yellow/20 rounded-xl hover:bg-yellow/35 transition-colors"
                          >
                            ✨ Myths &amp; Facts Cards
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              }

              if (item.dropdownType === "about") {
                return (
                  <li
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setAboutDropdownOpen(true)}
                    onMouseLeave={() => setAboutDropdownOpen(false)}
                  >
                    <button
                      onClick={() => onNavigate("story")}
                      className={cn(
                        "flex items-center gap-1 px-3 py-1.5 rounded-full text-[14px] xl:text-[14.5px] font-semibold font-sans transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry whitespace-nowrap",
                        active
                          ? "bg-berry text-cream-card shadow-sm"
                          : "text-ink hover:bg-blush-deep/60"
                      )}
                    >
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                    </button>

                    {/* About Dropdown Menu */}
                    {aboutDropdownOpen && (
                      <div className="absolute right-0 xl:left-0 top-[105%] w-60 rounded-2xl bg-cream-card p-2 shadow-xl border border-berry/10 flex flex-col gap-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                        {aboutItems.map((sub) => (
                          <button
                            key={sub.label}
                            onClick={() => {
                              onNavigate(sub.id, sub.tab);
                              setAboutDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-xl hover:bg-blush transition-colors group"
                          >
                            <span className="text-[14px] font-bold font-sans text-berry block">
                              {sub.label}
                            </span>
                            <span className="text-[12px] font-medium font-sans text-ink/70 block">
                              {sub.description}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-[14px] xl:text-[14.5px] font-semibold font-sans transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry whitespace-nowrap",
                      active
                        ? "bg-berry text-cream-card shadow-sm"
                        : "text-ink hover:bg-blush-deep/60"
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Visually Distinct Button: Ask a Question → */}
          <button
            onClick={() => onNavigate("qa", "ask")}
            className="ml-2 xl:ml-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-sans font-semibold text-[14.5px] bg-berry text-cream-card shadow-sm hover:bg-berry/90 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry whitespace-nowrap active:scale-[0.98]"
          >
            <span>Ask a Question</span>
            <span aria-hidden="true" className="text-base font-bold leading-none">→</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-full text-berry hover:bg-blush-deep transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-card border-b border-berry/10 px-6 py-5 flex flex-col gap-2 shadow-lg animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
          {navItems.map((item) => {
            const active = isItemActive(item.id);

            if (item.dropdownType === "learn") {
              return (
                <div key={item.id} className="flex flex-col border-b border-berry/10 pb-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        onNavigate("hub");
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex-1 text-left px-3 py-2.5 rounded-xl font-semibold font-sans text-[15px] transition-colors",
                        active ? "bg-berry text-cream-card" : "text-ink hover:bg-blush"
                      )}
                    >
                      {item.label}
                    </button>
                    <button
                      onClick={() => setMobileLearnExpanded(!mobileLearnExpanded)}
                      className="p-2 text-berry hover:bg-blush rounded-lg ml-1"
                      aria-label="Expand Learn categories"
                    >
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          mobileLearnExpanded && "rotate-180"
                        )}
                      />
                    </button>
                  </div>

                  {mobileLearnExpanded && (
                    <div className="pl-4 pr-2 py-1.5 flex flex-col gap-1">
                      {learnCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            onNavigate("hub", cat.id);
                            setMobileMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 text-[14px] font-medium font-sans text-berry hover:bg-blush rounded-lg"
                        >
                          ↳ {cat.label}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          onNavigate("myths");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-[14px] font-bold font-sans text-gold-deep hover:bg-yellow/20 rounded-lg"
                      >
                        ↳ ✨ Myths &amp; Facts Cards
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            if (item.dropdownType === "about") {
              return (
                <div key={item.id} className="flex flex-col border-b border-berry/10 pb-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        onNavigate("story");
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex-1 text-left px-3 py-2.5 rounded-xl font-semibold font-sans text-[15px] transition-colors",
                        active ? "bg-berry text-cream-card" : "text-ink hover:bg-blush"
                      )}
                    >
                      {item.label}
                    </button>
                    <button
                      onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
                      className="p-2 text-berry hover:bg-blush rounded-lg ml-1"
                      aria-label="Expand About subpages"
                    >
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          mobileAboutExpanded && "rotate-180"
                        )}
                      />
                    </button>
                  </div>

                  {mobileAboutExpanded && (
                    <div className="pl-4 pr-2 py-1.5 flex flex-col gap-1">
                      {aboutItems.map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => {
                            onNavigate(sub.id, sub.tab);
                            setMobileMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 text-[14px] font-medium font-sans text-berry hover:bg-blush rounded-lg"
                        >
                          ↳ {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-xl font-semibold font-sans text-[15px] transition-colors",
                  active ? "bg-berry text-cream-card" : "text-ink hover:bg-blush"
                )}
              >
                {item.label}
              </button>
            );
          })}

          {/* Distinct CTA Button in Mobile Menu */}
          <button
            onClick={() => {
              onNavigate("qa", "ask");
              setMobileMenuOpen(false);
            }}
            className="w-full mt-3 py-3 px-4 rounded-full font-sans font-semibold text-[15px] bg-berry text-cream-card flex items-center justify-center gap-2 shadow-md hover:bg-berry/90 transition-colors active:scale-[0.98]"
          >
            <span>Ask a Question</span>
            <span aria-hidden="true" className="text-base font-bold">→</span>
          </button>
        </div>
      )}
    </nav>
  );
}

