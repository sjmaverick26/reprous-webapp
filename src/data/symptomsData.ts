export interface SymptomDetail {
  id: string;
  name: string;
  associatedWith: string[];
  whatToTrack: string[];
  questionsToAsk: string[];
  whenToSeekCare: string;
  learnCategory: string;
  learnLabel: string;
}

export const SYMPTOMS_DATA: SymptomDetail[] = [
  {
    id: "irregular-periods",
    name: "Irregular periods",
    associatedWith: [
      "PCOS (Polycystic Ovary Syndrome)",
      "Maturing hypothalamic-pituitary-ovarian axis (first 2–3 years post-menarche)",
      "Thyroid dysfunction (hypo- or hyperthyroidism)",
      "Relative Energy Deficiency in Sport (RED-S)",
      "Elevated stress hormones & sleep disruption",
    ],
    whatToTrack: [
      "Cycle start and stop dates (count days from Day 1 of one period to Day 1 of the next)",
      "Bleeding heaviness (number of pads/tampons soaked per day)",
      "Accompanying signs like acne flares, temperature shifts, or mood changes",
    ],
    questionsToAsk: [
      "Are my cycle intervals expected for my age and activity level?",
      "Could we check my thyroid function (TSH) and reproductive hormone levels?",
      "Should we evaluate for insulin sensitivity or Polycystic Ovary Syndrome?",
    ],
    whenToSeekCare:
      "If your cycle consistently falls outside 21–45 days, bleeding lasts more than 7 days, or your period stops for over 90 days.",
    learnCategory: "pcos",
    learnLabel: "Explore PCOS & Hormonal Health →",
  },
  {
    id: "pelvic-pain",
    name: "Pelvic pain",
    associatedWith: [
      "Endometriosis",
      "Adenomyosis",
      "Ovarian cysts",
      "Pelvic floor muscle spasm/hypertonicity",
      "Gastrointestinal or urinary tract inflammation",
    ],
    whatToTrack: [
      "Exact anatomical location (lower pelvis, lower back, radiating down thighs)",
      "Timing (during menstruation, ovulation, bowel movements, exercise, or non-cyclic)",
      "Pain severity score on a 1–10 scale and duration of flare-ups",
    ],
    questionsToAsk: [
      "Could my recurring pelvic discomfort suggest endometriosis or adenomyosis?",
      "What non-surgical or diagnostic imaging steps do you recommend?",
      "Can you connect me with an adolescent gynecologist or pelvic health physical therapist?",
    ],
    whenToSeekCare:
      "Sudden, excruciating one-sided stabbing pain, pain accompanied by high fever or vomiting, or persistent pain that prevents walking or sitting.",
    learnCategory: "endo",
    learnLabel: "Explore Endometriosis & Pelvic Pain →",
  },
  {
    id: "painful-periods",
    name: "Painful periods",
    associatedWith: [
      "Primary dysmenorrhea (elevated uterine prostaglandins)",
      "Endometriosis",
      "Adenomyosis",
      "Uterine anomalies or fibroids",
    ],
    whatToTrack: [
      "When cramps begin (24 hours before bleeding vs. Day 2 of flow)",
      "Response to over-the-counter NSAIDs (like ibuprofen taken with food)",
      "Number of school, athletic, or social days missed due to pain",
    ],
    questionsToAsk: [
      "Is my pain level normal for menstrual cramping, or does it signal secondary dysmenorrhea?",
      "Would a targeted anti-inflammatory regimen or hormonal regulation offer relief?",
      "What steps can we take to rule out underlying tissue inflammation like endometriosis?",
    ],
    whenToSeekCare:
      "Pain that leaves you incapacitated, does not improve with standard pain medication, or causes nausea, vomiting, or fainting.",
    learnCategory: "endo",
    learnLabel: "Learn What Pain Means in Hub →",
  },
  {
    id: "extreme-fatigue",
    name: "Extreme fatigue",
    associatedWith: [
      "Iron deficiency anemia (often exacerbated by heavy menstrual flow)",
      "Relative Energy Deficiency in Sport (RED-S)",
      "Hypothyroidism (underactive thyroid)",
      "Chronic inflammatory conditions or sleep disruptions",
    ],
    whatToTrack: [
      "Daily energy levels mapped against athletic training volume and meals",
      "Number of fully soaked pads/tampons per cycle",
      "Physical sensations such as lightheadedness, pale nail beds, or cold hands",
    ],
    questionsToAsk: [
      "Can we test my serum ferritin (iron storage) alongside a complete blood count (CBC)?",
      "Could my training volume exceed my dietary energy intake (RED-S)?",
      "Is my thyroid functioning within the optimal range for adolescents?",
    ],
    whenToSeekCare:
      "Inability to complete school or athletic tasks, shortness of breath upon minimal exertion, chest tightness, or heart palpitations.",
    learnCategory: "play",
    learnLabel: "Explore Athlete Health & Fueling →",
  },
  {
    id: "missed-periods",
    name: "Missed periods",
    associatedWith: [
      "Functional Hypothalamic Amenorrhea (FHA / RED-S)",
      "Polycystic Ovary Syndrome (PCOS)",
      "Elevated prolactin (hyperprolactinemia)",
      "Pregnancy",
      "Severe physiological stress or rapid weight change",
    ],
    whatToTrack: [
      "Exact number of months since your last natural period",
      "Recent changes in training intensity, sport seasons, or food intake",
      "Resting heart rate, sleep quality, and stress levels",
    ],
    questionsToAsk: [
      "Given that I have missed 3+ consecutive periods, what diagnostic blood work should we order?",
      "Could under-fueling or high training volume be suppressing my estrogen levels?",
      "How is this period absence affecting my bone mineral density and long-term health?",
    ],
    whenToSeekCare:
      "Missing 3 or more consecutive cycles (secondary amenorrhea) or reaching age 15 without ever having a first period (primary amenorrhea).",
    learnCategory: "cycle",
    learnLabel: "Explore Cycle Sense in Hub →",
  },
  {
    id: "feeling-dizzy",
    name: "Feeling dizzy",
    associatedWith: [
      "Postural Orthostatic Tachycardia Syndrome (POTS)",
      "Iron deficiency or heavy menstrual blood loss",
      "Inadequate hydration or electrolyte depletion during exercise",
      "Vasovagal response triggered by intense cramps",
    ],
    whatToTrack: [
      "Whether dizziness occurs specifically upon standing or after long periods of standing",
      "Daily fluid and sodium intake relative to workout sweat loss",
      "Correlation with heavy bleeding days",
    ],
    questionsToAsk: [
      "Could heavy menstrual blood loss be contributing to low blood pressure or anemia?",
      "Should we assess orthostatic vitals (blood pressure and heart rate lying vs. standing)?",
    ],
    whenToSeekCare:
      "Episodes of fainting (syncope), head trauma from falling, chest pain, or irregular heartbeats.",
    learnCategory: "body",
    learnLabel: "Explore Body Basics in Hub →",
  },
  {
    id: "changes-in-weight",
    name: "Changes in weight",
    associatedWith: [
      "PCOS (insulin resistance)",
      "Thyroid disorders (hypothyroidism or hyperthyroidism)",
      "Fluid retention linked to luteal phase hormonal shifts",
      "Disproportionate caloric deficit in athletes",
    ],
    whatToTrack: [
      "Unexplained changes that occur without shifts in dietary intake or exercise routine",
      "Associated symptoms like temperature sensitivity, skin tags, or hair texture changes",
    ],
    questionsToAsk: [
      "Could insulin resistance or a thyroid imbalance be driving these weight fluctuations?",
      "What metabolic and endocrine panels do you recommend?",
    ],
    whenToSeekCare:
      "Unintended rapid weight gain or loss exceeding 10 pounds in a short period without dietary shifts.",
    learnCategory: "pcos",
    learnLabel: "Explore PCOS & Hormones →",
  },
  {
    id: "acne",
    name: "Acne",
    associatedWith: [
      "Elevated free androgens (testosterone, DHEAS)",
      "PCOS",
      "Normal adolescent hormonal fluctuations",
      "Insulin spikes stimulating sebaceous gland activity",
    ],
    whatToTrack: [
      "Distribution: cystic acne along jawline, chin, chest, or upper back",
      "Timing: monthly flare-ups right before menstruation",
      "Response to topical dermatological washes",
    ],
    questionsToAsk: [
      "Does the distribution of my acne suggest an underlying hormonal or androgen imbalance?",
      "Should we evaluate for PCOS alongside this skin symptom?",
    ],
    whenToSeekCare:
      "Deep, painful cystic lesions that leave deep scarring or do not respond to clinical dermatological care.",
    learnCategory: "pcos",
    learnLabel: "Explore Hormonal Health →",
  },
  {
    id: "excess-hair-growth",
    name: "Excess hair growth",
    associatedWith: [
      "Hirsutism associated with PCOS",
      "Elevated ovarian or adrenal androgens",
      "Familial and genetic ethnic traits",
      "Medication interactions",
    ],
    whatToTrack: [
      "Growth of coarse, dark hair on androgen-sensitive zones (chin, upper lip, chest, abdomen)",
      "Speed of onset (gradual since puberty vs. sudden rapid development)",
    ],
    questionsToAsk: [
      "Does this hair pattern meet the clinical criteria for hirsutism or PCOS?",
      "What evidence-based approaches (like anti-androgens or combined therapies) are appropriate?",
    ],
    whenToSeekCare:
      "Rapid onset of dark facial/body hair accompanied by deepening voice or missed menstrual cycles.",
    learnCategory: "pcos",
    learnLabel: "Explore PCOS & Hormones →",
  },
  {
    id: "pain-during-exercise",
    name: "Pain during exercise",
    associatedWith: [
      "Exercise-induced pelvic floor hypertonicity",
      "Endometriosis adhesions aggravated by core movement",
      "Ovarian cyst irritation",
      "Relative Energy Deficiency in Sport (RED-S)",
    ],
    whatToTrack: [
      "Specific movements that trigger pain (running impact, core crunches, weightlifting)",
      "Timing in your menstrual cycle (luteal vs. follicular phase)",
      "Duration of cramping or pelvic ache after the training session ends",
    ],
    questionsToAsk: [
      "Could this exercise-related pelvic ache stem from pelvic floor tension or endometriosis?",
      "Can we explore pelvic floor physical therapy tailored to student athletes?",
    ],
    whenToSeekCare:
      "Acute, sharp lower abdominal pain that suddenly halts exercise, or pain accompanied by dizziness or nausea.",
    learnCategory: "play",
    learnLabel: "Explore Female Athlete Health →",
  },
];

