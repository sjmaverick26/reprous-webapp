"use client";

import React, { useState, useMemo } from "react";
import {
  Flame,
  Award,
  Trophy,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileText,
  Gamepad2,
  CheckCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Activity,
  Heart,
  Shield,
  Calendar,
  Users,
  Globe,
  Maximize2,
  Minimize2,
  Video,
  Layers,
  HelpCircle,
  Lightbulb,
  Zap,
  PlayCircle,
  RotateCcw,
  Copy,
  Check,
  ShieldAlert,
  AlertTriangle,
  Quote,
  CheckSquare,
  Square,
  Info,
  ShieldCheck,
  ExternalLink,
  FileSpreadsheet,
  Scale,
  TrendingUp,
  Stethoscope,
} from "lucide-react";
import {
  HUB_CATEGORIES,
  HubCategory,
  HubTopic,
  getTopicClinicalQuote,
  getTopicRoleplayScenario,
  getTopicRoleplayScenarios,
  RoleplayScenario,
} from "@/data/hubData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AccessMini } from "@/components/shared/AccessMini";
import { EducationalReferences } from "@/components/shared/EducationalReferences";
import { InteractiveLessonDiagram } from "@/components/shared/InteractiveLessonDiagram";
import { LessonVideoCard } from "@/components/shared/LessonVideoCard";
import { LessonSorterGameComponent } from "@/components/shared/LessonSorterGame";
import { RoleplayInteractiveStage } from "@/components/shared/RoleplayInteractiveStage";
import { InteractiveQuizGame } from "@/components/shared/InteractiveQuizGame";
import { LittleHealthDictionary } from "@/components/shared/LittleHealthDictionary";
import { FuelUpNutritionGame } from "@/components/shared/FuelUpNutritionGame";
import {
  getStoredProgress,
  saveStoredProgress,
  resetStoredProgress,
} from "@/lib/progressStorage";

interface HubViewProps {
  initialCategory?: string | null;
}

