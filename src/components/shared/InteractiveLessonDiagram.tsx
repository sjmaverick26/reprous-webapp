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
  RotateCcw,
  ShieldCheck,
  ExternalLink,
  Trash2,
  Check,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";
import { OvertrainingBodyInspectionDiagram } from "./OvertrainingBodyInspectionDiagram";

export interface DiagramClinicalSource {
  organization: string;
  guideline: string;
  year?: string;
  url?: string;
}

export const DIAGRAM_CLINICAL_SOURCES: Record<string, DiagramClinicalSource> = {
  "cycle-wheel": {
    organization: "American College of Obstetricians and Gynecologists (ACOG) & FIGO",
    guideline: "ACOG Committee Opinion No. 651: Menstruation in Girls and Adolescents: Using the Menstrual Cycle as a Vital Sign",
    year: "Reaffirmed 2022",
    url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2015/12/menstruation-in-girls-and-adolescents-using-the-menstrual-cycle-as-a-vital-sign",
  },
  "energy-balance": {
    organization: "International Olympic Committee (IOC)",
    guideline: "2023 IOC Consensus Statement on Relative Energy Deficiency in Sport (REDs)",
    year: "2023",
    url: "https://bjsm.bmj.com/content/57/17/1073",
  },
  "pcos-loop": {
    organization: "International PCOS Network & ACOG",
    guideline: "International Evidence-Based Guideline for Assessment and Management of PCOS & Rotterdam Consensus",
    year: "2023",
    url: "https://www.monash.edu/medicine/mchri/pcos",
  },
  "pelvic-map": {
    organization: "American College of Obstetricians and Gynecologists (ACOG) & World Endometriosis Society",
    guideline: "ACOG Committee Opinion No. 760: Dysmenorrhea and Endometriosis in the Adolescent",
    year: "Reaffirmed 2023",
    url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/12/dysmenorrhea-and-endometriosis-in-the-adolescent",
  },
  "anatomy-callout": {
    organization: "American College of Obstetricians and Gynecologists (ACOG)",
    guideline: "ACOG Adolescent Health Guidelines: Anatomy, Physiology & Menstrual Health Literacy",
    year: "2023",
    url: "https://www.acog.org/womens-health",
  },
  "athlete-plate": {
    organization: "U.S. Olympic & Paralympic Committee (USOPC) & ACSM",
    guideline: "USOPC Sports Nutrition Athlete's Plate Protocols & ACSM Nutrition for Athletic Performance",
    year: "2023",
    url: "https://www.usopc.org",
  },
  "hormone-scale": {
    organization: "The Endocrine Society",
    guideline: "Endocrine Society Clinical Practice Guidelines on Female Reproductive Endocrinology & Ovarian Steroids",
    year: "2022",
    url: "https://www.endocrine.org/clinical-practice-guidelines",
  },
  "reds-triangle": {
    organization: "Female Athlete Triad Coalition & IOC Medical Commission",
    guideline: "Coalition Consensus on Treatment & Return to Play & 2023 IOC REDs Clinical Assessment Tool (CAT2)",
    year: "2023",
    url: "https://bjsm.bmj.com/content/57/17/1073",
  },
  "water-glass": {
    organization: "American College of Sports Medicine (ACSM)",
    guideline: "ACSM Position Stand: Exercise and Fluid Replacement & Electrolyte Homeostasis",
    year: "Reaffirmed 2022",
    url: "https://www.acsm.org",
  },
  "sleep-recovery": {
    organization: "American Academy of Sleep Medicine (AASM)",
    guideline: "Consensus Statement of the AASM on Recommended Amount of Sleep for Pediatric Populations & Athletes",
    year: "2022",
    url: "https://aasm.org",
  },
  "iron-ferritin": {
    organization: "British Journal of Sports Medicine (BJSM) & Australian Institute of Sport (AIS)",
    guideline: "Consensus Statement: Screening and Management of Iron Deficiency in Female Athletes & Hepcidin Window",
    year: "2023",
    url: "https://bjsm.bmj.com",
  },
  "cycle-training": {
    organization: "British Journal of Sports Medicine (BJSM) & ACSM",
    guideline: "Menstrual Cycle Phasing and Exercise Performance: Systematic Review & Evidence-Based Framework",
    year: "2021",
    url: "https://bjsm.bmj.com",
  },
  "cycle-fueling": {
    organization: "International Society of Sports Nutrition (ISSN)",
    guideline: "ISSN Position Stand: Nutritional Considerations for Active and Athletic Females",
    year: "2023",
    url: "https://jissn.biomedcentral.com",
  },
  "puberty-brain": {
    organization: "Pediatric Endocrine Society & GLOWM",
    guideline: "Clinical Practice Guideline: Neuroendocrine Control of Puberty & GnRH Pulsatility",
    year: "2022",
    url: "https://www.pedsendo.org",
  },
  "timeline": {
    organization: "American Academy of Pediatrics (AAP) & FIGO",
    guideline: "AAP Clinical Report: Variations in Adolescent Pubertal Timing & Sexual Maturity Rating (Tanner Staging)",
    year: "2023",
    url: "https://publications.aap.org/pediatrics",
  },
  "maternal-warning-signs": {
    organization: "Centers for Disease Control and Prevention (CDC) & ACOG",
    guideline: "CDC Hear Her® Campaign: Urgent Maternal Warning Signs & Preventing Pregnancy-Related Deaths",
    year: "2023",
    url: "https://www.cdc.gov/hearher",
  },
};

export function ClinicalSourceBanner({ citation }: { citation?: DiagramClinicalSource }) {
  if (!citation) return null;

  return (
    <div className="rounded-2xl border border-emerald-600/25 bg-emerald-50/70 p-3.5 sm:p-4 text-xs font-sans text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
      <div className="flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-[11px] uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300/60">
              Clinical Evidence & Guidelines
            </span>
            {citation.year && (
              <span className="text-[11px] font-semibold text-emerald-700">
                {citation.year}
              </span>
            )}
          </div>
          <p className="font-bold text-emerald-950 text-xs sm:text-[13px] leading-snug m-0">
            {citation.guideline}
          </p>
          <p className="text-[11px] text-emerald-800/90 font-medium m-0">
            Source: <span className="font-semibold">{citation.organization}</span>
          </p>
        </div>
      </div>
      {citation.url && (
        <a
          href={citation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-600/30 hover:border-emerald-600 hover:bg-emerald-100/50 text-emerald-900 font-bold text-xs shrink-0 self-start sm:self-auto transition-colors cursor-pointer shadow-2xs"
        >
          <span>View Source</span>
          <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
        </a>
      )}
    </div>
  );
}

interface InteractiveLessonDiagramProps {
  diagram: LessonDiagram;
  themeColor?: string;
}

export function InteractiveLessonDiagram({ diagram, themeColor = "#175B5C" }: InteractiveLessonDiagramProps) {
  const citation = DIAGRAM_CLINICAL_SOURCES[diagram.type];

  const renderContent = () => {
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
      case "maternal-warning-signs":
        return <MaternalWarningSignsDiagram diagram={diagram} themeColor={themeColor} />;
      case "timeline":
      default:
        return <PubertyTimelineDiagram diagram={diagram} themeColor={themeColor} />;
    }
  };

  return (
    <div className="space-y-3.5">
      {renderContent()}
      <ClinicalSourceBanner citation={citation} />
    </div>
  );
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
// 7. Athlete Fueling Plate & Interactive Nourishment Bowl Builder
// --------------------------------------------------------------------------

function FoodIllustration({ foodId, className }: { foodId: string; className?: string }) {
  const cls = className || "w-full h-full";
  switch (foodId) {
    case "sweet_potato":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={cls}>
          <ellipse cx="32" cy="34" rx="26" ry="16" transform="rotate(-15 32 34)" fill="#C2410C" />
          <ellipse cx="32" cy="34" rx="22" ry="12" transform="rotate(-15 32 34)" fill="#EA580C" />
          <ellipse cx="32" cy="34" rx="17" ry="8" transform="rotate(-15 32 34)" fill="#FB923C" />
          <path d="M 24 22 Q 26 14 30 16" stroke="#FED7AA" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M 34 20 Q 36 12 40 14" stroke="#FED7AA" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        </svg>
      );
    case "quinoa_rice":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={cls}>
          <path d="M 14 30 C 14 48 22 54 32 54 C 42 54 50 48 50 30 Z" fill="#D97706" />
          <ellipse cx="32" cy="30" rx="18" ry="8" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="26" cy="29" r="1.5" fill="#92400E" />
          <circle cx="31" cy="28" r="1.5" fill="#92400E" />
          <circle cx="37" cy="29" r="1.5" fill="#92400E" />
          <circle cx="28" cy="32" r="1.5" fill="#B45309" />
          <circle cx="34" cy="32" r="1.5" fill="#B45309" />
          <path d="M 28 20 Q 26 14 28 10" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          <path d="M 34 18 Q 36 12 34 8" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        </svg>
      );
    case "rolled_oats":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={cls}>
          <path d="M 14 32 C 14 46 22 52 32 52 C 42 52 50 46 50 32 Z" fill="#CA8A04" />
          <ellipse cx="32" cy="32" rx="18" ry="7" fill="#FEF08A" stroke="#A16207" strokeWidth="1.5" />
          <ellipse cx="28" cy="31" rx="4" ry="2" transform="rotate(-20 28 31)" fill="#EAB308" />
          <ellipse cx="35" cy="31" rx="4" ry="2" transform="rotate(30 35 31)" fill="#EAB308" />
          <ellipse cx="31" cy="33" rx="3" ry="1.5" fill="#CA8A04" />
          <path d="M 38 12 L 34 26" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="36" cy="14" rx="3" ry="1.5" transform="rotate(45 36 14)" fill="#EAB308" />
          <ellipse cx="37" cy="18" rx="3" ry="1.5" transform="rotate(-30 37 18)" fill="#EAB308" />
        </svg>
      );
    case "wild_salmon":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={cls}>
          <path d="M 12 34 C 18 22 36 20 48 24 C 54 26 54 36 48 42 C 34 46 20 44 12 34 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.5" />
          <path d="M 22 26 C 26 31 28 39 28 42" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
          <path d="M 31 25 C 35 31 37 38 37 42" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
          <path d="M 40 26 C 43 31 44 38 45 41" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
          <path d="M 38 43 A 10 10 0 0 1 48 43 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        </svg>
      );
    case "pastured_eggs":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={cls}>
          <ellipse cx="26" cy="34" rx="13" ry="17" transform="rotate(-20 26 34)" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M 32 44 C 42 48 52 40 48 28 C 44 20 32 26 32 44 Z" fill="#FFFBEB" stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="41" cy="34" r="8" fill="#F59E0B" />
          <circle cx="39" cy="32" r="2" fill="#FEF3C7" />
        </svg>
      );
    case "edamame_lentils":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={cls}>
          <path d="M 10 38 C 20 20 44 20 54 34 C 42 42 22 46 10 38 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.5" />
          <circle cx="22" cy="33" r="5" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5" />
          <circle cx="33" cy="31" r="5" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5" />
          <circle cx="44" cy="33" r="4.5" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5" />
          <circle cx="28" cy="46" r="3" fill="#D97706" />
          <circle cx="36" cy="47" r="3" fill="#B45309" />
        </svg>
      );
    case "avocado":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={cls}>
          <path d="M 32 10 C 22 10 16 22 16 36 C 16 48 23 54 32 54 C 41 54 48 48 48 36 C 48 22 42 10 32 10 Z" fill="#365314" />
          <path d="M 32 14 C 24 14 20 24 20 36 C 20 46 25 50 32 50 C 39 50 44 46 44 36 C 44 24 40 14 32 14 Z" fill="#84CC16" />
          <path d="M 32 20 C 27 20 24 28 24 37 C 24 44 27 47 32 47 C 37 47 40 44 40 37 C 40 28 37 20 32 20 Z" fill="#BEF264" />
          <circle cx="32" cy="38" r="9" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
          <circle cx="30" cy="36" r="2.5" fill="#92400E" />
        </svg>
      );
    case "walnuts_chia":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={cls}>
          <path d="M 28 16 C 18 18 14 28 14 38 C 14 48 22 52 30 52 C 34 52 36 46 36 34 C 36 22 34 16 28 16 Z" fill="#A16207" stroke="#713F12" strokeWidth="1.5" />
          <path d="M 22 24 C 20 30 26 34 22 42" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
          <path d="M 26 22 C 28 28 28 36 28 44" stroke="#713F12" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="44" cy="26" r="2" fill="#1E293B" />
          <circle cx="48" cy="32" r="2" fill="#334155" />
          <circle cx="43" cy="38" r="2" fill="#1E293B" />
          <circle cx="47" cy="44" r="2" fill="#334155" />
        </svg>
      );
    case "olive_oil":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={cls}>
          <path d="M 28 12 L 36 12 L 36 18 L 44 24 L 44 50 C 44 53 41 54 38 54 L 26 54 C 23 54 20 53 20 50 L 20 24 L 28 18 Z" fill="#65A30D" opacity="0.3" stroke="#4D7C0F" strokeWidth="2" />
          <path d="M 22 32 L 42 32 L 42 50 C 42 52 40 52 38 52 L 26 52 C 24 52 22 52 22 50 Z" fill="#EAB308" opacity="0.85" />
          <path d="M 32 38 C 30 42 28 44 32 46 C 36 44 34 42 32 38 Z" fill="#FACC15" />
          <rect x="29" y="8" width="6" height="4" rx="1" fill="#78350F" />
        </svg>
      );
    case "spinach_kale":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={cls}>
          <path d="M 18 48 C 12 36 16 18 32 14 C 44 20 46 36 40 48 C 34 44 26 44 18 48 Z" fill="#15803D" stroke="#166534" strokeWidth="1.5" />
          <path d="M 30 18 L 28 52" stroke="#86EFAC" strokeWidth="2" strokeLinecap="round" />
          <path d="M 29 28 Q 36 26 38 29" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 29 36 Q 22 34 20 37" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 28 42 Q 35 40 37 43" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "wild_berries":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={cls}>
          <path d="M 32 14 C 40 12 46 16 46 24 C 38 24 34 20 32 14 Z" fill="#16A34A" />
          <circle cx="25" cy="30" r="10" fill="#1E3A8A" stroke="#172554" strokeWidth="1.5" />
          <circle cx="23" cy="27" r="2.5" fill="#60A5FA" opacity="0.6" />
          <circle cx="39" cy="28" r="9.5" fill="#4C1D95" stroke="#2E1065" strokeWidth="1.5" />
          <circle cx="37" cy="25" r="2.5" fill="#A78BFA" opacity="0.6" />
          <circle cx="32" cy="42" r="10" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="1.5" />
          <circle cx="30" cy="39" r="2.5" fill="#93C5FD" opacity="0.6" />
        </svg>
      );
    case "bell_peppers":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={cls}>
          <path d="M 32 12 Q 34 8 38 8" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <path d="M 20 22 C 20 18 26 18 32 20 C 38 18 44 18 44 22 C 48 30 46 48 38 52 C 34 54 30 54 26 52 C 18 48 16 30 20 22 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
          <path d="M 28 22 C 26 30 26 42 29 52" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
          <path d="M 36 22 C 38 30 38 42 35 52" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" className={cls}>
          <circle cx="32" cy="32" r="24" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
        </svg>
      );
  }
}

