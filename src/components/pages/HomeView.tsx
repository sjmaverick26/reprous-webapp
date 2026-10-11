"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Heart,
  Calendar,
  Clock,
  MapPin,
  FileText,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
  Activity,
  Globe,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageId } from "@/components/layout/Navbar";
import { UPCOMING_SESSIONS } from "@/data/workshopsData";
import { MYTHS_DATA, MythItem } from "@/data/mythsData";

export interface TocSection {
  id: string;
  number: string;
  title: string;
}

export const TOC_SECTIONS: TocSection[] = [
  { id: "commitment", number: "01", title: "The Commitment" },
  { id: "symptom-explorer", number: "02", title: "Symptom Explorer" },
  { id: "myth-buster", number: "03", title: "Medical Myth-Buster" },
  { id: "workshops-community", number: "04", title: "Free Workshops" },
  { id: "ask-question", number: "05", title: "Ask a Question" },
];

interface HomeViewProps {
  onNavigate: (page: PageId, categoryId?: string) => void;
  onSelectLang?: (lang: string) => void;
}

interface SymptomDetail {
  id: string;
  name: string;
  associatedWith: string[];
  whatToTrack: string[];
  questionsToAsk: string[];
  whenToSeekCare: string;
  learnCategory: string;
  learnLabel: string;
}

