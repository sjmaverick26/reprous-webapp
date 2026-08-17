"use client";

import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { ReproUsMark } from "@/components/shared/ReproUsMark";
import { cn } from "@/lib/utils";

export type PageId = "home" | "story" | "hub" | "workshops" | "resources" | "qa" | "myths" | "voices";

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId, categoryId?: string) => void;
}

export function Navbar({ activePage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hubDropdownOpen, setHubDropdownOpen] = useState(false);

  const navItems: { id: PageId; label: string; hasDropdown?: boolean }[] = [
    { id: "home", label: "Home" },
    { id: "story", label: "Our Story" },
    { id: "hub", label: "Learning Hub", hasDropdown: true },
    { id: "workshops", label: "Workshops" },
    { id: "resources", label: "Resources" },
    { id: "qa", label: "Q&A" },
    { id: "myths", label: "Myths & Facts" },
    { id: "voices", label: "Youth Voices" },
  ];

  const hubCategories = [
    { id: "body", label: "Body Basics" },
    { id: "mind", label: "Mind & Self" },
    { id: "factors", label: "The Bigger Picture" },
    { id: "play", label: "Play Strong · Athlete Corner" },
    { id: "cycle", label: "Cycle Sense" },
    { id: "conditions", label: "Body Conditions" },
    { id: "realtalk", label: "Real Talk" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-blush/90 backdrop-blur-md border-b border-berry/10 transition-colors">
      <div className="max-w-[1100px] mx-auto px-6 py-3.5 flex items-center justify-between gap-5">
        {/* Brand Logo */}
        <button
          onClick={() => {
            onNavigate("home");
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry rounded-lg"
          aria-label="ReproUs Homepage"
        >
          <ReproUsMark size={34} />
          <span className="font-serif text-2xl font-bold text-berry tracking-tight">ReproUs</span>
        </button>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-1.5 list-none m-0 p-0">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            if (item.hasDropdown) {
              return (
                <li
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setHubDropdownOpen(true)}
                  onMouseLeave={() => setHubDropdownOpen(false)}
                >
                  <button
                    onClick={() => onNavigate("hub")}
                    className={cn(
                      "flex items-center gap-1 px-3.5 py-2 rounded-full text-[14.5px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry",
                      isActive
                        ? "bg-berry text-cream-card shadow-sm"
                        : "text-ink hover:bg-blush-deep/60"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                  </button>

                  {/* Hub Dropdown Menu */}
                  {hubDropdownOpen && (
                    <div className="absolute left-0 top-[105%] w-56 rounded-2xl bg-cream-card p-2 shadow-xl border border-berry/10 flex flex-col gap-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                      {hubCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            onNavigate("hub", cat.id);
                            setHubDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm font-bold text-berry rounded-xl hover:bg-blush transition-colors"
                        >
                          {cat.label}
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
                    "px-3.5 py-2 rounded-full text-[14.5px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry",
                    isActive
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
        <div className="lg:hidden bg-cream-card border-b border-berry/10 px-6 py-4 flex flex-col gap-2 shadow-lg animate-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => (
            <div key={item.id} className="flex flex-col">
              <button
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-2.5 rounded-xl font-bold text-base transition-colors",
                  activePage === item.id
                    ? "bg-berry text-cream-card"
                    : "text-ink hover:bg-blush"
                )}
              >
                {item.label}
              </button>
              {item.hasDropdown && (
                <div className="pl-4 pr-2 py-1 flex flex-col gap-1">
                  {hubCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onNavigate("hub", cat.id);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-sm font-semibold text-berry hover:bg-blush rounded-lg"
                    >
                      ↳ {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