export function HubView({ initialCategory }: HubViewProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(initialCategory || null);
  const [openPanelId, setOpenPanelId] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<HubTopic | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<{ name: string; desc: string; category: string } | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [xp, setXp] = useState<number>(0);
  const [streak, setStreak] = useState<number>(1);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [showResetToast, setShowResetToast] = useState<boolean>(false);

  // Interactive Multi-Page Lesson State
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [currentLessonPage, setCurrentLessonPage] = useState<number>(1);
  const [checkedSignals, setCheckedSignals] = useState<Set<number>>(new Set());
  const [curiosityRevealed, setCuriosityRevealed] = useState<boolean>(false);

  // Roleplay Scenario Game State (Multi-Simulation Support)
  const [activeSimulationIdx, setActiveSimulationIdx] = useState<number>(0);
  const [simulationSelections, setSimulationSelections] = useState<Record<number, number>>({});
  const [simulationBonuses, setSimulationBonuses] = useState<Record<number, boolean>>({});
  const [selectedRoleplayOption, setSelectedRoleplayOption] = useState<number | null>(null);
  const [roleplayBonusEarned, setRoleplayBonusEarned] = useState<boolean>(false);

  // Lesson Tabs & Quiz State
  const [activeLessonTab, setActiveLessonTab] = useState<"lesson" | "video" | "challenge" | "quiz">("lesson");
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [activeQuizAnswer, setActiveQuizAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  // Sync if initialCategory prop changes from external nav
  React.useEffect(() => {
    if (initialCategory) {
      setActiveCategoryId(initialCategory);
    }
  }, [initialCategory]);

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
    if (topic.id === "play-1" || topic.name.toLowerCase().includes("fuel up")) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
    setOpenPanelId(null);
    setCurrentLessonPage(1);
    setCheckedSignals(new Set());
    setCuriosityRevealed(false);
    setActiveSimulationIdx(0);
    setSimulationSelections({});
    setSimulationBonuses({});
    setSelectedRoleplayOption(null);
    setRoleplayBonusEarned(false);
    setActiveLessonTab("lesson");
    setQuizStep(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setActiveQuizAnswer(null);
    setIsQuizSubmitted(false);
  };

  const closeTopic = () => {
    setSelectedTopic(null);
    setIsFullScreen(false);
    setCurrentLessonPage(1);
    setCheckedSignals(new Set());
    setCuriosityRevealed(false);
    setActiveSimulationIdx(0);
    setSimulationSelections({});
    setSimulationBonuses({});
    setSelectedRoleplayOption(null);
    setRoleplayBonusEarned(false);
    setActiveLessonTab("lesson");
    setQuizStep(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setActiveQuizAnswer(null);
    setIsQuizSubmitted(false);
  };

  const getVisualCardIcon = (iconName: string) => {
    switch (iconName) {
      case "Activity":
        return <Activity className="w-4 h-4 text-deep-teal" />;
      case "Heart":
        return <Heart className="w-4 h-4 text-coral" />;
      case "Shield":
        return <Shield className="w-4 h-4 text-deep-teal" />;
      case "Calendar":
        return <Calendar className="w-4 h-4 text-raspberry" />;
      case "Clock":
        return <Clock className="w-4 h-4 text-charcoal/70" />;
      case "Zap":
        return <Zap className="w-4 h-4 text-amber-600" />;
      case "AlertTriangle":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "CheckCircle2":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case "Sparkles":
      default:
        return <Sparkles className="w-4 h-4 text-raspberry" />;
    }
  };

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

  const CATEGORY_ORDER = [
    "play",       // Female Athlete Health (Teal)
    "mind",       // Mind & Self (Teal)
    "factors",    // The Bigger Picture (Teal)
    "pcos",       // PCOS & Hormonal Health (Pink/Raspberry)
    "cycle",      // Cycle Sense (Pink/Raspberry)
    "realtalk",   // Real Talk (Pink/Raspberry)
    "endo",       // Endometriosis & Reproductive Health (Coral)
    "body",       // Body Basics (Coral)
    "conditions", // Pregnancy & Care (Coral)
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

              <AccessMini
                text="Every guide below is available in 10 languages and downloadable for offline reading."
                className="mx-auto shadow-sm mb-6"
              />

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
                className="inline-flex items-center gap-2 text-sm font-bold text-deep-teal hover:text-raspberry transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal rounded-md px-2 py-1"
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
                      Progress toward category completion & badge
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
                    ? "🏆 Category Mastered! Badge unlocked!"
                    : `Complete ${categoryTotalCount - categoryCompletedCount} more ${
                        categoryTotalCount - categoryCompletedCount === 1 ? "lesson" : "lessons"
                      } to unlock the ${activeCategory.badge}!`}
                </span>
                <span className="font-bold text-deep-teal">
                  +{categoryCompletedCount * 50} XP earned
                </span>
              </div>
            </div>

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
                          className="flex flex-col items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal rounded-full p-2"
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
                              className={`w-full text-xs h-10 ${topic.isAdvocateCapstone ? "bg-raspberry text-white hover:bg-raspberry/90" : currentTheme.buttonClass}`}
                            >
                              {isDone ? "Review Again" : topic.type === "game" ? "Play Game" : "Start Lesson"}
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
                    className="flex flex-col items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal rounded-full p-2"
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

      {/* Interactive Lesson / Game / Article Modal */}
      <Dialog
        open={!!selectedTopic}
        onOpenChange={(open) => {
          if (!open) {
            closeTopic();
          }
        }}
      >
        <DialogContent
          className={
            selectedTopic && (selectedTopic.id === "play-1" || selectedTopic.name.toLowerCase().includes("fuel up"))
              ? isFullScreen
                ? "w-[98vw] sm:max-w-[98vw] max-w-[98vw] h-[95vh] max-h-[95vh] p-0 rounded-3xl flex flex-col overflow-hidden border-2 border-coral/40 shadow-2xl bg-slate-900"
                : "max-w-4xl max-h-[90vh] p-0 rounded-2xl flex flex-col overflow-hidden border border-slate-200 shadow-xl bg-white"
              : isFullScreen
              ? "w-[98vw] sm:max-w-[98vw] max-w-[98vw] h-[95vh] max-h-[95vh] p-4 sm:p-6 md:p-8 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 border-2"
              : "max-w-3xl max-h-[90vh] p-4 sm:p-6 flex flex-col overflow-hidden"
          }
        >
          {selectedTopic && (() => {
            const isFuelUpGame = selectedTopic.id === "play-1" || selectedTopic.name.toLowerCase().includes("fuel up");
            if (isFuelUpGame) {
              return (
                <FuelUpNutritionGame
                  topic={selectedTopic}
                  onComplete={() => handleCompleteTopic(selectedTopic)}
                  onClose={closeTopic}
                  isFullScreen={isFullScreen}
                  onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
                />
              );
            }

            const topicTheme = getCategoryTheme(activeCategoryId || "play");
            const quizList = selectedTopic.quiz || [];
            const isQuizActive = quizList.length > 0;
            const currentQ = quizList[quizStep];
            const isQuizFinished = isQuizActive && quizStep >= quizList.length;
            const clinicalQuote = getTopicClinicalQuote(selectedTopic, activeCategoryId || undefined);
            const roleplayScenarios = getTopicRoleplayScenarios(selectedTopic, activeCategoryId || undefined);
            const activeScenario = roleplayScenarios[activeSimulationIdx] || roleplayScenarios[0];
            const hasSorter = !!selectedTopic.sorterGame;

            const advocacyData = selectedTopic.advocacyScript || {
              situation: `When discussing ${selectedTopic.name.toLowerCase()} or questions about your body with a physician, gynecologist, or nurse practitioner.`,
              doctorScript: `“I have questions and observations regarding ${selectedTopic.name.toLowerCase()}. Here is what I have been tracking over recent cycles. What clinical evaluation or diagnostic steps do you recommend to investigate this further?”`,
              whyItWorks: "Framing your questions around objective symptom tracking and clinical definitions invites your clinician into shared problem-solving.",
              whatIfDismissed: "Ask calmly: ‘Could you please document in my electronic health record that I reported these symptoms today and note why further evaluation is not indicated at this time?’",
            };

            const lessonPages = [
              { id: 1, title: "1. Core Concept", shortTitle: "Concept" },
              { id: 2, title: "2. Clinical Evidence", shortTitle: "Evidence" },
              { id: 3, title: "3. Visual Anatomy", shortTitle: "Visuals" },
              { id: 4, title: "4. Signal Detective", shortTitle: "Signals" },
              { id: 5, title: "5. Roleplay Game", shortTitle: "Roleplay" },
              { id: 6, title: "6. Doctor Script", shortTitle: "Script" },
              ...(hasSorter
                ? [
                    { id: 7, title: "7. Sorter Game", shortTitle: "Sorter" },
                    { id: 8, title: isQuizActive ? "8. Mini-Quiz & XP" : "8. Practice & XP", shortTitle: isQuizActive ? "Quiz" : "Complete" },
                  ]
                : [
                    { id: 7, title: isQuizActive ? "7. Mini-Quiz & XP" : "7. Practice & XP", shortTitle: isQuizActive ? "Quiz" : "Complete" },
                  ]),
            ];

            return (
              <div className="flex flex-col h-full overflow-hidden">
                {/* Top Control Bar */}
                <div className="flex items-center justify-between gap-3 border-b border-deep-teal/10 pb-3 mb-2 pr-7 shrink-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[12px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border shadow-2xs ${topicTheme.pillClass}`}>
                      {selectedTopic.isAdvocateCapstone ? "Self-Advocacy Action" : selectedTopic.type}
                    </span>
                    {selectedTopic.readTime && (
                      <span className="text-sm text-charcoal/70 inline-flex items-center gap-1.5 font-semibold font-sans">
                        <Clock className="w-4 h-4 text-deep-teal" /> {selectedTopic.readTime}
                      </span>
                    )}
                    <span className="text-sm font-bold text-deep-teal font-sans">
                      +{selectedTopic.xp} XP
                    </span>
                    <span className="text-[11px] text-charcoal/60 font-sans italic hidden md:inline">
                      (Health education · not medical advice)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsFullScreen(!isFullScreen)}
                      className="p-2 rounded-xl border border-slate-200 bg-white text-charcoal/70 hover:text-deep-teal hover:border-deep-teal/40 transition-all shadow-sm flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                      title={isFullScreen ? "Exit Fullscreen" : "Fullscreen View"}
                      aria-label={isFullScreen ? "Exit Fullscreen" : "Fullscreen View"}
                    >
                      {isFullScreen ? (
                        <>
                          <Minimize2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Exit Fullscreen</span>
                        </>
                      ) : (
                        <>
                          <Maximize2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Full Screen</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 7-Slide Stepper Navigation Pills */}
                <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl mb-3 overflow-x-auto border border-slate-200/80 shrink-0">
                  {lessonPages.map((p) => {
                    const isActive = currentLessonPage === p.id;
                    const isPast = currentLessonPage > p.id;

                    return (
                      <button
                        key={p.id}
                        onClick={() => setCurrentLessonPage(p.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all shrink-0 cursor-pointer ${
                          isActive
                            ? "bg-white text-deep-teal shadow-sm ring-1 ring-black/5"
                            : isPast
                            ? "text-deep-teal/80 hover:text-deep-teal hover:bg-white/50"
                            : "text-charcoal/60 hover:text-deep-teal hover:bg-white/40"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                            isActive
                              ? "bg-deep-teal text-white"
                              : isPast
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-200 text-charcoal/70"
                          }`}
                        >
                          {isPast ? "✓" : p.id}
                        </span>
                        <span className="hidden md:inline">{p.title}</span>
                        <span className="md:hidden">{p.shortTitle}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Scrollable Main Content Area */}
                <div className="flex-1 overflow-y-auto pr-1 sm:pr-3 space-y-6">
                  {/* SLIDE 1: CORE CONCEPT & BIOLOGICAL TRUTH */}
                  {currentLessonPage === 1 && (
                    <div className="space-y-6 animate-in fade-in duration-200 py-1">
                      <div>
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-deep-teal/70 font-sans block mb-1">
                          Slide 1 of 7 · The Big Picture
                        </span>
                        <DialogTitle className="text-3xl sm:text-4xl md:text-5xl font-normal font-serif text-deep-teal leading-[1.12] mb-3">
                          {selectedTopic.name}
                        </DialogTitle>
                        <DialogDescription className="text-charcoal/85 font-sans text-lg sm:text-xl leading-relaxed">
                          {selectedTopic.desc}
                        </DialogDescription>
                      </div>

                      {/* Hero Core Principle in Our Story Subtext Format */}
                      <div className={`p-6 sm:p-7 md:p-8 rounded-3xl border-2 leading-relaxed ${topicTheme.bgLight} ${topicTheme.borderPrimary} shadow-sm space-y-2.5`}>
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-deep-teal font-sans">
                          <Lightbulb className="w-5 h-5 text-raspberry" />
                          <span>Foundational Principle</span>
                        </div>
                        <p className="text-[17px] sm:text-[18px] md:text-[19px] font-bold text-deep-teal/90 leading-relaxed font-sans">
                          {selectedTopic.summary}
                        </p>
                      </div>

                      {/* Interactive Clinical Curiosity Check */}
                      <div className="rounded-3xl border-2 border-dashed border-deep-teal/30 bg-amber-50/60 p-5 sm:p-6 transition-all shadow-xs">
                        <button
                          type="button"
                          onClick={() => setCuriosityRevealed(!curiosityRevealed)}
                          className="w-full flex items-center justify-between text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal rounded-xl cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 shadow-xs">
                              <Sparkles className="w-5 h-5 text-amber-700" />
                            </div>
                            <div>
                              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block font-sans">
                                Clinical Curiosity Pearl
                              </span>
                              <h5 className="text-base sm:text-lg md:text-xl font-bold text-charcoal font-sans">
                                Why does knowing this change your medical visits?
                              </h5>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-deep-teal bg-white px-3.5 py-1.5 rounded-full border border-deep-teal/20 shadow-2xs shrink-0 font-sans">
                            {curiosityRevealed ? "Hide Pearl ▲" : "Tap to Reveal ▼"}
                          </span>
                        </button>
                        {curiosityRevealed && (
                          <div className="mt-4 pt-4 border-t border-amber-200/80 text-base sm:text-lg md:text-[19px] text-charcoal/90 leading-relaxed animate-in fade-in space-y-2.5 font-sans">
                            <p>
                              Many adolescents and young adults are told their symptoms are &ldquo;normal growing pains&rdquo; or &ldquo;just stress,&rdquo; causing an average diagnosis delay of 7 to 10 years for reproductive conditions.
                            </p>
                            <p className="font-semibold text-deep-teal">
                              By learning the exact medical terminology and biological standards up front, you can describe what you feel with clinical precision — cutting through dismissal and getting real answers years earlier.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* In-content Continue Button */}
                      <div className="pt-2 flex justify-end">
                        <Button
                          onClick={() => setCurrentLessonPage(2)}
                          className="bg-deep-teal text-white hover:bg-deep-teal/90 text-base sm:text-lg h-12 sm:h-14 px-7 rounded-2xl gap-2.5 font-bold shadow-sm cursor-pointer"
                        >
                          <span>Continue to Clinical Evidence</span>
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 2: CLINICAL AUTHORITY & VERIFIED EVIDENCE */}
                  {currentLessonPage === 2 && (
                    <div className="space-y-6 animate-in fade-in duration-200 py-1">
                      <div>
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-deep-teal/70 font-sans block mb-1">
                          Slide 2 of 7 · Medical Authority & Evidence
                        </span>
                        <h4 className="text-3xl sm:text-4xl font-serif font-bold text-deep-teal leading-tight mb-2">
                          Clinical Guidelines & Sourcing Grounding
                        </h4>
                        <p className="text-charcoal/85 text-lg sm:text-xl font-sans leading-relaxed">
                          Evidence directly cited from the American College of Obstetricians and Gynecologists (ACOG) and The Global Library of Women's Medicine (GLOWM / FIGO).
                        </p>
                      </div>

                      {/* Big Clinical Authority Direct Quote Card */}
                      <div className="p-6 sm:p-8 md:p-9 rounded-3xl bg-white border-2 border-deep-teal/25 shadow-md space-y-5">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-light-teal flex items-center justify-center text-deep-teal shadow-xs">
                              <Quote className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-deep-teal font-sans block">
                                Clinical Guideline Citation <span className="font-normal lowercase text-[11px] text-charcoal/60">(mockup quote)</span>
                              </span>
                              <span className="text-sm sm:text-base font-bold text-charcoal">
                                {clinicalQuote.source}
                              </span>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-light-teal text-deep-teal border border-deep-teal/20 shadow-2xs font-sans">
                            <Shield className="w-4 h-4 text-deep-teal" />
                            <span>Evidence Grounded (Mockup)</span>
                          </span>
                        </div>

                        <blockquote className="border-l-4 border-deep-teal pl-5 py-2 my-2">
                          <p className="text-xl sm:text-2xl md:text-[25px] font-serif italic text-deep-teal leading-relaxed">
                            &ldquo;{clinicalQuote.quote}&rdquo;
                          </p>
                        </blockquote>

                        <div className="pt-3 border-t border-deep-teal/15 flex items-center justify-between flex-wrap gap-3 text-sm sm:text-base font-sans">
                          <div>
                            <span className="font-bold text-charcoal block">{clinicalQuote.publication}</span>
                            <span className="text-charcoal/70 text-xs sm:text-sm italic">
                              Clinical Practice Reference <span className="font-normal">(these quotes are mockups for demonstration)</span>
                            </span>
                          </div>
                          {clinicalQuote.year && (
                            <span className="text-xs sm:text-sm font-bold text-deep-teal bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                              {clinicalQuote.year}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Why Doctors Rely on This Standard */}
                      <div className="p-5 sm:p-6 rounded-3xl bg-light-teal/50 border-2 border-deep-teal/20 space-y-2">
                        <strong className="text-deep-teal font-bold text-base sm:text-lg flex items-center gap-2 font-sans">
                          <ShieldAlert className="w-5 h-5 text-deep-teal" />
                          <span>Why this citation protects you as a patient:</span>
                        </strong>
                        <p className="text-base sm:text-lg text-charcoal/90 leading-relaxed font-sans m-0">
                          When you reference official ACOG or GLOWM clinical definitions during an appointment, physicians recognize that you are speaking within accepted medical frameworks. They are ethically and professionally obligated to evaluate your symptoms against these diagnostic criteria.
                        </p>
                      </div>

                      {/* In-content Continue Button */}
                      <div className="pt-2 flex justify-end">
                        <Button
                          onClick={() => setCurrentLessonPage(3)}
                          className="bg-deep-teal text-white hover:bg-deep-teal/90 text-base sm:text-lg h-12 sm:h-14 px-7 rounded-2xl gap-2.5 font-bold shadow-sm cursor-pointer"
                        >
                          <span>Continue to Visual Anatomy</span>
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 3: VISUAL ANATOMY & BIOLOGICAL FRAMEWORK */}
                  {currentLessonPage === 3 && (
                    <div className="space-y-6 animate-in fade-in duration-200 py-1">
                      <div>
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-deep-teal/70 font-sans block mb-1">
                          Slide 3 of 7 · Visual Anatomy & Mechanics
                        </span>
                        <h4 className="text-3xl sm:text-4xl font-serif font-bold text-deep-teal leading-tight mb-2">
                          Visual Breakdown & Biological Anatomy
                        </h4>
                        <p className="text-charcoal/85 text-lg sm:text-xl font-sans leading-relaxed">
                          Explore the physiological mechanics and structural pathways behind {selectedTopic.name.toLowerCase()}.
                        </p>
                      </div>

                      {/* Interactive Diagram (if available for topic) */}
                      {selectedTopic.diagram && (
                        <div className="p-1">
                          <InteractiveLessonDiagram
                            diagram={selectedTopic.diagram}
                            themeColor={topicTheme.primaryHex}
                          />
                        </div>
                      )}

                      {/* Bite-Sized Visual Cards */}
                      {selectedTopic.visualCards && selectedTopic.visualCards.length > 0 ? (
                        <div>
                          <h5 className="font-bold text-deep-teal text-sm sm:text-base uppercase tracking-wider mb-3.5 flex items-center gap-2 font-sans">
                            <Layers className="w-5 h-5 text-deep-teal" />
                            Key Anatomical Components:
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedTopic.visualCards.map((card, i) => {
                              const cardPalettes = [
                                { bg: "bg-light-teal/50", border: "border-deep-teal/30", iconBg: "bg-deep-teal text-white", badgeBg: "bg-white text-deep-teal border-deep-teal/20" },
                                { bg: "bg-[#FFE1DB]/70", border: "border-coral/40", iconBg: "bg-coral text-white", badgeBg: "bg-white text-[#B83F68] border-coral/30" },
                                { bg: "bg-soft-pink/70", border: "border-raspberry/35", iconBg: "bg-raspberry text-white", badgeBg: "bg-white text-raspberry border-raspberry/20" },
                              ];
                              const palette = cardPalettes[i % cardPalettes.length];

                              return (
                                <div
                                  key={i}
                                  className={`p-5 sm:p-6 rounded-3xl ${palette.bg} border-2 ${palette.border} shadow-2xs flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all`}
                                >
                                  <div>
                                    <div className="flex items-center justify-between mb-3">
                                      <span className={`p-3 rounded-2xl ${palette.iconBg} shadow-xs`}>
                                        {getVisualCardIcon(card.iconName)}
                                      </span>
                                      {card.highlight && (
                                        <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${palette.badgeBg} font-sans`}>
                                          {card.highlight}
                                        </span>
                                      )}
                                    </div>
                                    <h6 className="font-bold text-lg sm:text-xl text-deep-teal mb-2 font-serif">{card.title}</h6>
                                    <p className="text-base sm:text-lg text-charcoal/90 leading-relaxed font-sans">{card.text}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        /* Fallback spaced visual cards generated from key takeaways */
                        <div>
                          <h5 className="font-bold text-deep-teal text-sm sm:text-base uppercase tracking-wider mb-3.5 flex items-center gap-2 font-sans">
                            <Layers className="w-5 h-5 text-deep-teal" />
                            Essential Concepts:
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedTopic.keyTakeaways.slice(0, 3).map((takeaway, i) => {
                              const cardPalettes = [
                                { bg: "bg-light-teal/50", border: "border-deep-teal/30", iconBg: "bg-deep-teal text-white", badgeBg: "bg-white text-deep-teal border-deep-teal/20" },
                                { bg: "bg-[#FFE1DB]/70", border: "border-coral/40", iconBg: "bg-coral text-white", badgeBg: "bg-white text-[#B83F68] border-coral/30" },
                                { bg: "bg-soft-pink/70", border: "border-raspberry/35", iconBg: "bg-raspberry text-white", badgeBg: "bg-white text-raspberry border-raspberry/20" },
                              ];
                              const palette = cardPalettes[i % cardPalettes.length];

                              return (
                                <div
                                  key={i}
                                  className={`p-5 sm:p-6 rounded-3xl ${palette.bg} border-2 ${palette.border} shadow-2xs flex flex-col justify-between`}
                                >
                                  <div>
                                    <div className="flex items-center justify-between mb-3">
                                      <span className={`p-3 rounded-2xl ${palette.iconBg} shadow-xs`}>
                                        {i === 0 ? <Sparkles className="w-5 h-5" /> : i === 1 ? <Heart className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                                      </span>
                                      <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${palette.badgeBg} font-sans`}>
                                        Concept #{i + 1}
                                      </span>
                                    </div>
                                    <p className="text-base sm:text-lg text-charcoal/90 leading-relaxed font-sans">{takeaway}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* In-content Continue Button */}
                      <div className="pt-2 flex justify-end">
                        <Button
                          onClick={() => setCurrentLessonPage(4)}
                          className="bg-deep-teal text-white hover:bg-deep-teal/90 text-base sm:text-lg h-12 sm:h-14 px-7 rounded-2xl gap-2.5 font-bold shadow-sm cursor-pointer"
                        >
                          <span>Continue to Signal Detective</span>
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 4: SIGNAL DETECTIVE & SYMPTOM CHECKLIST */}
                  {currentLessonPage === 4 && (
                    <div className="space-y-6 animate-in fade-in duration-200 py-1">
                      <div>
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-deep-teal/70 font-sans block mb-1">
                          Slide 4 of 7 · Signal Detective
                        </span>
                        <h4 className="text-3xl sm:text-4xl font-serif font-bold text-deep-teal leading-tight mb-2">
                          Clinical Signals & Symptom Checklist
                        </h4>
                        <p className="text-charcoal/85 text-lg sm:text-xl font-sans leading-relaxed">
                          Tap each signal below to verify your symptom recognition and build your personal health awareness.
                        </p>
                      </div>

                      {/* Interactive Recognition Checklist with Large Typography */}
                      <div className="space-y-3.5">
                        {selectedTopic.keyTakeaways.map((item, i) => {
                          const isChecked = checkedSignals.has(i);

                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => {
                                const next = new Set(checkedSignals);
                                if (isChecked) {
                                  next.delete(i);
                                } else {
                                  next.add(i);
                                }
                                setCheckedSignals(next);
                              }}
                              className={`w-full p-5 sm:p-6 rounded-3xl border-2 text-left transition-all flex items-start gap-4 shadow-2xs cursor-pointer ${
                                isChecked
                                  ? "bg-emerald-50/90 border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                                  : "bg-white border-deep-teal/15 hover:border-deep-teal/40 hover:bg-light-teal/20"
                              }`}
                            >
                              <div className="shrink-0 mt-0.5">
                                {isChecked ? (
                                  <CheckSquare className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                                ) : (
                                  <Square className="w-6 h-6 text-charcoal/40" />
                                )}
                              </div>
                              <div className="flex-1">
                                <span className={`text-base sm:text-lg md:text-[20px] leading-relaxed font-sans ${isChecked ? "text-emerald-950 font-semibold" : "text-charcoal/90 font-medium"}`}>
                                  {item}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Checklist Progress Tracker */}
                      <div className="p-5 rounded-3xl bg-white border border-deep-teal/20 shadow-xs flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                          <span className="text-sm sm:text-base font-bold text-deep-teal font-sans">
                            Recognized {checkedSignals.size} of {selectedTopic.keyTakeaways.length} clinical signals
                          </span>
                        </div>
                        {checkedSignals.size === selectedTopic.keyTakeaways.length ? (
                          <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-300 animate-in fade-in font-sans">
                            ✦ All signals verified! Ready for the Roleplay Game.
                          </span>
                        ) : (
                          <span className="text-xs sm:text-sm text-charcoal/60 font-sans">
                            Tap signals above to check them off
                          </span>
                        )}
                      </div>

                      {/* In-content Continue Button */}
                      <div className="pt-2 flex justify-end">
                        <Button
                          onClick={() => setCurrentLessonPage(5)}
                          className="bg-deep-teal text-white hover:bg-deep-teal/90 text-base sm:text-lg h-12 sm:h-14 px-7 rounded-2xl gap-2.5 font-bold shadow-sm cursor-pointer"
                        >
                          <span>Continue to Roleplay Scenario Game</span>
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 5: INTERACTIVE ROLEPLAY SCENARIO GAME */}
                  {currentLessonPage === 5 && (
                    <div className="space-y-6 animate-in fade-in duration-200 py-1">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-raspberry text-white shadow-2xs font-sans mb-2">
                          <Gamepad2 className="w-4 h-4" />
                          <span>Interactive Roleplay Scenario Game</span>
                        </div>
                        <h4 className="text-3xl sm:text-4xl font-serif font-bold text-deep-teal leading-tight mb-2">
                          Doctor & Provider Roleplay Challenge
                        </h4>
                        <p className="text-charcoal/85 text-lg sm:text-xl font-sans leading-relaxed">
                          Simulate real encounters with doctors, coaches, and administrators. Choose the response that best asserts your rights, presents your evidence, and references clinical guidelines!
                        </p>
                      </div>

                      {/* Multi-Simulation Track Selector */}
                      {roleplayScenarios.length > 1 && (
                        <div className="rounded-3xl border-2 border-raspberry/25 bg-gradient-to-r from-raspberry/5 via-white to-light-teal/15 p-3.5 sm:p-4 space-y-2.5 shadow-2xs">
                          <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-sans">
                            <span className="font-bold text-deep-teal uppercase tracking-wider flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-raspberry" />
                              <span>Clinical Simulation Track ({activeSimulationIdx + 1} of {roleplayScenarios.length}):</span>
                            </span>
                            <span className="font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full text-[11px] border border-emerald-200">
                              {Object.values(simulationBonuses).filter(Boolean).length} of {roleplayScenarios.length} Scenarios Solved · +{Object.values(simulationBonuses).filter(Boolean).length * 30} XP
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {roleplayScenarios.map((sim, idx) => {
                              const isSimActive = activeSimulationIdx === idx;
                              const isSolved = simulationBonuses[idx];
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setActiveSimulationIdx(idx);
                                    if (simulationSelections[idx] !== undefined) {
                                      setSelectedRoleplayOption(simulationSelections[idx]);
                                    } else {
                                      setSelectedRoleplayOption(null);
                                    }
                                  }}
                                  className={`flex items-center justify-between gap-2 p-2.5 rounded-2xl border text-left transition-all cursor-pointer font-sans text-xs sm:text-[13px] ${
                                    isSimActive
                                      ? "bg-raspberry text-white border-raspberry shadow-xs font-bold"
                                      : isSolved
                                      ? "bg-emerald-50/90 text-emerald-950 border-emerald-300 font-semibold hover:bg-emerald-100/70"
                                      : "bg-white text-charcoal/80 border-slate-200 hover:border-deep-teal/40 font-medium hover:bg-slate-50"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span
                                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                        isSimActive
                                          ? "bg-white text-raspberry"
                                          : isSolved
                                          ? "bg-emerald-600 text-white"
                                          : "bg-slate-200 text-charcoal/70"
                                      }`}
                                    >
                                      {isSolved ? "✓" : idx + 1}
                                    </span>
                                    <span className="truncate">{sim.phaseName || `Simulation ${idx + 1}`}</span>
                                  </div>
                                  <span
                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                                      isSimActive
                                        ? "bg-white/20 text-white"
                                        : isSolved
                                        ? "bg-emerald-200 text-emerald-900"
                                        : "bg-slate-100 text-charcoal/60"
                                    }`}
                                  >
                                    +30 XP
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Interactive Visual Consultation Stage with Animated Characters */}
                      <RoleplayInteractiveStage
                        scenario={activeScenario}
                        selectedOption={simulationSelections[activeSimulationIdx] ?? null}
                        onSelectOption={(optIdx) => {
                          setSimulationSelections((prev) => ({ ...prev, [activeSimulationIdx]: optIdx }));
                          setSelectedRoleplayOption(optIdx);
                          if (activeScenario.options[optIdx].isBest && !simulationBonuses[activeSimulationIdx]) {
                            setSimulationBonuses((prev) => ({ ...prev, [activeSimulationIdx]: true }));
                            setRoleplayBonusEarned(true);
                            setXp((x) => x + activeScenario.options[optIdx].xpBonus);
                          }
                        }}
                        bonusEarned={simulationBonuses[activeSimulationIdx] ?? false}
                        simulationIndex={activeSimulationIdx}
                        totalSimulations={roleplayScenarios.length}
                        simulationTitle={activeScenario.phaseName || activeScenario.title}
                        onNextSimulation={
                          activeSimulationIdx < roleplayScenarios.length - 1
                            ? () => setActiveSimulationIdx((i) => i + 1)
                            : undefined
                        }
                      />

                      {/* Clinical Evidence & Guidelines Source Box */}
                      {activeScenario.sourceCitation && (
                        <div className="rounded-3xl border-2 border-emerald-600/25 bg-emerald-50/75 p-5 sm:p-6 text-xs font-sans text-emerald-950 space-y-3 shadow-2xs">
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                                <ShieldCheck className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="font-bold text-xs uppercase tracking-wider text-emerald-900 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-300/70 inline-block mb-1">
                                  Clinical Evidence & Guidelines
                                </span>
                                <span className="text-sm sm:text-base font-bold text-emerald-950 block font-serif">
                                  {activeScenario.sourceCitation.organization}
                                </span>
                              </div>
                            </div>
                            {activeScenario.sourceCitation.year && (
                              <span className="text-xs font-bold text-emerald-800 bg-white/80 px-3 py-1 rounded-full border border-emerald-200">
                                {activeScenario.sourceCitation.year}
                              </span>
                            )}
                          </div>

                          <div className="space-y-1">
                            <p className="font-bold text-emerald-950 text-sm sm:text-base leading-snug m-0">
                              {activeScenario.sourceCitation.guideline}
                            </p>
                            <p className="text-xs sm:text-sm text-emerald-800/90 font-medium m-0">
                              Clinical Reference & Patient Advocacy Framework: Established clinical guidelines support the patient&apos;s right to comprehensive evaluation and diagnostic workups.
                            </p>
                          </div>

                          {activeScenario.sourceCitation.url && (
                            <div className="pt-1 flex justify-start">
                              <a
                                href={activeScenario.sourceCitation.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-emerald-600/30 hover:border-emerald-600 hover:bg-emerald-100/60 text-emerald-900 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-2xs"
                              >
                                <span>View Official Clinical Guideline</span>
                                <ExternalLink className="w-4 h-4 text-emerald-700" />
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      {/* In-content Navigation Buttons */}
                      <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
                        {activeSimulationIdx < roleplayScenarios.length - 1 ? (
                          <Button
                            variant="outline"
                            onClick={() => setActiveSimulationIdx((i) => i + 1)}
                            className="border-raspberry/40 text-raspberry hover:bg-raspberry/10 text-xs sm:text-sm h-11 px-5 rounded-xl font-bold cursor-pointer gap-2"
                          >
                            <span>Next Simulation: Stage {activeSimulationIdx + 2}</span>
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        ) : (
                          <div />
                        )}

                        <Button
                          onClick={() => setCurrentLessonPage(6)}
                          className="bg-deep-teal text-white hover:bg-deep-teal/90 text-base sm:text-lg h-12 sm:h-14 px-7 rounded-2xl gap-2.5 font-bold shadow-sm cursor-pointer ml-auto"
                        >
                          <span>Continue to Doctor Script</span>
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 6: DOCTOR SCRIPT & POCKET ACTION BLUEPRINT */}
                  {currentLessonPage === 6 && (
                    <div className="space-y-6 animate-in fade-in duration-200 py-1">
                      <div>
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-raspberry font-sans block mb-1">
                          Slide 6 of {lessonPages.length} · Appointment Blueprint
                        </span>
                        <h4 className="text-3xl sm:text-4xl font-serif font-bold text-deep-teal leading-tight mb-2">
                          Word-for-Word Appointment Script
                        </h4>
                        <p className="text-charcoal/85 text-lg sm:text-xl font-sans leading-relaxed">
                          Exact phrases to speak at your appointment, the psychological reasons they work, and boundary protections if dismissed.
                        </p>
                      </div>

                      {/* The Blueprint Card */}
                      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FFE1DB]/70 via-soft-pink/40 to-light-teal/50 border-2 border-raspberry/30 shadow-md space-y-5">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-raspberry text-white shadow-2xs font-sans">
                            <Shield className="w-4 h-4" />
                            Self-Advocacy Action Blueprint
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-deep-teal bg-white/95 px-3.5 py-1 rounded-full border border-deep-teal/20 font-sans">
                            Real-Life Appointment Script
                          </span>
                        </div>

                        {/* Scenario */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-white/95 border border-coral/30 text-base sm:text-lg font-sans">
                          <strong className="text-coral font-bold block mb-1.5 uppercase tracking-wider text-xs sm:text-sm font-sans">
                            When this scenario happens:
                          </strong>
                          <p className="text-charcoal/90 italic m-0">
                            {advocacyData.situation}
                          </p>
                        </div>

                        {/* Doctor Script Speech Bubble */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-raspberry/40 shadow-sm space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-raspberry flex items-center gap-2 font-sans">
                              <Sparkles className="w-4 h-4 text-raspberry" />
                              Exactly what to say:
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(advocacyData.doctorScript);
                                setCopiedScript(true);
                                setTimeout(() => setCopiedScript(false), 2000);
                              }}
                              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-deep-teal hover:text-raspberry transition-colors bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 cursor-pointer shadow-2xs font-sans"
                            >
                              {copiedScript ? (
                                <>
                                  <Check className="w-4 h-4 text-emerald-600" />
                                  <span>Copied to Clipboard!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4 text-deep-teal" />
                                  <span>Copy Script</span>
                                </>
                              )}
                            </button>
                          </div>
                          <p className="text-xl sm:text-2xl md:text-[25px] font-serif text-deep-teal font-medium leading-relaxed m-0">
                            {advocacyData.doctorScript}
                          </p>
                        </div>

                        {/* Why It Works & What If Dismissed */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base font-sans">
                          <div className="p-5 rounded-2xl bg-light-teal/60 border border-deep-teal/20 space-y-2">
                            <strong className="text-deep-teal font-bold block flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider">
                              <Lightbulb className="w-4 h-4 text-deep-teal shrink-0" />
                              <span>Why this works:</span>
                            </strong>
                            <p className="text-charcoal/90 leading-relaxed m-0 text-base sm:text-[17px]">
                              {advocacyData.whyItWorks}
                            </p>
                          </div>

                          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                            <strong className="text-amber-950 font-bold block flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider">
                              <ShieldAlert className="w-4 h-4 text-amber-800 shrink-0" />
                              <span>If you are dismissed:</span>
                            </strong>
                            <p className="text-charcoal/90 leading-relaxed m-0 text-base sm:text-[17px]">
                              {advocacyData.whatIfDismissed}
                            </p>
                          </div>
                        </div>

                        {/* Research Context: Why Patient Advocacy is Crucial */}
                        <div className="p-5 rounded-2xl bg-white border border-deep-teal/20 shadow-xs space-y-3 font-sans">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-deep-teal">
                              <Scale className="w-4 h-4 text-coral shrink-0" />
                              <span>The Gender Research Gap: Why This Script Protects You</span>
                            </div>
                            <span className="text-[11px] text-charcoal/60 italic">
                              Clinical Evidence · Educational Reference
                            </span>
                          </div>
                          <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed m-0">
                            Until the 1993 NIH Revitalization Act, female biological models and women were largely excluded from clinical research trials. Today, conditions like endometriosis still carry a <strong>7–10 year diagnostic delay</strong>, and women wait an average of 16 minutes longer for pain medication in emergency settings (<a href="https://onlinelibrary.wiley.com/doi/10.1111/j.1553-2712.2008.00100.x" target="_blank" rel="noopener noreferrer" className="text-deep-teal underline hover:text-coral font-medium inline-flex items-center gap-0.5">Chen et al., 2008<ExternalLink className="w-3 h-3 inline" /></a>). Using objective cycle tracking and formal medical vocabulary counteracts subjective dismissal and prompts evidence-based diagnostic protocols.
                          </p>
                          <div className="pt-2 border-t border-deep-teal/10 flex items-center justify-between flex-wrap gap-2 text-xs text-charcoal/70">
                            <span className="flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-coral shrink-0" />
                              <span>Explore study:</span>
                              <a href="https://bsd.biomedcentral.com/articles/10.1186/s13293-020-00308-5" target="_blank" rel="noopener noreferrer" className="text-deep-teal underline hover:text-coral font-medium inline-flex items-center gap-0.5">
                                Nature / BMC Sex-Bias in Biomedical Research <ExternalLink className="w-3 h-3 inline" />
                              </a>
                            </span>
                            <span className="italic text-charcoal/60">
                              Educational reference · Not medical advice
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* In-content Continue Button */}
                      <div className="pt-2 flex justify-end">
                        <Button
                          onClick={() => setCurrentLessonPage(7)}
                          className="bg-deep-teal text-white hover:bg-deep-teal/90 text-base sm:text-lg h-12 sm:h-14 px-7 rounded-2xl gap-2.5 font-bold shadow-sm cursor-pointer"
                        >
                          <span>{hasSorter ? "Continue to Sorter Challenge" : "Continue to Practice & Complete"}</span>
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 7: DEDICATED CLINICAL SORTER ARCADE CHALLENGE (when topic has sorterGame) */}
                  {currentLessonPage === 7 && hasSorter && selectedTopic.sorterGame && (
                    <div className="space-y-6 animate-in fade-in duration-200 py-1">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-raspberry text-white shadow-2xs font-sans mb-2">
                          <Gamepad2 className="w-4 h-4" />
                          <span>Interactive Arcade Sorter Game</span>
                        </div>
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-raspberry font-sans block mb-1">
                          Slide 7 of {lessonPages.length} · Clinical Classification Challenge
                        </span>
                        <h4 className="text-3xl sm:text-4xl font-serif font-bold text-deep-teal leading-tight mb-2">
                          {selectedTopic.sorterGame.title}
                        </h4>
                        <p className="text-charcoal/85 text-lg sm:text-xl font-sans leading-relaxed">
                          {selectedTopic.sorterGame.instructions}
                        </p>
                      </div>

                      {/* Video (if present on this topic) */}
                      {selectedTopic.video && (
                        <div className="space-y-3.5">
                          <h5 className="font-bold text-deep-teal text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 font-sans">
                            <Video className="w-4 h-4 text-emerald-600" />
                            Clinical Video Explanation:
                          </h5>
                          <LessonVideoCard
                            video={selectedTopic.video}
                            themeColor={topicTheme.primaryHex}
                          />
                        </div>
                      )}

                      {/* Dedicated Sorter Game Component */}
                      <div className="space-y-3.5">
                        <LessonSorterGameComponent
                          game={selectedTopic.sorterGame}
                          themeColor={topicTheme.primaryHex}
                          onGameComplete={(bonus) => {
                            setXp((x) => x + bonus);
                          }}
                        />
                      </div>

                      {/* In-content Continue to Quiz Button */}
                      <div className="pt-4 flex justify-end">
                        <Button
                          onClick={() => setCurrentLessonPage(8)}
                          className="bg-deep-teal text-white hover:bg-deep-teal/90 text-base sm:text-lg h-12 sm:h-14 px-7 rounded-2xl gap-2.5 font-bold shadow-sm cursor-pointer"
                        >
                          <span>{isQuizActive ? "Continue to Knowledge Mini-Quiz" : "Continue to Complete & Claim XP"}</span>
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* DEDICATED KNOWLEDGE CHECK SLIDE: Slide 8 (if hasSorter) or Slide 7 (if !hasSorter) */}
                  {currentLessonPage === (hasSorter ? 8 : 7) && (
                    <div className="space-y-6 animate-in fade-in duration-200 py-1">
                      <div>
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-deep-teal/70 font-sans block mb-1">
                          Slide {hasSorter ? 8 : 7} of {lessonPages.length} · Knowledge Check & Completion
                        </span>
                        <h4 className="text-3xl sm:text-4xl font-serif font-bold text-deep-teal leading-tight mb-2">
                          Validate Knowledge & Claim XP
                        </h4>
                        <p className="text-charcoal/85 text-lg sm:text-xl font-sans leading-relaxed">
                          Confirm your mastery against clinical standards and lock in your +{selectedTopic.xp} XP!
                        </p>
                      </div>

                      {/* VIDEO CONTENT (if topic has video and does not have sorter) */}
                      {selectedTopic.video && !hasSorter && (
                        <div className="space-y-3.5">
                          <h5 className="font-bold text-deep-teal text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 font-sans">
                            <Video className="w-4 h-4 text-emerald-600" />
                            Clinical Explanation Video:
                          </h5>
                          <LessonVideoCard
                            video={selectedTopic.video}
                            themeColor={topicTheme.primaryHex}
                          />
                        </div>
                      )}

                      {/* MINI-QUIZ (if topic has quiz) */}
                      {isQuizActive && (
                        <InteractiveQuizGame
                          questions={quizList}
                          topicName={selectedTopic.name}
                          topicXp={selectedTopic.xp}
                          onComplete={() => handleCompleteTopic(selectedTopic)}
                        />
                      )}

                      {/* Fallback completion card if topic does not have a quiz */}
                      {!isQuizActive && (
                        <div className="p-7 sm:p-9 rounded-3xl bg-white border-2 border-deep-teal/20 text-center space-y-4 shadow-sm">
                          <div className="w-16 h-16 rounded-full bg-light-teal text-deep-teal flex items-center justify-center mx-auto shadow-sm">
                            <Sparkles className="w-9 h-9 text-coral" />
                          </div>
                          <div>
                            <h5 className="text-2xl sm:text-3xl font-bold font-serif text-deep-teal">
                              Lesson Complete!
                            </h5>
                            <p className="text-lg text-charcoal/85 mt-2 font-sans max-w-lg mx-auto leading-relaxed">
                              You have mastered the biological concept, explored evidence-based clinical guidelines, checked off clinical signals, practiced the multi-stage roleplay scenario game, and learned the appointment script for <strong>{selectedTopic.name}</strong>.
                            </p>
                          </div>
                          <div className="pt-3">
                            <Button
                              onClick={() => handleCompleteTopic(selectedTopic)}
                              className="bg-deep-teal text-white hover:bg-deep-teal/90 text-base sm:text-lg h-12 sm:h-14 px-8 rounded-2xl font-bold cursor-pointer shadow-sm"
                            >
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Complete & Claim +{selectedTopic.xp} XP
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Educational References Section */}
                      <div className="pt-2">
                        <EducationalReferences
                          categoryId={activeCategoryId}
                          compact={true}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Sticky Bottom Navigation Bar (Fixed with Big Arrow Buttons) */}
                <div className="mt-3 pt-3.5 pb-1 border-t-2 border-deep-teal/15 flex items-center justify-between gap-3 flex-wrap shrink-0 bg-white/95">
                  {/* Previous Button */}
                  <Button
                    variant="outline"
                    disabled={currentLessonPage === 1}
                    onClick={() => setCurrentLessonPage((p) => Math.max(1, p - 1))}
                    className="text-xs sm:text-sm md:text-base font-bold h-11 sm:h-12 px-4 sm:px-5 rounded-xl border-deep-teal/25 text-deep-teal hover:bg-light-teal/30 disabled:opacity-40 cursor-pointer shadow-2xs"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    <span>Previous Slide</span>
                  </Button>

                  {/* Slide Indicator with Interactive Dots */}
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs sm:text-sm md:text-base font-bold text-deep-teal font-sans hidden sm:inline">
                      Slide {currentLessonPage} of {lessonPages.length}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {lessonPages.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setCurrentLessonPage(p.id)}
                          title={`Go to ${p.title}`}
                          className={`h-2.5 rounded-full transition-all cursor-pointer ${
                            currentLessonPage === p.id
                              ? "bg-deep-teal w-7"
                              : currentLessonPage > p.id
                              ? "bg-emerald-600 w-2.5"
                              : "bg-slate-300 hover:bg-slate-400 w-2.5"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Next Slide / Complete Button */}
                  {currentLessonPage < lessonPages.length ? (
                    <Button
                      onClick={() => setCurrentLessonPage((p) => Math.min(lessonPages.length, p + 1))}
                      className={`text-xs sm:text-sm md:text-base font-bold h-11 sm:h-12 px-5 sm:px-6 rounded-xl gap-2 cursor-pointer shadow-xs ${topicTheme.buttonClass}`}
                    >
                      <span>Next Slide</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleCompleteTopic(selectedTopic)}
                      className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs sm:text-sm md:text-base font-bold h-11 sm:h-12 px-5 sm:px-6 rounded-xl gap-2 cursor-pointer shadow-xs"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>
                        {completedTopics.has(selectedTopic.id)
                          ? "Completed (Review Done)"
                          : `Complete & Claim +${selectedTopic.xp} XP`}
                      </span>
                    </Button>
                  )}
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

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
