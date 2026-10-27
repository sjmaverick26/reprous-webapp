"use client";

import React, { useState, useId } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Info,
  Sparkles,
  Zap,
  Shield,
  Heart,
  Droplets,
  Clock,
  Calendar,
  Layers,
  HelpCircle,
  Stethoscope,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Flame,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DictionaryHighlight } from "./DictionaryHighlight";

// ============================================================================
// 1. INTERACTIVE HORMONE WAVE & UTERINE LINING CHART (MENSTRUAL CYCLE LAB)
// ============================================================================

interface HormonePhaseData {
  name: string;
  days: string;
  color: string;
  bgClass: string;
  borderClass: string;
  estrogenLevel: string;
  progesteroneLevel: string;
  lhLevel: string;
  fshLevel: string;
  liningState: string;
  liningMm: number;
  ovaryState: string;
  energyBio: string;
  clinicalNote: string;
}

const CYCLE_PHASES_DATA: Record<number, HormonePhaseData> = {
  0: {
    name: "Menstrual Phase",
    days: "Days 1–5",
    color: "#F47A6A",
    bgClass: "bg-coral/10 text-[#B83F68]",
    borderClass: "border-coral/40",
    estrogenLevel: "Baseline Low (~30–50 pg/mL)",
    progesteroneLevel: "Near Zero (<1 ng/mL)",
    lhLevel: "Baseline (~2–5 mIU/mL)",
    fshLevel: "Recruiting Early Follicles",
    liningState: "Endometrium shedding down to functional basalis",
    liningMm: 2,
    ovaryState: "Cohort of antral follicles selected in ovaries",
    energyBio: "Restorative mode; lower core body temp; high metabolic efficiency",
    clinicalNote: "ACOG defines typical flow as 3–7 days, losing 30–80 mL. Soaking >1 pad/tampon per hour is a clinical red flag.",
  },
  1: {
    name: "Follicular Phase",
    days: "Days 6–13",
    color: "#175B5C",
    bgClass: "bg-light-teal text-deep-teal",
    borderClass: "border-deep-teal/40",
    estrogenLevel: "Surging Rapidly (~150–350 pg/mL)",
    progesteroneLevel: "Dormant (<1 ng/mL)",
    lhLevel: "Steady baseline rising prior to surge",
    fshLevel: "Dominant follicle selected (Graafian)",
    liningState: "Rapid proliferative thickening of endometrium",
    liningMm: 8,
    ovaryState: "One dominant follicle balloons with estrogen fluid",
    energyBio: "Peak insulin sensitivity, rising glycogen storage, high training adaptation",
    clinicalNote: "Estrogen enhances muscle protein synthesis and mood through serotonin receptor modulation.",
  },
  2: {
    name: "Ovulatory Phase",
    days: "Days 14–16",
    color: "#991B4B",
    bgClass: "bg-soft-pink text-raspberry",
    borderClass: "border-raspberry/40",
    estrogenLevel: "Peak Zenith (~300–450 pg/mL)",
    progesteroneLevel: "Initiating secretion (~1–2 ng/mL)",
    lhLevel: "Massive 24–36h LH Surge (>20–80 mIU/mL)",
    fshLevel: "Secondary sharp spike",
    liningState: "Max pre-ovulatory triple-stripe lining",
    liningMm: 11,
    ovaryState: "Follicle ruptures to release mature oocyte into fallopian tube",
    energyBio: "Peak neuromuscular power and confidence; mild ligament laxity",
    clinicalNote: "Basal body temperature increases ~0.5°F immediately following ovulation due to progesterone.",
  },
  3: {
    name: "Luteal Phase",
    days: "Days 17–28",
    color: "#D97706",
    bgClass: "bg-amber-100 text-amber-900",
    borderClass: "border-amber-400",
    estrogenLevel: "Secondary Sustained Wave (~100–200 pg/mL)",
    progesteroneLevel: "Peak Dominance (~10–25 ng/mL)",
    lhLevel: "Suppressed by negative feedback",
    fshLevel: "Suppressed until cycle reset",
    liningState: "Secretory, plush, vascular glycogen-rich lining",
    liningMm: 14,
    ovaryState: "Corpus luteum secretes progesterone; resets if no implantation",
    energyBio: "Metabolic rate rises ~100–300 kcal/day; core temp remains elevated",
    clinicalNote: "A luteal phase shorter than 10 days (luteal phase defect) may indicate insufficient progesterone production.",
  },
};

