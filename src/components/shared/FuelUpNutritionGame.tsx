"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  Trophy,
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
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Flame,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
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
// VECTOR SVG DRAWINGS & ILLUSTRATIONS (PURE SVG - RICH, VIBRANT, PICTURE-FIRST)
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
          <circle cx="28" cy="30" r="1.2" fill="#92400E" />
          <circle cx="36" cy="22" r="1.2" fill="#92400E" />
          <circle cx="42" cy="18" r="1" fill="#92400E" />
        </svg>
      );

    case "rolled_oats":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          {/* Bowl */}
          <path d="M 12 30 C 12 48 20 54 32 54 C 44 54 52 48 52 30 Z" fill="#0D9488" stroke="#115E59" strokeWidth="1.5" />
          <ellipse cx="32" cy="30" rx="20" ry="8" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Oats Grains */}
          <ellipse cx="26" cy="29" rx="4" ry="2" transform="rotate(-20 26 29)" fill="#CA8A04" />
          <ellipse cx="35" cy="29" rx="4" ry="2" transform="rotate(30 35 29)" fill="#B45309" />
          <ellipse cx="30" cy="32" rx="3.5" ry="1.5" fill="#A16207" />
          <ellipse cx="40" cy="31" rx="3" ry="1.5" transform="rotate(-15 40 31)" fill="#CA8A04" />
          {/* Steam curves */}
          <path d="M 26 18 Q 24 14 26 10" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 32 16 Q 34 12 32 8" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 38 18 Q 36 14 38 10" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "orange_citrus":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="34" r="22" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
          <circle cx="32" cy="34" r="18" fill="#FED7AA" />
          <circle cx="32" cy="34" r="16" fill="#FB923C" />
          {/* Citrus Segments */}
          <path d="M 32 18 L 32 50" stroke="#FFF7ED" strokeWidth="1.5" />
          <path d="M 16 34 L 48 34" stroke="#FFF7ED" strokeWidth="1.5" />
          <path d="M 21 23 L 43 45" stroke="#FFF7ED" strokeWidth="1.5" />
          <path d="M 21 45 L 43 23" stroke="#FFF7ED" strokeWidth="1.5" />
          <circle cx="32" cy="34" r="3" fill="#FFF7ED" />
          {/* Fresh Stem & Leaf */}
          <path d="M 32 12 Q 36 8 40 8" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="41" cy="9" rx="4" ry="2" transform="rotate(20 41 9)" fill="#22C55E" />
          {/* Droplet */}
          <circle cx="46" cy="40" r="2" fill="#38BDF8" />
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
          {/* Salmon Steak */}
          <path
            d="M 12 34 C 18 22 36 20 48 24 C 54 26 54 36 48 42 C 34 46 20 44 12 34 Z"
            fill="#F43F5E"
            stroke="#BE123C"
            strokeWidth="1.5"
          />
          {/* Omega-3 White Fat Marbling */}
          <path d="M 22 26 C 26 31 28 39 28 42" stroke="#FFE4E6" strokeWidth="2" strokeLinecap="round" />
          <path d="M 31 25 C 35 31 37 38 37 42" stroke="#FFE4E6" strokeWidth="2" strokeLinecap="round" />
          <path d="M 40 26 C 43 31 44 38 45 41" stroke="#FFE4E6" strokeWidth="2" strokeLinecap="round" />
          {/* Lemon Wedge */}
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
          {/* Glass cup */}
          <path d="M 16 26 L 48 26 L 44 52 L 20 52 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" opacity="0.8" />
          <ellipse cx="32" cy="26" rx="16" ry="6" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1.5" />
          {/* Swirl of creamy yogurt */}
          <path
            d="M 26 26 C 26 21 38 19 36 26 C 34 29 28 29 26 26 Z"
            fill="#FFFFFF"
            stroke="#BAE6FD"
            strokeWidth="1.5"
          />
          {/* Blueberries & honey on top */}
          <circle cx="35" cy="23" r="2.5" fill="#312E81" />
          <circle cx="30" cy="22" r="2" fill="#1E1B4B" />
          <circle cx="27" cy="25" r="1.5" fill="#312E81" />
          {/* Spoon */}
          <path d="M 44 14 L 38 28" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case "wild_berries":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 32 14 C 40 12 46 16 46 24 C 38 24 34 20 32 14 Z" fill="#16A34A" />
          <circle cx="24" cy="30" r="10" fill="#1E3A8A" stroke="#172554" strokeWidth="1.5" />
          <circle cx="22" cy="27" r="2.5" fill="#60A5FA" opacity="0.6" />
          <circle cx="40" cy="28" r="9.5" fill="#4C1D95" stroke="#2E1065" strokeWidth="1.5" />
          <circle cx="38" cy="25" r="2.5" fill="#A78BFA" opacity="0.6" />
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
            stroke="#CBD5E1"
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

    case "chocolate_milk":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          {/* Glass */}
          <path d="M 20 18 L 44 18 L 40 52 L 24 52 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          {/* Cocoa Milk Fluid */}
          <path d="M 21 22 L 43 22 L 39 51 L 25 51 Z" fill="#78350F" />
          {/* Cream swirl */}
          <path d="M 26 30 Q 32 36 38 32" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
          <path d="M 28 40 Q 34 44 37 40" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
          {/* Straw */}
          <line x1="36" y1="8" x2="30" y2="44" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <line x1="36" y1="8" x2="42" y2="12" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          {/* 3:1 badge */}
          <circle cx="48" cy="44" r="9" fill="#10B981" />
          <text x="48" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
            3:1
          </text>
        </svg>
      );

    case "watermelon_electrolytes":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          {/* Green Rind */}
          <path d="M 12 40 A 24 24 0 0 0 52 40 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.5" />
          <path d="M 15 40 A 21 21 0 0 0 49 40 Z" fill="#86EFAC" />
          {/* Pink/Red Flesh */}
          <path d="M 18 40 A 18 18 0 0 0 46 40 Z" fill="#F43F5E" />
          {/* Seeds */}
          <circle cx="26" cy="44" r="1.5" fill="#1E293B" />
          <circle cx="32" cy="47" r="1.5" fill="#1E293B" />
          <circle cx="38" cy="44" r="1.5" fill="#1E293B" />
          {/* Hydration droplets */}
          <circle cx="32" cy="18" r="3" fill="#38BDF8" />
          <path d="M 32 12 L 32 18" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "energy_gel":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <polygon points="24,18 40,18 44,52 20,52" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
          <polygon points="28,12 36,12 38,18 26,18" fill="#D97706" />
          <path d="M 34 24 L 28 34 L 33 34 L 30 44 L 38 32 L 33 32 Z" fill="#FFFFFF" />
          <text x="32" y="50" textAnchor="middle" fill="#78350F" fontSize="6" fontWeight="bold" fontFamily="sans-serif">
            FAST CARB
          </text>
        </svg>
      );

    case "burger_hazard":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 16 26 C 16 16 48 16 48 26 Z" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="24" cy="21" r="1" fill="#FEF3C7" />
          <circle cx="32" cy="19" r="1" fill="#FEF3C7" />
          <circle cx="40" cy="21" r="1" fill="#FEF3C7" />
          <path d="M 14 28 L 50 28 L 46 33 L 36 30 L 26 34 L 18 29 Z" fill="#FACC15" />
          <rect x="14" y="32" width="36" height="8" rx="4" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
          <rect x="16" y="42" width="32" height="7" rx="3.5" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
          {/* Red Hazard Stripe */}
          <line x1="12" y1="12" x2="52" y2="52" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case "donut_hazard":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="32" r="20" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="19" fill="#F43F5E" />
          <circle cx="32" cy="32" r="8" fill="#F8FAFC" stroke="#B45309" strokeWidth="1.5" />
          <line x1="24" y1="20" x2="27" y2="21" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
          <line x1="38" y1="22" x2="40" y2="24" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="34" x2="22" y2="36" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" />
          <line x1="42" y1="36" x2="44" y2="34" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="12" x2="52" y2="52" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case "soda_hazard":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <rect x="22" y="16" width="20" height="36" rx="4" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
          <ellipse cx="32" cy="16" rx="10" ry="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
          <path d="M 24 28 C 30 36 34 26 40 34" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="12" x2="52" y2="52" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case "coffee_blocker":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 16 22 L 44 22 L 40 48 C 40 52 20 52 20 48 Z" fill="#451A03" stroke="#290E02" strokeWidth="1.5" />
          <path d="M 42 26 C 50 26 50 40 40 42" stroke="#290E02" strokeWidth="3" fill="none" />
          <path d="M 24 16 Q 22 12 24 8" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 32 15 Q 30 11 32 7" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="12" x2="52" y2="52" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
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
// SUPERPOWER VECTOR GRAPHICS (PHYSIOLOGY & BODY SUPERPOWERS)
// ============================================================================

