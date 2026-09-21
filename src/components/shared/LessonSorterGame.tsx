"use client";

import React, { useState } from "react";
import { LessonSorterGame } from "@/data/hubData";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Sparkles,
  ArrowRight,
  Gamepad2,
  Heart,
  Flame,
  Layers,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LessonSorterGameProps {
  game: LessonSorterGame;
  themeColor?: string;
  onGameComplete?: (earnedBonusXp: number) => void;
}

export function LessonSorterGameComponent({
  game,
  themeColor = "#175B5C",
  onGameComplete,
}: LessonSorterGameProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    explanation: string;
    chosenCategory: string;
  } | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [claimedBonus, setClaimedBonus] = useState<boolean>(false);

  const currentItem = game.items[currentIndex];

  const handleSelectCategory = (categoryId: string) => {
    if (feedback) return; // Prevent double taps during explanation

    const isCorrect = categoryId === currentItem.correctCategory;
    if (isCorrect) {
      setScore((s) => s + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
    } else {
      setStreak(0);
      setLives((l) => Math.max(0, l - 1));
    }

    setFeedback({
      isCorrect,
      explanation: currentItem.explanation,
      chosenCategory: categoryId,
    });
  };

  const handleNext = () => {
    setFeedback(null);
    if (currentIndex + 1 < game.items.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsFinished(true);
      if (onGameComplete && !claimedBonus) {
        onGameComplete(25);
        setClaimedBonus(true);
      }
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setLives(3);
    setFeedback(null);
    setIsFinished(false);
  };

  return (
    <div className="rounded-3xl border-2 border-deep-teal/20 bg-white p-5 sm:p-7 shadow-md space-y-5">
      {/* Game Arcade Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-deep-teal/15 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full bg-raspberry text-white px-3 py-0.5 text-xs font-bold uppercase tracking-wider font-sans shadow-2xs">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Sorting Arcade Challenge</span>
            </div>
            {streak >= 2 && (
              <span className="flex items-center gap-1 rounded-full bg-orange-100 border border-orange-300 px-2.5 py-0.5 text-xs font-bold text-orange-700 font-sans animate-pulse">
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                <span>{streak}X STREAK!</span>
              </span>
            )}
          </div>
          <h4 className="text-xl sm:text-2xl font-serif font-bold text-deep-teal mt-1">
            {game.title}
          </h4>
        </div>

        {/* Status: Item count, score, hearts */}
        <div className="flex items-center gap-4">
          {/* Hearts / Lives */}
          <div className="flex items-center gap-1 bg-red-50 border border-red-200 px-2.5 py-1 rounded-xl shadow-2xs">
            {[1, 2, 3].map((heartIdx) => (
              <Heart
                key={heartIdx}
                className={`w-4 h-4 transition-all ${
                  heartIdx <= lives
                    ? "fill-red-500 text-red-500 scale-100"
                    : "fill-slate-200 text-slate-300 scale-90"
                }`}
              />
            ))}
          </div>

          <div className="text-right">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/60 font-sans">
              {isFinished ? "Completed" : `Item ${currentIndex + 1} of ${game.items.length}`}
            </span>
            <span className="text-sm sm:text-base font-bold text-deep-teal font-sans">
              Score: <strong className="text-emerald-700">{score}</strong> / {game.items.length}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm sm:text-base text-charcoal/80 font-sans leading-relaxed">
        {game.instructions}
      </p>

      {!isFinished ? (
        <div className="space-y-5">
          {/* Active Card to Sort with 3D Float Visual */}
          <div className="relative min-h-[140px] p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-light-teal/50 via-white to-light-teal/30 border-2 border-deep-teal/30 flex flex-col justify-center items-center text-center shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            {/* Top decorative pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-deep-teal/20 text-[11px] font-bold uppercase tracking-wider text-deep-teal mb-3 shadow-2xs font-sans">
              <Layers className="w-3.5 h-3.5" />
              <span>Analyze & Sort This Signal:</span>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-deep-teal max-w-xl leading-snug m-0">
              &ldquo;{currentItem.text}&rdquo;
            </p>
          </div>

          {/* Feedback Display if answered */}
          {feedback ? (
            <div
              className={`p-5 sm:p-6 rounded-3xl border-2 animate-in fade-in zoom-in-95 duration-200 space-y-3 ${
                feedback.isCorrect
                  ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                  : "bg-red-50 border-red-300 text-red-950"
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-base sm:text-lg font-sans">
                {feedback.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Brilliant Sorting! Correct Category.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>Tricky Concept — See Clinical Rationale Below:</span>
                  </>
                )}
              </div>

              <p className="text-sm sm:text-base text-charcoal/90 leading-relaxed font-sans m-0">
                {feedback.explanation}
              </p>

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={handleNext}
                  className="bg-deep-teal text-white hover:bg-deep-teal/90 text-sm sm:text-base font-bold gap-2 h-11 px-6 rounded-2xl cursor-pointer shadow-xs"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            /* Category Sorting Buckets */
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-charcoal/70 uppercase tracking-wider text-center font-sans">
                Select the target sorting category:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {game.categories.map((cat, idx) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat.id)}
                    className="p-5 sm:p-6 rounded-2xl border-2 border-deep-teal/20 bg-white hover:border-deep-teal hover:bg-light-teal/30 hover:-translate-y-0.5 active:translate-y-0 transition-all font-bold text-base sm:text-lg text-deep-teal shadow-2xs hover:shadow-md cursor-pointer text-center group flex flex-col items-center justify-center gap-1.5"
                  >
                    <span className="text-xs uppercase tracking-wider text-charcoal/60 font-sans group-hover:text-deep-teal">
                      Bucket {idx + 1}
                    </span>
                    <span className="font-serif leading-snug">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Victory & Completion Screen */
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-light-teal/50 via-white to-light-teal/30 border-2 border-deep-teal/30 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex justify-center items-center gap-2">
            {[1, 2, 3].map((starIdx) => (
              <Star
                key={starIdx}
                className="w-10 h-10 text-amber-400 fill-amber-400 drop-shadow-md animate-bounce"
                style={{ animationDelay: `${starIdx * 150}ms` }}
              />
            ))}
          </div>

          <div className="w-16 h-16 rounded-2xl bg-deep-teal text-white flex items-center justify-center mx-auto shadow-md">
            <Trophy className="w-8 h-8 text-amber-300" />
          </div>

          <div>
            <h5 className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal">
              Sorting Challenge Mastered!
            </h5>
            <p className="text-base sm:text-lg text-charcoal/80 mt-1 font-sans">
              You scored <strong className="text-emerald-700">{score}</strong> out of{" "}
              <strong>{game.items.length}</strong> correct!
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold border border-emerald-300 shadow-2xs font-sans">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Bonus +25 XP Added to Health Bank!</span>
          </div>

          <div className="flex justify-center gap-3 pt-2 flex-wrap">
            <Button
              onClick={handleReset}
              variant="outline"
              className="text-sm sm:text-base border-deep-teal/30 text-deep-teal cursor-pointer h-11 px-5 rounded-2xl font-bold hover:bg-light-teal/40"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
