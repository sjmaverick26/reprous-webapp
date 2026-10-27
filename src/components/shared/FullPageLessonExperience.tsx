"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Maximize2,
  Minimize2,
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
  X,
  Zap,
} from "lucide-react";
import {
  HubTopic,
  getTopicClinicalQuote,
  getTopicRoleplayScenarios,
} from "@/data/hubData";
import { Button } from "@/components/ui/button";
import { InteractiveLessonDiagram } from "@/components/shared/InteractiveLessonDiagram";
import { OvertrainingBodyInspectionDiagram } from "@/components/shared/OvertrainingBodyInspectionDiagram";
import { LessonVideoCard } from "@/components/shared/LessonVideoCard";
import { LessonSorterGameComponent } from "@/components/shared/LessonSorterGame";
import { RoleplayInteractiveStage } from "@/components/shared/RoleplayInteractiveStage";
import { InteractiveQuizGame, QuizQuestion } from "@/components/shared/InteractiveQuizGame";
import { FemaleNourishmentPlateGame } from "@/components/shared/FemaleNourishmentPlateGame";
import {
  HormoneWaveChart,
  CycleVitalSignsDashboard,
  TannerProgressionChart,
  RotterdamCriteriaRadar,
  ContraceptionEfficacyPyramid,
} from "@/components/shared/LessonVisualCharts";
import { ScrollProgressIndicator } from "@/components/layout/ScrollProgressIndicator";

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
  const [isBrowserFullScreen, setIsBrowserFullScreen] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Roleplay Simulation State (if applicable)
  const [activeSimulationIdx, setActiveSimulationIdx] = useState<number>(0);
  const [simulationSelections, setSimulationSelections] = useState<Record<number, number>>({});
  const [simulationBonuses, setSimulationBonuses] = useState<Record<number, boolean>>({});

  // 1. Lock document body scroll while full-screen immersive lesson is active
  useEffect(() => {
    if (typeof document === "undefined") return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // 2. Browser Fullscreen API integration & listener
  const toggleBrowserFullScreen = async () => {
    if (typeof document === "undefined") return;
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
          setIsBrowserFullScreen(true);
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsBrowserFullScreen(false);
        }
      }
    } catch (err) {
      console.warn("Fullscreen toggle warning:", err);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsBrowserFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
    };
  }, []);

  // 3. Escape key listener to exit lesson when not in browser fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) {
        onBack();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onBack]);

  // 4. Smoothly reset scroll position on step or topic change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
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

  const isAdvocateLesson =
    topic.isAdvocateCapstone ||
    topic.name.toLowerCase().includes("advocate") ||
    topic.name.toLowerCase().includes("rights") ||
    topic.id.toLowerCase().includes("advocate") ||
    Boolean(topic.roleplayScenarios && topic.roleplayScenarios.length > 0) ||
    Boolean(topic.roleplayScenario);

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
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal font-sans">
            <Sparkles className="w-4 h-4 text-coral" />
            <span>Interactive Hormonal Wave &amp; Cycle Phases</span>
          </div>
          <HormoneWaveChart />
          <CycleVitalSignsDashboard />
        </div>
      );
    }
    if (categoryId === "body") {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal font-sans">
            <Sparkles className="w-4 h-4 text-coral" />
            <span>Tanner Staging &amp; Anatomical Development</span>
          </div>
          <TannerProgressionChart />
        </div>
      );
    }
    if (categoryId === "conditions" || categoryId === "pcos" || categoryId === "endo") {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal font-sans">
            <Sparkles className="w-4 h-4 text-coral" />
            <span>Diagnostic Radar &amp; Criteria Analysis</span>
          </div>
          <RotterdamCriteriaRadar />
        </div>
      );
    }
    if (categoryId === "realtalk" || categoryId === "factors") {
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal font-sans">
            <Sparkles className="w-4 h-4 text-coral" />
            <span>Contraceptive Efficacy &amp; Tiered Comparison</span>
          </div>
          <ContraceptionEfficacyPyramid />
        </div>
      );
    }
    return null;
  };

  // Shared Multi-Stage Roleplay Simulation Suite Renderer
  const renderRoleplaySuite = (contextNotice?: string) => {
    if (roleplayScenarios.length === 0) return null;

    return (
      <div className="space-y-6">
        <div className="p-4 sm:p-5 rounded-2xl bg-soft-pink/50 border border-raspberry/20 text-raspberry text-xs sm:text-sm font-sans flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-start gap-2.5">
            <MessageSquare className="w-4 h-4 text-raspberry shrink-0 mt-0.5" />
            <span>
              {contextNotice ||
                "Practice clinical self-advocacy in realistic simulations. Choose the response that establishes your symptoms and cites clinical guidelines."}
            </span>
          </div>
          <span className="text-xs font-bold text-raspberry font-sans bg-white px-2.5 py-1 rounded-full border border-raspberry/30">
            {roleplayScenarios.length} Interactive Scenarios
          </span>
        </div>

        {/* Multi-Simulation Track Selector Tabs */}
        {roleplayScenarios.length > 1 && (
          <div className="rounded-3xl border-2 border-raspberry/20 bg-gradient-to-r from-raspberry/5 via-white to-light-teal/15 p-4 sm:p-5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between gap-3 flex-wrap text-xs font-sans">
              <span className="font-bold text-deep-teal uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-raspberry" />
                <span>
                  Clinical Simulation Track ({activeSimulationIdx + 1} of {roleplayScenarios.length}):
                </span>
              </span>
              <span className="font-bold text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full text-xs border border-emerald-300 shadow-2xs">
                {Object.values(simulationBonuses).filter(Boolean).length} of {roleplayScenarios.length} Scenarios Solved · +
                {Object.values(simulationBonuses).filter(Boolean).length * 30} XP
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {roleplayScenarios.map((sim, idx) => {
                const isSimActive = activeSimulationIdx === idx;
                const isSolved = simulationBonuses[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSimulationIdx(idx)}
                    className={`flex items-center justify-between gap-2.5 p-3 rounded-2xl border-2 text-left transition-all cursor-pointer font-sans text-xs sm:text-[13px] ${
                      isSimActive
                        ? "bg-raspberry text-white border-raspberry shadow-sm font-bold scale-[1.01]"
                        : isSolved
                        ? "bg-emerald-50 text-emerald-950 border-emerald-300 font-semibold hover:bg-emerald-100"
                        : "bg-white text-charcoal/80 border-slate-200 hover:border-deep-teal/40 font-medium hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSimActive
                            ? "bg-white text-raspberry"
                            : isSolved
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-200 text-charcoal/70"
                        }`}
                      >
                        {isSolved ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                      </span>
                      <span className="truncate">{sim.phaseName || sim.title || `Simulation ${idx + 1}`}</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        isSimActive
                          ? "bg-white/20 text-white"
                          : isSolved
                          ? "bg-emerald-200 text-emerald-900"
                          : "bg-slate-100 text-charcoal/60"
                      }`}
                    >
                      +30 XP
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Interactive Consultation Stage with Animated Characters */}
        <RoleplayInteractiveStage
          scenario={activeScenario}
          selectedOption={simulationSelections[activeSimulationIdx] ?? null}
          onSelectOption={(idx) => {
            setSimulationSelections((prev) => ({ ...prev, [activeSimulationIdx]: idx }));
            if (activeScenario.options[idx].isBest && !simulationBonuses[activeSimulationIdx]) {
              setSimulationBonuses((prev) => ({ ...prev, [activeSimulationIdx]: true }));
            }
          }}
          bonusEarned={simulationBonuses[activeSimulationIdx] ?? false}
          simulationIndex={activeSimulationIdx}
          totalSimulations={roleplayScenarios.length}
          simulationTitle={
            activeScenario.phaseName ||
            activeScenario.title ||
            `Simulation ${activeSimulationIdx + 1} of ${roleplayScenarios.length}`
          }
          onNextSimulation={
            activeSimulationIdx < roleplayScenarios.length - 1
              ? () => setActiveSimulationIdx((prev) => prev + 1)
              : undefined
          }
          topicId={topic.id}
          categoryId={categoryId}
        />

        {/* Clinical Evidence & Guidelines Source Box */}
        {activeScenario.sourceCitation && (
          <div className="rounded-3xl border-2 border-emerald-600/25 bg-emerald-50/80 p-5 sm:p-6 text-xs font-sans text-emerald-950 space-y-3 shadow-2xs">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  ✦
                </div>
                <div>
                  <h5 className="font-serif font-bold text-emerald-950 text-sm sm:text-base">
                    Clinical Evidence &amp; Guideline Authority
                  </h5>
                  <p className="text-xs text-emerald-800 font-sans">
                    {activeScenario.sourceCitation.organization}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-emerald-300 text-emerald-900 font-bold text-xs shadow-2xs">
                {activeScenario.sourceCitation.year}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed font-sans italic border-l-2 border-emerald-600 pl-3 py-0.5">
              &ldquo;{activeScenario.sourceCitation.guideline}&rdquo;
            </p>
          </div>
        )}
      </div>
    );
  };

  // Step 3 Interactive Activity Renderer
  const renderInteractiveActivity = () => {
    // 1. Athlete Arcade / Fuel Up (play-1)
    if (topic.id === "play-1" || topic.name.toLowerCase().includes("fuel up")) {
      return (
        <div className="space-y-6">
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-md border-2 border-gold/40">
            <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-2">
              <Gamepad2 className="w-4 h-4" />
              <span>Interactive Athlete Fueling Experience</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              Athlete Nutrition &amp; Fueling Simulation
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans mb-6">
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
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-sans flex items-start gap-2.5">
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
          <div className="p-4 sm:p-5 rounded-2xl bg-light-teal/50 border border-deep-teal/20 text-deep-teal text-xs sm:text-sm font-sans flex items-start gap-2.5">
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

    // 5. Doctor, Coach & Community Advocacy Roleplay Simulation (Included for all advocacy capstones & topics with scenarios)
    if (roleplayScenarios.length > 0 && (isAdvocateLesson || topic.roleplayScenarios || topic.roleplayScenario)) {
      return renderRoleplaySuite();
    }

    // 6. Labeled Interactive Anatomical or Physiological Diagram
    if (topic.diagram) {
      return (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-light-teal/50 border border-deep-teal/20 text-deep-teal text-xs sm:text-sm font-sans flex items-start gap-2.5">
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
      <div className="rounded-3xl bg-white p-6 sm:p-10 border-2 border-deep-teal/15 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal">
          <ShieldCheck className="w-4 h-4 text-coral" />
          <span>Interactive Clinical Signal Explorer</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal">
          Evaluating What Your Body Is Telling You
        </h3>
        <p className="text-base text-charcoal/80 leading-relaxed font-sans max-w-3xl">
          Review common observations and clinical indicators associated with {topic.name.toLowerCase()}. Notice which signals warrant a discussion with a healthcare provider.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-6 rounded-2xl bg-light-teal/40 border border-deep-teal/20 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <h4 className="font-serif font-bold text-base text-deep-teal">Normal Physiological Variations</h4>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans">
              Mild cramping relieved by warmth or standard OTC pain relief, minor mood fluctuations corresponding to the luteal phase, and natural cycle length shifts during adolescence.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFE1DB]/60 border border-coral/30 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-coral" />
              <h4 className="font-serif font-bold text-base text-coral">Signals Warranting Clinical Attention</h4>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans">
              Pain requiring missing school or sports, bleeding soaking through a pad or tampon in under an hour, or cycles absent for more than 90 consecutive days.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={scrollContainerRef}
      className="fixed inset-0 z-[100] w-screen h-screen overflow-y-auto bg-warm-cream text-charcoal flex flex-col font-sans selection:bg-coral/20"
    >
      {/* 1. Sticky Top Navigation Header: Takes over the whole screen */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-deep-teal/15 px-4 sm:px-8 lg:px-12 py-3.5 shadow-xs transition-all">
        <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between gap-4">
          {/* Back button */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-deep-teal hover:text-raspberry transition-colors py-2 px-3.5 rounded-full hover:bg-light-teal/60 cursor-pointer border border-transparent hover:border-deep-teal/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to</span>
            <span className="truncate max-w-[180px] sm:max-w-none">{categoryTitle}</span>
          </button>

          {/* Topic Title in header */}
          <div className="flex flex-col items-center text-center">
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-charcoal/60 flex items-center gap-1.5">
              <span>{categoryBadge}</span>
              <span>·</span>
              <span className="text-coral">Full-Screen Immersive Lesson</span>
            </div>
            <div className="text-sm sm:text-base font-serif font-bold text-deep-teal truncate max-w-xs sm:max-w-md lg:max-w-xl">
              {topic.name}
            </div>
          </div>

          {/* Actions: Fullscreen toggle + XP Badge + Close */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleBrowserFullScreen}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full text-xs font-bold border-deep-teal/20 text-deep-teal hover:bg-light-teal cursor-pointer px-3"
              title={isBrowserFullScreen ? "Exit Browser Fullscreen" : "Enter Browser Fullscreen"}
            >
              {isBrowserFullScreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-coral" />
                  <span className="hidden md:inline">Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-coral" />
                  <span className="hidden md:inline">Fullscreen Mode</span>
                </>
              )}
            </Button>

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

            <button
              onClick={onBack}
              className="p-1.5 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close Lesson (Esc)"
              aria-label="Close Lesson"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Standardized 5-Step Stepper Bar (Wide Canvas) */}
      <nav
        aria-label="Lesson Progress Steps"
        className="w-full bg-white border-b border-deep-teal/10 px-4 sm:px-8 lg:px-12 py-3 shadow-2xs"
      >
        <div className="max-w-[1440px] w-full mx-auto">
          <div className="flex items-center justify-between gap-1.5 sm:gap-3">
            {stepsConfig.map((s) => {
              const isActive = currentStep === s.number;
              const isPast = currentStep > s.number || visitedSteps.has(s.number);

              return (
                <button
                  key={s.number}
                  onClick={() => goToStep(s.number)}
                  className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2.5 py-2.5 px-2 sm:px-4 rounded-xl sm:rounded-2xl transition-all cursor-pointer text-left ${
                    isActive
                      ? "bg-deep-teal text-white shadow-sm font-bold scale-[1.01]"
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
                  <div className="hidden lg:flex flex-col min-w-0">
                    <span className="text-xs sm:text-[13px] font-bold truncate">
                      {s.title}
                    </span>
                    <span className={`text-[10px] truncate ${isActive ? "text-white/80" : "text-charcoal/60"}`}>
                      {s.desc}
                    </span>
                  </div>
                  <span className="hidden md:inline lg:hidden text-xs sm:text-[13px] truncate">
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

      {/* 3. Main Focused Lesson Content Canvas: Expansive & Immersive Layout */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 md:py-12">
        {/* ============================================================ */}
        {/* STEP 1: INTRODUCTION */}
        {/* ============================================================ */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Wide Hero Split: Left Info + Right Clinical Quote & Objectives */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Title, Description, Meta & Core Question (lg:col-span-7) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-light-teal text-deep-teal border border-deep-teal/20 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-coral" />
                    <span>Step 1 of 5 · Clinical Foundations &amp; Overview</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-deep-teal leading-tight mb-3">
                    {topic.name}
                  </h1>
                  <p className="text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans">
                    {topic.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5 pt-4 text-xs font-semibold text-charcoal/70">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-deep-teal/15 shadow-2xs">
                      <Clock className="w-3.5 h-3.5 text-coral" />
                      <span>4–6 min immersive guide</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-deep-teal/15 shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>ACOG &amp; AAP Clinical Standards</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-deep-teal/15 shadow-2xs">
                      <Trophy className="w-3.5 h-3.5 text-gold" />
                      <span>+{topic.xp} XP upon completion</span>
                    </span>
                  </div>
                </div>

                {/* Core Question Card */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-deep-teal/15 shadow-card text-left">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-raspberry mb-2.5 font-sans">
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
              </div>

              {/* Right Column: Accredited Clinical Literature Quote + Mastery Highlights (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Clinical Literature Quote */}
                {clinicalQuote ? (
                  <div className="rounded-3xl p-6 sm:p-7 bg-light-teal/50 border-2 border-deep-teal/20 text-deep-teal space-y-4 shadow-sm">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-deep-teal bg-white/90 px-3 py-1 rounded-full border border-deep-teal/20 font-sans">
                        ✦ Accredited Clinical Guideline · {clinicalQuote.source}
                      </span>
                      {clinicalQuote.year && (
                        <span className="text-xs font-semibold text-deep-teal/70 font-sans">
                          {clinicalQuote.year}
                        </span>
                      )}
                    </div>
                    <blockquote className="text-base sm:text-lg font-serif italic text-deep-teal leading-relaxed">
                      &ldquo;{clinicalQuote.quote}&rdquo;
                    </blockquote>
                    <div className="pt-3 border-t border-deep-teal/15 text-xs text-charcoal/80 font-medium">
                      <span className="font-bold text-deep-teal">{clinicalQuote.publication}</span>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-3xl p-6 sm:p-7 bg-light-teal/40 border-2 border-deep-teal/20 text-deep-teal space-y-3 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal font-sans">
                      <ShieldCheck className="w-4 h-4 text-coral" />
                      <span>Evidence-Based Medical Pedagogy</span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-deep-teal">
                      Grounded in Peer-Reviewed Adolescent Gynecology
                    </h3>
                    <p className="text-sm text-charcoal/80 leading-relaxed font-sans">
                      All explanations and activities in ReproUs follow clinical guidelines from the American College of Obstetricians and Gynecologists (ACOG) and the American Academy of Pediatrics (AAP).
                    </p>
                  </div>
                )}

                {/* Quick Learning Path Card */}
                <div className="rounded-3xl p-6 bg-white border border-deep-teal/15 shadow-xs space-y-3.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-deep-teal flex items-center gap-2 font-sans">
                    <Zap className="w-4 h-4 text-gold" />
                    <span>Your Learning Journey</span>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal/80 font-sans">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Step 1:</strong> Foundational context &amp; clinical framing</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Step 2:</strong> Deep-dive into endocrine &amp; anatomical mechanisms</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Step 3:</strong> Hands-on interactive activity / diagnostic simulation</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Step 4:</strong> Scenario-based clinical knowledge check</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Step 5:</strong> Doctor discussion script &amp; self-advocacy tools</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3 Core Key Takeaways Across Wide 3 Columns */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-deep-teal">
                  3 Core Pillars You&apos;ll Master
                </h3>
                <span className="text-xs font-bold text-charcoal/60 uppercase tracking-wider font-sans">
                  Comprehensive Curriculum
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-white border-2 border-deep-teal/15 shadow-sm space-y-3 hover:border-deep-teal/40 transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-light-teal text-deep-teal flex items-center justify-center font-bold text-sm shadow-2xs font-sans">
                    01
                  </div>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-deep-teal">Biological Foundations</h4>
                  <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-sans">
                    Learn the physiological feedback loops and endocrine pathways governing your reproductive and physical health.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border-2 border-coral/30 shadow-sm space-y-3 hover:border-coral transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFE1DB] text-coral flex items-center justify-center font-bold text-sm shadow-2xs font-sans">
                    02
                  </div>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-coral">Symptom Recognition</h4>
                  <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-sans">
                    Differentiate between expected bodily variations and clinical red-flag signs that deserve provider evaluation.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white border-2 border-raspberry/25 shadow-sm space-y-3 hover:border-raspberry transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-soft-pink text-raspberry flex items-center justify-center font-bold text-sm shadow-2xs font-sans">
                    03
                  </div>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-raspberry">Self-Advocacy Power</h4>
                  <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed font-sans">
                    Gain verbatim doctor scripts and objective symptom tracking methods to be heard and taken seriously.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 1 Completion / Next Button */}
            <div className="pt-8 border-t border-deep-teal/15 flex items-center justify-end">
              <Button
                onClick={nextStep}
                size="lg"
                className="bg-deep-teal hover:bg-deep-teal/90 text-white font-bold gap-2 text-sm sm:text-base px-8 py-6 rounded-2xl shadow-md cursor-pointer hover:translate-x-0.5 transition-all"
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-deep-teal mb-3">
                Understanding the Biology of {topic.name}
              </h2>
              <p className="text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans max-w-4xl">
                Explore the cellular, hormonal, and anatomical mechanisms beneath the surface. Real science without condescension or medical gatekeeping.
              </p>
            </div>

            {/* Category Physiology / Diagnostic Chart: Expansive Full Width */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-deep-teal/15 shadow-card space-y-4">
              {renderPhysiologyChart() || (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal font-sans">
                    <Lightbulb className="w-4 h-4 text-coral" />
                    <span>Biological Mechanism Overview</span>
                  </div>
                  <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed font-sans">
                    {topic.desc}
                  </p>
                </div>
              )}
            </div>

            {/* Visual Concept Cards: Responsive Multi-Column Grid on Wide Screen */}
            {topic.visualCards && topic.visualCards.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-deep-teal">
                    Key Physiological Principles
                  </h3>
                  <span className="text-xs font-bold text-charcoal/60 uppercase tracking-wider font-sans">
                    {topic.visualCards.length} Clinical Principles
                  </span>
                </div>
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 ${
                    topic.visualCards.length >= 4
                      ? "lg:grid-cols-4"
                      : topic.visualCards.length === 3
                      ? "lg:grid-cols-3"
                      : "lg:grid-cols-2"
                  } gap-6`}
                >
                  {topic.visualCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-3xl bg-white border-2 border-deep-teal/15 shadow-sm space-y-3 hover:border-coral/50 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-xl bg-light-teal text-deep-teal flex items-center justify-center font-bold text-xs shadow-2xs font-sans">
                            {idx + 1}
                          </span>
                          <h4 className="font-serif font-bold text-sm sm:text-base text-deep-teal">
                            {card.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-sans">
                          {card.text}
                        </p>
                      </div>
                      {card.highlight && (
                        <div className="pt-2">
                          <span className="inline-block text-[11px] font-bold text-coral bg-[#FFE1DB]/70 border border-coral/30 px-2.5 py-1 rounded-lg font-sans">
                            {card.highlight}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Card (if topic has a video) */}
            {topic.video && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal font-sans">
                  <Video className="w-4 h-4 text-raspberry" />
                  <span>Educational Video Walkthrough</span>
                </div>
                <LessonVideoCard video={topic.video} themeColor="#175B5C" />
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-8 border-t border-deep-teal/15 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-deep-teal/20 text-deep-teal hover:bg-light-teal cursor-pointer py-5 px-6 rounded-2xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Introduction</span>
              </Button>
              <Button
                onClick={nextStep}
                size="lg"
                className="bg-deep-teal hover:bg-deep-teal/90 text-white font-bold gap-2 text-sm sm:text-base px-8 py-6 rounded-2xl shadow-md cursor-pointer hover:translate-x-0.5 transition-all"
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-deep-teal mb-3">
                {isAdvocateLesson ? "Clinical & Self-Advocacy Simulation" : "Put Knowledge Into Practice"}
              </h2>
              <p className="text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans max-w-4xl">
                {isAdvocateLesson
                  ? "Step into realistic clinical consultations. Practice presenting objective symptom data, responding to provider pushback, and citing accredited guidelines."
                  : "Learning health concepts is most effective when you can interact, test scenarios, and manipulate visual models directly."}
              </p>
            </div>

            {/* Interactive component container */}
            <div className="w-full">
              {renderInteractiveActivity()}
            </div>

            {/* Navigation buttons */}
            <div className="pt-8 border-t border-deep-teal/15 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-deep-teal/20 text-deep-teal hover:bg-light-teal cursor-pointer py-5 px-6 rounded-2xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Learn</span>
              </Button>
              <Button
                onClick={nextStep}
                size="lg"
                className="bg-deep-teal hover:bg-deep-teal/90 text-white font-bold gap-2 text-sm sm:text-base px-8 py-6 rounded-2xl shadow-md cursor-pointer hover:translate-x-0.5 transition-all"
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-deep-teal mb-3">
                Confirm Your Understanding
              </h2>
              <p className="text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans max-w-4xl">
                Test your grasp of biological mechanisms and symptom recognition rules. Immediate explanations are provided for every answer.
              </p>
            </div>

            {/* Interactive Scenario Quiz Game Component */}
            <div className="rounded-3xl bg-white p-6 sm:p-10 border-2 border-deep-teal/15 shadow-card">
              <InteractiveQuizGame
                questions={quizQuestions}
                topicName={topic.name}
                topicXp={topic.xp}
                onComplete={() => {}}
              />
            </div>

            {/* Navigation buttons */}
            <div className="pt-8 border-t border-deep-teal/15 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-deep-teal/20 text-deep-teal hover:bg-light-teal cursor-pointer py-5 px-6 rounded-2xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Activity</span>
              </Button>
              <Button
                onClick={nextStep}
                size="lg"
                className="bg-deep-teal hover:bg-deep-teal/90 text-white font-bold gap-2 text-sm sm:text-base px-8 py-6 rounded-2xl shadow-md cursor-pointer hover:translate-x-0.5 transition-all"
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-deep-teal mb-3">
                Taking Action With Confidence
              </h2>
              <p className="text-base sm:text-lg text-charcoal/85 leading-relaxed font-sans max-w-4xl">
                Knowledge matters most when you can use it in the real world. Here is your practical communication blueprint and interactive roleplay rehearsal for clinical appointments.
              </p>
            </div>

            {/* Doctor Discussion Script: Wide 2-Column Grid */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border-2 border-deep-teal/15 shadow-card space-y-6 text-left">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: The Script & Copy Button */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-raspberry font-sans">
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

                  <div className="p-6 rounded-2xl bg-light-teal/50 border border-deep-teal/20 text-deep-teal space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-deep-teal/70 font-sans">
                      Situation: {advocacyData.situation}
                    </p>
                    <p className="text-base sm:text-lg font-serif italic text-deep-teal leading-relaxed">
                      {advocacyData.doctorScript}
                    </p>
                  </div>
                </div>

                {/* Right: Why It Works & What If Dismissed */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <h4 className="font-serif font-bold text-sm text-deep-teal">Why This Script Works</h4>
                    </div>
                    <p className="text-xs sm:text-[13px] text-charcoal/80 leading-relaxed font-sans">
                      {advocacyData.whyItWorks}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FFE1DB]/40 border border-coral/30 space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-coral" />
                      <h4 className="font-serif font-bold text-sm text-coral">What If You Feel Dismissed?</h4>
                    </div>
                    <p className="text-xs sm:text-[13px] text-charcoal/80 leading-relaxed font-sans">
                      {advocacyData.whatIfDismissed}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Roleplay Practice Studio (Available for all Advocacy Lessons) */}
            {roleplayScenarios.length > 0 && isAdvocateLesson && (
              <div className="pt-6 border-t border-deep-teal/15 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-soft-pink text-raspberry border border-raspberry/20 mb-2 font-sans">
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>Interactive Rehearsal Studio</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal mb-2">
                    Practice Your Clinical &amp; Self-Advocacy Roleplays
                  </h3>
                  <p className="text-sm sm:text-base text-charcoal/80 font-sans leading-relaxed max-w-3xl">
                    Rehearse your responses against realistic clinical and institutional pushback. Select each scenario to test your dialogue choices, earn +30 XP bonuses, and review accredited guidelines.
                  </p>
                </div>

                {renderRoleplaySuite("Live Dialogue Rehearsal: Practice speaking up to providers, coaches, and administrators.")}
              </div>
            )}

            {/* Big Complete Lesson & Claim XP Card */}
            <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-deep-teal via-teal-900 to-deep-teal-dark text-white shadow-xl text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-8 h-8 text-gold" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-2">
                  Ready to Complete This Lesson?
                </h3>
                <p className="text-sm sm:text-base text-light-teal/90 max-w-xl mx-auto font-sans">
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

            {/* Sibling Topic Recommendations in Wide Grid */}
            {siblingTopics.length > 0 && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-serif font-bold text-deep-teal">
                    Continue Exploring in {categoryTitle}
                  </h3>
                  <span className="text-xs font-bold text-charcoal/60 uppercase tracking-wider font-sans">
                    Recommended Next
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {siblingTopics
                    .filter((t) => t.id !== topic.id)
                    .slice(0, 4)
                    .map((sibling) => (
                      <button
                        key={sibling.id}
                        onClick={() => onNavigateToTopic?.(sibling.id)}
                        className="p-5 rounded-2xl bg-white border border-deep-teal/15 shadow-xs hover:border-coral/40 hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between cursor-pointer"
                      >
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-raspberry font-sans">
                            {sibling.type}
                          </span>
                          <h4 className="font-serif font-bold text-deep-teal text-base mt-1 mb-2">
                            {sibling.name}
                          </h4>
                          <p className="text-xs text-charcoal/70 line-clamp-2 font-sans">
                            {sibling.desc}
                          </p>
                        </div>
                        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-coral font-sans">
                          <span>+{sibling.xp} XP</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Navigation back */}
            <div className="pt-8 border-t border-deep-teal/15 flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-deep-teal/20 text-deep-teal hover:bg-light-teal cursor-pointer py-5 px-6 rounded-2xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Knowledge Check</span>
              </Button>
              <Button
                variant="outline"
                onClick={onBack}
                className="border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-white cursor-pointer py-5 px-6 rounded-2xl"
              >
                <span>Return to {categoryTitle}</span>
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* 4. Bottom Sticky Progression Control Bar (Wide Canvas) */}
      <footer className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-deep-teal/15 px-4 sm:px-8 lg:px-12 py-3.5 shadow-lg">
        <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="rounded-full text-xs font-bold border-deep-teal/20 text-deep-teal hover:bg-light-teal disabled:opacity-40 cursor-pointer px-4"
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
            className="rounded-full bg-deep-teal hover:bg-deep-teal/90 text-white font-bold text-xs gap-1.5 shadow-sm cursor-pointer px-5"
          >
            <span>{currentStep === 5 ? "Complete Lesson ✓" : "Next Step"}</span>
            {currentStep < 5 && <ArrowRight className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </footer>

      {/* Slide-Down Scroll Progress Indicator on the Right */}
      <ScrollProgressIndicator
        containerRef={scrollContainerRef}
        pageId={`lesson-${topic.id}-step-${currentStep}`}
      />
    </div>
  );
}
