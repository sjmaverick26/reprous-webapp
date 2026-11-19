"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDialogFocus } from "@/components/shared/useDialogFocus";
import { scrollMotion } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle,
  CheckCircle2,
  Clock,
  Copy,
  Gamepad2,
  HelpCircle,
  Lightbulb,
  Maximize2,
  Minimize2,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  Flower2,
  Stethoscope,
  Video,
  X,
} from "lucide-react";
import {
  HubTopic,
  getTopicClinicalQuote,
  getTopicRoleplayScenarios,
} from "@/data/hubData";
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
import { keepUnits } from "./keepUnits";

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

/* Shell kit (DESIGN.md): one container edge, one raspberry primary, deep-teal outline secondary,
   white cards with a 1px pillar or #E5E1DC border, DM Sans semibold labels, serif only at 24px+. */
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-2";
const CONTAINER = "max-w-6xl w-full mx-auto px-4 md:px-6";
const BTN_PRIMARY = `inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-full bg-raspberry text-white text-sm font-semibold font-sans text-center hover:bg-raspberry-dark transition-colors duration-150 cursor-pointer ${FOCUS_RING}`;
const BTN_SECONDARY = `inline-flex items-center justify-center gap-2 min-h-11 px-5 py-2 rounded-full border border-deep-teal bg-white text-deep-teal text-sm font-semibold font-sans text-center hover:bg-light-teal transition-colors duration-150 cursor-pointer ${FOCUS_RING}`;
const BTN_TEXT = `inline-flex items-center justify-center gap-2 min-h-11 px-2 rounded-full text-deep-teal text-sm font-semibold font-sans text-center underline-offset-4 hover:underline cursor-pointer ${FOCUS_RING}`;
const CARD = "rounded-2xl bg-white border border-[#E5E1DC]";
const LABEL = "flex items-center gap-2 text-sm font-semibold text-deep-teal font-sans";
const STEP_PILL =
  "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold font-sans bg-light-teal text-deep-teal mb-3";
const STEP_TITLE = "font-serif text-h2 font-normal text-deep-teal text-balance mb-3";
const STEP_LEAD = "text-base sm:text-lg text-charcoal leading-relaxed font-sans text-pretty max-w-[36rem]";
const SECTION_TITLE = "font-serif text-2xl font-normal text-deep-teal text-balance";
const NOTICE_TEAL =
  "p-4 sm:p-5 rounded-2xl bg-light-teal-light border border-light-teal-dark text-charcoal text-sm sm:text-base font-sans flex items-start gap-2.5";
const NOTICE_PINK =
  "p-4 sm:p-5 rounded-2xl bg-soft-pink-light border border-soft-pink-dark text-charcoal text-sm sm:text-base font-sans flex items-start gap-2.5";