interface BowlFoodItem {
  id: string;
  name: string;
  category: "carbs" | "protein" | "fats" | "colors";
  categoryLabel: string;
  badgeClass: string;
  nutrients: string;
  athleticBenefit: string;
  femaleBodyBenefit: string;
  clinicalFact: string;
}

const ATHLETE_BOWL_FOODS: BowlFoodItem[] = [
  {
    id: "sweet_potato",
    name: "Roasted Sweet Potato",
    category: "carbs",
    categoryLabel: "Complex Power Carb",
    badgeClass: "bg-amber-100 text-amber-900 border-amber-300",
    nutrients: "Beta-Carotene · Slow-Burn Starches · Potassium · Vitamin B6",
    athleticBenefit: "Provides sustained muscular glycogen replenishment and steady blood glucose without post-meal fatigue or stomach cramps.",
    femaleBodyBenefit: "Carbohydrate availability keeps kisspeptin neurons firing in the brain. If female athletes restrict carbs, kisspeptin goes dormant, shutting off GnRH and halting menstrual cycles.",
    clinicalFact: "Sports endocrinology consensus confirms carbohydrate intake >4g/kg/day is the #1 protector against athletic amenorrhea.",
  },
  {
    id: "quinoa_rice",
    name: "Quinoa & Brown Rice Blend",
    category: "carbs",
    categoryLabel: "Glycogen & Mineral Carb",
    badgeClass: "bg-amber-100 text-amber-900 border-amber-300",
    nutrients: "All 9 Essential Amino Acids · Magnesium · Iron · Fiber",
    athleticBenefit: "Refills liver and muscle glycogen post-workout to turn off exercise-induced cortisol spikes.",
    femaleBodyBenefit: "Magnesium relaxes uterine smooth muscle, reducing the intensity of premenstrual cramps and soothing anxiety during the luteal phase.",
    clinicalFact: "Magnesium deficiency affects up to 45% of young female athletes, directly correlating with heightened menstrual cramping.",
  },
  {
    id: "rolled_oats",
    name: "Steel-Cut Rolled Oats",
    category: "carbs",
    categoryLabel: "Slow-Burn Energy",
    badgeClass: "bg-amber-100 text-amber-900 border-amber-300",
    nutrients: "Beta-Glucan Soluble Fiber · B-Complex · Zinc · Iron",
    athleticBenefit: "Stabilizes pre-competition stamina and prevents mid-workout hypoglycemic crashes.",
    femaleBodyBenefit: "Soluble fiber binds un-metabolized estrogen in the gut, ensuring healthy hormonal clearance and preventing estrogen dominance symptoms.",
    clinicalFact: "Dietary fiber supports healthy liver phase II estrogen elimination, keeping menstrual cycles predictable.",
  },
  {
    id: "wild_salmon",
    name: "Wild Sockeye Salmon",
    category: "protein",
    categoryLabel: "Anti-Inflammatory Protein",
    badgeClass: "bg-rose-100 text-rose-900 border-rose-300",
    nutrients: "Omega-3 (EPA/DHA) · Leucine · Vitamin D3 · Selenium",
    athleticBenefit: "Accelerates muscle protein synthesis (MPS) and clears exercise-induced joint and muscular inflammation.",
    femaleBodyBenefit: "EPA and DHA synthesize resolving E-series prostaglandins that directly suppress inflammatory PGF2α, cutting menstrual cramps and protecting ligament stability.",
    clinicalFact: "Studies show dietary Omega-3 supplementation reduces menstrual pain severity by over 40% in competitive athletes.",
  },
  {
    id: "pastured_eggs",
    name: "Pasture-Raised Eggs",
    category: "protein",
    categoryLabel: "Hormone-Building Protein",
    badgeClass: "bg-rose-100 text-rose-900 border-rose-300",
    nutrients: "Choline · Complete Bioavailable Protein · Vitamin D · Iron",
    athleticBenefit: "Leucine triggers immediate muscle recovery, while choline maintains neuromuscular signaling and sprint reaction time.",
    femaleBodyBenefit: "Egg yolks provide dietary cholesterol, the indispensable chemical substrate your ovaries use to synthesize estrogen and progesterone.",
    clinicalFact: "Severely fat-free, protein-deficient diets starve ovarian follicular cells of the cholesterol needed for normal ovulation.",
  },
  {
    id: "edamame_lentils",
    name: "Steamed Edamame & Lentils",
    category: "protein",
    categoryLabel: "Plant Iron & Phyto-Nutrients",
    badgeClass: "bg-rose-100 text-rose-900 border-rose-300",
    nutrients: "Plant Protein · Folate · Non-Heme Iron · Isoflavones",
    athleticBenefit: "Sustained amino acid release for long-distance training and aerobic stamina.",
    femaleBodyBenefit: "Restores red blood cell hemoglobin depleted by menstrual bleeding, and natural plant isoflavones gently modulate estrogen receptor sensitivity.",
    clinicalFact: "Menstruating athletes lose 15–40 mg of iron each cycle; plant legumes paired with vitamin C prevent sports anemia.",
  },
  {
    id: "avocado",
    name: "Fresh Sliced Avocado",
    category: "fats",
    categoryLabel: "Hormone Precursor Fat",
    badgeClass: "bg-lime-100 text-lime-900 border-lime-300",
    nutrients: "Monounsaturated Oleic Acid · Potassium · Folate · Vitamin E",
    athleticBenefit: "Slows gastric emptying to provide an enduring secondary energy reservoir for long tournaments and multi-hour workouts.",
    femaleBodyBenefit: "Monounsaturated fats cushion the pelvic organs and build healthy lipid cell membranes for hormone synthesis, protecting cycle regularity.",
    clinicalFact: "Low dietary fat intake (<20% of calories) is a primary trigger for hypothalamic menstrual irregularities in competitive athletes.",
  },
  {
    id: "walnuts_chia",
    name: "Walnuts & Chia Seeds",
    category: "fats",
    categoryLabel: "Essential Fatty Acids",
    badgeClass: "bg-lime-100 text-lime-900 border-lime-300",
    nutrients: "Alpha-Linolenic Acid (ALA) · Magnesium · Zinc · Lignans",
    athleticBenefit: "Cushions joints, protects against bone stress micro-fractures, and speeds tendon/ligament collagen remodeling.",
    femaleBodyBenefit: "Zinc supports follicle development in the ovaries, promoting healthy ovulation and boosting natural progesterone in the luteal phase.",
    clinicalFact: "Zinc is a critical co-factor in ovulation; adequate intake prevents luteal phase defects and irregular cycles.",
  },
  {
    id: "olive_oil",
    name: "Extra Virgin Olive Oil",
    category: "fats",
    categoryLabel: "Cellular Recovery Oil",
    badgeClass: "bg-lime-100 text-lime-900 border-lime-300",
    nutrients: "Oleocanthal · Vitamin E · Polyphenols · Squalene",
    athleticBenefit: "Acts as a natural anti-inflammatory agent (oleocanthal mimics low-dose ibuprofen) without stressing the stomach lining.",
    femaleBodyBenefit: "Protects vascular endothelial cells, maintaining healthy blood flow to the uterus and ovaries for nutrient delivery.",
    clinicalFact: "EVOO polyphenols protect ovarian granulosa cells from oxidative stress during intense athletic training blocks.",
  },
  {
    id: "spinach_kale",
    name: "Dark Baby Spinach & Kale",
    category: "colors",
    categoryLabel: "Blood & Bone Greens",
    badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-300",
    nutrients: "Non-Heme Iron · Calcium · Vitamin K1 · Folate",
    athleticBenefit: "Maximizes oxygen-carrying capacity in red blood cells to elevate VO2 max and eliminate heavy-legged fatigue.",
    femaleBodyBenefit: "Vitamin K1 and calcium deposit minerals into bones, counteracting stress fractures, while iron directly replaces menstrual blood loss.",
    clinicalFact: "Female athletes have 3x higher iron deficiency rates than male athletes due to menstrual losses and foot-strike hemolysis.",
  },
  {
    id: "wild_berries",
    name: "Wild Blueberries & Cherries",
    category: "colors",
    categoryLabel: "Antioxidant Muscle Shield",
    badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-300",
    nutrients: "Anthocyanins · Polyphenols · Natural Melatonin · Quercetin",
    athleticBenefit: "Dramatically lowers delayed-onset muscle soreness (DOMS) and accelerates cellular repair between double sessions.",
    femaleBodyBenefit: "Natural melatonin improves restorative deep sleep, triggering the nocturnal pulse of growth hormone that balances cortisol and progesterone.",
    clinicalFact: "Tart cherry polyphenols significantly decrease inflammatory cytokine IL-6 after high-intensity athletic trials.",
  },
  {
    id: "bell_peppers",
    name: "Sweet Bell Peppers & Citrus",
    category: "colors",
    categoryLabel: "Iron Booster & Collagen",
    badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-300",
    nutrients: "Vitamin C (Ascorbic Acid) · Bioflavonoids · Lycopene",
    athleticBenefit: "Stimulates procollagen synthesis to reinforce the ACL, Achilles tendon, and patellar ligaments against athletic tears.",
    femaleBodyBenefit: "Triples the absorption of plant-based (non-heme) iron in your gut, preventing the fatigue, dizziness, and cycle irregularities of sports anemia.",
    clinicalFact: "Consuming 75mg of Vitamin C with plant meals increases non-heme iron absorption by nearly 300%.",
  },
];

