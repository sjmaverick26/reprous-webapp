"use client";

import React, { useState, useMemo } from "react";
import {
  Trophy,
  Flame,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Check,
  Zap,
  Star,
  Activity,
  Shield,
  Heart,
  Maximize2,
  Minimize2,
  X,
  Award,
  ChevronRight,
  Clock,
  Layers,
  ArrowRight,
  RefreshCw,
  Sliders,
  ThumbsUp,
  ThumbsDown,
  Sparkle,
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

// ============================================================================
// VECTOR SVG DRAWINGS & ILLUSTRATIONS (NO EXTERNAL ASSETS / NO EMOJIS)
// ============================================================================

export function FoodDrawing({ id, className = "w-full h-full" }: { id: string; className?: string }) {
  switch (id) {
    case "banana":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path
            d="M 14 44 C 18 20 38 12 50 14 C 44 26 28 48 14 44 Z"
            fill="#FBBF24"
            stroke="#D97706"
            strokeWidth="1.5"
          />
          <path d="M 50 14 L 54 11" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 14 44 L 10 47" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <path d="M 22 36 C 30 22 42 16 48 16" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="28" cy="30" r="1" fill="#B45309" />
          <circle cx="36" cy="22" r="1" fill="#B45309" />
        </svg>
      );

    case "rolled_oats":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 14 32 C 14 46 22 52 32 52 C 42 52 50 46 50 32 Z" fill="#CA8A04" />
          <ellipse cx="32" cy="32" rx="18" ry="7" fill="#FEF08A" stroke="#A16207" strokeWidth="1.5" />
          <ellipse cx="28" cy="31" rx="4" ry="2" transform="rotate(-20 28 31)" fill="#EAB308" />
          <ellipse cx="35" cy="31" rx="4" ry="2" transform="rotate(30 35 31)" fill="#EAB308" />
          <ellipse cx="31" cy="33" rx="3" ry="1.5" fill="#CA8A04" />
          <path d="M 38 12 L 34 26" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="36" cy="14" rx="3" ry="1.5" transform="rotate(45 36 14)" fill="#EAB308" />
        </svg>
      );

    case "orange_citrus":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="34" r="22" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
          <circle cx="32" cy="34" r="18" fill="#FDBA74" />
          <circle cx="32" cy="34" r="16" fill="#FB923C" />
          {/* Citrus Segments */}
          <path d="M 32 18 L 32 50" stroke="#FFEDD5" strokeWidth="1.5" />
          <path d="M 16 34 L 48 34" stroke="#FFEDD5" strokeWidth="1.5" />
          <path d="M 21 23 L 43 45" stroke="#FFEDD5" strokeWidth="1.5" />
          <path d="M 21 45 L 43 23" stroke="#FFEDD5" strokeWidth="1.5" />
          <circle cx="32" cy="34" r="3" fill="#FFEDD5" />
          <path d="M 32 12 Q 36 8 40 8" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="41" cy="9" rx="4" ry="2" transform="rotate(20 41 9)" fill="#22C55E" />
        </svg>
      );

    case "spinach_kale":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path
            d="M 18 48 C 12 36 16 18 32 14 C 44 20 46 36 40 48 C 34 44 26 44 18 48 Z"
            fill="#15803D"
            stroke="#166534"
            strokeWidth="1.5"
          />
          <path d="M 30 18 L 28 52" stroke="#86EFAC" strokeWidth="2" strokeLinecap="round" />
          <path d="M 29 28 Q 36 26 38 29" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 29 36 Q 22 34 20 37" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 28 42 Q 35 40 37 43" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "wild_salmon":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path
            d="M 12 34 C 18 22 36 20 48 24 C 54 26 54 36 48 42 C 34 46 20 44 12 34 Z"
            fill="#F43F5E"
            stroke="#BE123C"
            strokeWidth="1.5"
          />
          <path d="M 22 26 C 26 31 28 39 28 42" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
          <path d="M 31 25 C 35 31 37 38 37 42" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
          <path d="M 40 26 C 43 31 44 38 45 41" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
          <path d="M 38 43 A 10 10 0 0 1 48 43 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
        </svg>
      );

    case "avocado":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path
            d="M 32 10 C 22 10 16 22 16 36 C 16 48 23 54 32 54 C 41 54 48 48 48 36 C 48 22 42 10 32 10 Z"
            fill="#365314"
          />
          <path
            d="M 32 14 C 24 14 20 24 20 36 C 20 46 25 50 32 50 C 39 50 44 46 44 36 C 44 24 40 14 32 14 Z"
            fill="#84CC16"
          />
          <path
            d="M 32 20 C 27 20 24 28 24 37 C 24 44 27 47 32 47 C 37 47 40 44 40 37 C 40 28 37 20 32 20 Z"
            fill="#BEF264"
          />
          <circle cx="32" cy="38" r="9" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
          <circle cx="30" cy="36" r="2.5" fill="#92400E" />
        </svg>
      );

    case "greek_yogurt":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 16 26 L 48 26 L 44 52 L 20 52 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
          <ellipse cx="32" cy="26" rx="16" ry="6" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1.5" />
          {/* Swirl of creamy yogurt */}
          <path
            d="M 26 26 C 26 22 38 20 36 26 C 34 29 28 29 26 26 Z"
            fill="#FFFFFF"
            stroke="#BAE6FD"
            strokeWidth="1.5"
          />
          <circle cx="35" cy="24" r="2" fill="#6366F1" />
          <circle cx="31" cy="23" r="1.5" fill="#4F46E5" />
          <rect x="22" y="34" width="20" height="10" rx="3" fill="#E0F2FE" />
          <path d="M 26 39 L 38 39" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "wild_berries":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 32 14 C 40 12 46 16 46 24 C 38 24 34 20 32 14 Z" fill="#16A34A" />
          <circle cx="25" cy="30" r="10" fill="#1E3A8A" stroke="#172554" strokeWidth="1.5" />
          <circle cx="23" cy="27" r="2.5" fill="#60A5FA" opacity="0.6" />
          <circle cx="39" cy="28" r="9.5" fill="#4C1D95" stroke="#2E1065" strokeWidth="1.5" />
          <circle cx="37" cy="25" r="2.5" fill="#A78BFA" opacity="0.6" />
          <circle cx="32" cy="42" r="10" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="1.5" />
          <circle cx="30" cy="39" r="2.5" fill="#93C5FD" opacity="0.6" />
        </svg>
      );

    case "pastured_eggs":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <ellipse
            cx="26"
            cy="34"
            rx="13"
            ry="17"
            transform="rotate(-20 26 34)"
            fill="#F8FAFC"
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
          <path
            d="M 32 44 C 42 48 52 40 48 28 C 44 20 32 26 32 44 Z"
            fill="#FFFBEB"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          <circle cx="41" cy="34" r="8" fill="#F59E0B" />
          <circle cx="39" cy="32" r="2" fill="#FEF3C7" />
        </svg>
      );

    case "walnuts_chia":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path
            d="M 28 16 C 18 18 14 28 14 38 C 14 48 22 52 30 52 C 34 52 36 46 36 34 C 36 22 34 16 28 16 Z"
            fill="#A16207"
            stroke="#713F12"
            strokeWidth="1.5"
          />
          <path d="M 22 24 C 20 30 26 34 22 42" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
          <circle cx="44" cy="26" r="2" fill="#1E293B" />
          <circle cx="48" cy="32" r="2" fill="#334155" />
          <circle cx="43" cy="38" r="2" fill="#1E293B" />
          <circle cx="47" cy="44" r="2" fill="#334155" />
        </svg>
      );

    case "sweet_potato":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <ellipse cx="32" cy="34" rx="26" ry="16" transform="rotate(-15 32 34)" fill="#C2410C" />
          <ellipse cx="32" cy="34" rx="22" ry="12" transform="rotate(-15 32 34)" fill="#EA580C" />
          <ellipse cx="32" cy="34" rx="17" ry="8" transform="rotate(-15 32 34)" fill="#FB923C" />
          <path d="M 24 22 Q 26 14 30 16" stroke="#FED7AA" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        </svg>
      );

    case "burger_hazard":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          {/* Top Bun */}
          <path d="M 16 26 C 16 16 48 16 48 26 Z" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="24" cy="21" r="1" fill="#FEF3C7" />
          <circle cx="32" cy="19" r="1" fill="#FEF3C7" />
          <circle cx="40" cy="21" r="1" fill="#FEF3C7" />
          {/* Cheese */}
          <path d="M 14 28 L 50 28 L 46 33 L 36 30 L 26 34 L 18 29 Z" fill="#FACC15" />
          {/* Greasy Patty */}
          <rect x="14" y="32" width="36" height="8" rx="4" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
          {/* Bottom Bun */}
          <rect x="16" y="42" width="32" height="7" rx="3.5" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
          {/* Red Hazard Stripe */}
          <line x1="12" y1="12" x2="52" y2="52" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "donut_hazard":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="32" r="20" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="19" fill="#F43F5E" />
          <circle cx="32" cy="32" r="8" fill="#F8FAFC" stroke="#B45309" strokeWidth="1.5" />
          {/* Sprinkles */}
          <line x1="24" y1="20" x2="27" y2="21" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
          <line x1="38" y1="22" x2="40" y2="24" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="34" x2="22" y2="36" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" />
          <line x1="42" y1="36" x2="44" y2="34" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="12" x2="52" y2="52" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "soda_hazard":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <rect x="22" y="16" width="20" height="36" rx="4" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
          <ellipse cx="32" cy="16" rx="10" ry="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
          <path d="M 24 28 C 30 36 34 26 40 34" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="12" x2="52" y2="52" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "coffee_blocker":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 16 22 L 44 22 L 40 48 C 40 52 20 52 20 48 Z" fill="#451A03" stroke="#290E02" strokeWidth="1.5" />
          {/* Mug handle */}
          <path d="M 42 26 C 50 26 50 40 40 42" stroke="#290E02" strokeWidth="3" fill="none" />
          {/* Steam */}
          <path d="M 24 16 Q 22 12 24 8" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 32 15 Q 30 11 32 7" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="12" x2="52" y2="52" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="32" r="20" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
        </svg>
      );
  }
}

