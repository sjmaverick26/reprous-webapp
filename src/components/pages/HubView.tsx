"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Trophy,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  FileText,
  Gamepad2,
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  Activity,
  Heart,
  Shield,
  Calendar,
  Users,
  Globe,
  RotateCcw,
  Stethoscope,
  Megaphone,
  Brain,
} from "lucide-react";
import {
  HUB_CATEGORIES,
  HubCategory,
  HubTopic,
} from "@/data/hubData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { EducationalReferences } from "@/components/shared/EducationalReferences";
import { LittleHealthDictionary } from "@/components/shared/LittleHealthDictionary";
import { FullPageLessonExperience } from "@/components/shared/FullPageLessonExperience";
import { MythsView } from "@/components/pages/MythsView";
import {
  getStoredProgress,
  saveStoredProgress,
  resetStoredProgress,
} from "@/lib/progressStorage";
import { PageId } from "@/components/layout/Navbar";

interface HubViewProps {
  initialCategory?: string | null;
  onNavigate?: (page: PageId, categoryId?: string) => void;
}

type SubView = "words" | "myths" | "sources";

const isSubView = (value?: string | null): value is SubView =>
  value === "words" || value === "myths" || value === "sources";

type PillarKey = "learn" | "recognize" | "advocate";

// Her three actions. Colour roles: Learn = teal, Recognize = coral, Advocate = raspberry.
const PILLARS: Record<
  PillarKey,
  {
    name: string;
    short: string;
    ids: string[];
    border: string;
    rule: string;
    chip: string;
    chipIcon: string;
    bar: string;
    ring: string;
  }
> = {
  learn: {
    name: "Learn about your body",
    short: "Learn",
    ids: ["body", "cycle", "play"],
    border: "border-deep-teal",
    rule: "border-deep-teal",
    chip: "bg-deep-teal",
    chipIcon: "text-white",
    bar: "bg-deep-teal",
    ring: "ring-light-teal",
  },
  recognize: {
    name: "Recognize and understand symptoms",
    short: "Recognize",
    ids: ["pcos", "endo", "conditions"],
    border: "border-coral",
    rule: "border-coral",
    chip: "bg-coral",
    chipIcon: "text-charcoal",
    bar: "bg-coral",
    ring: "ring-soft-pink",
  },
  advocate: {
    name: "Advocate for your health",
    short: "Advocate",
    ids: ["mind", "realtalk", "factors"],
    border: "border-raspberry",
    rule: "border-raspberry",
    chip: "bg-raspberry",
    chipIcon: "text-white",
    bar: "bg-raspberry",
    ring: "ring-soft-pink",
  },
};

const PILLAR_ORDER: PillarKey[] = ["learn", "recognize", "advocate"];

