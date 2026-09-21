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
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface InteractiveQuizGameProps {
  questions: QuizQuestion[];
  topicName: string;
  topicXp: number;
  onComplete: () => void;
}

export function InteractiveQuizGame({
  questions,
  topicName,
  topicXp,
  onComplete,
}: InteractiveQuizGameProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = questions[currentStep];
  const chosenAnswer = answers[currentStep];
  const isAnswered = chosenAnswer !== undefined;
  const isCorrect = isAnswered && chosenAnswer === currentQ.correctIndex;

  const handleSelectOption = (optIdx: number) => {
    if (isAnswered) return;

    const correct = optIdx === currentQ.correctIndex;
    setAnswers((prev) => ({ ...prev, [currentStep]: optIdx }));

    if (correct) {
      setScore((s) => s + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setScore(0);
    setStreak(0);
    setIsFinished(false);
  };

  // Option Letter Tokens
  const optionLetters = ["A", "B", "C", "D"];
  const letterColors = [
    "bg-teal-100 text-teal-800 border-teal-300",
    "bg-coral/20 text-[#B83F68] border-coral/40",
    "bg-pink-100 text-pink-800 border-pink-300",
    "bg-amber-100 text-amber-800 border-amber-300",
  ];

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    const starCount = percentage === 100 ? 3 : percentage >= 60 ? 2 : 1;

    return (
      <div className="relative overflow-hidden rounded-3xl border-2 border-deep-teal/20 bg-gradient-to-b from-white via-light-teal/30 to-white p-6 sm:p-10 text-center shadow-lg space-y-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Floating Celebration Stars */}
        <div className="flex justify-center items-center gap-2 pt-2">
          {[1, 2, 3].map((starIdx) => (
            <div
              key={starIdx}
              className={`transform transition-all duration-500 ${
                starIdx <= starCount
                  ? "scale-110 text-amber-400 drop-shadow-md animate-bounce"
                  : "scale-90 text-slate-200"
              }`}
              style={{ animationDelay: `${starIdx * 150}ms` }}
            >
              <Star className="w-10 h-10 sm:w-12 sm:h-12 fill-current" />
            </div>
          ))}
        </div>

        {/* Mascot Victory Avatar */}
        <div className="relative mx-auto w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Friendly Mascot Circle */}
            <circle cx="50" cy="50" r="46" fill="#175B5C" />
            <circle cx="50" cy="50" r="42" fill="#207374" />
            {/* Mascot Face */}
            <ellipse cx="50" cy="48" rx="28" ry="24" fill="#FDE68A" />
            {/* Star Eyes */}
            <path d="M 40 44 L 42 40 L 44 44 L 48 44 L 45 46 L 46 50 L 42 47 L 38 50 L 39 46 L 36 44 Z" fill="#92400E" />
            <path d="M 60 44 L 62 40 L 64 44 L 68 44 L 65 46 L 66 50 L 62 47 L 58 50 L 59 46 L 56 44 Z" fill="#92400E" />
            {/* Big Smile */}
            <path d="M 40 56 Q 50 66 60 56 Z" fill="#B91C1C" />
            <path d="M 44 57 Q 50 61 56 57 Z" fill="#FFFFFF" />
            {/* Graduation/Mastery Cap */}
            <polygon points="50,16 80,26 50,36 20,26" fill="#042F2E" />
            <rect x="36" y="32" width="28" height="10" rx="3" fill="#042F2E" />
            <line x1="80" y1="26" x2="80" y2="44" stroke="#F59E0B" strokeWidth="2.5" />
            <circle cx="80" cy="46" r="3" fill="#F59E0B" />
          </svg>
        </div>

        <div>
          <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 border border-emerald-300 font-sans mb-2">
            Quiz Challenge Completed!
          </span>
          <h4 className="text-3xl sm:text-4xl font-serif font-bold text-deep-teal">
            {percentage === 100
              ? "Flawless Health Literacy!"
              : percentage >= 60
              ? "Clinical Mastery Achieved!"
              : "Great Effort & Practice!"}
          </h4>
          <p className="text-base sm:text-lg text-charcoal/80 mt-1 font-sans">
            You scored <strong className="text-emerald-700">{score}</strong> out of{" "}
            <strong>{questions.length}</strong> ({percentage}%)!
          </p>
        </div>

        {/* Stats Pill Row */}
        <div className="flex justify-center items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 rounded-2xl bg-white border border-deep-teal/20 px-4 py-2 shadow-2xs">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-charcoal font-sans">
              Score: {score}/{questions.length}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-2xl bg-white border border-deep-teal/20 px-4 py-2 shadow-2xs">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold text-charcoal font-sans">
              Best Streak: {maxStreak} 🔥
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-2xl bg-white border border-deep-teal/20 px-4 py-2 shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-bold text-emerald-700 font-sans">
              +{topicXp} XP Ready
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-charcoal/70 max-w-md mx-auto font-sans leading-relaxed">
          You have mastered the biological mechanisms, reviewed verified clinical guidelines, and practiced self-advocacy for <strong>{topicName}</strong>.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 pt-2 flex-wrap">
          <Button
            onClick={handleRestart}
            variant="outline"
            className="text-sm sm:text-base border-deep-teal/30 text-deep-teal cursor-pointer h-12 px-6 rounded-2xl font-bold hover:bg-light-teal/40"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake for 3 Stars
          </Button>

          <Button
            onClick={onComplete}
            className="bg-deep-teal text-white hover:bg-deep-teal/90 text-sm sm:text-base h-12 px-7 rounded-2xl cursor-pointer font-bold shadow-md hover:shadow-lg gap-2"
          >
            <CheckCircle className="w-5 h-5 text-emerald-300" />
            <span>Claim & Complete (+{topicXp} XP)</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border-2 border-deep-teal/20 bg-white p-5 sm:p-8 shadow-md space-y-6">
      {/* Game Header Bar with Streak & Progress */}
      <div className="flex items-center justify-between border-b border-deep-teal/15 pb-4 gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-deep-teal font-sans">
              Question {currentStep + 1} of {questions.length}
            </span>
            {streak >= 2 && (
              <span className="flex items-center gap-1 rounded-full bg-orange-100 border border-orange-300 px-2.5 py-0.5 text-xs font-bold text-orange-700 font-sans animate-pulse">
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                <span>{streak}X STREAK!</span>
              </span>
            )}
          </div>
          {/* Progress Bar */}
          <div className="mt-2 h-2.5 w-44 sm:w-56 rounded-full bg-slate-100 p-0.5 border border-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-deep-teal to-emerald-500 transition-all duration-500"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Score & Health Guide Mascot Thumbnail */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/60 font-sans">
              Current Score
            </span>
            <span className="text-base sm:text-lg font-bold text-emerald-700 font-sans">
              {score} / {questions.length}
            </span>
          </div>

          {/* Mini Mascot Guide SVG */}
          <div className="w-11 h-11 rounded-2xl bg-light-teal/80 border border-deep-teal/20 p-1 flex items-center justify-center shrink-0 shadow-2xs">
            <svg viewBox="0 0 40 40" className="w-8 h-8">
              <circle cx="20" cy="20" r="18" fill="#175B5C" />
              <ellipse cx="20" cy="19" rx="12" ry="10" fill="#FDE68A" />
              {isAnswered && isCorrect ? (
                // Cheering Wink Eyes
                <>
                  <circle cx="16" cy="18" r="1.5" fill="#175B5C" />
                  <path d="M 22 18 Q 24 16 26 18" stroke="#175B5C" strokeWidth="1.5" fill="none" />
                  <path d="M 17 23 Q 20 27 23 23 Z" fill="#DC2626" />
                </>
              ) : isAnswered && !isCorrect ? (
                // Supportive Look
                <>
                  <circle cx="16" cy="18" r="1.5" fill="#175B5C" />
                  <circle cx="24" cy="18" r="1.5" fill="#175B5C" />
                  <path d="M 17 23 Q 20 21 23 23" stroke="#DC2626" strokeWidth="1.5" fill="none" />
                </>
              ) : (
                // Expectant Friendly Look
                <>
                  <circle cx="16" cy="18" r="1.5" fill="#175B5C" />
                  <circle cx="24" cy="18" r="1.5" fill="#175B5C" />
                  <path d="M 17 23 Q 20 26 23 23" stroke="#DC2626" strokeWidth="1.5" fill="none" />
                </>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Question Prompt */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-raspberry font-sans flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" />
          Interactive Knowledge Challenge
        </span>
        <h5 className="text-xl sm:text-2xl md:text-[26px] font-bold text-deep-teal font-serif leading-snug">
          {currentQ.question}
        </h5>
      </div>

      {/* Tactile Gamified Answer Choice Cards */}
      <div className="flex flex-col gap-3">
        {currentQ.options.map((opt, optIdx) => {
          const isCorrectOpt = optIdx === currentQ.correctIndex;
          const isSelectedOpt = chosenAnswer === optIdx;

          return (
            <button
              key={optIdx}
              type="button"
              onClick={() => handleSelectOption(optIdx)}
              disabled={isAnswered}
              className={`w-full rounded-2xl p-4 sm:p-5 text-left text-base sm:text-lg font-semibold transition-all border-2 flex items-center justify-between gap-3 cursor-pointer shadow-2xs ${
                isAnswered
                  ? isCorrectOpt
                    ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/25 shadow-sm"
                    : isSelectedOpt
                    ? "border-red-400 bg-red-50 text-red-950"
                    : "border-slate-200 bg-slate-50/60 opacity-60 text-charcoal/70"
                  : "border-deep-teal/15 bg-white text-charcoal hover:border-deep-teal hover:bg-light-teal/25 hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl border text-xs font-bold font-sans shrink-0 ${
                    letterColors[optIdx % letterColors.length]
                  }`}
                >
                  {optionLetters[optIdx]}
                </span>
                <span className="leading-snug">{opt}</span>
              </div>

              {isAnswered && (
                <div className="shrink-0">
                  {isCorrectOpt ? (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white shadow-2xs">
                      <Check className="w-3.5 h-3.5" />
                      <span>Correct</span>
                    </span>
                  ) : isSelectedOpt ? (
                    <span className="flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold text-white shadow-2xs">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Incorrect</span>
                    </span>
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Clinical Insight & Did You Know Card */}
      {isAnswered && (
        <div
          className={`rounded-2xl border-2 p-5 text-sm sm:text-base leading-relaxed animate-in fade-in duration-200 font-sans space-y-1.5 ${
            isCorrect
              ? "border-emerald-300 bg-emerald-50/70 text-emerald-950"
              : "border-amber-300 bg-amber-50/70 text-amber-950"
          }`}
        >
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <strong className="text-xs sm:text-sm uppercase tracking-wider font-bold">
              {isCorrect ? "✦ Clinical Insight & Evidence Drop:" : "💡 Health Literacy Learning Tip:"}
            </strong>
          </div>
          <p className="m-0 text-charcoal/90">{currentQ.explanation}</p>
        </div>
      )}

      {/* Next / View Results Button */}
      {isAnswered && (
        <div className="flex justify-end pt-2">
          {currentStep < questions.length - 1 ? (
            <Button
              onClick={handleNext}
              className="bg-deep-teal text-white hover:bg-deep-teal/90 text-sm sm:text-base h-12 px-6 rounded-2xl font-bold cursor-pointer gap-2 shadow-sm"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-emerald-600 text-white hover:bg-emerald-700 text-sm sm:text-base h-12 px-6 rounded-2xl font-bold cursor-pointer gap-2 shadow-sm"
            >
              <span>View Quiz Results & Victory Screen</span>
              <Trophy className="w-4 h-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
