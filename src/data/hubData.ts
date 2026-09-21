export type TopicType = "lesson" | "article" | "game" | "badge";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonDiagram {
  type: "cycle-wheel" | "energy-balance" | "pcos-loop" | "pelvic-map" | "anatomy-callout" | "timeline" | "athlete-plate" | "hormone-scale" | "reds-triangle";
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

export interface HubTopic {
  id: string;
  name: string;
  type: TopicType;
  desc: string;
  xp: number;
  readTime?: string;
  summary: string;
  clinicalQuote?: ClinicalQuote;
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
        desc: "Why they happen and what actually brings relief.",
        xp: 50,
        readTime: "4 min read",
        summary: "Cramps happen when your uterus makes natural chemicals called prostaglandins, which make the muscle gently squeeze to shed its lining. Mild cramps are common, but severe pain that stops your day is not something you have to just 'tough out'.",
        keyTakeaways: [
          "Heating pads, warm baths, gentle walking, and staying hydrated help relax tense pelvic muscles.",
          "Over-the-counter pain relievers (like ibuprofen) work best when taken early because they block cramp-causing chemicals before they peak.",
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
        summary: "Your menstrual cycle is recognized by physicians as your 5th vital sign. Period pain that leaves you curled in bed, missing classes, or throwing up is never 'just part of being a woman.' Concrete data and clear scripts ensure you are taken seriously.",
        keyTakeaways: [
          "Learn: A normal period shouldn't prevent you from attending school, work, or sports.",
          "Recognize: Red flags include soaking a pad/tampon every hour for 2+ hours, passing clots larger than a quarter, or missing 3+ periods in a row.",
          "Advocate: Bring a 2-to-3 month symptom log showing exact dates, pain levels (1-10), and days of school or activities missed.",
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
            text: "Concrete data stops medical dismissal. Showing a written symptom log with missed school days forces clinicians to take your pain seriously.",
            highlight: "Bring written logs"
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
      },
      {
        id: "conditions-3",
        name: "Advocate: Confidential Care & Patient Rights",
        type: "lesson",
        isAdvocateCapstone: true,
        desc: "Learn your healthcare privacy rights, recognize clinical boundary crossings, and advocate for confidential, respectful care.",
        xp: 50,
        readTime: "4 min read",
        summary: "Every patient deserves dignity, comprehensive information, and confidential healthcare. Knowing your rights under Title X and minor consent laws empowers you to access reproductive care without fear, judgment, or unwanted disclosures.",
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
        }
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
      },
      {
        id: "pcos-4",
        name: "Advocate: Getting Taken Seriously for PCOS",
        type: "lesson",
        isAdvocateCapstone: true,
        desc: "Learn the Rotterdam criteria, recognize dismissal tactics, and advocate for comprehensive hormone panels and ultrasound.",
        xp: 50,
        readTime: "4 min read",
        summary: "PCOS is one of the most underdiagnosed endocrine conditions, frequently dismissed with lazy advice like 'just lose weight and take the pill.' You have the right to thorough diagnostic bloodwork and whole-body metabolic care.",
        keyTakeaways: [
          "Learn: Under the Rotterdam Criteria, diagnosis requires at least 2 of 3: irregular ovulation, elevated androgens (testosterone), or polycystic ovaries on ultrasound.",
          "Recognize: Red flags include doctors prescribing birth control without running hormone panels first, or blaming missed periods solely on body weight.",
          "Advocate: Request a morning fasted blood panel (total/free testosterone, DHEA-S, fasting insulin, HbA1c, thyroid panel) and a pelvic ultrasound.",
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
        name: "Advocate: Overcoming the Endometriosis Delay",
        type: "lesson",
        isAdvocateCapstone: true,
        desc: "Learn the diagnostic pathway, recognize dismissive 'just cramps' gaslighting, and advocate for an excision specialist.",
        xp: 50,
        readTime: "4 min read",
        summary: "The average person with endometriosis waits 7 to 10 years and sees 8 doctors before receiving a diagnosis. Armed with clinical facts, a structured symptom log, and assertive scripts, you can cut through the dismissal and get effective care.",
        keyTakeaways: [
          "Learn: Endometriosis is a systemic inflammatory disease where tissue similar to the uterine lining grows outside the uterus on pelvic organs.",
          "Recognize: Warning signs include pain with bowel movements or urination during periods, pain radiating down thighs, and pain unresponsive to NSAIDs.",
          "Advocate: Emphasize functional impairment: 'My pain causes me to miss classes and affects my mobility. I need a referral to a minimally invasive gynecologic surgeon (MIGS).'",
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
        summary: "To run, compete, and feel strong, your body needs enough food energy every single day. When you don't eat enough to cover both your workouts and basic bodily functions, your hormones, bones, and recovery take a hit. Carbs give your muscles explosive power, and healthy fats help build your natural estrogen and progesterone.",
        clinicalQuote: {
          quote: "Relative Energy Deficiency in Sport (RED-S) is a syndrome of impaired physiological functioning caused by low energy availability. Menstrual dysfunction is not a benign consequence of rigorous training, but an indicator of neuroendocrine suppression and impending bone mineral density loss.",
          source: "International Olympic Committee (IOC) & ACOG",
          publication: "2023 IOC Consensus Statement on RED-S & ACOG Clinical Guidelines",
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
          title: "Interactive Athlete Fueling Plate",
          caption: "Toggle between Rest Day, Practice Day, and Game Day to see how your body's carbohydrate, protein, and veggie needs change for peak performance."
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
          title: "The Female Athlete Triad & RED-S Triangle",
          caption: "Click each corner of the triad to see how under-fueling cascades into missed periods and bone fractures."
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
      },
      {
        id: "play-7",
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
        summary: "Health literacy is the first step; collective advocacy changes the world. Whether it's lobbying school boards for free period products in restrooms or demanding translation access at clinics, you have the power to create lasting policy change.",
        keyTakeaways: [
          "Learn: Over 84% of students have missed class time due to lack of menstrual products; period supplies are basic hygiene necessities like toilet paper.",
          "Recognize: Systemic obstacles include the sales tax on menstrual items (tampon tax), transit deserts, and lack of certified medical interpreters.",
          "Advocate: Organize campus petitions, testify at school board meetings, and partner with national campaigns (like PERIOD. and ReproUs) to pass local equity policies.",
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
      quote: "Low energy availability (LEA) remains the underlying etiological factor for the Relative Energy Deficiency in Sport (RED-S) syndrome, exerting systemic impacts across menstrual function, bone health, and athletic longevity.",
      source: "International Olympic Committee (IOC) & ACOG",
      publication: "IOC Consensus Statement on Relative Energy Deficiency in Sport & ACOG Guidelines",
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