const SYMPTOMS_DATA: SymptomDetail[] = [
  {
    id: "irregular-periods",
    name: "Irregular periods",
    associatedWith: [
      "PCOS (Polycystic Ovary Syndrome)",
      "Maturing hypothalamic-pituitary-ovarian axis (first 2–3 years post-menarche)",
      "Thyroid dysfunction (hypo- or hyperthyroidism)",
      "Relative Energy Deficiency in Sport (RED-S)",
      "Elevated stress hormones & sleep disruption",
    ],
    whatToTrack: [
      "Cycle start and stop dates (count days from Day 1 of one period to Day 1 of the next)",
      "Bleeding heaviness (number of pads/tampons soaked per day)",
      "Accompanying signs like acne flares, temperature shifts, or mood changes",
    ],
    questionsToAsk: [
      "Are my cycle intervals expected for my age and activity level?",
      "Could we check my thyroid function (TSH) and reproductive hormone levels?",
      "Should we evaluate for insulin sensitivity or Polycystic Ovary Syndrome?",
    ],
    whenToSeekCare:
      "If your cycle consistently falls outside 21–45 days, bleeding lasts more than 7 days, or your period stops for over 90 days.",
    learnCategory: "pcos",
    learnLabel: "Explore PCOS & Hormonal Health →",
  },
  {
    id: "pelvic-pain",
    name: "Pelvic pain",
    associatedWith: [
      "Endometriosis",
      "Adenomyosis",
      "Ovarian cysts",
      "Pelvic floor muscle spasm/hypertonicity",
      "Gastrointestinal or urinary tract inflammation",
    ],
    whatToTrack: [
      "Exact anatomical location (lower pelvis, lower back, radiating down thighs)",
      "Timing (during menstruation, ovulation, bowel movements, exercise, or non-cyclic)",
      "Pain severity score on a 1–10 scale and duration of flare-ups",
    ],
    questionsToAsk: [
      "Could my recurring pelvic discomfort suggest endometriosis or adenomyosis?",
      "What non-surgical or diagnostic imaging steps do you recommend?",
      "Can you connect me with an adolescent gynecologist or pelvic health physical therapist?",
    ],
    whenToSeekCare:
      "Sudden, excruciating one-sided stabbing pain, pain accompanied by high fever or vomiting, or persistent pain that prevents walking or sitting.",
    learnCategory: "endo",
    learnLabel: "Explore Endometriosis & Pelvic Pain →",
  },
  {
    id: "painful-periods",
    name: "Painful periods",
    associatedWith: [
      "Primary dysmenorrhea (elevated uterine prostaglandins)",
      "Endometriosis",
      "Adenomyosis",
      "Uterine anomalies or fibroids",
    ],
    whatToTrack: [
      "When cramps begin (24 hours before bleeding vs. Day 2 of flow)",
      "Response to over-the-counter NSAIDs (like ibuprofen taken with food)",
      "Number of school, athletic, or social days missed due to pain",
    ],
    questionsToAsk: [
      "Is my pain level normal for menstrual cramping, or does it signal secondary dysmenorrhea?",
      "Would a targeted anti-inflammatory regimen or hormonal regulation offer relief?",
      "What steps can we take to rule out underlying tissue inflammation like endometriosis?",
    ],
    whenToSeekCare:
      "Pain that leaves you incapacitated, does not improve with standard pain medication, or causes nausea, vomiting, or fainting.",
    learnCategory: "endo",
    learnLabel: "Learn What Pain Means in Hub →",
  },
  {
    id: "extreme-fatigue",
    name: "Extreme fatigue",
    associatedWith: [
      "Iron deficiency anemia (often exacerbated by heavy menstrual flow)",
      "Relative Energy Deficiency in Sport (RED-S)",
      "Hypothyroidism (underactive thyroid)",
      "Chronic inflammatory conditions or sleep disruptions",
    ],
    whatToTrack: [
      "Daily energy levels mapped against athletic training volume and meals",
      "Number of fully soaked pads/tampons per cycle",
      "Physical sensations such as lightheadedness, pale nail beds, or cold hands",
    ],
    questionsToAsk: [
      "Can we test my serum ferritin (iron storage) alongside a complete blood count (CBC)?",
      "Could my training volume exceed my dietary energy intake (RED-S)?",
      "Is my thyroid functioning within the optimal range for adolescents?",
    ],
    whenToSeekCare:
      "Inability to complete school or athletic tasks, shortness of breath upon minimal exertion, chest tightness, or heart palpitations.",
    learnCategory: "play",
    learnLabel: "Explore Athlete Health & Fueling →",
  },
  {
    id: "missed-periods",
    name: "Missed periods",
    associatedWith: [
      "Functional Hypothalamic Amenorrhea (FHA / RED-S)",
      "Polycystic Ovary Syndrome (PCOS)",
      "Elevated prolactin (hyperprolactinemia)",
      "Pregnancy",
      "Severe physiological stress or rapid weight change",
    ],
    whatToTrack: [
      "Exact number of months since your last natural period",
      "Recent changes in training intensity, sport seasons, or food intake",
      "Resting heart rate, sleep quality, and stress levels",
    ],
    questionsToAsk: [
      "Given that I have missed 3+ consecutive periods, what diagnostic blood work should we order?",
      "Could under-fueling or high training volume be suppressing my estrogen levels?",
      "How is this period absence affecting my bone mineral density and long-term health?",
    ],
    whenToSeekCare:
      "Missing 3 or more consecutive cycles (secondary amenorrhea) or reaching age 15 without ever having a first period (primary amenorrhea).",
    learnCategory: "cycle",
    learnLabel: "Explore Cycle Sense in Hub →",
  },
  {
    id: "feeling-dizzy",
    name: "Feeling dizzy",
    associatedWith: [
      "Postural Orthostatic Tachycardia Syndrome (POTS)",
      "Iron deficiency or heavy menstrual blood loss",
      "Inadequate hydration or electrolyte depletion during exercise",
      "Vasovagal response triggered by intense cramps",
    ],
    whatToTrack: [
      "Whether dizziness occurs specifically upon standing or after long periods of standing",
      "Daily fluid and sodium intake relative to workout sweat loss",
      "Correlation with heavy bleeding days",
    ],
    questionsToAsk: [
      "Could heavy menstrual blood loss be contributing to low blood pressure or anemia?",
      "Should we assess orthostatic vitals (blood pressure and heart rate lying vs. standing)?",
    ],
    whenToSeekCare:
      "Episodes of fainting (syncope), head trauma from falling, chest pain, or irregular heartbeats.",
    learnCategory: "body",
    learnLabel: "Explore Body Basics in Hub →",
  },
  {
    id: "changes-in-weight",
    name: "Changes in weight",
    associatedWith: [
      "PCOS (insulin resistance)",
      "Thyroid disorders (hypothyroidism or hyperthyroidism)",
      "Fluid retention linked to luteal phase hormonal shifts",
      "Disproportionate caloric deficit in athletes",
    ],
    whatToTrack: [
      "Unexplained changes that occur without shifts in dietary intake or exercise routine",
      "Associated symptoms like temperature sensitivity, skin tags, or hair texture changes",
    ],
    questionsToAsk: [
      "Could insulin resistance or a thyroid imbalance be driving these weight fluctuations?",
      "What metabolic and endocrine panels do you recommend?",
    ],
    whenToSeekCare:
      "Unintended rapid weight gain or loss exceeding 10 pounds in a short period without dietary shifts.",
    learnCategory: "pcos",
    learnLabel: "Explore PCOS & Hormones →",
  },
  {
    id: "acne",
    name: "Acne",
    associatedWith: [
      "Elevated free androgens (testosterone, DHEAS)",
      "PCOS",
      "Normal adolescent hormonal fluctuations",
      "Insulin spikes stimulating sebaceous gland activity",
    ],
    whatToTrack: [
      "Distribution: cystic acne along jawline, chin, chest, or upper back",
      "Timing: monthly flare-ups right before menstruation",
      "Response to topical dermatological washes",
    ],
    questionsToAsk: [
      "Does the distribution of my acne suggest an underlying hormonal or androgen imbalance?",
      "Should we evaluate for PCOS alongside this skin symptom?",
    ],
    whenToSeekCare:
      "Deep, painful cystic lesions that leave deep scarring or do not respond to clinical dermatological care.",
    learnCategory: "pcos",
    learnLabel: "Explore Hormonal Health →",
  },
  {
    id: "excess-hair-growth",
    name: "Excess hair growth",
    associatedWith: [
      "Hirsutism associated with PCOS",
      "Elevated ovarian or adrenal androgens",
      "Familial and genetic ethnic traits",
      "Medication interactions",
    ],
    whatToTrack: [
      "Growth of coarse, dark hair on androgen-sensitive zones (chin, upper lip, chest, abdomen)",
      "Speed of onset (gradual since puberty vs. sudden rapid development)",
    ],
    questionsToAsk: [
      "Does this hair pattern meet the clinical criteria for hirsutism or PCOS?",
      "What evidence-based approaches (like anti-androgens or combined therapies) are appropriate?",
    ],
    whenToSeekCare:
      "Rapid onset of dark facial/body hair accompanied by deepening voice or missed menstrual cycles.",
    learnCategory: "pcos",
    learnLabel: "Explore PCOS & Hormones →",
  },
  {
    id: "pain-during-exercise",
    name: "Pain during exercise",
    associatedWith: [
      "Exercise-induced pelvic floor hypertonicity",
      "Endometriosis adhesions aggravated by core movement",
      "Ovarian cyst irritation",
      "Relative Energy Deficiency in Sport (RED-S)",
    ],
    whatToTrack: [
      "Specific movements that trigger pain (running impact, core crunches, weightlifting)",
      "Timing in your menstrual cycle (luteal vs. follicular phase)",
      "Duration of cramping or pelvic ache after the training session ends",
    ],
    questionsToAsk: [
      "Could this exercise-related pelvic ache stem from pelvic floor tension or endometriosis?",
      "Can we explore pelvic floor physical therapy tailored to student athletes?",
    ],
    whenToSeekCare:
      "Acute, sharp lower abdominal pain that suddenly halts exercise, or pain accompanied by dizziness or nausea.",
    learnCategory: "play",
    learnLabel: "Explore Female Athlete Health →",
  },
];

