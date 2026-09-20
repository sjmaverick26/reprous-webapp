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
  ChevronRight
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
        return <BookOpen className="w-5 h-5 text-cream-card" />;
      case "article":
        return <FileText className="w-5 h-5 text-cream-card" />;
      case "game":
        return <Gamepad2 className="w-5 h-5 text-cream-card" />;
      case "badge":
        return <Trophy className="w-6 h-6 text-ink" />;
    }
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
                text="Every guide below is available in 5 languages and downloadable for offline reading."
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

            {/* Category Cards Grid with dedicated palette colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(HUB_CATEGORIES).map((cat) => {
                const getCardStyle = (id: string) => {
                  switch (id) {
                    case "play": // Athlete
                      return "bg-light-teal border-deep-teal/20 hover:border-deep-teal/40";
                    case "pcos": // Hormonal
                      return "bg-soft-pink border-raspberry/20 hover:border-raspberry/40";
                    case "endo": // Reproductive
                      return "bg-[#FFE1DB] border-coral/30 hover:border-coral/50";
                    case "cycle": // Periods
                      return "bg-[#BFE3E0] border-deep-teal/20 hover:border-deep-teal/40";
                    case "body":
                      return "bg-white border-deep-teal/15 hover:border-coral";
                    case "conditions":
                      return "bg-white border-deep-teal/15 hover:border-coral";
                    case "realtalk":
                      return "bg-[#F0E6EF] border-raspberry/20 hover:border-raspberry/40";
                    case "mind":
                      return "bg-[#E8F3EE] border-deep-teal/20 hover:border-deep-teal/40";
                    default:
                      return "bg-white border-deep-teal/15 hover:border-deep-teal/30";
                  }
                };

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategoryId(cat.id);
                      setOpenPanelId(null);
                    }}
                    className={`group rounded-3xl p-7 text-left border-2 shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry flex flex-col justify-between ${getCardStyle(
                      cat.id
                    )}`}
                  >
                    <div>
                      <div
                        className="w-12 h-12 rounded-2xl mb-4 shadow-sm flex items-center justify-center font-bold text-xs"
                        style={{ backgroundColor: cat.colorSwatch }}
                      />
                      <h3 className="text-2xl md:text-[30px] font-normal font-serif text-deep-teal mb-2 group-hover:text-raspberry transition-colors leading-snug">
                        {cat.title}
                      </h3>
                      <p className="text-[16px] md:text-[17px] text-charcoal/85 leading-relaxed mb-4 font-sans">
                        {cat.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 text-[13.5px] font-semibold font-sans text-raspberry border-t border-deep-teal/10">
                      <span>{cat.topics.length} interactive topics</span>
                      <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                        See topics <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Clinical & Educational References */}
            <EducationalReferences categoryId="default" />
          </div>
        )}

      {/* Category Detail View with Duolingo-style Serpentine Learning Path */}
      {activeCategory && (
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setActiveCategoryId(null);
                setOpenPanelId(null);
              }}
              className="inline-flex items-center gap-2 text-sm font-extrabold text-berry hover:text-berry-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry rounded-md px-2 py-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Learn
            </button>

            <div className="inline-flex items-center gap-2 rounded-full bg-cream-card px-3.5 py-1.5 text-xs font-bold text-berry shadow-sm border border-berry/10">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              {xp} XP
            </div>
          </div>

          <div className="text-center">
            <div
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[13px] font-bold font-sans uppercase tracking-wider mb-2.5 text-plum border shadow-sm"
              style={{ backgroundColor: activeCategory.colorSwatch, borderColor: activeCategory.colorSwatch }}
            >
              <span className="w-2 h-2 rounded-full bg-plum/60 inline-block" />
              {activeCategory.badge}
            </div>
            <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-normal font-serif text-plum mb-2 leading-[1.15]">
              {activeCategory.title}
            </h2>
            <p className="text-[17px] md:text-[18px] text-ink/80 max-w-lg mx-auto font-sans">
              {activeCategory.description}
            </p>
          </div>

          {/* Serpentine Track */}
          <div className="relative py-8">
            <div className="path-track-line" />

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
                        className="flex flex-col items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry rounded-full p-2"
                      >
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-node group-hover:scale-105 ${
                            isDone
                              ? "bg-berry text-white shadow-node"
                              : "text-plum ring-4 ring-berry/20"
                          }`}
                          style={{
                            backgroundColor: isDone ? "var(--berry)" : activeCategory.colorSwatch,
                          }}
                        >
                          {isDone ? (
                            <CheckCircle className="w-6 h-6 text-cream-card" />
                          ) : (
                            getTopicIcon(topic.type)
                          )}
                        </div>
                        <div className="text-center max-w-[130px]">
                          <div className="text-xs font-extrabold text-ink group-hover:text-berry leading-tight">
                            {topic.name}
                          </div>
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-ink/60 mt-0.5">
                            {topic.type} • {topic.xp} XP
                          </div>
                        </div>
                      </button>
                    </div>

                    {/* Popover Panel */}
                    {isOpen && (
                      <div className="w-full max-w-sm my-3 rounded-2xl bg-cream-card p-5 shadow-xl border border-berry/15 animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-berry">
                            {topic.type}
                          </span>
                          <span className="text-xs font-bold text-ink/70">
                            +{topic.xp} XP
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-plum mb-2">
                          {topic.name}
                        </h4>
                        <p className="text-sm text-ink/85 leading-relaxed mb-4">
                          {topic.desc}
                        </p>
                        <div className="flex items-center gap-3">
                          <Button
                            onClick={() => {
                              setSelectedTopic(topic);
                              setOpenPanelId(null);
                            }}
                            variant={isDone ? "ghost" : "default"}
                            className="w-full text-xs h-10"
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
                  className="flex flex-col items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry rounded-full p-2"
                >
                  <div className="w-20 h-20 rounded-full bg-yellow flex items-center justify-center shadow-node group-hover:scale-105 border-2 border-yellow-deep">
                    <Trophy className="w-8 h-8 text-berry" />
                  </div>
                  <div className="text-center max-w-[140px]">
                    <div className="text-xs font-extrabold text-ink group-hover:text-berry">
                      {activeCategory.badge}
                    </div>
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-berry/80 mt-0.5">
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
      )}

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
          {selectedTopic && (
            <div>
              <DialogHeader className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="berry">{selectedTopic.type}</Badge>
                  {selectedTopic.readTime && (
                    <span className="text-xs text-ink/70 inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {selectedTopic.readTime}
                    </span>
                  )}
                  <span className="text-xs font-bold text-yellow-deep ml-auto">
                    +{selectedTopic.xp} XP
                  </span>
                </div>
                <DialogTitle>{selectedTopic.name}</DialogTitle>
                <DialogDescription>{selectedTopic.desc}</DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4 text-sm text-ink/90">
                <div className="p-4 rounded-xl bg-blush/60 border border-berry/10 leading-relaxed">
                  {selectedTopic.summary}
                </div>

                <div>
                  <h5 className="font-bold text-berry mb-2 text-sm uppercase tracking-wide">
                    Key Facts:
                  </h5>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-ink/85">
                    {selectedTopic.keyTakeaways.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Optional Quiz Interaction */}
                {selectedTopic.quiz && selectedTopic.quiz.length > 0 && (
                  <div className="mt-3 p-4 rounded-xl bg-yellow/20 border border-yellow-deep/30">
                    <h5 className="font-bold text-berry mb-2 text-xs uppercase tracking-wide">
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
                              : "bg-white border-berry/20 hover:border-berry text-ink"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {isQuizSubmitted && (
                      <p className="text-xs text-ink/80 mt-3 font-semibold">
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

                <div className="mt-4 pt-4 border-t border-berry/10 flex items-center justify-end gap-3">
                  <Button
                    onClick={() => handleCompleteTopic(selectedTopic)}
                    variant="default"
                    className="gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {completedTopics.has(selectedTopic.id)
                      ? "Completed (Review Done)"
                      : `Complete & Claim +${selectedTopic.xp} XP`}
                  </Button>
                </div>
              </div>
            </div>
          )}
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
              <div className="w-24 h-24 rounded-full bg-yellow flex items-center justify-center border-4 border-yellow-deep shadow-md">
                <Trophy className="w-12 h-12 text-berry" />
              </div>
              <DialogTitle className="text-2xl font-serif text-berry mt-2">
                {selectedBadge.name}
              </DialogTitle>
              <Badge variant="berry">{selectedBadge.category}</Badge>
              <DialogDescription className="text-sm text-ink/80 max-w-xs mt-2">
                {selectedBadge.desc}
              </DialogDescription>
              <Button
                onClick={() => setSelectedBadge(null)}
                variant="yellow"
                className="mt-4"
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
