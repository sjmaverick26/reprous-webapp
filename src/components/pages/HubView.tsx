"use client";

import React, { useState, useMemo } from "react";
import {
  Flame,
  Award,
  Trophy,
  ArrowLeft,
  BookOpen,
  FileText,
  Gamepad2,
  CheckCircle,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Activity,
  Heart,
  Shield,
  Calendar,
  Users,
  Globe,
  RotateCcw,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import {
  HUB_CATEGORIES,
  HubCategory,
  HubTopic,
} from "@/data/hubData";
import { Button } from "@/components/ui/button";
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

export function HubView({ initialCategory, onNavigate }: HubViewProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    initialCategory === "arcade" || initialCategory === "play-1" ? "play" : initialCategory || null
  );
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
  React.useEffect(() => {
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

  // Overall Learning Journey Progress Computations
  const allTopics = useMemo(() => {
    return Object.values(HUB_CATEGORIES).flatMap((cat) => cat.topics);
  }, []);
  const overallTotal = allTopics.length;
  const overallCompleted = useMemo(() => {
    return allTopics.filter((t) => completedTopics.has(t.id)).length;
  }, [allTopics, completedTopics]);
  const overallPercent = Math.round((overallCompleted / (overallTotal || 1)) * 100);

  // Category Progress Computations
  const categoryTotalCount = activeCategory?.topics.length || 0;
  const categoryCompletedCount = useMemo(() => {
    if (!activeCategory) return 0;
    return activeCategory.topics.filter((t) => completedTopics.has(t.id)).length;
  }, [activeCategory, completedTopics]);
  const categoryPercentage = Math.round((categoryCompletedCount / (categoryTotalCount || 1)) * 100);

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

  // Sync if initialCategory prop changes from external nav (including direct "arcade" launch)
  React.useEffect(() => {
    if (initialCategory) {
      if (initialCategory === "arcade" || initialCategory === "play-1") {
        setActiveCategoryId("play");
        const playCat = HUB_CATEGORIES["play"];
        const arcadeTopic = playCat?.topics.find(
          (t) => t.id === "play-1" || t.name.toLowerCase().includes("fuel up")
        );
        if (arcadeTopic) {
          setSelectedTopic(arcadeTopic);
        }
      } else if (HUB_CATEGORIES[initialCategory]) {
        setActiveCategoryId(initialCategory);
      }
    }
  }, [initialCategory]);

  const getTopicIcon = (type: HubTopic["type"]) => {
    switch (type) {
      case "lesson":
        return <BookOpen className="w-6 h-6 text-white" />;
      case "article":
        return <FileText className="w-6 h-6 text-white" />;
      case "game":
        return <Gamepad2 className="w-6 h-6 text-white" />;
      case "badge":
        return <Trophy className="w-7 h-7 text-white" />;
    }
  };

  const CATEGORY_GROUPS = [
    {
      name: "Female athlete health & Accessibility",
      badgeClass: "bg-light-teal border-deep-teal/30 text-deep-teal",
      dotClass: "bg-deep-teal",
      ids: ["play", "mind", "factors"],
    },
    {
      name: "Hormonal Health",
      badgeClass: "bg-soft-pink border-raspberry/30 text-raspberry",
      dotClass: "bg-raspberry",
      ids: ["pcos", "cycle", "realtalk"],
    },
    {
      name: "Reproductive Health",
      badgeClass: "bg-[#FFE1DB] border-coral/40 text-[#B83F68]",
      dotClass: "bg-coral",
      ids: ["endo", "body", "conditions"],
    },
  ];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "play":
        return <Activity className="w-6 h-6 text-white" />;
      case "pcos":
        return <Sparkles className="w-6 h-6 text-white" />;
      case "endo":
        return <Heart className="w-6 h-6 text-white" />;
      case "cycle":
        return <Calendar className="w-6 h-6 text-white" />;
      case "body":
        return <BookOpen className="w-6 h-6 text-white" />;
      case "conditions":
        return <Shield className="w-6 h-6 text-white" />;
      case "realtalk":
        return <Users className="w-6 h-6 text-white" />;
      case "mind":
        return <Sparkles className="w-6 h-6 text-white" />;
      case "factors":
        return <Globe className="w-6 h-6 text-white" />;
      default:
        return <BookOpen className="w-6 h-6 text-white" />;
    }
  };

  const getCategoryTheme = (id: string) => {
    // Teal group (Female Athlete Health, Mind & Self, The Bigger Picture)
    if (id === "play" || id === "mind" || id === "factors") {
      return {
        name: "teal",
        bgLight: "bg-light-teal",
        primaryHex: "#175B5C",
        textPrimary: "text-deep-teal",
        borderPrimary: "border-deep-teal/25",
        buttonClass: "bg-deep-teal text-white hover:bg-deep-teal/90",
        pillClass: "bg-[#D8EFED] text-[#175B5C] border-[#175B5C]/30",
        nodeRing: "ring-deep-teal/25",
        popoverBorder: "border-deep-teal/20",
        cardBg: "bg-light-teal border-deep-teal/25 hover:border-deep-teal",
        footerStyle: "text-deep-teal border-deep-teal/15",
      };
    }
    // Coral group (Endometriosis & Reproductive Health, Body Basics, Pregnancy & Reproductive Care)
    if (id === "endo" || id === "body" || id === "conditions") {
      return {
        name: "coral",
        bgLight: "bg-[#FFE1DB]",
        primaryHex: "#F47A6A",
        textPrimary: "text-[#B83F68]",
        borderPrimary: "border-coral/30",
        buttonClass: "bg-coral text-white hover:bg-coral/90",
        pillClass: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
        nodeRing: "ring-coral/25",
        popoverBorder: "border-coral/25",
        cardBg: "bg-[#FFE1DB] border-coral/30 hover:border-coral",
        footerStyle: "text-[#B83F68] border-coral/20",
      };
    }
    // Raspberry group (PCOS & Hormonal Health, Cycle Sense, Real Talk)
    return {
      name: "raspberry",
      bgLight: "bg-soft-pink",
      primaryHex: "#B83F68",
      textPrimary: "text-raspberry",
      borderPrimary: "border-raspberry/25",
      buttonClass: "bg-raspberry text-white hover:bg-raspberry/90",
      pillClass: "bg-soft-pink text-raspberry border-raspberry/30",
      nodeRing: "ring-raspberry/25",
      popoverBorder: "border-raspberry/25",
      cardBg: "bg-soft-pink border-raspberry/25 hover:border-raspberry",
      footerStyle: "text-raspberry border-raspberry/15",
    };
  };

  // FULL-PAGE LESSON WORKSPACE: When a user clicks "Start Lesson", take over the entire page view
  if (selectedTopic) {
    return (
      <FullPageLessonExperience
        topic={selectedTopic}
        categoryId={activeCategoryId || "play"}
        categoryTitle={activeCategory?.title || "Learn Hub"}
        categoryBadge={activeCategory?.badge || "Health Education"}
        onBack={closeTopic}
        onComplete={handleCompleteTopic}
        isCompleted={completedTopics.has(selectedTopic.id)}
        onNavigateToTopic={(topicId) => {
          const found = activeCategory?.topics.find((t) => t.id === topicId);
          if (found) {
            openTopic(found);
          }
        }}
        siblingTopics={activeCategory?.topics || []}
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-warm-cream py-10 text-charcoal">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Overview View */}
        {!activeCategory && (
          <div className="flex flex-col gap-10">
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-[13px] font-bold font-sans uppercase tracking-wider text-raspberry mb-2">
                ✦ HEALTH EDUCATION · SELF-ADVOCACY
              </div>
              <h1 className="text-4xl md:text-[56px] lg:text-[64px] font-normal font-serif leading-[1.08] text-deep-teal mb-3">
                What do you want to understand?
              </h1>
              <p className="text-charcoal/80 text-[17px] md:text-[18px] mb-3 leading-relaxed font-sans">
                Every category below is judgment-free and written in plain language. Tap any card to explore interactive lessons, games, and quizzes.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-light-teal/70 border border-deep-teal/20 text-xs font-semibold text-deep-teal mb-6 font-sans">
                <Shield className="w-3.5 h-3.5 text-deep-teal" />
                <span>Educational resource for health literacy — not medical advice</span>
              </div>

              {/* Clean, Non-Interactive Site-Wide Language Note */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 border border-deep-teal/15 shadow-xs text-xs sm:text-sm font-medium text-deep-teal mb-6 font-sans">
                <Globe className="w-3.5 h-3.5 text-coral shrink-0" />
                <span>✦ All guides available in 10 languages via the site-wide language menu above.</span>
              </div>

              {/* Gamification Stats Bar */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[14px] font-semibold font-sans text-deep-teal shadow-sm border border-deep-teal/15">
                  <Flame className="w-4 h-4 text-coral fill-coral" />
                  <span>{streak}-day streak</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[14px] font-semibold font-sans text-deep-teal shadow-sm border border-deep-teal/15">
                  <Sparkles className="w-4 h-4 text-coral" />
                  <span>{xp} XP earned</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[14px] font-semibold font-sans text-deep-teal shadow-sm border border-deep-teal/15">
                  <Award className="w-4 h-4 text-coral" />
                  <span>{earnedBadges.length} badges earned</span>
                </div>
                <a
                  href="#health-dictionary"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-50 hover:bg-amber-100 px-4 py-2 text-[14px] font-bold font-sans text-amber-900 shadow-sm border border-amber-300 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>Health Dictionary</span>
                </a>
              </div>

              {/* Overall Learning Journey Progress Card */}
              <div className="mt-8 max-w-2xl mx-auto w-full bg-white rounded-3xl p-6 md:p-7 shadow-card border-2 border-deep-teal/15 text-left transition-all">
                <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-deep-teal/70 font-sans block mb-1">
                      Your Learning Journey
                    </span>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-deep-teal leading-tight">
                      Overall Lesson Progress
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold font-sans bg-light-teal text-deep-teal border border-deep-teal/20">
                    <Sparkles className="w-3.5 h-3.5 text-coral" />
                    <span>{overallPercent}% Completed</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-3.5 p-0.5 overflow-hidden border border-slate-200/80 mb-3">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-deep-teal via-coral to-raspberry transition-all duration-700 shadow-xs"
                    style={{ width: `${Math.max(overallPercent, 4)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs sm:text-[13.5px] font-medium text-charcoal/70 font-sans">
                  <span>
                    <strong className="text-deep-teal font-bold">{overallCompleted}</strong> of{" "}
                    <strong>{overallTotal}</strong> lessons mastered
                  </span>
                  <span className="text-deep-teal font-bold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-coral fill-coral" />
                    Keep up the momentum!
                  </span>
                </div>

                {/* Local Storage Privacy Reassurance & Reset Button */}
                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-1.5 text-[11.5px] sm:text-xs text-charcoal/65 font-sans">
                    <ShieldCheck className="w-3.5 h-3.5 text-deep-teal shrink-0" />
                    <span>Saved in your browser only · 100% private · No account needed</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowResetModal(true)}
                    className="inline-flex items-center gap-1.5 text-[11.5px] sm:text-xs font-semibold text-charcoal/50 hover:text-red-600 transition-colors py-1 px-2.5 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-400 cursor-pointer"
                    title="Reset your saved progress back to zero"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset my progress</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Curriculum Architecture & Learning Framework Section */}
            <div className="bg-white rounded-3xl p-7 md:p-9 shadow-card border-2 border-deep-teal/15 text-left space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-light-teal text-deep-teal border border-deep-teal/20 mb-2 font-sans">
                  <Sparkles className="w-3.5 h-3.5 text-coral" />
                  <span>Curriculum Architecture &amp; Learning Framework</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-deep-teal leading-tight">
                  Evidence-Based Adolescent Health Education
                </h2>
                <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans mt-2 max-w-3xl">
                  Organized across 3 developmental pillars, 9 comprehensive modules, and 36 clinical topics designed specifically for high school and college youth.
                </p>
              </div>

              {/* 3 Pillars Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Pillar 1: Learn */}
                <div className="p-6 rounded-2xl bg-light-teal/30 border-2 border-deep-teal/20 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 rounded-full bg-deep-teal text-white text-xs font-bold uppercase tracking-wider font-sans">
                        Pillar 1: Learn
                      </span>
                      <BookOpen className="w-4 h-4 text-deep-teal" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-deep-teal mb-2">
                      Foundational Biology &amp; Physiology
                    </h3>
                    <p className="text-xs sm:text-[13px] text-charcoal/80 leading-relaxed font-sans m-0">
                      Menstrual cycle physiology, hormonal feedback loops, reproductive anatomy, and puberty milestones explained without shame or medical jargon.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-deep-teal/15 text-[11.5px] font-bold text-deep-teal/80 font-sans uppercase tracking-wider">
                    Modules: Body Basics · Cycle Sense · Repro Care
                  </div>
                </div>

                {/* Pillar 2: Recognize */}
                <div className="p-6 rounded-2xl bg-[#FFE1DB]/50 border-2 border-coral/30 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 rounded-full bg-coral text-white text-xs font-bold uppercase tracking-wider font-sans">
                        Pillar 2: Recognize
                      </span>
                      <Activity className="w-4 h-4 text-coral" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#B83F68] mb-2">
                      Symptom Recognition &amp; Red Flags
                    </h3>
                    <p className="text-xs sm:text-[13px] text-charcoal/80 leading-relaxed font-sans m-0">
                      Female athlete physiology, RED-S, Female Athlete Triad, PCOS, endometriosis, and distinguishing normal cramps from clinical signs.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-coral/20 text-[11.5px] font-bold text-[#B83F68]/80 font-sans uppercase tracking-wider">
                    Modules: Female Athlete Health · PCOS Unpacked · Endo Explained
                  </div>
                </div>

                {/* Pillar 3: Advocate */}
                <div className="p-6 rounded-2xl bg-soft-pink/40 border-2 border-raspberry/25 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-3 py-1 rounded-full bg-raspberry text-white text-xs font-bold uppercase tracking-wider font-sans">
                        Pillar 3: Advocate
                      </span>
                      <Shield className="w-4 h-4 text-raspberry" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-raspberry mb-2">
                      Self-Advocacy &amp; Healthcare Rights
                    </h3>
                    <p className="text-xs sm:text-[13px] text-charcoal/80 leading-relaxed font-sans m-0">
                      Minor confidentiality rights (Title X, HIPAA), preparing symptom logs, doctor discussion scripts, and overcoming medical dismissal.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-raspberry/20 text-[11.5px] font-bold text-raspberry/80 font-sans uppercase tracking-wider">
                    Modules: Mind &amp; Self-Advocacy · Real Talk · The Bigger Picture
                  </div>
                </div>
              </div>

              {/* Pedagogical Standards Grid */}
              <div className="pt-4 border-t border-deep-teal/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal/60 mb-3 font-sans">
                  ✦ ReproUs Pedagogical &amp; Clinical Standards
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-charcoal/80 font-sans">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>ACOG &amp; NIH Grounded</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-deep-teal shrink-0" />
                    <span>Plain Language Literacy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4 text-coral shrink-0" />
                    <span>Interactive Simulations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-raspberry shrink-0" />
                    <span>Actionable Doctor Scripts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Cards Grouped: Female Athlete Health & Accessibility, Hormonal Health, Reproductive Health */}
            <div className="space-y-12">
              {CATEGORY_GROUPS.map((group) => (
                <div key={group.name} className="space-y-5">
                  {/* Category Group Header Badge & Divider */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-[13px] font-bold font-sans tracking-wide border shadow-2xs ${group.badgeClass}`}
                    >
                      <span className={`w-2 h-2 rounded-full ${group.dotClass}`} />
                      <span>{group.name}</span>
                    </span>
                    <div className="h-px bg-deep-teal/15 flex-1" />
                  </div>

                  {/* 3 Modules in this color group */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.ids.map((id) => {
                      const cat = HUB_CATEGORIES[id];
                      if (!cat) return null;
                      const theme = getCategoryTheme(cat.id);
                      const catCompleted = cat.topics.filter((t) => completedTopics.has(t.id)).length;
                      const catTotal = cat.topics.length;
                      const catPercent = Math.round((catCompleted / (catTotal || 1)) * 100);

                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveCategoryId(cat.id);
                            setOpenPanelId(null);
                          }}
                          className={`group rounded-3xl p-7 text-left border-2 shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry flex flex-col justify-between ${theme.cardBg}`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <div
                                className="w-12 h-12 rounded-2xl shadow-sm flex items-center justify-center font-bold text-xs"
                                style={{ backgroundColor: theme.primaryHex }}
                              >
                                {getCategoryIcon(cat.id)}
                              </div>
                              {catCompleted === catTotal && catTotal > 0 && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white text-emerald-700 border border-emerald-300 shadow-2xs">
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Mastered</span>
                                </span>
                              )}
                            </div>
                            <h3 className="text-2xl md:text-[28px] font-normal font-serif text-deep-teal mb-2 group-hover:text-raspberry transition-colors leading-snug">
                              {cat.title}
                            </h3>
                            <p className="text-[15.5px] md:text-[16.5px] text-charcoal/85 leading-relaxed mb-4 font-sans">
                              {cat.description}
                            </p>

                            {/* Mini Category Progress Bar */}
                            <div className="mb-4">
                              <div className="flex items-center justify-between text-xs font-semibold text-charcoal/70 mb-1.5 font-sans">
                                <span>Module Progress</span>
                                <span>{catCompleted} of {catTotal} completed</span>
                              </div>
                              <div className="w-full bg-white/70 rounded-full h-2 overflow-hidden border border-black/5">
                                <div
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{
                                    width: `${catPercent}%`,
                                    backgroundColor: theme.primaryHex,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className={`flex items-center justify-between pt-3 text-[13.5px] font-semibold font-sans border-t ${theme.footerStyle}`}>
                            <span>{cat.topics.length} interactive topics</span>
                            <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                              See topics <ChevronRight className="w-4 h-4" />
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Little Health Dictionary & Medical Jargon Buster */}
            <div id="health-dictionary" className="mt-8 pt-6 border-t-2 border-deep-teal/15">
              <LittleHealthDictionary />
            </div>

            {/* Clinical & Educational References */}
            <EducationalReferences categoryId="default" />
          </div>
        )}

        {/* Category Detail View with Duolingo-style Serpentine Learning Path */}
        {activeCategory && (() => {
          const currentTheme = getCategoryTheme(activeCategory.id);

          return (
            <div className="flex flex-col gap-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveCategoryId(null);
                    setOpenPanelId(null);
                  }}
                  className="inline-flex items-center gap-2 text-sm font-bold text-deep-teal hover:text-raspberry transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal rounded-md px-2 py-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Learn Hub
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href="#health-dictionary"
                    className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 hover:bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900 shadow-sm border border-amber-300 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    <span>Dictionary</span>
                  </a>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-deep-teal shadow-sm border border-deep-teal/15">
                    <Sparkles className="w-3.5 h-3.5 text-coral" />
                    {xp} XP
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowResetModal(true)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-red-50 hover:text-red-600 px-3 py-1.5 text-xs font-medium text-charcoal/60 shadow-xs border border-deep-teal/15 hover:border-red-200 transition-colors cursor-pointer"
                    title="Reset your saved progress back to zero"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                </div>
              </div>

              <div className="text-center">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-bold font-sans uppercase tracking-wider mb-2.5 border shadow-sm ${currentTheme.pillClass}`}
                >
                  <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: currentTheme.primaryHex }} />
                  {activeCategory.badge}
                </div>
                <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-normal font-serif text-deep-teal mb-2 leading-[1.15]">
                  {activeCategory.title}
                </h2>
                <p className="text-[17px] md:text-[18px] text-charcoal/85 max-w-lg mx-auto font-sans leading-relaxed">
                  {activeCategory.description}
                </p>
              </div>

              {/* Category Progress Tracker Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-card border-2 border-deep-teal/15 text-left">
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-xs"
                      style={{ backgroundColor: currentTheme.primaryHex }}
                    >
                      {categoryCompletedCount === categoryTotalCount && categoryTotalCount > 0 ? (
                        <Trophy className="w-5 h-5 text-white" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-deep-teal">
                        {activeCategory.title} Mastery
                      </h4>
                      <p className="text-xs text-charcoal/70 font-sans">
                        Progress toward category completion &amp; badge
                      </p>
                    </div>
                  </div>
                  <div
                    className="px-3 py-1.5 rounded-full text-xs font-bold border shadow-2xs font-sans"
                    style={{
                      backgroundColor: `${currentTheme.primaryHex}15`,
                      color: currentTheme.primaryHex,
                      borderColor: `${currentTheme.primaryHex}35`,
                    }}
                  >
                    {categoryCompletedCount} of {categoryTotalCount} Completed ({categoryPercentage}%)
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200 mt-3 mb-2.5">
                  <div
                    className="h-full rounded-full transition-all duration-500 shadow-xs"
                    style={{
                      width: `${Math.max(categoryPercentage, 3)}%`,
                      backgroundColor: currentTheme.primaryHex,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-charcoal/75 font-sans">
                  <span>
                    {categoryCompletedCount === categoryTotalCount && categoryTotalCount > 0
                      ? "Category Mastered! Badge unlocked!"
                      : `Complete ${categoryTotalCount - categoryCompletedCount} more ${
                          categoryTotalCount - categoryCompletedCount === 1 ? "lesson" : "lessons"
                        } to unlock the ${activeCategory.badge}!`}
                  </span>
                  <span className="font-bold text-deep-teal">
                    +{categoryCompletedCount * 50} XP earned
                  </span>
                </div>
              </div>

              {/* Featured Interactive Experience: Athlete Nutrition Arcade in Play Strong Category */}
              {activeCategoryId === "play" && (
                <div className="mt-6 mb-2 rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-slate-900 via-deep-teal to-teal-950 text-white border-2 border-gold/40 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5 text-left">
                  <div className="space-y-2.5 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                      <span>Athlete Arcade · 4 Minigames</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      Fuel Up: Athlete Nutrition Arcade
                    </h3>
                    <p className="text-sm text-slate-200 leading-relaxed font-sans">
                      Explore athletic fueling with zero walls of text! Play <strong>Visual Fuel Match</strong>, <strong>3:1 Recovery Blender</strong>, <strong>Pregame Bowl Catcher</strong>, and <strong>Timing Clock</strong>.
                    </p>
                  </div>
                  <div className="flex items-center justify-between md:flex-col md:items-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-white/10 shrink-0">
                    <span className="text-xs text-slate-300 font-sans">12 interactive cards &amp; simulations</span>
                    <Button
                      onClick={() => {
                        const arcadeTopic = activeCategory.topics.find(
                          (t) => t.id === "play-1" || t.name.toLowerCase().includes("fuel up")
                        );
                        if (arcadeTopic) openTopic(arcadeTopic);
                      }}
                      size="sm"
                      className="bg-gold hover:bg-gold/90 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all text-sm flex items-center gap-2 cursor-pointer border border-yellow-300"
                    >
                      <Gamepad2 className="w-4 h-4 text-slate-950" />
                      <span>Launch Arcade</span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Serpentine Track */}
              <div className="py-8">
                <div className="relative flex flex-col gap-6">
                  {categoryCompletedCount < categoryTotalCount && (
                    <div className="absolute left-1/2 top-10 bottom-10 w-0.5 -translate-x-1/2 border-l-2 border-dashed border-deep-teal/20 z-0 pointer-events-none" />
                  )}
                  {activeCategory.topics.map((topic, idx) => {
                    const isLeft = idx % 2 === 0;
                    const isDone = completedTopics.has(topic.id);
                    const isOpen = openPanelId === topic.id;

                    return (
                      <div key={topic.id} className="flex flex-col items-center">
                        {/* Node Row */}
                        <div
                          className={`w-full flex ${
                            isLeft ? "justify-start pl-[12%] md:pl-[20%]" : "justify-end pr-[12%] md:pr-[20%]"
                          }`}
                        >
                          <button
                            onClick={() => setOpenPanelId(isOpen ? null : topic.id)}
                            className="flex flex-col items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal rounded-full p-2 cursor-pointer"
                          >
                            {topic.isAdvocateCapstone && (
                              <span className="text-[9.5px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-gradient-to-r from-deep-teal via-coral to-raspberry text-white shadow-2xs">
                                ✦ SELF-ADVOCACY ACTION
                              </span>
                            )}
                            <div
                              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-node group-hover:scale-105 ${
                                isDone
                                  ? "text-white shadow-node ring-2 ring-white"
                                  : topic.isAdvocateCapstone
                                  ? "text-white ring-4 ring-raspberry/50 shadow-lg scale-105"
                                  : `text-white ring-4 ${currentTheme.nodeRing}`
                              }`}
                              style={{
                                backgroundColor: topic.isAdvocateCapstone ? "#B83F68" : currentTheme.primaryHex,
                              }}
                            >
                              {isDone ? (
                                <CheckCircle className="w-7 h-7 text-white" />
                              ) : topic.isAdvocateCapstone ? (
                                <Shield className="w-7 h-7 text-white" />
                              ) : (
                                getTopicIcon(topic.type)
                              )}
                            </div>
                            <div className="text-center max-w-[140px]">
                              <div className="text-xs font-bold text-deep-teal group-hover:text-raspberry leading-snug">
                                {topic.name}
                              </div>
                              <div className="text-[10.5px] font-bold uppercase tracking-wider text-charcoal/60 mt-0.5">
                                {topic.isAdvocateCapstone ? "Self-Advocacy Action" : `${topic.type} • ${topic.xp} XP`}
                              </div>
                            </div>
                          </button>
                        </div>

                        {/* Popover Panel */}
                        {isOpen && (
                          <div className={`w-full max-w-sm my-3 rounded-2xl bg-white p-5 shadow-xl border-2 ${topic.isAdvocateCapstone ? "border-raspberry/40" : currentTheme.popoverBorder} animate-in fade-in zoom-in-95 duration-150`}>
                            {topic.isAdvocateCapstone && (
                              <div className="mb-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold tracking-wider uppercase bg-gradient-to-r from-light-teal via-[#FFE1DB] to-soft-pink text-deep-teal border border-raspberry/20">
                                <Shield className="w-3.5 h-3.5 text-raspberry" />
                                <span>Learn · Recognize · Advocate</span>
                              </div>
                            )}
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-[11px] font-bold uppercase tracking-wider ${topic.isAdvocateCapstone ? "text-raspberry" : currentTheme.textPrimary}`}>
                                {topic.type}
                              </span>
                              <span className="text-xs font-bold text-charcoal/70">
                                +{topic.xp} XP
                              </span>
                            </div>
                            <h4 className="text-lg font-bold font-serif text-deep-teal mb-2">
                              {topic.name}
                            </h4>
                            <p className="text-sm text-charcoal/85 leading-relaxed mb-4 font-sans">
                              {topic.desc}
                            </p>
                            <div className="flex items-center gap-3">
                              <Button
                                onClick={() => openTopic(topic)}
                                className={`w-full text-xs h-10 cursor-pointer ${topic.isAdvocateCapstone ? "bg-raspberry text-white hover:bg-raspberry/90" : currentTheme.buttonClass}`}
                              >
                                {isDone ? "Review Lesson" : topic.type === "game" ? "Play Game" : "Start Lesson"}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* End of Category Badge Node */}
                  <div
                    className={`w-full flex ${
                      activeCategory.topics.length % 2 === 0
                        ? "justify-start pl-[12%] md:pl-[20%]"
                        : "justify-end pr-[12%] md:pr-[20%]"
                    }`}
                  >
                    <button
                      onClick={() =>
                        setSelectedBadge({
                          name: activeCategory.badge,
                          desc: activeCategory.badgeDesc,
                          category: activeCategory.title,
                        })
                      }
                      className="flex flex-col items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal rounded-full p-2 cursor-pointer"
                    >
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center shadow-node group-hover:scale-105 border-2 border-white"
                        style={{ backgroundColor: currentTheme.primaryHex }}
                      >
                        <Trophy className="w-9 h-9 text-white" />
                      </div>
                      <div className="text-center max-w-[140px]">
                        <div className="text-xs font-bold text-deep-teal group-hover:text-raspberry">
                          {activeCategory.badge}
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal/60 mt-0.5">
                          Category Badge
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Little Health Dictionary & Medical Jargon Buster */}
                <div id="health-dictionary" className="mt-8 pt-6 border-t-2 border-deep-teal/15">
                  <LittleHealthDictionary initialModuleId={activeCategory.id} />
                </div>

                {/* Category Educational References */}
                <EducationalReferences
                  categoryId={activeCategory.id}
                  customTitle={`${activeCategory.title} Evidence & Clinical Guidelines`}
                />
              </div>
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
                <div className="w-24 h-24 rounded-full bg-deep-teal flex items-center justify-center border-4 border-light-teal shadow-md">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <DialogTitle className="text-2xl font-serif text-deep-teal mt-2">
                  {selectedBadge.name}
                </DialogTitle>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-light-teal text-deep-teal border border-deep-teal/20">
                  {selectedBadge.category}
                </span>
                <DialogDescription className="text-sm text-charcoal/80 max-w-xs mt-2">
                  {selectedBadge.desc}
                </DialogDescription>
                <Button
                  onClick={() => setSelectedBadge(null)}
                  className="mt-4 bg-deep-teal text-white hover:bg-deep-teal/90"
                >
                  Keep Learning
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Reset Progress Confirmation Modal */}
        <Dialog
          open={showResetModal}
          onOpenChange={setShowResetModal}
        >
          <DialogContent className="max-w-md text-left bg-white rounded-3xl p-6 sm:p-7">
            <DialogHeader>
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-3">
                <RotateCcw className="w-6 h-6" />
              </div>
              <DialogTitle className="text-xl sm:text-2xl font-serif font-bold text-deep-teal">
                Reset Your Learning Progress?
              </DialogTitle>
              <DialogDescription className="text-sm text-charcoal/80 font-sans mt-2 leading-relaxed">
                This will reset your completed lessons, streak, badges, and XP back to zero on this browser. Because ReproUs doesn&apos;t require an account and stores all your progress privately on your device, this action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowResetModal(false)}
                className="rounded-full px-5 font-sans cursor-pointer"
              >
                Keep My Progress
              </Button>
              <Button
                type="button"
                onClick={handleResetProgress}
                className="rounded-full px-5 bg-red-600 hover:bg-red-700 text-white font-sans shadow-sm cursor-pointer"
              >
                Yes, Reset Progress
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reset Feedback Toast */}
        {showResetToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-charcoal text-white text-sm font-sans px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Your progress has been reset back to 0.</span>
          </div>
        )}
      </div>
    </div>
  );
}