// ============================================================================
// SUPERPOWER VECTOR GRAPHICS
// ============================================================================

function SuperpowerDrawing({ id, className = "w-full h-full" }: { id: string; className?: string }) {
  switch (id) {
    case "glycogen_lightning":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="32" r="26" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
          {/* High voltage sprint lightning */}
          <path
            d="M 36 12 L 20 34 L 32 34 L 26 52 L 46 28 L 34 28 Z"
            fill="#F59E0B"
            stroke="#D97706"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "estrogen_bone":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="32" r="26" fill="#FCE7F3" stroke="#EC4899" strokeWidth="2" />
          {/* Bone Shield Graphic */}
          <path
            d="M 32 14 C 44 14 48 24 48 36 C 48 48 32 54 32 54 C 32 54 16 48 16 36 C 16 24 20 14 32 14 Z"
            fill="#F472B6"
            stroke="#DB2777"
            strokeWidth="1.5"
          />
          {/* Bone Icon in shield */}
          <circle cx="26" cy="30" r="3" fill="#FFFFFF" />
          <circle cx="38" cy="30" r="3" fill="#FFFFFF" />
          <rect x="26" y="32" width="12" height="6" fill="#FFFFFF" />
          <circle cx="26" cy="40" r="3" fill="#FFFFFF" />
          <circle cx="38" cy="40" r="3" fill="#FFFFFF" />
        </svg>
      );

    case "iron_blood":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="32" r="26" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
          {/* Oxygenated Red Blood Cells */}
          <circle cx="24" cy="28" r="10" fill="#EF4444" />
          <circle cx="24" cy="28" r="5" fill="#DC2626" />
          <circle cx="40" cy="34" r="12" fill="#DC2626" />
          <circle cx="40" cy="34" r="6" fill="#B91C1C" />
          {/* Oxygen sparkle pulse */}
          <path d="M 32 12 L 34 16 L 38 18 L 34 20 L 32 24 L 30 20 L 26 18 L 30 16 Z" fill="#F87171" />
        </svg>
      );

    case "muscle_repair":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="32" r="26" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
          {/* 45-Min Stopwatch & Muscle Rebuilder */}
          <circle cx="32" cy="35" r="16" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
          <rect x="30" y="14" width="4" height="6" rx="2" fill="#0284C7" />
          {/* 45 min clock hand */}
          <line x1="32" y1="35" x2="22" y2="35" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="32" y1="35" x2="32" y2="24" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "cramp_shield":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="32" r="26" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
          <path
            d="M 32 16 C 42 16 46 24 46 34 C 46 44 32 50 32 50 C 32 50 18 44 18 34 C 18 24 22 16 32 16 Z"
            fill="#22C55E"
            stroke="#15803D"
            strokeWidth="1.5"
          />
          <path d="M 26 34 L 30 38 L 38 28" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    default:
      return null;
  }
}