export function SuperpowerDrawing({ id, className = "w-full h-full" }: { id: string; className?: string }) {
  switch (id) {
    case "glycogen_lightning":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="32" r="26" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
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
          {/* Red Blood Cells */}
          <circle cx="24" cy="28" r="10" fill="#EF4444" />
          <circle cx="24" cy="28" r="5" fill="#DC2626" />
          <circle cx="40" cy="34" r="12" fill="#DC2626" />
          <circle cx="40" cy="34" r="6" fill="#B91C1C" />
          {/* Oxygen Sparkle */}
          <path d="M 32 12 L 34 16 L 38 18 L 34 20 L 32 24 L 30 20 L 26 18 L 30 16 Z" fill="#F87171" />
        </svg>
      );

    case "muscle_repair":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="32" r="26" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
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
// ATHLETE CATCHER ILLUSTRATION (ATHLETE HOLDING PREGAME GOLDEN BOWL)
// ============================================================================

export function AthleteCatcherDrawing({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 110" fill="none" className={className}>
      <defs>
        <linearGradient id="goldenBowlGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <radialGradient id="bowlInteriorGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3" />
        </radialGradient>
      </defs>

      {/* Layer 1: Solid Back Hair Silhouette (Rounded dome, sleek straight fall) */}
      <path
        d="M 34 22 A 16 12 0 0 1 66 22 C 72 32, 74 46, 72 66 C 67 68, 59 69, 50 69 C 41 69, 33 68, 28 66 C 26 46, 28 32, 34 22 Z"
        fill="#0B0E14"
      />

      {/* Layer 2: Head Base & Ears */}
      <ellipse cx="50" cy="28" rx="13" ry="14" fill="#523321" />
      <circle cx="37" cy="29" r="2.8" fill="#523321" />
      <circle cx="63" cy="29" r="2.8" fill="#523321" />
      <circle cx="37" cy="30.5" r="0.9" fill="#F59E0B" />
      <circle cx="63" cy="30.5" r="0.9" fill="#F59E0B" />

      {/* Layer 3: Neck & Athletic Jersey */}
      <rect x="46" y="39" width="8" height="6" fill="#3E2517" />
      <path
        d="M 37 44 L 63 44 L 67 68 L 33 68 Z"
        fill="#0D9488"
        stroke="#115E59"
        strokeWidth="1.5"
      />
      {/* Jersey collar & lightning engine */}
      <path d="M 45 44 L 50 50 L 55 44 Z" fill="#F47A6A" />
      <polygon points="51,49 47,55 50,55 48,62 54,54 51,54" fill="#FACC15" />

      {/* Layer 4: Box Braids Strands (Straight shafts with bouncy spiral curls at ends) */}
      <g>
        {/* Left Braids */}
        {/* Inner Left Braid: straight shaft down past cheek, spiral curl at end */}
        <path d="M 40 18 Q 36 34 35 48 L 35 58" stroke="#0B0E14" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M 40 18 Q 36 34 35 48 L 35 58" stroke="#2D3748" strokeWidth="1" fill="none" strokeDasharray="2.5,2" />
        {/* Curly end */}
        <path
          d="M 35 58 C 35 63, 30 66, 32 70 C 34 74, 39 73, 38 69 C 37 66, 33 67, 34 71"
          stroke="#0B0E14"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Outer Left Braid: straight shaft hugging side, spiral curl at end */}
        <path d="M 36 19 Q 31 34 30 48 L 30 58" stroke="#0B0E14" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M 36 19 Q 31 34 30 48 L 30 58" stroke="#2D3748" strokeWidth="1" fill="none" strokeDasharray="2.5,2" />
        {/* Curly end */}
        <path
          d="M 30 58 C 30 63, 25 66, 27 70 C 29 74, 34 73, 33 69 C 32 66, 28 67, 29 71"
          stroke="#0B0E14"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Right Braids */}
        {/* Inner Right Braid: straight shaft down past cheek, spiral curl at end */}
        <path d="M 60 18 Q 64 34 65 48 L 65 58" stroke="#0B0E14" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M 60 18 Q 64 34 65 48 L 65 58" stroke="#2D3748" strokeWidth="1" fill="none" strokeDasharray="2.5,2" />
        {/* Curly end */}
        <path
          d="M 65 58 C 65 63, 70 66, 68 70 C 66 74, 61 73, 62 69 C 63 66, 67 67, 66 71"
          stroke="#0B0E14"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Outer Right Braid: straight shaft hugging side, spiral curl at end */}
        <path d="M 64 19 Q 69 34 70 48 L 70 58" stroke="#0B0E14" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d="M 64 19 Q 69 34 70 48 L 70 58" stroke="#2D3748" strokeWidth="1" fill="none" strokeDasharray="2.5,2" />
        {/* Curly end */}
        <path
          d="M 70 58 C 70 63, 75 66, 73 70 C 71 74, 66 73, 67 69 C 68 66, 72 67, 71 71"
          stroke="#0B0E14"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Gold Braid Cuffs clamped on braids */}
        <rect x="33" y="46" width="3" height="2.5" rx="0.5" fill="#F59E0B" />
        <rect x="64" y="46" width="3" height="2.5" rx="0.5" fill="#F59E0B" />
        <rect x="28.5" y="54" width="3" height="2.5" rx="0.5" fill="#F59E0B" />
        <rect x="68.5" y="54" width="3" height="2.5" rx="0.5" fill="#F59E0B" />
      </g>

      {/* Layer 5: Scalp Dome & Athletic Headband (Rendered OVER braid roots so roots are 100% attached and concealed) */}
      <g>
        {/* Scalp dome top */}
        <path d="M 33 22 A 17 12 0 0 1 67 22 C 64 19, 58 16, 50 16 C 42 16, 36 19, 33 22 Z" fill="#0B0E14" />
        {/* High athletic headband (positioned cleanly above eyebrows at y=15-20.5) */}
        <rect x="33.5" y="15" width="33" height="5.5" rx="2.7" fill="#0D9488" stroke="#115E59" strokeWidth="1" />
        <circle cx="50" cy="17.7" r="1.5" fill="#F59E0B" />
      </g>

      {/* Layer 6: Facial Features (Open forehead, radiant athletic confidence) */}
      {/* Eyebrows (Arched, cleanly positioned at y=23-24) */}
      <path d="M 42 23 Q 45 21.5 48 23" stroke="#1F2937" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 52 23 Q 55 21.5 58 23" stroke="#1F2937" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* Focused, bright eyes at y=27.5 */}
      <circle cx="45" cy="27.5" r="1.6" fill="#1E293B" />
      <circle cx="55" cy="27.5" r="1.6" fill="#1E293B" />
      <circle cx="45.6" cy="26.9" r="0.5" fill="#FFFFFF" />
      <circle cx="55.6" cy="26.9" r="0.5" fill="#FFFFFF" />

      {/* Nose */}
      <path d="M 50 28.5 L 49 31.5 L 51 31.5" stroke="#3E2517" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Confident athletic smile */}
      <path d="M 45 34.5 Q 50 38.5 55 34.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 45 34.5 Q 50 38.5 55 34.5" stroke="#3E2517" strokeWidth="0.8" fill="none" strokeLinecap="round" />

      {/* Layer 8: Muscular Arms holding up the bowl */}
      {/* Left arm */}
      <path
        d="M 36 46 Q 20 54 18 66 Q 20 73 28 73"
        stroke="#523321"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right arm */}
      <path
        d="M 64 46 Q 80 54 82 66 Q 80 73 72 73"
        stroke="#523321"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Wristbands */}
      <rect x="23" y="68" width="6" height="5" rx="2" fill="#F47A6A" transform="rotate(-15 26 70)" />
      <rect x="71" y="68" width="6" height="5" rx="2" fill="#F47A6A" transform="rotate(15 74 70)" />

      {/* Layer 9: Golden Catching Bowl */}
      {/* Outer base and curve */}
      <path
        d="M 12 68 C 14 93 86 93 88 68 Z"
        fill="url(#goldenBowlGrad)"
        stroke="#B45309"
        strokeWidth="2"
      />
      {/* Inner bowl opening ellipse */}
      <ellipse cx="50" cy="68" rx="38" ry="11" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      {/* Glowing food catchment landing zone */}
      <ellipse cx="50" cy="69" rx="30" ry="7" fill="url(#bowlInteriorGlow)" />
      {/* Rim highlight */}
      <path d="M 20 67 Q 50 75 80 67" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

// ============================================================================
// GAME 1 DATA: VISUAL MATCHING CARDS (PICTURE-FIRST, 1-LINE CONCISE)
// ============================================================================

interface MatchCard {
  id: string;
  pairKey: string;
  type: "food" | "power";
  title: string;
  drawingId: string;
  badge: string;
  takeaway: string;
}

