"use client";

import React from "react";
import { CheckCircle2, Heart, Users2, Sparkles, Compass, Lightbulb, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StoryView() {
  const pillars = [
    {
      icon: <CheckCircle2 className="w-6 h-6 text-berry" />,
      title: "Always free",
      desc: "Every workshop, interactive article, and lesson is completely free of cost — no paywalls, subscriptions, or hidden charges ever.",
    },
    {
      icon: <Heart className="w-6 h-6 text-berry" />,
      title: "Judgment-free",
      desc: "Every question is a valid question here. We strip away shame, stigma, and clinical intimidation in favor of honest facts.",
    },
    {
      icon: <Users2 className="w-6 h-6 text-berry" />,
      title: "Built on community",
      desc: "Real stories from real youth and clinicians working together, creating an empowering space rather than a dry database.",
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
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-extrabold uppercase tracking-wider text-berry/75 mb-2">
          Our Story
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-berry mb-4">
          Why ReproUs exists
        </h1>
        <p className="text-base md:text-lg text-ink/85 leading-relaxed">
          We started ReproUs because too many young people get their first &quot;real&quot; reproductive health information from an unverified rumor, social media trend, or playground myth. Two educators, one shared frustration, and a clear plan to make sure the next generation never has to guess about their own bodies.
        </p>
      </div>

      {/* Mission & Core Pillars */}
      <div className="text-center">
        <div className="text-xs font-extrabold uppercase tracking-wider text-berry/75 mb-2">
          Our Mission
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-berry mb-4 max-w-2xl mx-auto">
          Free, honest reproductive health education — for anyone who has never had equitable access to it.
        </h2>
        <p className="text-sm md:text-base text-ink/80 max-w-xl mx-auto leading-relaxed mb-10">
          No paywalls, no shame, no gatekeeping. Just clear, medically accurate knowledge and a supportive community built by people who remember exactly what it felt like to have nowhere safe to ask.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {pillars.map((pillar, idx) => (
            <Card key={idx} className="p-7 hover:shadow-hover transition-all">
              <div className="w-12 h-12 rounded-2xl bg-berry/10 flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold text-berry mb-2">{pillar.title}</h3>
              <p className="text-sm text-ink/80 leading-relaxed m-0">{pillar.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <div className="text-center mb-8">
          <div className="text-xs font-extrabold uppercase tracking-wider text-berry/75 mb-2">
            The Journey
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-berry">
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
              <p className="text-sm text-ink/80 leading-relaxed m-0">{step.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
