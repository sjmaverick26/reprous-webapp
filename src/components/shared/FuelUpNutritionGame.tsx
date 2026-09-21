"use client";

import React, { useState } from "react";
import {
  Trophy,
  Flame,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Check,
  CheckCircle,
  Lightbulb,
  Zap,
  ArrowRight,
  Star,
  Activity,
  Shield,
  Heart,
  Maximize2,
  Minimize2,
  X,
  AlertTriangle,
  Award,
  ChevronRight,
  Clock,
  Droplets,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HubTopic } from "@/data/hubData";

interface FuelUpNutritionGameProps {
  topic?: HubTopic;
  onComplete: () => void;
  onClose?: () => void;
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
}

interface GameRound {
  id: number;
  badge: string;
  stageName: string;
  title: string;
  scenario: string;
  mechanic: "scenario" | "lightning";
  options?: {
    id: string;
    letter: string;
    title: string;
    description: string;
    isCorrect: boolean;
    glycogenScore: number; // 0 - 100
    comfortScore: number;  // 0 - 100
    clinicalFeedback: string;
  }[];
  lightningStatements?: {
    statement: string;
    isTrue: boolean;
    explanation: string;
  }[];
}

const GAME_ROUNDS: GameRound[] = [
  {
    id: 1,
    badge: "Round 1 of 5 · Pre-Game Strategy",
    stageName: "Pre-Game Energy Primer (2–3h Before)",
    title: "Championship Kickoff Fueling Challenge",
    scenario:
      "Championship kickoff is in 2.5 hours! Your athlete needs to top off muscle glycogen for 90 minutes of high-intensity sprints. But high fat or excessive raw fiber slows digestion, pulling blood to the stomach and causing nausea or painful side stitches. Which pre-competition meal gives optimal power without GI distress?",
    mechanic: "scenario",
    options: [
      {
        id: "opt-1",
        letter: "A",
        title: "Oatmeal with sliced banana & honey, 2 egg whites, 16 oz electrolyte water",
        description: "60% easily digestible complex carbs, light lean protein, low fat, and low roughage.",
        isCorrect: true,
        glycogenScore: 98,
        comfortScore: 95,
        clinicalFeedback:
          "Optimal pre-competition fueling! Easily digestible carbohydrates top off liver and muscle glycogen rapidly. Keeping fats and fiber low prevents gastric delay, so blood stays in working muscles rather than the digestive tract.",
      },
      {
        id: "opt-2",
        letter: "B",
        title: "Bacon double cheeseburger with seasoned fries & whole chocolate milk",
        description: "Heavy saturated fats, deep-fried starches, and heavy dairy fats.",
        isCorrect: false,
        glycogenScore: 50,
        comfortScore: 15,
        clinicalFeedback:
          "Severe Gastric Delay! High-fat and greasy meals take 4–6 hours to empty from the stomach. During high-intensity sprints, your body redirects blood flow away from the gut, causing severe stomach cramps, acid reflux, and sluggish legs.",
      },
      {
        id: "opt-3",
        letter: "C",
        title: "Large raw kale, broccoli & lentil salad with hot peppers",
        description: "Very high insoluble roughage, raw sulfur crucifers, and spicy capsaicin.",
        isCorrect: false,
        glycogenScore: 40,
        comfortScore: 20,
        clinicalFeedback:
          "GI Distress Hazard! While healthy on rest days, raw kale and lentils right before a match create severe intestinal gas, bloating, and urgent mid-game cramps due to slow-fermenting insoluble fiber.",
      },
      {
        id: "opt-4",
        letter: "D",
        title: "Fasting on black coffee & ice water to stay 'light and lean'",
        description: "Zero calorie intake, high caffeine stimulant on an empty stomach.",
        isCorrect: false,
        glycogenScore: 10,
        comfortScore: 30,
        clinicalFeedback:
          "Acute Hypoglycemia Risk! Fasting before competition triggers premature glycogen depletion ('bonking'), shaky hands, elevated cortisol, and dizziness within the first 25 minutes of play.",
      },
    ],
  },
  {
    id: 2,
    badge: "Round 2 of 5 · Recovery Window",
    stageName: "The 45-Minute Post-Workout Golden Window",
    title: "Post-Match Glycogen & Muscle Rebuild",
    scenario:
      "The final whistle blows! After 90 minutes of grueling play, muscle glycogen stores are depleted and micro-tears have formed in muscle fibers. For the next 45 minutes, glycogen synthase enzymes operate at peak capacity. What is the clinical protocol to halt muscle breakdown and restore energy?",
    mechanic: "scenario",
    options: [
      {
        id: "opt-1",
        letter: "A",
        title: "Carbohydrate + Protein combo (3:1 ratio) within 45 minutes + fluids",
        description: "E.g. Salmon & brown rice bowl, or Greek yogurt with berries and granola, plus electrolytes.",
        isCorrect: true,
        glycogenScore: 100,
        comfortScore: 95,
        clinicalFeedback:
          "Clinical Home Run! Consuming a 3:1 or 4:1 ratio of carbohydrates to protein within 45 minutes triggers an insulin response that shuts down cortisol, halts muscle protein catabolism, and refills glycogen 2x faster than delayed eating.",
      },
      {
        id: "opt-2",
        letter: "B",
        title: "Wait 3 hours until regular dinner and only sip plain water",
        description: "Delaying all nutritional intake until dinner at home.",
        isCorrect: false,
        glycogenScore: 45,
        comfortScore: 60,
        clinicalFeedback:
          "Delayed Recovery Deficit! Delaying fuel beyond 2 hours slashes glycogen replenishment rates by 50%. Muscle tissue remains in a catabolic (breakdown) state, cortisol stays spiked, and nighttime repair hormone release is blunted.",
      },
      {
        id: "opt-3",
        letter: "C",
        title: "100% protein isolate powder with zero carbohydrates",
        description: "High amino acid shake without any starches or fruit sugars.",
        isCorrect: false,
        glycogenScore: 30,
        comfortScore: 70,
        clinicalFeedback:
          "Suboptimal Fueling! Without carbohydrates, there is insufficient insulin to drive amino acids into muscle cells. Your liver is forced to convert expensive protein into emergency glucose via gluconeogenesis, delaying repair.",
      },
      {
        id: "opt-4",
        letter: "D",
        title: "Bag of salty chips and a soda",
        description: "Refined table sugars and oxidized oils with zero amino acids.",
        isCorrect: false,
        glycogenScore: 55,
        comfortScore: 35,
        clinicalFeedback:
          "Zero Muscle Synthesis! While quick sugars refill some glycogen, the total lack of protein (leucine) leaves damaged muscle fibers un-repaired, resulting in prolonged soreness (DOMS) and ligament vulnerability.",
      },
    ],
  },
  {
    id: 3,
    badge: "Round 3 of 5 · Micronutrient Lab",
    stageName: "Menstrual Iron & Blood Oxygen Synergy",
    title: "The Plant Iron (Non-Heme) Catalyst Matcher",
    scenario:
      "Menstruating athletes lose 15–40 mg of iron every cycle, reducing hemoglobin and lowering athletic VO2 max. You are serving plant-based iron (dark spinach & steamed lentils). Non-heme plant iron is normally only 5–12% bioavailable. Which clinical pairing triples non-heme iron absorption by 300%?",
    mechanic: "scenario",
    options: [
      {
        id: "opt-1",
        letter: "A",
        title: "Sweet Bell Peppers & Fresh Citrus (Rich in Vitamin C)",
        description: "Ascorbic acid directly converts ferric iron (Fe3+) into absorbable ferrous iron (Fe2+).",
        isCorrect: true,
        glycogenScore: 95,
        comfortScore: 98,
        clinicalFeedback:
          "Bioavailability Breakthrough! Clinical trials confirm consuming 75mg of Vitamin C with plant iron triples absorption (~300% increase). Ascorbic acid reduces insoluble ferric iron to soluble ferrous iron, preventing sports anemia and heavy legs!",
      },
      {
        id: "opt-2",
        letter: "B",
        title: "Iced Black Tea or Dark Coffee with the meal",
        description: "High tannin and polyphenol beverage consumed alongside the spinach.",
        isCorrect: false,
        glycogenScore: 20,
        comfortScore: 50,
        clinicalFeedback:
          "Absorption Blocker! Tannins, polyphenols, and chlorogenic acids in tea and coffee bind tightly to iron in the duodenum, reducing iron absorption by up to 60–70%. Always separate tea/coffee from iron meals by at least 1 hour.",
      },
      {
        id: "opt-3",
        letter: "C",
        title: "Over-the-counter calcium antacid tablet with the meal",
        description: "High dose calcium carbonate taken simultaneously with food.",
        isCorrect: false,
        glycogenScore: 20,
        comfortScore: 50,
        clinicalFeedback:
          "Transporter Competition! Calcium directly competes with iron at the DMT-1 transporter in the intestinal wall. Taking high calcium doses at the exact same time as iron meals severely blunts iron uptake.",
      },
      {
        id: "opt-4",
        letter: "D",
        title: "Plain white bread with zero produce",
        description: "Refined grain with no ascorbic acid or organic acid co-factors.",
        isCorrect: false,
        glycogenScore: 40,
        comfortScore: 70,
        clinicalFeedback:
          "Ineffective! Plain starches contain no reducing acids to liberate plant iron from phytates, leaving non-heme absorption at its low baseline of under 5%.",
      },
    ],
  },
  {
    id: 4,
    badge: "Round 4 of 5 · Endocrine Defense",
    stageName: "The Hormone Shield: Preventing RED-S",
    title: "Defending Against Athletic Amenorrhea",
    scenario:
      "A teammate tells you her club coach suggested cutting all dietary fats and carbohydrates to drop down a weight class. As an educated peer advocate, you recognize the danger. What is the immediate physiological cascade if female athletes under-fuel below 30 kcal/kg Fat-Free Mass?",
    mechanic: "scenario",
    options: [
      {
        id: "opt-1",
        letter: "A",
        title: "Hypothalamus kisspeptin shuts down -> GnRH drops -> Estrogen halts -> Bones lose mineral density",
        description: "Energy deficit turns off the reproductive axis within 5 days, accelerating bone fractures.",
        isCorrect: true,
        glycogenScore: 100,
        comfortScore: 100,
        clinicalFeedback:
          "Master Clinical Diagnosis! Kisspeptin neurons in the brain require continuous carbohydrate availability. Under-fueling shuts off GnRH and suppresses ovarian estrogen. Without protective estrogen, osteoclasts resorb bone mineral, increasing stress fractures by 4.5x!",
      },
      {
        id: "opt-2",
        letter: "B",
        title: "The body safely adapts and menstrual cycles become lighter with no bone consequences",
        description: "Assuming amenorrhea is a natural adaptation to fitness.",
        isCorrect: false,
        glycogenScore: 15,
        comfortScore: 20,
        clinicalFeedback:
          "Dangerous Myth! Missing periods is NEVER a harmless adaptation. Over 90% of lifetime peak bone mass is formed before age 25. Amenorrhea during these years causes permanent, irreversible bone density loss.",
      },
      {
        id: "opt-3",
        letter: "C",
        title: "Estrogen and progesterone surge to build muscle faster",
        description: "Assuming under-fueling boosts athletic hormones.",
        isCorrect: false,
        glycogenScore: 10,
        comfortScore: 10,
        clinicalFeedback:
          "Biologically Impossible! The body conserves energy in an energetic deficit. Anabolic and reproductive hormones plummet, while catabolic cortisol and bone-destroying markers surge.",
      },
      {
        id: "opt-4",
        letter: "D",
        title: "Only male athletes suffer hormonal imbalances from low calorie intake",
        description: "Believing female endocrinology is immune to energy availability.",
        isCorrect: false,
        glycogenScore: 10,
        comfortScore: 10,
        clinicalFeedback:
          "False! Female athletes are acutely sensitive to low energy availability. The Female Athlete Triad and RED-S disproportionately affect female competitors across endurance, aesthetic, and team sports.",
      },
    ],
  },
  {
    id: 5,
    badge: "Round 5 of 5 · Lightning Round",
    stageName: "Rapid-Fire Myth Buster Lightning Round",
    title: "Female Athletic Fueling Truth Test",
    scenario:
      "Test your speed and precision! Read each rapid sports nutrition statement and classify it as TRUE or FALSE to lock in your championship victory and claim your +75 XP.",
    mechanic: "lightning",
    lightningStatements: [
      {
        statement:
          "Missing periods (amenorrhea) is a normal badge of honor proving a female athlete is working hard enough.",
        isTrue: false,
        explanation:
          "FALSE: Amenorrhea is a critical clinical warning sign of severe energy deficit (RED-S) that leaches calcium from bones and spikes fracture risk.",
      },
      {
        statement:
          "Consuming healthy dietary fats (avocados, olive oil, nuts) is mandatory for synthesizing estrogen and progesterone hormones.",
        isTrue: true,
        explanation:
          "TRUE: Sex steroid hormones are synthesized from dietary lipids and cholesterol. Fat intake below 20% of calories disrupts ovulatory cycles.",
      },
      {
        statement:
          "Female athletes oxidize carbohydrates at high rates during intense training and need >4g carbs/kg/day to protect ovulation.",
        isTrue: true,
        explanation:
          "TRUE: Carbohydrate availability is the #1 nutritional protector keeping kisspeptin neurons active and cycles regular.",
      },
      {
        statement:
          "Waiting more than 2 hours to eat after a hard practice cuts glycogen replenishment rate by nearly 50%.",
        isTrue: true,
        explanation:
          "TRUE: Glycogen synthase enzymes are most active in the 30–60 minute window; delaying fuel leaves muscle tissue broken down and cortisol high.",
      },
    ],
  },
];

