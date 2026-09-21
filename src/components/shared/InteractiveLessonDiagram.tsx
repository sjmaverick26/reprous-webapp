"use client";

import React, { useState } from "react";
import { LessonDiagram } from "@/data/hubData";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Info,
  Sparkles,
  Zap,
  Shield,
  Heart,
  Lightbulb,
  Stethoscope,
  Droplets,
  Moon,
  Clock,
  Plus,
  Minus,
  ShieldAlert,
  Flame,
  Brain,
  Smile,
  Wind,
  RefreshCw,
} from "lucide-react";

interface InteractiveLessonDiagramProps {
  diagram: LessonDiagram;
  themeColor?: string;
}

export function InteractiveLessonDiagram({ diagram, themeColor = "#175B5C" }: InteractiveLessonDiagramProps) {
  switch (diagram.type) {
    case "cycle-wheel":
      return <CycleWheelDiagram diagram={diagram} themeColor={themeColor} />;
    case "energy-balance":
      return <EnergyBalanceDiagram diagram={diagram} themeColor={themeColor} />;
    case "pelvic-map":
      return <PelvicMapDiagram diagram={diagram} themeColor={themeColor} />;
    case "pcos-loop":
      return <PcosLoopDiagram diagram={diagram} themeColor={themeColor} />;
    case "anatomy-callout":
      return <AnatomyCalloutDiagram diagram={diagram} themeColor={themeColor} />;
    case "athlete-plate":
      return <AthletePlateDiagram diagram={diagram} themeColor={themeColor} />;
    case "hormone-scale":
      return <HormoneScaleDiagram diagram={diagram} themeColor={themeColor} />;
    case "reds-triangle":
      return <RedSTriangleDiagram diagram={diagram} themeColor={themeColor} />;
    case "water-glass":
      return <HydrationWaterGlassDiagram diagram={diagram} themeColor={themeColor} />;
    case "sleep-recovery":
      return <SleepRecoveryDiagram diagram={diagram} themeColor={themeColor} />;
    case "iron-ferritin":
      return <IronFerritinDiagram diagram={diagram} themeColor={themeColor} />;
    case "cycle-training":
      return <CycleTrainingMatrixDiagram diagram={diagram} themeColor={themeColor} />;
    case "cycle-fueling":
      return <CycleFuelingPlateDiagram diagram={diagram} themeColor={themeColor} />;
    case "puberty-brain":
      return <PubertyBrainDiagram diagram={diagram} themeColor={themeColor} />;
    case "timeline":
    default:
      return <PubertyTimelineDiagram diagram={diagram} themeColor={themeColor} />;
  }
}

