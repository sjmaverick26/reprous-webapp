export type TopicType = "lesson" | "article" | "game" | "badge";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonDiagram {
  type: "cycle-wheel" | "energy-balance" | "pcos-loop" | "pelvic-map" | "anatomy-callout" | "timeline" | "athlete-plate" | "hormone-scale" | "reds-triangle" | "water-glass" | "sleep-recovery" | "iron-ferritin" | "cycle-training" | "cycle-fueling" | "puberty-brain" | "maternal-warning-signs";
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

export interface AdvocacyScript {
  situation: string;
  doctorScript: string;
  whyItWorks: string;
  whatIfDismissed: string;
}

export interface ClinicalQuote {
  quote: string;
  source: string;
  publication: string;
  year?: string;
}

export interface RoleplayOption {
  text: string;
  isBest: boolean;
  feedback: string;
  xpBonus: number;
}

export interface RoleplayEvidence {
  badge: string;
  title: string;
  metric: string;
  description: string;
}

export interface RoleplaySourceCitation {
  organization: string;
  guideline: string;
  year?: string;
  url?: string;
}

export interface RoleplayScenario {
  id?: string;
  title?: string;
  phaseName?: string;
  setting: string;
  character: string;
  characterRole?: string;
  statement: string;
  options: RoleplayOption[];
  evidence?: RoleplayEvidence;
  sourceCitation?: RoleplaySourceCitation;
  patientName?: string;
  patientRole?: string;
}

export interface HubTopic {
  id: string;
  name: string;
  type: TopicType;
  desc: string;
  xp: number;
  readTime?: string;
  summary: string;
  clinicalQuote?: ClinicalQuote;
  roleplayScenario?: RoleplayScenario;
  roleplayScenarios?: RoleplayScenario[];
  keyTakeaways: string[];
  visualCards?: VisualCard[];
  diagram?: LessonDiagram;
  video?: LessonVideo;
  sorterGame?: LessonSorterGame;
  quiz?: QuizQuestion[];
  gameType?: "match" | "sort" | "scenarios";
  isAdvocateCapstone?: boolean;
  advocacyScript?: AdvocacyScript;
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
        clinicalQuote: {
          quote: "Adolescent pubertal timing is a neuroendocrine continuum governed by pulsatile GnRH release. Understanding Tanner staging and individual physiological variation provides young people with essential reassurance that bodily changes follow their own biological timeline.",
          source: "The Global Library of Women's Medicine (GLOWM)",
          publication: "GLOWM / FIGO Textbook of Adolescent Health",
        },
        keyTakeaways: [
          "Growth spurts, voice changes, hair growth, and skin changes are completely normal.",
          "Everyone develops on their own genetic clock; starting earlier or later does not mean anything is wrong.",
          "Emotional shifts and mood fluctuations are biological responses to hormonal changes.",
        ],
        visualCards: [
          {
            title: "The Brain-Body Trigger",
            iconName: "Sparkles",
            text: "Your brain sends natural chemical messengers (LH and FSH) to signal your ovaries and body that it's time to start growing.",
            highlight: "Biological trigger"
          },
          {
            title: "Physical Milestones",
            iconName: "Activity",
            text: "Changes unfold gradually over several years: breast development, growth spurts, body hair, and eventually your first period (menarche).",
            highlight: "Individual timeline"
          },
          {
            title: "Normal Variance",
            iconName: "Heart",
            text: "Starting at age 9 or age 14 is completely healthy and normal. Genetics, nutrition, and personal biology determine your body's timing.",
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
          medicalReviewer: "Grounded in Clinical Pediatric and Adolescent Health Guidelines",
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
            options: ["Strictly at age 12 for everyone", "Only after age 16", "Anywhere between 8 and 14+", "Between 5 and 7"],
            correctIndex: 2,
            explanation: "Puberty timelines vary widely based on genetics and health, typically starting between 8 and 14+."
          },
          {
            question: "Which part of the brain initiates puberty by releasing hormone messengers?",
            options: ["Visual cortex", "Brain stem", "Ear canal", "Hypothalamus"],
            correctIndex: 3,
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
        readTime: "4 min read",
        summary: "Hormones are your body's natural chemical messengers. They travel through your blood to tell your bones to grow, your sweat glands to wake up, and your ovaries to develop.",
        keyTakeaways: [
          "Estrogen helps build bones and develops your feminine biology; progesterone balances your moods and cycle.",
          "Temporary breakouts and extra sweat happen because your body is making new hormones (androgens).",
          "Eating enough food, sleeping 8–10 hours, and drinking water are the best ways to keep hormones steady."
        ],
        visualCards: [
          {
            title: "Estrogen: The Builder",
            iconName: "Sparkles",
            text: "Gives you energy, protects your heart and bones, and builds up your uterine lining each month.",
            highlight: "Energy & growth"
          },
          {
            title: "Progesterone: The Calmer",
            iconName: "Heart",
            text: "Made after you release an egg (ovulate). Helps you sleep, calms anxiety, and balances estrogen.",
            highlight: "Relaxation & balance"
          },
          {
            title: "Androgens: Strength & Oil",
            iconName: "Zap",
            text: "Gives you muscle tone and confidence. Temporarily causes oily skin or pimples during puberty.",
            highlight: "Power & skin"
          }
        ],
        diagram: {
          type: "hormone-scale",
          title: "Interactive Hormone Balance Seesaw",
          caption: "Click between balanced, low-fuel, and PCOS scenarios to see how your hormones tip and what your body feels."
        }
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
        summary: "During puberty, it is completely normal to feel like your body is changing faster than you can keep up with. Real bodies come in every height and curve; social media filters are not reality.",
        keyTakeaways: [
          "Bodies are designed to change during your teens; widening hips and softer skin are healthy biological milestones.",
          "Treating your body like a team partner instead of an ornament builds lasting confidence.",
          "Comparing yourself to edited pictures online causes needless stress. Real health is about energy, not size."
        ]
      },
      {
        id: "body-4",
        name: "Anatomy 101",
        type: "lesson",
        desc: "Clear, accurate, no-euphemism explanations.",
        xp: 50,
        readTime: "5 min read",
        summary: "A friendly, honest guide to the female reproductive system: the uterus, ovaries, fallopian tubes, cervix, and lining. Knowing these parts helps you explain exactly what you feel to a doctor.",
        keyTakeaways: [
          "The vulva is the outside part you can see; the vagina is the stretchy muscular canal on the inside.",
          "The uterus is an amazing muscle about the size of a fist that sheds its lining during periods.",
          "Using accurate medical words removes awkwardness and helps you advocate for yourself."
        ],
        visualCards: [
          {
            title: "The Uterus",
            iconName: "Heart",
            text: "A strong, hollow pear-shaped muscle that gently contracts during periods to shed blood.",
            highlight: "The muscle house"
          },
          {
            title: "The Ovaries",
            iconName: "Sparkles",
            text: "Twin glands holding your eggs and making estrogen and progesterone to keep you strong.",
            highlight: "The hormone factory"
          },
          {
            title: "The Cervix",
            iconName: "Shield",
            text: "The sturdy doorway between your uterus and vagina that makes natural, healthy fluid.",
            highlight: "The doorway"
          }
        ],
        diagram: {
          type: "anatomy-callout",
          title: "Interactive Female Reproductive Anatomy Guide",
          caption: "Tap on the uterus, ovaries, fallopian tubes, cervix, and lining to explore what each organ does in plain English."
        }
      },
      {
        id: "body-5",
        name: "Advocate: Speaking Up for Your Body",
        type: "lesson",
        isAdvocateCapstone: true,
        desc: "Learn your anatomy, recognize changes or pain, and advocate confidently without embarrassment.",
        xp: 50,
        readTime: "4 min read",
        summary: "Your body belongs to you. Using correct anatomical words removes awkwardness and gives you the exact terms needed to describe changes, lumps, skin flares, or pain to doctors and trusted adults without shame.",
        keyTakeaways: [
          "Learn: Biological development is unique to each person; asking questions about bodily changes is healthy, normal self-care.",
          "Recognize: Red flags include unexplained lumps, severe itching, persistent pelvic discomfort, or sudden asymmetrical swelling.",
          "Advocate: You have the right to request a female clinician, bring a trusted parent or friend, or ask the doctor to pause the exam at any moment.",
          "If a clinician minimizes your concern as 'just growing pains,' firmly request: 'I know my body and this symptom is new. What else could explain this?'"
        ],
        visualCards: [
          {
            title: "1. LEARN",
            iconName: "Sparkles",
            text: "Accurate anatomical names (vulva, uterus, lymph nodes) remove shame and turn awkward questions into clear medical facts.",
            highlight: "Knowledge removes shame"
          },
          {
            title: "2. RECOGNIZE",
            iconName: "AlertTriangle",
            text: "Spotting when a change isn't 'just puberty'—like painful lumps, burning sensations, or sudden asymmetry that lasts more than 2 weeks.",
            highlight: "Spot red flags"
          },
          {
            title: "3. ADVOCATE",
            iconName: "Shield",
            text: "You are the leading expert on what you feel inside your own body. You have the right to gentle explanations and a chaperone at any visit.",
            highlight: "You have patient rights"
          }
        ],
        advocacyScript: {
          situation: "You noticed a painful change or lump, but you feel nervous or embarrassed to bring it up to a doctor or adult.",
          doctorScript: "“I have noticed a persistent change in my body that is causing me discomfort. I want to explain what I am feeling using the correct terms so we can evaluate it together.”",
          whyItWorks: "Frames the issue objectively as physical data, which helps doctors immediately focus on clinical assessment rather than dismissing it as awkwardness.",
          whatIfDismissed: "“If you believe this requires no further testing, can you explain which physical findings rule out other causes, and what signs mean I should come back?”"
        }
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
        clinicalQuote: {
          quote: "Identifying abnormal menstrual patterns in adolescence may improve early identification of potential health concerns for adulthood... By including an evaluation of the menstrual cycle as an additional vital sign, clinicians educate girls and their caregivers about normal cycle intervals and promote healthy habits.",
          source: "American College of Obstetricians and Gynecologists (ACOG)",
          publication: "ACOG Committee Opinion No. 651",
        },
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
          medicalReviewer: "Grounded in ACOG Adolescent Gynecologic Guidelines",
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
            options: ["Thyroid hormone", "Melatonin", "Luteinizing Hormone (LH)", "Insulin"],
            correctIndex: 2,
            explanation: "A rapid LH surge from the pituitary gland signals the ovary to release the mature egg."
          },
          {
            question: "What is the typical medical definition of a healthy cycle length?",
            options: ["Exactly 28 days every single month without variation", "Under 14 days", "45 to 60 days", "Between 21 and 35 days for most adults"],
            correctIndex: 3,
            explanation: "While 28 days is an average, healthy adult cycles generally range from 21 to 35 days."
          },
          {
            question: "Why is the menstrual cycle called the '5th vital sign' by major medical groups?",
            options: ["It only matters for athletes", "It indicates overall endocrine, metabolic, and bone health", "It is just an advertising phrase", "It only relates to pregnancy"],
            correctIndex: 1,
            explanation: "Cycle regularity reflects balanced thyroid function, adequate energy availability, and hypothalamic health."
          }
        ]
      },
      {
        id: "cycle-1",
        name: "Cramps & Pain Management",
        type: "lesson",
        desc: "Why they happen and what actually brings relief.",
        xp: 50,
        readTime: "4 min read",
        summary: "Cramps happen when your uterus makes natural chemicals called prostaglandins, which make the muscle gently squeeze to shed its lining. Mild cramps are common, but severe pain that stops your day is not something you have to just 'tough out'.",
        keyTakeaways: [
          "Heating pads, warm baths, gentle walking, and staying well-hydrated help relax tense pelvic muscles.",
          "Staying hydrated dilutes inflammatory prostaglandins in uterine tissue, easing the severity of muscle spasms.",
          "Over-the-counter pain relievers (like ibuprofen) work best when taken early because they block cramp-causing chemicals before they peak.",
          "Heavy flow depletes ferritin iron stores; pairing iron-rich meals with Vitamin C prevents fatigue and sports anemia.",
          "Severe cramps that keep you home from school or make you vomit warrant talking to a doctor to check for endometriosis."
        ],
        visualCards: [
          {
            title: "Why Cramps Happen",
            iconName: "Heart",
            text: "Your body releases natural chemicals called prostaglandins that prompt the uterus muscle to squeeze and shed its lining.",
            highlight: "Natural chemical messengers"
          },
          {
            title: "Hydrate to Ease Spasms",
            iconName: "Droplets",
            text: "Dehydration concentrates prostaglandins in pelvic tissue, making spasms harsher. Consistent water intake helps soothe contractions.",
            highlight: "Water dilutes cramps"
          },
          {
            title: "Proven First-Line Relief",
            iconName: "Sparkles",
            text: "A heating pad soothes cramping muscles just as effectively as ibuprofen. Warm tea and gentle movement also release tension.",
            highlight: "Heat pads & gentle movement"
          },
          {
            title: "When to Talk to a Doctor",
            iconName: "AlertTriangle",
            text: "If cramps cause you to miss school, leave you stuck in bed despite painkillers, or cause severe nausea, that is a red flag to get checked.",
            highlight: "Pain should not stop your life"
          }
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
      },
      {
        id: "cycle-5",
        name: "Advocate: Speaking Up on Period Pain & Irregularity",
        type: "lesson",
        isAdvocateCapstone: true,
        desc: "Learn cycle norms, recognize red-flag symptoms, and advocate to doctors when bleeding or pain disrupts your life.",
        xp: 50,
        readTime: "4 min read",
        summary: "Your menstrual cycle is recognized by physicians as your 5th vital sign. Because female biology was historically excluded from clinical trials until the 1993 NIH Revitalization Act, menstrual distress has often been minimized as subjective. Period pain that leaves you curled in bed, missing classes, or vomiting is never 'just part of being a woman.' Concrete data and clear scripts bridge this historical gap to ensure you are taken seriously.",
        keyTakeaways: [
          "Learn: A normal period shouldn't prevent you from attending school, work, or sports. Science confirms menstrual distress reflects real inflammatory biomarkers, not psychogenic oversensitivity.",
          "Recognize: Red flags include soaking a pad/tampon every hour for 2+ hours, passing clots larger than a quarter, or missing 3+ periods in a row.",
          "Advocate: Bring a 2-to-3 month symptom log showing exact dates, pain levels (1-10), and days of school or activities missed to counteract research and diagnosis gaps.",
          "If told 'it's just bad cramps, take Midol,' use the magic chart line: 'Please note in my chart that I am losing school days to debilitating pain and you are declining an ultrasound.'"
        ],
        visualCards: [
          {
            title: "1. LEARN",
            iconName: "Calendar",
            text: "Your period is a vital sign like your pulse. Healthy periods have mild discomfort that easily eases with a heat pad or light snack.",
            highlight: "The 5th Vital Sign"
          },
          {
            title: "2. RECOGNIZE",
            iconName: "AlertTriangle",
            text: "Debilitating pain that resists standard pain relievers or bleeding through clothes are biological alarms, not normal teenage milestones.",
            highlight: "Pain is a signal"
          },
          {
            title: "3. ADVOCATE",
            iconName: "Shield",
            text: "Data closes the gender research gap. Presenting a written symptom log with functional impairment (missed classes) compels clinicians to order diagnostic imaging.",
            highlight: "Data closes the gap"
          }
        ],
        advocacyScript: {
          situation: "Doctor tells you: 'Cramps are normal for young girls, just take some ibuprofen and rest.'",
          doctorScript: "“My pain reaches an 8 out of 10 and causes me to miss school every month despite taking ibuprofen. Because this interferes with my daily life, I would like to order a pelvic ultrasound to investigate secondary causes like endometriosis.”",
          whyItWorks: "Physicians are trained to intervene when symptoms cause functional impairment (missed school/work). Quantifying pain and functional loss requires a clinical response.",
          whatIfDismissed: "“If you are not comfortable evaluating my cycle further today, please refer me to an adolescent gynecologist who specializes in pelvic pain, and record your refusal in my chart.”"
        }
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
        desc: "Fertilization, early symptoms, urgent maternal warning signs vs. dismissal risks, and patient advocacy.",
        xp: 50,
        readTime: "6 min read",
        summary: "Fertilization occurs when sperm meets an egg in the fallopian tube, forming a blastocyst that implants into the uterine lining 6 to 12 days later. Early pregnancy triggers exponential surges of beta-hCG and progesterone, causing classic physiological adaptations like fatigue, breast tenderness, and nausea. However, when pregnant individuals report alarming changes, medical dismissal—labeling critical symptoms as 'just normal pregnancy discomfort' or 'anxiety'—poses devastating, life-threatening risks. Clinical data from CDC Maternal Mortality Review Committees proves that over 80% of maternal deaths in the U.S. are preventable, driven directly by delayed diagnosis and unaddressed patient concerns.",
        keyTakeaways: [
          "Early Biology & Testing: Implantation occurs 6–12 days post-conception, prompting trophoblast cells to secrete beta-hCG (doubling every 48–72 hours). Over-the-counter urine tests detect hCG accurately from the first day of a missed period.",
          "Typical Symptoms vs. Red Flags: Mild breast tenderness, fatigue, and morning sickness are expected adaptations. Severe unremitting headaches, visual disturbances, epigastric upper belly pain, and sudden facial edema are CDC Urgent Maternal Warning Signs.",
          "The Harmful Cascade of Dismissal: Brushing off patient concerns as 'anxiety' delays detection of preeclampsia, HELLP syndrome, internal hemorrhage, and pulmonary embolisms—turning treatable complications into fatal emergencies.",
          "Over 80% Preventable: Data from CDC-funded Maternal Mortality Review Committees (MMRCs) reveals that over 80% (up to 87%) of pregnancy-related deaths in the United States could be prevented with timely clinical response and communication.",
          "Landmark Cited Cases: Tennis icon Serena Williams survived a post-C-section pulmonary embolism only because she aggressively insisted on a CT angiogram when nurses dismissed her breathing distress. Conversely, Kira Dixon Johnson died from preventable internal hemorrhage after 10 hours of family pleading was ignored ('she is not a priority'), sparking the federal Preventing Maternal Deaths Act of 2018. Renowned pediatric chief resident Dr. Chaniece Wallace and CDC epidemiologist Dr. Shalon Irving tragically passed away from postpartum preeclampsia and hypertensive crisis despite their elite medical literacy, demonstrating that credentials do not insulate Black women from systemic dismissal.",
          "Documenting Refusal: If a clinician refuses to order blood pressure re-checks, urine protein testing, or lab panels for urgent symptoms, calmly insist: 'Please document your refusal to perform this diagnostic evaluation in my chart along with your medical justification.'"
        ],
        visualCards: [
          {
            title: "1. GENERAL SYMPTOMS & BIOLOGY",
            iconName: "Activity",
            text: "Implantation triggers exponential surges in beta-hCG and progesterone. Expected adaptations include breast swelling, mild morning nausea, and progesterone-mediated fatigue that improves with rest.",
            highlight: "Early pregnancy adaptations"
          },
          {
            title: "2. CDC URGENT MATERNAL WARNING SIGNS",
            iconName: "AlertTriangle",
            text: "The CDC Hear Her campaign identifies 15 red flags requiring immediate medical evaluation: unyielding severe headache, vision spots/auras, epigastric right upper quadrant pain, sudden hand/facial swelling, chest pain, and heavy bleeding.",
            highlight: "15 critical red flags"
          },
          {
            title: "3. THE DEADLY COST OF DISMISSAL",
            iconName: "Shield",
            text: "When clinical staff dismiss symptoms as 'new mother anxiety,' preeclampsia progresses to eclampsia and stroke, internal bleeding leads to hypovolemic shock, and deep vein thrombosis turns into fatal pulmonary embolisms.",
            highlight: "Consequences of delayed care"
          },
          {
            title: "4. LANDMARK CASES & THE 80%+ PREVENTABLE REALITY",
            iconName: "Heart",
            text: "Documented cases like Serena Williams, Kira Dixon Johnson, Dr. Shalon Irving, and Dr. Chaniece Wallace expose systemic dismissal. Over 80% of U.S. maternal deaths are preventable when patients are believed and evaluated immediately.",
            highlight: "Preventable maternal mortality"
          }
        ],
        diagram: {
          type: "maternal-warning-signs",
          title: "Interactive Maternal Warning Signs & Clinical Dismissal Matrix",
          caption: "Compare normal pregnancy symptoms with urgent clinical warning signs, explore the physiological dangers of medical dismissal, and review documented landmark cases with self-advocacy scripts."
        },
        advocacyScript: {
          situation: "A healthcare provider or triage nurse dismisses your severe headache, vision changes, sudden facial swelling, or shortness of breath as 'just normal pregnancy discomfort and stress.'",
          doctorScript: "“Dr. [Name], my symptoms align directly with the CDC's Urgent Maternal Warning Signs for preeclampsia and acute cardiovascular complications. I know my body, and this is not normal discomfort. I am formally requesting an immediate blood pressure check, a urine protein dip, and a complete metabolic and coagulation panel right now. If you decline to run these diagnostic tests, please document your clinical refusal and medical justification in my chart today.”",
          whyItWorks: "Invoking standardized CDC Urgent Maternal Warning Signs shifts the conversation from subjective complaint to evidence-based clinical protocols, and demanding documented refusal in your chart creates immediate legal and medical liability accountability.",
          whatIfDismissed: "“I do not feel medically safe leaving this facility. Please page the obstetric attending on call and contact the hospital patient advocate or nursing supervisor immediately.”"
        },
        quiz: [
          {
            question: "What is the primary clinical distinction between typical pregnancy fatigue and an urgent maternal warning sign?",
            options: [
              "Fatigue is always dangerous and requires emergency surgery",
              "Pregnant people never experience fatigue",
              "Expected fatigue improves with rest, whereas urgent warning signs include severe unremitting headaches, visual auras, chest pain, or sudden facial edema",
              "All headaches in pregnancy are harmless"
            ],
            correctIndex: 2,
            explanation: "Expected physiological fatigue improves with hydration and rest. In contrast, unyielding severe headaches, visual disturbances, or sudden swelling are signs of preeclampsia or cardiovascular complications requiring immediate clinical evaluation."
          },
          {
            question: "According to data from CDC Maternal Mortality Review Committees (MMRCs), what percentage of pregnancy-related deaths in the United States are clinically preventable?",
            options: [
              "Over 80% to 87% are preventable through timely recognition and communication",
              "Under 5%",
              "Exactly 50%",
              "Maternal deaths cannot be prevented"
            ],
            correctIndex: 0,
            explanation: "CDC-funded MMRCs across 36 states found that over 80% (up to 87%) of maternal deaths could be prevented with timely clinical diagnosis, recognition of warning signs, and respectful communication."
          },
          {
            question: "When tennis champion Serena Williams experienced sudden shortness of breath and coughing post-C-section, hospital staff initially dismissed her symptoms as confusion from pain medication. How did self-advocacy save her life?",
            options: [
              "She waited until the next day to see if it resolved",
              "She stopped breathing completely before anyone noticed",
              "She left the hospital against medical advice",
              "She knew her history, insisted on an immediate CT angiogram with contrast and IV heparin, and clinicians discovered life-threatening pulmonary emboli"
            ],
            correctIndex: 3,
            explanation: "Because Serena understood her medical history and insisted on diagnostic imaging despite nurse pushback, physicians performed a CT angiogram that revealed bilateral pulmonary emboli, allowing life-saving heparin treatment."
          }
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
      },
      {
        id: "conditions-3",
        name: "Know Your Rights: Confidential Care & Patient Protections",
        type: "lesson",
        isAdvocateCapstone: true,
        desc: "Learn your healthcare privacy rights, recognize clinical boundary crossings, and advocate for confidential, respectful care.",
        xp: 50,
        readTime: "4 min read",
        summary: "Every patient deserves dignity, comprehensive information, and confidential healthcare. Knowing your rights under Title X and minor consent laws empowers you to access reproductive care without fear, judgment, or unwanted disclosures.",
        clinicalQuote: {
          quote: "Adolescents are more likely to seek reproductive health care and disclose sensitive health information when assured of confidentiality. Professional medical consensus supports the provision of confidential care to minors, including contraception, STI testing, and mental health services.",
          source: "American College of Obstetricians and Gynecologists (ACOG)",
          publication: "ACOG Committee Opinion No. 803: Confidentiality in Adolescent Health Care",
          year: "2020",
        },
        keyTakeaways: [
          "Learn: In almost all jurisdictions, Title X-funded clinics provide confidential contraception, STI testing, and counseling without parental notification.",
          "Recognize: Red flags include a clinician lecturing or judging you, refusing to explain why an exam is performed, or threatening to disclose private conversations.",
          "Advocate: State your privacy expectations upfront: 'I am here under confidential care guidelines. Please explain every step before proceeding.'",
          "You have the absolute right to request a chaperone in the room, ask for another provider, or stop any examination immediately."
        ],
        visualCards: [
          {
            title: "1. LEARN",
            iconName: "BookOpen",
            text: "Title X clinics and community health centers exist to protect confidential healthcare access regardless of age, income, or health insurance.",
            highlight: "Title X protections"
          },
          {
            title: "2. RECOGNIZE",
            iconName: "AlertTriangle",
            text: "Any clinician who lectures, shames, or rushes through an invasive physical exam without your explicit verbal consent is violating medical ethics.",
            highlight: "Spot boundary crossing"
          },
          {
            title: "3. ADVOCATE",
            iconName: "Shield",
            text: "You always have the legal right to say: 'Pause. Please explain what this exam entails and why it is clinically necessary before we continue.'",
            highlight: "Enforce boundaries"
          }
        ],
        advocacyScript: {
          situation: "You are visiting a clinic for birth control or pregnancy counseling and want to ensure complete confidentiality.",
          doctorScript: "“Before we begin, I want to confirm that all services, lab results, and billing today are handled strictly under confidential Title X adolescent care protocols.”",
          whyItWorks: "Citing specific legal protections (Title X) immediately alerts clinic staff to activate their confidential billing suppressions and private contact flags.",
          whatIfDismissed: "“If your clinic policy does not provide confidential billing or care for minor reproductive services, please direct me to the nearest Title X federally qualified health center.”"
        },
        quiz: [
          {
            question: "Under Title X federal guidelines, what are the confidentiality protections for adolescent patients?",
            options: [
              "Parental consent is required for all appointments",
              "Services, counseling, and STI/contraception care are strictly confidential without parental notification",
              "Clinics must call parents after blood tests are complete",
              "Confidentiality only applies to patients over age 21"
            ],
            correctIndex: 1,
            explanation: "Title X federal regulations guarantee confidential family planning and reproductive health services to minors without parental consent or notification."
          },
          {
            question: "What is your legal right if you feel uncomfortable or rushed during an invasive physical examination?",
            options: [
              "You must remain silent and let the clinician finish",
              "You can ask for a pause, request a trained chaperone, or stop the examination entirely at any time",
              "You can only speak if your parent gives written permission",
              "Clinicians have legal immunity to conduct exams however they choose"
            ],
            correctIndex: 1,
            explanation: "Informed consent is continuous; patients have the absolute right to pause an exam, ask questions, request an impartial medical chaperone, or withdraw consent at any time."
          }
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
        clinicalQuote: {
          quote: "Polycystic ovary syndrome affects approximately 5% to 10% of women of reproductive age. In adolescents, diagnostic criteria require persistent ovulatory dysfunction accompanied by clinical or biochemical hyperandrogenism, with physiologic adolescent changes carefully distinguished.",
          source: "American College of Obstetricians and Gynecologists (ACOG)",
          publication: "ACOG Practice Bulletin No. 194",
        },
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
          medicalReviewer: "Grounded in Pediatric & Adolescent Reproductive Endocrine Protocols",
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
            options: ["All 3 criteria must be present", "Only an ultrasound finding", "A single abnormal blood test", "At least 2 out of 3 criteria"],
            correctIndex: 3,
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
            options: ["Dangerous tumors", "Infected fluid pockets", "Immature follicles paused in development", "Scar tissue"],
            correctIndex: 2,
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
      },
      {
        id: "pcos-4",
        name: "Advocate: Getting Taken Seriously for PCOS",
        type: "lesson",
        isAdvocateCapstone: true,
        desc: "Learn the Rotterdam criteria, recognize dismissal tactics, and advocate for comprehensive hormone panels and ultrasound.",
        xp: 50,
        readTime: "4 min read",
        summary: "PCOS affects up to 10% of reproductive-age individuals, yet up to 70% remain undiagnosed due to historical research gaps where female metabolic profiles were excluded from early endocrine trials. Frequently dismissed with lazy advice like 'just lose weight and take the pill,' patients have the right to comprehensive hormone panels and metabolic evaluation under Rotterdam criteria.",
        keyTakeaways: [
          "Learn: Under the Rotterdam Criteria, diagnosis requires at least 2 of 3: irregular ovulation, elevated androgens (testosterone), or polycystic ovaries on ultrasound.",
          "Recognize: Historically excluded from early metabolic studies, PCOS was long misclassified as cosmetic rather than an endocrine insulin-resistance syndrome. Red flags include prescribing birth control without baseline hormone testing.",
          "Advocate: Request a morning fasted blood panel (total/free testosterone, DHEA-S, fasting insulin, HbA1c, thyroid panel) and a pelvic ultrasound to secure definitive medical care.",
          "If a clinician refuses bloodwork, say: 'Please document in my medical record that I requested diagnostic hormone testing for suspected PCOS and that you declined.'"
        ],
        visualCards: [
          {
            title: "1. LEARN",
            iconName: "Sparkles",
            text: "The Rotterdam Criteria are the international medical standard. You only need 2 of 3 criteria—you don't even need ovarian cysts to have PCOS!",
            highlight: "Rotterdam Standards"
          },
          {
            title: "2. RECOGNIZE",
            iconName: "AlertTriangle",
            text: "Medical gaslighting occurs when a provider tells you to 'just lose weight' without testing your fasting insulin or hormone levels.",
            highlight: "Reject weight blame"
          },
          {
            title: "3. ADVOCATE",
            iconName: "Shield",
            text: "Birth control masks PCOS symptoms without diagnosing the underlying insulin or androgen imbalance. Demand baseline testing first.",
            highlight: "Request bloodwork"
          }
        ],
        advocacyScript: {
          situation: "Doctor says: 'Your periods are irregular because you need to lose weight. Just take this birth control pill.'",
          doctorScript: "“I want to identify the biological root cause of my irregular cycles before starting hormonal suppression. I am requesting a morning lab panel for total and free testosterone, DHEA-S, and fasting insulin, plus a pelvic ultrasound under Rotterdam diagnostic guidelines.”",
          whyItWorks: "Citing the 'Rotterdam diagnostic guidelines' demonstrates medical literacy and shifts the conversation from subjective weight bias to evidence-based clinical protocols.",
          whatIfDismissed: "“If you decline to order these diagnostic labs today, please enter your clinical reasoning and refusal into my chart so I have it for my records, and provide me with a referral to a reproductive endocrinologist.”"
        }
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
        clinicalQuote: {
          quote: "Adolescents with clinically suspected endometriosis often present with acyclic or continuous chronic pelvic pain and severe dysmenorrhea unresponsive to NSAIDs and hormonal therapy. Pain that interferes with school or daily activities is not a normal part of menstruation and requires timely clinical evaluation.",
          source: "American College of Obstetricians and Gynecologists (ACOG)",
          publication: "ACOG Committee Opinion No. 760",
        },
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
          medicalReviewer: "Grounded in Minimally Invasive Gynecologic Care Standards",
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
            options: ["Only inside the stomach cavity", "Inside the bloodstream exclusively", "Inside the thyroid gland", "Outside the uterus on pelvic organs like ovaries, bladder, and bowel"],
            correctIndex: 3,
            explanation: "Endometriosis is characterized by endometrium-like tissue growing outside the uterine cavity on surrounding pelvic structures."
          },
          {
            question: "If severe period pain prevents you from attending school or work despite medication, what is the best next step?",
            options: ["Consult a healthcare provider or gynecologist for specialized evaluation", "Wait 10 years until it goes away", "Stop eating all food", "Assume everyone suffers equally and push through"],
            correctIndex: 0,
            explanation: "Debilitating pain is never something you have to silently endure; seeking a medical evaluation is essential."
          },
          {
            question: "Does the anatomical stage (Stage 1 vs. Stage 4) always match how much pain a person feels?",
            options: ["Yes, Stage 1 has zero pain ever", "No, microscopic Stage 1 lesions near nerves can cause extreme pain", "Yes, pain is always exactly proportional to stage", "Stage has nothing to do with medicine"],
            correctIndex: 1,
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
        name: "Advocate: Overcoming the Endometriosis Delay",
        type: "lesson",
        isAdvocateCapstone: true,
        desc: "Learn the diagnostic pathway, recognize dismissive 'just cramps' gaslighting, and advocate for an excision specialist.",
        xp: 50,
        readTime: "4 min read",
        summary: "The average person with endometriosis waits 7 to 10 years and sees 8 doctors before receiving a diagnosis. This delay is directly tied to the gender research gap: endometriosis affects 190 million people worldwide, yet receives less than 0.03% of federal health research funding. Armed with clinical guidelines, a structured symptom log, and assertive scripts, you can cut through the dismissal and get effective care.",
        keyTakeaways: [
          "Learn: Endometriosis is a systemic inflammatory disease where tissue similar to the uterine lining grows outside the uterus. Decades of research underfunding mean non-invasive blood biomarkers are still emerging, making patient self-advocacy vital.",
          "Recognize: Warning signs include pain with bowel movements or urination during periods, pain radiating down thighs, and pain unresponsive to standard NSAIDs.",
          "Advocate: Emphasize functional impairment: 'My pain causes me to miss classes and affects my mobility. Under ACOG Opinion 760, normal ultrasounds do not rule out endometriosis; I need a referral to a minimally invasive gynecologic surgeon (MIGS).'",
          "Always remember: Normal pelvic ultrasounds DO NOT rule out endometriosis; superficial peritoneal lesions are invisible on standard ultrasound."
        ],
        visualCards: [
          {
            title: "1. LEARN",
            iconName: "Heart",
            text: "Endometriosis affects 1 in 10 individuals. Superficial lesions frequently do NOT show up on standard ultrasound—a clear ultrasound does not mean you're fine!",
            highlight: "Ultrasound limits"
          },
          {
            title: "2. RECOGNIZE",
            iconName: "AlertTriangle",
            text: "Dismissal sounds like: 'Every woman deals with pain, you just have a low pain tolerance.' Pain that interferes with life is NEVER normal.",
            highlight: "Reject gaslighting"
          },
          {
            title: "3. ADVOCATE",
            iconName: "Shield",
            text: "Request a referral to a Minimally Invasive Gynecologic Surgeon (MIGS) who performs laparoscopic excision rather than temporary burning (ablation).",
            highlight: "Demand excision"
          }
        ],
        advocacyScript: {
          situation: "Doctor says: 'Your pelvic ultrasound came back completely clear, so there is nothing wrong with you. You just have painful periods.'",
          doctorScript: "“According to ACOG guidelines, a normal pelvic ultrasound cannot rule out peritoneal endometriosis. Because my pain remains severe and debilitating, I am requesting a referral to an endometriosis specialist or MIGS surgeon for advanced diagnostic evaluation.”",
          whyItWorks: "Holding up the official clinical guideline (that ultrasound cannot rule out endometriosis) leaves no room for a provider to dismiss the case based on an imaging report alone.",
          whatIfDismissed: "“Please document in my chart that my symptoms include chronic pelvic pain and functional disruption, that ultrasound was normal, and that you are declining a specialist referral.”"
        }
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
      },
      {
        id: "realtalk-6",
        name: "Advocate: Talking Testing & Boundaries",
        type: "lesson",
        isAdvocateCapstone: true,
        desc: "Learn sexual health communication, recognize manipulation, and advocate for mutual STI testing and firm boundaries.",
        xp: 50,
        readTime: "4 min read",
        summary: "Advocating for your sexual health isn't awkward—it is the highest form of self-respect and mutual care. Asking for barrier protection and mutual STI screening before intimacy protects both your physical health and your peace of mind.",
        keyTakeaways: [
          "Learn: Most STIs have zero symptoms in early stages; testing is the only accurate way to know status for sure.",
          "Recognize: Manipulation sounds like 'If you really loved me you wouldn't ask for a test' or 'Condoms ruin the mood.' These are boundary violations.",
          "Advocate: Make safer sex non-negotiable: 'I care about both of our bodies. Getting tested together and using condoms is my standard for intimacy.'",
          "You have the absolute legal and personal right to change your mind and withdraw consent at any point, without guilt or explanation."
        ],
        visualCards: [
          {
            title: "1. LEARN",
            iconName: "Heart",
            text: "Over 70% of people with chlamydia or HPV have zero visible symptoms. Asking for a test is an act of shared care, never an accusation.",
            highlight: "Testing = Care"
          },
          {
            title: "2. RECOGNIZE",
            iconName: "AlertTriangle",
            text: "Red flags include pressure to abandon protection, stealthing (removing a condom without consent), or making you feel guilty for setting limits.",
            highlight: "Spot manipulation"
          },
          {
            title: "3. ADVOCATE",
            iconName: "Shield",
            text: "Clear, proactive communication: 'Here is what I need to feel comfortable and safe.' Anyone who respects you will enthusiastically agree.",
            highlight: "Set firm limits"
          }
        ],
        advocacyScript: {
          situation: "A partner pushes back against wearing a condom or getting tested, claiming: 'I'm clean, don't you trust me?'",
          doctorScript: "“This isn't about trust—it's about basic healthcare. Many STIs have zero symptoms. Getting tested together and using condoms is how I protect my health, and it's non-negotiable for me.”",
          whyItWorks: "Decouples testing from emotional trust and frames it firmly as standard personal healthcare hygiene, removing space for guilt trips.",
          whatIfDismissed: "“If you aren't comfortable prioritizing both of our health with testing and condoms, then we aren't compatible for intimacy.”"
        }
      },
      {
        id: "realtalk-7",
        name: "Know Your Rights: Healthcare Privacy & Youth Consent",
        type: "lesson",
        isAdvocateCapstone: true,
        desc: "Federal Title X protections, minor consent laws, pharmacy rights, and stopping billing leaks to parents.",
        xp: 50,
        readTime: "5 min read",
        summary: "Navigating healthcare as a young person can feel intimidating, but you have clear, federally protected rights. From confidential STI testing and birth control under Title X, to buying over-the-counter emergency contraception at any age with zero ID, to requesting a medical chaperone and suppressing insurance bills sent home—knowing your legal rights ensures you receive dignified, confidential care.",
        clinicalQuote: {
          quote: "Adolescents are more likely to seek reproductive health care and disclose sensitive health information when assured of confidentiality. Professional medical consensus supports the provision of confidential care to minors, including contraception, STI testing, and mental health services.",
          source: "American College of Obstetricians and Gynecologists (ACOG)",
          publication: "ACOG Committee Opinion No. 803: Confidentiality in Adolescent Health Care",
          year: "2020",
        },
        keyTakeaways: [
          "Title X Federal Protections: Federally funded Title X clinics provide confidential contraception, STI testing, and reproductive care without parental notification or consent.",
          "Explanation of Benefits (EOB) Suppression: You have the right to request a confidential billing waiver or sliding-scale self-pay so that insurance statements are not mailed to your home.",
          "Emergency Contraception Rights: Under 2013 FDA regulations, anyone of any age can purchase levonorgestrel emergency contraception (Plan B and generic equivalents) over the counter without a prescription, ID, or parental presence in all 50 states.",
          "Informed Consent & Exam Boundaries: You always have the legal right to have a medical chaperone in the room, to pause or refuse any physical examination, and to have every procedure explained before it begins.",
          "Medical Interpretation Rights: Under Title VI of the Civil Rights Act and Section 1557 of the ACA, clinics are legally required to provide certified medical interpreters at no cost—minors can never be forced to translate for family members."
        ],
        visualCards: [
          {
            title: "Title X & Confidential Care",
            iconName: "Shield",
            text: "Federal law guarantees confidential reproductive care at Title X clinics. No parental consent or notification is required regardless of your age or income.",
            highlight: "Federally protected"
          },
          {
            title: "Pharmacy OTC Rights",
            iconName: "CheckCircle2",
            text: "Emergency contraception is 100% over-the-counter with zero age limits, no ID required, and no prescription needed anywhere in the U.S.",
            highlight: "No ID or age barrier"
          },
          {
            title: "Exam & Privacy Boundaries",
            iconName: "AlertTriangle",
            text: "You control your body. You can pause any examination, request a female chaperone, or decline unnecessary invasive tests at any time.",
            highlight: "Full patient autonomy"
          }
        ],
        advocacyScript: {
          situation: "When visiting a doctor or front desk and wanting to ensure full confidentiality without insurance papers mailed to your parents.",
          doctorScript: "“I would like to receive confidential care today under Title X adolescent health protocols. Please ensure that no Explanation of Benefits (EOB) or itemized billing statements are sent to my home address, and use my direct cell phone for any follow-up lab communications.”",
          whyItWorks: "Citing Title X and minor confidentiality protocols immediately triggers the clinic's private billing suppression flags in their electronic health record.",
          whatIfDismissed: "“If this facility cannot guarantee confidential billing suppression, please connect me with a clinic social worker or provide a referral to the nearest Title X health center.”"
        },
        quiz: [
          {
            question: "Under federal FDA regulations, what are the requirements to buy Plan B (levonorgestrel) emergency contraception at a retail pharmacy?",
            options: [
              "You must be 18 and show a government photo ID",
              "You need a doctor's prescription if you are under 17",
              "There are zero age restrictions, no ID required, and no prescription needed",
              "A parent or legal guardian must be present at the checkout"
            ],
            correctIndex: 2,
            explanation: "The FDA eliminated all age restrictions and prescription mandates in 2013. Emergency contraception is approved for unrestricted over-the-counter sale to all individuals."
          },
          {
            question: "What should you say if an insurance Explanation of Benefits (EOB) sent home might compromise your reproductive privacy?",
            options: [
              "Pay full emergency room rates in cash",
              "Request Title X confidential sliding-scale funding or a confidential billing suppression waiver",
              "Skip the test and wait until you turn 26",
              "Give a false name to the clinic"
            ],
            correctIndex: 1,
            explanation: "Title X health centers provide sliding-scale funding based on the patient's individual income and have protocols to suppress automated insurance statements."
          },
          {
            question: "During a sensitive clinical examination, what rights do you have as a patient?",
            options: [
              "You must comply with whatever the clinician orders without speaking",
              "You can only refuse an exam if your parent is in the room",
              "You have the absolute right to have a chaperone present, ask questions, or pause/stop the exam at any time",
              "Clinicians are legally allowed to perform any procedure without explanation"
            ],
            correctIndex: 2,
            explanation: "Patients have full bodily autonomy and the statutory right to informed consent, meaning you can pause, ask why a step is necessary, or request a chaperone at any point."
          }
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
        name: "Puberty & Mental Health: Brain Rewiring & Emotional Waves",
        type: "lesson",
        desc: "The limbic-prefrontal gap, estrogen-serotonin shifts, normal mood swings vs. red flags, and emotional literacy.",
        xp: 50,
        readTime: "5 min read",
        summary: "During puberty, your brain undergoes its most massive neurodevelopmental rewiring since infancy. Your emotional engine (the limbic system and amygdala) matures years before your impulse-control and perspective-taking center (the prefrontal cortex). When you pair this developmental gap with rapid surges and drops in estrogen and progesterone—which directly modulate serotonin and GABA in the brain—sudden tears, intense joy, frustration, or vulnerability are physiologically expected. Understanding the biology removes shame and gives you tools to regulate your nervous system.",
        clinicalQuote: {
          quote: "Adolescent pubertal transition involves profound neural remodeling. The socioemotional limbic system—governing emotional reactivity and reward sensitivity—matures earlier than the prefrontal executive networks responsible for cognitive control. Furthermore, gonadal steroids directly alter serotonin and GABA neurotransmission. Understanding this neurobiological gap helps clinicians, families, and adolescents distinguish normal developmental volatility from clinical mood disorders.",
          source: "American Academy of Child & Adolescent Psychiatry (AACAP) & ACOG",
          publication: "AACAP Practice Parameter on Adolescent Mood Regulation & ACOG Clinical Guidance on Adolescent Mental Health",
        },
        keyTakeaways: [
          "The Brain Maturation Gap: The emotional and social radar of your brain (the amygdala) matures years ahead of the executive braking system (the prefrontal cortex).",
          "Hormones Talk to Neurotransmitters: Estrogen boosts serotonin (mood and optimism), while progesterone and allopregnanolone act on GABA (calmness). Sudden drops create temporary chemical dips.",
          "Adrenarche & Peer Sensitivity: Starting around ages 8–10, adrenal DHEA increases sensitivity to peer acceptance, belonging, and social evaluation.",
          "Normal Waves vs. Clinical Signals: Intense emotions that resolve with sleep, connection, or crying are healthy; pervasive hopelessness or loss of joy lasting ≥2 weeks requires professional care.",
          "Physiological Reset: Techniques like the physiological sigh (double inhale, long exhale), naming your feelings, and prioritizing 8–10 hours of sleep directly restore prefrontal control."
        ],
        visualCards: [
          {
            title: "The Emotional Engine (Amygdala)",
            iconName: "Zap",
            text: "Hyper-responsive during puberty. It processes excitement, fear, social status, and gut feelings at maximum volume.",
            highlight: "Matures early & fast"
          },
          {
            title: "The Executive Braking System (Prefrontal Cortex)",
            iconName: "Shield",
            text: "Still under active construction until roughly age 25! It is learning how to pause, analyze risks, and calm the amygdala down.",
            highlight: "Still remodeling"
          },
          {
            title: "Hormone-Brain Crosstalk",
            iconName: "Sparkles",
            text: "Estrogen and progesterone cross the blood-brain barrier. Rapid cyclical swings can trigger sudden tearfulness without any outside cause.",
            highlight: "Biological, not dramatic"
          }
        ],
        diagram: {
          type: "puberty-brain",
          title: "Interactive Puberty Brain & Emotional Regulation Simulator",
          caption: "Step through pubertal maturation stages, inspect the Prefrontal vs Amygdala developmental gap, and test how hormone dips and grounding resets influence your nervous system."
        },
        video: {
          title: "The Adolescent Brain: A Work in Progress",
          source: "Child Mind Institute & AACAP Adolescent Neuroscience",
          duration: "4:15",
          youtubeId: "0Ol2C1FcHgs",
          medicalReviewer: "Grounded in Child & Adolescent Psychiatric and Medical Standards",
          keyHighlights: [
            "Synaptic pruning and myelination rewire the adolescent brain for complex adult reasoning.",
            "Heightened emotional sensitivity is an evolutionary tool designed to encourage exploration and social bonding.",
            "Adequate sleep (8–10 hrs) and nutritional consistency directly protect mental health during hormonal transitions."
          ]
        },
        sorterGame: {
          title: "Normal Puberty Emotional Shifts vs. Clinical Support Signals",
          instructions: "Sort each emotional experience into healthy pubertal transition vs. signals to seek professional mental health care.",
          categories: [
            { id: "normal", name: "Healthy Puberty Emotional Wave", colorClass: "bg-emerald-50 border-emerald-300 text-emerald-900" },
            { id: "support", name: "Signal to Seek Professional Support", colorClass: "bg-red-50 border-red-300 text-red-900" }
          ],
          items: [
            {
              id: "mh1",
              text: "Crying after a frustrating day at school, but feeling refreshed after talking with a trusted friend or sleeping",
              correctCategory: "normal",
              explanation: "Episodic emotional release that resolves with social connection or rest is a healthy response to pubertal nervous system fatigue."
            },
            {
              id: "mh2",
              text: "Pervasive sadness, emptiness, or complete loss of interest in favorite sports and hobbies lasting more than 2 consecutive weeks",
              correctCategory: "support",
              explanation: "This meets clinical screening criteria for major depressive episode (anhedonia) and warrants an evaluation by a pediatrician or therapist."
            },
            {
              id: "mh3",
              text: "Feeling self-conscious about changing body shape or voice, but still attending class and hanging out with friends",
              correctCategory: "normal",
              explanation: "Transient self-consciousness during rapid physical growth is standard during adrenarche and early pubertal identity formation."
            },
            {
              id: "mh4",
              text: "Severe cyclical despair, sudden rage, or panic attacks that appear strictly in the 7–10 days before bleeding and vanish once bleeding starts",
              correctCategory: "support",
              explanation: "Strictly luteal-phase psychological distress indicates Premenstrual Dysphoric Disorder (PMDD), an endocrine-related mood condition that responds well to targeted medical treatment."
            },
            {
              id: "mh5",
              text: "Wanting more privacy in your room to recharge alone with music after overwhelming social school days",
              correctCategory: "normal",
              explanation: "Needing downtime to decompress and establish autonomy is a normal, healthy part of adolescent psychological development."
            },
            {
              id: "mh6",
              text: "Severe anxiety that causes frequent missed school days, avoiding eating around others, or thoughts of wanting to disappear",
              correctCategory: "support",
              explanation: "Any functional impairment in school, nutrition, or safety signals that the nervous system needs professional counseling and medical care."
            }
          ]
        },
        roleplayScenario: {
          id: "mind-0-sim-1",
          title: "Emotional Waves vs. Pubertal Brain Remodeling",
          phaseName: "1. Regulating Pubertal Nervous System Overload",
          setting: "At home after a demanding day when your emotions feel completely overwhelmed and tearful",
          character: "Parent or teacher observing your emotional reaction",
          characterRole: "Parent / Caregiver",
          patientName: "Sofia",
          patientRole: "Youth Advocate",
          statement: "“Why are you crying over something so minor? You've been so moody and dramatic lately, it feels like walking on eggshells around you.”",
          options: [
            {
              text: "“I'm not crying on purpose. During puberty, the emotional part of my brain matures years before the control center, and changing hormones drop serotonin levels fast. My nervous system is genuinely overloaded right now. Can I have 20 minutes to reset with some quiet, and then we can talk calmly?”",
              isBest: true,
              feedback: "Outstanding self-advocacy! Explaining the neurobiology takes away personal blame, validates that your feelings are physiologically real, and creates a healthy boundary for nervous system co-regulation.",
              xpBonus: 30
            },
            {
              text: "“Just leave me alone! You never listen and you make everything worse anyway!” (Slams door)",
              isBest: false,
              feedback: "While completely understandable when you feel attacked, slamming the door can leave you feeling more isolated and reinforces the misunderstanding that your feelings are just 'bad behavior.'",
              xpBonus: 5
            },
            {
              text: "“Sorry, you're right. I'm just broken. I'll just swallow my feelings and stop talking.”",
              isBest: false,
              feedback: "Internalizing shame and suppressing emotions increases chronic cortisol and worsens anxiety. Your emotions are not broken—your brain is simply undergoing intensive biological construction!",
              xpBonus: 5
            }
          ]
        },
        advocacyScript: {
          situation: "Discussing intense mood swings, crying spells, or premenstrual depression with your pediatrician, adolescent specialist, or gynecologist.",
          doctorScript: "“Over the last few months, I've experienced intense emotional swings and crying episodes that feel overwhelming. I've been tracking them, and they seem to peak in the week before my period and during high-stress periods. Because pubertal hormones modulate neurotransmitters, I want to evaluate whether this is standard developmental remodeling, an anxiety/mood disorder, or PMDD, and discuss evidence-based coping tools.”",
          whyItWorks: "Framing your experience in neurobiological terms (hormone-neurotransmitter modulation, prospective tracking, functional impairment) immediately prompts clinicians to run structured adolescent screenings (like the PHQ-9A or GAD-7) rather than dismissing your experience.",
          whatIfDismissed: "“If the clinician says 'that's just part of being a teenage girl,' ask calmly: 'Can we record in my visit notes that I reported persistent mood distress interfering with school and daily life, and could you refer me to an adolescent mental health professional or reproductive endocrinologist?'”"
        },
        quiz: [
          {
            question: "Why do adolescents experience emotions more intensely during puberty?",
            options: [
              "Teens simply lack the desire to regulate their emotions",
              "Hormones destroy all neurotransmitters in the brain permanently",
              "The emotional limbic system (amygdala) matures years before the executive control center (prefrontal cortex)",
              "Puberty only changes bones and muscles, with zero effect on the nervous system"
            ],
            correctIndex: 2,
            explanation: "The amygdala reaches peak sensitivity early, while the prefrontal cortex—which governs perspective, impulse modulation, and calm regulation—continues remodeling until approximately age 25."
          },
          {
            question: "How do shifting levels of estrogen and progesterone affect adolescent mood?",
            options: [
              "They only regulate reproductive organs and have no access to the brain",
              "They only affect hunger and thirst",
              "They permanently stop brain cell connections from forming",
              "They cross the blood-brain barrier to modulate serotonin and GABA neurotransmitter systems"
            ],
            correctIndex: 3,
            explanation: "Estrogen stimulates serotonin synthesis and receptor sensitivity, while progesterone and allopregnanolone modulate calming GABA-A receptors. Rapid fluctuations create real neurological mood dips."
          },
          {
            question: "Which of the following is a sign that mood changes warrant professional clinical care rather than being normal puberty waves?",
            options: [
              "Persistent sadness, anhedonia (loss of joy), or hopelessness lasting 2 or more consecutive weeks",
              "Crying after an upsetting exam, but feeling better after talking with a family member",
              "Needing 45 minutes of quiet time in your bedroom after a busy social day",
              "Feeling passionate and excited about a new sport or friendship"
            ],
            correctIndex: 0,
            explanation: "Persistent sadness or loss of interest lasting 2 or more weeks is a primary clinical indicator of depression, requiring professional healthcare evaluation."
          }
        ]
      },
      {
        id: "mind-1",
        name: "Stress & Hormones: Cortisol, Cycles & Sleep",
        type: "lesson",
        desc: "The HPA axis feedback loop: how chronic stress delays periods and disrupts mental health.",
        xp: 50,
        readTime: "4 min read",
        summary: "When you face chronic academic, social, or emotional stress, your brain's alarm center activates the Hypothalamic-Pituitary-Adrenal (HPA) axis, flooding your system with cortisol. Cortisol tells your body to prioritize immediate survival over reproductive health, which can delay ovulation, cause missed periods, and amplify mood swings.",
        clinicalQuote: {
          quote: "Psychogenic stress stimulates corticotropin-releasing hormone (CRH) and endogenous opioids, which directly suppress the pulsatile secretion of GnRH from the hypothalamus. Functional hypothalamic amenorrhea or cycle irregularity is a protective neuroendocrine adaptation signaling systemic physiological or psychological stress.",
          source: "The Global Library of Women's Medicine (GLOWM) & The Endocrine Society",
          publication: "GLOWM Clinical Guidelines on Hypothalamic Amenorrhea & Neuroendocrinology",
        },
        keyTakeaways: [
          "The Survival Switch: High cortisol tells your hypothalamus that the environment is unsafe, temporarily pausing ovulation or making periods irregular.",
          "Stress & Sleep Connection: Cortisol is supposed to be high in the morning and low at night. Chronic stress flips this curve, making it hard to fall asleep and worsening next-day mood.",
          "Physiological Reset: Just 5 minutes of slow diaphragmatic breathing or a restorative walk lowers circulating cortisol and reactivates parasympathetic recovery.",
          "Self-Advocacy: If stress has caused you to miss periods for 3+ months, it's essential to consult a doctor to protect bone density and rule out other conditions."
        ],
        visualCards: [
          {
            title: "The Alarm: Cortisol",
            iconName: "Zap",
            text: "Prepares you for fight-or-flight. Essential in short bursts, but draining when constantly elevated by school, social pressure, or lack of sleep.",
            highlight: "Survival hormone"
          },
          {
            title: "The Pause: GnRH Suppression",
            iconName: "AlertTriangle",
            text: "Your brain pauses reproduction until safety and rest return. This is why periods can be late during exam week.",
            highlight: "Cycle delay mechanism"
          },
          {
            title: "The Reset: Vagus Nerve Activation",
            iconName: "Heart",
            text: "Deep exhalations, laughter, hugs, and 8+ hours of sleep signal biological safety, restoring normal menstrual rhythms.",
            highlight: "Restores balance"
          }
        ],
        diagram: {
          type: "puberty-brain",
          title: "HPA Axis & Nervous System Stress Response",
          caption: "Explore how stress triggers the cortisol pathway and how evidence-based grounding techniques restore balance."
        },
        roleplayScenario: {
          id: "mind-1-sim-1",
          title: "Cortisol GnRH Suppression vs. Stress Dismissal",
          phaseName: "1. Investigating Hypothalamic Amenorrhea & Bone Protection",
          setting: "Doctor's office after missing two periods during a high-stress academic semester",
          character: "Dr. Kelly",
          characterRole: "Primary Care Physician",
          patientName: "Elena",
          patientRole: "Adolescent Peer Educator",
          statement: "“Your lab work looks normal, so you're probably just stressed out. Try not to worry so much and your period will probably return eventually.”",
          options: [
            {
              text: "“Okay, thanks. I guess I'll just wait and see.”",
              isBest: false,
              feedback: "Simply waiting without evaluating the underlying stress, nutritional adequacy, or bone health risks can allow functional hypothalamic suppression to persist unaddressed.",
              xpBonus: 5
            },
            {
              text: "“You're wrong, stress has nothing to do with my body.”",
              isBest: false,
              feedback: "Stress actually has a profound physiological effect on hypothalamic hormones. Collaborative dialogue with your provider gets you the best comprehensive care.",
              xpBonus: 5
            },
            {
              text: "“Thank you, doctor. Given that chronic cortisol can suppress hypothalamic GnRH pulsatility, what specific timeline should we monitor before evaluating for Functional Hypothalamic Amenorrhea? Can we also check my vitamin D, ferritin, and discuss stress reduction strategies to protect my bone density?”",
              isBest: true,
              feedback: "Brilliant clinical self-advocacy! Asking for a structured monitoring timeline and discussing bone density protection signals that you understand the serious physiology of hypothalamic cycle suppression.",
              xpBonus: 30
            }
          ]
        },
        advocacyScript: {
          situation: "Advocating for yourself when chronic stress or anxiety is disrupting your menstrual cycle and daily functioning.",
          doctorScript: "“I've noticed that intense stress and sleep disruption have caused my cycle to become irregular (delayed by over 40 days). I understand that cortisol suppresses GnRH, but I want to ensure we rule out thyroid issues, PCOS, and protect my bone health while I work on stress management.”",
          whyItWorks: "Demonstrates an understanding that while stress is a common culprit, amenorrhea requires thorough differential diagnosis to protect long-term endocrine and bone health.",
          whatIfDismissed: "“If my period has not returned in another cycle, what specific diagnostic steps or referrals can we schedule to ensure my hormonal axis is protected?”"
        },
        quiz: [
          {
            question: "How does chronic psychological or physical stress delay or stop menstrual periods?",
            options: [
              "Stress makes the ovaries disappear temporarily",
              "Cortisol and CRH directly suppress the brain's pulsatile release of GnRH from the hypothalamus",
              "Cortisol makes blood disappear from the body",
              "Stress has no biological impact on hormones whatsoever"
            ],
            correctIndex: 1,
            explanation: "Elevated cortisol signals the hypothalamus that energy must be conserved for survival, temporarily pausing the hormonal cascade required for ovulation."
          },
          {
            question: "Which simple physiological technique quickly stimulates the vagus nerve to reduce acute stress?",
            options: [
              "Holding your breath until you feel dizzy",
              "Drinking 4 caffeinated energy drinks",
              "The physiological sigh: two quick inhales through the nose followed by an extended, slow exhale through the mouth",
              "Skipping meals to shock the nervous system"
            ],
            correctIndex: 2,
            explanation: "The physiological sigh rapidly expands collapsed alveoli in the lungs and activates the parasympathetic vagus nerve, slowing heart rate within seconds."
          }
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
      },
      {
        id: "mind-5",
        name: "Advocate: Speaking Up for Mental Wellness",
        type: "lesson",
        isAdvocateCapstone: true,
        desc: "Learn the hormone-mood connection, recognize PMDD and burnout, and advocate for mental health care without stigma.",
        xp: 50,
        readTime: "4 min read",
        summary: "Hormonal shifts and mental health are profoundly linked. Severe premenstrual depression, chronic anxiety, or emotional burnout are real physiological responses in the brain, not personal weakness or 'being dramatic.'",
        keyTakeaways: [
          "Learn: Premenstrual Dysphoric Disorder (PMDD) is a severe neurobiological reaction to natural progesterone and allopregnanolone shifts in the luteal phase.",
          "Recognize: Warning signs include severe mood plunges, rage, panic attacks, or feelings of hopelessness that vanish within 24-48 hours of your period starting.",
          "Advocate: Track your symptoms across 2 consecutive cycles using a daily calendar to demonstrate the strict cyclical timing to a clinician or therapist.",
          "If a doctor dismisses your feelings as 'teen moodiness,' advocate: 'My symptoms strictly follow the luteal phase and interfere with my functioning. I want to be evaluated for PMDD.'"
        ],
        visualCards: [
          {
            title: "1. LEARN",
            iconName: "Sparkles",
            text: "PMDD is an official DSM-5 medical condition involving brain receptor sensitivity to hormone shifts, not an emotional flaw.",
            highlight: "Biological, not dramatic"
          },
          {
            title: "2. RECOGNIZE",
            iconName: "AlertTriangle",
            text: "Spotting the 'Jekyll and Hyde' cycle: feeling vibrant during the follicular phase, followed by sudden, overwhelming despair during the luteal phase.",
            highlight: "Cyclical despair"
          },
          {
            title: "3. ADVOCATE",
            iconName: "Shield",
            text: "Bringing a daily 2-month mood log provides indisputable proof of cyclical timing, securing access to targeted SSRIs or hormonal stabilization.",
            highlight: "Bring written logs"
          }
        ],
        advocacyScript: {
          situation: "Doctor or parent dismisses severe premenstrual depression with: 'You're just an emotional teenager, everyone gets moody.'",
          doctorScript: "“I have tracked my symptoms for two full cycles. For exactly 7 days before my period, I experience disabling mood drops and severe anxiety that disappear as soon as bleeding begins. This cyclical pattern indicates PMDD, and I want an evaluation for targeted treatment.”",
          whyItWorks: "Presenting a two-cycle prospective tracking log directly fulfills the American Psychiatric Association diagnostic criteria for PMDD.",
          whatIfDismissed: "“If you are unfamiliar with adolescent PMDD management, please refer me to a reproductive psychiatrist or an adolescent medicine specialist who treats endocrine-mood disorders.”"
        }
      }
    ]
  },
  play: {
    id: "play",
    title: "Play Strong · Female Athlete Health",
    badge: "Play Strong Athlete",
    badgeDesc: "Earned by mastering sports nutrition, hydration, sleep cycles, iron replenishment, and cycle-synced training.",
    description: "Reproductive health for active bodies — hydration, sleep cycles, iron levels, recovery, and cycle-synced training.",
    colorSwatch: "#175B5C",
    topics: [
      {
        id: "play-0",
        name: "Nutrition & Female Athlete Fueling (RED-S)",
        type: "lesson",
        desc: "Energy availability, carb timing, and protecting bone & hormone health in sport.",
        xp: 50,
        readTime: "5 min read",
        summary: "To run, compete, and feel strong, your body needs enough food energy every single day. When you don't eat enough to cover both your workouts and basic bodily functions, your hormones, bones, and recovery take a hit. Carbs give your muscles explosive power, and healthy fats help build your natural estrogen and progesterone.",
        clinicalQuote: {
          quote: "The IOC defines Relative Energy Deficiency in Sport (REDs) as a syndrome of impaired physiological and/or psychological functioning experienced by female and male athletes that is caused by exposure to problematic (prolonged and/or severe) low energy availability (LEA).",
          source: "International Olympic Committee (IOC)",
          publication: "2023 International Olympic Committee’s (IOC) Consensus Statement on Relative Energy Deficiency in Sport (REDs), British Journal of Sports Medicine (57:1073–1097)",
          year: "2023",
        },
        keyTakeaways: [
          "Energy Availability = Eating enough food calories to power both your sport and your basic body needs.",
          "Carbs (oats, fruit, rice, potatoes) are your muscles' favorite fuel; cutting carbs causes heavy legs, brain fog, and poor recovery.",
          "Healthy fats (avocados, nuts, olive oil) give your body the building blocks to make estrogen and protect your periods.",
          "Eating too little triggers RED-S (Relative Energy Deficiency in Sport)—slowing your growth, stalling athletic gains, and weakening bones."
        ],
        visualCards: [
          {
            title: "Fueling Your Engine",
            iconName: "Zap",
            text: "Your body needs food energy just to pump your heart and breathe. Training burns extra energy on top of that—so athletes must eat more, not less!",
            highlight: "Fuel = Power"
          },
          {
            title: "RED-S Warning Signs",
            iconName: "AlertTriangle",
            text: "Losing your period, constant exhaustion, recurring shin splints, or catching frequent colds are your body's distress signals.",
            highlight: "Losing periods is NEVER normal"
          },
          {
            title: "Smart Fueling Timing",
            iconName: "Activity",
            text: "Have a carb snack 1–2 hours before training, and pair protein + carbs within 45 minutes after practice to rebuild muscles fast.",
            highlight: "Recover strong"
          }
        ],
        diagram: {
          type: "athlete-plate",
          title: "Interactive Athlete Plate & Female Nourishment Bowl Builder",
          caption: "Toggle between the Interactive Nourishment Bowl Builder and the 5-Stage Athlete Plate. Drag and drop nutrient-dense foods into your bowl to learn what each ingredient does for your female athletic body, hormones, and cycle!"
        },
        video: {
          title: "Female Athlete Triad & RED-S Explained",
          source: "Boston Children's Hospital Sports Medicine",
          duration: "4:32",
          youtubeId: "cK2_iJ0gZ2Y",
          medicalReviewer: "Grounded in Sports Medicine & Adolescent Gynecologic Protocols",
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
            options: ["Only for distance runners", "Yes, if you eat enough protein", "No, it is a primary clinical sign of low energy availability (RED-S)", "Yes, it proves you are training hard enough"],
            correctIndex: 2,
            explanation: "Menstrual dysfunction is never a normal badge of fitness. It is the body conserving energy because caloric intake is insufficient."
          },
          {
            question: "What is the primary driver of RED-S (Relative Energy Deficiency in Sport)?",
            options: ["Mismatch between dietary caloric intake and athletic energy expenditure", "Drinking too much water", "Too much strength training", "Genetic factors alone"],
            correctIndex: 0,
            explanation: "RED-S occurs when dietary energy intake is insufficient to support both training demands and foundational physiological functioning."
          },
          {
            question: "Why are teenage and young adult years especially crucial for bone health in female athletes?",
            options: ["Bones stop growing completely at age 10", "Bones do not use calcium until age 30", "Exercise weakens bones permanently", "Over 90% of peak lifetime bone mineral density is laid down during this window"],
            correctIndex: 3,
            explanation: "Peak bone mass is established in your teens and early 20s; low estrogen and under-fueling during this time can cause irreversible bone loss."
          }
        ],
        roleplayScenario: {
          id: "play-0-sim-1",
          title: "Pre-Race Fueling & The 'Light Is Fast' Fallacy",
          phaseName: "1. Nutrition & Energy Availability",
          setting: "Team Bus En Route to State Championship Invitational",
          character: "Coach Henderson",
          characterRole: "Varsity Distance Running Coach",
          patientName: "Maya",
          statement: "“Maya, if you want to drop your 1600m time today, skip lunch before the meet so you race light. Heavy fueling just weighs runners down and slows your turnover.”",
          evidence: {
            badge: "RED-S Energy Balance",
            title: "IOC Consensus on Energy Availability & Carbohydrate Oxidation",
            metric: "Pre-Race Glycogen Target: 1–2g CHO/kg · Energy Availability >45 kcal/kg FFM",
            description: "Evidence proving that fasting before athletic exertion forces the body to catabolize skeletal muscle tissue and tanks endurance output.",
          },
          sourceCitation: {
            organization: "International Olympic Committee (IOC)",
            guideline: "2023 IOC Consensus Statement on Relative Energy Deficiency in Sport (REDs)",
            year: "2023",
            url: "https://bjsm.bmj.com/content/57/17/1073",
          },
          options: [
            {
              text: "“Coach Henderson, IOC sports nutrition guidelines demonstrate that running in a fasted state forces the body to catabolize skeletal muscle and drops glycogen replenishment by over 40%. Eating easily digestible complex carbs and protein 2 to 3 hours pre-race fuels my nervous system and protects my stride power without causing fullness.”",
              isBest: true,
              feedback: "✦ Master Sports Nutrition Advocacy! You refuted the harmful 'lighter is faster' myth with IOC scientific consensus, explaining that glycogen is the premier fuel for athletic power.",
              xpBonus: 30,
            },
            {
              text: "“Okay Coach, I'll toss my lunch and just drink water so I can run as light as possible.”",
              isBest: false,
              feedback: "Dangerous misconception! Fasting before endurance competition triggers severe mid-race fatigue, dizziness, and sets up long-term energy deficit (RED-S).",
              xpBonus: 5,
            },
            {
              text: "“You're trying to give us all eating disorders! I'm eating whatever I want!”",
              isBest: false,
              feedback: "While your concern about restrictive coaching culture is valid, citing the IOC energy availability data gives your coach zero room to argue.",
              xpBonus: 10,
            },
          ],
        }
      },
      {
        id: "play-1",
        name: "Fuel Up: Athlete Nutrition Arcade",
        type: "game",
        desc: "Picture matching, 3:1 recovery blender, and game-day timing arcade. High visuals, drawings, zero text walls.",
        xp: 75,
        summary: "Visual sports nutrition arcade: play picture matching, build your 3:1 recovery shake in the interactive blender, and sort athletic fuels with zero walls of text.",
        keyTakeaways: [
          "Consuming carbohydrates and protein within 30 to 60 minutes post-training speeds glycogen replenishment and tissue repair.",
          "Menstruating athletes lose iron each cycle; iron-rich foods or verified supplementation prevent sports anemia and fatigue."
        ],
        gameType: "match",
        quiz: [
          {
            question: "Why do female athletes need sufficient dietary fats?",
            options: [
              "Fats provide the essential building blocks for estrogen and progesterone hormones",
              "Fats are strictly for storing excess weight",
              "Athletes should eliminate all dietary fats",
              "Fats only matter for male athletes"
            ],
            correctIndex: 0,
            explanation: "Steroid hormones like estrogen and progesterone are synthesized from lipids and cholesterol. Severe fat restriction disrupts the endocrine axis and cycle regularity."
          }
        ],
        roleplayScenario: {
          id: "play-1-sim-1",
          title: "The 45-Minute Post-Workout Recovery Window",
          phaseName: "1. Post-Exercise Glycogen & Protein Window",
          setting: "Fieldhouse Weight Room & Training Hall",
          character: "Coach Miller",
          characterRole: "Assistant Track & Field Coach",
          patientName: "Vivian",
          statement: "“Vivian, put away that recovery smoothie and turkey wrap right now. Eating immediately after lifting just diverts blood away from your muscles to your stomach. Just drink plain water and wait until dinner in four hours.”",
          evidence: {
            badge: "ISSN Recovery Window",
            title: "ISSN Position Stand on Nutrient Timing & Muscle Glycogen Synthesis",
            metric: "Glycogen Resynthesis Window: 30–45 Min · 3:1 Carbohydrate-to-Protein Ratio",
            description: "Clinical evidence proving muscle insulin sensitivity and glycogen synthase enzymes peak in the first 45 minutes post-exercise.",
          },
          sourceCitation: {
            organization: "International Society of Sports Nutrition (ISSN)",
            guideline: "ISSN Position Stand: Nutrient Timing for Athletic Performance & Tissue Repair",
            year: "2023",
            url: "https://jissn.biomedcentral.com",
          },
          options: [
            {
              text: "“Coach Miller, according to the International Society of Sports Nutrition, muscle glycogen synthase activity is at its highest in the 30 to 45 minutes immediately following training. Having a 3:1 ratio of carbohydrates to protein right now speeds muscle repair and replenishes fuel reserves, whereas delaying intake by four hours cuts glycogen restoration in half.”",
              isBest: true,
              feedback: "✦ Elite Nutritional Authority! You referenced ISSN position stand data to explain glycogen synthase kinetics, protecting your athletic recovery.",
              xpBonus: 30,
            },
            {
              text: "“Sorry Coach, I'll put my food back in my locker and wait until late tonight to eat.”",
              isBest: false,
              feedback: "Delaying recovery fueling leaves your muscles in a catabolic breakdown state, increases muscle soreness, and delays tissue healing.",
              xpBonus: 5,
            },
            {
              text: "“You don't know the first thing about nutrition, I'm eating this right now!”",
              isBest: false,
              feedback: "Citing the ISSN position stand provides scientific justification that coaches respect, avoiding unnecessary conflict.",
              xpBonus: 10,
            },
          ],
        }
      },
      {
        id: "play-2",
        name: "Overworking & Overtraining Signs",
        type: "lesson",
        desc: "Recognizing fatigue, missing periods, and the Female Athlete Triad.",
        xp: 50,
        readTime: "4 min read",
        summary: "Pushing through severe exhaustion without enough rest harms your body. One of the clearest warning signs is losing your period. Missing your period is never a badge of honor or proof of hard work — it's your body sounding an alarm to save emergency energy, which weakens your bones and slows recovery.",
        keyTakeaways: [
          "The Female Athlete Triad connects three things: not eating enough fuel, missing periods (amenorrhea), and weak, brittle bones.",
          "Missing 3 periods in a row is an urgent sign to see a doctor — it puts you at risk for early, permanent bone thinning.",
          "Warning signs of overworking: feeling constantly wiped out, heavy legs, sudden mood drops, and frequent colds.",
          "Your muscles and bones rebuild during rest and sleep, not while you're grinding through workouts."
        ],
        visualCards: [
          {
            title: "Low Fuel Crisis",
            iconName: "Zap",
            text: "When workouts burn more calories than you eat, your brain enters survival mode and pauses non-essential systems like your menstrual cycle.",
            highlight: "Energy Shortage"
          },
          {
            title: "Missing Periods (Amenorrhea)",
            iconName: "AlertTriangle",
            text: "Skipping periods is never normal for an athlete. It means your body lacks the estrogen it needs to keep your skeleton strong.",
            highlight: "Emergency Alarm"
          },
          {
            title: "Fragile Bones & Fractures",
            iconName: "Shield",
            text: "Over 90% of your adult bone strength is built during your teens and early 20s. Under-fueling leads to painful shin splints and stress fractures.",
            highlight: "Protect Peak Bone Mass"
          }
        ],
        diagram: {
          type: "reds-triangle",
          title: "Full-Body Overtraining & Under-Recovery Inspection",
          caption: "Use the interactive magnifying glass on the anatomical figure to explore how overtraining without adequate recovery damages the female body across neuroendocrine, metabolic, hormonal, and skeletal systems."
        },
        roleplayScenarios: [
          {
            id: "play-2-sim-1",
            title: "The 'Not Wanting It Enough' Coaching Confrontation",
            phaseName: "1. Refuting Accusations of Lack of Effort",
            setting: "Varsity Track Bleachers After Sluggish 5K Time Trial",
            character: "Coach Vance",
            characterRole: "Head Cross-Country & Track Coach",
            patientName: "Sierra",
            statement: "“You fell forty seconds behind your tempo pace today, and your splits have been dropping all week. In championship athletics, winners find an extra gear when they're tired. Right now, it looks to me like you're getting complacent and just don't want it enough. If you're not willing to grind through the fatigue, I'm moving you down to junior varsity.”",
            evidence: {
              badge: "Overtraining Biomarkers",
              title: "Autonomic Nervous System & Low Energy Availability Evaluation",
              metric: "Morning RHR: +11 bpm · 60-Day Amenorrhea · Blunted HRV · Severe Glycogen Depletion",
              description: "Documents clinical markers of sympathetic/parasympathetic overtraining syndrome, proving that performance decline is neuroendocrine exhaustion rather than a lack of effort or desire.",
            },
            sourceCitation: {
              organization: "International Olympic Committee (IOC) & American College of Sports Medicine (ACSM)",
              guideline: "Joint Consensus Statement on Overtraining Syndrome & IOC Consensus on Relative Energy Deficiency in Sport (REDs)",
              year: "2023",
              url: "https://bjsm.bmj.com/content/57/17/1073",
            },
            options: [
              {
                text: "“Coach Vance, my commitment to this team hasn't wavered, but my body is showing clinical symptoms of overtraining syndrome. My morning resting heart rate is spiked eleven beats above baseline, I've missed two consecutive periods, and my legs are catabolic from empty glycogen stores. Under IOC and ACSM sports medicine guidelines, forcing an athlete to 'grind through' autonomic exhaustion causes cortical stress fractures and permanent endocrine shutdown, not fitness gains. I need a structured deload protocol with our athletic trainer so my nervous system can recover and I can hit race-winning splits again.”",
                isBest: true,
                feedback: "✦ Master Athletic Self-Advocacy! You respectfully dismantled the 'not wanting it enough' accusation by presenting objective clinical data (resting HR spike, amenorrhea, glycogen depletion). Citing IOC/ACSM consensus reframes recovery as a physiological necessity to win, commanding immediate coaching respect.",
                xpBonus: 30,
              },
              {
                text: "“I'm so sorry, Coach. I promise I want this more than anything. I'll run extra sprint intervals on my own tonight and cut out dinner carbs so I can get lighter and prove my dedication to you.”",
                isBest: false,
                feedback: "Dangerous mistake! Internalizing accusations of laziness when you are already physiologically overtrained accelerates bone demineralization, risks complete bone fracture, and causes severe metabolic burnout.",
                xpBonus: 5,
              },
              {
                text: "“That is completely unfair! I'm working harder than anyone else on this team and you never see it! You're just biased against me!”",
                isBest: false,
                feedback: "While venting frustration is understandable, an emotional reaction gives the coach an excuse to label you as 'difficult'. Backing your stand with physiological markers (elevated resting HR, missed periods, ACSM guidelines) provides undeniable proof.",
                xpBonus: 10,
              },
            ],
          },
          {
            id: "play-2-sim-2",
            title: "Sports Medicine Clinical Evaluation & Lab Workup",
            phaseName: "2. Objective Endocrine & Metabolic Testing",
            setting: "High School Sports Medicine Clinic with Athletic Trainer & Team Doctor",
            character: "Dr. Lin",
            characterRole: "Team Sports Medicine Physician",
            patientName: "Sierra",
            statement: "“Teenage distance runners are expected to feel worn down by mid-season. Unless you have an acute ligament tear or an ankle sprain, feeling exhausted doesn't justify pulling you from the racing schedule or running extensive blood tests.”",
            evidence: {
              badge: "Clinical Endocrine Panel",
              title: "Endocrine Society & IOC RED-S Clinical Assessment Protocol",
              metric: "Suppressed Free T3 (<2.4 pg/mL) · Elevated Waking Salivary Cortisol · Serum Ferritin <25 ng/mL",
              description: "Diagnostic criteria showing that unresolved athletic performance drop with secondary amenorrhea requires comprehensive endocrine and metabolic staging.",
            },
            sourceCitation: {
              organization: "The Endocrine Society & IOC Medical Commission",
              guideline: "Endocrine Society Guidelines on Functional Hypothalamic Amenorrhea & IOC RED-S Clinical Assessment Tool 2 (CAT2)",
              year: "2023",
              url: "https://www.endocrine.org",
            },
            options: [
              {
                text: "“Dr. Lin, under IOC CAT2 guidelines and the Endocrine Society, an athlete experiencing unresolved performance degradation alongside two missed menstrual cycles requires an objective diagnostic workup. Can we check my morning fasted Free T3, cortisol, serum ferritin, and Vitamin D? Testing these will confirm whether my thyroid is downregulated in energy conservation and rule out early bone demineralization before a stress fracture occurs.”",
                isBest: true,
                feedback: "✦ Clinical Diagnostic Mastery! You cited the IOC CAT2 diagnostic guidelines and requested specific, evidence-backed lab markers (Free T3, ferritin, cortisol) that identify metabolic shutdown before catastrophic injury occurs.",
                xpBonus: 30,
              },
              {
                text: "“Okay, if you don't think tests are necessary, I'll just tape my shins and drink an energy drink before races.”",
                isBest: false,
                feedback: "Ignoring secondary amenorrhea and systemic fatigue allows bone mineral density to degrade. Adolescent female athletes must have endocrine imbalances evaluated.",
                xpBonus: 5,
              },
              {
                text: "“You doctors never take female athletes seriously! Why do I even come here?”",
                isBest: false,
                feedback: "Channeling frustration into requesting the specific IOC RED-S panel gives the physician clear clinical criteria to order the lab tests immediately.",
                xpBonus: 10,
              },
            ],
          },
          {
            id: "play-2-sim-3",
            title: "Protected Roster Standing & Structured Deload Agreement",
            phaseName: "3. Return-to-Play Rights & Athletic Safety",
            setting: "Athletic Director's Office Joint Conference",
            character: "Coach Vance",
            characterRole: "Head Cross-Country & Track Coach",
            patientName: "Sierra",
            statement: "“The doctor confirmed overtraining syndrome and ordered a mandatory two-week deload with modified cross-training. But if you aren't doing the daily team workouts, I have to strip your varsity captaincy and give your championship racing spot away.”",
            evidence: {
              badge: "Athlete Safety Rights",
              title: "NFHS & State Interscholastic Medical Clearance & Retaliation Protection",
              metric: "Physician-Supervised Deload Protocol · Protected Varsity Eligibility",
              description: "National high school athletic association regulations protecting student-athletes from punitive roster demotions or leadership stripping when following physician-mandated medical recovery.",
            },
            sourceCitation: {
              organization: "National Federation of State High School Associations (NFHS) & AAP",
              guideline: "NFHS Sports Medicine Advisory Committee: Medical Clearance, Return to Play, and Student Welfare",
              year: "2023",
              url: "https://www.nfhs.org",
            },
            options: [
              {
                text: "“Coach Vance, under NFHS and state athletic association regulations, complying with physician-prescribed sports medicine clearance is a protected health protocol. Retaliatory demotions or stripping leadership for following a medical deload violates student-athlete safety policies. A two-week modified cross-training plan restores my autonomic nervous system so I can score points at championships, whereas running through overtraining guarantees a season-ending tibial fracture. Let's sign this 14-day graduated recovery plan with our athletic director and athletic trainer.”",
                isBest: true,
                feedback: "✦ Champion Leadership & Self-Advocacy! You asserted institutional athletic safety rules with calm poise, protected your varsity standing, and offered a collaborative sports medicine pathway to peak at championships.",
                xpBonus: 30,
              },
              {
                text: "“Please don't take my captaincy! I'll tell the doctor I'm feeling better and run the full mileage anyway.”",
                isBest: false,
                feedback: "Giving up medical recovery to preserve a title leads to severe stress fractures, prolonged hypothalamic amenorrhea, and potential permanent bone loss.",
                xpBonus: 5,
              },
              {
                text: "“You're violating my rights! I'm calling the superintendent and going to the school board meeting!”",
                isBest: false,
                feedback: "Invoking NFHS policy directly in the room with the athletic director present resolves the situation immediately and keeps your coach accountable.",
                xpBonus: 10,
              },
            ],
          },
        ],
        advocacyScript: {
          situation: "A coach or trainer accuses an exhausted, under-recovered athlete of being complacent, lazy, or 'not wanting it enough' when she is struggling with overtraining syndrome.",
          doctorScript: "“Coach, clinical guidelines from the IOC and ACSM define overtraining as neuroendocrine and autonomic exhaustion, characterized by elevated resting heart rate, sleep fragmentation, and secondary amenorrhea. My drop in split times is a biological alarm, not a lack of commitment. I am following a sports-medicine supervised deload protocol to restore glycogen and hormonal balance so I can safely perform at my peak.”",
          whyItWorks: "Replaces subjective character accusations ('lazy', 'not wanting it enough') with objective physiological biomarkers and IOC sports medicine authority.",
          whatIfDismissed: "“I will review my morning resting heart rate and amenorrhea symptoms with our head athletic trainer and school physician to establish my medical clearance limits.”",
        }
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
        gameType: "sort",
        roleplayScenario: {
          id: "play-3-sim-1",
          title: "Soreness vs. Bone Microtrauma: Refusing to Mask Focal Pain",
          phaseName: "1. Distinguishing Adaptation from Skeletal Microfracture",
          setting: "Track Infield Following High-Intensity Interval Repeats",
          character: "Teammate Brooke",
          characterRole: "Senior Team Captain",
          patientName: "Autumn",
          statement: "“Autumn, your shin is just sore because you're babying it! Pain is just weakness leaving the body. If you sit out the final three 400m intervals, you're letting down the 4x400 relay. Take three ibuprofen and tough it out!”",
          evidence: {
            badge: "ACSM Bone Stress Protocol",
            title: "ACSM Clinical Differentiation: Muscular Fatigue vs. Cortical Bone Stress",
            metric: "Localized Point Tenderness · Hopping Test Positive · NSAID Masking Warning",
            description: "Sports medicine diagnostic guidance warning that masking localized tibial bone tenderness with NSAIDs converts a stress reaction into a full cortical fracture.",
          },
          sourceCitation: {
            organization: "American College of Sports Medicine (ACSM)",
            guideline: "ACSM Consensus on Prevention & Management of Bone Stress Injuries in Youth Runners",
            year: "2023",
            url: "https://www.sportsmedicine.org",
          },
          options: [
            {
              text: "“Brooke, I care deeply about our relay team, but this isn't normal muscular fatigue that you run through. This is localized pinpoint bone tenderness on my tibia that worsens with hopping, which ACSM guidelines identify as a high-risk bone stress reaction. Taking NSAIDs to numb bone microtrauma can crack the cortex into a complete fracture and end my entire season. I'm cross-training on the stationary bike today and having our athletic trainer evaluate it.”",
              isBest: true,
              feedback: "✦ Master Peer Leadership & Self-Advocacy! You distinguished between productive muscular soreness and high-risk focal bone microtrauma, resisted dangerous peer pressure to mask pain, and protected your season.",
              xpBonus: 30,
            },
            {
              text: "“I guess I don't want to look weak in front of everyone. Give me the pills and I'll run the repeats.”",
              isBest: false,
              feedback: "Catastrophic risk! Masking focal bone pain with pain relievers removes your body's protective pain barrier, allowing repetitive pounding to fracture the tibia completely.",
              xpBonus: 5,
            },
            {
              text: "“You're a selfish captain! Stop telling me what to do with my legs!”",
              isBest: false,
              feedback: "While standing up for yourself is essential, clearly explaining the clinical difference between muscle soreness and bone stress reactions sets a healthy safety standard for the entire squad.",
              xpBonus: 10,
            },
          ],
        }
      },
      {
        id: "play-4",
        name: "Water Intake & Electrolyte Balance (Hydration Across Cycles)",
        type: "lesson",
        desc: "Fluid shifts across cycle phases, preventing cramps, and tracking athletic water intake.",
        xp: 50,
        readTime: "5 min read",
        summary: "Water is your body's primary performance nutrient. During the luteal phase, rising progesterone and estrogen cause fluid to shift out of your blood vessels into surrounding tissues (causing bloating while leaving blood volume lower). This leads to sluggish blood flow, elevated core temperature, and early fatigue. Adding electrolytes (sodium, potassium, magnesium) and drinking 80–96 oz helps hold water inside your bloodstream to power workouts and ease cramps.",
        clinicalQuote: {
          quote: "Fluctuations in ovarian steroids across the menstrual cycle alter fluid regulatory mechanisms, body water distribution, and thermoregulation. During the high-hormone luteal phase, reduced intravascular volume necessitates targeted electrolyte and fluid replacement to sustain cardiovascular stroke volume during physical exertion.",
          source: "American College of Sports Medicine (ACSM) & IOC",
          publication: "Consensus Guidelines on Exercise and Fluid Replacement in Female Athletes",
          year: "2023"
        },
        keyTakeaways: [
          "Follicular Phase: Baseline hydration of 64–80 oz maintains blood volume; water is efficiently retained.",
          "Luteal Phase Shift: Progesterone causes fluid retention in soft tissues (bloating) while intravascular plasma volume drops, raising heart rate and core temperature.",
          "Electrolytes Matter: Adding a pinch of salt/sodium or an electrolyte drink pulls fluid back into blood vessels to maintain cardiac output and reduce dizziness.",
          "Cramp Defense: Dehydration concentrates inflammatory prostaglandins in uterine muscle; consistent water intake eases menstrual cramping."
        ],
        visualCards: [
          {
            title: "Intravascular vs. Extracellular Fluid",
            iconName: "Droplets",
            text: "Bloating doesn't mean you're over-hydrated! It means water has leaked into tissues while your bloodstream is actually thirsty.",
            highlight: "Plasma volume priority"
          },
          {
            title: "Electrolyte Co-Transport",
            iconName: "Zap",
            text: "Water requires sodium and glucose transporters to be absorbed rapidly across the gut wall into the bloodstream.",
            highlight: "Sodium absorbs water"
          },
          {
            title: "Urine Color Rule",
            iconName: "Activity",
            text: "Aim for pale straw or lemonade color. Dark amber means your kidneys are struggling to conserve water, stressing your heart.",
            highlight: "Pale straw = optimal"
          }
        ],
        diagram: {
          type: "water-glass",
          title: "Interactive Athletic Water Glass & Fluid Tracker",
          caption: "Click '+ Add Glass' or preset buttons to fill the interactive water glass, and toggle cycle phases to see how hormonal fluid shifts affect your hydration needs."
        },
        roleplayScenario: {
          id: "play-4-sim-1",
          title: "Intravascular Hydration vs. Restrictive Practice Policies",
          phaseName: "1. Protecting Fluid & Electrolyte Access",
          setting: "High School Soccer Team Sideline During Hot Pre-Season Practice",
          character: "Coach Miller",
          characterRole: "Head Varsity Soccer Coach",
          patientName: "Vivian",
          patientRole: "Varsity Midfielder & STEM Scholar",
          statement: "“Water breaks are slowing down our scrimmage! Just tough it out until the end of practice, and don't drink anything with salt or calories or you'll bloat!”",
          evidence: {
            badge: "ACSM Hydration Standards",
            title: "ACSM Intravascular Fluid & Thermoregulatory Guidelines",
            metric: "Luteal Plasma Volume Drop: -8% · Ambient Heat Index: 88°F · Mandatory 15-Min Breaks",
            description: "Clinical sports medicine standards requiring mandatory sodium and fluid replacement intervals for female athletes during high-temperature training.",
          },
          sourceCitation: {
            organization: "American College of Sports Medicine (ACSM)",
            guideline: "ACSM Consensus Statement: Exercise and Fluid Replacement in Female Athletes",
            year: "2023",
            url: "https://www.sportsmedicine.org",
          },
          options: [
            {
              text: "“Coach Miller, in this heat and especially during the high-hormone luteal phase, our blood plasma volume drops quickly. Sports medicine guidelines from ACSM require regular fluid and sodium breaks every 15 to 20 minutes to prevent heat illness, cramping, and cardiac strain.”",
              isBest: true,
              feedback: "✦ Elite Self-Advocate! You cited ACSM sports medicine guidelines, explained luteal plasma volume shifts, and protected the entire team's safety.",
              xpBonus: 30,
            },
            {
              text: "“Okay Coach, I'll wait until after practice to drink.”",
              isBest: false,
              feedback: "Dangerous! Withholding fluids spikes core temperature, raises heart rate, and drastically increases the risk of heat illness and muscle cramps.",
              xpBonus: 5,
            },
            {
              text: "“You're going to kill us! I'm calling the school board right now!”",
              isBest: false,
              feedback: "While frustration is valid, using clinical terminology (plasma volume, ACSM guidelines) establishes immediate professional authority.",
              xpBonus: 10,
            },
          ],
        },
        advocacyScript: {
          situation: "A coach or trainer restricts water breaks or discourages electrolyte drinks during hot or long training sessions.",
          doctorScript: "“Sports medicine guidelines from the ACSM demonstrate that female athletes in their luteal phase experience higher core temperatures and reduced plasma volume. Timely hydration with electrolytes is a safety requirement that prevents muscle cramping, heat exhaustion, and performance drops.”",
          whyItWorks: "Frames hydration as an evidence-based athletic safety protocol established by national sports medicine authorities.",
          whatIfDismissed: "“I will step to the sideline to hydrate according to athletic safety guidelines and inform our athletic trainer.”"
        }
      },
      {
        id: "play-5",
        name: "Sleep Cycles & Deep Recovery: Muscle Repair & Hormones",
        type: "lesson",
        desc: "Sleep architecture, Slow-Wave growth hormone release, luteal temperature shifts, and injury prevention.",
        xp: 50,
        readTime: "5 min read",
        summary: "You don't get faster or stronger during practice — you get stronger while you sleep. During Stage 3 Slow-Wave (Deep) Sleep, your pituitary gland releases up to 95% of your daily Human Growth Hormone (HGH) to rebuild muscle fibers, restore glycogen, and mineralize bones. However, after ovulation, progesterone raises your body temperature by ~0.5°C, which can fragment sleep. Strategic cooling and 8–9 hours of sleep protect you from a 1.7x higher injury risk.",
        clinicalQuote: {
          quote: "Slow-wave sleep serves as the primary neuroendocrine window for somatotropic axis activity, accounting for up to 95% of daily human growth hormone secretion. Adolescents who sleep fewer than 8 hours per night experience a 1.7-fold increase in athletic musculoskeletal injuries.",
          source: "American Academy of Pediatrics (AAP) & Sleep Research Society",
          publication: "Pediatric Sports Medicine Clinical Report on Sleep Architecture and Athletic Injury",
          year: "2023"
        },
        keyTakeaways: [
          "Stage 3 Slow-Wave Sleep is the muscle repair factory where 95% of daily Human Growth Hormone (HGH) is pulsed.",
          "REM Sleep consolidates motor memory — locking in technique, footwork, and tactical plays from practice into permanent neural pathways.",
          "Sleep Under 8 Hours: Associated with 1.7x higher athletic injury rates and 30% slower glycogen replenishment.",
          "Progesterone Temperature Shift: Higher luteal core temperature causes light, restless sleep; cooling your room to 65–68°F restores deep sleep cycles."
        ],
        visualCards: [
          {
            title: "The 90-Minute Cycle",
            iconName: "Clock",
            text: "Every night consists of 4 to 6 repeating 90-minute sleep cycles. Cutting sleep by 2 hours eliminates the final, richest deep sleep and REM cycles.",
            highlight: "8-9 hours required"
          },
          {
            title: "HGH Growth Engine",
            iconName: "Zap",
            text: "Without Stage 3 Slow-Wave Sleep, muscle micro-tears from training cannot repair, leading to chronic soreness, shin splints, and fatigue.",
            highlight: "Sleep = Muscle repair"
          },
          {
            title: "Cool Room Science",
            iconName: "Moon",
            text: "To fall into deep sleep, your core temperature must drop by 1–2°F. In the luteal phase, use a fan, cooler sheets, and magnesium to drop body heat.",
            highlight: "65-68°F sweet spot"
          }
        ],
        diagram: {
          type: "sleep-recovery",
          title: "Interactive 90-Minute Sleep Cycle & Athletic Recovery Architecture",
          caption: "Explore the 4 stages of a 90-minute sleep cycle, toggle the luteal temperature shift, and adjust sleep duration to see real-time injury risk and glycogen recovery metrics."
        },
        roleplayScenario: {
          id: "play-5-sim-1",
          title: "Slow-Wave Sleep Architecture vs. 5:30 AM Two-a-Days",
          phaseName: "1. Protecting Somatotropic Recovery Windows",
          setting: "Athletic Department Locker Room at 6:00 AM",
          character: "Coach Davis",
          characterRole: "Head Strength & Conditioning Coach",
          patientName: "Jordan",
          patientRole: "Varsity Athlete & Student Council Rep",
          statement: "“We are adding mandatory 5:30 AM lifting sessions four days a week on top of evening practice. If you want to play varsity, you don't need eight hours of sleep!”",
          evidence: {
            badge: "AAP Sleep & Injury Data",
            title: "Pediatric Sports Medicine Sleep Architecture & Musculoskeletal Injury Risk",
            metric: "Sleep <8 Hrs: 1.7x Higher Injury Rate · 95% HGH Released During Stage 3 Deep Sleep",
            description: "Clinical evidence proving that truncating adolescent sleep restricts somatic tissue repair, impairs motor memory consolidation, and sharply elevates fracture rates.",
          },
          sourceCitation: {
            organization: "American Academy of Pediatrics (AAP) & Sleep Research Society",
            guideline: "AAP Clinical Report on Sleep Architecture and Athletic Injury in Adolescent Athletes",
            year: "2023",
            url: "https://publications.aap.org",
          },
          options: [
            {
              text: "“Coach Davis, pediatric sports medicine data from the AAP shows that sleeping under eight hours increases adolescent injury rates by 1.7 times and impairs muscle glycogen restoration. Early morning sessions that cut into our slow-wave recovery window will increase our fracture risk and hurt game performance.”",
              isBest: true,
              feedback: "✦ Master Clinical Advocacy! Citing AAP injury statistics and slow-wave recovery frames sleep as a non-negotiable performance asset.",
              xpBonus: 30,
            },
            {
              text: "“I'll just drink three energy drinks and push through it.”",
              isBest: false,
              feedback: "Dangerous approach! Energy drinks spike heart rate without repairing muscles, and chronic sleep restriction dramatically spikes injury risk.",
              xpBonus: 5,
            },
            {
              text: "“You're crazy! I'm sleeping in and skipping your session.”",
              isBest: false,
              feedback: "Communicating with AAP medical evidence protects the entire team while keeping the conversation constructive.",
              xpBonus: 10,
            },
          ],
        },
        advocacyScript: {
          situation: "A coach schedules early morning two-a-days that reduce team sleep below 7–8 hours per night.",
          doctorScript: "“Clinical studies published by the American Academy of Pediatrics demonstrate that adolescent athletes sleeping under 8 hours have a 1.7 times greater risk of musculoskeletal injury and slower reaction times. We request rescheduling morning lifts to preserve the 8-hour sleep window essential for tissue repair.”",
          whyItWorks: "Uses objective epidemiological injury statistics from the AAP rather than personal complaints about being tired.",
          whatIfDismissed: "“I will bring this AAP sports sleep consensus to our school athletic trainer and athletic director for guidance.”"
        }
      },
      {
        id: "play-6",
        name: "Iron Deficiency & Ferritin: Protecting Athletic Energy & Stamina",
        type: "lesson",
        desc: "Menstrual blood loss, serum ferritin vs hemoglobin, fighting fatigue, and boosting absorption.",
        xp: 50,
        readTime: "5 min read",
        summary: "If your legs feel like cement, your heart races on easy warmups, and you feel breathless despite being in good shape, your iron tank might be empty. Menstruating athletes lose iron every month with their period. Routine blood tests only check Hemoglobin (the delivery trucks in your blood), completely missing low Serum Ferritin (the iron storage vault in your bone marrow). Testing ferritin and pairing iron with Vitamin C restores your oxygen-carrying power.",
        clinicalQuote: {
          quote: "Iron deficiency without anemia (IDNA), defined by a serum ferritin below 30 to 50 ng/mL in the presence of normal hemoglobin, is prevalent in menstruating athletes and directly compromises aerobic capacity, energy metabolism, and cognitive clarity.",
          source: "International Olympic Committee (IOC) & ACOG",
          publication: "IOC Medical Consensus on Iron Management in Adolescent Female Athletes",
          year: "2023"
        },
        keyTakeaways: [
          "Hemoglobin vs. Ferritin: Hemoglobin is iron circulating in red blood cells; Ferritin is your deep storage vault. Ferritin can be empty while hemoglobin still looks 'normal'.",
          "Menstrual Loss: Menstruating athletes lose 15–40 mg of iron per cycle (and over 60 mg with heavy flow), making iron deficiency the #1 nutritional shortfall in female sports.",
          "Athletic Losses: Running foot-strike hemolysis (crushing red blood cells on hard surfaces) and post-workout hepcidin hormone spikes both reduce iron levels.",
          "Nutritional Synergy: Pair non-heme iron (lentils, beans, oats, spinach) with Vitamin C (oranges, peppers, strawberries) to boost absorption by 300%; avoid calcium, tea, or coffee for 2 hours."
        ],
        visualCards: [
          {
            title: "The 'Cement Legs' Signal",
            iconName: "AlertTriangle",
            text: "When ferritin drops below 30 ng/mL, your muscles cannot produce ATP energy efficiently. Normal jogging feels like running through mud.",
            highlight: "IDNA warning sign"
          },
          {
            title: "The Ferritin Blood Test",
            iconName: "Shield",
            text: "Never settle for just a CBC test! Always ask your doctor specifically for a 'Serum Ferritin and Iron Saturation Panel'.",
            highlight: "Ask for Ferritin"
          },
          {
            title: "Vitamin C Pairing",
            iconName: "Sparkles",
            text: "Non-heme plant iron is tightly bound. Vitamin C transforms it into soluble ferrous iron that your intestine absorbs effortlessly.",
            highlight: "+300% absorption"
          }
        ],
        diagram: {
          type: "iron-ferritin",
          title: "Interactive Iron & Ferritin Cascade: Storage Vault vs. Blood Flow",
          caption: "Explore the difference between circulating hemoglobin and ferritin reserves, calculate menstrual iron loss, and discover absorption boosters vs. blockers."
        },
        roleplayScenario: {
          id: "play-6-sim-1",
          title: "Serum Ferritin Storage vs. Hemoglobin Dismissal",
          phaseName: "1. Demanding an Iron Storage & Saturation Panel",
          setting: "Pediatric Clinic Exam Room",
          character: "Dr. Roberts",
          characterRole: "Primary Care Physician",
          patientName: "Maya",
          patientRole: "Varsity Track & Field Sprinter",
          statement: "“Your Complete Blood Count (CBC) is normal — your hemoglobin is 12.2, which is totally fine. You're just an active teenager with a busy schedule, so get more rest and stop worrying about your fatigue.”",
          evidence: {
            badge: "IOC Ferritin Protocol",
            title: "IOC Medical Consensus on Iron Deficiency Without Anemia (IDNA)",
            metric: "CBC Hemoglobin: 12.2 g/dL (Normal) · Ferritin Unchecked (<30 ng/mL Threshold)",
            description: "Diagnostic standard noting that menstruating female athletes frequently experience depleted bone marrow iron stores (ferritin) despite normal circulating hemoglobin.",
          },
          sourceCitation: {
            organization: "International Olympic Committee (IOC) & ACOG",
            guideline: "IOC Medical Consensus on Iron Management in Adolescent Female Athletes",
            year: "2023",
            url: "https://bjsm.bmj.com",
          },
          options: [
            {
              text: "“Dr. Roberts, my training performance has plummeted and my legs feel like lead. IOC and ACOG sports guidelines emphasize that athletes can suffer from Iron Deficiency Without Anemia (IDNA) where hemoglobin is normal but serum ferritin is depleted below 30 ng/mL. Could we please add a Serum Ferritin and Iron Saturation panel to my lab orders?”",
              isBest: true,
              feedback: "✦ Life-Changing Clinical Advocacy! Requesting a Serum Ferritin panel catches iron deficiency months before anemia develops, protecting your aerobic performance.",
              xpBonus: 30,
            },
            {
              text: "“Okay, I guess it's all in my head. I'll just push through the exhaustion.”",
              isBest: false,
              feedback: "Never accept unaddressed exhaustion! A normal CBC does NOT measure bone marrow ferritin stores. You may have severe tissue iron depletion.",
              xpBonus: 5,
            },
            {
              text: "“You don't know anything! Look at how pale I am!”",
              isBest: false,
              feedback: "Frustration is natural, but referencing IOC diagnostic guidelines for ferritin testing forces the clinician to order the correct diagnostic panel.",
              xpBonus: 10,
            },
          ],
        },
        advocacyScript: {
          situation: "A clinician dismisses severe athletic fatigue as 'normal stress' because standard CBC hemoglobin is within reference range.",
          doctorScript: "“IOC clinical consensus notes that female athletes frequently suffer from Iron Deficiency Without Anemia, which severely impairs aerobic capacity even when hemoglobin appears normal. Because I have heavy periods and heavy training demands, I request a Serum Ferritin, Total Iron Binding Capacity, and Transferrin Saturation test.”",
          whyItWorks: "Distinguishes between hemoglobin and ferritin using official IOC guidelines, requiring the physician to evaluate deep iron stores.",
          whatIfDismissed: "“If you decline to order a ferritin panel, please document your refusal in my medical record and note that I reported functional exercise intolerance.”"
        }
      },
      {
        id: "play-7",
        name: "Menstrual Cycles & Training: Periodization & Injury Prevention",
        type: "lesson",
        desc: "Hormonal periodization, training with your biology, and preventing ACL tears around ovulation.",
        xp: 50,
        readTime: "5 min read",
        summary: "Your menstrual cycle is a built-in athletic superpower when you understand its hormonal phases. In the follicular phase (low hormones), insulin sensitivity is high and recovery is rapid, making it ideal for progressive overload and personal records. Around ovulation, surging estrogen peaks muscle power but temporarily softens tendons and ligaments, requiring neuromuscular warm-ups to prevent ACL tears. In the luteal phase, steady endurance, electrolytes, and cooling keep you strong.",
        clinicalQuote: {
          quote: "Neuromuscular control and ligamentous laxity fluctuate across the menstrual cycle. Estrogen-mediated increases in ligament laxity around the ovulatory peak correlate with higher rates of anterior cruciate ligament (ACL) injury, underscoring the critical need for targeted neuromuscular training protocols.",
          source: "British Journal of Sports Medicine & ACOG",
          publication: "Consensus Statement on Menstrual Cycle Phases, Ligament Laxity, and Musculoskeletal Injury in Athletes",
          year: "2022"
        },
        keyTakeaways: [
          "Early Follicular (Days 1–7): Lowest hormone levels; high insulin sensitivity and carb utilization make this a prime window for building strength.",
          "Mid/Late Follicular (Days 8–13): Estrogen surge drives peak neuromuscular power, mood, and fast recovery — ideal for high-intensity intervals.",
          "Ovulation Window (Days 14–16): Peak strength, but estrogen softens collagen in ligaments! Neuromuscular landing drills are mandatory to protect knees and ACLs.",
          "Luteal Phase (Days 17–28): Higher core temperature (+0.5°C) and protein breakdown require steady endurance, extra protein (25–30g), and sodium electrolytes."
        ],
        visualCards: [
          {
            title: "Follicular Strength Window",
            iconName: "Zap",
            text: "Low hormones mimic the hormonal environment of rapid muscle adaptation. Lift heavy, push sprints, and tackle high-intensity workouts.",
            highlight: "Max strength gains"
          },
          {
            title: "Ovulatory ACL Caution",
            iconName: "ShieldAlert",
            text: "Relaxin and estrogen peaks loosen knee ligaments. Always do a 15-minute neuromuscular warm-up (jumping, landing on bent knees) before sports.",
            highlight: "Protect your knees"
          },
          {
            title: "Luteal Fueling Strategy",
            iconName: "Activity",
            text: "Metabolism rises by 100–300 kcal/day. Eat more complex carbs and protein to prevent muscle breakdown and mood crashes.",
            highlight: "Feed your recovery"
          }
        ],
        diagram: {
          type: "cycle-training",
          title: "Interactive Menstrual Cycle Training & Performance Matrix",
          caption: "Click through each phase of the cycle to explore optimal training adaptations, neuromuscular injury risks (ACL protection), and fueling priorities."
        },
        roleplayScenario: {
          id: "play-7-sim-1",
          title: "Hormonal Periodization & Injury Prevention vs. Linear Grinding",
          phaseName: "1. Periodizing Sprint Loads Across Cycle Phases",
          setting: "High School Track Coach's Office",
          character: "Coach Bennett",
          characterRole: "Head Sprint Coach",
          patientName: "Sierra",
          patientRole: "Varsity Track Co-Captain",
          statement: "“You looked sluggish yesterday and your splits were off. Stop using 'hormones' as an excuse — champions don't adjust their workouts for their period!”",
          evidence: {
            badge: "BJSM Periodization",
            title: "BJSM & ACOG Menstrual Cycle Periodization & Ligament Laxity Consensus",
            metric: "Luteal Core Temp +0.5°C · Ovulatory ACL Laxity Peak · Follicular Power Peak",
            description: "Sports medicine consensus demonstrating that matching training stimulus to hormonal phases optimizes neuromuscular adaptation and reduces catastrophic ACL ruptures.",
          },
          sourceCitation: {
            organization: "British Journal of Sports Medicine (BJSM) & ACOG",
            guideline: "Consensus Statement on Menstrual Cycle Phases, Ligament Laxity, and Musculoskeletal Injury in Athletes",
            year: "2022",
            url: "https://bjsm.bmj.com",
          },
          options: [
            {
              text: "“Coach Bennett, ACOG and the British Journal of Sports Medicine show that training with menstrual biology optimizes athletic longevity. During the luteal phase, higher core temperature and plasma volume shifts require electrolyte hydration and aerobic pacing, while my follicular phase is when my body hits peak power. Let's periodize my sprint loads so I peak for championship meets.”",
              isBest: true,
              feedback: "✦ Elite Sports Literacy! You educated the coach using evidence-based sports medicine science and proposed a periodized training plan to peak for championships.",
              xpBonus: 30,
            },
            {
              text: "“Sorry Coach, I'll just push until I collapse next time.”",
              isBest: false,
              feedback: "Ignoring physiological phases increases burnout and musculoskeletal injury risks.",
              xpBonus: 5,
            },
            {
              text: "“You don't know what it feels like! I'm not running today.”",
              isBest: false,
              feedback: "Proposing a scientific periodization model demonstrates athletic maturity and produces tangible training adjustments.",
              xpBonus: 10,
            },
          ],
        },
        advocacyScript: {
          situation: "A coach dismisses cycle-aware training as an 'excuse' and refuses to adjust volume or intensity.",
          doctorScript: "“Research published in the British Journal of Sports Medicine shows that adjusting training to hormonal phases reduces ACL tears and maximizes strength gains. I am aligning my high-intensity lifting with my follicular phase and focusing on endurance and hydration during my luteal phase to optimize performance for the team.”",
          whyItWorks: "Frames cycle-syncing as an evidence-based strategy to win and prevent season-ending injuries.",
          whatIfDismissed: "“I will review my cycle training plan with our certified athletic trainer for team implementation.”"
        }
      },
      {
        id: "play-8",
        name: "Cycle-Synced Fueling: Nutrition Across Your Monthly Hormones",
        type: "lesson",
        desc: "How to eat for energy, muscle protein synthesis, carb cravings, and luteal metabolic burn.",
        xp: 50,
        readTime: "5 min read",
        summary: "Your body's metabolic engine shifts with your hormones every single week. In the follicular phase, surging estrogen maximizes insulin sensitivity, making your muscles eagerly soak up carbohydrates for energy and explosive workouts. In the luteal phase, rising progesterone elevates your resting metabolic rate by an extra 100 to 300 calories per day and accelerates muscle protein breakdown. Honoring your hunger with high protein, complex carbs, and magnesium keeps your energy high and your period regular.",
        clinicalQuote: {
          quote: "Resting metabolic rate significantly increases during the luteal phase compared to the follicular phase, corresponding to a daily caloric expenditure elevation of 100 to 300 kcal. Concurrently, progesterone increases protein catabolism and alters glucose homeostasis, necessitating targeted carbohydrate periodization and elevated protein intake (1.6–2.2 g/kg/day).",
          source: "International Society of Sports Nutrition (ISSN) & ACOG",
          publication: "Position Stand: Nutritional Considerations for Active and Menstruating Females",
          year: "2023"
        },
        keyTakeaways: [
          "Menstrual Phase (Days 1–5): Replenish iron lost in bleeding by pairing iron-rich foods (beans, spinach, dark meat) with Vitamin C; soothe inflammation with ginger tea and magnesium.",
          "Follicular Phase (Days 6–13): Insulin sensitivity peaks! Your body burns and stores carbs with maximum efficiency, making this the prime window for complex carbs to power high-intensity training.",
          "Ovulatory Window (Days 14–16): High energy demands require B-vitamins, zinc, and colorful antioxidant berries to counter oxidative stress from peak training intensity.",
          "Luteal Phase (Days 17–28): You naturally burn 100–300 extra calories/day! Progesterone also breaks down muscle faster, requiring 25–30g protein per meal plus slow-burning complex carbs to steady serotonin."
        ],
        visualCards: [
          {
            title: "The Luteal Calorie Jump",
            iconName: "Zap",
            text: "Feeling extra hungry before your period is 100% biological. Your body is burning an extra 100–300 kcal/day to maintain an elevated core temperature.",
            highlight: "Feed the burn"
          },
          {
            title: "Carb Sensitivity Shift",
            iconName: "Activity",
            text: "Follicular muscles love carbs; luteal bodies prefer slower-burning starches (sweet potato, oats, squash) paired with protein to prevent blood sugar spikes.",
            highlight: "Smart carb timing"
          },
          {
            title: "Protein Catabolism Shield",
            iconName: "Shield",
            text: "Progesterone speeds up muscle breakdown. Aim for 25–30g of high-quality protein within 45 minutes of training to lock in your athletic gains.",
            highlight: "25-30g protein per meal"
          }
        ],
        diagram: {
          type: "cycle-fueling",
          title: "Interactive Cycle Fueling Plate & Monthly Nutrition Matrix",
          caption: "Select any phase of your menstrual cycle to explore your body's changing metabolic burn, optimal plate ratios, and nutrient superpower foods."
        },
        roleplayScenario: {
          id: "play-8-sim-1",
          title: "Metabolic Caloric Burn vs. Team Table Diet Culture",
          phaseName: "1. Defending Luteal Energy Availability",
          setting: "School Cafeteria or Team Training Table",
          character: "Teammate Courtney",
          characterRole: "Teammate & Peer Influence",
          patientName: "Sofia",
          patientRole: "Youth Advocate & Varsity Athlete",
          statement: "“I noticed you're eating a bigger lunch and taking second helpings of carbs this week. Aren't you worried about gaining weight before our match?”",
          evidence: {
            badge: "ISSN Fueling Stand",
            title: "ISSN Position Stand on Menstruating Athletes: Luteal Metabolic Expenditure",
            metric: "Basal Caloric Burn: +100 to 300 kcal/day · Elevated Protein Catabolism",
            description: "Nutritional science proving that post-ovulatory thermogenesis and progesterone elevation increase resting caloric expenditure and muscle protein breakdown.",
          },
          sourceCitation: {
            organization: "International Society of Sports Nutrition (ISSN) & ACOG",
            guideline: "Position Stand: Nutritional Considerations for Active and Menstruating Females",
            year: "2023",
            url: "https://www.jissn.org",
          },
          options: [
            {
              text: "“Actually, I'm in my luteal phase right now. Sports nutrition research shows our basal metabolic rate increases by 100 to 300 calories per day during this phase, and progesterone accelerates muscle breakdown. Eating an extra balanced snack with complex carbs and protein protects my muscle tissue and keeps my energy steady for game day.”",
              isBest: true,
              feedback: "✦ Elite Nutritional Self-Advocacy! You backed up your fueling choices with evidence-based metabolic science and dismantled toxic diet culture.",
              xpBonus: 30,
            },
            {
              text: "“You're right, I should probably skip dinner to make up for it.”",
              isBest: false,
              feedback: "Never starve through the luteal phase! Depriving your body when metabolism is elevated triggers RED-S, crashes thyroid output, and spikes cortisol.",
              xpBonus: 5,
            },
            {
              text: "“Mind your own business and stop staring at my plate!”",
              isBest: false,
              feedback: "Educating teammates on the 100–300 kcal luteal metabolic burn normalizes healthy fueling and helps protect the whole squad from eating disorders.",
              xpBonus: 10,
            },
          ],
        },
        advocacyScript: {
          situation: "A coach, trainer, or teammate shames you for increased hunger or eating larger portions during the luteal phase.",
          doctorScript: "“Sports nutrition consensus from the ISSN confirms that basal metabolic expenditure increases by 100–300 calories per day in the luteal phase due to progesterone-driven thermogenesis. Restricting intake during this window triggers low energy availability and harms performance. I am fueling my body according to my biological metabolic needs.”",
          whyItWorks: "Cites the ISSN position stand on female athlete energy expenditure, neutralizing diet culture comments with evidence-based physiology.",
          whatIfDismissed: "“I will consult our team sports registered dietitian to confirm my individualized cycle fueling plan.”"
        }
      },
      {
        id: "play-9",
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
        id: "play-10",
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
              "It only matters if you plan to get pregnant this year",
              "Losing your period is a warning sign of low energy availability and bone density loss",
              "It indicates optimal cardiovascular conditioning"
            ],
            correctIndex: 2,
            explanation: "Amenorrhea is a clinical symptom of low energy availability (RED-S). When estrogen drops, bone mineral loss begins rapidly, leading to stress fractures."
          }
        ]
      },
      {
        id: "play-11",
        name: "Advocate: Speaking Up to Coaches & Clinicians",
        type: "lesson",
        isAdvocateCapstone: true,
        desc: "Learn athlete rights, recognize unhealthy coaching pressures, and advocate for proper fueling, rest, and period recovery.",
        xp: 50,
        readTime: "4 min read",
        summary: "Athletes are humans first and competitors second. When coaches pressure you to cut weight, praise skipped meals, or normalize missing periods, speaking up protects your lifelong bone density and hormonal health.",
        keyTakeaways: [
          "Learn: Missing periods (amenorrhea) and bone stress fractures are clinical signs of low energy availability (RED-S), not signs of athletic dedication.",
          "Recognize: Toxic coaching behaviors include public weigh-ins, body shaming, dismissing recurring injuries, and telling athletes that periods slow them down.",
          "Advocate: Involve sports medicine clinicians and registered dietitians to mandate training load adjustments and protect your recovery.",
          "Speak with authority: 'My sports medicine physician has informed me that missing my period compromises my bone density and increases my fracture risk. I am modifying my training volume.'"
        ],
        visualCards: [
          {
            title: "1. LEARN",
            iconName: "Zap",
            text: "The International Olympic Committee (IOC) recognizes RED-S as a serious medical condition that causes irreversible early bone loss if ignored.",
            highlight: "IOC Medical Consensus"
          },
          {
            title: "2. RECOGNIZE",
            iconName: "AlertTriangle",
            text: "Coaches who demand weight cuts, mandate weigh-ins, or celebrate missing periods are violating modern sports safety guidelines.",
            highlight: "Reject weigh-in culture"
          },
          {
            title: "3. ADVOCATE",
            iconName: "Shield",
            text: "Your body is your lifelong home. Speaking up to modify training or demand proper fueling breaks the cycle of injury and burnout.",
            highlight: "Protect your bones"
          }
        ],
        roleplayScenario: {
          id: "play-11-sim-1",
          title: "Speaking Up to Unhealthy Coaching Pressures",
          phaseName: "1. Mandating Medical Load Adjustments",
          setting: "Varsity Athletic Director & Head Coach Joint Conference",
          character: "Coach Henderson",
          characterRole: "Head Track & Field Coach",
          patientName: "Maya",
          patientRole: "Varsity Track & Field Co-Captain",
          statement: "“We have the state qualifying meet in two weeks. I need you to drop three pounds and push through your missed periods so your power-to-weight ratio is sharp.”",
          evidence: {
            badge: "IOC RED-S Charter",
            title: "IOC Medical Commission Policy on Weight Pressures & Athlete Welfare",
            metric: "Clinical RED-S Risk · Mandatory Medical Clearance · Ban on Interscholastic Weigh-Ins",
            description: "International Olympic Committee and NFHS safety regulations prohibiting coaches from mandating weight loss or ignoring amenorrhea as a condition of varsity participation.",
          },
          sourceCitation: {
            organization: "International Olympic Committee (IOC) & NFHS",
            guideline: "IOC Consensus on RED-S & NFHS Guidelines on Eating Disorders and Weight Management",
            year: "2023",
            url: "https://bjsm.bmj.com/content/57/17/1073",
          },
          options: [
            {
              text: "“Coach Henderson, under IOC and NFHS athlete welfare guidelines, mandating weight cuts or dismissing missed periods violates medical safety standards. Losing my period is a clinical distress signal of low energy availability that degrades bone density and increases fracture risk. My sports physician and I have established a non-negotiable fueling and recovery protocol. I am training to be strong and durable for state championships, not under-fueled.”",
              isBest: true,
              feedback: "✦ Capstone Self-Advocate Champion! You cited IOC and NFHS athlete safety mandates, asserted clinical authority, and defended your health and athletic career with composure and conviction.",
              xpBonus: 30,
            },
            {
              text: "“Okay Coach, I'll stop eating carbs before the meet so you're happy with my weight.”",
              isBest: false,
              feedback: "Under-fueling before a major championship causes rapid muscle glycogen depletion, dizziness, and catastrophic stress fracture risks.",
              xpBonus: 5,
            },
            {
              text: "“You're a monster and I'm quitting this program forever!”",
              isBest: false,
              feedback: "While anger is justified, anchoring your stance in NFHS student welfare regulations forces the school and coaching staff to respect medical guidelines.",
              xpBonus: 10,
            },
          ],
        },
        advocacyScript: {
          situation: "A coach demands that you drop weight to 'run faster' or tells you that missing your period is a normal part of training.",
          doctorScript: "“My physician explained that losing my period is a clinical distress signal of Relative Energy Deficiency in Sport (RED-S), which degrades bone density and leads to stress fractures. I am working with a sports dietitian to fuel adequately, and I need my training load adjusted to protect my long-term health.”",
          whyItWorks: "Invoking clinical authority (sports physician and RED-S guidelines) removes the conversation from personal opinion and frames training adjustments as a medical necessity.",
          whatIfDismissed: "“If my health concerns are disregarded, I will request that my sports physician provide a formal medical restriction note for the athletic director and team trainer.”"
        }
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
      },
      {
        id: "factors-4",
        name: "Advocate: Community & Policy Action",
        type: "lesson",
        isAdvocateCapstone: true,
        desc: "Learn systemic barriers, recognize inequities, and advocate for menstrual equity, free products, and health justice.",
        xp: 50,
        readTime: "4 min read",
        summary: "Health literacy is the first step; collective advocacy changes the world. The gender research gap—stemming from decades of female exclusion from clinical drug trials—means women still suffer twice as many adverse drug reactions and face systematic pain dismissal. Whether demanding sex-specific biomedical research, lobbying school boards for free period products, or expanding clinic translation access, youth advocacy bridges this divide.",
        keyTakeaways: [
          "Learn: Decades of male-model research bias (Nature / BSD, Zucker & Prendergast) created persistent gaps: less than 2% of health research funding goes to female-specific conditions outside cancer, directly affecting diagnostic timelines.",
          "Recognize: Research gaps translate directly into treatment gaps: women wait 16 minutes longer for pain relief in ERs, face 7–10 year endometriosis delays, and experience twice the rate of adverse drug reactions.",
          "Advocate: Organize campus petitions, testify at school board meetings, and demand sex-disaggregated clinical data and free period product access in public facilities.",
          "Use civic tools: 'We are requesting the school district allocate funding under the Menstrual Equity in Schools Act to supply free period dispensers in every student restroom.'"
        ],
        visualCards: [
          {
            title: "1. LEARN",
            iconName: "Globe",
            text: "Period products are not luxuries. Just like hand soap and toilet paper are provided freely in public restrooms, menstrual supplies are an essential human need.",
            highlight: "Period Equity = Hygiene"
          },
          {
            title: "2. RECOGNIZE",
            iconName: "AlertTriangle",
            text: "Inequity happens when low-income youth are forced to use makeshift supplies, miss school days, or risk infection because products are priced out of reach.",
            highlight: "End Period Poverty"
          },
          {
            title: "3. ADVOCATE",
            iconName: "Users",
            text: "Grassroots youth advocacy has already changed laws in over 25 states. Partner with student councils and state reps to pass menstrual equity bills.",
            highlight: "Youth civic power"
          }
        ],
        advocacyScript: {
          situation: "Your school or university does not provide free menstrual products in restrooms, forcing students to leave campus or miss classes.",
          doctorScript: "“Under the Menstrual Equity for All initiative, access to period products is an educational equity issue. A survey of our students shows that over 80% have experienced an emergency without supplies. We are proposing the school board allocate a budget line to install and stock free dispensers in all student restrooms.”",
          whyItWorks: "Frames menstrual supplies as an attendance and educational parity issue rather than an optional perk, aligning with state educational equity standards.",
          whatIfDismissed: "“We will gather student petition signatures and present our proposal along with data from the national Menstrual Movement at the next public school board meeting.”"
        }
      }
    ]
  }
};

