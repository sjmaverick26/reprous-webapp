"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Flame,
  Gamepad2,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  RotateCcw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Trophy,
  Users,
  Video,
  Zap,
} from "lucide-react";
import {
  HubTopic,
  getTopicClinicalQuote,
  getTopicRoleplayScenarios,
} from "@/data/hubData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InteractiveLessonDiagram } from "@/components/shared/InteractiveLessonDiagram";
import { OvertrainingBodyInspectionDiagram } from "@/components/shared/OvertrainingBodyInspectionDiagram";
import { LessonVideoCard } from "@/components/shared/LessonVideoCard";
import { LessonSorterGameComponent } from "@/components/shared/LessonSorterGame";
import { RoleplayInteractiveStage } from "@/components/shared/RoleplayInteractiveStage";
import { InteractiveQuizGame, QuizQuestion } from "@/components/shared/InteractiveQuizGame";
import { FuelUpNutritionGame } from "@/components/shared/FuelUpNutritionGame";
import { FemaleNourishmentPlateGame } from "@/components/shared/FemaleNourishmentPlateGame";
import {
  HormoneWaveChart,
  CycleVitalSignsDashboard,
  TannerProgressionChart,
  RotterdamCriteriaRadar,
  ContraceptionEfficacyPyramid,
} from "@/components/shared/LessonVisualCharts";

interface FullPageLessonExperienceProps {
  topic: HubTopic;
  categoryId: string;
  categoryTitle: string;
  categoryBadge: string;
  onBack: () => void;
  onComplete: (topic: HubTopic) => void;
  isCompleted: boolean;
  onNavigateToTopic?: (topicId: string) => void;
  siblingTopics?: HubTopic[];
}

