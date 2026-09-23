"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Utensils,
  ShieldCheck,
  Activity,
  Sparkles,
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
  Trophy,
  Play,
  ArrowRight,
  HelpCircle,
  TrendingUp,
} from "lucide-react";

export type FoodGroupId = "carbs" | "protein" | "fats" | "greens" | "fruits";

export interface FoodGroupData {
  id: FoodGroupId;
  name: string;
  shortName: string;
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
        name: "Roasted Sweet Potatoes",
        description: "Packed with beta-carotene, potassium, and slow-digesting complex starches.",
        femaleImpact: "Sustains steady blood glucose to keep hypothalamic GnRH pulsing regularly.",
      },
      {
        name: "Steel-Cut Rolled Oats",
        description: "Rich in soluble beta-glucan fiber and B-complex vitamins.",
        femaleImpact: "Binds excess metabolized estrogen in the digestive tract for regular hormonal elimination.",
      },
      {
        name: "Quinoa & Brown Rice Blend",
        description: "Complete plant protein providing all 9 amino acids, magnesium, and iron.",
        femaleImpact: "High magnesium relaxes uterine smooth muscle, preventing severe menstrual cramps.",
      },
      {
        name: "Sprouted Sourdough Bread",
        description: "Naturally fermented for easy digestion and low glycemic impact.",
        femaleImpact: "Avoids insulin spikes that stimulate ovarian theca cells to overproduce androgens.",
      },
    ],
  },
  protein: {
    id: "protein",
    name: "Lean & Hormone-Building Proteins",
    shortName: "Lean Protein",
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
        name: "Wild Sockeye Salmon",
        description: "Rich in high-potency marine Omega-3 fatty acids and complete bioavailable protein.",
        femaleImpact: "Suppresses inflammatory uterine prostaglandins to relieve primary dysmenorrhea.",
      },
      {
        name: "Pasture-Raised Whole Eggs",
        description: "Contains whole yolk choline, vitamin D3, and essential cholesterol.",
        femaleImpact: "Delivers direct cholesterol substrate required by the ovaries for steroid hormone production.",
      },
      {
        name: "Steamed Edamame & Lentils",
        description: "Plant-based protein rich in folate, iron, and protective phyto-nutrients.",
        femaleImpact: "Supports healthy cellular DNA synthesis and gently balances estrogen receptor activity.",
      },
      {
        name: "Organic Tofu & Tempeh",
        description: "Fermented soy delivering easily digestible amino acids, calcium, and isoflavones.",
        femaleImpact: "Provides bone-building calcium and natural phytoestrogens that support vascular health.",
      },
    ],
  },
  fats: {
    id: "fats",
    name: "Essential Healthy Fats & Lipids",
    shortName: "Healthy Fats",
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
        name: "Fresh Avocado",
        description: "Abundant in monounsaturated fats, potassium, and lipid-soluble vitamin E.",
        femaleImpact: "Cushions reproductive pelvic organs and maintains flexible vascular endothelial tissue.",
      },
      {
        name: "Extra Virgin Olive Oil",
        description: "Cold-pressed oil high in oleocanthal and polyphenolic antioxidants.",
        femaleImpact: "Natural anti-inflammatory that mimics low-dose NSAIDs without stressing gastric lining.",
      },
      {
        name: "Walnuts & Chia Seeds",
        description: "Packed with plant alpha-linolenic acid (ALA), zinc, and lignans.",
        femaleImpact: "Zinc fuels ovarian follicle development and bolsters healthy luteal progesterone output.",
      },
      {
        name: "Tahini & Sesame Seeds",
        description: "Ground sesame paste loaded with calcium, healthy lipids, and sesamin.",
        femaleImpact: "Supplies plant calcium to maintain bone density and support smooth muscle relaxation.",
      },
    ],
  },
  greens: {
    id: "greens",
    name: "Fiber & Hormone-Clearing Greens",
    shortName: "Fiber Greens",
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
        name: "Dark Baby Spinach",
        description: "Tender leaves high in plant non-heme iron, magnesium, and dietary folate.",
        femaleImpact: "Replenishes red blood cell oxygenation after menstrual flow and relieves muscle tension.",
      },
      {
        name: "Steamed Broccoli & Broccolini",
        description: "Cruciferous vegetable loaded with glucosinolates and sulfur compounds.",
        femaleImpact: "Powers phase 1 and 2 liver pathways to metabolize and safely eliminate used estrogen.",
      },
      {
        name: "Tuscan Baby Kale",
        description: "Dense dark leafy green loaded with calcium, vitamin K1, and lutein.",
        femaleImpact: "Deposits calcium directly into bones to build an unbreakable skeletal foundation.",
      },
      {
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
        name: "Wild Blueberries",
        description: "Antioxidant-dense berries rich in deep anthocyanins and polyphenols.",
        femaleImpact: "Quenches cellular inflammation and protects ovarian granulosa cells from oxidative stress.",
      },
      {
        name: "Montmorency Tart Cherries",
        description: "Natural source of phytomelatonin and potent anthocyanin flavonoids.",
        femaleImpact: "Promotes restorative sleep and regulates circadian rhythms to lower cortisol spikes.",
      },
      {
        name: "Ruby Red Grapefruit & Oranges",
        description: "Citrus fruits bursting with vitamin C, bioflavonoids, and hydration.",
        femaleImpact: "Triples iron absorption from plant greens and builds resilient ligament collagen.",
      },
      {
        name: "Pomegranate Seeds",
        description: "Tart arils packed with punicalagins, polyphenols, and dietary fiber.",
        femaleImpact: "Supports healthy pelvic microvascular circulation and reduces systemic inflammation.",
      },
    ],
  },
};