// ============================================================================
// GAME 1: VISUAL MATCHING GAME DATA (FOOD PICTURE <-> SUPERPOWER PICTURE)
// ============================================================================

interface MatchCard {
  id: string;
  pairKey: string;
  type: "food" | "power";
  title: string;
  drawingId: string;
  badge: string;
  oneLiner: string;
}

const MATCH_CARDS_POOL: MatchCard[] = [
  // Pair 1: Glycogen Sprint Engine
  {
    id: "f-oats-banana",
    pairKey: "glycogen",
    type: "food",
    title: "Rolled Oats & Banana",
    drawingId: "banana",
    badge: "Fast Complex Carbs",
    oneLiner: "Tops off muscle glycogen 2 hours before kickoff without stomach cramps.",
  },
  {
    id: "p-glycogen",
    pairKey: "glycogen",
    type: "power",
    title: "Sprint Glycogen Engine",
    drawingId: "glycogen_lightning",
    badge: "Muscular Stamina",
    oneLiner: "Fuel burns directly in sprinting muscles to prevent the 60-minute wall.",
  },

  // Pair 2: Iron Blood Oxygen
  {
    id: "f-spinach-citrus",
    pairKey: "iron",
    type: "food",
    title: "Baby Spinach & Orange",
    drawingId: "orange_citrus",
    badge: "Iron + Vitamin C",
    oneLiner: "Vitamin C triples non-heme iron absorption in your gut.",
  },
  {
    id: "p-iron",
    pairKey: "iron",
    type: "power",
    title: "300% Blood Oxygenation",
    drawingId: "iron_blood",
    badge: "Hemoglobin VO2 Max",
    oneLiner: "Restores red blood cells lost to menstrual cycles, fighting sports fatigue.",
  },

  // Pair 3: Estrogen & Bone Shield
  {
    id: "f-salmon-avocado",
    pairKey: "bone_shield",
    type: "food",
    title: "Wild Salmon & Avocado",
    drawingId: "wild_salmon",
    badge: "Omega-3 & Sterol Fats",
    oneLiner: "Supplies building blocks for reproductive hormones and soothing anti-inflammatory resolving lipids.",
  },
  {
    id: "p-bone_shield",
    pairKey: "bone_shield",
    type: "power",
    title: "Estrogen & Bone Shield",
    drawingId: "estrogen_bone",
    badge: "Protects Peak Bone Density",
    oneLiner: "Maintains ovulatory estrogen, guarding your skeleton against stress fractures.",
  },

  // Pair 4: 45-Min Recovery Window
  {
    id: "f-yogurt-berries",
    pairKey: "recovery",
    type: "food",
    title: "Greek Yogurt & Wild Berries",
    drawingId: "greek_yogurt",
    badge: "3:1 Carb & Leucine",
    oneLiner: "Targets active glycogen synthase within the golden 45-minute post-practice window.",
  },
  {
    id: "p-recovery",
    pairKey: "recovery",
    type: "power",
    title: "45-Min Recovery Window",
    drawingId: "muscle_repair",
    badge: "Rapid Cellular Repair",
    oneLiner: "Shuts down catabolic cortisol and kickstarts protein synthesis.",
  },
];

// ============================================================================
// GAME 2: 3:1 RECOVERY MIXER / SHAKER BUILDER FOODS
// ============================================================================

interface MixerFoodItem {
  id: string;
  name: string;
  drawingId: string;
  type: "carb" | "protein" | "color" | "hazard";
  typeLabel: string;
  carbPoints: number;
  proteinPoints: number;
  feedback: string;
}