export function FuelUpNutritionGame({
  topic,
  onComplete,
  onClose,
  isFullScreen = true,
  onToggleFullScreen,
}: FuelUpNutritionGameProps) {
  const [currentRoundIdx, setCurrentRoundIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [lightningAnswers, setLightningAnswers] = useState<Record<number, boolean>>({});
  const [lightningIndex, setLightningIndex] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const currentRound = GAME_ROUNDS[currentRoundIdx];
  const isLightning = currentRound.mechanic === "lightning";

  const handleSelectScenarioOption = (optId: string) => {
    if (selectedOptionId !== null) return; // already answered
    setSelectedOptionId(optId);
    setShowFeedback(true);

    const chosen = currentRound.options?.find((o) => o.id === optId);
    if (chosen?.isCorrect) {
      const addedPoints = 100 + streak * 15;
      setTotalScore((s) => s + addedPoints);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
    } else {
      setStreak(0);
    }
  };

  const handleSelectLightningAnswer = (answerBool: boolean) => {
    if (!currentRound.lightningStatements) return;
    const currentStmt = currentRound.lightningStatements[lightningIndex];
    if (lightningAnswers[lightningIndex] !== undefined) return;

    const isCorrect = answerBool === currentStmt.isTrue;
    setLightningAnswers((prev) => ({ ...prev, [lightningIndex]: answerBool }));

    if (isCorrect) {
      const added = 50 + streak * 10;
      setTotalScore((s) => s + added);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
    } else {
      setStreak(0);
    }
  };

  const handleNextLightningQuestion = () => {
    if (!currentRound.lightningStatements) return;
    if (lightningIndex < currentRound.lightningStatements.length - 1) {
      setLightningIndex((i) => i + 1);
    } else {
      // Completed round 5
      setIsGameFinished(true);
    }
  };

  const handleNextRound = () => {
    setSelectedOptionId(null);
    setShowFeedback(false);

    if (currentRoundIdx < GAME_ROUNDS.length - 1) {
      setCurrentRoundIdx((r) => r + 1);
    } else {
      setIsGameFinished(true);
    }
  };

  const handleRestartGame = () => {
    setCurrentRoundIdx(0);
    setSelectedOptionId(null);
    setLightningAnswers({});
    setLightningIndex(0);
    setTotalScore(0);
    setStreak(0);
    setShowFeedback(false);
    setIsGameFinished(false);
  };

  // Selected Option Object
  const selectedOptionObj = currentRound.options?.find((o) => o.id === selectedOptionId);

  // Victory calculations
  const maxPossibleScore = 650;
  const scorePercent = Math.min(100, Math.round((totalScore / maxPossibleScore) * 100));
  const starsEarned = scorePercent >= 85 ? 3 : scorePercent >= 60 ? 2 : 1;

  return (
    <div
      className={
        isFullScreen
          ? "w-full h-full min-h-0 overflow-y-auto p-3 sm:p-6 md:p-8 flex flex-col items-center justify-start bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          : "w-full h-full min-h-0 flex flex-col justify-between overflow-y-auto p-3 sm:p-5 bg-slate-50"
      }
    >
      <div
        className={
          isFullScreen
            ? "max-w-5xl w-full bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border-4 border-coral/40 space-y-5 my-auto"
            : "max-w-4xl w-full bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-slate-200 space-y-4 mx-auto"
        }
      >
        {/* Game Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-deep-teal/10 pb-3 pr-8 sm:pr-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-deep-teal text-white text-xs font-bold uppercase tracking-wider font-sans shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-coral" />
              Championship Nutrition Arena
            </span>
            <span className="text-xs font-bold text-coral uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-50 border border-coral/25 font-sans">
              +{topic?.xp || 75} XP Challenge
            </span>
          </div>

          {/* Right Controls: Score, Streak, Fullscreen, Close */}
          <div className="flex items-center gap-3">
            {/* Score & Streak HUD */}
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold font-sans">
              <span className="text-deep-teal flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                Score: {totalScore}
              </span>
              {streak > 1 && (
                <span className="text-coral flex items-center gap-1 pl-2 border-l border-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-coral" />
                  {streak}x Streak!
                </span>
              )}
            </div>

            {onToggleFullScreen && (
              <button
                type="button"
                onClick={onToggleFullScreen}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-charcoal/80 transition-all cursor-pointer border border-slate-200"
                title={isFullScreen ? "Exit Fullscreen" : "Fullscreen View"}
              >
                {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            )}

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-100 hover:bg-rose-100 hover:text-rose-700 text-charcoal/80 transition-all cursor-pointer border border-slate-200"
                title="Exit Game"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* -------------------------------------------------------------------------
            GAME FINISHED / VICTORY STAGE
           ------------------------------------------------------------------------- */}
        {isGameFinished ? (
          <div className="text-center py-6 sm:py-10 space-y-6 animate-in zoom-in-95 duration-300">
            {/* Trophy & Stars */}
            <div className="relative inline-block">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-amber-300 flex items-center justify-center shadow-lg animate-bounce">
                <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600" />
              </div>
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <div className="flex justify-center items-center gap-1.5">
                {[1, 2, 3].map((star) => (
                  <Star
                    key={star}
                    className={`w-7 h-7 ${
                      star <= starsEarned
                        ? "text-amber-400 fill-amber-400 drop-shadow-sm"
                        : "text-slate-300 fill-slate-200"
                    }`}
                  />
                ))}
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal m-0">
                Championship Nutrition Master!
              </h3>
              <p className="text-sm sm:text-base text-charcoal/80 font-sans leading-relaxed">
                You conquered all 5 sports nutrition challenges! You mastered pre-game glycogen loading, post-match recovery windows, iron bioavailability catalysts, and the RED-S hormone shield.
              </p>
            </div>

            {/* Score Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto font-sans text-left">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                  Total Score
                </span>
                <span className="text-2xl font-black text-amber-950">{totalScore} pts</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
                <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">
                  Best Streak
                </span>
                <span className="text-2xl font-black text-rose-950">{maxStreak} in a row</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Fuel Mastery
                </span>
                <span className="text-2xl font-black text-emerald-950">{scorePercent}%</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200">
                <span className="text-[11px] font-bold text-deep-teal uppercase tracking-wider block">
                  XP Earned
                </span>
                <span className="text-2xl font-black text-deep-teal">+{topic?.xp || 75} XP</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Button
                onClick={handleRestartGame}
                variant="outline"
                className="px-6 py-3 rounded-2xl font-bold text-sm text-deep-teal border-deep-teal/30 hover:bg-light-teal/30 flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </Button>

              <Button
                onClick={onComplete}
                className="px-8 py-3.5 rounded-2xl font-bold text-base bg-deep-teal hover:bg-deep-teal/90 text-white shadow-md flex items-center gap-2 cursor-pointer hover:scale-105 transition-all"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Claim +{topic?.xp || 75} XP & Complete</span>
              </Button>
            </div>
          </div>
        ) : (
          /* -------------------------------------------------------------------------
              ACTIVE ROUND STAGE (Rounds 1 to 5)
             ------------------------------------------------------------------------- */
          <div className="space-y-4 sm:space-y-5">
            {/* Round Header & Progress Tracker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold font-sans">
                <span className="text-deep-teal uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-coral" />
                  {currentRound.badge}
                </span>
                <span className="text-charcoal/60">
                  {currentRoundIdx + 1} of {GAME_ROUNDS.length} Rounds
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div
                  className="bg-gradient-to-r from-coral via-amber-400 to-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentRoundIdx + (isLightning ? (lightningIndex + 1) / 4 : 0)) / GAME_ROUNDS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Scenario Presentation Card */}
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-50/50 via-white to-teal-50/40 border-2 border-coral/25 shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-extrabold uppercase tracking-wider font-sans">
                  {currentRound.stageName}
                </span>
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-deep-teal m-0">
                {currentRound.title}
              </h4>
              <p className="text-xs sm:text-sm md:text-base text-charcoal/85 leading-relaxed font-sans m-0">
                {currentRound.scenario}
              </p>
            </div>

            {/* -----------------------------------------------------------------------
                MECHANIC 1: 4-CHOICE INTERACTIVE SCENARIO (Rounds 1–4)
               ----------------------------------------------------------------------- */}
            {!isLightning && currentRound.options && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentRound.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    const isAnswered = selectedOptionId !== null;

                    let cardStyle =
                      "border-slate-200 bg-white hover:border-deep-teal/40 hover:bg-slate-50/80";
                    let letterStyle = "bg-slate-100 text-charcoal/70 border-slate-300";

                    if (isAnswered) {
                      if (opt.isCorrect) {
                        cardStyle =
                          "border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-400 shadow-sm";
                        letterStyle = "bg-emerald-600 text-white border-emerald-600";
                      } else if (isSelected) {
                        cardStyle = "border-rose-400 bg-rose-50/80 ring-2 ring-rose-300";
                        letterStyle = "bg-rose-600 text-white border-rose-600";
                      } else {
                        cardStyle = "border-slate-200 bg-slate-50/50 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectScenarioOption(opt.id)}
                        disabled={isAnswered}
                        className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 select-none cursor-pointer shadow-2xs hover:-translate-y-0.5 font-sans ${cardStyle}`}
                      >
                        {/* Option Letter Token */}
                        <div
                          className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center shrink-0 border shadow-2xs transition-all ${letterStyle}`}
                        >
                          {opt.letter}
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-1 flex-1">
                          <span className="block text-xs sm:text-sm font-bold text-charcoal leading-snug">
                            {opt.title}
                          </span>
                          <p className="text-[11px] sm:text-xs text-charcoal/70 leading-relaxed m-0">
                            {opt.description}
                          </p>

                          {/* Reveal mini gauge if answered */}
                          {isAnswered && (
                            <div className="pt-2 flex items-center gap-3 text-[10.5px] font-bold">
                              <span
                                className={
                                  opt.glycogenScore >= 80 ? "text-emerald-700" : "text-amber-700"
                                }
                              >
                                Glycogen Refill: {opt.glycogenScore}%
                              </span>
                              <span
                                className={
                                  opt.comfortScore >= 80 ? "text-emerald-700" : "text-rose-700"
                                }
                              >
                                Stomach Comfort: {opt.comfortScore}%
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Status Icon Indicator */}
                        {isAnswered && (
                          <div className="shrink-0 mt-0.5">
                            {opt.isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : isSelected ? (
                              <XCircle className="w-5 h-5 text-rose-500" />
                            ) : null}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Educational Feedback Drawer after Selection */}
                {showFeedback && selectedOptionObj && (
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border-2 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300 font-sans ${
                      selectedOptionObj.isCorrect
                        ? "bg-emerald-50/90 border-emerald-300 text-emerald-950"
                        : "bg-amber-50/90 border-amber-300 text-amber-950"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {selectedOptionObj.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                        )}
                        <h5 className="font-bold text-sm sm:text-base m-0">
                          {selectedOptionObj.isCorrect
                            ? "Optimal Athletic Fueling!"
                            : "Biological Mismatch!"}
                        </h5>
                      </div>
                      <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/80 border">
                        {selectedOptionObj.isCorrect ? "+100 PTS" : "+0 PTS"}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed m-0 text-charcoal/90">
                      {selectedOptionObj.clinicalFeedback}
                    </p>

                    <div className="flex justify-end pt-1">
                      <Button
                        onClick={handleNextRound}
                        className="px-6 py-2 rounded-xl font-bold text-xs sm:text-sm bg-deep-teal text-white hover:bg-deep-teal/90 shadow-sm flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Next Round</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* -----------------------------------------------------------------------
                MECHANIC 2: RAPID-FIRE LIGHTNING MYTH BUSTER (Round 5)
               ----------------------------------------------------------------------- */}
            {isLightning && currentRound.lightningStatements && (
              <div className="space-y-4">
                {(() => {
                  const currentStmt = currentRound.lightningStatements[lightningIndex];
                  const answeredVal = lightningAnswers[lightningIndex];
                  const hasAnswered = answeredVal !== undefined;
                  const isCorrect = hasAnswered && answeredVal === currentStmt.isTrue;

                  return (
                    <div className="p-5 sm:p-7 rounded-3xl bg-white border-2 border-slate-200 shadow-sm space-y-5 font-sans">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-coral">
                          Myth-Buster #{lightningIndex + 1} of 4
                        </span>
                        <span className="text-xs text-charcoal/60 font-semibold">
                          Earn +50 pts per correct truth test
                        </span>
                      </div>

                      {/* Statement Banner */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                        <p className="text-base sm:text-lg md:text-xl font-serif font-bold text-deep-teal leading-snug m-0">
                          &ldquo;{currentStmt.statement}&rdquo;
                        </p>
                      </div>

                      {/* True / False Buttons */}
                      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                        <button
                          type="button"
                          onClick={() => handleSelectLightningAnswer(true)}
                          disabled={hasAnswered}
                          className={`py-3.5 px-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 border-2 cursor-pointer shadow-sm ${
                            hasAnswered
                              ? currentStmt.isTrue
                                ? "bg-emerald-600 text-white border-emerald-600 ring-4 ring-emerald-300"
                                : answeredVal === true
                                ? "bg-rose-600 text-white border-rose-600"
                                : "bg-slate-100 text-slate-400 border-slate-200 opacity-40"
                              : "bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300 hover:scale-105"
                          }`}
                        >
                          <Check className="w-5 h-5" />
                          <span>TRUE</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectLightningAnswer(false)}
                          disabled={hasAnswered}
                          className={`py-3.5 px-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 border-2 cursor-pointer shadow-sm ${
                            hasAnswered
                              ? !currentStmt.isTrue
                                ? "bg-emerald-600 text-white border-emerald-600 ring-4 ring-emerald-300"
                                : answeredVal === false
                                ? "bg-rose-600 text-white border-rose-600"
                                : "bg-slate-100 text-slate-400 border-slate-200 opacity-40"
                              : "bg-rose-50 hover:bg-rose-100 text-rose-900 border-rose-300 hover:scale-105"
                          }`}
                        >
                          <X className="w-5 h-5" />
                          <span>FALSE</span>
                        </button>
                      </div>

                      {/* Statement Feedback */}
                      {hasAnswered && (
                        <div
                          className={`p-4 rounded-2xl border-2 space-y-2 animate-in fade-in duration-200 ${
                            isCorrect
                              ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                              : "bg-rose-50 border-rose-300 text-rose-950"
                          }`}
                        >
                          <div className="flex items-center gap-2 font-bold text-sm">
                            {isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-700" />
                            )}
                            <span>{isCorrect ? "Correct!" : "Incorrect!"}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-charcoal/90 leading-relaxed m-0">
                            {currentStmt.explanation}
                          </p>

                          <div className="flex justify-end pt-2">
                            <Button
                              onClick={handleNextLightningQuestion}
                              className="px-6 py-2 rounded-xl font-bold text-xs sm:text-sm bg-deep-teal text-white hover:bg-deep-teal/90 shadow-sm flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>
                                {lightningIndex < currentRound.lightningStatements.length - 1
                                  ? "Next Statement"
                                  : "See Final Results"}
                              </span>
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