export function HormoneWaveChart() {
  const [selectedDay, setSelectedDay] = useState<number>(14);

  // Map day to phase index
  const activePhaseIdx = selectedDay <= 5 ? 0 : selectedDay <= 13 ? 1 : selectedDay <= 16 ? 2 : 3;
  const currentPhase = CYCLE_PHASES_DATA[activePhaseIdx];

  // Generate SVG coordinates for hormones across Days 1-28 (x: 40 to 560, width = 520)
  const getX = (day: number) => 40 + ((day - 1) / 27) * 520;

  // Wave points
  // Estrogen: starts low at 130, rises to peak 35 at day 13, dips to 100 at day 16, rises to 75 at day 22, drops to 140 at day 28
  const estrogenPath = `M ${getX(1)} 135 C ${getX(6)} 130, ${getX(10)} 90, ${getX(13)} 38 C ${getX(15)} 42, ${getX(17)} 105, ${getX(21)} 72 C ${getX(25)} 75, ${getX(27)} 120, ${getX(28)} 140`;

  // Progesterone: flat near 145 until day 14, rises to peak 42 at day 21, drops to 145 at day 28
  const progesteronePath = `M ${getX(1)} 146 L ${getX(13)} 146 C ${getX(15)} 140, ${getX(18)} 80, ${getX(21)} 42 C ${getX(24)} 45, ${getX(26)} 110, ${getX(28)} 146`;

  // LH: low baseline 140, massive spike to 25 at day 13.5, falls back to 140 by day 16
  const lhPath = `M ${getX(1)} 142 L ${getX(11)} 142 C ${getX(12.5)} 135, ${getX(13.2)} 50, ${getX(13.8)} 22 C ${getX(14.4)} 50, ${getX(15)} 135, ${getX(16)} 142 L ${getX(28)} 142`;

  // FSH: mild rise at day 1-3 (120), dips to 135, mild spike at day 13.8 (85), back to 142
  const fshPath = `M ${getX(1)} 122 C ${getX(3)} 118, ${getX(7)} 138, ${getX(11)} 138 C ${getX(13)} 125, ${getX(13.8)} 82, ${getX(14.5)} 125 C ${getX(16)} 140, ${getX(24)} 142, ${getX(28)} 142`;

  const currentX = getX(selectedDay);

  return (
    <div className="rounded-3xl border-2 border-deep-teal/20 bg-white p-5 sm:p-7 shadow-sm space-y-5">
      {/* Header with Title and Mode */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-deep-teal/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-deep-teal text-white shadow-2xs font-sans">
              <Activity className="w-3.5 h-3.5 text-coral" />
              <span>Interactive Hormone Lab</span>
            </span>
            <span className="text-xs font-bold text-deep-teal bg-light-teal px-2.5 py-0.5 rounded-full font-sans">
              28-Day Biological Continuum
            </span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal mt-1">
            Endocrine Hormone Curves & Uterine Dynamics
          </h4>
        </div>

        {/* Phase Badge */}
        <div className={`px-4 py-2 rounded-2xl border-2 font-sans text-right ${currentPhase.bgClass} ${currentPhase.borderClass} shadow-2xs`}>
          <span className="text-[11px] font-bold uppercase tracking-wider block opacity-80">
            Current Phase
          </span>
          <span className="text-base sm:text-lg font-bold">
            {currentPhase.name} ({currentPhase.days})
          </span>
        </div>
      </div>

      {/* SVG Wave Chart */}
      <div className="relative rounded-2xl bg-gradient-to-b from-slate-50 to-white p-2 sm:p-4 border border-slate-200 overflow-hidden shadow-inner">
        {/* Phase Zone Bands Background */}
        <svg viewBox="0 0 600 220" className="w-full h-auto select-none">
          {/* Phase 0: Menstrual (Days 1–5: x 40 to 117) */}
          <rect x="40" y="10" width="77" height="150" fill="#F47A6A" fillOpacity="0.08" rx="6" />
          <text x="78" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#F47A6A" fontFamily="sans-serif">
            MENSTRUAL
          </text>

          {/* Phase 1: Follicular (Days 6–13: x 117 to 271) */}
          <rect x="121" y="10" width="146" height="150" fill="#175B5C" fillOpacity="0.06" rx="6" />
          <text x="194" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#175B5C" fontFamily="sans-serif">
            FOLLICULAR (PROLIFERATIVE)
          </text>

          {/* Phase 2: Ovulatory (Days 14–16: x 271 to 329) */}
          <rect x="271" y="10" width="58" height="150" fill="#991B4B" fillOpacity="0.1" rx="6" />
          <text x="300" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991B4B" fontFamily="sans-serif">
            OVULATE
          </text>

          {/* Phase 3: Luteal (Days 17–28: x 333 to 560) */}
          <rect x="333" y="10" width="227" height="150" fill="#D97706" fillOpacity="0.07" rx="6" />
          <text x="446" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#D97706" fontFamily="sans-serif">
            LUTEAL (SECRETORY)
          </text>

          {/* Grid lines */}
          <line x1="40" y1="160" x2="560" y2="160" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="40" y1="100" x2="560" y2="100" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="40" y1="40" x2="560" y2="40" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3,3" />

          {/* Hormone Wave Curves */}
          {/* Estrogen */}
          <path d={estrogenPath} fill="none" stroke="#F47A6A" strokeWidth="3" strokeLinecap="round" />
          {/* Progesterone */}
          <path d={progesteronePath} fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          {/* LH Surge */}
          <path d={lhPath} fill="none" stroke="#991B4B" strokeWidth="3.2" strokeLinecap="round" />
          {/* FSH */}
          <path d={fshPath} fill="none" stroke="#175B5C" strokeWidth="2" strokeDasharray="4,3" strokeLinecap="round" />

          {/* Interactive Day Vertical Scrubber Line */}
          <line x1={currentX} y1="15" x2={currentX} y2="165" stroke="#0F172A" strokeWidth="2.5" strokeDasharray="3,2" />
          <circle cx={currentX} cy="160" r="5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />
          <rect x={currentX - 22} y="167" width="44" height="18" rx="6" fill="#0F172A" />
          <text x={currentX} y="179" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF" fontFamily="sans-serif">
            Day {selectedDay}
          </text>

          {/* Day Numbers on X Axis */}
          {[1, 5, 10, 14, 20, 25, 28].map((d) => (
            <text key={d} x={getX(d)} y="198" textAnchor="middle" fontSize="9" fill="#64748B" fontFamily="sans-serif">
              D{d}
            </text>
          ))}
          <text x="300" y="214" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569" fontFamily="sans-serif">
            28-Day Menstrual Cycle Timeline (ACOG Standard)
          </text>
        </svg>
      </div>

      {/* Legend & Interactive Day Slider */}
      <div className="space-y-4">
        {/* Hormone Legend Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-coral/10 border border-coral/30">
            <span className="w-3.5 h-1.5 rounded-full bg-[#F47A6A]" />
            <span className="font-bold text-charcoal">Estrogen (E2)</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-50 border border-amber-300">
            <span className="w-3.5 h-1.5 rounded-full bg-[#D97706]" />
            <span className="font-bold text-amber-950">Progesterone (P4)</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-soft-pink border border-raspberry/30">
            <span className="w-3.5 h-1.5 rounded-full bg-[#991B4B]" />
            <span className="font-bold text-raspberry">Luteinizing (LH)</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-light-teal border border-deep-teal/30">
            <span className="w-3.5 h-1 rounded-full bg-[#175B5C] border-b border-dashed" />
            <span className="font-bold text-deep-teal">Follicle-Stim. (FSH)</span>
          </div>
        </div>

        {/* Interactive Scrubber Slider */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-charcoal font-sans">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-deep-teal" />
              <span>Drag to scrub through cycle days:</span>
            </span>
            <span className="text-sm font-bold text-deep-teal bg-white px-3 py-0.5 rounded-full border border-slate-200">
              Selected: Day {selectedDay} of 28
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="28"
            value={selectedDay}
            onChange={(e) => setSelectedDay(parseInt(e.target.value, 10))}
            className="w-full accent-deep-teal cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[11px] text-charcoal/60 font-sans font-medium px-1">
            <span>Day 1 (Menses)</span>
            <span>Day 7 (Mid-Follicular)</span>
            <span>Day 14 (Ovulation)</span>
            <span>Day 21 (Peak Progesterone)</span>
            <span>Day 28 (Reset)</span>
          </div>
        </div>
      </div>

      {/* Synchronized Anatomy & Biomarker Cards (Less Text, More Visual!) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
        {/* Endometrial Lining Visual Cross-Section */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-deep-teal flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-coral" />
              <span>Endometrial Lining Thickness</span>
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-charcoal border border-slate-200">
              ~{currentPhase.liningMm} mm thick
            </span>
          </div>

          {/* SVG Cross-Section Bar Graphic */}
          <div className="relative h-12 w-full rounded-xl bg-slate-100 overflow-hidden border border-slate-200 flex items-end">
            <div
              className="w-full bg-gradient-to-t from-rose-600 via-rose-400 to-rose-300 transition-all duration-300 rounded-t-sm"
              style={{ height: `${(currentPhase.liningMm / 16) * 100}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-800 drop-shadow-xs">
              {currentPhase.liningState}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed m-0">
            {currentPhase.clinicalNote}
          </p>
        </div>

        {/* Ovarian & Metabolic Status Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-deep-teal flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Ovary & Metabolic State</span>
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
              Active Bio-Response
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-charcoal/90">
            <strong className="block text-deep-teal font-bold mb-0.5">Ovarian Follicle:</strong>
            {currentPhase.ovaryState}
          </div>

          <div className="p-2.5 rounded-xl bg-light-teal/50 border border-deep-teal/20 text-xs sm:text-sm text-deep-teal">
            <strong className="block font-bold mb-0.5">Energy & Athletic Adaptation:</strong>
            {currentPhase.energyBio}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. CYCLE VITAL SIGNS GAUGE DASHBOARD (ACOG CLINICAL THRESHOLDS)
// ============================================================================

export function CycleVitalSignsDashboard() {
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [flowDays, setFlowDays] = useState<number>(5);
  const [painLevel, setPainLevel] = useState<number>(2);

  // Status evaluations based on ACOG Committee Opinion No. 651
  const isLengthNormal = cycleLength >= 21 && cycleLength <= 35;
  const isFlowNormal = flowDays >= 3 && flowDays <= 7;
  const isPainNormal = painLevel <= 3;

  return (
    <div className="rounded-3xl border-2 border-deep-teal/20 bg-white p-5 sm:p-7 shadow-sm space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-deep-teal/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-deep-teal text-white shadow-2xs font-sans">
              <Stethoscope className="w-3.5 h-3.5 text-coral" />
              <span>Clinical Vital Signs</span>
            </span>
            <span className="text-xs font-bold text-deep-teal bg-light-teal px-2.5 py-0.5 rounded-full font-sans">
              ACOG Committee Opinion 651
            </span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal mt-1">
            Menstrual Cycle as the 5th Vital Sign Dashboard
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-charcoal/70 font-sans max-w-sm">
          Just like blood pressure or heart rate, cycle biomarkers reflect underlying neuroendocrine, metabolic, and ovarian health.
        </p>
      </div>

      {/* 3 Circular Arc Gauge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
        {/* Gauge 1: Cycle Length */}
        <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/80">
              1. Cycle Length
            </span>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                isLengthNormal
                  ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                  : "bg-amber-100 text-amber-900 border-amber-300"
              }`}
            >
              {isLengthNormal ? "Normal Range" : "Clinical Warning"}
            </span>
          </div>

          <div className="text-center py-2">
            <span className="text-4xl sm:text-5xl font-bold font-serif text-deep-teal block">
              {cycleLength} <span className="text-lg font-sans text-charcoal/70">days</span>
            </span>
            <span className="text-xs text-charcoal/70 font-medium mt-1 block">
              Clinical standard: 21 to 35 days
            </span>
          </div>

          <input
            type="range"
            min="15"
            max="60"
            value={cycleLength}
            onChange={(e) => setCycleLength(parseInt(e.target.value, 10))}
            className="w-full accent-deep-teal cursor-pointer"
          />

          <p className="text-xs text-charcoal/80 m-0">
            {isLengthNormal
              ? "Healthy follicular recruitment and ovulatory timing."
              : cycleLength < 21
              ? "Polymenorrhea (<21 days): possible short luteal phase or anovulatory spotting."
              : "Oligomenorrhea (>35–45 days): possible PCOS, RED-S low energy, or thyroid shift."}
          </p>
        </div>

        {/* Gauge 2: Flow Duration */}
        <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/80">
              2. Flow Duration
            </span>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                isFlowNormal
                  ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                  : "bg-amber-100 text-amber-900 border-amber-300"
              }`}
            >
              {isFlowNormal ? "Normal Range" : "Clinical Warning"}
            </span>
          </div>

          <div className="text-center py-2">
            <span className="text-4xl sm:text-5xl font-bold font-serif text-coral block">
              {flowDays} <span className="text-lg font-sans text-charcoal/70">days</span>
            </span>
            <span className="text-xs text-charcoal/70 font-medium mt-1 block">
              Clinical standard: 3 to 7 days (30–80 mL)
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="12"
            value={flowDays}
            onChange={(e) => setFlowDays(parseInt(e.target.value, 10))}
            className="w-full accent-coral cursor-pointer"
          />

          <p className="text-xs text-charcoal/80 m-0">
            {isFlowNormal
              ? "Predictable endometrial shedding without excessive iron depletion."
              : flowDays > 7
              ? "Menorrhagia (>7 days): risk of iron deficiency anemia; evaluate with CBC & ferritin."
              : "Hypomenorrhea (<2-3 days): evaluate hormonal priming and energy availability."}
          </p>
        </div>

        {/* Gauge 3: Pain Severity */}
        <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/80">
              3. Pain Scale (NRS)
            </span>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                isPainNormal
                  ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                  : painLevel <= 6
                  ? "bg-amber-100 text-amber-900 border-amber-300"
                  : "bg-red-100 text-red-900 border-red-300"
              }`}
            >
              {isPainNormal ? "Normal Cramps" : painLevel <= 6 ? "Moderate Pain" : "Red Flag Pain"}
            </span>
          </div>

          <div className="text-center py-2">
            <span className="text-4xl sm:text-5xl font-bold font-serif text-raspberry block">
              {painLevel} <span className="text-lg font-sans text-charcoal/70">/ 10</span>
            </span>
            <span className="text-xs text-charcoal/70 font-medium mt-1 block">
              {painLevel <= 3 ? "Mild prostaglandins" : painLevel <= 6 ? "Interferes with focus" : "Debilitating (missing school/sports)"}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="10"
            value={painLevel}
            onChange={(e) => setPainLevel(parseInt(e.target.value, 10))}
            className="w-full accent-raspberry cursor-pointer"
          />

          <p className="text-xs text-charcoal/80 m-0">
            {isPainNormal
              ? "Manageable cramping easily mitigated by heating pad or first-line NSAIDs."
              : painLevel <= 6
              ? "Moderate dysmenorrhea; track across consecutive cycles."
              : "ACOG guideline: Pain that stops you from attending school or fails to respond to NSAIDs warrants clinical evaluation for endometriosis or adenomyosis."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. TANNER STAGING VISUAL TIMELINE (PUBERTY ANATOMY LAB)
// ============================================================================

export function TannerProgressionChart() {
  const [activeTab, setActiveTab] = useState<"milestones" | "anatomy" | "hormones">("milestones");
  const [activeStage, setActiveStage] = useState<number>(2);
  const [selectedOrgan, setSelectedOrgan] = useState<string>("uterus");

  const STAGES = [
    {
      stage: 1,
      title: "Stage 1: Pre-Puberty Prep",
      ageRange: "Ages <8–10",
      simpleHeadline: "Your body is growing steadily at its childhood pace.",
      brainSignal: "The brain's command center is resting quietly before sending pubertal growth messengers.",
      breastDevelopment: "No breast buds yet; your chest is completely flat with normal childhood contour.",
      hairAndSkin: "Fine, soft baby hair only, identical to arms and tummy.",
      growthVelocity: "Steady childhood growth rate of about 2 inches per year.",
      takeaway: "Every body begins puberty on its own personal genetic clock. Starting earlier or later is completely natural!",
    },
    {
      stage: 2,
      title: "Stage 2: First Buds",
      ageRange: "Ages 8–13",
      simpleHeadline: "The first physical sign of puberty begins.",
      brainSignal: "Your brain sends gentle signals to your ovaries to wake up and begin producing estrogen.",
      breastDevelopment: "Thelarche: Small, firm, tender breast buds appear under the areolas. Often one side buds before the other!",
      hairAndSkin: "Sparse, fine, soft hair begins to appear.",
      growthVelocity: "Your growth spurt starts revving up.",
      takeaway: "Asymmetry in breast budding is 100% normal and evens out as tissue matures over the next few years.",
    },
    {
      stage: 3,
      title: "Stage 3: Growth Spurt & Curves",
      ageRange: "Ages 10–14",
      simpleHeadline: "Growth accelerates and curves naturally develop.",
      brainSignal: "Estrogen levels rise steadily, protecting bone density and strengthening your muscles.",
      breastDevelopment: "Breasts continue to round and gently enlarge naturally.",
      hairAndSkin: "Body hair becomes darker and curlier; sweat glands become more active.",
      growthVelocity: "Peak height growth spurt (often 3+ inches in a single year!).",
      takeaway: "Widening hips and softer tissue are healthy biological milestones designed to protect your bones and vitality.",
    },
    {
      stage: 4,
      title: "Stage 4: First Period (Menarche)",
      ageRange: "Ages 11–15",
      simpleHeadline: "Menstruation begins as the brain and ovaries synchronize.",
      brainSignal: "Rising estrogen primes the endometrium (soft inner lining) to build up and cycle.",
      breastDevelopment: "The areola forms a small secondary contour above the breast curve.",
      hairAndSkin: "Adult hair pattern fills in; skin oil glands may cause temporary breakouts.",
      growthVelocity: "Height growth naturally slows down after your first period arrives.",
      takeaway: "Average age of menarche is 12.4 years. Early cycles are frequently irregular for the first 1–2 years while your body syncs!",
    },
    {
      stage: 5,
      title: "Stage 5: Adult Rhythm",
      ageRange: "Ages 14–18+",
      simpleHeadline: "Your body reaches full reproductive maturity.",
      brainSignal: "A mature, coordinated feedback loop is established between your brain and ovaries.",
      breastDevelopment: "Full mature breast contour with smooth, balanced curves.",
      hairAndSkin: "Adult hair distribution; skin oil glands stabilize as hormones balance out.",
      growthVelocity: "Adult height is achieved; bones achieve peak lifelong density.",
      takeaway: "Your menstrual cycle settles into its personal regular rhythm (typically 21 to 35 days).",
    },
  ];

  const current = STAGES[activeStage - 1];

  const ORGANS: Record<
    string,
    {
      name: string;
      nickname: string;
      color: string;
      bgClass: string;
      borderClass: string;
      whatItDoes: React.ReactNode;
      whyItMatters: React.ReactNode;
      doctorTip: React.ReactNode;
    }
  > = {
    uterus: {
      name: "The Uterus (Womb)",
      nickname: "The Muscular Home",
      color: "#F47A6A",
      bgClass: "bg-[#FFE1DB]",
      borderClass: "border-coral",
      whatItDoes: (
        <span>
          A hollow, strong pear-shaped muscle about the size of a fist. During periods, it flexes gently to shed its lining. If someone gets pregnant, it expands safely to hold a baby.
        </span>
      ),
      whyItMatters: (
        <span>
          Mild cramps occur when this muscle flexes. Debilitating cramps mean that high chemicals or secondary conditions like{" "}
          <DictionaryHighlight term="Endometriosis">Endometriosis</DictionaryHighlight> or{" "}
          <DictionaryHighlight term="Uterine anomalies">Uterine anomalies or fibroids</DictionaryHighlight> warrant an evaluation.
        </span>
      ),
      doctorTip: (
        <span>
          Doctors can check its position and health on a quick, painless ultrasound. Having a tilted (retroverted) uterus is totally normal!
        </span>
      ),
    },
    endometrium: {
      name: "The Endometrium",
      nickname: "The Plush Monthly Cushion",
      color: "#E11D48",
      bgClass: "bg-rose-100",
      borderClass: "border-rose-300",
      whatItDoes: (
        <span>
          The soft, velvety inner lining of your uterus. <DictionaryHighlight term="Estrogen">Estrogen</DictionaryHighlight> builds it up each month into a cushion; when pregnancy doesn't occur,{" "}
          <DictionaryHighlight term="Progesterone">Progesterone</DictionaryHighlight> drops and it gently sheds as your period flow.
        </span>
      ),
      whyItMatters: (
        <span>
          If tissue similar to the <DictionaryHighlight term="Endometrium">Endometrium</DictionaryHighlight> grows outside the uterus, it is called{" "}
          <DictionaryHighlight term="Endometriosis">Endometriosis</DictionaryHighlight>. If it burrows into uterine muscle, it is{" "}
          <DictionaryHighlight term="Adenomyosis">Adenomyosis</DictionaryHighlight>.
        </span>
      ),
      doctorTip: (
        <span>
          Measured in millimeters on ultrasound. A healthy endometrium naturally changes thickness depending on your cycle phase.
        </span>
      ),
    },
    ovaries: {
      name: "The Ovaries (Twin Glands)",
      nickname: "The Egg & Hormone Twins",
      color: "#175B5C",
      bgClass: "bg-light-teal",
      borderClass: "border-deep-teal",
      whatItDoes: (
        <span>
          Two almond-sized powerhouses on either side of your uterus. They hold all your eggs and produce your body's vital sex hormones:{" "}
          <DictionaryHighlight term="Estrogen">Estrogen</DictionaryHighlight> and{" "}
          <DictionaryHighlight term="Progesterone">Progesterone</DictionaryHighlight>.
        </span>
      ),
      whyItMatters: (
        <span>
          Every month, one ovary releases a mature egg during <DictionaryHighlight term="Ovulation">Ovulation</DictionaryHighlight>. Healthy ovaries provide steady physical energy, radiant skin, and strong bones!
        </span>
      ),
      doctorTip: (
        <span>
          When ovaries have trouble releasing eggs regularly due to insulin or androgen signals, doctors evaluate for conditions like PCOS.
        </span>
      ),
    },
    cervix: {
      name: "The Cervix",
      nickname: "The Smart Doorway",
      color: "#D97706",
      bgClass: "bg-amber-100",
      borderClass: "border-amber-400",
      whatItDoes: (
        <span>
          The strong doorway connecting the bottom of your uterus to the vagina canal. It makes healthy, natural fluids that change texture across your cycle.
        </span>
      ),
      whyItMatters: (
        <span>
          Noticing clear, stretchy fluid like raw egg whites means <DictionaryHighlight term="Ovulation">Ovulation</DictionaryHighlight> is happening! The cervix also naturally keeps bacteria out of the sterile uterus.
        </span>
      ),
      doctorTip: (
        <span>
          Adolescents do not need Pap smears until age 21! Routine adolescent pelvic checks are gentle and explanatory.
        </span>
      ),
    },
    tubes: {
      name: "The Fallopian Tubes",
      nickname: "The Gentle Connecting Bridges",
      color: "#991B4B",
      bgClass: "bg-soft-pink",
      borderClass: "border-raspberry",
      whatItDoes: (
        <span>
          Two delicate tubes with soft, wave-like fingers (cilia) that gently sweep the egg from the ovary toward the uterus each month.
        </span>
      ),
      whyItMatters: (
        <span>
          Fertilization naturally takes place inside these tubes. Protecting your body from untreated infections keeps these delicate tubes open and healthy.
        </span>
      ),
      doctorTip: (
        <span>
          They are about the width of a strand of spaghetti and stay healthy with good hydration, routine screening, and anti-inflammatory nutrition.
        </span>
      ),
    },
  };

  const currentOrgan = ORGANS[selectedOrgan];

  return (
    <div className="rounded-3xl border-2 border-deep-teal/20 bg-white p-5 sm:p-7 shadow-sm space-y-5 font-sans">
      {/* Header with Visual Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-deep-teal/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-coral text-white shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Body Basics Interactive Visual Lab</span>
            </span>
            <span className="text-xs font-bold text-deep-teal bg-light-teal px-2.5 py-0.5 rounded-full">
              Tap Yellow Words for Dictionary
            </span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal mt-1">
            Anatomy, Puberty &amp; Hormone Visual Explorer
          </h4>
        </div>

        {/* 3 View Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("milestones")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "milestones"
                ? "bg-white text-deep-teal shadow-xs border border-deep-teal/20"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            Puberty Milestones
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("anatomy")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "anatomy"
                ? "bg-white text-deep-teal shadow-xs border border-deep-teal/20"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            Interactive Anatomy Map
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("hormones")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "hormones"
                ? "bg-white text-deep-teal shadow-xs border border-deep-teal/20"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            Hormone Helpers
          </button>
        </div>
      </div>

      {/* VIEW 1: PUBERTY MILESTONES (Simplified, Non-Intimidating) */}
      {activeTab === "milestones" && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <p className="text-xs sm:text-sm text-charcoal/80 font-sans leading-relaxed m-0">
            Puberty follows a 5-step developmental roadmap called{" "}
            <DictionaryHighlight term="Tanner Staging">Tanner Staging</DictionaryHighlight>. Everyone develops on their own genetic clock—starting at age 9 or age 14 is completely normal!
          </p>

          {/* 5-Step Stage Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {STAGES.map((s) => {
              const isActive = activeStage === s.stage;
              return (
                <button
                  key={s.stage}
                  type="button"
                  onClick={() => setActiveStage(s.stage)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    isActive
                      ? "bg-deep-teal text-white border-deep-teal shadow-md scale-102 font-bold"
                      : "bg-slate-50 text-charcoal/80 border-slate-200 hover:border-deep-teal/40 hover:bg-white font-medium"
                  }`}
                >
                  <span className="block text-xs uppercase tracking-wider opacity-80">Stage {s.stage}</span>
                  <span className="text-sm font-bold block truncate">{s.title.split(":")[1]?.trim() || s.title}</span>
                  <span className={`text-[11px] block mt-0.5 ${isActive ? "text-white/80" : "text-charcoal/60"}`}>
                    {s.ageRange}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stage Detail Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-light-teal/40 via-white to-amber-50/40 border-2 border-deep-teal/20 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h5 className="text-xl sm:text-2xl font-serif font-bold text-deep-teal m-0">
                  {current.title} <span className="text-sm font-sans font-normal text-charcoal/70">({current.ageRange})</span>
                </h5>
                <p className="text-xs sm:text-sm text-charcoal/80 font-sans mt-0.5 m-0 font-medium">
                  {current.simpleHeadline}
                </p>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-deep-teal/20 text-deep-teal">
                Stage {current.stage} of 5
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
                <strong className="block text-deep-teal font-bold uppercase tracking-wider text-[11px]">
                  Brain &amp; Hormone Signal:
                </strong>
                <p className="text-charcoal/90 m-0 leading-relaxed">
                  {current.brainSignal}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
                <strong className="block text-coral font-bold uppercase tracking-wider text-[11px]">
                  Breast Budding (Thelarche):
                </strong>
                <p className="text-charcoal/90 m-0 leading-relaxed">
                  {current.breastDevelopment.includes("Thelarche") ? (
                    <span>
                      <DictionaryHighlight term="Thelarche">Thelarche</DictionaryHighlight>: Small, tender breast buds form under the areolas. Often one side buds before the other!
                    </span>
                  ) : (
                    current.breastDevelopment
                  )}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
                <strong className="block text-amber-800 font-bold uppercase tracking-wider text-[11px]">
                  Body Hair &amp; Skin Changes:
                </strong>
                <p className="text-charcoal/90 m-0 leading-relaxed">{current.hairAndSkin}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1">
                <strong className="block text-raspberry font-bold uppercase tracking-wider text-[11px]">
                  Height Spurt &amp; Menarche:
                </strong>
                <p className="text-charcoal/90 m-0 leading-relaxed">
                  {current.stage === 4 ? (
                    <span>
                      Height spurt slows down after your first period (
                      <DictionaryHighlight term="Menarche">Menarche</DictionaryHighlight>) arrives.
                    </span>
                  ) : (
                    current.growthVelocity
                  )}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-deep-teal text-white flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-coral shrink-0" />
              <span className="text-xs sm:text-sm font-medium">{current.takeaway}</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: INTERACTIVE ANATOMY MAP (SVG + Organ Cards) */}
      {activeTab === "anatomy" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <p className="text-xs sm:text-sm text-charcoal/80 font-sans leading-relaxed m-0">
            Tap any organ in the diagram below to explore what it does, why it matters, and see how medical terms connect in the dictionary.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Visual SVG Diagram (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-teal-50/70 via-white to-rose-50/50 p-5 border-2 border-deep-teal/15 flex flex-col items-center">
              <svg viewBox="0 0 400 250" className="w-full h-52 sm:h-60 select-none">
                {/* Uterine body */}
                <path
                  d="M 140 100 C 140 45, 260 45, 260 100 C 260 160, 220 180, 200 180 C 180 180, 140 160, 140 100 Z"
                  fill={selectedOrgan === "uterus" ? "#F47A6A" : "#FEE2E2"}
                  stroke="#E11D48"
                  strokeWidth={selectedOrgan === "uterus" ? "3.5" : "2"}
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedOrgan("uterus")}
                />

                {/* Endometrium inner cavity */}
                <path
                  d="M 170 95 C 170 70, 230 70, 230 95 C 230 140, 205 150, 200 150 C 195 150, 170 140, 170 95 Z"
                  fill={selectedOrgan === "endometrium" ? "#E11D48" : "#FDA4AF"}
                  stroke="#BE123C"
                  strokeWidth={selectedOrgan === "endometrium" ? "2.5" : "1.5"}
                  className="cursor-pointer transition-all hover:opacity-95"
                  onClick={() => setSelectedOrgan("endometrium")}
                />

                {/* Fallopian Tubes */}
                <path
                  d="M 148 75 C 100 50, 70 70, 50 90"
                  fill="none"
                  stroke={selectedOrgan === "tubes" ? "#991B4B" : "#F47A6A"}
                  strokeWidth={selectedOrgan === "tubes" ? "5.5" : "3.5"}
                  strokeLinecap="round"
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedOrgan("tubes")}
                />
                <path
                  d="M 252 75 C 300 50, 330 70, 350 90"
                  fill="none"
                  stroke={selectedOrgan === "tubes" ? "#991B4B" : "#F47A6A"}
                  strokeWidth={selectedOrgan === "tubes" ? "5.5" : "3.5"}
                  strokeLinecap="round"
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedOrgan("tubes")}
                />

                {/* Ovaries */}
                <ellipse
                  cx="48"
                  cy="100"
                  rx="20"
                  ry="14"
                  fill={selectedOrgan === "ovaries" ? "#175B5C" : "#D8EFED"}
                  stroke="#175B5C"
                  strokeWidth={selectedOrgan === "ovaries" ? "3" : "2"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => setSelectedOrgan("ovaries")}
                />
                <ellipse
                  cx="352"
                  cy="100"
                  rx="20"
                  ry="14"
                  fill={selectedOrgan === "ovaries" ? "#175B5C" : "#D8EFED"}
                  stroke="#175B5C"
                  strokeWidth={selectedOrgan === "ovaries" ? "3" : "2"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => setSelectedOrgan("ovaries")}
                />

                {/* Cervix */}
                <rect
                  x="185"
                  y="180"
                  width="30"
                  height="36"
                  rx="6"
                  fill={selectedOrgan === "cervix" ? "#D97706" : "#FEF3C7"}
                  stroke="#B45309"
                  strokeWidth={selectedOrgan === "cervix" ? "3" : "2"}
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedOrgan("cervix")}
                />

                {/* Vagina Canal (Outflow) */}
                <path d="M 180 216 L 180 240 M 220 216 L 220 240" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="3,3" />

                {/* Interactive SVG Text Labels */}
                <text x="48" y="104" textAnchor="middle" fill={selectedOrgan === "ovaries" ? "#fff" : "#175B5C"} fontSize="11" fontWeight="bold">Ovary</text>
                <text x="352" y="104" textAnchor="middle" fill={selectedOrgan === "ovaries" ? "#fff" : "#175B5C"} fontSize="11" fontWeight="bold">Ovary</text>
                <text x="200" y="85" textAnchor="middle" fill={selectedOrgan === "uterus" ? "#fff" : "#991B4B"} fontSize="11" fontWeight="bold">Uterus</text>
                <text x="200" y="125" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Lining</text>
                <text x="200" y="202" textAnchor="middle" fill={selectedOrgan === "cervix" ? "#fff" : "#92400E"} fontSize="10" fontWeight="bold">Cervix</text>
              </svg>

              {/* Selector Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
                {Object.entries(ORGANS).map(([key, organ]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedOrgan(key)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      selectedOrgan === key
                        ? `${organ.bgClass} text-charcoal border-2 ${organ.borderClass} shadow-xs scale-105`
                        : "bg-white text-charcoal/70 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {organ.name.split(" ")[1] || organ.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Organ Detail Card (7 cols) */}
            <div className={`lg:col-span-7 p-6 rounded-3xl border-2 ${currentOrgan.borderClass} bg-white shadow-card space-y-4`}>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${currentOrgan.borderClass} ${currentOrgan.bgClass} text-charcoal`}>
                    {currentOrgan.nickname}
                  </span>
                  <h4 className="text-2xl font-serif font-bold text-deep-teal mt-1 mb-0">
                    {currentOrgan.name}
                  </h4>
                </div>
                <span className="text-xs font-bold text-deep-teal bg-light-teal px-3 py-1 rounded-full border border-deep-teal/20">
                  Tap yellow words for definitions
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="block text-deep-teal font-bold uppercase tracking-wider text-[11px]">
                    What It Does:
                  </strong>
                  <p className="text-charcoal/90 m-0 leading-relaxed">
                    {currentOrgan.whatItDoes}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                  <strong className="block text-amber-950 font-bold uppercase tracking-wider text-[11px]">
                    Why It Matters for Your Health:
                  </strong>
                  <p className="text-charcoal/90 m-0 leading-relaxed">
                    {currentOrgan.whyItMatters}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-light-teal/50 border border-deep-teal/20 space-y-1">
                  <strong className="block text-deep-teal font-bold uppercase tracking-wider text-[11px]">
                    Doctor Visit Insight:
                  </strong>
                  <p className="text-charcoal/90 m-0 leading-relaxed">
                    {currentOrgan.doctorTip}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: HORMONE HELPERS (Simplified) */}
      {activeTab === "hormones" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <p className="text-xs sm:text-sm text-charcoal/80 font-sans leading-relaxed m-0">
            Hormones are your body's natural chemical messengers. Three primary players orchestrate your energy, bone strength, cycle rhythm, and skin:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Estrogen */}
            <div className="p-5 rounded-3xl bg-rose-50/60 border-2 border-rose-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-200 text-rose-900 border border-rose-300">
                  <Sparkles className="w-3.5 h-3.5 text-rose-700" />
                  <span>The Builder</span>
                </div>
                <h5 className="font-serif font-bold text-xl text-deep-teal m-0">
                  <DictionaryHighlight term="Estrogen">Estrogen</DictionaryHighlight>
                </h5>
                <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed font-sans m-0">
                  Gives you daily physical energy, protects your heart and bone density from stress fractures, and builds up your uterine lining each month.
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-rose-200 text-[11px] text-rose-950 font-medium">
                ✦ High in Follicular Phase (Days 6–13)
              </div>
            </div>

            {/* Progesterone */}
            <div className="p-5 rounded-3xl bg-light-teal/50 border-2 border-deep-teal/20 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-light-teal text-deep-teal border border-deep-teal/30">
                  <Heart className="w-3.5 h-3.5 text-coral" />
                  <span>The Calmer</span>
                </div>
                <h5 className="font-serif font-bold text-xl text-deep-teal m-0">
                  <DictionaryHighlight term="Progesterone">Progesterone</DictionaryHighlight>
                </h5>
                <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed font-sans m-0">
                  Produced only after <DictionaryHighlight term="Ovulation">Ovulation</DictionaryHighlight>. Helps you sleep deeply, stabilizes mood, and balances out estrogen to prevent excessive bleeding.
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-deep-teal/20 text-[11px] text-deep-teal font-medium">
                ✦ High in Luteal Phase (Days 15–26)
              </div>
            </div>

            {/* Androgens */}
            <div className="p-5 rounded-3xl bg-amber-50/70 border-2 border-amber-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-200 text-amber-950 border border-amber-300">
                  <Zap className="w-3.5 h-3.5 text-amber-800" />
                  <span>Strength &amp; Skin</span>
                </div>
                <h5 className="font-serif font-bold text-xl text-deep-teal m-0">
                  Androgens
                </h5>
                <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed font-sans m-0">
                  Provide muscle tone, stamina, and drive. During puberty, waking androgens can temporarily cause oily skin or breakouts before stabilizing.
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-[11px] text-amber-950 font-medium">
                ✦ Evaluated if severe acne or cycle delays occur
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 4. PCOS ROTTERDAM DIAGNOSTIC CRITERIA RADAR & TRIANGLE
// ============================================================================

export function RotterdamCriteriaRadar() {
  const [activeCriteria, setActiveCriteria] = useState<Set<number>>(new Set([0, 1]));

  const CRITERIA = [
    {
      id: 0,
      title: "1. Ovulatory Dysfunction",
      subtitle: "Oligo- or Anovulation",
      badge: "Cycle Timing",
      clinicalFact: "Infrequent cycles (>35–45 days apart) or absent menses (amenorrhea >90 days).",
      icon: Clock,
      color: "text-coral border-coral/40 bg-coral/10",
    },
    {
      id: 1,
      title: "2. Hyperandrogenism",
      subtitle: "Clinical or Biochemical",
      badge: "Hormone Level",
      clinicalFact: "Clinical hirsutism (Ferriman-Gallwey scale), severe cystic acne, or elevated free/total testosterone.",
      icon: Flame,
      color: "text-amber-800 border-amber-300 bg-amber-50",
    },
    {
      id: 2,
      title: "3. Polycystic Morphology",
      subtitle: "Ultrasound Ovarian Appearance",
      badge: "Pelvic Imaging",
      clinicalFact: ">=20 follicles per ovary (2–9 mm) or ovarian volume >10 mL on transvaginal or transabdominal ultrasound.",
      icon: Droplets,
      color: "text-deep-teal border-deep-teal/40 bg-light-teal",
    },
  ];

  const toggleCriteria = (id: number) => {
    const next = new Set(activeCriteria);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setActiveCriteria(next);
  };

  const meetsRotterdam = activeCriteria.size >= 2;

  return (
    <div className="rounded-3xl border-2 border-deep-teal/20 bg-white p-5 sm:p-7 shadow-sm space-y-5 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-deep-teal/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-deep-teal text-white shadow-2xs">
              <Stethoscope className="w-3.5 h-3.5 text-coral" />
              <span>International Diagnostic Standard</span>
            </span>
            <span className="text-xs font-bold text-deep-teal bg-light-teal px-2.5 py-0.5 rounded-full">
              Rotterdam Consensus (2 of 3 Rule)
            </span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal mt-1">
            PCOS Rotterdam Diagnostic Criteria Interactive Triangle
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-charcoal/70 max-w-sm">
          A diagnosis of PCOS requires meeting <strong>at least 2 out of 3</strong> criteria, after excluding other conditions like thyroid or adrenal disorders.
        </p>
      </div>

      {/* 3 Interactive Clickable Criteria Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {CRITERIA.map((crit) => {
          const isSelected = activeCriteria.has(crit.id);
          const IconComp = crit.icon;

          return (
            <button
              key={crit.id}
              type="button"
              onClick={() => toggleCriteria(crit.id)}
              className={`p-5 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? "bg-white border-deep-teal ring-2 ring-deep-teal/20 shadow-md"
                  : "bg-slate-50 border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`p-2 rounded-xl border ${crit.color}`}>
                    <IconComp className="w-4 h-4" />
                  </span>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      isSelected ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-slate-200 text-charcoal/60 border-slate-300"
                    }`}
                  >
                    {isSelected ? "Active (✓)" : "Tap to Add"}
                  </span>
                </div>
                <h6 className="font-serif font-bold text-lg text-deep-teal">{crit.title}</h6>
                <span className="text-xs text-charcoal/70 font-semibold block">{crit.subtitle}</span>
              </div>
              <p className="text-xs text-charcoal/90 leading-relaxed m-0 border-t border-slate-100 pt-2">
                {crit.clinicalFact}
              </p>
            </button>
          );
        })}
      </div>

      {/* Live Diagnostic Status Bar */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-2xs ${
          meetsRotterdam
            ? "bg-emerald-50 border-emerald-500 text-emerald-950"
            : "bg-amber-50 border-amber-400 text-amber-950"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
              meetsRotterdam ? "bg-emerald-600 text-white" : "bg-amber-500 text-white"
            }`}
          >
            {meetsRotterdam ? <CheckCircle2 className="w-6 h-6" /> : <Info className="w-6 h-6" />}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block opacity-80">
              Rotterdam Diagnostic Status: {activeCriteria.size} of 3 Criteria Met
            </span>
            <h5 className="text-lg sm:text-xl font-bold font-serif">
              {meetsRotterdam
                ? "Meets Rotterdam Criteria for Clinical PCOS Workup"
                : "Does Not Meet Rotterdam 2-of-3 Threshold"}
            </h5>
            <p className="text-xs sm:text-sm opacity-90 mt-0.5 leading-relaxed">
              {meetsRotterdam
                ? "Clinical guidelines recommend comprehensive metabolic screening (fasting glucose, lipids) and personalized management."
                : "Meeting only 1 criterion indicates possible isolated irregular cycles or acne; monitor symptoms or evaluate alternate etiologies."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. CONTRACEPTION EFFECTIVENESS PYRAMID CHART
// ============================================================================

export function ContraceptionEfficacyPyramid() {
  const [selectedTier, setSelectedTier] = useState<number>(1);

  const TIERS = [
    {
      tier: 1,
      name: "Tier 1: Most Effective",
      failureRate: "<1% typical failure rate",
      badge: "LARC (Set & Forget)",
      color: "bg-emerald-600 text-white",
      borderClass: "border-emerald-500",
      bgLight: "bg-emerald-50",
      methods: [
        { name: "Arm Implant (Nexplanon)", rate: "0.05%", duration: "Up to 5 years", hormonal: true, sti: false },
        { name: "Hormonal IUD (Mirena/Kyleena)", rate: "0.2%", duration: "3 to 8 years", hormonal: true, sti: false },
        { name: "Copper IUD (ParaGard)", rate: "0.8%", duration: "Up to 10–12 years", hormonal: false, sti: false },
      ],
      clinicalTip: "Does not rely on user memory; returns to baseline fertility rapidly after removal.",
    },
    {
      tier: 2,
      name: "Tier 2: Very Effective",
      failureRate: "4%–7% typical failure rate",
      badge: "User Action Needed",
      color: "bg-amber-600 text-white",
      borderClass: "border-amber-400",
      bgLight: "bg-amber-50",
      methods: [
        { name: "Depo-Provera Injection", rate: "4% typical", duration: "Every 12 weeks", hormonal: true, sti: false },
        { name: "Oral Contraceptive Pills", rate: "7% typical", duration: "Daily at same time", hormonal: true, sti: false },
        { name: "Transdermal Patch (Xulane)", rate: "7% typical", duration: "Weekly replacement", hormonal: true, sti: false },
        { name: "Vaginal Ring (NuvaRing)", rate: "7% typical", duration: "Every 3–4 weeks", hormonal: true, sti: false },
      ],
      clinicalTip: "Highly effective when taken consistently, but typical failure rates rise due to missed doses or schedule disruptions.",
    },
    {
      tier: 3,
      name: "Tier 3: Moderately Effective",
      failureRate: "13%–21% typical failure rate",
      badge: "Dual Protection Essential",
      color: "bg-coral text-white",
      borderClass: "border-coral/50",
      bgLight: "bg-[#FFE1DB]/50",
      methods: [
        { name: "Male External Latex Condom", rate: "13% typical", duration: "Single use", hormonal: false, sti: true },
        { name: "Internal / Female Condom", rate: "21% typical", duration: "Single use", hormonal: false, sti: true },
        { name: "Diaphragm / Cervical Cap", rate: "17% typical", duration: "Single use with spermicide", hormonal: false, sti: false },
        { name: "Fertility Awareness (FAM)", rate: "24% typical", duration: "Daily biomarker tracking", hormonal: false, sti: false },
      ],
      clinicalTip: "CRITICAL: External and internal condoms are the ONLY contraceptive methods that provide protection against Sexually Transmitted Infections (STIs) and HIV.",
    },
  ];

  const current = TIERS[selectedTier - 1];

  return (
    <div className="rounded-3xl border-2 border-deep-teal/20 bg-white p-5 sm:p-7 shadow-sm space-y-5 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-deep-teal/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-deep-teal text-white shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-coral" />
              <span>WHO & CDC Medical Eligibility</span>
            </span>
            <span className="text-xs font-bold text-deep-teal bg-light-teal px-2.5 py-0.5 rounded-full">
              Tiered Contraceptive Efficacy Matrix
            </span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal mt-1">
            Contraceptive Method Effectiveness Pyramid
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-charcoal/70 max-w-sm">
          Compare typical vs perfect use failure rates and discover dual protection strategies.
        </p>
      </div>

      {/* Interactive Visual Pyramid Stack */}
      <div className="space-y-2 select-none">
        {/* Tier 1 - Top Narrow Stack */}
        <button
          type="button"
          onClick={() => setSelectedTier(1)}
          className={`w-full py-3.5 px-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between mx-auto max-w-md ${
            selectedTier === 1
              ? "bg-emerald-600 text-white border-emerald-600 shadow-md scale-102 font-bold"
              : "bg-emerald-50 text-emerald-950 border-emerald-200 hover:border-emerald-400 font-semibold"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">1</span>
            <span className="text-sm sm:text-base">Tier 1: Implant & IUDs</span>
          </div>
          <span className="text-xs font-bold bg-white/25 px-2.5 py-0.5 rounded-full">
            &lt;1% Typical Failure
          </span>
        </button>

        {/* Tier 2 - Middle Medium Stack */}
        <button
          type="button"
          onClick={() => setSelectedTier(2)}
          className={`w-full py-3.5 px-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between mx-auto max-w-xl ${
            selectedTier === 2
              ? "bg-amber-600 text-white border-amber-600 shadow-md scale-102 font-bold"
              : "bg-amber-50 text-amber-950 border-amber-200 hover:border-amber-400 font-semibold"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">2</span>
            <span className="text-sm sm:text-base">Tier 2: Injections, Pill, Patch, Ring</span>
          </div>
          <span className="text-xs font-bold bg-white/25 px-2.5 py-0.5 rounded-full">
            4%–7% Typical Failure
          </span>
        </button>

        {/* Tier 3 - Base Broad Stack */}
        <button
          type="button"
          onClick={() => setSelectedTier(3)}
          className={`w-full py-3.5 px-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between mx-auto max-w-2xl ${
            selectedTier === 3
              ? "bg-coral text-white border-coral shadow-md scale-102 font-bold"
              : "bg-[#FFE1DB]/50 text-[#B83F68] border-coral/30 hover:border-coral/60 font-semibold"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">3</span>
            <span className="text-sm sm:text-base">Tier 3: Condoms, Diaphragm, FAM (Only STI Shield!)</span>
          </div>
          <span className="text-xs font-bold bg-white/25 px-2.5 py-0.5 rounded-full">
            13%–21% Typical Failure
          </span>
        </button>
      </div>

      {/* Selected Tier Breakdown Card */}
      <div className={`p-5 sm:p-6 rounded-3xl border-2 ${current.borderClass} ${current.bgLight} space-y-4 shadow-2xs`}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/70 block">
              Tier {current.tier} Profile
            </span>
            <h5 className="text-xl sm:text-2xl font-bold font-serif text-deep-teal">
              {current.name}
            </h5>
          </div>
          <span className="text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-white border border-slate-300 text-deep-teal">
            {current.failureRate}
          </span>
        </div>

        {/* Method Subcards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {current.methods.map((m, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
              <div className="flex items-start justify-between gap-1">
                <strong className="text-sm font-bold text-deep-teal block leading-tight">{m.name}</strong>
              </div>
              <div className="flex flex-wrap gap-1 text-[10px] font-bold">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-charcoal border border-slate-200">
                  {m.rate}
                </span>
                <span className={`px-2 py-0.5 rounded-md ${m.hormonal ? "bg-purple-100 text-purple-900 border border-purple-200" : "bg-emerald-100 text-emerald-900 border border-emerald-200"}`}>
                  {m.hormonal ? "Hormonal" : "Non-Hormonal"}
                </span>
                {m.sti && (
                  <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-900 border border-rose-300 font-extrabold flex items-center gap-1">
                    <Shield className="w-3 h-3 text-rose-700" />
                    <span>STI Shield</span>
                  </span>
                )}
              </div>
              <span className="text-xs text-charcoal/70 block">{m.duration}</span>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-2xl bg-white/90 border border-slate-200 text-xs sm:text-sm text-charcoal/90 flex items-start gap-2.5">
          <Info className="w-5 h-5 text-deep-teal shrink-0 mt-0.5" />
          <span>{current.clinicalTip}</span>
        </div>
      </div>
    </div>
  );
}
