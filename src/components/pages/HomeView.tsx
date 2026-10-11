"use client";

import React from "react";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Heart,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Globe,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageId } from "@/components/layout/Navbar";
import { UPCOMING_SESSIONS } from "@/data/workshopsData";

export interface TocSection {
  id: string;
  number: string;
  title: string;
}

export const TOC_SECTIONS: TocSection[] = [
  { id: "commitment", number: "01", title: "The Commitment" },
  { id: "symptom-explorer", number: "02", title: "Symptom Tracker" },
  { id: "myth-buster", number: "03", title: "Medical Myth-Buster" },
  { id: "workshops-community", number: "04", title: "Free Workshops" },
  { id: "ask-question", number: "05", title: "Ask a Question" },
];

interface HomeViewProps {
  onNavigate: (page: PageId, categoryId?: string) => void;
  onSelectLang?: (lang: string) => void;
}

export function HomeView({ onNavigate, onSelectLang }: HomeViewProps) {

  const scrollToSection = (sectionId: string) => {
    if (typeof document !== "undefined") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="flex flex-col w-full text-charcoal">
      {/* 1. HERO SECTION: Light Teal (#D8EFED) Centered & Streamlined */}
      <section id="hero" className="w-full bg-light-teal text-charcoal pt-14 pb-16 md:pt-20 md:pb-24 relative overflow-hidden scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-[1100px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-coral/35 shadow-xs mb-5 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-coral" />
            <span className="font-sans font-bold text-[12px] md:text-[12.5px] uppercase tracking-[1.5px] text-deep-teal">
              Evidence-Based Youth Health Education
            </span>
          </div>

          {/* H1: Know your body. Know what to ask. */}
          <h1 className="text-4xl md:text-[60px] lg:text-[68px] font-normal font-serif leading-[1.1] tracking-tight mb-5 max-w-[800px] text-deep-teal">
            Know your body.<br />
            Know{" "}
            <span className="relative inline-block text-raspberry">
              what to ask.
              <span
                className="absolute -bottom-1.5 left-0 right-0 h-[4px] bg-coral/60 rounded-full pointer-events-none"
                aria-hidden="true"
              />
            </span>
          </h1>

          {/* Subtitle: Direct and Focused */}
          <p className="text-[17px] md:text-[19px] text-charcoal/85 max-w-[620px] leading-relaxed mb-8 font-sans">
            Clear, accessible health education for girls — understanding your biology, recognizing symptoms, and advocating for your care.
          </p>

          {/* Centered CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Button
              onClick={() => onNavigate("hub")}
              size="default"
              className="bg-raspberry text-white hover:bg-raspberry/90 hover:text-white active:bg-raspberry-dark active:text-white focus-visible:text-white shadow-sm gap-2 text-[15.5px]"
            >
              <span>Explore Health Topics</span>
              <ArrowRight className="w-4 h-4 text-coral" />
            </Button>
            <Button
              onClick={() => onNavigate("story")}
              variant="outline"
              size="default"
              className="gap-2 text-deep-teal border-[1.5px] border-deep-teal hover:bg-deep-teal/10 hover:text-deep-teal active:text-deep-teal focus-visible:text-deep-teal text-[15.5px]"
            >
              <span>Our Story &amp; Mission</span>
              <span aria-hidden="true" className="text-coral font-bold">→</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Sleek, Compact Jump-Down Strip (No Heavy Boxes, Understated) */}
      <nav
        aria-label="On this page quick jump"
        className="w-full bg-[#EBF7F6] border-y border-deep-teal/10 py-2.5 sm:py-3"
      >
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar text-xs font-sans">
          <div className="flex items-center gap-1.5 shrink-0 font-bold uppercase tracking-wider text-deep-teal text-[11.5px]">
            <Compass className="w-3.5 h-3.5 text-coral shrink-0" />
            <span>Jump to:</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 flex-nowrap">
            {TOC_SECTIONS.map((sec, idx) => (
              <React.Fragment key={sec.id}>
                <button
                  onClick={() => scrollToSection(sec.id)}
                  className="px-2 sm:px-2.5 py-1 rounded-md font-semibold text-charcoal/80 hover:text-raspberry hover:bg-white/80 active:text-raspberry transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span className="text-coral font-mono font-bold mr-1 text-[11px]">{sec.number}</span>
                  <span>{sec.title}</span>
                </button>
                {idx < TOC_SECTIONS.length - 1 && (
                  <span className="text-charcoal/30 select-none text-[10px]" aria-hidden="true">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </nav>

      {/* 2. THE COMMITMENT SECTION: Deep Teal (#175B5C) Full-Bleed */}
      <section id="commitment" className="w-full bg-deep-teal text-white py-16 md:py-24 scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-coral mb-4 font-sans">
              <span className="w-2 h-2 rounded-full bg-coral" />
              <span>✦ THE REPROUS COMMITMENT</span>
            </div>

            <h2 className="text-3xl md:text-[44px] lg:text-[52px] font-bold font-serif text-white leading-[1.12] mb-5 tracking-tight">
              You shouldn&apos;t need to become an expert to be taken seriously.
            </h2>

            <p className="text-[17px] md:text-[20px] font-medium text-white/95 leading-relaxed font-sans mb-10 max-w-2xl">
              ReproUs helps girls understand their bodies, recognize symptoms, and build the confidence to ask informed questions about their health.
            </p>

            {/* 3 Boxed Cards: LEARN (Teal) · RECOGNIZE (Coral) · ADVOCATE (Pink) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {/* Box 1: LEARN (Teal) */}
              <div className="rounded-2xl p-6 bg-[#D8EFED]/15 border-2 border-light-teal/70 shadow-md flex flex-col justify-between hover:bg-[#D8EFED]/20 hover:border-light-teal transition-all">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-light-teal text-deep-teal font-extrabold text-xs tracking-wider uppercase shadow-xs mb-4">
                    <BookOpen className="w-3.5 h-3.5 text-deep-teal" />
                    <span>LEARN</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-light-teal mb-2">
                    Understand Your Body
                  </h3>
                  <p className="text-[15px] md:text-[16px] font-semibold text-white/95 leading-relaxed font-sans m-0">
                    Grasp how your hormones, cycles, and anatomy function in clear, plain language without shame or medical jargon.
                  </p>
                </div>
              </div>

              {/* Box 2: RECOGNIZE (Coral) */}
              <div className="rounded-2xl p-6 bg-[#FFE1DB]/15 border-2 border-coral/70 shadow-md flex flex-col justify-between hover:bg-[#FFE1DB]/20 hover:border-coral transition-all">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-coral text-white font-extrabold text-xs tracking-wider uppercase shadow-xs mb-4">
                    <Heart className="w-3.5 h-3.5 text-white" />
                    <span>RECOGNIZE</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-coral mb-2">
                    Spot the Warning Signs
                  </h3>
                  <p className="text-[15px] md:text-[16px] font-semibold text-white/95 leading-relaxed font-sans m-0">
                    Identify symptoms that are often dismissed or normalized—like severe period pain, missing cycles, and chronic fatigue.
                  </p>
                </div>
              </div>

              {/* Box 3: ADVOCATE (Pink / Raspberry) */}
              <div className="rounded-2xl p-6 bg-soft-pink/15 border-2 border-soft-pink/70 shadow-md flex flex-col justify-between hover:bg-soft-pink/20 hover:border-soft-pink transition-all">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-soft-pink text-raspberry font-extrabold text-xs tracking-wider uppercase shadow-xs mb-4">
                    <ShieldCheck className="w-3.5 h-3.5 text-raspberry" />
                    <span>ADVOCATE</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-soft-pink mb-2">
                    Speak Up with Confidence
                  </h3>
                  <p className="text-[15px] md:text-[16px] font-semibold text-white/95 leading-relaxed font-sans m-0">
                    Build the vocabulary, questions, and symptom logs to be taken seriously by clinicians, parents, and coaches.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SYMPTOM TRACKER CALLOUT: Streamlined Banner with Button */}
      <section id="symptom-explorer" className="w-full bg-light-teal text-charcoal py-12 md:py-16 scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-widest text-raspberry mb-2">
              <span className="w-2 h-2 rounded-full bg-coral" />
              <span>COULD THIS BE YOU?</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-[36px] font-normal font-serif text-deep-teal leading-[1.2] mb-2">
              Start with the symptoms.
            </h2>
            <p className="text-[15px] md:text-[17px] text-charcoal/80 leading-relaxed font-sans m-0">
              Not sure what your symptoms might mean? Explore our symptom tracking guide, what to record in an objective log, and questions to ask your doctor.
            </p>
          </div>

          <Button
            onClick={() => onNavigate("resources", "tracker")}
            size="lg"
            className="bg-deep-teal text-white hover:bg-deep-teal/90 active:bg-deep-teal-dark focus-visible:text-white shadow-md font-bold text-[15.5px] px-8 py-6 rounded-xl gap-2 shrink-0 whitespace-nowrap cursor-pointer"
          >
            <span>Explore Symptom Tracker</span>
            <ArrowRight className="w-4 h-4 text-coral" />
          </Button>
        </div>
      </section>

      {/* 3. MEDICAL MYTH-BUSTER CALLOUT: Streamlined Banner with Button */}
      <section id="myth-buster" className="w-full bg-raspberry text-white py-12 md:py-16 scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-widest text-soft-pink mb-2">
              <span className="w-2 h-2 rounded-full bg-coral" />
              <span>INTERACTIVE MEDICAL MYTH-BUSTER</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-[36px] font-normal font-serif text-white leading-[1.2] mb-2">
              Separating myths from medical reality.
            </h2>
            <p className="text-[15px] md:text-[17px] text-white/90 leading-relaxed font-sans m-0">
              Too many girls are told that severe pain or missing periods are &ldquo;just part of being a girl.&rdquo; Explore verified clinical facts and medical guidelines.
            </p>
          </div>

          <Button
            onClick={() => onNavigate("myths")}
            size="lg"
            className="bg-white text-raspberry hover:bg-white/95 hover:text-raspberry active:bg-white/90 active:text-raspberry focus-visible:text-raspberry shadow-md font-bold text-[15.5px] px-8 py-6 rounded-xl gap-2 shrink-0 whitespace-nowrap cursor-pointer"
          >
            <span>Explore All Myths &amp; Facts</span>
            <ArrowRight className="w-4 h-4 text-raspberry" />
          </Button>
        </div>
      </section>

      {/* 8. WORKSHOPS & YOUTH VOICES: Full-Bleed Warm Cream (#FFF8F0) */}
      <section id="workshops-community" className="w-full bg-warm-cream text-charcoal py-16 md:py-24 scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-[1100px] mx-auto px-6 space-y-16">
          {/* Upcoming Workshops Section */}
          <div className="rounded-2xl bg-white border border-deep-teal/15 p-8 md:p-12 shadow-card">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-raspberry mb-2 font-sans">
                  <Calendar className="w-3.5 h-3.5 text-coral" />
                  Latest &amp; Upcoming Workshops (Sample Placeholders)
                </div>
                <h2 className="text-3xl md:text-[42px] lg:text-[48px] font-normal font-serif text-deep-teal leading-[1.15]">
                  Join a free, honest workshop
                </h2>
                <p className="text-[17px] md:text-[18px] text-charcoal/80 max-w-xl mt-2 mb-1 font-sans">
                  Interactive, non-judgmental sessions led by youth educators. Reserve your free spot or view full workshop agendas.
                </p>
                <p className="text-xs text-charcoal/60 font-sans italic m-0">
                  (Note: All workshop sessions listed below are sample placeholders for demonstration)
                </p>
              </div>

              <Button
                onClick={() => onNavigate("workshops")}
                variant="default"
                className="bg-raspberry text-white hover:bg-raspberry/90 gap-2 self-start md:self-end whitespace-nowrap shadow-sm text-[15px]"
              >
                See All Workshops (Placeholders)
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {UPCOMING_SESSIONS.slice(0, 3).map((session, idx) => {
                const borderOutline =
                  idx === 0
                    ? "border-2 border-deep-teal"
                    : idx === 1
                    ? "border-2 border-coral"
                    : "border-2 border-raspberry";

                return (
                  <Card
                    key={session.id}
                    className={`p-6 bg-white ${borderOutline} shadow-xs flex flex-col justify-between hover:shadow-hover hover:-translate-y-0.5 transition-all`}
                  >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-serif text-2xl font-bold text-deep-teal">
                        {session.date}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300">
                          Placeholder
                        </span>
                        <span
                          className={`text-[12px] font-bold px-2.5 py-0.5 rounded inline-flex items-center gap-1.5 ${
                            session.isOnline
                              ? "bg-light-teal text-deep-teal border border-deep-teal/20"
                              : "bg-soft-pink text-deep-teal border border-coral/30"
                          }`}
                        >
                          {session.isOnline ? (
                            <>
                              <Globe className="w-3 h-3 text-deep-teal" />
                              <span>Virtual Zoom</span>
                            </>
                          ) : (
                            <>
                              <MapPin className="w-3 h-3 text-deep-teal" />
                              <span>In Person</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-deep-teal mb-2 line-clamp-2 leading-snug">
                      {session.topic}
                    </h3>

                    <div className="space-y-1.5 text-[14px] text-charcoal/80 mb-5 font-sans">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-raspberry shrink-0" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-raspberry shrink-0" />
                        <span className="truncate">{session.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-deep-teal/10 flex flex-col gap-2">
                    <div className="text-[13px] font-semibold text-charcoal/70 text-center font-sans">
                      {session.spotsLeft} • 100% Free
                    </div>
                    <Button
                      onClick={() => onNavigate("workshops")}
                      variant="secondary"
                      className="w-full h-auto min-h-[44px] py-2.5 px-3 text-[13.5px] sm:text-[14px] font-semibold whitespace-normal text-center leading-tight gap-1.5 text-deep-teal border-deep-teal/30 hover:bg-deep-teal/5 hover:text-deep-teal active:text-deep-teal focus-visible:text-deep-teal"
                    >
                      Reserve Spot (Demo) →
                    </Button>
                  </div>
                </Card>
              );
            })}
            </div>
          </div>

          {/* Youth Voices CTA Banner */}
          <div className="rounded-2xl bg-deep-teal text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
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
              className="bg-raspberry text-white hover:bg-raspberry/90 hover:text-white active:bg-raspberry-dark active:text-white focus-visible:text-white whitespace-nowrap shrink-0 font-bold text-[15px]"
            >
              Youth Voices →
            </Button>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM SECTION: ASK A QUESTION & PLATFORM DIRECTORY */}
      <section id="ask-question" className="w-full bg-[#EBF7F6] text-charcoal py-16 md:py-24 border-t border-deep-teal/15 scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-[1100px] mx-auto px-6 space-y-12">
          {/* Prominent "Ask a Question" Card */}
          <div className="rounded-3xl bg-white border-2 border-coral p-8 md:p-12 shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-raspberry mb-2.5 font-sans">
                <Sparkles className="w-3.5 h-3.5 text-coral" />
                <span>Confidential &amp; Anonymous Q&amp;A</span>
              </div>
              <h2 className="text-3xl md:text-[40px] font-serif font-bold text-deep-teal leading-[1.15] mb-3">
                Have a question about your body or health?
              </h2>
              <p className="text-[16px] md:text-[17.5px] text-charcoal/85 leading-relaxed font-sans m-0">
                Ask confidentially and without judgment. Peer health educators and medical mentors review and answer questions with grounded, compassionate science.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3 shrink-0 w-full sm:w-auto">
              <Button
                onClick={() => onNavigate("qa", "ask")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-sans font-semibold text-[15.5px] bg-berry text-white shadow-sm border-2 border-coral hover:border-coral-light hover:bg-berry/90 hover:text-white active:bg-berry-dark active:text-white whitespace-nowrap active:scale-[0.98] transition-all"
              >
                <span>Ask a Question</span>
                <span aria-hidden="true" className="ml-1.5">→</span>
              </Button>
              <button
                onClick={() => onNavigate("qa")}
                className="text-[13.5px] font-semibold text-deep-teal hover:text-raspberry underline transition-colors"
              >
                Browse Answered Questions →
              </button>
            </div>
          </div>

          {/* Clean Horizontal Row of Main Links on Desktop (5 Equal Columns) */}
          <div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-deep-teal/70 font-sans">
                Explore the Platform
              </span>
              <span className="text-xs text-charcoal/60 font-sans hidden sm:inline">
                All resources are free &amp; accessible
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Link 1: Learn Hub */}
              <button
                onClick={() => onNavigate("hub")}
                className="p-5 rounded-2xl bg-white border border-deep-teal/15 shadow-2xs hover:shadow-hover hover:border-deep-teal/30 hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-deep-teal bg-light-teal px-2 py-0.5 rounded-md inline-block mb-2.5 font-sans">
                    01 · Learn Hub
                  </span>
                  <h3 className="text-[17px] font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors leading-snug mb-1.5">
                    Topics &amp; Guides
                  </h3>
                  <p className="text-[13px] text-charcoal/75 leading-relaxed font-sans m-0">
                    Female athlete health, cycles, hormonal health, and care.
                  </p>
                </div>
                <span className="text-[12.5px] font-bold text-raspberry font-sans group-hover:underline pt-4 mt-2 border-t border-deep-teal/10 flex items-center gap-1">
                  <span>Explore topics</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>

              {/* Link 2: About ReproUs */}
              <button
                onClick={() => onNavigate("story")}
                className="p-5 rounded-2xl bg-white border border-coral/25 shadow-2xs hover:shadow-hover hover:border-coral/50 hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B83F68] bg-[#FFE1DB] px-2 py-0.5 rounded-md inline-block mb-2.5 font-sans">
                    02 · About ReproUs
                  </span>
                  <h3 className="text-[17px] font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors leading-snug mb-1.5">
                    Story &amp; Research
                  </h3>
                  <p className="text-[13px] text-charcoal/75 leading-relaxed font-sans m-0">
                    Our founding journey, clinical evidence, and mission.
                  </p>
                </div>
                <span className="text-[12.5px] font-bold text-raspberry font-sans group-hover:underline pt-4 mt-2 border-t border-deep-teal/10 flex items-center gap-1">
                  <span>Read our story</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>

              {/* Link 3: Youth Voices */}
              <button
                onClick={() => onNavigate("voices")}
                className="p-5 rounded-2xl bg-white border border-raspberry/25 shadow-2xs hover:shadow-hover hover:border-raspberry/50 hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-raspberry bg-soft-pink px-2 py-0.5 rounded-md inline-block mb-2.5 font-sans">
                    03 · Youth Voices
                  </span>
                  <h3 className="text-[17px] font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors leading-snug mb-1.5">
                    Stories &amp; Toolkit
                  </h3>
                  <p className="text-[13px] text-charcoal/75 leading-relaxed font-sans m-0">
                    Real peer reflections and the Self-Advocacy Toolkit.
                  </p>
                </div>
                <span className="text-[12.5px] font-bold text-raspberry font-sans group-hover:underline pt-4 mt-2 border-t border-deep-teal/10 flex items-center gap-1">
                  <span>Hear peer stories</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>

              {/* Link 4: Workshops */}
              <button
                onClick={() => onNavigate("workshops")}
                className="p-5 rounded-2xl bg-white border border-deep-teal/15 shadow-2xs hover:shadow-hover hover:border-deep-teal/30 hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-deep-teal bg-light-teal px-2 py-0.5 rounded-md inline-block mb-2.5 font-sans">
                    04 · Workshops
                  </span>
                  <h3 className="text-[17px] font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors leading-snug mb-1.5">
                    Free Workshops
                  </h3>
                  <p className="text-[13px] text-charcoal/75 leading-relaxed font-sans m-0">
                    Interactive live sessions led by trained student mentors.
                  </p>
                </div>
                <span className="text-[12.5px] font-bold text-raspberry font-sans group-hover:underline pt-4 mt-2 border-t border-deep-teal/10 flex items-center gap-1">
                  <span>View schedule</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>

              {/* Link 5: Immediate Support */}
              <button
                onClick={() => onNavigate("resources", "help")}
                className="p-5 rounded-2xl bg-white border border-coral/25 shadow-2xs hover:shadow-hover hover:border-coral/50 hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B83F68] bg-[#FFE1DB] px-2 py-0.5 rounded-md inline-block mb-2.5 font-sans">
                    05 · Support
                  </span>
                  <h3 className="text-[17px] font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors leading-snug mb-1.5">
                    Immediate Help
                  </h3>
                  <p className="text-[13px] text-charcoal/75 leading-relaxed font-sans m-0">
                    24/7 hotlines, free clinics, and confidential support.
                  </p>
                </div>
                <span className="text-[12.5px] font-bold text-raspberry font-sans group-hover:underline pt-4 mt-2 border-t border-deep-teal/10 flex items-center gap-1">
                  <span>Get support</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
