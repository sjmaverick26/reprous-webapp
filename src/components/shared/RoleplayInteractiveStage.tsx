"use client";

import React, { useState, useMemo } from "react";
import { RoleplayScenario } from "@/data/hubData";
import {
  Stethoscope,
  Sparkles,
  Check,
  CheckCircle2,
  AlertTriangle,
  Activity,
  FileSpreadsheet,
  TrendingUp,
  ShieldCheck,
  Scale,
  MessageSquare,
  Award,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

interface ProviderVisualProfile {
  skinTone: string;
  skinShadow: string;
  hairColor: string;
  hairStyle: "short-part" | "bob-sleek" | "curly-fade" | "bun" | "short-curl" | "textured-crop" | "wavy-shoulder";
  hasGlasses: boolean;
  glassesColor?: string;
  clothingType: "lab-coat" | "athletic-polo" | "track-jacket" | "blazer" | "casual-sweater";
  primaryClothColor: string;
  accentClothColor: string;
  accessory?: "stethoscope" | "whistle" | "badge";
}

interface PatientVisualProfile {
  name: string;
  role: string;
  skinTone: string;
  skinShadow: string;
  hairColor: string;
  hairStyle: "ponytail" | "braids-topknot" | "box-braids" | "hijab" | "curly-afro" | "wavy-long" | "bob-sleek";
  hijabColor?: string;
  hasGlasses?: boolean;
  glassesColor?: string;
  topType: "track-jacket" | "hoodie" | "knit-cardigan" | "denim-jacket" | "athletic-pullover";
  topColor: string;
  topAccentColor: string;
  binderColor: string;
}

const DIVERSE_PATIENT_PROFILES: PatientVisualProfile[] = [
  {
    name: "Maya",
    role: "Student Athlete",
    skinTone: "#523321", // Deep warm rich brown
    skinShadow: "#3A2012",
    hairColor: "#0B0E14", // Jet black
    hairStyle: "box-braids",
    topType: "track-jacket",
    topColor: "#F47A6A", // ReproUs coral
    topAccentColor: "#175B5C", // Deep teal
    binderColor: "#175B5C",
  },
  {
    name: "Sofia",
    role: "Youth Advocate",
    skinTone: "#B87346", // Warm golden-olive
    skinShadow: "#96562B",
    hairColor: "#2A1810",
    hairStyle: "wavy-long",
    hasGlasses: true,
    glassesColor: "#D97706",
    topType: "knit-cardigan",
    topColor: "#831843", // Plum
    topAccentColor: "#FDF2F8",
    binderColor: "#F47A6A",
  },
  {
    name: "Amina",
    role: "Community Advocate",
    skinTone: "#A0613A", // Warm bronze
    skinShadow: "#854923",
    hairColor: "#18181B",
    hairStyle: "hijab",
    hijabColor: "#C2410C", // Terracotta / rust
    topType: "hoodie",
    topColor: "#15803D", // Forest green
    topAccentColor: "#DCFCE7",
    binderColor: "#0284C7",
  },
  {
    name: "Jordan",
    role: "Youth Athlete",
    skinTone: "#7B4B27", // Medium dark brown
    skinShadow: "#5E3416",
    hairColor: "#18181B",
    hairStyle: "curly-afro",
    topType: "athletic-pullover",
    topColor: "#1D4ED8", // Royal blue
    topAccentColor: "#94A3B8",
    binderColor: "#334155",
  },
  {
    name: "Chloe",
    role: "Menstrual Equity Advocate",
    skinTone: "#F7D5BA", // Fair golden-peach
    skinShadow: "#E2B598",
    hairColor: "#18181B",
    hairStyle: "bob-sleek",
    hasGlasses: true,
    glassesColor: "#78350F",
    topType: "denim-jacket",
    topColor: "#2563EB", // Denim blue
    topAccentColor: "#FFFFFF",
    binderColor: "#0D9488",
  },
  {
    name: "Priya",
    role: "Clinical Self-Advocate",
    skinTone: "#8D5524", // Warm South Asian bronze
    skinShadow: "#703F15",
    hairColor: "#1A120B",
    hairStyle: "ponytail",
    hasGlasses: true,
    glassesColor: "#B45309",
    topType: "hoodie",
    topColor: "#D97706", // Amber gold
    topAccentColor: "#FEF3C7",
    binderColor: "#1E293B",
  },
];

function getProviderVisualProfile(characterName: string, role?: string): ProviderVisualProfile {
  const name = characterName.toLowerCase();
  const roleText = (role || "").toLowerCase();

  // 1. Dr. Chen (Asian female OB/GYN specialist)
  if (name.includes("chen")) {
    return {
      skinTone: "#F7D5BA",
      skinShadow: "#E2B598",
      hairColor: "#18181B",
      hairStyle: "bob-sleek",
      hasGlasses: true,
      glassesColor: "#B45309",
      clothingType: "lab-coat",
      primaryClothColor: "#FFFFFF",
      accentClothColor: "#175B5C",
      accessory: "stethoscope",
    };
  }

  // 2. Dr. Patel (South Asian sports medicine physician)
  if (name.includes("patel")) {
    return {
      skinTone: "#8D5524",
      skinShadow: "#703F15",
      hairColor: "#18181B",
      hairStyle: "textured-crop",
      hasGlasses: false,
      clothingType: "lab-coat",
      primaryClothColor: "#FFFFFF",
      accentClothColor: "#881337",
      accessory: "stethoscope",
    };
  }

  // 3. Dr. Rivera (Latina gynecologic surgeon)
  if (name.includes("rivera")) {
    return {
      skinTone: "#C68642",
      skinShadow: "#A76B2F",
      hairColor: "#2A1810",
      hairStyle: "wavy-shoulder",
      hasGlasses: true,
      glassesColor: "#78350F",
      clothingType: "lab-coat",
      primaryClothColor: "#FFFFFF",
      accentClothColor: "#047857",
      accessory: "stethoscope",
    };
  }

  // 4. Dr. Miller (Black family physician)
  if (name.includes("dr. miller") || (name.includes("miller") && roleText.includes("physician"))) {
    return {
      skinTone: "#7B4B27",
      skinShadow: "#5E3416",
      hairColor: "#111827",
      hairStyle: "curly-fade",
      hasGlasses: false,
      clothingType: "lab-coat",
      primaryClothColor: "#FFFFFF",
      accentClothColor: "#0D9488",
      accessory: "stethoscope",
    };
  }

  // 5. Dr. Wright (Distinguished endocrinologist)
  if (name.includes("wright")) {
    return {
      skinTone: "#F4C9B3",
      skinShadow: "#DFAB90",
      hairColor: "#9CA3AF",
      hairStyle: "short-part",
      hasGlasses: true,
      glassesColor: "#64748B",
      clothingType: "lab-coat",
      primaryClothColor: "#FFFFFF",
      accentClothColor: "#1E3A8A",
      accessory: "stethoscope",
    };
  }

  // 6. Dr. Adams (Pediatrician)
  if (name.includes("adams")) {
    return {
      skinTone: "#E0AC69",
      skinShadow: "#BF8D4E",
      hairColor: "#4A3525",
      hairStyle: "short-part",
      hasGlasses: false,
      clothingType: "lab-coat",
      primaryClothColor: "#FFFFFF",
      accentClothColor: "#0284C7",
      accessory: "stethoscope",
    };
  }

  // 7. Dr. Roberts (Primary Care Physician)
  if (name.includes("roberts")) {
    return {
      skinTone: "#D29774",
      skinShadow: "#B47A57",
      hairColor: "#37271E",
      hairStyle: "short-part",
      hasGlasses: true,
      glassesColor: "#334155",
      clothingType: "lab-coat",
      primaryClothColor: "#FFFFFF",
      accentClothColor: "#1D4ED8",
      accessory: "stethoscope",
    };
  }

  // 8. Athletic Trainer Marcus (Black certified athletic trainer)
  if (name.includes("marcus")) {
    return {
      skinTone: "#5C3826",
      skinShadow: "#452718",
      hairColor: "#0F172A",
      hairStyle: "curly-fade",
      hasGlasses: false,
      clothingType: "athletic-polo",
      primaryClothColor: "#1E293B",
      accentClothColor: "#F43F5E",
      accessory: "whistle",
    };
  }

  // 9. Coach Henderson / Coach Davis / Coach Bennett
  if (name.includes("coach") || roleText.includes("coach")) {
    if (name.includes("davis")) {
      return {
        skinTone: "#5C3826",
        skinShadow: "#452718",
        hairColor: "#111827",
        hairStyle: "curly-fade",
        hasGlasses: false,
        clothingType: "track-jacket",
        primaryClothColor: "#047857",
        accentClothColor: "#F59E0B",
        accessory: "whistle",
      };
    }
    if (name.includes("bennett")) {
      return {
        skinTone: "#C68642",
        skinShadow: "#A76B2F",
        hairColor: "#18181B",
        hairStyle: "short-part",
        hasGlasses: false,
        clothingType: "athletic-polo",
        primaryClothColor: "#B91C1C",
        accentClothColor: "#FFFFFF",
        accessory: "whistle",
      };
    }
    return {
      skinTone: "#E8B896",
      skinShadow: "#C79574",
      hairColor: "#6B7280",
      hairStyle: "short-part",
      hasGlasses: false,
      clothingType: "track-jacket",
      primaryClothColor: "#1E40AF",
      accentClothColor: "#F59E0B",
      accessory: "whistle",
    };
  }

  // 10. Trustee Morales (School Board Trustee)
  if (name.includes("morales") || name.includes("trustee")) {
    return {
      skinTone: "#B87346",
      skinShadow: "#96562B",
      hairColor: "#1E1B18",
      hairStyle: "short-part",
      hasGlasses: false,
      clothingType: "blazer",
      primaryClothColor: "#334155",
      accentClothColor: "#F8FAFC",
      accessory: "badge",
    };
  }

  // 11. Vice Principal Davis / School Administrator
  if (name.includes("principal") || (name.includes("davis") && roleText.includes("principal"))) {
    return {
      skinTone: "#4A2E1B",
      skinShadow: "#351F10",
      hairColor: "#111827",
      hairStyle: "bun",
      hasGlasses: true,
      glassesColor: "#0F172A",
      clothingType: "blazer",
      primaryClothColor: "#4C1D95",
      accentClothColor: "#FAF5FF",
      accessory: "badge",
    };
  }

  // 12. Clinic Manager Vance
  if (name.includes("vance") || roleText.includes("manager") || roleText.includes("director")) {
    return {
      skinTone: "#F0C4A4",
      skinShadow: "#D49E7C",
      hairColor: "#B45309",
      hairStyle: "bob-sleek",
      hasGlasses: true,
      glassesColor: "#0284C7",
      clothingType: "blazer",
      primaryClothColor: "#0F766E",
      accentClothColor: "#FFFFFF",
      accessory: "badge",
    };
  }

  // 13. Clinician Taylor
  if (name.includes("taylor")) {
    return {
      skinTone: "#A0613A",
      skinShadow: "#854923",
      hairColor: "#18181B",
      hairStyle: "bun",
      hasGlasses: false,
      clothingType: "lab-coat",
      primaryClothColor: "#FFFFFF",
      accentClothColor: "#334155",
      accessory: "badge",
    };
  }

  // 14. Pharmacist Greg
  if (name.includes("greg") || name.includes("pharmacist")) {
    return {
      skinTone: "#E2B38F",
      skinShadow: "#C4936F",
      hairColor: "#3F2B1D",
      hairStyle: "short-part",
      hasGlasses: true,
      glassesColor: "#64748B",
      clothingType: "lab-coat",
      primaryClothColor: "#FFFFFF",
      accentClothColor: "#0284C7",
      accessory: "badge",
    };
  }

  // 15. Alex (Peer Educator / College Advocate)
  if (name.includes("alex") || roleText.includes("educator") || roleText.includes("advocate")) {
    return {
      skinTone: "#664126",
      skinShadow: "#4E2F18",
      hairColor: "#18181B",
      hairStyle: "curly-fade",
      hasGlasses: false,
      clothingType: "casual-sweater",
      primaryClothColor: "#7E22CE",
      accentClothColor: "#10B981",
      accessory: "badge",
    };
  }

  // Default balanced fallback
  const hash = characterName.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const fallbacks: ProviderVisualProfile[] = [
    {
      skinTone: "#F7D5BA",
      skinShadow: "#E2B598",
      hairColor: "#18181B",
      hairStyle: "bob-sleek",
      hasGlasses: true,
      glassesColor: "#B45309",
      clothingType: "lab-coat",
      primaryClothColor: "#FFFFFF",
      accentClothColor: "#175B5C",
      accessory: "stethoscope",
    },
    {
      skinTone: "#8D5524",
      skinShadow: "#703F15",
      hairColor: "#18181B",
      hairStyle: "textured-crop",
      hasGlasses: false,
      clothingType: "lab-coat",
      primaryClothColor: "#FFFFFF",
      accentClothColor: "#881337",
      accessory: "stethoscope",
    },
    {
      skinTone: "#5C3826",
      skinShadow: "#452718",
      hairColor: "#111827",
      hairStyle: "curly-fade",
      hasGlasses: false,
      clothingType: "lab-coat",
      primaryClothColor: "#FFFFFF",
      accentClothColor: "#0D9488",
      accessory: "stethoscope",
    },
    {
      skinTone: "#C68642",
      skinShadow: "#A76B2F",
      hairColor: "#2A1810",
      hairStyle: "wavy-shoulder",
      hasGlasses: true,
      glassesColor: "#78350F",
      clothingType: "lab-coat",
      primaryClothColor: "#FFFFFF",
      accentClothColor: "#047857",
      accessory: "stethoscope",
    },
  ];
  return fallbacks[hash % fallbacks.length];
}

function ProviderAvatarSvg({
  profile,
  isBest,
  chosenOpt,
}: {
  profile: ProviderVisualProfile;
  isBest: boolean;
  chosenOpt: any;
}) {
  return (
    <svg
      viewBox="0 0 120 140"
      className="w-24 sm:w-28 h-auto drop-shadow-md transition-transform duration-300 hover:scale-105"
    >
      {/* Back Hair Layer (Behind Head & Shoulders for full volume) */}
      {(profile.hairStyle === "wavy-shoulder" || profile.hairStyle === "bob-sleek") && (
        <g>
          {/* Back hair silhouette framing skull, neck, and shoulders */}
          <path
            d="M 34 36 C 28 12, 92 12, 86 36 C 94 52, 98 72, 95 94 C 93 104, 83 104, 76 96 C 74 86, 74 74, 74 65 L 46 65 C 46 74, 46 86, 44 96 C 37 104, 27 104, 25 94 C 22 72, 26 52, 34 36 Z"
            fill="#1A0E08"
          />
          {profile.hairStyle === "wavy-shoulder" && (
            <>
              {/* Flowing wavy locks behind shoulders */}
              <path
                d="M 27 52 Q 20 72 24 90 Q 28 102 36 94 Q 34 80 36 66 Z"
                fill={profile.hairColor}
              />
              <path
                d="M 93 52 Q 100 72 96 90 Q 92 102 84 94 Q 86 80 84 66 Z"
                fill={profile.hairColor}
              />
            </>
          )}
        </g>
      )}

      {/* Head / Face Base */}
      <ellipse cx="60" cy="40" rx="22" ry="24" fill={profile.skinTone} />

      {/* Ears with gold hoop/studs for Dr. Rivera */}
      <ellipse cx="38" cy="42" rx="2.5" ry="4.5" fill={profile.skinTone} />
      <ellipse cx="82" cy="42" rx="2.5" ry="4.5" fill={profile.skinTone} />
      {profile.hairStyle === "wavy-shoulder" && (
        <>
          <circle cx="38" cy="45" r="1.5" fill="#D97706" />
          <circle cx="82" cy="45" r="1.5" fill="#D97706" />
        </>
      )}

      {/* Hair Styles (Front / Crown Layer) */}
      {profile.hairStyle === "bob-sleek" && (
        <path
          d="M 36 44 C 34 16, 86 16, 84 44 C 85 54, 82 58, 80 58 C 78 50, 75 24, 60 24 C 45 24, 42 50, 40 58 C 38 58, 35 54, 36 44 Z"
          fill={profile.hairColor}
        />
      )}
      {profile.hairStyle === "wavy-shoulder" && (
        <g>
          {/* Main front hair crown - seated securely on skull with natural volume from y=10 */}
          <ellipse cx="60" cy="22" rx="23" ry="13" fill={profile.hairColor} />
          <path
            d="M 36 40 C 32 10, 88 10, 84 40 C 82 32, 78 24, 60 23 C 42 23, 38 32, 36 40 Z"
            fill={profile.hairColor}
          />
          {/* Natural side part at x=52 */}
          <line x1="52" y1="10" x2="54" y2="24" stroke="#1A0E08" strokeWidth="1.2" strokeLinecap="round" />
          
          {/* Side-swept front bangs/waves framing forehead */}
          <path
            d="M 52 11 Q 68 15 78 26 Q 81 32 83 42 Q 78 30 64 25 Q 56 24 52 23 Z"
            fill={profile.hairColor}
          />
          {/* Left temple wave */}
          <path
            d="M 36 38 Q 33 48 37 58 Q 39 52 38 42 Z"
            fill={profile.hairColor}
          />
        </g>
      )}
      {profile.hairStyle === "curly-fade" && (
        <>
          <path
            d="M 38 38 C 36 18, 84 18, 82 38 C 84 26, 76 16, 60 16 C 44 16, 36 26, 38 38 Z"
            fill={profile.hairColor}
          />
          <circle cx="46" cy="22" r="7" fill={profile.hairColor} />
          <circle cx="60" cy="18" r="8" fill={profile.hairColor} />
          <circle cx="74" cy="22" r="7" fill={profile.hairColor} />
          <circle cx="53" cy="18" r="6" fill={profile.hairColor} />
          <circle cx="67" cy="18" r="6" fill={profile.hairColor} />
        </>
      )}
      {profile.hairStyle === "bun" && (
        <>
          <path
            d="M 38 40 C 38 20, 82 20, 82 40 C 82 30, 75 22, 60 22 C 45 22, 38 30, 38 40 Z"
            fill={profile.hairColor}
          />
          <circle cx="60" cy="15" r="9" fill={profile.hairColor} />
        </>
      )}
      {profile.hairStyle === "textured-crop" && (
        <>
          <path
            d="M 38 38 C 36 20, 84 20, 82 38 C 80 26, 74 20, 60 20 C 46 20, 40 26, 38 38 Z"
            fill={profile.hairColor}
          />
          <path
            d="M 44 24 Q 50 18 56 22 Q 62 18 68 22 Q 74 18 78 24"
            stroke={profile.hairColor}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}
      {(profile.hairStyle === "short-part" || profile.hairStyle === "short-curl") && (
        <path
          d="M 38 40 C 38 18, 82 18, 82 40 C 82 30, 75 22, 60 22 C 45 22, 38 30, 38 40 Z"
          fill={profile.hairColor}
        />
      )}

      {/* Eyebrows */}
      {isBest ? (
        <>
          <path d="M 47 32 Q 53 29 57 32" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 63 32 Q 67 29 73 32" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      ) : chosenOpt !== null ? (
        <>
          <path d="M 47 34 Q 53 32 57 35" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 63 35 Q 67 32 73 34" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M 47 33 Q 53 31 57 33" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 63 33 Q 67 31 73 33" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* Eyes */}
      <circle cx="52" cy="39" r="2.5" fill="#1E293B" />
      <circle cx="68" cy="39" r="2.5" fill="#1E293B" />

      {/* Eyeglasses (if present) */}
      {profile.hasGlasses && (
        <>
          <circle cx="52" cy="39" r="7" fill="none" stroke={profile.glassesColor || "#64748B"} strokeWidth="1.5" />
          <circle cx="68" cy="39" r="7" fill="none" stroke={profile.glassesColor || "#64748B"} strokeWidth="1.5" />
          <line x1="59" y1="39" x2="61" y2="39" stroke={profile.glassesColor || "#64748B"} strokeWidth="1.5" />
        </>
      )}

      {/* Nose */}
      <path d="M 60 41 L 58 46 L 61 46" stroke={profile.skinShadow} strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Mouth */}
      {isBest ? (
        <path d="M 52 52 Q 60 59 68 52" stroke="#A84C32" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : chosenOpt !== null ? (
        <path d="M 54 53 L 66 53" stroke="#A84C32" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M 54 53 Q 60 56 66 53" stroke="#A84C32" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      )}

      {/* Neck */}
      <rect x="54" y="62" width="12" height="10" fill={profile.skinShadow} />

      {/* Attire */}
      {profile.clothingType === "lab-coat" && (
        <>
          <path d="M 45 70 L 60 84 L 75 70 Z" fill={profile.accentClothColor} />
          <path
            d="M 32 75 C 32 70, 44 68, 60 68 C 76 68, 88 70, 88 75 L 94 140 L 26 140 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          <path d="M 42 70 L 48 105 L 35 140" fill="none" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M 78 70 L 72 105 L 85 140" fill="none" stroke="#94A3B8" strokeWidth="1.5" />
          {profile.accessory === "stethoscope" && (
            <>
              <path
                d="M 46 72 Q 44 95 56 100 Q 64 100 68 85 Q 70 72 74 72"
                fill="none"
                stroke="#475569"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="56" cy="103" r="3.5" fill="#94A3B8" stroke="#334155" strokeWidth="1.5" />
            </>
          )}
          <rect x="35" y="90" width="10" height="14" rx="2" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1" />
          <rect x="37" y="93" width="6" height="4" fill="#0284C7" />
          <line x1="37" y1="99" x2="43" y2="99" stroke="#94A3B8" strokeWidth="0.8" />
        </>
      )}

      {(profile.clothingType === "athletic-polo" || profile.clothingType === "track-jacket") && (
        <>
          <path
            d="M 32 74 C 32 68, 44 66, 60 66 C 76 66, 88 68, 88 74 L 94 140 L 26 140 Z"
            fill={profile.primaryClothColor}
            stroke={profile.primaryClothColor}
            strokeWidth="1.5"
          />
          <path d="M 46 66 L 60 82 L 74 66 Z" fill={profile.accentClothColor} />
          <line x1="60" y1="82" x2="60" y2="140" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3,3" />
          <line x1="34" y1="74" x2="28" y2="140" stroke={profile.accentClothColor} strokeWidth="2.5" />
          <line x1="86" y1="74" x2="92" y2="140" stroke={profile.accentClothColor} strokeWidth="2.5" />
          <path d="M 50 68 L 60 98 L 70 68" stroke="#DC2626" strokeWidth="2" fill="none" strokeLinecap="round" />
          <rect x="56" y="98" width="8" height="6" rx="2" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />
          <circle cx="58" cy="101" r="1.5" fill="#334155" />
        </>
      )}

      {profile.clothingType === "blazer" && (
        <>
          <path d="M 48 66 L 60 84 L 72 66 Z" fill={profile.accentClothColor} />
          <path
            d="M 32 74 C 32 68, 44 66, 60 66 C 76 66, 88 68, 88 74 L 94 140 L 26 140 Z"
            fill={profile.primaryClothColor}
            stroke="#1E293B"
            strokeWidth="1"
          />
          <path d="M 44 68 L 52 98 L 36 140" fill="none" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M 76 68 L 68 98 L 84 140" fill="none" stroke="#94A3B8" strokeWidth="1.5" />
          <rect x="36" y="88" width="10" height="13" rx="2" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
          <rect x="38" y="90" width="6" height="3" fill="#D97706" />
        </>
      )}

      {profile.clothingType === "casual-sweater" && (
        <>
          <path
            d="M 32 74 C 32 68, 44 66, 60 66 C 76 66, 88 68, 88 74 L 94 140 L 26 140 Z"
            fill={profile.primaryClothColor}
          />
          <path d="M 48 68 C 48 66, 72 66, 72 68 C 72 74, 48 74, 48 68 Z" fill={profile.accentClothColor} />
          <circle cx="40" cy="88" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1" />
        </>
      )}

      {/* Front Cascading Locks for Wavy-Shoulder (Dr. Rivera) draped over coat */}
      {profile.hairStyle === "wavy-shoulder" && (
        <g>
          {/* Left front wave curling around cheek and cascading over collar */}
          <path
            d="M 36 38 Q 30 54 34 72 Q 38 84 43 82 Q 40 68 39 52 Q 37 42 36 38 Z"
            fill={profile.hairColor}
          />
          <path
            d="M 35 50 Q 32 68 37 80"
            stroke="#4A2C1D"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Right front voluminous wave cascading over lab coat lapel */}
          <path
            d="M 78 26 Q 88 42 87 64 Q 86 86 80 96 Q 74 98 73 90 Q 77 74 75 54 Q 74 40 78 26 Z"
            fill={profile.hairColor}
          />
          {/* Dimensional wave highlights in warm chestnut */}
          <path
            d="M 80 34 Q 86 50 84 70 Q 82 86 77 94"
            stroke="#4A2C1D"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 76 42 Q 82 56 80 74"
            stroke="#6B3F28"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}

function PatientAvatarSvg({
  profile,
  isBest,
  chosenOpt,
}: {
  profile: PatientVisualProfile;
  isBest: boolean;
  chosenOpt: any;
}) {
  return (
    <svg
      viewBox="0 0 120 140"
      className="w-24 sm:w-28 h-auto drop-shadow-md transition-transform duration-300 hover:scale-105"
    >
      {/* Back Hair for Box Braids (Maya) */}
      {profile.hairStyle === "box-braids" && (
        <g>
          {/* Full dark hair silhouette behind head, neck, and shoulders */}
          <path
            d="M 36 30 C 34 12, 86 12, 84 30 C 92 46, 96 72, 96 105 C 96 128, 92 140, 90 140 L 30 140 C 28 140, 24 128, 24 105 C 24 72, 28 46, 36 30 Z"
            fill="#05070A"
          />
          {/* Back individual braids visible behind the neck and shoulders */}
          <path d="M 28 48 Q 21 76 21 106 Q 21 126 25 140" stroke="#0B0E14" strokeWidth="3.6" fill="none" />
          <path d="M 28 48 Q 21 76 21 106 Q 21 126 25 140" stroke="#1F2937" strokeWidth="1.2" fill="none" strokeDasharray="3,2.5" />
          <path d="M 33 54 Q 27 80 27 110 Q 27 128 30 140" stroke="#0B0E14" strokeWidth="3.4" fill="none" />
          <path d="M 33 54 Q 27 80 27 110 Q 27 128 30 140" stroke="#1F2937" strokeWidth="1.2" fill="none" strokeDasharray="3,2.5" />
          
          <path d="M 92 48 Q 99 76 99 106 Q 99 126 95 140" stroke="#0B0E14" strokeWidth="3.6" fill="none" />
          <path d="M 92 48 Q 99 76 99 106 Q 99 126 95 140" stroke="#1F2937" strokeWidth="1.2" fill="none" strokeDasharray="3,2.5" />
          <path d="M 87 54 Q 93 80 93 110 Q 93 128 90 140" stroke="#0B0E14" strokeWidth="3.4" fill="none" />
          <path d="M 87 54 Q 93 80 93 110 Q 93 128 90 140" stroke="#1F2937" strokeWidth="1.2" fill="none" strokeDasharray="3,2.5" />
        </g>
      )}

      {/* Head Base */}
      <ellipse cx="60" cy="42" rx="20" ry="22" fill={profile.skinTone} />
      {/* Ears with gold studs */}
      <ellipse cx="40" cy="44" rx="2.5" ry="4.5" fill={profile.skinTone} />
      <ellipse cx="80" cy="44" rx="2.5" ry="4.5" fill={profile.skinTone} />
      <circle cx="40" cy="46" r="1" fill="#F59E0B" />
      <circle cx="80" cy="46" r="1" fill="#F59E0B" />

      {/* Hair & Headcoverings */}
      {profile.hairStyle === "box-braids" && (
        <g>
          {/* Full solid scalp cap covering the entire crown down to natural hairline */}
          <ellipse cx="60" cy="23" rx="24" ry="15" fill={profile.hairColor} />
          <path
            d="M 36 42 C 32 10, 88 10, 84 42 C 81 32, 75 25, 60 25 C 45 25, 39 32, 36 42 Z"
            fill={profile.hairColor}
          />
          {/* Crisp geometric box parting lines on the dark crown */}
          <line x1="60" y1="10" x2="60" y2="25" stroke="#374151" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 48 14 L 52 25" stroke="#374151" strokeWidth="0.8" />
          <path d="M 72 14 L 68 25" stroke="#374151" strokeWidth="0.8" />
          <path d="M 38 21 Q 49 19 60 18" stroke="#374151" strokeWidth="0.8" fill="none" />
          <path d="M 82 21 Q 71 19 60 18" stroke="#374151" strokeWidth="0.8" fill="none" />

          {/* Delicate styled baby hairs / edge details along the natural hairline */}
          <path d="M 47 25 Q 51 27 49 29" stroke={profile.hairColor} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M 73 25 Q 69 27 71 29" stroke={profile.hairColor} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M 38 33 Q 41 36 39 39" stroke={profile.hairColor} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M 82 33 Q 79 36 81 39" stroke={profile.hairColor} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>
      )}

      {profile.hairStyle === "hijab" && (
        <>
          <path
            d="M 34 40 C 34 16, 86 16, 86 40 C 88 56, 82 72, 70 74 C 64 75, 56 75, 50 74 C 38 72, 32 56, 34 40 Z"
            fill={profile.hijabColor || "#C2410C"}
          />
          <ellipse cx="60" cy="43" rx="16" ry="18" fill={profile.skinTone} />
          <path d="M 47 29 Q 60 26 73 29" stroke="#F1F5F9" strokeWidth="2.5" fill="none" />
          <path d="M 44 72 Q 60 84 76 72" stroke="#7C2D12" strokeWidth="1.5" fill="none" />
        </>
      )}

      {profile.hairStyle === "braids-topknot" && (
        <>
          <path
            d="M 38 40 C 38 20, 82 20, 82 40 C 82 30, 75 22, 60 22 C 45 22, 38 30, 38 40 Z"
            fill={profile.hairColor}
          />
          <circle cx="60" cy="15" r="9" fill={profile.hairColor} />
          <rect x="56" y="21" width="8" height="2.5" rx="1" fill="#F59E0B" />
          <line x1="42" y1="36" x2="40" y2="46" stroke={profile.hairColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="78" y1="36" x2="80" y2="46" stroke={profile.hairColor} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="40" cy="44" r="1.5" fill="#F59E0B" />
          <circle cx="80" cy="44" r="1.5" fill="#F59E0B" />
        </>
      )}

      {profile.hairStyle === "curly-afro" && (
        <>
          <path
            d="M 36 40 C 34 16, 86 16, 84 40 C 88 28, 78 14, 60 14 C 42 14, 32 28, 36 40 Z"
            fill={profile.hairColor}
          />
          <circle cx="42" cy="24" r="9" fill={profile.hairColor} />
          <circle cx="60" cy="17" r="10" fill={profile.hairColor} />
          <circle cx="78" cy="24" r="9" fill={profile.hairColor} />
          <circle cx="37" cy="36" r="7" fill={profile.hairColor} />
          <circle cx="83" cy="36" r="7" fill={profile.hairColor} />
        </>
      )}

      {profile.hairStyle === "wavy-long" && (
        <path
          d="M 36 42 C 34 18, 86 18, 84 42 C 88 56, 88 74, 82 82 C 78 62, 75 24, 60 24 C 45 24, 42 62, 38 82 C 32 74, 32 56, 36 42 Z"
          fill={profile.hairColor}
        />
      )}

      {profile.hairStyle === "bob-sleek" && (
        <>
          <path
            d="M 36 42 C 34 16, 86 16, 84 42 C 86 52, 84 58, 82 60 C 79 50, 76 24, 60 24 C 44 24, 41 50, 38 60 C 36 58, 34 52, 36 42 Z"
            fill={profile.hairColor}
          />
          <rect x="74" y="32" width="6" height="2" rx="1" fill="#0D9488" transform="rotate(-15 74 32)" />
        </>
      )}

      {profile.hairStyle === "ponytail" && (
        <>
          <path
            d="M 38 42 C 36 20, 84 20, 82 42 C 84 32, 76 22, 60 22 C 44 22, 36 32, 38 42 Z"
            fill={profile.hairColor}
          />
          <path d="M 78 35 Q 98 40 92 65 Q 86 52 78 45 Z" fill={profile.hairColor} />
          <circle cx="80" cy="38" r="3" fill="#F47A6A" />
        </>
      )}

      {/* Eyebrows */}
      {isBest ? (
        <>
          <path d="M 49 33 Q 54 31 58 33" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 62 33 Q 66 31 71 33" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      ) : chosenOpt !== null ? (
        <>
          <path d="M 49 34 Q 54 36 58 34" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 62 34 Q 66 36 71 34" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M 49 33 Q 54 32 58 33" stroke="#1F2937" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 62 33 Q 66 32 71 33" stroke="#1F2937" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* Eyes */}
      <circle cx="53" cy="40" r="2.5" fill="#1E293B" />
      <circle cx="67" cy="40" r="2.5" fill="#1E293B" />
      <circle cx="54" cy="39" r="0.8" fill="#FFFFFF" />
      <circle cx="68" cy="39" r="0.8" fill="#FFFFFF" />

      {/* Eyeglasses (if present) */}
      {profile.hasGlasses && (
        <>
          <circle cx="53" cy="40" r="6.5" fill="none" stroke={profile.glassesColor || "#64748B"} strokeWidth="1.4" />
          <circle cx="67" cy="40" r="6.5" fill="none" stroke={profile.glassesColor || "#64748B"} strokeWidth="1.4" />
          <line x1="59.5" y1="40" x2="60.5" y2="40" stroke={profile.glassesColor || "#64748B"} strokeWidth="1.4" />
        </>
      )}

      {/* Nose */}
      <path d="M 60 42 L 59 47 L 62 47" stroke={profile.skinShadow} strokeWidth="1.3" fill="none" strokeLinecap="round" />

      {/* Mouth (Natural lips - no red lipstick) */}
      {isBest ? (
        <>
          <path d="M 52 53 Q 60 60 68 53" stroke={profile.skinShadow} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 54 54.5 Q 60 58 66 54.5" stroke={profile.skinShadow} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
        </>
      ) : chosenOpt !== null ? (
        <path d="M 54 55 Q 60 52 66 55" stroke={profile.skinShadow} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      ) : (
        <>
          <path d="M 54 54 Q 60 55.5 66 54" stroke={profile.skinShadow} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 55 55.5 Q 60 57.5 65 55.5" stroke={profile.skinShadow} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5" />
        </>
      )}

      {/* Neck */}
      <rect x="55" y="63" width="10" height="9" fill={profile.skinShadow} />

      {/* Attire */}
      <path
        d="M 34 74 C 34 68, 46 66, 60 66 C 74 66, 86 68, 86 74 L 92 140 L 28 140 Z"
        fill={profile.topColor}
        stroke={profile.topColor}
        strokeWidth="1.5"
      />
      <path d="M 48 68 L 60 82 L 72 68 Z" fill={profile.topAccentColor} />
      <line x1="60" y1="82" x2="60" y2="140" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3,3" />

      {/* Front Box Braids Drape - Anchored Directly to Scalp Roots */}
      {profile.hairStyle === "box-braids" && (
        <g>
          {/* Left Side Braids: Each originating directly from scalp roots inside the hair cap */}
          {/* Inner Left Framing Braid L1: starts inside crown at (45, 23), frames temple and cheek, falls over jacket */}
          <path d="M 45 23 Q 40 36 37 56 Q 36 82 36 112 Q 36 128 36 140" stroke={profile.hairColor} strokeWidth="3.6" fill="none" strokeLinecap="round" />
          <path d="M 45 23 Q 40 36 37 56 Q 36 82 36 112 Q 36 128 36 140" stroke="#374151" strokeWidth="1.2" fill="none" strokeDasharray="3,2.5" />

          {/* Mid Left Braid L2: starts inside crown at (40, 20), contours head, falls over shoulder */}
          <path d="M 40 20 Q 32 38 29 64 Q 28 90 28 116 Q 28 130 29 140" stroke={profile.hairColor} strokeWidth="3.6" fill="none" strokeLinecap="round" />
          <path d="M 40 20 Q 32 38 29 64 Q 28 90 28 116 Q 28 130 29 140" stroke="#374151" strokeWidth="1.2" fill="none" strokeDasharray="3,2.5" />

          {/* Outer Left Braid L3: starts near temple at (36, 24), curves past ear, falls over outer shoulder */}
          <path d="M 36 24 Q 26 44 22 72 Q 20 100 20 122 Q 20 132 21 140" stroke={profile.hairColor} strokeWidth="3.6" fill="none" strokeLinecap="round" />
          <path d="M 36 24 Q 26 44 22 72 Q 20 100 20 122 Q 20 132 21 140" stroke="#374151" strokeWidth="1.2" fill="none" strokeDasharray="3,2.5" />

          {/* Right Side Braids: Each originating directly from scalp roots inside the hair cap */}
          {/* Inner Right Framing Braid R1: starts inside crown at (75, 23), frames temple and cheek, falls over jacket */}
          <path d="M 75 23 Q 80 36 83 56 Q 84 82 84 112 Q 84 128 84 140" stroke={profile.hairColor} strokeWidth="3.6" fill="none" strokeLinecap="round" />
          <path d="M 75 23 Q 80 36 83 56 Q 84 82 84 112 Q 84 128 84 140" stroke="#374151" strokeWidth="1.2" fill="none" strokeDasharray="3,2.5" />

          {/* Mid Right Braid R2: starts inside crown at (80, 20), contours head, falls over shoulder */}
          <path d="M 80 20 Q 88 38 91 64 Q 92 90 92 116 Q 92 130 91 140" stroke={profile.hairColor} strokeWidth="3.6" fill="none" strokeLinecap="round" />
          <path d="M 80 20 Q 88 38 91 64 Q 92 90 92 116 Q 92 130 91 140" stroke="#374151" strokeWidth="1.2" fill="none" strokeDasharray="3,2.5" />

          {/* Outer Right Braid R3: starts near temple at (84, 24), curves past ear, falls over outer shoulder */}
          <path d="M 84 24 Q 94 44 98 72 Q 100 100 100 122 Q 100 132 99 140" stroke={profile.hairColor} strokeWidth="3.6" fill="none" strokeLinecap="round" />
          <path d="M 84 24 Q 94 44 98 72 Q 100 100 100 122 Q 100 132 99 140" stroke="#374151" strokeWidth="1.2" fill="none" strokeDasharray="3,2.5" />

          {/* Stylized Gold Braid Cuffs / Rings clamped on braids */}
          <rect x="27.5" y="74" width="3.2" height="3" rx="0.6" fill="#F59E0B" />
          <rect x="89.5" y="74" width="3.2" height="3" rx="0.6" fill="#F59E0B" />
          <rect x="19.0" y="98" width="3.2" height="3" rx="0.6" fill="#F59E0B" />
          <rect x="98.0" y="98" width="3.2" height="3" rx="0.6" fill="#F59E0B" />
          <rect x="34.5" y="122" width="3.2" height="2.8" rx="0.6" fill="#F59E0B" />
          <rect x="82.5" y="122" width="3.2" height="2.8" rx="0.6" fill="#F59E0B" />
        </g>
      )}

      {/* Patient Evidence Portfolio Tablet / Binder */}
      <g transform="translate(18, 92) rotate(-10)">
        <rect x="0" y="0" width="30" height="38" rx="3" fill="#FFFFFF" stroke={profile.binderColor} strokeWidth="1.5" />
        <rect x="3" y="3" width="24" height="6" fill={profile.binderColor} rx="1" />
        <line x1="4" y1="13" x2="26" y2="13" stroke="#94A3B8" strokeWidth="1.5" />
        <line x1="4" y1="18" x2="22" y2="18" stroke="#94A3B8" strokeWidth="1.5" />
        <line x1="4" y1="23" x2="24" y2="23" stroke="#94A3B8" strokeWidth="1.5" />
        {isBest && <circle cx="20" cy="28" r="5" fill="#059669" />}
      </g>
    </svg>
  );
}

interface RoleplayInteractiveStageProps {
  scenario: RoleplayScenario;
  selectedOption: number | null;
  onSelectOption: (optionIdx: number) => void;
  bonusEarned: boolean;
  simulationIndex?: number;
  totalSimulations?: number;
  simulationTitle?: string;
  onNextSimulation?: () => void;
}

export function RoleplayInteractiveStage({
  scenario,
  selectedOption,
  onSelectOption,
  bonusEarned,
  simulationIndex,
  totalSimulations,
  simulationTitle,
  onNextSimulation,
}: RoleplayInteractiveStageProps) {
  const chosenOpt = selectedOption !== null ? scenario.options[selectedOption] : null;
  const isBest = chosenOpt?.isBest ?? false;

  // Distinct diverse character profiles
  const patientProfile = useMemo(() => {
    if (simulationIndex !== undefined) {
      return DIVERSE_PATIENT_PROFILES[simulationIndex % DIVERSE_PATIENT_PROFILES.length];
    }
    const seed = (scenario.id || scenario.title || scenario.setting || "patient")
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return DIVERSE_PATIENT_PROFILES[seed % DIVERSE_PATIENT_PROFILES.length];
  }, [simulationIndex, scenario.id, scenario.title, scenario.setting]);

  const providerProfile = useMemo(() => {
    return getProviderVisualProfile(scenario.character, scenario.characterRole);
  }, [scenario.character, scenario.characterRole]);

  // Appointment Outcome Percentage: 50% baseline -> 25% dismissal risk -> 100% care plan approved
  const alignmentPercent = chosenOpt === null ? 50 : isBest ? 100 : 25;

  // Helper to determine the evidence strategy of each dialogue option
  const getOptionEvidenceStrategy = (
    opt: { isBest: boolean; text: string },
    optIdx: number
  ) => {
    if (opt.isBest) {
      return {
        type: "best" as const,
        tag: `🎯 Cites Your Evidence (${scenario.evidence?.badge || "Tracked Log"})`,
        desc: "Presents documented metrics & clinical guidelines to compel diagnostic testing.",
        badgeClass: "bg-emerald-100 text-emerald-900 border-emerald-300",
      };
    }

    const isPassive =
      optIdx === 0 ||
      /sorry|guess|won't|embarrassing|whatever|never mind|fine|weak|easiest|less hassle|don't stress/i.test(
        opt.text
      );

    if (isPassive) {
      return {
        type: "passive" as const,
        tag: "📁 Leaves Evidence in Bag (Silent Acceptance)",
        desc: "Keeps your symptom log hidden; accepts dismissal with zero evaluation.",
        badgeClass: "bg-slate-100 text-slate-700 border-slate-300",
      };
    }

    return {
      type: "frustrated" as const,
      tag: "⚠️ Omits Evidence (Venting Without Proof)",
      desc: "Expresses understandable frustration, but without data the clinician can easily dismiss it.",
      badgeClass: "bg-amber-100 text-amber-900 border-amber-300",
    };
  };

  // Dynamic Provider Response that directly reacts to whether evidence was presented
  const getProviderReaction = () => {
    if (chosenOpt === null) return scenario.statement;

    if (isBest) {
      if (scenario.characterRole?.includes("Coach")) {
        return `“I appreciate you sharing this ${scenario.evidence?.badge || "training log"} and the ${scenario.sourceCitation?.organization || "IOC"} guidelines. You're right—amenorrhea is a clinical red flag, not a badge of honor. Let's pull back your mileage and consult the sports dietitian.”`;
      }
      if (scenario.characterRole?.includes("Coordinator")) {
        return `“Thank you for clarifying Title X protections and confidential billing waivers. You are completely right—we will process your visit confidentially with zero mail or Explanation of Benefits sent home.”`;
      }
      if (scenario.characterRole?.includes("Board")) {
        return `“Reviewing these attendance impact statistics and district fiscal data changes the calculation. I will sponsor a motion to include menstrual hygiene dispensers in the district budget.”`;
      }
      return `“Looking at your documented ${scenario.evidence?.title || "symptom log"} and the ${scenario.sourceCitation?.organization || "clinical"} criteria, you meet the standard for an evaluation. Let's order this diagnostic workup today.”`;
    }

    // Suboptimal option
    const isPassive =
      selectedOption === 0 ||
      (chosenOpt &&
        /sorry|guess|won't|embarrassing|whatever|never mind|fine|weak|easiest|less hassle/i.test(
          chosenOpt.text
        ));

    if (isPassive) {
      if (scenario.characterRole?.includes("Coach")) {
        return `“That's the spirit! Keep pushing the pace and don't let anything distract you from the championship meet.”`;
      }
      if (scenario.characterRole?.includes("Coordinator")) {
        return `“Understood. If you'd rather not test through standard insurance, we won't process any screenings today.”`;
      }
      if (scenario.characterRole?.includes("Board")) {
        return `“Thank you for understanding. We must remain fiscally conservative with school district funds.”`;
      }
      return `“Glad we're on the same page. Since you don't have documented tracking or severe red flags to review, we'll just wait and see how things look next year.”`;
    }

    if (scenario.characterRole?.includes("Coach")) {
      return `“There's no need to take that tone with me. If you don't want to follow the training program, that's your decision.”`;
    }
    if (scenario.characterRole?.includes("Coordinator")) {
      return `“I'm just explaining standard clinic billing policies. There is no reason to be combative.”`;
    }
    if (scenario.characterRole?.includes("Board")) {
      return `“Emotional outbursts won't change fiscal realities. Please respect the board's public comment time limits.”`;
    }
    return `“I understand you're frustrated, but without concrete symptom logs or clinical criteria in front of me, standard medical protocol doesn't justify ordering specialized tests today.”`;
  };

  return (
    <div className="space-y-5">
      {/* 1. VISUAL CLINIC ENCOUNTER STAGE (Illustrated Scene) */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-deep-teal/25 bg-gradient-to-b from-[#EBF5F5] via-[#F4FAFA] to-white shadow-md">
        {/* Stage Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-deep-teal/15 bg-white/80 px-4 py-2.5 backdrop-blur-xs">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-deep-teal font-sans">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <span>📍 {scenario.setting}</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {simulationIndex !== undefined && totalSimulations !== undefined && (
              <span className="rounded-full border border-raspberry/30 bg-raspberry/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-raspberry font-sans">
                Stage {simulationIndex + 1} of {totalSimulations}
              </span>
            )}
            <span className="rounded-full border border-deep-teal/15 bg-light-teal/70 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-deep-teal font-sans">
              Clinical Dialogue Simulation
            </span>
            {scenario.characterRole && (
              <span className="rounded-full border border-emerald-600/20 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 font-sans">
                {scenario.characterRole}
              </span>
            )}
          </div>
        </div>

        {/* The Visual Consultation Room Canvas */}
        <div className="relative min-h-[340px] sm:min-h-[380px] p-4 sm:p-6 flex flex-col justify-between">
          {/* Clinic Room Wall Decor Background Elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
            {/* Medical Diploma on Wall */}
            <div className="absolute top-4 left-6 hidden sm:block w-16 h-12 rounded border-2 border-deep-teal/40 bg-white p-1 shadow-2xs">
              <div className="h-1.5 w-8 bg-deep-teal/40 rounded-xs mb-1"></div>
              <div className="h-1 w-12 bg-deep-teal/20 rounded-xs mb-0.5"></div>
              <div className="h-1 w-10 bg-deep-teal/20 rounded-xs"></div>
              <div className="mt-1 flex justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
              </div>
            </div>

            {/* Vitals Heart Rate Monitor */}
            <div className="absolute top-4 right-6 hidden md:block w-32 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-xs text-white">
              <div className="flex items-center justify-between text-[9px] text-emerald-400 font-mono">
                <span className="flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                  ECG
                </span>
                <span>72 BPM</span>
              </div>
              <svg viewBox="0 0 100 20" className="w-full h-4 mt-1 text-emerald-400 stroke-current fill-none stroke-[1.5]">
                <path d="M 0 10 L 25 10 L 30 2 L 35 18 L 40 10 L 65 10 L 70 4 L 75 16 L 80 10 L 100 10" />
              </svg>
            </div>

            {/* Examination Couch silhouette */}
            <div className="absolute bottom-0 right-10 hidden lg:block w-44 h-14 rounded-t-xl border-t-2 border-l-2 border-r-2 border-slate-300 bg-slate-100">
              <div className="w-12 h-4 rounded-t-lg bg-teal-100/70 border-t border-teal-300 ml-2 mt-1"></div>
            </div>
          </div>

          {/* Characters and Dialogue Stage */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-end pb-2">
            {/* LEFT CHARACTER: The Healthcare Provider (Doctor / Clinician) */}
            <div className="flex flex-col items-center sm:items-start space-y-3">
              {/* Doctor Speech Bubble */}
              <div className="relative max-w-sm rounded-2xl border-2 border-deep-teal/30 bg-white p-3.5 sm:p-4 shadow-sm transition-all duration-300">
                <div className="flex items-center justify-between gap-2 border-b border-deep-teal/10 pb-1.5 mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-deep-teal font-sans">
                    {scenario.character}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-charcoal/70">
                    {chosenOpt === null
                      ? "Provider Statement"
                      : isBest
                      ? "✅ Care Plan Approved"
                      : "⚠️ Dismissive Stance"}
                  </span>
                </div>

                <p className="text-sm sm:text-base font-serif text-deep-teal leading-snug m-0">
                  {getProviderReaction()}
                </p>

                {/* Speech Bubble Tail */}
                <div className="absolute -bottom-2.5 left-8 w-4 h-4 bg-white border-b-2 border-r-2 border-deep-teal/30 rotate-45"></div>
              </div>

              {/* Doctor Character Visual (SVG Illustration) */}
              <div className="flex items-end gap-3 pl-3">
                <div className="relative group">
                  <ProviderAvatarSvg profile={providerProfile} isBest={isBest} chosenOpt={chosenOpt} />
                  {/* Character Role Pill Badge under avatar */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-deep-teal px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                    {scenario.character}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CHARACTER: The Patient Advocate (Youth Athlete / Self-Advocate) */}
            <div className="flex flex-col items-center sm:items-end space-y-3">
              {/* Patient Speech Bubble (Populates upon choice) */}
              <div
                className={`relative max-w-sm rounded-2xl border-2 p-3.5 sm:p-4 shadow-sm transition-all duration-300 ${
                  chosenOpt === null
                    ? "border-dashed border-deep-teal/25 bg-white/70"
                    : isBest
                    ? "border-emerald-500 bg-emerald-50/90 text-emerald-950 ring-2 ring-emerald-500/20"
                    : "border-amber-400 bg-amber-50/90 text-amber-950"
                }`}
              >
                <div className="flex items-center justify-between gap-2 border-b border-deep-teal/10 pb-1.5 mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/80 font-sans flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-deep-teal" />
                    {patientProfile.name}&apos;s Advocacy Voice
                  </span>
                  {chosenOpt !== null && (
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        isBest ? "bg-emerald-600 text-white" : "bg-amber-600 text-white"
                      }`}
                    >
                      {isBest ? "✅ Correct Response" : "❌ Suboptimal Response"}
                    </span>
                  )}
                </div>

                <p className="text-sm sm:text-base font-sans leading-snug m-0">
                  {chosenOpt === null ? (
                    <span className="italic text-charcoal/60">
                      Tap one of the responses below to speak up and advocate for your clinical needs!
                    </span>
                  ) : (
                    <span>{chosenOpt.text}</span>
                  )}
                </p>

                {/* Speech Bubble Tail */}
                <div
                  className={`absolute -bottom-2.5 right-8 w-4 h-4 border-b-2 border-r-2 rotate-45 ${
                    isBest
                      ? "bg-emerald-50 border-emerald-500"
                      : chosenOpt !== null
                      ? "bg-amber-50 border-amber-400"
                      : "bg-white border-deep-teal/25"
                  }`}
                ></div>
              </div>

              {/* Patient Character Visual (SVG Illustration) */}
              <div className="flex items-end gap-3 pr-3">
                <div className="relative group">
                  <PatientAvatarSvg profile={patientProfile} isBest={isBest} chosenOpt={chosenOpt} />
                  {/* Character Label */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-coral px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                    {patientProfile.name} · {patientProfile.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC APPOINTMENT CARE METER (Likelihood of Action vs. Dismissal) */}
      {(() => {
        const statusConfig =
          chosenOpt === null
            ? {
                title: "Pending Your Response (50% Baseline)",
                sub: "Every appointment starts here. Presenting objective data from your evidence log is what moves the needle from being dismissed to getting tested.",
                badgeBg: "bg-slate-100 text-slate-800 border-slate-300",
                barColor: "bg-deep-teal",
              }
            : isBest
            ? {
                title: "✅ Correct: Care Plan Approved! (100%)",
                sub: "Full medical evaluation ordered! By citing documented tracking and clinical standards, you gave the clinician objective evidence they cannot ethically or legally ignore.",
                badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
                barColor: "bg-emerald-600",
              }
            : {
                title: "❌ Incorrect: High Dismissal Risk (25%)",
                sub: "Symptoms brushed off without testing! Without documented logs or clinical guidelines, the provider defaulted to reassurance or “wait and see.” No diagnostic evaluation was ordered.",
                badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
                barColor: "bg-amber-500",
              };

        return (
          <div className="rounded-3xl border-2 border-deep-teal/20 bg-white p-4 sm:p-5 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-deep-teal" />
                <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-deep-teal font-sans">
                  Appointment Outcome Meter: Medical Action vs. Dismissal
                </span>
              </div>
              <span
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border font-sans ${statusConfig.badgeBg}`}
              >
                {statusConfig.title}
              </span>
            </div>

            {/* Visual Alignment Meter Track */}
            <div className="space-y-1.5">
              <div className="relative h-3.5 w-full rounded-full border border-slate-200 bg-slate-100 p-0.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${statusConfig.barColor}`}
                  style={{ width: `${alignmentPercent}%` }}
                />
              </div>
              <div className="flex justify-between px-1 text-[11px] font-sans font-semibold text-charcoal/60">
                <span className={alignmentPercent <= 35 ? "font-bold text-amber-700" : ""}>
                  Brushed Off · High Dismissal Risk (0–35%)
                </span>
                <span
                  className={
                    alignmentPercent > 35 && alignmentPercent <= 70
                      ? "font-bold text-deep-teal"
                      : ""
                  }
                >
                  Uncertain · “Wait & See” (36–70%)
                </span>
                <span className={alignmentPercent > 70 ? "font-bold text-emerald-700" : ""}>
                  Taken Seriously · Care Plan Approved (71–100%)
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-charcoal/80 font-sans m-0">
              {statusConfig.sub}
            </p>
          </div>
        );
      })()}

      {/* 3. PATIENT EVIDENCE DECK (Documented Clinical Portfolio) */}
      {scenario.evidence && (
        <div
          className={`rounded-3xl border-2 p-5 sm:p-6 transition-all shadow-2xs space-y-3.5 ${
            chosenOpt === null
              ? "border-dashed border-deep-teal/30 bg-slate-50/90"
              : isBest
              ? "border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-500/20 shadow-sm"
              : "border-amber-300 bg-amber-50/70"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shadow-2xs ${
                  isBest ? "bg-emerald-600 text-white" : "bg-deep-teal text-white"
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-deep-teal/80 font-sans">
                  Your Clinical Evidence Deck
                </span>
                <span className="text-xs sm:text-sm font-bold text-charcoal font-sans">
                  {scenario.evidence.title}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full border border-deep-teal/20 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-deep-teal font-sans shadow-2xs">
                {scenario.evidence.badge}
              </span>
              {isBest && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-2xs font-sans">
                  <Check className="w-3 h-3" />
                  <span>Admitted to Medical Chart</span>
                </span>
              )}
            </div>
          </div>

          {/* Documented Evidence Guidance */}
          <div className="rounded-2xl border border-deep-teal/20 bg-teal-50/75 p-3.5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal font-sans">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Why Documented Evidence Matters in Clinical Encounters:</span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed font-sans m-0">
              Doctors cannot diagnose based on vague impressions alone—clinical standards require{" "}
              <strong className="text-deep-teal font-semibold">verifiable data</strong>{" "}
              (frequency, pain scales, durations, and diagnostic criteria). Review your documented portfolio above, then choose the dialogue response below that most effectively advocates for your care.
            </p>
          </div>

          {/* Metric Highlight Box */}
          <div className="flex items-center gap-2.5 rounded-2xl border border-deep-teal/15 bg-white/95 p-3 sm:p-3.5">
            <TrendingUp className="w-4 h-4 shrink-0 text-deep-teal" />
            <span className="text-xs sm:text-sm font-bold text-deep-teal font-sans">
              Documented Record: <span className="font-medium text-charcoal">{scenario.evidence.metric}</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed font-sans m-0">
            {scenario.evidence.description}
          </p>

          <div className="pt-0.5 text-[11px] font-bold font-sans">
            {chosenOpt === null ? (
              <span className="flex items-center gap-1.5 text-deep-teal">
                <Sparkles className="w-3.5 h-3.5" />
                Evidence Ready in Hand: Review your records above, then choose the response below that best presents this data to your provider!
              </span>
            ) : isBest ? (
              <span className="flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ✅ Correct: Evidence admitted to medical record! Clinicians cannot legally ignore documented symptoms matching clinical guidelines.
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-amber-800">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                ❌ Incorrect: Documented evidence was not cited. Try selecting a response that actively references this log!
              </span>
            )}
          </div>
        </div>
      )}

      {/* 4. ADVOCACY RESPONSE CHOICES */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="block text-base sm:text-lg font-bold text-charcoal/90 font-sans">
            How do you respond to advocate for yourself?
          </span>
          <span className="text-xs font-semibold text-charcoal/60 font-sans">
            {chosenOpt === null
              ? "3 Dialogue Options · Select the best clinical response"
              : isBest
              ? "✅ Correct Option Selected"
              : "❌ Suboptimal Option · Review explanation below"}
          </span>
        </div>

        <div className="space-y-3">
          {scenario.options.map((opt, optIdx) => {
            const isSelected = selectedOption === optIdx;
            const optionLabels = ["Option A", "Option B", "Option C"];
            const strategy = getOptionEvidenceStrategy(opt, optIdx);

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => onSelectOption(optIdx)}
                className={`w-full rounded-3xl border-2 p-5 sm:p-6 text-left transition-all cursor-pointer shadow-2xs ${
                  isSelected
                    ? opt.isBest
                      ? "border-emerald-500 bg-emerald-50/90 shadow-md ring-2 ring-emerald-500/25"
                      : "border-amber-400 bg-amber-50/90 shadow-sm ring-2 ring-amber-400/25"
                    : selectedOption !== null
                    ? "border-deep-teal/15 bg-white/85 opacity-80 hover:opacity-100 hover:border-deep-teal/40 hover:bg-light-teal/20"
                    : "border-deep-teal/15 bg-white hover:border-deep-teal/40 hover:bg-light-teal/20"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider font-sans ${
                          isSelected
                            ? opt.isBest
                              ? "bg-emerald-200/90 text-emerald-950 border border-emerald-300"
                              : "bg-amber-200/90 text-amber-950 border border-amber-300"
                            : "bg-slate-100 text-charcoal/70 border border-slate-200"
                        }`}
                      >
                        {optionLabels[optIdx] || `Option ${optIdx + 1}`}
                      </span>

                      {/* Result and Strategy badges: ONLY revealed AFTER selection */}
                      {isSelected && (
                        <>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider font-sans text-white ${
                              opt.isBest ? "bg-emerald-600" : "bg-amber-600"
                            }`}
                          >
                            {opt.isBest ? "✅ Correct" : "❌ Incorrect"}
                          </span>

                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border font-sans ${strategy.badgeClass}`}
                          >
                            {strategy.tag}
                          </span>
                        </>
                      )}
                    </div>

                    <p
                      className={`text-base sm:text-lg md:text-[19px] leading-relaxed font-sans m-0 ${
                        isSelected && opt.isBest
                          ? "font-semibold text-emerald-950"
                          : isSelected && !opt.isBest
                          ? "font-semibold text-amber-950"
                          : "font-medium text-charcoal/90"
                      }`}
                    >
                      {opt.text}
                    </p>

                    {/* Explanatory description: ONLY revealed AFTER selection */}
                    {isSelected && (
                      <p
                        className={`text-xs font-sans m-0 pt-0.5 ${
                          opt.isBest ? "text-emerald-900 font-medium" : "text-amber-900 font-medium"
                        }`}
                      >
                        💡 {strategy.desc}
                      </p>
                    )}
                  </div>

                  {isSelected && opt.isBest && (
                    <span className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-2xs font-sans">
                      <Check className="w-3.5 h-3.5" />
                      <span>+{opt.xpBonus} XP</span>
                    </span>
                  )}
                  {isSelected && !opt.isBest && (
                    <span className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-2xs font-sans">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>0 XP</span>
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. CLINICAL FEEDBACK & COACHING CARD */}
      {chosenOpt !== null && (
        <div
          className={`rounded-3xl border-2 p-5 sm:p-6 space-y-3 animate-in fade-in ${
            isBest
              ? "border-emerald-400 bg-emerald-50 text-emerald-950"
              : "border-amber-400 bg-amber-50 text-amber-950"
          }`}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              {isBest ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-700" />
              ) : (
                <AlertTriangle className="w-5 h-5 shrink-0 text-amber-700" />
              )}
              <span className="text-sm sm:text-base font-bold uppercase tracking-wider font-sans">
                {isBest ? "✅ Correct — Self-Advocacy Goal Achieved!" : "❌ Incorrect — Medical Dismissal Risk"}
              </span>
            </div>
            {isBest ? (
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-2xs font-sans">
                +{chosenOpt.xpBonus} XP Earned
              </span>
            ) : (
              <span className="rounded-full bg-amber-200 border border-amber-300 px-3 py-1 text-xs font-bold text-amber-900 font-sans">
                Suboptimal Response · Try Again
              </span>
            )}
          </div>

          <p className="text-base sm:text-lg md:text-[19px] leading-relaxed font-sans m-0">
            {chosenOpt.feedback}
          </p>

          {/* Evidence Impact Breakdown */}
          {isBest ? (
            <div className="mt-2 rounded-2xl border border-emerald-300/80 bg-white/95 p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900 font-sans">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Why This Response Succeeded:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                <div className="rounded-xl bg-emerald-50/80 p-2.5 border border-emerald-200">
                  <span className="font-bold text-emerald-950 block">📊 Objective Data Cited:</span>
                  <span className="text-charcoal/80">{scenario.evidence?.metric}</span>
                </div>
                <div className="rounded-xl bg-emerald-50/80 p-2.5 border border-emerald-200">
                  <span className="font-bold text-emerald-950 block">📋 Clinical Guideline Cited:</span>
                  <span className="text-charcoal/80">
                    {scenario.sourceCitation?.guideline ||
                      scenario.sourceCitation?.organization ||
                      "Clinical Practice Guidance"}
                  </span>
                </div>
              </div>
              <p className="text-xs text-charcoal/80 leading-relaxed font-sans m-0 pt-0.5">
                <strong>The Medical Takeaway:</strong> Clinicians are bound by clinical practice guidelines. Presenting structured logs converts subjective complaints into documented medical necessity that requires investigation and testing.
              </p>
              {onNextSimulation && simulationIndex !== undefined && totalSimulations !== undefined && simulationIndex < totalSimulations - 1 && (
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={onNextSimulation}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer font-sans"
                  >
                    <span>Advance to Simulation {simulationIndex + 2}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-2 rounded-2xl border border-amber-300/80 bg-white/95 p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 font-sans">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Why This Response Was Dismissed:</span>
              </div>
              <div className="rounded-xl bg-amber-50/80 p-2.5 border border-amber-200 text-xs font-sans space-y-1">
                <span className="font-bold text-amber-950 block">
                  Unused Documented Evidence: {scenario.evidence?.title}
                </span>
                <p className="text-charcoal/80 m-0">
                  Your documented record ({scenario.evidence?.metric}) stayed hidden in your bag. Because doctors see patients for only 12–15 minutes, they default to “it’s probably normal” unless you present verifiable numbers.
                </p>
              </div>
              <p className="text-xs text-charcoal/80 leading-relaxed font-sans m-0 pt-0.5">
                <strong>Try Again:</strong> Choose another dialogue option above to see how presenting your documented {scenario.evidence?.badge || "records"} changes the clinician’s decision and secures an evaluation!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