export function HomeView({ onNavigate, onSelectLang }: HomeViewProps) {
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>("painful-periods");
  const [revealedHomeMyths, setRevealedHomeMyths] = useState<Set<string>>(new Set(["myth-severe-pain"]));

  const toggleHomeMyth = (id: string) => {
    setRevealedHomeMyths((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const FEATURED_MYTH_IDS = ["myth-severe-pain", "myth-missing-period-stress", "myth-athlete-period-loss"];
  const featuredMyths = MYTHS_DATA.filter((m) => FEATURED_MYTH_IDS.includes(m.id));

  const [activeSymptom, setActiveSymptom] = useState<SymptomDetail>(
    () => SYMPTOMS_DATA.find((s) => s.id === "painful-periods") || SYMPTOMS_DATA[0]
  );

  useEffect(() => {
    const active = SYMPTOMS_DATA.find((s) => s.id === selectedSymptomId) || SYMPTOMS_DATA[0];
    setActiveSymptom(active);
  }, [selectedSymptomId]);

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

      {/* 2. INTERACTIVE "COULD THIS BE YOU?" SYMPTOM EXPLORER: Light Teal (#D8EFED) */}
      <section id="symptom-explorer" className="w-full bg-light-teal text-charcoal py-16 md:py-24 scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-8">
            <div className="text-[12.5px] font-bold tracking-widest uppercase text-raspberry mb-2 font-sans flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-coral" />
              <span>COULD THIS BE YOU?</span>
            </div>
            <h2 className="text-3xl md:text-[42px] lg:text-[48px] font-normal font-serif text-deep-teal leading-[1.15]">
              Start with the symptoms.
            </h2>
            <p className="text-[17px] md:text-[18.5px] text-charcoal/80 max-w-xl mx-auto mt-2 mb-0 font-sans">
              Not sure what your symptoms might mean? Start exploring.
            </p>
          </div>

          {/* 10 Clickable Symptom Chips */}
          <div className="flex items-center justify-center gap-2 flex-wrap max-w-4xl mx-auto mb-8">
            {SYMPTOMS_DATA.map((symptom) => {
              const isSelected = symptom.id === selectedSymptomId;
              return (
                <button
                  key={symptom.id}
                  onClick={() => setSelectedSymptomId(symptom.id)}
                  className={`px-3.5 py-2 rounded-lg text-[13.5px] md:text-[14px] font-semibold font-sans transition-all border ${
                    isSelected
                      ? "bg-deep-teal text-white border-deep-teal shadow-sm hover:bg-deep-teal hover:text-white active:bg-deep-teal-dark active:text-white focus:text-white"
                      : "bg-white text-charcoal border-deep-teal/20 hover:border-raspberry hover:text-raspberry hover:bg-white active:bg-white/90 active:text-raspberry focus:text-charcoal"
                  }`}
                >
                  {symptom.name}
                </button>
              );
            })}
          </div>

          {/* Dynamic Symptom Educational Panel */}
          <div className="rounded-2xl bg-white border border-deep-teal/15 p-7 md:p-10 shadow-card">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-deep-teal/10 pb-5 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-raspberry block font-sans mb-1">
                  Symptom Profile
                </span>
                <h3 className="text-2xl md:text-[30px] font-normal font-serif text-deep-teal m-0">
                  Exploring: {activeSymptom.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => onNavigate("hub", activeSymptom.learnCategory)}
                  variant="secondary"
                  size="sm"
                  className="text-[14px] gap-1.5 text-deep-teal border-deep-teal/30 hover:bg-deep-teal/5 hover:text-deep-teal active:text-deep-teal focus-visible:text-deep-teal"
                >
                  <span>{activeSymptom.learnLabel}</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
              {/* Col 1: Associated With & What To Track */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-[14.5px] font-bold text-deep-teal uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-raspberry" />
                    What it can be associated with:
                  </h4>
                  <ul className="space-y-1.5 pl-4 list-disc text-[15px] text-charcoal/85 leading-relaxed">
                    {activeSymptom.associatedWith.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[14.5px] font-bold text-deep-teal uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-raspberry" />
                    What you can track:
                  </h4>
                  <ul className="space-y-1.5 pl-4 list-disc text-[15px] text-charcoal/85 leading-relaxed">
                    {activeSymptom.whatToTrack.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Col 2: Questions To Ask & When To Seek Care */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-[14.5px] font-bold text-deep-teal uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-raspberry" />
                    Questions you can ask a healthcare provider:
                  </h4>
                  <ul className="space-y-2 pl-4 list-disc text-[14.5px] text-charcoal/85 leading-relaxed">
                    {activeSymptom.questionsToAsk.map((item, i) => (
                      <li key={i}>&ldquo;{item}&rdquo;</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-soft-pink/40 border border-coral/30">
                  <h4 className="text-[13.5px] font-bold text-raspberry uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-coral" />
                    When to seek medical care:
                  </h4>
                  <p className="text-[14px] text-charcoal/85 leading-relaxed m-0">
                    {activeSymptom.whenToSeekCare}
                  </p>
                </div>
              </div>
            </div>

            {/* Educational Disclaimer */}
            <div className="mt-8 pt-4 border-t border-deep-teal/10 text-center text-xs font-sans text-charcoal/70 bg-warm-cream/80 p-3 rounded-lg border border-deep-teal/10">
              <strong>Important Clinical Note:</strong> This information is compiled for health education and self-advocacy preparation, not medical diagnosis. If symptoms persist or cause you concern, consult a healthcare professional.
            </div>
          </div>
        </div>
      </section>

      {/* 3. MYTHS & FACTS INTERACTIVE FEATURE: Full-Bleed Raspberry (#B83F68) */}
      <section id="myth-buster" className="w-full bg-raspberry text-white py-16 md:py-24 scroll-mt-20 md:scroll-mt-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-widest text-soft-pink mb-3">
              <span className="w-2 h-2 rounded-full bg-coral" />
              <span>INTERACTIVE MEDICAL MYTH-BUSTER</span>
            </div>
            <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-normal font-serif text-white leading-[1.12] mb-4 tracking-tight">
              Separating myths from medical reality.
            </h2>
            <p className="text-[17px] md:text-[18.5px] text-white/90 leading-relaxed font-sans mb-0">
              Too many girls are told that severe pain or missing periods are &ldquo;just part of being a girl.&rdquo; Tap any card to reveal clinical evidence and guidelines.
            </p>
          </div>

          {/* 3 Interactive Homepage Myth Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {featuredMyths.map((item, idx) => {
              const isRevealed = revealedHomeMyths.has(item.id);
              const borderOutline =
                idx === 0
                  ? "border-2 border-deep-teal"
                  : idx === 1
                  ? "border-2 border-coral"
                  : "border-2 border-raspberry";

              return (
                <div
                  key={item.id}
                  onClick={() => toggleHomeMyth(item.id)}
                  className={`rounded-2xl bg-white text-charcoal p-7 flex flex-col justify-between shadow-lg cursor-pointer hover:shadow-2xl transition-all ${borderOutline} group`}
                >
                  <div>
                    {/* Myth Tag */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-sans font-bold text-[11px] uppercase tracking-wider text-raspberry bg-soft-pink px-2.5 py-1 rounded-md">
                        MYTH · {item.categoryLabel}
                      </span>
                      <span className="text-xs font-semibold text-charcoal/50 group-hover:text-raspberry transition-colors">
                        {isRevealed ? "Tap to collapse" : "Tap to reveal"}
                      </span>
                    </div>

                    {/* Myth Quote */}
                    <h3 className="text-xl md:text-[22px] font-serif font-normal text-deep-teal mb-4 leading-snug">
                      &ldquo;{item.myth}&rdquo;
                    </h3>

                    {/* Interactive Reveal Area */}
                    {isRevealed ? (
                      <div className="space-y-4 pt-4 border-t border-deep-teal/10 animate-in fade-in duration-200">
                        <div className="p-3.5 rounded-xl bg-light-teal/50 border border-deep-teal/15">
                          <span className="font-sans font-bold text-[11.5px] uppercase tracking-wider text-deep-teal block mb-1">
                            MEDICAL REALITY:
                          </span>
                          <p className="text-[14px] text-charcoal/90 font-sans leading-relaxed m-0 font-medium">
                            {item.quickFact}
                          </p>
                        </div>

                        <p className="text-[13.5px] text-charcoal/80 font-sans leading-relaxed line-clamp-4 m-0">
                          {item.explanation}
                        </p>

                        <div className="pt-2 border-t border-deep-teal/10 text-[12px] font-sans text-charcoal/70">
                          <strong className="text-deep-teal block mb-0.5">Clinical Source:</strong>
                          <span className="text-charcoal/85">{item.source.organization}</span>
                          {item.source.guidelineNumber && (
                            <span className="block text-[11px] text-charcoal/60 mt-0.5">
                              {item.source.guidelineNumber}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="pt-3">
                        <span className="inline-flex items-center gap-1.5 text-[14px] font-bold text-raspberry group-hover:underline">
                          <span>Reveal the facts</span>
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 mt-4 border-t border-deep-teal/10 flex items-center justify-between text-xs font-sans">
                    <span className="text-charcoal/60">
                      {isRevealed ? "Verified Guideline" : "Click card to expand"}
                    </span>
                    {item.learnCategory && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate("hub", item.learnCategory);
                        }}
                        className="text-raspberry font-semibold hover:underline"
                      >
                        Explore topic →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Button to Full Myths & Facts Page */}
          <div className="text-center">
            <Button
              onClick={() => onNavigate("myths")}
              size="lg"
              className="bg-white text-raspberry hover:bg-white/95 hover:text-raspberry active:bg-white/90 active:text-raspberry focus-visible:text-raspberry shadow-md font-bold text-[15.5px] px-8 gap-2"
            >
              <span>Explore All Myths &amp; Facts</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
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
                      className="w-full text-[14px] font-semibold gap-1.5 text-deep-teal border-deep-teal/30 hover:bg-deep-teal/5 hover:text-deep-teal active:text-deep-teal focus-visible:text-deep-teal"
                    >
                      Reserve on Workshop Page (Demo) →
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