// --------------------------------------------------------------------------
// 1. Menstrual Cycle & Hormone Curve Diagram
// --------------------------------------------------------------------------
function CycleWheelDiagram({ diagram }: { diagram: LessonDiagram; themeColor: string }) {
  const [activePhase, setActivePhase] = useState<number>(1); // 0: Menstruation, 1: Follicular, 2: Ovulation, 3: Luteal

  const phases = [
    {
      id: 0,
      name: "Menstrual Phase",
      days: "Days 1–5",
      color: "#F47A6A",
      bgClass: "bg-coral/10 border-coral/30 text-[#B83F68]",
      hormones: { estrogen: "Low / Baseline", progesterone: "Low", lh: "Baseline", fsh: "Slight Rise" },
      bodyChanges: "Uterine endometrium sheds. Low hormone levels prompt the body into restorative mode.",
      workoutTip: "Focus on gentle mobility, light aerobic walks, yoga, and adequate hydration and iron intake.",
      liningHeight: 25,
    },
    {
      id: 1,
      name: "Follicular Phase",
      days: "Days 6–13",
      color: "#175B5C",
      bgClass: "bg-light-teal border-deep-teal/30 text-deep-teal",
      hormones: { estrogen: "Rising Fast", progesterone: "Low", lh: "Slow Rise", fsh: "Recruiting Follicles" },
      bodyChanges: "Follicle-stimulating hormone matures a dominant follicle. Estrogen surges, thickening the uterine lining.",
      workoutTip: "Energy, mental stamina, and recovery capacity are rising. Great window for strength training and high-intensity work.",
      liningHeight: 50,
    },
    {
      id: 2,
      name: "Ovulatory Phase",
      days: "Days 14–16",
      color: "#991B4B",
      bgClass: "bg-soft-pink border-raspberry/30 text-raspberry",
      hormones: { estrogen: "Peak Level", progesterone: "Beginning Rise", lh: "Rapid Spike", fsh: "Mild Spike" },
      bodyChanges: "A 24-36 hour LH surge triggers the ovary to release a mature egg into the fallopian tube.",
      workoutTip: "Peak neuromuscular power and confidence. Ensure proper warm-ups as estrogen surges can slightly increase ligament laxity.",
      liningHeight: 75,
    },
    {
      id: 3,
      name: "Luteal Phase",
      days: "Days 17–28",
      color: "#D97706",
      bgClass: "bg-amber-50 border-amber-300 text-amber-900",
      hormones: { estrogen: "Secondary Wave", progesterone: "High / Peak", lh: "Low", fsh: "Low" },
      bodyChanges: "The corpus luteum secretes progesterone to maintain a plush, nutrient-rich lining. Basal body temp rises ~0.5°F.",
      workoutTip: "Metabolic rate increases slightly. Prioritize complex carbs, magnesium, steady endurance, and consistent sleep hygiene.",
      liningHeight: 90,
    },
  ];

  const current = phases[activePhase];

  return (
    <div className="rounded-2xl border border-deep-teal/20 bg-white p-4 md:p-5 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-2 border-b border-deep-teal/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deep-teal">
            <Sparkles className="w-3.5 h-3.5 text-raspberry" />
            Interactive Diagram
          </div>
          <h4 className="text-base md:text-lg font-serif font-bold text-deep-teal mt-0.5">
            {diagram.title}
          </h4>
        </div>
        <span className="text-[11px] font-semibold bg-light-teal px-2.5 py-1 rounded-full text-deep-teal border border-deep-teal/20">
          Click phases to explore
        </span>
      </div>

      {/* Phase Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {phases.map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePhase(p.id)}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              activePhase === p.id
                ? `${p.bgClass} shadow-sm font-bold ring-2 ring-deep-teal/20 scale-[1.02]`
                : "bg-gray-50/80 border-gray-200 text-charcoal/70 hover:bg-white hover:border-deep-teal/30"
            }`}
          >
            <div className="text-[11px] uppercase tracking-wider opacity-75">{p.days}</div>
            <div className="text-xs font-bold leading-tight mt-0.5">{p.name}</div>
          </button>
        ))}
      </div>

      {/* Visual SVG Wave Chart */}
      <div className="rounded-xl bg-slate-900 text-white p-3 md:p-4 overflow-hidden relative">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Hormone Concentration Curve (Days 1–28)</span>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="inline-flex items-center gap-1 text-teal-400">
              <span className="w-2.5 h-0.5 bg-teal-400 inline-block rounded-full"></span> Estrogen
            </span>
            <span className="inline-flex items-center gap-1 text-pink-400">
              <span className="w-2.5 h-0.5 bg-pink-400 inline-block rounded-full"></span> Progesterone
            </span>
            <span className="inline-flex items-center gap-1 text-amber-300">
              <span className="w-2.5 h-0.5 bg-amber-300 inline-block rounded-full"></span> LH Surge
            </span>
          </div>
        </div>

        <svg viewBox="0 0 600 160" className="w-full h-28 md:h-36 overflow-visible">
          {/* Phase Background Shading */}
          <rect x="0" y="0" width="107" height="150" fill="#F47A6A" opacity={activePhase === 0 ? "0.25" : "0.08"} rx="4" />
          <rect x="110" y="0" width="170" height="150" fill="#175B5C" opacity={activePhase === 1 ? "0.28" : "0.08"} rx="4" />
          <rect x="283" y="0" width="65" height="150" fill="#991B4B" opacity={activePhase === 2 ? "0.32" : "0.08"} rx="4" />
          <rect x="351" y="0" width="249" height="150" fill="#D97706" opacity={activePhase === 3 ? "0.25" : "0.08"} rx="4" />

          {/* Grid lines */}
          <line x1="0" y1="140" x2="600" y2="140" stroke="#334155" strokeWidth="1" />
          <line x1="107" y1="10" x2="107" y2="140" stroke="#475569" strokeDasharray="3,3" />
          <line x1="280" y1="10" x2="280" y2="140" stroke="#475569" strokeDasharray="3,3" />
          <line x1="348" y1="10" x2="348" y2="140" stroke="#475569" strokeDasharray="3,3" />

          {/* Day markers */}
          <text x="5" y="155" fill="#94a3b8" fontSize="10">Day 1</text>
          <text x="107" y="155" fill="#94a3b8" fontSize="10">Day 5</text>
          <text x="280" y="155" fill="#94a3b8" fontSize="10" fontWeight="bold">Day 14 (Ovulation)</text>
          <text x="560" y="155" fill="#94a3b8" fontSize="10">Day 28</text>

          {/* Estrogen Curve (Teal): Low at start, peaks before ov, secondary bump in luteal */}
          <path
            d="M 5 130 C 50 130, 90 120, 150 90 C 220 50, 270 20, 290 25 C 315 35, 330 110, 380 80 C 440 60, 490 85, 595 130"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Progesterone Curve (Pink): Low until after ovulation, large dome in luteal */}
          <path
            d="M 5 135 L 280 135 C 320 135, 360 40, 440 35 C 510 35, 540 90, 595 135"
            fill="none"
            stroke="#f472b6"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* LH Surge Curve (Amber): Sharp needle peak around day 13-14 */}
          <path
            d="M 5 136 L 250 136 C 270 136, 285 15, 295 15 C 305 15, 320 136, 340 136 L 595 136"
            fill="none"
            stroke="#fcd34d"
            strokeWidth="2.5"
            strokeDasharray={activePhase === 2 ? undefined : "4,2"}
          />

          {/* Active Phase Focus Indicator */}
          {activePhase === 0 && <circle cx="55" cy="130" r="5" fill="#F47A6A" className="animate-ping" />}
          {activePhase === 1 && <circle cx="200" cy="65" r="5" fill="#2dd4bf" className="animate-ping" />}
          {activePhase === 2 && <circle cx="295" cy="15" r="5" fill="#fcd34d" className="animate-ping" />}
          {activePhase === 3 && <circle cx="440" cy="35" r="5" fill="#f472b6" className="animate-ping" />}
        </svg>

        {/* Endometrial Lining Visual Bar */}
        <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">Endometrial Lining Depth:</span>
          <div className="w-44 bg-slate-800 rounded-full h-2.5 overflow-hidden flex">
            <div
              className="bg-gradient-to-r from-coral to-raspberry h-full rounded-full transition-all duration-500"
              style={{ width: `${current.liningHeight}%` }}
            />
          </div>
          <span className="text-pink-300 font-bold">{current.liningHeight}% thickness</span>
        </div>
      </div>

      {/* Dynamic Phase Insights Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
        <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
          <div className="flex items-center gap-1.5 font-bold text-deep-teal mb-1">
            <Info className="w-4 h-4 text-deep-teal" />
            Physiological Body Changes
          </div>
          <p className="text-charcoal/85 leading-relaxed">{current.bodyChanges}</p>
          <div className="mt-2.5 pt-2 border-t border-gray-200/70 grid grid-cols-2 gap-1.5 text-[11px]">
            <div><strong className="text-deep-teal">Estrogen:</strong> {current.hormones.estrogen}</div>
            <div><strong className="text-deep-teal">Progesterone:</strong> {current.hormones.progesterone}</div>
            <div><strong className="text-deep-teal">LH Level:</strong> {current.hormones.lh}</div>
            <div><strong className="text-deep-teal">FSH:</strong> {current.hormones.fsh}</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-light-teal/50 border border-deep-teal/20">
          <div className="flex items-center gap-1.5 font-bold text-deep-teal mb-1">
            <Activity className="w-4 h-4 text-deep-teal" />
            Athletic & Daily Synergy Tip
          </div>
          <p className="text-charcoal/85 leading-relaxed">{current.workoutTip}</p>
          <div className="mt-2.5 text-[11px] font-semibold text-deep-teal/90 bg-white/70 p-2 rounded-lg border border-deep-teal/10 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-deep-teal shrink-0" />
            <span><em>Tip:</em> Cycle phases naturally fluctuate. Using them as self-knowledge helps you train and recover with your biology, not against it.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 2. Athlete Energy Balance Scale (RED-S)
// --------------------------------------------------------------------------
function EnergyBalanceDiagram({ diagram }: { diagram: LessonDiagram; themeColor: string }) {
  // Energy Intake level (from 15 kcal/kg to 50 kcal/kg FFM)
  const [energyLevel, setEnergyLevel] = useState<number>(38);

  const getStatus = (kcal: number) => {
    if (kcal < 30) {
      return {
        label: "Severe Low Energy Availability (RED-S)",
        color: "text-red-700 bg-red-50 border-red-300",
        alertIcon: AlertTriangle,
        iconColor: "text-red-600",
        boneHealth: "Accelerated bone mineral density loss (osteopenia risk)",
        menstrualHealth: "Hypothalamic amenorrhea (cycle completely shuts down)",
        performance: "Impaired recovery, 4.5x higher bone stress injury rate, chronic fatigue",
        recoveryTip: "Urgent nutritional intervention required. Increase daily complex carbs and energy intake with sports dietitian guidance.",
      };
    } else if (kcal < 45) {
      return {
        label: "Subclinical / Moderate Fueling Zone",
        color: "text-amber-800 bg-amber-50 border-amber-300",
        alertIcon: Info,
        iconColor: "text-amber-600",
        boneHealth: "Suboptimal bone turnover; vulnerable during peak growth spurts",
        menstrualHealth: "Irregular cycles, lengthened follicular phase, or anovulatory cycles",
        performance: "Sluggish muscle protein synthesis, afternoon brain fog, recurring soreness",
        recoveryTip: "Add targeted pre- and post-workout fuel (carbohydrate + protein snack within 30 min of training).",
      };
    } else {
      return {
        label: "Optimal Energy Availability (Peak Health & Power)",
        color: "text-emerald-800 bg-emerald-50 border-emerald-300",
        alertIcon: CheckCircle2,
        iconColor: "text-emerald-600",
        boneHealth: "Robust bone remodeling, healthy osteoblast activity, fracture resistance",
        menstrualHealth: "Healthy, regular ovulatory cycles producing vital protective estrogen",
        performance: "Rapid neuromuscular recovery, optimal glycogen replenishment, high training power",
        recoveryTip: "Ideal balance maintaining hormonal homeostasis and long-term athletic longevity!",
      };
    }
  };

  const status = getStatus(energyLevel);
  const StatusIcon = status.alertIcon;

  return (
    <div className="rounded-2xl border border-deep-teal/20 bg-white p-4 md:p-5 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-2 border-b border-deep-teal/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deep-teal">
            <Zap className="w-3.5 h-3.5 text-coral" />
            Interactive Scale
          </div>
          <h4 className="text-base md:text-lg font-serif font-bold text-deep-teal mt-0.5">
            {diagram.title}
          </h4>
        </div>
        <span className="text-[11px] font-semibold bg-[#D8EFED] px-2.5 py-1 rounded-full text-[#175B5C] border border-[#175B5C]/30">
          Drag slider to simulate fueling
        </span>
      </div>

      {/* Fueling Slider & Balance Beam */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between text-xs font-bold mb-1">
          <span className="text-charcoal/80">Energy Availability (kcal / kg Fat-Free Mass / day):</span>
          <span className="text-base font-extrabold text-deep-teal">{energyLevel} kcal/kg/day</span>
        </div>

        <input
          type="range"
          min="15"
          max="55"
          step="1"
          value={energyLevel}
          onChange={(e) => setEnergyLevel(Number(e.target.value))}
          className="w-full accent-deep-teal cursor-pointer h-2.5 bg-slate-200 rounded-lg"
        />

        <div className="flex justify-between text-[11px] text-slate-700 font-semibold mt-1">
          <span className="text-red-800 font-bold">&lt;30 RED-S Hazard</span>
          <span className="text-amber-800 font-bold">30–44 Subclinical</span>
          <span className="text-emerald-800 font-bold">&gt;45 Optimal Performance</span>
        </div>

        {/* Visual Balance Gauge */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col items-center">
          <div className="w-full h-4 rounded-full bg-slate-200 overflow-hidden flex">
            <div className="w-[30%] bg-red-500/80 h-full" title="Severe Low Energy" />
            <div className="w-[30%] bg-amber-400/80 h-full" title="Subclinical" />
            <div className="w-[40%] bg-emerald-500/80 h-full" title="Optimal Fueling" />
          </div>
          <div className="w-full flex justify-between text-[10px] font-mono text-slate-700 font-bold mt-1">
            <span>Low Energy</span>
            <span>Balanced</span>
            <span>Fully Fueled</span>
          </div>
        </div>
      </div>

      {/* Dynamic Clinical Outcome Card */}
      <div className={`p-4 rounded-xl border ${status.color}`}>
        <div className="flex items-center gap-2 mb-2">
          <StatusIcon className={`w-5 h-5 ${status.iconColor} shrink-0`} />
          <h5 className="font-bold text-sm md:text-base">{status.label}</h5>
        </div>

        <div className="space-y-2 text-xs md:text-sm">
          <div>
            <strong className="text-charcoal font-bold">Menstrual Cycle Status: </strong>
            <span className="text-charcoal/90">{status.menstrualHealth}</span>
          </div>
          <div>
            <strong className="text-charcoal font-bold">Bone Mineral Health: </strong>
            <span className="text-charcoal/90">{status.boneHealth}</span>
          </div>
          <div>
            <strong className="text-charcoal font-bold">Athletic Capacity: </strong>
            <span className="text-charcoal/90">{status.performance}</span>
          </div>
          <div className="pt-2 border-t border-black/10 text-[11px] md:text-xs">
            <strong>Clinical Advice: </strong>{status.recoveryTip}
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 3. Pelvic Anatomy & Endometriosis Pinpoint Map
// --------------------------------------------------------------------------
function PelvicMapDiagram({ diagram }: { diagram: LessonDiagram; themeColor: string }) {
  const [selectedSite, setSelectedSite] = useState<string>("ovary");

  const sites: Record<string, { title: string; location: string; symptoms: string; clinicalNote: string }> = {
    ovary: {
      title: "Ovaries (Endometriomas)",
      location: "Endometrial-like tissue implants on or inside the ovary, forming 'chocolate cysts'.",
      symptoms: "Sharp ovulation pain, chronic unilateral pelvic aching, inflammation affecting egg reserve.",
      clinicalNote: "These cysts do not resolve on their own like simple functional cysts and require ultrasound monitoring.",
    },
    uterosacral: {
      title: "Uterosacral Ligaments",
      location: "Deep fibrous bands supporting the lower uterus and connecting to the sacrum (tailbone).",
      symptoms: "Deep pelvic pain during intercourse (dyspareunia), intense lower back pain radiating down legs.",
      clinicalNote: "Often missed on basic scans because lesions are deep infiltrating nodules rather than fluid cysts.",
    },
    douglas: {
      title: "Pouch of Douglas (Cul-de-sac)",
      location: "The space situated between the rectum and the posterior wall of the uterus.",
      symptoms: "Painful bowel movements during menstruation (dyschezia), severe rectal pressure and cramping.",
      clinicalNote: "Adhesions here can cause pelvic organs to adhere together, creating frozen pelvis syndrome.",
    },
    bladder: {
      title: "Bladder & Peritoneum",
      location: "Surface lesions on the peritoneal lining over the bladder wall.",
      symptoms: "Cyclical urinary urgency, frequency, and deep bladder pressure during periods (often misdiagnosed as UTIs with negative cultures).",
      clinicalNote: "Negative urine cultures during intense flare-ups are a key clinical clue pointing toward endometriosis.",
    },
  };

  const active = sites[selectedSite];

  return (
    <div className="rounded-2xl border border-deep-teal/20 bg-white p-4 md:p-5 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-2 border-b border-deep-teal/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-coral">
            <Heart className="w-3.5 h-3.5 text-coral" />
            Interactive Anatomical Mapping
          </div>
          <h4 className="text-base md:text-lg font-serif font-bold text-deep-teal mt-0.5">
            {diagram.title}
          </h4>
        </div>
        <span className="text-[11px] font-semibold bg-[#FFE1DB] px-2.5 py-1 rounded-full text-[#B83F68] border border-coral/30">
          Tap anatomical hotspots
        </span>
      </div>

      {/* Interactive Map Canvas */}
      <div className="relative rounded-xl bg-gradient-to-b from-rose-50 to-orange-50/50 p-4 border border-coral/20 min-h-[220px] flex flex-col items-center justify-center">
        {/* Schematic Pelvic Silhouette */}
        <div className="w-full max-w-sm relative aspect-[4/3] flex items-center justify-center">
          {/* SVG Organ Representation */}
          <svg viewBox="0 0 300 220" className="w-full h-full">
            {/* Pelvic outline */}
            <path d="M 30 50 C 70 20, 230 20, 270 50 C 290 120, 250 200, 150 210 C 50 200, 10 120, 30 50 Z" fill="#FEE2E2" opacity="0.4" stroke="#FDA4AF" strokeWidth="2" />
            
            {/* Uterus representation */}
            <path d="M 110 90 C 110 55, 190 55, 190 90 C 190 130, 160 145, 150 145 C 140 145, 110 130, 110 90 Z" fill="#F47A6A" opacity="0.6" stroke="#E11D48" strokeWidth="1.5" />
            
            {/* Fallopian tubes */}
            <path d="M 115 70 C 75 55, 60 75, 45 90" fill="none" stroke="#F47A6A" strokeWidth="3" />
            <path d="M 185 70 C 225 55, 240 75, 255 90" fill="none" stroke="#F47A6A" strokeWidth="3" />
            
            {/* Ovaries */}
            <ellipse cx="45" cy="95" rx="14" ry="10" fill="#FFE4E6" stroke="#E11D48" strokeWidth="1.5" />
            <ellipse cx="255" cy="95" rx="14" ry="10" fill="#FFE4E6" stroke="#E11D48" strokeWidth="1.5" />

            {/* Pouch of Douglas zone */}
            <path d="M 130 148 C 140 165, 160 165, 170 148" fill="none" stroke="#FDA4AF" strokeDasharray="2,2" strokeWidth="2" />

            {/* Hotspot Pins */}
            {/* Ovary Pin */}
            <g onClick={() => setSelectedSite("ovary")} className="cursor-pointer group">
              <circle cx="45" cy="95" r={selectedSite === "ovary" ? "12" : "8"} fill="#E11D48" className={selectedSite === "ovary" ? "animate-pulse" : ""} />
              <text x="45" y="99" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">1</text>
            </g>

            {/* Uterosacral Ligament Pin */}
            <g onClick={() => setSelectedSite("uterosacral")} className="cursor-pointer group">
              <circle cx="120" cy="130" r={selectedSite === "uterosacral" ? "12" : "8"} fill="#E11D48" className={selectedSite === "uterosacral" ? "animate-pulse" : ""} />
              <text x="120" y="134" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">2</text>
            </g>

            {/* Pouch of Douglas Pin */}
            <g onClick={() => setSelectedSite("douglas")} className="cursor-pointer group">
              <circle cx="150" cy="165" r={selectedSite === "douglas" ? "12" : "8"} fill="#E11D48" className={selectedSite === "douglas" ? "animate-pulse" : ""} />
              <text x="150" y="169" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">3</text>
            </g>

            {/* Bladder Pin */}
            <g onClick={() => setSelectedSite("bladder")} className="cursor-pointer group">
              <circle cx="150" cy="50" r={selectedSite === "bladder" ? "12" : "8"} fill="#E11D48" className={selectedSite === "bladder" ? "animate-pulse" : ""} />
              <text x="150" y="54" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">4</text>
            </g>
          </svg>
        </div>

        {/* Hotspot Quick Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          {Object.entries(sites).map(([key, item], idx) => (
            <button
              key={key}
              onClick={() => setSelectedSite(key)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                selectedSite === key
                  ? "bg-coral text-white shadow-sm ring-2 ring-coral/30"
                  : "bg-white text-charcoal/80 border border-coral/30 hover:bg-rose-50"
              }`}
            >
              #{idx + 1} {item.title.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Site Information */}
      <div className="p-4 rounded-xl bg-white border border-coral/30 shadow-sm space-y-2 text-xs md:text-sm">
        <div className="flex items-center justify-between">
          <h5 className="font-bold text-sm md:text-base text-[#B83F68]">{active.title}</h5>
          <span className="text-[11px] font-semibold text-charcoal/60">Anatomical Focus</span>
        </div>
        <p className="text-charcoal/80"><strong>Where:</strong> {active.location}</p>
        <p className="text-charcoal/90"><strong>Symptoms Triggered:</strong> {active.symptoms}</p>
        <div className="p-2.5 rounded-lg bg-rose-50/80 border border-coral/20 text-[11px] text-charcoal/85">
          <strong>Clinical Reality:</strong> {active.clinicalNote}
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 4. PCOS Metabolic & Endocrine Cycle Loop
// --------------------------------------------------------------------------
function PcosLoopDiagram({ diagram }: { diagram: LessonDiagram; themeColor: string }) {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 0,
      title: "1. Insulin Resistance",
      driver: "Metabolic Trigger",
      desc: "Receptors on muscle and fat cells respond less efficiently to insulin. The pancreas compensates by producing higher circulating insulin levels.",
      intervention: "Intervention: Whole food complex carbs, dietary fiber, resistance training, and myo-inositol improve cellular insulin sensitivity.",
    },
    {
      id: 1,
      title: "2. Ovarian Androgen Production",
      driver: "Hormonal Cascade",
      desc: "High circulating insulin stimulates the ovarian theca cells to overproduce androgens (testosterone and DHEA-S).",
      intervention: "Intervention: Lowering insulin surges or using anti-androgenic nutrition/medications helps curb excess androgen synthesis.",
    },
    {
      id: 2,
      title: "3. Arrested Follicle Maturation",
      driver: "Ovulatory Disruption",
      desc: "Elevated androgens prevent dominant follicle selection. Multiple immature follicles pause in development, creating a ring of follicles.",
      intervention: "Intervention: Restoring metabolic balance prompts follicles to complete maturation and release an egg naturally.",
    },
    {
      id: 3,
      title: "4. Missing Ovulation & Progesterone Deficit",
      driver: "Cycle Symptom",
      desc: "Without egg release, no corpus luteum forms to produce progesterone. Cycles become delayed, irregular, or absent (oligomenorrhea).",
      intervention: "Intervention: Cyclical progestin or bio-identical progesterone can protect the endometrium and regulate cycle timing.",
    },
  ];

  const current = steps[activeStep];

  return (
    <div className="rounded-2xl border border-raspberry/20 bg-white p-4 md:p-5 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-2 border-b border-raspberry/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-raspberry">
            <Sparkles className="w-3.5 h-3.5 text-raspberry" />
            Endocrine Feedback Loop
          </div>
          <h4 className="text-base md:text-lg font-serif font-bold text-deep-teal mt-0.5">
            {diagram.title}
          </h4>
        </div>
        <span className="text-[11px] font-semibold bg-soft-pink px-2.5 py-1 rounded-full text-raspberry border border-raspberry/20">
          Click step to trace loop
        </span>
      </div>

      {/* Interactive Loop Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {steps.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStep(s.id)}
            className={`p-3 rounded-xl text-left border transition-all ${
              activeStep === s.id
                ? "bg-soft-pink border-raspberry text-raspberry shadow-sm font-bold scale-[1.02]"
                : "bg-gray-50 border-gray-200 text-charcoal/70 hover:bg-white hover:border-raspberry/30"
            }`}
          >
            <div className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{s.driver}</div>
            <div className="text-xs font-bold mt-1 leading-snug">{s.title}</div>
          </button>
        ))}
      </div>

      {/* Active Step Details */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-soft-pink/30 to-white border border-raspberry/30 space-y-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-raspberry">{current.driver}</span>
          <h5 className="text-base font-bold font-serif text-deep-teal mt-0.5">{current.title}</h5>
        </div>
        <p className="text-xs md:text-sm text-charcoal/85 leading-relaxed">{current.desc}</p>
        <div className="p-3 rounded-lg bg-white border border-raspberry/20 text-xs text-charcoal/90">
          <strong className="text-raspberry">Empowered Action: </strong>
          {current.intervention}
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 5. Puberty Developmental Timeline
// --------------------------------------------------------------------------
function PubertyTimelineDiagram({ diagram }: { diagram: LessonDiagram; themeColor: string }) {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      id: 0,
      title: "Adrenarche & Early Signals",
      ageRange: "Ages 8–11",
      milestone: "Adrenal hormone activation",
      details: "Adrenal glands begin producing mild androgens (DHEA). Early signs include slight body odor, slight skin oiliness, and initial emotional shifts.",
      reassurance: "Beginning earlier or later than peers is completely healthy and guided by family genetics.",
    },
    {
      id: 1,
      title: "Thelarche (Breast Budding)",
      ageRange: "Ages 9–12",
      milestone: "Estrogen triggers tissue development",
      details: "Small, firm 'breast buds' appear beneath the areolas, often tender and frequently asymmetrical at first. This is typically the first physical marker.",
      reassurance: "Asymmetry is completely normal and evens out as tissue matures over several years.",
    },
    {
      id: 2,
      title: "Peak Height Velocity & Pubarche",
      ageRange: "Ages 10–13",
      milestone: "Growth spurt & body hair growth",
      details: "Rapid acceleration in height, bone density consolidation, widening of hips, and development of fine pubic and underarm hair.",
      reassurance: "Your body requires more daily calories, sleep, and hydration during rapid growth spurts.",
    },
    {
      id: 3,
      title: "Menarche (First Period)",
      ageRange: "Ages 11–15",
      milestone: "First menstrual bleeding",
      details: "Occurs typically 1.5 to 2.5 years after breast budding begins. Initial cycles are often irregular for the first 1–2 years as the brain and ovaries synchronize.",
      reassurance: "Irregular spacing during the first two years is standard as ovulatory cycles mature.",
    },
  ];

  const current = stages[activeStage];

  return (
    <div className="rounded-2xl border border-deep-teal/20 bg-white p-4 md:p-5 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-2 border-b border-deep-teal/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deep-teal">
            <Shield className="w-3.5 h-3.5 text-deep-teal" />
            Biological Milestones
          </div>
          <h4 className="text-base md:text-lg font-serif font-bold text-deep-teal mt-0.5">
            {diagram.title}
          </h4>
        </div>
        <span className="text-[11px] font-semibold bg-light-teal px-2.5 py-1 rounded-full text-deep-teal border border-deep-teal/20">
          Step through timeline
        </span>
      </div>

      {/* Stepper buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {stages.map((st) => (
          <button
            key={st.id}
            onClick={() => setActiveStage(st.id)}
            className={`p-3 rounded-xl text-left border transition-all ${
              activeStage === st.id
                ? "bg-light-teal border-deep-teal text-deep-teal shadow-sm font-bold scale-[1.02]"
                : "bg-gray-50 border-gray-200 text-charcoal/70 hover:bg-white hover:border-deep-teal/30"
            }`}
          >
            <div className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{st.ageRange}</div>
            <div className="text-xs font-bold mt-1 leading-snug">{st.title.split(" ")[0]}</div>
          </button>
        ))}
      </div>

      {/* Stage Detail Card */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs md:text-sm">
        <div className="flex items-center justify-between">
          <h5 className="font-bold text-base text-deep-teal">{current.title}</h5>
          <span className="text-xs font-bold bg-white px-2.5 py-1 rounded-full border border-slate-300 text-charcoal">
            {current.ageRange}
          </span>
        </div>
        <p className="text-charcoal/85 leading-relaxed">{current.details}</p>
        <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-charcoal/90">
          <strong className="text-deep-teal">Medical Reassurance: </strong>
          {current.reassurance}
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 6. Interactive Female Reproductive Anatomy Map
// --------------------------------------------------------------------------
function AnatomyCalloutDiagram({ diagram }: { diagram: LessonDiagram; themeColor: string }) {
  const [selectedPart, setSelectedPart] = useState<string>("uterus");

  const parts: Record<
    string,
    {
      name: string;
      plainNickname: string;
      color: string;
      bgClass: string;
      borderClass: string;
      whatItDoes: string;
      whyItMatters: string;
      doctorSays: string;
    }
  > = {
    uterus: {
      name: "The Uterus (Womb)",
      plainNickname: "The Muscular Home & Cradle",
      color: "#F47A6A",
      bgClass: "bg-[#FFE1DB]",
      borderClass: "border-coral",
      whatItDoes: "A hollow, strong pear-shaped muscle about the size of a fist. During periods, it gently contracts to shed blood. If a pregnancy happens, it stretches safely to hold a baby.",
      whyItMatters: "Mild cramps happen when this muscle flexes. Severe pain means natural chemicals (prostaglandins) or inflammation need care.",
      doctorSays: "Evaluated during ultrasound or pelvic checks for fibroids, adenomyosis, or position (e.g. tilted/retroverted uterus, which is totally normal!).",
    },
    ovaries: {
      name: "The Ovaries (Twin Glands)",
      plainNickname: "The Egg & Hormone Factory",
      color: "#175B5C",
      bgClass: "bg-light-teal",
      borderClass: "border-deep-teal",
      whatItDoes: "Two almond-sized glands on either side of the uterus. They house all the eggs you were born with and produce your key hormones: estrogen and progesterone.",
      whyItMatters: "Every month, one ovary matures and releases an egg (ovulation). Healthy ovaries mean steady energy, strong bones, and healthy cycles.",
      doctorSays: "Checked for cysts, ovulation maturity, and ovarian reserve using blood hormones (AMH, FSH) and pelvic ultrasound.",
    },
    tubes: {
      name: "The Fallopian Tubes",
      plainNickname: "The Gentle Connecting Highway",
      color: "#991B4B",
      bgClass: "bg-soft-pink",
      borderClass: "border-raspberry",
      whatItDoes: "Two delicate, trumpet-ended tubes with tiny hair-like fingers (cilia) that sweep the egg from the ovary toward the uterus each month.",
      whyItMatters: "Fertilization happens inside these tubes. Keeping them free of infections (like untreated STIs) protects your future choices.",
      doctorSays: "Assessed if there is concern about pelvic inflammatory disease (PID) or blockages that could cause ectopic pregnancy.",
    },
    endometrium: {
      name: "The Endometrium",
      plainNickname: "The Monthly Plush Cushion",
      color: "#E11D48",
      bgClass: "bg-rose-100",
      borderClass: "border-rose-300",
      whatItDoes: "The soft, velvety inner lining of your uterus. Estrogen builds it up each cycle into a plush bed; when pregnancy doesn't occur, progesterone drops and it sheds as your period.",
      whyItMatters: "Spotting or extra heavy periods happen when hormones build this lining up too thick or unevenly.",
      doctorSays: "Measured on ultrasound in millimeters to check for balanced hormones or signs of endometriosis outside the uterus.",
    },
    cervix: {
      name: "The Cervix",
      plainNickname: "The Intelligent Doorway",
      color: "#D97706",
      bgClass: "bg-amber-100",
      borderClass: "border-amber-400",
      whatItDoes: "The lower neck of the uterus that connects to the vagina. It makes natural, healthy fluids that change texture across your cycle (from lotiony to stretchy egg-white).",
      whyItMatters: "Noticing stretchy clear fluid means ovulation is near! The cervix also naturally keeps bacteria from entering the sterile uterus.",
      doctorSays: "Screened in older teens and adults via routine, gentle Pap smears starting at age 21 to keep cervical cells healthy.",
    },
  };

  const current = parts[selectedPart];

  return (
    <div className="rounded-2xl border-2 border-deep-teal/20 bg-white p-4 md:p-5 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-2 border-b border-deep-teal/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deep-teal">
            <Sparkles className="w-3.5 h-3.5 text-raspberry" />
            Interactive Anatomy Guide
          </div>
          <h4 className="text-base md:text-lg font-serif font-bold text-deep-teal mt-0.5">
            {diagram.title}
          </h4>
        </div>
        <span className="text-[11px] font-semibold bg-light-teal px-2.5 py-1 rounded-full text-deep-teal border border-deep-teal/20">
          Tap any organ to learn
        </span>
      </div>

      {/* Interactive Visual Anatomy Canvas */}
      <div className="rounded-2xl bg-gradient-to-b from-teal-50/60 via-white to-rose-50/40 p-4 border-2 border-deep-teal/15 flex flex-col items-center">
        <svg viewBox="0 0 400 240" className="w-full max-w-md h-48 md:h-56">
          {/* Uterine body */}
          <path
            d="M 140 100 C 140 45, 260 45, 260 100 C 260 155, 220 175, 200 175 C 180 175, 140 155, 140 100 Z"
            fill={selectedPart === "uterus" ? "#F47A6A" : "#FEE2E2"}
            stroke="#E11D48"
            strokeWidth="2.5"
            className="cursor-pointer transition-all hover:opacity-90"
            onClick={() => setSelectedPart("uterus")}
          />

          {/* Endometrium inner cavity */}
          <path
            d="M 170 95 C 170 70, 230 70, 230 95 C 230 135, 205 145, 200 145 C 195 145, 170 135, 170 95 Z"
            fill={selectedPart === "endometrium" ? "#E11D48" : "#FDA4AF"}
            stroke="#BE123C"
            strokeWidth="1.5"
            className="cursor-pointer transition-all"
            onClick={() => setSelectedPart("endometrium")}
          />

          {/* Fallopian Tubes */}
          <path
            d="M 148 75 C 100 50, 70 70, 50 90"
            fill="none"
            stroke={selectedPart === "tubes" ? "#991B4B" : "#F47A6A"}
            strokeWidth={selectedPart === "tubes" ? "5" : "3.5"}
            strokeLinecap="round"
            className="cursor-pointer transition-all"
            onClick={() => setSelectedPart("tubes")}
          />
          <path
            d="M 252 75 C 300 50, 330 70, 350 90"
            fill="none"
            stroke={selectedPart === "tubes" ? "#991B4B" : "#F47A6A"}
            strokeWidth={selectedPart === "tubes" ? "5" : "3.5"}
            strokeLinecap="round"
            className="cursor-pointer transition-all"
            onClick={() => setSelectedPart("tubes")}
          />

          {/* Ovaries */}
          <ellipse
            cx="48"
            cy="100"
            rx="18"
            ry="13"
            fill={selectedPart === "ovaries" ? "#175B5C" : "#D8EFED"}
            stroke="#175B5C"
            strokeWidth="2"
            className="cursor-pointer transition-all"
            onClick={() => setSelectedPart("ovaries")}
          />
          <ellipse
            cx="352"
            cy="100"
            rx="18"
            ry="13"
            fill={selectedPart === "ovaries" ? "#175B5C" : "#D8EFED"}
            stroke="#175B5C"
            strokeWidth="2"
            className="cursor-pointer transition-all"
            onClick={() => setSelectedPart("ovaries")}
          />

          {/* Cervix */}
          <rect
            x="185"
            y="175"
            width="30"
            height="35"
            rx="6"
            fill={selectedPart === "cervix" ? "#D97706" : "#FEF3C7"}
            stroke="#B45309"
            strokeWidth="2"
            className="cursor-pointer transition-all"
            onClick={() => setSelectedPart("cervix")}
          />

          {/* Vagina Canal */}
          <path d="M 180 210 L 180 235 M 220 210 L 220 235" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3,3" />

          {/* Clickable Badges on Diagram */}
          <text x="48" y="104" textAnchor="middle" fill={selectedPart === "ovaries" ? "#fff" : "#175B5C"} fontSize="10" fontWeight="bold">Ovary</text>
          <text x="352" y="104" textAnchor="middle" fill={selectedPart === "ovaries" ? "#fff" : "#175B5C"} fontSize="10" fontWeight="bold">Ovary</text>
          <text x="200" y="85" textAnchor="middle" fill="#991B4B" fontSize="10" fontWeight="bold">Uterus</text>
          <text x="200" y="125" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Lining</text>
          <text x="200" y="196" textAnchor="middle" fill={selectedPart === "cervix" ? "#fff" : "#92400E"} fontSize="9" fontWeight="bold">Cervix</text>
        </svg>

        {/* Quick Organ Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          {Object.entries(parts).map(([key, item]) => (
            <button
              key={key}
              onClick={() => setSelectedPart(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedPart === key
                  ? `${item.bgClass} text-charcoal border-2 ${item.borderClass} shadow-xs scale-105`
                  : "bg-white text-charcoal/70 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {item.name.split(" ")[1] || item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Detail Breakdown for Selected Organ */}
      <div className={`p-4 rounded-2xl border-2 ${current.borderClass} bg-white shadow-xs space-y-2 text-xs md:text-sm`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h5 className="font-serif font-bold text-base md:text-lg text-deep-teal m-0">
            {current.name}
          </h5>
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${current.bgClass} text-charcoal`}>
            {current.plainNickname}
          </span>
        </div>

        <div className="space-y-2 pt-1">
          <p className="text-charcoal/85 leading-relaxed m-0 font-sans">
            <strong className="text-deep-teal">What It Does: </strong>
            {current.whatItDoes}
          </p>
          <p className="text-charcoal/85 leading-relaxed m-0 font-sans">
            <strong className="text-raspberry">Why It Matters For You: </strong>
            {current.whyItMatters}
          </p>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11.5px] text-charcoal/80">
            <strong className="inline-flex items-center gap-1 text-slate-800 font-bold mb-0.5">
              <Stethoscope className="w-3.5 h-3.5 text-slate-600 inline shrink-0" />
              <span>What a Doctor Checks:</span>
            </strong>
            <p className="m-0 mt-0.5">{current.doctorSays}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 7. Athlete Fueling Plate (Nutrition & Hormonal Recovery)
// --------------------------------------------------------------------------
function AthletePlateDiagram({ diagram }: { diagram: LessonDiagram; themeColor: string }) {
  const [dayType, setDayType] = useState<"easy" | "moderate" | "hard">("moderate");

  const plateConfigs = {
    easy: {
      title: "Easy Training / Rest & Recovery Day",
      subtitle: "Focus on cellular repair, anti-inflammatory colors, and light mobility.",
      carbs: "25% Plate (Complex Carbs)",
      carbDetail: "Whole grains, sweet potato, oats, brown rice for steady basal glycogen.",
      protein: "25% Plate (Lean Protein)",
      proteinDetail: "Eggs, tofu, chicken, lentils, Greek yogurt to rebuild muscle tissue.",
      colors: "50% Plate (Colorful Fruits & Veggies)",
      colorDetail: "Berries, leafy greens, peppers, carrots packed with antioxidants.",
      fluids: "Water + herbal teas throughout the day.",
      hormoneImpact: "Gives your digestive tract rest while maintaining stable resting blood sugar.",
      svgCarbAngle: 90,
      svgProteinAngle: 90,
      svgVegAngle: 180,
    },
    moderate: {
      title: "Moderate Training Day (60–90 Minutes Practice)",
      subtitle: "Balanced fuel maintaining normal ovulatory cycles and athletic energy.",
      carbs: "35% Plate (Performance Carbs)",
      carbDetail: "Oats, pasta, quinoa, sourdough, banana for muscle glycogen tops.",
      protein: "30% Plate (Lean Protein)",
      proteinDetail: "25–30g of protein every 3–4 hours for steady muscle synthesis.",
      colors: "35% Plate (Veggies & Fruits)",
      colorDetail: "Spinach (iron!), broccoli, citrus (vitamin C increases iron absorption).",
      fluids: "Electrolyte water before, during, and right after practice.",
      hormoneImpact: "Prevents cortisol spikes and keeps kisspeptin (brain period switch) happy.",
      svgCarbAngle: 125,
      svgProteinAngle: 110,
      svgVegAngle: 125,
    },
    hard: {
      title: "Hard Training / Game Day / Double Sessions",
      subtitle: "High energy availability prioritizing immediate carbohydrate replenishment.",
      carbs: "50% Plate (High-Octane Carbs)",
      carbDetail: "Rice, potatoes, bagels, pasta. Essential to prevent RED-S and bone loss.",
      protein: "25% Plate (Recovery Protein)",
      proteinDetail: "Protein snack within 30–45 mins of training to turn off muscle breakdown.",
      colors: "25% Plate (Cooked Veggies & Berries)",
      colorDetail: "Gentle cooked veggies that digest easily before high-intensity sprints.",
      fluids: "Carbohydrate + electrolyte sports drink during active sweating.",
      hormoneImpact: "CRITICAL: Under-fueling on hard days stops periods within just 5 days.",
      svgCarbAngle: 180,
      svgProteinAngle: 90,
      svgVegAngle: 90,
    },
  };

  const config = plateConfigs[dayType];

  return (
    <div className="rounded-2xl border-2 border-coral/30 bg-white p-4 md:p-5 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-2 border-b border-coral/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-coral">
            <Zap className="w-3.5 h-3.5 text-coral" />
            Athlete Nutrition Scale
          </div>
          <h4 className="text-base md:text-lg font-serif font-bold text-deep-teal mt-0.5">
            {diagram.title}
          </h4>
        </div>
        <span className="text-[11px] font-semibold bg-[#FFE1DB] px-2.5 py-1 rounded-full text-[#B83F68] border border-coral/30">
          Switch training intensity
        </span>
      </div>

      {/* Intensity Selector Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {(["easy", "moderate", "hard"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setDayType(mode)}
            className={`p-2.5 rounded-xl text-center border font-bold text-xs transition-all ${
              dayType === mode
                ? "bg-coral text-white border-coral shadow-xs ring-2 ring-coral/20 scale-105"
                : "bg-white text-charcoal/75 border-slate-200 hover:bg-rose-50"
            }`}
          >
            {mode === "easy" && "Rest Day"}
            {mode === "moderate" && "Practice Day"}
            {mode === "hard" && "Game Day"}
          </button>
        ))}
      </div>

      {/* Interactive Visual Plate */}
      <div className="rounded-2xl bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/40 p-4 border border-coral/20 flex flex-col sm:flex-row items-center justify-around gap-4">
        {/* SVG Plate Representation */}
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            {/* Outer Plate Rim */}
            <circle cx="100" cy="100" r="95" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="4" />
            <circle cx="100" cy="100" r="82" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />

            {/* Dynamic Slices based on dayType */}
            {dayType === "easy" && (
              <>
                {/* 50% Veggies (Top half: 0 to 180 deg) */}
                <path d="M 100 100 L 182 100 A 82 82 0 0 1 18 100 Z" fill="#34D399" opacity="0.85" />
                {/* 25% Protein (Bottom left: 180 to 270 deg) */}
                <path d="M 100 100 L 18 100 A 82 82 0 0 1 100 182 Z" fill="#F87171" opacity="0.85" />
                {/* 25% Carbs (Bottom right: 270 to 360 deg) */}
                <path d="M 100 100 L 100 182 A 82 82 0 0 1 182 100 Z" fill="#FBBF24" opacity="0.85" />
              </>
            )}

            {dayType === "moderate" && (
              <>
                {/* ~35% Carbs */}
                <path d="M 100 100 L 182 100 A 82 82 0 0 1 60 175 Z" fill="#FBBF24" opacity="0.85" />
                {/* ~30% Protein */}
                <path d="M 100 100 L 60 175 A 82 82 0 0 1 35 50 Z" fill="#F87171" opacity="0.85" />
                {/* ~35% Veggies */}
                <path d="M 100 100 L 35 50 A 82 82 0 0 1 182 100 Z" fill="#34D399" opacity="0.85" />
              </>
            )}

            {dayType === "hard" && (
              <>
                {/* 50% Carbs (Half plate!) */}
                <path d="M 100 100 L 182 100 A 82 82 0 0 1 18 100 Z" fill="#FBBF24" opacity="0.9" />
                {/* 25% Protein */}
                <path d="M 100 100 L 18 100 A 82 82 0 0 1 100 182 Z" fill="#F87171" opacity="0.85" />
                {/* 25% Veggies */}
                <path d="M 100 100 L 100 182 A 82 82 0 0 1 182 100 Z" fill="#34D399" opacity="0.85" />
              </>
            )}

            {/* Inner Plate Center Circle */}
            <circle cx="100" cy="100" r="18" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <text x="100" y="104" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E293B">Fuel</text>
          </svg>
        </div>

        {/* Legend & Proportions */}
        <div className="flex-1 space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-amber-400 shrink-0"></span>
            <div>
              <strong className="text-amber-900 block">{config.carbs}</strong>
              <span className="text-charcoal/70 text-[11px]">{config.carbDetail}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-rose-400 shrink-0"></span>
            <div>
              <strong className="text-rose-900 block">{config.protein}</strong>
              <span className="text-charcoal/70 text-[11px]">{config.proteinDetail}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-emerald-400 shrink-0"></span>
            <div>
              <strong className="text-emerald-900 block">{config.colors}</strong>
              <span className="text-charcoal/70 text-[11px]">{config.colorDetail}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hormone Protection Clinical Note */}
      <div className="p-3.5 rounded-xl bg-[#FFE1DB]/40 border border-coral/30 text-xs text-charcoal/90">
        <strong className="text-[#B83F68] block mb-1 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-[#B83F68] shrink-0" />
          <span>Why Fueling Protects Your Hormones:</span>
        </strong>
        {config.hormoneImpact}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 8. Hormone Balance Scale (Seesaw)
// --------------------------------------------------------------------------
function HormoneScaleDiagram({ diagram }: { diagram: LessonDiagram; themeColor: string }) {
  const [balanceMode, setBalanceMode] = useState<"balanced" | "low_fuel" | "pcos">("balanced");

  const scenarios = {
    balanced: {
      title: "Balanced Natural Rhythm",
      statusText: "Healthy Hormonal Harmony",
      scaleAngle: 0,
      estrogen: "Normal / Cyclic",
      progesterone: "Normal (Post-Ovulation)",
      androgens: "Healthy Low Baseline",
      feelings: "Regular cycles, resilient moods, strong bone density, and steady athletic recovery.",
      actionTip: "Keep maintaining consistent fueling, sleep, and iron intake.",
    },
    low_fuel: {
      title: "Low Fuel / Stress / RED-S",
      statusText: "Under-Fueling Suppression",
      scaleAngle: -12,
      estrogen: "Critically Suppressed (Low)",
      progesterone: "Missing (No Ovulation)",
      androgens: "Normal to Low",
      feelings: "Periods stop (amenorrhea), frequent stress fractures, cold hands/feet, feeling chronically drained.",
      actionTip: "Increase daily complex carbs and overall calories to signal safety to your brain.",
    },
    pcos: {
      title: "PCOS Hormone Pattern",
      statusText: "Elevated Androgens & Insulin",
      scaleAngle: 12,
      estrogen: "Steady but Unofficially High",
      progesterone: "Low / Infrequent",
      androgens: "Elevated (High Testosterone)",
      feelings: "Irregular cycles (40–60+ days apart), hormonal acne along jawline, stubborn fatigue, hair thinning.",
      actionTip: "Balance blood sugar with protein + fiber meals, strength training, and talk to a doctor.",
    },
  };

  const current = scenarios[balanceMode];

  return (
    <div className="rounded-2xl border-2 border-raspberry/30 bg-white p-4 md:p-5 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-2 border-b border-raspberry/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-raspberry">
            <Activity className="w-3.5 h-3.5 text-raspberry" />
            Hormone Balance Scale
          </div>
          <h4 className="text-base md:text-lg font-serif font-bold text-deep-teal mt-0.5">
            {diagram.title}
          </h4>
        </div>
        <span className="text-[11px] font-semibold bg-soft-pink px-2.5 py-1 rounded-full text-raspberry border border-raspberry/20">
          Click scenario to tilt
        </span>
      </div>

      {/* Scenario Selector */}
      <div className="grid grid-cols-3 gap-2">
        {(["balanced", "low_fuel", "pcos"] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setBalanceMode(mode)}
            className={`p-2.5 rounded-xl text-center border font-bold text-xs transition-all ${
              balanceMode === mode
                ? "bg-raspberry text-white border-raspberry shadow-xs scale-105"
                : "bg-white text-charcoal/70 border-slate-200 hover:bg-soft-pink/40"
            }`}
          >
            {mode === "balanced" && "Balanced"}
            {mode === "low_fuel" && "Low Fuel"}
            {mode === "pcos" && "PCOS Pattern"}
          </button>
        ))}
      </div>

      {/* Seesaw SVG Animation */}
      <div className="rounded-2xl bg-gradient-to-b from-purple-50/50 to-pink-50/50 p-4 border border-raspberry/20 flex flex-col items-center justify-center">
        <svg viewBox="0 0 320 120" className="w-full max-w-xs h-28">
          {/* Fulcrum (Triangle base) */}
          <polygon points="160,80 145,115 175,115" fill="#175B5C" />

          {/* Seesaw Beam */}
          <g transform={`rotate(${current.scaleAngle}, 160, 80)`} className="transition-all duration-500">
            <rect x="30" y="76" width="260" height="8" rx="4" fill="#64748B" />

            {/* Left Pan: Estrogen & Progesterone */}
            <circle cx="50" cy="70" r="16" fill="#F47A6A" />
            <text x="50" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">E+P</text>

            {/* Right Pan: Androgens / Stress */}
            <circle cx="270" cy="70" r="16" fill="#B83F68" />
            <text x="270" y="74" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">T/Ins</text>
          </g>

          {/* Baseline Ground */}
          <line x1="20" y1="115" x2="300" y2="115" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <div className="flex items-center justify-between w-full text-[11px] font-bold text-charcoal/70 px-4">
          <span className="text-coral">Estrogen &amp; Progesterone</span>
          <span className="text-raspberry">Androgens &amp; Stress</span>
        </div>
      </div>

      {/* Dynamic Scenario Insight Card */}
      <div className="p-4 rounded-xl bg-white border-2 border-raspberry/20 shadow-xs space-y-2 text-xs md:text-sm">
        <div className="flex items-center justify-between">
          <h5 className="font-bold text-deep-teal text-sm md:text-base">{current.title}</h5>
          <span className="text-[10px] font-bold bg-soft-pink px-2.5 py-0.5 rounded-full text-raspberry">
            {current.statusText}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px]">
          <div><strong>Estrogen:</strong> <br />{current.estrogen}</div>
          <div><strong>Progesterone:</strong> <br />{current.progesterone}</div>
          <div><strong>Androgens:</strong> <br />{current.androgens}</div>
        </div>

        <p className="text-charcoal/85 leading-relaxed m-0 pt-1 font-sans">
          <strong>How It Feels: </strong>{current.feelings}
        </p>

        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11.5px] text-emerald-950 font-sans flex items-start gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-900 font-bold">Supportive Action: </strong>
            <span>{current.actionTip}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 9. Female Athlete Triad / RED-S Triangle Diagram
// --------------------------------------------------------------------------
function RedSTriangleDiagram({ diagram }: { diagram: LessonDiagram; themeColor: string }) {
  const [activePillar, setActivePillar] = useState<"energy" | "cycle" | "bone">("energy");

  const pillars = {
    energy: {
      title: "1. Low Energy Availability",
      plainTitle: "Under-Fueling vs Energy Output",
      color: "#F47A6A",
      bgClass: "bg-[#FFE1DB]",
      borderClass: "border-coral",
      details: "Eating fewer calories than your body needs to fuel both your daily training AND your basic survival organs. Your brain recognizes an energy crisis.",
      warningSigns: "Always feeling drained, hair thinning, feeling cold constantly, dizzy when standing.",
      solution: "Add structured snacks (like peanut butter toast, smoothies, nuts) before and after training.",
    },
    cycle: {
      title: "2. Menstrual Disruption",
      plainTitle: "Irregular or Lost Periods",
      color: "#B83F68",
      bgClass: "bg-soft-pink",
      borderClass: "border-raspberry",
      details: "Because energy is scarce, the brain's hypothalamus turns off the signal to ovulate. Periods become spaced out or completely disappear (amenorrhea).",
      warningSigns: "Missing 3+ periods in a row, lighter flow, or losing your period during track/cross-country season.",
      solution: "Losing your period is NOT a badge of athletic honor. It is an emergency brake signal from your body.",
    },
    bone: {
      title: "3. Impaired Bone Health",
      plainTitle: "Fragile Bones & Stress Fractures",
      color: "#175B5C",
      bgClass: "bg-light-teal",
      borderClass: "border-deep-teal",
      details: "Without protective estrogen and adequate calcium/vitamin D, bones stop rebuilding. Young bones lose density that cannot easily be regained later in life.",
      warningSigns: "Recurring shin splints, stress fractures in feet or hips that take months to heal.",
      solution: "Prioritize calcium, vitamin D, and full energy availability to protect peak bone mass by age 20.",
    },
  };

  const current = pillars[activePillar];

  return (
    <div className="rounded-2xl border-2 border-deep-teal/20 bg-white p-4 md:p-5 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-2 border-b border-deep-teal/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deep-teal">
            <Shield className="w-3.5 h-3.5 text-deep-teal" />
            The Triad Triangle
          </div>
          <h4 className="text-base md:text-lg font-serif font-bold text-deep-teal mt-0.5">
            {diagram.title}
          </h4>
        </div>
        <span className="text-[11px] font-semibold bg-light-teal px-2.5 py-1 rounded-full text-deep-teal border border-deep-teal/20">
          Click triangle corners
        </span>
      </div>

      {/* Interactive SVG Triangle Canvas */}
      <div className="rounded-2xl bg-gradient-to-b from-teal-50/50 via-white to-rose-50/50 p-4 border border-deep-teal/15 flex flex-col items-center">
        <svg viewBox="0 0 300 220" className="w-full max-w-xs h-44 sm:h-48">
          {/* Triangle Shape */}
          <polygon
            points="150,30 50,185 250,185"
            fill="#FEF2F2"
            stroke="#175B5C"
            strokeWidth="3"
            strokeDasharray="4,3"
          />

          {/* Connecting Lines to Center */}
          <line x1="150" y1="30" x2="150" y2="135" stroke="#E2E8F0" strokeWidth="2" />
          <line x1="50" y1="185" x2="150" y2="135" stroke="#E2E8F0" strokeWidth="2" />
          <line x1="250" y1="185" x2="150" y2="135" stroke="#E2E8F0" strokeWidth="2" />

          {/* Center Hub */}
          <circle cx="150" cy="135" r="22" fill="#175B5C" />
          <text x="150" y="139" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">RED-S</text>

          {/* Corner 1: Energy (Top) */}
          <g onClick={() => setActivePillar("energy")} className="cursor-pointer group">
            <circle cx="150" cy="30" r={activePillar === "energy" ? "20" : "15"} fill="#F47A6A" />
            <text x="150" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">Energy</text>
          </g>

          {/* Corner 2: Periods (Bottom Left) */}
          <g onClick={() => setActivePillar("cycle")} className="cursor-pointer group">
            <circle cx="50" cy="185" r={activePillar === "cycle" ? "20" : "15"} fill="#B83F68" />
            <text x="50" y="189" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">Cycle</text>
          </g>

          {/* Corner 3: Bone (Bottom Right) */}
          <g onClick={() => setActivePillar("bone")} className="cursor-pointer group">
            <circle cx="250" cy="185" r={activePillar === "bone" ? "20" : "15"} fill="#175B5C" />
            <text x="250" y="189" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">Bones</text>
          </g>
        </svg>

        {/* 3 Corner Quick Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          {(["energy", "cycle", "bone"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setActivePillar(p)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                activePillar === p
                  ? `${pillars[p].bgClass} text-charcoal border-2 ${pillars[p].borderClass} shadow-xs scale-105`
                  : "bg-white text-charcoal/70 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {pillars[p].title}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Corner Detail Card */}
      <div className={`p-4 rounded-2xl border-2 ${current.borderClass} bg-white shadow-xs space-y-2 text-xs md:text-sm`}>
        <div className="flex items-center justify-between">
          <h5 className="font-serif font-bold text-base text-deep-teal m-0">{current.title}</h5>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${current.bgClass} text-charcoal`}>
            {current.plainTitle}
          </span>
        </div>

        <p className="text-charcoal/85 leading-relaxed m-0 font-sans">{current.details}</p>

        <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-950 font-sans text-[11.5px] flex items-start gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-rose-900 font-bold">Warning Signs to Notice: </strong>
            <span>{current.warningSigns}</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 font-sans text-[11.5px] flex items-start gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-900 font-bold">Action Step: </strong>
            <span>{current.solution}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 10. Interactive Water Glass & Cycle Hydration Tracker
// --------------------------------------------------------------------------
function HydrationWaterGlassDiagram({ diagram }: { diagram: LessonDiagram; themeColor: string }) {
  const [glasses, setGlasses] = useState<number>(6); // 1 glass = 8 oz (~240ml)
  const [phase, setPhase] = useState<"follicular" | "luteal" | "game_day">("luteal");

  const targets = {
    follicular: {
      goal: 8,
      ozGoal: 64,
      name: "Follicular Phase (Days 1–14)",
      temp: "Baseline Temp (97.6°F)",
      shift: "Stable Plasma Volume",
      description: "Estrogen supports sodium and water retention inside blood vessels. Standard baseline hydration maintains stamina.",
    },
    luteal: {
      goal: 10,
      ozGoal: 80,
      name: "Luteal Phase (Days 15–28)",
      temp: "Elevated Core Temp (+0.5°C)",
      shift: "Fluid Shifts to Soft Tissues (Bloating)",
      description: "Progesterone causes water to leak out of blood vessels into surrounding tissues. You feel bloated, yet your circulating blood plasma is actually lower! Adding electrolytes and +16 oz water is essential to maintain blood pressure and endurance.",
    },
    game_day: {
      goal: 12,
      ozGoal: 96,
      name: "Game / Heavy Exertion Day",
      temp: "High Heat & Sweat Rate",
      shift: "Rapid Fluid & Sodium Loss",
      description: "Intense exertion drains 16–32 oz of sweat per hour. Pre-loading with sodium and steady sipping sustains heart stroke volume.",
    },
  };

  const currentTarget = targets[phase];
  const currentOz = glasses * 8;
  const currentMl = glasses * 240;
  const fillPercentage = Math.min(100, Math.round((glasses / 12) * 100));
  const goalPercentage = Math.min(100, Math.round((currentOz / currentTarget.ozGoal) * 100));

  const getHydrationStatus = () => {
    if (glasses < 4) {
      return {
        status: "Severe Dehydration Risk",
        color: "text-rose-600",
        bg: "bg-rose-50 border-rose-200",
        advice: "Blood plasma is thick; heart rate increases significantly during light jogging. Drink 16 oz with electrolytes immediately.",
      };
    }
    if (glasses < currentTarget.goal) {
      return {
        status: "Under-Hydrated for Phase",
        color: "text-amber-600",
        bg: "bg-amber-50 border-amber-200",
        advice: `You need ${currentTarget.ozGoal - currentOz} oz more to reach your ${currentTarget.name} target and prevent muscle cramping.`,
      };
    }
    if (glasses === currentTarget.goal) {
      return {
        status: "Optimal Athletic Hydration",
        color: "text-emerald-700",
        bg: "bg-emerald-50 border-emerald-300",
        advice: "Target reached! Blood plasma volume is preserved, core cooling is active, and uterine prostaglandins are diluted.",
      };
    }
    return {
      status: "High-Volume Athletic Hydration",
      color: "text-blue-700",
      bg: "bg-blue-50 border-blue-200",
      advice: "Excellent fluid reserve for long practices or hot weather. Remember to pair with sodium electrolytes to maintain electrolyte balance.",
    };
  };

  const status = getHydrationStatus();

  return (
    <div className="rounded-2xl border border-deep-teal/20 bg-white p-4 md:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-deep-teal/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deep-teal">
            <Droplets className="w-3.5 h-3.5 text-blue-500" />
            Interactive Fluid & Glass Simulator
          </div>
          <h4 className="text-base md:text-lg font-serif font-bold text-deep-teal mt-0.5">
            {diagram.title}
          </h4>
        </div>
        <span className="text-[11px] font-semibold bg-blue-50 px-2.5 py-1 rounded-full text-blue-700 border border-blue-200">
          Click + / - to fill glass
        </span>
      </div>

      {/* Cycle Phase Buttons */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-charcoal/80">Select Your Cycle or Training Window:</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setPhase("follicular")}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              phase === "follicular"
                ? "bg-light-teal border-deep-teal text-deep-teal font-bold shadow-xs scale-[1.01]"
                : "bg-gray-50 border-gray-200 text-charcoal/70 hover:bg-white"
            }`}
          >
            <div className="text-[10.5px] uppercase tracking-wider opacity-75">Days 1–14</div>
            <div className="text-xs font-bold mt-0.5">Follicular (Baseline)</div>
            <div className="text-[11px] text-deep-teal/80 mt-1">Target: 64 oz (8 glasses)</div>
          </button>

          <button
            type="button"
            onClick={() => setPhase("luteal")}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              phase === "luteal"
                ? "bg-soft-pink border-raspberry text-raspberry font-bold shadow-xs scale-[1.01]"
                : "bg-gray-50 border-gray-200 text-charcoal/70 hover:bg-white"
            }`}
          >
            <div className="text-[10.5px] uppercase tracking-wider opacity-75">Days 15–28</div>
            <div className="text-xs font-bold mt-0.5">Luteal (Fluid Shift)</div>
            <div className="text-[11px] text-raspberry/90 mt-1">Target: 80 oz (10 glasses)</div>
          </button>

          <button
            type="button"
            onClick={() => setPhase("game_day")}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              phase === "game_day"
                ? "bg-amber-50 border-amber-400 text-amber-900 font-bold shadow-xs scale-[1.01]"
                : "bg-gray-50 border-gray-200 text-charcoal/70 hover:bg-white"
            }`}
          >
            <div className="text-[10.5px] uppercase tracking-wider opacity-75">Heavy Exertion</div>
            <div className="text-xs font-bold mt-0.5">Game / Match Day</div>
            <div className="text-[11px] text-amber-800 mt-1">Target: 96 oz (12 glasses)</div>
          </button>
        </div>
      </div>

      {/* Main Glass Visual & Tracker Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gradient-to-b from-blue-50/50 to-teal-50/30 p-4 rounded-2xl border border-blue-100">
        {/* The Animated SVG Water Glass */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-44 h-64 flex items-center justify-center">
            {/* SVG Glass Illustration */}
            <svg viewBox="0 0 160 220" className="w-full h-full drop-shadow-sm">
              <defs>
                <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                </linearGradient>
                <clipPath id="glassClip">
                  <path d="M 28 20 L 40 190 Q 42 205 60 205 L 100 205 Q 118 205 120 190 L 132 20 Z" />
                </clipPath>
              </defs>

              {/* Back Glass Wall */}
              <path d="M 28 20 L 40 190 Q 42 205 60 205 L 100 205 Q 118 205 120 190 L 132 20 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />

              {/* Water Content (Clipped inside glass) */}
              <g clipPath="url(#glassClip)">
                {/* Water Body */}
                <rect
                  x="0"
                  y={205 - (fillPercentage * 1.85)}
                  width="160"
                  height={fillPercentage * 1.85 + 20}
                  fill="url(#waterGrad)"
                  className="transition-all duration-500 ease-out"
                />

                {/* Animated Liquid Waves Surface */}
                {glasses > 0 && (
                  <ellipse
                    cx="80"
                    cy={205 - (fillPercentage * 1.85)}
                    rx="48"
                    ry="6"
                    fill="#7dd3fc"
                    opacity="0.9"
                    className="transition-all duration-500 ease-out"
                  />
                )}

                {/* Bubble Particles */}
                {glasses > 2 && (
                  <>
                    <circle cx="65" cy={180 - (fillPercentage * 0.8)} r="3" fill="#ffffff" opacity="0.6" className="animate-pulse" />
                    <circle cx="95" cy={195 - (fillPercentage * 1.1)} r="2" fill="#ffffff" opacity="0.7" className="animate-bounce" />
                    <circle cx="75" cy={160 - (fillPercentage * 0.5)} r="2.5" fill="#ffffff" opacity="0.5" />
                  </>
                )}
              </g>

              {/* Glass Measurement Tick Marks */}
              <line x1="32" y1="50" x2="44" y2="50" stroke="#64748b" strokeWidth="1.5" />
              <text x="48" y="53" fill="#64748b" fontSize="8" fontWeight="bold">96 oz (12 gl)</text>

              <line x1="34" y1="85" x2="44" y2="85" stroke="#64748b" strokeWidth="1.5" />
              <text x="48" y="88" fill="#64748b" fontSize="8" fontWeight="bold">80 oz (10 gl)</text>

              <line x1="36" y1="120" x2="44" y2="120" stroke="#64748b" strokeWidth="1.5" />
              <text x="48" y="123" fill="#64748b" fontSize="8" fontWeight="bold">64 oz (8 gl)</text>

              <line x1="38" y1="155" x2="44" y2="155" stroke="#64748b" strokeWidth="1.5" />
              <text x="48" y="158" fill="#64748b" fontSize="8" fontWeight="bold">32 oz (4 gl)</text>

              {/* Front Glass Outline & Highlights */}
              <path d="M 28 20 L 40 190 Q 42 205 60 205 L 100 205 Q 118 205 120 190 L 132 20 Z" fill="none" stroke="#64748b" strokeWidth="3" />
              <ellipse cx="80" cy="20" rx="52" ry="5" fill="none" stroke="#64748b" strokeWidth="2.5" />
              <ellipse cx="80" cy="202" rx="20" ry="3" fill="#cbd5e1" opacity="0.5" />
              <path d="M 34 30 L 44 185" stroke="url(#glassReflection)" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
            </svg>

            {/* Float Label in Center of Glass */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-6">
              <span className="text-2xl md:text-3xl font-serif font-bold text-slate-900 drop-shadow-xs bg-white/80 px-3 py-1 rounded-full border border-white/60 backdrop-blur-xs">
                {currentOz} <span className="text-xs font-sans font-semibold text-slate-600">oz</span>
              </span>
              <span className="text-[11px] font-bold text-slate-700 mt-1 bg-white/85 px-2 py-0.5 rounded-full">
                {glasses} {glasses === 1 ? "Glass" : "Glasses"} · {currentMl} ml
              </span>
            </div>
          </div>

          {/* Interactive Stepper Controls */}
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => setGlasses(Math.max(0, glasses - 1))}
              disabled={glasses === 0}
              className="p-2 rounded-xl border border-gray-300 bg-white text-charcoal hover:bg-gray-100 disabled:opacity-40 transition-all shadow-xs"
              title="Remove 1 glass"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-charcoal px-2">
              Adjust Intake
            </span>
            <button
              type="button"
              onClick={() => setGlasses(Math.min(12, glasses + 1))}
              disabled={glasses === 12}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
              title="Add 1 glass (8 oz)"
            >
              <Plus className="w-4 h-4" />
              + 1 Glass (8 oz)
            </button>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <button type="button" onClick={() => setGlasses(4)} className="text-[10px] font-semibold px-2 py-1 rounded-md bg-white border border-gray-200 text-charcoal hover:bg-gray-50">32 oz</button>
            <button type="button" onClick={() => setGlasses(8)} className="text-[10px] font-semibold px-2 py-1 rounded-md bg-white border border-gray-200 text-charcoal hover:bg-gray-50">64 oz</button>
            <button type="button" onClick={() => setGlasses(10)} className="text-[10px] font-semibold px-2 py-1 rounded-md bg-white border border-gray-200 text-charcoal hover:bg-gray-50">80 oz</button>
            <button type="button" onClick={() => setGlasses(12)} className="text-[10px] font-semibold px-2 py-1 rounded-md bg-white border border-gray-200 text-charcoal hover:bg-gray-50">96 oz</button>
          </div>
        </div>

        {/* Phase Hydration Details & Clinical Insights */}
        <div className="md:col-span-7 space-y-3">
          {/* Progress to Target */}
          <div className="bg-white p-3.5 rounded-xl border border-blue-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-deep-teal">Progress to {currentTarget.name}:</span>
              <span className="font-bold text-blue-700">{goalPercentage}% of Target</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  goalPercentage >= 100 ? "bg-emerald-500" : goalPercentage >= 75 ? "bg-blue-500" : "bg-amber-400"
                }`}
                style={{ width: `${Math.min(100, goalPercentage)}%` }}
              />
            </div>
            <div className="text-[11.5px] text-charcoal/80 flex items-center justify-between">
              <span>Consumed: <strong>{currentOz} oz</strong> ({glasses} glasses)</span>
              <span>Target: <strong>{currentTarget.ozGoal} oz</strong> ({currentTarget.goal} glasses)</span>
            </div>
          </div>

          {/* Current Status Box */}
          <div className={`p-3 rounded-xl border ${status.bg} space-y-1`}>
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className={status.color}>{status.status}</span>
            </div>
            <p className="text-[11.5px] text-charcoal/85 leading-relaxed m-0">{status.advice}</p>
          </div>

          {/* Physiological Facts for this phase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white border border-gray-200">
              <div className="font-bold text-deep-teal flex items-center gap-1 text-[11px] mb-1">
                <Activity className="w-3.5 h-3.5 text-deep-teal" />
                Hormonal Fluid Shift
              </div>
              <p className="text-[11px] text-charcoal/80 m-0 leading-tight">
                {currentTarget.shift}. Progesterone causes fluid to pool in tissues; electrolytes pull water back into the bloodstream.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-gray-200">
              <div className="font-bold text-deep-teal flex items-center gap-1 text-[11px] mb-1">
                <Heart className="w-3.5 h-3.5 text-coral" />
                Period Cramp Defense
              </div>
              <p className="text-[11px] text-charcoal/80 m-0 leading-tight">
                Dehydration concentrates local uterine prostaglandins. Proper fluid intake dilutes these inflammatory signals and reduces muscle spasms.
              </p>
            </div>
          </div>

          {/* Urine Hydration Spectrum Guide */}
          <div className="bg-white p-2.5 rounded-xl border border-gray-200 text-[11px]">
            <span className="font-bold text-charcoal/90 block mb-1">Urine Color Hydration Guide:</span>
            <div className="grid grid-cols-5 gap-1 text-center font-bold text-[9.5px]">
              <div className="p-1 rounded bg-[#F7FBE7] text-stone-700 border border-stone-200">1. Optimal</div>
              <div className="p-1 rounded bg-[#EBF5B5] text-stone-800 border border-stone-200">2. Great</div>
              <div className="p-1 rounded bg-[#DFEA85] text-stone-800 border border-stone-200">3. Baseline</div>
              <div className="p-1 rounded bg-[#D4BF43] text-stone-900 border border-stone-200">4. Drink +16 oz</div>
              <div className="p-1 rounded bg-[#A68618] text-white border border-stone-300">5. Dehydrated</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 11. Interactive Sleep Cycle & Athletic Recovery Architecture
// --------------------------------------------------------------------------
function SleepRecoveryDiagram({ diagram }: { diagram: LessonDiagram; themeColor: string }) {
  const [activeStage, setActiveStage] = useState<"light" | "spindles" | "slow_wave" | "rem">("slow_wave");
  const [sleepHours, setSleepHours] = useState<number>(8);
  const [isLuteal, setIsLuteal] = useState<boolean>(false);

  const stages = {
    light: {
      name: "Stage 1 NREM (Light Sleep)",
      duration: "5% of Night (1–7 mins)",
      badge: "Transition Window",
      color: "border-slate-300 bg-slate-50 text-slate-800",
      description: "Heart rate slows, muscle tone softens, and breathing stabilizes. Easily disrupted by noise or light.",
      athleticRole: "Prepares central nervous system to enter restorative deeper stages.",
    },
    spindles: {
      name: "Stage 2 NREM (Sleep Spindles)",
      duration: "45–55% of Night",
      badge: "Metabolic Reset",
      color: "border-teal-300 bg-teal-50 text-teal-900",
      description: "Brain generates rapid rhythmic neural bursts called 'sleep spindles.' Core body temperature cools by 1–2°F.",
      athleticRole: "Motor skill transfer: newly learned athletic drills are moved into short-term neural storage.",
    },
    slow_wave: {
      name: "Stage 3 NREM (Slow-Wave / Deep Sleep)",
      duration: "20–25% of Night",
      badge: "✦ 95% HGH REPAIR CENTER",
      color: "border-indigo-400 bg-indigo-50 text-indigo-950",
      description: "High-voltage delta brain waves dominate. Your pituitary gland releases up to 95% of your daily Human Growth Hormone (HGH).",
      athleticRole: "The ultimate recovery factory: repairs muscle micro-tears, synthesizes glycogen, rebuilds bone density, and clears systemic metabolic waste.",
    },
    rem: {
      name: "REM Sleep (Dream / Rapid Eye Movement)",
      duration: "20–25% of Night",
      badge: "Neuromuscular Memory",
      color: "border-purple-300 bg-purple-50 text-purple-900",
      description: "Brain activity resembles waking states while muscles are temporarily paralyzed. Heart rate and breathing become variable.",
      athleticRole: "Permanently encodes complex motor memory (footwork, tactical plays, hand-eye coordination) and balances emotional cortisol.",
    },
  };

  const currentStage = stages[activeStage];

  // Calculations for athletic metrics based on hours
  const injuryMultiplier = sleepHours >= 8 ? "1.0x (Baseline Baseline)" : sleepHours === 7 ? "1.3x Higher Risk" : sleepHours === 6 ? "1.5x Higher Risk" : "1.7x HIGHER INJURY RISK (AAP Data)";
  const glycogenRecovery = sleepHours >= 8 ? "100% Fully Restored" : sleepHours === 7 ? "85% Restored" : sleepHours === 6 ? "70% (Residual Fatigue)" : "55% (Severe Glycogen Debt)";
  const reactionTimePenalty = sleepHours >= 8 ? "Optimal Sharp Reflexes" : sleepHours === 7 ? "+8% Slower" : sleepHours === 6 ? "+18% Slower Reaction" : "+28% Slower (Sluggish Agility)";

  return (
    <div className="rounded-2xl border border-deep-teal/20 bg-white p-4 md:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-deep-teal/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deep-teal">
            <Moon className="w-3.5 h-3.5 text-indigo-600" />
            Interactive Sleep Cycle & Neuroendocrine Lab
          </div>
          <h4 className="text-base md:text-lg font-serif font-bold text-deep-teal mt-0.5">
            {diagram.title}
          </h4>
        </div>
        <span className="text-[11px] font-semibold bg-indigo-50 px-2.5 py-1 rounded-full text-indigo-700 border border-indigo-200">
          Click sleep stages & slider
        </span>
      </div>

      {/* Stage Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(["light", "spindles", "slow_wave", "rem"] as const).map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setActiveStage(st)}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              activeStage === st
                ? "bg-indigo-900 text-white border-indigo-950 font-bold shadow-xs scale-[1.01]"
                : "bg-gray-50 border-gray-200 text-charcoal/70 hover:bg-white"
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider opacity-75">{stages[st].badge}</div>
            <div className="text-xs font-bold mt-0.5 leading-tight">{stages[st].name.split("(")[0]}</div>
          </button>
        ))}
      </div>

      {/* Visual Sleep Cycle Architecture Graph */}
      <div className="rounded-xl bg-slate-950 text-white p-4 space-y-2 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>90-Minute Sleep Architecture Wave (Repeats 4–5x per Night)</span>
          <span className="text-indigo-300 font-bold text-[11px]">Slow-Wave = Muscle Repair</span>
        </div>

        <svg viewBox="0 0 600 130" className="w-full h-28 overflow-visible">
          {/* Shading for Slow-Wave N3 */}
          <rect x="180" y="20" width="160" height="90" fill="#4f46e5" opacity={activeStage === "slow_wave" ? "0.35" : "0.12"} rx="6" />
          {/* Shading for REM */}
          <rect x="420" y="20" width="140" height="90" fill="#9333ea" opacity={activeStage === "rem" ? "0.35" : "0.12"} rx="6" />

          {/* Depth Axis Lines */}
          <line x1="40" y1="30" x2="580" y2="30" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
          <text x="5" y="33" fill="#64748b" fontSize="9">Awake</text>

          <line x1="40" y1="60" x2="580" y2="60" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
          <text x="5" y="63" fill="#64748b" fontSize="9">Stage 2</text>

          <line x1="40" y1="100" x2="580" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="2,2" />
          <text x="5" y="103" fill="#818cf8" fontSize="9" fontWeight="bold">Slow-Wave</text>

          {/* 90-min Cycle Curve */}
          <path
            d="M 40 30 C 70 30, 90 55, 120 60 C 150 65, 180 100, 260 100 C 330 100, 360 40, 420 40 C 470 40, 500 45, 560 30"
            fill="none"
            stroke="#818cf8"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* HGH Hormone Pulse Icon in Deep Sleep */}
          <g transform="translate(250, 75)">
            <circle cx="10" cy="10" r="14" fill="#4f46e5" className="animate-ping" opacity="0.3" />
            <circle cx="10" cy="10" r="10" fill="#6366f1" />
            <text x="10" y="13" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">HGH</text>
          </g>

          <text x="260" y="120" fill="#a5b4fc" fontSize="9" textAnchor="middle" fontWeight="bold">Stage 3 Deep Sleep (95% Growth Hormone Pulse)</text>
          <text x="490" y="25" fill="#d8b4fe" fontSize="9" textAnchor="middle" fontWeight="bold">REM (Motor Memory)</text>
        </svg>

        {/* Selected Stage Detail Banner */}
        <div className="pt-2 border-t border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <strong className="text-indigo-300 font-bold">{currentStage.name}: </strong>
            <span className="text-slate-300">{currentStage.description}</span>
          </div>
          <span className="text-emerald-400 font-bold shrink-0">{currentStage.athleticRole}</span>
        </div>
      </div>

      {/* Cycle Phase Body Temperature Impact Toggle */}
      <div className="p-3.5 rounded-xl border border-raspberry/20 bg-soft-pink/30 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-xs text-raspberry">
            <Flame className="w-3.5 h-3.5 text-raspberry" />
            Progesterone & Body Temperature Shift
          </div>
          <button
            type="button"
            onClick={() => setIsLuteal(!isLuteal)}
            className={`text-xs px-3 py-1 rounded-full font-bold transition-all ${
              isLuteal ? "bg-raspberry text-white" : "bg-white border border-raspberry/30 text-raspberry"
            }`}
          >
            {isLuteal ? "Luteal Phase Active (+0.5°C Core Temp)" : "Toggle Luteal Temperature Shift"}
          </button>
        </div>

        <p className="text-xs text-charcoal/85 m-0 leading-relaxed">
          {isLuteal
            ? "⚠️ Luteal Alert: Progesterone elevates resting core body temperature by ~0.5°C (1°F). Because your brain MUST cool down by 1–2°F to trigger deep Slow-Wave sleep, athletes often experience lighter, fragmented sleep and night sweats during this phase. Remedy: Keep your bedroom at 65–68°F, use breathable bedding, and consider 200–300mg magnesium glycinate."
            : "Follicular Baseline: Estrogen keeps core body temperature lower, allowing your body to cool quickly at night and easily reach restorative Stage 3 Slow-Wave Sleep."}
        </p>
      </div>

      {/* Interactive Sleep Hours Simulator & Injury Risk */}
      <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-deep-teal">Test Nightly Sleep Duration:</span>
          <div className="flex items-center gap-1.5">
            {[5, 6, 7, 8, 9].map((hrs) => (
              <button
                key={hrs}
                type="button"
                onClick={() => setSleepHours(hrs)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  sleepHours === hrs
                    ? "bg-deep-teal text-white shadow-xs"
                    : "bg-white border border-gray-200 text-charcoal hover:bg-gray-100"
                }`}
              >
                {hrs}h
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className={`p-2.5 rounded-xl border ${sleepHours < 8 ? "bg-rose-50 border-rose-200 text-rose-900" : "bg-emerald-50 border-emerald-200 text-emerald-900"}`}>
            <span className="text-[10.5px] uppercase tracking-wider block font-bold">Injury Risk (AAP Data)</span>
            <strong className="text-sm font-bold block mt-0.5">{injuryMultiplier}</strong>
            <span className="text-[10px] opacity-80 leading-tight block mt-0.5">Sleeping &lt;8h spikes musculoskeletal tears</span>
          </div>

          <div className="p-2.5 rounded-xl border border-gray-200 bg-white text-charcoal">
            <span className="text-[10.5px] uppercase tracking-wider block font-bold text-deep-teal">Glycogen Resynthesis</span>
            <strong className="text-sm font-bold block mt-0.5 text-deep-teal">{glycogenRecovery}</strong>
            <span className="text-[10px] text-charcoal/70 leading-tight block mt-0.5">Muscles refill fuel tanks during deep sleep</span>
          </div>

          <div className="p-2.5 rounded-xl border border-gray-200 bg-white text-charcoal">
            <span className="text-[10.5px] uppercase tracking-wider block font-bold text-deep-teal">Reaction Agility</span>
            <strong className="text-sm font-bold block mt-0.5 text-deep-teal">{reactionTimePenalty}</strong>
            <span className="text-[10px] text-charcoal/70 leading-tight block mt-0.5">REM sleep locks in neuromuscular reflexes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 12. Interactive Iron & Ferritin Cascade Diagram
// --------------------------------------------------------------------------
function IronFerritinDiagram({ diagram }: { diagram: LessonDiagram; themeColor: string }) {
  const [flowRate, setFlowRate] = useState<"light" | "moderate" | "heavy">("heavy");
  const [activeTab, setActiveTab] = useState<"vault" | "blood_loss" | "absorption">("vault");

  const flowData = {
    light: {
      volume: "20–30 mL blood per cycle",
      ironLost: "~10–15 mg iron",
      ferritinDrop: "Mild depletion",
      riskLevel: "Low risk with balanced diet",
    },
    moderate: {
      volume: "35–50 mL blood per cycle",
      ironLost: "~20–25 mg iron",
      ferritinDrop: "Moderate ongoing drain",
      riskLevel: "Moderate risk for endurance athletes",
    },
    heavy: {
      volume: "80+ mL blood per cycle (Menorrhagia)",
      ironLost: "40–60+ mg iron EVERY cycle!",
      ferritinDrop: "Severe bone marrow depletion",
      riskLevel: "CRITICAL: High risk of IDNA ('cement legs')",
    },
  };

  const currentFlow = flowData[flowRate];

  return (
    <div className="rounded-2xl border border-deep-teal/20 bg-white p-4 md:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-deep-teal/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deep-teal">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            Interactive Iron & Ferritin Energy Lab
          </div>
          <h4 className="text-base md:text-lg font-serif font-bold text-deep-teal mt-0.5">
            {diagram.title}
          </h4>
        </div>
        <span className="text-[11px] font-semibold bg-amber-50 px-2.5 py-1 rounded-full text-amber-800 border border-amber-200">
          Compare Ferritin vs Hemoglobin
        </span>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-gray-200 pb-2 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("vault")}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeTab === "vault" ? "bg-deep-teal text-white shadow-xs" : "text-charcoal/70 hover:bg-gray-100"
          }`}
        >
          1. The Storage Vault vs Blood
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("blood_loss")}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeTab === "blood_loss" ? "bg-deep-teal text-white shadow-xs" : "text-charcoal/70 hover:bg-gray-100"
          }`}
        >
          2. Menstrual & Athletic Losses
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("absorption")}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
            activeTab === "absorption" ? "bg-deep-teal text-white shadow-xs" : "text-charcoal/70 hover:bg-gray-100"
          }`}
        >
          3. Vitamin C Synergy & Blockers
        </button>
      </div>

      {/* TAB 1: The Two-Level Iron Vault */}
      {activeTab === "vault" && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Level 1: Hemoglobin */}
            <div className="p-3.5 rounded-xl border-2 border-red-200 bg-red-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2 py-0.5 rounded-full">Level 1: Circulation</span>
                <span className="text-xs font-bold text-slate-700">Checked by standard CBC</span>
              </div>
              <h5 className="font-serif font-bold text-base text-red-950 m-0">Hemoglobin (The Delivery Trucks)</h5>
              <p className="text-xs text-charcoal/85 m-0 leading-relaxed">
                Carries oxygen inside red blood cells to muscles and brain. Reference range is ~12.0–15.5 g/dL.
              </p>
              <div className="p-2 rounded-lg bg-white border border-red-200 text-[11px] text-charcoal/90">
                <strong>The Blindspot:</strong> Hemoglobin only drops in <em>end-stage</em> severe anemia. You can have empty iron stores for months while hemoglobin appears normal!
              </div>
            </div>

            {/* Level 2: Serum Ferritin */}
            <div className="p-3.5 rounded-xl border-2 border-amber-300 bg-amber-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">Level 2: Deep Storage Vault</span>
                <span className="text-xs font-bold text-amber-900 font-sans">Must request separately</span>
              </div>
              <h5 className="font-serif font-bold text-base text-amber-950 m-0">Serum Ferritin (The Storage Bank)</h5>
              <p className="text-xs text-charcoal/85 m-0 leading-relaxed">
                Iron reserves stored in your liver and bone marrow. Powers mitochondrial ATP energy in muscle cells.
              </p>
              <div className="p-2 rounded-lg bg-white border border-amber-300 text-[11px] text-amber-950">
                <strong>Athletic Target:</strong> Athletes need ferritin <strong>&gt;30–50 ng/mL</strong>. Under 30 ng/mL causes "cement legs," shortness of breath, and brain fog (IDNA).
              </div>
            </div>
          </div>

          {/* IDNA Danger Warning Card */}
          <div className="p-3.5 rounded-xl border border-red-300 bg-red-50 text-xs text-red-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-red-900">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>The Hidden Trap: Iron Deficiency Without Anemia (IDNA)</span>
            </div>
            <p className="leading-relaxed m-0">
              When doctors run only a standard CBC test, an athlete with hemoglobin of 12.2 is told "your bloodwork is perfect." Yet their ferritin vault might be nearly empty at 12 ng/mL! Without enough ferritin, muscle mitochondria cannot produce ATP energy, making standard practices feel exhausting.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: Menstrual & Athletic Blood Loss */}
      {activeTab === "blood_loss" && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-charcoal/80">Select Your Monthly Menstrual Flow Level:</label>
            <div className="grid grid-cols-3 gap-2">
              {(["light", "moderate", "heavy"] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setFlowRate(lvl)}
                  className={`p-2.5 rounded-xl text-center border font-bold capitalize text-xs transition-all ${
                    flowRate === lvl
                      ? "bg-red-700 text-white border-red-800 shadow-xs"
                      : "bg-gray-50 border-gray-200 text-charcoal hover:bg-white"
                  }`}
                >
                  {lvl} Flow
                </button>
              ))}
            </div>
          </div>

          {/* Loss Calculation Result */}
          <div className="p-4 rounded-xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-orange-50 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-red-900 text-sm capitalize">{flowRate} Flow Impact:</span>
              <span className="font-bold text-red-700 bg-white px-2.5 py-1 rounded-full border border-red-200">{currentFlow.ironLost}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11.5px]">
              <div><strong>Estimated Blood Loss:</strong> {currentFlow.volume}</div>
              <div><strong>Ferritin Impact:</strong> {currentFlow.ferritinDrop}</div>
            </div>
            <div className="pt-2 border-t border-red-200 font-bold text-red-900">
              {currentFlow.riskLevel}
            </div>
          </div>

          {/* Athletic Compounding Factors */}
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1.5">
            <div className="font-bold text-deep-teal flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-deep-teal" />
              Athletic Iron Loss Accelerators
            </div>
            <ul className="list-disc pl-4 space-y-1 text-charcoal/80 text-[11px] m-0">
              <li><strong>Foot-Strike Hemolysis:</strong> Running on hard tracks crushes red blood cells inside capillaries of the feet.</li>
              <li><strong>Sweat Loss:</strong> Hard summer practices expel 0.3–0.5 mg of iron per liter of sweat.</li>
              <li><strong>Post-Workout Hepcidin Hormone Spike:</strong> For 3 to 6 hours after intense workouts, inflammatory hepcidin shuts down gut iron absorption channels! <em>Rule: Never take iron supplements immediately post-workout.</em></li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 3: Absorption Synergy & Blockers */}
      {activeTab === "absorption" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Boosters */}
          <div className="p-3.5 rounded-xl border-2 border-emerald-300 bg-emerald-50/50 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Absorption Synergists (+300%)</span>
            </div>
            <p className="text-[11.5px] text-charcoal/85 m-0">
              Plant-based (non-heme) iron is tightly bound. <strong>Vitamin C</strong> converts ferric iron into highly absorbable ferrous iron.
            </p>
            <div className="space-y-1 text-[11px] bg-white p-2.5 rounded-lg border border-emerald-200">
              <strong className="text-emerald-900 block">Winning Combinations:</strong>
              <div>• Lentils or black beans + Squeezed lime / salsa</div>
              <div>• Spinach salad + Sliced strawberries or bell peppers</div>
              <div>• Oatmeal or fortified cereal + Orange juice / berries</div>
            </div>
          </div>

          {/* Blockers */}
          <div className="p-3.5 rounded-xl border-2 border-rose-300 bg-rose-50/50 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-rose-900">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Absorption Blockers (-50% to -80%)</span>
            </div>
            <p className="text-[11.5px] text-charcoal/85 m-0">
              Certain compounds bind directly to iron in the digestive tract, preventing absorption.
            </p>
            <div className="space-y-1 text-[11px] bg-white p-2.5 rounded-lg border border-rose-200">
              <strong className="text-rose-900 block">Space 2 Hours Away from Iron:</strong>
              <div>• <strong>Calcium:</strong> Milk, cheese, yogurt, calcium supplements</div>
              <div>• <strong>Tannins / Polyphenols:</strong> Coffee, black tea, green tea</div>
              <div>• <em>Golden Rule:</em> Don't wash down iron-rich meals with milk or latte!</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------------------------------
// 13. Interactive Menstrual Cycle Training Periodization Matrix
// --------------------------------------------------------------------------
function CycleTrainingMatrixDiagram({ diagram }: { diagram: LessonDiagram; themeColor: string }) {
  const [activePhase, setActivePhase] = useState<number>(1); // 0: Menstruation, 1: Follicular, 2: Ovulation, 3: Luteal

  const phases = [
    {
      id: 0,
      name: "1. Menstrual / Early Follicular",
      days: "Days 1–5",
      color: "#F47A6A",
      tag: "Lowest Hormones",
      stimulus: "Strength PRs or Restorative Mobility",
      energy: "High insulin sensitivity & carb burning; high pain tolerance",
      aclAlert: "Lowest ligament laxity — joints are mechanically stable",
      fueling: "Focus on iron replenishment, warm anti-inflammatory foods, and hydration",
      recommendedWorkouts: "Heavy progressive overload lifting, low-volume strength sets, or easy recovery yoga on heavy cramp days",
    },
    {
      id: 1,
      name: "2. Mid-to-Late Follicular",
      days: "Days 6–13",
      color: "#175B5C",
      tag: "Estrogen Surge",
      stimulus: "HIIT, Sprints & Max Power",
      energy: "Rapid muscle recovery, high mental drive, peak carbohydrate utilization",
      aclAlert: "Joints stable; tendon stiffness supports explosive velocity",
      fueling: "Complex carbohydrates before workouts to top off glycogen tanks",
      recommendedWorkouts: "High-Intensity Interval Training (HIIT), speed intervals, plyometrics, and challenging personal record lifts",
    },
    {
      id: 2,
      name: "3. Ovulatory Phase",
      days: "Days 14–16",
      color: "#991B4B",
      tag: "Peak Power + ACL Caution",
      stimulus: "Peak Strength with Mandatory Neuromuscular Warmup",
      energy: "Absolute highest neuromuscular recruitment and explosive force",
      aclAlert: "⚠️ CRITICAL ACL RISK: Estrogen peak softens collagen in ligaments! ACL tear rates are 2–3x higher during this window.",
      fueling: "Carbohydrates + 25g protein recovery window; pre-workout warmup drills",
      recommendedWorkouts: "Max power output, but MUST include 15-minute FIFA 11+ landing mechanics warmup before jumping or cutting",
    },
    {
      id: 3,
      name: "4. Luteal Phase",
      days: "Days 17–28",
      color: "#D97706",
      tag: "Progesterone Dominance",
      stimulus: "Aerobic Base, Skills & Recovery Deload",
      energy: "Resting metabolic rate rises (+100–300 kcal); core temp rises +0.5°C; sweat starts later",
      aclAlert: "Joints restabilize, but higher core temperature causes earlier fatigue",
      fueling: "Extra protein (prevents muscle breakdown) + 80–96 oz water with sodium electrolytes",
      recommendedWorkouts: "Zone 2 steady-state aerobic endurance, tactical skills, technical sport drills, and deload stretching in late luteal",
    },
  ];

  const current = phases[activePhase];

  return (
    <div className="rounded-2xl border border-deep-teal/20 bg-white p-4 md:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-deep-teal/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deep-teal">
            <Activity className="w-3.5 h-3.5 text-deep-teal" />
            Hormonal Periodization & Training Matrix
          </div>
          <h4 className="text-base md:text-lg font-serif font-bold text-deep-teal mt-0.5">
            {diagram.title}
          </h4>
        </div>
        <span className="text-[11px] font-semibold bg-light-teal px-2.5 py-1 rounded-full text-deep-teal border border-deep-teal/20">
          Click phases to adapt training
        </span>
      </div>

      {/* 4 Phase Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {phases.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActivePhase(p.id)}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              activePhase === p.id
                ? "bg-deep-teal text-white border-deep-teal shadow-xs font-bold scale-[1.01]"
                : "bg-gray-50 border-gray-200 text-charcoal/70 hover:bg-white"
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider opacity-75">{p.days}</div>
            <div className="text-xs font-bold mt-0.5 leading-tight">{p.name.split(". ")[1]}</div>
            <div className={`text-[9.5px] mt-1 font-semibold ${activePhase === p.id ? "text-teal-200" : "text-deep-teal"}`}>{p.tag}</div>
          </button>
        ))}
      </div>

      {/* Phase Details Matrix */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 space-y-3">
        <div className="flex items-center justify-between border-b border-gray-200/80 pb-2">
          <h5 className="font-serif font-bold text-base text-deep-teal m-0">{current.name}</h5>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-light-teal text-deep-teal border border-deep-teal/20">
            {current.stimulus}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Energy & Muscle Physiology */}
          <div className="p-3 rounded-xl bg-white border border-gray-200 space-y-1">
            <div className="font-bold text-deep-teal flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-deep-teal" />
              Physiology & Energy Availability
            </div>
            <p className="text-charcoal/85 leading-relaxed m-0 text-[11.5px]">{current.energy}</p>
          </div>

          {/* Recommended Workouts */}
          <div className="p-3 rounded-xl bg-white border border-gray-200 space-y-1">
            <div className="font-bold text-deep-teal flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-deep-teal" />
              Optimal Training Focus
            </div>
            <p className="text-charcoal/85 leading-relaxed m-0 text-[11.5px]">{current.recommendedWorkouts}</p>
          </div>
        </div>

        {/* Injury & Ligament Alert Box */}
        <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
          activePhase === 2 ? "bg-rose-50 border-rose-300 text-rose-950 font-medium" : "bg-teal-50 border-teal-200 text-teal-950"
        }`}>
          {activePhase === 2 ? (
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          ) : (
            <Shield className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          )}
          <div>
            <strong>Joint & Ligament Safety: </strong>
            <span>{current.aclAlert}</span>
          </div>
        </div>

        {/* Fueling Strategy for this phase */}
        <div className="p-2.5 rounded-xl bg-white border border-gray-200 text-xs flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
          <div className="text-[11.5px] text-charcoal/85">
            <strong>Nutrition & Hydration Strategy: </strong>
            <span>{current.fueling}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 14. Interactive Cycle-Synced Fueling Plate & Monthly Nutrition Matrix
// --------------------------------------------------------------------------
function CycleFuelingPlateDiagram({ diagram }: { diagram: LessonDiagram; themeColor: string }) {
  const [activePhase, setActivePhase] = useState<number>(3); // Default to Luteal to highlight metabolic burn
  const [selectedFoodType, setSelectedFoodType] = useState<"all" | "carbs" | "proteins" | "micronutrients">("all");

  const phases = [
    {
      id: 0,
      name: "1. Menstrual Phase",
      days: "Days 1–5",
      badge: "🩸 Replenish & Ease Cramps",
      color: "#F47A6A",
      tagline: "Iron Restock & Anti-Inflammatory Comfort",
      metabolism: "Baseline Caloric Burn",
      hungerLevel: "Moderate / Digestive Sensitivity",
      plateRatios: { carbs: 35, protein: 25, veggies: 30, fats: 10 },
      biologicalTruth: "Blood loss depletes iron stores, while uterine prostaglandins cause smooth-muscle cramping and digestive sensitivity. Warm, easily digestible stews and magnesium calm pelvic nerves.",
      superFoods: [
        { name: "Lentils & Black Beans", type: "carbs", benefit: "Rich in plant iron; pair with bell peppers or lime juice for 300% absorption." },
        { name: "Wild Salmon / Chia Seeds", type: "proteins", benefit: "High in Omega-3 EPA/DHA fatty acids that suppress cramp-causing prostaglandins." },
        { name: "Warm Ginger & Peppermint Tea", type: "micronutrients", benefit: "Clinically proven to soothe uterine spasms and nausea as effectively as ibuprofen." },
        { name: "Dark Chocolate (70%+)", type: "micronutrients", benefit: "Loaded with magnesium to relax uterine muscles and curb low-estrogen cravings." },
        { name: "Bone or Veggie Broth", type: "micronutrients", benefit: "Warm, sodium-rich fluid that supports blood pressure during heavy menstrual flow." },
      ],
    },
    {
      id: 1,
      name: "2. Follicular Phase",
      days: "Days 6–13",
      badge: "⚡ High-Octane Glycogen Engine",
      color: "#175B5C",
      tagline: "Peak Insulin Sensitivity & Carbohydrate Burning",
      metabolism: "High Carb Efficiency",
      hungerLevel: "Steady Energy / Low Cravings",
      plateRatios: { carbs: 45, protein: 25, veggies: 20, fats: 10 },
      biologicalTruth: "Rising estrogen peaks your insulin sensitivity! Your muscles easily absorb glucose and convert it into stored muscle glycogen. This is your best window to fuel high-intensity lifting and sprints.",
      superFoods: [
        { name: "Sweet Potatoes & Brown Rice", type: "carbs", benefit: "Provides clean, slow-burning glycogen to fuel high-intensity sprint workouts." },
        { name: "Rolled Oats with Berries", type: "carbs", benefit: "Complex beta-glucan carbs for long-lasting stamina without blood sugar spikes." },
        { name: "Eggs, Tofu, & Chicken", type: "proteins", benefit: "Supplies essential amino acids for rapid muscle protein synthesis post-training." },
        { name: "Broccoli & Brussels Sprouts", type: "micronutrients", benefit: "Contains DIM (diindolylmethane) and fiber to help liver clear estrogen metabolites." },
        { name: "Fermented Foods (Kefir/Kimchi)", type: "micronutrients", benefit: "Supports the estrobolome (gut bacteria that maintain optimal hormone balance)." },
      ],
    },
    {
      id: 2,
      name: "3. Ovulatory Window",
      days: "Days 14–16",
      badge: "🌟 Antioxidant & Energy Peak",
      color: "#991B4B",
      tagline: "Cellular Recovery & Neuromuscular Power",
      metabolism: "Ramping Up",
      hungerLevel: "High Confidence / Normal Appetite",
      plateRatios: { carbs: 40, protein: 30, veggies: 20, fats: 10 },
      biologicalTruth: "Estrogen hits its absolute monthly peak and body temperature begins rising. Because you can generate maximum neuromuscular power, colorful antioxidants protect recovering muscle cells.",
      superFoods: [
        { name: "Dark Blueberries & Strawberries", type: "micronutrients", benefit: "Packed with polyphenols to neutralize cellular oxidative stress from max-effort workouts." },
        { name: "Avocados & Olive Oil", type: "micronutrients", benefit: "Healthy monounsaturated fats supporting steroid hormone balance and cell membranes." },
        { name: "Pumpkin & Sunflower Seeds", type: "micronutrients", benefit: "Rich in zinc to support luteinizing hormone and ovarian follicular release." },
        { name: "Greek Yogurt or Tempeh", type: "proteins", benefit: "Dense source of leucine and calcium to initiate rapid muscle remodeling." },
        { name: "Leafy Spinach & Arugula", type: "micronutrients", benefit: "Natural dietary nitrates that dilate capillaries, boosting oxygen flow to working muscles." },
      ],
    },
    {
      id: 3,
      name: "4. Luteal Phase",
      days: "Days 17–28",
      badge: "🍂 +100 to 300 kcal Burn & Protein Defense",
      color: "#D97706",
      tagline: "Higher Metabolic Rate, Increased Protein Needs & Hydration",
      metabolism: "✦ +100–300 kcal/day Extra Burn!",
      hungerLevel: "Intense Biological Hunger (Normal & Necessary)",
      plateRatios: { carbs: 35, protein: 35, veggies: 20, fats: 10 },
      biologicalTruth: "Progesterone raises your basal body temperature by ~0.5°C, burning an extra 100 to 300 calories every single day! Progesterone also breaks down muscle protein faster. You need more food and extra protein (25–30g/meal) to feel grounded and energized.",
      superFoods: [
        { name: "25–30g Protein per Meal", type: "proteins", benefit: "Crucial to halt progesterone-induced muscle breakdown and preserve lean muscle mass." },
        { name: "Slow-Burning Roasted Squash", type: "carbs", benefit: "Starchy complex carbs stimulate serotonin synthesis, curbing mood swings and fatigue." },
        { name: "Sodium & Electrolyte Water", type: "micronutrients", benefit: "Replaces blood plasma fluid that shifts into tissues; eliminates pre-menstrual headaches." },
        { name: "Bananas & Chickpeas (Vitamin B6)", type: "micronutrients", benefit: "Vitamin B6 assists in dopamine and serotonin production, soothing PMS mood changes." },
        { name: "Dark Chocolate & Almonds (Magnesium)", type: "micronutrients", benefit: "Reduces water retention, calms muscle twitching, and supports deeper nighttime sleep." },
      ],
    },
  ];

  const current = phases[activePhase];

  const filteredFoods = selectedFoodType === "all"
    ? current.superFoods
    : current.superFoods.filter((f) => f.type === selectedFoodType);

  return (
    <div className="rounded-2xl border border-deep-teal/20 bg-white p-4 md:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 border-b border-deep-teal/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-deep-teal">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Interactive Cycle Nutrition & Fueling Plate
          </div>
          <h4 className="text-base md:text-lg font-serif font-bold text-deep-teal mt-0.5">
            {diagram.title}
          </h4>
        </div>
        <span className="text-[11px] font-semibold bg-amber-50 px-2.5 py-1 rounded-full text-amber-800 border border-amber-200">
          Explore changing metabolic needs
        </span>
      </div>

      {/* 4 Phase Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {phases.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActivePhase(p.id)}
            className={`p-2.5 rounded-xl text-left border transition-all ${
              activePhase === p.id
                ? "bg-amber-50 border-amber-400 text-amber-950 font-bold shadow-xs scale-[1.01] ring-2 ring-amber-400/20"
                : "bg-gray-50 border-gray-200 text-charcoal/70 hover:bg-white"
            }`}
          >
            <div className="text-[10px] uppercase tracking-wider opacity-75">{p.days}</div>
            <div className="text-xs font-bold mt-0.5 leading-tight">{p.name.split(". ")[1]}</div>
            <div className="text-[9.5px] mt-1 font-semibold text-amber-700">{p.metabolism}</div>
          </button>
        ))}
      </div>

      {/* Phase Nutrition Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-teal-50 border border-amber-200 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-white px-2 py-0.5 rounded-full border border-amber-200">
              {current.badge}
            </span>
            <h5 className="font-serif font-bold text-lg text-deep-teal mt-1 mb-0">{current.tagline}</h5>
          </div>
          <div className="text-right sm:shrink-0">
            <span className="text-xs font-bold text-amber-900 bg-amber-200/70 px-2.5 py-1 rounded-full block">
              Metabolic Burn: {current.metabolism}
            </span>
            <span className="text-[10.5px] text-charcoal/70 mt-1 block">Hunger Cue: {current.hungerLevel}</span>
          </div>
        </div>

        <p className="text-xs md:text-sm text-charcoal/90 m-0 leading-relaxed font-sans">
          {current.biologicalTruth}
        </p>
      </div>

      {/* Visual Fueling Plate Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white p-4 rounded-2xl border border-gray-200">
        {/* Dynamic Plate Diagram */}
        <div className="md:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-48 h-48 sm:w-52 sm:h-52">
            {/* SVG Plate Circle with Proportions */}
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
              {/* Outer Plate Rim */}
              <circle cx="100" cy="100" r="95" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="6" />
              <circle cx="100" cy="100" r="85" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />

              {/* Complex Carbs Slice (Top Left: Orange/Gold) */}
              <path
                d="M 100 100 L 100 15 A 85 85 0 0 1 185 100 Z"
                fill="#f59e0b"
                opacity="0.85"
              />
              {/* Protein Slice (Bottom Right: Crimson/Rose) */}
              <path
                d="M 100 100 L 185 100 A 85 85 0 0 1 100 185 Z"
                fill="#b83f68"
                opacity="0.85"
              />
              {/* Veggies / Anti-inflammatory Slice (Bottom Left: Teal/Green) */}
              <path
                d="M 100 100 L 100 185 A 85 85 0 0 1 15 100 Z"
                fill="#175b5c"
                opacity="0.85"
              />
              {/* Healthy Fats Slice (Top Left: Soft Amber) */}
              <path
                d="M 100 100 L 15 100 A 85 85 0 0 1 100 15 Z"
                fill="#38bdf8"
                opacity="0.75"
              />

              {/* Center Plate Badge */}
              <circle cx="100" cy="100" r="34" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
              <text x="100" y="97" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">
                {activePhase === 3 ? "+300 kcal" : "Balanced"}
              </text>
              <text x="100" y="110" fill="#64748b" fontSize="8" textAnchor="middle">
                {activePhase === 3 ? "Extra Burn" : "Optimal"}
              </text>
            </svg>
          </div>

          <span className="text-[11px] font-bold text-charcoal/75 mt-2 text-center">
            Recommended Plate Ratios for {current.name}
          </span>
        </div>

        {/* Plate Proportions Legend */}
        <div className="md:col-span-7 space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/60">
              <div className="flex items-center justify-between font-bold text-amber-900 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                  Complex Carbs
                </span>
                <span>{current.plateRatios.carbs}%</span>
              </div>
              <p className="text-[10.5px] text-charcoal/70 m-0 mt-0.5">Sweet potatoes, oats, quinoa, brown rice</p>
            </div>

            <div className="p-2.5 rounded-xl border border-raspberry/20 bg-soft-pink/40">
              <div className="flex items-center justify-between font-bold text-raspberry text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-raspberry inline-block"></span>
                  Muscle Protein
                </span>
                <span>{current.plateRatios.protein}%</span>
              </div>
              <p className="text-[10.5px] text-charcoal/70 m-0 mt-0.5">25–30g eggs, Greek yogurt, fish, poultry, lentils</p>
            </div>

            <div className="p-2.5 rounded-xl border border-deep-teal/20 bg-light-teal/50">
              <div className="flex items-center justify-between font-bold text-deep-teal text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-deep-teal inline-block"></span>
                  Veggies & Color
                </span>
                <span>{current.plateRatios.veggies}%</span>
              </div>
              <p className="text-[10.5px] text-charcoal/70 m-0 mt-0.5">Dark greens, berries, cruciferous veggies</p>
            </div>

            <div className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/60">
              <div className="flex items-center justify-between font-bold text-blue-900 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block"></span>
                  Fats & Hydration
                </span>
                <span>{current.plateRatios.fats}%</span>
              </div>
              <p className="text-[10.5px] text-charcoal/70 m-0 mt-0.5">Avocado, chia, nuts + sodium electrolytes</p>
            </div>
          </div>

          {/* Luteal Metabolic Truth Card */}
          {activePhase === 3 && (
            <div className="p-2.5 rounded-xl bg-amber-100/70 border border-amber-300 text-amber-950 text-[11.5px] space-y-1">
              <strong>✦ Why You Feel Hungrier Before Your Period:</strong>
              <p className="m-0 leading-relaxed text-[11px]">
                Progesterone increases body heat, elevating your basal metabolism by <strong>100 to 300 kcal/day</strong>. Feeling hungry is NOT a failure of willpower — it is biological fact. Restricting food now triggers RED-S, crashes your thyroid, and makes PMS far worse. Add a nourishing snack with protein and complex carbs!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Superpower Food Recommendations for Active Phase */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-deep-teal">Superpower Foods for {current.name}:</span>
          <div className="flex items-center gap-1 text-[10px]">
            {(["all", "carbs", "proteins", "micronutrients"] as const).map((ft) => (
              <button
                key={ft}
                type="button"
                onClick={() => setSelectedFoodType(ft)}
                className={`px-2 py-0.5 rounded-md font-bold capitalize transition-all ${
                  selectedFoodType === ft
                    ? "bg-deep-teal text-white shadow-xs"
                    : "bg-gray-100 text-charcoal/70 hover:bg-gray-200"
                }`}
              >
                {ft}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {filteredFoods.map((food, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-deep-teal/40 transition-all space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <strong className="font-bold text-deep-teal text-[12px]">{food.name}</strong>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase ${
                  food.type === "carbs" ? "bg-amber-100 text-amber-800" : food.type === "proteins" ? "bg-rose-100 text-rose-800" : "bg-teal-100 text-teal-800"
                }`}>
                  {food.type}
                </span>
              </div>
              <p className="text-charcoal/80 text-[11px] leading-tight m-0">{food.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 14. Interactive Puberty Brain & Emotional Regulation Simulator
// --------------------------------------------------------------------------
function PubertyBrainDiagram({ diagram }: { diagram: LessonDiagram; themeColor: string }) {
  const [activeTab, setActiveTab] = useState<"simulator" | "anatomy" | "stages" | "guide">("simulator");
  const [activeStage, setActiveStage] = useState<"early" | "mid" | "late">("mid");
  const [selectedRegion, setSelectedRegion] = useState<"pfc" | "amygdala" | "hpa">("amygdala");
  const [activeTrigger, setActiveTrigger] = useState<"none" | "social" | "luteal" | "sleep" | "overwhelm">("none");
  const [appliedReset, setAppliedReset] = useState<"none" | "sigh" | "label" | "dive" | "rest">("none");

  // Maturation Stage Benchmarks
  const stageData = {
    early: {
      name: "Early Puberty (Ages 9–11 · Tanner 1–2)",
      sub: "Adrenarche & Sensory Awakening",
      pfcMaturation: 35,
      amygdalaReactivity: 70,
      hormoneProfile: "Adrenal DHEA rise + initial pulsatile GnRH. Ovarian estrogen beginning slow production.",
      brainState: "The amygdala awakens to social approval and peer cues. Prefrontal networks are starting multi-year synaptic remodeling.",
      emotions: "First feelings of self-consciousness, curiosity about identity, emerging desire for personal autonomy.",
    },
    mid: {
      name: "Mid-Puberty (Ages 12–15 · Tanner 3–4)",
      sub: "Peak Mismatch · Maximum Limbic Sensitivity",
      pfcMaturation: 50,
      amygdalaReactivity: 95,
      hormoneProfile: "Surging, fluctuating estradiol & progesterone. Dynamic GABA-A and serotonin receptor adjustments.",
      brainState: "The 'Developmental Mismatch': Limbic reward & emotional centers fire at 100% volume, while executive prefrontal control is undergoing intensive synaptic pruning.",
      emotions: "Heightened emotional peaks, sudden crying spells without obvious causes, deep passions, high sensitivity to peer rejection or social exclusion.",
    },
    late: {
      name: "Late Adolescence (Ages 16–20+ · Tanner 5)",
      sub: "Prefrontal Consolidation & Executive Brake",
      pfcMaturation: 85,
      amygdalaReactivity: 65,
      hormoneProfile: "More regular ovulatory cycles. Mature estrogen-serotonin signaling and stable allopregnanolone balance.",
      brainState: "Axonal myelination connects the prefrontal cortex to deeper limbic centers, providing strong impulse braking and nuanced perspective.",
      emotions: "Greater capacity to pause between feeling and reacting, resilient self-advocacy, consolidated personal values.",
    },
  };

  // Anatomy region details
  const regionData = {
    pfc: {
      name: "Prefrontal Cortex (Frontal Lobe)",
      subtitle: "The Executive Pilot & Impulse Brake",
      badge: "In Construction until Age ~25",
      color: "#175B5C",
      borderClass: "border-teal-300 bg-teal-50/70",
      role: "Controls emotional modulation, consequence evaluation, long-term planning, and calming the emotional engine when false alarms sound.",
      adolescentFact: "During puberty, the PFC undergoes massive synaptic pruning—eliminating unused connections to build lightning-fast highways for adult reasoning. Because it remodels later than the amygdala, teens feel emotions before they can rationally dissect them.",
      tip: "Strengthened by: Naming your feelings out loud, journaling, 8–10 hours of sleep, and compassionate boundaries.",
    },
    amygdala: {
      name: "Amygdala & Limbic System",
      subtitle: "The Emotional Engine & Alarm Bell",
      badge: "Hyper-Sensitive in Puberty",
      color: "#F47A6A",
      borderClass: "border-coral/40 bg-coral/10",
      role: "Processes raw emotional intensity, excitement, fear, social evaluation, gut instincts, and peer belonging.",
      adolescentFact: "Pubertal sex steroids (estrogen, testosterone, DHEA) directly sensitize amygdalar neurons. It perceives social exclusion with the same neurological urgency that early humans felt toward physical danger!",
      tip: "Calmed by: The physiological sigh (double inhale, long exhale), somatic grounding (5-4-3-2-1), and reassurance that emotional surges pass like weather.",
    },
    hpa: {
      name: "Hypothalamus-Pituitary-Adrenal (HPA) Axis",
      subtitle: "The Neuroendocrine Command Highway",
      badge: "Hormone Dispatch Center",
      color: "#D97706",
      borderClass: "border-amber-300 bg-amber-50/70",
      role: "Releases GnRH to trigger puberty and controls cortisol release when you feel overwhelmed, cold, tired, or socially threatened.",
      adolescentFact: "The adolescent stress axis is hyper-reactive. Elevated chronic cortisol directly feeds back to the hypothalamus to suppress GnRH, which is why academic or emotional burnout can delay or skip periods.",
      tip: "Balanced by: Regular carbohydrate-rich meals, daily outdoor daylight, and reducing perfectionist academic pressure.",
    },
  };

  // Triggers definition
  const triggers = {
    none: {
      label: "Baseline / Neutral Day",
      amyDelta: 0,
      pfcDelta: 0,
      serotonin: "Balanced (Steady)",
      cortisol: "Normal Rhythm",
      gaba: "Effective",
      sensations: "Calm baseline; normal alertness and manageable emotional flow.",
    },
    social: {
      label: "Social Exclusion / Left on Read",
      amyDelta: +25,
      pfcDelta: -15,
      serotonin: "Temporary Dip",
      cortisol: "Sharp Spike (+65%)",
      gaba: "Suppressed",
      sensations: "Stomach drop, racing heart, sudden panic, catastrophic thoughts ('Everyone hates me').",
    },
    luteal: {
      label: "Luteal Estrogen & Progesterone Plunge",
      amyDelta: +30,
      pfcDelta: -10,
      serotonin: "Steep Plunge (-45%)",
      cortisol: "Elevated Vulnerability",
      gaba: "Subunit Fluctuation",
      sensations: "Sudden tearfulness over small things, sensory irritation, lower tolerance for noise, intense fatigue.",
    },
    sleep: {
      label: "Sleep Deprivation (<7h) + Exams",
      amyDelta: +20,
      pfcDelta: -35,
      serotonin: "Depleted",
      cortisol: "Chronically Elevated",
      gaba: "Inefficient",
      sensations: "Prefrontal impulse brake fails; irritability, brain fog, tearful overwhelm, difficulty focusing.",
    },
    overwhelm: {
      label: "Schedule & Sensory Overload",
      amyDelta: +35,
      pfcDelta: -25,
      serotonin: "Low Synthesis",
      cortisol: "Peak Alert (+80%)",
      gaba: "Exhausted",
      sensations: "Fight-or-flight freeze, muscle tension in shoulders/jaw, urge to isolate or cry in a dark room.",
    },
  };

  // Reset protocols
  const resets = {
    none: {
      label: "No Reset Applied",
      amyRecovery: 0,
      pfcBoost: 0,
      actionDesc: "Select a physiological reset tool below to restore nervous system balance.",
      physioEffect: "Without active soothing, stress signals linger in the limbic system.",
    },
    sigh: {
      label: "Physiological Sigh (Double Inhale + Long Exhale)",
      amyRecovery: 35,
      pfcBoost: 20,
      actionDesc: "Two quick inhales through the nose, followed by a slow, extended sigh through the mouth (repeat 3–5 times).",
      physioEffect: "Expands collapsed lung alveoli and triggers the vagus nerve, slowing heart rate and cooling amygdalar firing within 30 seconds.",
    },
    label: {
      label: "Neuro-Labeling ('Name It to Tame It')",
      amyRecovery: 30,
      pfcBoost: 35,
      actionDesc: "Say out loud or write: 'I am experiencing an estrogen-drop wave. My nervous system is tired, but I am physically safe.'",
      physioEffect: "Puts language to the raw emotion, immediately shunting arterial blood flow away from the amygdala and into the prefrontal cortex.",
    },
    dive: {
      label: "Mammalian Dive Reflex (Cold Water Face Splash)",
      amyRecovery: 40,
      pfcBoost: 15,
      actionDesc: "Lean over a sink and splash cold water across your eyes, cheekbones, and temples for 15–20 seconds.",
      physioEffect: "Stimulates the ophthalmic branch of the trigeminal nerve, causing instant parasympathetic deceleration of the nervous system.",
    },
    rest: {
      label: "Complex Carb Snack + 8–10h Sleep",
      amyRecovery: 35,
      pfcBoost: 40,
      actionDesc: "Oatmeal with peanut butter or whole-wheat toast with banana + going to bed in a dark, cool room without phones.",
      physioEffect: "Carbohydrates provide tryptophan to resynthesize serotonin; deep Stage 3 sleep clears brain adenosine and rebuilds prefrontal synaptic strength.",
    },
  };

  // Compute live meters
  const currentStage = stageData[activeStage];
  const currentTrigger = triggers[activeTrigger];
  const currentReset = resets[appliedReset];

  const rawAmy = currentStage.amygdalaReactivity + currentTrigger.amyDelta - currentReset.amyRecovery;
  const computedAmygdala = Math.min(100, Math.max(15, rawAmy));

  const rawPfc = currentStage.pfcMaturation + currentTrigger.pfcDelta + currentReset.pfcBoost;
  const computedPfc = Math.min(100, Math.max(15, rawPfc));

  return (
    <div className="rounded-3xl border-2 border-deep-teal/20 bg-white p-4 sm:p-6 shadow-card space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-coral/15 text-[#B83F68]">
              <Brain className="w-5 h-5 text-[#B83F68]" />
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-deep-teal">
              {diagram.title}
            </h3>
          </div>
          <p className="text-xs sm:text-[13px] text-charcoal/70 mt-1 max-w-2xl font-sans leading-relaxed">
            {diagram.caption}
          </p>
        </div>

        {/* View Tabs */}
        <div className="flex items-center bg-gray-100 p-1 rounded-2xl text-xs font-bold font-sans self-start sm:self-center">
          <button
            type="button"
            onClick={() => setActiveTab("simulator")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === "simulator"
                ? "bg-deep-teal text-white shadow-xs"
                : "text-charcoal/70 hover:text-deep-teal"
            }`}
          >
            Nervous System Simulator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("anatomy")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === "anatomy"
                ? "bg-deep-teal text-white shadow-xs"
                : "text-charcoal/70 hover:text-deep-teal"
            }`}
          >
            Brain Anatomy Map
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("stages")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === "stages"
                ? "bg-deep-teal text-white shadow-xs"
                : "text-charcoal/70 hover:text-deep-teal"
            }`}
          >
            Puberty Timeline
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("guide")}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === "guide"
                ? "bg-deep-teal text-white shadow-xs"
                : "text-charcoal/70 hover:text-deep-teal"
            }`}
          >
            Normal vs. Clinical Red Flags
          </button>
        </div>
      </div>

      {/* TAB 1: NERVOUS SYSTEM SIMULATOR */}
      {activeTab === "simulator" && (
        <div className="space-y-5">
          {/* Maturation Stage Selector Bar */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-deep-teal uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-coral" />
                Select Puberty Stage to Simulate:
              </span>
              <span className="text-[11px] font-bold text-charcoal/70 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                {currentStage.sub}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(["early", "mid", "late"] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setActiveStage(st)}
                  className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                    activeStage === st
                      ? "bg-white border-deep-teal text-deep-teal ring-2 ring-deep-teal/20 shadow-xs font-bold"
                      : "bg-white/60 border-slate-200 text-charcoal/80 hover:bg-white"
                  }`}
                >
                  <div className="font-bold text-[12px]">{stageData[st].name.split("·")[0]}</div>
                  <div className="text-[10px] text-charcoal/60 mt-0.5">{stageData[st].name.split("·")[1]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Dual Engine Meters: Prefrontal Brake vs Amygdala Alarm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Amygdala Alarm */}
            <div className="p-4 rounded-2xl border-2 border-coral/30 bg-coral/5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#F47A6A] animate-pulse inline-block" />
                  <span className="font-serif font-bold text-sm text-[#991B4B]">
                    Amygdala Alarm & Emotional Engine
                  </span>
                </div>
                <span className="text-xs font-extrabold text-[#991B4B] bg-coral/20 px-2 py-0.5 rounded-full">
                  {computedAmygdala}% Reactive
                </span>
              </div>
              {/* Meter bar */}
              <div className="w-full bg-white rounded-full h-3 overflow-hidden border border-coral/30 p-0.5">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${computedAmygdala}%`,
                    backgroundColor: computedAmygdala > 80 ? "#E11D48" : computedAmygdala > 60 ? "#F47A6A" : "#10B981",
                  }}
                />
              </div>
              <p className="text-[11px] text-charcoal/80 m-0 leading-tight">
                {computedAmygdala > 80
                  ? "🚨 Intense Alert: Emotions felt at peak volume; high vulnerability to crying spells, frustration, or social self-consciousness."
                  : computedAmygdala > 60
                  ? "⚡ Elevated Sensitivity: Normal puberty reactivity; feelings are strong and responsive to external events."
                  : "🌿 Grounded Baseline: Nervous system calm, parasympathetic tone active."}
              </p>
            </div>

            {/* Prefrontal Cortex Regulation */}
            <div className="p-4 rounded-2xl border-2 border-deep-teal/30 bg-light-teal/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-deep-teal inline-block" />
                  <span className="font-serif font-bold text-sm text-deep-teal">
                    Prefrontal Cortex Braking & Perspective
                  </span>
                </div>
                <span className="text-xs font-extrabold text-deep-teal bg-deep-teal/15 px-2 py-0.5 rounded-full">
                  {computedPfc}% Modulated
                </span>
              </div>
              {/* Meter bar */}
              <div className="w-full bg-white rounded-full h-3 overflow-hidden border border-deep-teal/30 p-0.5">
                <div
                  className="h-full rounded-full transition-all duration-500 bg-deep-teal"
                  style={{ width: `${computedPfc}%` }}
                />
              </div>
              <p className="text-[11px] text-charcoal/80 m-0 leading-tight">
                {computedPfc < 40
                  ? "⚠️ Impaired Braking: Synaptic construction or fatigue weakens impulse control. Pausing to think is difficult."
                  : computedPfc < 70
                  ? "✦ Remodeling in Progress: Able to self-regulate with intentional breathwork, safe spaces, and time to decompress."
                  : "🛡️ Resilient Executive Control: Solid prefrontal signaling; able to step back, name feelings, and keep perspective."}
              </p>
            </div>
          </div>

          {/* Interactive Trigger Buttons */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-deep-teal uppercase tracking-wider block">
              1. Choose an Adolescent Stress Trigger:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {[
                { id: "none", label: "Neutral / Calm Day", icon: CheckCircle2 },
                { id: "social", label: "Left on Read / Social", icon: AlertTriangle },
                { id: "luteal", label: "Luteal Estrogen Dip", icon: Droplets },
                { id: "sleep", label: "Low Sleep + Exams", icon: Moon },
                { id: "overwhelm", label: "Schedule Overload", icon: Flame },
              ].map((trig) => {
                const IconComponent = trig.icon;
                return (
                  <button
                    key={trig.id}
                    type="button"
                    onClick={() => setActiveTrigger(trig.id as any)}
                    className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      activeTrigger === trig.id
                        ? "bg-[#FFE1DB] border-coral text-raspberry font-bold ring-2 ring-coral/30 shadow-xs"
                        : "bg-white border-gray-200 text-charcoal/80 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <IconComponent className="w-4 h-4 text-deep-teal" />
                      {activeTrigger === trig.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-raspberry" />
                      )}
                    </div>
                    <span className="text-[11px] leading-tight">{trig.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Reset Protocols */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-deep-teal uppercase tracking-wider block">
              2. Apply Evidence-Based Physiological Reset Tool:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {[
                { id: "none", label: "None (Raw Surge)", icon: AlertTriangle },
                { id: "sigh", label: "Physiological Sigh", icon: Wind },
                { id: "label", label: "Neuro-Labeling", icon: Sparkles },
                { id: "dive", label: "Cold Water Splash", icon: Droplets },
                { id: "rest", label: "Carb Snack + Sleep", icon: Moon },
              ].map((res) => {
                const IconComponent = res.icon;
                return (
                  <button
                    key={res.id}
                    type="button"
                    onClick={() => setAppliedReset(res.id as any)}
                    className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      appliedReset === res.id
                        ? "bg-light-teal border-deep-teal text-deep-teal font-bold ring-2 ring-deep-teal/30 shadow-xs"
                        : "bg-white border-gray-200 text-charcoal/80 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <IconComponent className="w-4 h-4 text-deep-teal" />
                      {appliedReset === res.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-deep-teal" />
                      )}
                    </div>
                    <span className="text-[11px] leading-tight">{res.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Physiological Breakdown Readout */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 flex-wrap gap-2">
              <span className="font-serif font-bold text-deep-teal text-sm flex items-center gap-1.5">
                <Info className="w-4 h-4 text-deep-teal" />
                Live Neurochemical & Somatic Status:
              </span>
              <div className="flex items-center gap-2 text-[10.5px]">
                <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-bold text-charcoal">
                  Serotonin: <strong className="text-deep-teal">{currentTrigger.serotonin}</strong>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-bold text-charcoal">
                  Cortisol: <strong className="text-coral">{currentTrigger.cortisol}</strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <strong className="text-rose-800 font-bold block text-[11.5px]">
                  ⚡ Body Sensations in This State:
                </strong>
                <p className="text-charcoal/80 text-[11px] leading-relaxed m-0">
                  {currentTrigger.sensations}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                <strong className="text-deep-teal font-bold block text-[11.5px]">
                  🌿 How the Selected Reset Calms Your Biology:
                </strong>
                <p className="text-charcoal/80 text-[11px] leading-relaxed m-0">
                  {currentReset.physioEffect}
                </p>
              </div>
            </div>

            {appliedReset !== "none" && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-[11.5px] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Step-by-Step Action:</strong> {currentReset.actionDesc}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: BRAIN ANATOMY MAP */}
      {activeTab === "anatomy" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* Interactive Vector Brain SVG */}
            <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center border border-slate-800 shadow-inner text-white">
              <div className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-coral" />
                Click Any Brain Structure to Explore
              </div>

              <svg viewBox="0 0 400 320" className="w-full max-w-sm h-auto select-none">
                <defs>
                  {/* Glowing filters */}
                  <filter id="glow-teal" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-coral" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="7" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Brain Outline / Parietal & Occipital Lobes */}
                <path
                  d="M 120,240 C 70,240 50,190 60,140 C 70,80 140,50 210,50 C 290,50 350,90 350,160 C 350,210 320,240 280,240 C 260,240 250,260 250,280 L 220,280 C 220,250 200,240 170,240 Z"
                  fill="#1E293B"
                  stroke="#334155"
                  strokeWidth="3"
                />

                {/* Cerebellum & Brainstem */}
                <path
                  d="M 280,230 C 310,230 330,260 310,280 C 290,300 260,290 250,270 Z"
                  fill="#0F172A"
                  stroke="#334155"
                  strokeWidth="2"
                />
                <rect x="215" y="270" width="30" height="40" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="2" />
                <text x="230" y="300" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="bold">Spinal Cord</text>

                {/* Region 1: Prefrontal Cortex (Front Lobe) */}
                <g
                  onClick={() => setSelectedRegion("pfc")}
                  className="cursor-pointer group"
                >
                  <path
                    d="M 120,230 C 80,230 65,180 75,130 C 85,85 135,65 175,65 C 160,110 160,170 120,230 Z"
                    fill={selectedRegion === "pfc" ? "#175B5C" : "#0D9488"}
                    fillOpacity={selectedRegion === "pfc" ? "0.85" : "0.45"}
                    stroke="#2DD4BF"
                    strokeWidth={selectedRegion === "pfc" ? "3" : "1.5"}
                    filter={selectedRegion === "pfc" ? "url(#glow-teal)" : undefined}
                    className="transition-all duration-300 group-hover:fill-opacity-80"
                  />
                  <circle cx="115" cy="140" r="14" fill="#175B5C" stroke="#2DD4BF" strokeWidth="2" />
                  <text x="115" y="144" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">PFC</text>
                </g>

                {/* Region 2: Amygdala & Limbic System (Center Core) */}
                <g
                  onClick={() => setSelectedRegion("amygdala")}
                  className="cursor-pointer group"
                >
                  <ellipse
                    cx="195"
                    cy="185"
                    rx="32"
                    ry="24"
                    fill={selectedRegion === "amygdala" ? "#E11D48" : "#F43F5E"}
                    fillOpacity={selectedRegion === "amygdala" ? "0.9" : "0.5"}
                    stroke="#FDA4AF"
                    strokeWidth={selectedRegion === "amygdala" ? "3" : "1.5"}
                    filter={selectedRegion === "amygdala" ? "url(#glow-coral)" : undefined}
                    className="transition-all duration-300 group-hover:fill-opacity-80"
                  />
                  <circle cx="195" cy="185" r="12" fill="#991B4B" stroke="#FECDD3" strokeWidth="2" />
                  <text x="195" y="189" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold">AMY</text>
                </g>

                {/* Region 3: Hypothalamus-Pituitary Axis (Under Core) */}
                <g
                  onClick={() => setSelectedRegion("hpa")}
                  className="cursor-pointer group"
                >
                  <ellipse
                    cx="190"
                    cy="235"
                    rx="22"
                    ry="15"
                    fill={selectedRegion === "hpa" ? "#D97706" : "#F59E0B"}
                    fillOpacity={selectedRegion === "hpa" ? "0.9" : "0.45"}
                    stroke="#FDE68A"
                    strokeWidth={selectedRegion === "hpa" ? "3" : "1.5"}
                    className="transition-all duration-300 group-hover:fill-opacity-80"
                  />
                  <text x="190" y="238" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">HPA</text>
                </g>

                {/* Communication Arrows / Pathways */}
                <path
                  d="M 130,150 Q 160,170 175,180"
                  fill="none"
                  stroke="#5EEAD4"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <path
                  d="M 195,205 L 192,220"
                  fill="none"
                  stroke="#FCD34D"
                  strokeWidth="2"
                  strokeDasharray="3 2"
                />

                {/* Labels */}
                <text x="75" y="45" fill="#2DD4BF" fontSize="11" fontWeight="bold">Prefrontal Cortex</text>
                <text x="75" y="58" fill="#94A3B8" fontSize="9">Executive Control & Impulse Brake</text>

                <text x="240" y="180" fill="#FDA4AF" fontSize="11" fontWeight="bold">Amygdala Core</text>
                <text x="240" y="193" fill="#94A3B8" fontSize="9">Emotional Engine & Threat Radar</text>

                <text x="220" y="240" fill="#FCD34D" fontSize="11" fontWeight="bold">Hypothalamus Axis</text>
                <text x="220" y="253" fill="#94A3B8" fontSize="9">Hormone Command Center</text>
              </svg>

              <div className="flex items-center gap-2 mt-2">
                {(["pfc", "amygdala", "hpa"] as const).map((reg) => (
                  <button
                    key={reg}
                    type="button"
                    onClick={() => setSelectedRegion(reg)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedRegion === reg
                        ? "bg-white text-slate-900 shadow-xs"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {reg === "pfc" ? "Prefrontal Cortex" : reg === "amygdala" ? "Amygdala" : "HPA Axis"}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Region Explainer Panel */}
            <div className={`lg:col-span-6 p-5 rounded-2xl border-2 ${regionData[selectedRegion].borderClass} space-y-3`}>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border shadow-2xs" style={{ color: regionData[selectedRegion].color }}>
                    {regionData[selectedRegion].badge}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-deep-teal mt-1">
                    {regionData[selectedRegion].name}
                  </h4>
                  <span className="text-xs text-charcoal/70 font-sans block">
                    {regionData[selectedRegion].subtitle}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white/80 rounded-xl border border-gray-200">
                  <strong className="text-deep-teal block font-bold text-[11.5px] mb-0.5">Biological Role:</strong>
                  <p className="text-charcoal/85 leading-relaxed m-0">{regionData[selectedRegion].role}</p>
                </div>

                <div className="p-3 bg-white/80 rounded-xl border border-gray-200">
                  <strong className="text-[#B83F68] block font-bold text-[11.5px] mb-0.5">What Happens in Puberty:</strong>
                  <p className="text-charcoal/85 leading-relaxed m-0">{regionData[selectedRegion].adolescentFact}</p>
                </div>

                <div className="p-3 bg-white/80 rounded-xl border border-gray-200">
                  <strong className="text-emerald-800 block font-bold text-[11.5px] mb-0.5">How to Support & Regulate:</strong>
                  <p className="text-charcoal/85 leading-relaxed m-0">{regionData[selectedRegion].tip}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PUBERTY TIMELINE */}
      {activeTab === "stages" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(["early", "mid", "late"] as const).map((st) => (
              <div
                key={st}
                onClick={() => setActiveStage(st)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  activeStage === st
                    ? "bg-white border-deep-teal shadow-md ring-2 ring-deep-teal/20"
                    : "bg-slate-50/70 border-slate-200 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-coral">
                    Tanner {st === "early" ? "1–2" : st === "mid" ? "3–4" : "5"}
                  </span>
                  {activeStage === st && (
                    <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-deep-teal text-white">
                      Active Stage
                    </span>
                  )}
                </div>
                <h4 className="font-serif font-bold text-sm text-deep-teal mb-1">
                  {stageData[st].name}
                </h4>
                <p className="text-[11px] text-charcoal/70 font-sans mb-3">
                  {stageData[st].sub}
                </p>

                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-rose-700">Amygdala: {stageData[st].amygdalaReactivity}%</span>
                    <span className="text-teal-700">PFC Brake: {stageData[st].pfcMaturation}%</span>
                  </div>

                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-[10.5px] leading-tight text-charcoal/85">
                    <strong>Hormones:</strong> {stageData[st].hormoneProfile}
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-[10.5px] leading-tight text-charcoal/85">
                    <strong>Emotions:</strong> {stageData[st].emotions}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 text-amber-950 text-xs leading-relaxed space-y-1">
            <strong>✦ Why the "Mismatch" Is an Evolutionary Strength:</strong>
            <p className="m-0 text-[11.5px]">
              Why would biology design a brain with an emotional engine that matures before its braking system? Anthropological neuroscience shows that high emotional sensitivity and novelty-seeking pushed human adolescents to form bonds outside their immediate family, master complex cultural skills, and step into independent adulthood. It is not a flaw—it is human biology doing its job!
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: NORMAL VS CLINICAL RED FLAGS */}
      {activeTab === "guide" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Normal puberty waves */}
            <div className="p-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50/60 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-900 font-serif font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Healthy Puberty Emotional Waves
              </div>
              <ul className="space-y-1.5 text-xs text-charcoal/85 pl-4 list-disc marker:text-emerald-600">
                <li>Crying after a hard school day, then feeling relieved after a chat or nap.</li>
                <li>Feeling excited one morning, then wanting quiet alone time in your room by evening.</li>
                <li>Temporary self-consciousness about new body curves, height, or skin changes.</li>
                <li>Brief frustration with family rules as you build your own independent identity.</li>
                <li>Emotions feel intense in the moment, but you still experience joy with friends and hobbies.</li>
              </ul>
            </div>

            {/* Red flags for clinical care */}
            <div className="p-4 rounded-2xl border-2 border-rose-300 bg-rose-50/60 space-y-2.5">
              <div className="flex items-center gap-2 text-rose-950 font-serif font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Signals to Seek Professional Care (AACAP / ACOG)
              </div>
              <ul className="space-y-1.5 text-xs text-charcoal/85 pl-4 list-disc marker:text-rose-600">
                <li><strong>Anhedonia:</strong> Total loss of joy or interest in all favorite activities for ≥2 weeks.</li>
                <li><strong>Severe PMDD:</strong> Extreme cyclical despair, rage, or panic that hits strictly in the week before your period and vanishes right after bleeding starts.</li>
                <li><strong>Functional Impairment:</strong> Inability to attend school, complete homework, or eat meals due to panic.</li>
                <li><strong>Isolation:</strong> Cutting off all friendships and refusing to communicate for weeks.</li>
                <li><strong>Hopelessness:</strong> Thoughts of self-harm, wanting to disappear, or feelings of worthlessness.</li>
              </ul>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-light-teal/50 border border-deep-teal/20 text-deep-teal text-xs flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-deep-teal" />
              <span>
                <strong>Confidential Support:</strong> You can schedule a private, confidential discussion with your pediatrician, adolescent specialist, or school counselor at any time.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

