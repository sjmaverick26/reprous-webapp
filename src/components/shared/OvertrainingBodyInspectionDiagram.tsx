"use client";

import React, { useState } from "react";
import { LessonDiagram } from "@/data/hubData";
import {
  Brain,
  Heart,
  ShieldAlert,
  Sparkles,
  Thermometer,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Moon,
  Activity,
  Search,
  ZoomIn,
  Info,
  Check,
  RefreshCw,
  User,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  Flame,
  Scale,
  Clock,
  ExternalLink,
  X,
} from "lucide-react";

export type HotspotId =
  | "brain"
  | "thyroid"
  | "heart"
  | "immune"
  | "gut"
  | "reproductive"
  | "muscles"
  | "bones";

export interface HotspotData {
  id: HotspotId;
  name: string;
  system: string;
  category: "Neuroendocrine" | "Metabolic" | "Cardiovascular" | "Immune" | "Digestive" | "Hormonal / Reproductive" | "Musculoskeletal";
  tagColor: string;
  x: number;
  y: number;
  lensOffset: { hx: number; hy: number };
  warningSigns: string[];
  physiologicalMechanism: string;
  femaleSpecificImpact: string;
  recoverySolution: string;
  clinicalMarker: string;
}

export const OVERTRAINING_HOTSPOTS: Record<HotspotId, HotspotData> = {
  brain: {
    id: "brain",
    name: "Neuroendocrine & Sleep Architecture",
    system: "Central Nervous System & Hypothalamic Axis",
    category: "Neuroendocrine",
    tagColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    x: 170,
    y: 56,
    lensOffset: { hx: 232, hy: 28 },
    warningSigns: [
      "Tired but wired: extreme physical exhaustion coupled with inability to fall asleep",
      "Waking up at 2:00–3:30 AM with a racing heart and night sweats",
    ],
    physiologicalMechanism:
      "HPA-axis overactivation and nocturnal cortisol spikes disrupt deep Stage 3/4 sleep, halting nighttime tissue repair and human growth hormone release.",
    femaleSpecificImpact:
      "Elevated cortisol suppresses hypothalamic GnRH pulses, acting as the primary neurochemical trigger that turns off normal menstrual cycles.",
    recoverySolution:
      "Target 8.5–10 hours of sleep, add a bedtime carbohydrate snack to lower evening cortisol, and schedule full weekly rest days.",
    clinicalMarker: "Nocturnal salivary cortisol spike & deep sleep deficit (<15%)",
  },
  thyroid: {
    id: "thyroid",
    name: "Thyroid & Metabolic Regulation",
    system: "Endocrine & Basal Metabolic Rate",
    category: "Metabolic",
    tagColor: "bg-amber-100 text-amber-800 border-amber-200",
    x: 170,
    y: 110,
    lensOffset: { hx: 236, hy: 90 },
    warningSigns: [
      "Freezing cold hands, feet, and nose even indoors in warm rooms (cold intolerance)",
      "Sluggish dry skin, brittle hair shedding in the shower, and stalled workout recovery",
    ],
    physiologicalMechanism:
      "When energy availability drops below 30 kcal/kg FFM/day, the liver stops converting T4 into active T3, lowering metabolic rate by 15–25% to conserve fuel.",
    femaleSpecificImpact:
      "Suppressed T3 slows ovarian follicle development and synergizes with low estrogen to weaken bone remodeling.",
    recoverySolution:
      "Increase daily food intake to match training demands (>45 kcal/kg FFM/day) with warm, complex-carbohydrate meals.",
    clinicalMarker: "Low Free T3 (<2.5 pg/mL) with normal or low TSH",
  },
  heart: {
    id: "heart",
    name: "Cardiovascular & Autonomic Balance",
    system: "Autonomic Nervous System & Cardiac Function",
    category: "Cardiovascular",
    tagColor: "bg-rose-100 text-rose-800 border-rose-200",
    x: 154,
    y: 165,
    lensOffset: { hx: 95, hy: 140 },
    warningSigns: [
      "Waking resting heart rate spiked +5 to 12+ bpm above normal baseline",
      "Plummeting Heart Rate Variability (HRV) and lightheadedness when standing up quickly",
    ],
    physiologicalMechanism:
      "Sympathetic overdrive and decreased blood plasma volume force the heart to beat faster and harder just to maintain cardiac output.",
    femaleSpecificImpact:
      "Depleted estrogen impairs vascular nitric oxide dilation, leading to blood vessel stiffness and poor peripheral microcirculation.",
    recoverySolution:
      "Take 24–48 hours of low-intensity active recovery or full rest if morning heart rate stays elevated for 3 consecutive days.",
    clinicalMarker: "Waking heart rate >=5 bpm above baseline & suppressed 7-day HRV",
  },
  immune: {
    id: "immune",
    name: "Immune Defenses & Mucosal Barriers",
    system: "Lymphatic & Mucosal Immune System",
    category: "Immune",
    tagColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    x: 186,
    y: 160,
    lensOffset: { hx: 250, hy: 140 },
    warningSigns: [
      "Lingering sore throat, mild upper respiratory infections, and swollen neck glands",
      "Scrapes, blisters, and muscle soreness taking unusually long to heal",
    ],
    physiologicalMechanism:
      "Prolonged volume without fueling suppresses salivary IgA antibodies and natural killer cells, widening the open window of immune vulnerability.",
    femaleSpecificImpact:
      "Without regular cyclical estrogen and progesterone, the body loses cyclical immune protection and experiences chronic low-grade inflammation.",
    recoverySolution:
      "Eat 30–60g of carbohydrates during and post-workout to blunt immune suppression; supplement with zinc and Vitamin C.",
    clinicalMarker: "Depressed Salivary Secretory IgA (<40 mcg/mL)",
  },
  gut: {
    id: "gut",
    name: "Gastrointestinal Health & Absorption",
    system: "Digestive & Enteric Nervous System",
    category: "Digestive",
    tagColor: "bg-orange-100 text-orange-800 border-orange-200",
    x: 170,
    y: 225,
    lensOffset: { hx: 105, hy: 215 },
    warningSigns: [
      "Feeling painfully full or bloated hours after eating (delayed gastric emptying)",
      "Runner's stomach cramps, nausea, or runner's diarrhea during workouts",
    ],
    physiologicalMechanism:
      "Strenuous exercise shunts blood flow away from the intestines to muscles; chronic ischemia weakens gut tight-junction barriers.",
    femaleSpecificImpact:
      "Low reproductive hormones slow intestinal motility, causing bloating, gas, and impaired iron/calcium absorption.",
    recoverySolution:
      "Opt for easy-to-digest, lower-fiber carbs (rice, bananas, oats) near workouts and avoid high-stress rushed eating.",
    clinicalMarker: "Elevated fecal calprotectin & gut hypoperfusion symptoms",
  },
  reproductive: {
    id: "reproductive",
    name: "HPO Axis & Menstrual Regulation",
    system: "Hypothalamic-Pituitary-Ovarian (HPO) Axis",
    category: "Hormonal / Reproductive",
    tagColor: "bg-rose-100 text-rose-800 border-rose-200",
    x: 170,
    y: 285,
    lensOffset: { hx: 242, hy: 275 },
    warningSigns: [
      "Irregular periods (cycles >35 days) or completely missing periods (Amenorrhea)",
      "Vaginal dryness, severe energy dips, and loss of estrogen's athletic benefits",
    ],
    physiologicalMechanism:
      "Hypothalamic Kisspeptin sensors detect low energy and shut down GnRH pulses, halting LH/FSH and stopping ovarian estrogen production.",
    femaleSpecificImpact:
      "Missing a period is NEVER a healthy badge of athletic dedication. Low estrogen rapidly causes bone loss equivalent to post-menopause.",
    recoverySolution:
      "Immediately increase caloric intake and reduce training intensity by 15–20% to restore normal ovarian signaling.",
    clinicalMarker: "Serum Estradiol <20 pg/mL & LH <1.0 mIU/mL",
  },
  muscles: {
    id: "muscles",
    name: "Skeletal Muscle Glycogen & Repair",
    system: "Musculoskeletal & Energy Substrates",
    category: "Musculoskeletal",
    tagColor: "bg-teal-100 text-teal-800 border-teal-200",
    x: 142,
    y: 375,
    lensOffset: { hx: 82, hy: 365 },
    warningSigns: [
      "Persistent 'dead, heavy wooden legs' that do not loosen up even after warmups",
      "Muscle soreness lasting over 72 hours with loss of finishing sprint power",
    ],
    physiologicalMechanism:
      "Depleted glycogen reserves force the body to break down contractile muscle proteins (amino acids) for immediate fuel.",
    femaleSpecificImpact:
      "Estrogen normally protects muscle cell membranes and stimulates satellite cells for repair; low estrogen delays muscle fiber regeneration.",
    recoverySolution:
      "Refuel with 25g protein + 50g carbohydrates within 45 minutes post-workout, and allow 48 hours between hard sessions.",
    clinicalMarker: "Elevated serum Creatine Kinase (CK >500 U/L)",
  },
  bones: {
    id: "bones",
    name: "Bone Mineral Density & Skeletal Integrity",
    system: "Skeletal Architecture & Calcium Metabolism",
    category: "Musculoskeletal",
    tagColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    x: 196,
    y: 495,
    lensOffset: { hx: 258, hy: 485 },
    warningSigns: [
      "Pinpoint tenderness on the lower shin (tibia) or top of foot (metatarsals)",
      "Shin splints that worsen with every foot strike and persist during rest",
    ],
    physiologicalMechanism:
      "Without estrogen to brake bone breakdown, osteoclasts resorb bone faster than osteoblasts build it, turning impact microcracks into stress fractures.",
    femaleSpecificImpact:
      "Over 90% of lifetime bone density is banked before age 20. Bone lost during teen amenorrhea can cause lifelong osteoporosis.",
    recoverySolution:
      "Stop high-impact running immediately on focal bone pain; switch to pool/bike, ensure 1,300mg calcium + 2,000 IU Vitamin D3, and restore nutrition.",
    clinicalMarker: "DXA Z-score < -1.0 with focal bone edema on MRI",
  },
};