const MATCH_CARDS_POOL: MatchCard[] = [
  {
    id: "f-oats-banana",
    pairKey: "glycogen",
    type: "food",
    title: "Oats & Banana",
    drawingId: "banana",
    badge: "Carbs",
    takeaway: "Tops off sprint glycogen 2h before kickoff.",
  },
  {
    id: "p-glycogen",
    pairKey: "glycogen",
    type: "power",
    title: "Sprint Glycogen",
    drawingId: "glycogen_lightning",
    badge: "Stamina",
    takeaway: "Direct muscular energy preventing the 60-min wall.",
  },
  {
    id: "f-spinach-citrus",
    pairKey: "iron",
    type: "food",
    title: "Spinach & Orange",
    drawingId: "orange_citrus",
    badge: "Iron + Vit C",
    takeaway: "Vitamin C triples gut iron absorption.",
  },
  {
    id: "p-iron",
    pairKey: "iron",
    type: "power",
    title: "300% Blood Oxygen",
    drawingId: "iron_blood",
    badge: "Hemoglobin",
    takeaway: "Replaces menstrual iron loss & boosts VO2 stamina.",
  },
  {
    id: "f-salmon-avocado",
    pairKey: "bone_shield",
    type: "food",
    title: "Salmon & Avocado",
    drawingId: "wild_salmon",
    badge: "Healthy Fats",
    takeaway: "Lipids provide the cholesterol building blocks for estrogen.",
  },
  {
    id: "p-bone_shield",
    pairKey: "bone_shield",
    type: "power",
    title: "Estrogen & Bone Shield",
    drawingId: "estrogen_bone",
    badge: "Bone Health",
    takeaway: "Estrogen protects peak bone mass against stress fractures.",
  },
  {
    id: "f-yogurt-berries",
    pairKey: "recovery",
    type: "food",
    title: "Yogurt & Berries",
    drawingId: "greek_yogurt",
    badge: "3:1 Ratio",
    takeaway: "Carbs + leucine protein target the 45-min repair window.",
  },
  {
    id: "p-recovery",
    pairKey: "recovery",
    type: "power",
    title: "45-Min Recovery",
    drawingId: "muscle_repair",
    badge: "Tissue Repair",
    takeaway: "Halts muscle breakdown and doubles reload speed.",
  },
];

// ============================================================================
// GAME 2 DATA: 3:1 RECOVERY BLENDER INGREDIENTS
// ============================================================================

interface MixerFoodItem {
  id: string;
  name: string;
  drawingId: string;
  type: "carb" | "protein" | "combo" | "hazard";
  typeLabel: string;
  carbPoints: number;
  proteinPoints: number;
  color: string;
}

const MIXER_PANTRY_ITEMS: MixerFoodItem[] = [
  {
    id: "m-banana",
    name: "Banana",
    drawingId: "banana",
    type: "carb",
    typeLabel: "+2 Carbs",
    carbPoints: 2,
    proteinPoints: 0,
    color: "#FDE047",
  },
  {
    id: "m-oats",
    name: "Oats",
    drawingId: "rolled_oats",
    type: "carb",
    typeLabel: "+2 Carbs",
    carbPoints: 2,
    proteinPoints: 0,
    color: "#FACC15",
  },
  {
    id: "m-chocmilk",
    name: "Chocolate Milk",
    drawingId: "chocolate_milk",
    type: "combo",
    typeLabel: "+3 Carb, +1 Pro",
    carbPoints: 3,
    proteinPoints: 1,
    color: "#78350F",
  },
  {
    id: "m-yogurt",
    name: "Greek Yogurt",
    drawingId: "greek_yogurt",
    type: "protein",
    typeLabel: "+2 Protein",
    carbPoints: 0,
    proteinPoints: 2,
    color: "#38BDF8",
  },
  {
    id: "m-berries",
    name: "Wild Berries",
    drawingId: "wild_berries",
    type: "carb",
    typeLabel: "+1 Carb",
    carbPoints: 1,
    proteinPoints: 0,
    color: "#8B5CF6",
  },
  {
    id: "m-eggs",
    name: "Egg",
    drawingId: "pastured_eggs",
    type: "protein",
    typeLabel: "+1 Protein",
    carbPoints: 0,
    proteinPoints: 1,
    color: "#F59E0B",
  },
  {
    id: "m-donut",
    name: "Donut",
    drawingId: "donut_hazard",
    type: "hazard",
    typeLabel: "Hazard",
    carbPoints: -1,
    proteinPoints: -1,
    color: "#94A3B8",
  },
  {
    id: "m-soda",
    name: "Soda",
    drawingId: "soda_hazard",
    type: "hazard",
    typeLabel: "Hazard",
    carbPoints: -1,
    proteinPoints: 0,
    color: "#94A3B8",
  },
];

// ============================================================================
// GAME 3 DATA: PREGAME BOWL CATCHER ("CATCH 10 GOOD PREGAME FUELS")
// ============================================================================

export interface CatcherFoodItem {
  id: string;
  name: string;
  drawingId: string;
  isGood: boolean;
  category: string;
  takeaway: string;
}

export interface FallingFoodItem {
  uid: number;
  food: CatcherFoodItem;
  x: number; // percentage across arena width (12% to 88%)
  y: number; // percentage down arena height (-8% to 100%)
  speed: number; // fall rate per tick
}

export const CATCHER_FOOD_ITEMS: CatcherFoodItem[] = [
  // Good pregame fuels (high carb, easily digested, low fat/moderate fiber, hydration)
  {
    id: "banana",
    name: "Ripe Banana",
    drawingId: "banana",
    isGood: true,
    category: "Fast Glycogen",
    takeaway: "Tops off sprint glycogen rapidly with zero stomach cramps!",
  },
  {
    id: "rolled_oats",
    name: "Oatmeal Bowl",
    drawingId: "rolled_oats",
    isGood: true,
    category: "Complex Carbs",
    takeaway: "Provides sustained stamina glucose through the final whistle!",
  },
  {
    id: "sweet_potato",
    name: "Sweet Potato",
    drawingId: "sweet_potato",
    isGood: true,
    category: "Stamina Fuel",
    takeaway: "Smooth, low-GI carb that prevents late-game muscular bonking!",
  },
  {
    id: "energy_gel",
    name: "Energy Gel",
    drawingId: "energy_gel",
    isGood: true,
    category: "Instant Spark",
    takeaway: "Rapid simple carbs ready for instantaneous sprint power!",
  },
  {
    id: "orange_citrus",
    name: "Orange Wheels",
    drawingId: "orange_citrus",
    isGood: true,
    category: "Vitamin C & Carbs",
    takeaway: "Natural fructose plus Vitamin C to support cellular resilience!",
  },
  {
    id: "watermelon_electrolytes",
    name: "Watermelon Slice",
    drawingId: "watermelon_electrolytes",
    isGood: true,
    category: "Electrolyte Hydration",
    takeaway: "Rapid fluid and potassium to actively prevent muscle cramping!",
  },
  {
    id: "wild_berries",
    name: "Wild Berries",
    drawingId: "wild_berries",
    isGood: true,
    category: "Antioxidants",
    takeaway: "Low-acid polyphenol fuel that shields tired muscle cells!",
  },
  {
    id: "chocolate_milk",
    name: "3:1 Fuel Glass",
    drawingId: "chocolate_milk",
    isGood: true,
    category: "Hydrating Fuel",
    takeaway: "Fluid carbohydrate primer that protects muscle tissue integrity!",
  },

  // Bad pregame hazards (heavy grease, high saturated fat, sugar spikes, gut irritants)
  {
    id: "burger_hazard",
    name: "Greasy Burger",
    drawingId: "burger_hazard",
    isGood: false,
    category: "Heavy Grease Hazard",
    takeaway: "30g+ heavy fat delays digestion 3+ hours, stealing blood from legs and triggering severe cramps!",
  },
  {
    id: "donut_hazard",
    name: "Glazed Donut",
    drawingId: "donut_hazard",
    isGood: false,
    category: "Sugar Crash Hazard",
    takeaway: "Fried trans fats and sugar spikes cause reactive hypoglycemia, leaving you sluggish at kickoff!",
  },
  {
    id: "soda_hazard",
    name: "Sugary Soda",
    drawingId: "soda_hazard",
    isGood: false,
    category: "GI Bloating Hazard",
    takeaway: "Carbonation and high-fructose syrup induce painful gut bloating, nausea, and sharp side stitches!",
  },
  {
    id: "coffee_blocker",
    name: "Espresso Mug",
    drawingId: "coffee_blocker",
    isGood: false,
    category: "Stomach Blocker Hazard",
    takeaway: "Acidic caffeine on an anxious stomach provokes GI spasms and blocks essential iron uptake!",
  },
];

// ============================================================================
// GAME 4 DATA: GAME-DAY TIMING CLOCK (EDUCATIONAL TIMELINE MATCH)
// ============================================================================

interface ClockSlot {
  id: string;
  timeLabel: string;
  ruleTitle: string;
  targetCategory: string;
  correctMealId: string;
}

interface ClockMealItem {
  id: string;
  name: string;
  drawingId: string;
  badge: string;
  why: string;
}

