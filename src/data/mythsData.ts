export interface MythSource {
  title: string;
  organization: string;
  guidelineNumber?: string;
  url?: string;
  citationYear?: string;
  keyFinding?: string;
}

export interface MythItem {
  id: string;
  category: "pain" | "cycles" | "athletes" | "pcos" | "fertility" | "stis" | "hygiene";
  categoryLabel: string;
  myth: string;
  quickFact: string;
  explanation: string;
  takeaways: string[];
  source: MythSource;
  learnCategory?: string;
  learnCategoryLabel?: string;
}

export const MYTHS_DATA: MythItem[] = [
  {
    id: "myth-severe-pain",
    category: "pain",
    categoryLabel: "Periods & Pain",
    myth: "Severe period pain is always normal.",
    quickFact: "Mild cramps are common, but pain that keeps you in bed, makes you miss school or sports, or doesn't ease with basic pain relievers is NOT just 'part of having a period.' It is a medical sign that deserves a real checkup.",
    explanation: "It is normal to feel mild to moderate cramps right before or during your period as your uterus contracts. But if cramps are so intense that you miss class, cancel plans, feel nauseous, or find that standard painkillers like ibuprofen do nothing, that pain isn't 'just cramps.' Doctors recognize severe pain as a key sign of underlying conditions like endometriosis, where tissue similar to the uterine lining grows outside the uterus and causes deep inflammation.\n\nToo many young people are told to 'just tough it out,' waiting 7 to 10 years on average before getting properly diagnosed. You never have to earn your pain or suffer in silence. If cramps interfere with your everyday life, that is your body giving you important health data, and a healthcare provider can help you find real relief.",
    takeaways: [
      "Normal cramps respond to warmth and mild pain relievers. Pain that disrupts your daily routine is a clinical warning sign.",
      "Endometriosis affects roughly 1 in 10 women and teens, but diagnosis is often delayed because pain gets brushed off.",
      "Getting evaluated early prevents years of unnecessary suffering and protects your long-term reproductive health."
    ],
    source: {
      title: "Dysmenorrhea and Endometriosis in the Adolescent",
      organization: "American College of Obstetricians and Gynecologists (ACOG)",
      guidelineNumber: "ACOG Committee Opinion No. 760",
      citationYear: "2018 (Reaffirmed 2023)",
      keyFinding: "ACOG advises that any teen with severe period cramps that do not improve with first-line treatments should be evaluated for endometriosis right away, rather than told to wait.",
      url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/12/dysmenorrhea-and-endometriosis-in-the-adolescent"
    },
    learnCategory: "endo",
    learnCategoryLabel: "Endometriosis & Pain"
  },
  {
    id: "myth-missing-period-stress",
    category: "cycles",
    categoryLabel: "Cycle Irregularity",
    myth: "Missing your period is always caused by stress.",
    quickFact: "A stressful week can delay your cycle for a few days, but missing multiple periods is your body waving a red flag about your hormones, nutrition, or overall health.",
    explanation: "When you are dealing with intense emotional stress or lack of sleep, your brain releases stress hormones (like cortisol) that can temporarily hit pause on ovulation. That is why your period might arrive a week or two late during finals or a tough personal time.\n\nHowever, blaming every missed period on stress can cause people to overlook other treatable medical conditions. Missing periods (amenorrhea) can happen when your body isn't getting enough food for your activity level (RED-S), from hormonal conditions like PCOS, from thyroid problems, or from sudden weight changes. If you miss 3 periods in a row, or if your cycle has been missing for over 90 days, it's time to see a doctor for simple blood work to find out what's going on.",
    takeaways: [
      "Stress can cause a short delay, but ongoing missed periods usually have an underlying biological cause.",
      "In active teens and athletes, not eating enough calories for your training is one of the top reasons cycles stop.",
      "Missing 3 cycles in a row (secondary amenorrhea) means you should get a medical checkup to review your hormone levels."
    ],
    source: {
      title: "Evaluation and Management of Secondary Amenorrhea in Adolescents",
      organization: "The Endocrine Society & American Academy of Pediatrics (AAP)",
      guidelineNumber: "Clinical Practice Guideline on Hypothalamic & Endocrine Amenorrhea",
      citationYear: "2020",
      keyFinding: "Endocrine specialists advise that missing a period for 90 days or more should never be written off as 'just stress' without testing hormone levels, thyroid function, and nutrition.",
      url: "https://www.endocrine.org/clinical-guidance-statements"
    },
    learnCategory: "cycle",
    learnCategoryLabel: "Cycle Sense"
  },
  {
    id: "myth-athlete-period-loss",
    category: "athletes",
    categoryLabel: "Female Athlete Health",
    myth: "Losing your period is just a badge of honor for being a dedicated athlete.",
    quickFact: "Losing your period does not mean you are working harder or in elite shape — it means your body does not have enough energy to survive your workouts, putting your bones at serious risk.",
    explanation: "In sports like distance running, gymnastics, soccer, and cheer, people historically glorified losing one's period as proof of extreme training dedication or low body fat. Medical consensus has completely dismantled this dangerous myth. When you burn way more energy training than you take in through food, your brain goes into emergency power-saving mode. It shuts down your reproductive hormones (estrogen and progesterone) to save energy for your heart and muscles.\n\nDoctors call this Relative Energy Deficiency in Sport (RED-S). When estrogen drops, your body stops building bone. Between ages 12 and 22, you build over 90% of your lifetime bone strength. Losing your period during these years makes bones brittle, spikes your risk of stress fractures by over 400%, and slows down muscle recovery. A regular period is an athlete's superpower — proof that your body is fueled and ready to perform.",
    takeaways: [
      "A missing period in an athlete is a metabolic distress signal, not a badge of honor.",
      "Low estrogen from under-fueling permanently weakens your bones during the crucial teen and early 20s window.",
      "Fueling with enough carbs and healthy fats restores your hormones, speeds up recovery, and makes you a stronger athlete."
    ],
    source: {
      title: "International Olympic Committee (IOC) Consensus Statement on Relative Energy Deficiency in Sport (RED-S)",
      organization: "British Journal of Sports Medicine (BJSM) & IOC Medical Commission",
      guidelineNumber: "IOC Consensus Statement (2023 Update)",
      citationYear: "2023",
      keyFinding: "The IOC warns that missing periods in athletes are a direct sign of low energy availability and must be treated early to avoid permanent bone loss and muscle breakdown.",
      url: "https://bjsm.bmj.com"
    },
    learnCategory: "play",
    learnCategoryLabel: "Female Athlete Health"
  },
  {
    id: "myth-pcos-infertility",
    category: "pcos",
    categoryLabel: "PCOS & Hormones",
    myth: "PCOS means you are infertile and will never be able to have children.",
    quickFact: "PCOS means ovulation happens unpredictably, NOT that you cannot have kids. Most people with PCOS have plenty of healthy eggs and can conceive naturally or with straightforward medical support.",
    explanation: "Polycystic Ovary Syndrome (PCOS) is a common hormonal balance condition. In people with PCOS, higher levels of hormones called androgens and insulin make the ovaries release eggs on an irregular schedule. Because ovulation does not happen like clockwork every 28 days, it can be harder to time pregnancy without tracking.\n\nHere is the reassuring truth: people with PCOS typically have a large supply of healthy eggs. With balanced nutrition, blood sugar management, cycle tracking, and safe medications that help the body ovulate on schedule (like letrozole), people with PCOS have just as many successful pregnancies as anyone else. A PCOS diagnosis is never a closed door to having a family.",
    takeaways: [
      "PCOS affects the timing of ovulation, not your ability to have a baby.",
      "People with PCOS usually have strong egg reserves and respond very well to lifestyle and medical support.",
      "Learning about your hormones early gives you the tools to take charge of your health long before you ever decide to have children."
    ],
    source: {
      title: "International Evidence-Based Guideline for the Assessment and Management of Polycystic Ovary Syndrome",
      organization: "Monash University, ESHRE & The Endocrine Society",
      guidelineNumber: "International PCOS Guideline (3rd Edition)",
      citationYear: "2023",
      keyFinding: "Global fertility guidelines confirm that with standard medical care and lifestyle adjustments, lifetime pregnancy rates for people with PCOS match those of the general population.",
      url: "https://www.monash.edu/medicine/mchri/pcos"
    },
    learnCategory: "pcos",
    learnCategoryLabel: "PCOS & Hormonal Health"
  },
  {
    id: "myth-pregnancy-period",
    category: "fertility",
    categoryLabel: "Pregnancy & Fertility",
    myth: "You can't get pregnant if you have sex during your period.",
    quickFact: "While it is less common, it is definitely biologically possible. Sperm can live inside your body for up to 5 days, so if you ovulate early, pregnancy can happen.",
    explanation: "Many people think that bleeding means pregnancy is impossible. While menstrual bleeding is the shedding of the uterine lining after an unfertilized egg, our bodies do not always follow a predictable 28-day calendar.\n\nIf you have shorter cycles (for example, 21 to 24 days), you might ovulate just a few days after your period starts. Here is the key: healthy sperm can survive inside fertile cervical fluid for up to 5 full days (120 hours). If you have sex near the end of your bleeding, those sperm could still be alive and waiting when your ovary releases an egg. Counting on your period as birth control is risky and has caused many unexpected pregnancies.",
    takeaways: [
      "Sperm can survive inside the reproductive tract for up to 5 days waiting for an egg.",
      "If your cycle is short or irregular, ovulation can happen right after your period ends.",
      "Using condoms or reliable birth control is the only way to prevent unplanned pregnancy and protect against STIs."
    ],
    source: {
      title: "Clinical Consensus on Reproductive Physiology and Fertility Window Dynamics",
      organization: "American College of Obstetricians and Gynecologists (ACOG)",
      guidelineNumber: "ACOG Clinical Review & Patient Education Series",
      citationYear: "2021",
      keyFinding: "ACOG points out that because cycle lengths vary and sperm can survive for 5 days, having sex during menstrual bleeding still carries a real chance of pregnancy.",
      url: "https://www.acog.org"
    },
    learnCategory: "conditions",
    learnCategoryLabel: "Pregnancy & Reproductive Care"
  },
  {
    id: "myth-sti-symptoms",
    category: "stis",
    categoryLabel: "STIs & Prevention",
    myth: "You will always know right away if you have an STI.",
    quickFact: "Most common STIs — including chlamydia, HPV, and gonorrhea — have zero symptoms in up to 70% to 85% of cases. You can feel 100% healthy and still have an infection.",
    explanation: "Movies and health class often make it seem like a Sexually Transmitted Infection (STI) always causes obvious symptoms, like painful burning, visible bumps, or unusual discharge. In reality, the most common STIs are completely quiet. About 75% of females and 50% of males with chlamydia have no symptoms at all for months or even years.\n\nBecause you cannot feel or see them, untreated STIs can silently cause inflammation, scarring in your reproductive organs (pelvic inflammatory disease), and chronic pain. The good news is that testing is fast, painless (usually just a simple urine sample or self-swab), and most STIs are easily cured with antibiotics. Routine testing is just normal, responsible self-care.",
    takeaways: [
      "Up to 85% of common STI cases show no noticeable symptoms or warning signs.",
      "An infection without symptoms can still be passed to partners and cause internal scarring over time.",
      "Annual confidential testing is quick, painless, and recommended for all sexually active people under 25."
    ],
    source: {
      title: "Sexually Transmitted Infections Treatment Guidelines & Adolescent Screening Protocols",
      organization: "Centers for Disease Control and Prevention (CDC)",
      guidelineNumber: "CDC MMWR Recommendations and Reports",
      citationYear: "2021 (Updated 2024)",
      keyFinding: "The CDC urges annual screening for all sexually active women under 25 because the majority of chlamydia and gonorrhea cases show zero symptoms.",
      url: "https://www.cdc.gov/std/treatment-guidelines/"
    },
    learnCategory: "realtalk",
    learnCategoryLabel: "Real Talk"
  },
  {
    id: "myth-pill-fertility",
    category: "fertility",
    categoryLabel: "Contraception & Fertility",
    myth: "Taking birth control pills permanently damages your future fertility.",
    quickFact: "Birth control pills do not damage your fertility or waste your eggs. Once you stop taking them, your natural cycle returns, and pregnancy rates are identical to people who never took the pill.",
    explanation: "Studies following hundreds of thousands of people over decades have shown that birth control pills do not cause long-term infertility. The pill works like a temporary pause button on ovulation. Once you stop taking the pills, the hormones leave your system within just a couple of days, and your ovaries wake back up.\n\nWithin 12 months of stopping the pill, about 85% of people trying to conceive get pregnant — exactly the same percentage as people who never used hormonal birth control. If your period takes a few months to show up after stopping, it is usually because the pill was masking an underlying condition you already had before starting it (like PCOS or under-fueling).",
    takeaways: [
      "Contraceptive hormones leave your body within days and do not build up inside you.",
      "Pregnancy rates after stopping birth control are the exact same as people who never took it.",
      "If cycles are irregular after stopping, it usually reveals an existing cycle condition that the pill was temporarily managing."
    ],
    source: {
      title: "Fertility After Discontinuation of Contraception: A Systematic Review and Meta-Analysis",
      organization: "American Society for Reproductive Medicine (ASRM) & Contraception",
      guidelineNumber: "Systematic Review & Clinical Meta-Analysis",
      citationYear: "2020",
      keyFinding: "A massive review of clinical trials by ASRM found that pregnancy rates within one year of stopping birth control are completely normal and match non-users.",
      url: "https://www.asrm.org"
    },
    learnCategory: "conditions",
    learnCategoryLabel: "Pregnancy & Reproductive Care"
  },
  {
    id: "myth-tampons-tms",
    category: "hygiene",
    categoryLabel: "Menstrual Hygiene",
    myth: "Using tampons or menstrual cups is dangerous and damages internal organs.",
    quickFact: "When used with basic hygiene, internal period products are medical-grade, flexible, and completely safe. They cannot get lost inside you or damage your organs.",
    explanation: "A lot of worry about tampons or cups comes from not being taught how our bodies work, or hearing scary stories about Toxic Shock Syndrome (TSS). The vaginal canal is a soft, flexible muscular tube with folds of tissue designed to gently stretch and hold a tampon or cup. There is also a tiny opening at the cervix that prevents anything from getting 'lost' inside your body.\n\nWhile TSS is a real bacterial infection, strict FDA safety rules passed in the 1980s (which banned dangerous synthetic fibers) and basic hygiene habits have made it extremely rare today (only about 1 to 3 cases per 100,000 people). As long as you wash your hands, change your tampon every 4 to 8 hours, and clean your cup properly, internal products are safe and practical.",
    takeaways: [
      "The vagina is naturally stretchy and elastic; tampons and cups cannot get lost or damage internal organs.",
      "Changing tampons every 4 to 8 hours and washing hands makes bacterial risks like TSS exceptionally rare.",
      "There is no 'right' product — use whatever combination of pads, tampons, cups, or period underwear feels best for you."
    ],
    source: {
      title: "Menstrual Tampons and Pads: Information for Premarket Notification Submissions",
      organization: "U.S. Food and Drug Administration (FDA) & The Lancet Public Health",
      guidelineNumber: "FDA Medical Device Guidance",
      citationYear: "2020",
      keyFinding: "FDA medical device evaluations confirm that changing internal products every 4 to 8 hours and keeping hands clean keeps bacterial risks extremely low and ensures high safety.",
      url: "https://www.fda.gov"
    },
    learnCategory: "body",
    learnCategoryLabel: "Body Basics"
  },
  {
    id: "myth-pms-mood",
    category: "pain",
    categoryLabel: "Periods & Pain",
    myth: "PMS mood swings and exhaustion are just 'being dramatic' or in your head.",
    quickFact: "Pre-menstrual symptoms are caused by real neurological and hormonal shifts as progesterone drops right before your period. Severe mood shifts (PMDD) are recognized medical conditions, not an attitude problem.",
    explanation: "During the week before your period (the late luteal phase), your body experiences a steep drop in both estrogen and progesterone. In many people, this hormonal drop directly affects neurotransmitters in the brain like serotonin, which regulates mood, sleep, and appetite. This is why you might feel irritable, unusually tired, or tearful — it is biological, not imaginary.\n\nFor about 3% to 8% of people, these pre-period shifts are severe and disruptive, a condition known as Premenstrual Dysphoric Disorder (PMDD). PMDD is officially recognized by medical organizations as a neuro-endocrine condition. If your pre-period mood changes make it difficult to function, you don't have to suffer through it — lifestyle adjustments, therapy, and safe medications can make a huge difference.",
    takeaways: [
      "Pre-menstrual mood changes are triggered by rapid drops in progesterone and brain serotonin, not a personality flaw.",
      "Premenstrual Dysphoric Disorder (PMDD) is a recognized medical condition with proven treatments.",
      "Tracking your cycle and symptoms helps you plan ahead and gives your doctor clear data to help you feel better."
    ],
    source: {
      title: "Premenstrual Dysphoric Disorder: Clinical Assessment and Evidence-Based Management",
      organization: "American College of Obstetricians and Gynecologists (ACOG)",
      guidelineNumber: "ACOG Clinical Practice Guideline No. 15",
      citationYear: "2023",
      keyFinding: "ACOG confirms that premenstrual mood symptoms have a distinct biological basis related to brain serotonin sensitivity, and recommends symptom tracking and targeted therapies.",
      url: "https://www.acog.org"
    },
    learnCategory: "cycle",
    learnCategoryLabel: "Cycle Sense"
  },
  {
    id: "myth-plan-b-abortion",
    category: "fertility",
    categoryLabel: "Contraception & Fertility",
    myth: "Emergency contraception ('Plan B') is the exact same thing as an abortion pill.",
    quickFact: "Emergency contraception prevents pregnancy before it happens by delaying ovulation. It cannot end an existing pregnancy or harm an established embryo.",
    explanation: "There is a widespread misconception that taking emergency contraception (like Plan B One-Step or generic levonorgestrel) causes an abortion. In reality, emergency contraceptive pills work through a completely different biological mechanism. They deliver a concentrated dose of a hormone that delays or prevents an ovary from releasing an egg.\n\nIf ovulation has already happened and an egg has already fertilized and implanted in the uterus, emergency contraception has zero effect. It cannot interrupt or terminate an established pregnancy, and studies prove it does not harm a developing pregnancy. Medically and legally, emergency contraception is birth control, not abortion.",
    takeaways: [
      "Emergency contraception works by delaying ovulation so sperm never meet an egg.",
      "Emergency contraception has no effect if an egg is already implanted and cannot cause an abortion.",
      "Emergency pills work best when taken as soon as possible after unprotected sex (within 72 hours)."
    ],
    source: {
      title: "Emergency Contraception: Practice Bulletin No. 152",
      organization: "American College of Obstetricians and Gynecologists (ACOG) & FDA",
      guidelineNumber: "ACOG Practice Bulletin No. 152",
      citationYear: "2022",
      keyFinding: "The FDA and ACOG establish that emergency contraception acts prior to fertilization by preventing ovulation, and does not intercept or terminate an established pregnancy.",
      url: "https://www.acog.org"
    },
    learnCategory: "conditions",
    learnCategoryLabel: "Pregnancy & Reproductive Care"
  }
];
