export type TopicType = "lesson" | "article" | "game" | "badge";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
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
        quiz: [
          {
            question: "What is the typical age range when puberty begins?",
            options: ["Strictly at age 12 for everyone", "Anywhere between 8 and 14+", "Only after age 16", "Between 5 and 7"],
            correctIndex: 1,
            explanation: "Puberty timelines vary widely based on genetics and health, typically starting between 8 and 14+."
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
        name: "Period Basics",
        type: "lesson",
        desc: "What's typical, what's a range, and what to actually expect.",
        xp: 50,
        readTime: "4 min read",
        summary: "The menstrual cycle averages 21–35 days. Menstruation is the shedding of the uterine lining when pregnancy hasn't occurred.",
        keyTakeaways: [
          "Bleeding typically lasts 3 to 7 days.",
          "Flow can range from light spotting to heavier days; total blood loss is usually just 2 to 3 tablespoons.",
          "Color ranges normally from bright red to deep brown or rust."
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
        name: "PCOS Fundamentals",
        type: "lesson",
        desc: "What it is, common signs, and evidence-based next steps.",
        xp: 50,
        readTime: "4 min read",
        summary: "Polycystic Ovary Syndrome affects roughly 1 in 10 individuals with ovaries. Key markers include irregular ovulation, elevated androgens, and metabolic factors.",
        keyTakeaways: [
          "Common hallmarks include irregular periods, hormonal acne, and excess hair growth.",
          "Lifestyle adjustments and targeted medical support make PCOS highly manageable."
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
        name: "What Is Endometriosis?",
        type: "lesson",
        desc: "Symptoms, diagnosis journey, and whole-body impacts.",
        xp: 50,
        readTime: "5 min read",
        summary: "Endometriosis occurs when tissue similar to the lining of the uterus grows outside the uterus, causing localized inflammation and chronic pain.",
        keyTakeaways: [
          "Pain during periods, bowel movements, or intercourse warrants thorough medical investigation.",
          "Laparoscopy and high-resolution imaging by specialists are current diagnostic standards."
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
        name: "Nutrition & Fueling Active Bodies",
        type: "lesson",
        desc: "Sports nutrition: energy availability, carbs, and fats for hormones.",
        xp: 50,
        readTime: "5 min read",
        summary: "To train and compete sustainably, active bodies require adequate energy availability (EA). Under-fueling puts stress on reproductive hormones, metabolism, and immune defenses. Carbohydrates power high-intensity muscular work, while healthy dietary fats provide the necessary building blocks for estrogen and progesterone.",
        keyTakeaways: [
          "Energy availability (EA) = dietary energy intake minus exercise energy expenditure normalized to lean mass.",
          "Complex carbohydrates are the primary fuel for muscle glycogen; cutting carbs impairs athletic power and mental focus.",
          "Dietary fats (nuts, seeds, olive oil, avocados) are essential precursors for female steroid hormone production.",
          "Consistently eating too little triggers Relative Energy Deficiency in Sport (RED-S), stalling growth and performance."
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
