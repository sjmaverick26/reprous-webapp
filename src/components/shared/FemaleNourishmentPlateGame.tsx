"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Utensils,
  ShieldCheck,
  Activity,
  Clock,
  RotateCcw,
  Check,
  Flame,
  Zap,
  Award,
  Info,
  Heart,
  Volume2,
  VolumeX,
  Music,
  Trophy,
  Play,
  ArrowRight,
  HelpCircle,
  Keyboard,
} from "lucide-react";
import { useSoftNutritionMusic } from "@/lib/softNutritionMusic";

// ============================================================================
// FOOD GROUP DEFINITIONS & TYPES
// ============================================================================

export type FoodGroupId = "carbs" | "protein" | "fats" | "greens" | "fruits";

export interface FoodGroupData {
  id: FoodGroupId;
  name: string;
  shortName: string;
  hotkey: string;
  badge: string;
  platePercentage: string;
  sliceStart: number;
  sliceEnd: number;
  colorHex: string;
  bgLight: string;
  borderColor: string;
  textColor: string;
  biologicalPurpose: string;
  femaleBodyBenefits: string[];
  clinicalSignificance: string;
  keyNutrients: string;
  wholeFoods: {
    id: string;
    name: string;
    description: string;
    femaleImpact: string;
  }[];
}

export const FEMALE_FOOD_GROUPS: Record<FoodGroupId, FoodGroupData> = {
  carbs: {
    id: "carbs",
    name: "Complex Carbohydrates & Whole Grains",
    shortName: "Complex Carbs",
    hotkey: "1",
    badge: "Hypothalamus & Energy Fuel",
    platePercentage: "25–35%",
    sliceStart: 0,
    sliceEnd: 95,
    colorHex: "#F59E0B",
    bgLight: "bg-amber-50",
    borderColor: "border-amber-300",
    textColor: "text-amber-900",
    biologicalPurpose:
      "Provides sustained muscular glycogen, feeds central nervous system glucose requirements, and prevents exercise-induced spikes in cortisol.",
    femaleBodyBenefits: [
      "Kisspeptin Activation: Carbohydrate availability is the direct biological switch for kisspeptin neurons in the brain. If carbs are restricted, kisspeptin shuts down GnRH release, halting ovulation and stopping periods (hypothalamic amenorrhea).",
      "Thyroid T3 Conversion: Active thyroid hormone (T3) synthesis in the liver depends upon adequate glucose; low carbs slow metabolic rate and disrupt menstrual rhythm.",
      "Luteal Serotonin Support: Promotes brain tryptophan transport to produce serotonin, easing late-luteal irritability, sleep disturbances, and intense premenstrual cravings.",
    ],
    clinicalSignificance:
      "The International Olympic Committee (IOC) consensus on RED-S identifies low carbohydrate availability as the primary trigger for female neuroendocrine disruption and bone demineralization.",
    keyNutrients: "Slow-burn starches, beta-glucan fiber, magnesium, B vitamins, iron",
    wholeFoods: [
      {
        id: "sweet_potato",
        name: "Roasted Sweet Potatoes",
        description: "Packed with beta-carotene, potassium, and slow-digesting complex starches.",
        femaleImpact: "Sustains steady blood glucose to keep hypothalamic GnRH pulsing regularly.",
      },
      {
        id: "steel_cut_oats",
        name: "Steel-Cut Rolled Oats",
        description: "Rich in soluble beta-glucan fiber and B-complex vitamins.",
        femaleImpact: "Binds excess metabolized estrogen in the digestive tract for regular hormonal elimination.",
      },
      {
        id: "quinoa_grain",
        name: "Quinoa & Grain Blend",
        description: "Complete plant protein providing all 9 amino acids, magnesium, and iron.",
        femaleImpact: "High magnesium relaxes uterine smooth muscle, preventing severe menstrual cramps.",
      },
      {
        id: "sourdough_bread",
        name: "Artisan Sourdough Bread",
        description: "Naturally fermented for easy digestion and low glycemic impact.",
        femaleImpact: "Avoids insulin spikes that stimulate ovarian theca cells to overproduce androgens.",
      },
    ],
  },
  protein: {
    id: "protein",
    name: "Lean & Hormone-Building Proteins",
    shortName: "Lean Protein",
    hotkey: "2",
    badge: "Tissue Repair & Hormone Building",
    platePercentage: "25%",
    sliceStart: 95,
    sliceEnd: 185,
    colorHex: "#F43F5E",
    bgLight: "bg-rose-50",
    borderColor: "border-rose-300",
    textColor: "text-rose-900",
    biologicalPurpose:
      "Supplies essential amino acids (leucine, lysine, methionine) required to reconstruct muscle fibers, synthesize cellular enzymes, and produce peptide hormones.",
    femaleBodyBenefits: [
      "Steroid Hormone Building Blocks: Whole eggs, wild fish, and poultry supply dietary cholesterol and choline, the fundamental biochemical precursors your ovaries use to manufacture estrogen and progesterone.",
      "Menstrual Iron & Ferritin Recovery: Provides bioavailable heme and non-heme iron to replace the 15–40 mg of iron lost during monthly menstruation, preventing sports anemia, hair shedding, and fatigue.",
      "Pelvic & Ligament Resilience: High-estrogen phases increase joint laxity (especially the ACL); continuous amino acid intake accelerates collagen remodeling and protects soft tissues.",
    ],
    clinicalSignificance:
      "Endocrine research shows female athletes require 1.4–2.0 g/kg of protein daily to protect lean mass and maintain healthy ovarian follicle development.",
    keyNutrients: "Complete amino acids, heme iron, choline, zinc, vitamin B12",
    wholeFoods: [
      {
        id: "wild_salmon",
        name: "Wild Sockeye Salmon",
        description: "Rich in high-potency marine Omega-3 fatty acids and complete bioavailable protein.",
        femaleImpact: "Suppresses inflammatory uterine prostaglandins to relieve primary dysmenorrhea.",
      },
      {
        id: "pastured_eggs",
        name: "Pasture-Raised Eggs",
        description: "Contains whole yolk choline, vitamin D3, and essential cholesterol.",
        femaleImpact: "Delivers direct cholesterol substrate required by the ovaries for steroid hormone production.",
      },
      {
        id: "edamame_beans",
        name: "Steamed Edamame & Lentils",
        description: "Plant-based protein rich in folate, iron, and protective phyto-nutrients.",
        femaleImpact: "Supports healthy cellular DNA synthesis and gently balances estrogen receptor activity.",
      },
      {
        id: "organic_tempeh",
        name: "Organic Tempeh",
        description: "Fermented soy delivering easily digestible amino acids, calcium, and isoflavones.",
        femaleImpact: "Provides bone-building calcium and natural phytoestrogens that support vascular health.",
      },
    ],
  },
  fats: {
    id: "fats",
    name: "Essential Healthy Fats & Lipids",
    shortName: "Healthy Fats",
    hotkey: "3",
    badge: "Hormone Precursors & Anti-Inflammatory",
    platePercentage: "15–20%",
    sliceStart: 185,
    sliceEnd: 245,
    colorHex: "#84CC16",
    bgLight: "bg-lime-50",
    borderColor: "border-lime-300",
    textColor: "text-lime-900",
    biologicalPurpose:
      "Forms the lipid bilayer of every human cell membrane, slows gastric emptying for balanced satiety, and transports fat-soluble vitamins (A, D, E, and K).",
    femaleBodyBenefits: [
      "Prostaglandin Modulation: Omega-3 fatty acids (EPA/DHA) displace arachidonic acid in uterine tissues, down-regulating inflammatory prostaglandin F2-alpha (PGF2α) to stop debilitating uterine cramping.",
      "Follicular Maturation: Polyunsaturated fatty acids optimize ovarian micro-circulation, nurturing follicle development for regular ovulation and optimal luteal phase length.",
      "Endometrial Blood Flow: Monounsaturated oleic acid supports vascular endothelial nitric oxide release, enhancing blood supply to pelvic organs.",
    ],
    clinicalSignificance:
      "Diets with less than 20% healthy fat suppress circulating estradiol and luteinizing hormone (LH), significantly increasing the risk of anovulatory cycles.",
    keyNutrients: "Omega-3 (ALA/EPA/DHA), monounsaturated oleic acid, vitamin E, squalene",
    wholeFoods: [
      {
        id: "avocado",
        name: "Fresh Avocado",
        description: "Abundant in monounsaturated fats, potassium, and lipid-soluble vitamin E.",
        femaleImpact: "Cushions reproductive pelvic organs and maintains flexible vascular endothelial tissue.",
      },
      {
        id: "extra_virgin_olive_oil",
        name: "Extra Virgin Olive Oil",
        description: "Cold-pressed oil high in oleocanthal and polyphenolic antioxidants.",
        femaleImpact: "Natural anti-inflammatory that mimics low-dose NSAIDs without stressing gastric lining.",
      },
      {
        id: "walnuts",
        name: "Raw English Walnuts",
        description: "Packed with plant alpha-linolenic acid (ALA), zinc, and lignans.",
        femaleImpact: "Zinc fuels ovarian follicle development and bolsters healthy luteal progesterone output.",
      },
      {
        id: "chia_seeds",
        name: "Black Chia Seeds",
        description: "Hydrophilic seeds packed with plant calcium, ALA lipids, and soluble fiber.",
        femaleImpact: "Supplies plant calcium to maintain bone density and support smooth muscle relaxation.",
      },
    ],
  },
  greens: {
    id: "greens",
    name: "Fiber & Hormone-Clearing Greens",
    shortName: "Fiber Greens",
    hotkey: "4",
    badge: "Estrogen Clearance & Bone Matrix",
    platePercentage: "20–25%",
    sliceStart: 245,
    sliceEnd: 315,
    colorHex: "#10B981",
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-300",
    textColor: "text-emerald-900",
    biologicalPurpose:
      "Supplies prebiotic fiber for the intestinal microbiome, essential bioflavonoids, natural nitrates for blood flow, and critical micronutrients for bone mineralization.",
    femaleBodyBenefits: [
      "Hepatic Estrogen Clearance: Cruciferous greens deliver indole-3-carbinol (I3C) and diindolylmethane (DIM), which stimulate liver CYP1A1 enzymes to convert estrogen into protective 2-hydroxyestrone, preventing estrogen dominance, heavy cycles, and breast tenderness.",
      "Bone Matrix Reinforcement: Greens provide vitamin K1 and highly bioavailable calcium, anchoring minerals into bone tissue to prevent stress fractures during athletic training.",
      "Gut Microbiome Estrobolome: Prebiotic plant fibers nurture gut bacteria that regulate the deconjugation of circulating hormones, ensuring healthy elimination.",
    ],
    clinicalSignificance:
      "Clinical trials confirm women consuming adequate cruciferous vegetables show significantly healthier 2:16 alpha-hydroxyestrone ratios, lowering reproductive health risks.",
    keyNutrients: "Indole-3-carbinol, diindolylmethane (DIM), calcium, vitamin K1, folate",
    wholeFoods: [
      {
        id: "baby_spinach",
        name: "Dark Baby Spinach",
        description: "Tender leaves high in plant non-heme iron, magnesium, and dietary folate.",
        femaleImpact: "Replenishes red blood cell oxygenation after menstrual flow and relieves muscle tension.",
      },
      {
        id: "broccoli_florets",
        name: "Steamed Broccoli",
        description: "Cruciferous vegetable loaded with glucosinolates and sulfur compounds.",
        femaleImpact: "Powers phase 1 and 2 liver pathways to metabolize and safely eliminate used estrogen.",
      },
      {
        id: "tuscan_kale",
        name: "Tuscan Baby Kale",
        description: "Dense dark leafy green loaded with calcium, vitamin K1, and lutein.",
        femaleImpact: "Deposits calcium directly into bones to build an unbreakable skeletal foundation.",
      },
      {
        id: "bok_choy",
        name: "Crisp Bok Choy",
        description: "Mild Asian cruciferous green rich in bioavailable calcium and vitamin C.",
        femaleImpact: "Delivers non-dairy calcium easily absorbed by the digestive tract for muscle recovery.",
      },
    ],
  },
  fruits: {
    id: "fruits",
    name: "Antioxidant Fruits & Phytonutrients",
    shortName: "Antioxidant Fruits",
    hotkey: "5",
    badge: "Cellular Shield & Iron Booster",
    platePercentage: "10–15%",
    sliceStart: 315,
    sliceEnd: 360,
    colorHex: "#8B5CF6",
    bgLight: "bg-violet-50",
    borderColor: "border-violet-300",
    textColor: "text-violet-900",
    biologicalPurpose:
      "Neutralizes reactive oxygen species (ROS), speeds recovery between demanding workouts, and protects cellular DNA from oxidative damage.",
    femaleBodyBenefits: [
      "3x Iron Absorption Booster: Vitamin C in berries and citrus converts dietary ferric iron (Fe3+) into absorbable ferrous iron (Fe2+), tripling plant iron uptake to prevent sports anemia.",
      "Collagen & Pelvic Floor Synthesis: Ascorbic acid is a required cofactor for prolyl and lysyl hydroxylase, synthesizing collagen to maintain pelvic organ support and tendon elasticity.",
      "Nocturnal Temperature & Deep Sleep: Tart cherries and wild berries provide natural phytomelatonin, helping lower elevated luteal body temperature for deep regenerative sleep.",
    ],
    clinicalSignificance:
      "Consuming 75 mg of dietary vitamin C with meals enhances non-heme iron absorption by approximately 300% in menstruating adolescent and adult athletes.",
    keyNutrients: "Anthocyanins, vitamin C, polyphenols, quercetin, natural phytomelatonin",
    wholeFoods: [
      {
        id: "wild_blueberries",
        name: "Wild Blueberries",
        description: "Antioxidant-dense berries rich in deep anthocyanins and polyphenols.",
        femaleImpact: "Quenches cellular inflammation and protects ovarian granulosa cells from oxidative stress.",
      },
      {
        id: "tart_cherries",
        name: "Montmorency Tart Cherries",
        description: "Natural source of phytomelatonin and potent anthocyanin flavonoids.",
        femaleImpact: "Promotes restorative sleep and regulates circadian rhythms to lower cortisol spikes.",
      },
      {
        id: "ruby_grapefruit",
        name: "Ruby Red Grapefruit",
        description: "Citrus fruits bursting with vitamin C, bioflavonoids, and hydration.",
        femaleImpact: "Triples iron absorption from plant greens and builds resilient ligament collagen.",
      },
      {
        id: "pomegranate_seeds",
        name: "Pomegranate Arils",
        description: "Tart arils packed with punicalagins, polyphenols, and dietary fiber.",
        femaleImpact: "Supports healthy pelvic microvascular circulation and reduces systemic inflammation.",
      },
    ],
  },
};

