"use client";

import React from "react";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  HelpCircle,
  Flame,
  Heart,
  Calendar,
  Clock,
  MapPin,
  Users,
  MessageSquareHeart,
  Award,
  GraduationCap,
  Mail,
  Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AccessMini } from "@/components/shared/AccessMini";
import { PageId } from "@/components/layout/Navbar";
import { UPCOMING_SESSIONS } from "@/data/workshopsData";

interface HomeViewProps {
  onNavigate: (page: PageId, categoryId?: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-14 md:pt-16 md:pb-20">
        {/* Subtle ambient lighting */}
        <div
          className="absolute -top-36 -right-24 w-[460px] h-[460px] rounded-full bg-light-teal/50 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-28 -left-20 w-[320px] h-[320px] rounded-full bg-soft-pink/40 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1100px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          {/* Eyebrow: ✦ HEALTH EDUCATION · SELF-ADVOCACY (#2F7F7B) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light-teal/70 text-[#2F7F7B] font-bold text-xs uppercase tracking-wider mb-6 border border-[#2F7F7B]/25 shadow-xs font-sans">
            <span className="text-[11px]" aria-hidden="true">✦</span>
            <span>HEALTH EDUCATION · SELF-ADVOCACY</span>
          </div>

          {/* Heading: Know your body. Know what to ask. (#174C4F + #F47C6C) */}
          <h1 className="text-4xl md:text-[64px] lg:text-[72px] font-normal font-serif leading-[1.08] tracking-tight mb-6 max-w-[840px] text-[#174C4F]">
            Know your body.<br />
            Know <span className="text-[#F47C6C]">what to ask.</span>
          </h1>

          <p className="text-[17px] md:text-[19px] text-charcoal/90 max-w-[640px] leading-relaxed mb-8 font-sans">
            Health education for girls — from reproductive health and female athlete health to conditions that are often misunderstood or overlooked.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
            <Button
              onClick={() => onNavigate("hub")}
              size="lg"
              className="bg-raspberry text-white hover:bg-raspberry/90 shadow-md hover:shadow-lg gap-2"
            >
              <span>Explore your health</span>
              <span aria-hidden="true">→</span>
            </Button>
            <Button
              onClick={() => onNavigate("story")}
              variant="plum"
              size="lg"
              className="gap-2 text-[#174C4F] border-2 border-[#174C4F] hover:bg-[#174C4F]/10"
            >
              <span>How ReproUs works</span>
              <span aria-hidden="true">→</span>
            </Button>
          </div>

          {/* Multilingual Access Bar on very light teal with coral globe icon */}
          <AccessMini
            text="Need resources in another language?"
            languages={["English", "Español", "한국어", "Tiếng Việt", "العربية"]}
            className="shadow-sm"
          />
        </div>
      </section>

      {/* First Major Section: TEAL (#174C4F) Statement & Framework Anchor */}
      <section className="max-w-[1100px] mx-auto px-6 w-full">
        <div className="rounded-[36px] bg-[#174C4F] text-white p-8 sm:p-12 md:p-16 shadow-xl relative overflow-hidden">
          {/* Ambient inner teal glow */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#2F7F7B]/25 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl">
            {/* Coral Highlight: LEARN · RECOGNIZE · ADVOCATE */}
            <div className="inline-flex items-center gap-2.5 text-xs md:text-[13px] font-bold tracking-widest uppercase text-[#F47C6C] mb-5 font-sans">
              <span className="w-5 h-[2px] bg-[#F47C6C] inline-block rounded-full" />
              <span>LEARN</span>
              <span className="text-[#F47C6C]/60">·</span>
              <span>RECOGNIZE</span>
              <span className="text-[#F47C6C]/60">·</span>
              <span>ADVOCATE</span>
            </div>

            <h2 className="text-3xl md:text-[44px] lg:text-[52px] font-normal font-serif text-white leading-[1.12] mb-6 tracking-tight">
              You shouldn&apos;t need to become an expert to be taken seriously.
            </h2>

            <p className="text-[17px] md:text-[19px] text-white/90 leading-relaxed font-sans mb-10 max-w-2xl">
              Too many girls and young people are told their pain is &quot;just stress&quot; or that heavy periods are &quot;normal.&quot; ReproUs gives you the clinical backing, practical words, and self-advocacy tools to navigate healthcare with confidence.
            </p>

            {/* 3 Pillars Grid with coral icons & lines */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/15">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#F47C6C] font-bold text-[13px] uppercase tracking-wider font-sans">
                  <BookOpen className="w-4 h-4 text-[#F47C6C]" />
                  <span>01. Learn</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-white mb-1">
                  Honest Physiology
                </h3>
                <p className="text-[14.5px] text-white/80 leading-relaxed font-sans m-0">
                  Clear, stigma-free explanations of how hormones, menstrual phases, and bodily changes work.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#F47C6C] font-bold text-[13px] uppercase tracking-wider font-sans">
                  <Flame className="w-4 h-4 text-[#F47C6C]" />
                  <span>02. Recognize</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-white mb-1">
                  Spot Red Flags
                </h3>
                <p className="text-[14.5px] text-white/80 leading-relaxed font-sans m-0">
                  Validation for symptoms like debilitating cramps, athletic amenorrhea, or androgen imbalances.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#F47C6C] font-bold text-[13px] uppercase tracking-wider font-sans">
                  <Sparkles className="w-4 h-4 text-[#F47C6C]" />
                  <span>03. Advocate</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-white mb-1">
                  Doctor-Ready Language
                </h3>
                <p className="text-[14.5px] text-white/80 leading-relaxed font-sans m-0">
                  Concrete scripts, symptom logs, and confidentiality rights to get taken seriously in clinic visits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Starting Points */}
      <section className="max-w-[1100px] mx-auto px-6 w-full">
        <div className="text-center mb-8">
          <div className="text-[13.5px] font-bold tracking-wider uppercase text-raspberry mb-2">
            Jump right in
          </div>
          <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-normal font-serif text-deep-teal leading-[1.15]">
            Popular starting points
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tile 1: Body Basics */}
          <button
            onClick={() => onNavigate("hub", "body")}
            className="group rounded-3xl bg-white p-7 text-left border border-deep-teal/15 border-t-4 border-t-coral shadow-card hover:shadow-hover hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry"
          >
            <div className="w-12 h-12 rounded-2xl bg-coral/15 flex items-center justify-center text-coral mb-4 group-hover:bg-coral group-hover:text-white transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-[30px] lg:text-[32px] font-normal font-serif text-deep-teal mb-2 group-hover:text-raspberry leading-snug">
              Body Basics
            </h3>
            <p className="text-[17px] text-charcoal/80 leading-relaxed m-0">
              Puberty, anatomy, hormones, and what is actually &quot;normal.&quot;
            </p>
          </button>

          {/* Tile 2: Cycle Sense */}
          <button
            onClick={() => onNavigate("hub", "cycle")}
            className="group rounded-3xl bg-white p-7 text-left border border-deep-teal/15 border-t-4 border-t-raspberry shadow-card hover:shadow-hover hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry"
          >
            <div className="w-12 h-12 rounded-2xl bg-raspberry/10 flex items-center justify-center text-raspberry mb-4 group-hover:bg-raspberry group-hover:text-white transition-colors">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-[30px] lg:text-[32px] font-normal font-serif text-deep-teal mb-2 group-hover:text-raspberry leading-snug">
              Cycle Sense
            </h3>
            <p className="text-[17px] text-charcoal/80 leading-relaxed m-0">
              Periods, cramps, cycle tracking, and menstrual hygiene basics.
            </p>
          </button>

          {/* Tile 3: Myths & Facts */}
          <button
            onClick={() => onNavigate("myths")}
            className="group rounded-3xl bg-white p-7 text-left border border-deep-teal/15 border-t-4 border-t-deep-teal shadow-card hover:shadow-hover hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry"
          >
            <div className="w-12 h-12 rounded-2xl bg-deep-teal/10 flex items-center justify-center text-deep-teal mb-4 group-hover:bg-deep-teal group-hover:text-white transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-[30px] lg:text-[32px] font-normal font-serif text-deep-teal mb-2 group-hover:text-raspberry leading-snug">
              Myths &amp; Facts
            </h3>
            <p className="text-[17px] text-charcoal/80 leading-relaxed m-0">
              Quick-flip interactive 3D cards busting common misconceptions.
            </p>
          </button>
        </div>
      </section>

      {/* Specialized Health Focus Areas */}
      <section className="max-w-[1100px] mx-auto px-6 w-full">
        <div className="text-center mb-8">
          <div className="text-[13.5px] font-bold tracking-wider uppercase text-raspberry mb-2">
            Specialized Care &amp; Health Focus
          </div>
          <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-normal font-serif text-deep-teal leading-[1.15]">
            Tailored health for every body
          </h2>
          <p className="text-[17px] md:text-[18px] text-charcoal/80 max-w-xl mx-auto mt-2 mb-0 font-sans">
            Dedicated guides covering athletic training, hormonal cycles, and chronic pelvic pain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Female Athlete Health */}
          <button
            onClick={() => onNavigate("hub", "play")}
            className="group rounded-3xl bg-light-teal/55 p-7 text-left border border-deep-teal/20 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-bold font-sans uppercase tracking-wider mb-4 border border-deep-teal/20 text-deep-teal bg-white/80">
                <span className="w-2 h-2 rounded-full bg-deep-teal inline-block" />
                Female Athlete Health
              </div>
              <h3 className="text-2xl md:text-[30px] lg:text-[32px] font-normal font-serif text-deep-teal mb-2 group-hover:text-raspberry leading-snug">
                Play Strong · Athlete Health
              </h3>
              <p className="text-[17px] text-charcoal/85 leading-relaxed mb-4">
                Cycle-aware athletic training, sports nutrition, RED-S prevention, and fueling active bodies.
              </p>
            </div>
            <div className="flex items-center justify-between text-[14px] font-semibold text-deep-teal pt-3 border-t border-deep-teal/15 group-hover:text-raspberry transition-colors">
              <span>4 Topics &amp; Quizzes</span>
              <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Section →
              </span>
            </div>
          </button>