export interface SortingFoodItem {
  id: string;
  name: string;
  groupId: FoodGroupId;
  categoryLabel: string;
  nutrientFact: string;
  femaleBodyClue: string;
}

export const SPEED_SORTING_FOODS: SortingFoodItem[] = [
  {
    id: "sweet_potato",
    name: "Roasted Sweet Potato",
    groupId: "carbs",
    categoryLabel: "Complex Carbohydrates",
    nutrientFact: "Beta-Carotene & Slow-Burn Glycogen",
    femaleBodyClue: "Supplies steady glucose to activate hypothalamic kisspeptin, preserving regular menstrual periods.",
  },
  {
    id: "wild_salmon",
    name: "Wild Sockeye Salmon",
    groupId: "protein",
    categoryLabel: "Lean Protein",
    nutrientFact: "EPA/DHA Omega-3 & High Leucine",
    femaleBodyClue: "Suppresses inflammatory uterine prostaglandins (PGF2α) to dramatically reduce period cramps.",
  },
  {
    id: "avocado",
    name: "Fresh Sliced Avocado",
    groupId: "fats",
    categoryLabel: "Healthy Fats",
    nutrientFact: "Monounsaturated Oleic Acid & Vitamin E",
    femaleBodyClue: "Provides healthy lipid bilayers that cushion pelvic organs and support steroid hormone production.",
  },
  {
    id: "baby_spinach",
    name: "Dark Baby Spinach",
    groupId: "greens",
    categoryLabel: "Fiber Greens",
    nutrientFact: "Non-Heme Iron, Magnesium & Folate",
    femaleBodyClue: "Restores red blood cell hemoglobin after menstrual bleeding and relaxes uterine muscle.",
  },
  {
    id: "wild_blueberries",
    name: "Wild Blueberries",
    groupId: "fruits",
    categoryLabel: "Antioxidant Fruits",
    nutrientFact: "Deep Anthocyanins & Vitamin C",
    femaleBodyClue: "Protects ovarian granulosa cells and triples iron absorption from meals.",
  },
  {
    id: "steel_cut_oats",
    name: "Steel-Cut Oats",
    groupId: "carbs",
    categoryLabel: "Complex Carbohydrates",
    nutrientFact: "Beta-Glucan Soluble Fiber & B Vitamins",
    femaleBodyClue: "Binds metabolized estrogen in the colon to ensure smooth hormonal elimination.",
  },
  {
    id: "pastured_eggs",
    name: "Pasture-Raised Eggs",
    groupId: "protein",
    categoryLabel: "Lean Protein",
    nutrientFact: "Whole Choline & Complete Protein",
    femaleBodyClue: "Delivers direct dietary cholesterol needed by the ovaries to synthesize estrogen and progesterone.",
  },
  {
    id: "extra_virgin_olive_oil",
    name: "Extra Virgin Olive Oil",
    groupId: "fats",
    categoryLabel: "Healthy Fats",
    nutrientFact: "Oleocanthal & Polyphenols",
    femaleBodyClue: "Acts as a natural anti-inflammatory to soothe systemic aches without irritating your stomach.",
  },
  {
    id: "broccoli_florets",
    name: "Steamed Broccoli Florets",
    groupId: "greens",
    categoryLabel: "Fiber Greens",
    nutrientFact: "Diindolylmethane (DIM) & Glucosinolates",
    femaleBodyClue: "Stimulates liver enzymes to clear excess estrogen, preventing heavy cycles and breast tenderness.",
  },
  {
    id: "tart_cherries",
    name: "Montmorency Tart Cherries",
    groupId: "fruits",
    categoryLabel: "Antioxidant Fruits",
    nutrientFact: "Natural Phytomelatonin & Flavonoids",
    femaleBodyClue: "Lowers high luteal body temperature to promote restorative REM sleep and lower cortisol.",
  },
  {
    id: "quinoa_grain",
    name: "Tri-Color Quinoa",
    groupId: "carbs",
    categoryLabel: "Complex Carbohydrates",
    nutrientFact: "Complete Plant Protein & Magnesium",
    femaleBodyClue: "Magnesium relaxes uterine smooth muscle, preventing severe premenstrual cramping.",
  },
  {
    id: "organic_tempeh",
    name: "Organic Tempeh",
    groupId: "protein",
    categoryLabel: "Lean Protein",
    nutrientFact: "Fermented Isoflavones & Bioavailable Iron",
    femaleBodyClue: "Restores ferritin stores after menses and gently supports balanced estrogen receptors.",
  },
  {
    id: "walnuts",
    name: "Raw English Walnuts",
    groupId: "fats",
    categoryLabel: "Healthy Fats",
    nutrientFact: "Plant Omega-3 (ALA) & Zinc",
    femaleBodyClue: "Zinc supports ovarian follicle development to stimulate healthy ovulation and progesterone.",
  },
  {
    id: "tuscan_kale",
    name: "Tuscan Baby Kale",
    groupId: "greens",
    categoryLabel: "Fiber Greens",
    nutrientFact: "Bioavailable Calcium & Vitamin K1",
    femaleBodyClue: "Reinforces bone mineral density to guard against stress fractures in athletic training.",
  },
  {
    id: "ruby_grapefruit",
    name: "Ruby Red Grapefruit",
    groupId: "fruits",
    categoryLabel: "Antioxidant Fruits",
    nutrientFact: "High-Dose Ascorbic Acid (Vitamin C)",
    femaleBodyClue: "Required cofactor for collagen synthesis to strengthen the pelvic floor and ligaments.",
  },
  {
    id: "sourdough_bread",
    name: "Artisan Sourdough",
    groupId: "carbs",
    categoryLabel: "Complex Carbohydrates",
    nutrientFact: "Fermented Slow-Starch Carbs",
    femaleBodyClue: "Prevents sharp insulin spikes that trigger ovaries to overproduce unwanted androgens.",
  },
  {
    id: "edamame_beans",
    name: "Steamed Edamame",
    groupId: "protein",
    categoryLabel: "Lean Protein",
    nutrientFact: "Folate, Plant Protein & Fiber",
    femaleBodyClue: "Provides cellular rebuilding blocks and assists healthy red blood cell production.",
  },
  {
    id: "chia_seeds",
    name: "Black Chia Seeds",
    groupId: "fats",
    categoryLabel: "Healthy Fats",
    nutrientFact: "Hydrophilic Fiber & Omega-3 Lipids",
    femaleBodyClue: "Stabilizes hydration balance and supplies essential fatty acids for steroid synthesis.",
  },
  {
    id: "bok_choy",
    name: "Crisp Baby Bok Choy",
    groupId: "greens",
    categoryLabel: "Fiber Greens",
    nutrientFact: "High-Absorption Plant Calcium",
    femaleBodyClue: "Supplies plant calcium readily absorbed without dairy bloat for muscular recovery.",
  },
  {
    id: "pomegranate_seeds",
    name: "Pomegranate Arils",
    groupId: "fruits",
    categoryLabel: "Antioxidant Fruits",
    nutrientFact: "Punicalagins & Polyphenols",
    femaleBodyClue: "Enhances pelvic microvascular circulation to optimize endometrial health.",
  },
  {
    id: "butternut_squash",
    name: "Roasted Butternut Squash",
    groupId: "carbs",
    categoryLabel: "Complex Carbohydrates",
    nutrientFact: "Slow Carbohydrates & Vitamin A",
    femaleBodyClue: "Provides clean energy to support active thyroid hormone (T3) conversion in the liver.",
  },
  {
    id: "greek_yogurt",
    name: "Plain Greek Yogurt",
    groupId: "protein",
    categoryLabel: "Lean Protein",
    nutrientFact: "Probiotics, Casein & Calcium",
    femaleBodyClue: "Nurtures vaginal and gut microbiomes while delivering amino acids for tissue repair.",
  },
  {
    id: "flaxseeds",
    name: "Ground Golden Flaxseed",
    groupId: "fats",
    categoryLabel: "Healthy Fats",
    nutrientFact: "Lignans & Alpha-Linolenic Acid",
    femaleBodyClue: "Lignans bind excess circulating estrogen to promote a balanced estrogen-to-progesterone ratio.",
  },
  {
    id: "asparagus_spears",
    name: "Tender Asparagus Spears",
    groupId: "greens",
    categoryLabel: "Fiber Greens",
    nutrientFact: "Asparagine, Folate & Glutathione",
    femaleBodyClue: "Natural diuretic that reduces premenstrual water retention and abdominal bloating.",
  },
];

