"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Gamepad2,
  Trophy,
  Sparkles,
  Heart,
  Flame,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  ArrowRight,
  ArrowLeft,
  Check,
  Star,
  Zap,
  Activity,
  Shield,
  ThumbsUp,
  ThumbsDown,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ============================================================================
// TYPES & DATA STRUCTURES
// ============================================================================

export type GameMode = "catcher" | "match" | "clock" | "mixer";

export interface ArcadeFallingItem {
  id: string;
  name: string;
  category: string;
  isGood: boolean;
  takeaway: string;
  iconType: "sparkle" | "heart" | "shield" | "zap" | "hazard" | "droplet";
}

export interface ArcadeMatchPair {
  id: string;
  pairKey: string;
  title: string;
  category: string;
  badge: string;
  takeaway: string;
}

export interface ArcadeClockSlot {
  id: string;
  label: string;
  targetCategory: string;
  correctItemId: string;
}

export interface ArcadeClockItem {
  id: string;
  name: string;
  badge: string;
  why: string;
}

export interface ArcadeTopicPack {
  title: string;
  subtitle: string;
  catcher: {
    instruction: string;
    items: ArcadeFallingItem[];
  };
  match: {
    instruction: string;
    pairs: ArcadeMatchPair[];
  };
  clock: {
    instruction: string;
    slots: ArcadeClockSlot[];
    items: ArcadeClockItem[];
  };
}

// ============================================================================
// TOPIC ARCADE PACKS ACROSS DOMAINS
// ============================================================================