const MIXER_PANTRY_ITEMS: MixerFoodItem[] = [
  {
    id: "m-banana",
    name: "Sliced Banana",
    drawingId: "banana",
    type: "carb",
    typeLabel: "+2 Carbs (Glycogen)",
    carbPoints: 2,
    proteinPoints: 0,
    feedback: "Easily digestible potassium & simple starches for rapid glycogen replenishment!",
  },
  {
    id: "m-oats",
    name: "Steel-Cut Oats",
    drawingId: "rolled_oats",
    type: "carb",
    typeLabel: "+2 Carbs (Sustained)",
    carbPoints: 2,
    proteinPoints: 0,
    feedback: "Complex beta-glucans refill liver reserves and stabilize blood sugar.",
  },
  {
    id: "m-yogurt",
    name: "Greek Yogurt",
    drawingId: "greek_yogurt",
    type: "protein",
    typeLabel: "+2 Protein (Repair)",
    carbPoints: 0,
    proteinPoints: 2,
    feedback: "High in leucine amino acids to shut off muscle breakdown within 45 mins!",
  },
  {
    id: "m-berries",
    name: "Wild Blueberries",
    drawingId: "wild_berries",
    type: "color",
    typeLabel: "+1 Carb (Antioxidants)",
    carbPoints: 1,
    proteinPoints: 0,
    feedback: "Anthocyanins clear post-workout inflammation and reduce soreness!",
  },
  {
    id: "m-eggs",
    name: "Pastured Egg",
    drawingId: "pastured_eggs",
    type: "protein",
    typeLabel: "+1 Protein (Choline)",
    carbPoints: 0,
    proteinPoints: 1,
    feedback: "Choline & complete protein repair micro-tears in muscle fibers.",
  },
  {
    id: "m-donut",
    name: "Glazed Donut",
    drawingId: "donut_hazard",
    type: "hazard",
    typeLabel: "Hazard (High Trans Fat)",
    carbPoints: -1,
    proteinPoints: -1,
    feedback: "Gastric Delay Hazard! High saturated fat delays protein uptake by up to 3 hours.",
  },
  {
    id: "m-soda",
    name: "Sugary Soda",
    drawingId: "soda_hazard",
    type: "hazard",
    typeLabel: "Hazard (Pure Sucrose)",
    carbPoints: -1,
    proteinPoints: 0,
    feedback: "Sugar Crash! Liquid refined sucrose spikes insulin abruptly without any rebuilding amino acids.",
  },
];

// ============================================================================
// GAME 3: RAPID SWIPER / SORTER CHALLENGE ("FUEL OR HAZARD?")
// ============================================================================

interface SorterCardItem {
  id: number;
  title: string;
  drawingId: string;
  subtitle: string;
  isSuperFuel: boolean;
  correctActionLabel: "SUPER FUEL" | "AVOID HAZARD";
  takeaway: string;
}

