"use client";

import React, { useState } from "react";
import { BookOpen, Sparkles, MessageSquare, Compass, Lightbulb, Globe, ExternalLink, CheckCircle2, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageId } from "@/components/layout/Navbar";

interface StoryViewProps {
  onNavigate?: (page: PageId, categoryId?: string) => void;
}

export function StoryView({ onNavigate }: StoryViewProps = {}) {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  const pillars = [
    {
      id: "learn",
      title: "Learn",
      tag: "TEAL PILLAR",
      color: "teal",
      borderClass: "border-2 border-deep-teal",
      topBorder: "border-t-4 border-t-deep-teal",
      cardBg: "bg-white hover:bg-light-teal/20",
      activeRing: "ring-2 ring-deep-teal",
      badgeClass: "bg-light-teal text-deep-teal border-deep-teal/30",
      iconBg: "bg-light-teal text-deep-teal border border-deep-teal/20",
      icon: <BookOpen className="w-6 h-6 text-deep-teal" />,
      titleColor: "text-deep-teal",
      desc: "Understand your body and how it works — including reproductive biology, hormonal cycles, and female athlete physiology.",
    },
    {
      id: "recognize",
      title: "Recognize",
      tag: "CORAL PILLAR",
      color: "coral",
      borderClass: "border-2 border-coral",
      topBorder: "border-t-4 border-t-coral",
      cardBg: "bg-white hover:bg-[#FFE1DB]/20",
      activeRing: "ring-2 ring-coral",
      badgeClass: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
      iconBg: "bg-[#FFE1DB] text-coral border border-coral/30",
      icon: <Sparkles className="w-6 h-6 text-coral" />,
      titleColor: "text-[#B83F68]",
      desc: "Spot symptoms that shouldn't be overlooked or dismissed, such as severe pain, cycle irregularity, PCOS, and RED-S.",
    },
    {
      id: "advocate",
      title: "Advocate",
      tag: "PINK PILLAR",
      color: "pink",
      borderClass: "border-2 border-raspberry",
      topBorder: "border-t-4 border-t-raspberry",
      cardBg: "bg-white hover:bg-soft-pink/20",
      activeRing: "ring-2 ring-raspberry",
      badgeClass: "bg-soft-pink text-raspberry border-raspberry/30",
      iconBg: "bg-soft-pink text-raspberry border border-raspberry/20",
      icon: <MessageSquare className="w-6 h-6 text-raspberry" />,
      titleColor: "text-raspberry",
      desc: "Build the vocabulary, questions, and confidence to prepare for healthcare visits and advocate for the care you deserve.",
    },
  ];

  const timeline = [
    {
      year: "Spark",
      stepNumber: "01",
      borderClass: "border-2 border-deep-teal",
      topBorder: "border-t-4 border-t-deep-teal",
      badgeClass: "bg-light-teal text-deep-teal border-deep-teal/25",
      yearColor: "text-deep-teal",
      iconBg: "bg-light-teal text-deep-teal border border-deep-teal/20",
      icon: <Lightbulb className="w-5 h-5 text-deep-teal" />,
      text: "A workshop we ran for free in a local community center, just to see if anyone would show up. They did, with endless questions.",
    },
    {
      year: "Growth",
      stepNumber: "02",
      borderClass: "border-2 border-coral",
      topBorder: "border-t-4 border-t-coral",
      badgeClass: "bg-[#FFE1DB] text-[#B83F68] border-coral/30",
      yearColor: "text-[#B83F68]",
      iconBg: "bg-[#FFE1DB] text-coral border border-coral/30",
      icon: <Compass className="w-5 h-5 text-coral" />,
      text: "Word spread across high schools and youth groups. We built out a full, modular curriculum instead of one-off sessions.",
    },
    {
      year: "Online",
      stepNumber: "03",
      borderClass: "border-2 border-raspberry",
      topBorder: "border-t-4 border-t-raspberry",
      badgeClass: "bg-soft-pink text-raspberry border-raspberry/25",
      yearColor: "text-raspberry",
      iconBg: "bg-soft-pink text-raspberry border border-raspberry/20",
      icon: <Globe className="w-5 h-5 text-raspberry" />,
      text: "The ReproUs Learn platform went live so anyone, anywhere could access reliable education — not just in-person attendees.",
    },
    {
      year: "Today",
      stepNumber: "04",
      borderClass: "border-2 border-deep-teal",
      topBorder: "border-t-4 border-t-deep-teal",
      badgeClass: "bg-light-teal text-deep-teal border-deep-teal/25",
      yearColor: "text-deep-teal",
      iconBg: "bg-light-teal text-deep-teal border border-deep-teal/20",
      icon: <Sparkles className="w-5 h-5 text-deep-teal" />,
      text: "Free workshops, an ever-expanding multilingual platform, and a growing network of Youth Ambassadors speaking up for their health.",
    },
  ];

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12 flex flex-col gap-20">
      {/* Section 1: Story Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold font-sans uppercase tracking-wider bg-light-teal/50 text-deep-teal border border-deep-teal/25 mb-3.5 shadow-2xs">
          <span>✦ ABOUT REPROUS: OUR STORY &amp; MISSION</span>
        </div>
        <h1 className="text-3xl md:text-[42px] lg:text-[46px] font-bold font-serif text-deep-teal leading-[1.16] tracking-tight mb-4">
          Why ReproUs Exists
        </h1>
        <div className="space-y-3.5 text-center mb-6">
          <p className="text-[17px] md:text-[19px] font-medium text-deep-teal/90 leading-relaxed font-sans max-w-2xl mx-auto m-0">
            Too many girls grow up knowing what a &ldquo;normal&rdquo; period is supposed to look like &mdash; but not what to do when something feels wrong.
          </p>
          <p className="text-[15.5px] md:text-[16.5px] text-charcoal/80 leading-relaxed font-sans max-w-2xl mx-auto m-0">
            For generations, gaps in health research and education have left important questions about girls&apos; and women&apos;s health unanswered, misunderstood, or overlooked. Conditions like PCOS, endometriosis, and the Female Athlete Triad can be difficult to recognize, especially when young people aren&apos;t taught what signs to look for or what questions to ask. We believe understanding your body is the first step toward advocating for your health.
          </p>
        </div>

        {/* Hero Actions: Prominently Differentiated Main CTA */}
        {onNavigate && (
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-1">
            <button
              onClick={() => onNavigate("contact", "ambassador")}
              className="px-6 py-3 rounded-full bg-raspberry text-white font-sans font-bold text-sm md:text-[15px] shadow-md hover:bg-raspberry/90 hover:scale-[1.02] ring-4 ring-raspberry/20 border border-white/20 transition-all flex items-center gap-2 active:scale-95"
            >
              <Award className="w-4 h-4" />
              <span>Become a Youth Ambassador →</span>
            </button>
            <button
              onClick={() => onNavigate("hub")}
              className="px-6 py-3 rounded-full bg-white text-deep-teal font-sans font-bold text-sm md:text-[15px] border-2 border-deep-teal/30 hover:bg-light-teal/40 transition-all flex items-center gap-2 active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-deep-teal" />
              <span>Explore Health Topics (Learn)</span>
            </button>
          </div>
        )}
      </div>

      {/* Section 2: Mission & Core Pillars */}
      <div className="text-center max-w-4xl mx-auto w-full">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold font-sans uppercase tracking-wider bg-[#FFE1DB] text-[#B83F68] border border-coral/30 mb-3.5 shadow-2xs">
          <span>✦ OUR MISSION</span>
        </div>
        <h2 className="text-3xl md:text-[42px] lg:text-[46px] font-bold font-serif text-deep-teal leading-[1.16] tracking-tight mb-4">
          Accessible Education for Every Girl
        </h2>
        <div className="space-y-3.5 text-center mb-8">
          <p className="text-[17px] md:text-[19px] font-medium text-deep-teal/90 leading-relaxed font-sans max-w-2xl mx-auto m-0">
            ReproUs gives girls accessible health education focused on reproductive biology, female athlete physiology, and under-recognized conditions like PCOS and endometriosis.
          </p>
          <p className="text-[15.5px] md:text-[16.5px] text-charcoal/80 leading-relaxed font-sans max-w-2xl mx-auto m-0">
            Through interactive learning, workshops, and self-advocacy tools, we turn complicated health information into knowledge that young people can actually use.
          </p>
        </div>

        {/* Learn · Recognize · Advocate Interactive Buttons with Teal, Coral, and Pink Palette */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setSelectedPillar(selectedPillar === "learn" ? null : "learn")}
            className={`font-sans font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-xs flex items-center gap-2 border-2 ${
              selectedPillar === "learn"
                ? "bg-deep-teal text-white border-deep-teal ring-2 ring-deep-teal/30 scale-105"
                : "bg-white text-deep-teal border-deep-teal hover:bg-light-teal/40"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${selectedPillar === "learn" ? "bg-white" : "bg-deep-teal"}`} />
            <span>LEARN</span>
          </button>

          <span className="text-charcoal/30 hidden sm:inline">✦</span>

          <button
            onClick={() => setSelectedPillar(selectedPillar === "recognize" ? null : "recognize")}
            className={`font-sans font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-xs flex items-center gap-2 border-2 ${
              selectedPillar === "recognize"
                ? "bg-coral text-white border-coral ring-2 ring-coral/30 scale-105"
                : "bg-white text-[#B83F68] border-coral hover:bg-[#FFE1DB]/40"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${selectedPillar === "recognize" ? "bg-white" : "bg-coral"}`} />
            <span>RECOGNIZE</span>
          </button>

          <span className="text-charcoal/30 hidden sm:inline">✦</span>

          <button
            onClick={() => setSelectedPillar(selectedPillar === "advocate" ? null : "advocate")}
            className={`font-sans font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-xs flex items-center gap-2 border-2 ${
              selectedPillar === "advocate"
                ? "bg-raspberry text-white border-raspberry ring-2 ring-raspberry/30 scale-105"
                : "bg-white text-raspberry border-raspberry hover:bg-soft-pink/40"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${selectedPillar === "advocate" ? "bg-white" : "bg-raspberry"}`} />
            <span>ADVOCATE</span>
          </button>
        </div>

        {/* 3 Pillar Cards: White text boxes boldly outlined with Teal, Coral, and Raspberry */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {pillars.map((pillar) => {
            const isHighlighted = selectedPillar === pillar.id;
            const isFaded = selectedPillar !== null && !isHighlighted;

            return (
              <Card
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id === selectedPillar ? null : pillar.id)}
                className={`p-6 md:p-7 transition-all cursor-pointer ${pillar.borderClass} ${pillar.topBorder} ${pillar.cardBg} ${
                  isHighlighted
                    ? `${pillar.activeRing} shadow-lg scale-[1.02]`
                    : isFaded
                    ? "opacity-60"
                    : "shadow-xs hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${pillar.iconBg}`}>
                    {pillar.icon}
                  </div>
                  <span className={`text-[10.5px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${pillar.badgeClass}`}>
                    {pillar.tag}
                  </span>
                </div>
                <h3 className={`text-xl md:text-[22px] font-bold font-serif mb-2 leading-snug ${pillar.titleColor}`}>
                  {pillar.title}
                </h3>
                <p className="text-[15px] md:text-[15.5px] text-charcoal/85 leading-relaxed m-0 font-sans">
                  {pillar.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Section 3: Timeline / The Journey */}
      <div className="text-center max-w-5xl mx-auto w-full">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold font-sans uppercase tracking-wider bg-soft-pink text-raspberry border border-raspberry/25 mb-3.5 shadow-2xs">
          <span>✦ THE JOURNEY</span>
        </div>
        <h2 className="text-3xl md:text-[42px] lg:text-[46px] font-bold font-serif text-deep-teal leading-[1.16] tracking-tight mb-4">
          How ReproUs Grew
        </h2>
        <div className="space-y-3.5 text-center mb-10">
          <p className="text-[17px] md:text-[19px] font-medium text-deep-teal/90 leading-relaxed font-sans max-w-2xl mx-auto m-0">
            From a single free community workshop with endless questions to an expanding nationwide youth education network.
          </p>
          <p className="text-[15.5px] md:text-[16.5px] text-charcoal/80 leading-relaxed font-sans max-w-2xl mx-auto m-0">
            Here is how grassroots curiosity, youth leadership, and evidence-based educational resources came together to build a safe, stigma-free learning space.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {timeline.map((step, idx) => (
            <Card key={idx} className={`p-6 relative bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${step.borderClass} ${step.topBorder}`}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-serif text-xl md:text-[22px] font-bold ${step.yearColor}`}>
                    {step.year}
                  </span>
                  <div className={`p-2 rounded-xl ${step.iconBg}`}>
                    {step.icon}
                  </div>
                </div>
                <span className={`text-[10.5px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border inline-block mb-3 ${step.badgeClass}`}>
                  Phase {step.stepNumber}
                </span>
                <p className="text-[15px] md:text-[15.5px] text-charcoal/85 leading-relaxed m-0 font-sans">
                  {step.text}
                </p>
                {step.stepNumber === "04" && onNavigate && (
                  <button
                    onClick={() => onNavigate("contact", "ambassador")}
                    className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-bold text-deep-teal hover:text-raspberry transition-colors font-sans group pt-2.5 border-t border-deep-teal/15 w-full"
                  >
                    <span>Become a Youth Ambassador</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Section 4: The Gender Research Gap & Clinical Evidence (Background Information) */}
      <div id="research-gap" className="rounded-3xl bg-[#174C4F] text-white p-8 md:p-12 shadow-xl space-y-12">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-widest text-coral mb-3">
            <span className="w-2 h-2 rounded-full bg-coral" />
            <span>✦ BACKGROUND &amp; EVIDENCE: THE GENDER RESEARCH GAP</span>
          </div>
          <h2 className="text-3xl md:text-[42px] lg:text-[46px] font-bold font-serif text-light-teal leading-[1.14] mb-4 tracking-tight">
            What happens when questions aren&apos;t asked?
          </h2>
          <p className="text-[16.5px] md:text-[18px] text-white/90 leading-relaxed font-sans max-w-3xl m-0">
            Until the 1993 NIH Revitalization Act, women and girls were routinely excluded from clinical trials. For generations, medical textbooks, dosage recommendations, and diagnostic criteria were based almost exclusively on male physiology. Today, that enduring data gap directly influences diagnostic delays, medication safety, and how seriously female pain is treated.
          </p>
        </div>

        {/* 3 Evidence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Diagnostic Delays */}
          <div className="rounded-2xl bg-white/10 border border-white/20 p-6 sm:p-7 flex flex-col justify-between shadow-card hover:bg-white/[0.13] transition-all">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-coral font-sans bg-coral/10 px-2.5 py-1 rounded-full border border-coral/30">
                  DIAGNOSTIC DELAYS
                </span>
                <span className="text-xs font-bold text-white/60 font-sans">Avg. 7–10 Years</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3 leading-snug">
                Conditions are minimized as &ldquo;just bad periods.&rdquo;
              </h3>
              <p className="text-[14.5px] text-white/85 leading-relaxed font-sans mb-4">
                Endometriosis takes an average of <strong>7 to 10 years</strong> to be diagnosed, with patients consulting 4 to 5 clinicians. Because heavy menstrual bleeding and debilitating pelvic pain were historically dismissed as emotional or &ldquo;normal,&rdquo; progressive inflammatory damage is often caught late.
              </p>
            </div>
            <div className="pt-4 border-t border-white/15">
              <a
                href="https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/12/dysmenorrhea-and-endometriosis-in-the-adolescent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-coral hover:underline font-sans"
              >
                <span>ACOG Committee Opinion No. 760</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Adverse Drug Reactions */}
          <div className="rounded-2xl bg-white/10 border border-white/20 p-6 sm:p-7 flex flex-col justify-between shadow-card hover:bg-white/[0.13] transition-all">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-coral font-sans bg-coral/10 px-2.5 py-1 rounded-full border border-coral/30">
                  MEDICATION SAFETY
                </span>
                <span className="text-xs font-bold text-white/60 font-sans">2x Adverse Reactions</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3 leading-snug">
                Dosages were tested primarily on male biology.
              </h3>
              <p className="text-[14.5px] text-white/85 leading-relaxed font-sans mb-4">
                Women experience adverse drug reactions at <strong>nearly twice the rate of men</strong>. Because pharmaceutical trials historically excluded female hormonal cycles, differences in gastrointestinal transit, fat distribution, and liver enzyme clearance were overlooked. In 2013, the FDA had to halve the recommended dose of zolpidem for women.
              </p>
            </div>
            <div className="pt-4 border-t border-white/15">
              <a
                href="https://bsd.biomedcentral.com/articles/10.1186/s13293-020-00308-5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-coral hover:underline font-sans"
              >
                <span>Nature / BMC: Sex-Bias in Biomedical Research</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: The Pain Disparity */}
          <div className="rounded-2xl bg-white/10 border border-white/20 p-6 sm:p-7 flex flex-col justify-between shadow-card hover:bg-white/[0.13] transition-all">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-coral font-sans bg-coral/10 px-2.5 py-1 rounded-full border border-coral/30">
                  PAIN TREATMENT GAP
                </span>
                <span className="text-xs font-bold text-white/60 font-sans">+16 Min Wait Time</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3 leading-snug">
                Female pain is more often labeled psychological.
              </h3>
              <p className="text-[14.5px] text-white/85 leading-relaxed font-sans mb-4">
                In a landmark emergency medicine study on acute abdominal pain, women waited an average of <strong>16 minutes longer</strong> to receive analgesia than men presenting with identical pain scores, and were significantly less likely to receive opioid pain relief. Published clinical research demonstrates that female pain is disproportionately categorized as psychogenic or emotional.
              </p>
            </div>
            <div className="pt-4 border-t border-white/15">
              <a
                href="https://onlinelibrary.wiley.com/doi/10.1111/j.1553-2712.2008.00100.x"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-coral hover:underline font-sans"
              >
                <span>Academic Emergency Medicine Study</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Horizontal Pathway: 6 Steps */}
        <div className="pt-6 border-t border-white/15">
          <div className="text-xs uppercase font-bold tracking-wider text-coral mb-5 font-sans flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-coral" />
            <span>The Pathway from Gap to Self-Advocacy:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 lg:gap-2">
            <div className="rounded-xl bg-white/10 border border-white/15 p-4 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-coral uppercase tracking-wider block font-sans mb-1">01</span>
                <h4 className="font-bold text-[14px] text-white tracking-wide font-sans mb-1.5">RESEARCH</h4>
                <p className="text-[12px] text-white/80 font-sans leading-relaxed m-0">Historical biomedical research underrepresented female hormonal cycles.</p>
              </div>
              <div className="hidden md:flex justify-end pt-2 text-coral font-bold text-sm">→</div>
            </div>

            <div className="rounded-xl bg-white/10 border border-white/15 p-4 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-coral uppercase tracking-wider block font-sans mb-1">02</span>
                <h4 className="font-bold text-[14px] text-white tracking-wide font-sans mb-1.5">WHAT WE KNOW</h4>
                <p className="text-[12px] text-white/80 font-sans leading-relaxed m-0">Foundational biology: menstrual cycle length, hormone feedback, and ovulation.</p>
              </div>
              <div className="hidden md:flex justify-end pt-2 text-coral font-bold text-sm">→</div>
            </div>

            <div className="rounded-xl bg-white/10 border border-white/15 p-4 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-coral uppercase tracking-wider block font-sans mb-1">03</span>
                <h4 className="font-bold text-[14px] text-white tracking-wide font-sans mb-1.5">WHAT MAY BE MISSED</h4>
                <p className="text-[12px] text-white/80 font-sans leading-relaxed m-0">Under-researched conditions like Endometriosis, RED-S, and atypical PCOS presentations.</p>
              </div>
              <div className="hidden md:flex justify-end pt-2 text-coral font-bold text-sm">→</div>
            </div>

            <div className="rounded-xl bg-white/10 border border-white/15 p-4 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-coral uppercase tracking-wider block font-sans mb-1">04</span>
                <h4 className="font-bold text-[14px] text-white tracking-wide font-sans mb-1.5">RECOGNIZE SIGNS</h4>
                <p className="text-[12px] text-white/80 font-sans leading-relaxed m-0">Validating that debilitating pain, cycle loss, or extreme fatigue are real medical data.</p>
              </div>
              <div className="hidden md:flex justify-end pt-2 text-coral font-bold text-sm">→</div>
            </div>

            <div className="rounded-xl bg-white/10 border border-white/15 p-4 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-coral uppercase tracking-wider block font-sans mb-1">05</span>
                <h4 className="font-bold text-[14px] text-white tracking-wide font-sans mb-1.5">ASK QUESTIONS</h4>
                <p className="text-[12px] text-white/80 font-sans leading-relaxed m-0">Preparing targeted questions and symptom tracking logs before doctor appointments.</p>
              </div>
              <div className="hidden md:flex justify-end pt-2 text-coral font-bold text-sm">→</div>
            </div>

            <div className="rounded-xl bg-raspberry text-white border border-raspberry p-4 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-[11px] font-bold text-white/90 uppercase tracking-wider block font-sans mb-1">06</span>
                <h4 className="font-bold text-[14px] text-white tracking-wide font-sans mb-1.5">ADVOCATE</h4>
                <p className="text-[12px] text-white/90 font-sans leading-relaxed m-0">Building the vocabulary, evidence, and confidence to be heard by clinicians.</p>
              </div>
              <div className="hidden md:flex justify-end pt-2 text-white">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Peer-Reviewed Citations */}
        <div className="pt-6 border-t border-white/15">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <div className="text-xs uppercase font-bold tracking-wider text-coral font-sans flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-coral" />
              <span>Peer-Reviewed Literature &amp; Institutional Research Citations:</span>
            </div>
            <span className="text-[11px] text-white/60 font-sans italic">
              Educational reference links · Not medical advice
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-sans text-white/90">
            <a
              href="https://orwh.od.nih.gov/sex-gender/nih-policy-sex-biological-variable"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-coral/50 transition-all flex items-start justify-between gap-2 group"
            >
              <div>
                <strong className="text-coral block mb-0.5 group-hover:underline">NIH ORWH Policy</strong>
                <span>Inclusion of Women in Clinical Research &amp; Sex as a Biological Variable Mandate</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-coral shrink-0 mt-0.5" />
            </a>

            <a
              href="https://bsd.biomedcentral.com/articles/10.1186/s13293-020-00308-5"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-coral/50 transition-all flex items-start justify-between gap-2 group"
            >
              <div>
                <strong className="text-coral block mb-0.5 group-hover:underline">Nature / BMC (Zucker &amp; Prendergast)</strong>
                <span>A century of sex-bias in research: how male models impact female health</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-coral shrink-0 mt-0.5" />
            </a>

            <a
              href="https://www.thelancet.com/series/gender-equality-norms-health"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-coral/50 transition-all flex items-start justify-between gap-2 group"
            >
              <div>
                <strong className="text-coral block mb-0.5 group-hover:underline">The Lancet Series</strong>
                <span>Advancing the Science of Women&apos;s Health &amp; Eliminating Evidence Gaps</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-coral shrink-0 mt-0.5" />
            </a>

            <a
              href="https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/12/dysmenorrhea-and-endometriosis-in-the-adolescent"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-coral/50 transition-all flex items-start justify-between gap-2 group"
            >
              <div>
                <strong className="text-coral block mb-0.5 group-hover:underline">ACOG Practice Opinion 760</strong>
                <span>Adolescent Dysmenorrhea &amp; Endometriosis Early Diagnosis Protocols</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-coral shrink-0 mt-0.5" />
            </a>

            <a
              href="https://onlinelibrary.wiley.com/doi/10.1111/j.1553-2712.2008.00100.x"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-coral/50 transition-all flex items-start justify-between gap-2 group"
            >
              <div>
                <strong className="text-coral block mb-0.5 group-hover:underline">Academic Emergency Medicine</strong>
                <span>Gender Disparities in Analgesic Administration &amp; Pain Treatment Delays</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-coral shrink-0 mt-0.5" />
            </a>

            <a
              href="https://www.fda.gov/consumers/womens-health"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-coral/50 transition-all flex items-start justify-between gap-2 group"
            >
              <div>
                <strong className="text-coral block mb-0.5 group-hover:underline">FDA Office of Women&apos;s Health</strong>
                <span>Sex-Specific Dosage Adjustments &amp; Drug Safety in Female Patients</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-coral shrink-0 mt-0.5" />
            </a>
          </div>

          {onNavigate && (
            <div className="mt-10 pt-8 border-t border-white/20 flex flex-col gap-6">
              <div className="text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wider text-coral font-sans mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-coral" />
                    <span>GET INVOLVED &amp; TAKE ACTION</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-serif text-white m-0">
                    Ready to make a difference in youth reproductive health?
                  </h3>
                  <p className="text-[14.5px] text-white/80 font-sans mt-1.5 mb-0 max-w-xl">
                    Join our student leadership cohort, explore evidence-based health topics, or read real stories from peers advocating for their care.
                  </p>
                </div>
              </div>

              {/* Action Buttons Row: Main CTA Visually Distinct from Surrounding Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                {/* PRIMARY MAIN CALL TO ACTION: High-contrast Coral, glowing ring, elevated shadow, larger size */}
                <button
                  onClick={() => onNavigate("contact", "ambassador")}
                  className="px-8 py-4 rounded-full bg-coral text-plum font-sans font-extrabold text-[15.5px] shadow-lg hover:shadow-xl hover:bg-coral-light hover:scale-[1.03] ring-4 ring-coral/30 border-2 border-white/30 transition-all flex items-center gap-2.5 active:scale-95"
                >
                  <Award className="w-5 h-5 text-plum shrink-0" />
                  <span>Become a Youth Ambassador →</span>
                </button>

                {/* SURROUNDING SECONDARY BUTTONS: Clean translucent outlines that visually recede */}
                <button
                  onClick={() => onNavigate("hub")}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans font-semibold text-sm border border-white/30 transition-all flex items-center gap-2 hover:border-white/50 active:scale-95"
                >
                  <BookOpen className="w-4 h-4 text-coral shrink-0" />
                  <span>Explore Health Topics (Learn) →</span>
                </button>

                <button
                  onClick={() => onNavigate("voices")}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans font-semibold text-sm border border-white/30 transition-all flex items-center gap-2 hover:border-white/50 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 text-coral shrink-0" />
                  <span>Read Youth Voices →</span>
                </button>

                <button
                  onClick={() => onNavigate("workshops")}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans font-semibold text-sm border border-white/30 transition-all flex items-center gap-2 hover:border-white/50 active:scale-95"
                >
                  <Compass className="w-4 h-4 text-coral shrink-0" />
                  <span>Book Free Workshops →</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/60 font-sans pt-2 border-t border-white/10">
                <span>All programs and learning resources are 100% free, confidential, and evidence-based.</span>
                <span className="text-coral">Ages 14–24 · Nationwide Student Leadership Network</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
