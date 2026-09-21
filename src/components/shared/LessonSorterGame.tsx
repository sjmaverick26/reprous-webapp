"use client";

import React, { useState } from "react";
import { LessonSorterGame } from "@/data/hubData";
import { CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles, ArrowRight, Gamepad2 } from "lucide-react";
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
    setFeedback(null);
    setIsFinished(false);
  };

  return (
    <div className="rounded-2xl border border-deep-teal/20 bg-white p-4 md:p-6 shadow-sm space-y-4">
      {/* Game Header */}
      <div className="flex items-start justify-between gap-2 border-b border-deep-teal/10 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-raspberry">
            <Gamepad2 className="w-4 h-4 text-raspberry" />
            Interactive Sorting Challenge
          </div>
          <h4 className="text-base md:text-xl font-serif font-bold text-deep-teal mt-0.5">
            {game.title}
          </h4>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-deep-teal">
            {isFinished ? "Completed" : `Item ${currentIndex + 1} of ${game.items.length}`}
          </span>
          <div className="text-[11px] text-charcoal/60">
            Score: <strong className="text-emerald-700">{score}</strong> / {game.items.length}
          </div>
        </div>
      </div>

      <p className="text-xs md:text-sm text-charcoal/80">
        {game.instructions}
      </p>

      {!isFinished ? (
        <div className="space-y-4">
          {/* Active Card to Sort */}
          <div className="min-h-[120px] p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-teal-50/40 border-2 border-deep-teal/20 flex flex-col justify-center items-center text-center shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/50 mb-1">
              Analyze this concept:
            </span>
            <p className="text-base md:text-lg font-bold text-deep-teal max-w-lg leading-snug">
              &ldquo;{currentItem.text}&rdquo;
            </p>
          </div>

          {/* Feedback Display if answered */}
          {feedback ? (
            <div
              className={`p-4 rounded-xl border animate-in fade-in zoom-in-95 duration-150 ${
                feedback.isCorrect
                  ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                  : "bg-red-50 border-red-300 text-red-900"
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {feedback.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Correct Analysis!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>Not quite — see medical rationale below:</span>
                  </>
                )}
              </div>
              <p className="text-xs md:text-sm text-charcoal/90 leading-relaxed font-normal">
                {feedback.explanation}
              </p>

              <div className="mt-3 flex justify-end">
                <Button
                  onClick={handleNext}
                  className="bg-deep-teal text-white hover:bg-deep-teal/90 text-xs gap-1.5 h-9"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ) : (
            /* Category Sorting Buttons */
            <div>
              <div className="text-[11px] font-bold text-charcoal/60 uppercase tracking-wider mb-2 text-center">
                Select the correct category:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {game.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.id)}
                    className="p-4 rounded-xl border-2 border-deep-teal/20 hover:border-deep-teal bg-white hover:bg-light-teal/40 transition-all font-bold text-sm text-deep-teal shadow-sm hover:scale-[1.01] active:scale-[0.99] text-center"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Victory & Completion View */
        <div className="p-6 rounded-2xl bg-gradient-to-b from-light-teal/60 to-white border border-deep-teal/30 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-deep-teal text-white flex items-center justify-center mx-auto shadow-md">
            <Trophy className="w-8 h-8 text-amber-300" />
          </div>

          <div>
            <h5 className="text-xl font-bold font-serif text-deep-teal">
              Challenge Completed!
            </h5>
            <p className="text-sm text-charcoal/80 mt-1">
              You scored <strong>{score}</strong> out of <strong>{game.items.length}</strong> correct!
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bonus +25 XP Earned</span>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <Button
              onClick={handleReset}
              variant="outline"
              className="gap-1.5 text-xs text-deep-teal border-deep-teal/30 hover:bg-light-teal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Play Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
