"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  CheckCircle2,
  Sparkles,
  ClipboardList,
  CalendarCheck,
  BookOpen,
  MessageSquare,
  ArrowRight,
  X,
  Search,
  Lock,
  HelpCircle,
  Shield,
  ShieldCheck,
  Globe,
  Quote,
  Check,
  Copy,
  Plus,
} from "lucide-react";
import { INITIAL_VOICES, YouthVoice } from "@/data/voicesData";
import { FAQS_DATA } from "@/data/faqsData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { EducationalReferences } from "@/components/shared/EducationalReferences";
import { submitStory, submitQuestion } from "@/lib/api";
import { PageId } from "@/components/layout/Navbar";

export type CommunityTab = "stories" | "qa" | "toolkit";

interface VoicesViewProps {
  initialTab?: CommunityTab;
  autoOpenSubmit?: boolean;
  onNavigate?: (page: PageId, categoryId?: string) => void;
}

export function VoicesView({
  initialTab = "stories",
  autoOpenSubmit = false,
  onNavigate,
}: VoicesViewProps) {
  const [activeTab, setActiveTab] = useState<CommunityTab>(initialTab);

  // Sync if initialTab changes from external navigation
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // =========================================================================
  // 1. Stories State
  // =========================================================================
  const [voices, setVoices] = useState<YouthVoice[]>(INITIAL_VOICES);
  const [storyInput, setStoryInput] = useState("");
  const [authorAlias, setAuthorAlias] = useState("");
  const [authorAge, setAuthorAge] = useState("");
  const [isSubmittingStory, setIsSubmittingStory] = useState(false);
  const [submitStorySuccess, setSubmitStorySuccess] = useState(false);

  const handleSubmitStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyInput.trim()) return;

    setIsSubmittingStory(true);
    await submitStory({
      story: storyInput,
      author_alias: authorAlias.trim() || "Shared anonymously",
      age: authorAge ? parseInt(authorAge, 10) : 17,
    });
    setIsSubmittingStory(false);

    // Optimistically prepend to list
    const newVoice: YouthVoice = {
      id: `v-${Date.now()}`,
      quote: storyInput,
      author: authorAlias.trim() || "Shared anonymously",
      age: authorAge ? parseInt(authorAge, 10) : 17,
      date: "Just now",
    };
    setVoices([newVoice, ...voices]);
    setSubmitStorySuccess(true);
    setStoryInput("");
    setAuthorAlias("");
    setAuthorAge("");

    setTimeout(() => {
      setSubmitStorySuccess(false);
    }, 4000);
  };

  // =========================================================================
  // 2. Q&A State
  // =========================================================================
  const [qaCategory, setQaCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(autoOpenSubmit);
  const [questionText, setQuestionText] = useState("");
  const [questionCat, setQuestionCat] = useState("general");
  const [ageRange, setAgeRange] = useState("16-18");
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);
  const [submitQuestionSuccess, setSubmitQuestionSuccess] = useState(false);

  useEffect(() => {
    if (autoOpenSubmit) {
      setActiveTab("qa");
      setIsQuestionModalOpen(true);
    }
  }, [autoOpenSubmit]);

  const qaCategories = [
    { id: "all", label: "All Questions" },
    { id: "cycles", label: "Cycles & Periods" },
    { id: "health", label: "Pain & Symptoms" },
    { id: "privacy", label: "Privacy & Confidentiality" },
    { id: "workshops", label: "Workshops" },
  ];

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchesCat = qaCategory === "all" || faq.category === qaCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setIsSubmittingQuestion(true);
    await submitQuestion({
      question: questionText,
      category: questionCat,
      age_range: ageRange,
    });
    setIsSubmittingQuestion(false);
    setSubmitQuestionSuccess(true);

    setTimeout(() => {
      setIsQuestionModalOpen(false);
      setSubmitQuestionSuccess(false);
      setQuestionText("");
    }, 2200);
  };

  // =========================================================================
  // 3. Self-Advocacy Toolkit Modal State
  // =========================================================================
  const [toolkitModalOpen, setToolkitModalOpen] = useState(false);
  const [activeToolkitTab, setActiveToolkitTab] = useState<"track" | "prepare" | "language" | "speak">("prepare");
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedScript(id);
      setTimeout(() => setCopiedScript(null), 2500);
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12 flex flex-col gap-10">
      {/* 1. Header with Eyebrow, Title & Site-Wide Language Note */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-[13px] md:text-[14px] font-bold uppercase tracking-wider text-raspberry mb-2 font-sans">
          ✦ COMMUNITY HUB · PEER VOICES &amp; CONFIDENTIAL Q&amp;A
        </div>
        <h1 className="text-4xl md:text-[56px] lg:text-[64px] font-normal font-serif text-deep-teal leading-[1.08] mb-4">
          Youth Voices &amp; Q&amp;A
        </h1>
        <p className="text-[17px] md:text-[19px] text-charcoal/80 leading-relaxed mb-4 font-sans">
          Real stories from peers navigating bodily changes, confidential clinical answers to questions you might feel nervous asking, and practical tools to advocate for your health.
        </p>

        {/* Clean, Non-Interactive Site-Wide Language Note */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 border border-deep-teal/15 shadow-xs text-xs sm:text-sm font-medium text-deep-teal mb-6 font-sans">
          <Globe className="w-3.5 h-3.5 text-coral shrink-0" />
          <span>✦ All questions and stories can be read in 10 languages via the site-wide language menu above.</span>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={() => {
              setActiveTab("qa");
              setIsQuestionModalOpen(true);
            }}
            className="bg-coral hover:bg-coral/90 text-white font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm gap-2 shadow-sm cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Ask an Anonymous Question</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setActiveTab("stories");
              if (typeof window !== "undefined") {
                const formEl = document.getElementById("share-story-form");
                if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="border-deep-teal/25 text-deep-teal hover:bg-light-teal font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-coral" />
            <span>Share Your Story</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setActiveTab("toolkit");
              setToolkitModalOpen(true);
            }}
            className="border-raspberry/25 text-raspberry hover:bg-soft-pink font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-raspberry" />
            <span>Self-Advocacy Toolkit</span>
          </Button>
        </div>
      </div>

      {/* 2. Top Segmented Selector (3 Tabs) */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-white/80 border-2 border-deep-teal/15 shadow-sm max-w-xl w-full">
          <button
            onClick={() => setActiveTab("stories")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all cursor-pointer text-center ${
              activeTab === "stories"
                ? "bg-deep-teal text-white shadow-xs"
                : "text-charcoal/70 hover:text-deep-teal hover:bg-slate-50"
            }`}
          >
            ✦ Real Stories ({voices.length})
          </button>
          <button
            onClick={() => setActiveTab("qa")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all cursor-pointer text-center ${
              activeTab === "qa"
                ? "bg-coral text-white shadow-xs"
                : "text-charcoal/70 hover:text-coral hover:bg-slate-50"
            }`}
          >
            ✦ Anonymous Q&amp;A ({FAQS_DATA.length})
          </button>
          <button
            onClick={() => setActiveTab("toolkit")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold font-sans transition-all cursor-pointer text-center ${
              activeTab === "toolkit"
                ? "bg-raspberry text-white shadow-xs"
                : "text-charcoal/70 hover:text-raspberry hover:bg-slate-50"
            }`}
          >
            ✦ Self-Advocacy Toolkit
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: PEER STORIES */}
      {/* ===================================================================== */}
      {activeTab === "stories" && (
        <div className="space-y-12 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal">
                  Real Stories, Shared on Purpose
                </h2>
                <p className="text-sm sm:text-base text-charcoal/80 font-sans mt-1">
                  Personal reflections and lived discoveries from youth who navigated identical bodily changes and medical questions.
                </p>
              </div>
              <span className="text-xs text-charcoal/60 font-sans italic">
                (Note: Peer quotes are curated for educational empowerment.)
              </span>
            </div>

            {/* Voices Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {voices.map((voice) => (
                <Card
                  key={voice.id}
                  className="p-7 rounded-3xl bg-white border-2 border-deep-teal/15 shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-full bg-light-teal text-deep-teal flex items-center justify-center mb-3">
                      <Quote className="w-4 h-4 text-deep-teal" />
                    </div>
                    <p className="font-serif text-[17px] sm:text-[18px] font-normal text-deep-teal leading-relaxed mb-6 italic">
                      &ldquo;{voice.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-deep-teal/10">
                    <span className="text-[13px] font-bold text-charcoal/75 font-sans">
                      — {voice.author}, age {voice.age}
                    </span>
                    {voice.category && (
                      <span className="text-[11.5px] font-bold text-deep-teal bg-light-teal px-2.5 py-0.5 rounded-full font-sans border border-deep-teal/20">
                        {voice.category}
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Add Your Voice Box */}
          <div id="share-story-form" className="rounded-3xl bg-deep-teal text-white p-8 md:p-12 shadow-lg space-y-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-coral text-xs font-bold uppercase tracking-wider mb-2 font-sans">
                <Sparkles className="w-4 h-4" />
                <span>Community Voice Board</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                Share what you wish someone had told you.
              </h3>
              <p className="text-sm md:text-base text-light-teal/90 leading-relaxed font-sans m-0">
                Did you have an experience with a doctor, a period surprise, or a lesson about your body that helped you? Your reflection could help another young person feel less alone.
              </p>
            </div>

            {submitStorySuccess ? (
              <div className="p-6 rounded-2xl bg-white/10 border border-white/20 text-center flex flex-col items-center gap-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                <h4 className="font-serif text-xl font-bold text-white">Thank you for sharing!</h4>
                <p className="text-sm text-light-teal font-sans">
                  Your reflection has been added to our community board.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitStory} className="flex flex-col gap-4 max-w-xl">
                <div>
                  <label className="block text-xs font-bold text-light-teal uppercase tracking-wider mb-1 font-sans">
                    Your reflection or discovery
                  </label>
                  <Textarea
                    required
                    rows={4}
                    placeholder="What did you learn about your cycle, symptoms, or talking with a doctor?"
                    value={storyInput}
                    onChange={(e) => setStoryInput(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm font-sans focus-visible:ring-coral rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-light-teal uppercase tracking-wider mb-1 font-sans">
                      Display Alias (or &ldquo;Anonymous&rdquo;)
                    </label>
                    <Input
                      placeholder="e.g. Maya, Soccer Player, or Anonymous"
                      value={authorAlias}
                      onChange={(e) => setAuthorAlias(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm font-sans focus-visible:ring-coral rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-light-teal uppercase tracking-wider mb-1 font-sans">
                      Age
                    </label>
                    <Input
                      type="number"
                      min={12}
                      max={25}
                      placeholder="e.g. 17"
                      value={authorAge}
                      onChange={(e) => setAuthorAge(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm font-sans focus-visible:ring-coral rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-light-teal/80 font-sans">
                  <Lock className="w-3.5 h-3.5 text-coral shrink-0" />
                  <span>100% private. Submissions are reviewed for respectful peer dialogue.</span>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmittingStory}
                  className="bg-coral hover:bg-coral/90 text-white font-bold rounded-xl gap-2 self-start px-6 py-2.5 cursor-pointer shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmittingStory ? "Submitting..." : "Submit Reflection"}</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: ANONYMOUS Q&A */}
      {/* ===================================================================== */}
      {activeTab === "qa" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal">
                Questions, Answered Plainly
              </h2>
              <p className="text-sm sm:text-base text-charcoal/80 font-sans mt-1">
                Every question submitted is completely anonymous. Real answers written plainly from clinical guidelines.
              </p>
            </div>
            <Button
              onClick={() => setIsQuestionModalOpen(true)}
              className="bg-coral hover:bg-coral/90 text-white font-bold gap-2 rounded-2xl shadow-sm shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Ask Anonymous Question</span>
            </Button>
          </div>

          {/* Search Bar & Category Pills */}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-3.5" />
              <Input
                placeholder="Search questions (e.g. cramps, irregular, anonymous, doctor)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-[15px] font-sans bg-white border-deep-teal/20 rounded-2xl h-11"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {qaCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setQaCategory(c.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-[13.5px] font-semibold font-sans transition-all border cursor-pointer ${
                    qaCategory === c.id
                      ? "bg-coral border-coral text-white shadow-xs"
                      : "bg-white border-deep-teal/20 text-deep-teal hover:bg-light-teal"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion FAQ list */}
          <div className="w-full">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border-2 border-deep-teal/20 shadow-xs">
                <p className="text-sm text-charcoal/70 font-sans m-0">
                  No matching questions found for &ldquo;{searchQuery}&rdquo;. Feel free to submit your question below!
                </p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full space-y-4">
                {filteredFaqs.map((faq, idx) => {
                  const borderOutline =
                    idx % 3 === 0
                      ? "border-2 border-deep-teal/30 hover:border-deep-teal"
                      : idx % 3 === 1
                      ? "border-2 border-coral/40 hover:border-coral"
                      : "border-2 border-raspberry/30 hover:border-raspberry";

                  return (
                    <AccordionItem
                      key={faq.id}
                      value={faq.id}
                      className={`bg-white rounded-2xl px-6 py-2 shadow-xs transition-all ${borderOutline} border-b-0`}
                    >
                      <AccordionTrigger className="text-deep-teal hover:text-raspberry font-serif text-[17px] sm:text-[19px] font-normal py-4 text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm sm:text-base text-charcoal/85 leading-relaxed pt-1 pb-4 font-sans">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </div>

          {/* Educational Guidelines & Medical Sources */}
          <div className="pt-4">
            <EducationalReferences customTitle="Q&A Evidence Base & Medical Sources" />
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: SELF-ADVOCACY TOOLKIT */}
      {/* ===================================================================== */}
      {activeTab === "toolkit" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="rounded-3xl bg-coral text-deep-teal p-8 md:p-12 shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deep-teal mb-2 font-sans">
                  <Sparkles className="w-3.5 h-3.5 text-deep-teal" />
                  <span>Youth Patient Empowerment</span>
                </div>
                <h2 className="text-3xl md:text-[42px] font-normal font-serif text-deep-teal leading-[1.15]">
                  Know what to ask.
                </h2>
                <p className="text-[16px] md:text-[17px] text-deep-teal/90 max-w-xl mt-2 mb-0 font-sans">
                  Four practical tools to help you track your symptoms, prepare for appointments, understand clinical terms, and speak up with confidence.
                </p>
              </div>

              <Button
                onClick={() => {
                  setActiveToolkitTab("prepare");
                  setToolkitModalOpen(true);
                }}
                className="bg-deep-teal text-white hover:bg-deep-teal/90 text-sm gap-2 whitespace-nowrap self-start md:self-end shadow-sm cursor-pointer"
              >
                <span>Open Full Interactive Toolkit</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* 4 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1: Track your symptoms */}
              <div
                onClick={() => {
                  setActiveToolkitTab("track");
                  setToolkitModalOpen(true);
                }}
                className="p-6 rounded-2xl bg-white text-charcoal border border-white/70 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-light-teal text-deep-teal flex items-center justify-center border border-deep-teal/20 shadow-2xs mb-4">
                    <ClipboardList className="w-5 h-5 text-deep-teal" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors leading-snug mb-2">
                    Track your symptoms
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-charcoal/80 leading-relaxed font-sans m-0">
                    Use an objective framework to document frequency, severity (1-10), and cycle correlations.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-deep-teal/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-raspberry font-sans group-hover:underline">
                    Open tracker guide
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-raspberry group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 2: Prepare for an appointment */}
              <div
                onClick={() => {
                  setActiveToolkitTab("prepare");
                  setToolkitModalOpen(true);
                }}
                className="p-6 rounded-2xl bg-white text-charcoal border border-white/70 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#FFE1DB] text-coral flex items-center justify-center border border-coral/30 shadow-2xs mb-4">
                    <CalendarCheck className="w-5 h-5 text-[#B83F68]" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors leading-snug mb-2">
                    Prepare for an appointment
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-charcoal/80 leading-relaxed font-sans m-0">
                    Build a personalized, prioritized list of questions before seeing a physician or nurse.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-deep-teal/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-raspberry font-sans group-hover:underline">
                    Build question list
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-raspberry group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 3: Learn the language */}
              <div
                onClick={() => {
                  setActiveToolkitTab("language");
                  setToolkitModalOpen(true);
                }}
                className="p-6 rounded-2xl bg-white text-charcoal border border-white/70 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-soft-pink text-raspberry flex items-center justify-center border border-raspberry/25 shadow-2xs mb-4">
                    <BookOpen className="w-5 h-5 text-raspberry" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors leading-snug mb-2">
                    Learn the language
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-charcoal/80 leading-relaxed font-sans m-0">
                    Understand clinical terms like amenorrhea, RED-S, luteal phase, and Rotterdam criteria.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-deep-teal/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-raspberry font-sans group-hover:underline">
                    Explore terminology
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-raspberry group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 4: Speak up */}
              <div
                onClick={() => {
                  setActiveToolkitTab("speak");
                  setToolkitModalOpen(true);
                }}
                className="p-6 rounded-2xl bg-white text-charcoal border border-white/70 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-light-teal text-deep-teal flex items-center justify-center border border-deep-teal/20 shadow-2xs mb-4">
                    <MessageSquare className="w-5 h-5 text-deep-teal" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors leading-snug mb-2">
                    Speak up
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-charcoal/80 leading-relaxed font-sans m-0">
                    Practice explaining your symptoms and learn verbatim scripts for when you feel dismissed.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-deep-teal/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-raspberry font-sans group-hover:underline">
                    Practice scripts
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-raspberry group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. ANONYMOUS QUESTION SUBMISSION MODAL */}
      {/* ===================================================================== */}
      <Dialog open={isQuestionModalOpen} onOpenChange={setIsQuestionModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-bold text-deep-teal">
              Ask an Anonymous Question
            </DialogTitle>
            <DialogDescription className="text-sm font-sans text-charcoal/80 leading-relaxed">
              No names, no cookies, no IP logging. Questions are answered by health educators following accredited clinical guidelines and published to our community Q&amp;A library.
            </DialogDescription>
          </DialogHeader>

          {submitQuestionSuccess ? (
            <div className="p-6 text-center flex flex-col items-center gap-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-bounce" />
              <h4 className="font-serif text-2xl font-bold text-deep-teal">Question Submitted!</h4>
              <p className="text-sm font-sans text-charcoal/80">
                Thank you! We review every question and update our library with evidence-based answers.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitQuestion} className="flex flex-col gap-4 mt-2">
              <div>
                <label className="block text-xs font-bold text-deep-teal uppercase tracking-wider mb-1 font-sans">
                  What would you like to know?
                </label>
                <Textarea
                  required
                  rows={4}
                  placeholder="Ask anything about your body, cycles, symptoms, or talking with a doctor..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="text-sm font-sans rounded-xl border-deep-teal/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-deep-teal uppercase tracking-wider mb-1 font-sans">
                    Topic Category
                  </label>
                  <select
                    value={questionCat}
                    onChange={(e) => setQuestionCat(e.target.value)}
                    className="flex h-11 w-full rounded-xl border border-deep-teal/20 bg-white px-3 text-xs sm:text-sm font-sans text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal"
                  >
                    <option value="general">General Anatomy &amp; Puberty</option>
                    <option value="cycles">Periods &amp; Cramps</option>
                    <option value="conditions">PCOS &amp; Endometriosis</option>
                    <option value="realtalk">STIs &amp; Consent</option>
                    <option value="privacy">Clinic &amp; Privacy Rights</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-deep-teal uppercase tracking-wider mb-1 font-sans">
                    Age Range (Optional)
                  </label>
                  <select
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                    className="flex h-11 w-full rounded-xl border border-deep-teal/20 bg-white px-3 text-xs sm:text-sm font-sans text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal"
                  >
                    <option value="under-15">13–15</option>
                    <option value="16-18">16–18</option>
                    <option value="19-24">19–24</option>
                    <option value="25+">25+</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-charcoal/70 font-sans">
                <Lock className="w-3.5 h-3.5 text-coral shrink-0" />
                <span>100% anonymous — educational literacy, not medical diagnosis.</span>
              </div>

              <Button
                type="submit"
                disabled={isSubmittingQuestion}
                className="w-full bg-deep-teal hover:bg-deep-teal/90 text-white font-bold rounded-xl gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmittingQuestion ? "Sending..." : "Submit Question Anonymously"}</span>
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* ===================================================================== */}
      {/* 5. INTERACTIVE SELF-ADVOCACY TOOLKIT MODAL */}
      {/* ===================================================================== */}
      <Dialog open={toolkitModalOpen} onOpenChange={setToolkitModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-white">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-light-teal text-deep-teal border border-deep-teal/20">
                <Sparkles className="w-3.5 h-3.5 text-coral" />
                <span>Patient Empowerment Guide</span>
              </span>
            </div>
            <DialogTitle className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal mt-2">
              Youth Self-Advocacy Toolkit
            </DialogTitle>
            <DialogDescription className="text-sm font-sans text-charcoal/80">
              Interactive guides to prepare for doctor appointments, track symptoms objectively, and communicate with clarity.
            </DialogDescription>
          </DialogHeader>

          {/* Modal Tabs */}
          <div className="flex gap-2 border-b border-deep-teal/15 pb-2 pt-2 overflow-x-auto">
            <button
              onClick={() => setActiveToolkitTab("prepare")}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold font-sans transition-colors cursor-pointer ${
                activeToolkitTab === "prepare" ? "bg-deep-teal text-white" : "text-charcoal/70 hover:bg-slate-100"
              }`}
            >
              1. Appointment Prep
            </button>
            <button
              onClick={() => setActiveToolkitTab("track")}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold font-sans transition-colors cursor-pointer ${
                activeToolkitTab === "track" ? "bg-deep-teal text-white" : "text-charcoal/70 hover:bg-slate-100"
              }`}
            >
              2. Symptom Tracker
            </button>
            <button
              onClick={() => setActiveToolkitTab("speak")}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold font-sans transition-colors cursor-pointer ${
                activeToolkitTab === "speak" ? "bg-deep-teal text-white" : "text-charcoal/70 hover:bg-slate-100"
              }`}
            >
              3. Speak-Up Scripts
            </button>
            <button
              onClick={() => setActiveToolkitTab("language")}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold font-sans transition-colors cursor-pointer ${
                activeToolkitTab === "language" ? "bg-deep-teal text-white" : "text-charcoal/70 hover:bg-slate-100"
              }`}
            >
              4. Clinical Language
            </button>
          </div>

          {/* Tab Content */}
          <div className="py-4 space-y-4">
            {activeToolkitTab === "prepare" && (
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-lg text-deep-teal">
                  Preparing for an Appointment: 3 Rules for Clarity
                </h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-light-teal/40 border border-deep-teal/20 space-y-1">
                    <strong className="text-sm font-bold text-deep-teal block">Rule 1: Bring Written Notes</strong>
                    <p className="text-xs sm:text-sm text-charcoal/80 font-sans m-0">
                      When you enter an exam room, anxiety can make symptoms difficult to recall. Write your top 3 concerns in your phone notes ahead of time.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FFE1DB]/50 border border-coral/30 space-y-1">
                    <strong className="text-sm font-bold text-coral block">Rule 2: State Your Primary Goal First</strong>
                    <p className="text-xs sm:text-sm text-charcoal/80 font-sans m-0">
                      Start the visit with: &ldquo;My main priority today is figuring out why my period cramps keep me from going to school, and what diagnostic steps we can take.&rdquo;
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-soft-pink/40 border border-raspberry/25 space-y-1">
                    <strong className="text-sm font-bold text-raspberry block">Rule 3: Ask for Next Steps &amp; Timeline</strong>
                    <p className="text-xs sm:text-sm text-charcoal/80 font-sans m-0">
                      Before leaving, ask: &ldquo;If these symptoms continue over the next 4 weeks, what is our next diagnostic step?&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeToolkitTab === "track" && (
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-lg text-deep-teal">
                  How to Build an Objective Symptom Log
                </h4>
                <p className="text-xs sm:text-sm text-charcoal/80 font-sans">
                  Clinicians respond to concrete numbers and timelines rather than vague recollections. Log these 4 parameters:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="text-xs font-bold text-deep-teal uppercase">1. Severity Scale</span>
                    <p className="text-xs text-charcoal/80 font-sans m-0">Score pain 1-10 and note whether standard OTC medications provide relief.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="text-xs font-bold text-deep-teal uppercase">2. Functional Impact</span>
                    <p className="text-xs text-charcoal/80 font-sans m-0">Record specific activities missed: school days, sports practices, or sleep disruption.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="text-xs font-bold text-deep-teal uppercase">3. Cycle Timing</span>
                    <p className="text-xs text-charcoal/80 font-sans m-0">Note cycle day (Day 1 = first day of full bleeding) and how many days symptoms persist.</p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="text-xs font-bold text-deep-teal uppercase">4. Associated Signs</span>
                    <p className="text-xs text-charcoal/80 font-sans m-0">Track nausea, bowel/urinary changes, dizziness, or fatigue alongside bleeding.</p>
                  </div>
                </div>
              </div>
            )}

            {activeToolkitTab === "speak" && (
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-lg text-deep-teal">
                  Verbatim Scripts for Clinical Visits
                </h4>
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white border-2 border-deep-teal/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-deep-teal">
                        Script: Introducing Symptoms
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          handleCopy(
                            "“I have documented my symptoms across the last three cycles. My pain averages an 8 out of 10 and prevents me from attending school. What diagnostic evaluation or blood work do you recommend to investigate this?”",
                            "s1"
                          )
                        }
                        className="text-xs h-7 text-deep-teal hover:bg-light-teal cursor-pointer"
                      >
                        {copiedScript === "s1" ? <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                        <span>{copiedScript === "s1" ? "Copied" : "Copy"}</span>
                      </Button>
                    </div>
                    <p className="text-sm font-serif italic text-deep-teal leading-relaxed m-0">
                      &ldquo;I have documented my symptoms across the last three cycles. My pain averages an 8 out of 10 and prevents me from attending school. What diagnostic evaluation or blood work do you recommend to investigate this?&rdquo;
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border-2 border-coral/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-coral">
                        Script: If Your Symptoms Are Dismissed
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          handleCopy(
                            "“Could you please note in my electronic health record that I reported these symptoms today, and document why further diagnostic testing or specialist referral is not indicated at this time?”",
                            "s2"
                          )
                        }
                        className="text-xs h-7 text-coral hover:bg-[#FFE1DB] cursor-pointer"
                      >
                        {copiedScript === "s2" ? <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                        <span>{copiedScript === "s2" ? "Copied" : "Copy"}</span>
                      </Button>
                    </div>
                    <p className="text-sm font-serif italic text-coral leading-relaxed m-0">
                      &ldquo;Could you please note in my electronic health record that I reported these symptoms today, and document why further diagnostic testing or specialist referral is not indicated at this time?&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeToolkitTab === "language" && (
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-lg text-deep-teal">
                  Essential Clinical Definitions
                </h4>
                <div className="space-y-2.5 text-xs sm:text-sm font-sans">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="text-deep-teal">Amenorrhea:</strong> Absence of menstruation (primary: no period by age 15; secondary: missing periods for 90+ consecutive days after regularity).
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="text-deep-teal">Dysmenorrhea:</strong> Painful menstrual cramps. Primary is caused by prostaglandins; secondary is caused by underlying conditions like endometriosis.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="text-deep-teal">RED-S (Relative Energy Deficiency in Sport):</strong> Low energy availability impairing metabolic rate, bone health, immunity, protein synthesis, and hormone production.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="text-deep-teal">Rotterdam Criteria:</strong> Clinical guideline requiring 2 of 3 features (ovulatory dysfunction, hyperandrogenism, polycystic ovarian morphology) for PCOS evaluation.
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-deep-teal/15 flex justify-end">
            <Button
              onClick={() => setToolkitModalOpen(false)}
              className="bg-deep-teal text-white hover:bg-deep-teal/90 rounded-full cursor-pointer"
            >
              Close Toolkit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