export const SYMPTOM_LOG_TEMPLATE = `REPROUS CLINICAL SYMPTOM LOG (60-90 DAY APPOINTMENT COMPANION)
============================================================
Patient / Student Name: _______________________
Date Range: ___________________________________

DAILY LOG ENTRIES
------------------------------------------------------------
[Date]  [Cycle Day]  [Pain 1-10]  [Location & Type]  [Pads/Tampons]  [Meds / Relief]  [Impact on School/Sport]
-------------------------------------------------------------------------------------------------------------
Example: Oct 12 | Day 1 | 8/10 | Lower abdomen/thighs | 5 soaked pads | Ibuprofen 600mg (mild) | Missed soccer practice
1.
2.
3.
4.
5.

KEY QUESTIONS FOR MY CLINICIAN:
1. "Given this 60-90 day pattern, does my pain or cycle timing meet the clinical criteria for secondary dysmenorrhea, PCOS, or RED-S?"
2. "What objective diagnostic blood work (e.g., TSH, ferritin, free testosterone, estradiol) or pelvic ultrasound do you recommend?"
3. "If standard over-the-counter pain medications aren't working, what targeted anti-inflammatory or hormonal therapy is appropriate?"
4. "Could you please document our discussion and rationale in my medical chart today?"

Important Clinical Note: Compiled for health education and self-advocacy preparation, not medical diagnosis.
`;