// ============================================================================
// 24 WHOLE FOOD ITEMS FOR SPEED SORTING GAME
// ============================================================================

export interface SortingFoodItem {
  id: string;
  name: string;
  groupId: FoodGroupId;
  categoryLabel: string;
}

export const SPEED_SORTING_FOODS: SortingFoodItem[] = [
  { id: "sweet_potato", name: "Roasted Sweet Potato", groupId: "carbs", categoryLabel: "Complex Carbs" },
  { id: "wild_salmon", name: "Wild Sockeye Salmon", groupId: "protein", categoryLabel: "Lean Protein" },
  { id: "avocado", name: "Fresh Avocado", groupId: "fats", categoryLabel: "Healthy Fats" },
  { id: "baby_spinach", name: "Dark Baby Spinach", groupId: "greens", categoryLabel: "Fiber Greens" },
  { id: "wild_blueberries", name: "Wild Blueberries", groupId: "fruits", categoryLabel: "Antioxidant Fruits" },
  { id: "steel_cut_oats", name: "Steel-Cut Rolled Oats", groupId: "carbs", categoryLabel: "Complex Carbs" },
  { id: "pastured_eggs", name: "Pasture-Raised Eggs", groupId: "protein", categoryLabel: "Lean Protein" },
  { id: "extra_virgin_olive_oil", name: "Extra Virgin Olive Oil", groupId: "fats", categoryLabel: "Healthy Fats" },
  { id: "broccoli_florets", name: "Steamed Broccoli", groupId: "greens", categoryLabel: "Fiber Greens" },
  { id: "tart_cherries", name: "Montmorency Cherries", groupId: "fruits", categoryLabel: "Antioxidant Fruits" },
  { id: "quinoa_grain", name: "Tri-Color Quinoa", groupId: "carbs", categoryLabel: "Complex Carbs" },
  { id: "organic_tempeh", name: "Organic Tempeh", groupId: "protein", categoryLabel: "Lean Protein" },
  { id: "walnuts", name: "Raw English Walnuts", groupId: "fats", categoryLabel: "Healthy Fats" },
  { id: "tuscan_kale", name: "Tuscan Baby Kale", groupId: "greens", categoryLabel: "Fiber Greens" },
  { id: "ruby_grapefruit", name: "Ruby Red Grapefruit", groupId: "fruits", categoryLabel: "Antioxidant Fruits" },
  { id: "sourdough_bread", name: "Artisan Sourdough", groupId: "carbs", categoryLabel: "Complex Carbs" },
  { id: "edamame_beans", name: "Steamed Edamame", groupId: "protein", categoryLabel: "Lean Protein" },
  { id: "chia_seeds", name: "Black Chia Seeds", groupId: "fats", categoryLabel: "Healthy Fats" },
  { id: "bok_choy", name: "Crisp Baby Bok Choy", groupId: "greens", categoryLabel: "Fiber Greens" },
  { id: "pomegranate_seeds", name: "Pomegranate Arils", groupId: "fruits", categoryLabel: "Antioxidant Fruits" },
  { id: "butternut_squash", name: "Butternut Squash", groupId: "carbs", categoryLabel: "Complex Carbs" },
  { id: "greek_yogurt", name: "Plain Greek Yogurt", groupId: "protein", categoryLabel: "Lean Protein" },
  { id: "flaxseeds", name: "Golden Flaxseeds", groupId: "fats", categoryLabel: "Healthy Fats" },
  { id: "asparagus_spears", name: "Tender Asparagus", groupId: "greens", categoryLabel: "Fiber Greens" },
];