const pillarOf = (categoryId: string): PillarKey => {
  const found = PILLAR_ORDER.find((k) => PILLARS[k].ids.includes(categoryId));
  return found || "learn";
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>> = {
  body: BookOpen,
  cycle: Calendar,
  play: Activity,
  pcos: Stethoscope,
  endo: Heart,
  conditions: Shield,
  mind: Brain,
  realtalk: Users,
  factors: Globe,
};

const PRACTICE_LINKS: { label: string; page: PageId; tab: string }[] = [
  { label: "Track your symptoms", page: "resources", tab: "tracker" },
  { label: "Self-advocacy toolkit", page: "resources", tab: "toolkit" },
  { label: "Ask a question anonymously", page: "voices", tab: "ask" },
];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-2";

/** The page's one pillar marker: a coloured node and the pillar name. */
function PillarMarker({ pillar }: { pillar: PillarKey }) {
  const p = PILLARS[pillar];
  return (
    <p className="m-0 mb-4 inline-flex items-center gap-2.5 text-base font-semibold text-deep-teal">
      <span aria-hidden="true" className={`h-3 w-3 shrink-0 rounded-full ring-4 ${p.chip} ${p.ring}`} />
      {p.short}
    </p>
  );
}

export function HubView({ initialCategory, onNavigate }: HubViewProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    initialCategory === "arcade" || initialCategory === "play-1"
      ? "play"
      : initialCategory && HUB_CATEGORIES[initialCategory]
      ? initialCategory
      : null
  );
  const [subView, setSubView] = useState<SubView | null>(isSubView(initialCategory) ? initialCategory : null);
  const [openPanelId, setOpenPanelId] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<HubTopic | null>(() => {
    if (initialCategory === "arcade" || initialCategory === "play-1") {
      const playCat = HUB_CATEGORIES["play"];
      return playCat?.topics.find((t) => t.id === "play-1" || t.name.toLowerCase().includes("fuel up")) || null;
    }
    return null;
  });
  const [selectedBadge, setSelectedBadge] = useState<{ name: string; desc: string; category: string } | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [xp, setXp] = useState<number>(0);
  const [streak, setStreak] = useState<number>(1);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [showResetToast, setShowResetToast] = useState<boolean>(false);

  // Load saved progress from visitor's browser localStorage on client mount (100% private, no server calls)
  useEffect(() => {
    const stored = getStoredProgress();
    const loadedTopics = new Set(stored.completedTopics);
    setCompletedTopics(loadedTopics);
    setXp(stored.xp);
    setStreak(stored.streak);

    // Compute badges based on completed categories
    const loadedBadges = new Set(stored.earnedBadges);
    Object.values(HUB_CATEGORIES).forEach((cat) => {
      if (cat.topics.length > 0 && cat.topics.every((t) => loadedTopics.has(t.id))) {
        loadedBadges.add(cat.badge);
      }
    });
    setEarnedBadges(Array.from(loadedBadges));
  }, []);

  const activeCategory: HubCategory | undefined = activeCategoryId
    ? HUB_CATEGORIES[activeCategoryId]
    : undefined;

  // Category progress (module view)
  const categoryTotalCount = activeCategory?.topics.length || 0;
  const categoryCompletedCount = useMemo(() => {
    if (!activeCategory) return 0;
    return activeCategory.topics.filter((t) => completedTopics.has(t.id)).length;
  }, [activeCategory, completedTopics]);
  const categoryPercentage = Math.round((categoryCompletedCount / (categoryTotalCount || 1)) * 100);

  // "Continue where you left off": the module of the last finished lesson if it still has lessons left,
  // otherwise the first module that has been started but not finished. Nothing when there is no progress.
  const continueModule = useMemo<HubCategory | null>(() => {
    const done = Array.from(completedTopics);
    if (done.length === 0) return null;
    const cats = Object.values(HUB_CATEGORIES);
    const hasLeft = (c: HubCategory) => c.topics.some((t) => !completedTopics.has(t.id));
    const lastCat = cats.find((c) => c.topics.some((t) => t.id === done[done.length - 1]));
    if (lastCat && hasLeft(lastCat)) return lastCat;
    return cats.find((c) => hasLeft(c) && c.topics.some((t) => completedTopics.has(t.id))) || null;
  }, [completedTopics]);

  const handleCompleteTopic = (topic: HubTopic) => {
    if (!completedTopics.has(topic.id)) {
      const nextSet = new Set(completedTopics);
      nextSet.add(topic.id);
      setCompletedTopics(nextSet);
      const newXp = xp + topic.xp;
      setXp(newXp);

      // Check if this topic completion completes any category badges
      const updatedBadges = new Set(earnedBadges);
      Object.values(HUB_CATEGORIES).forEach((cat) => {
        if (cat.topics.length > 0 && cat.topics.every((t) => nextSet.has(t.id))) {
          updatedBadges.add(cat.badge);
        }
      });
      const nextBadgesArray = Array.from(updatedBadges);
      setEarnedBadges(nextBadgesArray);

      // Save strictly into visitor's browser localStorage - zero server calls
      saveStoredProgress({
        completedTopics: Array.from(nextSet),
        xp: newXp,
        streak,
        earnedBadges: nextBadgesArray,
      });
    }
    closeTopic();
  };

  const handleResetProgress = () => {
    const fresh = resetStoredProgress();
    setCompletedTopics(new Set(fresh.completedTopics));
    setXp(fresh.xp);
    setStreak(fresh.streak);
    setEarnedBadges(fresh.earnedBadges);
    setShowResetModal(false);
    setShowResetToast(true);
    setTimeout(() => setShowResetToast(false), 4000);
  };

  const openTopic = (topic: HubTopic) => {
    setSelectedTopic(topic);
    setOpenPanelId(null);
  };

  const closeTopic = () => {
    setSelectedTopic(null);
  };

  // Navigation inside Learn. Each keeps the parent's tab (and so the URL hash) in step.
  const openModule = (id: string) => {
    setActiveCategoryId(id);
    setSubView(null);
    setOpenPanelId(null);
    onNavigate?.("hub", id);
  };

  const openSubView = (view: SubView) => {
    setSubView(view);
    setActiveCategoryId(null);
    setOpenPanelId(null);
    onNavigate?.("hub", view);
  };

  const backToLearn = () => {
    setActiveCategoryId(null);
    setSubView(null);
    setOpenPanelId(null);
    onNavigate?.("hub");
  };

  // Sync if initialCategory prop changes from external nav (including direct "arcade" launch)
  useEffect(() => {
    // A change of view from outside (nav, back/forward, a shared link) closes any open lesson.
    setSelectedTopic(null);
    if (!initialCategory) {
      setActiveCategoryId(null);
      setSubView(null);
      return;
    }
    if (initialCategory === "arcade" || initialCategory === "play-1") {
      setActiveCategoryId("play");
      setSubView(null);
      const playCat = HUB_CATEGORIES["play"];
      const arcadeTopic = playCat?.topics.find(
        (t) => t.id === "play-1" || t.name.toLowerCase().includes("fuel up")
      );
      if (arcadeTopic) {
        setSelectedTopic(arcadeTopic);
      }
    } else if (isSubView(initialCategory)) {
      setSubView(initialCategory);
      setActiveCategoryId(null);
    } else if (HUB_CATEGORIES[initialCategory]) {
      setActiveCategoryId(initialCategory);
      setSubView(null);
    }
  }, [initialCategory]);

  // Start each Learn screen at the top
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  }, [activeCategoryId, subView]);

  const getTopicIcon = (type: HubTopic["type"], iconClass: string) => {
    switch (type) {
      case "lesson":
        return <BookOpen className={`w-6 h-6 ${iconClass}`} aria-hidden="true" />;
      case "article":
        return <FileText className={`w-6 h-6 ${iconClass}`} aria-hidden="true" />;
      case "game":
        return <Gamepad2 className={`w-6 h-6 ${iconClass}`} aria-hidden="true" />;
      case "badge":
        return <Trophy className={`w-7 h-7 ${iconClass}`} aria-hidden="true" />;
    }
  };

  // FULL-PAGE LESSON WORKSPACE: When a user clicks "Start Lesson", take over the entire page view
  if (selectedTopic) {
    const topicCatId = selectedTopic.id.split("-")[0];
    const effectiveCatId = HUB_CATEGORIES[topicCatId] ? topicCatId : (activeCategoryId || "factors");
    const effectiveCategory = HUB_CATEGORIES[effectiveCatId] || activeCategory;

    return (
      <FullPageLessonExperience
        topic={selectedTopic}
        categoryId={effectiveCatId}
        categoryTitle={effectiveCategory?.title || "Learn Hub"}
        categoryBadge={effectiveCategory?.badge || "Health Education"}
        onBack={closeTopic}
        onComplete={handleCompleteTopic}
        isCompleted={completedTopics.has(selectedTopic.id)}
        onNavigateToTopic={(topicId) => {
          const found = effectiveCategory?.topics.find((t) => t.id === topicId);
          if (found) {
            openTopic(found);
          }
        }}
        siblingTopics={effectiveCategory?.topics || []}
      />
    );
  }

  const backLink = (
    <button
      type="button"
      onClick={backToLearn}
      className={`inline-flex items-center gap-2 min-h-[44px] pr-2 text-base font-semibold text-deep-teal hover:underline rounded-md cursor-pointer ${FOCUS_RING}`}
    >
      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
      Back to Learn
    </button>
  );

  const showLanding = !activeCategory && !subView;

  return (
    <div className="w-full min-h-screen bg-warm-cream py-10 md:py-14 text-charcoal">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Learn landing: the page is the menu */}
        {showLanding && (
          <div className="flex flex-col gap-12">
            <header className="max-w-3xl">
              <PillarMarker pillar="learn" />
              <h1 className="font-serif text-h1 font-normal text-deep-teal text-balance m-0 mb-4">
                What do you want to understand?
              </h1>
              <p className="text-body text-charcoal text-pretty max-w-[65ch] m-0 mb-3">
                Every category below is judgment-free and written in plain language.
              </p>
              <p className="text-small text-charcoal-light text-pretty m-0">
                Educational resource for health literacy — not medical advice
              </p>
              {continueModule && (
                <button
                  type="button"
                  onClick={() => openModule(continueModule.id)}
                  className={`mt-3 min-h-[44px] text-left text-base text-deep-teal hover:underline cursor-pointer rounded-md ${FOCUS_RING}`}
                >
                  Continue where you left off: <span className="font-semibold">{continueModule.title}</span>
                </button>
              )}
            </header>

            {/* The nine modules, grouped under her three actions */}
            <div className="flex flex-col gap-12">
              {PILLAR_ORDER.map((key) => {
                const pillar = PILLARS[key];
                return (
                  <section key={key} aria-labelledby={`pillar-${key}`}>
                    <div data-reveal="" className="mb-6 flex items-center gap-4">
                      <span
                        aria-hidden="true"
                        className={`h-4 w-4 shrink-0 rounded-full ring-4 ${pillar.chip} ${pillar.ring}`}
                      />
                      <h2
                        id={`pillar-${key}`}
                        className="font-serif text-h3 font-normal text-deep-teal text-balance m-0"
                      >
                        {pillar.name}
                      </h2>
                      <span
                        aria-hidden="true"
                        className="hidden md:block h-0 min-w-8 flex-1 border-t-2 border-dashed border-light-teal-dark"
                      />
                    </div>

                    <div data-reveal-stagger="" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pillar.ids.map((id, idx) => {
                        const cat = HUB_CATEGORIES[id];
                        if (!cat) return null;
                        const Icon = CATEGORY_ICONS[cat.id] || BookOpen;
                        const catCompleted = cat.topics.filter((t) => completedTopics.has(t.id)).length;
                        const catTotal = cat.topics.length;
                        const catPercent = Math.round((catCompleted / (catTotal || 1)) * 100);
                        // 2-up at md: an odd last card spans both columns so no card sits alone
                        const spanAtMd =
                          idx === pillar.ids.length - 1 && pillar.ids.length % 2 === 1 ? "md:col-span-2 lg:col-span-1" : "";

                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => openModule(cat.id)}
                            className={`group rounded-2xl p-5 md:p-6 text-left bg-white border ${pillar.border} shadow-sm hover:bg-warm-cream motion-lift flex flex-col gap-3 md:grid md:grid-rows-subgrid md:row-span-3 cursor-pointer ${spanAtMd} ${FOCUS_RING}`}
                          >
                            <div>
                              <span className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${pillar.chip}`}>
                                <Icon className={`w-5 h-5 ${pillar.chipIcon}`} aria-hidden="true" />
                              </span>
                              <h3 className="font-serif text-2xl font-normal text-deep-teal text-balance leading-snug m-0 group-hover:underline">
                                {cat.title}
                              </h3>
                            </div>
                            <p className="text-base text-charcoal-light text-pretty leading-relaxed max-w-[65ch] m-0">
                              {cat.description}
                            </p>

                            <div className="mt-auto pt-2">
                              {catCompleted > 0 && (
                                <div className="mb-3">
                                  <div
                                    role="progressbar"
                                    aria-label={`${cat.title} progress`}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-valuenow={catPercent}
                                    className="w-full h-1.5 rounded-full bg-[#E5E1DC] overflow-hidden"
                                  >
                                    <div className={`h-full rounded-full ${pillar.bar}`} style={{ width: `${catPercent}%` }} />
                                  </div>
                                  <p className="text-small text-charcoal-light mt-1.5 mb-0">
                                    {catCompleted} of {catTotal} completed
                                  </p>
                                </div>
                              )}
                              <div className="flex items-center justify-between text-small font-semibold text-deep-teal">
                                <span>
                                  {catTotal} {catTotal === 1 ? "topic" : "topics"}
                                </span>
                                <ChevronRight className="w-4 h-4" aria-hidden="true" />
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>

            {/* Three quiet links */}
            <nav aria-label="More in Learn" className="border-t border-[#E5E1DC] pt-4 flex flex-wrap gap-x-8 gap-y-1">
              {(
                [
                  ["Health words", "words"],
                  ["Myths vs facts", "myths"],
                  ["Sources", "sources"],
                ] as [string, SubView][]
              ).map(([label, view]) => (
                <button
                  key={view}
                  type="button"
                  onClick={() => openSubView(view)}
                  className={`inline-flex items-center gap-1 min-h-[44px] text-base font-semibold text-deep-teal hover:underline rounded-md cursor-pointer ${FOCUS_RING}`}
                >
                  {label}
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Health words, Myths vs facts, Sources */}
        {subView && (
          <div className="flex flex-col gap-6">
            <div>{backLink}</div>
            {subView === "words" && (
              <div className="max-w-4xl">
                <LittleHealthDictionary />
              </div>
            )}
            {subView === "myths" && <MythsView embedded onNavigate={onNavigate} />}
            {subView === "sources" && (
              <div>
                <h1 className="font-serif text-h2 font-normal text-deep-teal text-balance m-0">Sources</h1>
                <EducationalReferences categoryId="default" className="mt-6 pt-0 border-t-0" />
              </div>
            )}
          </div>
        )}

        {/* Module view: the serpentine learning path */}
        {activeCategory && (() => {
          const pillar = PILLARS[pillarOf(activeCategory.id)];
          const remaining = categoryTotalCount - categoryCompletedCount;
          const featureCard = `rounded-2xl p-5 md:p-6 bg-white border ${pillar.border} shadow-sm flex flex-col md:flex-row md:items-center lg:flex-col lg:items-start justify-between gap-5 text-left`;
          const featureCardWide = `rounded-2xl p-5 md:p-6 bg-white border ${pillar.border} shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 text-left`;
          const featureButton = `inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full text-sm font-semibold text-deep-teal bg-white border border-deep-teal hover:bg-light-teal transition-colors duration-150 cursor-pointer ${FOCUS_RING}`;

          return (
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  {backLink}

                  <div className="flex items-center gap-1 flex-wrap">
                    <button
                      type="button"
                      onClick={() => openSubView("words")}
                      className={`inline-flex items-center min-h-[44px] pr-3 text-small font-semibold text-deep-teal hover:underline rounded-md cursor-pointer ${FOCUS_RING}`}
                    >
                      Health words
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowResetModal(true)}
                      className={`inline-flex items-center gap-1.5 min-h-[44px] px-3 text-small font-semibold text-charcoal-light hover:text-deep-teal transition-colors duration-150 rounded-md cursor-pointer ${FOCUS_RING}`}
                      title="Reset your saved progress back to zero"
                    >
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      <span>Reset my progress</span>
                    </button>
                  </div>
                </div>

                {/* One edge: header, progress and featured card on the left; the path beside them from 1024 */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
                <div className="lg:col-span-5 flex flex-col gap-8">
                <header>
                  <PillarMarker pillar={pillarOf(activeCategory.id)} />
                  <h1 className="font-serif text-h2 font-normal text-deep-teal text-balance m-0 mb-3">
                    {activeCategory.title}
                  </h1>
                  <p className="text-body text-charcoal-light text-pretty max-w-[65ch] m-0">
                    {activeCategory.description}
                  </p>
                  {/* The one filled button above the fold: start lesson 1 */}
                  {activeCategory.topics[0] && (
                    <button
                      type="button"
                      onClick={() => openTopic(activeCategory.topics[0])}
                      className="mt-6 inline-flex min-h-[48px] max-w-full items-center justify-center gap-2 rounded-full bg-raspberry px-7 py-3 text-left font-sans text-base font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-raspberry-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry focus-visible:ring-offset-2"
                    >
                      <span className="text-balance">{activeCategory.topics[0].name}</span>
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </button>
                  )}
                </header>

                {/* Progress: a thin bar once she has started */}
                <div>
                  {categoryCompletedCount > 0 && (
                    <>
                      <div className="flex items-center justify-between text-small text-charcoal-light mb-2">
                        <span>
                          {categoryCompletedCount} of {categoryTotalCount} completed
                        </span>
                        <span>{categoryPercentage}%</span>
                      </div>
                      <div
                        role="progressbar"
                        aria-label={`${activeCategory.title} progress`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={categoryPercentage}
                        className="w-full h-2 rounded-full bg-[#E5E1DC] overflow-hidden mb-2"
                      >
                        <div className={`h-full rounded-full ${pillar.bar}`} style={{ width: `${categoryPercentage}%` }} />
                      </div>
                    </>
                  )}
                  <p className="text-small text-charcoal-light text-pretty m-0">
                    {categoryCompletedCount === categoryTotalCount && categoryTotalCount > 0
                      ? "Category Mastered! Badge unlocked!"
                      : `Complete ${remaining} more ${remaining === 1 ? "lesson" : "lessons"} to unlock the ${activeCategory.badge}!`}
                  </p>
                </div>

                {/* Featured: Athlete Nutrition Arcade in Play Strong */}
                {activeCategoryId === "play" && (
                  <div className={featureCard}>
                    <div className="space-y-2 max-w-2xl">
                      <h2 className="font-serif text-2xl font-normal text-deep-teal text-balance m-0">
                        Fuel Up: Athlete Nutrition Arcade
                      </h2>
                      <p className="max-w-[65ch] text-base text-charcoal text-pretty leading-relaxed m-0">
                        Explore athletic fueling with zero walls of text! Play <strong>Visual Fuel Match</strong>, <strong>3:1 Recovery Blender</strong>, <strong>Pregame Bowl Catcher</strong>, and <strong>Timing Clock</strong>.
                      </p>
                    </div>
                    <div className="flex flex-col items-start md:items-end lg:items-start gap-3 shrink-0">
                      <span className="text-small text-charcoal-light">12 interactive cards &amp; simulations</span>
                      <button
                        type="button"
                        onClick={() => {
                          const arcadeTopic = activeCategory.topics.find(
                            (t) => t.id === "play-1" || t.name.toLowerCase().includes("fuel up")
                          );
                          if (arcadeTopic) openTopic(arcadeTopic);
                        }}
                        className={featureButton}
                      >
                        <Gamepad2 className="w-4 h-4" aria-hidden="true" />
                        <span>Launch Arcade</span>
                      </button>
                    </div>
                  </div>
                )}


                </div>

                {/* Learning path: nodes on one rail; each dashed segment runs node to node, never under a label */}
                <div className="lg:col-span-7">
                  <ol className="m-0 p-0 list-none flex flex-col" aria-label={`${activeCategory.title} lessons`}>
                    {activeCategory.topics.map((topic) => {
                      const isDone = completedTopics.has(topic.id);
                      const isOpen = openPanelId === topic.id;
                      const nodeBg = topic.isAdvocateCapstone ? "bg-raspberry" : pillar.chip;
                      const nodeIcon = topic.isAdvocateCapstone ? "text-white" : pillar.chipIcon;

                      return (
                        <li key={topic.id} className="relative pb-6">
                          {/* Segment from this node down to the next one, in the node column only */}
                          <span
                            aria-hidden="true"
                            className="absolute left-8 top-[4.5rem] bottom-0 w-0 -translate-x-1/2 border-l-2 border-dashed border-light-teal-dark pointer-events-none"
                          />
                          <button
                            type="button"
                            onClick={() => setOpenPanelId(isOpen ? null : topic.id)}
                            aria-expanded={isOpen}
                            className={`w-full flex items-center gap-4 py-1 pr-3 text-left group rounded-2xl cursor-pointer ${FOCUS_RING}`}
                          >
                            <span
                              className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center shadow-node group-hover:scale-105 transition-transform duration-150 ring-4 ${
                                topic.isAdvocateCapstone ? "ring-soft-pink" : pillar.ring
                              } ${nodeBg}`}
                            >
                              {isDone ? (
                                <CheckCircle className={`w-7 h-7 ${nodeIcon}`} aria-hidden="true" />
                              ) : topic.isAdvocateCapstone ? (
                                <Shield className="w-7 h-7 text-white" aria-hidden="true" />
                              ) : (
                                getTopicIcon(topic.type, nodeIcon)
                              )}
                            </span>
                            <span className="min-w-0">
                              <span className="block text-base font-semibold text-deep-teal text-balance group-hover:underline leading-snug">
                                {topic.name}
                              </span>
                              <span className="block text-small capitalize text-charcoal-light mt-0.5">
                                {topic.isAdvocateCapstone ? "Self-advocacy action" : topic.type}
                                {isDone ? " · done" : ""}
                              </span>
                            </span>
                          </button>

                          {/* Lesson panel: opens beside the rail, never across it */}
                          {isOpen && (
                            <div
                              className={`ml-20 mt-3 max-w-md rounded-2xl bg-white p-5 shadow-sm border ${
                                topic.isAdvocateCapstone ? "border-raspberry" : pillar.border
                              } animate-in fade-in duration-150`}
                            >
                              {topic.isAdvocateCapstone && (
                                <p className="text-small font-semibold text-raspberry m-0 mb-2">
                                  Learn · Recognize · Advocate
                                </p>
                              )}
                              <p className="text-small capitalize text-charcoal-light m-0 mb-1">{topic.type}</p>
                              <h3 className="text-2xl font-serif font-normal text-deep-teal text-balance m-0 mb-2">
                                {topic.name}
                              </h3>
                              <p className="max-w-[65ch] text-base text-charcoal-light text-pretty leading-relaxed m-0 mb-4">
                                {topic.desc}
                              </p>
                              <button
                                type="button"
                                onClick={() => openTopic(topic)}
                                className={`w-full min-h-[44px] rounded-full bg-raspberry text-white text-sm font-semibold hover:bg-raspberry-dark transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry focus-visible:ring-offset-2`}
                              >
                                {isDone ? "Review Lesson" : topic.type === "game" ? "Play Game" : "Start Lesson"}
                              </button>
                            </div>
                          )}
                        </li>
                      );
                    })}

                    {/* End of Category Badge Node */}
                    <li>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedBadge({
                            name: activeCategory.badge,
                            desc: activeCategory.badgeDesc,
                            category: activeCategory.title,
                          })
                        }
                        className={`w-full flex items-center gap-4 py-1 pr-3 text-left group rounded-2xl cursor-pointer ${FOCUS_RING}`}
                      >
                        <span className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center shadow-node group-hover:scale-105 transition-transform duration-150 ring-4 ${pillar.ring} ${pillar.chip}`}>
                          <Trophy className={`w-8 h-8 ${pillar.chipIcon}`} aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-base font-semibold text-deep-teal text-balance group-hover:underline leading-snug">
                            {activeCategory.badge}
                          </span>
                          <span className="block text-small text-charcoal-light mt-0.5">Category Badge</span>
                        </span>
                      </button>
                    </li>
                  </ol>
                </div>
                </div>
              </div>

              {/* Put it into practice: the tools live once, in Resources */}
              <section data-reveal="" aria-labelledby="practice-heading">
                <h2 id="practice-heading" className="font-serif text-h3 font-normal text-deep-teal text-balance m-0 mb-5">
                  Put it into practice
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {PRACTICE_LINKS.map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => onNavigate?.(link.page, link.tab)}
                      className={`rounded-2xl bg-white border border-[#E5E1DC] shadow-sm p-5 min-h-[56px] flex items-center justify-between gap-3 text-left text-base font-semibold text-deep-teal hover:border-deep-teal motion-lift motion-arrow cursor-pointer ${FOCUS_RING}`}
                    >
                      <span className="text-balance">{link.label}</span>
                      <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </section>

              {/* Featured: Rotterdam criteria in PCOS (copy untouched; flagged for the safety review) */}
              {activeCategoryId === "pcos" && (
                <div className={featureCardWide}>
                  <div className="space-y-2 max-w-2xl">
                    <h2 className="font-serif text-2xl font-normal text-deep-teal text-balance m-0">
                      The Rotterdam Criteria Diagnostic Guide
                    </h2>
                    <p className="max-w-[65ch] text-base text-charcoal text-pretty leading-relaxed m-0">
                      Under international consensus guidelines, PCOS requires meeting at least <strong>2 of 3 specific criteria</strong>: irregular ovulation, elevated androgens (signs or labs), and polycystic ovaries on ultrasound. You do <em>not</em> need ovarian cysts to have PCOS (Phenotype B), and you can have regular cycles (Phenotype C)!
                    </p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                    <span className="text-small text-charcoal-light">Interactive Criteria Checker &amp; 4 Phenotypes</span>
                    <button
                      type="button"
                      onClick={() => {
                        const pcosTopic = activeCategory.topics.find(
                          (t) => t.id === "pcos-1" || t.id === "pcos-0"
                        );
                        if (pcosTopic) openTopic(pcosTopic);
                      }}
                      className={featureButton}
                    >
                      <span>Explore Rotterdam Criteria</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Sources for this module */}
              <EducationalReferences
                categoryId={activeCategory.id}
                customTitle={`${activeCategory.title} Evidence & Clinical Guidelines`}
                className="mt-0"
              />
            </div>
          );
        })()}

        {/* Badge Award Modal */}
        <Dialog
          open={!!selectedBadge}
          onOpenChange={(open) => !open && setSelectedBadge(null)}
        >
          <DialogContent className="max-w-md text-center">
            {selectedBadge && (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-24 h-24 rounded-full bg-deep-teal flex items-center justify-center border-4 border-light-teal">
                  <Trophy className="w-12 h-12 text-white" aria-hidden="true" />
                </div>
                <DialogTitle className="text-2xl font-serif text-deep-teal mt-2">
                  {selectedBadge.name}
                </DialogTitle>
                <span className="inline-block px-3 py-1 rounded-full text-small font-semibold bg-light-teal text-deep-teal">
                  {selectedBadge.category}
                </span>
                <DialogDescription className="text-base text-charcoal-light max-w-xs mt-2">
                  {selectedBadge.desc}
                </DialogDescription>
                <button
                  type="button"
                  onClick={() => setSelectedBadge(null)}
                  className={`mt-4 min-h-[44px] px-6 rounded-full bg-raspberry text-white text-sm font-semibold hover:bg-raspberry-dark transition-colors duration-150 cursor-pointer ${FOCUS_RING}`}
                >
                  Keep Learning
                </button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Reset Progress Confirmation Modal */}
        <Dialog
          open={showResetModal}
          onOpenChange={setShowResetModal}
        >
          <DialogContent className="max-w-md text-left bg-white rounded-2xl p-5 md:p-6">
            <DialogHeader>
              <div className="w-12 h-12 rounded-full bg-soft-pink text-deep-teal flex items-center justify-center mb-3">
                <RotateCcw className="w-6 h-6" aria-hidden="true" />
              </div>
              <DialogTitle className="text-2xl font-serif font-normal text-deep-teal text-balance">
                Reset Your Learning Progress?
              </DialogTitle>
              <DialogDescription className="text-base text-charcoal-light font-sans mt-2 leading-relaxed">
                This will reset your completed lessons, streak, badges, and XP back to zero on this browser. Because ReproUs doesn&apos;t require an account and stores all your progress privately on your device, this action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className={`min-h-[44px] px-5 rounded-full border border-deep-teal bg-white text-deep-teal text-sm font-semibold font-sans hover:bg-light-teal transition-colors duration-150 cursor-pointer ${FOCUS_RING}`}
              >
                Keep My Progress
              </button>
              <button
                type="button"
                onClick={handleResetProgress}
                className="min-h-[44px] px-5 rounded-full bg-raspberry hover:bg-raspberry-dark text-white text-sm font-semibold font-sans transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry focus-visible:ring-offset-2"
              >
                Yes, Reset Progress
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reset Feedback Toast */}
        {showResetToast && (
          <div
            role="status"
            className="fixed bottom-6 right-4 left-4 sm:left-auto sm:right-6 z-50 bg-charcoal text-white text-base font-sans px-4 py-3 rounded-2xl shadow-sm flex items-center gap-2.5 animate-in fade-in duration-200"
          >
            <CheckCircle2 className="w-5 h-5 text-light-teal shrink-0" aria-hidden="true" />
            <span>Your progress has been reset back to 0.</span>
          </div>
        )}
      </div>
    </div>
  );
}
