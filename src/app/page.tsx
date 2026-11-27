"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Navbar, PageId } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomeView } from "@/components/pages/HomeView";
import { StoryView } from "@/components/pages/StoryView";
import { HubView } from "@/components/pages/HubView";
import { WorkshopsView } from "@/components/pages/WorkshopsView";
import { ResourcesView } from "@/components/pages/ResourcesView";
import { VoicesView } from "@/components/pages/VoicesView";
import { ContactView } from "@/components/pages/ContactView";
import { PrivacyView } from "@/components/pages/PrivacyView";
import { useReveal } from "@/components/shared/useReveal";
import { scrollMotion } from "@/lib/utils";
import { HUB_CATEGORIES } from "@/data/hubData";

type Route = { page: PageId; tab?: string };
type ResourcesCategory = React.ComponentProps<typeof ResourcesView>["initialCategory"];

const RESOURCE_TABS = ["tracker", "toolkit", "help", "library", "petitions", "all"];
const CONTACT_TABS = ["feedback", "ambassador", "inquiry"] as const;
type ContactTab = (typeof CONTACT_TABS)[number];

const RESOURCE_SCROLL_TARGETS: Record<string, string> = {
  help: "help",
  petitions: "petitions",
  action: "petitions",
  toolkit: "toolkit",
  tracker: "symptom-tracker-section",
};

const PAGE_TO_SLUG: Partial<Record<PageId, string>> = {
  home: "",
  story: "about",
  hub: "learn",
  resources: "resources",
  voices: "voices",
  workshops: "workshops",
  contact: "contact",
  privacy: "privacy",
};

const SLUG_TO_PAGE: Record<string, PageId> = {
  about: "story",
  learn: "hub",
  resources: "resources",
  voices: "voices",
  workshops: "workshops",
  contact: "contact",
  privacy: "privacy",
};

/** Folds legacy page ids into the current ones (myths -> Learn/myths, qa -> Voices/qa). */
function normalizeRoute(page: PageId, tab?: string): Route {
  if (page === "myths") return { page: "hub", tab: "myths" };
  // Her nav links (11 Nov) use "dictionary" for Health words.
  if (page === "hub" && tab === "dictionary") return { page: "hub", tab: "words" };
  if (page === "qa") return { page: "voices", tab: tab === "ask" ? "ask" : "qa" };
  if (page === "resources") {
    const t = tab === "action" ? "petitions" : tab;
    return { page, tab: t && RESOURCE_TABS.includes(t) && t !== "all" ? t : undefined };
  }
  if (page === "voices") {
    return { page, tab: tab === "ask" || tab === "qa" || tab === "toolkit" ? tab : undefined };
  }
  if (page === "hub") return { page, tab: tab || undefined };
  return { page, tab };
}

function routeToHash(route: Route): string {
  const slug = PAGE_TO_SLUG[route.page] ?? "";
  if (!slug) return "#/";
  const tab = route.page === "hub" || route.page === "resources" || route.page === "voices" ? route.tab : undefined;
  return tab ? `#/${slug}/${tab}` : `#/${slug}`;
}

