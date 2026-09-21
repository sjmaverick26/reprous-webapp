export type TopicType = "lesson" | "article" | "game" | "badge";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonDiagram {
  type: "cycle-wheel" | "energy-balance" | "pcos-loop" | "pelvic-map" | "anatomy-callout" | "timeline";
  title: string;
  caption: string;
}

export interface LessonVideo {
  title: string;
  source: string;
  duration: string;
  youtubeId: string;
  medicalReviewer: string;
  keyHighlights: string[];
}

export interface SorterItem {
  id: string;
  text: string;
  correctCategory: string;
  explanation: string;
}

export interface LessonSorterGame {
  title: string;
  instructions: string;
  categories: { id: string; name: string; colorClass: string }[];
  items: SorterItem[];
}

export interface VisualCard {
  title: string;
  iconName: string;
  text: string;
  highlight?: string;
}

export interface HubTopic {
  id: string;
  name: string;
  type: TopicType;
  desc: string;
  xp: number;
  readTime?: string;
  summary: string;
  keyTakeaways: string[];
  visualCards?: VisualCard[];
  diagram?: LessonDiagram;
  video?: LessonVideo;
  sorterGame?: LessonSorterGame;
  quiz?: QuizQuestion[];
  gameType?: "match" | "sort" | "scenarios";
}

export interface HubCategory {
  id: string;
  title: string;
  badge: string;
  badgeDesc: string;
  description: string;
  colorSwatch: string;
  topics: HubTopic[];
}