export const ARCADE_TOPIC_PACKS: Record<string, ArcadeTopicPack> = {
  cycle: {
    title: "Menstrual Cycle & Hormone Arcade",
    subtitle: "Catch biological signals, pair hormones to powers, and place cycle phases!",
    catcher: {
      instruction: "Catch true biological cycle signals! Dodge dismissive myths and hormone blockers.",
      items: [
        { id: "c-fluid", name: "Egg-White Cervical Fluid", category: "Ovulatory Signal", isGood: true, takeaway: "High estrogen produces slippery fertile mucus facilitating sperm transport!", iconType: "droplet" },
        { id: "c-temp", name: "0.5°F Basal Temp Shift", category: "Progesterone Marker", isGood: true, takeaway: "Progesterone thermogenesis confirms ovulation occurred 24-48h prior.", iconType: "sparkle" },
        { id: "c-follicle", name: "Estrogen Surge (>200 pg/mL)", category: "Follicular Peak", isGood: true, takeaway: "Triggers the critical pituitary LH spike within 24–36 hours.", iconType: "zap" },
        { id: "c-sleep", name: "Restorative Luteal Rest", category: "Metabolic Support", isGood: true, takeaway: "Metabolism rises ~100–300 kcal/day during the luteal phase; sleep repairs tissues.", iconType: "heart" },
        { id: "c-lining", name: "Healthy 8-12mm Endometrium", category: "Nutrient Cushion", isGood: true, takeaway: "Vascular lining built for implantation or clean, predictable shedding.", iconType: "shield" },
        // Hazards
        { id: "h-missing", name: "Missing Periods Is Normal For Athletes", category: "Dangerous Myth", isGood: false, takeaway: "HA (Hypothalamic Amenorrhea) indicates low energy availability (RED-S) and threatens bone density!", iconType: "hazard" },
        { id: "h-pain", name: "Severe Agonizing Pain Is Just Part of Being Female", category: "Dismissal Myth", isGood: false, takeaway: "Debilitating pain that stops school or sports is NOT normal and warrants endometriosis evaluation.", iconType: "hazard" },
        { id: "h-exact", name: "Cycles Must Be Exactly 28 Days Or Something Is Wrong", category: "Inflexible Myth", isGood: false, takeaway: "ACOG establishes 21 to 35 days as normal biological variation in adolescents and adults.", iconType: "hazard" },
        { id: "h-fasting", name: "Extreme Intermittent Fasting", category: "Endocrine Disruptor", isGood: false, takeaway: "Caloric deprivation triggers kisspeptin shutdown and suppresses GnRH pulsatility.", iconType: "hazard" },
      ],
    },
    match: {
      instruction: "Match each hormone to its biological superpower and physiological action!",
      pairs: [
        { id: "m-estrogen", pairKey: "p-estrogen", title: "Estrogen (Estradiol)", category: "Ovarian Steroid", badge: "Growth Driver", takeaway: "Thickens uterine lining, boosts serotonin, and maximizes bone mineral deposition." },
        { id: "m-estrogen-power", pairKey: "p-estrogen", title: "Proliferative Lining & Brain Focus", category: "Physiological Action", badge: "Superpower", takeaway: "Surges in the late follicular phase to prime follicle maturation and peak mood." },
        { id: "m-progesterone", pairKey: "p-prog", title: "Progesterone", category: "Corpus Luteum", badge: "Calming Hormone", takeaway: "Converts endometrium into a plush secretory cushion and stabilizes mood through GABA." },
        { id: "m-prog-power", pairKey: "p-prog", title: "Secretory Endometrium & +0.5°F Temp", category: "Physiological Action", badge: "Superpower", takeaway: "Elevates basal temperature and maintains vascular support throughout Days 15–28." },
        { id: "m-lh", pairKey: "p-lh", title: "Luteinizing Hormone (LH)", category: "Pituitary Signal", badge: "Trigger Surge", takeaway: "Surges over a rapid 24–36 hour window to trigger mature egg release from the ovary." },
        { id: "m-lh-power", pairKey: "p-lh", title: "24-Hour Ovulation Spark", category: "Physiological Action", badge: "Superpower", takeaway: "The essential hormonal event that marks ovulation and divides the cycle into two halves." },
        { id: "m-fsh", pairKey: "p-fsh", title: "Follicle-Stimulating (FSH)", category: "Pituitary Signal", badge: "Recruitment", takeaway: "Stimulates a cohort of immature follicles in the ovary at the start of each cycle." },
        { id: "m-fsh-power", pairKey: "p-fsh", title: "Dominant Follicle Selection", category: "Physiological Action", badge: "Superpower", takeaway: "Nurtures the single leading Graafian follicle until it becomes the primary estrogen factory." },
      ],
    },
    clock: {
      instruction: "Assign each biological milestone to its correct cycle phase window!",
      slots: [
        { id: "slot-menses", label: "Menstrual Phase (Days 1–5)", targetCategory: "Menses", correctItemId: "item-lining-shed" },
        { id: "slot-follicle", label: "Follicular Phase (Days 6–13)", targetCategory: "Follicular", correctItemId: "item-estrogen-rise" },
        { id: "slot-ovulation", label: "Ovulatory Window (Days 14–16)", targetCategory: "Ovulation", correctItemId: "item-lh-rupture" },
        { id: "slot-luteal", label: "Luteal Phase (Days 17–28)", targetCategory: "Luteal", correctItemId: "item-corpus-luteum" },
      ],
      items: [
        { id: "item-lining-shed", name: "Endometrial Basal Shedding (Flow)", badge: "Days 1–5", why: "Progesterone withdrawal causes the functionalis layer to shed predictably." },
        { id: "item-estrogen-rise", name: "Estrogen Climb & Follicle Growth", badge: "Days 6–13", why: "Graafian follicle grows up to 20mm, thickening the triple-line uterine wall." },
        { id: "item-lh-rupture", name: "LH Peak & Oocyte Release", badge: "Days 14–16", why: "Mature egg enters the fallopian tube; cervical mucus turns clear and stretchy." },
        { id: "item-corpus-luteum", name: "Corpus Luteum Progesterone Shield", badge: "Days 17–28", why: "Secretes progesterone to maintain the secretory lining and raise basal temp." },
      ],
    },
  },

  body: {
    title: "Puberty & Anatomy Arcade",
    subtitle: "Sort pubertal milestones, catch neuroendocrine facts, and match anatomical systems!",
    catcher: {
      instruction: "Catch true pubertal milestones and biological adaptations! Dodge harmful social myths.",
      items: [
        { id: "b-gnrh", name: "Pulsatile Nocturnal GnRH", category: "Brain Spark", isGood: true, takeaway: "Hypothalamus wakes up the pituitary gland during sleep, initiating puberty!", iconType: "zap" },
        { id: "b-thelarche", name: "Thelarche (Breast Buds)", category: "Physical Milestone", isGood: true, takeaway: "Palpable glandular breast buds are the first physical marker of female puberty.", iconType: "sparkle" },
        { id: "b-growth", name: "Peak Height Velocity (~8cm/yr)", category: "Growth Spurt", isGood: true, takeaway: "Growth spurts in females typically precede menarche by 6 to 12 months.", iconType: "heart" },
        { id: "b-bones", name: "Peak Bone Mineral Accrual", category: "Skeletal Health", isGood: true, takeaway: "Over 40% of adult skeletal mass is deposited during pubertal growth!", iconType: "shield" },
        { id: "b-asymmetry", name: "Temporary Breast Asymmetry", category: "Normal Variation", isGood: true, takeaway: "Uneven budding is completely normal and balances out over subsequent Tanner stages.", iconType: "sparkle" },
        // Hazards
        { id: "hb-late", name: "Late Bloomers Never Catch Up Somatically", category: "Harmful Myth", isGood: false, takeaway: "Pubertal onset ranges naturally from age 8 to 13; individual timing has zero impact on adult potential!", iconType: "hazard" },
        { id: "hb-diet", name: "Drastic Dieting During Pubertal Growth", category: "Growth Stunter", isGood: false, takeaway: "Caloric restriction stunts peak bone mass accrual and disrupts reproductive development.", iconType: "hazard" },
        { id: "hb-tampon", name: "Tampons Break Your Anatomy", category: "Anatomical Myth", isGood: false, takeaway: "The hymen naturally has flexible openings; tampons are completely safe at any age.", iconType: "hazard" },
        { id: "hb-shame", name: "Sweat & Body Changes Mean Poor Hygiene", category: "Stigma Myth", isGood: false, takeaway: "Apocrine sweat glands naturally activate under androgen stimulation during puberty.", iconType: "hazard" },
      ],
    },
    match: {
      instruction: "Match each Tanner stage or endocrine gland to its biological definition!",
      pairs: [
        { id: "mb-t2", pairKey: "pb-t2", title: "Tanner Stage II", category: "Puberty Stage", badge: "Thelarche", takeaway: "Firm glandular breast buds appear under areola with fine pubic hair." },
        { id: "mb-t2-def", pairKey: "pb-t2", title: "Ages 8–13 Budding Onset", category: "Clinical Definition", badge: "First Marker", takeaway: "Typically occurs 2 to 2.5 years before the onset of the first menstrual period." },
        { id: "mb-t4", pairKey: "pb-t4", title: "Tanner Stage IV", category: "Puberty Stage", badge: "Secondary Mound", takeaway: "Areola forms a distinct secondary contour; menarche typically arrives here." },
        { id: "mb-t4-def", pairKey: "pb-t4", title: "Peak Height Velocity & Menarche", category: "Clinical Definition", badge: "Growth Zenith", takeaway: "Height growth reaches maximum velocity, followed closely by first menses." },
        { id: "mb-hypothalamus", pairKey: "pb-hypo", title: "Hypothalamus (GnRH)", category: "Neuroendocrine Master", badge: "Pulse Generator", takeaway: "Releases gonadotropin-releasing hormone pulses that command the pituitary." },
        { id: "mb-hypo-def", pairKey: "pb-hypo", title: "Neuroendocrine Clock Activation", category: "Brain Axis", badge: "Command Center", takeaway: "The central governor that decides when the reproductive continuum initiates." },
        { id: "mb-ovaries", pairKey: "pb-ovaries", title: "Ovaries & Adrenals", category: "Target Organs", badge: "Steroid Factories", takeaway: "Ovaries produce estrogen and progesterone; adrenals produce DHEA for pubic hair." },
        { id: "mb-ovaries-def", pairKey: "pb-ovaries", title: "Estrogen & Androgen Release", category: "Steroid Production", badge: "Body Scaffolding", takeaway: "Orchestrates secondary sex characteristics, pelvic bone widening, and uterine growth." },
      ],
    },
    clock: {
      instruction: "Order the developmental pubertal milestones chronologically!",
      slots: [
        { id: "slot-b-thelarche", label: "Step 1: Thelarche (~Age 8–10)", targetCategory: "Step 1", correctItemId: "item-b-buds" },
        { id: "slot-b-pubarche", label: "Step 2: Pubarche (~Age 9–11)", targetCategory: "Step 2", correctItemId: "item-b-hair" },
        { id: "slot-b-growth", label: "Step 3: Growth Spurt (~Age 10–12)", targetCategory: "Step 3", correctItemId: "item-b-spurt" },
        { id: "slot-b-menarche", label: "Step 4: Menarche (~Age 11–13)", targetCategory: "Step 4", correctItemId: "item-b-period" },
      ],
      items: [
        { id: "item-b-buds", name: "Thelarche: Palpable Breast Budding", badge: "Step 1", why: "First physical sign of estrogen priming on mammary glandular tissue." },
        { id: "item-b-hair", name: "Pubarche: Initial Fine Pubic Hair", badge: "Step 2", why: "Adrenal androgens (DHEA-S) stimulate early hair follicles along labia majora." },
        { id: "item-b-spurt", name: "Peak Height Velocity (Max Growth)", badge: "Step 3", why: "Somatic growth accelerates to ~8cm/year prior to epiphyseal fusion." },
        { id: "item-b-period", name: "Menarche: First Menstrual Flow", badge: "Step 4", why: "Average age 12.4 in the US, signifying mature endometrial responsiveness." },
      ],
    },
  },

  conditions: {
    title: "Clinical Condition Detective Arcade",
    subtitle: "Catch clinical red flags, dodge dismissals, and solve the Rotterdam Diagnostic Puzzle!",
    catcher: {
      instruction: "Catch objective clinical symptoms that warrant medical workup! Dodge dismissive phrases.",
      items: [
        { id: "cd-nsaid", name: "Dysmenorrhea Unresponsive to NSAIDs", category: "Clinical Red Flag", isGood: true, takeaway: "ACOG Opinion 760: Pain unresponsive to ibuprofen suggests secondary dysmenorrhea (endometriosis).", iconType: "shield" },
        { id: "cd-bowel", name: "Cyclic Bowel or Bladder Pain", category: "Infiltrating Sign", isGood: true, takeaway: "Pain with urination or bowel movements during menstruation indicates peritoneal implants.", iconType: "zap" },
        { id: "cd-heavy", name: "Soaking >1 Pad/Tampon Per Hour", category: "Menorrhagia Warning", isGood: true, takeaway: "Excessive blood loss risks iron deficiency anemia and indicates potential adenomyosis/fibroids.", iconType: "droplet" },
        { id: "cd-acne", name: "Severe Cystic Jawline Acne & Hirsutism", category: "Androgen Sign", isGood: true, takeaway: "Clinical indicators of hyperandrogenism; meets Rotterdam criteria for PCOS workup.", iconType: "sparkle" },
        { id: "cd-delay", name: "Cycles Missing For >90 Days", category: "Amenorrhea Warning", isGood: true, takeaway: "Secondary amenorrhea requires ruling out pregnancy, PCOS, hyperprolactinemia, and thyroid dysfunction.", iconType: "heart" },
        // Hazards (Medical Dismissals)
        { id: "hd-bath", name: "Just Take a Warm Bath and Relax", category: "Dismissal Hazard", isGood: false, takeaway: "Hot baths do not treat chronic inflammatory lesions or hormonal imbalances.", iconType: "hazard" },
        { id: "hd-head", name: "You're Just Exaggerating, It's All in Your Head", category: "Gaslighting Hazard", isGood: false, takeaway: "Contributes to the tragic 7–10 year average diagnostic delay for endometriosis.", iconType: "hazard" },
        { id: "hd-normal", name: "All Women Suffer From Cramps, Get Used to It", category: "False Equivalence", isGood: false, takeaway: "Normal primary cramps are mild. Debilitating pain missing school or athletics is pathology.", iconType: "hazard" },
        { id: "hd-wait", name: "Come Back in 5 Years If It Doesn't Get Better", category: "Care Delay Hazard", isGood: false, takeaway: "Early diagnosis prevents irreversible pelvic adhesions and chronic neuropathic pain sensitization.", iconType: "hazard" },
      ],
    },
    match: {
      instruction: "Match clinical diagnostic tools to what they detect in pelvic conditions!",
      pairs: [
        { id: "mc-rotterdam", pairKey: "pc-rotterdam", title: "Rotterdam Criteria", category: "PCOS Standard", badge: "2 of 3 Rule", takeaway: "Requires meeting 2 of 3: irregular cycles, high androgens, or polycystic ultrasound appearance." },
        { id: "mc-rotterdam-def", pairKey: "pc-rotterdam", title: "Global PCOS Diagnostic Framework", category: "Clinical Guideline", badge: "Monash / ACOG", takeaway: "Prevents underdiagnosis while ruling out mimicking conditions." },
        { id: "mc-laparoscopy", pairKey: "pc-laparoscopy", title: "Diagnostic Laparoscopy", category: "Gold Standard", badge: "Endometriosis", takeaway: "Minimally invasive surgical visualization and histologic biopsy of endometrial-like tissue outside uterus." },
        { id: "mc-lap-def", pairKey: "pc-laparoscopy", title: "Direct Lesion Visualization & Biopsy", category: "Surgical Evidence", badge: "Definitive Proof", takeaway: "Confirms peritoneal, ovarian endometrioma, or deep infiltrating lesions." },
        { id: "mc-ferritin", pairKey: "pc-ferritin", title: "Serum Ferritin Test", category: "Lab Bloodwork", badge: "Iron Storage", takeaway: "Measures deep cellular iron stores depleted by heavy menstrual bleeding (menorrhagia)." },
        { id: "mc-ferritin-def", pairKey: "pc-ferritin", title: "Cellular Oxygen Carrier Reserve", category: "Blood Biomarker", badge: "Target >30–50 ng/mL", takeaway: "Low ferritin causes athletic exhaustion and brain fog even before hemoglobin drops." },
        { id: "mc-ultrasound", pairKey: "pc-ultrasound", title: "High-Resolution Pelvic Ultrasound", category: "Imaging Standard", badge: "ACOG First-Line", takeaway: "Evaluates uterine wall thickness (adenomyosis), ovarian cysts, and follicle count." },
        { id: "mc-ultrasound-def", pairKey: "pc-ultrasound", title: "Follicle Count (>=20) & Volume (>10mL)", category: "Sonographic Marker", badge: "Morphology", takeaway: "Detects polycystic morphology or endometrioma cysts (chocolate cysts)." },
      ],
    },
    clock: {
      instruction: "Assemble the Rotterdam Diagnostic Evaluation Protocol!",
      slots: [
        { id: "slot-c-history", label: "Step 1: Clinical Symptom History", targetCategory: "History", correctItemId: "item-c-history" },
        { id: "slot-c-blood", label: "Step 2: Endocrine Blood Workup", targetCategory: "Bloodwork", correctItemId: "item-c-blood" },
        { id: "slot-c-imaging", label: "Step 3: Pelvic Ultrasound Imaging", targetCategory: "Imaging", correctItemId: "item-c-imaging" },
        { id: "slot-c-action", label: "Step 4: Shared Management Plan", targetCategory: "Plan", correctItemId: "item-c-action" },
      ],
      items: [
        { id: "item-c-history", name: "Objective Cycle & Symptom Tracking", badge: "Step 1", why: "Logs cycle lengths, pain scores (NRS 1-10), and interference with daily activities." },
        { id: "item-c-blood", name: "Free Testosterone, DHEA-S, TSH & Ferritin", badge: "Step 2", why: "Measures androgen excess while ruling out thyroid and adrenal etiologies." },
        { id: "item-c-imaging", name: "Pelvic Ultrasound (PCOM & Adenomyosis)", badge: "Step 3", why: "Visualizes >=20 follicles per ovary or myometrial heterogeneity." },
        { id: "item-c-action", name: "Multi-Disciplinary Care & Lifestyle Support", badge: "Step 4", why: "Combines cyclic hormonal support, anti-inflammatories, nutrition, and physical therapy." },
      ],
    },
  },
};

