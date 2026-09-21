"use client";

import React, { useState } from "react";
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
  Clock,
  Sparkles,
  ChevronRight,
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
} from "lucide-react";
import { HUB_CATEGORIES, HubCategory, HubTopic } from "@/data/hubData";
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
import { LittleHealthDictionary } from "@/components/shared/LittleHealthDictionary";
import { updateUserProgress } from "@/lib/api";

interface HubViewProps {
  initialCategory?: string | null;
}

export function HubView({ initialCategory }: HubViewProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(initialCategory || null);
  const [openPanelId, setOpenPanelId] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<HubTopic | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<{ name: string; desc: string; category: string } | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set(["body-0", "cycle-0"]));
  const [xp, setXp] = useState<number>(320);
  const [streak, setStreak] = useState<number>(4);
  const [earnedBadges, setEarnedBadges] = useState<string[]>(["Body Basics Champion", "Cycle Sense Pro"]);

  // Interactive Lesson Experience State
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
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

  const activeCategory: HubCategory | undefined = activeCategoryId
    ? HUB_CATEGORIES[activeCategoryId]
    : undefined;

  const handleCompleteTopic = async (topic: HubTopic) => {
    if (!completedTopics.has(topic.id)) {
      const nextSet = new Set(completedTopics);
      nextSet.add(topic.id);
      setCompletedTopics(nextSet);
      const newXp = xp + topic.xp;
      setXp(newXp);
      await updateUserProgress({
        topic_id: topic.id,
        xp_gained: topic.xp,
        category_id: activeCategoryId || "general",
      });
    }
    closeTopic();
  };

  const openTopic = (topic: HubTopic) => {
    setSelectedTopic(topic);
    setOpenPanelId(null);
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
      name: "Teal Modules",
      badgeClass: "bg-light-teal border-deep-teal/30 text-deep-teal",
      dotClass: "bg-deep-teal",
      ids: ["play", "mind", "factors"],
    },
    {
      name: "Pink Modules",
      badgeClass: "bg-soft-pink border-raspberry/30 text-raspberry",
      dotClass: "bg-raspberry",
      ids: ["pcos", "cycle", "realtalk"],
    },
    {
      name: "Coral Modules",
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
              <p className="text-charcoal/80 text-[17px] md:text-[18px] mb-6 leading-relaxed font-sans">
                Every category below is judgment-free and written in plain language. Tap any card to explore interactive lessons, games, and quizzes.
              </p>

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
            </div>

            {/* Category Cards Grouped by Color: 3 Teal, 3 Pink, 3 Coral */}
            <div className="space-y-12">
              {CATEGORY_GROUPS.map((group) => (
                <div key={group.name} className="space-y-5">
                  {/* Color Group Header Badge & Divider */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-sans tracking-wider uppercase border shadow-2xs ${group.badgeClass}`}
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
                            <div
                              className="w-12 h-12 rounded-2xl mb-4 shadow-sm flex items-center justify-center font-bold text-xs"
                              style={{ backgroundColor: theme.primaryHex }}
                            >
                              {getCategoryIcon(cat.id)}
                            </div>
                            <h3 className="text-2xl md:text-[28px] font-normal font-serif text-deep-teal mb-2 group-hover:text-raspberry transition-colors leading-snug">
                              {cat.title}
                            </h3>
                            <p className="text-[15.5px] md:text-[16.5px] text-charcoal/85 leading-relaxed mb-4 font-sans">
                              {cat.description}
                            </p>
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

            {/* Serpentine Track */}
            <div className="relative py-8">
              <div className="absolute left-1/2 top-12 bottom-12 w-0.5 -translate-x-1/2 border-l-2 border-dashed border-deep-teal/20 z-0" />

              <div className="flex flex-col gap-6 relative z-10">
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
                              ✦ ADVOCATE CAPSTONE
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
                              {topic.isAdvocateCapstone ? "Advocacy Capstone" : `${topic.type} • ${topic.xp} XP`}
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
                              <span>Learn · Recognize · Advocate Capstone</span>
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
            isFullScreen
              ? "w-[98vw] sm:max-w-[98vw] max-w-[98vw] h-[95vh] max-h-[95vh] p-4 sm:p-6 md:p-8 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 border-2"
              : "max-w-3xl max-h-[90vh] p-4 sm:p-6 flex flex-col overflow-hidden"
          }
        >
          {selectedTopic && (() => {
            const topicTheme = getCategoryTheme(activeCategoryId || "play");
            const quizList = selectedTopic.quiz || [];
            const isQuizActive = quizList.length > 0;
            const currentQ = quizList[quizStep];
            const isQuizFinished = isQuizActive && quizStep >= quizList.length;

            return (
              <div className="flex flex-col h-full overflow-hidden">
                {/* Top Control Bar */}
                <div className="flex items-center justify-between gap-3 border-b border-deep-teal/10 pb-3 mb-3 pr-7 shrink-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${topicTheme.pillClass}`}>
                      {selectedTopic.type}
                    </span>
                    {selectedTopic.readTime && (
                      <span className="text-xs text-charcoal/70 inline-flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-deep-teal" /> {selectedTopic.readTime}
                      </span>
                    )}
                    <span className="text-xs font-bold text-deep-teal">
                      +{selectedTopic.xp} XP
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsFullScreen(!isFullScreen)}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white text-charcoal/70 hover:text-deep-teal hover:border-deep-teal/40 transition-all shadow-sm flex items-center gap-1.5 text-xs font-semibold"
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

                {/* Dialog Header */}
                <DialogHeader className="mb-3 text-left shrink-0">
                  <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-deep-teal leading-tight">
                    {selectedTopic.name}
                  </DialogTitle>
                  <DialogDescription className="text-charcoal/80 font-sans text-xs sm:text-sm mt-1 leading-relaxed">
                    {selectedTopic.desc}
                  </DialogDescription>
                </DialogHeader>

                {/* 4-Tab Navigation Strip */}
                <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl mb-4 overflow-x-auto border border-slate-200/80 shrink-0">
                  <button
                    onClick={() => setActiveLessonTab("lesson")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                      activeLessonTab === "lesson"
                        ? "bg-white text-deep-teal shadow-sm ring-1 ring-black/5"
                        : "text-charcoal/70 hover:text-deep-teal hover:bg-white/60"
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Visual Lesson</span>
                  </button>

                  {selectedTopic.video && (
                    <button
                      onClick={() => setActiveLessonTab("video")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                        activeLessonTab === "video"
                          ? "bg-white text-deep-teal shadow-sm ring-1 ring-black/5"
                          : "text-charcoal/70 hover:text-deep-teal hover:bg-white/60"
                      }`}
                    >
                      <Video className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Clinical Video</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                    </button>
                  )}

                  {(selectedTopic.sorterGame || selectedTopic.type === "game") && (
                    <button
                      onClick={() => setActiveLessonTab("challenge")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                        activeLessonTab === "challenge"
                          ? "bg-white text-deep-teal shadow-sm ring-1 ring-black/5"
                          : "text-charcoal/70 hover:text-deep-teal hover:bg-white/60"
                      }`}
                    >
                      <Gamepad2 className="w-3.5 h-3.5 text-raspberry" />
                      <span>Interactive Challenge</span>
                      <span className="text-[10px] font-bold text-raspberry bg-soft-pink px-1.5 py-0.2 rounded-full">+25 XP</span>
                    </button>
                  )}

                  {isQuizActive && (
                    <button
                      onClick={() => setActiveLessonTab("quiz")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                        activeLessonTab === "quiz"
                          ? "bg-white text-deep-teal shadow-sm ring-1 ring-black/5"
                          : "text-charcoal/70 hover:text-deep-teal hover:bg-white/60"
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-deep-teal" />
                      <span>Mini-Quiz</span>
                      <span className="text-[10px] font-bold bg-slate-200 text-charcoal/80 px-1.5 py-0.2 rounded-full">
                        {quizList.length}Q
                      </span>
                    </button>
                  )}
                </div>

                {/* Scrollable Main Content Canvas */}
                <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-4">
                  {/* TAB 1: VISUAL LESSON & DIAGRAM */}
                  {activeLessonTab === "lesson" && (
                    <div className="space-y-4">
                      {/* Hero Core Principle */}
                      <div className={`p-4 md:p-5 rounded-2xl border-2 leading-relaxed ${topicTheme.bgLight} ${topicTheme.borderPrimary} shadow-sm`}>
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deep-teal mb-1.5">
                          <Lightbulb className="w-4 h-4 text-raspberry" />
                          <span>Core Principle</span>
                        </div>
                        <p className="text-sm md:text-base text-charcoal/90 font-medium leading-relaxed">
                          {selectedTopic.summary}
                        </p>
                      </div>

                      {/* Bite-Sized Visual Cards */}
                      {selectedTopic.visualCards && selectedTopic.visualCards.length > 0 ? (
                        <div>
                          <h5 className="font-bold text-deep-teal text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-deep-teal" />
                            Essential Breakdown:
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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
                                  className={`p-4 rounded-xl ${palette.bg} border-2 ${palette.border} shadow-2xs flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all`}
                                >
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <span className={`p-2 rounded-lg ${palette.iconBg} shadow-2xs`}>
                                        {getVisualCardIcon(card.iconName)}
                                      </span>
                                      {card.highlight && (
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${palette.badgeBg}`}>
                                          {card.highlight}
                                        </span>
                                      )}
                                    </div>
                                    <h6 className="font-bold text-sm text-deep-teal mb-1">{card.title}</h6>
                                    <p className="text-xs text-charcoal/85 leading-relaxed">{card.text}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        /* Fallback spaced visual cards generated from key takeaways */
                        <div>
                          <h5 className="font-bold text-deep-teal text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-deep-teal" />
                            Essential Concepts:
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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
                                  className={`p-4 rounded-xl ${palette.bg} border-2 ${palette.border} shadow-2xs flex flex-col justify-between`}
                                >
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <span className={`p-2 rounded-lg ${palette.iconBg} shadow-2xs`}>
                                        {i === 0 ? <Sparkles className="w-4 h-4" /> : i === 1 ? <Heart className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                                      </span>
                                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${palette.badgeBg}`}>
                                        Insight #{i + 1}
                                      </span>
                                    </div>
                                    <p className="text-xs text-charcoal/85 leading-relaxed">{takeaway}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Interactive Diagram (if available for topic) */}
                      {selectedTopic.diagram && (
                        <InteractiveLessonDiagram
                          diagram={selectedTopic.diagram}
                          themeColor={topicTheme.primaryHex}
                        />
                      )}

                      {/* Key Clinical Takeaways List */}
                      <div>
                        <h5 className="font-bold text-deep-teal text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Key Clinical Takeaways:
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {selectedTopic.keyTakeaways.map((item, i) => {
                            const badgeThemes = [
                              { bg: "bg-light-teal/35", border: "border-deep-teal/25", numBg: "bg-deep-teal text-white" },
                              { bg: "bg-[#FFE1DB]/50", border: "border-coral/35", numBg: "bg-coral text-white" },
                              { bg: "bg-soft-pink/50", border: "border-raspberry/30", numBg: "bg-raspberry text-white" },
                              { bg: "bg-amber-50/70", border: "border-amber-200/80", numBg: "bg-amber-600 text-white" },
                            ];
                            const t = badgeThemes[i % badgeThemes.length];

                            return (
                              <div
                                key={i}
                                className={`p-3.5 rounded-xl ${t.bg} border-2 ${t.border} text-xs md:text-sm text-charcoal/90 flex items-start gap-2.5 shadow-2xs`}
                              >
                                <span className={`w-5 h-5 rounded-full ${t.numBg} font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs`}>
                                  {i + 1}
                                </span>
                                <span className="leading-relaxed font-medium">{item}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Self-Advocacy Action Blueprint (Learn · Recognize · Advocate Capstone) */}
                      {selectedTopic.advocacyScript && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FFE1DB]/70 via-soft-pink/40 to-light-teal/50 border-2 border-raspberry/30 shadow-xs space-y-3.5">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-raspberry text-white shadow-2xs">
                              <Shield className="w-3.5 h-3.5" />
                              Self-Advocacy Action Blueprint · How to Speak Up
                            </span>
                            <span className="text-[11px] font-bold text-deep-teal bg-white/90 px-2.5 py-0.5 rounded-full border border-deep-teal/20">
                              Real-Life Appointment Script
                            </span>
                          </div>

                          {/* The Real-World Scenario */}
                          <div className="p-3 rounded-xl bg-white/90 border border-coral/30 text-xs sm:text-sm">
                            <strong className="text-coral font-bold block mb-1 uppercase tracking-wider text-[10.5px]">
                              When this happens:
                            </strong>
                            <p className="text-charcoal/90 italic m-0 font-sans">
                              {selectedTopic.advocacyScript.situation}
                            </p>
                          </div>

                          {/* The Script Speech Bubble */}
                          <div className="p-4 rounded-xl bg-white border-2 border-raspberry/40 shadow-xs relative">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-raspberry flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-raspberry" />
                                Exactly what to say:
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  if (selectedTopic?.advocacyScript?.doctorScript) {
                                    navigator.clipboard.writeText(selectedTopic.advocacyScript.doctorScript);
                                    setCopiedScript(true);
                                    setTimeout(() => setCopiedScript(false), 2000);
                                  }
                                }}
                                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-deep-teal hover:text-raspberry transition-colors bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 cursor-pointer shadow-2xs"
                              >
                                {copiedScript ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    <span>Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 text-deep-teal" />
                                    <span>Copy Script</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <p className="text-sm sm:text-[15px] font-medium text-deep-teal leading-relaxed m-0 font-serif">
                              {selectedTopic.advocacyScript.doctorScript}
                            </p>
                          </div>

                          {/* Why It Works & What If Dismissed */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="p-3.5 rounded-xl bg-light-teal/60 border border-deep-teal/20">
                              <strong className="text-deep-teal font-bold block mb-1.5 flex items-center gap-1.5">
                                <Lightbulb className="w-3.5 h-3.5 text-deep-teal shrink-0" />
                                <span>Why this works:</span>
                              </strong>
                              <p className="text-charcoal/85 leading-relaxed m-0">
                                {selectedTopic.advocacyScript.whyItWorks}
                              </p>
                            </div>

                            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200">
                              <strong className="text-amber-950 font-bold block mb-1.5 flex items-center gap-1.5">
                                <ShieldAlert className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                                <span>If you are dismissed:</span>
                              </strong>
                              <p className="text-charcoal/85 leading-relaxed m-0">
                                {selectedTopic.advocacyScript.whatIfDismissed}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Little Health Dictionary for quick lookups */}
                      <div className="pt-2">
                        <LittleHealthDictionary compact={true} initialModuleId={activeCategoryId || undefined} />
                      </div>

                      {/* Educational References Section */}
                      <EducationalReferences
                        categoryId={activeCategoryId}
                        compact={true}
                      />
                    </div>
                  )}

                  {/* TAB 2: CLINICAL VIDEO */}
                  {activeLessonTab === "video" && selectedTopic.video && (
                    <LessonVideoCard
                      video={selectedTopic.video}
                      themeColor={topicTheme.primaryHex}
                    />
                  )}

                  {/* TAB 3: INTERACTIVE CHALLENGE */}
                  {activeLessonTab === "challenge" && (
                    <div>
                      {selectedTopic.sorterGame ? (
                        <LessonSorterGameComponent
                          game={selectedTopic.sorterGame}
                          themeColor={topicTheme.primaryHex}
                          onGameComplete={(bonus) => {
                            setXp((x) => x + bonus);
                          }}
                        />
                      ) : (
                        <div className="p-6 rounded-2xl bg-white border border-deep-teal/20 text-center space-y-3">
                          <Gamepad2 className="w-10 h-10 text-deep-teal mx-auto" />
                          <h5 className="text-lg font-bold text-deep-teal">Interactive Review Challenge</h5>
                          <p className="text-sm text-charcoal/80 max-w-md mx-auto">
                            Test your knowledge with our quick interactive check in the Mini-Quiz tab, or explore the Visual Lesson diagram!
                          </p>
                          <Button
                            onClick={() => setActiveLessonTab("quiz")}
                            className="bg-deep-teal text-white hover:bg-deep-teal/90 text-xs mt-2"
                          >
                            Go to Mini-Quiz
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 4: MINI-QUIZ (Multi-Question Interactive) */}
                  {activeLessonTab === "quiz" && isQuizActive && (
                    <div className="p-4 md:p-6 rounded-2xl bg-white border border-deep-teal/20 shadow-sm space-y-4">
                      {!isQuizFinished ? (
                        <div className="space-y-4">
                          {/* Quiz Progress Header */}
                          <div className="flex items-center justify-between border-b border-deep-teal/10 pb-3">
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-deep-teal">
                                Question {quizStep + 1} of {quizList.length}
                              </span>
                              <div className="w-36 h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                                <div
                                  className="bg-deep-teal h-full transition-all duration-300"
                                  style={{ width: `${((quizStep + 1) / quizList.length) * 100}%` }}
                                />
                              </div>
                            </div>
                            <div className="text-right text-xs font-semibold text-charcoal/70">
                              Score: <strong className="text-emerald-700">{quizScore}</strong> / {quizList.length}
                            </div>
                          </div>

                          {/* Question Prompt */}
                          <h5 className="text-base md:text-lg font-bold text-deep-teal">
                            {currentQ.question}
                          </h5>

                          {/* Options */}
                          <div className="flex flex-col gap-2.5">
                            {currentQ.options.map((opt, optIdx) => {
                              const chosen = quizAnswers[quizStep];
                              const isAnswered = chosen !== undefined;
                              const isCorrectOpt = optIdx === currentQ.correctIndex;
                              const isSelectedOpt = chosen === optIdx;

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => {
                                    if (isAnswered) return;
                                    setQuizAnswers((prev) => ({ ...prev, [quizStep]: optIdx }));
                                    setQuizSubmitted(true);
                                    if (optIdx === currentQ.correctIndex) {
                                      setQuizScore((s) => s + 1);
                                    }
                                  }}
                                  className={`p-3.5 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all border ${
                                    isAnswered
                                      ? isCorrectOpt
                                        ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20"
                                        : isSelectedOpt
                                        ? "bg-red-50 border-red-400 text-red-950"
                                        : "bg-white border-gray-200 opacity-50"
                                      : "bg-white border-deep-teal/20 hover:border-deep-teal hover:bg-light-teal/30 text-charcoal"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span>{opt}</span>
                                    {isAnswered && isCorrectOpt && (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {/* Feedback Explanation */}
                          {quizAnswers[quizStep] !== undefined && (
                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs md:text-sm text-charcoal/90 leading-relaxed animate-in fade-in">
                              <strong className="text-deep-teal inline-flex items-center gap-1.5 mr-1 font-bold">
                                <Lightbulb className="w-3.5 h-3.5 text-deep-teal shrink-0 inline" />
                                <span>Clinical Insight:</span>
                              </strong>
                              {currentQ.explanation}
                            </div>
                          )}

                          {/* Next / Finish Question Button */}
                          {quizAnswers[quizStep] !== undefined && (
                            <div className="pt-2 flex justify-end">
                              {quizStep < quizList.length - 1 ? (
                                <Button
                                  onClick={() => {
                                    setQuizStep((s) => s + 1);
                                    setQuizSubmitted(false);
                                  }}
                                  className="bg-deep-teal text-white hover:bg-deep-teal/90 text-xs"
                                >
                                  Next Question →
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => {
                                    setQuizStep((s) => s + 1);
                                  }}
                                  className="bg-emerald-600 text-white hover:bg-emerald-700 text-xs inline-flex items-center gap-1.5"
                                >
                                  <span>View Quiz Results</span>
                                  <Check className="w-3.5 h-3.5" />
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Quiz Finished Summary */
                        <div className="text-center py-6 space-y-4">
                          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                            <Trophy className="w-8 h-8" />
                          </div>
                          <div>
                            <h5 className="text-xl font-bold font-serif text-deep-teal">
                              Mini-Quiz Completed!
                            </h5>
                            <p className="text-sm text-charcoal/80 mt-1">
                              You scored <strong>{quizScore}</strong> out of <strong>{quizList.length}</strong>!
                            </p>
                          </div>
                          <p className="text-xs text-charcoal/70 max-w-sm mx-auto">
                            Great work validating your knowledge against clinical standards. You are ready to complete this module.
                          </p>
                          <div className="flex justify-center gap-2 pt-2">
                            <Button
                              onClick={() => {
                                setQuizStep(0);
                                setQuizAnswers({});
                                setQuizSubmitted(false);
                                setQuizScore(0);
                              }}
                              variant="outline"
                              className="text-xs border-deep-teal/30 text-deep-teal"
                            >
                              <RotateCcw className="w-3.5 h-3.5 mr-1" />
                              Retake Quiz
                            </Button>
                            <Button
                              onClick={() => handleCompleteTopic(selectedTopic)}
                              className="bg-deep-teal text-white hover:bg-deep-teal/90 text-xs"
                            >
                              <CheckCircle className="w-3.5 h-3.5 mr-1" />
                              Complete & Claim XP
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Fixed Modal Footer */}
                <div className="mt-3 pt-3 border-t border-deep-teal/10 flex items-center justify-between gap-3 flex-wrap shrink-0">
                  <div className="text-xs text-charcoal/60">
                    {completedTopics.has(selectedTopic.id) ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed module</span>
                      </span>
                    ) : (
                      `Completing module awards +${selectedTopic.xp} XP`
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleCompleteTopic(selectedTopic)}
                      className={`gap-2 text-xs h-9 ${topicTheme.buttonClass}`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      {completedTopics.has(selectedTopic.id)
                        ? "Completed (Review Done)"
                        : `Complete & Claim +${selectedTopic.xp} XP`}
                    </Button>
                  </div>
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
      </div>
    </div>
  );
}
