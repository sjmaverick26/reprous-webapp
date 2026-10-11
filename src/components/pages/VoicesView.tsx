"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Sparkles, ClipboardList, CalendarCheck, BookOpen, MessageSquare, ArrowRight, X } from "lucide-react";
import { INITIAL_VOICES, YouthVoice } from "@/data/voicesData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AccessMini } from "@/components/shared/AccessMini";
import { submitStory } from "@/lib/api";
import { PageId } from "@/components/layout/Navbar";

interface VoicesViewProps {
  onNavigate?: (page: PageId, categoryId?: string) => void;
}

export function VoicesView({ onNavigate }: VoicesViewProps = {}) {
  const [voices, setVoices] = useState<YouthVoice[]>(INITIAL_VOICES);
  const [storyInput, setStoryInput] = useState("");
  const [authorAlias, setAuthorAlias] = useState("");
  const [authorAge, setAuthorAge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [toolkitModalOpen, setToolkitModalOpen] = useState(false);
  const [activeToolkitTab, setActiveToolkitTab] = useState<"track" | "prepare" | "language" | "speak">("prepare");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyInput.trim()) return;

    setIsSubmitting(true);
    const res = await submitStory({
      story: storyInput,
      author_alias: authorAlias.trim() || "Shared anonymously",
      age: authorAge ? parseInt(authorAge, 10) : 17,
    });
    setIsSubmitting(false);

    // Optimistically prepend to list
    const newVoice: YouthVoice = {
      id: `v-${Date.now()}`,
      quote: storyInput,
      author: authorAlias.trim() || "Shared anonymously",
      age: authorAge ? parseInt(authorAge, 10) : 17,
      date: "Just now",
    };
    setVoices([newVoice, ...voices]);
    setSubmitSuccess(true);
    setStoryInput("");
    setAuthorAlias("");
    setAuthorAge("");

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 4000);
  };

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12 flex flex-col gap-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-[13px] md:text-[14px] font-bold uppercase tracking-wider text-berry mb-2 font-sans">
          Youth Voices
        </div>
        <h1 className="text-4xl md:text-[64px] lg:text-[72px] font-normal font-serif text-plum leading-[1.08] mb-4">
          Real stories, shared on purpose
        </h1>
        <p className="text-[17px] md:text-[19px] text-ink/80 leading-relaxed mb-6 font-sans">
          Personal stories, questions, and reflections from young people who have navigated the exact same bodily changes, anxieties, and discoveries. <span className="font-medium text-ink/70">(Note: These quotes are mockups for demonstration purposes.)</span>
        </p>
        <AccessMini
          text="Stories can be submitted by text, voice memo, or in your own language — we'll translate it."
          className="mx-auto shadow-sm"
        />
      </div>

      {/* Voices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {voices.map((voice) => (
          <Card
            key={voice.id}
            className="p-7 flex flex-col justify-between hover:shadow-hover transition-all"
          >
            <div>
              <p className="font-serif text-[18px] md:text-[20px] font-normal text-plum leading-relaxed mb-6 italic">
                &ldquo;{voice.quote}&rdquo;
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-berry/10">
              <span className="text-[13.5px] md:text-[14px] font-bold text-ink/75 font-sans">
                — {voice.author}, age {voice.age} <span className="font-normal text-xs text-ink/50">(mockup quote)</span>
              </span>
              {voice.category && (
                <span className="text-[12px] md:text-[13px] font-bold text-berry bg-blush px-2.5 py-0.5 rounded-full font-sans">
                  {voice.category}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Self-Advocacy Toolkit Section */}
      <div id="advocacy-toolkit" className="rounded-3xl bg-coral text-deep-teal p-8 md:p-12 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deep-teal mb-2 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-deep-teal" />
              Youth Patient Empowerment
            </div>
            <h2 className="text-3xl md:text-[42px] lg:text-[48px] font-normal font-serif text-deep-teal leading-[1.15]">
              Know what to ask.
            </h2>
            <p className="text-[17px] md:text-[18px] text-deep-teal/90 max-w-xl mt-2 mb-0 font-sans">
              Four practical tools to help you track your symptoms, prepare for appointments, and speak up with confidence.
            </p>
          </div>

          <Button
            onClick={() => {
              setActiveToolkitTab("prepare");
              setToolkitModalOpen(true);
            }}
            className="bg-deep-teal text-white hover:bg-deep-teal/90 hover:text-white active:bg-deep-teal active:text-white focus-visible:text-white text-[15px] gap-2 whitespace-nowrap self-start md:self-end shadow-sm"
          >
            <span>Open the Self-Advocacy Toolkit</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* 4 Floating White Cards on Coral */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Track your symptoms */}
          <div
            onClick={() => {
              setActiveToolkitTab("track");
              setToolkitModalOpen(true);
            }}
            className="p-6 md:p-7 rounded-2xl bg-white text-charcoal border border-white/70 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-light-teal text-deep-teal flex items-center justify-center border border-deep-teal/20 shadow-2xs mb-4">
                <ClipboardList className="w-5 h-5 text-deep-teal" />
              </div>
              <h3 className="text-xl font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors leading-snug mb-2.5">
                Track your symptoms
              </h3>
              <p className="text-[14.5px] text-charcoal/80 leading-relaxed font-sans m-0">
                Download a symptom tracker to document frequency, severity, and cycle patterns.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-deep-teal/10 flex items-center justify-between">
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
            className="p-6 md:p-7 rounded-2xl bg-white text-charcoal border border-white/70 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#FFE1DB] text-coral flex items-center justify-center border border-coral/30 shadow-2xs mb-4">
                <CalendarCheck className="w-5 h-5 text-[#B83F68]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors leading-snug mb-2.5">
                Prepare for an appointment
              </h3>
              <p className="text-[14.5px] text-charcoal/80 leading-relaxed font-sans m-0">
                Build a personalized list of prioritized questions before seeing a healthcare provider.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-deep-teal/10 flex items-center justify-between">
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
            className="p-6 md:p-7 rounded-2xl bg-white text-charcoal border border-white/70 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-soft-pink text-raspberry flex items-center justify-center border border-raspberry/25 shadow-2xs mb-4">
                <BookOpen className="w-5 h-5 text-raspberry" />
              </div>
              <h3 className="text-xl font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors leading-snug mb-2.5">
                Learn the language
              </h3>
              <p className="text-[14.5px] text-charcoal/80 leading-relaxed font-sans m-0">
                Understand terms like PCOS, endometriosis, energy availability, and amenorrhea.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-deep-teal/10 flex items-center justify-between">
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
            className="p-6 md:p-7 rounded-2xl bg-white text-charcoal border border-white/70 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-light-teal text-deep-teal flex items-center justify-center border border-deep-teal/20 shadow-2xs mb-4">
                <MessageSquare className="w-5 h-5 text-deep-teal" />
              </div>
              <h3 className="text-xl font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors leading-snug mb-2.5">
                Speak up
              </h3>
              <p className="text-[14.5px] text-charcoal/80 leading-relaxed font-sans m-0">
                Practice explaining your symptoms clearly and responding when you feel dismissed.
              </p>
            </div>
            <div className="pt-5 mt-5 border-t border-deep-teal/10 flex items-center justify-between">
              <span className="text-xs font-bold text-raspberry font-sans group-hover:underline">
                Practice conversation scripts
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-raspberry group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Your Voice Box */}
      <div className="rounded-3xl bg-deep-teal text-white p-8 md:p-12 shadow-lg">
        <div className="max-w-xl mb-6">
          <div className="flex items-center gap-2 text-coral text-[13px] font-bold uppercase tracking-wider mb-2 font-sans">
            <Sparkles className="w-4 h-4" />
            Community Board
          </div>
          <h2 className="text-3xl md:text-[42px] lg:text-[48px] font-normal font-serif text-white mb-2 leading-[1.15]">
            Add your voice
          </h2>
          <p className="text-[16px] md:text-[18px] text-white/90 m-0 leading-relaxed font-sans">
            Share a story, a memory, or an encouragement for someone else. 100% anonymous by default, and never shared without your consent.
          </p>
        </div>

        {submitSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-coral text-white flex items-center gap-3 font-bold text-[15px] font-sans shadow-sm">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Thank you for sharing your story! It is now posted to the Youth Voices board.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Textarea
            required
            rows={3}
            placeholder="Share your experience with periods, puberty, doctor visits, or learning about your body..."
            value={storyInput}
            onChange={(e) => setStoryInput(e.target.value)}
            className="bg-white text-charcoal placeholder:text-charcoal/50 text-[15px] font-sans border-0 focus-visible:ring-2 focus-visible:ring-coral"
          />

          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <Input
              placeholder="Alias / Signature (e.g. Shared anonymously or Jordan)"
              value={authorAlias}
              onChange={(e) => setAuthorAlias(e.target.value)}
              className="bg-white text-charcoal sm:w-1/2 placeholder:text-charcoal/50 text-[15px] font-sans border-0 focus-visible:ring-2 focus-visible:ring-coral"
            />
            <Input
              type="number"
              min={12}
              max={30}
              placeholder="Age (e.g. 17)"
              value={authorAge}
              onChange={(e) => setAuthorAge(e.target.value)}
              className="bg-white text-charcoal sm:w-1/4 placeholder:text-charcoal/50 text-[15px] font-sans border-0 focus-visible:ring-2 focus-visible:ring-coral"
            />
            <Button
              type="submit"
              variant="coral"
              disabled={isSubmitting}
              className="w-full sm:w-auto ml-auto px-8 gap-2 font-bold shadow-md"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Posting..." : "Share Story"}
            </Button>
          </div>
        </form>
      </div>

      {/* Interactive Self-Advocacy Toolkit Modal */}
      {toolkitModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-teal/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setToolkitModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="toolkit-title"
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-deep-teal/20 flex flex-col gap-6 relative animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-deep-teal/10 pb-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-raspberry font-sans mb-1">
                  ReproUs Patient Advocacy Series
                </div>
                <h3 id="toolkit-title" className="text-2xl font-serif text-deep-teal m-0 font-normal">
                  Self-Advocacy Toolkit
                </h3>
              </div>
              <button
                onClick={() => setToolkitModalOpen(false)}
                className="p-1.5 rounded-lg text-charcoal/50 hover:text-charcoal hover:bg-light-teal transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 border-b border-deep-teal/10 pb-2 overflow-x-auto font-sans text-[13.5px]">
              <button
                onClick={() => setActiveToolkitTab("prepare")}
                className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeToolkitTab === "prepare"
                    ? "bg-raspberry text-white hover:bg-raspberry hover:text-white active:text-white focus:text-white shadow-2xs"
                    : "text-charcoal/80 hover:bg-light-teal hover:text-deep-teal active:text-charcoal focus:text-deep-teal"
                }`}
              >
                <CalendarCheck className="w-4 h-4 text-current" />
                <span>Prepare for Appointment</span>
              </button>
              <button
                onClick={() => setActiveToolkitTab("track")}
                className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeToolkitTab === "track"
                    ? "bg-raspberry text-white hover:bg-raspberry hover:text-white active:text-white focus:text-white shadow-2xs"
                    : "text-charcoal/80 hover:bg-light-teal hover:text-deep-teal active:text-charcoal focus:text-deep-teal"
                }`}
              >
                <ClipboardList className="w-4 h-4 text-current" />
                <span>Symptom Tracker</span>
              </button>
              <button
                onClick={() => setActiveToolkitTab("language")}
                className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeToolkitTab === "language"
                    ? "bg-raspberry text-white hover:bg-raspberry hover:text-white active:text-white focus:text-white shadow-2xs"
                    : "text-charcoal/80 hover:bg-light-teal hover:text-deep-teal active:text-charcoal focus:text-deep-teal"
                }`}
              >
                <BookOpen className="w-4 h-4 text-current" />
                <span>Learn the Language</span>
              </button>
              <button
                onClick={() => setActiveToolkitTab("speak")}
                className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeToolkitTab === "speak"
                    ? "bg-raspberry text-white hover:bg-raspberry hover:text-white active:text-white focus:text-white shadow-2xs"
                    : "text-charcoal/80 hover:bg-light-teal hover:text-deep-teal active:text-charcoal focus:text-deep-teal"
                }`}
              >
                <MessageSquare className="w-4 h-4 text-current" />
                <span>Practice Speaking Up</span>
              </button>
            </div>

            {/* Tab 1: Prepare for Appointment */}
            {activeToolkitTab === "prepare" && (
              <div className="space-y-4 font-sans text-charcoal/90">
                <h4 className="text-lg font-serif font-bold text-deep-teal m-0">
                  Appointment Preparation Checklist
                </h4>
                <p className="text-[14.5px] leading-relaxed m-0">
                  Before visiting a doctor, nurse practitioner, or campus health clinic, having your main concerns written down ensures nothing gets brushed aside:
                </p>
                <div className="space-y-2.5 bg-warm-cream/60 p-4 rounded-xl border border-deep-teal/10 text-[14px]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-raspberry shrink-0 mt-0.5" />
                    <span><strong>State your primary goal first:</strong> &ldquo;I am here today because my cramps cause me to miss school, and standard pain relievers aren&apos;t helping.&rdquo;</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-raspberry shrink-0 mt-0.5" />
                    <span><strong>Bring concrete data:</strong> Cycle dates, pain scale numbers (1–10), and days of missed activities over the last 3 months.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-raspberry shrink-0 mt-0.5" />
                    <span><strong>Ask for documentation:</strong> If a test or medication is denied, ask: &ldquo;Could you please document in my chart that we discussed these symptoms and why this test was not ordered?&rdquo;</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Symptom Tracker */}
            {activeToolkitTab === "track" && (
              <div className="space-y-4 font-sans text-charcoal/90">
                <h4 className="text-lg font-serif font-bold text-deep-teal m-0">
                  What to Record in Your Symptom Log
                </h4>
                <p className="text-[14.5px] leading-relaxed m-0">
                  Doctors rely on objective patterns. Keeping a 60–90 day log provides undeniable clinical evidence:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px]">
                  <div className="p-3 bg-warm-cream/60 rounded-lg border border-deep-teal/10">
                    <strong className="text-raspberry block mb-1">Cycle Metrics:</strong>
                    First day of bleeding, last day of bleeding, and total cycle length (e.g., 28 days vs. 45 days).
                  </div>
                  <div className="p-3 bg-warm-cream/60 rounded-lg border border-deep-teal/10">
                    <strong className="text-raspberry block mb-1">Pain Rating &amp; Type:</strong>
                    Sharp, throbbing, deep ache; rated 1 to 10; noted if it radiates to back or thighs.
                  </div>
                  <div className="p-3 bg-warm-cream/60 rounded-lg border border-deep-teal/10">
                    <strong className="text-raspberry block mb-1">Medications Taken:</strong>
                    Exact doses of ibuprofen, acetaminophen, heating pads used, and whether relief was achieved.
                  </div>
                  <div className="p-3 bg-warm-cream/60 rounded-lg border border-deep-teal/10">
                    <strong className="text-raspberry block mb-1">Daily Life Impact:</strong>
                    Missed gym classes, exams, practices, or social events.
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Learn the Language */}
            {activeToolkitTab === "language" && (
              <div className="space-y-4 font-sans text-charcoal/90">
                <h4 className="text-lg font-serif font-bold text-deep-teal m-0">
                  Essential Medical Terms
                </h4>
                <div className="space-y-3 text-[14px]">
                  <div className="p-3 bg-warm-cream/60 rounded-lg border border-deep-teal/10">
                    <strong className="text-deep-teal block font-serif text-base">Secondary Dysmenorrhea:</strong>
                    Menstrual pain caused by an underlying reproductive condition (such as endometriosis, adenomyosis, or fibroids), rather than common primary cramps.
                  </div>
                  <div className="p-3 bg-warm-cream/60 rounded-lg border border-deep-teal/10">
                    <strong className="text-deep-teal block font-serif text-base">RED-S (Relative Energy Deficiency in Sport):</strong>
                    A syndrome where dietary energy intake is insufficient to support training and essential physiological functions, leading to period loss and bone thinning.
                  </div>
                  <div className="p-3 bg-warm-cream/60 rounded-lg border border-deep-teal/10">
                    <strong className="text-deep-teal block font-serif text-base">Hyperandrogenism:</strong>
                    Elevated levels of androgens (like testosterone) in the female body, often seen in PCOS and causing acne, excess hair, or irregular ovulation.
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Speak Up Scripts */}
            {activeToolkitTab === "speak" && (
              <div className="space-y-4 font-sans text-charcoal/90">
                <h4 className="text-lg font-serif font-bold text-deep-teal m-0">
                  Phrases to Advocate for Yourself
                </h4>
                <div className="space-y-3 text-[14px]">
                  <div className="p-3.5 bg-warm-cream/60 rounded-lg border border-deep-teal/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60 block mb-1">
                      If told: &ldquo;Cramps are just part of having a period.&rdquo;
                    </span>
                    <strong className="text-raspberry block">Your response:</strong>
                    &ldquo;While I understand mild cramping is normal, my pain prevents me from attending school and doesn&apos;t respond to maximum doses of ibuprofen. What clinical steps can we take to rule out secondary dysmenorrhea or endometriosis?&rdquo;
                  </div>
                  <div className="p-3.5 bg-warm-cream/60 rounded-lg border border-deep-teal/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60 block mb-1">
                      If told: &ldquo;Missing your period is just due to stress.&rdquo;
                    </span>
                    <strong className="text-raspberry block">Your response:</strong>
                    &ldquo;I know stress can play a role, but because I haven&apos;t had a period for over 3 months, I would like to check my thyroid and hormone levels to rule out RED-S or endocrine conditions.&rdquo;
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-deep-teal/10 flex items-center justify-between">
              {onNavigate && (
                <Button
                  onClick={() => {
                    setToolkitModalOpen(false);
                    onNavigate("hub", "mind");
                  }}
                  variant="outline"
                  className="text-deep-teal border-deep-teal/30 hover:bg-deep-teal/10 text-xs"
                >
                  Explore Mind &amp; Self-Advocacy in Hub →
                </Button>
              )}
              <Button
                onClick={() => setToolkitModalOpen(false)}
                className="bg-raspberry text-white hover:bg-raspberry/90 text-sm ml-auto"
              >
                Close Toolkit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