export const HUB_CATEGORIES: Record<string, HubCategory> = {
  body: {
    id: "body",
    title: "Body Basics",
    badge: "Body Basics Champion",
    badgeDesc: "Earned after exploring every foundational lesson on puberty, anatomy, and hormones in Body Basics.",
    description: "Puberty, anatomy, hormones, and what is actually 'normal.'",
    colorSwatch: "#F47A6A",
    topics: [
      {
        id: "body-0",
        name: "What's Puberty, Really?",
        type: "lesson",
        desc: "What changes, roughly when, and why everyone's timeline looks different.",
        xp: 50,
        readTime: "4 min read",
        summary: "Puberty is the biological transition where your brain releases hormones signaling your body to grow and mature. There is no single 'right' age — changes can start anywhere between 8 and 14+.",
        keyTakeaways: [
          "Growth spurts, voice changes, hair growth, and skin changes are completely normal.",
          "Everyone develops on their own genetic clock; starting earlier or later does not mean anything is wrong.",
          "Emotional shifts and mood fluctuations are biological responses to hormonal changes.",
        ],
        visualCards: [
          {
            title: "The Brain-Body Cascade",
            iconName: "Sparkles",
            text: "The hypothalamus and pituitary gland start producing gonadotropins (LH and FSH), sending chemical messengers to ovaries and adrenal glands.",
            highlight: "Biological trigger"
          },
          {
            title: "Physical Milestones",
            iconName: "Activity",
            text: "Physical changes unfold over several years: breast bud formation (thelarche), height acceleration, body hair growth, and eventual menarche.",
            highlight: "Individual timeline"
          },
          {
            title: "Normal Variance",
            iconName: "Heart",
            text: "Starting at age 9 or age 14 is clinically within the healthy normal range. Genetics, nutrition, and personal biology determine your schedule.",
            highlight: "No single 'right' age"
          }
        ],
        diagram: {
          type: "timeline",
          title: "Puberty Progression & Developmental Milestones",
          caption: "Step through the stages of puberty to explore timelines, hormonal triggers, and physical developments."
        },
        video: {
          title: "Puberty: How Your Body and Brain Change",
          source: "TED-Ed Education & Biology",
          duration: "4:00",
          youtubeId: "TRyOzsm_xvg",
          medicalReviewer: "Reviewed by Board-Certified Pediatricians and Adolescent Medicine Specialists",
          keyHighlights: [
            "Puberty is governed by complex hormonal cascades between the brain and endocrine glands.",
            "Bone mineral consolidation and body composition changes prepare the body for adult vitality.",
            "Mental and emotional fluctuations reflect ongoing neurodevelopmental remodeling in the brain."
          ]
        },
        sorterGame: {
          title: "Puberty Changes: Physical vs. Emotional",
          instructions: "Categorize each hallmark change of puberty to test your understanding.",
          categories: [
            { id: "physical", name: "Physical Development", colorClass: "bg-light-teal border-deep-teal text-deep-teal" },
            { id: "emotional", name: "Emotional & Social Shift", colorClass: "bg-soft-pink border-raspberry text-raspberry" }
          ],
          items: [
            {
              id: "p1",
              text: "Rapid growth spurt in height and widening of the pelvic bones",
              correctCategory: "physical",
              explanation: "Growth spurts are driven by growth hormone and rising estrogen levels consolidating bone growth."
            },
            {
              id: "p2",
              text: "Heightened desire for independence and evolving peer relationships",
              correctCategory: "emotional",
              explanation: "Adolescent neurodevelopment reorganizes social cognitive pathways and identity formation."
            },
            {
              id: "p3",
              text: "Increased sweat gland activity and emergence of body odor",
              correctCategory: "physical",
              explanation: "Adrenarche activates apocrine sweat glands and sebaceous glands across the skin."
            },
            {
              id: "p4",
              text: "Occasional sudden mood swings or feeling emotionally overwhelmed",
              correctCategory: "emotional",
              explanation: "Fluctuating hormone levels interact directly with neurotransmitters in the limbic system."
            }
          ]
        },
        quiz: [
          {
            question: "What is the typical age range when puberty begins?",
            options: ["Strictly at age 12 for everyone", "Anywhere between 8 and 14+", "Only after age 16", "Between 5 and 7"],
            correctIndex: 1,
            explanation: "Puberty timelines vary widely based on genetics and health, typically starting between 8 and 14+."
          },
          {
            question: "Which part of the brain initiates puberty by releasing hormone messengers?",
            options: ["Hypothalamus", "Visual cortex", "Brain stem", "Ear canal"],
            correctIndex: 0,
            explanation: "The hypothalamus signals the pituitary gland to begin producing LH and FSH, orchestrating puberty."
          },
          {
            question: "Is it normal for friends to begin puberty at completely different ages?",
            options: ["Yes, normal development spans a wide multi-year window", "No, everyone develops on the exact same schedule", "Only if they live in different climates", "No, delayed puberty is always an emergency"],
            correctIndex: 0,
            explanation: "Every person's genetic blueprint determines their personal timeline, and a multi-year spread is completely normal."
          }
        ]
      },
      {
        id: "body-1",
        name: "Hormonal Changes",
        type: "lesson",
        desc: "The basics of what's driving all those changes.",
        xp: 50,
        readTime: "5 min read",
        summary: "Estrogen, progesterone, testosterone, and growth hormones are chemical messengers that orchestrate changes in your bones, muscles, skin, and reproductive organs.",
        keyTakeaways: [
          "Hormones travel through your bloodstream to instruct cells how and when to grow.",
          "Temporary breakouts and increased sweat production are direct results of androgen activity.",
          "Balanced nutrition, sleep, and hydration help support your endocrine system."
        ]
      },
      {
        id: "body-2",
        name: "Anatomy Match-Up",
        type: "game",
        desc: "Drag labels to the right spots — score 80%+ to finish the round.",
        xp: 75,
        summary: "Interactive challenge to match reproductive organs and their biological functions accurately and without euphemisms.",
        keyTakeaways: [
          "Understanding correct anatomical terms empowers clearer communication with healthcare providers.",
          "Internal and external structures work harmoniously for hormone regulation and reproduction."
        ],
        gameType: "match"
      },
      {
        id: "body-3",
        name: "Body Image, Explained",
        type: "article",
        desc: "Making sense of a changing body without the comparison spiral.",
        xp: 40,
        readTime: "3 min read",
        summary: "During rapid bodily changes, it is common to feel unfamiliar with your appearance. Recognizing curated social media imagery vs. real, diverse biology is essential for mental well-being.",
        keyTakeaways: [
          "Bodies come in endless healthy variations of shape, height, and composition.",
          "Social media often relies on filters, lighting, and selective angles.",
          "Treating your body with appreciation for what it enables you to do builds sustainable confidence."
        ]
      },
      {
        id: "body-4",
        name: "Anatomy 101",
        type: "lesson",
        desc: "Clear, accurate, no-euphemism explanations.",
        xp: 50,
        readTime: "6 min read",
        summary: "A comprehensive, respectful guide to the reproductive system: uterus, ovaries, fallopian tubes, cervix, vulva, testes, and prostate.",
        keyTakeaways: [
          "The vulva is the external genitalia; the vagina is the internal muscular canal.",
          "Clear, honest anatomical knowledge removes shame and enhances self-advocacy."
        ]
      }
    ]
  },
  cycle: {
    id: "cycle",
    title: "Cycle Sense",
    badge: "Cycle Sense Pro",
    badgeDesc: "Earned after mastering menstrual cycles, pain management, and hygiene basics in Cycle Sense.",
    description: "Periods, cramps, irregular cycles, tracking, and hygiene.",
    colorSwatch: "#B83F68",
    topics: [
      {
        id: "cycle-0",
        name: "Period Basics & Cycle Waves",
        type: "lesson",
        desc: "Hormone fluctuations across the 4 phases, cycle ranges, and what to expect.",
        xp: 50,
        readTime: "4 min read",
        summary: "The menstrual cycle averages 21–35 days. Menstruation is the shedding of the uterine lining when pregnancy hasn't occurred, orchestrated by a dance between brain and ovarian hormones.",
        keyTakeaways: [
          "Bleeding typically lasts 3 to 7 days.",
          "Flow can range from light spotting to heavier days; total blood loss is usually just 2 to 3 tablespoons.",
          "Color ranges normally from bright red to deep brown or rust."
        ],
        visualCards: [
          {
            title: "4 Coordinated Phases",
            iconName: "Calendar",
            text: "Menstrual, Follicular, Ovulatory, and Luteal phases repeat cyclically to regulate physical vitality, energy, and fertility.",
            highlight: "Continuous rhythm"
          },
          {
            title: "Key Hormonal Drivers",
            iconName: "Sparkles",
            text: "Estrogen fuels energy and builds the endometrial lining; Progesterone stabilizes the lining and supports nervous system calm.",
            highlight: "Estrogen & Progesterone"
          },
          {
            title: "Vital Sign of Health",
            iconName: "Heart",
            text: "Medical organizations (ACOG & AAP) recognize the menstrual cycle as a 5th vital sign reflecting thyroid, bone, and metabolic wellness.",
            highlight: "The 5th Vital Sign"
          }
        ],
        diagram: {
          type: "cycle-wheel",
          title: "Interactive Hormone & Cycle Wave Explorer",
          caption: "Click through the 4 cycle phases to explore how Estrogen, Progesterone, LH, and FSH fluctuate across days 1–28."
        },
        video: {
          title: "How the Menstrual Cycle Actually Works",
          source: "TED-Ed Biological Sciences",
          duration: "4:15",
          youtubeId: "ayzN5f3qN8g",
          medicalReviewer: "Reviewed by ACOG Fellow Obstetrician-Gynecologists",
          keyHighlights: [
            "The brain (pituitary gland) and ovaries communicate continuously via FSH and LH.",
            "Ovulation is the central physiological event triggering the luteal phase.",
            "Cycle lengths between 21 and 35 days are clinically recognized as healthy adult variance."
          ]
        },
        sorterGame: {
          title: "Cycle Phase Matcher",
          instructions: "Sort these bodily signals into the correct half of the menstrual cycle.",
          categories: [
            { id: "follicular", name: "Follicular / Ovulation (Days 1–14)", colorClass: "bg-light-teal border-deep-teal text-deep-teal" },
            { id: "luteal", name: "Luteal / Pre-Menstrual (Days 15–28)", colorClass: "bg-soft-pink border-raspberry text-raspberry" }
          ],
          items: [
            {
              id: "c1",
              text: "Surge in Estrogen producing clear, stretchy, fertile cervical fluid",
              correctCategory: "follicular",
              explanation: "Estrogen peaks right before ovulation, stimulating the cervix to produce thin, clear, stretchy mucus."
            },
            {
              id: "c2",
              text: "Rise in Progesterone causing a subtle ~0.5°F increase in basal body temperature",
              correctCategory: "luteal",
              explanation: "Progesterone secreted by the corpus luteum has a thermogenic effect on the hypothalamus."
            },
            {
              id: "c3",
              text: "Pituitary gland releases FSH to recruit and mature a dominant ovarian follicle",
              correctCategory: "follicular",
              explanation: "Follicle-stimulating hormone is highest during the early-to-mid follicular phase."
            },
            {
              id: "c4",
              text: "Corpus luteum dissolves if no pregnancy occurs, prompting PMS signals",
              correctCategory: "luteal",
              explanation: "The drop in progesterone at the end of the luteal phase triggers the uterine lining to shed."
            }
          ]
        },
        quiz: [
          {
            question: "Which hormone surges to trigger the release of an egg during ovulation?",
            options: ["Luteinizing Hormone (LH)", "Thyroid hormone", "Melatonin", "Insulin"],
            correctIndex: 0,
            explanation: "A rapid LH surge from the pituitary gland signals the ovary to release the mature egg."
          },
          {
            question: "What is the typical medical definition of a healthy cycle length?",
            options: ["Exactly 28 days every single month without variation", "Between 21 and 35 days for most adults", "Under 14 days", "45 to 60 days"],
            correctIndex: 1,
            explanation: "While 28 days is an average, healthy adult cycles generally range from 21 to 35 days."
          },
          {
            question: "Why is the menstrual cycle called the '5th vital sign' by major medical groups?",
            options: ["It indicates overall endocrine, metabolic, and bone health", "It only matters for athletes", "It is just an advertising phrase", "It only relates to pregnancy"],
            correctIndex: 0,
            explanation: "Cycle regularity reflects balanced thyroid function, adequate energy availability, and hypothalamic health."
          }
        ]
      },
      {
        id: "cycle-1",
        name: "Cramps & Pain Management",
        type: "lesson",
        desc: "Why they happen and what tends to help.",
        xp: 50,
        readTime: "5 min read",
        summary: "Prostaglandins cause the uterine muscle to contract. Mild to moderate cramping is common, but debilitating pain is not something you have to just 'endure'.",
        keyTakeaways: [
          "Heat pads, gentle movement, hydration, and NSAIDs (like ibuprofen) can significantly reduce prostaglandin production.",
          "Severe pain that interferes with school or daily tasks warrants a medical check for conditions like endometriosis."
        ]
      },
      {
        id: "cycle-2",
        name: "Track the Cycle",
        type: "game",
        desc: "A mock month simulator — log symptoms and see the pattern.",
        xp: 75,
        summary: "Simulate daily symptom logging (mood, energy, flow) across follicular, ovulatory, and luteal phases to discover natural rhythms.",
        keyTakeaways: [
          "Tracking helps anticipate energy dips, mood shifts, and period arrival dates.",
          "Data gives you concrete evidence when discussing symptoms with your doctor."
        ],
        gameType: "match"
      },
      {
        id: "cycle-3",
        name: "Irregular Cycles",
        type: "article",
        desc: "When 'irregular' is normal vs. worth checking out.",
        xp: 40,
        readTime: "4 min read",
        summary: "Especially in the first 2-3 years after starting periods, hormonal axes are still maturing. Stress, travel, illness, and weight fluctuations can all shift cycle timing.",
        keyTakeaways: [
          "Occasional missed periods or cycle length shifts are frequent in youth.",
          "Missing periods for 3+ consecutive months (amenorrhea) should be evaluated by a healthcare professional."
        ]
      },
      {
        id: "cycle-4",
        name: "Menstrual Hygiene",
        type: "lesson",
        desc: "Products, changing schedules, and staying comfortable.",
        xp: 50,
        readTime: "5 min read",
        summary: "An overview of pads, tampons, menstrual cups, discs, and period underwear. Proper hand hygiene and changing schedules (every 4-8 hours max for tampons) protect health.",
        keyTakeaways: [
          "Choose products based on your comfort, flow, and activity level.",
          "Wash external genitalia with warm water; avoid internal douching or scented products that disrupt vaginal flora."
        ]
      }
    ]
  },
  conditions: {
    id: "conditions",
    title: "Pregnancy & Reproductive Care",
    badge: "Reproductive Care Pro",
    badgeDesc: "Mastered knowledge on pregnancy basics, postpartum healing, and ovarian wellness.",
    description: "Pregnancy basics, postpartum recovery, and ovarian health.",
    colorSwatch: "#F47A6A",
    topics: [
      {
        id: "conditions-0",
        name: "Pregnancy Basics",
        type: "lesson",
        desc: "What to know, whatever stage you're at.",
        xp: 50,
        readTime: "5 min read",
        summary: "How fertilization and implantation occur, early signs of pregnancy, testing options, and confidential resources.",
        keyTakeaways: [
          "Over-the-counter urine tests are accurate from the first day of a missed period.",
          "Access to confidential, non-judgmental counseling is available at community health centers."
        ]
      },
      {
        id: "conditions-1",
        name: "Postpartum Health",
        type: "lesson",
        desc: "Recovery, emotions, and what's normal after birth.",
        xp: 50,
        readTime: "5 min read",
        summary: "Physical healing, hormonal fluctuations, and mental health following childbirth.",
        keyTakeaways: [
          "Baby blues are common in the first two weeks; postpartum depression and anxiety require supportive care.",
          "Pelvic floor recovery and rest are critical parts of health."
        ]
      },
      {
        id: "conditions-2",
        name: "Ovarian Cysts",
        type: "article",
        desc: "Common, usually harmless — here's how to know.",
        xp: 40,
        readTime: "4 min read",
        summary: "Functional vs. non-functional cysts: why most resolve on their own and when pain warrants ultrasound evaluation.",
        keyTakeaways: [
          "Most ovarian cysts are fluid-filled sacs that form naturally during normal ovulation.",
          "Sudden sharp pelvic pain requires immediate medical assessment to rule out ovarian torsion."
        ]
      }
    ]
  },
  pcos: {
    id: "pcos",
    title: "PCOS & Hormonal Health",
    badge: "Hormonal Balance Pro",
    badgeDesc: "Mastered knowledge on PCOS, androgen balance, insulin sensitivity, and managing hormonal cycles.",
    description: "Polycystic ovary syndrome, androgen regulation, insulin sensitivity, and cycle management.",
    colorSwatch: "#B83F68",
    topics: [
      {
        id: "pcos-0",
        name: "PCOS Demystified: The Whole-Body Axis",
        type: "lesson",
        desc: "Metabolic drivers, Rotterdam criteria, and evidence-based hormone care.",
        xp: 50,
        readTime: "4 min read",
        summary: "Polycystic Ovary Syndrome affects roughly 1 in 10 individuals with ovaries. Rather than just an ovarian condition, it is a metabolic and endocrine condition involving insulin sensitivity and androgen balance.",
        keyTakeaways: [
          "Common hallmarks include irregular periods, hormonal acne, and excess hair growth.",
          "Lifestyle adjustments, resistance exercise, and targeted medical support make PCOS highly manageable."
        ],
        visualCards: [
          {
            title: "Rotterdam Diagnostic Rule",
            iconName: "CheckCircle2",
            text: "Diagnosis requires at least 2 of 3: irregular or absent ovulation, clinical/biochemical elevated androgens, or polycystic ovarian morphology.",
            highlight: "At least 2 of 3"
          },
          {
            title: "The Insulin Connection",
            iconName: "Activity",
            text: "Up to 70% of people with PCOS experience cellular insulin resistance, which prompts ovaries to produce more androgens.",
            highlight: "Metabolic driver"
          },
          {
            title: "Empowered Longevity",
            iconName: "Sparkles",
            text: "PCOS does not mean infertility or poor health; proactive nutrition, muscle training, and cycle support restore thriving vitality.",
            highlight: "High management success"
          }
        ],
        diagram: {
          type: "pcos-loop",
          title: "Interactive Endocrine & Metabolic Feedback Cycle",
          caption: "Explore the feedback loop between insulin, androgen production, and follicle development to see where interventions work."
        },
        video: {
          title: "Polycystic Ovary Syndrome (PCOS) Explained",
          source: "Boston Children's / Harvard Medical",
          duration: "4:48",
          youtubeId: "Fm5eF5-hHlU",
          medicalReviewer: "Reviewed by Pediatric & Adolescent Reproductive Endocrinologists",
          keyHighlights: [
            "PCOS is a whole-body endocrine condition, not a disease exclusive to the ovaries.",
            "The 'cysts' seen on ultrasound are actually small, immature follicles paused in growth.",
            "Combining balanced nutrition, strength training, and tailored medications yields exceptional symptom control."
          ]
        },
        sorterGame: {
          title: "PCOS Myths vs. Medical Realities",
          instructions: "Classify each statement to bust common PCOS misconceptions.",
          categories: [
            { id: "myth", name: "Outdated Myth", colorClass: "bg-red-50 border-red-300 text-red-900" },
            { id: "fact", name: "Medical Reality", colorClass: "bg-emerald-50 border-emerald-300 text-emerald-900" }
          ],
          items: [
            {
              id: "pc1",
              text: "You can only have PCOS if you are clinically overweight",
              correctCategory: "myth",
              explanation: "PCOS affects people of all body weights; lean PCOS is a well-documented clinical phenotype."
            },
            {
              id: "pc2",
              text: "PCOS is deeply linked to cellular insulin resistance and metabolic signaling",
              correctCategory: "fact",
              explanation: "Elevated circulating insulin stimulates ovarian theca cells to overproduce testosterone."
            },
            {
              id: "pc3",
              text: "A PCOS diagnosis means you can never have biological children",
              correctCategory: "myth",
              explanation: "With lifestyle interventions and ovulation support medications (letrozole), pregnancy rates are comparable to the general population."
            },
            {
              id: "pc4",
              text: "Resistance training and dietary fiber significantly improve insulin sensitivity",
              correctCategory: "fact",
              explanation: "Skeletal muscle is the primary site of glucose clearance; strength training directly enhances insulin receptivity."
            }
          ]
        },
        quiz: [
          {
            question: "Under the international Rotterdam criteria, how many criteria are required to diagnose PCOS?",
            options: ["All 3 criteria must be present", "At least 2 out of 3 criteria", "Only an ultrasound finding", "A single abnormal blood test"],
            correctIndex: 1,
            explanation: "The Rotterdam consensus requires at least 2 of: irregular ovulation, elevated androgens, or polycystic ovaries on ultrasound."
          },
          {
            question: "What underlying metabolic factor is present in up to 70% of PCOS cases?",
            options: ["Insulin resistance", "Low calcium levels", "Excess Vitamin C", "Low sodium"],
            correctIndex: 0,
            explanation: "Insulin resistance is a central driver, prompting the ovaries to produce extra androgens and impairing follicle growth."
          },
          {
            question: "What are the small 'cysts' commonly seen on an ultrasound in PCOS?",
            options: ["Dangerous tumors", "Immature follicles paused in development", "Infected fluid pockets", "Scar tissue"],
            correctIndex: 1,
            explanation: "They are benign, immature egg follicles that halted development before reaching full maturity."
          }
        ]
      },
      {
        id: "pcos-1",
        name: "Hormones & Androgens",
        type: "lesson",
        desc: "Breaking down insulin, testosterone, and LH/FSH ratios.",
        xp: 50,
        readTime: "4 min read",
        summary: "Understanding how insulin resistance and adrenal or ovarian androgens interact to influence cycle regularity.",
        keyTakeaways: [
          "Insulin resistance frequently drives higher androgen production in PCOS.",
          "Balanced nutrition with complex carbs and protein supports healthy blood sugar stability."
        ]
      },
      {
        id: "pcos-2",
        name: "PCOS Symptom Match",
        type: "game",
        desc: "Sort real symptoms from common myths about PCOS.",
        xp: 75,
        summary: "Identify clinical hallmarks vs. outdated misconceptions about fertility and body changes.",
        keyTakeaways: [
          "PCOS does not mean you cannot get pregnant; ovulation can be supported effectively.",
          "Weight is a symptom rather than the root cause of metabolic fluctuations."
        ],
        gameType: "sort"
      },
      {
        id: "pcos-3",
        name: "Cycle & Ovulation Support",
        type: "article",
        desc: "Practical strategies for cycle tracking with PCOS.",
        xp: 40,
        readTime: "5 min read",
        summary: "How basal body temperature, ovulation test strips, and cervical fluid tracking work when cycles are long or irregular.",
        keyTakeaways: [
          "Ovulation predictor kits may show false positives due to elevated LH baselines.",
          "Tracking cervical fluid and temperature provides more reliable confirmation of ovulation."
        ]
      }
    ]
  },
  endo: {
    id: "endo",
    title: "Endometriosis & Reproductive Pain",
    badge: "Pelvic Health Advocate",
    badgeDesc: "Mastered knowledge on endometriosis, adenomyosis, pain validation, and doctor communication.",
    description: "Severe cramps, chronic pelvic pain, adenomyosis, and navigating clinical care.",
    colorSwatch: "#F47A6A",
    topics: [
      {
        id: "endo-0",
        name: "Endometriosis: Beyond Bad Cramps",
        type: "lesson",
        desc: "Tissue implants, inflammation cascades, and navigating clinical validation.",
        xp: 50,
        readTime: "5 min read",
        summary: "Endometriosis occurs when tissue similar to the lining of the uterus grows outside the uterus, causing cyclical internal bleeding, nerve inflammation, and chronic pelvic pain.",
        keyTakeaways: [
          "Pain during periods, bowel movements, or intercourse warrants thorough medical investigation.",
          "Laparoscopy and high-resolution imaging by trained specialists are current diagnostic standards."
        ],
        visualCards: [
          {
            title: "Ectopic Growth",
            iconName: "Heart",
            text: "Endometrial-like lesions implant on the ovaries, fallopian tubes, peritoneum, bowel, and bladder, shedding blood internally during cycles.",
            highlight: "Grows outside uterus"
          },
          {
            title: "The Diagnostic Delay",
            iconName: "Clock",
            text: "Because severe pelvic pain has been historically dismissed as 'normal cramps', the average patient waits 7 to 10 years for a diagnosis.",
            highlight: "7–10 year average delay"
          },
          {
            title: "Pain Severity vs. Stage",
            iconName: "Shield",
            text: "Symptom intensity does not strictly match lesion stage; microscopic superficial implants near pelvic nerves can trigger severe pain.",
            highlight: "Pain is real and valid"
          }
        ],
        diagram: {
          type: "pelvic-map",
          title: "Interactive Pelvic Anatomy & Endometriosis Mapping",
          caption: "Click on anatomical locations to examine where endometriosis lesions form and how they cause localized inflammation."
        },
        video: {
          title: "Understanding Endometriosis: Symptoms & Clinical Care",
          source: "Stanford Medicine Health Care",
          duration: "5:12",
          youtubeId: "cK9_Z0rW8r0",
          medicalReviewer: "Reviewed by Endometriosis Specialists & Minimally Invasive Gynecologic Surgeons",
          keyHighlights: [
            "Endometriosis lesions respond to cyclical hormones, bleeding internally with nowhere to drain.",
            "Pain that disrupts school, sports, work, or basic mobility is never 'just bad cramps.'",
            "Specialized excision surgery, pelvic floor PT, and targeted hormonal therapies offer proven relief."
          ]
        },
        sorterGame: {
          title: "Period Discomfort vs. Endometriosis Red Flags",
          instructions: "Distinguish between typical menstrual discomfort and signs requiring specialist evaluation.",
          categories: [
            { id: "typical", name: "Typical Menstrual Cramps", colorClass: "bg-light-teal border-deep-teal text-deep-teal" },
            { id: "redflag", name: "Endometriosis Red Flag", colorClass: "bg-red-50 border-red-300 text-red-900" }
          ],
          items: [
            {
              id: "ed1",
              text: "Mild lower abdomen cramping on Day 1 that quickly eases with a heating pad or ibuprofen",
              correctCategory: "typical",
              explanation: "Mild cramping due to localized prostaglandins is common and responds well to standard NSAIDs."
            },
            {
              id: "ed2",
              text: "Excruciating pain that causes vomiting, fainting, or missing school/work consistently",
              correctCategory: "redflag",
              explanation: "Debilitating pain that halts daily life indicates secondary dysmenorrhea such as endometriosis."
            },
            {
              id: "ed3",
              text: "Deep, stabbing pelvic pain during bowel movements or urination during menstruation",
              correctCategory: "redflag",
              explanation: "Painful bowel movements (dyschezia) point to lesions in the Pouch of Douglas or rectovaginal septum."
            },
            {
              id: "ed4",
              text: "A mild, dull ache in the lower back that resolves after the heaviest bleeding day",
              correctCategory: "typical",
              explanation: "Referred lower back sensations during peak uterine contractions are common physiological experiences."
            },
            {
              id: "ed5",
              text: "Chronic pelvic pain that persists even on non-bleeding weeks of the month",
              correctCategory: "redflag",
              explanation: "Endometriosis creates ongoing inflammatory cytokines and central nerve sensitization beyond bleeding days."
            }
          ]
        },
        quiz: [
          {
            question: "Where does endometriosis tissue grow in the body?",
            options: ["Only inside the stomach cavity", "Outside the uterus on pelvic organs like ovaries, bladder, and bowel", "Inside the bloodstream exclusively", "Inside the thyroid gland"],
            correctIndex: 1,
            explanation: "Endometriosis is characterized by endometrium-like tissue growing outside the uterine cavity on surrounding pelvic structures."
          },
          {
            question: "If severe period pain prevents you from attending school or work despite medication, what is the best next step?",
            options: ["Wait 10 years until it goes away", "Consult a healthcare provider or gynecologist for specialized evaluation", "Stop eating all food", "Assume everyone suffers equally and push through"],
            correctIndex: 1,
            explanation: "Debilitating pain is never something you have to silently endure; seeking a medical evaluation is essential."
          },
          {
            question: "Does the anatomical stage (Stage 1 vs. Stage 4) always match how much pain a person feels?",
            options: ["No, microscopic Stage 1 lesions near nerves can cause extreme pain", "Yes, Stage 1 has zero pain ever", "Yes, pain is always exactly proportional to stage", "Stage has nothing to do with medicine"],
            correctIndex: 0,
            explanation: "Pain is mediated by nerve infiltration and inflammatory mediators, meaning Stage 1 can cause severe pain while Stage 4 can sometimes be asymptomatic."
          }
        ]
      },
      {
        id: "endo-1",
        name: "When Pain Isn't Just Cramps",
        type: "article",
        desc: "Validating debilitating pain and recognizing red flags.",
        xp: 40,
        readTime: "4 min read",
        summary: "Severe pain that prevents attending school, work, or daily life is never 'just normal cramps'—it is a medical signal requiring care.",
        keyTakeaways: [
          "If standard over-the-counter pain medication fails to manage cramps, consult a specialist.",
          "Adenomyosis and pelvic nerve inflammation are related causes of persistent pain."
        ]
      },
      {
        id: "endo-2",
        name: "Pelvic Pain Sorter",
        type: "game",
        desc: "Sort symptom indicators and discover personalized coping tools.",
        xp: 75,
        summary: "Distinguish between physiological period discomfort and chronic pain conditions.",
        keyTakeaways: [
          "Pelvic floor physical therapy is a proven, non-invasive treatment for pelvic muscle spasm.",
          "Anti-inflammatory nutrition and heat therapy can help ease inflammatory flare-ups."
        ],
        gameType: "match"
      },
      {
        id: "endo-3",
        name: "Speaking Up to Clinicians",
        type: "lesson",
        desc: "Scripted questions and symptom logs to prevent medical gaslighting.",
        xp: 50,
        readTime: "4 min read",
        summary: "Concrete tools to advocate for yourself in the exam room: keeping a symptom journal, asking for second opinions, and bringing an advocate.",
        keyTakeaways: [
          "Record frequency, severity (1-10), and interference with daily activities in writing.",
          "You have the right to request a referral to an endometriosis specialist or pelvic pain clinician."
        ]
      }
    ]
  },
  realtalk: {
    id: "realtalk",
    title: "Real Talk",
    badge: "Real Talk Graduate",
    badgeDesc: "Earned after mastering STI education, affirmative consent, and safer sex practices.",
    description: "STIs, HIV education, consent, contraception, safer sex.",
    colorSwatch: "#B83F68",
    topics: [
      {
        id: "realtalk-0",
        name: "STIs",
        type: "lesson",
        desc: "Prevention, symptoms, testing — no shame involved.",
        xp: 50,
        readTime: "5 min read",
        summary: "Sexually transmitted infections are common medical conditions. Most are fully curable with antibiotics or easily managed with antivirals.",
        keyTakeaways: [
          "Many STIs (like chlamydia and gonorrhea) have zero initial symptoms — routine testing is key.",
          "Barrier methods like condoms and dental dams drastically reduce transmission risk."
        ]
      },
      {
        id: "realtalk-1",
        name: "HIV Education",
        type: "lesson",
        desc: "Current facts, prevention, and living well.",
        xp: 50,
        readTime: "4 min read",
        summary: "Modern HIV medicine is transformative: PrEP prevents transmission, and U=U (Undetectable = Untransmittable) means treated individuals cannot transmit HIV.",
        keyTakeaways: [
          "PrEP (daily pill or injection) protects HIV-negative individuals from contracting HIV.",
          "PEP is an emergency medication taken within 72 hours of potential exposure."
        ]
      },
      {
        id: "realtalk-2",
        name: "Consent Scenarios",
        type: "game",
        desc: "Choose-your-response scenarios — see how different replies land.",
        xp: 75,
        summary: "Navigate nuanced real-life dating and intimacy scenarios with enthusiastic, revocable, and ongoing consent.",
        keyTakeaways: [
          "Consent must be freely given, reversible, informed, enthusiastic, and specific (FRIES).",
          "Silence or intoxication does not equal consent."
        ],
        gameType: "scenarios"
      },
      {
        id: "realtalk-3",
        name: "Contraception Match",
        type: "game",
        desc: "Match each method to how it works and how effective it is.",
        xp: 75,
        summary: "Match IUDs, implants, pills, patches, rings, condoms, and emergency contraception to efficacy and lifestyle fit.",
        keyTakeaways: [
          "Long-acting reversible contraception (IUDs, implants) has >99% typical effectiveness.",
          "Condoms are the only contraceptive method that also protects against STIs."
        ],
        gameType: "match"
      },
      {
        id: "realtalk-4",
        name: "Consent, Clearly",
        type: "article",
        desc: "What it looks like in real conversations, not just definitions.",
        xp: 40,
        readTime: "4 min read",
        summary: "How to check in with partners comfortably, communicate your boundaries, and respect someone's 'no' without defensiveness.",
        keyTakeaways: [
          "Checking in with 'Are you comfortable with this?' makes intimacy safer and more enjoyable for everyone.",
          "You can change your mind at any point, even after starting."
        ]
      },
      {
        id: "realtalk-5",
        name: "Safer Sex",
        type: "lesson",
        desc: "Practical, judgment-free basics.",
        xp: 50,
        readTime: "4 min read",
        summary: "Practical guidance on barrier usage, water-based lubricants, dental dams, communication, and testing schedules.",
        keyTakeaways: [
          "Using water- or silicone-based lube prevents condom breakage.",
          "Get tested annually or between new sexual partners."
        ]
      }
    ]
  },
  mind: {
    id: "mind",
    title: "Mind & Self",
    badge: "Mind & Self Aware",
    badgeDesc: "Earned after exploring the connection between mental wellness, hormone cycles, and healthy relationships.",
    description: "Mood changes, stress and hormones, body confidence, relationships.",
    colorSwatch: "#175B5C",
    topics: [
      {
        id: "mind-0",
        name: "Mood Changes",
        type: "lesson",
        desc: "How hormones and emotions connect.",
        xp: 50,
        readTime: "4 min read",
        summary: "Fluctuating levels of estrogen and progesterone directly influence neurotransmitters like serotonin and dopamine.",
        keyTakeaways: [
          "Premenstrual syndrome (PMS) and PMDD are physiological responses, not 'imagined' moods.",
          "Mindful tracking helps normalize emotional shifts without self-judgment."
        ]
      },
      {
        id: "mind-1",
        name: "Stress & Hormones",
        type: "lesson",
        desc: "The feedback loop, explained simply.",
        xp: 50,
        readTime: "4 min read",
        summary: "Cortisol (the primary stress hormone) can temporarily suppress reproductive hormones, leading to delayed or missed periods.",
        keyTakeaways: [
          "Chronic stress signals the brain that the environment is unsafe for reproduction.",
          "Simple breathwork, sleep hygiene, and physical activity restore hormonal equilibrium."
        ]
      },
      {
        id: "mind-2",
        name: "Mood Tracker Challenge",
        type: "game",
        desc: "A 5-day mock mood log to help spot your own patterns.",
        xp: 75,
        summary: "Log mood, energy levels, and triggers across a simulated week to learn how to identify personal hormonal rhythms.",
        keyTakeaways: [
          "Pattern recognition gives you agency to schedule demanding activities during high-energy windows."
        ],
        gameType: "match"
      },
      {
        id: "mind-3",
        name: "Body Confidence",
        type: "article",
        desc: "Working on it without a rulebook.",
        xp: 40,
        readTime: "4 min read",
        summary: "Shifting from body-focused anxiety to body neutrality: appreciating your body as the vessel that carries your passions and relationships.",
        keyTakeaways: [
          "Body neutrality relieves the pressure of having to feel ecstatic about your looks every single day.",
          "Curate your digital feeds to remove accounts that induce body comparison."
        ]
      },
      {
        id: "mind-4",
        name: "Healthy Relationships",
        type: "lesson",
        desc: "Recognizing what respect actually looks like.",
        xp: 50,
        readTime: "5 min read",
        summary: "Key markers of healthy, reciprocal relationships vs. warning signs (controlling behavior, isolation, digital stalking).",
        keyTakeaways: [
          "Mutual respect, open communication, privacy boundaries, and independence are non-negotiable.",
          "Trust your intuition if someone makes you feel diminished or unsafe."
        ]
      }
    ]
  },
  play: {
    id: "play",
    title: "Play Strong · Female Athlete Health",
    badge: "Play Strong Athlete",
    badgeDesc: "Earned by mastering sports nutrition, overworking recovery, body image, and cycle-aware performance.",
    description: "Reproductive health for active bodies — nutrition, overworking signs, body image, and bone health.",
    colorSwatch: "#175B5C",
    topics: [
      {
        id: "play-0",
        name: "Nutrition & Female Athlete Fueling (RED-S)",
        type: "lesson",
        desc: "Energy availability, carb timing, and protecting bone & hormone health in sport.",
        xp: 50,
        readTime: "5 min read",
        summary: "To train and compete sustainably, active bodies require adequate energy availability (EA). Under-fueling puts severe stress on reproductive hormones, metabolism, and bone density. Carbohydrates power high-intensity muscular work, while healthy dietary fats provide the essential precursors for estrogen and progesterone.",
        keyTakeaways: [
          "Energy availability (EA) = dietary energy intake minus exercise energy expenditure normalized to lean mass.",
          "Complex carbohydrates are the primary fuel for muscle glycogen; cutting carbs impairs athletic power and mental focus.",
          "Dietary fats (nuts, seeds, olive oil, avocados) are essential precursors for female steroid hormone production.",
          "Consistently eating too little triggers Relative Energy Deficiency in Sport (RED-S), stalling growth and performance."
        ],
        visualCards: [
          {
            title: "Energy Availability (EA)",
            iconName: "Zap",
            text: "EA is the amount of dietary energy left for basic body functioning after subtracting the energy burned during training and competition.",
            highlight: "Intake minus training"
          },
          {
            title: "RED-S Warning Signs",
            iconName: "AlertTriangle",
            text: "Irregular or missed periods, recurring bone stress fractures or shin splints, chronic fatigue, and poor recovery are biological red flags.",
            highlight: "Missing period is NEVER normal"
          },
          {
            title: "The Fueling Protocol",
            iconName: "Activity",
            text: "Consuming carbohydrates before hard workouts and pairing protein with carbs within 45 minutes of training speeds recovery and protects hormones.",
            highlight: "Fuel your performance"
          }
        ],
        diagram: {
          type: "energy-balance",
          title: "Athlete Energy Availability & Health Scale",
          caption: "Drag the fueling slider to simulate how daily caloric energy availability impacts athletic performance, bone density, and menstrual health."
        },
        video: {
          title: "Female Athlete Triad & RED-S Explained",
          source: "Boston Children's Hospital Sports Medicine",
          duration: "4:32",
          youtubeId: "cK2_iJ0gZ2Y",
          medicalReviewer: "Reviewed by Board-Certified Sports Medicine & Adolescent Gynecologists",
          keyHighlights: [
            "RED-S affects athletes across all body shapes, sports, and competitive tiers.",
            "Losing your period is never a normal badge of athletic dedication — it is a biological distress signal.",
            "Timely nutritional intervention preserves lifetime bone density during peak teen and young adult bone-building years."
          ]
        },
        sorterGame: {
          title: "Optimal Fueling vs. RED-S Warning Signs",
          instructions: "Sort each athletic habit or symptom into the correct category.",
          categories: [
            { id: "optimal", name: "Optimal Athletic Fueling", colorClass: "bg-emerald-50 border-emerald-300 text-emerald-900" },
            { id: "reds", name: "RED-S / Under-Fueling Sign", colorClass: "bg-red-50 border-red-300 text-red-900" }
          ],
          items: [
            {
              id: "at1",
              text: "Eating a nutrient-dense carbohydrate snack 1 to 2 hours before a high-intensity workout",
              correctCategory: "optimal",
              explanation: "Pre-workout carbohydrates maximize muscle glycogen stores and sustain blood glucose during exertion."
            },
            {
              id: "at2",
              text: "Skipping meals after morning practice to 'cut weight' or stay lean",
              correctCategory: "reds",
              explanation: "Post-workout under-fueling spikes cortisol and deprives recovering muscles of vital amino acids and glycogen."
            },
            {
              id: "at3",
              text: "Maintaining regular, predictable menstrual cycles throughout a heavy training season",
              correctCategory: "optimal",
              explanation: "Consistent ovulatory cycles prove that the body has adequate energy availability for both athletics and reproductive health."
            },
            {
              id: "at4",
              text: "Developing recurrent shin splints, stress reactions, or bone fractures during training",
              correctCategory: "reds",
              explanation: "Suppressed estrogen from under-fueling accelerates bone resorption, leaving bones brittle and vulnerable."
            },
            {
              id: "at5",
              text: "Consuming adequate dietary fats (avocados, nuts, seeds) to support steroid hormone synthesis",
              correctCategory: "optimal",
              explanation: "Dietary fats supply the cholesterol backbone required to produce estrogen and progesterone."
            }
          ]
        },
        quiz: [
          {
            question: "Is losing your period (amenorrhea) a normal byproduct of intense athletic training?",
            options: ["Yes, it proves you are training hard enough", "No, it is a primary clinical sign of low energy availability (RED-S)", "Only for distance runners", "Yes, if you eat enough protein"],
            correctIndex: 1,
            explanation: "Menstrual dysfunction is never a normal badge of fitness. It is the body conserving energy because caloric intake is insufficient."
          },
          {
            question: "What is the primary driver of RED-S (Relative Energy Deficiency in Sport)?",
            options: ["Drinking too much water", "Mismatch between dietary caloric intake and athletic energy expenditure", "Too much strength training", "Genetic factors alone"],
            correctIndex: 1,
            explanation: "RED-S occurs when dietary energy intake is insufficient to support both training demands and foundational physiological functioning."
          },
          {
            question: "Why are teenage and young adult years especially crucial for bone health in female athletes?",
            options: ["Bones stop growing completely at age 10", "Over 90% of peak lifetime bone mineral density is laid down during this window", "Bones do not use calcium until age 30", "Exercise weakens bones permanently"],
            correctIndex: 1,
            explanation: "Peak bone mass is established in your teens and early 20s; low estrogen and under-fueling during this time can cause irreversible bone loss."
          }
        ]
      },
      {
        id: "play-1",
        name: "Fuel Up & Nutrition Quiz",
        type: "game",
        desc: "Interactive quiz on pre/post-workout fueling, carb timing, and hydration.",
        xp: 75,
        summary: "Test your knowledge on sports nutrition, protein recovery windows, iron replenishment for endurance, and pre-competition meals.",
        keyTakeaways: [
          "Consuming carbohydrates and protein within 30 to 60 minutes post-training speeds glycogen replenishment and tissue repair.",
          "Menstruating athletes lose iron each cycle; iron-rich foods or verified supplementation prevent sports anemia and fatigue."
        ],
        gameType: "match",
        quiz: [
          {
            question: "Why do female athletes need sufficient dietary fats?",
            options: [
              "Fats are strictly for storing excess weight",
              "Fats provide the essential building blocks for estrogen and progesterone hormones",
              "Athletes should eliminate all dietary fats",
              "Fats only matter for male athletes"
            ],
            correctIndex: 1,
            explanation: "Steroid hormones like estrogen and progesterone are synthesized from lipids and cholesterol. Severe fat restriction disrupts the endocrine axis and cycle regularity."
          }
        ]
      },
      {
        id: "play-2",
        name: "Overworking & Overtraining Signs",
        type: "lesson",
        desc: "Recognizing fatigue, missing periods, and the Female Athlete Triad.",
        xp: 50,
        readTime: "5 min read",
        summary: "Pushing through exhaustion without sufficient rest leads to overtraining syndrome. One of the clearest biological red flags is hypothalamic amenorrhea (losing your period). Losing your period is never a badge of honor or proof of hard training — it is your body shutting down reproduction to conserve survival energy, directly compromising bone density.",
        keyTakeaways: [
          "The Female Athlete Triad is the interrelationship between low energy availability, menstrual dysfunction (amenorrhea), and declining bone mineral density.",
          "Missing 3 consecutive menstrual cycles requires medical assessment; it places you at high risk for irreversible early bone loss (osteopenia/osteoporosis).",
          "Warning signs of overworking: elevated resting morning heart rate, lingering muscle soreness, chronic mood dips, and frequent respiratory infections.",
          "Adaptation and muscle growth happen during rest and sleep, not during the workout itself."
        ]
      },
      {
        id: "play-3",
        name: "Rest vs. Burnout Sorter",
        type: "game",
        desc: "Sort healthy training fatigue from chronic overtraining red flags.",
        xp: 75,
        summary: "Distinguish between productive training adaptation and dangerous overworking signals (amenorrhea, persistent sleep disruption, recurring stress fractures).",
        keyTakeaways: [
          "Productive fatigue resolves within 24–48 hours with adequate nutrition and sleep.",
          "Loss of menstrual flow, recurring shin splints or stress fractures, and unshakeable brain fog indicate dangerous overtraining and energy deficit."
        ],
        gameType: "sort"
      },
      {
        id: "play-4",
        name: "Body Image & Weight Pressures in Sport",
        type: "article",
        desc: "Decoupling body shape from athletic performance and rejecting aesthetic pressure.",
        xp: 40,
        readTime: "4 min read",
        summary: "Many female athletes encounter toxic messaging from coaches, peers, or social media claiming that shrinking your body automatically increases performance. In reality, under-fueling to reach an arbitrary weight or aesthetic causes muscle wasting, sluggish reaction times, and heightened injury risk. Embracing body neutrality helps athletes value their physical power, endurance, and skill rather than appearance.",
        keyTakeaways: [
          "Athletic capability is driven by strength, cardiovascular capacity, technique, and mental agility — not a specific body silhouette.",
          "Weigh-ins and public body scrutiny in team sports are outdated practices strongly linked to disordered eating and RED-S.",
          "Body neutrality shifts focus from 'How do I look?' to 'What is my body capable of achieving today?'",
          "You deserve to be respected and coached as a whole human being, never as a number on a scale."
        ]
      },
      {
        id: "play-5",
        name: "Spotting Toxic Fitness Pressures",
        type: "game",
        desc: "Quiz: identifying harmful diet culture myths vs healthy athletic coaching.",
        xp: 75,
        summary: "Learn how to spot red flags in fitness trends, extreme cutting diets, and peer pressure, and discover confident boundaries to protect your physical and mental health.",
        keyTakeaways: [
          "A coach or trainer who encourages you to skip meals or ignores missed periods is putting your health at risk.",
          "Real athletic fuel includes balanced macronutrients: unrefined carbs, lean proteins, healthy fats, and ample hydration."
        ],
        gameType: "scenarios",
        quiz: [
          {
            question: "A teammate says losing your period means you are finally 'in peak competition shape.' What is the medical reality?",
            options: [
              "They are correct; periods are unnecessary during season",
              "Losing your period is a warning sign of low energy availability and bone density loss",
              "It only matters if you plan to get pregnant this year",
              "It indicates optimal cardiovascular conditioning"
            ],
            correctIndex: 1,
            explanation: "Amenorrhea is a clinical symptom of low energy availability (RED-S). When estrogen drops, bone mineral loss begins rapidly, leading to stress fractures."
          }
        ]
      },
      {
        id: "play-6",
        name: "Cycle-Aware Performance & Bone Health",
        type: "lesson",
        desc: "Training with your body's hormonal phases and protecting lifelong bone density.",
        xp: 50,
        readTime: "5 min read",
        summary: "Hormone fluctuations across the follicular and luteal phases naturally influence body temperature, metabolic substrate use, and recovery rates. By syncing training intensity with your menstrual phases and ensuring adequate calcium and vitamin D intake, you can optimize power while protecting bone density.",
        keyTakeaways: [
          "Follicular Phase (Days 1–14): Lower core temperature and higher insulin sensitivity create ideal conditions for high-intensity intervals and progressive strength loads.",
          "Luteal Phase (Days 15–28): Higher progesterone slightly elevates basal body temperature, making pre-cooling, electrolytes, and steady-state endurance especially effective.",
          "Peak bone mass is built predominantly before age 25; maintaining regular menstrual cycles with adequate estrogen is the single most important factor in lifelong skeletal strength."
        ]
      }
    ]
  },
  factors: {
    id: "factors",
    title: "The Bigger Picture",
    badge: "Bigger Picture Thinker",
    badgeDesc: "Earned by understanding healthcare equity, language access, and community advocacy.",
    description: "How transportation, language, and location shape access to this education.",
    colorSwatch: "#175B5C",
    topics: [
      {
        id: "factors-0",
        name: "Transportation Barriers",
        type: "lesson",
        desc: "Why 'just go to a clinic' isn't always simple.",
        xp: 50,
        readTime: "4 min read",
        summary: "Transit deserts, travel costs, and time off work or school create significant barriers to standard healthcare.",
        keyTakeaways: [
          "Telehealth and mobile health clinics help bridge geographic gaps.",
          "Many community organizations offer subsidized transit passes for medical appointments."
        ]
      },
      {
        id: "factors-1",
        name: "Spot the Barrier",
        type: "game",
        desc: "A scenario game — identify what's blocking access and what would help.",
        xp: 75,
        summary: "Analyze community scenarios to identify systemic obstacles (cost, language, transit, confidentiality) and effective grassroots solutions.",
        keyTakeaways: [
          "Equitable healthcare requires multilingual staff, sliding scale fees, and flexible hours."
        ],
        gameType: "scenarios"
      },
      {
        id: "factors-2",
        name: "Language Access",
        type: "article",
        desc: "Finding care and info in the language you're comfortable in.",
        xp: 40,
        readTime: "4 min read",
        summary: "Federal laws require medical providers receiving federal funds to provide certified medical interpreters free of charge.",
        keyTakeaways: [
          "You have the right to request a qualified medical interpreter at any clinic visit.",
          "Having accurate medical translated materials prevents misdiagnosis and empowers families."
        ]
      },
      {
        id: "factors-3",
        name: "Location & Access",
        type: "lesson",
        desc: "How where you live changes what's available to you.",
        xp: 50,
        readTime: "4 min read",
        summary: "Rural healthcare shortages, maternity care deserts, and state-level policy variations impact reproductive healthcare options.",
        keyTakeaways: [
          "Knowing your local healthcare rights and trusted community centers creates resilient support networks."
        ]
      }
    ]
  }
};
