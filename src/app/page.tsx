"use client";

import React, { useState } from "react";
import { Navbar, PageId } from "@/components/layout/Navbar";
import { LanguageBar } from "@/components/layout/LanguageBar";
import { Footer } from "@/components/layout/Footer";
import { HomeView } from "@/components/pages/HomeView";
import { StoryView } from "@/components/pages/StoryView";
import { HubView } from "@/components/pages/HubView";
import { WorkshopsView } from "@/components/pages/WorkshopsView";
import { ResourcesView } from "@/components/pages/ResourcesView";
import { QAView } from "@/components/pages/QAView";
import { MythsView } from "@/components/pages/MythsView";
import { VoicesView } from "@/components/pages/VoicesView";
import { ContactView } from "@/components/pages/ContactView";

export default function App() {
  const [activePage, setActivePage] = useState<PageId>("home");
  const [hubCategory, setHubCategory] = useState<string | null>(null);
  const [contactTab, setContactTab] = useState<"feedback" | "ambassador" | "inquiry">("feedback");
  const [qaAutoOpen, setQaAutoOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<string>("en");

  const handleNavigate = (page: PageId, categoryOrTab?: string) => {
    setActivePage(page);
    if (page === "hub") {
      setHubCategory(categoryOrTab || null);
    } else {
      setHubCategory(null);
    }

    if (page === "qa" && categoryOrTab === "ask") {
      setQaAutoOpen(true);
    } else if (page === "qa") {
      setQaAutoOpen(false);
    }

    if (page === "contact" && (categoryOrTab === "feedback" || categoryOrTab === "ambassador" || categoryOrTab === "inquiry")) {
      setContactTab(categoryOrTab);
    } else if (page === "contact") {
      setContactTab("feedback");
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-plum selection:bg-gold/30 transition-colors">
      {/* Top Navbar */}
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      {/* Language & Accessibility Bar */}
      <LanguageBar currentLang={currentLang} onSelectLang={setCurrentLang} />

      {/* Main Page Views */}
      <main className="flex-1 w-full transition-all">
        {activePage === "home" && <HomeView onNavigate={handleNavigate} onSelectLang={setCurrentLang} />}
        {activePage === "story" && <StoryView />}
        {activePage === "hub" && <HubView initialCategory={hubCategory} />}
        {activePage === "workshops" && <WorkshopsView />}
        {activePage === "resources" && <ResourcesView onNavigate={handleNavigate} />}
        {activePage === "qa" && <QAView autoOpenSubmit={qaAutoOpen} />}
        {activePage === "myths" && <MythsView onNavigate={handleNavigate} />}
        {activePage === "voices" && <VoicesView />}
        {activePage === "contact" && <ContactView initialTab={contactTab} />}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