          {/* Card 2: PCOS & Hormonal Health */}
          <button
            onClick={() => onNavigate("hub", "pcos")}
            className="group rounded-3xl bg-soft-pink/45 p-7 text-left border border-raspberry/20 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-bold font-sans uppercase tracking-wider mb-4 border border-raspberry/20 text-deep-teal bg-white/80">
                <span className="w-2 h-2 rounded-full bg-raspberry inline-block" />
                PCOS &amp; Hormonal Health
              </div>
              <h3 className="text-2xl md:text-[30px] lg:text-[32px] font-normal font-serif text-deep-teal mb-2 group-hover:text-raspberry leading-snug">
                PCOS &amp; Hormones
              </h3>
              <p className="text-[17px] text-charcoal/85 leading-relaxed mb-4">
                Understanding androgens, insulin resistance, irregular cycles, and evidence-based lifestyle balance.
              </p>
            </div>
            <div className="flex items-center justify-between text-[14px] font-semibold text-deep-teal pt-3 border-t border-raspberry/15 group-hover:text-raspberry transition-colors">
              <span>4 Topics &amp; Games</span>
              <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Section →
              </span>
            </div>
          </button>

          {/* Card 3: Endometriosis & Reproductive Pain */}
          <button
            onClick={() => onNavigate("hub", "endo")}
            className="group rounded-3xl bg-light-teal/55 p-7 text-left border border-deep-teal/20 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-bold font-sans uppercase tracking-wider mb-4 border border-deep-teal/20 text-deep-teal bg-white/80">
                <span className="w-2 h-2 rounded-full bg-coral inline-block" />
                Endometriosis &amp; Pain
              </div>
              <h3 className="text-2xl md:text-[30px] lg:text-[32px] font-normal font-serif text-deep-teal mb-2 group-hover:text-raspberry leading-snug">
                Endometriosis &amp; Pelvic Pain
              </h3>
              <p className="text-[17px] text-charcoal/85 leading-relaxed mb-4">
                Validating severe cramps, adenomyosis, pain navigation, and how to advocate for yourself with clinicians.
              </p>
            </div>
            <div className="flex items-center justify-between text-[14px] font-semibold text-deep-teal pt-3 border-t border-deep-teal/15 group-hover:text-raspberry transition-colors">
              <span>4 Topics &amp; Guides</span>
              <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Section →
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* UPCOMING / LATEST WORKSHOPS SECTION */}
      <section className="max-w-[1100px] mx-auto px-6 w-full">
        <div className="rounded-[32px] bg-soft-pink/30 border border-deep-teal/15 p-8 md:p-12 shadow-card">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light-teal text-deep-teal text-[13px] font-bold font-sans uppercase tracking-wider mb-2.5 border border-deep-teal/20">
                <Calendar className="w-3.5 h-3.5 text-coral" />
                Latest &amp; Upcoming Workshops
              </div>
              <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-normal font-serif text-deep-teal leading-[1.15]">
                Join a free, honest workshop
              </h2>
              <p className="text-[17px] md:text-[18px] text-charcoal/80 max-w-xl mt-2 mb-0 font-sans">
                Interactive, non-judgmental sessions led by youth educators. Reserve your free spot or view full workshop agendas.
              </p>
            </div>

            <Button
              onClick={() => onNavigate("workshops")}
              variant="default"
              className="bg-raspberry text-white hover:bg-raspberry/90 gap-2 self-start md:self-end whitespace-nowrap shadow-sm"
            >
              See All Workshops
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UPCOMING_SESSIONS.slice(0, 3).map((session) => (
              <Card
                key={session.id}
                className="p-6 bg-white border border-deep-teal/15 flex flex-col justify-between hover:shadow-hover hover:-translate-y-0.5 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-serif text-2xl font-bold text-deep-teal">
                      {session.date}
                    </span>
                    <span
                      className={`text-[12px] font-bold px-2.5 py-0.5 rounded-full ${
                        session.isOnline
                          ? "bg-light-teal text-deep-teal border border-deep-teal/20"
                          : "bg-soft-pink text-deep-teal border border-raspberry/20"
                      }`}
                    >
                      {session.isOnline ? "🌐 Virtual Zoom" : "📍 In Person"}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-deep-teal mb-2 line-clamp-2 leading-snug">
                    {session.topic}
                  </h3>

                  <div className="space-y-1.5 text-[14px] text-charcoal/80 mb-5 font-sans">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-raspberry flex-shrink-0" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-raspberry flex-shrink-0" />
                      <span className="truncate">{session.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-deep-teal/10 flex flex-col gap-2">
                  <div className="text-[13px] font-semibold text-charcoal/65 text-center font-sans">
                    {session.spotsLeft} • 100% Free
                  </div>
                  <Button
                    onClick={() => onNavigate("workshops")}
                    variant="ghost"
                    className="w-full text-[14px] font-semibold gap-1.5 bg-light-teal/50 text-deep-teal border border-deep-teal/15 hover:bg-raspberry hover:text-white hover:border-transparent transition-colors"
                  >
                    Reserve on Workshop Page →
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-deep-teal/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[14px] text-charcoal/75 font-sans">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-coral flex-shrink-0" />
              <span>Need snacks, transportation assistance, or accommodations? All provided free.</span>
            </div>
            <button
              onClick={() => onNavigate("workshops")}
              className="font-bold text-raspberry hover:underline inline-flex items-center gap-1"
            >
              Request a workshop for your school or club →
            </button>
          </div>
        </div>
      </section>

      {/* Youth Voices CTA Banner */}
      <section className="max-w-[1100px] mx-auto px-6 w-full">
        <div className="rounded-[28px] bg-deep-teal text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-[42px] lg:text-[48px] font-normal font-serif mb-3 text-white leading-[1.15]">
              You&apos;re not alone in figuring this out.
            </h2>
            <p className="text-[17px] md:text-[18px] text-white/90 m-0 leading-relaxed font-sans">
              Browse Learn topics, or hear directly from other young people in Youth Voices.
            </p>
          </div>
          <Button
            onClick={() => onNavigate("voices")}
            variant="coral"
            size="lg"
            className="whitespace-nowrap flex-shrink-0 font-bold"
          >
            Youth Voices →
          </Button>
        </div>
      </section>

      {/* CONTACT US / JOIN US SECTION (At the bottom of Home Page) */}
      <section className="max-w-[1100px] mx-auto px-6 w-full">
        <div className="text-center mb-10">
          <div className="text-[13.5px] font-bold tracking-wider uppercase text-raspberry mb-2">
            Get Involved
          </div>
          <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-normal font-serif text-deep-teal mb-3 leading-[1.15]">
            Contact Us &amp; Join the Movement
          </h2>
          <p className="text-[17px] md:text-[18px] text-charcoal/80 max-w-xl mx-auto m-0 font-sans">
            ReproUs is fueled by youth, educators, and allies. Discover how you can take part today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Action 1: Youth Ambassador */}
          <Card className="p-6 flex flex-col justify-between bg-white border border-deep-teal/15 hover:border-coral hover:shadow-hover hover:-translate-y-1 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-coral/15 flex items-center justify-center text-coral mb-4">
                <Award className="w-5 h-5 text-coral" />
              </div>
              <h3 className="text-xl md:text-[22px] font-normal font-serif text-deep-teal mb-2 leading-snug">
                Become Youth Ambassador
              </h3>
              <p className="text-[14px] text-charcoal/80 leading-relaxed mb-4 font-sans">
                Lead peer education at your school, earn service hours, and receive direct clinical mentorship.
              </p>
            </div>
            <Button
              onClick={() => onNavigate("contact")}
              variant="outline"
              className="w-full text-[14px] font-semibold"
            >
              Apply to Ambassador →
            </Button>
          </Card>

          {/* Action 2: Program Feedback */}
          <Card className="p-6 flex flex-col justify-between bg-white border border-deep-teal/15 hover:border-raspberry hover:shadow-hover hover:-translate-y-1 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-soft-pink/50 flex items-center justify-center text-raspberry mb-4">
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-[22px] font-normal font-serif text-deep-teal mb-2 leading-snug">
                Program Feedback
              </h3>
              <p className="text-[14px] text-charcoal/80 leading-relaxed mb-4 font-sans">
                Tell us how we can make our articles and workshops even better. 100% anonymous option available.
              </p>
            </div>
            <Button
              onClick={() => onNavigate("contact")}
              variant="outline"
              className="w-full text-[14px] font-semibold"
            >
              Give Feedback →
            </Button>
          </Card>

          {/* Action 3: School Visits */}
          <Card className="p-6 flex flex-col justify-between bg-white border border-deep-teal/15 hover:border-deep-teal hover:shadow-hover hover:-translate-y-1 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-light-teal flex items-center justify-center text-deep-teal mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-[22px] font-normal font-serif text-deep-teal mb-2 leading-snug">
                Bring Us to Your School
              </h3>
              <p className="text-[14px] text-charcoal/80 leading-relaxed mb-4 font-sans">
                Request a customized, free workshop for your classroom, student club, or youth group.
              </p>
            </div>
            <Button
              onClick={() => onNavigate("workshops")}
              variant="outline"
              className="w-full text-[14px] font-semibold"
            >
              Request a Visit →
            </Button>
          </Card>

          {/* Action 4: Direct Message / Outreach */}
          <Card className="p-6 flex flex-col justify-between bg-white border border-deep-teal/15 hover:border-coral hover:shadow-hover hover:-translate-y-1 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-coral/15 flex items-center justify-center text-coral mb-4">
                <Mail className="w-5 h-5 text-coral" />
              </div>
              <h3 className="text-xl md:text-[22px] font-normal font-serif text-deep-teal mb-2 leading-snug">
                General Inquiries
              </h3>
              <p className="text-[14px] text-charcoal/80 leading-relaxed mb-4 font-sans">
                Questions about partnerships, media, or clinic listings? Send our coordination team a message.
              </p>
            </div>
            <Button
              onClick={() => onNavigate("contact")}
              variant="outline"
              className="w-full text-[14px] font-semibold"
            >
              Contact Our Team →
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