// ============================================================================
// MAIN LESSON ARCADE GAME COMPONENT
// ============================================================================

interface LessonArcadeGameProps {
  categoryKey?: string;
  topicId?: string;
  topicTitle?: string;
  onGameComplete?: (bonusXp: number) => void;
  characterAvatar?: "sofia" | "maya" | "jordan" | "amina";
}

export function LessonArcadeGame({
  categoryKey = "cycle",
  topicId,
  topicTitle,
  onGameComplete,
  characterAvatar = "sofia",
}: LessonArcadeGameProps) {
  // Select topic pack: cycle, body, or conditions
  const packKey =
    categoryKey === "body"
      ? "body"
      : categoryKey === "conditions" || categoryKey === "pcos" || categoryKey === "endo"
      ? "conditions"
      : "cycle";

  const pack = ARCADE_TOPIC_PACKS[packKey];
  const [activeMode, setActiveMode] = useState<GameMode>("catcher");

  // XP & Game rewards
  const [earnedModes, setEarnedModes] = useState<Set<string>>(new Set());
  const [totalXpBonus, setTotalXpBonus] = useState<number>(0);

  const handleModeComplete = (mode: string, xp: number) => {
    if (!earnedModes.has(mode)) {
      const next = new Set(earnedModes);
      next.add(mode);
      setEarnedModes(next);
      setTotalXpBonus((prev) => prev + xp);
      if (onGameComplete) onGameComplete(xp);
    }
  };

  return (
    <div className="rounded-3xl border-2 border-deep-teal/20 bg-white p-4 sm:p-6 shadow-md space-y-5">
      {/* Top Arcade Mode Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-deep-teal/15 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-raspberry text-white shadow-2xs font-sans">
              <Gamepad2 className="w-4 h-4" />
              <span>Interactive Learning Arcade</span>
            </span>
            {totalXpBonus > 0 && (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full font-sans">
                +{totalXpBonus} Arcade XP Earned!
              </span>
            )}
          </div>
          <h4 className="text-2xl sm:text-3xl font-serif font-bold text-deep-teal mt-1">
            {pack.title}
          </h4>
          <p className="text-xs sm:text-sm text-charcoal/70 font-sans mt-0.5">
            {pack.subtitle}
          </p>
        </div>

        {/* 3 Game Mode Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveMode("catcher")}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === "catcher"
                ? "bg-raspberry text-white shadow-xs"
                : "text-charcoal/70 hover:text-deep-teal hover:bg-white/60"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Speed Catcher</span>
            {earnedModes.has("catcher") && <span>✓</span>}
          </button>

          <button
            type="button"
            onClick={() => setActiveMode("match")}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === "match"
                ? "bg-deep-teal text-white shadow-xs"
                : "text-charcoal/70 hover:text-deep-teal hover:bg-white/60"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Pair Match</span>
            {earnedModes.has("match") && <span>✓</span>}
          </button>

          <button
            type="button"
            onClick={() => setActiveMode("clock")}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMode === "clock"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-charcoal/70 hover:text-deep-teal hover:bg-white/60"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Phase Sorter</span>
            {earnedModes.has("clock") && <span>✓</span>}
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE GAME MODE */}
      {activeMode === "catcher" && (
        <ArcadeSpeedCatcher
          instruction={pack.catcher.instruction}
          itemsPool={pack.catcher.items}
          characterAvatar={characterAvatar}
          onComplete={() => handleModeComplete("catcher", 35)}
        />
      )}

      {activeMode === "match" && (
        <ArcadeMemoryMatch
          instruction={pack.match.instruction}
          pairsPool={pack.match.pairs}
          onComplete={() => handleModeComplete("match", 35)}
        />
      )}

      {activeMode === "clock" && (
        <ArcadePhaseClock
          instruction={pack.clock.instruction}
          slots={pack.clock.slots}
          items={pack.clock.items}
          onComplete={() => handleModeComplete("clock", 35)}
        />
      )}
    </div>
  );
}

