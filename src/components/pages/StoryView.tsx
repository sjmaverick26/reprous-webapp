"use client";

import React from "react";
import { BookOpen, Sparkles, MessageSquare, Compass, Lightbulb, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StoryView() {
  const pillars = [
    {
      icon: <BookOpen className="w-6 h-6 text-berry" />,
      title: "Learn",
      desc: "Understand your body and how it works — including reproductive biology, hormonal cycles, and female athlete physiology.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-berry" />,
      title: "Recognize",
      desc: "Spot symptoms that shouldn't be overlooked or dismissed, such as severe pain, cycle irregularity, PCOS, and RED-S.",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-berry" />,
      title: "Advocate",
      desc: "Build the vocabulary, questions, and confidence to prepare for healthcare visits and advocate for the care you deserve.",
    },
  ];

  const timeline = [
    {
      year: "Spark",
      icon: <Lightbulb className="w-5 h-5 text-yellow-deep" />,
      text: "A workshop we ran for free in a local community center, just to see if anyone would show up. They did, with endless questions.",
    },
    {
      year: "Growth",
      icon: <Compass className="w-5 h-5 text-berry" />,
      text: "Word spread across high schools and youth groups. We built out a full, modular curriculum instead of one-off sessions.",
    },
    {
      year: "Online",
      icon: <Globe className="w-5 h-5 text-yellow-deep" />,
      text: "The ReproUs Learning Hub went live so anyone, anywhere could access reliable education — not just in-person attendees.",
    },
    {
      year: "Today",
      icon: <Sparkles className="w-5 h-5 text-berry" />,
      text: "Free workshops, an ever-expanding multilingual hub, and a growing network of Youth Ambassadors speaking up for their health.",
    },
  ];

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12 flex flex-col gap-16">
      {/* Story Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="text-[13px] font-bold font-sans uppercase tracking-wider text-berry mb-2">
          Our Story
        </div>
        <h1 className="text-4xl md:text-[56px] lg:text-[64px] font-normal font-serif text-plum leading-[1.1] mb-6">
          Why ReproUs Exists
        </h1>
        <div className="space-y-4 text-center">
          <p className="text-[18px] md:text-[21px] font-serif text-plum leading-snug max-w-2xl mx-auto">
            Too many girls grow up knowing what a &ldquo;normal&rdquo; period is supposed to look like &mdash; but not what to do when something feels wrong.
          </p>
          <p className="text-[16.5px] md:text-[18px] text-ink/80 leading-relaxed font-sans max-w-2xl mx-auto">
            For generations, gaps in health research and education have left important questions about girls&apos; and women&apos;s health unanswered, misunderstood, or overlooked. Conditions like PCOS, endometriosis, and the Female Athlete Triad can be difficult to recognize, especially when young people aren&apos;t taught what signs to look for or what questions to ask. We believe understanding your body is the first step toward advocating for your health.
          </p>
        </div>
      </div>

      {/* Mission & Core Pillars */}
      <div className="text-center">
        <div className="text-[13px] font-bold font-sans uppercase tracking-wider text-berry mb-2">
          Our Mission
        </div>
        <h2 className="text-2xl md:text-[34px] lg:text-[40px] font-normal font-serif text-plum mb-5 max-w-3xl mx-auto leading-[1.2]">
          ReproUs gives girls accessible health education focused on reproductive health, female athlete health, and under-recognized conditions such as PCOS and endometriosis.
        </h2>
        <p className="text-[17px] md:text-[18.5px] text-ink/80 max-w-2xl mx-auto leading-relaxed mb-6 font-sans">
          Through interactive learning, workshops, and self-advocacy tools, we turn complicated health information into knowledge that young people can actually use.
        </p>

        {/* Learn · Recognize · Advocate Highlight */}
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/90 border border-coral/40 shadow-xs mb-12">
          <span className="font-sans font-bold text-xs uppercase tracking-wider text-coral flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-coral" />
            <span>LEARN</span>
          </span>
          <span className="text-coral/40">✦</span>
          <span className="font-sans font-bold text-xs uppercase tracking-wider text-coral flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-coral" />
            <span>RECOGNIZE</span>
          </span>
          <span className="text-coral/40">✦</span>
          <span className="font-sans font-bold text-xs uppercase tracking-wider text-coral flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-coral" />
            <span>ADVOCATE</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {pillars.map((pillar, idx) => (
            <Card key={idx} className="p-7 hover:shadow-hover transition-all border border-berry/10">
              <div className="w-12 h-12 rounded-2xl bg-berry/10 flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-2xl md:text-[30px] font-normal font-serif text-plum mb-2 leading-snug">{pillar.title}</h3>
              <p className="text-[17px] text-ink/80 leading-relaxed m-0 font-sans">{pillar.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <div className="text-center mb-8">
          <div className="text-[13px] font-bold font-sans uppercase tracking-wider text-berry mb-2">
            The Journey
          </div>
          <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-normal font-serif text-plum leading-[1.15]">
            How ReproUs grew
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {timeline.map((step, idx) => (
            <Card key={idx} className="p-6 relative border-t-2 border-yellow-deep">
              <div className="flex items-center justify-between mb-3">
                <span className="font-serif text-2xl font-bold text-berry">
                  {step.year}
                </span>
                <div className="p-2 rounded-xl bg-blush-deep/40">{step.icon}</div>
              </div>
              <p className="text-[15px] md:text-[16px] text-ink/80 leading-relaxed m-0 font-sans">{step.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
