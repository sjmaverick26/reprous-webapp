"use client";

import React, { useState, useMemo } from "react";
import { BookOpen, Search, Sparkles, Volume2, HelpCircle, CheckCircle2, Heart, Activity } from "lucide-react";

export interface DictionaryEntry {
  id: string;
  term: string;
  pronunciation: string;
  category: "cycles" | "hormones" | "athlete" | "conditions" | "anatomy";
  categoryLabel: string;
  categoryColor: string;
  plainEnglish: string;
  doctorDefinition: string;
  howToSayIt: string;
}

export const DICTIONARY_ENTRIES: DictionaryEntry[] = [
  {
    id: "amenorrhea",
    term: "Amenorrhea",
    pronunciation: "ay-men-oh-REE-uh",
    category: "cycles",
    categoryLabel: "Cycles & Periods",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    plainEnglish: "Missing your period for 3 or more months in a row when you are not pregnant. It is your body's way of saying: 'Something is putting stress on my system.'",
    doctorDefinition: "The absence of menstrual periods; classified as primary (never started by age 15) or secondary (stopped for 90+ days).",
    howToSayIt: "“My period has stopped for three months. I learned this is called secondary amenorrhea and I want to investigate why.”",
  },
  {
    id: "dysmenorrhea",
    term: "Dysmenorrhea",
    pronunciation: "dis-men-oh-REE-uh",
    category: "cycles",
    categoryLabel: "Cycles & Periods",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    plainEnglish: "Severe, throbbing period cramps that stop you from going to school, playing sports, or doing normal things. Mild cramps are normal; pain that stops your day is not.",
    doctorDefinition: "Painful menstruation caused by excessive uterine prostaglandins (primary) or underlying pelvic pathology such as endometriosis (secondary).",
    howToSayIt: "“My period cramps are so bad that painkillers don't touch them and I have to stay in bed. Can we check if there is an underlying reason?”",
  },
  {
    id: "red-s",
    term: "RED-S (Relative Energy Deficiency in Sport)",
    pronunciation: "red-ess",
    category: "athlete",
    categoryLabel: "Female Athlete Health",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    plainEnglish: "When an active girl or athlete does not eat enough fuel to match how hard she exercises. The brain turns off periods and slows metabolism to save energy.",
    doctorDefinition: "A clinical syndrome of impaired physiological functioning caused by low energy availability, affecting bone health, immunity, protein synthesis, and cycle regularity.",
    howToSayIt: "“I've increased my training hours and noticed my period vanished and I am always tired. Could this be low energy availability or RED-S?”",
  },
  {
    id: "female-athlete-triad",
    term: "Female Athlete Triad",
    pronunciation: "TRI-ad",
    category: "athlete",
    categoryLabel: "Female Athlete Health",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    plainEnglish: "Three connected warnings in active girls: under-fueling (not enough food), irregular or lost periods, and weak bones prone to stress fractures.",
    doctorDefinition: "An interrelationship between energy availability, menstrual function, and bone mineral density that may lead to long-term osteopenia or osteoporosis.",
    howToSayIt: "“I had a stress fracture in my foot and my cycle is irregular. I want to check my bone density and fuel levels for the Female Athlete Triad.”",
  },
  {
    id: "pcos",
    term: "PCOS (Polycystic Ovary Syndrome)",
    pronunciation: "pee-see-oh-ess",
    category: "conditions",
    categoryLabel: "Conditions & Care",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    plainEnglish: "A super common hormonal balance where ovaries produce slightly more androgens (testosterone), causing periods to be irregular, acne, or fatigue.",
    doctorDefinition: "An endocrine disorder characterized by hyperandrogenism, ovulatory dysfunction (irregular/absent periods), and polycystic ovarian morphology on ultrasound.",
    howToSayIt: "“My cycles are 45 to 60 days apart and I have stubborn hormonal acne. Could we run a blood panel to check for PCOS?”",
  },
  {
    id: "endometriosis",
    term: "Endometriosis",
    pronunciation: "en-doh-mee-tree-OH-sis",
    category: "conditions",
    categoryLabel: "Conditions & Care",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    plainEnglish: "When tissue similar to the lining inside your uterus grows outside on other organs (like your ovaries or bladder). It bleeds and inflames during periods, causing deep pain.",
    doctorDefinition: "A chronic inflammatory condition where endometrial-like tissue implants outside the uterine cavity, inducing chronic pelvic pain, dyspareunia, and adhesions.",
    howToSayIt: "“I have deep pelvic pain that radiates down my legs during periods and pain with bowel movements. I want to be evaluated for endometriosis.”",
  },
  {
    id: "estrogen",
    term: "Estrogen",
    pronunciation: "ESS-truh-jin",
    category: "hormones",
    categoryLabel: "Hormones & Brain",
    categoryColor: "bg-amber-100 text-amber-900 border-amber-300",
    plainEnglish: "Your body's natural builder hormone. It gives you energy, protects your heart and bones from breaking, and rebuilds the soft lining of your uterus each month.",
    doctorDefinition: "The primary female steroid sex hormone responsible for secondary sexual characteristics, bone mineral preservation, and endometrial proliferation.",
    howToSayIt: "“If my periods have stopped, does that mean my estrogen levels are too low to protect my bone density?”",
  },
  {
    id: "progesterone",
    term: "Progesterone",
    pronunciation: "pro-JESS-tuh-rone",
    category: "hormones",
    categoryLabel: "Hormones & Brain",
    categoryColor: "bg-amber-100 text-amber-900 border-amber-300",
    plainEnglish: "Your body's calming, balancing hormone. It only gets made after you release an egg (ovulate), helping your sleep, mood, and balancing estrogen.",
    doctorDefinition: "An endogenous steroid hormone secreted by the corpus luteum following ovulation to prepare and stabilize the endometrium for potential implantation.",
    howToSayIt: "“I want to confirm if I am actually ovulating and producing enough progesterone in the second half of my cycle.”",
  },
  {
    id: "ovulation",
    term: "Ovulation",
    pronunciation: "ov-yoo-LAY-shun",
    category: "cycles",
    categoryLabel: "Cycles & Periods",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    plainEnglish: "The main event of your cycle! Roughly halfway through, one ovary gently releases a mature egg into the fallopian tube. This is what unlocks progesterone.",
    doctorDefinition: "The release of a secondary oocyte from the mature ovarian follicle triggered by a sharp mid-cycle luteinizing hormone (LH) surge.",
    howToSayIt: "“How can I track signs of ovulation like cervical fluid and morning temperature to confirm my cycle is healthy?”",
  },
  {
    id: "endometrium",
    term: "Endometrium (Uterine Lining)",
    pronunciation: "en-doh-MEE-tree-um",
    category: "anatomy",
    categoryLabel: "Anatomy",
    categoryColor: "bg-rose-100 text-rose-800 border-rose-300",
    plainEnglish: "The plush, nutrient-rich cushion that grows inside your uterus each month. When you don't get pregnant, your body gently sheds it — that is your period!",
    doctorDefinition: "The mucosal inner epithelial layer of the mammalian uterus that thickens and sheds during the menstrual cycle under ovarian hormone control.",
    howToSayIt: "“Is my period flow heavy because my endometrium is building up too thick between cycles?”",
  },
  {
    id: "cervix",
    term: "Cervix",
    pronunciation: "SER-viks",
    category: "anatomy",
    categoryLabel: "Anatomy",
    categoryColor: "bg-rose-100 text-rose-800 border-rose-300",
    plainEnglish: "The tiny, donut-shaped doorway connecting the bottom of your uterus to your vagina. It opens slightly during periods and makes natural, healthy fluid.",
    doctorDefinition: "The lower, narrow cylindrical part of the uterus that opens into the vagina, producing protective mucus that changes consistency across the cycle.",
    howToSayIt: "“I noticed clear, stretchy discharge mid-cycle. Is this normal cervical fluid indicating my fertile window?”",
  },
  {
    id: "androgens",
    term: "Androgens",
    pronunciation: "AN-droh-jinz",
    category: "hormones",
    categoryLabel: "Hormones & Brain",
    categoryColor: "bg-amber-100 text-amber-900 border-amber-300",
    plainEnglish: "A family of hormones (including testosterone) that everyone makes. They support muscle strength, sex drive, and energy. If too high, they can cause acne or irregular periods.",
    doctorDefinition: "Steroid hormones that regulate the development and maintenance of male characteristics, synthesized in small amounts by the female ovaries and adrenal glands.",
    howToSayIt: "“Can we test my free and total testosterone levels to see if elevated androgens are affecting my skin and periods?”",
  },
  {
    id: "prostaglandins",
    term: "Prostaglandins",
    pronunciation: "pros-tuh-GLAN-dinz",
    category: "hormones",
    categoryLabel: "Hormones & Brain",
    categoryColor: "bg-amber-100 text-amber-900 border-amber-300",
    plainEnglish: "Natural chemicals your uterus releases to make muscles squeeze and push out period blood. High levels cause painful cramps, nausea, and period poops!",
    doctorDefinition: "Lipid autacoids produced enzymatically from arachidonic acid that trigger myometrial contractions and inflammatory pain during menses.",
    howToSayIt: "“Are my severe cramps caused by excess prostaglandins, and can anti-inflammatory strategies like ibuprofen before my period help?”",
  },
  {
    id: "follicular-phase",
    term: "Follicular Phase",
    pronunciation: "foh-LIK-yoo-ler",
    category: "cycles",
    categoryLabel: "Cycles & Periods",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    plainEnglish: "The first half of your cycle, from Day 1 of bleeding until ovulation. Estrogen rises, energy climbs, and your body feels ready to tackle workouts.",
    doctorDefinition: "The phase of the estrous cycle during which follicles in the ovary mature, concluding with ovulation; dominated by estrogen secretion.",
    howToSayIt: "“I notice my athletic energy is highest during my follicular phase. How can I tailor my workouts around this?”",
  },
  {
    id: "luteal-phase",
    term: "Luteal Phase",
    pronunciation: "LOO-tee-ul",
    category: "cycles",
    categoryLabel: "Cycles & Periods",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    plainEnglish: "The second half of your cycle (about 12–14 days) between ovulation and your next period. Progesterone rises, raising your body temperature and appetite slightly.",
    doctorDefinition: "The post-ovulatory phase of the menstrual cycle characterized by the formation and activity of the corpus luteum, secreting progesterone.",
    howToSayIt: "“My luteal phase is only 8 days long before bleeding starts. Does that mean my progesterone drops too early?”",
  },
  {
    id: "ferritin",
    term: "Ferritin (Iron Storage)",
    pronunciation: "FAIR-ih-tin",
    category: "athlete",
    categoryLabel: "Female Athlete Health",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    plainEnglish: "The battery storage for iron in your body. Active girls lose iron through sweat and periods. When ferritin drops, you feel exhausted, breathless, and cold.",
    doctorDefinition: "A universal intracellular protein that stores iron and releases it in a controlled fashion; the most reliable serum marker for total body iron reserves.",
    howToSayIt: "“Even though my standard hemoglobin is okay, could we check my serum ferritin? Heavy training and periods leave me exhausted.”",
  },
  {
    id: "menarche",
    term: "Menarche",
    pronunciation: "men-AR-kee",
    category: "cycles",
    categoryLabel: "Cycles & Periods",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    plainEnglish: "The medical name for your very first period. It usually happens about 2 years after breast buds start to develop, anywhere from age 9 to 15.",
    doctorDefinition: "The first occurrence of menstruation in a female human, marking the onset of female reproductive capacity during puberty.",
    howToSayIt: "“I reached menarche at age 13, but my cycles have been spaced 60 days apart since then. Is this normal synchronization?”",
  },
  {
    id: "anovulation",
    term: "Anovulation",
    pronunciation: "an-ov-yoo-LAY-shun",
    category: "conditions",
    categoryLabel: "Conditions & Care",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    plainEnglish: "When you have bleeding or a cycle, but your ovary did not actually release an egg. It's common in the first two years of periods or during times of high stress.",
    doctorDefinition: "The failure of the ovary to release an oocyte during a menstrual cycle, leading to unopposed estrogen and unpredictable bleeding patterns.",
    howToSayIt: "“I have irregular spotting. Could I be experiencing anovulatory cycles where an egg isn't actually released?”",
  },
];