// ============================================================================
// PURE VECTOR SVG DRAWINGS FOR ALL 24 WHOLE FOODS (STRICT NO EMOJIS)
// ============================================================================

export function FoodVectorSvg({
  id,
  className = "w-full h-full",
}: {
  id: string;
  className?: string;
}) {
  switch (id) {
    case "sweet_potato":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <ellipse cx="32" cy="34" rx="26" ry="16" transform="rotate(-15 32 34)" fill="#9A3412" stroke="#7C2D12" strokeWidth="1.5" />
          <ellipse cx="32" cy="34" rx="21" ry="12" transform="rotate(-15 32 34)" fill="#EA580C" />
          <ellipse cx="32" cy="34" rx="15" ry="8" transform="rotate(-15 32 34)" fill="#FB923C" />
          <circle cx="28" cy="32" r="1.5" fill="#7C2D12" />
          <circle cx="36" cy="36" r="1.2" fill="#7C2D12" />
          <path d="M 28 16 Q 26 11 29 7" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 35 15 Q 37 10 34 6" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "wild_salmon":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 12 36 C 16 22 36 20 48 24 C 54 27 54 37 48 42 C 34 46 18 45 12 36 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.5" />
          <path d="M 12 36 C 18 43 32 45 48 42" stroke="#881337" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 22 27 C 26 32 28 39 28 42" stroke="#FFE4E6" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 31 25 C 35 31 37 38 37 42" stroke="#FFE4E6" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 40 26 C 43 31 44 38 45 41" stroke="#FFE4E6" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 38 43 A 9 9 0 0 1 48 43 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
          <circle cx="43" cy="41" r="1.5" fill="#FEF08A" />
        </svg>
      );

    case "avocado":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 32 10 C 21 10 15 22 15 36 C 15 48 22 54 32 54 C 42 54 49 48 49 36 C 49 22 43 10 32 10 Z" fill="#365314" stroke="#1A2E05" strokeWidth="1.5" />
          <path d="M 32 14 C 23 14 19 24 19 36 C 19 46 24 50 32 50 C 40 50 45 46 45 36 C 45 24 41 14 32 14 Z" fill="#84CC16" />
          <path d="M 32 20 C 26 20 23 28 23 37 C 23 44 26 47 32 47 C 38 47 41 44 41 37 C 41 28 38 20 32 20 Z" fill="#D9F99D" />
          <circle cx="32" cy="38" r="9" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
          <circle cx="29" cy="35" r="2.5" fill="#92400E" />
          <circle cx="28" cy="34" r="1" fill="#D97706" />
        </svg>
      );

    case "baby_spinach":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 22 48 C 14 38 16 22 30 18 C 40 22 40 38 34 48 Z" fill="#15803D" stroke="#14532D" strokeWidth="1.2" />
          <path d="M 28 52 C 20 40 24 24 38 18 C 50 24 50 42 42 52 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.5" />
          <path d="M 34 22 L 32 52" stroke="#BBF7D0" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 33 30 Q 38 27 42 29" stroke="#BBF7D0" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 33 38 Q 28 35 26 37" stroke="#BBF7D0" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 32 44 Q 38 42 41 44" stroke="#BBF7D0" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "wild_blueberries":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 32 14 C 40 12 46 16 46 24 C 38 24 34 20 32 14 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.2" />
          <circle cx="24" cy="30" r="10" fill="#1E3A8A" stroke="#172554" strokeWidth="1.5" />
          <circle cx="22" cy="27" r="2.5" fill="#60A5FA" opacity="0.6" />
          <circle cx="24" cy="24" r="1.5" fill="#1E293B" />
          <circle cx="40" cy="28" r="9.5" fill="#312E81" stroke="#1E1B4B" strokeWidth="1.5" />
          <circle cx="38" cy="25" r="2.5" fill="#818CF8" opacity="0.6" />
          <circle cx="40" cy="22" r="1.5" fill="#1E293B" />
          <circle cx="32" cy="42" r="10" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.5" />
          <circle cx="30" cy="39" r="2.5" fill="#93C5FD" opacity="0.7" />
          <circle cx="32" cy="35" r="1.8" fill="#1E293B" />
        </svg>
      );

    case "steel_cut_oats":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 12 30 C 12 48 20 54 32 54 C 44 54 52 48 52 30 Z" fill="#0D9488" stroke="#115E59" strokeWidth="1.5" />
          <ellipse cx="32" cy="30" rx="20" ry="8" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          <ellipse cx="26" cy="29" rx="4" ry="2" transform="rotate(-20 26 29)" fill="#CA8A04" />
          <ellipse cx="35" cy="29" rx="4" ry="2" transform="rotate(30 35 29)" fill="#B45309" />
          <ellipse cx="30" cy="32" rx="3.5" ry="1.5" fill="#A16207" />
          <ellipse cx="40" cy="31" rx="3" ry="1.5" transform="rotate(-15 40 31)" fill="#CA8A04" />
          <path d="M 26 18 Q 24 13 26 9" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 32 16 Q 34 11 32 7" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 38 18 Q 36 13 38 9" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "pastured_eggs":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 16 38 C 12 28 24 16 38 18 C 52 20 56 34 50 44 C 44 52 22 52 16 38 Z" fill="#FFFBEB" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="34" cy="34" r="10" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="32" cy="31" r="3" fill="#FEF3C7" />
          <circle cx="37" cy="36" r="1.5" fill="#D97706" />
        </svg>
      );

    case "extra_virgin_olive_oil":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 28 12 L 36 12 L 36 18 L 44 26 L 44 52 C 44 54 42 56 40 56 L 24 56 C 22 56 20 54 20 52 L 20 26 L 28 18 Z" fill="#10B981" stroke="#047857" strokeWidth="1.5" opacity="0.85" />
          <path d="M 22 28 L 42 28 L 42 54 L 22 54 Z" fill="#EAB308" />
          <rect x="29" y="8" width="6" height="4" rx="1" fill="#B45309" />
          <ellipse cx="48" cy="46" rx="4" ry="5" fill="#65A30D" />
          <path d="M 48 41 Q 50 36 54 36" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "broccoli_florets":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 28 36 L 26 54 L 38 54 L 36 36 Z" fill="#22C55E" stroke="#16A34A" strokeWidth="1.5" />
          <circle cx="22" cy="28" r="8" fill="#15803D" />
          <circle cx="42" cy="28" r="8" fill="#15803D" />
          <circle cx="32" cy="20" r="10" fill="#166534" />
          <circle cx="26" cy="24" r="7" fill="#16A34A" />
          <circle cx="38" cy="24" r="7" fill="#16A34A" />
          <circle cx="32" cy="28" r="7" fill="#22C55E" />
          <circle cx="30" cy="18" r="1" fill="#BBF7D0" />
          <circle cx="35" cy="21" r="1" fill="#BBF7D0" />
        </svg>
      );

    case "tart_cherries":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 36 10 C 34 20 22 24 22 36" stroke="#15803D" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 36 10 C 38 20 44 24 44 38" stroke="#15803D" strokeWidth="2" strokeLinecap="round" fill="none" />
          <ellipse cx="40" cy="12" rx="4" ry="2" transform="rotate(-30 40 12)" fill="#22C55E" />
          <circle cx="21" cy="40" r="9" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
          <circle cx="18" cy="37" r="2.5" fill="#FCA5A5" opacity="0.8" />
          <circle cx="43" cy="42" r="9" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1.5" />
          <circle cx="40" cy="39" r="2.5" fill="#FCA5A5" opacity="0.8" />
        </svg>
      );

    case "quinoa_grain":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 12 32 C 12 50 20 54 32 54 C 44 54 52 50 52 32 Z" fill="#92400E" stroke="#78350F" strokeWidth="1.5" />
          <ellipse cx="32" cy="32" rx="20" ry="8" fill="#F59E0B" />
          <ellipse cx="26" cy="30" rx="2" ry="1.5" fill="#FEF3C7" />
          <ellipse cx="32" cy="28" rx="2" ry="1.5" fill="#DC2626" />
          <ellipse cx="38" cy="30" rx="2" ry="1.5" fill="#1E293B" />
          <ellipse cx="29" cy="33" rx="2" ry="1.5" fill="#1E293B" />
          <ellipse cx="35" cy="33" rx="2" ry="1.5" fill="#FEF3C7" />
          <ellipse cx="23" cy="32" rx="1.8" ry="1.2" fill="#DC2626" />
          <ellipse cx="41" cy="32" rx="1.8" ry="1.2" fill="#FEF3C7" />
        </svg>
      );

    case "organic_tempeh":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <rect x="14" y="22" width="36" height="18" rx="3" transform="rotate(-8 32 31)" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
          <rect x="16" y="30" width="36" height="18" rx="3" transform="rotate(4 34 39)" fill="#FEF08A" stroke="#92400E" strokeWidth="1.5" />
          <circle cx="24" cy="38" r="2" fill="#D97706" />
          <circle cx="32" cy="40" r="2.5" fill="#B45309" />
          <circle cx="40" cy="37" r="2" fill="#D97706" />
          <line x1="20" y1="34" x2="26" y2="46" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <line x1="32" y1="33" x2="38" y2="45" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case "walnuts":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 18 36 C 14 26 22 18 30 20 C 32 26 30 36 28 42 C 22 46 16 42 18 36 Z" fill="#92400E" stroke="#713F12" strokeWidth="1.5" />
          <path d="M 22 24 C 20 30 25 34 22 40" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 44 36 C 48 26 40 18 32 20 C 30 26 32 36 34 42 C 40 46 46 42 44 36 Z" fill="#A16207" stroke="#713F12" strokeWidth="1.5" />
          <path d="M 40 24 C 42 30 37 34 40 40" stroke="#FEF08A" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case "tuscan_kale":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 28 54 L 32 14 C 42 16 44 26 42 38 C 40 46 36 52 28 54 Z" fill="#064E3B" stroke="#022C22" strokeWidth="1.5" />
          <path d="M 28 54 L 32 14 C 22 16 20 26 22 38 C 24 46 26 52 28 54 Z" fill="#047857" stroke="#022C22" strokeWidth="1.5" />
          <path d="M 30 16 L 28 56" stroke="#6EE7B7" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 29 28 Q 36 25 39 27" stroke="#6EE7B7" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 29 36 Q 23 34 21 35" stroke="#6EE7B7" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case "ruby_grapefruit":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="34" r="22" fill="#FB923C" stroke="#EA580C" strokeWidth="1.5" />
          <circle cx="32" cy="34" r="18" fill="#FFF1F2" />
          <circle cx="32" cy="34" r="16" fill="#F43F5E" />
          <path d="M 32 18 L 32 50" stroke="#FFF1F2" strokeWidth="1.8" />
          <path d="M 16 34 L 48 34" stroke="#FFF1F2" strokeWidth="1.8" />
          <path d="M 21 23 L 43 45" stroke="#FFF1F2" strokeWidth="1.8" />
          <path d="M 21 45 L 43 23" stroke="#FFF1F2" strokeWidth="1.8" />
          <circle cx="32" cy="34" r="3.5" fill="#FFF1F2" />
        </svg>
      );

    case "sourdough_bread":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <ellipse cx="32" cy="36" rx="24" ry="16" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
          <path d="M 10 38 C 12 24 24 18 32 18 C 42 18 52 24 54 38 Z" fill="#F59E0B" />
          <path d="M 20 28 Q 28 24 34 26" stroke="#FEF3C7" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 26 34 Q 34 30 42 32" stroke="#FEF3C7" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case "edamame_beans":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 12 44 C 18 24 42 18 52 22 C 48 38 28 48 12 44 Z" fill="#15803D" stroke="#14532D" strokeWidth="1.5" />
          <circle cx="24" cy="36" r="6" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5" />
          <circle cx="23" cy="34" r="1.5" fill="#BBF7D0" />
          <circle cx="34" cy="30" r="6" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5" />
          <circle cx="33" cy="28" r="1.5" fill="#BBF7D0" />
          <circle cx="43" cy="26" r="5" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5" />
        </svg>
      );

    case "chia_seeds":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 12 44 C 12 52 28 52 34 44 L 54 18 C 56 16 54 14 52 14 L 30 38 C 24 38 18 40 12 44 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          <ellipse cx="22" cy="44" rx="10" ry="7" fill="#CBD5E1" />
          <circle cx="18" cy="42" r="1.5" fill="#0F172A" />
          <circle cx="22" cy="41" r="1.5" fill="#334155" />
          <circle cx="26" cy="43" r="1.5" fill="#0F172A" />
          <circle cx="20" cy="46" r="1.5" fill="#1E293B" />
          <circle cx="24" cy="46" r="1.5" fill="#0F172A" />
        </svg>
      );

    case "bok_choy":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 24 54 C 20 44 22 36 24 30 L 40 30 C 42 36 44 44 40 54 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M 24 32 C 14 26 12 14 22 10 C 28 14 30 24 28 32 Z" fill="#10B981" stroke="#059669" strokeWidth="1.2" />
          <path d="M 40 32 C 50 26 52 14 42 10 C 36 14 34 24 36 32 Z" fill="#10B981" stroke="#059669" strokeWidth="1.2" />
          <path d="M 28 30 C 26 18 30 10 32 8 C 34 10 38 18 36 30 Z" fill="#059669" stroke="#047857" strokeWidth="1.2" />
        </svg>
      );

    case "pomegranate_seeds":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 14 44 C 14 22 36 14 48 18 C 50 36 38 52 14 44 Z" fill="#991B1B" stroke="#7F1D1D" strokeWidth="1.5" />
          <path d="M 18 42 C 18 25 36 18 45 22 C 46 35 36 48 18 42 Z" fill="#FFF1F2" />
          <circle cx="26" cy="30" r="3" fill="#E11D48" stroke="#BE123C" strokeWidth="0.8" />
          <circle cx="25" cy="29" r="0.8" fill="#FDA4AF" />
          <circle cx="33" cy="28" r="3" fill="#E11D48" stroke="#BE123C" strokeWidth="0.8" />
          <circle cx="32" cy="27" r="0.8" fill="#FDA4AF" />
          <circle cx="30" cy="35" r="3" fill="#BE123C" stroke="#9F1239" strokeWidth="0.8" />
          <circle cx="38" cy="34" r="2.8" fill="#E11D48" stroke="#BE123C" strokeWidth="0.8" />
        </svg>
      );

    case "butternut_squash":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 32 14 C 26 14 24 22 24 28 C 20 34 18 42 22 50 C 26 56 38 56 42 50 C 46 42 44 34 40 28 C 40 22 38 14 32 14 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
          <rect x="30" y="8" width="4" height="6" rx="1.5" fill="#15803D" />
          <ellipse cx="32" cy="44" rx="8" ry="6" fill="#EA580C" />
          <circle cx="30" cy="43" r="1" fill="#FEF3C7" />
          <circle cx="34" cy="43" r="1" fill="#FEF3C7" />
        </svg>
      );

    case "greek_yogurt":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 18 26 L 46 26 L 42 52 L 22 52 Z" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" opacity="0.85" />
          <ellipse cx="32" cy="26" rx="14" ry="5" fill="#F0F9FF" stroke="#38BDF8" strokeWidth="1.5" />
          <path d="M 24 26 C 24 20 40 18 36 26 Z" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1.2" />
          <circle cx="34" cy="23" r="2.5" fill="#312E81" />
          <circle cx="29" cy="22" r="2" fill="#1E1B4B" />
          <path d="M 28 25 Q 32 28 36 24" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case "flaxseeds":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 14 34 C 14 50 20 54 32 54 C 44 54 50 50 50 34 Z" fill="#A16207" stroke="#713F12" strokeWidth="1.5" />
          <ellipse cx="32" cy="34" rx="18" ry="7" fill="#D97706" />
          <ellipse cx="26" cy="33" rx="2.5" ry="1.2" transform="rotate(-20 26 33)" fill="#FEF08A" />
          <ellipse cx="32" cy="32" rx="2.5" ry="1.2" transform="rotate(30 32 32)" fill="#FEF08A" />
          <ellipse cx="38" cy="34" rx="2.5" ry="1.2" transform="rotate(-10 38 34)" fill="#FEF08A" />
          <ellipse cx="29" cy="36" rx="2.5" ry="1.2" fill="#FEF08A" />
        </svg>
      );

    case "asparagus_spears":
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <path d="M 22 54 L 25 18 L 27 12 L 29 18 L 26 54 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.2" />
          <polygon points="27,10 24,18 30,18" fill="#7C3AED" />
          <path d="M 29 54 L 31 16 L 33 10 L 35 16 L 33 54 Z" fill="#22C55E" stroke="#16A34A" strokeWidth="1.2" />
          <polygon points="33,8 30,16 36,16" fill="#7C3AED" />
          <path d="M 36 54 L 38 18 L 40 12 L 42 18 L 40 54 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.2" />
          <polygon points="40,10 37,18 43,18" fill="#7C3AED" />
          <rect x="22" y="36" width="20" height="4" rx="1" fill="#B45309" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className}>
          <circle cx="32" cy="32" r="22" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="14" fill="#CBD5E1" />
        </svg>
      );
  }
}

