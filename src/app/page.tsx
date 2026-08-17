"use client";

import React, { useState, useEffect } from "react";
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

export default function App() {
  const [activePage, setActivePage] = useState<PageId>("home");
  const [hubCategory, setHubCategory] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState<string>("en");

  const handleNavigate = (page: PageId, categoryId?: string) => {
    setActivePage(page);
    if (categoryId) {
      setHubCategory(categoryId);
    } else if (page !== "hub") {
      setHubCategory(null);
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blush text-ink selection:bg-yellow-deep/40 transition-colors">
      {/* Top Navbar */}
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      {/* Language & Accessibility Bar */}
      <LanguageBar currentLang={currentLang} onSelectLang={setCurrentLang} />

      {/* Main Page Views */}
      <main className="flex-1 w-full transition-all">
        {activePage === "home" && <HomeView onNavigate={handleNavigate} />}
        {activePage === "story" && <StoryView />}
        {activePage === "hub" && <HubView initialCategory={hubCategory} />}
        {activePage === "workshops" && <WorkshopsView />}
        {activePage === "resources" && <ResourcesView onNavigate={handleNavigate} />}
        {activePage === "qa" && <QAView />}
        {activePage === "myths" && <MythsView />}
        {activePage === "voices" && <VoicesView />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
