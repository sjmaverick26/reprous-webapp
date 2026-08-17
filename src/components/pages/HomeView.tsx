"use client";

import React from "react";
import { ArrowRight, Sparkles, BookOpen, HelpCircle, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AccessMini } from "@/components/shared/AccessMini";
import { PageId } from "@/components/layout/Navbar";

interface HomeViewProps {
  onNavigate: (page: PageId, categoryId?: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24">
        {/* Decorative organic background shape clusters */}
        <div
          className="absolute -top-36 -right-24 w-[460px] h-[460px] rounded-full bg-yellow/35 blur-2xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-28 -left-20 w-[300px] h-[300px] rounded-full bg-blush-deep/50 blur-xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1100px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow/40 text-berry font-bold text-xs uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Youth & Communities
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6 max-w-[800px]">
            Your body.<br />
            Your questions.<br />
            <em className="not-italic text-berry bg-gradient-to-t from-yellow-deep/60 to-yellow-deep/60 bg-[length:100%_40%] bg-no-repeat bg-bottom px-1">
              Real
            </em>{" "}
            answers.
          </h1>

          <p className="text-lg md:text-xl text-ink/90 max-w-[540px] leading-relaxed mb-8">
            A learning hub built for curious minds — straight facts on puberty, periods, mental health, and everything in between. No judgment, ever.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
            <Button
              onClick={() => onNavigate("hub")}
              size="lg"
              className="gap-2 shadow-md hover:shadow-lg"
            >
              Explore the Learning Hub
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onNavigate("qa")}
              variant="ghost"
              size="lg"
              className="gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              Ask a question
            </Button>
          </div>

          <AccessMini
            text="No car, no insurance, don't speak English at home? We've got you covered."
            className="shadow-sm"
          />

          {/* Organic 3-shape visual cluster */}
          <div className="relative h-44 w-72 mt-8 hidden sm:block">
            <div className="absolute w-28 h-36 rounded-full bg-yellow-deep/90 left-6 top-3 -rotate-6 shadow-sm" />
            <div className="absolute w-28 h-36 rounded-full bg-blush-deep/90 left-28 top-6 rotate-6 shadow-sm" />
            <div className="absolute w-14 h-18 rounded-full bg-berry left-24 top-12 shadow-sm" />
          </div>
        </div>
      </section>

      {/* Popular Starting Points */}
      <section className="max-w-[1100px] mx-auto px-6 w-full">
        <div className="text-center mb-8">
          <div className="text-xs font-extrabold tracking-wider uppercase text-berry/75 mb-2">
            Jump right in
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-berry">
            Popular starting points
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tile 1: Body Basics */}
          <button
            onClick={() => onNavigate("hub", "body")}
            className="group rounded-3xl bg-cream-card p-7 text-left border-t-4 border-yellow-deep shadow-card hover:shadow-hover hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry"
          >
            <div className="w-12 h-12 rounded-2xl bg-yellow/40 flex items-center justify-center text-berry mb-4 group-hover:bg-yellow transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-berry mb-2 group-hover:underline">
              Body Basics
            </h3>
            <p className="text-sm text-ink/80 leading-relaxed m-0">
              Puberty, anatomy, hormones, and what is actually &quot;normal.&quot;
            </p>
          </button>

          {/* Tile 2: Cycle Sense */}
          <button
            onClick={() => onNavigate("hub", "cycle")}
            className="group rounded-3xl bg-cream-card p-7 text-left border-t-4 border-blush-deep shadow-card hover:shadow-hover hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry"
          >
            <div className="w-12 h-12 rounded-2xl bg-blush-deep/50 flex items-center justify-center text-berry mb-4 group-hover:bg-blush-deep transition-colors">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-berry mb-2 group-hover:underline">
              Cycle Sense
            </h3>
            <p className="text-sm text-ink/80 leading-relaxed m-0">
              Periods, cramps, cycle tracking, and menstrual hygiene basics.
            </p>
          </button>

          {/* Tile 3: Myths & Facts */}
          <button
            onClick={() => onNavigate("myths")}
            className="group rounded-3xl bg-cream-card p-7 text-left border-t-4 border-berry shadow-card hover:shadow-hover hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry"
          >
            <div className="w-12 h-12 rounded-2xl bg-berry/10 flex items-center justify-center text-berry mb-4 group-hover:bg-berry/20 transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-berry mb-2 group-hover:underline">
              Myths &amp; Facts
            </h3>
            <p className="text-sm text-ink/80 leading-relaxed m-0">
              Quick-flip interactive 3D cards busting common misconceptions.
            </p>
          </button>
        </div>
      </section>

      {/* Youth Voices CTA Banner */}
      <section className="max-w-[1100px] mx-auto px-6 w-full">
        <div className="rounded-[28px] bg-berry text-cream-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-cream-card">
              You&apos;re not alone in figuring this out.
            </h2>
            <p className="text-sm md:text-base text-cream-card/90 m-0 leading-relaxed">
              Browse the full Learning Hub, or hear directly from other young people in Youth Voices.
            </p>
          </div>
          <Button
            onClick={() => onNavigate("voices")}
            variant="yellow"
            size="lg"
            className="whitespace-nowrap flex-shrink-0"
          >
            Youth Voices →
          </Button>
        </div>
      </section>
    </div>
  );
}
