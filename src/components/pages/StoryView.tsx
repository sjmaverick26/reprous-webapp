"use client";

import React, { useState } from "react";
import { BookOpen, Sparkles, MessageSquare, Compass, Lightbulb, Globe, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StoryView() {
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
      text: "The ReproUs Learning Hub went live so anyone, anywhere could access reliable education — not just in-person attendees.",
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
      text: "Free workshops, an ever-expanding multilingual hub, and a growing network of Youth Ambassadors speaking up for their health.",
    },
  ];

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12 flex flex-col gap-16">
      {/* Story Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-[13px] font-bold font-sans uppercase tracking-wider text-deep-teal mb-2">
          Our Story
        </div>
        <h1 className="text-4xl md:text-[56px] lg:text-[64px] font-normal font-serif text-deep-teal leading-[1.1] mb-6">
          Why ReproUs Exists
        </h1>
        <div className="space-y-4 text-center">
          <p className="text-[18px] md:text-[21px] font-serif text-deep-teal leading-snug max-w-2xl mx-auto">
            Too many girls grow up knowing what a &ldquo;normal&rdquo; period is supposed to look like &mdash; but not what to do when something feels wrong.
          </p>
          <p className="text-[16.5px] md:text-[18px] text-charcoal/80 leading-relaxed font-sans max-w-2xl mx-auto">
            For generations, gaps in health research and education have left important questions about girls&apos; and women&apos;s health unanswered, misunderstood, or overlooked. Conditions like PCOS, endometriosis, and the Female Athlete Triad can be difficult to recognize, especially when young people aren&apos;t taught what signs to look for or what questions to ask. We believe understanding your body is the first step toward advocating for your health.
          </p>
        </div>
      </div>

      {/* Mission & Core Pillars */}
      <div className="text-center">
        <div className="text-[13px] font-bold font-sans uppercase tracking-wider text-deep-teal mb-2">
          Our Mission
        </div>
        <h2 className="text-2xl md:text-[34px] lg:text-[40px] font-normal font-serif text-deep-teal mb-5 max-w-3xl mx-auto leading-[1.2]">
          ReproUs gives girls accessible health education focused on reproductive health, female athlete health, and under-recognized conditions such as PCOS and endometriosis.
        </h2>
        <p className="text-[17px] md:text-[18.5px] text-charcoal/80 max-w-2xl mx-auto leading-relaxed mb-6 font-sans">
          Through interactive learning, workshops, and self-advocacy tools, we turn complicated health information into knowledge that young people can actually use.
        </p>

        {/* Learn · Recognize · Advocate Interactive Buttons with Teal, Coral, and Pink Palette */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
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
                className={`p-7 transition-all cursor-pointer ${pillar.borderClass} ${pillar.topBorder} ${pillar.cardBg} ${
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
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${pillar.badgeClass}`}>
                    {pillar.tag}
                  </span>
                </div>
                <h3 className={`text-2xl md:text-[28px] font-normal font-serif mb-2 leading-snug ${pillar.titleColor}`}>
                  {pillar.title}
                </h3>
                <p className="text-[16px] text-charcoal/85 leading-relaxed m-0 font-sans">
                  {pillar.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Timeline: How ReproUs grew - White text boxes boldly outlined with Teal, Coral, and Raspberry */}
      <div>
        <div className="text-center mb-8">
          <div className="text-[13px] font-bold font-sans uppercase tracking-wider text-deep-teal mb-2">
            The Journey
          </div>
          <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-normal font-serif text-deep-teal leading-[1.15]">
            How ReproUs grew
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {timeline.map((step, idx) => (
            <Card key={idx} className={`p-6 relative bg-white shadow-xs hover:shadow-md transition-all ${step.borderClass} ${step.topBorder}`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`font-serif text-2xl font-bold ${step.yearColor}`}>
                  {step.year}
                </span>
                <div className={`p-2 rounded-xl ${step.iconBg}`}>
                  {step.icon}
                </div>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border inline-block mb-2 ${step.badgeClass}`}>
                Phase {step.stepNumber}
              </span>
              <p className="text-[14.5px] md:text-[15.5px] text-charcoal/80 leading-relaxed m-0 font-sans">
                {step.text}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