function AthletePlateDiagram({ diagram }: { diagram: LessonDiagram; themeColor: string }) {
  const [viewMode, setViewMode] = useState<"bowl" | "plate">("bowl");
  const [dayType, setDayType] = useState<"easy" | "moderate" | "hard" | "pregame" | "postgame">("moderate");

  // Nourishment Bowl State — starts empty as an interactive game!
  const [bowlItems, setBowlItems] = useState<string[]>([]);
  const [selectedFoodId, setSelectedFoodId] = useState<string>("");
  const [pantryFilter, setPantryFilter] = useState<"all" | "carbs" | "protein" | "fats" | "colors">("all");
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const addFoodToBowl = (foodId: string) => {
    if (!bowlItems.includes(foodId)) {
      setBowlItems((prev) => [...prev, foodId]);
    }
    setSelectedFoodId(foodId);
  };

  const removeFoodFromBowl = (foodId: string) => {
    setBowlItems((prev) => prev.filter((id) => id !== foodId));
    if (selectedFoodId === foodId) {
      const remaining = bowlItems.filter((id) => id !== foodId);
      setSelectedFoodId(remaining[remaining.length - 1] || "");
    }
  };

  const loadPreset = (preset: "pregame" | "postgame" | "cramp") => {
    if (preset === "pregame") {
      setBowlItems(["sweet_potato", "pastured_eggs", "wild_berries", "bell_peppers"]);
      setSelectedFoodId("sweet_potato");
    } else if (preset === "postgame") {
      setBowlItems(["wild_salmon", "quinoa_rice", "avocado", "spinach_kale"]);
      setSelectedFoodId("wild_salmon");
    } else {
      setBowlItems(["rolled_oats", "edamame_lentils", "walnuts_chia", "bell_peppers"]);
      setSelectedFoodId("walnuts_chia");
    }
  };

  const selectedFood = ATHLETE_BOWL_FOODS.find((f) => f.id === selectedFoodId) || null;
  const carbsCount = bowlItems.filter((id) => ATHLETE_BOWL_FOODS.find((f) => f.id === id)?.category === "carbs").length;
  const proteinCount = bowlItems.filter((id) => ATHLETE_BOWL_FOODS.find((f) => f.id === id)?.category === "protein").length;
  const fatsCount = bowlItems.filter((id) => ATHLETE_BOWL_FOODS.find((f) => f.id === id)?.category === "fats").length;
  const colorsCount = bowlItems.filter((id) => ATHLETE_BOWL_FOODS.find((f) => f.id === id)?.category === "colors").length;
  const isFullyBalanced = carbsCount > 0 && proteinCount > 0 && fatsCount > 0 && colorsCount > 0;

  const plateConfigs = {
    easy: {
      title: "Easy Training / Rest & Recovery Day",
      subtitle: "Focus on cellular repair, anti-inflammatory colors, and light mobility.",
      timingBadge: "Rest & Active Recovery · Anti-Inflammatory Baseline",
      carbs: "25% Plate (Complex Carbs)",
      carbDetail: "Whole grains, sweet potato, oats, brown rice for steady basal glycogen.",
      protein: "25% Plate (Lean Protein)",
      proteinDetail: "Eggs, tofu, chicken, lentils, Greek yogurt to rebuild muscle tissue.",
      colors: "50% Plate (Colorful Fruits & Veggies)",
      colorDetail: "Berries, leafy greens, peppers, carrots packed with antioxidants.",
      fluids: "Water + herbal teas throughout the day.",
      hormoneImpact: "Gives your digestive tract rest while maintaining stable resting blood sugar and thyroid function.",
      actionTip: "Even on rest days, under-eating stalls recovery and suppresses nighttime growth hormone.",
    },
    moderate: {
      title: "Moderate Training Day (60–90 Minutes Practice)",
      subtitle: "Balanced fuel maintaining normal ovulatory cycles and athletic energy.",
      timingBadge: "60–90 Min Practice · Baseline Training Fuel",
      carbs: "35% Plate (Performance Carbs)",
      carbDetail: "Oats, pasta, quinoa, sourdough, banana for muscle glycogen tops.",
      protein: "30% Plate (Lean Protein)",
      proteinDetail: "25–30g of protein every 3–4 hours for steady muscle synthesis.",
      colors: "35% Plate (Veggies & Fruits)",
      colorDetail: "Spinach (iron!), broccoli, citrus (vitamin C increases iron absorption).",
      fluids: "Electrolyte water before, during, and right after practice.",
      hormoneImpact: "Prevents cortisol spikes and keeps kisspeptin (the brain's period switch) happy.",
      actionTip: "Fuel consistently before practice to prevent reaching into deep energy deficits.",
    },
    hard: {
      title: "Hard Training Day / Double Sessions",
      subtitle: "High energy availability prioritizing continuous carbohydrate replenishment.",
      timingBadge: "High Intensity / Tournaments · Max Glycogen Loading",
      carbs: "50% Plate (High-Octane Carbs)",
      carbDetail: "Rice, potatoes, bagels, pasta. Essential to prevent RED-S and bone loss.",
      protein: "25% Plate (Recovery Protein)",
      proteinDetail: "Protein snack within 30–45 mins of training to turn off muscle breakdown.",
      colors: "25% Plate (Cooked Veggies & Berries)",
      colorDetail: "Gentle cooked veggies that digest easily before high-intensity sprints.",
      fluids: "Carbohydrate + electrolyte sports drink during active sweating.",
      hormoneImpact: "CRITICAL: Under-fueling on hard training days stops periods within just 5 days.",
      actionTip: "Do not fear carbohydrates! Active female athletes burn carbs 2x faster during high-intensity intervals.",
    },
    pregame: {
      title: "Pre-Game Energy Primer (2–4 Hours Before)",
      subtitle: "Easily digestible carbs to top off glycogen, moderate lean protein, low fat & low fiber to prevent GI cramping.",
      timingBadge: "2–4h Before Kickoff / Race · Pre-Competition Primer",
      carbs: "60% Plate (Easily Digestible Carbs)",
      carbDetail: "White rice, pasta, oatmeal with honey, sourdough toast with jam, bagel, pretzels, banana. Rapidly fills glycogen with zero sluggishness.",
      protein: "20% Plate (Lean & Light Protein)",
      proteinDetail: "Egg whites, grilled chicken breast, low-fat Greek yogurt, light tofu. Keeps blood amino acids stable without slowing gastric emptying.",
      colors: "20% Plate (Low-Fiber Produce & Fluids)",
      colorDetail: "Ripe bananas, peeled applesauce, melons, blueberries. (Avoid high-fiber beans, broccoli, or greasy fries that cause stomach cramps/nausea during sprints).",
      fluids: "16–20 oz electrolyte water 2–3 hours pre-game, plus 6–8 oz 15 mins before warm-ups.",
      hormoneImpact: "Prevents acute hypoglycemia (in-game sugar crashes) and keeps fight-or-flight cortisol in a calm, focused athletic zone.",
      actionTip: "Rule of thumb: The closer you get to game time, the simpler and smaller the carbohydrates should be (e.g. half a banana or dates 30m out)!",
    },
    postgame: {
      title: "Post-Game Recovery Plate (30–45m Window & Meal)",
      subtitle: "Capitalize on high insulin sensitivity to restock glycogen 2x faster, shut off muscle breakdown, and soothe inflammation.",
      timingBadge: "0–45m Recovery Window + Full Meal Within 2h",
      carbs: "45% Plate (Glycogen Reload Carbs)",
      carbDetail: "Roasted potatoes, rice, pasta, chocolate milk, quinoa, fruit. Rapidly refills exhausted muscle and liver glycogen stores before enzymatic windows close.",
      protein: "35% Plate (Muscle Repair Protein — 25–30g)",
      proteinDetail: "Salmon, chicken, tofu, eggs, Greek yogurt, or protein shake. Supplies leucine to stimulate rapid muscle protein synthesis (MPS).",
      colors: "20% Plate (Anti-Inflammatory Deep Colors)",
      colorDetail: "Tart cherry juice, blueberries, dark leafy spinach, beets. Rich in anthocyanins and polyphenols to accelerate muscle repair and clear lactate.",
      fluids: "16–24 oz fluid for every pound lost in sweat + sodium electrolytes to restore blood plasma volume.",
      hormoneImpact: "CRITICAL: Post-game fueling shuts down cortisol and signals to the brain's hypothalamus that energy stores are secure, safeguarding your menstrual cycle.",
      actionTip: "Your muscle cells are like dry sponges right after a game. Waiting more than 2 hours cuts glycogen replenishment rate by 50%!",
    },
  };

  const config = plateConfigs[dayType];

  const getSlicePath = (startDeg: number, endDeg: number, r = 82) => {
    const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
    const x1 = 100 + r * Math.cos(rad(startDeg));
    const y1 = 100 + r * Math.sin(rad(startDeg));
    const x2 = 100 + r * Math.cos(rad(endDeg));
    const y2 = 100 + r * Math.sin(rad(endDeg));
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M 100 100 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
  };

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md p-3 sm:p-6 md:p-8 flex flex-col items-center justify-start animate-in fade-in duration-200"
          : "rounded-2xl border-2 border-coral/30 bg-white p-4 md:p-5 shadow-sm space-y-4"
      }
    >
      <div className={isFullscreen ? "max-w-6xl w-full bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-coral/40 space-y-6 my-auto" : "space-y-4 w-full"}>
        {/* Header & Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-coral/15 pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-coral font-sans">
              <Zap className="w-3.5 h-3.5 text-coral" />
              Athlete Nutrition &amp; Hormone Fueling
            </div>
            <h4 className="text-base md:text-xl font-serif font-bold text-deep-teal mt-0.5">
              {viewMode === "bowl"
                ? "Interactive Athlete Fuel Bowl Studio"
                : diagram.title}
            </h4>
          </div>

          {/* View Mode Switcher & Fullscreen Game Toggle */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode("bowl")}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 font-sans ${
                  viewMode === "bowl"
                    ? "bg-coral text-white shadow-xs"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                <span>Fuel Bowl Studio</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("plate")}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 font-sans ${
                  viewMode === "plate"
                    ? "bg-deep-teal text-white shadow-xs"
                    : "text-charcoal/70 hover:text-charcoal"
                }`}
              >
                <span>5-Stage Athlete Plate</span>
              </button>
            </div>

            {viewMode === "bowl" && (
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs transition-all flex items-center gap-1.5 font-sans border border-amber-300 shadow-2xs"
                title={isFullscreen ? "Exit Fullscreen View" : "Expand to Fullscreen View"}
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5 text-amber-900" />
                    <span>Exit Fullscreen</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5 text-amber-900" />
                    <span>Fullscreen View</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            MODE 1: NOURISHMENT BOWL BUILDER (DRAG & DROP / TAP-TO-ADD)
           ========================================================================= */}
        {viewMode === "bowl" && (
          <div className="space-y-4 sm:space-y-5">
            {/* Top Explainer with Clear Instruction Label */}
            <div className="rounded-2xl border-2 border-coral/30 bg-gradient-to-r from-coral/15 via-amber-50/70 to-teal-50/50 p-4 sm:p-5 shadow-xs space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-coral text-white text-xs font-extrabold uppercase tracking-wider font-sans shadow-xs">
                  Instructions:
                </span>
                <h5 className="font-serif font-bold text-base sm:text-lg text-deep-teal m-0">
                  Interactive Food Drag &amp; Drop Studio
                </h5>
              </div>
              <p className="text-xs sm:text-sm text-charcoal/90 leading-relaxed font-sans m-0">
                Drag nutrient-dense foods into your bowl (or tap to add) to discover what each ingredient does for your{" "}
                <strong className="text-deep-teal font-semibold">athletic performance</strong>,{" "}
                <strong className="text-coral font-semibold">estrogen &amp; progesterone synthesis</strong>, and{" "}
                <strong className="text-emerald-800 font-semibold">bone density protection</strong>.
              </p>
            </div>

            {/* Presets & Prominent BIG Reset Bowl Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-charcoal/80 text-xs sm:text-sm font-sans">Sample Bowls:</span>
                <button
                  type="button"
                  onClick={() => loadPreset("pregame")}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-amber-50 text-amber-950 border border-amber-300 text-xs font-bold transition-all shadow-xs"
                >
                  Pre-Game
                </button>
                <button
                  type="button"
                  onClick={() => loadPreset("postgame")}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 border border-emerald-300 text-xs font-bold transition-all shadow-xs"
                >
                  Post-Game
                </button>
                <button
                  type="button"
                  onClick={() => loadPreset("cramp")}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-rose-950 border border-rose-300 text-xs font-bold transition-all shadow-xs"
                >
                  Recovery &amp; Hormones
                </button>
              </div>

              {/* Prominent BIG Reset Bowl Button */}
              <button
                type="button"
                onClick={() => {
                  setBowlItems([]);
                  setSelectedFoodId("");
                }}
                disabled={bowlItems.length === 0}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 font-sans shadow-sm ${
                  bowlItems.length > 0
                    ? "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer hover:scale-105 active:scale-95 shadow-md ring-2 ring-rose-300"
                    : "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed"
                }`}
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset Bowl</span>
              </button>
            </div>

            {/* The Bowl Drop Zone Canvas */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingOver(true);
              }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingOver(false);
                const foodId = e.dataTransfer.getData("text/plain");
                if (foodId) addFoodToBowl(foodId);
              }}
              className={`relative rounded-3xl p-6 sm:p-8 transition-all border-3 text-center flex flex-col items-center justify-center min-h-[360px] sm:min-h-[420px] shadow-sm ${
                isDraggingOver
                  ? "border-emerald-500 bg-emerald-50/90 ring-8 ring-emerald-400/30 scale-[1.01]"
                  : "border-deep-teal/25 bg-gradient-to-b from-[#F5FAF8] via-white to-amber-50/40"
              }`}
            >
              {/* Secondary Reset Button in Top-Right when foods are in the bowl */}
              {bowlItems.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setBowlItems([]);
                    setSelectedFoodId("");
                  }}
                  className="absolute top-4 right-4 z-20 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm bg-white/95 hover:bg-rose-50 text-rose-700 border-2 border-rose-300 shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
                  title="Empty all foods from the bowl"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Bowl</span>
                </button>
              )}

              {/* Ceramic Bowl Graphic Backdrop */}
              <div className="relative w-full max-w-xl sm:max-w-2xl flex flex-col items-center">
                {/* Large Bowl Illustration SVG */}
                <div className="relative w-full h-56 sm:h-68 max-w-lg sm:max-w-xl">
                  <svg viewBox="0 0 440 220" className="w-full h-full drop-shadow-xl select-none">
                    <defs>
                      <linearGradient id="bowlExteriorLarge" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="45%" stopColor="#F8FAFC" />
                        <stop offset="85%" stopColor="#E2E8F0" />
                        <stop offset="100%" stopColor="#94A3B8" />
                      </linearGradient>
                      <linearGradient id="bowlInteriorLarge" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFFDF9" />
                        <stop offset="60%" stopColor="#FDF4E7" />
                        <stop offset="100%" stopColor="#F8E5CE" />
                      </linearGradient>
                      <radialGradient id="soupDepth" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#D97706" stopOpacity="0.15" />
                      </radialGradient>
                    </defs>

                    {/* Exterior Bowl Body */}
                    <path
                      d="M 28 65 C 40 185, 120 215, 220 215 C 320 215, 400 185, 412 65 Z"
                      fill="url(#bowlExteriorLarge)"
                      stroke="#64748B"
                      strokeWidth="3.5"
                    />
                    {/* Bowl Base Ring & Shadow */}
                    <ellipse cx="220" cy="214" rx="88" ry="10" fill="#475569" opacity="0.4" />
                    <ellipse cx="220" cy="211" rx="82" ry="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />

                    {/* Interior Cavity */}
                    <ellipse cx="220" cy="65" rx="192" ry="36" fill="url(#bowlInteriorLarge)" stroke="#CBD5E1" strokeWidth="3" />
                    {/* Inner Depth & Warmth */}
                    <ellipse cx="220" cy="72" rx="175" ry="28" fill="url(#soupDepth)" />

                    {/* Ceramic Rim Highlight */}
                    <ellipse cx="220" cy="64" rx="190" ry="34" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />

                    {/* Wooden Serving Utensil Accent on Rim */}
                    <g transform="translate(325, 28) rotate(24)">
                      <rect x="0" y="0" width="10" height="95" rx="4" fill="#92400E" opacity="0.9" />
                      <ellipse cx="5" cy="100" rx="16" ry="22" fill="#B45309" opacity="0.95" />
                    </g>
                    <g transform="translate(340, 20) rotate(18)">
                      <rect x="0" y="0" width="4" height="110" rx="2" fill="#78350F" opacity="0.8" />
                    </g>
                  </svg>

                  {/* Ingredients Inside the Bowl */}
                  <div className="absolute inset-0 pt-7 sm:pt-9 px-6 sm:px-10 pb-4 flex flex-wrap items-center justify-center gap-2 overflow-y-auto z-10 custom-scrollbar max-h-48 sm:max-h-60">
                    {bowlItems.length === 0 ? (
                      <div className="text-center space-y-2 py-3 animate-in fade-in duration-300">
                        <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-500 shadow-inner">
                          <RotateCcw className="w-5 h-5 text-deep-teal/60" />
                        </div>
                        <div className="space-y-0.5">
                          <h6 className="text-sm sm:text-base font-serif font-bold text-deep-teal m-0">
                            Bowl is Empty
                          </h6>
                          <p className="text-xs text-charcoal/70 font-sans max-w-xs sm:max-w-sm mx-auto m-0">
                            Select or drag foods below to add them to your bowl.
                          </p>
                        </div>
                      </div>
                    ) : (
                      bowlItems.map((foodId) => {
                        const food = ATHLETE_BOWL_FOODS.find((f) => f.id === foodId);
                        if (!food) return null;
                        const isSelected = selectedFoodId === food.id;

                        return (
                          <button
                            key={food.id}
                            type="button"
                            onClick={() => setSelectedFoodId(food.id)}
                            className={`group relative inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md animate-in zoom-in-75 font-sans ${
                              isSelected
                                ? "bg-deep-teal text-white ring-4 ring-coral scale-105 shadow-lg"
                                : "bg-white text-charcoal hover:bg-slate-50 hover:scale-105 border-2 border-slate-300"
                            }`}
                          >
                            <div className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0">
                              <FoodIllustration foodId={food.id} />
                            </div>
                            <span className="block leading-tight font-bold">{food.name}</span>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFoodFromBowl(food.id);
                              }}
                              className="ml-1 w-5 h-5 rounded-full flex items-center justify-center bg-black/10 hover:bg-rose-500 hover:text-white transition-colors text-xs font-black"
                              title="Remove"
                            >
                              ×
                            </span>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              <span className="text-xs font-semibold text-charcoal/70 mt-3 block font-sans">
                {isDraggingOver
                  ? "Drop food into your bowl"
                  : bowlItems.length === 0
                  ? "Bowl is empty. Choose foods from the pantry below."
                  : `${bowlItems.length} foods added. Click any food to view benefits.`}
              </span>
            </div>

            {/* 4-Pillar Bowl Balance Meter */}
            <div className="rounded-2xl border border-deep-teal/15 bg-white p-3 sm:p-4 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-deep-teal font-sans">
                  4-Pillar Balance Meter:
                </span>
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full font-sans ${
                    isFullyBalanced
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                      : "bg-slate-100 text-charcoal/70"
                  }`}
                >
                  {isFullyBalanced ? "Fully Balanced" : `${(carbsCount > 0 ? 1 : 0) + (proteinCount > 0 ? 1 : 0) + (fatsCount > 0 ? 1 : 0) + (colorsCount > 0 ? 1 : 0)} / 4 Pillars Added`}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans">
                <div
                  className={`p-2 rounded-xl border flex items-center justify-between ${
                    carbsCount > 0 ? "bg-amber-50 border-amber-300 text-amber-950 font-bold" : "bg-slate-50 border-slate-200 text-charcoal/60"
                  }`}
                >
                  <span>Carbs ({carbsCount})</span>
                  <span className="text-[10.5px]">{carbsCount > 0 ? "Added" : "Missing"}</span>
                </div>
                <div
                  className={`p-2 rounded-xl border flex items-center justify-between ${
                    proteinCount > 0 ? "bg-rose-50 border-rose-300 text-rose-950 font-bold" : "bg-slate-50 border-slate-200 text-charcoal/60"
                  }`}
                >
                  <span>Protein ({proteinCount})</span>
                  <span className="text-[10.5px]">{proteinCount > 0 ? "Added" : "Missing"}</span>
                </div>
                <div
                  className={`p-2 rounded-xl border flex items-center justify-between ${
                    fatsCount > 0 ? "bg-lime-50 border-lime-300 text-lime-950 font-bold" : "bg-slate-50 border-slate-200 text-charcoal/60"
                  }`}
                >
                  <span>Healthy Fats ({fatsCount})</span>
                  <span className="text-[10.5px]">{fatsCount > 0 ? "Added" : "Missing"}</span>
                </div>
                <div
                  className={`p-2 rounded-xl border flex items-center justify-between ${
                    colorsCount > 0 ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold" : "bg-slate-50 border-slate-200 text-charcoal/60"
                  }`}
                >
                  <span>Produce ({colorsCount})</span>
                  <span className="text-[10.5px]">{colorsCount > 0 ? "Added" : "Missing"}</span>
                </div>
              </div>

              {isFullyBalanced && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-950 font-sans flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Balanced Fueling:</strong> Contains carbohydrates, protein, healthy fats, and produce.</span>
                </div>
              )}
            </div>

            {/* Selected Food Benefits Breakdown */}
            {selectedFood && (
              <div className="rounded-2xl border-2 border-coral/30 bg-gradient-to-br from-rose-50/50 via-white to-amber-50/30 p-4 sm:p-5 space-y-3 shadow-xs animate-in fade-in">
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-coral/15 pb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 p-1.5 flex-shrink-0 shadow-xs">
                      <FoodIllustration foodId={selectedFood.id} />
                    </div>
                    <div>
                      <span className="block text-base sm:text-lg font-serif font-bold text-deep-teal">
                        {selectedFood.name}
                      </span>
                      <span className="text-[11px] font-bold text-charcoal/70 font-sans">
                        {selectedFood.nutrients}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border font-sans ${selectedFood.badgeClass}`}>
                      {selectedFood.categoryLabel}
                    </span>
                    {bowlItems.includes(selectedFood.id) ? (
                      <button
                        type="button"
                        onClick={() => removeFoodFromBowl(selectedFood.id)}
                        className="text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1 rounded-full font-sans"
                      >
                        Remove from Bowl
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => addFoodToBowl(selectedFood.id)}
                        className="text-xs font-bold text-white bg-coral hover:bg-coral/90 px-3.5 py-1 rounded-full shadow-2xs font-sans"
                      >
                        + Add to Bowl
                      </button>
                    )}
                  </div>
                </div>

                {/* 2-Column Benefits Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-sans">
                  {/* Athletic Performance */}
                  <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 space-y-1">
                    <span className="font-bold text-amber-950 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                      <Zap className="w-3.5 h-3.5 text-amber-600" />
                      Athletic Performance Benefit:
                    </span>
                    <p className="text-charcoal/85 leading-relaxed m-0 text-xs sm:text-sm">
                      {selectedFood.athleticBenefit}
                    </p>
                  </div>

                  {/* Female Body & Hormonal Impact */}
                  <div className="rounded-xl border border-coral/30 bg-rose-50/70 p-3 space-y-1">
                    <span className="font-bold text-[#B83F68] flex items-center gap-1.5 text-xs uppercase tracking-wider">
                      <Heart className="w-3.5 h-3.5 text-[#B83F68]" />
                      Female Body Benefit:
                    </span>
                    <p className="text-charcoal/85 leading-relaxed m-0 text-xs sm:text-sm">
                      {selectedFood.femaleBodyBenefit}
                    </p>
                  </div>
                </div>

                {/* Clinical Fact Note */}
                <div className="rounded-xl border border-deep-teal/15 bg-light-teal/40 p-2.5 text-xs text-deep-teal font-sans leading-relaxed flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-deep-teal shrink-0 mt-0.5" />
                  <span>
                    <strong>Clinical &amp; Sports Nutrition Fact:</strong> {selectedFood.clinicalFact}
                  </span>
                </div>
              </div>
            )}

            {/* Food Pantry Shelf */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                <div>
                  <span className="text-sm sm:text-base font-bold text-charcoal font-sans">
                    Food Pantry
                  </span>
                </div>
                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 text-xs font-sans overflow-x-auto pb-1">
                  {[
                    { id: "all", label: "All (12)" },
                    { id: "carbs", label: "Carbs (3)" },
                    { id: "protein", label: "Protein (3)" },
                    { id: "fats", label: "Healthy Fats (3)" },
                    { id: "colors", label: "Produce (3)" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setPantryFilter(f.id as typeof pantryFilter)}
                      className={`px-3 py-1 rounded-xl font-bold transition-all ${
                        pantryFilter === f.id
                          ? "bg-deep-teal text-white shadow-xs scale-105"
                          : "bg-slate-100 text-charcoal/75 hover:bg-slate-200"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pantry Grid of Foods: BIG GAME CARDS WITH VECTOR ILLUSTRATIONS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {ATHLETE_BOWL_FOODS.filter((item) => pantryFilter === "all" || item.category === pantryFilter).map((food) => {
                  const inBowl = bowlItems.includes(food.id);
                  const isSelected = selectedFoodId === food.id;

                  return (
                    <div
                      key={food.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", food.id);
                      }}
                      onClick={() => {
                        if (!inBowl) addFoodToBowl(food.id);
                        setSelectedFoodId(food.id);
                      }}
                      className={`group relative rounded-3xl border-2 p-3 sm:p-4 text-center transition-all cursor-grab active:cursor-grabbing select-none shadow-sm flex flex-col justify-between items-center hover:-translate-y-1.5 hover:shadow-xl ${
                        isSelected
                          ? "border-coral bg-gradient-to-b from-rose-50/90 to-amber-50/70 ring-4 ring-coral/30 shadow-lg"
                          : inBowl
                          ? "border-emerald-400 bg-emerald-50/60"
                          : "border-slate-200 bg-white hover:border-deep-teal/50 hover:bg-slate-50/80"
                      }`}
                    >
                      {/* Top category indicator */}
                      <div className="w-full flex items-center justify-end text-[10px] font-bold text-charcoal/45 mb-1 font-sans">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold border ${food.badgeClass}`}>
                          {food.category}
                        </span>
                      </div>

                      {/* BIG Vector Food Illustration */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 my-1 rounded-3xl bg-gradient-to-br from-amber-50/60 via-white to-orange-50/50 border-2 border-amber-200/80 p-3.5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-all duration-300">
                        <FoodIllustration foodId={food.id} />
                      </div>

                      {/* Food Name & Category */}
                      <div className="w-full my-1.5">
                        <h6 className="text-xs sm:text-sm font-bold text-charcoal truncate font-sans m-0 group-hover:text-deep-teal">
                          {food.name}
                        </h6>
                        <span className="block text-[11px] font-semibold text-charcoal/65 truncate font-sans mt-0.5">
                          {food.categoryLabel}
                        </span>
                      </div>

                      {/* Action Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (inBowl) {
                            removeFoodFromBowl(food.id);
                          } else {
                            addFoodToBowl(food.id);
                          }
                        }}
                        className={`w-full text-xs font-bold py-1.5 px-2 rounded-xl transition-all font-sans flex items-center justify-center gap-1 shadow-2xs ${
                          inBowl
                            ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-xs"
                            : "bg-coral text-white hover:bg-coral/90 hover:scale-[1.02]"
                        }`}
                      >
                        {inBowl ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>In Bowl ✓</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      {/* =========================================================================
          MODE 2: 5-STAGE ATHLETE FUELING PLATE (Pie Wedges & Stage Breakdown)
         ========================================================================= */}
      {viewMode === "plate" && (
        <div className="space-y-4">
          {/* Intensity & Timing Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {[
              { id: "easy", label: "Rest Day", icon: Heart },
              { id: "moderate", label: "Practice Day", icon: Activity },
              { id: "hard", label: "Game Day", icon: Flame },
              { id: "pregame", label: "Pre-Game", icon: Zap },
              { id: "postgame", label: "Post-Game", icon: RefreshCw },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = dayType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setDayType(tab.id as typeof dayType)}
                  className={`p-2 sm:p-2.5 rounded-xl text-center border font-bold text-xs transition-all flex items-center justify-center gap-1.5 font-sans ${
                    active
                      ? "bg-coral text-white border-coral shadow-xs ring-2 ring-coral/20 scale-105"
                      : "bg-white text-charcoal/75 border-slate-200 hover:bg-rose-50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? "text-white" : "text-coral"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Timing Badge Banner */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-light-teal/70 text-deep-teal border border-deep-teal/20 w-full font-sans">
            <Clock className="w-3.5 h-3.5 text-deep-teal shrink-0" />
            <span>{config.timingBadge}</span>
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
                    {/* 50% Veggies (0° to 180°) */}
                    <path d={getSlicePath(0, 180)} fill="#34D399" opacity="0.85" />
                    {/* 25% Protein (180° to 270°) */}
                    <path d={getSlicePath(180, 270)} fill="#F87171" opacity="0.85" />
                    {/* 25% Carbs (270° to 360°) */}
                    <path d={getSlicePath(270, 360)} fill="#FBBF24" opacity="0.85" />
                  </>
                )}

                {dayType === "moderate" && (
                  <>
                    {/* 35% Carbs (0° to 126°) */}
                    <path d={getSlicePath(0, 126)} fill="#FBBF24" opacity="0.85" />
                    {/* 30% Protein (126° to 234°) */}
                    <path d={getSlicePath(126, 234)} fill="#F87171" opacity="0.85" />
                    {/* 35% Veggies (234° to 360°) */}
                    <path d={getSlicePath(234, 360)} fill="#34D399" opacity="0.85" />
                  </>
                )}

                {dayType === "hard" && (
                  <>
                    {/* 50% Carbs (0° to 180°) */}
                    <path d={getSlicePath(0, 180)} fill="#FBBF24" opacity="0.9" />
                    {/* 25% Protein (180° to 270°) */}
                    <path d={getSlicePath(180, 270)} fill="#F87171" opacity="0.85" />
                    {/* 25% Veggies (270° to 360°) */}
                    <path d={getSlicePath(270, 360)} fill="#34D399" opacity="0.85" />
                  </>
                )}

                {dayType === "pregame" && (
                  <>
                    {/* 60% Carbs (0° to 216°) */}
                    <path d={getSlicePath(0, 216)} fill="#FBBF24" opacity="0.9" />
                    {/* 20% Protein (216° to 288°) */}
                    <path d={getSlicePath(216, 288)} fill="#F87171" opacity="0.85" />
                    {/* 20% Low-Fiber Colors (288° to 360°) */}
                    <path d={getSlicePath(288, 360)} fill="#34D399" opacity="0.85" />
                  </>
                )}

                {dayType === "postgame" && (
                  <>
                    {/* 45% Carbs (0° to 162°) */}
                    <path d={getSlicePath(0, 162)} fill="#FBBF24" opacity="0.9" />
                    {/* 35% Protein (162° to 288°) */}
                    <path d={getSlicePath(162, 288)} fill="#F87171" opacity="0.85" />
                    {/* 20% Anti-Inflammatory Colors (288° to 360°) */}
                    <path d={getSlicePath(288, 360)} fill="#34D399" opacity="0.85" />
                  </>
                )}

                {/* Inner Plate Center Circle */}
                <circle cx="100" cy="100" r="19" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
                <text x="100" y="97" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#1E293B">
                  {dayType === "easy" && "Rest"}
                  {dayType === "moderate" && "Practice"}
                  {dayType === "hard" && "Game"}
                  {dayType === "pregame" && "Pre-Game"}
                  {dayType === "postgame" && "Post-Game"}
                </text>
                <text x="100" y="108" textAnchor="middle" fontSize="7.5" fontWeight="medium" fill="#64748B">Plate</text>
              </svg>
            </div>

            {/* Legend & Proportions */}
            <div className="flex-1 space-y-2.5 text-xs font-sans">
              <div className="flex items-start gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-amber-400 shrink-0 mt-0.5"></span>
                <div>
                  <strong className="text-amber-900 block">{config.carbs}</strong>
                  <span className="text-charcoal/75 text-[11px] leading-tight block">{config.carbDetail}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-rose-400 shrink-0 mt-0.5"></span>
                <div>
                  <strong className="text-rose-900 block">{config.protein}</strong>
                  <span className="text-charcoal/75 text-[11px] leading-tight block">{config.proteinDetail}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-3.5 h-3.5 rounded-md bg-emerald-400 shrink-0 mt-0.5"></span>
                <div>
                  <strong className="text-emerald-900 block">{config.colors}</strong>
                  <span className="text-charcoal/75 text-[11px] leading-tight block">{config.colorDetail}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1 border-t border-coral/10">
                <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-blue-900 block text-[11px]">Hydration &amp; Fluids:</strong>
                  <span className="text-charcoal/75 text-[11px] leading-tight block">{config.fluids}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Action Tip */}
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-charcoal/90 flex items-start gap-2 font-sans">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-900 block text-[11.5px]">Coach &amp; Athlete Pro Tip:</strong>
              <p className="text-[11px] text-amber-950/80 m-0 leading-relaxed">{config.actionTip}</p>
            </div>
          </div>

          {/* Hormone Protection Clinical Note */}
          <div className="p-3.5 rounded-xl bg-[#FFE1DB]/40 border border-coral/30 text-xs text-charcoal/90 font-sans">
            <strong className="text-[#B83F68] block mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-[#B83F68] shrink-0" />
              <span>Why This Protects Your Hormones &amp; Cycle:</span>
            </strong>
            {config.hormoneImpact}
          </div>
        </div>
      )}
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
// 9. Female Athlete Triad / RED-S & Overtraining Full-Body Inspection Diagram
// --------------------------------------------------------------------------
function RedSTriangleDiagram({ diagram, themeColor }: { diagram: LessonDiagram; themeColor: string }) {
  return <OvertrainingBodyInspectionDiagram diagram={diagram} themeColor={themeColor} />;
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
      badge: "Replenish & Ease Cramps",
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
      badge: "High-Octane Glycogen Engine",
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
      badge: "Antioxidant & Energy Peak",
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
      badge: "+100 to 300 kcal Burn & Protein Defense",
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
                  ? "Intense Alert: Emotions felt at peak volume; high vulnerability to crying spells, frustration, or social self-consciousness."
                  : computedAmygdala > 60
                  ? "Elevated Sensitivity: Normal puberty reactivity; feelings are strong and responsive to external events."
                  : "Grounded Baseline: Nervous system calm, parasympathetic tone active."}
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
                  ? "Impaired Braking: Synaptic construction or fatigue weakens impulse control. Pausing to think is difficult."
                  : computedPfc < 70
                  ? "Remodeling in Progress: Able to self-regulate with intentional breathwork, safe spaces, and time to decompress."
                  : "Resilient Executive Control: Solid prefrontal signaling; able to step back, name feelings, and keep perspective."}
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
                  How the Selected Reset Calms Your Biology:
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

// --------------------------------------------------------------------------
// 16. Maternal Warning Signs, Anatomy & Clinical Dismissal Matrix
// --------------------------------------------------------------------------
function MaternalWarningSignsDiagram({ diagram, themeColor }: { diagram: LessonDiagram; themeColor: string }) {
  const [activeTab, setActiveTab] = useState<"anatomy" | "warning-signs" | "challenge" | "cases" | "advocacy">("anatomy");
  const [anatomyView, setAnatomyView] = useState<"implantation" | "spiral-artery" | "myometrium">("implantation");
  const [selectedAnatomyHotspot, setSelectedAnatomyHotspot] = useState<string>("trophoblast");
  const [spiralFlowType, setSpiralFlowType] = useState<"healthy" | "preeclampsia">("healthy");
  const [selectedSymptomIdx, setSelectedSymptomIdx] = useState<number>(0);
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  // Challenge Mode State
  const [challengeStep, setChallengeStep] = useState<number>(0);
  const [challengeAnswer, setChallengeAnswer] = useState<number | null>(null);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [challengeCompleted, setChallengeCompleted] = useState<boolean>(false);

  const symptomPairs = [
    {
      id: "headache",
      label: "Headache & Vision",
      icon: Brain,
      title: "Severe Throbbing Headache vs. Normal Tension Headache",
      normal: "Mild tension headache caused by changing estrogen/progesterone, mild dehydration, or eye strain that resolves with water, rest, and low stimulation.",
      urgentWarning: "Severe, relentless headache that worsens over time, resists medication, or is accompanied by visual auras, blind spots (scotoma), flashing lights, or blurry vision.",
      condition: "Preeclampsia / Hypertensive Crisis / Cerebral Edema",
      pathophysiology: "Placental ischemic anti-angiogenic factors (sFlt-1) cause maternal endothelial dysfunction and intense cerebral vasoconstriction, causing blood-brain barrier permeability and seizure risk (eclampsia).",
      testsToDemand: "Immediate bilateral manual blood pressure reading, clean-catch urine protein dip or urine protein-to-creatinine ratio (UPCR), STAT Comprehensive Metabolic Panel (CMP for AST/ALT and creatinine), and CBC with platelet count.",
      dismissalRisk: "If dismissed as 'just dehydration or stress,' untreated preeclampsia can progress to grand mal eclamptic seizures, intracranial hemorrhage (stroke), permanent retinal damage, or placental abruption."
    },
    {
      id: "swelling",
      label: "Swelling & Fluid",
      icon: Activity,
      title: "Sudden Facial & Hand Edema vs. Mild Ankle Puffiness",
      normal: "Gradual, mild swelling of feet and ankles at the end of the day due to dependent venous pooling, improving after elevating feet overnight.",
      urgentWarning: "Sudden, rapid swelling of your face, eyelids, lips, or hands (e.g., rings suddenly stuck, eyes swollen shut in the morning, rapid weight gain of >3-5 lbs in a week).",
      condition: "Preeclampsia / Generalized Microvascular Capillary Leak",
      pathophysiology: "Endothelial cell damage causes systemic loss of vascular integrity, allowing fluid and proteins to leak from blood vessels directly into peripheral and interstitial tissues.",
      testsToDemand: "Urgent blood pressure check, rapid serum uric acid, creatinine, AST/ALT, complete blood count, and clinical check for hyperreflexia and ankle clonus.",
      dismissalRisk: "Dismissing sudden facial swelling as 'normal pregnancy water retention' overlooks active vascular damage that can cause pulmonary edema (fluid in lungs) and sudden maternal seizures."
    },
    {
      id: "breathing",
      label: "Breathing & Chest",
      icon: Wind,
      title: "Chest Tightness & Dyspnea vs. Growing Belly Pressure",
      normal: "Mild shortness of breath when walking briskly or climbing stairs because the growing uterus physically presses upward against the diaphragm.",
      urgentWarning: "Sudden sharp chest pain, gasping for breath at rest, difficulty taking a full breath, coughing up pink/bloody mucus, or heart racing over 100 beats per minute.",
      condition: "Pulmonary Embolism (PE) / Peripartum Cardiomyopathy / Amniotic Fluid Embolism",
      pathophysiology: "Pregnancy naturally increases blood clotting factors by 4–5x to prevent birth hemorrhage. A clot in the deep veins (DVT) can break off and travel to the lungs, obstructing arterial blood flow.",
      testsToDemand: "STAT Computed Tomography (CT) Angiogram with IV contrast (the diagnostic gold standard—do not accept leg ultrasound alone), D-Dimer, Troponin, and 12-lead ECG.",
      dismissalRisk: "Dismissing chest tightness or shortness of breath as 'new mother anxiety or panic' is one of the single greatest causes of maternal death; untreated PE carries up to a 30% mortality rate."
    },
    {
      id: "abdominal",
      label: "Abdominal Pain",
      icon: AlertTriangle,
      title: "Epigastric / Upper Right Belly Pain vs. Round Ligament Twinges",
      normal: "Brief, sharp jabbing or dull pulling twinges in the lower belly or groin when changing positions or coughing, caused by stretching of uterine round ligaments.",
      urgentWarning: "Persistent, severe pain in the upper right quadrant of your abdomen (under the right ribs) or excruciating heartburn that radiates to your back and doesn't respond to antacids.",
      condition: "HELLP Syndrome (Hemolysis, Elevated Liver Enzymes, Low Platelets) / Subcapsular Liver Hematoma",
      pathophysiology: "Microthrombi lodge in hepatic sinusoids, causing focal liver ischemia, acute hepatocyte death, swelling beneath Glisson's liver capsule, and platelet consumption.",
      testsToDemand: "STAT CMP (AST, ALT, bilirubin, BUN, creatinine), CBC with manual platelet count, peripheral blood smear for schistocytes (fragmented red cells), and urgent right upper quadrant liver ultrasound.",
      dismissalRisk: "Dismissing upper abdominal pain as 'acid reflux or indigestion' can result in spontaneous subcapsular hepatic rupture, massive internal abdominal hemorrhage, and death within hours."
    },
    {
      id: "bleeding",
      label: "Bleeding & Clots",
      icon: Droplets,
      title: "Heavy Postpartum Bleeding vs. Normal Lochia Shedding",
      normal: "Postpartum lochia gradually tapering from bright red to brownish-pink over 2–6 weeks, requiring approximately 1 standard sanitary pad every 3–4 hours.",
      urgentWarning: "Soaking through 1 or more heavy maxi pads in under an hour for 2 consecutive hours, passing blood clots larger than a golf ball, or feeling dizzy, cold, pale, or faint.",
      condition: "Postpartum Hemorrhage (PPH) / Uterine Atony / Retained Placental Fragments",
      pathophysiology: "Failure of the uterine myometrium to contract down (uterine atony) leaves large maternal spiral arteries at the placental detachment site wide open, causing massive arterial blood loss.",
      testsToDemand: "Immediate continuous uterine fundal massage, manual bimanual examination, IV uterotonics (oxytocin, methylergonovine, carboprost, misoprostol, tranexamic acid [TXA]), bedside pelvic ultrasound, and Type & Crossmatch.",
      dismissalRisk: "Brushing off heavy bleeding as 'normal after giving birth' can plunge a patient into hypovolemic hemorrhagic shock, disseminated intravascular coagulation (DIC), and cardiovascular collapse."
    },
    {
      id: "fever",
      label: "Fever & Infection",
      icon: Flame,
      title: "Fever ≥ 100.4°F & Chills vs. Normal Hormonal Flushing",
      normal: "Mild warmth or night sweats during postpartum recovery caused by rapid hormonal drops as estrogen and progesterone plummet after placenta delivery.",
      urgentWarning: "Fever of 100.4°F (38.0°C) or higher, teeth-chattering chills, persistent lower abdominal tenderness, or foul-smelling vaginal discharge/lochia.",
      condition: "Chorioamnionitis / Postpartum Endometritis / Sepsis",
      pathophysiology: "Bacterial infection colonizes the intrauterine cavity or C-section incision, releasing endotoxins that trigger systemic inflammatory response syndrome (SIRS), vasodilation, and septic shock.",
      testsToDemand: "Blood cultures (2 sets from separate sites), CBC with differential, catheterized urinalysis & culture, vaginal/cervical swabs, lactate level, and immediate broad-spectrum IV antibiotic therapy.",
      dismissalRisk: "Dismissing maternal fever as 'breast engorgement or a mild cold' allows pelvic infections to progress to pelvic abscesses, septic pelvic thrombophlebitis, septic shock, and multiorgan failure."
    }
  ];

  const landmarkCases = [
    {
      name: "Serena Williams",
      year: "2018",
      role: "23-time Grand Slam Champion & Mother",
      diagnosis: "Post-C-Section Pulmonary Embolism & Ruptured Incision Hematoma",
      dismissalEncounter: "The day after delivering daughter Olympia via emergency C-section, Serena (who has a known history of pulmonary embolism and whose anticoagulant therapy had been paused) experienced sudden, gasping shortness of breath and pleuritic coughing. She immediately told her nurse she needed a CT angiogram of her lungs with contrast and an IV heparin drip. The nurse dismissed her concern, assuming Serena was confused from pain medications, and ordered a Doppler ultrasound of her legs instead.",
      advocacyAction: "Serena adamantly refused to back down: 'No, I am telling you, I need a CT scan with contrast and heparin right now.' She insisted until the medical team relented and ordered the chest CT. The scan immediately revealed multiple blood clots lodged in her lungs (bilateral pulmonary emboli). Her violent coughing spells also burst her surgical incision, requiring emergency surgery for a large abdominal hematoma.",
      outcome: "Survived due to relentless self-advocacy and physiological knowledge of her own body. Her case became a global flashpoint demonstrating that fame, wealth, and world-class athleticism do not shield Black women from clinical dismissal.",
      citation: "Haskell, R. (Vogue, Feb 2018); Taylor, J. (New England Journal of Medicine, 2019); CDC Hear Her Highlight."
    },
    {
      name: "Kira Dixon Johnson & Charles Johnson",
      year: "2016",
      role: "39-year-old Entrepreneur, Pilot, Mother of 2",
      diagnosis: "Fatal Retroperitoneal Internal Hemorrhage (3.5 Liters Blood Loss)",
      dismissalEncounter: "Kira checked into Cedars-Sinai Medical Center in Los Angeles for a routine scheduled C-section to deliver her second son, Langston. In recovery around 2:30 PM, her husband Charles noticed blood in her Foley catheter bag. Over the next several hours, the catheter turned dark cranberry, Kira became pale, shivering, and tachycardic, and experienced excruciating abdominal pain. Charles repeatedly pleaded with nurses and physicians to take Kira back to surgery or order imaging. Hospital staff repeatedly dismissed him, stating: 'Sir, your wife just isn't a priority right now.'",
      advocacyAction: "Charles spent 10 continuous hours begging the medical staff to intervene. A STAT CT scan was ordered at 8:00 PM but never performed. Kira was not wheeled back into an operating room until 12:30 AM—ten hours after acute symptoms began.",
      outcome: "When surgeons opened her abdomen, they discovered 3.5 liters of pooled blood (nearly her entire blood volume) from massive internal retroperitoneal bleeding. Her heart stopped immediately on the table. In her honor, Charles founded 4Kira4Moms, which led to congressional testimony and the federal enactment of the bipartisan Preventing Maternal Deaths Act of 2018 (Public Law 115-344).",
      citation: "House Committee on Energy & Commerce (H.R. 1318 Hearings, 2018); Cedars-Sinai Medical Review; 4Kira4Moms Foundation."
    },
    {
      name: "Dr. Shalon Irving, PhD, MS, MPH",
      year: "2017",
      role: "CDC Epidemiologist & Lieutenant Commander, U.S. Public Health Service",
      diagnosis: "Hypertensive Crisis, Cerebral Edema & Postpartum Cardiac Arrest",
      dismissalEncounter: "Dr. Irving spent her academic and public health career at the CDC studying how structural racism, inequality, and trauma drive health disparities. Three weeks after giving birth to daughter Soleil via C-section, Shalon experienced spiking blood pressure, severe headaches, rapid fluid swelling in her legs and face, and wound pain. She visited healthcare providers more than four times in three weeks. Each time, her severe symptoms were minimized as 'typical postpartum recovery' and she was sent home with no antihypertensive medication or monitoring plan.",
      advocacyAction: "Shalon and her mother repeatedly documented and reported her soaring blood pressure and severe physiological discomfort to clinicians. Just hours after her final outpatient visit where clinicians again failed to intervene, Shalon collapsed at home from hypertensive emergency and cardiac arrest.",
      outcome: "Died three weeks postpartum at age 36. Her death underscored the profound reality that holding a doctorate, having federal health insurance, and possessing elite health literacy cannot protect patients if healthcare providers refuse to listen to their symptoms.",
      citation: "NPR & ProPublica Investigation: 'Lost Mothers: The American Way of Birth' (Martin & Montagne, 2017); CDC Foundation."
    },
    {
      name: "Dr. Chaniece Wallace, MD",
      year: "2020",
      role: "Chief Pediatric Resident, Indiana University School of Medicine",
      diagnosis: "Severe Preeclampsia, HELLP Syndrome & Hepatic Rupture",
      dismissalEncounter: "Dr. Wallace was a practicing pediatrician and chief resident at Riley Children's Hospital in Indianapolis. She delivered daughter Charlotte via emergency C-section at 30 weeks due to preeclampsia symptoms. Following delivery, she developed severe epigastric abdominal pain, declining platelet counts, and soaring liver enzymes (classic hallmarks of HELLP Syndrome). Her post-surgical symptoms were not caught in time to prevent liver capsule compromise.",
      advocacyAction: "As a physician, Dr. Wallace understood clinical medicine deeply, yet like countless Black women in healthcare, systemic disparities in pain validation and monitoring intervals delayed life-saving intervention.",
      outcome: "Suffered catastrophic liver rupture and hemorrhage, dying on October 22, 2020—just two days after giving birth. Her death ignited grief and outrage throughout the medical and pediatric community, leading to national calls by the AAP and ACOG to overhaul maternal hypertensive protocols.",
      citation: "Contemporary OB/GYN (Nov 2020); American Academy of Pediatrics Memorial Resolution; Indiana University Health Review."
    }
  ];

  const advocacyScripts = [
    {
      id: "chart-refusal",
      title: "The 'Document Your Refusal' Accountability Protocol",
      purpose: "Use when a doctor or triage nurse refuses to order lab work, imaging, or blood pressure monitoring for urgent warning signs.",
      script: "“Dr. [Name], my symptoms align directly with the CDC's Urgent Maternal Warning Signs for preeclampsia and acute complications. I know my body, and this does not feel like expected pregnancy fatigue. I am formally requesting an immediate blood pressure check, a urine protein assay, and a complete metabolic panel right now. If you choose not to order these diagnostic tests, please document your clinical refusal and medical justification in my chart today.”",
      whyItWorks: "Demanding that a clinician document their refusal shifts the interaction from casual dismissal to formal medical liability and malpractice record. Clinicians almost always order the tests rather than write a documented refusal in your chart."
    },
    {
      id: "hear-her",
      title: "The CDC 'Hear Her' Protocol Standard",
      purpose: "Use when presenting to the Emergency Department, Labor & Delivery triage, or outpatient clinic.",
      script: "“I am currently pregnant / [X] days postpartum. I am experiencing severe headache with visual spots / acute shortness of breath / heavy bleeding. The CDC Hear Her national clinical guidelines classify these symptoms as urgent maternal warning signs requiring immediate obstetric evaluation. I need to be examined by an obstetrician or attending physician immediately.”",
      whyItWorks: "Explicitly stating that you are postpartum (even up to 1 year after birth) and citing CDC federal warning guidelines commands clinical urgency and prevents triage nurses from classifying you as a routine patient."
    },
    {
      id: "partner-shield",
      title: "The Birth Partner & Doula Shield Script",
      purpose: "Use when the mother is exhausted, in severe pain, or unable to advocate for herself.",
      script: "“Please pause. My partner is in severe pain / soaking through pads / struggling to breathe. We know her baseline, and this is an acute change. We are not comfortable waiting or being discharged. We need a physician to perform a bedside evaluation, check vitals manually, and review these labs immediately. Please page the obstetric attending physician on call now.”",
      whyItWorks: "Empowers birth partners and doulas to intercede firmly without apologizing, establishing an objective safety boundary when the patient is physiologically depleted."
    }
  ];

  const challengeCases = [
    {
      id: "jordan",
      patient: "Jordan · 34 Weeks Pregnant",
      symptom: "Severe throbbing headache that won't go away, spots in vision, rings suddenly stuck on fingers.",
      clinicianSays: "“You're just stressed out and dehydrated. Go home, drink tea, and rest.”",
      options: [
        {
          text: "“Okay, I guess pregnancy is just painful. I'll take a nap and hope it goes away.”",
          isCorrect: false,
          feedback: "Dangerous! Sending Jordan home untreated risks eclamptic seizures, placental abruption, and intracranial stroke within hours."
        },
        {
          text: "“Dr. Smith, these match CDC Urgent Warning Signs for preeclampsia. I need an immediate manual blood pressure check, urine protein dip, and CMP. If you decline, please document your refusal in my chart.”",
          isCorrect: true,
          feedback: "✦ Life-Saving Self-Advocate! You forced an immediate clinical evaluation. Blood pressure checked at 170/115 mmHg; magnesium sulfate and labetalol were started STAT, preventing an eclamptic seizure!"
        },
        {
          text: "“I don't trust any of you! I'm just going to leave and never come back.”",
          isCorrect: false,
          feedback: "While frustration is valid, leaving against medical advice leaves Jordan with untreated severe preeclampsia."
        }
      ]
    },
    {
      id: "maya-pe",
      patient: "Maya · 24 Hours Post-C-Section",
      symptom: "Sudden gasping shortness of breath, stabbing chest pain upon inhaling, and resting heart rate of 115 bpm.",
      clinicianSays: "“Pain medicine makes people anxious and confused. Just take deep breaths, this is normal after abdominal surgery.”",
      options: [
        {
          text: "“I know my body and this is not anxiety. In pregnancy and postpartum, clot risk is 4–5x higher. I need a STAT Chest CT Angiogram with contrast and heparin evaluation right now.”",
          isCorrect: true,
          feedback: "✦ Master Diagnostic Intercession! (Inspired by Serena Williams's life-saving advocacy). The CT angiogram revealed bilateral pulmonary emboli. Immediate heparin dissolved the clots!"
        },
        {
          text: "“Okay, I'll close my eyes and do box breathing until the anxiety goes away.”",
          isCorrect: false,
          feedback: "Fatal mistake! Untreated pulmonary embolism has a 30% mortality rate. Hypoxia would lead to cardiac arrest."
        },
        {
          text: "“Just give me more pain medicine so I don't feel the chest pain.”",
          isCorrect: false,
          feedback: "Pain medication masks symptoms while the pulmonary clot continues to obstruct oxygenation to the lungs."
        }
      ]
    },
    {
      id: "elena-pph",
      patient: "Elena · 4 Hours Postpartum",
      symptom: "Soaked through two full pads in 30 minutes, passing golf-ball clots, feels dizzy, shivering, and freezing.",
      clinicianSays: "“Everyone bleeds after giving birth. You're not a priority right now, we'll check on you later.”",
      options: [
        {
          text: "“I'll wait another 2 hours to see if the bleeding slows down on its own.”",
          isCorrect: false,
          feedback: "Catastrophic! Losing 1000+ mL of blood in uterine atony causes hypovolemic shock and cardiac arrest (as occurred in Kira Dixon Johnson's case)."
        },
        {
          text: "“We are not waiting. Elena is showing classic signs of Postpartum Hemorrhage. We need an immediate bedside fundal check, bimanual massage, IV uterotonics, and the attending physician in this room right now.”",
          isCorrect: true,
          feedback: "✦ Heroic Partner Shield! Continuous fundal massage and TXA were administered immediately, clamping the bleeding spiral arteries and saving Elena's life!"
        },
        {
          text: "“Can we just have more blankets for her shivering?”",
          isCorrect: false,
          feedback: "Shivering is a sign of hypothermia from acute blood loss (hypovolemic shock), not just being cold!"
        }
      ]
    }
  ];

  const handleCopyScript = (text: string, idx: number) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2500);
    }
  };

  const activeSymptom = symptomPairs[selectedSymptomIdx];
  const activeCase = landmarkCases[selectedCaseIdx];
  const currentChallenge = challengeCases[challengeStep];

  return (
    <div className="rounded-3xl border-2 border-coral/30 bg-white p-4 sm:p-6 shadow-sm space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-coral/20">
        <div>
          <div className="flex items-center gap-2 text-coral font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-coral" />
            <span>Maternal Safety, Anatomy & Clinical Literacy</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-charcoal mt-1">
            Pregnancy Anatomy, Warning Signs & Dismissal Matrix
          </h3>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-0.5">
            Explore vector anatomy diagrams, compare warning signs, test your triage skills, and examine landmark maternal cases.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-sand/60 rounded-2xl border border-charcoal/10 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("anatomy")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === "anatomy"
                ? "bg-coral text-white shadow-xs font-bold"
                : "text-charcoal/75 hover:text-charcoal hover:bg-sand/80"
            }`}
          >
            Anatomy Explorer
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("warning-signs")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === "warning-signs"
                ? "bg-coral text-white shadow-xs font-bold"
                : "text-charcoal/75 hover:text-charcoal hover:bg-sand/80"
            }`}
          >
            Warning vs. Normal
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("challenge")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === "challenge"
                ? "bg-coral text-white shadow-xs font-bold"
                : "text-charcoal/75 hover:text-charcoal hover:bg-sand/80"
            }`}
          >
            Triage Challenge
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cases")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === "cases"
                ? "bg-coral text-white shadow-xs font-bold"
                : "text-charcoal/75 hover:text-charcoal hover:bg-sand/80"
            }`}
          >
            Landmark Cases
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("advocacy")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === "advocacy"
                ? "bg-coral text-white shadow-xs font-bold"
                : "text-charcoal/75 hover:text-charcoal hover:bg-sand/80"
            }`}
          >
            Advocacy Playbook
          </button>
        </div>
      </div>

      {/* TAB 0: ANATOMY EXPLORER */}
      {activeTab === "anatomy" && (
        <div className="space-y-6">
          {/* Sub-view switcher */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setAnatomyView("implantation")}
              className={`px-3 py-2 rounded-2xl text-xs font-medium shrink-0 border transition-all ${
                anatomyView === "implantation"
                  ? "bg-deep-teal text-white border-deep-teal shadow-xs font-bold"
                  : "bg-sand/40 text-charcoal/80 border-charcoal/10 hover:bg-sand/70"
              }`}
            >
              1. Blastocyst Implantation & hCG
            </button>
            <button
              type="button"
              onClick={() => setAnatomyView("spiral-artery")}
              className={`px-3 py-2 rounded-2xl text-xs font-medium shrink-0 border transition-all ${
                anatomyView === "spiral-artery"
                  ? "bg-deep-teal text-white border-deep-teal shadow-xs font-bold"
                  : "bg-sand/40 text-charcoal/80 border-charcoal/10 hover:bg-sand/70"
              }`}
            >
              2. Spiral Arteries & Preeclampsia
            </button>
            <button
              type="button"
              onClick={() => setAnatomyView("myometrium")}
              className={`px-3 py-2 rounded-2xl text-xs font-medium shrink-0 border transition-all ${
                anatomyView === "myometrium"
                  ? "bg-deep-teal text-white border-deep-teal shadow-xs font-bold"
                  : "bg-sand/40 text-charcoal/80 border-charcoal/10 hover:bg-sand/70"
              }`}
            >
              3. Uterine Living Ligatures & PPH
            </button>
          </div>

          {/* VIEW 1: Blastocyst Implantation */}
          {anatomyView === "implantation" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* SVG Vector Drawing Canvas */}
              <div className="lg:col-span-7 bg-gradient-to-b from-rose-50/70 via-white to-sand/40 rounded-3xl border-2 border-coral/25 p-4 flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs text-charcoal/70 mb-2">
                  <span className="font-bold text-coral">Day 8–10 Post-Fertilization</span>
                  <span className="text-[11px] bg-white px-2.5 py-0.5 rounded-full border border-charcoal/10">
                    Tap anatomical structures
                  </span>
                </div>
                <svg viewBox="0 0 420 280" className="w-full h-56 sm:h-64 select-none">
                  <defs>
                    <linearGradient id="endometriumGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FEE2E2" />
                      <stop offset="100%" stopColor="#FECDD3" />
                    </linearGradient>
                    <linearGradient id="trophoblastGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F47A6A" />
                      <stop offset="100%" stopColor="#E11D48" />
                    </linearGradient>
                    <radialGradient id="blastocystInner" cx="40%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#BAE6FD" />
                      <stop offset="100%" stopColor="#38BDF8" />
                    </radialGradient>
                  </defs>

                  {/* Uterine Myometrium Base */}
                  <rect x="10" y="190" width="400" height="80" rx="8" fill="#FBCFE8" opacity="0.6" />
                  <text x="25" y="240" fill="#9D174D" fontSize="11" fontWeight="bold">Myometrium (Smooth Muscle Layer)</text>

                  {/* Decidual Endometrial Bed */}
                  <rect
                    x="10"
                    y="40"
                    width="400"
                    height="150"
                    rx="14"
                    fill="url(#endometriumGrad)"
                    stroke="#FDA4AF"
                    strokeWidth="2"
                    className="cursor-pointer"
                    onClick={() => setSelectedAnatomyHotspot("decidua")}
                  />
                  <text x="25" y="65" fill="#BE123C" fontSize="12" fontWeight="bold">
                    Decidua (Endometrial Lining)
                  </text>

                  {/* Maternal Sinusoid Blood Pools */}
                  <ellipse cx="90" cy="110" rx="35" ry="18" fill="#EF4444" opacity="0.75" />
                  <ellipse cx="320" cy="120" rx="40" ry="20" fill="#EF4444" opacity="0.75" />
                  <ellipse cx="260" cy="85" rx="25" ry="14" fill="#DC2626" opacity="0.7" />
                  <text x="80" y="114" fill="#FFFFFF" fontSize="9" fontWeight="bold">Blood Pool</text>
                  <text x="305" y="124" fill="#FFFFFF" fontSize="9" fontWeight="bold">Maternal Sinus</text>

                  {/* Spiral Arteries entering decidua */}
                  <path d="M 80 190 Q 75 160, 85 140 T 90 110" fill="none" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 330 190 Q 320 160, 335 140 T 325 120" fill="none" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />

                  {/* Blastocyst Implanting */}
                  <g className="cursor-pointer" onClick={() => setSelectedAnatomyHotspot("trophoblast")}>
                    {/* Syncytiotrophoblast invasive fingers */}
                    <path
                      d="M 140 140 C 130 90, 190 70, 240 85 C 270 95, 280 140, 260 170 C 230 190, 160 185, 140 140 Z"
                      fill="url(#trophoblastGrad)"
                      stroke="#9F1239"
                      strokeWidth="2.5"
                      opacity="0.9"
                    />
                    {/* Invasive pseudopods */}
                    <path d="M 230 85 Q 245 70, 260 80 Q 255 95, 245 90" fill="#E11D48" />
                    <path d="M 150 110 Q 120 105, 110 112 Q 130 125, 145 120" fill="#E11D48" />

                    {/* Blastocyst Cavity (Blastocoel) */}
                    <circle cx="205" cy="135" r="36" fill="#F0F9FF" stroke="#0284C7" strokeWidth="2" />

                    {/* Embryoblast (Inner Cell Mass) */}
                    <circle
                      cx="190"
                      cy="125"
                      r="16"
                      fill="url(#blastocystInner)"
                      stroke="#0369A1"
                      strokeWidth="2"
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAnatomyHotspot("embryoblast");
                      }}
                    />
                    <text x="176" y="128" fill="#FFFFFF" fontSize="8" fontWeight="bold">ICM</text>
                  </g>

                  {/* Chemical Signal: hCG particles floating */}
                  <g>
                    <circle cx="115" cy="90" r="4" fill="#F59E0B" />
                    <circle cx="130" cy="80" r="3" fill="#F59E0B" />
                    <circle cx="270" cy="105" r="4" fill="#F59E0B" />
                    <circle cx="290" cy="95" r="3" fill="#F59E0B" />
                    <text x="270" y="80" fill="#B45309" fontSize="10" fontWeight="bold">hCG Signal</text>
                  </g>

                  {/* Hotspot indicator rings */}
                  <circle cx="205" cy="165" r="6" fill="#F47A6A" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="190" cy="125" r="4" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>

                <div className="w-full flex items-center justify-center gap-4 text-xs font-semibold pt-2 text-charcoal/75">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-coral"></span> Trophoblast</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#0284C7]"></span> Embryo (ICM)</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500"></span> Maternal Blood</span>
                </div>
              </div>

              {/* Hotspot Breakdown Panel */}
              <div className="lg:col-span-5 space-y-3">
                <div className="p-4 rounded-2xl bg-white border border-charcoal/15 shadow-2xs space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-coral">Anatomical Structure</span>
                  <h4 className="text-base font-serif font-bold text-charcoal">
                    {selectedAnatomyHotspot === "trophoblast" && "Syncytiotrophoblast & hCG Production"}
                    {selectedAnatomyHotspot === "embryoblast" && "Embryoblast (Inner Cell Mass)"}
                    {selectedAnatomyHotspot === "decidua" && "Decidualized Endometrium"}
                  </h4>
                  <p className="text-xs text-charcoal/80 leading-relaxed">
                    {selectedAnatomyHotspot === "trophoblast" &&
                      "The outer invasive layer of cells that burrows into the uterine lining. It secretes Human Chorionic Gonadotropin (beta-hCG), which signals the corpus luteum to keep pumping progesterone so the uterine lining does not shed. This is the hormone detected on home pregnancy tests!"}
                    {selectedAnatomyHotspot === "embryoblast" &&
                      "A cluster of pluripotent stem cells located on the interior of the blastocyst. Over the next several weeks, these cells differentiate into the three primary germ layers (ectoderm, mesoderm, and endoderm) that form all organs, limbs, and tissues of the developing baby."}
                    {selectedAnatomyHotspot === "decidua" &&
                      "Under the influence of progesterone, the endometrial lining transforms into the decidua—a specialized, nutrient-dense tissue loaded with glycogen and lipids that cushions the embryo and regulates maternal immune tolerance."}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-sand/40 border border-charcoal/10 text-xs text-charcoal/80 space-y-1">
                  <strong className="text-deep-teal font-semibold block">Clinical Pearl:</strong>
                  <span>Implantation bleeding occurs in ~25% of pregnancies when micro-capillaries are breached as the blastocyst embeds. It is light, pinkish-brown, lasts 1–2 days, and is NOT a true period.</span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: Spiral Artery Remodeling & Preeclampsia */}
          {anatomyView === "spiral-artery" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="text-xs font-bold text-coral uppercase tracking-wider">Vascular Hemodynamics</span>
                  <h4 className="text-base font-serif font-bold text-charcoal">
                    Spiral Artery Remodeling: Normal vs. Preeclampsia
                  </h4>
                </div>
                {/* Toggle */}
                <div className="flex items-center p-1 bg-sand/60 rounded-2xl border border-charcoal/10">
                  <button
                    type="button"
                    onClick={() => setSpiralFlowType("healthy")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      spiralFlowType === "healthy" ? "bg-emerald-600 text-white shadow-xs" : "text-charcoal/70"
                    }`}
                  >
                    Healthy Remodeling
                  </button>
                  <button
                    type="button"
                    onClick={() => setSpiralFlowType("preeclampsia")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      spiralFlowType === "preeclampsia" ? "bg-rose-600 text-white shadow-xs" : "text-charcoal/70"
                    }`}
                  >
                    Preeclampsia Defect
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {/* Visual Vessel Diagram */}
                <div className="bg-gradient-to-b from-sand/30 to-white rounded-3xl border border-charcoal/15 p-4 flex flex-col items-center">
                  <svg viewBox="0 0 320 200" className="w-full h-44 select-none">
                    {spiralFlowType === "healthy" ? (
                      <g>
                        {/* Wide, funnel-shaped remodeled artery */}
                        <path
                          d="M 50 160 C 80 150, 120 120, 160 100 C 200 80, 240 50, 280 40 L 280 160 C 240 150, 200 120, 160 100 C 120 80, 80 50, 50 40 Z"
                          fill="#FEE2E2"
                          stroke="#E11D48"
                          strokeWidth="3"
                        />
                        {/* High volume blood stream */}
                        <path d="M 60 100 L 270 100" stroke="#DC2626" strokeWidth="24" strokeLinecap="round" opacity="0.85" />
                        <text x="80" y="105" fill="#FFFFFF" fontSize="12" fontWeight="bold">Low Resistance / High Blood Flow</text>
                        <text x="60" y="185" fill="#047857" fontSize="11" fontWeight="bold">✓ Trophoblasts replaced smooth muscle</text>
                      </g>
                    ) : (
                      <g>
                        {/* Narrow, constricted, tortuous artery */}
                        <path
                          d="M 50 110 Q 100 130, 150 90 T 250 115 T 280 105"
                          fill="none"
                          stroke="#BE123C"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                        {/* Constricted lumen */}
                        <path
                          d="M 50 110 Q 100 130, 150 90 T 250 115 T 280 105"
                          fill="none"
                          stroke="#EF4444"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                        {/* Turbulent stress sparks */}
                        <circle cx="150" cy="90" r="8" fill="#F59E0B" opacity="0.5" />
                        <circle cx="200" cy="100" r="10" fill="#EF4444" opacity="0.6" />
                        <text x="60" y="55" fill="#B91C1C" fontSize="12" fontWeight="bold">High Resistance / Severe Vasospasm</text>
                        <text x="60" y="175" fill="#991B1B" fontSize="11" fontWeight="bold">⚠️ Intact muscular coat = Placental Ischemia</text>
                      </g>
                    )}
                  </svg>
                </div>

                {/* Explanation Card */}
                <div className="p-4 rounded-2xl bg-white border border-charcoal/15 shadow-2xs space-y-2 text-xs">
                  <span className={`font-bold uppercase tracking-wider ${spiralFlowType === "healthy" ? "text-emerald-700" : "text-rose-700"}`}>
                    {spiralFlowType === "healthy" ? "Normal Physiological Adaptation" : "The Root Cause of Preeclampsia"}
                  </span>
                  <p className="text-charcoal/85 leading-relaxed">
                    {spiralFlowType === "healthy"
                      ? "In a healthy pregnancy, fetal extravillous trophoblasts invade the maternal spiral arteries, stripping away the thick muscular and elastic walls. The vessels dilate into wide, funnel-like conduits that deliver 600–750 mL of maternal blood per minute to the placenta at low pressure without turbulence."
                      : "In preeclampsia, trophoblast invasion is shallow and defective. The spiral arteries remain narrow, rigid, and muscular. Because blood cannot flow smoothly, the placenta becomes starved for oxygen (ischemic) and releases toxic inflammatory proteins (sFlt-1) that damage every maternal blood vessel, causing high blood pressure, protein in the urine, and liver/brain swelling."}
                  </p>
                  <div className="p-2.5 rounded-xl bg-sand/30 border border-charcoal/10 text-[11px] text-charcoal/80">
                    <strong>Why this matters for advocacy:</strong> Preeclampsia is not caused by 'stress' or 'eating salt.' It is a biological vascular disorder that requires immediate clinical surveillance!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: Uterine Living Ligatures & PPH */}
          {anatomyView === "myometrium" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="bg-gradient-to-b from-rose-50/50 to-white rounded-3xl border border-charcoal/15 p-4 flex flex-col items-center">
                <svg viewBox="0 0 320 200" className="w-full h-44 select-none">
                  {/* Interlacing figure-8 myometrial fibers */}
                  <ellipse cx="160" cy="100" rx="90" ry="70" fill="#FCE7F3" stroke="#DB2777" strokeWidth="2.5" />
                  {/* Criss-cross muscle bands */}
                  <path d="M 110 50 Q 160 100, 210 150" stroke="#BE185D" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 210 50 Q 160 100, 110 150" stroke="#BE185D" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 90 100 Q 160 80, 230 100" stroke="#9D174D" strokeWidth="5" strokeLinecap="round" />

                  {/* Severed spiral arteries clamped in the middle */}
                  <circle cx="160" cy="100" r="10" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
                  <text x="135" y="104" fill="#FFFFFF" fontSize="9" fontWeight="bold">Artery</text>
                  <text x="75" y="185" fill="#831843" fontSize="11" fontWeight="bold">Figure-8 'Living Ligatures' Clamping Vessels</text>
                </svg>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-charcoal/15 shadow-2xs space-y-2 text-xs">
                <span className="font-bold text-coral uppercase tracking-wider">Postpartum Anatomy</span>
                <h4 className="text-base font-serif font-bold text-charcoal">
                  The 'Living Ligatures' of the Uterus
                </h4>
                <p className="text-charcoal/85 leading-relaxed">
                  When the placenta detaches at birth, over 120 maternal spiral arteries are left severed and open. To prevent catastrophic bleeding, the uterus has unique criss-crossing, figure-8 muscle fibers known as <strong>living ligatures</strong>. When the uterus contracts firmly, these muscle loops squeeze the severed vessels shut like physiological tourniquets.
                </p>
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-[11px] font-medium">
                  ⚠️ <strong>Uterine Atony (The Danger):</strong> If the uterus fails to contract ('boggy uterus'), the mother can lose up to 500 mL of blood in just a few minutes. Immediate fundal massage, bimanual compression, and IV oxytocin/TXA are lifesaving!
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 1: WARNING SIGNS VS NORMAL */}
      {activeTab === "warning-signs" && (
        <div className="space-y-5">
          {/* Symptom Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {symptomPairs.map((pair, idx) => {
              const IconComponent = pair.icon;
              const isSelected = idx === selectedSymptomIdx;
              return (
                <button
                  key={pair.id}
                  type="button"
                  onClick={() => setSelectedSymptomIdx(idx)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-medium shrink-0 border transition-all ${
                    isSelected
                      ? "bg-coral text-white border-coral shadow-xs font-bold"
                      : "bg-sand/40 text-charcoal/80 border-charcoal/10 hover:bg-sand/70"
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{pair.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Comparison Card */}
          <div className="bg-sand/30 rounded-3xl border border-charcoal/10 p-4 sm:p-6 space-y-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <span className="text-xs font-bold text-coral uppercase tracking-wider">Clinical Differentiation</span>
                <h4 className="text-lg sm:text-xl font-serif font-bold text-charcoal mt-0.5">
                  {activeSymptom.title}
                </h4>
              </div>
              <div className="px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Suspected: {activeSymptom.condition}</span>
              </div>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Normal Pregnancy Adaptation */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Typical Pregnancy Adaptation (Benign)</span>
                </div>
                <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed">
                  {activeSymptom.normal}
                </p>
                <div className="text-[11px] text-emerald-900/80 font-medium bg-emerald-100/50 rounded-xl p-2 border border-emerald-200/50">
                  ✓ Usually improves with hydration, rest, repositioning, or light food.
                </div>
              </div>

              {/* Urgent Warning Sign */}
              <div className="p-4 rounded-2xl bg-rose-50/80 border-2 border-rose-300 space-y-2">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Urgent Maternal Warning Sign (Action Needed)</span>
                </div>
                <p className="text-xs sm:text-sm text-rose-950 font-medium leading-relaxed">
                  {activeSymptom.urgentWarning}
                </p>
                <div className="text-[11px] text-rose-900 font-bold bg-rose-200/60 rounded-xl p-2 border border-rose-300/80">
                  ⚠️ Never 'wait and see.' Requires immediate clinical and laboratory evaluation.
                </div>
              </div>
            </div>

            {/* Pathophysiology & Testing Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-charcoal/10 space-y-1.5 shadow-2xs">
                <span className="font-bold text-charcoal flex items-center gap-1.5 text-deep-teal">
                  <Brain className="w-3.5 h-3.5" />
                  Pathophysiological Mechanism
                </span>
                <p className="text-charcoal/80 leading-relaxed text-[11px]">
                  {activeSymptom.pathophysiology}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-charcoal/10 space-y-1.5 shadow-2xs">
                <span className="font-bold text-charcoal flex items-center gap-1.5 text-coral">
                  <Stethoscope className="w-3.5 h-3.5" />
                  Diagnostic Orders to Request
                </span>
                <p className="text-charcoal/80 leading-relaxed text-[11px]">
                  {activeSymptom.testsToDemand}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-1.5 shadow-2xs">
                <span className="font-bold text-rose-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  Dangerous Risk if Dismissed
                </span>
                <p className="text-rose-950 leading-relaxed text-[11px]">
                  {activeSymptom.dismissalRisk}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRIAGE CHALLENGE (INTERACTIVE SIMULATOR) */}
      {activeTab === "challenge" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-coral/15 to-sand/60 border border-coral/30">
            <div>
              <span className="text-xs font-bold text-coral uppercase tracking-wider">Clinical Advocacy Simulator</span>
              <h4 className="text-base sm:text-lg font-serif font-bold text-charcoal">
                Triage Decision Room: Challenge {challengeStep + 1} of {challengeCases.length}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-white px-3 py-1 rounded-full border border-charcoal/10 shadow-2xs">
                Advocacy Score: <span className="text-coral">{challengeScore} XP</span>
              </span>
            </div>
          </div>

          {!challengeCompleted ? (
            <div className="rounded-3xl border border-charcoal/15 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
              <div className="p-4 rounded-2xl bg-sand/30 border border-charcoal/10 space-y-2">
                <span className="text-xs font-bold text-deep-teal uppercase tracking-wider">Incoming Patient Encounter</span>
                <h5 className="font-serif font-bold text-charcoal text-base sm:text-lg">
                  {currentChallenge.patient}
                </h5>
                <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-xs sm:text-sm text-rose-950 font-medium">
                  <strong>Reported Symptoms:</strong> {currentChallenge.symptom}
                </div>
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 italic">
                  <strong>Clinical Dismissal Encounter:</strong> {currentChallenge.clinicianSays}
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-bold text-charcoal uppercase tracking-wider">
                  How should you advocate to counter this dismissal?
                </p>
                {currentChallenge.options.map((opt, optIdx) => {
                  const isSelected = challengeAnswer === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={challengeAnswer !== null}
                      onClick={() => {
                        setChallengeAnswer(optIdx);
                        if (opt.isCorrect) setChallengeScore((prev) => prev + 30);
                      }}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm transition-all border ${
                        challengeAnswer === null
                          ? "bg-white hover:bg-sand/40 border-charcoal/15 text-charcoal"
                          : isSelected && opt.isCorrect
                          ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-medium"
                          : isSelected && !opt.isCorrect
                          ? "bg-rose-50 border-rose-500 text-rose-950 font-medium"
                          : opt.isCorrect
                          ? "bg-emerald-50/50 border-emerald-300 text-emerald-900"
                          : "opacity-40 bg-sand/20 border-charcoal/10 text-charcoal/60"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-sand text-charcoal flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {["A", "B", "C"][optIdx]}
                        </span>
                        <div className="space-y-1.5 flex-1">
                          <p>{opt.text}</p>
                          {challengeAnswer !== null && (
                            <div
                              className={`text-[11px] p-2.5 rounded-xl border mt-2 leading-relaxed ${
                                opt.isCorrect
                                  ? "bg-emerald-100/60 border-emerald-300 text-emerald-950 font-semibold"
                                  : "bg-rose-100/60 border-rose-300 text-rose-950"
                              }`}
                            >
                              {opt.feedback}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {challengeAnswer !== null && (
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (challengeStep + 1 < challengeCases.length) {
                        setChallengeStep((prev) => prev + 1);
                        setChallengeAnswer(null);
                      } else {
                        setChallengeCompleted(true);
                      }
                    }}
                    className="px-5 py-2.5 rounded-2xl bg-coral text-white font-bold text-xs sm:text-sm hover:opacity-90 shadow-sm flex items-center gap-2"
                  >
                    <span>{challengeStep + 1 < challengeCases.length ? "Next Clinical Case →" : "Finish Triage Challenge"}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-serif font-bold text-emerald-950">
                Triage Advocacy Mastery Achieved!
              </h4>
              <p className="text-xs sm:text-sm text-emerald-900 max-w-md mx-auto leading-relaxed">
                You successfully advocated through all 3 emergency dismissal cases, demanding the correct diagnostic panels and halting catastrophic clinical cascades!
              </p>
              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-sm">
                Final Score: {challengeScore} XP
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setChallengeStep(0);
                    setChallengeAnswer(null);
                    setChallengeScore(0);
                    setChallengeCompleted(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-all"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: LANDMARK CASES & CDC DATA */}
      {activeTab === "cases" && (
        <div className="space-y-6">
          {/* CDC MMRC Statistics Widget */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-2xl bg-coral/10 border border-coral/30 space-y-1 text-center">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-coral">84%+</span>
              <p className="text-xs text-charcoal/80 font-medium">Preventable Deaths</p>
              <p className="text-[11px] text-charcoal/60">CDC MMRCs confirm over 8 in 10 U.S. maternal deaths could be prevented.</p>
            </div>
            <div className="p-4 rounded-2xl bg-raspberry/10 border border-raspberry/30 space-y-1 text-center">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-raspberry">2.6x – 3x</span>
              <p className="text-xs text-charcoal/80 font-medium">Racial Disparity</p>
              <p className="text-[11px] text-charcoal/60">Black mothers face 3x higher mortality regardless of income or education.</p>
            </div>
            <div className="p-4 rounded-2xl bg-deep-teal/10 border border-deep-teal/30 space-y-1 text-center">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal">#1 Driver</span>
              <p className="text-xs text-charcoal/80 font-medium">Communication Failure</p>
              <p className="text-[11px] text-charcoal/60">Delayed diagnosis and patient dismissal are leading root causes.</p>
            </div>
          </div>

          {/* Case Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {landmarkCases.map((c, idx) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedCaseIdx(idx)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-medium shrink-0 border transition-all ${
                  idx === selectedCaseIdx
                    ? "bg-charcoal text-white border-charcoal shadow-xs font-bold"
                    : "bg-sand/40 text-charcoal/80 border-charcoal/10 hover:bg-sand/70"
                }`}
              >
                {c.name} ({c.year})
              </button>
            ))}
          </div>

          {/* Active Case Dossier */}
          <div className="rounded-3xl border border-charcoal/15 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-charcoal/10">
              <div>
                <h4 className="text-lg sm:text-xl font-serif font-bold text-charcoal">
                  {activeCase.name}
                </h4>
                <p className="text-xs text-coral font-semibold mt-0.5">
                  {activeCase.role} · {activeCase.year}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-200 text-xs font-bold shrink-0">
                {activeCase.diagnosis}
              </span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-charcoal/85">
              <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-1">
                <strong className="text-rose-950 font-semibold block flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  The Dismissal Encounter:
                </strong>
                <p className="text-rose-950">{activeCase.dismissalEncounter}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-sand/40 border border-charcoal/10 space-y-1">
                <strong className="text-charcoal font-semibold block flex items-center gap-1.5 text-deep-teal">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Advocacy & Hospital Response:
                </strong>
                <p>{activeCase.advocacyAction}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <strong className="text-emerald-950 font-semibold block flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Clinical Outcome & Public Health Legacy:
                </strong>
                <p className="text-emerald-950">{activeCase.outcome}</p>
              </div>

              <div className="text-[11px] text-charcoal/60 pt-1">
                <strong>Academic / Legal Citation:</strong> {activeCase.citation}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ADVOCACY PLAYBOOK */}
      {activeTab === "advocacy" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-deep-teal/10 border border-deep-teal/20 text-xs text-deep-teal leading-relaxed space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" />
              Tactical Communication Shields
            </span>
            <p className="text-charcoal/85">
              When communicating with emergency medical personnel, using clinical vocabulary and demanding chart documentation strips away subjective dismissal and enforces standard-of-care clinical protocols.
            </p>
          </div>

          <div className="space-y-4">
            {advocacyScripts.map((item, idx) => (
              <div key={item.id} className="p-4 sm:p-5 rounded-2xl bg-white border border-charcoal/15 shadow-2xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h5 className="font-serif font-bold text-sm sm:text-base text-charcoal">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-coral font-medium mt-0.5">
                      {item.purpose}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyScript(item.script, idx)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sand/60 hover:bg-sand text-charcoal text-xs font-semibold border border-charcoal/10 transition-all shrink-0"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-3.5 h-3.5 text-charcoal/70" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-sand/30 border border-charcoal/10 text-xs sm:text-sm text-charcoal font-serif italic leading-relaxed">
                  {item.script}
                </div>

                <div className="text-[11px] text-charcoal/75 bg-sand/20 rounded-xl p-2.5 border border-charcoal/10">
                  <strong>Why this works:</strong> {item.whyItWorks}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