/**
 * Returns an authoritative clinical quote from ACOG or GLOWM / FIGO
 * for any lesson topic across all 9 reproductive health categories.
 */
export function getTopicClinicalQuote(topic: HubTopic, categoryId?: string): ClinicalQuote {
  if (topic.clinicalQuote) {
    return topic.clinicalQuote;
  }

  const categoryQuotes: Record<string, ClinicalQuote> = {
    body: {
      quote: "Understanding typical anatomical variation and Tanner staging provides adolescents with clinical reassurance and bodily autonomy as neuroendocrine pulsatility matures.",
      source: "The Global Library of Women's Medicine (GLOWM / FIGO)",
      publication: "GLOWM Clinical Guidelines on Adolescent Reproductive Health",
      year: "2023",
    },
    cycle: {
      quote: "By evaluating the menstrual cycle as an additional vital sign, clinicians and adolescents can assess overall endocrine, metabolic, and systemic health during routine encounters.",
      source: "American College of Obstetricians and Gynecologists (ACOG)",
      publication: "ACOG Committee Opinion No. 651: Menstruation in Girls and Adolescents: Using the Menstrual Cycle as a Vital Sign",
      year: "Reaffirmed 2022",
    },
    play: {
      quote: "The IOC defines Relative Energy Deficiency in Sport (REDs) as a syndrome of impaired physiological and/or psychological functioning experienced by female and male athletes that is caused by exposure to problematic (prolonged and/or severe) low energy availability (LEA).",
      source: "International Olympic Committee (IOC)",
      publication: "2023 International Olympic Committee’s (IOC) Consensus Statement on Relative Energy Deficiency in Sport (REDs), British Journal of Sports Medicine (57:1073–1097)",
      year: "2023",
    },
    pcos: {
      quote: "The diagnosis of polycystic ovary syndrome in adolescents requires both ovulatory dysfunction and clinical or biochemical hyperandrogenism, after excluding other mimicking etiologies.",
      source: "American College of Obstetricians and Gynecologists (ACOG)",
      publication: "ACOG Practice Bulletin No. 194: Polycystic Ovary Syndrome",
      year: "2021",
    },
    endo: {
      quote: "Severe dysmenorrhea that interferes with daily activities or school attendance, especially when unresponsive to first-line nonsteroidal anti-inflammatory drugs, warrants clinical evaluation for endometriosis.",
      source: "American College of Obstetricians and Gynecologists (ACOG)",
      publication: "ACOG Committee Opinion No. 760: Dysmenorrhea and Endometriosis in the Adolescent",
      year: "Reaffirmed 2023",
    },
    mind: {
      quote: "Adolescent somatic symptoms, stress reactivity, and neuroendocrine function are tightly coupled through the hypothalamic-pituitary-adrenal (HPA) axis. Validating symptoms builds long-term healthcare trust.",
      source: "The Global Library of Women's Medicine (GLOWM / FIGO)",
      publication: "GLOWM Section on Adolescent Neuroendocrinology and Mental Well-being",
      year: "2023",
    },
    realtalk: {
      quote: "Adolescents have the legal and ethical right to confidential reproductive healthcare. Open, non-stigmatizing clinical dialogue empowers young patients to practice proactive preventive care.",
      source: "American College of Obstetricians and Gynecologists (ACOG)",
      publication: "ACOG Committee Opinion No. 803: Confidentiality in Adolescent Health Care",
      year: "2020",
    },
    conditions: {
      quote: "Shared clinical decision-making, comprehensive patient education, and rapid access to evidence-based reproductive care form the cornerstone of positive maternal and reproductive outcomes.",
      source: "American College of Obstetricians and Gynecologists (ACOG)",
      publication: "ACOG Clinical Practice Guidelines: Adolescent Reproductive Care",
      year: "2022",
    },
    factors: {
      quote: "Social determinants of health, including access to menstrual hygiene products and health literacy, directly influence biological outcomes and long-term reproductive equity.",
      source: "The Global Library of Women's Medicine (GLOWM / FIGO)",
      publication: "GLOWM Global Social Determinants in Women's Health",
      year: "2023",
    },
  };

  const matchedCat = categoryId || topic.id.split("-")[0];
  return categoryQuotes[matchedCat] || categoryQuotes.body;
}

