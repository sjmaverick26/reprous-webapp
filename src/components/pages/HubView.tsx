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
  Clock,
  Sparkles,
  ChevronRight,
  Activity,
  Heart,
  Shield,
  Calendar,
  Users,
  Globe,
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
  const [activeQuizAnswer, setActiveQuizAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);

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
    setSelectedTopic(null);
    setIsQuizSubmitted(false);
    setActiveQuizAnswer(null);
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

              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-deep-teal shadow-sm border border-deep-teal/15">
                <Sparkles className="w-3.5 h-3.5 text-coral" />
                {xp} XP
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
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-node group-hover:scale-105 ${
                              isDone
                                ? "text-white shadow-node ring-2 ring-white"
                                : `text-white ring-4 ${currentTheme.nodeRing}`
                            }`}
                            style={{
                              backgroundColor: currentTheme.primaryHex,
                            }}
                          >
                            {isDone ? (
                              <CheckCircle className="w-7 h-7 text-white" />
                            ) : (
                              getTopicIcon(topic.type)
                            )}
                          </div>
                          <div className="text-center max-w-[140px]">
                            <div className="text-xs font-bold text-deep-teal group-hover:text-raspberry leading-snug">
                              {topic.name}
                            </div>
                            <div className="text-[10.5px] font-bold uppercase tracking-wider text-charcoal/60 mt-0.5">
                              {topic.type} • {topic.xp} XP
                            </div>
                          </div>
                        </button>
                      </div>

                      {/* Popover Panel */}
                      {isOpen && (
                        <div className={`w-full max-w-sm my-3 rounded-2xl bg-white p-5 shadow-xl border ${currentTheme.popoverBorder} animate-in fade-in zoom-in-95 duration-150`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[11px] font-bold uppercase tracking-wider ${currentTheme.textPrimary}`}>
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
                              onClick={() => {
                                setSelectedTopic(topic);
                                setOpenPanelId(null);
                              }}
                              className={`w-full text-xs h-10 ${currentTheme.buttonClass}`}
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
            setSelectedTopic(null);
            setIsQuizSubmitted(false);
            setActiveQuizAnswer(null);
          }
        }}
      >
        <DialogContent className="max-w-xl">
          {selectedTopic && (() => {
            const topicTheme = getCategoryTheme(activeCategoryId || "play");

            return (
              <div>
                <DialogHeader className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${topicTheme.pillClass}`}>
                      {selectedTopic.type}
                    </span>
                    {selectedTopic.readTime && (
                      <span className="text-xs text-charcoal/70 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {selectedTopic.readTime}
                      </span>
                    )}
                    <span className="text-xs font-bold text-deep-teal ml-auto">
                      +{selectedTopic.xp} XP
                    </span>
                  </div>
                  <DialogTitle className="text-2xl font-normal font-serif text-deep-teal">{selectedTopic.name}</DialogTitle>
                  <DialogDescription className="text-charcoal/80 font-sans text-sm">{selectedTopic.desc}</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 text-sm text-charcoal">
                  <div className={`p-4 rounded-xl border leading-relaxed ${topicTheme.bgLight} ${topicTheme.borderPrimary}`}>
                    {selectedTopic.summary}
                  </div>

                  <div>
                    <h5 className="font-bold text-deep-teal mb-2 text-sm uppercase tracking-wide">
                      Key Facts:
                    </h5>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-charcoal/85">
                      {selectedTopic.keyTakeaways.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Optional Quiz Interaction */}
                  {selectedTopic.quiz && selectedTopic.quiz.length > 0 && (
                    <div className="mt-3 p-4 rounded-xl bg-white border border-deep-teal/20 shadow-sm">
                      <h5 className="font-bold text-deep-teal mb-2 text-xs uppercase tracking-wide">
                        Quick Check:
                      </h5>
                      <p className="font-bold text-sm mb-3">
                        {selectedTopic.quiz[0].question}
                      </p>
                      <div className="flex flex-col gap-2">
                        {selectedTopic.quiz[0].options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => {
                              setActiveQuizAnswer(optIdx);
                              setIsQuizSubmitted(true);
                            }}
                            className={`p-3 rounded-lg text-left text-xs font-bold transition-all border ${
                              isQuizSubmitted
                                ? optIdx === selectedTopic.quiz![0].correctIndex
                                  ? "bg-green-100 border-green-500 text-green-900"
                                  : activeQuizAnswer === optIdx
                                  ? "bg-red-100 border-red-500 text-red-900"
                                  : "bg-white border-gray-200 opacity-60"
                                : "bg-white border-deep-teal/20 hover:border-deep-teal text-charcoal"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {isQuizSubmitted && (
                        <p className="text-xs text-charcoal/80 mt-3 font-semibold">
                          💡 {selectedTopic.quiz[0].explanation}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Educational References Section inside topic dialog */}
                  <EducationalReferences
                    categoryId={activeCategoryId}
                    compact={true}
                  />

                  <div className="mt-4 pt-4 border-t border-deep-teal/10 flex items-center justify-end gap-3">
                    <Button
                      onClick={() => handleCompleteTopic(selectedTopic)}
                      className={`gap-2 ${topicTheme.buttonClass}`}
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