const SORTER_CARDS: SorterCardItem[] = [
  {
    id: 1,
    title: "Banana & Honey Toast (2h Pre-Game)",
    drawingId: "banana",
    subtitle: "High-octane simple carbs with minimal fat and light roughage.",
    isSuperFuel: true,
    correctActionLabel: "SUPER FUEL",
    takeaway: "Optimal pre-competition primer! Digests fast and tops off sprint glycogen.",
  },
  {
    id: 2,
    title: "Double Bacon Cheeseburger Before Sprints",
    drawingId: "burger_hazard",
    subtitle: "Heavy saturated fats and deep-fried grease right before kickoff.",
    isSuperFuel: false,
    correctActionLabel: "AVOID HAZARD",
    takeaway: "Delayed Gastric Emptying! Causes painful stomach cramps and sluggish legs.",
  },
  {
    id: 3,
    title: "Spinach Salad Paired with Sliced Oranges",
    drawingId: "orange_citrus",
    subtitle: "Non-heme plant iron unlocked by fresh Vitamin C ascorbic acid.",
    isSuperFuel: true,
    correctActionLabel: "SUPER FUEL",
    takeaway: "300% Iron Boost! Prevents athletic fatigue and menstrual sports anemia.",
  },
  {
    id: 4,
    title: "Black Coffee Immediately After Iron-Rich Meal",
    drawingId: "coffee_blocker",
    subtitle: "Drinking tannins and caffeine directly with iron-rich foods.",
    isSuperFuel: false,
    correctActionLabel: "AVOID HAZARD",
    takeaway: "Iron Blocker! Tannins in coffee bind up to 60% of dietary iron before it can absorb.",
  },
  {
    id: 5,
    title: "Greek Yogurt, Tart Cherries & Oats (45m Window)",
    drawingId: "greek_yogurt",
    subtitle: "3:1 ratio of fast carbs to leucine-rich protein post-workout.",
    isSuperFuel: true,
    correctActionLabel: "SUPER FUEL",
    takeaway: "Golden Recovery Window! Replaces glycogen 2x faster and halts cortisol.",
  },
  {
    id: 6,
    title: "Skipping Meals to Stay 'Light and Lean'",
    drawingId: "donut_hazard",
    subtitle: "Intentionally under-fueling during high-volume sports training.",
    isSuperFuel: false,
    correctActionLabel: "AVOID HAZARD",
    takeaway: "RED-S Warning! Low energy halts kisspeptin, pauses menstrual cycles, and weakens bones.",
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function FuelUpNutritionGame({
  topic,
  onComplete,
  onClose,
  isFullScreen = true,
  onToggleFullScreen,
}: FuelUpNutritionGameProps) {
  // Game Navigation State
  const [activeGameTab, setActiveGameTab] = useState<"match" | "mixer" | "sorter">("match");

  // Overall Global Game Scoring
  const [globalScore, setGlobalScore] = useState<number>(0);
  const [completedGames, setCompletedGames] = useState<Set<string>>(new Set());

  // --------------------------------------------------------------------------
  // GAME 1 STATE: SUPERPOWER MATCHER
  // --------------------------------------------------------------------------
  const [selectedMatchCardId, setSelectedMatchCardId] = useState<string | null>(null);
  const [matchedPairKeys, setMatchedPairKeys] = useState<Set<string>>(new Set());
  const [matchShakeId, setMatchShakeId] = useState<string | null>(null);
  const [matchCelebrationMessage, setMatchCelebrationMessage] = useState<string | null>(null);

  // --------------------------------------------------------------------------
  // GAME 2 STATE: 3:1 RECOVERY MIXER
  // --------------------------------------------------------------------------
  const [addedMixerFoodIds, setAddedMixerFoodIds] = useState<string[]>([]);
  const [mixerWarning, setMixerWarning] = useState<string | null>(null);
  const [isMixerCompleted, setIsMixerCompleted] = useState<boolean>(false);

  const totalCarbPoints = useMemo(() => {
    return addedMixerFoodIds.reduce((acc, id) => {
      const item = MIXER_PANTRY_ITEMS.find((f) => f.id === id);
      return acc + (item?.carbPoints || 0);
    }, 0);
  }, [addedMixerFoodIds]);

  const totalProteinPoints = useMemo(() => {
    return addedMixerFoodIds.reduce((acc, id) => {
      const item = MIXER_PANTRY_ITEMS.find((f) => f.id === id);
      return acc + (item?.proteinPoints || 0);
    }, 0);
  }, [addedMixerFoodIds]);

  // Target: At least 3 carbs & at least 1 protein, no negative hazards
  const isOptimalRatio = totalCarbPoints >= 3 && totalProteinPoints >= 1 && totalCarbPoints <= 6 && totalProteinPoints <= 3;

  // --------------------------------------------------------------------------
  // GAME 3 STATE: RAPID FOOD SORTER
  // --------------------------------------------------------------------------
  const [sorterIndex, setSorterIndex] = useState<number>(0);
  const [sorterStreak, setSorterStreak] = useState<number>(0);
  const [sorterFeedback, setSorterFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isSorterFinished, setIsSorterFinished] = useState<boolean>(false);

  // --------------------------------------------------------------------------
  // HANDLERS: GAME 1 MATCHING
  // --------------------------------------------------------------------------
  const handleSelectMatchCard = (card: MatchCard) => {
    if (matchedPairKeys.has(card.pairKey)) return; // already solved

    if (!selectedMatchCardId) {
      setSelectedMatchCardId(card.id);
      return;
    }

    if (selectedMatchCardId === card.id) {
      setSelectedMatchCardId(null);
      return;
    }

    const firstCard = MATCH_CARDS_POOL.find((c) => c.id === selectedMatchCardId);
    if (!firstCard) {
      setSelectedMatchCardId(card.id);
      return;
    }

    // Check if pairing matches
    if (firstCard.pairKey === card.pairKey && firstCard.type !== card.type) {
      // MATCH SUCCESS!
      const nextMatched = new Set(matchedPairKeys);
      nextMatched.add(card.pairKey);
      setMatchedPairKeys(nextMatched);
      setSelectedMatchCardId(null);
      setGlobalScore((s) => s + 100);
      setMatchCelebrationMessage(`Great match! ${card.oneLiner}`);

      if (nextMatched.size === 4) {
        setCompletedGames((prev) => new Set(prev).add("match"));
      }
    } else {
      // WRONG PAIR
      setMatchShakeId(card.id);
      setTimeout(() => {
        setMatchShakeId(null);
        setSelectedMatchCardId(null);
      }, 700);
    }
  };

  const handleResetMatchGame = () => {
    setMatchedPairKeys(new Set());
    setSelectedMatchCardId(null);
    setMatchCelebrationMessage(null);
  };

  // --------------------------------------------------------------------------
  // HANDLERS: GAME 2 RECOVERY MIXER
  // --------------------------------------------------------------------------
  const handleAddMixerFood = (item: MixerFoodItem) => {
    if (item.type === "hazard") {
      setMixerWarning(item.feedback);
      setGlobalScore((s) => Math.max(0, s - 20));
      return;
    }

    setMixerWarning(null);
    if (!addedMixerFoodIds.includes(item.id)) {
      const next = [...addedMixerFoodIds, item.id];
      setAddedMixerFoodIds(next);
      setGlobalScore((s) => s + 50);

      // Check if newly optimal
      const carbs = next.reduce((acc, id) => acc + (MIXER_PANTRY_ITEMS.find((f) => f.id === id)?.carbPoints || 0), 0);
      const protein = next.reduce((acc, id) => acc + (MIXER_PANTRY_ITEMS.find((f) => f.id === id)?.proteinPoints || 0), 0);
      if (carbs >= 3 && protein >= 1) {
        setIsMixerCompleted(true);
        setCompletedGames((prev) => new Set(prev).add("mixer"));
      }
    }
  };

  const handleResetMixer = () => {
    setAddedMixerFoodIds([]);
    setMixerWarning(null);
    setIsMixerCompleted(false);
  };

  // --------------------------------------------------------------------------
  // HANDLERS: GAME 3 SORTER
  // --------------------------------------------------------------------------
  const handleSortAction = (choseSuperFuel: boolean) => {
    const card = SORTER_CARDS[sorterIndex];
    if (!card) return;

    const isCorrect = choseSuperFuel === card.isSuperFuel;
    if (isCorrect) {
      const bonus = 50 + sorterStreak * 10;
      setGlobalScore((s) => s + bonus);
      setSorterStreak((st) => st + 1);
      setSorterFeedback({ isCorrect: true, text: card.takeaway });
    } else {
      setSorterStreak(0);
      setSorterFeedback({ isCorrect: false, text: card.takeaway });
    }
  };

  const handleNextSorterCard = () => {
    setSorterFeedback(null);
    if (sorterIndex < SORTER_CARDS.length - 1) {
      setSorterIndex((i) => i + 1);
    } else {
      setIsSorterFinished(true);
      setCompletedGames((prev) => new Set(prev).add("sorter"));
    }
  };

  const handleResetSorter = () => {
    setSorterIndex(0);
    setSorterStreak(0);
    setSorterFeedback(null);
    setIsSorterFinished(false);
  };

  // Victory Status
  const allGamesDone = completedGames.size >= 2 || (matchedPairKeys.size === 4 && isMixerCompleted);

  return (
    <div
      className={
        isFullScreen
          ? "w-full h-full min-h-0 overflow-y-auto p-2 sm:p-4 md:p-6 flex flex-col items-center justify-start bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          : "w-full h-full min-h-0 flex flex-col justify-between overflow-y-auto p-2 sm:p-4 bg-slate-50"
      }
    >
      <div
        className={
          isFullScreen
            ? "max-w-5xl w-full bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border-4 border-coral/30 space-y-4 sm:space-y-6 my-auto"
            : "max-w-4xl w-full bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-slate-200 space-y-4 mx-auto"
        }
      >
        {/* ================================================================= */}
        {/* HEADER BAR: BADGES, HUD, SOUND & CONTROLS                        */}
        {/* ================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-deep-teal/10 pb-3 pr-8 sm:pr-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-deep-teal text-white text-xs font-bold uppercase tracking-wider font-sans shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-coral" />
              Interactive Nutrition Arcade
            </span>
            <span className="text-xs font-bold text-coral uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-50 border border-coral/25 font-sans">
              +{topic?.xp || 75} XP
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Score & Streak HUD */}
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold font-sans">
              <span className="text-deep-teal flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                Score: {globalScore}
              </span>
              {completedGames.size > 0 && (
                <span className="text-emerald-700 flex items-center gap-1 pl-2 border-l border-slate-300">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {completedGames.size}/3 Games
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

        {/* ================================================================= */}
        {/* GAME TABS: 3 VISUAL MINI-GAMES                                    */}
        {/* ================================================================= */}
        <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-slate-100 border border-slate-200 font-sans">
          <button
            type="button"
            onClick={() => setActiveGameTab("match")}
            className={`py-2 sm:py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
              activeGameTab === "match"
                ? "bg-white text-deep-teal shadow-sm border border-slate-200"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5">
              <SuperpowerDrawing id="glycogen_lightning" />
            </div>
            <span>1. Match Pairs</span>
            {completedGames.has("match") && <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-1" />}
          </button>

          <button
            type="button"
            onClick={() => setActiveGameTab("mixer")}
            className={`py-2 sm:py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
              activeGameTab === "mixer"
                ? "bg-white text-deep-teal shadow-sm border border-slate-200"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5">
              <FoodDrawing id="greek_yogurt" />
            </div>
            <span>2. 3:1 Recovery Lab</span>
            {completedGames.has("mixer") && <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-1" />}
          </button>

          <button
            type="button"
            onClick={() => setActiveGameTab("sorter")}
            className={`py-2 sm:py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
              activeGameTab === "sorter"
                ? "bg-white text-deep-teal shadow-sm border border-slate-200"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            <div className="w-4 h-4 sm:w-5 sm:h-5">
              <FoodDrawing id="orange_citrus" />
            </div>
            <span>3. Fuel or Hazard?</span>
            {completedGames.has("sorter") && <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-1" />}
          </button>
        </div>

        {/* ================================================================= */}
        {/* GAME 1: VISUAL MATCHING GAME                                      */}
        {/* ================================================================= */}
        {activeGameTab === "match" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-deep-teal m-0">
                  Superpower Matcher
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/75 font-sans m-0">
                  Tap a <strong>Food Drawing</strong>, then tap its matching <strong>Athletic Superpower</strong>!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-sans bg-amber-50 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
                  {matchedPairKeys.size} of 4 Pairs Matched
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetMatchGame}
                  className="text-xs h-8 rounded-xl border-slate-300"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
                </Button>
              </div>
            </div>

            {/* Match Toast Message */}
            {matchCelebrationMessage && (
              <div className="p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 flex items-center gap-2 text-xs sm:text-sm font-sans animate-in zoom-in-95">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-semibold">{matchCelebrationMessage}</span>
              </div>
            )}

            {/* Cards Grid: 2 columns (Foods on Left, Superpowers on Right) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Left Column: Food Drawings */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60 block font-sans">
                  Nutrient-Dense Foods
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {MATCH_CARDS_POOL.filter((c) => c.type === "food").map((card) => {
                    const isMatched = matchedPairKeys.has(card.pairKey);
                    const isSelected = selectedMatchCardId === card.id;
                    const isShaking = matchShakeId === card.id;

                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => handleSelectMatchCard(card)}
                        disabled={isMatched}
                        className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer relative group ${
                          isMatched
                            ? "bg-emerald-50 border-emerald-400 opacity-60 scale-95"
                            : isSelected
                            ? "bg-amber-50 border-amber-500 ring-4 ring-amber-300 scale-105 shadow-lg"
                            : isShaking
                            ? "bg-rose-50 border-rose-400 animate-wiggle"
                            : "bg-white hover:bg-slate-50 border-slate-200 hover:border-deep-teal/40 shadow-xs hover:scale-102"
                        }`}
                      >
                        {/* Big Drawing */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-2 transition-transform group-hover:scale-110">
                          <FoodDrawing id={card.drawingId} />
                        </div>
                        <span className="text-xs sm:text-sm font-serif font-bold text-deep-teal leading-tight block">
                          {card.title}
                        </span>
                        <span className="text-[10.5px] font-bold text-charcoal/60 uppercase tracking-wider mt-1 block">
                          {card.badge}
                        </span>

                        {isMatched && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Athletic Superpowers */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60 block font-sans">
                  Athletic Superpowers
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {MATCH_CARDS_POOL.filter((c) => c.type === "power").map((card) => {
                    const isMatched = matchedPairKeys.has(card.pairKey);
                    const isSelected = selectedMatchCardId === card.id;
                    const isShaking = matchShakeId === card.id;

                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => handleSelectMatchCard(card)}
                        disabled={isMatched}
                        className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer relative group ${
                          isMatched
                            ? "bg-emerald-50 border-emerald-400 opacity-60 scale-95"
                            : isSelected
                            ? "bg-amber-50 border-amber-500 ring-4 ring-amber-300 scale-105 shadow-lg"
                            : isShaking
                            ? "bg-rose-50 border-rose-400 animate-wiggle"
                            : "bg-white hover:bg-slate-50 border-slate-200 hover:border-deep-teal/40 shadow-xs hover:scale-102"
                        }`}
                      >
                        {/* Big Drawing */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-2 transition-transform group-hover:scale-110">
                          <SuperpowerDrawing id={card.drawingId} />
                        </div>
                        <span className="text-xs sm:text-sm font-serif font-bold text-deep-teal leading-tight block">
                          {card.title}
                        </span>
                        <span className="text-[10.5px] font-bold text-coral uppercase tracking-wider mt-1 block">
                          {card.badge}
                        </span>

                        {isMatched && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Completed All Pairs Banner */}
            {matchedPairKeys.size === 4 && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border-2 border-emerald-300 flex flex-wrap items-center justify-between gap-3 animate-in zoom-in-95">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-deep-teal m-0">
                      Superpower Matcher Mastered! (+400 PTS)
                    </h4>
                    <p className="text-xs text-charcoal/80 font-sans m-0">
                      You paired all nutrition superpowers with zero walls of text!
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setActiveGameTab("mixer")}
                  className="bg-deep-teal hover:bg-deep-teal/90 text-white font-bold text-xs rounded-xl px-4 py-2"
                >
                  <span>Play Next: 3:1 Recovery Lab</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* GAME 2: 3:1 RECOVERY SHAKE & BOWL BUILDER                          */}
        {/* ================================================================= */}
        {activeGameTab === "mixer" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-deep-teal m-0">
                  The 45-Minute Recovery Mixer
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/75 font-sans m-0">
                  Tap foods into your recovery shaker to hit the <strong>3:1 Carb-to-Protein Ratio</strong>!
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleResetMixer}
                className="text-xs h-8 rounded-xl border-slate-300"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Empty Shaker
              </Button>
            </div>

            {/* Warning Alert if Hazard is clicked */}
            {mixerWarning && (
              <div className="p-3 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 flex items-center gap-2 text-xs sm:text-sm font-sans animate-in shake">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span className="font-semibold">{mixerWarning}</span>
              </div>
            )}

            {/* Center Visual Arena: Interactive Shaker & Live Ratio Barometer */}
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-slate-50 to-slate-100 border-2 border-slate-200 text-center space-y-4">
              {/* Dynamic Ratio Barometer */}
              <div className="max-w-md mx-auto space-y-2">
                <div className="flex items-center justify-between text-xs font-bold font-sans">
                  <span className="text-amber-800 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    Carb Fuel: {totalCarbPoints} pts (Need 3+)
                  </span>
                  <span className="text-deep-teal flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-deep-teal" />
                    Protein Repair: {totalProteinPoints} pts (Need 1+)
                  </span>
                </div>

                {/* Visual Ratio Progress Gauge */}
                <div className="h-5 w-full rounded-full bg-slate-200 overflow-hidden flex border border-slate-300 shadow-inner">
                  <div
                    className="bg-amber-400 transition-all duration-300 flex items-center justify-center text-[10px] font-black text-amber-950"
                    style={{ width: `${Math.min(75, totalCarbPoints * 18)}%` }}
                  >
                    {totalCarbPoints > 0 ? "CARBS" : ""}
                  </div>
                  <div
                    className="bg-deep-teal transition-all duration-300 flex items-center justify-center text-[10px] font-black text-white"
                    style={{ width: `${Math.min(35, totalProteinPoints * 25)}%` }}
                  >
                    {totalProteinPoints > 0 ? "PRO" : ""}
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-charcoal/70 font-sans">
                  {isOptimalRatio ? (
                    <span className="text-emerald-700 font-bold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      GOLDEN RATIO REACHED! Glycogen synthesis accelerated 2x!
                    </span>
                  ) : (
                    "Add Carbs (Banana, Oats, Berries) and Protein (Greek Yogurt, Egg) to reach the 3:1 Target."
                  )}
                </div>
              </div>

              {/* Shaker Interior Display (Added Foods) */}
              <div className="min-h-24 p-3 rounded-2xl bg-white border-2 border-dashed border-slate-300 flex flex-wrap items-center justify-center gap-3">
                {addedMixerFoodIds.length === 0 ? (
                  <div className="text-slate-400 text-xs font-semibold py-2">
                    Shaker is empty. Tap nutrient-dense foods below to add them.
                  </div>
                ) : (
                  addedMixerFoodIds.map((foodId) => {
                    const item = MIXER_PANTRY_ITEMS.find((f) => f.id === foodId);
                    if (!item) return null;
                    return (
                      <div
                        key={item.id}
                        className="p-2 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2 shadow-xs animate-in zoom-in-75"
                      >
                        <div className="w-8 h-8">
                          <FoodDrawing id={item.drawingId} />
                        </div>
                        <span className="text-xs font-bold text-deep-teal font-serif">{item.name}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Pantry Shelf of Foods with Big Drawings */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60 block font-sans mb-2">
                Pantry Foods (Tap to Add)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                {MIXER_PANTRY_ITEMS.map((item) => {
                  const isAdded = addedMixerFoodIds.includes(item.id);
                  const isHazard = item.type === "hazard";

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleAddMixerFood(item)}
                      className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer group ${
                        isHazard
                          ? "bg-rose-50/70 border-rose-200 hover:border-rose-400 hover:scale-105"
                          : isAdded
                          ? "bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300"
                          : "bg-white hover:bg-slate-50 border-slate-200 hover:border-deep-teal/40 hover:scale-105 shadow-xs"
                      }`}
                    >
                      <div className="w-12 h-12 mb-1.5 transition-transform group-hover:scale-110">
                        <FoodDrawing id={item.drawingId} />
                      </div>
                      <span className="text-xs font-bold font-serif text-deep-teal leading-tight block">
                        {item.name}
                      </span>
                      <span
                        className={`text-[9.5px] font-bold uppercase tracking-wider mt-1 block ${
                          isHazard ? "text-rose-700" : "text-charcoal/60"
                        }`}
                      >
                        {item.typeLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Goal Achieved Banner */}
            {isOptimalRatio && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border-2 border-emerald-300 flex flex-wrap items-center justify-between gap-3 animate-in zoom-in-95">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-deep-teal m-0">
                      Golden 3:1 Recovery Fuel Unlocked! (+200 PTS)
                    </h4>
                    <p className="text-xs text-charcoal/80 font-sans m-0">
                      Your muscle glycogen replenishes 2x faster, protecting your hormones and energy!
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setActiveGameTab("sorter")}
                  className="bg-deep-teal hover:bg-deep-teal/90 text-white font-bold text-xs rounded-xl px-4 py-2"
                >
                  <span>Play Next: Fuel or Hazard?</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* GAME 3: RAPID FOOD SORTER ("FUEL OR HAZARD?")                     */}
        {/* ================================================================= */}
        {activeGameTab === "sorter" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-deep-teal m-0">
                  Fuel or Hazard? Rapid Sorter
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/75 font-sans m-0">
                  Inspect each athletic meal drawing and classify it as <strong>Super Fuel</strong> or <strong>Hazard</strong>!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-sans bg-amber-50 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
                  Card {sorterIndex + 1} of {SORTER_CARDS.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetSorter}
                  className="text-xs h-8 rounded-xl border-slate-300"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> Restart
                </Button>
              </div>
            </div>

            {/* Active Card Visual Arena */}
            {!isSorterFinished ? (
              (() => {
                const card = SORTER_CARDS[sorterIndex];
                const hasAnswered = sorterFeedback !== null;

                return (
                  <div className="max-w-lg mx-auto p-5 sm:p-8 rounded-3xl bg-slate-50 border-2 border-slate-200 text-center space-y-5 shadow-md">
                    {/* Big Drawing */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto drop-shadow-md transition-transform hover:scale-105">
                      <FoodDrawing id={card.drawingId} />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-lg sm:text-xl font-serif font-bold text-deep-teal m-0">
                        {card.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-charcoal/75 font-sans m-0">
                        {card.subtitle}
                      </p>
                    </div>

                    {/* Action Buttons: SUPER FUEL vs HAZARD */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => handleSortAction(true)}
                        disabled={hasAnswered}
                        className={`py-3.5 px-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 border-2 cursor-pointer shadow-sm ${
                          hasAnswered
                            ? card.isSuperFuel
                              ? "bg-emerald-600 text-white border-emerald-600 ring-4 ring-emerald-300"
                              : "bg-slate-100 text-slate-400 border-slate-200 opacity-40"
                            : "bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-emerald-300 hover:scale-105"
                        }`}
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>SUPER FUEL</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSortAction(false)}
                        disabled={hasAnswered}
                        className={`py-3.5 px-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 border-2 cursor-pointer shadow-sm ${
                          hasAnswered
                            ? !card.isSuperFuel
                              ? "bg-emerald-600 text-white border-emerald-600 ring-4 ring-emerald-300"
                              : "bg-slate-100 text-slate-400 border-slate-200 opacity-40"
                            : "bg-rose-50 hover:bg-rose-100 text-rose-950 border-rose-300 hover:scale-105"
                        }`}
                      >
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span>AVOID HAZARD</span>
                      </button>
                    </div>

                    {/* Feedback Drawer */}
                    {hasAnswered && (
                      <div
                        className={`p-4 rounded-2xl border-2 space-y-2 animate-in fade-in duration-200 text-left ${
                          sorterFeedback.isCorrect
                            ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                            : "bg-rose-50 border-rose-300 text-rose-950"
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-sm">
                          {sorterFeedback.isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-700" />
                          )}
                          <span>{sorterFeedback.isCorrect ? "Correct Diagnosis!" : "Clinical Warning!"}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-charcoal/90 leading-relaxed m-0 font-sans">
                          {sorterFeedback.text}
                        </p>

                        <div className="flex justify-end pt-1">
                          <Button
                            onClick={handleNextSorterCard}
                            className="px-5 py-2 rounded-xl font-bold text-xs bg-deep-teal text-white hover:bg-deep-teal/90 shadow-sm flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>
                              {sorterIndex < SORTER_CARDS.length - 1 ? "Next Card" : "See Final Victory"}
                            </span>
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border-2 border-emerald-300 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <Trophy className="w-8 h-8 text-amber-300" />
                </div>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-deep-teal m-0">
                  Rapid Sorter Completed!
                </h4>
                <p className="text-xs sm:text-sm text-charcoal/80 font-sans max-w-md mx-auto m-0">
                  You conquered all 6 athletic fuel diagnostics with clean visual decisions.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* FINAL VICTORY & REWARD MODAL                                      */}
        {/* ================================================================= */}
        {allGamesDone && (
          <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-teal-900 to-deep-teal text-white text-center space-y-4 shadow-xl border-2 border-amber-300/40 animate-in zoom-in-95">
            <div className="flex items-center justify-center gap-1">
              <Star className="w-6 h-6 text-amber-300 fill-amber-300 animate-pulse" />
              <Star className="w-8 h-8 text-amber-300 fill-amber-300 animate-pulse" />
              <Star className="w-6 h-6 text-amber-300 fill-amber-300 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white m-0">
                Sports Nutrition Champion!
              </h3>
              <p className="text-xs sm:text-sm text-white/85 font-sans max-w-lg mx-auto m-0">
                You mastered the Superpower Matcher, built the 3:1 Recovery Fuel, and sorted the athletic fuels like a sports nutrition pro!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                onClick={onComplete}
                className="px-8 py-3.5 rounded-2xl font-bold text-base bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg flex items-center gap-2 cursor-pointer hover:scale-105 transition-all"
              >
                <Award className="w-5 h-5 text-deep-teal" />
                <span>Claim +{topic?.xp || 75} XP & Complete</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
