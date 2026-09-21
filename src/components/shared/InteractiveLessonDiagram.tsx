"use client";

import React, { useState } from "react";
import { LessonDiagram } from "@/data/hubData";
import { Activity, AlertTriangle, CheckCircle2, Info, Sparkles, Zap, Shield, Heart } from "lucide-react";

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
          <div className="mt-2.5 text-[11px] font-semibold text-deep-teal/90 bg-white/70 p-2 rounded-lg border border-deep-teal/10">
            💡 <em>Tip:</em> Cycle phases naturally fluctuate. Using them as self-knowledge helps you train and recover with your biology, not against it.
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