/**
 * Returns an interactive Roleplay Scenario Game simulation tailored to the topic and category.
 * Simulates real encounters with doctors, coaches, and administrators to build youth self-advocacy skills.
 */
/**
 * Returns an array of 2 to 3 interactive Roleplay Scenario Game simulations tailored to the topic and category.
 * Guides learners through the full clinical advocacy journey:
 * Stage 1: Initial Presentation & Dismissal Defense
 * Stage 2: Diagnostic Orders, Bloodwork & Imaging Pushback
 * Stage 3: Specialist Referral & Official Chart Refusal Accountability
 */
export function getTopicRoleplayScenarios(topic: HubTopic, categoryId?: string): RoleplayScenario[] {
  const matchedCat = categoryId || topic.id.split("-")[0];

  const categoryScenarios: Record<string, RoleplayScenario[]> = {
    body: [
      {
        id: "body-sim-1",
        title: "Initial Milestone Discussion",
        phaseName: "1. Tanner Stage & Development",
        setting: "Annual Adolescent Well-Visit with Pediatrician",
        character: "Dr. Chen",
        characterRole: "Primary Care Pediatrician",
        statement: "“You look healthy. Don't stress over why your friends are developing faster or slower than you — everyone's body is different, so let's just skip to the vaccinations.”",
        evidence: {
          badge: "Milestone Log",
          title: "Adolescent Tanner Stage & Growth Chart",
          metric: "12-Month Physical Milestone Log",
          description: "Documents individual breast and pubic hair development against Tanner stages 1–5 to evaluate developmental progress objectively.",
        },
        sourceCitation: {
          organization: "Global Library of Women's Medicine (GLOWM) & FIGO",
          guideline: "GLOWM Clinical Guidelines on Adolescent Pubertal Development & Tanner Staging",
          year: "2023",
          url: "https://www.glowm.com",
        },
        options: [
          {
            text: "“Okay, I won't ask about it. I guess it's embarrassing anyway.”",
            isBest: false,
            feedback: "Notice how staying silent leaves your questions unanswered. Doctors expect adolescents to have questions about anatomy and puberty.",
            xpBonus: 5,
          },
          {
            text: "“You're ignoring me! Why won't you tell me why I haven't grown as much as everyone else?”",
            isBest: false,
            feedback: "While venting frustration is understandable, pairing your emotional concern with objective questions yields much better clinical results.",
            xpBonus: 10,
          },
          {
            text: "“Thank you, Dr. Chen. I know development happens on its own genetic timeline, but I have specific questions about what Tanner stage I'm in and what biological changes to expect next. Can we take five minutes to review that?”",
            isBest: true,
            feedback: "✦ Master Self-Advocate! By referencing clinical Tanner staging and asking for a dedicated 5-minute window, you guide the clinician to prioritize your physical literacy without confrontation.",
            xpBonus: 30,
          },
        ],
      },
      {
        id: "body-sim-2",
        title: "Diagnostic Hormone Evaluation",
        phaseName: "2. Hormone & Growth Plate Testing",
        setting: "6-Month Pubertal Delay Follow-Up Consultation",
        character: "Dr. Chen",
        characterRole: "Primary Care Pediatrician",
        statement: "“Since you haven't started your period by age 15, let's just give it another year or two without doing any bloodwork. Delayed puberty usually fixes itself eventually.”",
        evidence: {
          badge: "ACOG Protocol",
          title: "Primary Amenorrhea Diagnostic Workup Checklist",
          metric: "Age 15+ · Tanner Stage 4 Breast Development >3 Years Without Menarche",
          description: "ACOG guideline criteria requiring morning LH, FSH, prolactin, TSH, and pelvic ultrasound for adolescents without menarche by age 15.",
        },
        sourceCitation: {
          organization: "American College of Obstetricians and Gynecologists (ACOG)",
          guideline: "ACOG Committee Opinion No. 651: Menstruation in Girls and Adolescents: Using the Menstrual Cycle as a Vital Sign",
          year: "Reaffirmed 2022",
          url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2015/12/menstruation-in-girls-and-adolescents-using-the-menstrual-cycle-as-a-vital-sign",
        },
        options: [
          {
            text: "“ACOG guidelines recommend initiating an evaluation if menarche hasn't occurred by age 15, or within three years of thelarche. Could we run baseline morning LH, FSH, prolactin, and a pelvic ultrasound to confirm normal anatomy and hormonal axis signaling?”",
            isBest: true,
            feedback: "✦ Diagnostic Mastery! Citing the ACOG 3-year thelarche rule and requesting specific baseline gonadotropins establishes clinical necessity for testing.",
            xpBonus: 30,
          },
          {
            text: "“I guess two more years of waiting won't hurt. I'll just check back when I'm 17.”",
            isBest: false,
            feedback: "Waiting until age 17 risks untreated primary amenorrhea, missed congenital structural variations, and irreversible bone mineral density loss.",
            xpBonus: 5,
          },
          {
            text: "“You never take anything seriously! I knew coming to this clinic was a mistake.”",
            isBest: false,
            feedback: "Frustration is valid, but citing specific ACOG diagnostic timelines gives the physician medical justification to submit lab orders.",
            xpBonus: 10,
          },
        ],
      },
      {
        id: "body-sim-3",
        title: "Specialist Referral & Medical Charting",
        phaseName: "3. Specialist Referral & Charting",
        setting: "Consultation Request for Pediatric Endocrinology",
        character: "Dr. Chen",
        characterRole: "Primary Care Pediatrician",
        statement: "“A pediatric endocrinology referral takes 6 months to get and causes too much family anxiety. We don't need to consult a subspecialist right now.”",
        evidence: {
          badge: "Chart Rights",
          title: "EHR Clinical Documentation & Subspecialty Referral Mandate",
          metric: "Formal Referral Request · Electronic Medical Record (EMR) Entry",
          description: "Statutory patient rights ensuring requested subspecialty referrals or provider clinical justifications for refusal are recorded in the permanent health record.",
        },
        sourceCitation: {
          organization: "American Academy of Pediatrics (AAP) & AMA",
          guideline: "AAP Principles of Pediatric Subspecialty Care & AMA Patient Rights",
          year: "2023",
          url: "https://publications.aap.org",
        },
        options: [
          {
            text: "“Okay, if you think an endocrinologist is unnecessary, I won't ask again.”",
            isBest: false,
            feedback: "Conceding your request delays specialized pediatric endocrine evaluation. You have the right to subspecialty consultation.",
            xpBonus: 5,
          },
          {
            text: "“Given my pubertal milestone delay, an evaluation by a pediatric endocrinologist or adolescent gynecologist is the clinical standard of care. If you are declining this referral today, could you please document in my medical chart that I requested this consult and record your clinical rationale for denying it?”",
            isBest: true,
            feedback: "✦ Ultimate Clinical Self-Advocacy! Asking for a documented refusal in the permanent electronic medical record (EMR) is the single most effective legal and clinical technique to prompt immediate physician reconsideration.",
            xpBonus: 30,
          },
          {
            text: "“I'm calling the hospital board to report you right this second!”",
            isBest: false,
            feedback: "Requesting clear chart documentation in the room achieves immediate compliance far more reliably than threats.",
            xpBonus: 10,
          },
        ],
      },
    ],

    cycle: [
      {
        id: "cycle-sim-1",
        title: "Debilitating Period Pain Dismissal",
        phaseName: "1. Pain Severity & Dysmenorrhea",
        setting: "Clinic Exam Room for Debilitating Period Pain",
        character: "Dr. Adams",
        characterRole: "Adolescent Care Physician",
        statement: "“Bad cramps and heavy bleeding are just a normal part of becoming a woman. Take ibuprofen and try using a heating pad during your cycle.”",
        evidence: {
          badge: "Vital Sign Tracker",
          title: "3-Month Menstrual Vital Sign & Pain Severity Log",
          metric: "Pain: 8/10 · 2 Days School Missed/Cycle · NSAID Refractory",
          description: "Quantifies daily functional impairment, pad saturation rate (>1/hour), and non-responsiveness to maximum over-the-counter NSAIDs.",
        },
        sourceCitation: {
          organization: "American College of Obstetricians and Gynecologists (ACOG)",
          guideline: "ACOG Committee Opinion No. 651: Menstruation in Girls and Adolescents: Using the Menstrual Cycle as a Vital Sign",
          year: "Reaffirmed 2022",
          url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2015/12/menstruation-in-girls-and-adolescents-using-the-menstrual-cycle-as-a-vital-sign",
        },
        options: [
          {
            text: "“ACOG guidelines emphasize that the menstrual cycle is a vital sign. My pain causes me to miss school and doesn't respond to maximum OTC doses of ibuprofen. Could we schedule a pelvic ultrasound and evaluate for underlying causes like endometriosis?”",
            isBest: true,
            feedback: "✦ Outstanding Clinical Advocacy! You cited official ACOG clinical guidance, quantified the functional impairment (missing school), and requested a specific non-invasive diagnostic step.",
            xpBonus: 30,
          },
          {
            text: "“I guess I just have a low pain tolerance. Sorry for taking up your time.”",
            isBest: false,
            feedback: "Dismissing your own pain normalizes suffering. Incapacitating dysmenorrhea is a medical symptom, never a character flaw.",
            xpBonus: 5,
          },
          {
            text: "“I'm never coming back here again, you don't know what you're doing.”",
            isBest: false,
            feedback: "Walking out leaves you without care. Asking for your symptoms and the provider's refusal to be documented in your chart holds them clinically accountable.",
            xpBonus: 10,
          },
        ],
      },
      {
        id: "cycle-sim-2",
        title: "Heavy Menstrual Flow & Ferritin Evaluation",
        phaseName: "2. Heavy Bleeding & Iron Workup",
        setting: "Follow-Up Consultation for Chronic Period Exhaustion",
        character: "Dr. Adams",
        characterRole: "Adolescent Care Physician",
        statement: "“Your routine complete blood count shows a hemoglobin of 12.1, which is within the normal range. Your dizziness and exhaustion during periods is likely just academic stress.”",
        evidence: {
          badge: "Iron Panel",
          title: "Iron Deficiency Without Anemia (IDWA) Lab Requisition",
          metric: "Serum Ferritin: 11 ng/mL [Depleted Marrow Iron] · >80 mL Blood Loss/Cycle",
          description: "Clinical evidence proving that normal hemoglobin masks severe non-anemic iron deficiency, causing profound physical and cognitive fatigue.",
        },
        sourceCitation: {
          organization: "International Federation of Gynecology and Obstetrics (FIGO) & ACOG",
          guideline: "FIGO System 2: Causes of Abnormal Uterine Bleeding (AUB) & ACOG Clinical Consensus on IDWA",
          year: "2023",
          url: "https://www.figo.org",
        },
        options: [
          {
            text: "“Good to know my hemoglobin is fine. I'll just drink more coffee when I'm tired.”",
            isBest: false,
            feedback: "Relying on caffeine ignores cellular iron depletion. A serum ferritin under 15–30 ng/mL indicates depleted organ stores requiring therapeutic replacement.",
            xpBonus: 5,
          },
          {
            text: "“Why does every doctor blame stress? You never listen!”",
            isBest: false,
            feedback: "Highlighting the difference between serum ferritin and hemoglobin provides objective clinical proof of iron deficiency.",
            xpBonus: 10,
          },
          {
            text: "“Standard hemoglobin only drops after bone marrow iron stores are completely exhausted. My serum ferritin of 11 ng/mL demonstrates Iron Deficiency Without Anemia secondary to heavy menstrual bleeding. Could we order a coagulation panel to screen for von Willebrand disease and start therapeutic iron supplementation?”",
            isBest: true,
            feedback: "✦ Clinical Hematology Mastery! Distinguishing serum ferritin from hemoglobin and screening for bleeding disorders aligns with international FIGO guidelines.",
            xpBonus: 30,
          },
        ],
      },
      {
        id: "cycle-sim-3",
        title: "Specialist Referral & Chart Accountability",
        phaseName: "3. Specialist Referral & Chart Refusal",
        setting: "Referral Request for Pediatric & Adolescent Gynecology (PAG)",
        character: "Dr. Adams",
        characterRole: "Adolescent Care Physician",
        statement: "“Adolescent gynecologists are rare and booking an appointment takes months. Let's just double your over-the-counter naproxen and see how you feel in 6 months.”",
        evidence: {
          badge: "PAG Standard",
          title: "NASPAG Refractory Dysmenorrhea Referral Guidelines",
          metric: "Secondary Dysmenorrhea Screening · Medical Record Documentation",
          description: "North American Society for Pediatric and Adolescent Gynecology (NASPAG) clinical consensus mandating subspecialty referral when pelvic pain resists NSAID/progestin monotherapy.",
        },
        sourceCitation: {
          organization: "North American Society for Pediatric and Adolescent Gynecology (NASPAG)",
          guideline: "NASPAG Position Statement: Management of Complex Adolescent Dysmenorrhea & Pelvic Pain",
          year: "2023",
          url: "https://www.naspag.org",
        },
        options: [
          {
            text: "“Okay, I'll just take double the painkillers and wait another 6 months.”",
            isBest: false,
            feedback: "Doubling NSAID dosages risks gastric ulceration without treating the underlying gynecological condition.",
            xpBonus: 5,
          },
          {
            text: "“NASPAG and ACOG guidelines recommend referral to a pediatric and adolescent gynecologist when pain resists first-line treatments. If you are declining to write this referral today, please document in my medical chart that I requested a specialist consult and specify your clinical reasoning for denying it.”",
            isBest: true,
            feedback: "✦ Unbreakable Advocacy! Requesting written documentation of a denied referral invokes professional clinical accountability and frequently results in immediate referral authorization.",
            xpBonus: 30,
          },
          {
            text: "“You don't care about my health at all! I'm leaving a bad review online.”",
            isBest: false,
            feedback: "Asserting your legal right to chart documentation produces tangible medical results directly in the exam room.",
            xpBonus: 10,
          },
        ],
      },
    ],

    play: [
      {
        id: "play-sim-1",
        title: "The 'Leaner is Faster' Athletic Myth",
        phaseName: "1. Amenorrhea & Performance Myth",
        setting: "Track & Field Team Meeting in Coach's Office",
        character: "Coach Henderson",
        characterRole: "Varsity Distance Running Coach",
        statement: "“If you've stopped getting your period, it just means your body fat is low and you're in peak race shape. All elite runners lose their period — consider it a competitive advantage!”",
        evidence: {
          badge: "RED-S Ledger",
          title: "IOC RED-S Screening & Training Energy Availability Log",
          metric: "Amenorrhea: 90+ Days · Energy Deficit · Tibial Stress Reaction",
          description: "Clinical log tracking training volume, missing menses, recurrent bone stress injuries, and resting bradycardia.",
        },
        sourceCitation: {
          organization: "International Olympic Committee (IOC)",
          guideline: "2023 IOC Consensus Statement on Relative Energy Deficiency in Sport (REDs), British Journal of Sports Medicine (57:1073–1097)",
          year: "2023",
          url: "https://bjsm.bmj.com/content/57/17/1073",
        },
        options: [
          {
            text: "“Awesome, less hassle on race day! I'll keep pushing my mileage.”",
            isBest: false,
            feedback: "Dangerous misconception! Amenorrhea causes accelerated bone mineral loss and significantly increases lifetime risks of stress fractures and cardiovascular damage.",
            xpBonus: 5,
          },
          {
            text: "“Actually Coach, the International Olympic Committee consensus on RED-S states that losing my period is a sign of Low Energy Availability. It impairs performance and causes bone stress injuries. I need to work with our sports nutritionist to adjust my fueling.”",
            isBest: true,
            feedback: "✦ Elite Athletic Self-Advocacy! You cited the IOC medical consensus, corrected the myth with scientific authority, and protected your long-term bone health and athletic longevity.",
            xpBonus: 30,
          },
          {
            text: "“You don't care about our health at all! I'm quitting the team today.”",
            isBest: false,
            feedback: "Educating the coach with IOC medical consensus statements protects both yourself and your teammates from institutionalized under-fueling culture.",
            xpBonus: 10,
          },
        ],
      },
      {
        id: "play-sim-2",
        title: "Bone Stress Injury & DXA Scan Request",
        phaseName: "2. Bone Stress & DXA Scan Request",
        setting: "Athletic Training Room for Recurrent Tibial Pain",
        character: "Athletic Trainer Marcus",
        characterRole: "Certified Athletic Trainer (ATC)",
        statement: "“It's just shin splints. Ice them, roll your calves, and you're good to run in tomorrow's invitational.”",
        evidence: {
          badge: "RED-S Clinical Assessment",
          title: "IOC RED-S Clinical Assessment Tool (CAT) & Amenorrhea Record",
          metric: "90-Day Amenorrhea · Recurrent Tibial Pain with Hopping Test Positive",
          description: "Clinical diagnostic criteria identifying high risk for cortical bone stress fracture in an under-fueled female athlete.",
        },
        sourceCitation: {
          organization: "American College of Sports Medicine (ACSM) & IOC",
          guideline: "ACSM Female Athlete Triad Consensus & IOC RED-S Clinical Assessment",
          year: "2023",
          url: "https://www.sportsmedicine.org",
        },
        options: [
          {
            text: "“Recurrent focal tibial pain combined with three months of amenorrhea is a red flag for a bone stress injury under IOC RED-S criteria. Continuing to run risks a full cortical fracture. Can you refer me to a sports medicine physician for an MRI and a DXA bone mineral density scan?”",
            isBest: true,
            feedback: "✦ Sports Medicine Mastery! You linked missing menses to bone demineralization and requested the clinical gold standard (MRI and DXA) to prevent catastrophic fracture.",
            xpBonus: 30,
          },
          {
            text: "“Okay, I'll take three ibuprofen and tape my shins so I can run tomorrow.”",
            isBest: false,
            feedback: "Running on a bone stress reaction masks pain with NSAIDs and can turn a microfracture into a complete tibial fracture requiring months in a cast.",
            xpBonus: 5,
          },
          {
            text: "“You're trying to break my legs! You have no idea what you're doing!”",
            isBest: false,
            feedback: "Grounding your concern in IOC clinical criteria commands professional respect from athletic training staff.",
            xpBonus: 10,
          },
        ],
      },
      {
        id: "play-sim-3",
        title: "Safe Return-to-Play & Athletic Protections",
        phaseName: "3. Safe Return-to-Play & Protections",
        setting: "Coach's Office Return-to-Play Meeting",
        character: "Coach Henderson",
        characterRole: "Varsity Distance Running Coach",
        statement: "“If you take two weeks off for nutrition counseling and cross-training, I have to strip your varsity captaincy and give your spot away.”",
        evidence: {
          badge: "Athlete Rights",
          title: "Interscholastic Safe Return-to-Play Medical Clearance Model",
          metric: "Physician-Directed Energy Availability Re-feeding Protocol",
          description: "High school athletic association regulations protecting student-athletes from retaliatory roster demotions when following prescribed medical treatment.",
        },
        sourceCitation: {
          organization: "National Federation of State High School Associations (NFHS) & IOC",
          guideline: "NFHS Sports Medicine Advisory Committee: Return to Play Protocols & Athlete Safety",
          year: "2023",
          url: "https://www.nfhs.org",
        },
        options: [
          {
            text: "“I can't lose my captaincy. I'll just skip the doctor's nutrition plan and race anyway.”",
            isBest: false,
            feedback: "Sacrificing your medical recovery for a sports title risks permanent reproductive and skeletal damage.",
            xpBonus: 5,
          },
          {
            text: "“You're a terrible coach and I'm quitting the sport forever!”",
            isBest: false,
            feedback: "Invoking NFHS and IOC safety protocols protects your roster standing while keeping your medical recovery on track.",
            xpBonus: 10,
          },
          {
            text: "“Under NFHS and IOC return-to-play guidelines, following a physician-prescribed medical fueling protocol is a protected health necessity. Stripping leadership for complying with sports medicine clearance violates student safety policies. Let's work with the athletic trainer and sports dietitian on a modified training schedule that safely restores my energy availability.”",
            isBest: true,
            feedback: "✦ Champion Athletic Leadership! You asserted institutional athlete safety rules while proposing a constructive collaborative solution with the sports medicine team.",
            xpBonus: 30,
          },
        ],
      },
    ],

    pcos: [
      {
        id: "pcos-sim-1",
        title: "Premature Birth Control Masking",
        phaseName: "1. Baseline Testing vs. Pill Masking",
        setting: "Consultation on Irregular Cycles & Persistent Acne",
        character: "Dr. Wright",
        characterRole: "Primary Care Physician",
        statement: "“At your age, cycles are often erratic. If you're concerned about acne or weight, just cut carbs and we can put you on birth control right away without doing any blood tests.”",
        evidence: {
          badge: "Diagnostic Workup",
          title: "Rotterdam Diagnostic Checklist & Fasted Lab Requisition",
          metric: "Oligomenorrhea (50–65 Day Cycles) · Severe Cystic Acne · Hirsutism",
          description: "Evidence checklist documenting the Rotterdam criteria requirements (ovulatory dysfunction, clinical/biochemical hyperandrogenism).",
        },
        sourceCitation: {
          organization: "American College of Obstetricians and Gynecologists (ACOG)",
          guideline: "ACOG Practice Bulletin No. 194: Polycystic Ovary Syndrome & International Evidence-Based Guidelines",
          year: "2021",
          url: "https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2018/06/polycystic-ovary-syndrome",
        },
        options: [
          {
            text: "“Okay, whatever is easiest. I'll just take the pill.”",
            isBest: false,
            feedback: "Starting oral contraceptives before baseline bloodwork permanently masks underlying hormonal imbalances, delaying a formal diagnosis.",
            xpBonus: 5,
          },
          {
            text: "“You're just judging me because of my weight! I want a different doctor right now.”",
            isBest: false,
            feedback: "Weight stigma in healthcare is real and harmful. Framing your request through specific diagnostic lab orders forces the clinician to address pathology rather than weight.",
            xpBonus: 10,
          },
          {
            text: "“Under the Rotterdam criteria for PCOS, we need to assess for clinical hyperandrogenism and ovulatory dysfunction. Could we run a morning fasted total/free testosterone, DHEA-S, and metabolic panel before starting birth control so we don't mask the baseline?”",
            isBest: true,
            feedback: "✦ Diagnostic Mastery! By requesting baseline fasted testing prior to hormonal therapy, you preserve critical clinical data needed for an accurate diagnosis.",
            xpBonus: 30,
          },
        ],
      },
      {
        id: "pcos-sim-2",
        title: "Metabolic & Insulin Resistance Screening",
        phaseName: "2. Insulin & Cardiometabolic Screening",
        setting: "Lab Review for High Free Androgens",
        character: "Dr. Wright",
        characterRole: "Primary Care Physician",
        statement: "“Your free testosterone was slightly elevated, but since your BMI is normal, you don't need any testing for insulin resistance or blood sugar issues.”",
        evidence: {
          badge: "Metabolic Panel",
          title: "International Evidence-Based PCOS Guidelines Metabolic Screening",
          metric: "Lean PCOS Phenotype · Fasting Insulin / 2-Hour 75g OGTT Recommended",
          description: "International guidelines establishing that up to 75% of lean adolescent PCOS patients harbor intrinsic cellular insulin resistance requiring metabolic monitoring.",
        },
        sourceCitation: {
          organization: "Monash University & International PCOS Network",
          guideline: "Recommendations from the 2023 International Evidence-Based Guideline for the Assessment and Management of Polycystic Ovary Syndrome",
          year: "2023",
          url: "https://www.monash.edu/medicine/mchri/pcos",
        },
        options: [
          {
            text: "“Great, if my BMI is fine then I don't have to worry about insulin at all.”",
            isBest: false,
            feedback: "Misconception! Insulin resistance in PCOS is cellular and post-receptor mediated, frequently present in lean patients without elevated BMI.",
            xpBonus: 5,
          },
          {
            text: "“The 2023 International PCOS Evidence-Based Guidelines emphasize that insulin resistance occurs independently of BMI in adolescents with PCOS. Guidelines recommend a 2-hour 75g oral glucose tolerance test (OGTT) and a fasting lipid panel at diagnosis. Can we order these baseline metabolic screenings today?”",
            isBest: true,
            feedback: "✦ Endocrine Expertise! Citing international consensus on lean PCOS insulin resistance ensures comprehensive metabolic protection.",
            xpBonus: 30,
          },
          {
            text: "“You have no idea what lean PCOS is, I read about it online and you're wrong!”",
            isBest: false,
            feedback: "Citing the Monash 2023 International Guideline by name is far more authoritative than mentioning generic online reading.",
            xpBonus: 10,
          },
        ],
      },
      {
        id: "pcos-sim-3",
        title: "Subspecialty Referral & Medical Chart Refusal",
        phaseName: "3. Reproductive Endocrine Referral",
        setting: "Specialist Referral Request Consultation",
        character: "Dr. Wright",
        characterRole: "Primary Care Physician",
        statement: "“There is no reason to see a reproductive endocrinologist until you are ready to get pregnant years down the road. Primary care can handle this with birth control.”",
        evidence: {
          badge: "Referral Rights",
          title: "Endocrine Society Clinical Practice Guidelines",
          metric: "Adolescent Multidisciplinary PCOS Care Model · Charting Protocol",
          description: "Clinical mandate recommending adolescent endocrine consultation for comprehensive ovulatory restoration, metabolic optimization, and dermatological management.",
        },
        sourceCitation: {
          organization: "The Endocrine Society",
          guideline: "Diagnosis and Treatment of Polycystic Ovary Syndrome: An Endocrine Society Clinical Practice Guideline",
          year: "2022",
          url: "https://www.endocrine.org",
        },
        options: [
          {
            text: "“PCOS is a lifelong endocrine and cardiometabolic condition with systemic impacts on ovulatory signaling and metabolic health, not just fertility. I would like a referral to a pediatric or reproductive endocrinologist. If you are declining this referral today, please document your refusal and clinical rationale in my medical chart.”",
            isBest: true,
            feedback: "✦ Elite Healthcare Self-Advocacy! Documenting refusal in the EMR protects your continuity of care and compels providers to justify deviations from subspecialty standards.",
            xpBonus: 30,
          },
          {
            text: "“I guess you're right, I'll wait until I want kids to see an endocrinologist.”",
            isBest: false,
            feedback: "PCOS is an endocrine condition that impacts metabolic, bone, and mental health throughout your lifespan, not merely when conceiving.",
            xpBonus: 5,
          },
          {
            text: "“I don't need your permission, I'll find a doctor who actually cares!”",
            isBest: false,
            feedback: "Requiring the refusal to be documented in your current chart establishes an official clinical record before transitioning providers.",
            xpBonus: 10,
          },
        ],
      },
    ],

    endo: [
      {
        id: "endo-sim-1",
        title: "The 'Clear Ultrasound' Fallacy",
        phaseName: "1. Normal Ultrasound Fallacy",
        setting: "Outpatient Clinic Following a 'Normal' Pelvic Ultrasound",
        character: "Dr. Patel",
        characterRole: "General Gynecologic Clinician",
        statement: "“Good news! Your ultrasound scan came back completely clear and unremarkable. There is nothing physically wrong with your pelvis, so your pain must be gastrointestinal or stress-related.”",
        evidence: {
          badge: "Imaging Limitations File",
          title: "Peritoneal Endometriosis Ultrasound Sensitivity Data",
          metric: "Normal Scan Recorded · Severe Dyschezia & Pelvic Pain · 7-Year Diagnosis Gap",
          description: "Official medical consensus showing that standard transabdominal/transvaginal ultrasound fails to detect over 75% of superficial peritoneal endometriosis lesions.",
        },
        sourceCitation: {
          organization: "American College of Obstetricians and Gynecologists (ACOG)",
          guideline: "ACOG Committee Opinion No. 760: Dysmenorrhea and Endometriosis in the Adolescent",
          year: "Reaffirmed 2023",
          url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/12/dysmenorrhea-and-endometriosis-in-the-adolescent",
        },
        options: [
          {
            text: "“ACOG Committee Opinion No. 760 notes that a normal ultrasound cannot rule out superficial endometriosis. Since my cyclical pain causes school absence and doesn't respond to NSAIDs, could you refer me to a Minimally Invasive Gynecologic Surgeon (MIGS)?”",
            isBest: true,
            feedback: "✦ Life-Changing Clinical Self-Advocacy! You cited the exact ACOG standard on imaging limitations and requested a referral to an excision specialist.",
            xpBonus: 30,
          },
          {
            text: "“I guess the scans don't lie. Maybe I'm just exaggerating the pain.”",
            isBest: false,
            feedback: "Over 75% of adolescent endometriosis consists of superficial peritoneal lesions that are completely invisible on ultrasound scans. Never doubt your bodily symptoms.",
            xpBonus: 5,
          },
          {
            text: "“You don't believe me! Why did I even waste money on this scan?”",
            isBest: false,
            feedback: "Channeling your frustration into requesting a documented specialist referral creates a paper trail and gets you closer to specialized care.",
            xpBonus: 10,
          },
        ],
      },
      {
        id: "endo-sim-2",
        title: "Cyclic Bowel & Bladder Pain Evaluation",
        phaseName: "2. Deep Pelvic & Bowel Symptoms",
        setting: "Symptom Deep-Dive Consultation for Catamenial GI Pain",
        character: "Dr. Patel",
        characterRole: "General Gynecologic Clinician",
        statement: "“Teenagers don't get deep endometriosis. Your sharp rectal spasms and painful bowel movements during bleeding are just irritable bowel syndrome (IBS).”",
        evidence: {
          badge: "Catamenial Log",
          title: "Catamenial Dyschezia & Dysuria Symptom Log",
          metric: "Severe Rectal Spasms During Menses · Zero Mid-Cycle GI Symptoms",
          description: "Detailed tracking proving GI and urinary symptoms are strictly cyclical and synchronous with menstrual bleeding, indicating uterosacral and pouch of Douglas peritoneal implants.",
        },
        sourceCitation: {
          organization: "World Endometriosis Society (WES) & ESHRE",
          guideline: "ESHRE Guideline: Endometriosis (European Society of Human Reproduction and Embryology)",
          year: "2022",
          url: "https://www.eshre.eu/Guidelines-and-Legal/Guidelines/Endometriosis-guideline",
        },
        options: [
          {
            text: "“I'll try taking fiber supplements and cut out dairy, maybe it's just my diet.”",
            isBest: false,
            feedback: "Dietary adjustments will not treat ectopic endometrial implants on the bowel wall or uterosacral ligaments.",
            xpBonus: 5,
          },
          {
            text: "“Catamenial dyschezia—painful bowel movements occurring strictly during menstruation—is a classic cardinal symptom of posterior compartment endometriosis in adolescents. ESHRE and ACOG guidelines recommend evaluating cyclic GI symptoms as gynecological pathology rather than isolated IBS. Can we evaluate these symptoms as endometriosis?”",
            isBest: true,
            feedback: "✦ Diagnostic Precision! Using the clinical term ‘catamenial dyschezia’ demonstrates medical literacy that refutes misdiagnosis as ordinary IBS.",
            xpBonus: 30,
          },
          {
            text: "“I do not have IBS! Why does every doctor assume girls are just having stomach aches?”",
            isBest: false,
            feedback: "Highlighting the strict monthly synchrony of the symptoms provides the medical proof needed to rule out isolated GI disease.",
            xpBonus: 10,
          },
        ],
      },
      {
        id: "endo-sim-3",
        title: "Laparoscopic Excision vs. Ablation Referral",
        phaseName: "3. Excision (MIGS) Referral & Charting",
        setting: "Surgical Consultation Decision",
        character: "Dr. Patel",
        characterRole: "General Gynecologic Clinician",
        statement: "“If you insist on surgery, I can do a quick diagnostic laparoscopy next week and burn off whatever spots I see with electrocautery. There is no need to see an excision specialist.”",
        evidence: {
          badge: "Surgical Evidence",
          title: "Excision vs. Ablation Recurrence Rate Comparative Study",
          metric: "Ablation Recurrence: 40–60% at 2 Years · Excision Recurrence: <15%",
          description: "Clinical surgical research demonstrating that superficial cautery (ablation) leaves deep disease in the pelvic floor, whereas wide laparoscopic excision removes the entire lesion base.",
        },
        sourceCitation: {
          organization: "Journal of Minimally Invasive Gynecology (JMIG) & AAGL",
          guideline: "AAGL Guidelines on Laparoscopic Excision of Endometriosis & Adolescent Pelvic Surgery",
          year: "2023",
          url: "https://www.jmig.org",
        },
        options: [
          {
            text: "“Sounds good, burning them off sounds fast and easy. Let's schedule it.”",
            isBest: false,
            feedback: "Ablation frequently leaves deep inflammatory tissue intact and causes pelvic adhesions. Fellowship-trained excision offers far superior long-term relief.",
            xpBonus: 5,
          },
          {
            text: "“I won't let you touch me with a laser! You're going to butcher my organs!”",
            isBest: false,
            feedback: "Calmly citing surgical literature and requesting a documented MIGS referral maintains control of your medical trajectory.",
            xpBonus: 10,
          },
          {
            text: "“Clinical surgical data in JMIG shows laparoscopic excision has significantly lower recurrence rates and better symptom resolution than ablation, which can leave deep lesions behind. I am requesting a referral to a fellowship-trained Minimally Invasive Gynecologic Surgeon (MIGS). If you are declining to write this referral, please document your refusal in my medical record today.”",
            isBest: true,
            feedback: "✦ Master Healthcare Advocacy! You cited surgical recurrence comparative trials and requested written documentation of refusal, protecting yourself from substandard surgery.",
            xpBonus: 30,
          },
        ],
      },
    ],

    mind: [
      {
        id: "mind-sim-1",
        title: "Dismissing PMDD as Everyday PMS",
        phaseName: "1. DSM-5 PMDD vs. PMS",
        setting: "Clinical Consultation for Severe Cyclical Mood Shifts",
        character: "Dr. Miller",
        characterRole: "Pediatric Primary Care Clinician",
        statement: "“Every girl feels irritable or emotional before her period. Just drink more herbal tea, practice meditation, and don't make a big deal out of PMS.”",
        evidence: {
          badge: "Psychiatric Endocrine Chart",
          title: "Prospective 2-Cycle Daily PMDD Mood & Luteal Graph",
          metric: "DRSP Peak in Late Luteal · Rapid Remission Within 48h of Menses",
          description: "Daily Record of Severity of Problems (DRSP) prospectively logged across 60 days, differentiating DSM-5 PMDD from generalized depression.",
        },
        sourceCitation: {
          organization: "American Academy of Child & Adolescent Psychiatry (AACAP)",
          guideline: "AACAP Practice Parameter on Child & Adolescent Mood Disorders & DSM-5 PMDD Criteria",
          year: "2023",
          url: "https://www.aacap.org",
        },
        options: [
          {
            text: "“I guess I'm just weak mentally. I'll try to meditate more.”",
            isBest: false,
            feedback: "PMDD is a severe neuroendocrine sensitivity disorder, not a lack of willpower or ordinary moodiness.",
            xpBonus: 5,
          },
          {
            text: "“I have tracked my symptoms prospectively across two consecutive cycles. My severe depression and panic only emerge in the luteal phase and vanish 48 hours into bleeding. This aligns with DSM-5 PMDD diagnostic criteria. Can we discuss evidence-based medical treatment?”",
            isBest: true,
            feedback: "✦ Clinical Precision! Prospective 2-cycle daily symptom charting is the gold standard for PMDD diagnosis. Presenting real data makes your condition undeniable.",
            xpBonus: 30,
          },
          {
            text: "“You have no idea how hard my life is! You're completely unhelpful.”",
            isBest: false,
            feedback: "Presenting documented prospective tracking logs commands immediate medical respect and bypasses dismissive advice.",
            xpBonus: 10,
          },
        ],
      },
      {
        id: "mind-sim-2",
        title: "Intermittent Luteal Dosing vs. Continuous Sedatives",
        phaseName: "2. Luteal Dosing Pharmacotherapy",
        setting: "Medication Review for Premenstrual Dysphoria",
        character: "Dr. Miller",
        characterRole: "Pediatric Primary Care Clinician",
        statement: "“Since your mood drops are severe, I want to prescribe continuous daily high-dose antidepressants and a sedative to take all month long.”",
        evidence: {
          badge: "Neuroendocrine Profile",
          title: "DRSP Confirmed Strictly Confined Luteal-Phase Presentation",
          metric: "Follicular Phase Score: 0 (Normal) · Luteal Phase Score: Severe Impairment",
          description: "Clinical evidence proving GABA-A receptor sensitivity to allopregnanolone fluctuations, responsive to targeted intermittent luteal-phase SSRI dosing.",
        },
        sourceCitation: {
          organization: "International Society for Premenstrual Disorders (ISPMD) & ACOG",
          guideline: "ISPMD Consensus on the Management of Premenstrual Dysphoric Disorder & ACOG Practice Guidelines",
          year: "2023",
          url: "https://www.ispmd.org",
        },
        options: [
          {
            text: "“Okay, I'll take heavy sedatives every single day of the month even when I feel great.”",
            isBest: false,
            feedback: "Continuous daily sedatives cause side effects and ignore the biological trigger of PMDD, which is confined to the post-ovulatory luteal window.",
            xpBonus: 5,
          },
          {
            text: "“I'm not taking pills every day! You're trying to turn me into a zombie!”",
            isBest: false,
            feedback: "Educating the provider on intermittent luteal dosing provides a targeted evidence-based alternative to continuous daily medication.",
            xpBonus: 10,
          },
          {
            text: "“Because my prospective DRSP charting confirms my symptoms are strictly confined to the luteal phase and completely absent in the follicular phase, ACOG and ISPMD first-line guidelines recommend intermittent luteal-phase SSRI dosing (starting at ovulation and stopping on day 1 of menses). Can we trial this targeted protocol first?”",
            isBest: true,
            feedback: "✦ Neuroendocrine Pharmacology Mastery! Intermittent luteal dosing has rapid efficacy within hours in PMDD due to unique neurosteroid mechanisms.",
            xpBonus: 30,
          },
        ],
      },
      {
        id: "mind-sim-3",
        title: "Academic Accommodations & Chart Verification",
        phaseName: "3. School Accommodations & Charting",
        setting: "School Accommodation Request with Clinician",
        character: "Dr. Miller",
        characterRole: "Pediatric Primary Care Clinician",
        statement: "“I cannot sign a medical accommodation form for a high school. Schools don't grant testing flexibility or attendance passes for menstrual emotional symptoms.”",
        evidence: {
          badge: "Legal Rights Form",
          title: "Section 504 / ADA Medical Verification for Neuroendocrine Impairment",
          metric: "DSM-5-TR 625.4 (PMDD) · Protected Functional Disability Status",
          description: "Federal civil rights protections under Section 504 guaranteeing reasonable educational accommodations for chronic health conditions that impair major life activities.",
        },
        sourceCitation: {
          organization: "U.S. Department of Education & American Psychiatric Association (APA)",
          guideline: "Section 504 Rehabilitation Act Protections for Chronic Medical Conditions & DSM-5-TR PMDD Criteria",
          year: "2023",
          url: "https://www.ed.gov/ocr",
        },
        options: [
          {
            text: "“PMDD is a recognized neuroendocrine disorder in the DSM-5 that substantially impairs concentration during the luteal window. Under Section 504 of the Rehabilitation Act, students with chronic medical impairments are legally entitled to reasonable exam rescheduling accommodations. Can you sign this medical verification form, or refer me to a reproductive psychiatrist who can?”",
            isBest: true,
            feedback: "✦ Civil Rights & Healthcare Mastery! Invoking Section 504 federal statute transforms a request into a protected civil right for educational equity.",
            xpBonus: 30,
          },
          {
            text: "“I guess I'll just fail my exams when they land on my luteal week.”",
            isBest: false,
            feedback: "Surrendering your rights causes unnecessary academic harm. PMDD is a federally recognized impairment eligible for 504 protections.",
            xpBonus: 5,
          },
          {
            text: "“You don't care about my education! You want me to flunk out of school!”",
            isBest: false,
            feedback: "Presenting the formal Section 504 medical verification form directly establishes your legal entitlement to educational accommodations.",
            xpBonus: 10,
          },
        ],
      },
    ],

    realtalk: [
      {
        id: "realtalk-sim-1",
        title: "Title X Minor Privacy & Insurance EOB Protection",
        phaseName: "1. Title X Minor Confidentiality",
        setting: "Student Health Center Front Desk",
        character: "Alex",
        characterRole: "Intake & Billing Coordinator",
        statement: "“If you want confidential STI screening or reproductive care, we normally bill your family insurance, which sends a detailed Explanation of Benefits (EOB) itemizing all tests to your home address.”",
        evidence: {
          badge: "Legal Rights Form",
          title: "Title X Minor Confidentiality Protection & Billing Waiver",
          metric: "Statutory Minor Privacy Protections · Request for Zero Home EOB",
          description: "Official federal Title X regulations establishing that adolescent patients may receive confidential reproductive screenings via sliding-scale federal grant allocations.",
        },
        sourceCitation: {
          organization: "American College of Obstetricians and Gynecologists (ACOG)",
          guideline: "ACOG Committee Opinion No. 803: Confidentiality in Adolescent Health Care",
          year: "2020",
          url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2020/04/confidentiality-in-adolescent-health-care",
        },
        options: [
          {
            text: "“Never mind then, I can't risk my parents seeing that. I'll just skip getting tested.”",
            isBest: false,
            feedback: "Skipping asymptomatic STI testing puts your health and partner's health at risk. Confidential pathways always exist.",
            xpBonus: 5,
          },
          {
            text: "“Why are you trying to get me in trouble with my family?”",
            isBest: false,
            feedback: "Front desk staff often default to standard commercial billing unless patients explicitly request Title X confidential billing protocols.",
            xpBonus: 10,
          },
          {
            text: "“Under Title X federal guidelines and state minor consent laws, I have the legal right to confidential reproductive healthcare. Can we utilize Title X sliding-scale funding or a confidential billing waiver so no EOB is generated?”",
            isBest: true,
            feedback: "✦ Legal & Healthcare Rights Mastery! Invoking Title X sliding-scale grant funding guarantees zero insurance statements are mailed to your household.",
            xpBonus: 30,
          },
        ],
      },
      {
        id: "realtalk-sim-2",
        title: "First-Line LARC Contraceptive Counseling",
        phaseName: "2. Tier 1 Contraceptive Access",
        setting: "Contraceptive Counseling Consultation",
        character: "Clinician Taylor",
        characterRole: "Adolescent Health Specialist",
        statement: "“You're too young to consider an IUD or contraceptive implant. Let's just put you on the daily birth control pill.”",
        evidence: {
          badge: "Efficacy Hierarchy",
          title: "Contraceptive Efficacy Tier Hierarchy Chart",
          metric: "Tier 1 LARCs: <0.1–0.2% Failure Rate vs. Oral Pill: 7–9% Typical Failure",
          description: "Clinical comparison demonstrating that Long-Acting Reversible Contraception (LARCs) provides the highest satisfaction and pregnancy prevention in youth.",
        },
        sourceCitation: {
          organization: "American Academy of Pediatrics (AAP) & ACOG",
          guideline: "AAP Policy Statement: Contraception for Adolescents & ACOG Committee Opinion No. 710",
          year: "2022",
          url: "https://publications.aap.org",
        },
        options: [
          {
            text: "“ACOG and AAP clinical consensus statements explicitly designate LARCs—such as the hormonal implant and intrauterine devices—as first-line recommendations for adolescents due to their safety and superior >99% efficacy. I would like to review the benefits and insertion procedures for an implant.”",
            isBest: true,
            feedback: "✦ Shared Decision-Making Champion! You cited national pediatric guidelines that establish LARCs as first-line options for adolescents.",
            xpBonus: 30,
          },
          {
            text: "“Okay, I'll take the pill, even though I know I'll probably forget it every week.”",
            isBest: false,
            feedback: "Typical use failure rates for oral pills in teenagers exceed 7–9% due to missed pills. You have the right to evaluate all options.",
            xpBonus: 5,
          },
          {
            text: "“You're gatekeeping birth control! Why won't you let me choose?”",
            isBest: false,
            feedback: "Referencing AAP and ACOG consensus guidelines provides the clinical rationale needed to access Tier 1 methods.",
            xpBonus: 10,
          },
        ],
      },
      {
        id: "realtalk-sim-3",
        title: "Emergency Contraceptive OTC Dispensing Rights",
        phaseName: "3. Pharmacy OTC Rights",
        setting: "Community Pharmacy Counter for Emergency Contraception",
        character: "Pharmacist Greg",
        characterRole: "Retail Pharmacist",
        statement: "“You look under 18. You need a doctor's prescription and an adult parent present to purchase emergency contraception from this pharmacy counter.”",
        evidence: {
          badge: "Federal Mandate",
          title: "FDA Over-the-Counter Levonorgestrel Regulatory Ruling",
          metric: "Zero Age Restrictions · No ID Required · Point-of-Sale Access Mandated",
          description: "2013 FDA federal ruling and American Society for Emergency Contraception regulations establishing unrestricted OTC access to levonorgestrel for all individuals.",
        },
        sourceCitation: {
          organization: "U.S. Food and Drug Administration (FDA) & ASEC",
          guideline: "FDA Regulatory Approval of Over-the-Counter Levonorgestrel Without Age Restrictions",
          year: "Reaffirmed 2023",
          url: "https://www.fda.gov",
        },
        options: [
          {
            text: "“Sorry, I didn't know the rules. I'll go home and ask my parents.”",
            isBest: false,
            feedback: "Levonorgestrel's efficacy drops dramatically with each passing hour. Federal law does not require parental permission or prescriptions.",
            xpBonus: 5,
          },
          {
            text: "“Under federal FDA regulations established in 2013, levonorgestrel emergency contraception is approved for over-the-counter sale to all individuals regardless of age, with no prescription or parental consent required. Federal regulations protect my right to purchase this medication immediately.”",
            isBest: true,
            feedback: "✦ Uncompromising Regulatory Literacy! Citing FDA 2013 over-the-counter deregulation corrects erroneous pharmacy gatekeeping immediately.",
            xpBonus: 30,
          },
          {
            text: "“You're breaking the law! Give it to me right now or I'm calling the police!”",
            isBest: false,
            feedback: "Calmly reciting the FDA regulation prompts the pharmacist to check official policy without unnecessary escalation.",
            xpBonus: 10,
          },
        ],
      },
    ],

    factors: [
      {
        id: "factors-sim-1",
        title: "School Bathroom Dispenser Budget Policy",
        phaseName: "1. Menstrual Product Equity",
        setting: "High School District Board Meeting on Menstrual Hygiene Supplies",
        character: "Trustee Morales",
        characterRole: "School Board Member",
        statement: "“Installing free pad and tampon dispensers in all student bathrooms will just lead to vandalism and waste our limited school maintenance budget.”",
        evidence: {
          badge: "Policy Impact Report",
          title: "Menstrual Equity School Attendance & Fiscal Impact Brief",
          metric: "84% Student Absenteeism Link · <$3/Student Annual Cost",
          description: "Data-driven research proving free menstrual dispensers decrease classroom absenteeism by >20% and protect student health equity.",
        },
        sourceCitation: {
          organization: "Alliance for Period Supplies & GLOWM",
          guideline: "National Study on Period Poverty and School Attendance & GLOWM Social Determinants",
          year: "2023",
          url: "https://period.org",
        },
        options: [
          {
            text: "“Menstrual products are non-negotiable hygiene supplies, exactly like hand soap and toilet paper. Research from Menstrual Equity campaigns shows that providing free supplies reduces absenteeism by over 20% and costs less than $3 per student per year. We are requesting a formal line-item allocation for educational parity.”",
            isBest: true,
            feedback: "✦ Civic & Community Advocacy Master! You framed menstrual access as fundamental educational parity and refuted budget concerns with empirical cost-benefit data.",
            xpBonus: 30,
          },
          {
            text: "“I guess that makes sense. We'll just keep asking friends for emergency supplies.”",
            isBest: false,
            feedback: "Accepting period poverty in schools causes students to miss instructional hours and disproportionately harms lower-income youth.",
            xpBonus: 5,
          },
          {
            text: "“You hate female students and you are all completely out of touch!”",
            isBest: false,
            feedback: "Grounding your advocacy in educational attendance statistics and comparing supplies to toilet paper makes your policy argument airtight.",
            xpBonus: 10,
          },
        ],
      },
      {
        id: "factors-sim-2",
        title: "Restroom Access & Hall Pass Disciplinary Penalties",
        phaseName: "2. Restroom Access & Safety",
        setting: "Vice Principal's Office on Restroom Policies",
        character: "Vice Principal Davis",
        characterRole: "School Administrator",
        statement: "“Our school policy strictly limits students to two hall passes per semester. If you leave class during heavy flow days, you will receive unexcused absence detention points.”",
        evidence: {
          badge: "Health Protocol",
          title: "Menstrual Hygiene Safety & Toxic Shock Syndrome (TSS) Prevention",
          metric: "Product Change Interval: Every 4–8 Hours Max · Involuntary Bleeding Protection",
          description: "Clinical evidence from the AAP and CDC establishing that restricting bathroom access during heavy menses elevates risks for bacterial overgrowth and toxic shock syndrome.",
        },
        sourceCitation: {
          organization: "American Academy of Pediatrics (AAP) & CDC",
          guideline: "AAP Guidance on Menstrual Health and Hygiene Management in Schools",
          year: "2023",
          url: "https://www.cdc.gov",
        },
        options: [
          {
            text: "“I'll just try to hold it and leave the same tampon in all day to avoid detention.”",
            isBest: false,
            feedback: "Leaving tampons in place for extended hours drastically elevates the risk of life-threatening Toxic Shock Syndrome (TSS).",
            xpBonus: 5,
          },
          {
            text: "“This school is a prison and you're violating human rights!”",
            isBest: false,
            feedback: "Requesting a formal Individualized Health Plan through the school nurse and referencing CDC safety standards protects you legally.",
            xpBonus: 10,
          },
          {
            text: "“Medical guidelines from the AAP and CDC require sanitary products to be changed every four to eight hours to prevent severe bacterial infections like Toxic Shock Syndrome. Punishing students with detention for attending to involuntary biological needs violates health safety standards. I am requesting an individualized health plan accommodation for unrestricted restroom access without academic penalty.”",
            isBest: true,
            feedback: "✦ Institutional Advocacy Champion! Linking bathroom restrictions to AAP bacterial safety protocols provides the legal foundation for an Individualized Health Plan (IHP).",
            xpBonus: 30,
          },
        ],
      },
      {
        id: "factors-sim-3",
        title: "Language Equity & Title VI Healthcare Interpretation",
        phaseName: "3. Language Equity & Title VI",
        setting: "Community Health Clinic Reception",
        character: "Clinic Manager Vance",
        characterRole: "Clinic Administrator",
        statement: "“We don't have medical interpreters available today. You must bring a teenage sibling into the exam room to translate your pelvic examination and clinical history.”",
        evidence: {
          badge: "Civil Rights Mandate",
          title: "Title VI of the Civil Rights Act & HHS Office for Civil Rights Policy",
          metric: "Federal Prohibition on Using Minors or Family Members as Medical Interpreters",
          description: "Federal law requiring federally funded healthcare facilities to provide qualified, certified medical interpreters at zero cost to patients, explicitly barring reliance on family members.",
        },
        sourceCitation: {
          organization: "U.S. Department of Health and Human Services (HHS) Office for Civil Rights",
          guideline: "Section 1557 of the Affordable Care Act & Title VI Language Access Regulations",
          year: "2023",
          url: "https://www.hhs.gov/ocr",
        },
        options: [
          {
            text: "“Okay, I'll have my younger brother come in and translate my pelvic exam.”",
            isBest: false,
            feedback: "Using minor family members violates privacy, causes severe emotional distress, and leads to dangerous medical translation errors.",
            xpBonus: 5,
          },
          {
            text: "“Under Title VI of the Civil Rights Act and Section 1557 of the ACA, healthcare facilities are legally prohibited from requiring minor family members to translate confidential medical examinations. You are required to provide qualified telephone or video medical interpreter services at no cost to the patient. Please connect us with a certified interpreter before we begin.”",
            isBest: true,
            feedback: "✦ Civil Rights Mastery! Invoking Title VI and Section 1557 guarantees confidential, certified medical translation and protects patient dignity.",
            xpBonus: 30,
          },
          {
            text: "“This clinic is completely discriminatory and I'm suing you!”",
            isBest: false,
            feedback: "Stating the federal mandate for free telephone/video interpreter services prompts clinic staff to dial their language line immediately.",
            xpBonus: 10,
          },
        ],
      },
    ],

    conditions: [
      {
        id: "cond-sim-1",
        title: "Reproductive Options & Shared Decision-Making",
        phaseName: "1. Shared Decision-Making",
        setting: "Consultation on Reproductive Care Options",
        character: "Dr. Rivera",
        characterRole: "Reproductive Health Specialist",
        statement: "“At your age, I usually only prescribe the combined pill. Let's just write that prescription right now without confusing you with other options.”",
        evidence: {
          badge: "Decision Matrix",
          title: "Adolescent Contraception Shared Decision-Making Guide",
          metric: "Comparative Efficacy, Side Effects & Dosing Schedules Evaluated",
          description: "Clinical comparison grid showing Tier 1 (IUD/implant), Tier 2 (pill/patch/ring/shot), and Tier 3 barrier methods matched with patient preferences.",
        },
        sourceCitation: {
          organization: "American Academy of Pediatrics (AAP) & ACOG",
          guideline: "AAP Clinical Report: Contraception for Adolescents & ACOG Adolescent Practice Guidelines",
          year: "2022",
          url: "https://publications.aap.org/pediatrics/article/134/4/e1244/32971/Contraception-for-Adolescents",
        },
        options: [
          {
            text: "“Sure, whatever you think is simplest.”",
            isBest: false,
            feedback: "Shared decision-making requires understanding all available options, including progestin-only pills, rings, patches, implants, and IUDs.",
            xpBonus: 5,
          },
          {
            text: "“I would like to practice shared decision-making. Could we review the effectiveness, side effect profiles, and dosing schedules of different methods so I can choose what best matches my medical history and daily routine?”",
            isBest: true,
            feedback: "✦ Shared Decision-Making Champion! You asserted your autonomy as a patient to review the full spectrum of evidence-based choices.",
            xpBonus: 30,
          },
          {
            text: "“I don't trust pharmaceuticals at all, never mind.”",
            isBest: false,
            feedback: "Exploring options collaboratively with your provider ensures you find a solution tailored to your personal comfort and health goals.",
            xpBonus: 10,
          },
        ],
      },
      {
        id: "cond-sim-2",
        title: "Pelvic Pain Differential Diagnosis Workup",
        phaseName: "2. Structural Differential Diagnosis",
        setting: "Differential Diagnosis Consultation for Persistent Pelvic Aching",
        character: "Dr. Rivera",
        characterRole: "Reproductive Health Specialist",
        statement: "“Your pelvic discomfort is likely just muscular or irritable bowel symptoms. There is no reason to order any pelvic imaging or screening for structural reproductive conditions.”",
        evidence: {
          badge: "Diagnostic Algorithm",
          title: "Adolescent Chronic Pelvic Pain Structural Differential Algorithm",
          metric: "Evaluation for Obstructive Müllerian Anomalies, Adenomyosis & Cysts",
          description: "Clinical guidelines recommending high-resolution transabdominal and transperineal ultrasound to evaluate structural anomalies in adolescents with chronic pelvic pain.",
        },
        sourceCitation: {
          organization: "ACOG & North American Society for Pediatric and Adolescent Gynecology",
          guideline: "ACOG Practice Bulletin: Chronic Pelvic Pain & NASPAG Structural Evaluation Protocols",
          year: "2023",
          url: "https://www.acog.org",
        },
        options: [
          {
            text: "“Chronic pelvic pain in adolescents has diverse etiologies, including obstructive Müllerian anomalies, adenomyosis, and ovarian cysts. Clinical guidelines from ACOG recommend pelvic imaging to evaluate structural anatomy when pain persists. Can we order a dedicated pelvic ultrasound to rule out these anatomical causes?”",
            isBest: true,
            feedback: "✦ Diagnostic Thoroughness! Citing specific structural differentials like Müllerian variations provides the medical justification needed to schedule imaging.",
            xpBonus: 30,
          },
          {
            text: "“Okay, if you think it's just muscle aches, I'll take hot baths and stretch more.”",
            isBest: false,
            feedback: "Assuming pain is muscular overlooks potential congenital obstructive anomalies or early adenomyosis that benefit from early detection.",
            xpBonus: 5,
          },
          {
            text: "“You think I'm making this up! Why do you never believe patients?”",
            isBest: false,
            feedback: "Pairing your symptoms with specific anatomical conditions prompts the clinician to order appropriate imaging.",
            xpBonus: 10,
          },
        ],
      },
      {
        id: "cond-sim-3",
        title: "Second Opinion & Comprehensive Records Access",
        phaseName: "3. Second Opinion & Records Rights",
        setting: "Second Opinion Consultation Request",
        character: "Dr. Rivera",
        characterRole: "Reproductive Health Specialist",
        statement: "“If you're questioning my assessment, there's no other treatment modern medicine can offer you for this. Seeking another doctor will just waste your time.”",
        evidence: {
          badge: "Patient Rights",
          title: "HIPAA Right of Access (45 CFR § 164.524) & AMA Ethics",
          metric: "Complete Medical Records Copy · Formal Referral to Specialized Academic Center",
          description: "Statutory rights under HIPAA ensuring patients receive uninhibited access to all clinical notes, imaging, and lab reports, paired with AMA ethical protections for second opinions.",
        },
        sourceCitation: {
          organization: "American Medical Association (AMA) & HHS HIPAA Privacy Rule",
          guideline: "AMA Code of Medical Ethics: Opinions on Consultation and Second Opinions & 45 CFR § 164.524",
          year: "2023",
          url: "https://www.ama-assn.org",
        },
        options: [
          {
            text: "“I guess I'm stuck with this clinic then. I won't ask for a second opinion.”",
            isBest: false,
            feedback: "Never settle for a provider who discourages a second opinion. Medicine is collaborative and complex.",
            xpBonus: 5,
          },
          {
            text: "“You're the worst doctor I've ever seen and you're holding my health hostage!”",
            isBest: false,
            feedback: "Asserting your legal HIPAA rights to your complete chart records ensures an orderly and documented transition to a new specialist.",
            xpBonus: 10,
          },
          {
            text: "“Under the AMA Code of Medical Ethics, patients have the fundamental right to seek a second opinion. Under HIPAA, I am requesting a complete copy of my medical records, lab reports, and imaging today, alongside a formal referral to a specialized adolescent gynecologic center.”",
            isBest: true,
            feedback: "✦ Legal Empowerment Champion! Invoking the AMA Code of Medical Ethics and your federal HIPAA right of access ensures you control your medical data and transition to specialized care.",
            xpBonus: 30,
          },
        ],
      },
    ],
  };

  // If topic has custom multiple scenarios defined, use them
  if (topic.roleplayScenarios && topic.roleplayScenarios.length > 0) {
    return topic.roleplayScenarios;
  }

  // If topic has a single custom scenario, return it directly so the simulation precisely matches the lesson
  if (topic.roleplayScenario) {
    return [
      {
        ...topic.roleplayScenario,
        phaseName: topic.roleplayScenario.phaseName || "1. Self-Advocacy Simulation",
      },
    ];
  }

  return categoryScenarios[matchedCat] || categoryScenarios.body;
}

/**
 * Returns a single Roleplay Scenario (defaults to the first simulation in the multi-stage array).
 * Maintained for full backward compatibility across the application.
 */
export function getTopicRoleplayScenario(topic: HubTopic, categoryId?: string): RoleplayScenario {
  const scenarios = getTopicRoleplayScenarios(topic, categoryId);
  return scenarios[0];
}


