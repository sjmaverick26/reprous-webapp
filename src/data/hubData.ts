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
    description: "Puberty, hormones, anatomy, and body image — the foundational stuff.",
    colorSwatch: "#F0C25E",
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
    colorSwatch: "#F3C9C6",
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
    title: "Body Conditions",
    badge: "Body Conditions Pro",
    badgeDesc: "Mastered knowledge on reproductive health conditions, PCOS, endometriosis, and prenatal care.",
    description: "Pregnancy, postpartum health, endometriosis, PCOS, ovarian cysts.",
    colorSwatch: "#7A3B4E",
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
        name: "Symptom Sort",
        type: "game",
        desc: "Sort real symptoms from myths for PCOS and endometriosis.",
        xp: 75,
        summary: "Test your diagnostic knowledge by identifying classic hallmarks vs. widespread myths for PCOS and endometriosis.",
        keyTakeaways: [
          "PCOS involves hormonal imbalances (androgens, insulin resistance) and irregular ovulation.",
          "Endometriosis involves uterine-like tissue growing outside the uterus, causing chronic pain."
        ],
        gameType: "sort"
      },
      {
        id: "conditions-3",
        name: "Endometriosis",
        type: "article",
        desc: "Symptoms, diagnosis path, and living with it.",
        xp: 40,
        readTime: "5 min read",
        summary: "An in-depth look at endometriosis, why diagnosis often takes years, and effective management strategies.",
        keyTakeaways: [
          "Pain during periods, bowel movements, or intercourse should always be investigated.",
          "Hormonal therapies, pelvic physical therapy, and laparoscopy are standard management paths."
        ]
      },
      {
        id: "conditions-4",
        name: "PCOS",
        type: "lesson",
        desc: "What it is and questions worth asking a doctor.",
        xp: 50,
        readTime: "4 min read",
        summary: "Polycystic Ovary Syndrome (PCOS) affects 1 in 10 women and individuals with ovaries. Lifestyle adjustments and targeted medical support make it very manageable.",
        keyTakeaways: [
          "Common signs: irregular cycles, acne, excess facial/body hair, and scalp hair thinning.",
          "PCOS does not mean infertility; many people conceive naturally or with reproductive assistance."
        ]
      },
      {
        id: "conditions-5",
        name: "Ovarian Cysts",
        type: "article",
        desc: "Common, usually harmless — here's how to know.",
        xp: 40,
        readTime: "4 min read",
        summary: "Most ovarian cysts are functional (part of the normal ovulation cycle) and resolve on their own in 1–3 cycles.",
        keyTakeaways: [
          "Sudden sharp lower abdominal pain should always be evaluated in urgent care to rule out ovarian torsion."
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
    colorSwatch: "#F8D989",
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
    colorSwatch: "#F3C9C6",
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
    title: "Play Strong · Athlete Corner",
    badge: "Play Strong Athlete",
    badgeDesc: "Earned by mastering cycle-aware training, sports nutrition, and overtraining prevention.",
    description: "Reproductive health for active bodies — training, nutrition, cycle-aware performance.",
    colorSwatch: "#F0C25E",
    topics: [
      {
        id: "play-0",
        name: "Training Around Your Cycle",
        type: "lesson",
        desc: "Working with your body's rhythm, not against it.",
        xp: 50,
        readTime: "5 min read",
        summary: "Understanding how follicular (high energy, strength gains) and luteal phases (steady endurance, heat sensitivity) affect athletic performance.",
        keyTakeaways: [
          "Follicular phase: High insulin sensitivity and faster recovery make it ideal for high-intensity training.",
          "Luteal phase: Slightly higher core temperature means extra hydration and electrolyte intake is crucial."
        ]
      },
      {
        id: "play-1",
        name: "Fuel Up Quiz",
        type: "game",
        desc: "Quick-fire quiz on pre- and post-workout nutrition.",
        xp: 75,
        summary: "Test your sports nutrition knowledge for carbs, protein timing, iron intake, and hydration.",
        keyTakeaways: [
          "Adequate caloric intake prevents Relative Energy Deficiency in Sport (RED-S).",
          "Iron replenishment is essential for menstruating endurance athletes."
        ],
        gameType: "match"
      },
      {
        id: "play-2",
        name: "Nutrition for Active Bodies",
        type: "lesson",
        desc: "Fueling properly during every phase.",
        xp: 50,
        readTime: "4 min read",
        summary: "Carbohydrate availability, dietary fats for hormone production, and avoiding energy deficits in competitive sports.",
        keyTakeaways: [
          "Healthy fats (avocados, nuts, olive oil) are structural building blocks for steroid hormones.",
          "Under-eating damages bone density, immunity, and athletic performance."
        ]
      },
      {
        id: "play-3",
        name: "Recognizing Overtraining Signs",
        type: "article",
        desc: "When missed periods or fatigue mean it's time to check in.",
        xp: 40,
        readTime: "4 min read",
        summary: "The Female Athlete Triad and RED-S: why losing your period is a warning sign of bone and metabolic stress, not a trophy of hard training.",
        keyTakeaways: [
          "Amenorrhea (missed periods) in athletes requires adjusting training volume and nutritional intake.",
          "Rest days are where actual muscle repair and adaptation occur."
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
    colorSwatch: "#7A3B4E",
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