export function FullPageLessonExperience({
  topic,
  categoryId,
  categoryTitle,
  categoryBadge,
  onBack,
  onComplete,
  isCompleted,
  onNavigateToTopic,
  siblingTopics = [],
}: FullPageLessonExperienceProps) {
  // 5-Step Stepper: 1: Introduction, 2: Learn, 3: Activity, 4: Knowledge Check, 5: Resources & Next Steps
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([1]));

  // Roleplay Simulation State (if applicable)
  const [activeSimulationIdx, setActiveSimulationIdx] = useState<number>(0);
  const [simulationSelections, setSimulationSelections] = useState<Record<number, number>>({});
  const [simulationBonuses, setSimulationBonuses] = useState<Record<number, boolean>>({});

  // Reset or scroll on step / topic changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep, topic.id]);

  const goToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    setVisitedSteps((prev) => new Set([...Array.from(prev), stepNumber]));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      goToStep(currentStep + 1);
    } else {
      onComplete(topic);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  const handleCopyScript = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2500);
    }
  };

  const clinicalQuote = getTopicClinicalQuote(topic, categoryId);
  const roleplayScenarios = getTopicRoleplayScenarios(topic, categoryId);
  const activeScenario = roleplayScenarios[activeSimulationIdx] || roleplayScenarios[0];

  const advocacyData = topic.advocacyScript || {
    situation: `When discussing ${topic.name.toLowerCase()} or questions about your body with a physician, gynecologist, or nurse practitioner.`,
    doctorScript: `“I have questions and observations regarding ${topic.name.toLowerCase()}. Here is what I have been tracking over recent cycles. What clinical evaluation or diagnostic steps do you recommend to investigate this further?”`,
    whyItWorks: "Framing your questions around objective symptom tracking and clinical definitions invites your clinician into shared problem-solving.",
    whatIfDismissed: "Ask calmly: ‘Could you please document in my electronic health record that I reported these symptoms today and note why further evaluation is not indicated at this time?’",
  };

  // Fallback quiz questions if topic doesn't define custom ones
  const defaultQuestions: QuizQuestion[] = [
    {
      question: `What is the most clinically effective first step when navigating ${topic.name.toLowerCase()}?`,
      options: [
        "Wait multiple months and assume severe pain or irregular symptoms are normal.",
        "Track symptoms objectively (dates, severity 1-10, cycle timing) and bring written notes to a provider.",
        "Rely strictly on unverified social media tips rather than accredited guidelines.",
        "Ignore changes in your energy levels or cycle patterns completely.",
      ],
      correctIndex: 1,
      explanation:
        "Documenting concrete dates, duration, and pain scores gives healthcare providers objective evidence, accelerating diagnosis and preventing symptom dismissal.",
    },
    {
      question: "Why does ReproUs emphasize understanding biological mechanisms before clinical appointments?",
      options: [
        "To replace the need to ever consult a physician or clinician.",
        "To memorize medical jargon for school exams.",
        "Because knowing how your hormones and organs function gives you the confidence to ask informed questions and advocate for your care.",
        "To diagnose your own complex reproductive conditions without medical testing.",
      ],
      correctIndex: 2,
      explanation:
        "Health literacy transforms patient-provider conversations from passive listening to collaborative, informed decision-making.",
    },
  ];

  const quizQuestions: QuizQuestion[] =
    topic.quiz && topic.quiz.length > 0 ? (topic.quiz as QuizQuestion[]) : defaultQuestions;

  const stepsConfig = [
    { number: 1, title: "Introduction", short: "Intro", desc: "Foundations & Overview" },
    { number: 2, title: "Learn", short: "Learn", desc: "Physiology & Concepts" },
    { number: 3, title: "Interactive Activity", short: "Activity", desc: "Hands-On Experience" },
    { number: 4, title: "Knowledge Check", short: "Quiz", desc: "Scenario Questions" },
    { number: 5, title: "Resources & Next Steps", short: "Resources", desc: "Advocacy & Next Steps" },
  ];

  // Specific visual physiology chart renderer for Step 2
  const renderPhysiologyChart = () => {
    if (categoryId === "cycle") {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal">
            <Sparkles className="w-4 h-4 text-coral" />
            <span>Interactive Hormonal Wave & Cycle Phases</span>
          </div>
          <HormoneWaveChart />
          <CycleVitalSignsDashboard />
        </div>
      );
    }
    if (categoryId === "body") {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal">
            <Sparkles className="w-4 h-4 text-coral" />
            <span>Tanner Staging & Anatomical Development</span>
          </div>
          <TannerProgressionChart />
        </div>
      );
    }
    if (categoryId === "conditions" || categoryId === "pcos" || categoryId === "endo") {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal">
            <Sparkles className="w-4 h-4 text-coral" />
            <span>Diagnostic Radar & Criteria Analysis</span>
          </div>
          <RotterdamCriteriaRadar />
        </div>
      );
    }
    if (categoryId === "realtalk" || categoryId === "factors") {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal">
            <Sparkles className="w-4 h-4 text-coral" />
            <span>Contraceptive Efficacy & Tiered Comparison</span>
          </div>
          <ContraceptionEfficacyPyramid />
        </div>
      );
    }
    return null;
  };

  // Step 3 Interactive Activity Renderer
  const renderInteractiveActivity = () => {
    // 1. Athlete Arcade / Fuel Up (play-1)
    if (topic.id === "play-1" || topic.name.toLowerCase().includes("fuel up")) {
      return (
        <div className="space-y-6">
          <div className="rounded-2xl bg-slate-900 text-white p-6 shadow-md border-2 border-gold/40">
            <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-2">
              <Gamepad2 className="w-4 h-4" />
              <span>Interactive Athlete Fueling Experience</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-white mb-2">
              Athlete Nutrition &amp; Fueling Simulation
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed font-sans mb-4">
              Explore how carbohydrates, protein, and hydration support peak athletic endurance and hormone stability.
            </p>
            <FemaleNourishmentPlateGame initialTab="game" />
          </div>
        </div>
      );
    }

    // 2. Overtraining & Under-Recovery Full-Body Inspection (play-2)
    if (
      topic.id === "play-2" ||
      topic.diagram?.type === "reds-triangle" ||
      topic.name.toLowerCase().includes("overtraining") ||
      topic.name.toLowerCase().includes("overworking")
    ) {
      return (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-sans flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Tap each anatomical hotspot to examine how energy deficiency cascades through the brain, bones, metabolic rate, and reproductive system.
            </span>
          </div>
          <OvertrainingBodyInspectionDiagram diagram={topic.diagram} themeColor="#175B5C" />
        </div>
      );
    }

    // 3. Athlete Plate / Fueling Diagram
    if (topic.diagram?.type === "athlete-plate") {
      return (
        <div className="space-y-6">
          <FemaleNourishmentPlateGame initialTab="plate" />
        </div>
      );
    }

    // 4. Custom Sorter Game
    if (topic.sorterGame) {
      return (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-light-teal/50 border border-deep-teal/20 text-deep-teal text-xs sm:text-sm font-sans flex items-start gap-2.5">
            <Gamepad2 className="w-4 h-4 text-coral shrink-0 mt-0.5" />
            <span>
              Categorize each scenario into the correct clinical bucket to test your instincts and earn XP.
            </span>
          </div>
          <LessonSorterGameComponent
            game={topic.sorterGame}
            themeColor="#175B5C"
            onGameComplete={() => {}}
          />
        </div>
      );
    }

    // 5. Doctor-Patient Roleplay Simulation
    if (roleplayScenarios.length > 0 && (topic.roleplayScenarios || topic.isAdvocateCapstone)) {
      return (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-soft-pink/50 border border-raspberry/20 text-raspberry text-xs sm:text-sm font-sans flex items-start gap-2.5">
            <MessageSquare className="w-4 h-4 text-raspberry shrink-0 mt-0.5" />
            <span>
              Practice clinical self-advocacy in a realistic doctor appointment simulation. Choose the response that establishes your symptoms clearly.
            </span>
          </div>
          <RoleplayInteractiveStage
            scenario={activeScenario}
            selectedOption={simulationSelections[activeSimulationIdx] ?? null}
            onSelectOption={(idx) => {
              setSimulationSelections((prev) => ({ ...prev, [activeSimulationIdx]: idx }));
            }}
            bonusEarned={simulationBonuses[activeSimulationIdx] ?? false}
            simulationIndex={activeSimulationIdx}
            totalSimulations={roleplayScenarios.length}
            simulationTitle={`Simulation ${activeSimulationIdx + 1} of ${roleplayScenarios.length}`}
            onNextSimulation={
              activeSimulationIdx < roleplayScenarios.length - 1
                ? () => {
                    setActiveSimulationIdx((prev) => prev + 1);
                  }
                : undefined
            }
            topicId={topic.id}
            categoryId={categoryId}
          />
        </div>
      );
    }

    // 6. Labeled Interactive Anatomical or Physiological Diagram
    if (topic.diagram) {
      return (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-light-teal/50 border border-deep-teal/20 text-deep-teal text-xs sm:text-sm font-sans flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-coral shrink-0 mt-0.5" />
            <span>
              Interact with the visual diagram below. Tap labels, phases, and components to inspect clinical details and evidence.
            </span>
          </div>
          <InteractiveLessonDiagram diagram={topic.diagram} themeColor="#175B5C" />
        </div>
      );
    }

    // 7. General Interactive Signal Explorer
    return (
      <div className="rounded-3xl bg-white p-6 sm:p-8 border-2 border-deep-teal/15 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal">
          <ShieldCheck className="w-4 h-4 text-coral" />
          <span>Interactive Clinical Signal Explorer</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-deep-teal">
          Evaluating What Your Body Is Telling You
        </h3>
        <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
          Review the common observations and clinical indicators associated with {topic.name.toLowerCase()}. Notice which signals warrant a discussion with a healthcare provider.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-light-teal/40 border border-deep-teal/20 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <h4 className="font-bold text-sm text-deep-teal">Normal Physiological Variations</h4>
            </div>
            <p className="text-xs sm:text-[13px] text-charcoal/80 leading-relaxed font-sans">
              Mild cramping relieved by warmth or standard OTC pain relief, minor mood fluctuations corresponding to the luteal phase, and natural cycle length shifts during adolescence.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFE1DB]/60 border border-coral/30 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-coral" />
              <h4 className="font-bold text-sm text-coral">Signals Warranting Clinical Attention</h4>
            </div>
            <p className="text-xs sm:text-[13px] text-charcoal/80 leading-relaxed font-sans">
              Pain requiring missing school or sports, bleeding soaking through a pad or tampon in under an hour, or cycles absent for more than 90 consecutive days.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-warm-cream text-charcoal flex flex-col font-sans">
      {/* 1. Sticky Top Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-deep-teal/15 px-4 sm:px-8 py-3.5 shadow-xs transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {/* Back button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-deep-teal hover:text-raspberry transition-colors py-1.5 px-3 rounded-full hover:bg-light-teal/60 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to</span>
            <span className="truncate max-w-[140px] sm:max-w-none">{categoryTitle}</span>
          </button>

          {/* Topic Title in header */}
          <div className="hidden md:flex flex-col items-center text-center">
            <div className="text-[10.5px] font-bold uppercase tracking-wider text-charcoal/60">
              {categoryBadge} · Full-Page Lesson
            </div>
            <div className="text-sm font-serif font-bold text-deep-teal truncate max-w-sm">
              {topic.name}
            </div>
          </div>

          {/* Badges / XP */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light-teal text-deep-teal text-xs font-bold border border-deep-teal/20">
              <Sparkles className="w-3.5 h-3.5 text-coral" />
              <span>+{topic.xp} XP</span>
            </div>
            {isCompleted && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mastered</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 2. Standardized 5-Step Stepper Bar */}
      <nav
        aria-label="Lesson Progress Steps"
        className="w-full bg-white border-b border-deep-teal/10 px-4 sm:px-8 py-3 shadow-2xs"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-1 sm:gap-2">
            {stepsConfig.map((s) => {
              const isActive = currentStep === s.number;
              const isPast = currentStep > s.number || visitedSteps.has(s.number);

              return (
                <button
                  key={s.number}
                  onClick={() => goToStep(s.number)}
                  className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-1.5 sm:px-3 rounded-xl sm:rounded-2xl transition-all cursor-pointer text-left ${
                    isActive
                      ? "bg-deep-teal text-white shadow-sm font-bold scale-[1.02]"
                      : isPast
                      ? "bg-light-teal/50 hover:bg-light-teal text-deep-teal font-medium"
                      : "bg-slate-50 hover:bg-slate-100 text-charcoal/60"
                  }`}
                  title={`${s.title}: ${s.desc}`}
                >
                  <span
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 ${
                      isActive
                        ? "bg-white text-deep-teal"
                        : isPast
                        ? "bg-deep-teal text-white"
                        : "bg-charcoal/20 text-charcoal"
                    }`}
                  >
                    {isPast && !isActive ? <Check className="w-3 h-3" /> : s.number}
                  </span>
                  <span className="hidden md:inline text-xs sm:text-[13px] truncate">
                    {s.title}
                  </span>
                  <span className="inline md:hidden text-[11px] font-semibold truncate">
                    {s.short}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 3. Main Focused Lesson Content Canvas */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 md:px-8 py-8 md:py-12">
        {/* ============================================================ */}
        {/* STEP 1: INTRODUCTION */}
        {/* ============================================================ */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header info */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-light-teal text-deep-teal border border-deep-teal/20 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-coral" />
                <span>Step 1 of 5 · Clinical Foundations &amp; Overview</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-deep-teal leading-tight mb-3">
                {topic.name}
              </h1>
              <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans max-w-3xl">
                {topic.desc}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-4 text-xs font-semibold text-charcoal/70">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-deep-teal/15 shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-coral" />
                  <span>4–6 min read &amp; activity</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-deep-teal/15 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Evidence-based clinical standards</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-deep-teal/15 shadow-2xs">
                  <Trophy className="w-3.5 h-3.5 text-gold" />
                  <span>+{topic.xp} XP upon completion</span>
                </span>
              </div>
            </div>

            {/* Core Question Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-deep-teal/15 shadow-card text-left">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-raspberry mb-2 font-sans">
                <HelpCircle className="w-4 h-4 text-raspberry" />
                <span>The Core Question This Guide Answers</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-deep-teal mb-3 leading-snug">
                “How does this affect my daily body function, and how do I know when something is worth bringing to a doctor?”
              </h2>
              <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-sans">
                Many adolescent and young adult bodily changes are normalized or dismissed as &ldquo;just part of growing up.&rdquo; This lesson equips you with clinical definitions, anatomical context, and objective self-advocacy language.
              </p>
            </div>

            {/* 3 Core Key Takeaways */}
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-bold text-deep-teal">
                3 Key Takeaways You&apos;ll Master
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-deep-teal/15 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-light-teal text-deep-teal flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="font-bold text-sm text-deep-teal">Biological Foundations</h4>
                  <p className="text-xs text-charcoal/75 leading-relaxed font-sans">
                    Learn the physiology and endocrine feedback loops governing this part of your health.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-coral/30 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FFE1DB] text-coral flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="font-bold text-sm text-coral">Symptom Recognition</h4>
                  <p className="text-xs text-charcoal/75 leading-relaxed font-sans">
                    Differentiate between expected variations and clinical signs that deserve medical review.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-raspberry/20 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-soft-pink text-raspberry flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="font-bold text-sm text-raspberry">Self-Advocacy Power</h4>
                  <p className="text-xs text-charcoal/75 leading-relaxed font-sans">
                    Gain verbatim scripts and symptom tracking methods to be taken seriously in clinical visits.
                  </p>
                </div>
              </div>
            </div>

            {/* Accredited Clinical Literature Quote */}
            {clinicalQuote && (
              <div className="rounded-3xl p-6 sm:p-7 bg-light-teal/40 border-2 border-deep-teal/20 text-deep-teal space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-deep-teal/80 bg-white/80 px-2.5 py-1 rounded-full border border-deep-teal/20">
                    ✦ Accredited Clinical Guideline · {clinicalQuote.source}
                  </span>
                  {clinicalQuote.year && (
                    <span className="text-xs font-semibold text-deep-teal/70">
                      Guideline Year: {clinicalQuote.year}
                    </span>
                  )}
                </div>
                <blockquote className="text-base sm:text-lg font-serif italic text-deep-teal leading-relaxed">
                  &ldquo;{clinicalQuote.quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between text-xs text-charcoal/75 pt-2 border-t border-deep-teal/15">
                  <span className="font-semibold text-deep-teal">{clinicalQuote.publication}</span>
                </div>
              </div>
            )}

            {/* Step 1 Completion / Next Button */}
            <div className="pt-6 border-t border-deep-teal/15 flex items-center justify-end">
              <Button
                onClick={nextStep}
                size="lg"
                className="bg-deep-teal hover:bg-deep-teal/90 text-white font-bold gap-2 text-sm sm:text-base px-6 py-6 rounded-2xl shadow-md cursor-pointer"
              >
                <span>Continue to Step 2: Learn</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: LEARN */}
        {/* ============================================================ */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-light-teal text-deep-teal border border-deep-teal/20 mb-3">
                <BookOpen className="w-3.5 h-3.5 text-coral" />
                <span>Step 2 of 5 · Physiology &amp; Core Concepts</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-deep-teal mb-3">
                Understanding the Biology of {topic.name}
              </h2>
              <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
                Explore the cellular, hormonal, and anatomical mechanisms beneath the surface. Real science without condescension or medical gatekeeping.
              </p>
            </div>

            {/* Category Physiology / Diagnostic Chart */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-deep-teal/15 shadow-card space-y-4">
              {renderPhysiologyChart() || (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal">
                    <Lightbulb className="w-4 h-4 text-coral" />
                    <span>Biological Mechanism Overview</span>
                  </div>
                  <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed font-sans">
                    {topic.desc}
                  </p>
                </div>
              )}
            </div>

            {/* Visual Concept Cards (if provided in topic) */}
            {topic.visualCards && topic.visualCards.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-deep-teal">
                  Key Physiological Principles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topic.visualCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-deep-teal/15 shadow-xs space-y-2 hover:border-coral/40 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-light-teal text-deep-teal flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-sm text-deep-teal">{card.title}</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans">
                        {card.text}
                      </p>
                      {card.highlight && (
                        <div className="inline-block text-[11px] font-bold text-coral bg-[#FFE1DB]/50 px-2 py-0.5 rounded-md">
                          {card.highlight}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Card (if topic has a video) */}
            {topic.video && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal">
                  <Video className="w-4 h-4 text-raspberry" />
                  <span>Educational Video Walkthrough</span>
                </div>
                <LessonVideoCard video={topic.video} themeColor="#175B5C" />
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-6 border-t border-deep-teal/15 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-deep-teal/20 text-deep-teal hover:bg-light-teal cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Introduction</span>
              </Button>
              <Button
                onClick={nextStep}
                size="lg"
                className="bg-deep-teal hover:bg-deep-teal/90 text-white font-bold gap-2 text-sm sm:text-base px-6 py-6 rounded-2xl shadow-md cursor-pointer"
              >
                <span>Continue to Step 3: Interactive Activity</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: INTERACTIVE ACTIVITY */}
        {/* ============================================================ */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-light-teal text-deep-teal border border-deep-teal/20 mb-3">
                <Gamepad2 className="w-3.5 h-3.5 text-coral" />
                <span>Step 3 of 5 · Hands-On Interactive Activity</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-deep-teal mb-3">
                Put Knowledge Into Practice
              </h2>
              <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
                Learning health concepts is most effective when you can interact, test scenarios, and manipulate visual models directly.
              </p>
            </div>

            {/* Interactive component container */}
            <div className="w-full">
              {renderInteractiveActivity()}
            </div>

            {/* Navigation buttons */}
            <div className="pt-6 border-t border-deep-teal/15 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-deep-teal/20 text-deep-teal hover:bg-light-teal cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Learn</span>
              </Button>
              <Button
                onClick={nextStep}
                size="lg"
                className="bg-deep-teal hover:bg-deep-teal/90 text-white font-bold gap-2 text-sm sm:text-base px-6 py-6 rounded-2xl shadow-md cursor-pointer"
              >
                <span>Continue to Step 4: Knowledge Check</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 4: KNOWLEDGE CHECK */}
        {/* ============================================================ */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-light-teal text-deep-teal border border-deep-teal/20 mb-3">
                <Trophy className="w-3.5 h-3.5 text-coral" />
                <span>Step 4 of 5 · Knowledge Check &amp; Scenario Quiz</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-deep-teal mb-3">
                Confirm Your Understanding
              </h2>
              <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
                Test your grasp of the biological mechanisms and symptom recognition rules. Immediate explanations are provided for every answer.
              </p>
            </div>

            {/* Interactive Scenario Quiz Game Component */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border-2 border-deep-teal/15 shadow-card">
              <InteractiveQuizGame
                questions={quizQuestions}
                topicName={topic.name}
                topicXp={topic.xp}
                onComplete={() => {}}
              />
            </div>

            {/* Navigation buttons */}
            <div className="pt-6 border-t border-deep-teal/15 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-deep-teal/20 text-deep-teal hover:bg-light-teal cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Activity</span>
              </Button>
              <Button
                onClick={nextStep}
                size="lg"
                className="bg-deep-teal hover:bg-deep-teal/90 text-white font-bold gap-2 text-sm sm:text-base px-6 py-6 rounded-2xl shadow-md cursor-pointer"
              >
                <span>Continue to Step 5: Resources &amp; Next Steps</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 5: RESOURCES & NEXT STEPS */}
        {/* ============================================================ */}
        {currentStep === 5 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-light-teal text-deep-teal border border-deep-teal/20 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-coral" />
                <span>Step 5 of 5 · Resources, Self-Advocacy &amp; Next Steps</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-deep-teal mb-3">
                Taking Action With Confidence
              </h2>
              <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-sans">
                Knowledge matters most when you can use it in the real world. Here is your practical communication blueprint for clinical appointments.
              </p>
            </div>

            {/* Doctor Discussion Script Card */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border-2 border-deep-teal/15 shadow-card space-y-6 text-left">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-raspberry">
                  <Stethoscope className="w-4 h-4" />
                  <span>Doctor Discussion Script</span>
                </div>
                <Button
                  onClick={() => handleCopyScript(advocacyData.doctorScript)}
                  size="sm"
                  variant="outline"
                  className="rounded-full text-xs font-bold border-deep-teal/20 text-deep-teal hover:bg-light-teal gap-1.5 cursor-pointer"
                >
                  {copiedScript ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-coral" />
                      <span>Copy Script</span>
                    </>
                  )}
                </Button>
              </div>

              {/* The verbatim script box */}
              <div className="p-5 rounded-2xl bg-light-teal/40 border border-deep-teal/20 text-deep-teal">
                <p className="text-xs font-bold uppercase tracking-wider text-deep-teal/70 mb-1.5 font-sans">
                  Situation: {advocacyData.situation}
                </p>
                <p className="text-base sm:text-lg font-serif italic text-deep-teal leading-relaxed">
                  {advocacyData.doctorScript}
                </p>
              </div>

              {/* Why it works & What if dismissed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <h4 className="font-bold text-sm text-deep-teal">Why This Script Works</h4>
                  </div>
                  <p className="text-xs sm:text-[13px] text-charcoal/80 leading-relaxed font-sans">
                    {advocacyData.whyItWorks}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FFE1DB]/40 border border-coral/30 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-coral" />
                    <h4 className="font-bold text-sm text-coral">What If You Feel Dismissed?</h4>
                  </div>
                  <p className="text-xs sm:text-[13px] text-charcoal/80 leading-relaxed font-sans">
                    {advocacyData.whatIfDismissed}
                  </p>
                </div>
              </div>
            </div>

            {/* Big Complete Lesson & Claim XP Card */}
            <div className="rounded-3xl p-8 bg-gradient-to-br from-deep-teal via-teal-900 to-deep-teal-dark text-white shadow-xl text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-8 h-8 text-gold" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1">
                  Ready to Complete This Lesson?
                </h3>
                <p className="text-sm text-light-teal/90 max-w-md mx-auto font-sans">
                  You have reviewed the biology, tested your skills, and unlocked your self-advocacy script.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => onComplete(topic)}
                  size="lg"
                  className="bg-coral hover:bg-coral/90 text-white font-bold text-base px-8 py-6 rounded-2xl shadow-lg hover:scale-105 transition-all gap-2 cursor-pointer border border-white/20"
                >
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span>{isCompleted ? "Review Completed ✓" : `Complete Lesson & Claim +${topic.xp} XP`}</span>
                </Button>
              </div>
            </div>

            {/* Sibling Topic Recommendations */}
            {siblingTopics.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-serif font-bold text-deep-teal">
                  Continue Exploring in {categoryTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {siblingTopics
                    .filter((t) => t.id !== topic.id)
                    .slice(0, 3)
                    .map((sibling) => (
                      <button
                        key={sibling.id}
                        onClick={() => onNavigateToTopic?.(sibling.id)}
                        className="p-5 rounded-2xl bg-white border border-deep-teal/15 shadow-xs hover:border-coral/40 hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between cursor-pointer"
                      >
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-raspberry">
                            {sibling.type}
                          </span>
                          <h4 className="font-serif font-bold text-deep-teal text-base mt-1 mb-2">
                            {sibling.name}
                          </h4>
                          <p className="text-xs text-charcoal/70 line-clamp-2 font-sans">
                            {sibling.desc}
                          </p>
                        </div>
                        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-coral">
                          <span>+{sibling.xp} XP</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Navigation back */}
            <div className="pt-6 border-t border-deep-teal/15 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-deep-teal/20 text-deep-teal hover:bg-light-teal cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Knowledge Check</span>
              </Button>
              <Button
                variant="outline"
                onClick={onBack}
                className="border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-white cursor-pointer"
              >
                <span>Return to {categoryTitle}</span>
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* 4. Bottom Sticky Progression Control Bar */}
      <footer className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-deep-teal/15 px-4 sm:px-8 py-3.5 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="rounded-full text-xs font-bold border-deep-teal/20 text-deep-teal hover:bg-light-teal disabled:opacity-40 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            <span className="hidden sm:inline">Previous Step</span>
            <span className="inline sm:hidden">Prev</span>
          </Button>

          <div className="flex items-center gap-2 text-xs font-semibold text-charcoal/75 font-sans">
            <span className="font-bold text-deep-teal">Step {currentStep} of 5</span>
            <span className="hidden sm:inline text-charcoal/40">•</span>
            <span className="hidden sm:inline">{stepsConfig[currentStep - 1]?.title}</span>
          </div>

          <Button
            size="sm"
            onClick={nextStep}
            className="rounded-full bg-deep-teal hover:bg-deep-teal/90 text-white font-bold text-xs gap-1.5 shadow-sm cursor-pointer"
          >
            <span>{currentStep === 5 ? "Complete Lesson ✓" : "Next Step"}</span>
            {currentStep < 5 && <ArrowRight className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </footer>
    </div>
  );
}