const STEP_NAV =
  "pt-8 border-t border-[#E5E1DC] flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3";

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
  // Keyboard focus lives in the lesson while it is open, and goes back to the lesson's row on close.
  const topicIdRef = useRef(topic.id);
  topicIdRef.current = topic.id;
  useDialogFocus(true, scrollContainerRef, () =>
    document.querySelector<HTMLElement>(`[data-lesson-row="${topicIdRef.current}"]`)
  );

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
      scrollContainerRef.current.scrollTo({ top: 0, behavior: scrollMotion() });
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

  const handleCopyScript = async (text: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return; // the browser blocked copying: don't claim it worked
    }
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
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

  // Shared bottom-of-step navigation: a text link back, a deep-teal outline forward.
  // The raspberry primary lives once, in the sticky footer.
  const renderStepNav = (backLabel: string, nextLabel: string) => (
    <div className={STEP_NAV}>
      <button type="button" onClick={prevStep} className={`${BTN_TEXT} self-start sm:self-auto`}>
        <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>{backLabel}</span>
      </button>
      <button type="button" onClick={nextStep} className={`${BTN_SECONDARY} w-full sm:w-auto`}>
        <span>{nextLabel}</span>
        <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
      </button>
    </div>
  );

  // Specific visual physiology chart renderer for Step 2
  const renderPhysiologyChart = () => {
    if (categoryId === "cycle") {
      return (
        <div className="space-y-4">
          <div className={LABEL}>
            <Flower2 className="w-4 h-4 shrink-0" aria-hidden="true" />
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
          <div className={LABEL}>
            <Flower2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Tanner Staging &amp; Anatomical Development</span>
          </div>
          <TannerProgressionChart />
        </div>
      );
    }
    if (categoryId === "pcos") {
      return (
        <div className="space-y-4">
          <div className={LABEL}>
            <Flower2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>PCOS Rotterdam Diagnostic Criteria (The 2-of-3 Rule)</span>
          </div>
          <RotterdamCriteriaRadar />
        </div>
      );
    }
    if (categoryId === "conditions") {
      return (
        <div className="space-y-4">
          <div className={LABEL}>
            <Flower2 className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Diagnostic Radar &amp; Clinical Criteria Analysis</span>
          </div>
          <RotterdamCriteriaRadar />
        </div>
      );
    }
    if (categoryId === "realtalk" || categoryId === "factors") {
      return (
        <div className="space-y-4">
          <div className={LABEL}>
            <Flower2 className="w-4 h-4 shrink-0" aria-hidden="true" />
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
    const solvedCount = Object.values(simulationBonuses).filter(Boolean).length;

    return (
      <div className="space-y-6">
        <div className={`${NOTICE_PINK} justify-between flex-wrap`}>
          <div className="flex items-start gap-2.5 min-w-0">
            <MessageSquare className="w-4 h-4 text-raspberry shrink-0 mt-1" aria-hidden="true" />
            <span>
              {contextNotice ||
                "Practice clinical self-advocacy in realistic simulations. Choose the response that establishes your symptoms and cites clinical guidelines."}
            </span>
          </div>
          <span className="text-sm font-semibold text-charcoal font-sans">
            {roleplayScenarios.length} Interactive Scenarios
          </span>
        </div>

        {/* Multi-Simulation Track Selector Tabs */}
        {roleplayScenarios.length > 1 && (
          <div className={`${CARD} p-4 sm:p-5 space-y-3`}>
            <div className="flex items-center justify-between gap-x-3 gap-y-1 flex-wrap text-sm font-sans">
              <span className="font-semibold text-deep-teal flex items-center gap-1.5">
                <Flower2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>
                  Clinical Simulation Track ({activeSimulationIdx + 1} of {roleplayScenarios.length}):
                </span>
              </span>
              <span className="font-semibold text-charcoal-light">
                {solvedCount} of {roleplayScenarios.length} Scenarios Solved
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {roleplayScenarios.map((sim, idx) => {
                const isSimActive = activeSimulationIdx === idx;
                const isSolved = simulationBonuses[idx];
                const simLabel = sim.phaseName || sim.title || `Simulation ${idx + 1}`;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSimulationIdx(idx)}
                    aria-pressed={isSimActive}
                    className={`flex items-center gap-2.5 min-h-11 p-3 rounded-xl border text-left font-sans text-sm font-semibold transition-colors duration-150 cursor-pointer ${FOCUS_RING} ${
                      isSimActive
                        ? "bg-deep-teal text-white border-deep-teal"
                        : isSolved
                        ? "bg-light-teal text-deep-teal border-deep-teal hover:bg-light-teal-dark"
                        : "bg-white text-charcoal border-[#E5E1DC] hover:border-deep-teal"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                        isSimActive
                          ? "bg-white text-deep-teal"
                          : isSolved
                          ? "bg-deep-teal text-white"
                          : "bg-warm-cream-dark text-charcoal"
                      }`}
                    >
                      {isSolved ? <Check className="w-3.5 h-3.5" aria-label="Solved" /> : idx + 1}
                    </span>
                    <span className="min-w-0">{simLabel}</span>
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
          <div className="rounded-2xl border border-light-teal-dark bg-light-teal-light p-5 sm:p-6 font-sans text-charcoal space-y-3">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-8 h-8 rounded-full bg-deep-teal text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h5 className="font-sans font-semibold text-deep-teal text-base m-0">
                    Clinical Evidence &amp; Guideline Authority
                  </h5>
                  <p className="text-sm text-charcoal-light font-sans m-0">
                    {activeScenario.sourceCitation.organization}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold text-deep-teal">
                {activeScenario.sourceCitation.year}
              </span>
            </div>
            <p className="max-w-[65ch] text-sm sm:text-base text-charcoal leading-relaxed font-sans italic border-l-2 border-deep-teal pl-3 py-0.5 m-0">
              &ldquo;{keepUnits(activeScenario.sourceCitation.guideline)}&rdquo;
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
          <div>
            <div className={`${LABEL} mb-2`}>
              <Gamepad2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Interactive Athlete Fueling Experience</span>
            </div>
            <h3 className={`${SECTION_TITLE} mb-2`}>
              Athlete Nutrition &amp; Fueling Simulation
            </h3>
            <p className="text-base text-charcoal-light leading-relaxed font-sans text-pretty max-w-[36rem] m-0">
              Explore how carbohydrates, protein, and hydration support peak athletic endurance and hormone stability.
            </p>
          </div>
          <FemaleNourishmentPlateGame initialTab="game" />
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
          <div className={NOTICE_PINK}>
            <ShieldAlert className="w-4 h-4 text-raspberry shrink-0 mt-1" aria-hidden="true" />
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
          <div className={NOTICE_TEAL}>
            <Gamepad2 className="w-4 h-4 text-deep-teal shrink-0 mt-1" aria-hidden="true" />
            <span>
              Categorize each scenario into the correct clinical bucket to test your instincts.
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
          <div className={NOTICE_TEAL}>
            <Lightbulb className="w-4 h-4 text-deep-teal shrink-0 mt-1" aria-hidden="true" />
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
      <div className="space-y-6">
        <div>
          <div className={`${LABEL} mb-2`}>
            <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Interactive Clinical Signal Explorer</span>
          </div>
          <h3 className={`${SECTION_TITLE} mb-2`}>
            Evaluating What Your Body Is Telling You
          </h3>
          <p className="text-base text-charcoal-light leading-relaxed font-sans text-pretty max-w-[36rem] m-0">
            Review common observations and clinical indicators associated with {topic.name.toLowerCase()}. Notice which signals warrant a discussion with a healthcare provider.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-deep-teal space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-deep-teal shrink-0" aria-hidden="true" />
              <h4 className="font-sans font-semibold text-base text-deep-teal m-0">Normal Physiological Variations</h4>
            </div>
            <p className="max-w-[65ch] text-sm sm:text-base text-charcoal-light leading-relaxed font-sans m-0">
              Mild cramping relieved by warmth or standard OTC pain relief, minor mood fluctuations corresponding to the luteal phase, and natural cycle length shifts during adolescence.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-coral space-y-3">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full bg-coral ring-4 ring-soft-pink" />
              <h4 className="font-sans font-semibold text-base text-charcoal m-0">Signals Warranting Clinical Attention</h4>
            </div>
            <p className="max-w-[65ch] text-sm sm:text-base text-charcoal-light leading-relaxed font-sans m-0">
              Pain requiring missing school or sports, bleeding soaking through a pad or tampon in under an hour, or cycles absent for more than 90 consecutive days.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const PILLAR_CARDS = [
    {
      title: "Biological Foundations",
      text: "Learn the physiological feedback loops and endocrine pathways governing your reproductive and physical health.",
      border: "border-deep-teal",
      chip: "bg-deep-teal text-white",
      Icon: BookOpen,
    },
    {
      title: "Symptom Recognition",
      text: "Differentiate between expected bodily variations and clinical red-flag signs that deserve provider evaluation.",
      border: "border-coral",
      chip: "bg-coral text-charcoal",
      Icon: ShieldAlert,
    },
    {
      title: "Self-Advocacy Power",
      text: "Gain verbatim doctor scripts and objective symptom tracking methods to be heard and taken seriously.",
      border: "border-raspberry",
      chip: "bg-raspberry text-white",
      Icon: MessageSquare,
    },
  ];

  const JOURNEY = [
    ["Step 1:", "Foundational context & clinical framing"],
    ["Step 2:", "Deep-dive into endocrine & anatomical mechanisms"],
    ["Step 3:", "Hands-on interactive activity / diagnostic simulation"],
    ["Step 4:", "Scenario-based clinical knowledge check"],
    ["Step 5:", "Doctor discussion script & self-advocacy tools"],
  ];

  return (
    <div
      ref={scrollContainerRef}
      role="dialog"
      aria-modal="true"
      aria-label={topic.name}
      tabIndex={-1}
      className="motion-panel fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden bg-warm-cream text-charcoal flex flex-col font-sans outline-none selection:bg-soft-pink"
    >
      {/* 1. Sticky top header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5E1DC]">
        <div className={`${CONTAINER} flex items-center gap-2 sm:gap-4 py-2`}>
          {/* Back button */}
          <button
            type="button"
            onClick={onBack}
            className={`${BTN_TEXT} shrink-0 min-w-11 px-3 hover:bg-light-teal hover:no-underline transition-colors duration-150`}
            aria-label={`Back to ${categoryTitle}`}
            title={`Back to ${categoryTitle}`}
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline xl:hidden">Back</span>
            <span className="hidden xl:inline">Back to {categoryTitle}</span>
          </button>

          {/* Topic title in header */}
          <div className="flex-1 min-w-0 flex flex-col items-center text-center">
            <div className="hidden md:block max-w-full text-sm font-semibold leading-snug text-charcoal-light text-balance">
              {categoryBadge}
            </div>
            <div
              className="max-w-full text-sm sm:text-base font-semibold leading-snug text-deep-teal text-balance"
            >
              {topic.name}
            </div>
          </div>

          {/* Actions: fullscreen toggle + close */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleBrowserFullScreen}
              className={`hidden sm:inline-flex items-center justify-center gap-1.5 min-h-11 min-w-11 px-3 rounded-full border border-deep-teal bg-white text-deep-teal text-sm font-semibold hover:bg-light-teal transition-colors duration-150 cursor-pointer ${FOCUS_RING}`}
              title={isBrowserFullScreen ? "Exit Browser Fullscreen" : "Enter Browser Fullscreen"}
              aria-label={isBrowserFullScreen ? "Exit Browser Fullscreen" : "Enter Browser Fullscreen"}
            >
              {isBrowserFullScreen ? (
                <>
                  <Minimize2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="hidden md:inline">Exit Fullscreen</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="hidden md:inline">Fullscreen Mode</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onBack}
              className={`inline-flex items-center justify-center w-11 h-11 rounded-full text-charcoal hover:bg-light-teal transition-colors duration-150 cursor-pointer ${FOCUS_RING}`}
              title="Close Lesson (Esc)"
              aria-label="Close Lesson"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. 5-step stepper */}
      <nav aria-label="Lesson Progress Steps" className="w-full bg-white border-b border-[#E5E1DC]">
        <div className={`${CONTAINER} py-3`}>
          <ol className="m-0 p-0 list-none flex items-stretch gap-1 sm:gap-2">
            {stepsConfig.map((s) => {
              const isActive = currentStep === s.number;
              const isPast = currentStep > s.number || visitedSteps.has(s.number);

              return (
                <li key={s.number} className={`min-w-0 flex ${isActive ? "flex-[1.8] sm:flex-1" : "flex-1"}`}>
                  <button
                    type="button"
                    onClick={() => goToStep(s.number)}
                    aria-current={isActive ? "step" : undefined}
                    className={`w-full min-h-11 flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2 py-2 px-1 md:px-2.5 xl:px-2 rounded-xl border text-center md:text-left font-sans transition-colors duration-150 cursor-pointer ${FOCUS_RING} ${
                      isActive
                        ? "bg-deep-teal text-white border-deep-teal font-semibold"
                        : isPast
                        ? "bg-light-teal text-deep-teal border-light-teal hover:border-deep-teal font-semibold"
                        : "bg-warm-cream text-charcoal-light border-[#E5E1DC] hover:border-deep-teal font-semibold"
                    }`}
                    title={`${s.title}: ${s.desc}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                        isActive
                          ? "bg-white text-deep-teal"
                          : isPast
                          ? "bg-deep-teal text-white"
                          : "bg-warm-cream-dark text-charcoal"
                      }`}
                    >
                      {isPast && !isActive ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : s.number}
                    </span>
                    {/* Full title + sub-label from 1280; the short label below that; on phones only the
                        current step shows its label (the others keep the number, the full name stays in title/sr-only). */}
                    <span className="hidden xl:flex flex-col min-w-0">
                      <span className="text-sm leading-tight text-balance">{s.title}</span>
                      <span className={`text-sm font-normal leading-tight text-balance ${isActive ? "text-white" : "text-charcoal-light"}`}>
                        {s.desc}
                      </span>
                    </span>
                    <span className={`${isActive ? "inline" : "hidden sm:inline"} xl:hidden whitespace-nowrap text-sm leading-tight`}>
                      {s.short}
                    </span>
                    <span className={`${isActive ? "hidden" : "sr-only sm:hidden"}`}>{s.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>

      {/* 3. Lesson content */}
      <div className={`${CONTAINER} flex-1 overflow-x-clip py-8 md:py-12`}>
        {/* ============================================================ */}
        {/* STEP 1: INTRODUCTION */}
        {/* ============================================================ */}
        {currentStep === 1 && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left column */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className={STEP_PILL}>
                    <Flower2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>Step 1 of 5 · Clinical Foundations &amp; Overview</span>
                  </div>
                  <h1 className={STEP_TITLE}>{topic.name}</h1>
                  <p className={STEP_LEAD}>{topic.desc}</p>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 text-sm font-semibold text-charcoal-light">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-deep-teal shrink-0" aria-hidden="true" />
                      <span>4–6 min immersive guide</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-deep-teal shrink-0" aria-hidden="true" />
                      <span>ACOG &amp; AAP Clinical Standards</span>
                    </span>
                  </div>
                </div>

                {/* Core question card */}
                <div className={`${CARD} p-5 sm:p-6 text-left`}>
                  <div className={`${LABEL} mb-2.5`}>
                    <HelpCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>The Core Question This Guide Answers</span>
                  </div>
                  <h2 className={`${SECTION_TITLE} mb-3 leading-snug`}>
                    “How does this affect my daily body function, and how do I know when something is worth bringing to a doctor?”
                  </h2>
                  <p className="max-w-[36rem] text-base text-charcoal-light leading-relaxed font-sans text-pretty m-0">
                    Many adolescent and young adult bodily changes are normalized or dismissed as &ldquo;just part of growing up.&rdquo; This lesson equips you with clinical definitions, anatomical context, and objective self-advocacy language.
                  </p>
                </div>
              </div>

              {/* Right column */}
              <div className="lg:col-span-5 space-y-6">
                {clinicalQuote ? (
                  <div className="rounded-2xl bg-white border border-deep-teal p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className={LABEL}>
                        <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Accredited Clinical Guideline · {clinicalQuote.source}</span>
                      </span>
                      {clinicalQuote.year && (
                        <span className="text-sm font-semibold text-charcoal-light font-sans">
                          {clinicalQuote.year}
                        </span>
                      )}
                    </div>
                    <blockquote className="m-0 text-lg font-sans italic text-charcoal leading-relaxed">
                      &ldquo;{clinicalQuote.quote}&rdquo;
                    </blockquote>
                    <div className="pt-3 border-t border-[#E5E1DC] text-sm font-semibold text-deep-teal">
                      {keepUnits(clinicalQuote.publication)}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-white border border-deep-teal p-5 sm:p-6 space-y-3">
                    <div className={LABEL}>
                      <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Evidence-Based Medical Pedagogy</span>
                    </div>
                    <h3 className="text-lg font-sans font-semibold text-deep-teal m-0">
                      Grounded in Peer-Reviewed Adolescent Gynecology
                    </h3>
                    <p className="max-w-[65ch] text-sm sm:text-base text-charcoal-light leading-relaxed font-sans m-0">
                      All explanations and activities in ReproUs follow clinical guidelines from the American College of Obstetricians and Gynecologists (ACOG) and the American Academy of Pediatrics (AAP).
                    </p>
                  </div>
                )}

                {/* Learning path */}
                <div className={`${CARD} p-5 sm:p-6 space-y-3.5`}>
                  <div className={LABEL}>
                    <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Your Learning Journey</span>
                  </div>
                  <ul className="m-0 p-0 list-none space-y-2.5 text-sm sm:text-base text-charcoal font-sans">
                    {JOURNEY.map(([step, text]) => (
                      <li key={step} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-deep-teal shrink-0 mt-1" aria-hidden="true" />
                        <span><strong className="font-semibold">{step}</strong> {text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Three pillars */}
            <div className="space-y-4">
              <div className="flex items-baseline justify-between gap-x-4 gap-y-1 flex-wrap">
                <h3 className={SECTION_TITLE}>3 Core Pillars You&apos;ll Master</h3>
                <span className="text-sm font-semibold text-charcoal-light font-sans">Comprehensive Curriculum</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PILLAR_CARDS.map(({ title, text, border, chip, Icon }) => (
                  <div key={title} className={`p-5 sm:p-6 rounded-2xl bg-white border ${border} flex flex-col gap-3`}>
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${chip}`}>
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <h4 className="font-sans font-semibold text-lg text-deep-teal m-0">{title}</h4>
                    <p className="max-w-[65ch] text-sm sm:text-base text-charcoal-light leading-relaxed font-sans m-0">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-[#E5E1DC] flex sm:justify-end">
              <button type="button" onClick={nextStep} className={`${BTN_SECONDARY} w-full sm:w-auto`}>
                <span>Continue to Step 2: Learn</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: LEARN */}
        {/* ============================================================ */}
        {currentStep === 2 && (
          <div className="space-y-10">
            <div>
              <div className="flex items-center justify-between gap-x-3 gap-y-2 flex-wrap mb-3">
                <div className={`${STEP_PILL} mb-0`}>
                  <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Step 2 of 5 · Physiology &amp; Core Concepts</span>
                </div>
                <p className="m-0 inline-flex items-start gap-1.5 text-sm text-charcoal-light">
                  <Lightbulb className="w-4 h-4 text-deep-teal shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Tap yellow highlighted words to view plain-English dictionary meanings</span>
                </p>
              </div>
              <h2 className={STEP_TITLE}>Understanding the Biology of {topic.name}</h2>
              <p className={STEP_LEAD}>
                Explore the cellular, hormonal, and anatomical mechanisms beneath the surface. Real science without condescension or medical gatekeeping.
              </p>
            </div>

            {/* Physiology / diagnostic chart */}
            <div className={`${CARD} p-5 sm:p-8 space-y-4`}>
              {renderPhysiologyChart() || (
                <div className="space-y-3">
                  <div className={LABEL}>
                    <Lightbulb className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Biological Mechanism Overview</span>
                  </div>
                  <p className="max-w-[36rem] text-base text-charcoal leading-relaxed font-sans text-pretty m-0">
                    {topic.desc}
                  </p>
                </div>
              )}
            </div>

            {/* Visual concept cards */}
            {topic.visualCards && topic.visualCards.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-baseline justify-between gap-x-4 gap-y-1 flex-wrap">
                  <h3 className={SECTION_TITLE}>Key Physiological Principles</h3>
                  <span className="text-sm font-semibold text-charcoal-light font-sans">
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
                    <div key={idx} className={`${CARD} p-5 sm:p-6 flex flex-col gap-2.5`}>
                      <h4 className="font-sans font-semibold text-base text-deep-teal m-0">{card.title}</h4>
                      <p className="max-w-[65ch] text-sm sm:text-base text-charcoal-light leading-relaxed font-sans m-0">{card.text}</p>
                      {card.highlight && (
                        <div className="mt-auto pt-2">
                          <span className="inline-flex items-start gap-2 text-sm font-semibold text-charcoal bg-soft-pink-light border border-soft-pink-dark px-2.5 py-1 rounded-lg font-sans">
                            <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-coral" />
                            <span>{card.highlight}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video card */}
            {topic.video && (
              <div className="space-y-4">
                <div className={LABEL}>
                  <Video className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Educational Video Walkthrough</span>
                </div>
                <LessonVideoCard video={topic.video} themeColor="#175B5C" />
              </div>
            )}

            {renderStepNav("Back to Introduction", "Continue to Step 3: Interactive Activity")}
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: INTERACTIVE ACTIVITY */}
        {/* ============================================================ */}
        {currentStep === 3 && (
          <div className="space-y-10">
            <div>
              <div className={STEP_PILL}>
                <Gamepad2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Step 3 of 5 · Hands-On Interactive Activity</span>
              </div>
              <h2 className={STEP_TITLE}>
                {isAdvocateLesson ? "Clinical & Self-Advocacy Simulation" : "Put Knowledge Into Practice"}
              </h2>
              <p className={STEP_LEAD}>
                {isAdvocateLesson
                  ? "Step into realistic clinical consultations. Practice presenting objective symptom data, responding to provider pushback, and citing accredited guidelines."
                  : "Learning health concepts is most effective when you can interact, test scenarios, and manipulate visual models directly."}
              </p>
            </div>

            <div className="w-full">{renderInteractiveActivity()}</div>

            {renderStepNav("Back to Learn", "Continue to Step 4: Knowledge Check")}
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 4: KNOWLEDGE CHECK */}
        {/* ============================================================ */}
        {currentStep === 4 && (
          <div className="space-y-10">
            <div>
              <div className={STEP_PILL}>
                <HelpCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Step 4 of 5 · Knowledge Check &amp; Scenario Quiz</span>
              </div>
              <h2 className={STEP_TITLE}>Confirm Your Understanding</h2>
              <p className={STEP_LEAD}>
                Test your grasp of biological mechanisms and symptom recognition rules. Immediate explanations are provided for every answer.
              </p>
            </div>

            <div className={`${CARD} p-5 sm:p-8`}>
              <InteractiveQuizGame
                questions={quizQuestions}
                topicName={topic.name}
                topicXp={topic.xp}
                onComplete={() => {}}
              />
            </div>

            {renderStepNav("Back to Activity", "Continue to Step 5: Resources & Next Steps")}
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 5: RESOURCES & NEXT STEPS */}
        {/* ============================================================ */}
        {currentStep === 5 && (
          <div className="space-y-10">
            <div>
              <div className={STEP_PILL}>
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Step 5 of 5 · Resources, Self-Advocacy &amp; Next Steps</span>
              </div>
              <h2 className={STEP_TITLE}>Taking Action With Confidence</h2>
              <p className={STEP_LEAD}>
                Knowledge matters most when you can use it in the real world. Here is your practical communication blueprint and interactive roleplay rehearsal for clinical appointments.
              </p>
            </div>

            {/* Doctor discussion script */}
            <div className={`${CARD} p-5 sm:p-8 text-left`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className={LABEL}>
                      <Stethoscope className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Doctor Discussion Script</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyScript(advocacyData.doctorScript)}
                      className={BTN_SECONDARY}
                      aria-live="polite"
                    >
                      {copiedScript ? (
                        <>
                          <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Copy Script</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-5 sm:p-6 rounded-xl bg-light-teal-light space-y-2">
                    <p className="m-0 text-sm font-semibold text-deep-teal font-sans">
                      Situation: {advocacyData.situation}
                    </p>
                    <p className="max-w-[36rem] m-0 text-lg font-sans italic text-charcoal leading-relaxed">
                      {advocacyData.doctorScript}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-xl bg-warm-cream space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-deep-teal shrink-0" aria-hidden="true" />
                      <h4 className="font-sans font-semibold text-base text-deep-teal m-0">Why This Script Works</h4>
                    </div>
                    <p className="max-w-[65ch] text-sm sm:text-base text-charcoal-light leading-relaxed font-sans m-0">
                      {advocacyData.whyItWorks}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-soft-pink-light space-y-2">
                    <div className="flex items-center gap-2">
                      <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full bg-coral ring-4 ring-soft-pink" />
                      <h4 className="font-sans font-semibold text-base text-charcoal m-0">What If You Feel Dismissed?</h4>
                    </div>
                    <p className="max-w-[65ch] text-sm sm:text-base text-charcoal-light leading-relaxed font-sans m-0">
                      {advocacyData.whatIfDismissed}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Roleplay practice (advocacy lessons) */}
            {roleplayScenarios.length > 0 && isAdvocateLesson && (
              <div className="pt-6 border-t border-[#E5E1DC] space-y-6">
                <div>
                  <div className={`${LABEL} mb-2`}>
                    <Gamepad2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Interactive Rehearsal Studio</span>
                  </div>
                  <h3 className={`${SECTION_TITLE} mb-2`}>
                    Practice Your Clinical &amp; Self-Advocacy Roleplays
                  </h3>
                  <p className="text-base text-charcoal-light font-sans leading-relaxed text-pretty max-w-[36rem] m-0">
                    Rehearse your responses against realistic clinical and institutional pushback. Select each scenario to test your dialogue choices and review accredited guidelines.
                  </p>
                </div>

                {renderRoleplaySuite("Live Dialogue Rehearsal: Practice speaking up to providers, coaches, and administrators.")}
              </div>
            )}

            {/* Complete lesson band (the step's one dark band) */}
            <div className="rounded-2xl p-6 sm:p-10 bg-deep-teal text-white text-center space-y-4">
              <span className="w-14 h-14 rounded-full bg-deep-teal-dark flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 text-white" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-serif text-h3 font-normal text-white text-balance mb-2">
                  Ready to Complete This Lesson?
                </h3>
                <p className="text-base text-white max-w-xl mx-auto font-sans text-pretty m-0">
                  You have reviewed the biology, tested your skills, and unlocked your self-advocacy script.
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onComplete(topic)}
                  className="inline-flex items-center justify-center gap-2 min-h-11 px-6 rounded-full bg-white text-deep-teal text-sm font-semibold font-sans hover:bg-light-teal transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-deep-teal"
                >
                  <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{isCompleted ? "Review Completed" : "Complete Lesson"}</span>
                </button>
              </div>
            </div>

            {/* Sibling topics */}
            {siblingTopics.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-baseline justify-between gap-x-4 gap-y-1 flex-wrap">
                  <h3 className={SECTION_TITLE}>Continue Exploring in {categoryTitle}</h3>
                  <span className="text-sm font-semibold text-charcoal-light font-sans">Recommended Next</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {siblingTopics
                    .filter((t) => t.id !== topic.id)
                    .slice(0, 4)
                    .map((sibling) => (
                      <button
                        key={sibling.id}
                        type="button"
                        onClick={() => onNavigateToTopic?.(sibling.id)}
                        title={sibling.desc}
                        className={`${CARD} p-5 text-left flex flex-col gap-1 hover:border-deep-teal transition-colors duration-150 cursor-pointer ${FOCUS_RING}`}
                      >
                        <span className="text-sm font-semibold text-charcoal-light font-sans">{sibling.type}</span>
                        <span className="font-sans font-semibold text-deep-teal text-base text-balance">{sibling.name}</span>
                        <span className="text-sm text-charcoal-light font-sans text-pretty">{sibling.desc}</span>
                        <span className="mt-auto pt-3 flex justify-end text-deep-teal">
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            )}

            <div className={STEP_NAV}>
              <button type="button" onClick={prevStep} className={`${BTN_TEXT} self-start sm:self-auto`}>
                <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Back to Knowledge Check</span>
              </button>
              <button type="button" onClick={onBack} className={`${BTN_SECONDARY} w-full sm:w-auto`}>
                <span>Return to {categoryTitle}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Sticky progression bar: holds the screen's one raspberry action */}
      <footer className="sticky bottom-0 z-30 bg-white border-t border-[#E5E1DC]">
        <div className={`${CONTAINER} flex items-center justify-between gap-2 sm:gap-4 py-2`}>
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            aria-label="Previous Step"
            className={`${BTN_SECONDARY.replace("px-5", "px-3 sm:px-5")} shrink-0 min-w-11 disabled:cursor-not-allowed disabled:border-[#E5E1DC] disabled:bg-warm-cream disabled:text-charcoal-light disabled:hover:bg-warm-cream`}
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Previous Step</span>
          </button>

          <div
            className="flex-1 min-w-0 flex items-center justify-center gap-2 text-sm font-semibold text-charcoal-light font-sans"
            title={`Step ${currentStep} of 5: ${stepsConfig[currentStep - 1]?.title ?? ""}`}
          >
            <span className="text-deep-teal whitespace-nowrap">Step {currentStep} of 5</span>
            <span className="hidden lg:inline" aria-hidden="true">·</span>
            <span className="hidden lg:inline whitespace-nowrap">{stepsConfig[currentStep - 1]?.title}</span>
          </div>

          <button type="button" onClick={nextStep} className={`${BTN_PRIMARY.replace("px-5", "px-4 sm:px-5")} shrink-0`}>
            <span>{currentStep === 5 ? "Complete Lesson" : "Next Step"}</span>
            {currentStep < 5 ? (
              <ArrowRight className="hidden sm:block w-4 h-4 shrink-0" aria-hidden="true" />
            ) : (
              <Check className="hidden sm:block w-4 h-4 shrink-0" aria-hidden="true" />
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