interface FemaleNourishmentPlateGameProps {
  onGameComplete?: (xpBonus: number) => void;
}

export function FemaleNourishmentPlateGame({ onGameComplete }: FemaleNourishmentPlateGameProps) {
  // Navigation: "plate" (study & explore) vs "game" (speed food group sorter)
  const [activeTab, setActiveTab] = useState<"plate" | "game">("plate");
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
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [draggedOverGroup, setDraggedOverGroup] = useState<FoodGroupId | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play synthetic tone with Web Audio API
  const playSound = (type: "correct" | "wrong" | "finish") => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
    // Shuffle the foods array
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
    setGameState("playing");
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

  // End Game
  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState("gameover");
    playSound("finish");
    // Award XP bonus based on correct answers
    const xpEarned = Math.min(60, Math.max(20, Math.round(correctCount * 3 + score / 10)));
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
      const streakBonus = Math.floor(newStreak / 3) * 5;
      const earned = 10 + streakBonus;
      setScore((s) => s + earned);
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setCorrectCount((c) => c + 1);
      setFeedback({
        type: "correct",
        foodName: currentFood.name,
        text: `Correct! ${currentFood.name} belongs to ${FEMALE_FOOD_GROUPS[targetGroup].name}. (+${earned} pts)`,
      });
      playSound("correct");
    } else {
      // Incorrect!
      setStreak(0);
      setWrongCount((w) => w + 1);
      setFeedback({
        type: "wrong",
        foodName: currentFood.name,
        text: `Not quite! ${currentFood.name} is a ${FEMALE_FOOD_GROUPS[currentFood.groupId].name}.`,
      });
      playSound("wrong");
    }

    // Advance to next food or loop/finish
    if (currentIndex + 1 >= gameFoods.length) {
      endGame();
    } else {
      setCurrentIndex((i) => i + 1);
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
  }, [gameState, currentIndex, gameFoods, streak]);

  // Calculate SVG arc path for plate wedge
  const getSlicePath = (startDeg: number, endDeg: number, r = 88) => {
    const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
    const x1 = 100 + r * Math.cos(rad(startDeg));
    const y1 = 100 + r * Math.sin(rad(startDeg));
    const x2 = 100 + r * Math.cos(rad(endDeg));
    const y2 = 100 + r * Math.sin(rad(endDeg));
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M 100 100 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
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

        {/* Tab Switcher: Plate Study vs Speed Game */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
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

      {/* =========================================================================
          VIEW 1: INTERACTIVE FEMALE NOURISHMENT PLATE
         ========================================================================= */}
      {activeTab === "plate" && (
        <div className="space-y-6">
          {/* Quick Helper Banner */}
          <div className="rounded-2xl border border-deep-teal/15 bg-light-teal/30 p-3.5 sm:p-4 text-xs sm:text-sm text-deep-teal font-sans flex items-start gap-2.5">
            <Info className="w-5 h-5 text-deep-teal shrink-0 mt-0.5" />
            <span>
              <strong>Click any food group slice on the plate</strong> below to explore its physiological purpose,
              its direct benefits for the female body (kisspeptin, steroid hormones, cramp relief, estrogen clearance),
              and whole food sources.
            </span>
          </div>

          {/* Interactive Plate & Spotlight Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Ceramic SVG Plate & Group Selector Buttons */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-slate-50 via-white to-amber-50/20 border-2 border-deep-teal/15 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60 font-sans">
                Interactive Ceramic Plate Model
              </span>

              {/* Ceramic SVG Plate */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 drop-shadow-xl flex items-center justify-center select-none">
                <svg viewBox="0 0 200 200" className="w-full h-full transform transition-all duration-300">
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
                  <circle cx="100" cy="100" r="98" fill="url(#plateShadow)" />
                  <circle cx="100" cy="100" r="92" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2.5" />
                  <circle cx="100" cy="100" r="88" fill="url(#plateInnerGlow)" stroke="#CBD5E1" strokeWidth="1" />

                  {/* 5 Slices */}
                  {(Object.keys(FEMALE_FOOD_GROUPS) as FoodGroupId[]).map((groupId) => {
                    const group = FEMALE_FOOD_GROUPS[groupId];
                    const isSelected = selectedGroup === groupId;
                    return (
                      <path
                        key={group.id}
                        d={getSlicePath(group.sliceStart, group.sliceEnd, 88)}
                        fill={group.colorHex}
                        fillOpacity={isSelected ? 0.95 : 0.72}
                        stroke="#FFFFFF"
                        strokeWidth={isSelected ? 3.5 : 2}
                        className="cursor-pointer transition-all duration-200 hover:opacity-100 hover:scale-[1.01] origin-center"
                        onClick={() => setSelectedGroup(groupId)}
                      />
                    );
                  })}

                  {/* Plate Center Hub */}
                  <circle cx="100" cy="100" r="28" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="3" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))" />
                  <circle cx="100" cy="100" r="24" fill={selectedGroupData.colorHex} fillOpacity={0.15} />

                  <text
                    x="100"
                    y="96"
                    textAnchor="middle"
                    className="text-[9px] font-bold fill-deep-teal uppercase tracking-wider font-sans pointer-events-none"
                  >
                    ReproUs
                  </text>
                  <text
                    x="100"
                    y="107"
                    textAnchor="middle"
                    className="text-[8px] font-extrabold fill-charcoal/80 uppercase font-sans pointer-events-none"
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
                className="w-full py-3 px-4 rounded-2xl font-bold text-sm bg-coral hover:bg-coral/95 text-white transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 font-sans"
              >
                <Zap className="w-4 h-4" />
                <span>Test Knowledge in Speed Sorter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Column: Deep-Dive Female Body Spotlight */}
            <div className="lg:col-span-7 space-y-5">
              {/* Food Group Title & Proportion Badge */}
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

                {/* Specific Female Body Benefits (THE CORE USER REQUIREMENT) */}
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

              {/* Real Whole Food Examples (NO EMOJIS) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold uppercase tracking-wider text-charcoal/80 font-sans flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-deep-teal" />
                    Key Whole Food Sources &amp; Female Physiology Impact:
                  </h5>
                  <span className="text-xs font-semibold text-charcoal/60 font-sans">
                    No artificial supplements needed
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedGroupData.wholeFoods.map((food, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-deep-teal/40 transition-all shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-base text-deep-teal">
                          {food.name}
                        </span>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedGroupData.colorHex }} />
                      </div>
                      <p className="text-xs text-charcoal/70 font-sans leading-relaxed">
                        {food.description}
                      </p>
                      <div className="pt-1 text-[11px] font-semibold text-raspberry font-sans leading-tight">
                        <strong>Female Impact:</strong> {food.femaleImpact}
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
          VIEW 2: SPEED FOOD GROUP SORTING GAME (NO EMOJIS)
         ========================================================================= */}
      {activeTab === "game" && (
        <div className="space-y-6">
          {/* Game Banner & Live Stats Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 text-white shadow-md">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Timer Pill */}
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
                <Clock className={`w-4 h-4 ${timeLeft <= 10 ? "text-rose-400 animate-pulse" : "text-amber-400"}`} />
                <span className="font-mono font-bold text-sm sm:text-base">
                  {timeLeft}s
                </span>
              </div>

              {/* Live Score */}
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Score:</span>
                <span className="font-mono font-bold text-sm sm:text-base text-white">{score}</span>
              </div>

              {/* Streak Multiplier */}
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
                <Flame className={`w-4 h-4 ${streak >= 3 ? "text-orange-400 animate-bounce" : "text-slate-500"}`} />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Streak:</span>
                <span className="font-mono font-bold text-sm sm:text-base text-orange-400">{streak}x</span>
              </div>

              {/* Progress Count */}
              <div className="text-xs text-slate-400 font-sans hidden sm:block">
                Item {currentIndex + 1} of {gameFoods.length > 0 ? gameFoods.length : 24}
              </div>
            </div>

            {/* Sound Mute Toggle & Reset */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700"
                title={soundEnabled ? "Mute Game Audio" : "Enable Game Audio"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={startGame}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart</span>
              </button>
            </div>
          </div>

          {/* GAME STATE: PLAYING */}
          {gameState === "playing" && currentFood && (
            <div className="space-y-6">
              {/* Feedback Pill if recently answered */}
              {feedback && (
                <div
                  className={`p-3 rounded-2xl text-xs sm:text-sm font-sans flex items-center gap-2 border animate-in fade-in duration-150 ${
                    feedback.type === "correct"
                      ? "bg-emerald-50 text-emerald-950 border-emerald-200"
                      : "bg-rose-50 text-rose-950 border-rose-200"
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

              {/* Active Food Card to be Sorted */}
              <div
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", currentFood.groupId);
                }}
                className="rounded-3xl border-3 border-coral/40 bg-gradient-to-br from-amber-50/40 via-white to-rose-50/30 p-6 sm:p-8 text-center shadow-lg relative select-none hover:shadow-xl transition-all"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-coral font-sans block mb-1">
                  Food Item to Classify:
                </span>
                <h4 className="text-3xl sm:text-4xl font-serif font-bold text-deep-teal mb-2">
                  {currentFood.name}
                </h4>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-charcoal border border-slate-200 mb-4">
                  <Activity className="w-3.5 h-3.5 text-deep-teal" />
                  <span>{currentFood.nutrientFact}</span>
                </div>

                <div className="max-w-xl mx-auto rounded-2xl bg-white/90 p-4 border border-coral/20 text-xs sm:text-sm text-charcoal/85 leading-relaxed font-sans shadow-2xs">
                  <strong className="text-raspberry block mb-1 font-bold">Female Body Benefit Clue:</strong>
                  {currentFood.femaleBodyClue}
                </div>

                <span className="block text-[11px] text-charcoal/50 font-sans mt-3">
                  Tip: Tap the matching food group below or press keyboard keys [1 - 5]
                </span>
              </div>

              {/* 5 Target Food Group Buckets / Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {(Object.keys(FEMALE_FOOD_GROUPS) as FoodGroupId[]).map((groupId, idx) => {
                  const group = FEMALE_FOOD_GROUPS[groupId];
                  const isDraggedOver = draggedOverGroup === groupId;
                  return (
                    <button
                      key={groupId}
                      type="button"
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
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-between text-center gap-2 group font-sans ${
                        isDraggedOver
                          ? "scale-105 shadow-lg ring-4 ring-coral/30 border-coral bg-coral/10"
                          : "bg-white hover:bg-slate-50 border-slate-200 hover:border-deep-teal/40 hover:scale-[1.02] shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-charcoal/70 font-mono text-[11px] font-bold flex items-center justify-center border border-slate-200">
                          {idx + 1}
                        </span>
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: group.colorHex }}
                        />
                      </div>

                      <div className="my-1">
                        <span className="font-serif font-bold text-sm sm:text-base text-deep-teal group-hover:text-coral transition-colors block">
                          {group.shortName}
                        </span>
                        <span className="text-[11px] font-semibold text-charcoal/60 block mt-0.5">
                          {group.platePercentage} Target
                        </span>
                      </div>

                      <span className="w-full text-[11px] font-bold py-1.5 rounded-xl bg-slate-100 group-hover:bg-deep-teal group-hover:text-white transition-all text-charcoal/75">
                        Drop / Tap Here
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* GAME STATE: IDLE */}
          {gameState === "idle" && (
            <div className="rounded-3xl border-2 border-dashed border-deep-teal/25 bg-gradient-to-b from-slate-50 via-white to-amber-50/30 p-8 sm:p-12 text-center space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-coral/10 text-coral flex items-center justify-center mx-auto border-2 border-coral/30 shadow-xs">
                <Zap className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h4 className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal">
                  Food Group Speed Sorter
                </h4>
                <p className="text-sm text-charcoal/80 font-sans leading-relaxed">
                  Race against the 45-second timer to classify whole foods into their respective female nourishment categories.
                  Earn streak multipliers and up to <strong>+60 bonus XP</strong>!
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={startGame}
                  className="px-6 py-3.5 rounded-2xl font-bold text-base bg-coral hover:bg-coral/95 text-white transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2 font-sans"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>Start 45s Speed Challenge</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("plate")}
                  className="px-5 py-3.5 rounded-2xl font-bold text-sm bg-white hover:bg-slate-100 text-charcoal border border-slate-300 transition-all font-sans"
                >
                  Study Plate First
                </button>
              </div>
            </div>
          )}

          {/* GAME STATE: GAME OVER */}
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
                  className="px-6 py-3.5 rounded-2xl font-bold text-base bg-coral hover:bg-coral/95 text-white transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2 font-sans"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Play Again</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("plate")}
                  className="px-5 py-3.5 rounded-2xl font-bold text-sm bg-white hover:bg-slate-100 text-charcoal border border-slate-300 transition-all font-sans flex items-center gap-2"
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