// ============================================================================
// MAIN COMPONENT: FEMALE NOURISHMENT PLATE & SPEED FOOD SORTER
// ============================================================================

interface FemaleNourishmentPlateGameProps {
  initialTab?: "plate" | "game";
  onGameComplete?: (xpBonus: number) => void;
}

export function FemaleNourishmentPlateGame({
  initialTab = "game",
  onGameComplete,
}: FemaleNourishmentPlateGameProps) {
  // Navigation: "plate" (study & explore) vs "game" (speed food group sorter)
  const [activeTab, setActiveTab] = useState<"plate" | "game">(initialTab);
  const [selectedGroup, setSelectedGroup] = useState<FoodGroupId>("carbs");

  // Game state
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [gameFoods, setGameFoods] = useState<SortingFoodItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [feedback, setFeedback] = useState<{
    type: "correct" | "wrong";
    text: string;
    foodName: string;
  } | null>(null);
  const [flashFeedback, setFlashFeedback] = useState<{
    groupId: FoodGroupId;
    type: "correct" | "wrong";
  } | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [draggedOverGroup, setDraggedOverGroup] = useState<FoodGroupId | null>(null);

  // Soft Ambient Background Music Engine
  const {
    isPlaying: isMusicPlaying,
    toggleMusic,
    startMusic,
    stopMusic,
  } = useSoftNutritionMusic();
  const [musicPrefEnabled, setMusicPrefEnabled] = useState(true);

  // Stop music on unmount
  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, [stopMusic]);

  const handleToggleMusic = () => {
    const next = !isMusicPlaying;
    setMusicPrefEnabled(next);
    if (next) {
      startMusic();
    } else {
      stopMusic();
    }
  };

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play synthetic tone with Web Audio API (NO external media files needed)
  const playSound = (type: "correct" | "wrong" | "finish") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "correct") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === "wrong") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.exponentialRampToValueAtTime(146.83, ctx.currentTime + 0.2); // D3
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.22);
      } else if (type === "finish") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.22, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch {
      // Audio playback fails silently if browser policy blocks it
    }
  };

  // Start Speed Game
  const startGame = () => {
    const shuffled = [...SPEED_SORTING_FOODS].sort(() => Math.random() - 0.5);
    setGameFoods(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setWrongCount(0);
    setTimeLeft(45);
    setFeedback(null);
    setFlashFeedback(null);
    setGameState("playing");

    // Start soothing background music if preference is on
    if (musicPrefEnabled) {
      startMusic();
    }
  };

  // Timer loop
  useEffect(() => {
    if (gameState === "playing") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Streak Multiplier helper (up to 2x bonus points)
  const getStreakMultiplier = (s: number): number => {
    if (s >= 5) return 2.0;
    if (s >= 4) return 1.75;
    if (s >= 3) return 1.5;
    if (s >= 2) return 1.25;
    return 1.0;
  };

  // End Game
  const endGame = (finalScore?: number, finalCorrect?: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState("gameover");
    playSound("finish");
    const activeScore = finalScore !== undefined ? finalScore : score;
    const activeCorrect = finalCorrect !== undefined ? finalCorrect : correctCount;
    // Guaranteed between +20 and +60 bonus XP based on performance
    const xpEarned = Math.min(60, Math.max(20, Math.round(activeCorrect * 2 + activeScore / 10)));
    onGameComplete?.(xpEarned);
  };

  // Handle User Sorting Food into a Group
  const handleSortFood = (targetGroup: FoodGroupId) => {
    if (gameState !== "playing") return;
    const currentFood = gameFoods[currentIndex];
    if (!currentFood) return;

    if (currentFood.groupId === targetGroup) {
      // Correct!
      const newStreak = streak + 1;
      const multiplier = getStreakMultiplier(newStreak);
      const earned = Math.round(10 * multiplier);
      const nextScore = score + earned;
      const nextCorrect = correctCount + 1;

      setScore(nextScore);
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setCorrectCount(nextCorrect);
      setFeedback({
        type: "correct",
        foodName: currentFood.name,
        text: `+${earned} pts${multiplier > 1 ? ` · ${multiplier}x Combo!` : ""}`,
      });
      setFlashFeedback({ groupId: targetGroup, type: "correct" });
      setTimeout(() => setFlashFeedback(null), 300);
      playSound("correct");

      // Advance to next food or finish
      if (currentIndex + 1 >= gameFoods.length) {
        endGame(nextScore, nextCorrect);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    } else {
      // Incorrect!
      setStreak(0);
      setWrongCount((w) => w + 1);
      setFeedback({
        type: "wrong",
        foodName: currentFood.name,
        text: `Not quite! ${currentFood.name} is a ${FEMALE_FOOD_GROUPS[currentFood.groupId].shortName}.`,
      });
      setFlashFeedback({ groupId: targetGroup, type: "wrong" });
      setTimeout(() => setFlashFeedback(null), 350);
      playSound("wrong");

      // Advance to next food or finish
      if (currentIndex + 1 >= gameFoods.length) {
        endGame(score, correctCount);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    }
  };

  // Keyboard shortcut listener for speed play (1-5 keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;
      if (e.key === "1") handleSortFood("carbs");
      if (e.key === "2") handleSortFood("protein");
      if (e.key === "3") handleSortFood("fats");
      if (e.key === "4") handleSortFood("greens");
      if (e.key === "5") handleSortFood("fruits");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, currentIndex, gameFoods, streak, score, correctCount, maxStreak]);

  // Calculate Annular Donut Slice for Game Plate
  const getDonutSlicePath = (startDeg: number, endDeg: number, innerR = 48, outerR = 108) => {
    const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
    const x1_out = 120 + outerR * Math.cos(rad(startDeg));
    const y1_out = 120 + outerR * Math.sin(rad(startDeg));
    const x2_out = 120 + outerR * Math.cos(rad(endDeg));
    const y2_out = 120 + outerR * Math.sin(rad(endDeg));

    const x1_in = 120 + innerR * Math.cos(rad(endDeg));
    const y1_in = 120 + innerR * Math.sin(rad(endDeg));
    const x2_in = 120 + innerR * Math.cos(rad(startDeg));
    const y2_in = 120 + innerR * Math.sin(rad(startDeg));

    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1_out.toFixed(2)} ${y1_out.toFixed(2)} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2_out.toFixed(2)} ${y2_out.toFixed(2)} L ${x1_in.toFixed(2)} ${y1_in.toFixed(2)} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x2_in.toFixed(2)} ${y2_in.toFixed(2)} Z`;
  };

  // Helper for label coordinates on plate slices
  const getSliceCenterCoords = (startDeg: number, endDeg: number, r = 78) => {
    const mid = (startDeg + endDeg) / 2;
    const rad = ((mid - 90) * Math.PI) / 180;
    return {
      x: 120 + r * Math.cos(rad),
      y: 120 + r * Math.sin(rad),
    };
  };

  const currentFood = gameFoods[currentIndex];
  const selectedGroupData = FEMALE_FOOD_GROUPS[selectedGroup];

  return (
    <div className="rounded-3xl border-2 border-deep-teal/20 bg-white p-4 sm:p-6 md:p-8 shadow-sm space-y-6 font-sans">
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-deep-teal/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-coral text-white shadow-2xs font-sans mb-1.5">
            <Utensils className="w-3.5 h-3.5" />
            <span>Female Physiology &amp; Nourishment Lab</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal leading-tight">
            Female Nourishment Plate &amp; Speed Sorter
          </h3>
          <p className="text-charcoal/80 text-sm sm:text-base font-sans mt-1">
            Discover how each food group fuels female hormones and reproductive vitality, then test your reflexes in the Speed Sorter!
          </p>
        </div>

        {/* Tab Switcher & Ambient Music Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          {/* Soft Music Ambient Player Toggle */}
          <button
            type="button"
            onClick={handleToggleMusic}
            className={`px-3 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 font-sans border cursor-pointer ${
              isMusicPlaying
                ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-2xs ring-2 ring-emerald-400/20"
                : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-charcoal/70"
            }`}
            title={isMusicPlaying ? "Pause Soft Ambient Music" : "Play Soft Ambient Music"}
          >
            <Music className={`w-4 h-4 ${isMusicPlaying ? "text-emerald-600 animate-pulse" : "text-slate-400"}`} />
            <span className="hidden sm:inline">Soft Music:</span>
            <span>{isMusicPlaying ? "ON" : "OFF"}</span>
          </button>

          {/* Tab Switcher: Interactive Plate vs Speed Sorter */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setActiveTab("plate");
                if (gameState === "playing") setGameState("idle");
              }}
            className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 font-sans ${
              activeTab === "plate"
                ? "bg-deep-teal text-white shadow-xs"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Interactive Plate</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("game");
              if (gameState === "idle") startGame();
            }}
            className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 font-sans ${
              activeTab === "game"
                ? "bg-coral text-white shadow-xs"
                : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Speed Food Sorter</span>
          </button>
        </div>
      </div>
    </div>

      {/* =========================================================================
          VIEW 1: INTERACTIVE FEMALE NOURISHMENT PLATE (EXPLORE & LEARN)
         ========================================================================= */}
      {activeTab === "plate" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-deep-teal/15 bg-light-teal/30 p-3.5 sm:p-4 text-xs sm:text-sm text-deep-teal font-sans flex items-start gap-2.5">
            <Info className="w-5 h-5 text-deep-teal shrink-0 mt-0.5" />
            <span>
              <strong>Click any food group slice on the plate</strong> to explore its physiological purpose,
              direct female hormonal benefits, and real whole foods.
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Ceramic SVG Plate Model */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-slate-50 via-white to-amber-50/20 border-2 border-deep-teal/15 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60 font-sans">
                Interactive Ceramic Plate Model
              </span>

              <div className="relative w-64 h-64 sm:w-72 sm:h-72 drop-shadow-xl flex items-center justify-center select-none">
                <svg viewBox="0 0 240 240" className="w-full h-full transform transition-all duration-300">
                  <defs>
                    <radialGradient id="plateShadow" cx="50%" cy="50%" r="50%">
                      <stop offset="85%" stopColor="#E2E8F0" />
                      <stop offset="100%" stopColor="#CBD5E1" />
                    </radialGradient>
                    <radialGradient id="plateInnerGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="70%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#F8FAFC" />
                    </radialGradient>
                  </defs>

                  {/* Outer Ceramic Plate Rim */}
                  <circle cx="120" cy="120" r="118" fill="url(#plateShadow)" />
                  <circle cx="120" cy="120" r="112" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2.5" />
                  <circle cx="120" cy="120" r="108" fill="url(#plateInnerGlow)" stroke="#CBD5E1" strokeWidth="1" />

                  {/* 5 Slices */}
                  {(Object.keys(FEMALE_FOOD_GROUPS) as FoodGroupId[]).map((groupId) => {
                    const group = FEMALE_FOOD_GROUPS[groupId];
                    const isSelected = selectedGroup === groupId;
                    const coords = getSliceCenterCoords(group.sliceStart, group.sliceEnd, 78);
                    return (
                      <g key={group.id} onClick={() => setSelectedGroup(groupId)} className="cursor-pointer">
                        <path
                          d={getDonutSlicePath(group.sliceStart, group.sliceEnd, 46, 108)}
                          fill={group.colorHex}
                          fillOpacity={isSelected ? 0.96 : 0.72}
                          stroke="#FFFFFF"
                          strokeWidth={isSelected ? 3.5 : 2}
                          className="transition-all duration-200 hover:opacity-100 hover:scale-[1.01] origin-center"
                        />
                        <text
                          x={coords.x}
                          y={coords.y - 4}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="9"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
                          className="pointer-events-none select-none"
                        >
                          {group.shortName}
                        </text>
                        <text
                          x={coords.x}
                          y={coords.y + 7}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="8"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                          opacity="0.9"
                          className="pointer-events-none select-none"
                        >
                          {group.platePercentage}
                        </text>
                      </g>
                    );
                  })}

                  {/* Center Plate Hub */}
                  <circle cx="120" cy="120" r="42" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="3" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />
                  <circle cx="120" cy="120" r="38" fill={selectedGroupData.colorHex} fillOpacity={0.15} />

                  <text
                    x="120"
                    y="116"
                    textAnchor="middle"
                    className="text-[10px] font-bold fill-deep-teal uppercase tracking-wider font-sans pointer-events-none"
                  >
                    ReproUs
                  </text>
                  <text
                    x="120"
                    y="128"
                    textAnchor="middle"
                    className="text-[9px] font-extrabold fill-charcoal/80 uppercase font-sans pointer-events-none"
                  >
                    {selectedGroupData.platePercentage}
                  </text>
                </svg>
              </div>

              {/* 5 Group Selector Pills */}
              <div className="w-full flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/60 text-center font-sans">
                  Select Food Group to Inspect:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                  {(Object.keys(FEMALE_FOOD_GROUPS) as FoodGroupId[]).map((groupId) => {
                    const group = FEMALE_FOOD_GROUPS[groupId];
                    const isSelected = selectedGroup === groupId;
                    return (
                      <button
                        key={group.id}
                        type="button"
                        onClick={() => setSelectedGroup(groupId)}
                        className={`p-2.5 rounded-2xl text-left border font-sans transition-all flex items-center justify-between gap-2 ${
                          isSelected
                            ? `${group.bgLight} ${group.borderColor} border-2 shadow-xs scale-[1.01]`
                            : "bg-white border-slate-200 hover:bg-slate-50 text-charcoal/80"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs"
                            style={{ backgroundColor: group.colorHex }}
                          />
                          <span className="font-bold text-xs sm:text-sm text-charcoal">
                            {group.shortName}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-charcoal/60 bg-white/80 px-2 py-0.5 rounded-md border border-slate-200">
                          {group.platePercentage}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Direct Challenge CTA */}
              <button
                type="button"
                onClick={() => {
                  setActiveTab("game");
                  startGame();
                }}
                className="w-full py-3 px-4 rounded-2xl font-bold text-sm bg-coral hover:bg-coral/95 text-white transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 font-sans cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Play Speed Food Sorter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Column: Deep-Dive Female Body Spotlight */}
            <div className="lg:col-span-7 space-y-5">
              <div
                className={`rounded-3xl border-2 p-5 sm:p-6 space-y-4 transition-all duration-300 ${selectedGroupData.bgLight} ${selectedGroupData.borderColor}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-charcoal/10 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white shadow-2xs font-sans text-charcoal mb-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: selectedGroupData.colorHex }}
                      />
                      <span>{selectedGroupData.badge}</span>
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal">
                      {selectedGroupData.name}
                    </h4>
                    <span className="text-xs sm:text-sm font-semibold text-charcoal/75 font-sans block mt-1">
                      Nutrient Profile: {selectedGroupData.keyNutrients}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/60 font-sans block">
                      Target Plate Share
                    </span>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal">
                      {selectedGroupData.platePercentage}
                    </span>
                  </div>
                </div>

                {/* Biological Purpose */}
                <div className="space-y-1.5">
                  <h5 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-deep-teal font-sans flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-deep-teal" />
                    General Biological Purpose:
                  </h5>
                  <p className="text-charcoal/90 text-sm sm:text-base leading-relaxed font-sans bg-white/70 p-3.5 rounded-2xl border border-charcoal/10">
                    {selectedGroupData.biologicalPurpose}
                  </p>
                </div>

                {/* Specific Female Body Benefits */}
                <div className="space-y-2.5 pt-1">
                  <h5 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-raspberry font-sans flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-raspberry" />
                    How This Group Benefits Your Female Body:
                  </h5>
                  <div className="space-y-2">
                    {selectedGroupData.femaleBodyBenefits.map((benefit, i) => {
                      const [title, desc] = benefit.split(": ");
                      return (
                        <div
                          key={i}
                          className="bg-white p-3.5 rounded-2xl border border-charcoal/10 shadow-2xs flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <div className="text-xs sm:text-sm text-charcoal/90 font-sans leading-relaxed">
                            <strong className="text-deep-teal block mb-0.5 font-bold">{title}</strong>
                            <span>{desc}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Clinical Guideline Quote */}
                <div className="rounded-2xl bg-deep-teal/5 border border-deep-teal/15 p-3.5 text-xs text-deep-teal font-sans leading-relaxed flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-deep-teal shrink-0 mt-0.5" />
                  <span>
                    <strong>Clinical Reference:</strong> {selectedGroupData.clinicalSignificance}
                  </span>
                </div>
              </div>

              {/* Real Whole Food Sources (Illustrated with Food Drawings) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold uppercase tracking-wider text-charcoal/80 font-sans flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-deep-teal" />
                    Key Whole Food Sources &amp; Female Physiology Impact:
                  </h5>
                  <span className="text-xs font-semibold text-charcoal/60 font-sans">
                    Pure whole foods
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedGroupData.wholeFoods.map((food) => (
                    <div
                      key={food.id}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-deep-teal/40 transition-all shadow-2xs flex items-start gap-3.5"
                    >
                      <div className="w-14 h-14 shrink-0 rounded-xl bg-slate-50 border border-slate-100 p-1 flex items-center justify-center">
                        <FoodVectorSvg id={food.id} className="w-full h-full drop-shadow-xs" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <span className="font-serif font-bold text-sm sm:text-base text-deep-teal block truncate">
                          {food.name}
                        </span>
                        <p className="text-xs text-charcoal/70 font-sans leading-snug line-clamp-2">
                          {food.description}
                        </p>
                        <div className="text-[11px] font-semibold text-raspberry font-sans leading-tight">
                          <strong>Impact:</strong> {food.femaleImpact}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: SPEED FOOD GROUP SORTING GAME (VISUAL PLATE, LESS TEXT)
         ========================================================================= */}
      {activeTab === "game" && (
        <div className="space-y-5">
          {/* Top Live Stats Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-900 text-white shadow-md">
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              {/* 45s Clock */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
                <Clock className={`w-4 h-4 ${timeLeft <= 10 ? "text-rose-400 animate-pulse" : "text-amber-400"}`} />
                <span className="font-mono font-bold text-sm sm:text-base">
                  {timeLeft}s
                </span>
              </div>

              {/* Score */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Score:</span>
                <span className="font-mono font-bold text-sm sm:text-base text-white">{score}</span>
              </div>

              {/* Combo Streak */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
                <Flame className={`w-4 h-4 ${streak >= 3 ? "text-orange-400 animate-bounce" : "text-slate-500"}`} />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Combo:</span>
                <span className="font-mono font-bold text-sm sm:text-base text-orange-400">
                  {streak} ({getStreakMultiplier(streak)}x)
                </span>
              </div>

              {/* Progress Count */}
              <div className="text-xs text-slate-400 font-sans hidden sm:block">
                {currentIndex + 1} / {gameFoods.length > 0 ? gameFoods.length : 24}
              </div>
            </div>

            {/* Music, SFX & Restart */}
            <div className="flex items-center gap-2">
              {/* Soft Music Button */}
              <button
                type="button"
                onClick={handleToggleMusic}
                className={`px-2.5 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 border cursor-pointer ${
                  isMusicPlaying
                    ? "bg-slate-800 border-emerald-500/60 text-emerald-300 shadow-2xs"
                    : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
                title={isMusicPlaying ? "Pause Soft Ambient Music" : "Play Soft Ambient Music"}
              >
                <Music className={`w-3.5 h-3.5 ${isMusicPlaying ? "text-emerald-400 animate-pulse" : "text-slate-400"}`} />
                <span className="hidden sm:inline">Music:</span>
                <span>{isMusicPlaying ? "ON" : "OFF"}</span>
              </button>

              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700 cursor-pointer"
                title={soundEnabled ? "Mute SFX" : "Enable SFX"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={startGame}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 border border-slate-700 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart</span>
              </button>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              GAMEPLAY: ACTIVE SORTING ARENA (CIRCULAR PLATE + ACTUAL FOOD SVG)
             ----------------------------------------------------------------- */}
          {gameState === "playing" && currentFood && (
            <div className="space-y-4">
              {/* Simple 1-Line Instruction Banner */}
              <div className="text-center py-1">
                <p className="text-xs sm:text-sm font-bold text-charcoal/70 uppercase tracking-wider font-sans">
                  Sort the food into its plate section. Tap a colored slice, drag, or press [1 - 5].
                </p>
              </div>

              {/* Feedback Pill if recently answered */}
              {feedback && (
                <div
                  className={`p-2.5 rounded-xl text-xs sm:text-sm font-sans flex items-center justify-center gap-2 border animate-in fade-in duration-150 max-w-md mx-auto ${
                    feedback.type === "correct"
                      ? "bg-emerald-50 text-emerald-950 border-emerald-300 font-bold"
                      : "bg-rose-50 text-rose-950 border-rose-300 font-bold"
                  }`}
                >
                  {feedback.type === "correct" ? (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <HelpCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span>{feedback.text}</span>
                </div>
              )}

              {/* =============================================================
                  THE INTERACTIVE NOURISHMENT PLATE (CENTRAL ARENA)
                 ============================================================= */}
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-square mx-auto flex items-center justify-center select-none my-2">
                {/* SVG Circular Plate with 5 Colored Food Group Wedges */}
                <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-xl overflow-visible">
                  <defs>
                    <radialGradient id="gamePlateShadow" cx="50%" cy="50%" r="50%">
                      <stop offset="85%" stopColor="#E2E8F0" />
                      <stop offset="100%" stopColor="#CBD5E1" />
                    </radialGradient>
                    <radialGradient id="gamePlateRim" cx="50%" cy="50%" r="50%">
                      <stop offset="70%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#F8FAFC" />
                    </radialGradient>
                  </defs>

                  {/* Outer Ceramic Plate Rim */}
                  <circle cx="120" cy="120" r="118" fill="url(#gamePlateShadow)" />
                  <circle cx="120" cy="120" r="112" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2.5" />
                  <circle cx="120" cy="120" r="108" fill="url(#gamePlateRim)" stroke="#CBD5E1" strokeWidth="1" />

                  {/* 5 Colored Plate Slices (Drop & Click Targets) */}
                  {(Object.keys(FEMALE_FOOD_GROUPS) as FoodGroupId[]).map((groupId) => {
                    const group = FEMALE_FOOD_GROUPS[groupId];
                    const isOver = draggedOverGroup === groupId;
                    const isFlashingCorrect = flashFeedback?.groupId === groupId && flashFeedback.type === "correct";
                    const isFlashingWrong = flashFeedback?.groupId === groupId && flashFeedback.type === "wrong";
                    const coords = getSliceCenterCoords(group.sliceStart, group.sliceEnd, 78);

                    return (
                      <g
                        key={group.id}
                        onClick={() => handleSortFood(groupId)}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDraggedOverGroup(groupId);
                        }}
                        onDragLeave={() => setDraggedOverGroup(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDraggedOverGroup(null);
                          handleSortFood(groupId);
                        }}
                        className="cursor-pointer group/slice"
                      >
                        <path
                          d={getDonutSlicePath(group.sliceStart, group.sliceEnd, 48, 108)}
                          fill={isFlashingCorrect ? "#10B981" : isFlashingWrong ? "#EF4444" : group.colorHex}
                          fillOpacity={isOver ? 1 : 0.88}
                          stroke="#FFFFFF"
                          strokeWidth={isOver || isFlashingCorrect || isFlashingWrong ? 4 : 2.5}
                          className="transition-all duration-150 group-hover/slice:opacity-100 group-hover/slice:scale-[1.01] origin-center"
                        />
                        {/* Label: Number & Group Name on Plate Wedge */}
                        <text
                          x={coords.x}
                          y={coords.y - 3}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="9.5"
                          fontWeight="800"
                          fontFamily="sans-serif"
                          filter="drop-shadow(0 1px 3px rgba(0,0,0,0.6))"
                          className="pointer-events-none select-none"
                        >
                          [{group.hotkey}] {group.shortName}
                        </text>
                        <text
                          x={coords.x}
                          y={coords.y + 8}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="8"
                          fontWeight="700"
                          fontFamily="sans-serif"
                          opacity="0.95"
                          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
                          className="pointer-events-none select-none"
                        >
                          Tap to Sort
                        </text>
                      </g>
                    );
                  })}

                  {/* Ceramic Plate Inner Ring */}
                  <circle cx="120" cy="120" r="47" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.08))" />
                </svg>

                {/* =============================================================
                    CENTER DISH: ACTUAL WHOLE FOOD SVG WITH HOVER TOOLTIP
                   ============================================================= */}
                <div
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", currentFood.groupId);
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white shadow-inner border-2 border-slate-200 flex flex-col items-center justify-center p-2 cursor-grab active:cursor-grabbing group hover:scale-105 transition-transform z-10"
                >
                  {/* Brief Name Hover Tooltip */}
                  <div className="absolute -top-9 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    {currentFood.name}
                  </div>

                  {/* Visual Food Illustration */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transition-transform group-hover:scale-110">
                    <FoodVectorSvg id={currentFood.id} className="w-full h-full drop-shadow-sm" />
                  </div>

                  {/* Brief Name Pill Below Food */}
                  <span className="text-[10px] sm:text-[11px] font-bold text-deep-teal font-sans truncate max-w-[95px] text-center block mt-0.5">
                    {currentFood.name}
                  </span>
                </div>
              </div>

              {/* 5 Quick-Tap Color Buttons (1-5) for Desktop & Mobile Thumb Access */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 max-w-xl mx-auto pt-1">
                {(Object.keys(FEMALE_FOOD_GROUPS) as FoodGroupId[]).map((groupId) => {
                  const group = FEMALE_FOOD_GROUPS[groupId];
                  return (
                    <button
                      key={groupId}
                      type="button"
                      onClick={() => handleSortFood(groupId)}
                      className="py-2.5 px-3 rounded-2xl border-2 font-sans font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-2xs hover:scale-105 active:scale-95 bg-white border-slate-200 hover:border-slate-400 text-charcoal cursor-pointer"
                    >
                      <span
                        className="w-3 h-3 rounded-full shrink-0 shadow-2xs"
                        style={{ backgroundColor: group.colorHex }}
                      />
                      <span className="truncate">
                        [{group.hotkey}] {group.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------
              IDLE STATE: CLEAN START SCREEN WITH SIMPLE INSTRUCTIONS
             ----------------------------------------------------------------- */}
          {gameState === "idle" && (
            <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-b from-slate-50 via-white to-amber-50/20 p-6 sm:p-10 space-y-6 text-center">
              <div className="max-w-xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-coral text-white shadow-2xs font-sans">
                  <Zap className="w-3.5 h-3.5" />
                  <span>45-Second Speed Challenge</span>
                </div>
                <h4 className="text-3xl sm:text-4xl font-serif font-bold text-deep-teal">
                  Speed Food Group Sorter
                </h4>
                <p className="text-sm sm:text-base text-charcoal/80 font-sans leading-relaxed">
                  Classify 24 whole foods onto your female nourishment plate before the clock runs out.
                </p>
              </div>

              {/* Simple 3-Step Instruction Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-deep-teal uppercase font-sans">45s Countdown</h5>
                    <p className="text-xs text-charcoal/70 font-sans">Race against the clock</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                    <Keyboard className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-deep-teal uppercase font-sans">Tap, Drag, or [1-5]</h5>
                    <p className="text-xs text-charcoal/70 font-sans">Sort foods onto plate slices</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-deep-teal uppercase font-sans">Streak Combos</h5>
                    <p className="text-xs text-charcoal/70 font-sans">Earn up to 2x score &amp; +60 XP</p>
                  </div>
                </div>
              </div>

              {/* Start Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={startGame}
                  className="px-8 py-3.5 rounded-2xl font-bold text-base bg-coral hover:bg-coral/95 text-white transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2.5 font-sans cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>Start Speed Game</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("plate")}
                  className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-white hover:bg-slate-100 text-charcoal border border-slate-300 transition-all font-sans cursor-pointer flex items-center gap-2"
                >
                  <Utensils className="w-4 h-4 text-deep-teal" />
                  <span>Explore Nourishment Plate</span>
                </button>
              </div>

              {/* Soft Music Status Pill on Start Screen */}
              <div className="pt-1 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleToggleMusic}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-charcoal/80 transition-all cursor-pointer shadow-2xs"
                  title="Click to toggle soft background music"
                >
                  <Music className={`w-3.5 h-3.5 ${isMusicPlaying ? "text-emerald-600 animate-pulse" : "text-slate-400"}`} />
                  <span>Soft Background Music: <strong className={isMusicPlaying ? "text-emerald-700" : "text-slate-500"}>{isMusicPlaying ? "Playing" : "Muted"}</strong> (Click to {isMusicPlaying ? "mute" : "turn on"})</span>
                </button>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------
              GAME OVER: SUMMARY & XP REWARD
             ----------------------------------------------------------------- */}
          {gameState === "gameover" && (
            <div className="rounded-3xl border-2 border-deep-teal/20 bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 p-6 sm:p-10 text-center space-y-6 animate-in fade-in">
              <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto border-2 border-amber-300 shadow-md">
                <Award className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 font-sans">
                  Challenge Completed!
                </span>
                <h4 className="text-3xl sm:text-4xl font-serif font-bold text-deep-teal">
                  Speed Nutrition Master
                </h4>
                <p className="text-sm sm:text-base text-charcoal/80 font-sans">
                  You scored <strong>{score} points</strong> with <strong>{correctCount} correct sorts</strong> and a max streak of <strong>{maxStreak}x</strong>!
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/60 block font-sans">
                    Final Score
                  </span>
                  <span className="text-2xl font-serif font-bold text-deep-teal">{score}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/60 block font-sans">
                    Accuracy
                  </span>
                  <span className="text-2xl font-serif font-bold text-emerald-700">
                    {correctCount + wrongCount > 0
                      ? `${Math.round((correctCount / (correctCount + wrongCount)) * 100)}%`
                      : "100%"}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/60 block font-sans">
                    Max Streak
                  </span>
                  <span className="text-2xl font-serif font-bold text-orange-600">{maxStreak}x</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/60 block font-sans">
                    XP Bonus
                  </span>
                  <span className="text-2xl font-serif font-bold text-coral">
                    +{Math.min(60, Math.max(20, Math.round(correctCount * 3 + score / 10)))}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={startGame}
                  className="px-6 py-3.5 rounded-2xl font-bold text-base bg-coral hover:bg-coral/95 text-white transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2 font-sans cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Play Again</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("plate")}
                  className="px-5 py-3.5 rounded-2xl font-bold text-sm bg-white hover:bg-slate-100 text-charcoal border border-slate-300 transition-all font-sans cursor-pointer flex items-center gap-2"
                >
                  <Utensils className="w-4 h-4 text-deep-teal" />
                  <span>Explore Nourishment Plate</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
