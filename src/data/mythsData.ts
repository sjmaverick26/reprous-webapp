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
    quickFact: "Debilitating menstrual pain is not a personal flaw or just 'part of having a period' — severe pain is real medical data that warrants thorough clinical evaluation.",
    explanation: "While mild to moderate uterine cramping (primary dysmenorrhea) caused by prostaglandins is common and typically manageable with warmth and standard anti-inflammatories, pain that disrupts your life is not normal. Severe cramps that cause you to miss school, athletic practices, work, or social activities, or that do not respond to over-the-counter NSAIDs like ibuprofen, are red flags for secondary dysmenorrhea. This includes conditions such as endometriosis, adenomyosis, or pelvic anomalies. Young people often suffer in silence for 7 to 10 years before receiving an accurate diagnosis because their pain was dismissed as 'normal cramps.' You deserve to be heard, believed, and evaluated by an adolescent gynecologist or reproductive health specialist.",
    takeaways: [
      "Normal period cramps respond to mild anti-inflammatories; pain that causes school or sport absences is a clinical warning sign.",
      "Endometriosis affects approximately 1 in 10 adolescents and women, yet diagnostic delay averages 7 to 10 years due to dismissed symptoms.",
      "Early evaluation and treatment prevent years of unnecessary pain and protect future reproductive well-being."
    ],
    source: {
      title: "Dysmenorrhea and Endometriosis in the Adolescent",
      organization: "American College of Obstetricians and Gynecologists (ACOG)",
      guidelineNumber: "ACOG Committee Opinion No. 760",
      citationYear: "2018 (Reaffirmed 2023)",
      keyFinding: "Adolescent dysmenorrhea that is severe, progressive, or unresponsive to first-line therapy should be treated as suspected endometriosis until proven otherwise.",
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
    quickFact: "While severe acute stress can temporarily delay ovulation, there are numerous distinct biological causes for missed periods — and persistent changes warrant medical evaluation.",
    explanation: "Acute emotional or psychological stress elevates cortisol and corticotropin-releasing hormone, which can temporarily suppress hypothalamic gonadotropin-releasing hormone (GnRH) and delay ovulation. However, automatically assuming every missed period is 'just stress' is risky and can delay diagnosis of treatable medical conditions. Missing periods (amenorrhea) can stem from Relative Energy Deficiency in Sport (RED-S), Polycystic Ovary Syndrome (PCOS), thyroid dysfunction (hypo- or hyperthyroidism), elevated prolactin levels, rapid weight changes, or medication side effects. If you have missed three consecutive periods or your cycle has been irregular for more than 3 to 6 months, an endocrine and clinical evaluation is essential to identify the root cause and safeguard bone density and cardiovascular health.",
    takeaways: [
      "Stress is only one potential factor among endocrine, metabolic, nutritional, and anatomical causes.",
      "Missing periods in active individuals is frequently caused by inadequate calorie intake relative to energy burned (RED-S).",
      "Missing 3 consecutive cycles (secondary amenorrhea) requires a medical evaluation, blood tests, and hormone screening."
    ],
    source: {
      title: "Evaluation and Management of Secondary Amenorrhea in Adolescents",
      organization: "The Endocrine Society & American Academy of Pediatrics (AAP)",
      guidelineNumber: "Clinical Practice Guideline on Hypothalamic & Endocrine Amenorrhea",
      citationYear: "2020",
      keyFinding: "Amenorrhea exceeding 90 days in post-menarchal adolescents should never be attributed solely to stress without comprehensive hormonal, thyroid, and metabolic workup.",
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
    quickFact: "Losing your menstrual cycle as an athlete is never a sign of elite fitness — it is a serious sign of under-fueling (RED-S) that irreversibly weakens bones and impairs athletic performance.",
    explanation: "In endurance, aesthetic, and competitive sports, losing one's period (exercise-associated amenorrhea) was historically glorified as proof of extreme training dedication or low body fat. Medical consensus has completely dismantled this dangerous belief. When athletic energy expenditure outpaces dietary intake, the brain's hypothalamus conserves energy by down-regulating estrogen and progesterone production. This condition, known as Relative Energy Deficiency in Sport (RED-S), leads to rapid bone demineralization, increases bone stress injury risk by up to 450%, impairs muscle protein synthesis, disrupts sleep, and compromises cardiovascular health. A consistent menstrual cycle is considered the fifth vital sign of athletic recovery and longevity.",
    takeaways: [
      "Amenorrhea in athletes is a metabolic distress signal indicating low energy availability, not a badge of honor.",
      "Peak lifetime bone mass is deposited between ages 12 and 22; losing cycles during these years causes irreversible osteopenia or osteoporosis.",
      "Re-fueling with sports dietitians and medical teams restores hormonal balance, strengthens bones, and enhances athletic power."
    ],
    source: {
      title: "International Olympic Committee (IOC) Consensus Statement on Relative Energy Deficiency in Sport (RED-S)",
      organization: "British Journal of Sports Medicine (BJSM) & IOC Medical Commission",
      guidelineNumber: "IOC Consensus Statement (2023 Update)",
      citationYear: "2023",
      keyFinding: "Menstrual dysfunction in exercising females signals inadequate energy availability; early intervention is essential to prevent permanent skeletal and systemic consequences.",
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
    quickFact: "PCOS causes ovulatory unpredictability, not sterility. The vast majority of people with PCOS can conceive naturally or with straightforward medical and lifestyle support.",
    explanation: "Polycystic Ovary Syndrome (PCOS) is primarily a hormonal and metabolic condition characterized by elevated androgens, insulin resistance, and irregular follicular development. Because ovulation occurs unpredictably, conceiving without tracking or support can take longer. However, people with PCOS generally have high ovarian reserves with many viable eggs. With nutritional approaches, insulin management, cycle tracking, and safe, first-line ovulation-induction medications like letrozole, cumulative pregnancy rates for individuals with PCOS are comparable to those without the condition. Receiving a PCOS diagnosis is not a closed door to family planning.",
    takeaways: [
      "PCOS leads to irregular ovulation timing, not permanent infertility or lack of eggs.",
      "Evidence-based lifestyle strategies, insulin stabilization, and oral medications yield high pregnancy success rates.",
      "Early education allows young people with PCOS to manage their metabolic and reproductive health proactively."
    ],
    source: {
      title: "International Evidence-Based Guideline for the Assessment and Management of Polycystic Ovary Syndrome",
      organization: "Monash University, ESHRE & The Endocrine Society",
      guidelineNumber: "International PCOS Guideline (3rd Edition)",
      citationYear: "2023",
      keyFinding: "With appropriate evidence-based lifestyle and medical support, cumulative pregnancy rates for individuals with PCOS are comparable to the general population.",
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
    quickFact: "While pregnancy during menses is less likely, sperm can survive inside the reproductive tract for up to 5 days, making conception biologically possible with early ovulation.",
    explanation: "Menstrual bleeding typically signals that an unfertilized egg from the previous cycle has triggered the shedding of the uterine lining. However, cycle lengths fluctuate naturally. In individuals with shorter menstrual cycles (e.g., 21 to 24 days), ovulation can occur surprisingly early in the cycle — just a few days after bleeding begins. Because healthy sperm can remain viable inside fertile cervical fluid for up to 120 hours (5 days), intercourse that takes place during the latter days of menstrual bleeding can introduce sperm that are still alive when the egg is released. Relying on period bleeding as contraception carries a measurable failure rate.",
    takeaways: [
      "Sperm can survive inside the female reproductive tract for up to 5 days awaiting an egg.",
      "Short or irregular cycles can result in ovulation occurring shortly after bleeding stops.",
      "Consistent barrier methods or prescription contraception are required to prevent unplanned pregnancy and transmission of STIs."
    ],
    source: {
      title: "Clinical Consensus on Reproductive Physiology and Fertility Window Dynamics",
      organization: "American College of Obstetricians and Gynecologists (ACOG)",
      guidelineNumber: "ACOG Clinical Review & Patient Education Series",
      citationYear: "2021",
      keyFinding: "Due to biological variation in cycle length and sperm viability up to 120 hours, intercourse during menses carries a non-zero probability of conception.",
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
    quickFact: "Most common sexually transmitted infections — including chlamydia, HPV, trichomoniasis, and gonorrhea — have zero symptoms in up to 70% to 85% of cases.",
    explanation: "Popular misconceptions portray STIs as always causing acute symptoms such as burning, visible sores, or unusual discharge. In reality, the most prevalent STIs among teenagers and young adults are completely silent. For example, up to 75% of females and 50% of males infected with chlamydia experience no symptoms for months or even years. Without routine screening, these silent infections can progress undetected, causing pelvic inflammatory disease (PID), tubal scarring, and chronic pelvic pain. Routine, confidential, urine- or swab-based testing is the only accurate way to protect yourself and your partners.",
    takeaways: [
      "Up to 85% of common STI infections exhibit no noticeable symptoms whatsoever.",
      "Asymptomatic STIs can still be transmitted to sexual partners and cause internal reproductive inflammation.",
      "Annual confidential screening is recommended for all sexually active individuals under age 25."
    ],
    source: {
      title: "Sexually Transmitted Infections Treatment Guidelines & Adolescent Screening Protocols",
      organization: "Centers for Disease Control and Prevention (CDC)",
      guidelineNumber: "CDC MMWR Recommendations and Reports",
      citationYear: "2021 (Updated 2024)",
      keyFinding: "Annual screening for chlamydia and gonorrhea is recommended for all sexually active women under 25 due to high rates of asymptomatic infection.",
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
    quickFact: "Hormonal birth control does not reduce future fertility or deplete your eggs. Once stopped, normal ovulatory cycles resume and pregnancy rates match those who never used it.",
    explanation: "Extensive long-term prospective studies tracking hundreds of thousands of individuals have demonstrated that contraceptive pills do not cause permanent infertility or damage ovarian reserves. Birth control prevents pregnancy by reversibly suppressing ovulation. Once medication is discontinued, hormones exit the body within days. Within 12 months of stopping the pill, approximately 85% of people trying to conceive become pregnant — the exact same rate observed in people who never took hormonal contraception. In some cases, discontinuing the pill unmasks a pre-existing cycle irregularity (such as PCOS or hypothalamic amenorrhea) that was present prior to starting contraception.",
    takeaways: [
      "Contraceptive hormones leave your body rapidly after stopping and do not accumulate in reproductive tissues.",
      "One-year pregnancy rates after discontinuing birth control are identical to non-users of the same age.",
      "Post-pill cycle delays often reveal underlying hormonal conditions that were masked while on the pill."
    ],
    source: {
      title: "Fertility After Discontinuation of Contraception: A Systematic Review and Meta-Analysis",
      organization: "American Society for Reproductive Medicine (ASRM) & Contraception",
      guidelineNumber: "Systematic Review & Clinical Meta-Analysis",
      citationYear: "2020",
      keyFinding: "One-year pregnancy rates following oral contraceptive discontinuation are consistent with rates observed in individuals who have never used hormonal contraception.",
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
    quickFact: "When used according to standard hygiene guidelines, internal menstrual products are safe, medical-grade, and do not tear tissues or cause internal damage.",
    explanation: "Apprehension around internal period products often stems from anatomical misunderstandings or fear of Toxic Shock Syndrome (TSS). The vaginal canal is a resilient, flexible muscular tube with folded tissue (rugae) designed to safely accommodate tampons and cups. While TSS is a known bacterial illness caused by Staphylococcus aureus toxins, FDA manufacturing regulations adopted in the 1980s (banning high-absorbency synthetic fibers) combined with standard hygiene guidelines (changing tampons every 4 to 8 hours and washing hands before insertion) have made TSS extremely rare (1 to 3 cases per 100,000 users). Menstrual cups made of medical-grade silicone offer a safe, reusable alternative when boiled or sanitized between cycles.",
    takeaways: [
      "Internal period products are engineered to conform to vaginal elasticity without stretching or damaging internal tissues.",
      "Changing tampons every 4 to 8 hours and washing hands before use reduces bacterial complications like TSS to exceptionally low levels.",
      "You have the freedom to choose whichever menstrual hygiene products feel most comfortable and supportive for your body."
    ],
    source: {
      title: "Menstrual Tampons and Pads: Information for Premarket Notification Submissions",
      organization: "U.S. Food and Drug Administration (FDA) & The Lancet Public Health",
      guidelineNumber: "FDA Medical Device Guidance",
      citationYear: "2020",
      keyFinding: "Adherence to 4-to-8 hour change intervals and proper hygiene protocols minimizes microbial colonization and ensures high user safety.",
      url: "https://www.fda.gov"
    },
    learnCategory: "body",
    learnCategoryLabel: "Body Basics"
  }
];
