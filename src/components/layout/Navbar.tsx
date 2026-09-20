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
    { id: "story", label: "About", dropdownType: "about" },
    { id: "hub", label: "Learn", dropdownType: "learn" },
    { id: "workshops", label: "Workshops" },
    { id: "resources", label: "Resources" },
    { id: "qa", label: "Q&A" },
    { id: "voices", label: "Youth Voices" },
  ];

  const learnCategories = [
    { id: "play", label: "Female Athlete Health", tag: "Sage" },
    { id: "pcos", label: "PCOS & Hormonal Health", tag: "Lavender" },
    { id: "endo", label: "Endometriosis & Reproductive Pain", tag: "Rose" },
    { id: "cycle", label: "Cycle Sense & Menstruation" },
    { id: "body", label: "Body Basics & Hormones" },
    { id: "conditions", label: "Pregnancy & Reproductive Care" },
    { id: "realtalk", label: "Real Talk & STIs" },
    { id: "mind", label: "Mind & Self-Advocacy" },
  ];

  const aboutItems = [
    { id: "story" as PageId, label: "Our Story", description: "Mission, research gaps & youth leadership" },
    { id: "contact" as PageId, tab: "ambassador", label: "Youth Ambassadors", description: "Join student leadership cohort" },
    { id: "contact" as PageId, tab: "inquiry", label: "Contact Us", description: "Direct questions & partnerships" },
    { id: "contact" as PageId, tab: "feedback", label: "Program Feedback", description: "Anonymous input & suggestions" },
  ];

  const isItemActive = (id: PageId) => {
    if (id === "story") {
      return activePage === "story" || activePage === "contact";
    }
    return activePage === id;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-deep-teal/10 transition-colors shadow-xs">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => {
            onNavigate("home");
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry rounded-lg shrink-0 group"
          aria-label="ReproUs Homepage"
        >
          <ReproUsMark size={30} />
          <span className="font-serif text-2xl md:text-[26px] font-bold tracking-tight inline-flex items-center">
            <span className="text-deep-teal">Repro</span>
            <span className="w-2 h-2 rounded-full bg-coral mx-1 inline-block" aria-hidden="true" />
            <span className="text-raspberry">Us</span>
          </span>
        </button>

        {/* Desktop Navigation Links (Clean Text, No Heavy Pills) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <ul className="flex items-center gap-5 xl:gap-6 list-none m-0 p-0">
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
                        "flex items-center gap-1 text-[14.5px] font-medium font-sans py-1 transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry rounded",
                        active
                          ? "text-plum font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-berry"
                          : "text-plum/80 hover:text-berry"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                    </button>

                    {/* Learn Dropdown */}
                    {learnDropdownOpen && (
                      <div className="absolute left-0 top-full pt-2 w-72 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="rounded-xl bg-white p-2 shadow-xl border border-plum/15 flex flex-col gap-1">
                          <button
                            onClick={() => {
                              onNavigate("hub");
                              setLearnDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-[14px] font-bold font-sans text-plum rounded-lg hover:bg-ivory-darker transition-colors border-b border-plum/10 pb-2 mb-1"
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
                              className="w-full text-left px-3 py-1.5 text-[13.5px] font-medium font-sans text-plum hover:text-berry hover:bg-ivory-darker rounded-lg transition-colors flex items-center justify-between"
                            >
                              <span>{cat.label}</span>
                              {cat.tag && (
                                <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-ivory text-plum/70">
                                  {cat.tag}
                                </span>
                              )}
                            </button>
                          ))}
                          <div className="pt-1 border-t border-plum/10 mt-1">
                            <button
                              onClick={() => {
                                onNavigate("myths");
                                setLearnDropdownOpen(false);
                              }}
                              className="w-full text-left px-3 py-1.5 text-[13.5px] font-bold font-sans text-berry hover:bg-berry/10 rounded-lg transition-colors"
                            >
                              ✨ Myths &amp; Facts Interactive Cards
                            </button>
                          </div>
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
                        "flex items-center gap-1 text-[14.5px] font-medium font-sans py-1 transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry rounded",
                        active
                          ? "text-plum font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-berry"
                          : "text-plum/80 hover:text-berry"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                    </button>

                    {/* About Dropdown */}
                    {aboutDropdownOpen && (
                      <div className="absolute left-0 top-full pt-2 w-64 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="rounded-xl bg-white p-2 shadow-xl border border-plum/15 flex flex-col gap-1">
                          {aboutItems.map((sub) => (
                            <button
                              key={sub.label}
                              onClick={() => {
                                onNavigate(sub.id, sub.tab);
                                setAboutDropdownOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 rounded-lg hover:bg-ivory-darker transition-colors group"
                            >
                              <span className="text-[14px] font-bold font-sans text-plum group-hover:text-berry block">
                                {sub.label}
                              </span>
                              <span className="text-[12px] font-normal font-sans text-plum/70 block">
                                {sub.description}
                              </span>
                            </button>
                          ))}
                        </div>
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
                      "text-[14.5px] font-medium font-sans py-1 transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry rounded whitespace-nowrap",
                      active
                        ? "text-plum font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-berry"
                        : "text-plum/80 hover:text-berry"
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans font-semibold text-[15px] bg-berry text-white shadow-sm hover:bg-berry/90 hover:text-white active:bg-berry-dark active:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry focus-visible:text-white whitespace-nowrap active:scale-[0.98]"
          >
            <span>Ask a Question</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-plum hover:bg-ivory-darker transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ivory border-b border-plum/15 px-6 py-5 flex flex-col gap-2 shadow-lg animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto font-sans">
          {navItems.map((item) => {
            const active = isItemActive(item.id);

            if (item.dropdownType === "learn") {
              return (
                <div key={item.id} className="flex flex-col border-b border-plum/10 pb-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        onNavigate("hub");
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex-1 text-left px-3 py-2.5 rounded-lg font-semibold text-[15px] transition-colors",
                        active ? "text-berry font-bold" : "text-plum hover:bg-ivory-darker"
                      )}
                    >
                      {item.label}
                    </button>
                    <button
                      onClick={() => setMobileLearnExpanded(!mobileLearnExpanded)}
                      className="p-2 text-plum hover:bg-ivory-darker rounded-lg ml-1"
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
                          className="w-full text-left px-3 py-1.5 text-[14px] font-medium text-plum/85 hover:text-berry rounded-lg"
                        >
                          ↳ {cat.label}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          onNavigate("myths");
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-[14px] font-bold text-berry rounded-lg"
                      >
                        ↳ ✨ Myths &amp; Facts Interactive Cards
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            if (item.dropdownType === "about") {
              return (
                <div key={item.id} className="flex flex-col border-b border-plum/10 pb-1">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        onNavigate("story");
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex-1 text-left px-3 py-2.5 rounded-lg font-semibold text-[15px] transition-colors",
                        active ? "text-berry font-bold" : "text-plum hover:bg-ivory-darker"
                      )}
                    >
                      {item.label}
                    </button>
                    <button
                      onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
                      className="p-2 text-plum hover:bg-ivory-darker rounded-lg ml-1"
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
                          className="w-full text-left px-3 py-1.5 text-[14px] font-medium text-plum/85 hover:text-berry rounded-lg"
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
                  "w-full text-left px-3 py-2.5 rounded-lg font-semibold text-[15px] transition-colors",
                  active ? "text-berry font-bold" : "text-plum hover:bg-ivory-darker"
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
            className="w-full mt-3 py-3 px-4 rounded-lg font-sans font-semibold text-[15px] bg-berry text-white flex items-center justify-center gap-2 shadow-sm hover:bg-berry/90 hover:text-white active:bg-berry-dark active:text-white transition-colors active:scale-[0.98]"
          >
            <span>Ask a Question</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </nav>
  );
}
