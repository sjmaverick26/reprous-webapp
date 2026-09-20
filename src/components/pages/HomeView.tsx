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
            Empowering Youth &amp; Communities
          </div>

          <h1 className="text-4xl md:text-[64px] lg:text-[72px] font-normal font-serif leading-[1.08] tracking-tight mb-6 max-w-[800px] text-plum">
            Your body.<br />
            Your questions.<br />
            <em className="not-italic text-plum bg-gradient-to-t from-gold to-gold bg-[length:100%_40%] bg-no-repeat bg-bottom px-1">
              Real
            </em>{" "}
            answers.
          </h1>

          <p className="text-lg md:text-[19px] text-ink/90 max-w-[560px] leading-relaxed mb-8 font-sans">
            A learning hub built for curious minds — straight facts on puberty, periods, mental health, and everything in between. No judgment, ever.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
            <Button
              onClick={() => onNavigate("hub")}
              size="lg"
              className="gap-2 shadow-md hover:shadow-lg"
            >
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onNavigate("story")}
              variant="ghost"
              size="lg"
              className="gap-2"
            >
              <Heart className="w-4 h-4" />
              Our Story
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
            <div className="absolute w-28 h-36 rounded-full bg-gold left-6 top-3 -rotate-6 shadow-sm" />
            <div className="absolute w-28 h-36 rounded-full bg-dusty-rose left-28 top-6 rotate-6 shadow-sm" />
            <div className="absolute w-14 h-18 rounded-full bg-berry left-24 top-12 shadow-sm" />
          </div>
        </div>
      </section>

      {/* Popular Starting Points */}
      <section className="max-w-[1100px] mx-auto px-6 w-full">
        <div className="text-center mb-8">
          <div className="text-[13.5px] font-bold tracking-wider uppercase text-berry mb-2">
            Jump right in
          </div>
          <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-normal font-serif text-plum leading-[1.15]">
            Popular starting points
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tile 1: Body Basics */}
          <button
            onClick={() => onNavigate("hub", "body")}
            className="group rounded-3xl bg-cream-card p-7 text-left border-t-4 border-gold shadow-card hover:shadow-hover hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry"
          >
            <div className="w-12 h-12 rounded-2xl bg-gold/30 flex items-center justify-center text-plum mb-4 group-hover:bg-gold transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-[30px] lg:text-[32px] font-normal font-serif text-plum mb-2 group-hover:text-berry leading-snug">
              Body Basics
            </h3>
            <p className="text-[17px] text-ink/80 leading-relaxed m-0">
              Puberty, anatomy, hormones, and what is actually &quot;normal.&quot;
            </p>
          </button>

          {/* Tile 2: Cycle Sense */}
          <button
            onClick={() => onNavigate("hub", "cycle")}
            className="group rounded-3xl bg-cream-card p-7 text-left border-t-4 border-dusty-rose shadow-card hover:shadow-hover hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry"
          >
            <div className="w-12 h-12 rounded-2xl bg-dusty-rose/30 flex items-center justify-center text-plum mb-4 group-hover:bg-dusty-rose transition-colors">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-[30px] lg:text-[32px] font-normal font-serif text-plum mb-2 group-hover:text-berry leading-snug">
              Cycle Sense
            </h3>
            <p className="text-[17px] text-ink/80 leading-relaxed m-0">
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
            <h3 className="text-2xl md:text-[30px] lg:text-[32px] font-normal font-serif text-plum mb-2 group-hover:text-berry leading-snug">
              Myths &amp; Facts
            </h3>
            <p className="text-[17px] text-ink/80 leading-relaxed m-0">
              Quick-flip interactive 3D cards busting common misconceptions.
            </p>
          </button>
        </div>
      </section>

      {/* Specialized Health Focus Areas (Athlete #A8B7A1, PCOS #E8DFEA, Endometriosis #D99AAA) */}
      <section className="max-w-[1100px] mx-auto px-6 w-full">
        <div className="text-center mb-8">
          <div className="text-[13.5px] font-bold tracking-wider uppercase text-berry mb-2">
            Specialized Care &amp; Health Focus
          </div>
          <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-normal font-serif text-plum leading-[1.15]">
            Tailored health for every body
          </h2>
          <p className="text-[17px] md:text-[18px] text-ink/80 max-w-xl mx-auto mt-2 mb-0 font-sans">
            Dedicated guides covering athletic training, hormonal cycles, and chronic pelvic pain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Female Athlete Health (#A8B7A1 SAGE) */}
          <button
            onClick={() => onNavigate("hub", "play")}
            className="group rounded-3xl bg-cream-card p-7 text-left border-2 border-sage/60 hover:border-sage shadow-card hover:shadow-hover hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry flex flex-col justify-between"
            style={{ backgroundColor: "#FAFCF9" }}
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-bold font-sans uppercase tracking-wider mb-4 border border-sage text-plum bg-sage/30">
                <span className="w-2 h-2 rounded-full bg-sage inline-block" />
                Female Athlete Health
              </div>
              <h3 className="text-2xl md:text-[30px] lg:text-[32px] font-normal font-serif text-plum mb-2 group-hover:text-berry leading-snug">
                Play Strong · Athlete Health
              </h3>
              <p className="text-[17px] text-ink/80 leading-relaxed mb-4">
                Cycle-aware athletic training, sports nutrition, RED-S prevention, and fueling active bodies.
              </p>
            </div>
            <div className="flex items-center justify-between text-[14px] font-semibold text-berry pt-3 border-t border-sage/30">
              <span>4 Topics &amp; Quizzes</span>
              <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Section →
              </span>
            </div>
          </button>

          {/* Card 2: PCOS & Hormonal Health (#E8DFEA LAVENDER) */}
          <button
            onClick={() => onNavigate("hub", "pcos")}
            className="group rounded-3xl bg-cream-card p-7 text-left border-2 border-[#D3C2D7] hover:border-lavender shadow-card hover:shadow-hover hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry flex flex-col justify-between"
            style={{ backgroundColor: "#FBF8FC" }}
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-bold font-sans uppercase tracking-wider mb-4 border border-[#D3C2D7] text-plum bg-lavender">
                <span className="w-2 h-2 rounded-full bg-[#B8A4BF] inline-block" />
                PCOS &amp; Hormonal Health
              </div>
              <h3 className="text-2xl md:text-[30px] lg:text-[32px] font-normal font-serif text-plum mb-2 group-hover:text-berry leading-snug">
                PCOS &amp; Hormones
              </h3>
              <p className="text-[17px] text-ink/80 leading-relaxed mb-4">
                Understanding androgens, insulin resistance, irregular cycles, and evidence-based lifestyle balance.
              </p>
            </div>
            <div className="flex items-center justify-between text-[14px] font-semibold text-berry pt-3 border-t border-[#D3C2D7]">
              <span>4 Topics &amp; Games</span>
              <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Section →
              </span>
            </div>
          </button>

          {/* Card 3: Endometriosis & Reproductive Pain (#D99AAA DUSTY ROSE) */}
          <button
            onClick={() => onNavigate("hub", "endo")}
            className="group rounded-3xl bg-cream-card p-7 text-left border-2 border-dusty-rose/70 hover:border-dusty-rose shadow-card hover:shadow-hover hover:-translate-y-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry flex flex-col justify-between"
            style={{ backgroundColor: "#FCF7F8" }}
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-bold font-sans uppercase tracking-wider mb-4 border border-dusty-rose text-plum bg-dusty-rose/30">
                <span className="w-2 h-2 rounded-full bg-dusty-rose inline-block" />
                Endometriosis &amp; Pain
              </div>
              <h3 className="text-2xl md:text-[30px] lg:text-[32px] font-normal font-serif text-plum mb-2 group-hover:text-berry leading-snug">
                Endometriosis &amp; Pelvic Pain
              </h3>
              <p className="text-[17px] text-ink/80 leading-relaxed mb-4">
                Validating severe cramps, adenomyosis, pain navigation, and how to advocate for yourself with clinicians.
              </p>
            </div>
            <div className="flex items-center justify-between text-[14px] font-semibold text-berry pt-3 border-t border-dusty-rose/40">
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
        <div className="rounded-[32px] bg-gradient-to-br from-cream-card via-cream-card to-ivory border border-berry/10 p-8 md:p-12 shadow-card">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-berry/10 text-berry text-[13px] font-bold font-sans uppercase tracking-wider mb-2.5 border border-berry/20">
                <Calendar className="w-3.5 h-3.5" />
                Latest &amp; Upcoming Workshops
              </div>
              <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-normal font-serif text-plum leading-[1.15]">
                Join a free, honest workshop
              </h2>
              <p className="text-[17px] md:text-[18px] text-ink/80 max-w-xl mt-2 mb-0 font-sans">
                Interactive, non-judgmental sessions led by youth educators. Reserve your free spot or view full workshop agendas.
              </p>
            </div>

            <Button
              onClick={() => onNavigate("workshops")}
              variant="default"
              className="gap-2 self-start md:self-end whitespace-nowrap shadow-sm"
            >
              See All Workshops
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UPCOMING_SESSIONS.slice(0, 3).map((session) => (
              <Card
                key={session.id}
                className="p-6 bg-cream-card border border-berry/15 flex flex-col justify-between hover:shadow-hover hover:-translate-y-0.5 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-serif text-2xl font-bold text-berry">
                      {session.date}
                    </span>
                    <span
                      className={`text-[12px] font-bold px-2.5 py-0.5 rounded-full ${
                        session.isOnline
                          ? "bg-blue-100 text-blue-900 border border-blue-200"
                          : "bg-yellow/50 text-berry border border-yellow-deep/30"
                      }`}
                    >
                      {session.isOnline ? "🌐 Virtual Zoom" : "📍 In Person"}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-plum mb-2 line-clamp-2 leading-snug">
                    {session.topic}
                  </h3>

                  <div className="space-y-1.5 text-[14px] text-ink/80 mb-5 font-sans">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-berry flex-shrink-0" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-berry flex-shrink-0" />
                      <span className="truncate">{session.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-berry/10 flex flex-col gap-2">
                  <div className="text-[13px] font-semibold text-ink/65 text-center font-sans">
                    {session.spotsLeft} • 100% Free
                  </div>
                  <Button
                    onClick={() => onNavigate("workshops")}
                    variant="ghost"
                    className="w-full text-[14px] font-semibold gap-1.5 bg-blush/60 hover:bg-berry hover:text-cream-card transition-colors"
                  >
                    Reserve on Workshop Page →
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-berry/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[14px] text-ink/75 font-sans">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-deep flex-shrink-0" />
              <span>Need snacks, transportation assistance, or accommodations? All provided free.</span>
            </div>
            <button
              onClick={() => onNavigate("workshops")}
              className="font-bold text-berry hover:underline inline-flex items-center gap-1"
            >
              Request a workshop for your school or club →
            </button>
          </div>
        </div>
      </section>

      {/* Youth Voices CTA Banner */}
      <section className="max-w-[1100px] mx-auto px-6 w-full">
        <div className="rounded-[28px] bg-berry text-cream-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-[42px] lg:text-[48px] font-normal font-serif mb-3 text-cream-card leading-[1.15]">
              You&apos;re not alone in figuring this out.
            </h2>
            <p className="text-[17px] md:text-[18px] text-cream-card/90 m-0 leading-relaxed font-sans">
              Browse Learn topics, or hear directly from other young people in Youth Voices.
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

      {/* CONTACT US / JOIN US SECTION (At the bottom of Home Page) */}
      <section className="max-w-[1100px] mx-auto px-6 w-full">
        <div className="text-center mb-10">
          <div className="text-[13.5px] font-bold tracking-wider uppercase text-berry mb-2">
            Get Involved
          </div>
          <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-normal font-serif text-plum mb-3 leading-[1.15]">
            Contact Us &amp; Join the Movement
          </h2>
          <p className="text-[17px] md:text-[18px] text-ink/80 max-w-xl mx-auto m-0 font-sans">
            ReproUs is fueled by youth, educators, and allies. Discover how you can take part today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Action 1: Youth Ambassador */}
          <Card className="p-6 flex flex-col justify-between bg-cream-card border-2 border-gold/60 hover:border-gold hover:shadow-hover hover:-translate-y-1 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-gold/30 flex items-center justify-center text-plum mb-4">
                <Award className="w-5 h-5 text-berry" />
              </div>
              <h3 className="text-xl md:text-[22px] font-normal font-serif text-plum mb-2 leading-snug">
                Become Youth Ambassador
              </h3>
              <p className="text-[14px] text-ink/80 leading-relaxed mb-4 font-sans">
                Lead peer education at your school, earn service hours, and receive direct clinical mentorship.
              </p>
            </div>
            <Button
              onClick={() => onNavigate("contact")}
              variant="ghost"
              className="w-full text-[14px] font-semibold"
            >
              Apply to Ambassador →
            </Button>
          </Card>

          {/* Action 2: Program Feedback */}
          <Card className="p-6 flex flex-col justify-between bg-cream-card border border-berry/10 hover:shadow-hover hover:-translate-y-1 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-dusty-rose/30 flex items-center justify-center text-berry mb-4">
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-[22px] font-normal font-serif text-plum mb-2 leading-snug">
                Program Feedback
              </h3>
              <p className="text-[14px] text-ink/80 leading-relaxed mb-4 font-sans">
                Tell us how we can make our articles and workshops even better. 100% anonymous option available.
              </p>
            </div>
            <Button
              onClick={() => onNavigate("contact")}
              variant="ghost"
              className="w-full text-[14px] font-semibold"
            >
              Give Feedback →
            </Button>
          </Card>

          {/* Action 3: School Visits */}
          <Card className="p-6 flex flex-col justify-between bg-cream-card border border-berry/10 hover:shadow-hover hover:-translate-y-1 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-berry/10 flex items-center justify-center text-berry mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-[22px] font-normal font-serif text-plum mb-2 leading-snug">
                Bring Us to Your School
              </h3>
              <p className="text-[14px] text-ink/80 leading-relaxed mb-4 font-sans">
                Request a customized, free workshop for your classroom, student club, or youth group.
              </p>
            </div>
            <Button
              onClick={() => onNavigate("workshops")}
              variant="ghost"
              className="w-full text-[14px] font-semibold"
            >
              Request a Visit →
            </Button>
          </Card>

          {/* Action 4: Direct Message / Outreach */}
          <Card className="p-6 flex flex-col justify-between bg-cream-card border border-berry/10 hover:shadow-hover hover:-translate-y-1 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-berry mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-xl md:text-[22px] font-normal font-serif text-plum mb-2 leading-snug">
                General Inquiries
              </h3>
              <p className="text-[14px] text-ink/80 leading-relaxed mb-4 font-sans">
                Questions about partnerships, media, or clinic listings? Send our coordination team a message.
              </p>
            </div>
            <Button
              onClick={() => onNavigate("contact")}
              variant="ghost"
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