function hashToRoute(hash: string): Route {
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const page = SLUG_TO_PAGE[(parts[0] || "").toLowerCase()];
  if (!page) return { page: "home" };
  const rawTab = (parts[1] || "").toLowerCase();
  const tab = /^[a-z0-9-]+$/.test(rawTab) ? rawTab : undefined;
  return normalizeRoute(page, tab);
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>("home");
  const [hubCategory, setHubCategory] = useState<string | null>(null);
  const [contactTab, setContactTab] = useState<ContactTab>("feedback");
  const [resourceCategory, setResourceCategory] = useState<string>("all");
  const [voicesTab, setVoicesTab] = useState<"stories" | "qa" | "toolkit">("stories");
  const [qaAutoOpen, setQaAutoOpen] = useState(false);

  // One browser-tab title per view, so tabs, history and bookmarks say where you are.
  useEffect(() => {
    const SITE = "ReproUs";
    const HOME_TITLE = "ReproUs — Learn & Youth Reproductive Education";
    const PAGE_TITLES: Partial<Record<PageId, string>> = {
      story: "About",
      hub: "Learn",
      resources: "Resources",
      voices: "Youth Voices",
      workshops: "Workshops",
      contact: "Contact",
      privacy: "Privacy",
    };
    const HUB_SUBVIEWS: Record<string, string> = { myths: "Myths vs. Facts", words: "Health Dictionary" };
    let name = PAGE_TITLES[activePage];
    if (activePage === "hub" && hubCategory) {
      name = HUB_SUBVIEWS[hubCategory] ?? HUB_CATEGORIES[hubCategory]?.title ?? name;
    }
    document.title = name ? `${name} · ${SITE}` : HOME_TITLE;
  }, [activePage, hubCategory]);
  const mainRef = useRef<HTMLElement>(null);
  // True after the first in-app navigation: only then do views fade in.
  const [hasNavigated, setHasNavigated] = useState(false);
  const viewKey = activePage;
  useReveal([activePage, hubCategory, resourceCategory, voicesTab]);

  const applyRoute = useCallback(({ page, tab }: Route) => {
    setActivePage(page);
    setHubCategory(page === "hub" ? tab || null : null);

    if (page === "resources") {
      setResourceCategory(tab || "all");
    }

    if (page === "voices") {
      if (tab === "qa" || tab === "ask") {
        setVoicesTab("qa");
        setQaAutoOpen(tab === "ask");
      } else if (tab === "toolkit") {
        setVoicesTab("toolkit");
        setQaAutoOpen(false);
      } else {
        setVoicesTab("stories");
        setQaAutoOpen(false);
      }
    }

    if (page === "contact") {
      setContactTab(CONTACT_TABS.includes(tab as ContactTab) ? (tab as ContactTab) : "feedback");
    }
  }, []);

  const scrollForRoute = useCallback(({ page, tab }: Route) => {
    const scrollToId = (id: string | undefined) => {
      setTimeout(() => {
        const el = id ? document.getElementById(id) : null;
        if (el) {
          el.scrollIntoView({ behavior: scrollMotion(), block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: scrollMotion() });
        }
      }, 60);
    };

    if (page === "home" && tab) scrollToId(tab);
    else if (page === "resources" && tab) scrollToId(RESOURCE_SCROLL_TARGETS[tab]);
    else if (page === "contact" && tab === "ambassador") scrollToId("ambassador-section");
    else window.scrollTo({ top: 0, behavior: scrollMotion() });
  }, []);

  const handleNavigate = (page: PageId, categoryOrTab?: string) => {
    const route = normalizeRoute(page, categoryOrTab);
    setHasNavigated(true);
    applyRoute(route);

    if (typeof window !== "undefined") {
      const hash = routeToHash(route);
      const currentHash = window.location.hash || "#/";
      if (currentHash !== hash) {
        window.history.pushState({}, "", hash);
      }
      scrollForRoute(route);
      // Move keyboard/screen-reader focus to the new view without scrolling.
      setTimeout(() => mainRef.current?.focus({ preventScroll: true }), 0);
    }
  };

  // Read the hash on load and on back/forward or manual hash edits.
  useEffect(() => {
    const syncFromHash = () => {
      // Ignore in-page anchors such as the skip link (#main).
      const current = window.location.hash;
      if (current && !current.startsWith("#/")) return;
      const route = hashToRoute(window.location.hash);
      setHasNavigated(true);
      applyRoute(route);
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    if (window.location.hash && window.location.hash !== "#/") {
      applyRoute(hashToRoute(window.location.hash));
    }

    window.addEventListener("popstate", syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      window.removeEventListener("popstate", syncFromHash);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [applyRoute]);

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-plum selection:bg-gold/30">
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 w-full outline-none">
        {/* Soft fade between views; skipped on first load so the first paint is immediate */}
        <div key={viewKey} className={hasNavigated ? "motion-view" : undefined}>
        {activePage === "home" && <HomeView onNavigate={handleNavigate} />}
        {activePage === "story" && <StoryView onNavigate={handleNavigate} />}
        {activePage === "hub" && <HubView initialCategory={hubCategory} onNavigate={handleNavigate} />}
        {activePage === "workshops" && <WorkshopsView />}
        {activePage === "resources" && (
          <ResourcesView
            initialCategory={resourceCategory as ResourcesCategory}
            onNavigate={handleNavigate}
          />
        )}
        {activePage === "voices" && (
          <VoicesView
            initialTab={voicesTab}
            autoOpenSubmit={qaAutoOpen}
            onNavigate={handleNavigate}
          />
        )}
        {activePage === "contact" && <ContactView initialTab={contactTab} onNavigate={handleNavigate} />}
        {activePage === "privacy" && <PrivacyView />}
        </div>
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