export function LittleHealthDictionary({ compact = false }: { compact?: boolean }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Words" },
    { id: "cycles", label: "Cycles & Periods" },
    { id: "hormones", label: "Hormones & Brain" },
    { id: "athlete", label: "Athlete Health" },
    { id: "conditions", label: "Conditions & Care" },
    { id: "anatomy", label: "Anatomy" },
  ];

  const filteredEntries = useMemo(() => {
    return DICTIONARY_ENTRIES.filter((entry) => {
      const matchesCat = activeCategory === "all" || entry.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCat;
      const matchesSearch =
        entry.term.toLowerCase().includes(q) ||
        entry.plainEnglish.toLowerCase().includes(q) ||
        entry.pronunciation.toLowerCase().includes(q) ||
        entry.categoryLabel.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="rounded-2xl bg-gradient-to-b from-amber-50/70 via-white to-orange-50/30 border-2 border-amber-300/80 p-5 sm:p-6 shadow-sm space-y-4">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold shadow-xs shrink-0">
            <BookOpen className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-serif font-bold text-lg sm:text-xl text-deep-teal m-0">
                Little Health Dictionary
              </h4>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full">
                Plain English
              </span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/75 m-0 font-sans mt-0.5">
              Tricky medical words translated so you always feel confident at the doctor.
            </p>
          </div>
        </div>

        <div className="text-xs text-charcoal/60 font-semibold shrink-0">
          Showing {filteredEntries.length} terms
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words (e.g., amenorrhea, hormones, cramps, RED-S)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-amber-300 text-xs sm:text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-amber-400 font-sans shadow-2xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === c.id
                  ? "bg-amber-400 text-slate-950 shadow-xs scale-[1.02]"
                  : "bg-white text-charcoal/70 border border-amber-200 hover:bg-amber-100/50 hover:text-charcoal"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dictionary Word Cards Grid */}
      <div className={`grid grid-cols-1 ${compact ? "gap-3" : "sm:grid-cols-2 gap-3.5"} max-h-[420px] overflow-y-auto pr-1`}>
        {filteredEntries.length === 0 ? (
          <div className="col-span-full p-6 text-center bg-white rounded-xl border border-amber-200 text-charcoal/70 text-xs sm:text-sm">
            No terms found for &ldquo;{searchQuery}&rdquo;. Try another word or clear filters.
          </div>
        ) : (
          filteredEntries.map((entry) => {
            const isExpanded = expandedId === entry.id;

            return (
              <div
                key={entry.id}
                className="p-4 rounded-xl bg-white border-2 border-amber-200/80 shadow-2xs hover:shadow-xs transition-all space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h5 className="font-serif font-bold text-base text-deep-teal m-0 leading-tight">
                        {entry.term}
                      </h5>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-charcoal/60 bg-amber-50 px-2 py-0.5 rounded mt-1 border border-amber-200/60">
                        <Volume2 className="w-3 h-3 text-amber-700" />
                        &ldquo;{entry.pronunciation}&rdquo;
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${entry.categoryColor} shrink-0`}>
                      {entry.categoryLabel}
                    </span>
                  </div>

                  {/* Plain English Meaning */}
                  <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/60 text-xs text-charcoal/90 leading-relaxed font-sans mt-2">
                    <strong className="text-amber-950 font-bold block mb-0.5">In Plain English:</strong>
                    {entry.plainEnglish}
                  </div>
                </div>

                {/* Expandable Doctor Details */}
                <div>
                  {isExpanded ? (
                    <div className="space-y-2 pt-2 border-t border-amber-100 text-xs animate-in fade-in duration-150">
                      <div>
                        <span className="text-[11px] font-bold text-charcoal/60 block">Doctor Definition:</span>
                        <p className="text-charcoal/80 italic text-[11.5px] m-0">{entry.doctorDefinition}</p>
                      </div>
                      <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11.5px]">
                        <strong className="block mb-0.5 font-bold">💬 How to say it in your appointment:</strong>
                        {entry.howToSayIt}
                      </div>
                      <button
                        onClick={() => setExpandedId(null)}
                        className="text-[11px] font-bold text-amber-800 hover:underline pt-1"
                      >
                        Show less ↑
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setExpandedId(entry.id)}
                      className="text-[11px] font-bold text-deep-teal hover:text-raspberry transition-colors flex items-center gap-1 pt-1"
                    >
                      <span>How to say this to a doctor</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