interface Props {
  diagram?: LessonDiagram;
  themeColor?: string;
}

export function OvertrainingBodyInspectionDiagram({ diagram, themeColor }: Props) {
  const [activeHotspot, setActiveHotspot] = useState<HotspotId>("reproductive");
  const [selectedCharacter, setSelectedCharacter] = useState<"sierra" | "maya" | "autumn" | "vivian">("sierra");
  const [activeTab, setActiveTab] = useState<"magnifier" | "female-vulnerability" | "checklist">("magnifier");
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const current = OVERTRAINING_HOTSPOTS[activeHotspot];

  // Character visual profiles
  const character = (() => {
    switch (selectedCharacter) {
      case "sierra":
        return {
          name: "Sierra",
          title: "Varsity Distance Runner (Age 17)",
          identity: "Caucasian, sun-kissed blonde",
          skinTone: "#E8B88A",
          skinShadow: "#CA9564",
          hairColor: "#F59E0B",
          hairAccent: "#D97706",
          hasGlasses: true,
          hasFreckles: false,
          glassesColor: "#0284C7", // Ocean blue sporty frames
          headbandColor: "#0D9488", // Teal athletic headband
          topColor: "#0D9488", // Teal running quarter-zip
          topAccentColor: "#99F6E4",
          tightsColor: "#1E293B", // Slate running tights
          tightsStripe: "#0D9488",
          shoeColor: "#0284C7",
          shoeAccent: "#38BDF8",
          scenarioNarrative:
            "Sierra doubled her weekly cross-country mileage from 32 to 54 miles while cutting carbs at dinner to 'get leaner for state qualifiers.' Over 4 weeks, her morning resting heart rate jumped from 50 to 63 bpm, she woke up at 2 AM drenched in sweat, missed two periods in a row, and developed an aching localized pain on her left tibial shin. Her body is not being lazy — it is shutting down non-essential organs in an emergency low-energy preservation cascade.",
        };
      case "maya":
        return {
          name: "Maya",
          title: "Varsity 400m Sprinter & Track Athlete (Age 17)",
          identity: "Black student athlete, box braids",
          skinTone: "#523321",
          skinShadow: "#3A2012",
          hairColor: "#0B0E14",
          hairAccent: "#1F2937",
          hasGlasses: false,
          hasFreckles: false,
          glassesColor: "#475569",
          headbandColor: "#F47A6A", // ReproUs coral headband
          topColor: "#F47A6A", // ReproUs coral athletic top
          topAccentColor: "#FFE4E6",
          tightsColor: "#0F172A", // Dark midnight tights
          tightsStripe: "#F47A6A",
          shoeColor: "#E11D48",
          shoeAccent: "#FDA4AF",
          scenarioNarrative:
            "Maya added daily pre-dawn plyometric bounding drills and sprint intervals on top of high school track practice, but skipped post-workout recovery smoothies because of her busy schedule. Within a month, her 400m split times degraded, she experienced persistent gastrointestinal cramps during workouts, caught two lingering upper respiratory colds, and her regular 28-day cycle completely stopped.",
        };
      case "autumn":
        return {
          name: "Autumn",
          title: "Varsity Swimmer & Triathlete (Age 17)",
          identity: "Caucasian, pale porcelain with natural ginger freckles",
          skinTone: "#FFF0E6",
          skinShadow: "#F6C8B5",
          hairColor: "#C2410C", // Natural fiery auburn-copper
          hairAccent: "#9A3412",
          hasGlasses: false,
          hasFreckles: true,
          glassesColor: "#475569",
          headbandColor: "#15803D", // Forest green athletic headband
          topColor: "#15803D", // Forest green quarter-zip
          topAccentColor: "#DCFCE7",
          tightsColor: "#1E293B",
          tightsStripe: "#15803D",
          shoeColor: "#059669",
          shoeAccent: "#6EE7B7",
          scenarioNarrative:
            "Autumn added two-a-day swim practices and high-intensity dryland resistance training while cutting dietary fats to 'feel lighter in the pool.' Over 5 weeks, she began shivering uncontrollably in the water (low T3 thyroid down-regulation), missed three consecutive menstrual periods, and developed debilitating fatigue during swim sets. She is not lacking mental toughness — her neuroendocrine system is in severe low energy availability (LEA).",
        };
      case "vivian":
      default:
        return {
          name: "Vivian",
          title: "Varsity Midfielder & Soccer Athlete (Age 17)",
          identity: "Asian student athlete, sleek dark hair",
          skinTone: "#F7D8BA",
          skinShadow: "#DFB38D",
          hairColor: "#18181B",
          hairAccent: "#27272A",
          hasGlasses: false,
          hasFreckles: false,
          glassesColor: "#475569",
          headbandColor: "#7C3AED", // Royal purple headband
          topColor: "#7C3AED", // Royal purple training top
          topAccentColor: "#EDE9FE",
          tightsColor: "#0F172A",
          tightsStripe: "#7C3AED",
          shoeColor: "#6D28D9",
          shoeAccent: "#A78BFA",
          scenarioNarrative:
            "Vivian played full 90-minute club soccer matches on weekends while running high-mileage interval practices every weekday. She noticed her sprint acceleration slowing down, caught two recurring sinus infections, and her menstrual cycle vanished for 3 months. When her coach told her to 'run through the fatigue,' sports medicine testing revealed elevated resting heart rate, suppressed bone turnover markers, and secondary amenorrhea.",
        };
    }
  })();

  return (
    <div className="rounded-3xl border-2 border-deep-teal/20 bg-white p-4 md:p-6 shadow-md space-y-6 font-sans">
      {/* ------------------------------------------------------------------ */}
      {/* 1. ATHLETE SCENARIO CARD ON TOP                                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-2xl border-2 border-amber-300/80 bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white p-4 md:p-5 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/70 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-white shadow-xs">
              <Stethoscope className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900">
                Relatable Athlete Case Study & Clinical Scenario
              </span>
              <h4 className="text-base md:text-lg font-serif font-bold text-charcoal leading-tight">
                {character.name}&apos;s Body Under Overtraining Strain
              </h4>
            </div>
          </div>

          {/* Character Switcher */}
          <div className="flex items-center gap-1.5 bg-white/90 p-1 rounded-xl border border-amber-200 shadow-2xs flex-wrap">
            <span className="text-[11px] font-semibold text-charcoal/70 px-1.5 flex items-center gap-1">
              <User className="w-3 h-3 text-deep-teal" /> Athlete:
            </span>
            <button
              onClick={() => setSelectedCharacter("sierra")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCharacter === "sierra"
                  ? "bg-deep-teal text-white shadow-xs"
                  : "text-charcoal/70 hover:bg-slate-100"
              }`}
            >
              Sierra (Runner)
            </button>
            <button
              onClick={() => setSelectedCharacter("maya")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCharacter === "maya"
                  ? "bg-coral text-white shadow-xs"
                  : "text-charcoal/70 hover:bg-slate-100"
              }`}
            >
              Maya (Sprinter)
            </button>
            <button
              onClick={() => setSelectedCharacter("autumn")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCharacter === "autumn"
                  ? "bg-emerald-700 text-white shadow-xs"
                  : "text-charcoal/70 hover:bg-slate-100"
              }`}
            >
              Autumn (Swimmer)
            </button>
            <button
              onClick={() => setSelectedCharacter("vivian")}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCharacter === "vivian"
                  ? "bg-violet-700 text-white shadow-xs"
                  : "text-charcoal/70 hover:bg-slate-100"
              }`}
            >
              Vivian (Soccer)
            </button>
          </div>
        </div>

        {/* Narrative Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-start">
          <div className="md:col-span-8 space-y-2">
            <p className="text-xs md:text-sm text-charcoal/90 leading-relaxed font-sans">
              <strong className="text-charcoal font-bold">{character.title}: </strong>
              {character.scenarioNarrative}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-amber-950">
              <span className="inline-flex items-center gap-1 bg-amber-100/90 text-amber-900 px-2.5 py-0.5 rounded-full font-bold border border-amber-200">
                <AlertTriangle className="w-3 h-3 text-amber-700" />
                Root Cause: Low Energy Availability (LEA)
              </span>
              <span className="inline-flex items-center gap-1 bg-rose-100/90 text-rose-900 px-2.5 py-0.5 rounded-full font-bold border border-rose-200">
                <ShieldAlert className="w-3 h-3 text-rose-600" />
                Emergency Endocrine Preservation
              </span>
            </div>
          </div>

          <div className="md:col-span-4 rounded-xl bg-white/95 p-3 border border-amber-200 shadow-2xs space-y-1.5 text-[11.5px]">
            <div className="flex items-center gap-1 text-deep-teal font-bold uppercase tracking-wider text-[10px]">
              <Search className="w-3 h-3 text-deep-teal" />
              Inspection Mission
            </div>
            <p className="text-charcoal/80 leading-snug">
              Use the interactive magnifying glass on the anatomical figure below to pinpoint each system under distress and explore how under-recovery affects women.
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. MODE NAVIGATION TABS                                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab("magnifier")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === "magnifier"
                ? "bg-white text-deep-teal shadow-xs font-extrabold"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            <ZoomIn className="w-3.5 h-3.5 text-deep-teal" />
            Magnified Anatomical Inspection
          </button>
          <button
            onClick={() => setActiveTab("female-vulnerability")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === "female-vulnerability"
                ? "bg-white text-raspberry shadow-xs font-extrabold"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-raspberry" />
            Why Women Are Uniquely Affected
          </button>
          <button
            onClick={() => setActiveTab("checklist")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === "checklist"
                ? "bg-white text-emerald-800 shadow-xs font-extrabold"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            Healthy Fatigue vs. Overtraining
          </button>
        </div>

        <div className="text-[11px] font-semibold text-deep-teal bg-light-teal/70 px-2.5 py-1 rounded-full border border-deep-teal/20 flex items-center gap-1">
          <Info className="w-3 h-3 text-deep-teal" />
          Click any body pin or button to steer magnifying glass
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. MAIN INTERACTIVE WORKSPACE (BODY + DIAGNOSTIC CARDS)           */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === "magnifier" && (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto space-y-4">
          {/* Header Action Bar */}
          <div className="w-full flex flex-wrap items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-deep-teal text-white shadow-2xs">
                <Search className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold text-charcoal">
                Click any body pin or the magnifying glass lens to reveal clinical findings
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-deep-teal uppercase tracking-wide bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                Target: {current.name} ({current.category})
              </span>
              <button
                onClick={() => setIsDetailOpen(true)}
                className="px-3 py-1 bg-deep-teal text-white text-xs font-bold rounded-lg shadow-xs hover:bg-deep-teal/90 transition-all flex items-center gap-1 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                Open Findings
              </button>
            </div>
          </div>

          {/* SVG CANVAS CONTAINER: ENLARGED FULL SCREEN FEEL (PRESERVES HEIGHT) */}
          <div className="relative w-full max-w-[580px] sm:max-w-[620px] rounded-3xl bg-gradient-to-b from-slate-50 via-teal-50/20 to-slate-100 p-3 sm:p-5 border-2 border-deep-teal/20 shadow-md flex flex-col items-center overflow-hidden">
            {/* Subtle background grid & anatomical measurement lines */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#175B5C 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />

            {/* Status Header inside canvas */}
            <div className="w-full flex items-center justify-between z-10 px-2 py-1 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/60">
                Full Body Anatomical Scan ({character.name})
              </span>
              <span className="text-[10px] font-extrabold text-rose-700 bg-rose-100/90 px-2.5 py-0.5 rounded-full border border-rose-200 flex items-center gap-1 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping inline-block" />
                Active Inspection Lens
              </span>
            </div>

            {/* The SVG Body & Magnifying Glass */}
            <svg
              viewBox="0 0 340 680"
              className="w-full h-auto drop-shadow-md select-none z-10"
              style={{ maxHeight: "680px" }}
            >
                <defs>
                  {/* Lens Glass Gradient */}
                  <linearGradient id="lensGlassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
                    <stop offset="45%" stopColor="#E0F2FE" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity="0.25" />
                  </linearGradient>

                  {/* Lens Rim Metallic Gradient */}
                  <linearGradient id="lensRimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0D9488" />
                    <stop offset="50%" stopColor="#14B8A6" />
                    <stop offset="100%" stopColor="#0F766E" />
                  </linearGradient>

                  {/* Handle Gradient */}
                  <linearGradient id="handleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="50%" stopColor="#1E293B" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </linearGradient>

                  {/* Subtle drop shadow for magnifying glass */}
                  <filter id="lensShadow" x="-20%" y="-20%" width="150%" height="150%">
                    <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.35" />
                  </filter>
                </defs>

                {/* ============================================================== */}
                {/* CLOTHED CHARACTER BODY ILLUSTRATION (SIERRA / MAYA)           */}
                {/* ============================================================== */}

                {/* 1. Hair Background (Ponytail, Box Braids, or Auburn Waves) */}
                {selectedCharacter === "sierra" ? (
                  // Sierra's sleek high golden ponytail swishing to the right
                  <g>
                    {/* High athletic teal scrunchie / hairband */}
                    <circle cx="193" cy="49" r="4.5" fill="#0D9488" />
                    {/* Bouncy ponytail flowing down */}
                    <path
                      d="M 191 48 C 224 50, 242 80, 234 135 C 225 110, 215 78, 192 60 Z"
                      fill={character.hairColor}
                    />
                    {/* Highlight texture strands */}
                    <path
                      d="M 196 55 Q 226 88 225 130"
                      stroke={character.hairAccent}
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </g>
                ) : selectedCharacter === "maya" ? (
                  // Maya's box braids falling symmetrically behind shoulders
                  <g>
                    <path d="M 144 50 C 140 85, 136 140, 138 185 C 146 140, 148 85, 154 55 Z" fill={character.hairColor} />
                    <path d="M 196 50 C 200 85, 204 140, 202 185 C 194 140, 192 85, 186 55 Z" fill={character.hairColor} />
                  </g>
                ) : selectedCharacter === "autumn" ? (
                  // Autumn's natural flowing wavy ginger cascade
                  <g>
                    <path d="M 142 50 C 128 85, 122 135, 128 175 C 135 140, 140 85, 148 55 Z" fill={character.hairColor} />
                    <path d="M 198 50 C 212 85, 218 135, 212 175 C 205 140, 200 85, 192 55 Z" fill={character.hairColor} />
                    <path d="M 132 110 Q 128 145 132 170" stroke={character.hairAccent} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M 208 110 Q 212 145 208 170" stroke={character.hairAccent} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </g>
                ) : (
                  // Vivian's sleek dark ponytail
                  <g>
                    <circle cx="190" cy="50" r="4" fill="#7C3AED" />
                    <path d="M 172 48 C 205 52, 225 85, 220 135 C 212 110, 198 75, 178 58 Z" fill={character.hairColor} />
                    <path d="M 180 62 Q 210 92 210 130" stroke={character.hairAccent} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </g>
                )}

                {/* 2. Legs & Lower Body (Running compression tights / leggings) */}
                <g>
                  {/* Left Leg (Tights) */}
                  <path
                    d="M 152 300 C 150 330, 142 410, 144 470 C 146 510, 148 560, 150 585 L 164 585 C 166 560, 168 510, 166 470 C 164 410, 166 330, 168 300 Z"
                    fill={character.tightsColor}
                  />
                  {/* Right Leg (Tights) */}
                  <path
                    d="M 172 300 C 174 330, 176 410, 174 470 C 172 510, 174 560, 176 585 L 190 585 C 192 560, 194 510, 196 470 C 198 410, 190 330, 188 300 Z"
                    fill={character.tightsColor}
                  />

                  {/* Athletic Racing Contrast Stripes on Leggings */}
                  <path
                    d="M 145 320 C 143 380, 143 450, 145 520 C 146 550, 148 575, 149 585"
                    stroke={character.tightsStripe}
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 195 320 C 197 380, 197 450, 195 520 C 194 550, 192 575, 191 585"
                    stroke={character.tightsStripe}
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Knee articulation seam lines */}
                  <path d="M 148 440 Q 155 444 162 440" stroke="#334155" strokeWidth="1.2" fill="none" opacity="0.6" />
                  <path d="M 178 440 Q 185 444 192 440" stroke="#334155" strokeWidth="1.2" fill="none" opacity="0.6" />
                </g>

                {/* 3. Running Shoes / Trainers */}
                <g>
                  {/* Left Shoe */}
                  <path
                    d="M 145 585 C 145 580, 165 580, 165 585 L 167 608 C 167 614, 158 616, 138 616 C 130 616, 130 610, 135 605 Z"
                    fill={character.shoeColor}
                  />
                  {/* Left Shoe Sole */}
                  <path d="M 132 612 L 168 612 L 167 618 L 132 618 Z" fill="#FFFFFF" />
                  <path d="M 132 617 L 167 617 L 166 620 L 133 620 Z" fill="#334155" />
                  {/* Shoe Laces & Accent */}
                  <path d="M 146 592 L 158 592" stroke={character.shoeAccent} strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 147 596 L 157 596" stroke={character.shoeAccent} strokeWidth="1.8" strokeLinecap="round" />

                  {/* Right Shoe */}
                  <path
                    d="M 175 585 C 175 580, 195 580, 195 585 L 205 605 C 210 610, 210 616, 202 616 C 182 616, 173 614, 173 608 Z"
                    fill={character.shoeColor}
                  />
                  {/* Right Shoe Sole */}
                  <path d="M 172 612 L 208 612 L 208 618 L 173 618 Z" fill="#FFFFFF" />
                  <path d="M 174 617 L 207 617 L 207 620 L 174 620 Z" fill="#334155" />
                  {/* Shoe Laces & Accent */}
                  <path d="M 182 592 L 194 592" stroke={character.shoeAccent} strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M 183 596 L 193 596" stroke={character.shoeAccent} strokeWidth="1.8" strokeLinecap="round" />
                </g>

                {/* 4. Anatomical Neck Seamlessly Connecting Head to Torso */}
                <g>
                  {/* Solid neck cylinder bridging chin (y=84) down into jacket collar (y=122) */}
                  <rect x="159" y="74" width="22" height="48" rx="4" fill={character.skinTone} />
                  {/* Soft natural shadow cast under the chin */}
                  <path
                    d="M 159 84 Q 170 91 181 84 L 181 93 Q 170 99 159 93 Z"
                    fill={character.skinShadow}
                    opacity="0.32"
                  />
                  {/* Gentle muscle contour lines */}
                  <path
                    d="M 165 94 L 168 115"
                    stroke={character.skinShadow}
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    opacity="0.25"
                  />
                  <path
                    d="M 175 94 L 172 115"
                    stroke={character.skinShadow}
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    opacity="0.25"
                  />
                </g>

                {/* 5. Torso & Athletic Quarter-Zip Jacket */}
                <g>
                  {/* Base Jacket Torso */}
                  <path
                    d="M 128 135 C 128 118, 146 112, 170 112 C 194 112, 212 118, 212 135 L 216 280 C 216 295, 198 302, 170 302 C 142 302, 124 295, 124 280 Z"
                    fill={character.topColor}
                  />

                  {/* Breathable Athletic Contoured Side Panels */}
                  <path
                    d="M 128 145 C 134 180, 134 240, 126 280 L 124 280 L 128 145 Z"
                    fill="#0F766E"
                    opacity="0.4"
                  />
                  <path
                    d="M 212 145 C 206 180, 206 240, 214 280 L 216 280 L 212 145 Z"
                    fill="#0F766E"
                    opacity="0.4"
                  />

                  {/* Quarter-Zip Center Zipper Track */}
                  <line x1="170" y1="126" x2="170" y2="185" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3,1" />
                  {/* Zipper Pull Tab */}
                  <rect x="168" y="185" width="4" height="6" rx="1.5" fill="#E2E8F0" />

                  {/* Athletic Collar V-Opening framing neck */}
                  <path
                    d="M 152 112 Q 170 126 188 112"
                    stroke={character.topAccentColor}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Collar Stand Up Contour */}
                  <path
                    d="M 150 114 Q 170 108 190 114"
                    stroke={character.topColor}
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Waist hem band */}
                  <path
                    d="M 125 285 Q 170 292 215 285"
                    stroke={character.topAccentColor}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.75"
                  />
                </g>

                {/* 6. Arms & Hands with Athletic Runner's GPS Watch */}
                <g>
                  {/* Left Arm & Sleeve */}
                  <path
                    d="M 128 135 C 116 160, 108 210, 106 250 L 118 252 C 120 215, 126 170, 136 145 Z"
                    fill={character.topColor}
                  />
                  {/* Left Hand / Forearm */}
                  <path
                    d="M 106 250 C 104 265, 105 280, 109 292 C 113 296, 118 296, 119 290 C 121 278, 120 262, 118 252 Z"
                    fill={character.skinTone}
                  />
                  {/* GPS Athletic Runner's Watch on Left Wrist */}
                  <rect x="104" y="258" width="16" height="5" rx="1" fill="#0F172A" />
                  <rect x="108" y="256" width="8" height="9" rx="2" fill="#0284C7" stroke="#38BDF8" strokeWidth="0.8" />
                  <circle cx="112" cy="260.5" r="1.5" fill="#22C55E" />

                  {/* Right Arm & Sleeve */}
                  <path
                    d="M 212 135 C 224 160, 232 210, 234 250 L 222 252 C 220 215, 214 170, 204 145 Z"
                    fill={character.topColor}
                  />
                  {/* Right Hand / Forearm */}
                  <path
                    d="M 234 250 C 236 265, 235 280, 231 292 C 227 296, 222 296, 221 290 C 219 278, 220 262, 222 252 Z"
                    fill={character.skinTone}
                  />
                </g>

                {/* 7. Head & Facial Features (Matching Roleplay Avatar Art Style) */}
                <g>
                  {/* Head Base Oval (chin overlaps neck at y=84) */}
                  <ellipse cx="170" cy="58" rx="22" ry="26" fill={character.skinTone} />

                  {/* Ears with Gold Studs */}
                  <ellipse cx="147.5" cy="60" rx="3.2" ry="5.5" fill={character.skinTone} />
                  <ellipse cx="192.5" cy="60" rx="3.2" ry="5.5" fill={character.skinTone} />
                  <circle cx="147.5" cy="62.5" r="1.3" fill="#F59E0B" />
                  <circle cx="192.5" cy="62.5" r="1.3" fill="#F59E0B" />

                  {/* Hair Front Cap & Headband */}
                  {selectedCharacter === "sierra" ? (
                    <g>
                      {/* Blonde Hair sweep with crown contour */}
                      <path
                        d="M 148 58 C 144 28, 196 28, 192 58 C 195 44, 184 34, 170 34 C 156 34, 145 44, 148 58 Z"
                        fill={character.hairColor}
                      />
                      {/* Sporty Teal Headband */}
                      <path
                        d="M 149 46 Q 170 39 191 46"
                        stroke={character.headbandColor}
                        strokeWidth="4.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                      {/* Headband contrast stripe */}
                      <path
                        d="M 152 46 Q 170 40 188 46"
                        stroke="#99F6E4"
                        strokeWidth="1.2"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.75"
                      />
                    </g>
                  ) : selectedCharacter === "maya" ? (
                    <g>
                      {/* Maya's Box Braids crown */}
                      <path
                        d="M 148 58 C 144 26, 196 26, 192 58 C 195 40, 182 32, 170 32 C 158 32, 145 40, 148 58 Z"
                        fill={character.hairColor}
                      />
                      {/* Center part line on scalp */}
                      <line x1="170" y1="26" x2="170" y2="34" stroke="#262F3D" strokeWidth="1.2" strokeLinecap="round" />
                      {/* Coral Sporty Headband */}
                      <path
                        d="M 149 46 Q 170 39 191 46"
                        stroke={character.headbandColor}
                        strokeWidth="4.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>
                  ) : selectedCharacter === "autumn" ? (
                    <g>
                      {/* Autumn's natural auburn wave crown */}
                      <path
                        d="M 148 58 C 144 28, 196 28, 192 58 C 190 38, 180 32, 170 32 C 160 32, 150 38, 148 58 Z"
                        fill={character.hairColor}
                      />
                      {/* Green Athletic Headband */}
                      <path
                        d="M 149 46 Q 170 39 191 46"
                        stroke={character.headbandColor}
                        strokeWidth="4.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>
                  ) : (
                    <g>
                      {/* Vivian's sleek dark parted hair */}
                      <path
                        d="M 148 58 C 145 28, 195 28, 192 58 C 190 42, 182 35, 170 35 C 158 35, 150 42, 148 58 Z"
                        fill={character.hairColor}
                      />
                      {/* Purple Athletic Headband */}
                      <path
                        d="M 149 46 Q 170 39 191 46"
                        stroke={character.headbandColor}
                        strokeWidth="4.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </g>
                  )}

                  {/* Soft Warm Cheek Blush Glow */}
                  <ellipse cx="155" cy="65" rx="4.5" ry="2.5" fill="#F43F5E" opacity="0.25" />
                  <ellipse cx="185" cy="65" rx="4.5" ry="2.5" fill="#F43F5E" opacity="0.25" />

                  {/* Eyebrows */}
                  <path d="M 157 50 Q 163 47.5 168 50" stroke="#1F2937" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                  <path d="M 172 50 Q 177 47.5 183 50" stroke="#1F2937" strokeWidth="1.8" fill="none" strokeLinecap="round" />

                  {/* Eyes with Double Specular Highlights */}
                  <circle cx="163" cy="58" r="3" fill="#1E293B" />
                  <circle cx="177" cy="58" r="3" fill="#1E293B" />
                  <circle cx="164.2" cy="56.8" r="1" fill="#FFFFFF" />
                  <circle cx="178.2" cy="56.8" r="1" fill="#FFFFFF" />
                  <circle cx="162.2" cy="59" r="0.5" fill="#FFFFFF" opacity="0.75" />
                  <circle cx="176.2" cy="59" r="0.5" fill="#FFFFFF" opacity="0.75" />

                  {/* Natural Delicate Freckles (for Autumn) */}
                  {character.hasFreckles && (
                    <g opacity="0.65" fill="#B45309">
                      <circle cx="169" cy="62" r="0.6" />
                      <circle cx="171.5" cy="62.5" r="0.55" />
                      <circle cx="170" cy="60.5" r="0.55" />
                      <circle cx="156" cy="63" r="0.65" />
                      <circle cx="158" cy="64.5" r="0.6" />
                      <circle cx="160" cy="63.5" r="0.6" />
                      <circle cx="184" cy="63" r="0.65" />
                      <circle cx="182" cy="64.5" r="0.6" />
                      <circle cx="180" cy="63.5" r="0.6" />
                    </g>
                  )}

                  {/* Sporty Glasses (Sierra) */}
                  {character.hasGlasses && (
                    <g>
                      <circle cx="163" cy="58" r="7.5" fill="none" stroke={character.glassesColor} strokeWidth="1.8" />
                      <circle cx="177" cy="58" r="7.5" fill="none" stroke={character.glassesColor} strokeWidth="1.8" />
                      <line x1="170.5" y1="58" x2="169.5" y2="58" stroke={character.glassesColor} strokeWidth="1.8" />
                      <path d="M 158 54 L 165 54" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
                      <path d="M 172 54 L 179 54" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
                    </g>
                  )}

                  {/* Nose */}
                  <path d="M 170 56 L 169 63 L 172.5 63" stroke={character.skinShadow} strokeWidth="1.4" fill="none" strokeLinecap="round" />

                  {/* Mouth */}
                  <path d="M 164 71 Q 170 74 176 71" stroke={character.skinShadow} strokeWidth="1.8" fill="none" strokeLinecap="round" />
                  <path d="M 166 73 Q 170 75 174 73" stroke={character.skinShadow} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
                </g>

                {/* ============================================================== */}
                {/* 7. ANATOMICAL HOTSPOT PINS (8 ZONES)                          */}
                {/* ============================================================== */}
                {Object.values(OVERTRAINING_HOTSPOTS).map((spot) => {
                  const isSelected = activeHotspot === spot.id;
                  return (
                    <g
                      key={spot.id}
                      onClick={() => {
                        setActiveHotspot(spot.id);
                        setIsDetailOpen(true);
                      }}
                      className="cursor-pointer group"
                      tabIndex={0}
                      role="button"
                      aria-label={`Inspect ${spot.name}`}
                    >
                      {/* Outer pulsing wave for active hotspot */}
                      {isSelected && (
                        <circle
                          cx={spot.x}
                          cy={spot.y}
                          r="18"
                          fill="#F43F5E"
                          opacity="0.25"
                          className="animate-ping"
                        />
                      )}

                      {/* Hotspot anchor disc */}
                      <circle
                        cx={spot.x}
                        cy={spot.y}
                        r={isSelected ? "11" : "7.5"}
                        fill={isSelected ? "#E11D48" : "#0D9488"}
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        className="transition-all duration-200 group-hover:scale-125"
                      />

                      {/* Center white dot or icon mark */}
                      <circle
                        cx={spot.x}
                        cy={spot.y}
                        r={isSelected ? "4" : "2.5"}
                        fill="#FFFFFF"
                      />
                    </g>
                  );
                })}

                {/* ============================================================== */}
                {/* 8. DYNAMIC INTERACTIVE MAGNIFYING GLASS                       */}
                {/* ============================================================== */}
                <g
                  filter="url(#lensShadow)"
                  className="transition-all duration-300 cursor-pointer group"
                  onClick={() => setIsDetailOpen(true)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open findings for ${current.name}`}
                >
                  {/* Reticle inspection laser guide line connecting hotspot to lens center */}
                  <line
                    x1={current.x}
                    y1={current.y}
                    x2={current.lensOffset.hx}
                    y2={current.lensOffset.hy}
                    stroke="#E11D48"
                    strokeWidth="1.8"
                    strokeDasharray="3,2"
                    opacity="0.85"
                  />

                  {/* Pulsing Target Dot right on the anatomical organ */}
                  <circle cx={current.x} cy={current.y} r="5" fill="#E11D48" opacity="0.8" />
                  <circle cx={current.x} cy={current.y} r="10" stroke="#E11D48" strokeWidth="1.5" fill="none" opacity="0.6" />

                  {/* Magnifying Glass Outer Rim */}
                  <circle
                    cx={current.lensOffset.hx}
                    cy={current.lensOffset.hy}
                    r="34"
                    fill="url(#lensGlassGradient)"
                    stroke="url(#lensRimGradient)"
                    strokeWidth="4"
                    className="transition-all duration-200 group-hover:stroke-rose-500"
                  />

                  {/* Specular glare / glass reflection highlight arc */}
                  <path
                    d={`M ${current.lensOffset.hx - 22} ${current.lensOffset.hy - 12} A 26 26 0 0 1 ${current.lensOffset.hx + 12} ${current.lensOffset.hy - 24}`}
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.8"
                  />

                  {/* Reticle Crosshairs inside the lens */}
                  <line
                    x1={current.lensOffset.hx - 16}
                    y1={current.lensOffset.hy}
                    x2={current.lensOffset.hx + 16}
                    y2={current.lensOffset.hy}
                    stroke="#0284C7"
                    strokeWidth="1.2"
                    strokeDasharray="2,2"
                    opacity="0.7"
                  />
                  <line
                    x1={current.lensOffset.hx}
                    y1={current.lensOffset.hy - 16}
                    x2={current.lensOffset.hx}
                    y2={current.lensOffset.hy + 16}
                    stroke="#0284C7"
                    strokeWidth="1.2"
                    strokeDasharray="2,2"
                    opacity="0.7"
                  />
                  <circle cx={current.lensOffset.hx} cy={current.lensOffset.hy} r="3" fill="#E11D48" />

                  {/* Magnifying Glass Handle */}
                  {/* Calculate handle vector pointing outward */}
                  {(() => {
                    const angle = current.lensOffset.hx > 170 ? Math.PI / 4 : (3 * Math.PI) / 4;
                    const hx1 = current.lensOffset.hx + Math.cos(angle) * 34;
                    const hy1 = current.lensOffset.hy + Math.sin(angle) * 34;
                    const hx2 = current.lensOffset.hx + Math.cos(angle) * 65;
                    const hy2 = current.lensOffset.hy + Math.sin(angle) * 65;

                    return (
                      <g>
                        <line
                          x1={hx1}
                          y1={hy1}
                          x2={hx2}
                          y2={hy2}
                          stroke="url(#handleGradient)"
                          strokeWidth="7"
                          strokeLinecap="round"
                        />
                        {/* Metallic accent ring near collar of handle */}
                        <circle
                          cx={hx1 + Math.cos(angle) * 4}
                          cy={hy1 + Math.sin(angle) * 4}
                          r="4"
                          fill="#14B8A6"
                        />
                      </g>
                    );
                  })()}

                  {/* Magnified System Name Label Tag above the lens with clickable cue */}
                  <g>
                    <rect
                      x={current.lensOffset.hx - 58}
                      y={current.lensOffset.hy - 48}
                      width="116"
                      height="22"
                      rx="11"
                      fill="#0F172A"
                      opacity="0.95"
                    />
                    <text
                      x={current.lensOffset.hx}
                      y={current.lensOffset.hy - 34}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="system-ui, sans-serif"
                      letterSpacing="0.4"
                    >
                      {current.id.toUpperCase()} • CLICK FINDINGS
                    </text>
                  </g>
                </g>
              </svg>

              {/* Bottom Hotspot Quick Selector Pills */}
              <div className="w-full mt-3 grid grid-cols-2 sm:grid-cols-4 gap-1.5 z-10">
                {Object.values(OVERTRAINING_HOTSPOTS).map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => {
                      setActiveHotspot(spot.id);
                      setIsDetailOpen(true);
                    }}
                    className={`py-2 px-2 rounded-xl text-xs font-bold text-center transition-all truncate border flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeHotspot === spot.id
                        ? "bg-deep-teal text-white border-deep-teal shadow-xs font-extrabold"
                        : "bg-white/95 text-charcoal/80 border-slate-200 hover:bg-teal-50 hover:text-deep-teal hover:border-teal-300"
                    }`}
                    title={`Click to inspect ${spot.name}`}
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${activeHotspot === spot.id ? "bg-white" : "bg-rose-500"}`} />
                    <span>
                      {spot.id === "reproductive"
                        ? "Period / HPO"
                        : spot.id.charAt(0).toUpperCase() + spot.id.slice(1)}
                    </span>
                  </button>
                ))}
              </div>

              {/* Prominent Action Button to Open Findings */}
              <button
                onClick={() => setIsDetailOpen(true)}
                className="w-full mt-3 py-2.5 px-4 bg-gradient-to-r from-deep-teal to-teal-700 text-white font-bold text-xs rounded-xl shadow-xs hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer z-10"
              >
                <ZoomIn className="w-4 h-4" />
                Open {current.name} Findings
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          {/* ------------------------------------------------------------------ */}
          {/* POPUP MODAL: MAGNIFIED CLINICAL DIAGNOSTIC FINDINGS                */}
          {/* (Hidden unless pressed on spot pins / lens / buttons)              */}
          {/* ------------------------------------------------------------------ */}
          {isDetailOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-charcoal/60 backdrop-blur-xs animate-in fade-in duration-200"
              onClick={() => setIsDetailOpen(false)}
              role="dialog"
              aria-modal="true"
            >
              <div
                className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border-2 border-deep-teal/30 p-5 md:p-6 shadow-2xl space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deep-teal">
                      <ZoomIn className="w-4 h-4 text-deep-teal" />
                      Magnified Inspection Findings
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-charcoal mt-0.5">
                      {current.name}
                    </h3>
                    <div className="text-xs text-charcoal/70 mt-0.5">
                      Target: <strong className="text-charcoal">{current.system}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${current.tagColor}`}>
                      {current.category}
                    </span>
                    <button
                      onClick={() => setIsDetailOpen(false)}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-charcoal/60 hover:text-charcoal transition-colors cursor-pointer"
                      aria-label="Close inspection findings"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Warning Signs (2 bullets) */}
                <div className="rounded-xl bg-rose-50/90 border border-rose-200 p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-rose-950 uppercase tracking-wide">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    Warning Signs in Female Athletes:
                  </div>
                  <ul className="space-y-1 text-xs text-rose-950/90 pl-1">
                    {current.warningSigns.map((sign, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Biological Mechanism */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-charcoal uppercase tracking-wide">
                    <Activity className="w-3.5 h-3.5 text-deep-teal" />
                    Physiological Mechanism:
                  </div>
                  <p className="text-xs md:text-sm text-charcoal/85 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {current.physiologicalMechanism}
                  </p>
                </div>

                {/* Female Biological Impact */}
                <div className="rounded-xl bg-pink-50/80 border border-pink-200 p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-pink-950 uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-raspberry shrink-0" />
                    Female Biology Impact:
                  </div>
                  <p className="text-xs md:text-sm text-pink-950/90 leading-relaxed font-medium">
                    {current.femaleSpecificImpact}
                  </p>
                </div>

                {/* Recovery Prescription */}
                <div className="rounded-xl bg-emerald-50/90 border border-emerald-200 p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-950 uppercase tracking-wide">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Recovery Prescription:
                  </div>
                  <p className="text-xs md:text-sm text-emerald-950/90 leading-relaxed">
                    {current.recoverySolution}
                  </p>
                </div>

                {/* Clinical Biomarker */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-charcoal/70">
                  <span className="font-semibold text-charcoal flex items-center gap-1">
                    <Stethoscope className="w-3.5 h-3.5 text-deep-teal" />
                    Key Clinical Marker:
                  </span>
                  <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-charcoal font-medium text-right">
                    {current.clinicalMarker}
                  </span>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-charcoal/60">
                    Click another spot or close to return to full scan
                  </span>
                  <button
                    onClick={() => setIsDetailOpen(false)}
                    className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-charcoal text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Back to Scan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 4. TAB 2: WHY WOMEN ARE UNIQUELY AFFECTED (DEEP PHYSIOLOGY)       */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === "female-vulnerability" && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-r from-teal-50 via-pink-50/40 to-amber-50 p-4 md:p-5 border border-deep-teal/20">
            <h4 className="text-base md:text-lg font-serif font-bold text-deep-teal mb-1">
              Why Female Athletes Face Unique Physiological Risks Under-Fueling
            </h4>
            <p className="text-xs md:text-sm text-charcoal/80 leading-relaxed">
              Overtraining in female athletes is rarely just muscular fatigue. Because female reproductive biology is intricately wired to available food energy, an energy deficit sparks a systemic endocrine alarm that impacts bones, blood vessels, and metabolism far earlier than in male athletes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pillar 1: Kisspeptin & The 30 kcal Threshold */}
            <div className="rounded-2xl border-2 border-pink-200 bg-white p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-pink-100 text-raspberry flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <h5 className="font-bold text-sm text-charcoal leading-tight">
                  The Kisspeptin Energy Threshold
                </h5>
              </div>
              <p className="text-xs text-charcoal/80 leading-relaxed">
                The female hypothalamus contains a dense concentration of <strong className="text-raspberry">Kisspeptin (KISS1) neurons</strong> that act as high-sensitivity fuel gauges. If daily energy availability drops below <strong className="text-charcoal">30 kcal/kg Fat-Free Mass</strong>, Kisspeptin stops firing.
              </p>
              <div className="p-2 rounded-lg bg-pink-50 text-[11px] text-pink-900 border border-pink-200">
                <strong>Result:</strong> Halts GnRH pulses, preventing ovulation and triggering Functional Hypothalamic Amenorrhea (FHA).
              </div>
            </div>

            {/* Pillar 2: Irreversible Bone Density Window */}
            <div className="rounded-2xl border-2 border-cyan-200 bg-white p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <h5 className="font-bold text-sm text-charcoal leading-tight">
                  The Peak Bone Mass Window
                </h5>
              </div>
              <p className="text-xs text-charcoal/80 leading-relaxed">
                Over <strong className="text-cyan-900">90% of a woman&apos;s adult bone density</strong> is permanently built before age 20. When estrogen crashes from overtraining, osteoclasts dismantle bone faster than osteoblasts can rebuild.
              </p>
              <div className="p-2 rounded-lg bg-cyan-50 text-[11px] text-cyan-950 border border-cyan-200">
                <strong>Result:</strong> An amenorrheic teen athlete can lose 3–5% of vertebral bone mass in a single season — damage that cannot be fully regained in adult life.
              </div>
            </div>

            {/* Pillar 3: Estrogen as a Multitasking Performance Hormone */}
            <div className="rounded-2xl border-2 border-teal-200 bg-white p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-teal-100 text-deep-teal flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <h5 className="font-bold text-sm text-charcoal leading-tight">
                  Estrogen: The Systemic Shield
                </h5>
              </div>
              <p className="text-xs text-charcoal/80 leading-relaxed">
                Estrogen is not merely a fertility hormone. It stimulates <strong className="text-deep-teal">endothelial nitric oxide</strong> for flexible blood vessels, preserves muscle satellite cells for fiber repair, and sustains brain serotonin.
              </p>
              <div className="p-2 rounded-lg bg-teal-50 text-[11px] text-teal-950 border border-teal-200">
                <strong>Result:</strong> Suppressed estrogen leads to premature vascular stiffness, impaired muscle rebuilding, mood disruption, and recurrent joint laxity injuries.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 5. TAB 3: HEALTHY FATIGUE VS. OVERTRAINING CHECKLIST               */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === "checklist" && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
            <h4 className="text-base font-bold text-charcoal mb-1">
              Differential Diagnosis: Healthy Training Fatigue vs. Chronic Overtraining
            </h4>
            <p className="text-xs text-charcoal/70">
              Athletes expect to feel tired after hard training blocks. Use this clinical comparison table to distinguish between productive adaptation and dangerous overtraining.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-charcoal">
                  <th className="p-3 font-bold uppercase tracking-wider text-[11px]">Physiological Parameter</th>
                  <th className="p-3 font-bold uppercase tracking-wider text-[11px] text-emerald-800 bg-emerald-50/70">
                    Productive Fatigue (Green Flag)
                  </th>
                  <th className="p-3 font-bold uppercase tracking-wider text-[11px] text-rose-800 bg-rose-50/70">
                    Chronic Overtraining / Under-Fueling (Red Flag)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-charcoal/85">
                <tr>
                  <td className="p-3 font-bold text-charcoal bg-slate-50/50">Menstrual Cycle</td>
                  <td className="p-3 text-emerald-900 bg-emerald-50/30">Regular predictable cycles (24–35 days); normal bleeding flow.</td>
                  <td className="p-3 text-rose-950 bg-rose-50/30 font-medium">Cycles spread past 35+ days, flow becomes faint, or periods vanish (Amenorrhea).</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-charcoal bg-slate-50/50">Morning Resting Heart Rate</td>
                  <td className="p-3 text-emerald-900 bg-emerald-50/30">Stable (within +/- 2 bpm of athlete&apos;s baseline).</td>
                  <td className="p-3 text-rose-950 bg-rose-50/30 font-medium">Elevated +5 to 12+ bpm for 3+ consecutive mornings.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-charcoal bg-slate-50/50">Sleep Quality</td>
                  <td className="p-3 text-emerald-900 bg-emerald-50/30">Deep, restorative sleep; wakes refreshed within 15 minutes.</td>
                  <td className="p-3 text-rose-950 bg-rose-50/30 font-medium">Insomnia, nighttime sweats, waking at 2–3 AM with racing heart.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-charcoal bg-slate-50/50">Muscle Soreness (DOMS)</td>
                  <td className="p-3 text-emerald-900 bg-emerald-50/30">Resolves cleanly within 24 to 48 hours with food and hydration.</td>
                  <td className="p-3 text-rose-950 bg-rose-50/30 font-medium">Deep soreness lasting 72+ hours; persistent heavy &quot;wooden&quot; legs.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-charcoal bg-slate-50/50">Bone & Shin Health</td>
                  <td className="p-3 text-emerald-900 bg-emerald-50/30">No focal bone pain; muscles adapt to ground impact.</td>
                  <td className="p-3 text-rose-950 bg-rose-50/30 font-medium">Pinpoint bone tenderness, recurring shin splints, stress reactions on MRI.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-charcoal bg-slate-50/50">Thermoregulation</td>
                  <td className="p-3 text-emerald-900 bg-emerald-50/30">Warm extremities; normal sweat rates during workouts.</td>
                  <td className="p-3 text-rose-950 bg-rose-50/30 font-medium">Freezing hands, feet, and nose indoors; hypothermic shivering.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 6. CLINICAL GUIDELINES FOOTER & CITATION                          */}
      {/* ------------------------------------------------------------------ */}
      <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-charcoal/70">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-deep-teal shrink-0" />
          <span>
            Grounded in the <strong className="text-charcoal">2023 International Olympic Committee (IOC) Consensus Statement on REDs</strong> & <strong className="text-charcoal">Female Athlete Triad Coalition Clinical Guidelines</strong>.
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-deep-teal hover:underline cursor-pointer">
          <ExternalLink className="w-3 h-3" />
          <span>IOC REDs CAT2 Guidelines</span>
        </div>
      </div>
    </div>
  );
}