// ============================================================================
// GAME 1: SPEED SIGNAL CATCHER ARCADE (CATCH GOOD, DODGE HAZARDS)
// ============================================================================

interface ActiveFallingEntity {
  uid: number;
  item: ArcadeFallingItem;
  x: number; // percentage 10% to 90%
  y: number; // percentage -10% to 100%
  speed: number;
}

function ArcadeSpeedCatcher({
  instruction,
  itemsPool,
  characterAvatar = "sofia",
  onComplete,
}: {
  instruction: string;
  itemsPool: ArcadeFallingItem[];
  characterAvatar?: "sofia" | "maya" | "jordan" | "amina";
  onComplete: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [catcherX, setCatcherX] = useState<number>(50); // percentage 10% to 90%
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [fallingEntities, setFallingEntities] = useState<ActiveFallingEntity[]>([]);
  const [caughtFeedback, setCaughtFeedback] = useState<{ text: string; isGood: boolean } | null>(null);

  const nextUid = useRef<number>(1);
  const animationFrameId = useRef<number | null>(null);
  const lastSpawnTime = useRef<number>(0);
  const arenaRef = useRef<HTMLDivElement>(null);

  // Key controls (Left/Right arrows or A/D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || isGameOver) return;
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        setCatcherX((x) => Math.max(12, x - 7));
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        setCatcherX((x) => Math.min(88, x + 7));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, isGameOver]);

  // Touch / pointer tracking across the arena
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPlaying || isGameOver || !arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
    setCatcherX(Math.max(12, Math.min(88, relativeX)));
  };

  // Main game tick loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const tick = (now: number) => {
      // Spawn new falling item every 1200ms
      if (now - lastSpawnTime.current > 1200) {
        lastSpawnTime.current = now;
        const randomItem = itemsPool[Math.floor(Math.random() * itemsPool.length)];
        const newEntity: ActiveFallingEntity = {
          uid: nextUid.current++,
          item: randomItem,
          x: Math.floor(Math.random() * 70) + 15,
          y: -8,
          speed: 0.95 + Math.random() * 0.4,
        };
        setFallingEntities((prev) => [...prev, newEntity]);
      }

      // Update positions & check collisions
      setFallingEntities((prev) => {
        const next: ActiveFallingEntity[] = [];

        for (const entity of prev) {
          const updatedY = entity.y + entity.speed;

          // Check collision with catcher basket at y=76-88%
          if (updatedY >= 75 && updatedY <= 86 && Math.abs(entity.x - catcherX) < 14) {
            // Collision detected!
            if (entity.item.isGood) {
              setScore((s) => {
                const nextScore = s + 10;
                if (nextScore >= 100) {
                  setIsGameOver(true);
                  onComplete();
                }
                return nextScore;
              });
              setStreak((st) => st + 1);
              setCaughtFeedback({ text: `+10 ${entity.item.name}!`, isGood: true });
            } else {
              setStreak(0);
              setLives((l) => {
                const nextLives = l - 1;
                if (nextLives <= 0) {
                  setIsGameOver(true);
                }
                return nextLives;
              });
              setCaughtFeedback({ text: `HAZARD: ${entity.item.name}!`, isGood: false });
            }
            continue; // Entity caught, remove from arena
          }

          // Entity fell off bottom
          if (updatedY > 96) {
            continue;
          }

          next.push({ ...entity, y: updatedY });
        }

        return next;
      });

      animationFrameId.current = requestAnimationFrame(tick);
    };

    animationFrameId.current = requestAnimationFrame(tick);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isPlaying, isGameOver, catcherX, itemsPool, onComplete]);

  const handleStart = () => {
    setScore(0);
    setStreak(0);
    setLives(3);
    setFallingEntities([]);
    setIsGameOver(false);
    setIsPlaying(true);
    setCaughtFeedback(null);
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <p className="text-charcoal/80 font-medium m-0">{instruction}</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-xl">
            {[1, 2, 3].map((h) => (
              <Heart
                key={h}
                className={`w-3.5 h-3.5 ${h <= lives ? "fill-rose-500 text-rose-500" : "text-slate-300"}`}
              />
            ))}
          </div>
          <span className="font-bold text-deep-teal bg-light-teal px-3 py-0.5 rounded-full border border-deep-teal/20">
            Score: <strong className="text-emerald-700">{score}</strong> / 100
          </span>
          {streak >= 2 && (
            <span className="flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full font-bold animate-pulse text-xs">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {streak}X Streak!
            </span>
          )}
        </div>
      </div>

      {/* Arcade Physics Arena */}
      <div
        ref={arenaRef}
        onPointerMove={handlePointerMove}
        className="relative w-full h-[340px] sm:h-[380px] rounded-3xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden border-2 border-slate-700 shadow-inner select-none cursor-ew-resize touch-none"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        {/* Start / Game Over Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 z-30 bg-slate-900/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-raspberry text-white flex items-center justify-center shadow-lg">
              <Zap className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <h5 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {isGameOver ? (score >= 100 ? "Victory! Mastery Achieved!" : "Challenge Complete!") : "Speed Signal Catcher"}
              </h5>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-1">
                Move your catcher to catch beneficial biological signals (+10 pts) and dodge harmful medical myths (-1 heart)! Reach 100 points to win +35 XP.
              </p>
            </div>
            <Button
              onClick={handleStart}
              className="bg-coral text-white hover:bg-coral/90 font-bold px-8 h-12 rounded-2xl shadow-md text-base cursor-pointer"
            >
              {isGameOver ? "Play Again" : "Start Arcade Game"}
            </Button>
          </div>
        )}

        {/* Caught Feedback Banner at Top */}
        {caughtFeedback && (
          <div
            className={`absolute top-3 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full text-xs font-bold shadow-md animate-in fade-in ${
              caughtFeedback.isGood
                ? "bg-emerald-500 text-white border border-emerald-300"
                : "bg-rose-500 text-white border border-rose-300"
            }`}
          >
            {caughtFeedback.text}
          </div>
        )}

        {/* Falling Entities */}
        {fallingEntities.map((entity) => {
          return (
            <div
              key={entity.uid}
              className="absolute -translate-x-1/2 pointer-events-none transition-all duration-75"
              style={{ left: `${entity.x}%`, top: `${entity.y}%` }}
            >
              <div
                className={`px-3 py-1.5 rounded-2xl border flex items-center gap-1.5 shadow-md whitespace-nowrap text-xs font-bold ${
                  entity.item.isGood
                    ? "bg-white text-slate-900 border-emerald-400 shadow-emerald-500/20"
                    : "bg-slate-900 text-rose-300 border-rose-500 shadow-rose-500/20"
                }`}
              >
                {entity.item.isGood ? (
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-rose-500" />
                )}
                <span>{entity.item.name}</span>
              </div>
            </div>
          );
        })}

        {/* Catcher Basket / Avatar at Bottom */}
        <div
          className="absolute bottom-3 -translate-x-1/2 pointer-events-none transition-all duration-75 flex flex-col items-center"
          style={{ left: `${catcherX}%` }}
        >
          {/* Avatar Face Indicator */}
          <div className="w-9 h-9 rounded-full bg-amber-100 border-2 border-amber-400 overflow-hidden shadow-sm flex items-center justify-center -mb-2 z-10">
            <span className="text-base select-none">
              {characterAvatar === "sofia" ? "👩🏾" : characterAvatar === "maya" ? "👧🏾" : "🧑🏽"}
            </span>
          </div>
          {/* Golden Catching Basket */}
          <div className="w-24 sm:w-28 h-8 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 border-2 border-amber-600 shadow-lg flex items-center justify-center">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-950 font-sans">
              Catch Signal
            </span>
          </div>
        </div>
      </div>

      {/* Onscreen Left/Right Controls for Touch / Mobile */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <Button
          variant="outline"
          onClick={() => setCatcherX((x) => Math.max(12, x - 10))}
          className="flex-1 h-11 rounded-2xl border-slate-300 font-bold text-xs sm:text-sm text-deep-teal hover:bg-slate-50 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Move Left</span>
        </Button>
        <span className="text-xs text-charcoal/60 font-medium hidden sm:inline">
          Use Arrow Keys or drag on screen
        </span>
        <Button
          variant="outline"
          onClick={() => setCatcherX((x) => Math.min(88, x + 10))}
          className="flex-1 h-11 rounded-2xl border-slate-300 font-bold text-xs sm:text-sm text-deep-teal hover:bg-slate-50 cursor-pointer"
        >
          <span>Move Right</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

// ============================================================================
// GAME 2: VISUAL MEMORY PAIR MATCH (FLIP & MATCH BIOLOGY TO FUNCTION)
// ============================================================================

interface CardState {
  id: string;
  pairKey: string;
  title: string;
  category: string;
  badge: string;
  takeaway: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function ArcadeMemoryMatch({
  instruction,
  pairsPool,
  onComplete,
}: {
  instruction: string;
  pairsPool: ArcadeMatchPair[];
  onComplete: () => void;
}) {
  const [cards, setCards] = useState<CardState[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchesCount, setMatchesCount] = useState<number>(0);
  const [activeTakeaway, setActiveTakeaway] = useState<string | null>(null);

  // Initialize and shuffle 8 cards (4 pairs)
  const setupGame = useCallback(() => {
    const selected = pairsPool.slice(0, 8);
    const shuffled = [...selected]
      .sort(() => Math.random() - 0.5)
      .map((p) => ({
        ...p,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setSelectedCards([]);
    setMatchesCount(0);
    setActiveTakeaway(null);
  }, [pairsPool]);

  useEffect(() => {
    setupGame();
  }, [setupGame]);

  const handleCardClick = (idx: number) => {
    if (cards[idx].isFlipped || cards[idx].isMatched || selectedCards.length === 2) return;

    const nextFlipped = cards.map((c, i) => (i === idx ? { ...c, isFlipped: true } : c));
    setCards(nextFlipped);

    const newSelected = [...selectedCards, idx];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const [firstIdx, secondIdx] = newSelected;
      const firstCard = nextFlipped[firstIdx];
      const secondCard = nextFlipped[secondIdx];

      if (firstCard.pairKey === secondCard.pairKey) {
        // MATCH!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, isMatched: true } : c
            )
          );
          setSelectedCards([]);
          setMatchesCount((m) => {
            const nextM = m + 1;
            if (nextM >= 4) {
              onComplete();
            }
            return nextM;
          });
          setActiveTakeaway(firstCard.takeaway);
        }, 300);
      } else {
        // NO MATCH -> FLIP BACK
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) =>
              i === firstIdx || i === secondIdx ? { ...c, isFlipped: false } : c
            )
          );
          setSelectedCards([]);
        }, 1100);
      }
    }
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <p className="text-charcoal/80 font-medium m-0">{instruction}</p>
        <div className="flex items-center gap-2">
          <span className="font-bold text-deep-teal bg-light-teal px-3 py-1 rounded-full border border-deep-teal/20">
            Matched: {matchesCount} of 4 Pairs
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={setupGame}
            className="text-xs text-charcoal/70 hover:text-deep-teal cursor-pointer h-7"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            <span>Reset</span>
          </Button>
        </div>
      </div>

      {/* 4x2 Responsive Flip Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cards.map((card, idx) => {
          return (
            <button
              key={`${card.id}-${idx}`}
              type="button"
              onClick={() => handleCardClick(idx)}
              className={`min-h-[110px] p-3 rounded-2xl border-2 text-left transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-2xs ${
                card.isMatched
                  ? "bg-emerald-50 border-emerald-500 shadow-md ring-1 ring-emerald-500/20"
                  : card.isFlipped
                  ? "bg-white border-deep-teal shadow-md"
                  : "bg-slate-100 border-slate-300 hover:border-deep-teal/40 hover:bg-slate-50"
              }`}
            >
              {card.isFlipped || card.isMatched ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/60 truncate">
                      {card.category}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                        card.isMatched ? "bg-emerald-600 text-white" : "bg-deep-teal text-white"
                      }`}
                    >
                      {card.badge}
                    </span>
                  </div>
                  <h6 className="font-serif font-bold text-sm sm:text-base text-deep-teal leading-snug my-1">
                    {card.title}
                  </h6>
                  <span className="text-[10px] text-emerald-800 font-semibold">
                    {card.isMatched ? "✓ Matched Pair" : "Finding Pair..."}
                  </span>
                </>
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center text-center py-4 space-y-1">
                  <div className="w-8 h-8 rounded-full bg-deep-teal/10 text-deep-teal flex items-center justify-center font-bold text-sm">
                    ✦
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/50">
                    Tap to Flip
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Clinical Takeaway Callout on Match */}
      {activeTakeaway && (
        <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-300 flex items-start gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-xs uppercase tracking-wider text-emerald-900 block font-bold">
              Pair Verified! Biological Superpower:
            </strong>
            <p className="text-xs sm:text-sm text-emerald-950 m-0 leading-relaxed font-medium">
              {activeTakeaway}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// GAME 3: PHASE CLOCK / TIMELINE PLACEMENT (CIRCULAR TIMING & PHASES)
// ============================================================================

function ArcadePhaseClock({
  instruction,
  slots,
  items,
  onComplete,
}: {
  instruction: string;
  slots: ArcadeClockSlot[];
  items: ArcadeClockItem[];
  onComplete: () => void;
}) {
  const [placedAssignments, setPlacedAssignments] = useState<Record<string, string>>({});
  const [selectedItem, setSelectedItem] = useState<ArcadeClockItem | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const isAllSolved =
    slots.length > 0 && slots.every((s) => placedAssignments[s.id] === s.correctItemId);

  const handleSlotClick = (slot: ArcadeClockSlot) => {
    if (!selectedItem) return;

    if (selectedItem.id === slot.correctItemId) {
      const next = { ...placedAssignments, [slot.id]: selectedItem.id };
      setPlacedAssignments(next);
      setSelectedItem(null);
      setFeedback(`Correct! ${selectedItem.name} placed in ${slot.label}.`);

      if (slots.every((s) => next[s.id] === s.correctItemId)) {
        onComplete();
      }
    } else {
      setFeedback(`Not quite! That biological event belongs in a different phase window.`);
    }
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <p className="text-charcoal/80 font-medium m-0">{instruction}</p>
        <span className="font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
          Placed: {Object.keys(placedAssignments).length} of {slots.length}
        </span>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-amber-950 flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Target Timeline / Phase Slots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {slots.map((slot) => {
          const placedItemId = placedAssignments[slot.id];
          const placedItem = items.find((i) => i.id === placedItemId);

          return (
            <button
              key={slot.id}
              type="button"
              onClick={() => handleSlotClick(slot)}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between min-h-[90px] ${
                placedItem
                  ? "bg-emerald-50 border-emerald-500 shadow-xs"
                  : selectedItem
                  ? "bg-amber-50/70 border-amber-400 border-dashed hover:bg-amber-100"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-deep-teal">
                  {slot.label}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    placedItem ? "bg-emerald-600 text-white" : "bg-slate-200 text-charcoal/60"
                  }`}
                >
                  {placedItem ? "Locked (✓)" : "Drop Target"}
                </span>
              </div>

              {placedItem ? (
                <div className="space-y-0.5">
                  <strong className="text-sm font-bold text-emerald-950 block">
                    {placedItem.name}
                  </strong>
                  <p className="text-xs text-emerald-800 m-0 leading-snug">{placedItem.why}</p>
                </div>
              ) : (
                <span className="text-xs text-charcoal/50 italic">
                  {selectedItem ? "Tap to assign selected item here" : "Select an event below first"}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Unplaced Items Tray */}
      <div>
        <h6 className="text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-2">
          Select an Event to Place into the Phase Timeline:
        </h6>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {items.map((item) => {
            const isAlreadyPlaced = Object.values(placedAssignments).includes(item.id);
            const isSelected = selectedItem?.id === item.id;

            return (
              <button
                key={item.id}
                type="button"
                disabled={isAlreadyPlaced}
                onClick={() => setSelectedItem(item)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isAlreadyPlaced
                    ? "opacity-35 bg-slate-100 border-slate-200 cursor-not-allowed"
                    : isSelected
                    ? "bg-amber-500 text-white border-amber-600 shadow-xs font-bold"
                    : "bg-white text-charcoal border-slate-200 hover:border-amber-400 hover:bg-amber-50/50"
                }`}
              >
                <div className="min-w-0 pr-2">
                  <span className="text-xs sm:text-sm font-bold block truncate">{item.name}</span>
                  <span className={`text-[11px] block ${isSelected ? "text-white/80" : "text-charcoal/60"}`}>
                    {item.why}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    isSelected ? "bg-white text-amber-900" : "bg-slate-100 text-charcoal/70"
                  }`}
                >
                  {isAlreadyPlaced ? "Placed" : item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