const CLOCK_SLOTS: ClockSlot[] = [
  {
    id: "slot-pre",
    timeLabel: "2–4h Pre-Game",
    ruleTitle: "Sustained Glycogen Primer",
    targetCategory: "Complex Carbs",
    correctMealId: "meal-oats-banana",
  },
  {
    id: "slot-topoff",
    timeLabel: "30–45m Pre-Game",
    ruleTitle: "Quick Spark, Zero Fiber",
    targetCategory: "Fast Simple Sugar",
    correctMealId: "meal-energy-gel",
  },
  {
    id: "slot-halftime",
    timeLabel: "Halftime (45m In)",
    ruleTitle: "Hydration & Electrolytes",
    targetCategory: "Rapid Fluid + Sodium",
    correctMealId: "meal-watermelon",
  },
  {
    id: "slot-recovery",
    timeLabel: "0–45m Post-Game",
    ruleTitle: "3:1 Golden Reload",
    targetCategory: "Carbs + Leucine Protein",
    correctMealId: "meal-chocmilk",
  },
];

const CLOCK_MEALS: ClockMealItem[] = [
  {
    id: "meal-oats-banana",
    name: "Oatmeal & Banana",
    drawingId: "rolled_oats",
    badge: "Complex Carbs",
    why: "Digests smoothly over 2–3 hours to fill liver and muscle tanks.",
  },
  {
    id: "meal-energy-gel",
    name: "Fast Fruit / Chews",
    drawingId: "energy_gel",
    badge: "Simple Sugar",
    why: "Immediate bloodstream glucose with zero fiber to prevent GI distress.",
  },
  {
    id: "meal-watermelon",
    name: "Watermelon & Electrolytes",
    drawingId: "watermelon_electrolytes",
    badge: "Fluids + Salts",
    why: "Restores sweat loss, protects blood plasma, and prevents cramping.",
  },
  {
    id: "meal-chocmilk",
    name: "3:1 Recovery Milk / Parfait",
    drawingId: "chocolate_milk",
    badge: "3:1 Ratio",
    why: "Golden ratio stops cortisol and doubles muscle glycogen synthesis.",
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
  // Navigation
  const [activeTab, setActiveTab] = useState<"match" | "mixer" | "sorter" | "clock">("match");
  const [globalScore, setGlobalScore] = useState<number>(0);
  const [completedGames, setCompletedGames] = useState<Set<string>>(new Set());
  const [showSources, setShowSources] = useState<boolean>(false);

  // --------------------------------------------------------------------------
  // GAME 1: MATCHER STATE
  // --------------------------------------------------------------------------
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [matchedKeys, setMatchedKeys] = useState<Set<string>>(new Set());
  const [shakeCardId, setShakeCardId] = useState<string | null>(null);
  const [matchToast, setMatchToast] = useState<string | null>(null);

  const handleCardClick = (card: MatchCard) => {
    if (matchedKeys.has(card.pairKey)) return;

    if (!selectedCardId) {
      setSelectedCardId(card.id);
      return;
    }

    if (selectedCardId === card.id) {
      setSelectedCardId(null);
      return;
    }

    const firstCard = MATCH_CARDS_POOL.find((c) => c.id === selectedCardId);
    if (!firstCard) {
      setSelectedCardId(card.id);
      return;
    }

    if (firstCard.pairKey === card.pairKey && firstCard.type !== card.type) {
      // MATCH!
      const next = new Set(matchedKeys);
      next.add(card.pairKey);
      setMatchedKeys(next);
      setSelectedCardId(null);
      setGlobalScore((s) => s + 100);
      setMatchToast(`Pair Matched! ${card.takeaway}`);

      if (next.size === 4) {
        setCompletedGames((prev) => new Set(prev).add("match"));
      }
    } else {
      // MISMATCH
      setShakeCardId(card.id);
      setTimeout(() => {
        setShakeCardId(null);
        setSelectedCardId(null);
      }, 600);
    }
  };

  const handleResetMatch = () => {
    setMatchedKeys(new Set());
    setSelectedCardId(null);
    setMatchToast(null);
  };

  // --------------------------------------------------------------------------
  // GAME 2: 3:1 RECOVERY BLENDER STATE
  // --------------------------------------------------------------------------
  const [blenderItems, setBlenderItems] = useState<string[]>([]);
  const [blenderHazardWobble, setBlenderHazardWobble] = useState<boolean>(false);
  const [isBlended, setIsBlended] = useState<boolean>(false);

  const totalCarbs = useMemo(() => {
    return blenderItems.reduce((acc, id) => {
      const item = MIXER_PANTRY_ITEMS.find((f) => f.id === id);
      return acc + (item?.carbPoints || 0);
    }, 0);
  }, [blenderItems]);

  const totalProtein = useMemo(() => {
    return blenderItems.reduce((acc, id) => {
      const item = MIXER_PANTRY_ITEMS.find((f) => f.id === id);
      return acc + (item?.proteinPoints || 0);
    }, 0);
  }, [blenderItems]);

  const isGoldRatio = totalCarbs >= 3 && totalProtein >= 1 && totalCarbs <= 6 && totalProtein <= 3;

  const handleAddBlenderFood = (item: MixerFoodItem) => {
    if (item.type === "hazard") {
      setBlenderHazardWobble(true);
      setTimeout(() => setBlenderHazardWobble(false), 800);
      setGlobalScore((s) => Math.max(0, s - 10));
      return;
    }

    if (!blenderItems.includes(item.id)) {
      const next = [...blenderItems, item.id];
      setBlenderItems(next);
      setGlobalScore((s) => s + 25);
    }
  };

  const handleTriggerBlend = () => {
    if (!isGoldRatio) return;
    setIsBlended(true);
    setGlobalScore((s) => s + 150);
    setCompletedGames((prev) => new Set(prev).add("mixer"));
  };

  const handleResetBlender = () => {
    setBlenderItems([]);
    setIsBlended(false);
  };

  // --------------------------------------------------------------------------
  // GAME 3: PREGAME BOWL CATCHER STATE & GAME LOOP
  // --------------------------------------------------------------------------
  const [catcherX, setCatcherX] = useState<number>(50); // percentage 12% to 88%
  const [catcherHearts, setCatcherHearts] = useState<number>(3);
  const [goodFoodsCaught, setGoodFoodsCaught] = useState<number>(0); // 0 to 10
  const [catcherStatus, setCatcherStatus] = useState<"playing" | "game_over" | "victory">("playing");
  const [fallingFoods, setFallingFoods] = useState<FallingFoodItem[]>([]);
  const [catcherToast, setCatcherToast] = useState<{ isGood: boolean; text: string } | null>(null);
  const [isCatchingImpact, setIsCatchingImpact] = useState<boolean>(false);
  const [isDamageShake, setIsDamageShake] = useState<boolean>(false);
  const [isDraggingArena, setIsDraggingArena] = useState<boolean>(false);

  const arenaRef = useRef<HTMLDivElement>(null);
  const nextFallingUidRef = useRef<number>(1);
  const catcherXRef = useRef<number>(catcherX);
  catcherXRef.current = catcherX;
  const catcherHeartsRef = useRef<number>(catcherHearts);
  catcherHeartsRef.current = catcherHearts;
  const goodFoodsCaughtRef = useRef<number>(goodFoodsCaught);
  goodFoodsCaughtRef.current = goodFoodsCaught;
  const catcherStatusRef = useRef<"playing" | "game_over" | "victory">(catcherStatus);
  catcherStatusRef.current = catcherStatus;

  // Reset Catcher (Restart game with 3 hearts and 0/10 good foods)
  const handleResetCatcher = useCallback(() => {
    setCatcherHearts(3);
    catcherHeartsRef.current = 3;
    setGoodFoodsCaught(0);
    goodFoodsCaughtRef.current = 0;
    setCatcherStatus("playing");
    catcherStatusRef.current = "playing";
    setFallingFoods([]);
    setCatcherToast(null);
    setCatcherX(50);
    catcherXRef.current = 50;
    setIsCatchingImpact(false);
    setIsDamageShake(false);
    setIsDraggingArena(false);
  }, []);

  // Update catcher position from direct pointer events on the arena
  const updateCatcherFromPointer = useCallback((clientX: number) => {
    if (catcherStatusRef.current !== "playing" || !arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(12, Math.min(88, pct));
    setCatcherX(Math.round(clamped));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDraggingArena(true);
    updateCatcherFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingArena && e.buttons !== 1) return;
    updateCatcherFromPointer(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDraggingArena(false);
  };

  // Game Loop Tick & Spawner
  useEffect(() => {
    if (activeTab !== "sorter" || catcherStatus !== "playing") {
      return;
    }

    let spawnTimer = 0;

    const interval = setInterval(() => {
      if (catcherStatusRef.current !== "playing") return;

      spawnTimer += 45;

      setFallingFoods((currentFoods) => {
        const updatedFoods = currentFoods.map((item) => ({
          ...item,
          y: item.y + item.speed,
        }));

        const currentX = catcherXRef.current;
        const remainingFoods: FallingFoodItem[] = [];

        for (const item of updatedFoods) {
          // Collision window: y between 68% and 84%, horizontal distance within 13%
          const isHit = item.y >= 68 && item.y <= 84 && Math.abs(item.x - currentX) <= 13;

          if (isHit) {
            if (item.food.isGood) {
              // Good pregame food caught!
              const nextCount = goodFoodsCaughtRef.current + 1;
              goodFoodsCaughtRef.current = nextCount;
              setGoodFoodsCaught(nextCount);
              setGlobalScore((s) => s + 25);
              setCatcherToast({ isGood: true, text: `+1 Good Fuel! ${item.food.name}: ${item.food.takeaway}` });
              setIsCatchingImpact(true);
              setTimeout(() => setIsCatchingImpact(false), 300);

              if (nextCount >= 10) {
                catcherStatusRef.current = "victory";
                setCatcherStatus("victory");
                setCompletedGames((prev) => new Set(prev).add("sorter"));
                setGlobalScore((s) => s + 300);
              }
            } else {
              // Bad pregame hazard caught!
              const nextHearts = Math.max(0, catcherHeartsRef.current - 1);
              catcherHeartsRef.current = nextHearts;
              setCatcherHearts(nextHearts);
              setCatcherToast({ isGood: false, text: `Gut Distress! ${item.food.name}: ${item.food.takeaway}` });
              setIsDamageShake(true);
              setTimeout(() => setIsDamageShake(false), 500);

              if (nextHearts <= 0) {
                catcherStatusRef.current = "game_over";
                setCatcherStatus("game_over");
              }
            }
            // Caught item consumed
            continue;
          }

          // Off bottom of arena screen
          if (item.y > 96) {
            continue;
          }

          remainingFoods.push(item);
        }

        // Spawn a new item if fewer than 3 on screen
        if (spawnTimer >= 1050 && remainingFoods.length < 3 && catcherStatusRef.current === "playing") {
          spawnTimer = 0;
          // ~65% chance good pregame food, ~35% chance hazard
          const isGoodChoice = Math.random() < 0.65;
          const pool = isGoodChoice
            ? CATCHER_FOOD_ITEMS.filter((f) => f.isGood)
            : CATCHER_FOOD_ITEMS.filter((f) => !f.isGood);
          const food = pool[Math.floor(Math.random() * pool.length)];

          const x = Math.floor(Math.random() * 70) + 15;
          const speed = 0.95 + Math.random() * 0.45;

          remainingFoods.push({
            uid: nextFallingUidRef.current++,
            food,
            x,
            y: -8,
            speed,
          });
        }

        return remainingFoods;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [activeTab, catcherStatus]);

  // --------------------------------------------------------------------------
  // GAME 4: TIMING CLOCK STATE
  // --------------------------------------------------------------------------
  const [clockPlacements, setClockPlacements] = useState<Record<string, string>>({});
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [clockSuccessToast, setClockSuccessToast] = useState<string | null>(null);

  const handleSelectClockMeal = (mealId: string) => {
    // If meal already placed, do nothing
    if (Object.values(clockPlacements).includes(mealId)) return;
    setSelectedMealId(mealId);
  };

  const handleSlotClick = (slot: ClockSlot) => {
    if (!selectedMealId) return;

    if (selectedMealId === slot.correctMealId) {
      // Correct placement!
      const next = { ...clockPlacements, [slot.id]: selectedMealId };
      setClockPlacements(next);
      setSelectedMealId(null);
      setGlobalScore((s) => s + 75);
      const meal = CLOCK_MEALS.find((m) => m.id === selectedMealId);
      setClockSuccessToast(`Target Locked! ${meal?.why}`);

      if (Object.keys(next).length === 4) {
        setCompletedGames((prev) => new Set(prev).add("clock"));
      }
    } else {
      // Wrong slot
      setShakeCardId(slot.id);
      setTimeout(() => setShakeCardId(null), 600);
    }
  };

  const handleResetClock = () => {
    setClockPlacements({});
    setSelectedMealId(null);
    setClockSuccessToast(null);
  };

  // Global completion state: any 2 games completed or matcher + mixer
  const isMasterComplete = completedGames.size >= 2;

  return (
    <div
      className={
        isFullScreen
          ? "w-full h-full min-h-0 overflow-y-auto p-2 sm:p-4 md:p-6 flex flex-col items-center justify-start bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
          : "w-full h-full min-h-0 flex flex-col justify-between overflow-y-auto p-2 sm:p-4 bg-slate-50"
      }
    >
      <div
        className={
          isFullScreen
            ? "max-w-5xl w-full bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border-4 border-coral/30 space-y-4 my-auto"
            : "max-w-4xl w-full bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-slate-200 space-y-4 mx-auto"
        }
      >
        {/* ================================================================= */}
        {/* TOP BAR: BADGES, HUD, CONTROLS                                    */}
        {/* ================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-deep-teal/10 pb-3 pr-8 sm:pr-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-deep-teal text-white text-xs font-bold tracking-wide font-sans shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-coral" />
              Athlete Nutrition Arcade
            </span>
            <span className="text-xs font-bold text-coral tracking-wider px-2.5 py-1 rounded-full bg-rose-50 border border-coral/25 font-sans">
              +{topic?.xp || 75} XP
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Score & Badges HUD */}
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold font-sans">
              <span className="text-deep-teal flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                Score: {globalScore}
              </span>
              <span className="text-emerald-700 flex items-center gap-1 pl-2 border-l border-slate-300">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                {completedGames.size}/4 Games Done
              </span>
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
        {/* GAME SELECTION TABS (4 VISUAL GAMES)                              */}
        {/* ================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 font-sans">
          <button
            type="button"
            onClick={() => setActiveTab("match")}
            className={`py-2 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "match"
                ? "bg-white text-deep-teal shadow-sm border border-slate-200"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            <div className="w-5 h-5 shrink-0">
              <SuperpowerDrawing id="glycogen_lightning" />
            </div>
            <span>1. Match Pairs</span>
            {completedGames.has("match") && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("mixer")}
            className={`py-2 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "mixer"
                ? "bg-white text-deep-teal shadow-sm border border-slate-200"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            <div className="w-5 h-5 shrink-0">
              <FoodDrawing id="chocolate_milk" />
            </div>
            <span>2. 3:1 Blender</span>
            {completedGames.has("mixer") && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sorter")}
            className={`py-2 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "sorter"
                ? "bg-white text-deep-teal shadow-sm border border-slate-200"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            <div className="w-5 h-5 shrink-0">
              <AthleteCatcherDrawing className="w-full h-full" />
            </div>
            <span>3. Bowl Catcher</span>
            {completedGames.has("sorter") && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("clock")}
            className={`py-2 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "clock"
                ? "bg-white text-deep-teal shadow-sm border border-slate-200"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <span>4. Game Clock</span>
            {completedGames.has("clock") && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
          </button>
        </div>

        {/* ================================================================= */}
        {/* GAME 1: VISUAL MATCHING GAME                                      */}
        {/* ================================================================= */}
        {activeTab === "match" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs sm:text-sm text-charcoal/80 font-sans font-medium m-0">
                Tap a <strong>Food Picture</strong>, then tap its matching <strong>Body Superpower</strong>!
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetMatch}
                className="text-xs h-7 rounded-xl border-slate-300"
              >
                <RotateCcw className="w-3 h-3 mr-1" /> Reset
              </Button>
            </div>

            {/* Quick Toast */}
            {matchToast && (
              <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center gap-2 text-xs sm:text-sm font-sans animate-in zoom-in-95">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{matchToast}</span>
              </div>
            )}

            {/* Matching Grid: 2 Columns of Large Visual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Foods Column */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-charcoal/50 block font-sans">
                  Nutrient-Dense Foods
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {MATCH_CARDS_POOL.filter((c) => c.type === "food").map((card) => {
                    const isMatched = matchedKeys.has(card.pairKey);
                    const isSelected = selectedCardId === card.id;
                    const isShaking = shakeCardId === card.id;

                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => handleCardClick(card)}
                        disabled={isMatched}
                        className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer relative group ${
                          isMatched
                            ? "bg-emerald-50 border-emerald-400 opacity-60 scale-95"
                            : isSelected
                            ? "bg-amber-50 border-amber-500 ring-4 ring-amber-300 scale-105 shadow-md"
                            : isShaking
                            ? "bg-rose-50 border-rose-400 animate-wiggle"
                            : "bg-white hover:bg-slate-50 border-slate-200 hover:border-deep-teal/40 shadow-xs hover:scale-102"
                        }`}
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-1.5 transition-transform group-hover:scale-110">
                          <FoodDrawing id={card.drawingId} />
                        </div>
                        <span className="text-xs sm:text-sm font-serif font-bold text-deep-teal leading-tight block">
                          {card.title}
                        </span>
                        <span className="text-[10px] font-bold text-charcoal/60 uppercase tracking-wider mt-0.5 block">
                          {card.badge}
                        </span>

                        {isMatched && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Superpowers Column */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-charcoal/50 block font-sans">
                  Athletic Superpowers
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {MATCH_CARDS_POOL.filter((c) => c.type === "power").map((card) => {
                    const isMatched = matchedKeys.has(card.pairKey);
                    const isSelected = selectedCardId === card.id;
                    const isShaking = shakeCardId === card.id;

                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => handleCardClick(card)}
                        disabled={isMatched}
                        className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer relative group ${
                          isMatched
                            ? "bg-emerald-50 border-emerald-400 opacity-60 scale-95"
                            : isSelected
                            ? "bg-amber-50 border-amber-500 ring-4 ring-amber-300 scale-105 shadow-md"
                            : isShaking
                            ? "bg-rose-50 border-rose-400 animate-wiggle"
                            : "bg-white hover:bg-slate-50 border-slate-200 hover:border-deep-teal/40 shadow-xs hover:scale-102"
                        }`}
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-1.5 transition-transform group-hover:scale-110">
                          <SuperpowerDrawing id={card.drawingId} />
                        </div>
                        <span className="text-xs sm:text-sm font-serif font-bold text-deep-teal leading-tight block">
                          {card.title}
                        </span>
                        <span className="text-[10px] font-bold text-coral uppercase tracking-wider mt-0.5 block">
                          {card.badge}
                        </span>

                        {isMatched && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Match Complete Banner */}
            {matchedKeys.size === 4 && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 flex flex-wrap items-center justify-between gap-3 animate-in zoom-in-95">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-deep-teal m-0">
                      All Superpower Pairs Matched! (+400 PTS)
                    </h4>
                    <p className="text-xs text-charcoal/70 font-sans m-0">
                      All 4 athlete nutrition engines successfully linked!
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setActiveTab("mixer")}
                  className="bg-deep-teal hover:bg-deep-teal/90 text-white font-bold text-xs rounded-xl px-4 py-2"
                >
                  <span>Play 3:1 Blender</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* GAME 2: 3:1 RECOVERY BLENDER STUDIO                              */}
        {/* ================================================================= */}
        {activeTab === "mixer" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs sm:text-sm text-charcoal/80 font-sans font-medium m-0">
                Tap foods below to hit the <strong>3:1 Carb-to-Protein Ratio</strong>, then tap <strong>Blend</strong>!
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetBlender}
                className="text-xs h-7 rounded-xl border-slate-300"
              >
                <RotateCcw className="w-3 h-3 mr-1" /> Empty
              </Button>
            </div>

            {/* Center Visual Blender & Gauges */}
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-slate-50 to-slate-100 border-2 border-slate-200 flex flex-col md:flex-row items-center justify-around gap-6 shadow-inner">
              {/* Illustrated Animated SVG Blender Pitcher */}
              <div
                className={`relative w-40 h-52 sm:w-48 sm:h-60 transition-transform ${
                  blenderHazardWobble ? "animate-wiggle" : ""
                }`}
              >
                <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-md">
                  {/* Blender Lid */}
                  <rect x="25" y="8" width="50" height="8" rx="3" fill="#1E293B" />
                  <rect x="42" y="3" width="16" height="6" rx="2" fill="#475569" />

                  {/* Glass Jar Body */}
                  <polygon points="25,16 75,16 68,105 32,105" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" opacity="0.9" />

                  {/* Measurement Ticks */}
                  <line x1="33" y1="40" x2="40" y2="40" stroke="#CBD5E1" strokeWidth="1.5" />
                  <line x1="33" y1="60" x2="44" y2="60" stroke="#CBD5E1" strokeWidth="1.5" />
                  <line x1="33" y1="80" x2="40" y2="80" stroke="#CBD5E1" strokeWidth="1.5" />
                  <text x="46" y="62" fontSize="5" fill="#94A3B8" fontFamily="sans-serif" fontWeight="bold">
                    3:1 GOLD
                  </text>

                  {/* Liquid Fill */}
                  {blenderItems.length > 0 && (
                    <polygon
                      points={`32,105 68,105 ${
                        68 - (totalCarbs + totalProtein) * 1.5
                      },${Math.max(30, 105 - (totalCarbs + totalProtein) * 12)} ${
                        32 + (totalCarbs + totalProtein) * 1.5
                      },${Math.max(30, 105 - (totalCarbs + totalProtein) * 12)}`}
                      fill={
                        blenderItems.includes("m-berries")
                          ? "#A855F7"
                          : blenderItems.includes("m-chocmilk")
                          ? "#78350F"
                          : totalProtein > 0
                          ? "#0D9488"
                          : "#FBBF24"
                      }
                      opacity={isBlended ? "0.95" : "0.75"}
                      className="transition-all duration-500"
                    />
                  )}

                  {/* Whirlpool Swirl when Blended */}
                  {isBlended && (
                    <g className="animate-spin origin-[50px_70px]">
                      <path d="M 40 60 Q 50 50 60 60" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                      <path d="M 42 75 Q 50 85 58 75" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                    </g>
                  )}

                  {/* Blender Base */}
                  <polygon points="30,105 70,105 74,124 26,124" fill="#0F172A" />
                  <circle cx="50" cy="115" r="4" fill={isGoldRatio ? "#10B981" : "#EF4444"} />

                  {/* Handle */}
                  <path d="M 74 30 C 85 30 85 80 69 82" stroke="#475569" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>

                {/* Status Badge on Pitcher */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                  {isBlended ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold text-[9px] uppercase tracking-wide">
                      Blended!
                    </span>
                  ) : isGoldRatio ? (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[9px] uppercase tracking-wide animate-pulse">
                      Ready to Blend
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-slate-400 text-white font-bold text-[9px] uppercase tracking-wide">
                      Adding Foods
                    </span>
                  )}
                </div>
              </div>

              {/* Real-Time Ratio Gauges & Blend Action */}
              <div className="flex-1 max-w-sm space-y-3 text-center sm:text-left">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold font-sans">
                    <span className="text-amber-700 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      Carbs: {totalCarbs} pts (Target: 3+)
                    </span>
                    <span className="text-deep-teal flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-deep-teal" />
                      Protein: {totalProtein} pts (Target: 1+)
                    </span>
                  </div>

                  {/* Dual Barometer */}
                  <div className="h-5 w-full rounded-full bg-slate-200 overflow-hidden flex border border-slate-300 shadow-inner">
                    <div
                      className="bg-amber-400 transition-all duration-300 flex items-center justify-center text-[10px] font-black text-amber-950"
                      style={{ width: `${Math.min(75, totalCarbs * 18)}%` }}
                    >
                      {totalCarbs > 0 ? "CARB" : ""}
                    </div>
                    <div
                      className="bg-deep-teal transition-all duration-300 flex items-center justify-center text-[10px] font-black text-white"
                      style={{ width: `${Math.min(35, totalProtein * 25)}%` }}
                    >
                      {totalProtein > 0 ? "PRO" : ""}
                    </div>
                  </div>

                  <div className="text-xs font-medium text-charcoal/75">
                    {isGoldRatio ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1 justify-center sm:justify-start">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        3:1 Golden Ratio Achieved!
                      </span>
                    ) : (
                      "Add carbs & protein from pantry below to hit the target."
                    )}
                  </div>
                </div>

                {/* Blend Button */}
                <Button
                  onClick={handleTriggerBlend}
                  disabled={!isGoldRatio || isBlended}
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    isBlended
                      ? "bg-emerald-600 text-white"
                      : isGoldRatio
                      ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md animate-bounce"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isBlended ? "Shake Ready! ⭐⭐⭐" : "BLEND RECOVERY SHAKE!"}</span>
                </Button>
              </div>
            </div>

            {/* Pantry Food Buttons with Big Drawings */}
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-charcoal/50 block font-sans mb-1.5">
                Tap Ingredients Into Pitcher
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
                {MIXER_PANTRY_ITEMS.map((item) => {
                  const isAdded = blenderItems.includes(item.id);
                  const isHazard = item.type === "hazard";

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleAddBlenderFood(item)}
                      className={`p-2 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer group ${
                        isHazard
                          ? "bg-rose-50 border-rose-200 hover:border-rose-400 hover:scale-105"
                          : isAdded
                          ? "bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300"
                          : "bg-white hover:bg-slate-50 border-slate-200 hover:border-deep-teal/40 hover:scale-105 shadow-xs"
                      }`}
                    >
                      <div className="w-11 h-11 mb-1 transition-transform group-hover:scale-110">
                        <FoodDrawing id={item.drawingId} />
                      </div>
                      <span className="text-xs font-serif font-bold text-deep-teal leading-tight block truncate w-full">
                        {item.name}
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider block ${
                          isHazard ? "text-rose-700" : "text-charcoal/50"
                        }`}
                      >
                        {item.typeLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Blender Complete Banner */}
            {isBlended && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-amber-50 border-2 border-emerald-300 flex flex-wrap items-center justify-between gap-3 animate-in zoom-in-95">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-deep-teal m-0">
                      Golden Recovery Shake Mastered! (+150 PTS)
                    </h4>
                    <p className="text-xs text-charcoal/70 font-sans m-0">
                      Halts cortisol and doubles glycogen reload speed!
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setActiveTab("sorter")}
                  className="bg-deep-teal hover:bg-deep-teal/90 text-white font-bold text-xs rounded-xl px-4 py-2"
                >
                  <span>Play Bowl Catcher</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* GAME 3: PREGAME BOWL CATCHER ("CATCH 10 GOOD PREGAME FUELS")       */}
        {/* ================================================================= */}
        {activeTab === "sorter" && (
          <div className="space-y-3 sm:space-y-4 animate-in fade-in duration-200">
            {/* Status Header: Lives, Goal Counter, Restart */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 p-2.5 sm:p-3 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 flex-wrap">
                {/* 3 Hearts Lives */}
                <div className="flex items-center gap-1.5 bg-white border border-rose-200 px-3 py-1 rounded-full shadow-2xs">
                  <span className="text-xs font-bold font-sans text-rose-950 mr-0.5">Lives:</span>
                  {[1, 2, 3].map((heartIndex) => (
                    <Heart
                      key={heartIndex}
                      className={`w-4 h-4 transition-all duration-200 ${
                        heartIndex <= catcherHearts
                          ? "text-rose-600 fill-rose-600 scale-105 drop-shadow-xs"
                          : "text-slate-300 fill-slate-200 scale-90"
                      }`}
                    />
                  ))}
                </div>

                {/* 10 Good Foods Goal Progress */}
                <div className="flex items-center gap-2 bg-white border border-amber-200 px-3 py-1 rounded-full shadow-2xs">
                  <span className="text-xs font-bold font-sans text-amber-950">
                    Fuel Goal: <strong className="text-deep-teal font-extrabold">{goodFoodsCaught} / 10</strong> Good Foods
                  </span>
                  <div className="w-16 sm:w-24 h-2.5 bg-amber-100 rounded-full overflow-hidden border border-amber-200">
                    <div
                      className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                      style={{ width: `${Math.min(100, (goodFoodsCaught / 10) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleResetCatcher}
                className="text-xs h-7 rounded-xl border-slate-300 hover:bg-slate-100 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 mr-1" /> Restart
              </Button>
            </div>

            {/* In-Game Active Arena */}
            {catcherStatus === "playing" && (
              <div className="space-y-3">
                {/* Catching Arena Canvas */}
                <div
                  ref={arenaRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  className={`relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border-2 select-none touch-none cursor-ew-resize transition-all duration-150 ${
                    isDamageShake
                      ? "bg-rose-100/90 border-rose-500 ring-4 ring-rose-200"
                      : isCatchingImpact
                      ? "bg-emerald-50/90 border-emerald-400 ring-4 ring-emerald-200"
                      : "bg-gradient-to-b from-sky-50 via-teal-50/30 to-amber-50/50 border-teal-300 shadow-inner"
                  }`}
                >
                  {/* Subtle Athletic Field / Pitch Markings */}
                  <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute top-0 bottom-0 left-1/4 border-r-2 border-dashed border-teal-600" />
                    <div className="absolute top-0 bottom-0 left-2/4 border-r-2 border-teal-600" />
                    <div className="absolute top-0 bottom-0 left-3/4 border-r-2 border-dashed border-teal-600" />
                  </div>

                  {/* Bowl Catchline Target Indicator */}
                  <div className="absolute left-0 right-0 top-[76%] border-t-2 border-dashed border-teal-400/50 pointer-events-none flex items-center justify-between px-3">
                    <span className="text-[10px] font-bold text-teal-800/60 uppercase tracking-widest font-sans">
                      Catch Zone
                    </span>
                    <span className="text-[10px] font-bold text-teal-800/60 uppercase tracking-widest font-sans">
                      Avoid Hazards
                    </span>
                  </div>

                  {/* Falling Foods (Neutral styling - no green/red hints to test player nutrition knowledge) */}
                  {fallingFoods.map((item) => (
                    <div
                      key={item.uid}
                      style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      className="absolute pointer-events-none transition-transform duration-75 flex flex-col items-center z-10"
                    >
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 p-1.5 rounded-2xl bg-white/95 border-2 border-slate-300 shadow-md flex items-center justify-center transition-transform"
                      >
                        <FoodDrawing id={item.food.drawingId} className="w-full h-full" />
                      </div>
                      <span
                        className="text-[9.5px] font-bold px-2 py-0.5 rounded-md mt-0.5 whitespace-nowrap shadow-2xs font-sans bg-slate-800 text-white"
                      >
                        {item.food.name}
                      </span>
                    </div>
                  ))}

                  {/* Athlete Catcher holding the Golden Bowl */}
                  <div
                    style={{
                      left: `${catcherX}%`,
                      bottom: "4px",
                      transform: "translateX(-50%)",
                    }}
                    className="absolute pointer-events-none transition-transform duration-75 flex flex-col items-center z-20"
                  >
                    {/* Splash / Flash Impact effect */}
                    {isCatchingImpact && (
                      <div className="absolute -top-4 w-24 h-10 rounded-full bg-emerald-300/70 blur-md animate-ping" />
                    )}
                    {isDamageShake && (
                      <div className="absolute -top-4 w-24 h-10 rounded-full bg-rose-400/80 blur-md animate-ping" />
                    )}

                    <div
                      className={`w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg transition-transform ${
                        isCatchingImpact ? "scale-110" : ""
                      } ${isDamageShake ? "scale-95 rotate-3" : ""}`}
                    >
                      <AthleteCatcherDrawing className="w-full h-full" />
                    </div>
                  </div>

                  {/* Toast Pop-up Notification inside arena */}
                  {catcherToast && (
                    <div
                      className={`absolute top-3 left-4 right-4 sm:left-8 sm:right-8 p-2 rounded-2xl border text-xs sm:text-sm font-sans font-semibold flex items-center gap-2 shadow-md animate-in fade-in slide-in-from-top-2 duration-150 z-30 pointer-events-none ${
                        catcherToast.isGood
                          ? "bg-emerald-500 text-white border-emerald-600"
                          : "bg-rose-600 text-white border-rose-700"
                      }`}
                    >
                      {catcherToast.isGood ? (
                        <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-200 shrink-0" />
                      )}
                      <span className="flex-1 truncate">{catcherToast.text}</span>
                    </div>
                  )}
                </div>

                {/* Tactile Slider & Controls */}
                <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold font-sans text-charcoal/80">
                    <span className="flex items-center gap-1.5">
                      <span>🕹️</span>
                      <span>Drag the Slider or Field to move Maya & Bowl:</span>
                    </span>
                    <span className="text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 font-mono">
                      {catcherX}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCatcherX((x) => Math.max(12, x - 8))}
                      className="p-2 sm:px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-charcoal shadow-2xs cursor-pointer active:scale-95 transition-all text-xs font-bold flex items-center gap-1 shrink-0"
                      title="Nudge Left"
                    >
                      <ArrowLeft className="w-4 h-4 text-deep-teal" />
                      <span className="hidden sm:inline">Left</span>
                    </button>

                    <input
                      type="range"
                      min="12"
                      max="88"
                      value={catcherX}
                      onChange={(e) => setCatcherX(Number(e.target.value))}
                      className="w-full h-4 bg-slate-200 rounded-lg appearance-none cursor-ew-resize accent-teal-600 focus:outline-hidden"
                      aria-label="Pregame bowl position slider"
                    />

                    <button
                      type="button"
                      onClick={() => setCatcherX((x) => Math.min(88, x + 8))}
                      className="p-2 sm:px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-charcoal shadow-2xs cursor-pointer active:scale-95 transition-all text-xs font-bold flex items-center gap-1 shrink-0"
                      title="Nudge Right"
                    >
                      <span className="hidden sm:inline">Right</span>
                      <ArrowRight className="w-4 h-4 text-deep-teal" />
                    </button>
                  </div>

                  <p className="text-[11px] text-charcoal/60 text-center font-sans m-0">
                    Catch <strong>10 Good Foods</strong> (Bananas, Oats, Watermelon, etc.) & avoid <strong>Junk Hazards</strong> (Burgers, Soda, Donuts, Coffee)!
                  </p>
                </div>
              </div>
            )}

            {/* Game Over Screen (All 3 Hearts Lost -> Start Over) */}
            {catcherStatus === "game_over" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-rose-50 border-2 border-rose-300 text-center space-y-4 animate-in zoom-in-95 max-w-lg mx-auto shadow-md">
                <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <XCircle className="w-10 h-10 text-white" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-serif font-bold text-rose-950 m-0">
                    Stomach Cramps & Energy Crash!
                  </h4>
                  <p className="text-xs font-bold text-rose-700 uppercase tracking-wider font-sans m-0">
                    All 3 Hearts Lost — You Must Start Over!
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-charcoal/80 font-sans max-w-md mx-auto m-0">
                  Catching heavy grease (burgers), fried fats (donuts), or high-fructose soda before competition diverts oxygenated blood away from sprint muscles into painful digestion, inducing severe side stitches and cramps.
                </p>

                <div className="p-3.5 rounded-2xl bg-white border border-rose-200 text-left text-xs space-y-1.5 font-sans text-rose-950 shadow-2xs">
                  <p className="font-bold flex items-center gap-1.5 m-0 text-rose-900">
                    <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                    Pregame Golden Nutrition Rule:
                  </p>
                  <p className="text-charcoal/70 m-0 text-[11.5px] leading-relaxed">
                    Prioritize easily digested simple and complex carbohydrates (oatmeal, bananas, sweet potatoes) 2–3 hours before play. <strong>Strictly dodge heavy fats, fried foods, and fizzy sugars!</strong>
                  </p>
                </div>

                <Button
                  onClick={handleResetCatcher}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl px-6 py-3 shadow-md cursor-pointer hover:scale-102 transition-transform"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  <span>Start Over (Reset to 0/10 Foods & 3 Hearts)</span>
                </Button>
              </div>
            )}

            {/* Victory Screen (10/10 Good Foods Caught!) */}
            {catcherStatus === "victory" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-300 text-center space-y-4 animate-in zoom-in-95 max-w-lg mx-auto shadow-md">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <Trophy className="w-10 h-10 text-amber-300" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-serif font-bold text-deep-teal m-0">
                    Pregame Bowl Mastered! (+300 PTS)
                  </h4>
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-sans m-0">
                    10 / 10 Clean Pregame Fuels Caught!
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-charcoal/80 font-sans max-w-md mx-auto m-0">
                  Maya&apos;s glycogen tank is 100% primed with bananas, oats, stamina carbs, and hydration electrolytes — with zero gastrointestinal cramping hazards!
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={handleResetCatcher}
                    className="text-xs font-bold rounded-xl border-slate-300 px-4 py-2 cursor-pointer hover:bg-slate-100"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                    <span>Play Again</span>
                  </Button>

                  <Button
                    onClick={() => setActiveTab("clock")}
                    className="bg-deep-teal hover:bg-deep-teal/90 text-white font-bold text-xs rounded-xl px-5 py-2 shadow-sm cursor-pointer"
                  >
                    <span>Play Game 4: Game Clock</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* GAME 4: GAME-DAY TIMING CLOCK (EDUCATIVE MATCHING GAME)            */}
        {/* ================================================================= */}
        {activeTab === "clock" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs sm:text-sm text-charcoal/80 font-sans font-medium m-0">
                Tap a <strong>Meal Picture</strong> below, then tap the matching <strong>Game-Day Time Slot</strong>!
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetClock}
                className="text-xs h-7 rounded-xl border-slate-300"
              >
                <RotateCcw className="w-3 h-3 mr-1" /> Reset
              </Button>
            </div>

            {/* Clock Success Toast */}
            {clockSuccessToast && (
              <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center gap-2 text-xs sm:text-sm font-sans animate-in zoom-in-95">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">{clockSuccessToast}</span>
              </div>
            )}

            {/* 4 Clock Milestone Slots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {CLOCK_SLOTS.map((slot, idx) => {
                const placedMealId = clockPlacements[slot.id];
                const placedMeal = CLOCK_MEALS.find((m) => m.id === placedMealId);
                const isShaking = shakeCardId === slot.id;

                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => handleSlotClick(slot)}
                    className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer relative min-h-48 justify-between ${
                      placedMeal
                        ? "bg-emerald-50/80 border-emerald-400"
                        : selectedMealId
                        ? "bg-amber-50/40 border-amber-400 hover:bg-amber-50 hover:scale-102 border-dashed"
                        : "bg-white border-slate-200 border-dashed"
                    } ${isShaking ? "animate-wiggle border-rose-400" : ""}`}
                  >
                    {/* Time Header */}
                    <div className="w-full pb-1 border-b border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-deep-teal font-sans">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" />
                        Stage {idx + 1}
                      </span>
                      <span className="text-coral text-[10px]">{slot.timeLabel}</span>
                    </div>

                    {/* Middle Graphic or Placeholder */}
                    <div className="my-2">
                      {placedMeal ? (
                        <div className="flex flex-col items-center space-y-1 animate-in zoom-in-75">
                          <div className="w-16 h-16">
                            <FoodDrawing id={placedMeal.drawingId} />
                          </div>
                          <span className="text-xs font-bold font-serif text-deep-teal">
                            {placedMeal.name}
                          </span>
                          <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                            {placedMeal.badge}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-3 text-slate-400 space-y-1">
                          <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-slate-300" />
                          </div>
                          <span className="text-[10px] font-semibold text-slate-400">
                            {selectedMealId ? "Tap to Place" : slot.ruleTitle}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Target Pill */}
                    <div className="w-full pt-1 border-t border-slate-200/60 text-[9.5px] font-bold text-charcoal/50 uppercase tracking-wider">
                      {slot.targetCategory}
                    </div>

                    {placedMeal && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Meal Choice Tray */}
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-charcoal/50 block font-sans mb-1.5">
                Available Game-Day Meals (Tap One to Select)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {CLOCK_MEALS.map((meal) => {
                  const isPlaced = Object.values(clockPlacements).includes(meal.id);
                  const isSelected = selectedMealId === meal.id;

                  return (
                    <button
                      key={meal.id}
                      type="button"
                      onClick={() => handleSelectClockMeal(meal.id)}
                      disabled={isPlaced}
                      className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer relative group ${
                        isPlaced
                          ? "bg-slate-100 border-slate-200 opacity-40 cursor-default scale-95"
                          : isSelected
                          ? "bg-amber-50 border-amber-500 ring-4 ring-amber-300 scale-105 shadow-md"
                          : "bg-white hover:bg-slate-50 border-slate-200 hover:border-deep-teal/40 shadow-xs hover:scale-102"
                      }`}
                    >
                      <div className="w-14 h-14 mb-1 transition-transform group-hover:scale-110">
                        <FoodDrawing id={meal.drawingId} />
                      </div>
                      <span className="text-xs font-serif font-bold text-deep-teal leading-tight block">
                        {meal.name}
                      </span>
                      <span className="text-[9.5px] font-bold text-coral uppercase tracking-wider mt-0.5 block">
                        {meal.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clock Completed Banner */}
            {Object.keys(clockPlacements).length === 4 && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 flex flex-wrap items-center justify-between gap-3 animate-in zoom-in-95">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-deep-teal m-0">
                      Game-Day Timing Clock Mastered! (+300 PTS)
                    </h4>
                    <p className="text-xs text-charcoal/70 font-sans m-0">
                      You locked in optimal energy availability across every match stage!
                    </p>
                  </div>
                </div>

                <Button
                  onClick={onComplete}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl px-4 py-2 shadow-sm"
                >
                  <Award className="w-4 h-4 mr-1 text-deep-teal" />
                  <span>Claim +{topic?.xp || 75} XP & Complete</span>
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* REWARD BANNER WHEN 2 OR MORE GAMES ARE COMPLETED                  */}
        {/* ================================================================= */}
        {isMasterComplete && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-900 to-deep-teal text-white flex flex-wrap items-center justify-between gap-3 shadow-lg border border-amber-300/30 animate-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                <Award className="w-6 h-6 text-deep-teal" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-white m-0">
                  Sports Nutrition Champion! (+{topic?.xp || 75} XP)
                </h4>
                <p className="text-xs text-white/80 font-sans m-0">
                  You conquered the picture matching, 3:1 blender, and athlete fuel games!
                </p>
              </div>
            </div>

            <Button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md cursor-pointer hover:scale-105 transition-all"
            >
              <span>Finish & Claim Victory</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {/* ================================================================= */}
        {/* CLINICAL SOURCES & MEDICAL REVIEW (COLLAPSIBLE DISCREET DRAWER)   */}
        {/* ================================================================= */}
        <div className="border-t border-slate-200 pt-2 text-xs font-sans">
          <button
            type="button"
            onClick={() => setShowSources(!showSources)}
            className="flex items-center justify-between w-full text-charcoal/60 hover:text-charcoal transition-colors cursor-pointer py-1"
          >
            <span className="flex items-center gap-1.5 font-semibold text-[11px]">
              <BookOpen className="w-3.5 h-3.5 text-deep-teal" />
              Medically Reviewed Guidelines & Sports Nutrition Citations
            </span>
            {showSources ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showSources && (
            <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-[10.5px] text-charcoal/80 animate-in fade-in duration-150">
              <p className="m-0">
                • <strong>International Society of Sports Nutrition (ISSN)</strong>: Position Stand on Nutrient Timing. 3:1 to 4:1 Carbohydrate-to-Protein ratio within 45 minutes optimizes glycogen reloading and halts post-exercise catabolism.
              </p>
              <p className="m-0">
                • <strong>International Olympic Committee (IOC)</strong>: Consensus Statement on Relative Energy Deficiency in Sport (RED-S, 2023 Update). Low energy availability suppresses kisspeptin, disrupts ovulatory cycles, and accelerates bone loss.
              </p>
              <p className="m-0">
                • <strong>American College of Obstetricians and Gynecologists (ACOG)</strong>: Committee Opinion No. 740: Female Athlete Triad. Early clinical identification of menstrual irregularities and adequate caloric fueling are critical for lifelong peak bone mass.
              </p>
              <p className="m-0">
                • <strong>American College of Sports Medicine (ACSM)</strong>: Nutrition and Athletic Performance. Iron loss via menses requires pairing non-heme dietary iron with ascorbic acid (Vitamin C) while avoiding concurrent caffeine and tannins.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
