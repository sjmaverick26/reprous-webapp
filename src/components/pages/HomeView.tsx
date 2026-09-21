"use client";

import React, { useState } from "react";
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
  FileText,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  X,
  Stethoscope,
  Activity,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AccessMini } from "@/components/shared/AccessMini";
import { PageId } from "@/components/layout/Navbar";
import { UPCOMING_SESSIONS } from "@/data/workshopsData";
import { MYTHS_DATA, MythItem } from "@/data/mythsData";

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
  const [toolkitModalOpen, setToolkitModalOpen] = useState(false);
  const [activeToolkitTab, setActiveToolkitTab] = useState<"track" | "prepare" | "language" | "speak">("prepare");
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

  const activeSymptom =
    SYMPTOMS_DATA.find((s) => s.id === selectedSymptomId) || SYMPTOMS_DATA[0];

  return (
    <div className="flex flex-col w-full text-charcoal">
      {/* 1. HERO SECTION: Light Teal (#D8EFED) */}
      <section className="w-full bg-light-teal text-charcoal pt-12 pb-16 md:pt-16 md:pb-24 relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          {/* Eyebrow Pill with Coral Accent & Sparkle */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-coral/35 shadow-xs mb-6 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-coral" />
            <span className="font-sans font-bold text-[12px] md:text-[12.5px] uppercase tracking-[1.5px] text-deep-teal">
              Health Education <span className="text-coral">✦</span> Self-Advocacy <span className="text-coral">✦</span> Research
            </span>
          </div>

          {/* H1: Know your body. Know what to ask. (with Coral underline highlight) */}
          <h1 className="text-4xl md:text-[64px] lg:text-[72px] font-normal font-serif leading-[1.08] tracking-tight mb-6 max-w-[860px] text-deep-teal">
            Know your body.<br />
            Know{" "}
            <span className="relative inline-block text-raspberry">
              what to ask.
              <span
                className="absolute -bottom-1.5 left-0 right-0 h-[5px] bg-coral/60 rounded-full -rotate-0.5 pointer-events-none"
                aria-hidden="true"
              />
            </span>
          </h1>

          {/* Supporting text in Charcoal */}
          <p className="text-[17px] md:text-[19px] text-charcoal/85 max-w-[660px] leading-relaxed mb-6 font-sans">
            Health education for girls — from reproductive health and female athlete health to conditions that are often misunderstood or overlooked.
          </p>

          {/* Value / Focus Chips with Coral Pips & Borders */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-coral/35 text-deep-teal text-[12.5px] md:text-[13px] font-medium font-sans shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
              Female Athlete Health
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-coral/35 text-deep-teal text-[12.5px] md:text-[13px] font-medium font-sans shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
              Overlooked Conditions
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-coral/35 text-deep-teal text-[12.5px] md:text-[13px] font-medium font-sans shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
              Self-Advocacy Tools
            </span>
          </div>

          {/* Hero Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-9">
            <Button
              onClick={() => onNavigate("hub")}
              size="default"
              className="bg-raspberry text-white hover:bg-raspberry/90 hover:text-white active:bg-raspberry-dark active:text-white focus-visible:text-white shadow-sm gap-2 text-[15.5px]"
            >
              <span>Explore your health</span>
              <ArrowRight className="w-4 h-4 text-coral group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <Button
              onClick={() => onNavigate("story")}
              variant="outline"
              size="default"
              className="gap-2 text-deep-teal border-[1.5px] border-deep-teal hover:bg-deep-teal/10 hover:text-deep-teal active:text-deep-teal focus-visible:text-deep-teal text-[15.5px]"
            >
              <span>How ReproUs works</span>
              <span aria-hidden="true" className="text-coral font-bold">→</span>
            </Button>
          </div>

          {/* Multilingual Accessibility & Resources Bar */}
          <AccessMini
            text="Healthcare should be easier to navigate."
            subtext="Languages · Accessibility · Free resources · Find support"
            languages={[
              "English",
              "Español",
              "中文 (Chinese)",
              "العربية",
              "Français (French)",
              "اردو (Urdu)",
              "Kiswahili (Swahili)",
              "دری (Dari / Afghan Persian)",
              "한국어",
              "Tiếng Việt",
            ]}
            onNavigate={onNavigate}
            onSelectLang={onSelectLang}
          />
        </div>
      </section>

      {/* 2. THE COMMITMENT SECTION: Deep Teal (#175B5C) Full-Bleed */}
      <section className="w-full bg-deep-teal text-white py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-coral mb-4 font-sans">
              <span className="w-2 h-2 rounded-full bg-coral" />
              <span>✦ THE REPROUS COMMITMENT</span>
            </div>

            <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-bold font-serif text-light-teal !text-light-teal leading-[1.12] mb-5 tracking-tight">
              You shouldn&apos;t need to become an expert to be taken seriously.
            </h2>

            <p className="text-[17px] md:text-[19px] text-white/90 leading-relaxed font-sans mb-10 max-w-2xl">
              ReproUs helps girls understand their bodies, recognize symptoms, and build the confidence to ask informed questions about their health.
            </p>

            {/* 3 Small Items: LEARN · RECOGNIZE · ADVOCATE with Coral highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="flex flex-col gap-2">
                <span className="font-sans font-bold text-xs uppercase tracking-wider text-coral flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                  <span>LEARN</span>
                </span>
                <p className="text-[15px] md:text-[16px] text-white/90 leading-relaxed font-sans m-0">
                  Understand your body and how it works.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-sans font-bold text-xs uppercase tracking-wider text-coral flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                  <span>RECOGNIZE</span>
                </span>
                <p className="text-[15px] md:text-[16px] text-white/90 leading-relaxed font-sans m-0">
                  Learn about symptoms that are often misunderstood or dismissed.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-sans font-bold text-xs uppercase tracking-wider text-coral flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                  <span>ADVOCATE</span>
                </span>
                <p className="text-[15px] md:text-[16px] text-white/90 leading-relaxed font-sans m-0">
                  Build the confidence and vocabulary to speak up about your health.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HEALTH TOPICS: Warm Cream (#FFF8F0) Full-Bleed with 3 Distinct Cards */}
      <section className="w-full bg-warm-cream text-charcoal py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-[13px] font-bold tracking-wider uppercase text-raspberry mb-2 font-sans">
              Curriculum Focus
            </div>
            <h2 className="text-3xl md:text-[42px] lg:text-[48px] font-normal font-serif text-deep-teal leading-[1.15]">
              Start with what you want to understand.
            </h2>
            <p className="text-[17px] md:text-[18px] text-charcoal/80 max-w-xl mx-auto mt-2 mb-0 font-sans">
              Explore dedicated guides on athlete physiology, hormonal cycles, and reproductive conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CARD 01: FEMALE ATHLETE HEALTH - Light Teal (#D8EFED) */}
            <div className="rounded-2xl bg-light-teal border-2 border-deep-teal/20 p-7 md:p-8 flex flex-col justify-between shadow-card hover:shadow-hover hover:border-deep-teal/40 transition-all">
              <div>
                <span className="font-sans font-bold text-[12px] uppercase tracking-wider text-deep-teal bg-white/85 px-2.5 py-1 rounded-md inline-block mb-3 border border-deep-teal/15">
                  01 · FEMALE ATHLETE HEALTH
                </span>
                <h3 className="text-2xl md:text-[28px] font-normal font-serif text-deep-teal mb-3 leading-snug">
                  Your body is part of your performance.
                </h3>
                <p className="text-[15.5px] text-charcoal/85 leading-relaxed mb-6 font-sans">
                  Learn about energy availability, periods, bone health, and the Female Athlete Triad.
                </p>
              </div>
              <div>
                <Button
                  onClick={() => onNavigate("hub", "play")}
                  className="w-full bg-raspberry text-white hover:bg-raspberry/90 justify-between text-[14.5px]"
                >
                  <span>Explore athlete health</span>
                  <span aria-hidden="true">→</span>
                </Button>
              </div>
            </div>

            {/* CARD 02: HORMONAL HEALTH - Soft Pink (#F5D9DE) */}
            <div className="rounded-2xl bg-soft-pink border-2 border-raspberry/20 p-7 md:p-8 flex flex-col justify-between shadow-card hover:shadow-hover hover:border-raspberry/40 transition-all">
              <div>
                <span className="font-sans font-bold text-[12px] uppercase tracking-wider text-deep-teal bg-white/85 px-2.5 py-1 rounded-md inline-block mb-3 border border-raspberry/15">
                  02 · HORMONAL HEALTH
                </span>
                <h3 className="text-2xl md:text-[28px] font-normal font-serif text-deep-teal mb-3 leading-snug">
                  When your hormones affect more than you expect.
                </h3>
                <p className="text-[15.5px] text-charcoal/85 leading-relaxed mb-6 font-sans">
                  Explore PCOS, periods, symptoms, hormones, and what to track.
                </p>
              </div>
              <div>
                <Button
                  onClick={() => onNavigate("hub", "pcos")}
                  className="w-full bg-raspberry text-white hover:bg-raspberry/90 justify-between text-[14.5px]"
                >
                  <span>Explore hormonal health</span>
                  <span aria-hidden="true">→</span>
                </Button>
              </div>
            </div>

            {/* CARD 03: REPRODUCTIVE HEALTH - Light Coral (#FFE1DB) */}
            <div className="rounded-2xl bg-[#FFE1DB] border-2 border-coral/30 p-7 md:p-8 flex flex-col justify-between shadow-card hover:shadow-hover hover:border-coral/60 transition-all">
              <div>
                <span className="font-sans font-bold text-[12px] uppercase tracking-wider text-deep-teal bg-white/85 px-2.5 py-1 rounded-md inline-block mb-3 border border-coral/20">
                  03 · REPRODUCTIVE HEALTH
                </span>
                <h3 className="text-2xl md:text-[28px] font-normal font-serif text-deep-teal mb-3 leading-snug">
                  Pain isn&apos;t something you have to ignore.
                </h3>
                <p className="text-[15.5px] text-charcoal/85 leading-relaxed mb-6 font-sans">
                  Learn about endometriosis, pelvic pain, period symptoms, and when to ask for help.
                </p>
              </div>
              <div>
                <Button
                  onClick={() => onNavigate("hub", "endo")}
                  className="w-full bg-raspberry text-white hover:bg-raspberry/90 justify-between text-[14.5px]"
                >
                  <span>Explore reproductive health</span>
                  <span aria-hidden="true">→</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "THE RESEARCH GAP" SECTION: Full-Bleed Deep Teal (#174C4F) */}
      <section className="w-full bg-[#174C4F] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          {/* Small label: THE RESEARCH GAP (Coral #F47A6A) */}
          <div className="inline-flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-widest text-coral mb-3">
            <span className="w-2 h-2 rounded-full bg-coral" />
            <span>THE RESEARCH GAP</span>
          </div>

          {/* Large heading */}
          <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-bold font-serif text-light-teal !text-light-teal leading-[1.12] mb-5 tracking-tight max-w-3xl">
            What happens when questions aren&apos;t asked?
          </h2>

          {/* Explanatory text */}
          <p className="text-[17px] md:text-[18.5px] text-white/90 leading-relaxed font-sans mb-10 max-w-3xl">
            For generations, gaps in medical research have contributed to important questions about women&apos;s health receiving less attention. That can make it harder for girls and women to recognize symptoms, understand their bodies, and advocate for the care they need.
          </p>

          {/* Horizontal Visual Pathway: 6 connected steps */}
          <div className="pt-6 border-t border-white/15">
            <div className="text-xs uppercase font-bold tracking-wider text-coral mb-5 font-sans flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-coral" />
              <span>The Pathway from Gap to Self-Advocacy:</span>
            </div>

            {/* Desktop Horizontal Grid / Mobile Vertical Sequence */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-3 lg:gap-2">
              {/* Step 1: RESEARCH */}
              <div className="rounded-xl bg-white/10 border border-white/15 p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-coral uppercase tracking-wider block font-sans mb-1">
                    01
                  </span>
                  <h4 className="font-bold text-[14px] text-white tracking-wide font-sans mb-1.5">
                    RESEARCH
                  </h4>
                  <p className="text-[12px] text-white/80 font-sans leading-relaxed m-0">
                    Historical biomedical research underrepresented female hormonal cycles and cells.
                  </p>
                </div>
                <div className="hidden md:flex justify-end pt-2 text-coral font-bold text-sm">
                  →
                </div>
                <div className="md:hidden flex justify-center pt-2 text-coral font-bold text-sm">
                  ↓
                </div>
              </div>

              {/* Step 2: WHAT WE KNOW */}
              <div className="rounded-xl bg-white/10 border border-white/15 p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-coral uppercase tracking-wider block font-sans mb-1">
                    02
                  </span>
                  <h4 className="font-bold text-[14px] text-white tracking-wide font-sans mb-1.5">
                    WHAT WE KNOW
                  </h4>
                  <p className="text-[12px] text-white/80 font-sans leading-relaxed m-0">
                    Foundational biology: menstrual cycle length, hormone feedback, and ovulation.
                  </p>
                </div>
                <div className="hidden md:flex justify-end pt-2 text-coral font-bold text-sm">
                  →
                </div>
                <div className="md:hidden flex justify-center pt-2 text-coral font-bold text-sm">
                  ↓
                </div>
              </div>

              {/* Step 3: WHAT MAY BE MISSED */}
              <div className="rounded-xl bg-white/10 border border-white/15 p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-coral uppercase tracking-wider block font-sans mb-1">
                    03
                  </span>
                  <h4 className="font-bold text-[14px] text-white tracking-wide font-sans mb-1.5">
                    WHAT MAY BE MISSED
                  </h4>
                  <p className="text-[12px] text-white/80 font-sans leading-relaxed m-0">
                    Under-researched conditions like Endometriosis, RED-S, and atypical PCOS presentations.
                  </p>
                </div>
                <div className="hidden md:flex justify-end pt-2 text-coral font-bold text-sm">
                  →
                </div>
                <div className="md:hidden flex justify-center pt-2 text-coral font-bold text-sm">
                  ↓
                </div>
              </div>

              {/* Step 4: RECOGNIZE THE SIGNS */}
              <div className="rounded-xl bg-white/10 border border-white/15 p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-coral uppercase tracking-wider block font-sans mb-1">
                    04
                  </span>
                  <h4 className="font-bold text-[14px] text-white tracking-wide font-sans mb-1.5">
                    RECOGNIZE THE SIGNS
                  </h4>
                  <p className="text-[12px] text-white/80 font-sans leading-relaxed m-0">
                    Validating that debilitating pain, cycle loss, or extreme fatigue are real medical data.
                  </p>
                </div>
                <div className="hidden md:flex justify-end pt-2 text-coral font-bold text-sm">
                  →
                </div>
                <div className="md:hidden flex justify-center pt-2 text-coral font-bold text-sm">
                  ↓
                </div>
              </div>

              {/* Step 5: ASK QUESTIONS */}
              <div className="rounded-xl bg-white/10 border border-white/15 p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-coral uppercase tracking-wider block font-sans mb-1">
                    05
                  </span>
                  <h4 className="font-bold text-[14px] text-white tracking-wide font-sans mb-1.5">
                    ASK QUESTIONS
                  </h4>
                  <p className="text-[12px] text-white/80 font-sans leading-relaxed m-0">
                    Preparing targeted questions and symptom tracking logs before doctor appointments.
                  </p>
                </div>
                <div className="hidden md:flex justify-end pt-2 text-coral font-bold text-sm">
                  →
                </div>
                <div className="md:hidden flex justify-center pt-2 text-coral font-bold text-sm">
                  ↓
                </div>
              </div>

              {/* Step 6: ADVOCATE FOR YOURSELF */}
              <div className="rounded-xl bg-raspberry text-white border border-raspberry p-4 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-[11px] font-bold text-white/90 uppercase tracking-wider block font-sans mb-1">
                    06
                  </span>
                  <h4 className="font-bold text-[14px] text-white tracking-wide font-sans mb-1.5">
                    ADVOCATE FOR YOURSELF
                  </h4>
                  <p className="text-[12px] text-white/90 font-sans leading-relaxed m-0">
                    Building the confidence, vocabulary, and evidence to be taken seriously by clinicians.
                  </p>
                </div>
                <div className="hidden md:flex justify-end pt-2 text-white font-bold text-sm">
                  ✓
                </div>
              </div>
            </div>
          </div>

          {/* Evidence & Credible Sources Links */}
          <div className="mt-8 pt-6 border-t border-white/15">
            <div className="text-xs uppercase font-bold tracking-wider text-coral mb-3 font-sans flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-coral" />
              <span>Credible Research Evidence &amp; Medical Grounding:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-sans text-white/80">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <strong className="text-coral block mb-0.5">NIH ORWH Policy:</strong>
                Inclusion of Women in Clinical Trials and Biomedical Research Mandates
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <strong className="text-coral block mb-0.5">The Lancet:</strong>
                Advancing the Science of Women&apos;s Health &amp; Eliminating Evidence Gaps
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <strong className="text-coral block mb-0.5">ACOG Guideline 760:</strong>
                Adolescent Dysmenorrhea &amp; Endometriosis Early Diagnosis Protocols
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <strong className="text-coral block mb-0.5">BJSM / IOC Consensus:</strong>
                Relative Energy Deficiency in Sport (RED-S) &amp; Skeletal Health Criteria
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 text-xs font-sans text-white/70 flex-wrap">
              <span>All statistics and guidelines verified through our medical advisory network.</span>
              <button
                onClick={() => onNavigate("story")}
                className="text-coral hover:underline font-semibold flex items-center gap-1"
              >
                <span>Read full research background</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE "COULD THIS BE YOU?" SYMPTOM EXPLORER: Light Teal (#D8EFED) */}
      <section className="w-full bg-light-teal text-charcoal py-16 md:py-24">
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

      {/* 6. SELF-ADVOCACY TOOLKIT: Full-Bleed Coral (#F47A6A) */}
      <section className="w-full bg-coral text-deep-teal py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deep-teal mb-2 font-sans">
                <Sparkles className="w-3.5 h-3.5 text-deep-teal" />
                Empowerment Tools
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Track your symptoms */}
            <div
              onClick={() => {
                setActiveToolkitTab("track");
                setToolkitModalOpen(true);
              }}
              className="p-6 rounded-2xl bg-white text-charcoal border border-white/50 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <span className="text-2xl mb-3 block">📝</span>
                <h3 className="text-lg font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors mb-2">
                  Track your symptoms
                </h3>
                <p className="text-[14px] text-charcoal/75 leading-relaxed font-sans m-0">
                  Download a symptom tracker to document frequency, severity, and cycle patterns.
                </p>
              </div>
              <span className="text-xs font-bold text-raspberry mt-4 block font-sans">
                Open tracker guide →
              </span>
            </div>

            {/* Card 2: Prepare for an appointment */}
            <div
              onClick={() => {
                setActiveToolkitTab("prepare");
                setToolkitModalOpen(true);
              }}
              className="p-6 rounded-2xl bg-white text-charcoal border border-white/50 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <span className="text-2xl mb-3 block">💬</span>
                <h3 className="text-lg font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors mb-2">
                  Prepare for an appointment
                </h3>
                <p className="text-[14px] text-charcoal/75 leading-relaxed font-sans m-0">
                  Build a personalized list of prioritized questions before seeing a healthcare provider.
                </p>
              </div>
              <span className="text-xs font-bold text-raspberry mt-4 block font-sans">
                Build question list →
              </span>
            </div>

            {/* Card 3: Learn the language */}
            <div
              onClick={() => {
                setActiveToolkitTab("language");
                setToolkitModalOpen(true);
              }}
              className="p-6 rounded-2xl bg-white text-charcoal border border-white/50 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <span className="text-2xl mb-3 block">📚</span>
                <h3 className="text-lg font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors mb-2">
                  Learn the language
                </h3>
                <p className="text-[14px] text-charcoal/75 leading-relaxed font-sans m-0">
                  Understand terms like PCOS, endometriosis, energy availability, and amenorrhea.
                </p>
              </div>
              <span className="text-xs font-bold text-raspberry mt-4 block font-sans">
                Explore terminology →
              </span>
            </div>

            {/* Card 4: Speak up */}
            <div
              onClick={() => {
                setActiveToolkitTab("speak");
                setToolkitModalOpen(true);
              }}
              className="p-6 rounded-2xl bg-white text-charcoal border border-white/50 shadow-card hover:shadow-hover hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <span className="text-2xl mb-3 block">🗣️</span>
                <h3 className="text-lg font-serif font-bold text-deep-teal group-hover:text-raspberry transition-colors mb-2">
                  Speak up
                </h3>
                <p className="text-[14px] text-charcoal/75 leading-relaxed font-sans m-0">
                  Practice explaining your symptoms clearly and responding when you feel dismissed.
                </p>
              </div>
              <span className="text-xs font-bold text-raspberry mt-4 block font-sans">
                Practice conversation scripts →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MYTHS & FACTS INTERACTIVE FEATURE: Full-Bleed Raspberry (#B83F68) */}
      <section className="w-full bg-raspberry text-white py-16 md:py-24">
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
            {featuredMyths.map((item) => {
              const isRevealed = revealedHomeMyths.has(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleHomeMyth(item.id)}
                  className="rounded-2xl bg-white text-charcoal p-7 flex flex-col justify-between shadow-lg cursor-pointer hover:shadow-2xl transition-all border border-white/20 group"
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
      <section className="w-full bg-warm-cream text-charcoal py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto px-6 space-y-16">
          {/* Upcoming Workshops Section */}
          <div className="rounded-2xl bg-white border border-deep-teal/15 p-8 md:p-12 shadow-card">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-raspberry mb-2 font-sans">
                  <Calendar className="w-3.5 h-3.5 text-coral" />
                  Latest &amp; Upcoming Workshops
                </div>
                <h2 className="text-3xl md:text-[42px] lg:text-[48px] font-normal font-serif text-deep-teal leading-[1.15]">
                  Join a free, honest workshop
                </h2>
                <p className="text-[17px] md:text-[18px] text-charcoal/80 max-w-xl mt-2 mb-0 font-sans">
                  Interactive, non-judgmental sessions led by youth educators. Reserve your free spot or view full workshop agendas.
                </p>
              </div>

              <Button
                onClick={() => onNavigate("workshops")}
                variant="default"
                className="bg-raspberry text-white hover:bg-raspberry/90 gap-2 self-start md:self-end whitespace-nowrap shadow-sm text-[15px]"
              >
                See All Workshops
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {UPCOMING_SESSIONS.slice(0, 3).map((session) => (
                <Card
                  key={session.id}
                  className="p-6 bg-warm-cream/50 border border-deep-teal/15 flex flex-col justify-between hover:shadow-hover hover:-translate-y-0.5 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-serif text-2xl font-bold text-deep-teal">
                        {session.date}
                      </span>
                      <span
                        className={`text-[12px] font-bold px-2.5 py-0.5 rounded ${
                          session.isOnline
                            ? "bg-light-teal text-deep-teal border border-deep-teal/20"
                            : "bg-soft-pink text-deep-teal border border-coral/30"
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
                      Reserve on Workshop Page →
                    </Button>
                  </div>
                </Card>
              ))}
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
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                  activeToolkitTab === "prepare"
                    ? "bg-raspberry text-white hover:bg-raspberry hover:text-white active:text-white focus:text-white"
                    : "text-charcoal/80 hover:bg-light-teal hover:text-deep-teal active:text-charcoal focus:text-deep-teal"
                }`}
              >
                💬 Prepare for Appointment
              </button>
              <button
                onClick={() => setActiveToolkitTab("track")}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                  activeToolkitTab === "track"
                    ? "bg-raspberry text-white hover:bg-raspberry hover:text-white active:text-white focus:text-white"
                    : "text-charcoal/80 hover:bg-light-teal hover:text-deep-teal active:text-charcoal focus:text-deep-teal"
                }`}
              >
                📝 Symptom Tracker
              </button>
              <button
                onClick={() => setActiveToolkitTab("language")}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                  activeToolkitTab === "language"
                    ? "bg-raspberry text-white hover:bg-raspberry hover:text-white active:text-white focus:text-white"
                    : "text-charcoal/80 hover:bg-light-teal hover:text-deep-teal active:text-charcoal focus:text-deep-teal"
                }`}
              >
                📚 Learn the Language
              </button>
              <button
                onClick={() => setActiveToolkitTab("speak")}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                  activeToolkitTab === "speak"
                    ? "bg-raspberry text-white hover:bg-raspberry hover:text-white active:text-white focus:text-white"
                    : "text-charcoal/80 hover:bg-light-teal hover:text-deep-teal active:text-charcoal focus:text-deep-teal"
                }`}
              >
                🗣️ Practice Speaking Up
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

            <div className="pt-2 border-t border-deep-teal/10 flex items-center justify-end">
              <Button
                onClick={() => setToolkitModalOpen(false)}
                className="bg-raspberry text-white hover:bg-raspberry/90 text-sm"
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
