"use client";

import React, { useState, useMemo, useEffect } from "react";
import { BookOpen, Search, Volume2, Sparkles, X, ChevronRight, Stethoscope, MessageSquare, FileText } from "lucide-react";

export interface DictionaryEntry {
  id: string;
  term: string;
  pronunciation: string;
  moduleId: "body" | "cycle" | "conditions" | "pcos" | "endo" | "realtalk" | "mind" | "play" | "factors" | "jargon";
  moduleTitle: string;
  categoryColor: string;
  chartJargon?: string;
  plainEnglish: string;
  doctorDefinition: string;
  howToSayIt: string;
}

export interface ModuleTab {
  id: string; // "all" | "jargon" | "body" | "cycle" | etc.
  label: string;
  shortLabel: string;
  groupColor: "purple" | "teal" | "pink" | "coral" | "all";
  tagline: string;
}

export const MODULE_TABS: ModuleTab[] = [
  {
    id: "all",
    label: "All Modules & Jargon",
    shortLabel: "All Words",
    groupColor: "all",
    tagline: "Explore all tricky medical words and clinical jargon across every ReproUs module.",
  },
  // Doctor Jargon & Chart Code
  {
    id: "jargon",
    label: "Doctor Jargon & Chart Code",
    shortLabel: "Doctor Jargon",
    groupColor: "purple",
    tagline: "De-code patient portal notes, doctor shorthand, and clinical terms (WNL, R/O, Analgesics, Oligoanalgesia, ADR).",
  },
  // Teal group
  {
    id: "play",
    label: "Female Athlete Health",
    shortLabel: "Athlete Health",
    groupColor: "teal",
    tagline: "Tricky words on RED-S, energy availability, sports anemia, and bone density.",
  },
  {
    id: "mind",
    label: "Mind & Self",
    shortLabel: "Mind & Self",
    groupColor: "teal",
    tagline: "Tricky words on PMDD, luteal neurosteroids, cortisol loops, and body neutrality.",
  },
  {
    id: "factors",
    label: "The Bigger Picture",
    shortLabel: "Bigger Picture",
    groupColor: "teal",
    tagline: "Tricky words on the gender research gap, patient advocacy, period poverty, and healthcare rights.",
  },
  // Pink group
  {
    id: "pcos",
    label: "PCOS & Hormonal Health",
    shortLabel: "PCOS & Hormones",
    groupColor: "pink",
    tagline: "Tricky words on Rotterdam criteria, androgens, and insulin resistance.",
  },
  {
    id: "cycle",
    label: "Cycle Sense",
    shortLabel: "Cycle Sense",
    groupColor: "pink",
    tagline: "Tricky words on dysmenorrhea, amenorrhea, prostaglandins, and cycle phases.",
  },
  {
    id: "realtalk",
    label: "Real Talk & STIs",
    shortLabel: "Real Talk",
    groupColor: "pink",
    tagline: "Tricky words on asymptomatic infections, PrEP/PEP, and barrier boundaries.",
  },
  // Coral group
  {
    id: "endo",
    label: "Endometriosis & Pelvic Pain",
    shortLabel: "Endometriosis",
    groupColor: "coral",
    tagline: "Tricky words on retrograde flow, laparoscopy excision, and pelvic adhesions.",
  },
  {
    id: "body",
    label: "Body Basics",
    shortLabel: "Body Basics",
    groupColor: "coral",
    tagline: "Tricky words on menarche, thelarche, anatomy milestones, and sex hormones.",
  },
  {
    id: "conditions",
    label: "Pregnancy & Reproductive Care",
    shortLabel: "Repro Care",
    groupColor: "coral",
    tagline: "Tricky words on Title X confidentiality, hCG, pelvic exams, and chaperones.",
  },
];

export const DICTIONARY_ENTRIES: DictionaryEntry[] = [
  // ==========================================
  // SECTION: DOCTOR JARGON & CHART CODE (jargon)
  // ==========================================
  {
    id: "wnl",
    term: "WNL (“Within Normal Limits”)",
    pronunciation: "dub-ul-yoo-en-el",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Chart note: “Pelvic ultrasound and routine CBC within normal limits (WNL).”",
    plainEnglish: "The most common medical abbreviation on charts and patient portals! It means your blood tests or scans fell within standard averages. Warning: Just because test results are 'WNL' does NOT mean your pain is imaginary! Many chronic conditions like superficial endometriosis or early hormonal imbalances do not show up on basic standard tests.",
    doctorDefinition: "A standardized clinical charting designation indicating that quantitative laboratory values or diagnostic imaging findings fall within established parametric reference intervals.",
    howToSayIt: "“I see my routine labs came back within normal limits, but my debilitating symptoms persist every cycle. What more specialized diagnostic evaluation or specialist referral should we consider?”",
  },
  {
    id: "rule-out",
    term: "Rule Out (“R/O”)",
    pronunciation: "ROOL OWT (or R-O)",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Chart requisition: “Severe dysmenorrhea with bowel distress. R/O endometriosis; order pelvic ultrasound.”",
    plainEnglish: "When a doctor writes 'R/O [Condition]' on your clinic paperwork, it does NOT mean they ruled it out already! It actually means the opposite: they suspect it might be the cause and are ordering tests to investigate and make sure you do NOT have it.",
    doctorDefinition: "A clinical directive used in patient documentation and lab requisitions instructing evaluators to conduct tests to confirm or eliminate a suspected diagnostic condition.",
    howToSayIt: "“I noticed you noted 'R/O PCOS' on my requisition order. Does that mean we are actively investigating PCOS, and when will we review those results together?”",
  },
  {
    id: "idiopathic",
    term: "Idiopathic",
    pronunciation: "id-ee-oh-PATH-ik",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Chart note: “Adolescent female presenting with idiopathic dysmenorrhea; trial of scheduled NSAIDs.”",
    plainEnglish: "A fancy Greek-derived medical word that literally means 'arising on its own.' In plain English: the doctors have not identified a specific anatomical disease causing the symptom yet.",
    doctorDefinition: "Denoting any condition or symptom arising spontaneously or for which the precise primary etiology or pathophysiology remains unidentified.",
    howToSayIt: "“When you classify my severe cramps as idiopathic, does that mean all secondary causes like endometriosis have been ruled out, or are there further investigations we haven't explored?”",
  },
  {
    id: "refractory",
    term: "Refractory (e.g. Refractory Pain)",
    pronunciation: "ree-FRAK-tor-ee",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Chart note: “Cyclical pelvic pain refractory to maximum-dose ibuprofen and acetaminophen.”",
    plainEnglish: "Doctor jargon for 'resistant to standard treatment.' If your period cramps are described as 'refractory to NSAIDs,' it means standard drugstore painkillers like Advil, Aleve, or Tylenol do not touch your pain.",
    doctorDefinition: "Resistant to standard pharmacological intervention, non-responsive to conventional first-line therapeutic regimens, or failing to yield satisfactory clinical resolution.",
    howToSayIt: "“My menstrual pain is refractory to maximum over-the-counter painkillers. Because standard first-line therapies have failed, I need to be evaluated for secondary pelvic pathology.”",
  },
  {
    id: "empiric-treatment",
    term: "Empiric Treatment / Empiric Therapy",
    pronunciation: "em-PEER-ik",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Chart note: “Suspected endometriosis. Initiate empiric hormonal suppression with combined oral contraceptive.”",
    plainEnglish: "Starting a medication based on an educated guess before performing surgery or invasive tests to prove the diagnosis. Doctors frequently prescribe birth control as empiric therapy for suspected endometriosis.",
    doctorDefinition: "Medical therapy initiated on the basis of clinical probability prior to obtaining definitive histological, bacteriological, or anatomical diagnostic confirmation.",
    howToSayIt: "“I understand this birth control pill is an empiric trial for my symptoms. If my pain does not resolve within three months, what is our next diagnostic step?”",
  },
  {
    id: "differential-diagnosis",
    term: "Differential Diagnosis (“The Differential”)",
    pronunciation: "dif-er-EN-shul dy-ug-NOH-sis",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Chart note: “Differential includes secondary dysmenorrhea, endometriosis, adenomyosis, and interstitial cystitis.”",
    plainEnglish: "The doctor's mental detective list of all the different medical conditions that could explain your symptoms, ranked from most likely to least likely.",
    doctorDefinition: "The systematic clinical method of identifying a disease by distinguishing it from other pathological conditions presenting with overlapping signs and symptoms.",
    howToSayIt: "“What is currently on your differential diagnosis list for my symptoms, and what specific tests will help rule each one in or out?”",
  },
  {
    id: "unremarkable",
    term: "Unremarkable (e.g. Unremarkable Scan)",
    pronunciation: "un-ree-MARK-uh-bul",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Radiology report: “Pelvic ultrasound demonstrates unremarkable uterus and bilateral adnexa. No cysts or masses.”",
    plainEnglish: "Radiologist code meaning 'nothing stood out as visibly abnormal on this specific scan.' Crucial fact: Superficial endometriosis and early hormonal disorders are almost always 'unremarkable' on ultrasound!",
    doctorDefinition: "A formal diagnostic imaging term indicating that examined tissues exhibit no gross anatomical lesions, cysts, or morphological deviations from standard baseline.",
    howToSayIt: "“My ultrasound report came back unremarkable. Since superficial endometriosis is typically invisible on basic ultrasound, what are our next specialist options?”",
  },
  {
    id: "somatic-psychosomatic",
    term: "Somatic / Psychosomatic",
    pronunciation: "soh-MAT-ik & sy-koh-soh-MAT-ik",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Chart note: “Chronic pelvic pain with prominent somatic anxiety features.”",
    plainEnglish: "Pertaining to real physical sensations in your body that interact with the nervous system. Too often misused by dismissive providers to imply pain is 'in your head'—in reality, severe pain and chronic stress physically trigger nerve pathways and muscle tension.",
    doctorDefinition: "Relating to physical symptoms (somatic) or bodily symptoms caused or exacerbated by psychological or neuroendocrine factors through central nervous system pathways.",
    howToSayIt: "“While chronic pain naturally causes stress, my pelvic pain is a distinct physical symptom requiring anatomical and endocrine evaluation.”",
  },
  {
    id: "off-label",
    term: "Off-Label Prescription",
    pronunciation: "OFF-lay-bul",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Chart note: “Initiating spironolactone 50mg daily off-label for hormonal cystic acne.”",
    plainEnglish: "When a doctor prescribes an FDA-approved medication for a symptom other than what the FDA originally approved it for. It is very common, safe, and legal in reproductive health (such as using spironolactone, a blood pressure medication, to block acne-causing testosterone).",
    doctorDefinition: "The clinical use of a pharmaceutical agent for an unapproved indication, age group, dose, or route of administration supported by evidence-based clinical practice guidelines.",
    howToSayIt: "“Are you prescribing this medication off-label for my hormonal symptoms, and what clinical evidence supports its use for this condition?”",
  },
  {
    id: "contraindication",
    term: "Contraindication",
    pronunciation: "kon-truh-in-dih-KAY-shun",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Chart note: “History of migraine with visual aura represents an absolute contraindication to combined estrogen contraceptives.”",
    plainEnglish: "A specific medical reason or health history that makes a medication or procedure dangerous or unsafe for you (for example, having migraines with visual auras means you should NOT take estrogen-containing birth control pills due to stroke risk).",
    doctorDefinition: "A specific condition, symptom, or circumstance that renders a particular medical treatment, diagnostic procedure, or pharmaceutical agent inadvisable or hazardous.",
    howToSayIt: "“Because I get visual auras with my headaches, I understand estrogen is contraindicated. What progestin-only or non-hormonal options are safest for me?”",
  },
  {
    id: "tanner-staging",
    term: "Tanner Staging (Stages 1–5)",
    pronunciation: "TAN-er STAY-jing",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Chart note: “13-year-old female at Tanner Stage 3 breast development, Tanner Stage 3 pubic hair. Pre-menarcheal.”",
    plainEnglish: "The standard 1 to 5 clinical scale doctors use to track puberty progress (Stage 1 is pre-puberty; Stage 5 is fully mature). It helps doctors verify that growth spurts and body changes are developing in expected sequence.",
    doctorDefinition: "An objective sexual maturity rating (SMR) scale developed by James Tanner defining physical development stages based on secondary sex characteristics.",
    howToSayIt: "“What is my current Tanner stage of pubertal development, and what physical milestones should we anticipate next on my timeline?”",
  },
  {
    id: "fasted-labs",
    term: "Fasting Blood Draw (“Fasted Labs”)",
    pronunciation: "FAS-ted LABZ",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Lab requisition: “Fasted 8–12 hours. Draw 8:00 AM: total/free testosterone, DHEA-S, fasting glucose and insulin.”",
    plainEnglish: "Going to the lab in the morning without eating or drinking anything (except plain water) for 8 to 12 hours. If you eat breakfast before a hormone test, your insulin spikes and distorts testosterone and metabolic accuracy!",
    doctorDefinition: "A diagnostic laboratory protocol requiring oral caloric restriction for 8–12 hours prior to venipuncture to establish basal metabolic and endocrine homeostasis.",
    howToSayIt: "“Should this hormone and metabolic panel be drawn fasting in the early morning between 8:00 and 9:00 AM to ensure maximum test accuracy?”",
  },
  {
    id: "transvaginal-vs-transabdominal",
    term: "Transvaginal vs. Transabdominal Ultrasound",
    pronunciation: "tranz-VAJ-ih-nul vs tranz-ab-DOM-ih-nul",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Radiology order: “Transabdominal pelvic ultrasound indicated; patient is adolescent. Transvaginal deferred.”",
    plainEnglish: "Transabdominal means warm gel and a wand on your belly (you need a full bladder!). Transvaginal means a slender wand gently inserted into the vagina for clearer images. In teens or anyone not comfortable, transabdominal is standard!",
    doctorDefinition: "Pelvic sonographic modalities; transabdominal utilizes acoustic windows via a distended urinary bladder, whereas transvaginal places higher-frequency transducers closer to pelvic viscera.",
    howToSayIt: "“I prefer a transabdominal ultrasound on top of my stomach today rather than an internal transvaginal exam.”",
  },
  {
    id: "analgesic",
    term: "Analgesic / Analgesia",
    pronunciation: "an-ul-JEE-zik / an-ul-JEE-zee-uh",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Requisition order: “Severe acute abdominal pain. Administer intravenous non-opioid analgesic protocol per pain score.”",
    plainEnglish: "A medication specifically formulated to relieve or eliminate physical pain without causing you to lose consciousness. Examples include NSAIDs (ibuprofen), acetaminophen, and prescription pain medications. Critical rule: Analgesics treat pain; sedatives do not!",
    doctorDefinition: "A class of pharmacological agents that selectively alleviate nociceptive or neuropathic pain by acting on peripheral or central nervous system receptors without suppressing consciousness.",
    howToSayIt: "“My abdominal pain score is currently an 8 out of 10. Rather than a sedative to calm my nerves, I need an effective analgesic to address the pain directly.”",
  },
  {
    id: "sedative",
    term: "Sedative / Anxiolytic",
    pronunciation: "SED-uh-tiv / ang-zee-oh-LIT-ik",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Emergency triage note: “Patient tearful and hyperventilating from pelvic pain; administered low-dose anxiolytic sedative.”",
    plainEnglish: "Medications designed to reduce anxiety, relax muscles, or induce sleepiness (like Valium or Ativan). In clinical studies, women reporting severe pain are statistically far more likely to be given sedatives than painkillers because clinicians mistakenly attribute their pain to emotional distress.",
    doctorDefinition: "A central nervous system depressant prescribed to reduce irritability or excitement, which does not possess primary antinociceptive (pain-relieving) properties.",
    howToSayIt: "“While an anxiolytic may make me sleepy, it does not treat my physical pain. What targeted pain reliever can we prescribe while we investigate the underlying cause?”",
  },
  {
    id: "oligoanalgesia",
    term: "Oligoanalgesia (Pain Under-Treatment)",
    pronunciation: "ah-li-go-an-ul-JEE-zee-uh",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Emergency quality audit: “ED protocol review indicates oligoanalgesia with a 65-minute median wait time for acute female abdominal pain.”",
    plainEnglish: "The medical term for the under-treatment of pain—either when clinicians fail to give pain medicine at all, give too low a dose, or make the patient wait unreasonably long. Studies show women face significant oligoanalgesia in emergency care.",
    doctorDefinition: "The failure to administer adequate and timely analgesic therapy to patients experiencing acute or chronic pain in healthcare settings.",
    howToSayIt: "“Emergency medicine studies document significant oligoanalgesia for female patients with abdominal pain. I have been in severe pain for over an hour—what is our current timeline for pain management?”",
  },
  {
    id: "psychogenic",
    term: "Psychogenic Pain / Psychogenic Attribution",
    pronunciation: "sy-koh-JEN-ik",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Chart note: “Recurrent severe pelvic pain with unremarkable ultrasound. Consider psychogenic etiology or somatization.”",
    plainEnglish: "A medical label meaning symptoms originate from psychological distress or emotions rather than physical disease. In women's healthcare history, physical pain (like endometriosis or ruptured cysts) has frequently been mislabeled 'psychogenic' simply because routine tests looked normal.",
    doctorDefinition: "Physical pain or physiological dysfunction attributed to psychological, emotional, or behavioral factors rather than verifiable organic or anatomical disease.",
    howToSayIt: "“Rather than assuming this pain is psychogenic or stress-induced, what specialized imaging, laparoscopy, or specialist referral will help us rule out anatomical conditions like endometriosis?”",
  },
  {
    id: "acute-abdominal-pain",
    term: "Acute Abdominal Pain",
    pronunciation: "uh-KYOOT ab-DOM-in-ul PAYN",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Triage code: “Female presenting with non-traumatic acute abdominal pain, R/O appendicitis, ovarian torsion, ruptured cyst.”",
    plainEnglish: "Sudden, severe pain in the stomach, abdomen, or pelvic region developing over hours or days. It is a critical emergency room symptom where research proves women wait an average of 16 minutes longer for pain medication and are less likely to receive opioid pain relief than men with identical pain scores.",
    doctorDefinition: "Rapid-onset, severe nociceptive pain localized to the abdominal or pelvic cavity requiring prompt emergency triage and diagnostic workup to exclude surgical or life-threatening pathology.",
    howToSayIt: "“My acute abdominal pain began suddenly and is worsening. What specific diagnostic imaging and lab tests are being ordered to rule out urgent surgical or gynecological conditions?”",
  },
  {
    id: "adverse-drug-reaction",
    term: "Adverse Drug Reaction (ADR)",
    pronunciation: "ad-VERS DRUG ree-AK-shun",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "Medication portal record: “Documented adverse drug reaction (ADR) to standard dose zolpidem; morning impairment and dizziness.”",
    plainEnglish: "An unwanted, harmful, or dangerous reaction caused by a medication taken at standard doses. Women experience adverse drug reactions at nearly twice the rate of men because clinical drug trials historically excluded female bodies and hormonal variations.",
    doctorDefinition: "An appreciably harmful or noxious reaction resulting from an intervention related to the use of a medicinal product, often driven by sex differences in body composition and hepatic clearance.",
    howToSayIt: "“Given that women experience adverse drug reactions at nearly twice the rate of men, should we start this new medication at a lower initial dose to monitor how my body metabolizes it?”",
  },
  {
    id: "chart-documentation-request",
    term: "Chart Documentation Request (“Document in Chart”)",
    pronunciation: "CHART dok-yoo-men-TAY-shun",
    moduleId: "jargon",
    moduleTitle: "Doctor Jargon",
    categoryColor: "bg-purple-100 text-purple-900 border-purple-300",
    chartJargon: "EHR addendum: “Patient requested pelvic MRI and specialist referral. Provider declined as not indicated; rationale entered per patient request.”",
    plainEnglish: "An essential patient self-advocacy phrase: asking a healthcare provider to write down in your medical record that you requested a specific diagnostic test or referral and that they decided to refuse it. Because medical charts are legal records, this often prompts clinicians to re-evaluate their refusal.",
    doctorDefinition: "A formal patient directive instructing a healthcare clinician to enter a contemporaneous record of a declined diagnostic test, refused referral, or clinical rationale into the legal electronic health record (EHR).",
    howToSayIt: "“If you feel an ultrasound or specialist referral is not warranted today, could you please document in my chart notes that I requested this evaluation and the clinical reason you are declining to order it?”",
  },

  // ==========================================
  // MODULE 1: BODY BASICS (body)
  // ==========================================
  {
    id: "menarche",
    term: "Menarche",
    pronunciation: "men-AR-kee",
    moduleId: "body",
    moduleTitle: "Body Basics",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Chart note: “Patient reached menarche at age 12; cycle interval currently 45–60 days.”",
    plainEnglish: "The official medical name for your very first menstrual period. It usually arrives about two years after breast buds start to develop, anywhere between ages 9 and 15.",
    doctorDefinition: "The initial occurrence of menstruation in females, marking the onset of female reproductive maturity and ovarian cycle activity.",
    howToSayIt: "“I experienced menarche at age 12, but my cycles have been spaced 60 days apart since then. Is this normal adolescent cycle maturation?”",
  },
  {
    id: "thelarche",
    term: "Thelarche",
    pronunciation: "thee-LAR-kee",
    moduleId: "body",
    moduleTitle: "Body Basics",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Chart note: “Onset of thelarche noted at age 10; anticipated menarche in 18–24 months.”",
    plainEnglish: "The start of breast bud development during puberty. It is usually the very first physical change you notice, stimulated by your body starting to produce estrogen.",
    doctorDefinition: "The onset of female breast development during puberty, stimulated by rising circulating estradiol concentrations.",
    howToSayIt: "“I noticed breast budding about a year ago; what is the expected timeline between thelarche and my first period?”",
  },
  {
    id: "endometrium",
    term: "Endometrium (Uterine Lining)",
    pronunciation: "en-doh-MEE-tree-um",
    moduleId: "body",
    moduleTitle: "Body Basics",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Ultrasound note: “Endometrial stripe thickness 12mm; proliferative phase morphology.”",
    plainEnglish: "The plush, soft cushion that grows inside your uterus each month. When you don't get pregnant, your body gently sheds it—that shed lining is what creates your period bleeding!",
    doctorDefinition: "The mucosal inner epithelial layer of the uterus that thickens and sheds cyclically in response to ovarian estrogen and progesterone stimulation.",
    howToSayIt: "“Is my period flow heavy because my endometrium is building up unusually thick between my cycles?”",
  },
  {
    id: "cervix",
    term: "Cervix",
    pronunciation: "SER-viks",
    moduleId: "body",
    moduleTitle: "Body Basics",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Physical exam note: “Cervix appears nulliparous, pink, without lesions or cervical motion tenderness (CMT).”",
    plainEnglish: "The small, donut-shaped doorway connecting the bottom of your uterus to your vagina. It opens slightly during periods to let blood out and makes healthy fluids to protect against bacteria.",
    doctorDefinition: "The lower narrow cylindrical portion of the uterus that opens into the vagina, featuring an internal and external os lined with mucus-secreting glandular epithelium.",
    howToSayIt: "“I noticed clear, stretchy discharge mid-cycle. Is this normal cervical fluid produced around ovulation?”",
  },
  {
    id: "estrogen",
    term: "Estrogen",
    pronunciation: "ESS-truh-jin",
    moduleId: "body",
    moduleTitle: "Body Basics",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Lab note: “Serum estradiol level suppressed consistent with functional hypothalamic hypogonadism.”",
    plainEnglish: "Your body's natural builder hormone. It gives you energy, protects your heart and bones from breaking, and rebuilds the soft lining of your uterus every single month.",
    doctorDefinition: "The primary female steroid sex hormone responsible for secondary sexual characteristics, bone mineral density preservation, and endometrial proliferation.",
    howToSayIt: "“If my periods have stopped, does that mean my estrogen levels are too low to protect my bone density?”",
  },
  {
    id: "progesterone",
    term: "Progesterone",
    pronunciation: "pro-JESS-tuh-rone",
    moduleId: "body",
    moduleTitle: "Body Basics",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Lab note: “Mid-luteal serum progesterone <3 ng/mL indicating anovulatory cycle.”",
    plainEnglish: "Your body's calming, balancing hormone. It only gets made after you release an egg (ovulate), helping your sleep, stabilizing your mood, and balancing out estrogen.",
    doctorDefinition: "An endogenous steroid hormone synthesized by the corpus luteum following ovulation to stabilize the endometrium and regulate gonadotropin secretion.",
    howToSayIt: "“I want to confirm if I am actually ovulating and producing adequate progesterone in the second half of my cycle.”",
  },

  // ==========================================
  // MODULE 2: CYCLE SENSE (cycle)
  // ==========================================
  {
    id: "dysmenorrhea",
    term: "Dysmenorrhea (Severe Cramps)",
    pronunciation: "dis-men-oh-REE-uh",
    moduleId: "cycle",
    moduleTitle: "Cycle Sense",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Chart note: “Primary vs. secondary dysmenorrhea refractory to first-line NSAIDs.”",
    plainEnglish: "Severe, throbbing period cramps that stop you from going to school, playing sports, or doing normal things. Mild cramps are common; pain that knocks you out is not.",
    doctorDefinition: "Painful menstruation classified as primary (caused by excess myometrial prostaglandins) or secondary (caused by pelvic pathology like endometriosis or adenomyosis).",
    howToSayIt: "“My cramps are so severe that standard painkillers don't work and I have to miss school. Can we investigate for secondary dysmenorrhea?”",
  },
  {
    id: "amenorrhea",
    term: "Amenorrhea (Missing Periods)",
    pronunciation: "ay-men-oh-REE-uh",
    moduleId: "cycle",
    moduleTitle: "Cycle Sense",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Chart note: “Secondary amenorrhea workup; order hCG, prolactin, TSH, FSH, and LH.”",
    plainEnglish: "Missing your period for 3 or more months in a row when not pregnant. It is your body's emergency brake signaling that stress, low nutrition, or hormones need attention.",
    doctorDefinition: "The absence of menstrual bleeding; classified as primary (no menses by age 15) or secondary (cessation of menses for ≥90 days in previously cycling individuals).",
    howToSayIt: "“My period has stopped for three months. I learned this is called secondary amenorrhea and I want to run lab work to find the underlying cause.”",
  },
  {
    id: "ovulation",
    term: "Ovulation",
    pronunciation: "ov-yoo-LAY-shun",
    moduleId: "cycle",
    moduleTitle: "Cycle Sense",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Chart note: “Mid-cycle LH surge documentation; presumptive ovulatory follicle rupture.”",
    plainEnglish: "The main event of your cycle! Roughly halfway through, one ovary releases a mature egg into the fallopian tube. This is the only trigger that unlocks natural progesterone.",
    doctorDefinition: "The release of a secondary oocyte from a mature ovarian follicle triggered by a sharp mid-cycle luteinizing hormone (LH) surge.",
    howToSayIt: "“How can I track signs of ovulation like cervical fluid and morning temperature to confirm my cycle is healthy?”",
  },
  {
    id: "prostaglandins",
    term: "Prostaglandins",
    pronunciation: "pros-tuh-GLAN-dinz",
    moduleId: "cycle",
    moduleTitle: "Cycle Sense",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Chart note: “Prostaglandin-mediated myometrial hypercontractility with vasospasm and GI hypermotility.”",
    plainEnglish: "Natural chemicals your uterus releases to make muscles squeeze and push out period blood. Excess amounts cause painful cramps, nausea, and loose stools ('period poops').",
    doctorDefinition: "Lipid autacoids produced from arachidonic acid that stimulate violent uterine myometrial contractions and pelvic vascular constriction during menses.",
    howToSayIt: "“Are my severe cramps caused by excess prostaglandins, and can taking anti-inflammatories before my period prevent the pain cascade?”",
  },
  {
    id: "menorrhagia",
    term: "Menorrhagia (Heavy Flow)",
    pronunciation: "men-oh-RAY-jee-uh",
    moduleId: "cycle",
    moduleTitle: "Cycle Sense",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Chart note: “Menorrhagia with documented microcytic anemia; ferritin 8 ng/mL.”",
    plainEnglish: "Abnormally heavy or prolonged menstrual bleeding—such as soaking through a pad or tampon every single hour, bleeding over 7 days, or passing clots bigger than a quarter.",
    doctorDefinition: "Excessive menstrual blood loss exceeding 80 mL per cycle or lasting longer than 7 days, carrying a significant risk for iron-deficiency anemia.",
    howToSayIt: "“I bleed through a pad in under an hour and pass quarter-sized clots. Can we check an ultrasound and ferritin panel for menorrhagia?”",
  },
  {
    id: "follicular-luteal",
    term: "Follicular vs. Luteal Phase",
    pronunciation: "foh-LIK-yoo-ler & LOO-tee-ul",
    moduleId: "cycle",
    moduleTitle: "Cycle Sense",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Chart note: “Shortened luteal phase (<10 days); evaluation for luteal phase defect.”",
    plainEnglish: "The two halves of your cycle: the Follicular Phase (Day 1 of bleeding until ovulation, dominated by estrogen) and the Luteal Phase (ovulation until your next period, dominated by progesterone).",
    doctorDefinition: "The proliferative pre-ovulatory ovarian phase followed by the secretory post-ovulatory phase maintained by corpus luteum endocrine secretions.",
    howToSayIt: "“My luteal phase appears to last only 8 days before bleeding begins. Could low progesterone be shortening my luteal window?”",
  },

  // ==========================================
  // MODULE 3: PREGNANCY & REPRODUCTIVE CARE (conditions)
  // ==========================================
  {
    id: "title-x",
    term: "Title X Confidentiality",
    pronunciation: "TITLE TEN",
    moduleId: "conditions",
    moduleTitle: "Reproductive Care",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Intake form: “Confidential adolescent minor assent under Title X statutory guidelines.”",
    plainEnglish: "A United States federal program that guarantees confidential, low-cost or free reproductive health services (like birth control, STI testing, and exams) without requiring parental notification.",
    doctorDefinition: "The federal grant program (42 U.S.C. 300) dedicated to providing individuals with comprehensive family planning and preventive health services with strict statutory confidentiality protections.",
    howToSayIt: "“I am seeking care under Title X guidelines today. Can you confirm that my visit records and lab results will remain completely confidential?”",
  },
  {
    id: "hcg",
    term: "hCG (Human Chorionic Gonadotropin)",
    pronunciation: "aych-see-JEE",
    moduleId: "conditions",
    moduleTitle: "Reproductive Care",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Lab order: “Quantitative serum beta-hCG: <2 mIU/mL (negative for pregnancy).”",
    plainEnglish: "Known as the 'pregnancy hormone.' It is produced by the early placenta right after an egg implants in the uterus. Home urine tests detect this hormone.",
    doctorDefinition: "A heterodimeric glycoprotein hormone secreted by the syncytiotrophoblast of the blastocyst that stimulates continuous corpus luteal progesterone synthesis.",
    howToSayIt: "“Could we run a quantitative serum hCG blood test to accurately measure my hormone levels rather than relying on a home urine test?”",
  },
  {
    id: "preeclampsia",
    term: "Preeclampsia",
    pronunciation: "pree-ee-KLAMP-see-uh",
    moduleId: "conditions",
    moduleTitle: "Reproductive Care",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Triage note: “Gestational hypertension (BP 158/104 mmHg) with proteinuria (UPCR 0.42) and scotoma.”",
    plainEnglish: "A serious, potentially life-threatening pregnancy and postpartum disorder characterized by high blood pressure and organ stress (especially the kidneys and liver). Classic warning signs include unrelenting headaches, vision changes, and sudden facial swelling.",
    doctorDefinition: "A multisystem progressive disorder characterized by new-onset hypertension (systolic ≥140 mmHg or diastolic ≥90 mmHg) occurring after 20 weeks gestation or postpartum, paired with proteinuria or systemic end-organ dysfunction.",
    howToSayIt: "“My headache will not go away and my face feels suddenly swollen. I am requesting an immediate blood pressure check and a urine protein dip to evaluate for preeclampsia.”",
  },
  {
    id: "urgent-maternal-warning-signs",
    term: "Urgent Maternal Warning Signs",
    pronunciation: "UR-jint muh-TER-nul WAR-ning synz",
    moduleId: "conditions",
    moduleTitle: "Reproductive Care",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Clinical nursing protocol: “Patient reports CDC Hear Her urgent maternal red flag criteria (pleuritic chest pain, dyspnea).”",
    plainEnglish: "A set of 15 critical physical symptoms identified by the CDC that can indicate a dangerous, life-threatening complication during pregnancy or up to a full year after giving birth. They require immediate emergency care.",
    doctorDefinition: "Evidence-based clinical red flags established by the CDC Hear Her campaign and maternal mortality review committees requiring urgent obstetric and emergency evaluation to prevent maternal morbidity and mortality.",
    howToSayIt: "“The symptoms I am experiencing match the CDC's Urgent Maternal Warning Signs. I need a medical provider to evaluate me right now.”",
  },
  {
    id: "speculum",
    term: "Speculum",
    pronunciation: "SPEK-yuh-lum",
    moduleId: "conditions",
    moduleTitle: "Reproductive Care",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Physical exam note: “Pediatric speculum placed with patient assent and warm water lubrication.”",
    plainEnglish: "A smooth, duckbill-shaped medical instrument that a doctor gently uses to hold open the vaginal walls so they can see your cervix and perform a Pap smear or swab.",
    doctorDefinition: "A medical instrument used to dilate the vaginal canal by retracting anterior and posterior vaginal walls, facilitating direct visualization of the cervix.",
    howToSayIt: "“This is my first pelvic exam. Could you use the smallest pediatric speculum, warm it with water, and talk me through each step before doing it?”",
  },
  {
    id: "medical-chaperone",
    term: "Medical Chaperone",
    pronunciation: "SHAP-er-ohn",
    moduleId: "conditions",
    moduleTitle: "Reproductive Care",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Clinical charting: “Formal clinical chaperone (RN) present throughout pelvic examination.”",
    plainEnglish: "A trained clinic staff member (like a nurse or medical assistant) who stands in the room during sensitive exams to protect your safety, comfort, and boundaries. You can always ask for one!",
    doctorDefinition: "A trained healthcare observer present during intimate physical examinations to safeguard patient dignity, provide reassurance, and maintain clinical liability standards.",
    howToSayIt: "“I would like a clinic chaperone present in the exam room during my physical examination today.”",
  },
  {
    id: "emergency-contraception",
    term: "Emergency Contraception",
    pronunciation: "ih-MER-jen-see kon-truh-SEP-shun",
    moduleId: "conditions",
    moduleTitle: "Reproductive Care",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Chart note: “Administered 1.5mg oral levonorgestrel post-coital prophylaxis within 48-hour window.”",
    plainEnglish: "Pills (like Plan B or Ella) taken within 3 to 5 days after unprotected sex or a condom accident. They delay ovulation so an egg is never released to meet sperm—they do not cause an abortion.",
    doctorDefinition: "Post-coital therapies (oral levonorgestrel, ulipristal acetate, or copper IUD) that inhibit or delay the mid-cycle LH surge to prevent fertilization.",
    howToSayIt: "“I had a barrier failure 36 hours ago. Which emergency contraception pill is most effective based on my cycle timing and body weight?”",
  },

  // ==========================================
  // MODULE 4: PCOS & HORMONAL HEALTH (pcos)
  // ==========================================
  {
    id: "pcos-term",
    term: "PCOS (Polycystic Ovary Syndrome)",
    pronunciation: "pee-see-oh-ess",
    moduleId: "pcos",
    moduleTitle: "PCOS & Hormones",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Chart note: “Confirmed PCOS phenotype B (hyperandrogenism and oligo-amenorrhea).”",
    plainEnglish: "A super common hormonal pattern where ovaries produce slightly more androgens (testosterone), causing irregular periods, acne, extra hair, or difficulty releasing eggs regularly.",
    doctorDefinition: "An endocrine disorder characterized by hyperandrogenism, ovulatory dysfunction (oligo/amenorrhea), and polycystic ovarian morphology on ultrasound.",
    howToSayIt: "“My cycles are 45 to 60 days apart and I have stubborn hormonal acne. Could we run a hormone blood panel to check for PCOS?”",
  },
  {
    id: "rotterdam-criteria",
    term: "Rotterdam Diagnostic Criteria",
    pronunciation: "ROT-er-dam cry-TEER-ee-uh",
    moduleId: "pcos",
    moduleTitle: "PCOS & Hormones",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Chart note: “Patient fulfills 2 of 3 Rotterdam criteria (oligo-ovulation + clinical hyperandrogenism).”",
    plainEnglish: "The international medical guideline doctors use to diagnose PCOS. You need at least 2 of these 3: irregular periods, high androgen levels (or symptoms like chin hair/acne), and polycystic ovaries on ultrasound.",
    doctorDefinition: "The 2003 consensus criteria requiring at least two of three features: oligo/anovulation, clinical or biochemical hyperandrogenism, and polycystic ovarian morphology, with exclusion of related disorders.",
    howToSayIt: "“Under the Rotterdam consensus criteria, can we evaluate my lab work and symptom history for a formal PCOS diagnosis?”",
  },
  {
    id: "hyperandrogenism",
    term: "Hyperandrogenism",
    pronunciation: "hy-per-AN-droh-jen-iz-um",
    moduleId: "pcos",
    moduleTitle: "PCOS & Hormones",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Lab note: “Free testosterone elevated at 9.4 pg/mL; elevated DHEA-S 380 ug/dL.”",
    plainEnglish: "Having higher amounts of male-pattern hormones (like testosterone or DHEA-S) in your blood. It can cause coarse facial hair (hirsutism), scalp hair thinning, and persistent cystic acne.",
    doctorDefinition: "Excessive secretion or bioavailability of androgenic hormones in females, presenting clinically as hirsutism, cystic acne, androgenic alopecia, or elevated serum free testosterone.",
    howToSayIt: "“Can we check my total testosterone, free testosterone, and DHEA-S levels to assess for biochemical hyperandrogenism?”",
  },
  {
    id: "insulin-resistance",
    term: "Insulin Resistance",
    pronunciation: "IN-suh-lin ree-ZIS-tins",
    moduleId: "pcos",
    moduleTitle: "PCOS & Hormones",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Lab note: “Fasting insulin 22 uIU/mL with HOMA-IR 4.2 indicating moderate insulin resistance.”",
    plainEnglish: "When your body's cells stop responding properly to insulin. The pancreas pumps out extra insulin, and that high insulin directly instructs your ovaries to produce excess testosterone!",
    doctorDefinition: "A metabolic state wherein normal insulin levels produce a subnormal physiological response, leading to compensatory hyperinsulinemia that stimulates ovarian theca cell androgen production.",
    howToSayIt: "“Could high fasting insulin be driving my ovarian androgen production, and can we test a fasting insulin and glucose ratio?”",
  },
  {
    id: "acanthosis-nigricans",
    term: "Acanthosis Nigricans",
    pronunciation: "ay-kan-THOH-sis NY-grih-kanz",
    moduleId: "pcos",
    moduleTitle: "PCOS & Hormones",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Physical exam note: “Hyperpigmented velvety plaques on posterior neck consistent with acanthosis nigricans.”",
    plainEnglish: "Dark, velvety patches of skin that appear in body creases like the back of your neck or underarms. It is NOT dirt; it is a physical indicator of high circulating insulin levels.",
    doctorDefinition: "A dermatologic condition marked by hyperpigmented, velvety cutaneous plaques in intertriginous flexural folds, strongly associated with severe insulin resistance.",
    howToSayIt: "“I noticed dark velvety skin around the back of my neck. Could this be acanthosis nigricans indicating insulin resistance?”",
  },
  {
    id: "anovulation",
    term: "Anovulation",
    pronunciation: "an-ov-yoo-LAY-shun",
    moduleId: "pcos",
    moduleTitle: "PCOS & Hormones",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Chart note: “Anovulatory dysfunctional uterine bleeding secondary to chronic follicular arrest.”",
    plainEnglish: "When you experience bleeding, but your ovary did not actually release an egg that cycle. Without ovulation, your body doesn't produce calming progesterone, leaving estrogen unopposed.",
    doctorDefinition: "The failure of the ovary to release an oocyte during a menstrual cycle, leading to unopposed estrogen and unpredictable endometrial sloughing.",
    howToSayIt: "“Because my bleeding episodes are unpredictable, could I be having anovulatory cycles rather than true ovulatory periods?”",
  },

  // ==========================================
  // MODULE 5: ENDOMETRIOSIS & PELVIC PAIN (endo)
  // ==========================================
  {
    id: "endometriosis-term",
    term: "Endometriosis",
    pronunciation: "en-doh-mee-tree-OH-sis",
    moduleId: "endo",
    moduleTitle: "Endometriosis",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Operative note: “Laparoscopic exploration reveals Stage II peritoneal endometriosis with cul-de-sac implants.”",
    plainEnglish: "A chronic inflammatory condition where tissue similar to the lining inside the uterus grows outside on other organs (like ovaries, bladder, or bowel), bleeding and causing severe pain.",
    doctorDefinition: "A systemic inflammatory disease characterized by endometrial-like stroma and glandular tissue outside the uterine cavity, inciting persistent inflammation, fibrosis, and chronic pain.",
    howToSayIt: "“I have deep pelvic pain radiating down my legs during periods and pain with bowel movements. I want an evaluation for endometriosis.”",
  },
  {
    id: "retrograde-menstruation",
    term: "Retrograde Menstruation",
    pronunciation: "REH-troh-grayd",
    moduleId: "endo",
    moduleTitle: "Endometriosis",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Pathophysiology note: “Sampson's theory of transtubal retrograde seeding of viable endometrial cells.”",
    plainEnglish: "When period blood and tissue flow backward through the fallopian tubes into the pelvis instead of leaving the body. In endometriosis, those backward cells survive and form painful implants.",
    doctorDefinition: "The transtubal reflux of viable menstrual shedding containing endometrial cells and blood backwards into the peritoneal cavity during menstruation.",
    howToSayIt: "“Why does retrograde flow cause severe inflammatory lesions in some people while other bodies clear it without pain?”",
  },
  {
    id: "laparoscopy-excision",
    term: "Laparoscopy & Excision",
    pronunciation: "lap-uh-ROS-kuh-pee & ek-SIZH-un",
    moduleId: "endo",
    moduleTitle: "Endometriosis",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Surgical consent: “Diagnostic and operative laparoscopy with wide cold-scissors lesion excision.”",
    plainEnglish: "Keyhole surgery with a tiny camera through your belly button to find endometriosis. 'Excision' means surgically cutting out the roots of the lesions completely, which prevents pain from returning.",
    doctorDefinition: "The gold-standard diagnostic and therapeutic minimally invasive procedure; surgical excision achieves complete histological removal of deep infiltrating peritoneal and visceral lesions.",
    howToSayIt: "“Since my ultrasound was normal, I understand superficial endometriosis can only be confirmed via laparoscopy. Can you refer me to an excision specialist?”",
  },
  {
    id: "adhesions",
    term: "Pelvic Adhesions",
    pronunciation: "ad-HEE-zhunz",
    moduleId: "endo",
    moduleTitle: "Endometriosis",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Operative note: “Extensive dense pelvic adhesions tethering left ovary to posterior uterine serosa.”",
    plainEnglish: "Fibrous bands of scar tissue that act like glue inside your pelvis, sticking organs together (like gluing an ovary to your bowel) and causing sharp tugging pain when you stretch or move.",
    doctorDefinition: "Fibrous scar bands forming between adjacent visceral peritoneum surfaces as a result of chronic pelvic inflammation, trauma, or surgical intervention.",
    howToSayIt: "“Could internal pelvic adhesions be causing the sharp, pulling pain I feel on my left side whenever I stretch or exercise?”",
  },
  {
    id: "dyspareunia",
    term: "Dyspareunia",
    pronunciation: "dis-puh-ROO-nee-uh",
    moduleId: "endo",
    moduleTitle: "Endometriosis",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Clinical note: “Deep insertional dyspareunia accompanied by pelvic floor myalgia and levator ani spasm.”",
    plainEnglish: "Recurrent deep pelvic pain or burning before, during, or after sexual intercourse or tampon insertion, often caused by pelvic floor muscle spasms in defense against chronic pain.",
    doctorDefinition: "Persistent or recurrent genital or deep pelvic pain occurring in association with sexual intercourse or penetrative exam, frequently complicated by pelvic floor hypertonicity.",
    howToSayIt: "“I experience deep pelvic pain with tampon insertion and intimacy. Would pelvic floor physical therapy help relax these muscles?”",
  },
  {
    id: "adenomyosis",
    term: "Adenomyosis",
    pronunciation: "ad-uh-noh-my-OH-sis",
    moduleId: "endo",
    moduleTitle: "Endometriosis",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
    chartJargon: "Transvaginal ultrasound: “Globular, enlarged uterus with asymmetrical myometrial thickening; suspect diffuse adenomyosis.”",
    plainEnglish: "Often called endometriosis's sister condition: when the cells that normally line the inside of the uterus burrow deep inside the uterine muscular wall. When you get your period, that trapped muscle tissue bleeds and swells, causing an enlarged, tender uterus, severe knife-like cramps, and unusually heavy periods.",
    doctorDefinition: "A non-malignant gynecological disorder defined by the presence of heterotopic endometrial glands and stroma within the myometrium, accompanied by reactive myometrial hyperplasia and hypertrophy.",
    howToSayIt: "“My bleeding is extremely heavy and my uterus feels tender and swollen during periods. Could we look for signs of adenomyosis on high-resolution pelvic ultrasound or MRI?”",
  },

  // ==========================================
  // MODULE 6: REAL TALK & STIS (realtalk)
  // ==========================================
  {
    id: "asymptomatic",
    term: "Asymptomatic Infection",
    pronunciation: "ay-simp-tuh-MAT-ik",
    moduleId: "realtalk",
    moduleTitle: "Real Talk & STIs",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Screening report: “Asymptomatic chlamydia genital screening positive via urine NAAT assay.”",
    plainEnglish: "Carrying an infection without showing ANY symptoms or feeling sick at all. Over 70% of people with common STIs (like chlamydia or HPV) have zero symptoms, which is why testing is routine care!",
    doctorDefinition: "Presenting no subjective complaints or physical signs of disease despite the active carriage and transmissibility of a pathogen.",
    howToSayIt: "“Since most common STIs are asymptomatic, I want to establish routine screening every six months even though I feel totally fine.”",
  },
  {
    id: "prep-pep",
    term: "PrEP & PEP (HIV Prevention)",
    pronunciation: "PREP and PEP",
    moduleId: "realtalk",
    moduleTitle: "Real Talk & STIs",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Prescription note: “Initiate Truvada for daily pre-exposure prophylaxis (PrEP) with 3-month renal/STI panels.”",
    plainEnglish: "Medications that prevent HIV! PrEP is a daily pill or shot taken *before* potential exposure to stay protected. PEP is an emergency 28-day medication started within 72 hours *after* an exposure.",
    doctorDefinition: "Pre-exposure and post-exposure antiretroviral regimens utilizing tenofovir/emtricitabine to prevent human immunodeficiency virus (HIV) viral integration into host CD4+ T-cell DNA.",
    howToSayIt: "“I want to discuss whether daily PrEP is an appropriate preventative medication for my sexual health plan.”",
  },
  {
    id: "chlamydia-gonorrhea",
    term: "Chlamydia & Gonorrhea",
    pronunciation: "kluh-MID-ee-uh & gon-uh-REE-uh",
    moduleId: "realtalk",
    moduleTitle: "Real Talk & STIs",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Lab order: “Urine nucleic acid amplification test (NAAT) for C. trachomatis and N. gonorrhoeae.”",
    plainEnglish: "Two very common bacterial infections spread through sexual contact. Both are easily cured with standard antibiotics, but if ignored, they can cause pelvic inflammatory disease (PID).",
    doctorDefinition: "Bacterial genital tract infections caused by *Chlamydia trachomatis* and *Neisseria gonorrhoeae*, primary preventable etiologies of upper genital tract scarring and PID.",
    howToSayIt: "“Can we perform a quick urine NAAT screening for chlamydia and gonorrhea as part of my routine checkup today?”",
  },
  {
    id: "hpv",
    term: "Human Papillomavirus (HPV)",
    pronunciation: "aych-pee-VEE",
    moduleId: "realtalk",
    moduleTitle: "Real Talk & STIs",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Immunization record: “Completed 3-dose series of 9-valent recombinant human papillomavirus vaccine.”",
    plainEnglish: "The most common viral STI, which almost all active people come into contact with. Most strains clear up on their own, but the routine HPV vaccine protects against high-risk cancer-causing strains.",
    doctorDefinition: "A double-stranded DNA virus; high-risk oncogenic types (such as 16 and 18) integrate into host cervical genomes, which is preventable via recombinant virus-like particle vaccination.",
    howToSayIt: "“Can you verify that I have received all recommended doses of the HPV vaccine to protect against oncogenic strains?”",
  },
  {
    id: "window-period",
    term: "Diagnostic Window Period",
    pronunciation: "WIN-doh PEER-ee-ud",
    moduleId: "realtalk",
    moduleTitle: "Real Talk & STIs",
    categoryColor: "bg-soft-pink text-raspberry border-raspberry/30",
    chartJargon: "Counseling note: “Patient advised on serological window period; recommend repeat 4th-gen HIV at 45 days.”",
    plainEnglish: "The time gap between when an exposure might have happened and when a clinic test can accurately detect the infection. Testing too early can produce a false negative result!",
    doctorDefinition: "The time interval between initial pathogen transmission and the earliest clinical point when diagnostic assays (antigen, antibody, or NAAT) can reliably detect the infection.",
    howToSayIt: "“If a possible exposure occurred 10 days ago, is that within the window period for an accurate test, or should I re-test in three weeks?”",
  },

  // ==========================================
  // MODULE 7: MIND & SELF (mind)
  // ==========================================
  {
    id: "pmdd",
    term: "PMDD (Premenstrual Dysphoric Disorder)",
    pronunciation: "pee-em-dee-dee",
    moduleId: "mind",
    moduleTitle: "Mind & Self",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Psychiatric note: “DSM-5 criteria fulfilled for PMDD; symptoms strictly confined to late luteal phase.”",
    plainEnglish: "A severe medical condition where the brain reacts unusually intensely to normal hormone drops during the 1 to 2 weeks before your period, causing deep depression or rage that vanishes once bleeding begins.",
    doctorDefinition: "A distinct DSM-5 depressive disorder characterized by affective lability, dysphoria, severe irritability, and somatic symptoms recurring cyclically during the luteal phase and remitting post-menses.",
    howToSayIt: "“For exactly 7 days before my period, I experience overwhelming mood plunges and severe anxiety that disappear when I bleed. Can I be screened for PMDD?”",
  },
  {
    id: "allopregnanolone",
    term: "Allopregnanolone",
    pronunciation: "al-oh-preg-NAN-oh-lohn",
    moduleId: "mind",
    moduleTitle: "Mind & Self",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Neuroendocrine note: “Suspected abnormal GABA-A receptor sensitivity to allopregnanolone fluctuations.”",
    plainEnglish: "A calming chemical made when your body breaks down progesterone. In most people it soothes the nervous system, but in girls with PMDD, brain receptors misread it and trigger panic or mood swings.",
    doctorDefinition: "A neuroactive steroid metabolite of progesterone acting as a positive allosteric modulator of GABA-A receptors, implicated in the pathophysiology of luteal phase mood disorders.",
    howToSayIt: "“Could my cyclical mood drops be driven by GABA receptor sensitivity to allopregnanolone rather than non-cyclical depression?”",
  },
  {
    id: "cortisol",
    term: "Cortisol",
    pronunciation: "KOR-tuh-zol",
    moduleId: "mind",
    moduleTitle: "Mind & Self",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Endocrine note: “Hypothalamic-pituitary-adrenal (HPA) axis hyperactivation suppressing GnRH pulsatility.”",
    plainEnglish: "Your body's chief alarm hormone, released when you are stressed or sleep-deprived. When cortisol stays high for too long, it tells your brain to hit the emergency brake on ovulation and periods.",
    doctorDefinition: "A glucocorticoid steroid hormone synthesized by the adrenal cortex that suppresses hypothalamic gonadotropin-releasing hormone (GnRH) pulsatility during prolonged stress.",
    howToSayIt: "“Could chronic academic stress and elevated cortisol levels be the reason my menstrual cycle has become irregular?”",
  },
  {
    id: "serotonin",
    term: "Serotonin Fluctuations",
    pronunciation: "sair-uh-TOH-nin",
    moduleId: "mind",
    moduleTitle: "Mind & Self",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Pharmacology note: “Intermittent luteal-phase SSRI dosing (fluoxetine 10mg) targeting premenstrual dysphoria.”",
    plainEnglish: "A key brain chemical that manages mood, sleep, and appetite. Because estrogen helps keep serotonin levels high, when estrogen drops before your period, serotonin plunges too, sparking tears and cravings.",
    doctorDefinition: "A monoamine neurotransmitter whose synaptic availability fluctuates downstream of ovarian estrogen receptor stimulation across the menstrual cycle.",
    howToSayIt: "“Because my mood drops sharply when estrogen falls in my late luteal phase, could luteal-phase SSRI therapy help stabilize my serotonin?”",
  },
  {
    id: "body-neutrality",
    term: "Body Neutrality",
    pronunciation: "BAH-dee noo-TRAL-ih-tee",
    moduleId: "mind",
    moduleTitle: "Mind & Self",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Behavioral health note: “Cognitive reframing utilizing body neutrality to reduce dysmorphic weight scrutiny.”",
    plainEnglish: "A liberating mindset where you don't pressure yourself to love how your body looks in every outfit. Instead, you appreciate what your body does for you—letting you breathe, dance, laugh, and live.",
    doctorDefinition: "A psychological and somatic framework that decouples personal self-worth from aesthetic physical appearance, prioritizing functional capability and non-judgmental acceptance.",
    howToSayIt: "“I am adopting body neutrality to decouple my emotional self-worth from normal cyclical water weight fluctuations.”",
  },

  // ==========================================
  // MODULE 8: FEMALE ATHLETE HEALTH (play)
  // ==========================================
  {
    id: "red-s",
    term: "RED-S (Relative Energy Deficiency in Sport)",
    pronunciation: "red-ess",
    moduleId: "play",
    moduleTitle: "Athlete Health",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Sports medicine note: “Clinical diagnosis of RED-S; energy availability estimated <25 kcal/kg FFM/day.”",
    plainEnglish: "When an active girl or athlete does not eat enough fuel to match how hard she trains. The brain turns off periods, slows down metabolism, and pulls minerals out of bones to conserve energy.",
    doctorDefinition: "A clinical syndrome of impaired physiological functioning caused by low energy availability, compromising bone health, immunity, protein synthesis, and cycle regularity.",
    howToSayIt: "“I've increased my training volume and noticed my period vanished and I am always exhausted. Could this be low energy availability or RED-S?”",
  },
  {
    id: "female-athlete-triad",
    term: "Female Athlete Triad",
    pronunciation: "TRI-ad",
    moduleId: "play",
    moduleTitle: "Athlete Health",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Orthopedic note: “Recurrent metatarsal stress fracture in setting of athletic amenorrhea; Female Athlete Triad.”",
    plainEnglish: "Three connected red flags in active girls: under-fueling (not eating enough food for workouts), missing periods, and weak, brittle bones that suffer stress fractures.",
    doctorDefinition: "An interrelationship between low energy availability, menstrual dysfunction (amenorrhea), and decreased bone mineral density leading to osteopenia or osteoporosis.",
    howToSayIt: "“I suffered a second bone stress fracture this season and my period is irregular. I want an evaluation for the Female Athlete Triad.”",
  },
  {
    id: "low-energy-availability",
    term: "Low Energy Availability (LEA)",
    pronunciation: "LO-en-er-jee uh-vay-luh-BIL-ih-tee",
    moduleId: "play",
    moduleTitle: "Athlete Health",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Dietary consult note: “Estimated EA at 22 kcal/kg FFM; target EA >45 kcal/kg FFM for endocrine recovery.”",
    plainEnglish: "The math behind under-fueling: when the calories you eat minus the calories you burn in practice leaves less than 30 calories per kilogram of muscle for your heart, organs, and hormones to survive.",
    doctorDefinition: "The physiological threshold wherein dietary energy intake minus exercise energy expenditure is <30 kcal/kg fat-free mass (FFM)/day, inducing neuroendocrine suppression.",
    howToSayIt: "“Can I work with a sports dietitian to calculate my daily energy availability and ensure I am exceeding the 45 kcal/kg threshold?”",
  },
  {
    id: "ferritin",
    term: "Ferritin (Stored Iron)",
    pronunciation: "FAIR-ih-tin",
    moduleId: "play",
    moduleTitle: "Athlete Health",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Lab note: “Ferritin 11 ng/mL with hemoglobin 12.1 g/dL; stage 1 non-anemic iron deficiency.”",
    plainEnglish: "The battery storage for iron in your body. Active girls lose iron through sweat, foot-strike pounding, and monthly periods. When ferritin dips low, you feel completely wiped out and breathless.",
    doctorDefinition: "A universal intracellular protein that stores iron and releases it in a controlled fashion; the most reliable serum marker for total body iron reserves.",
    howToSayIt: "“Even though my standard hemoglobin is okay, could we check my serum ferritin? Heavy training and periods leave me chronically exhausted.”",
  },
  {
    id: "bone-mineral-density",
    term: "Bone Mineral Density (BMD)",
    pronunciation: "BOHN MIN-er-ul",
    moduleId: "play",
    moduleTitle: "Athlete Health",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "DEXA report: “Lumbar spine Z-score -1.8; low bone mass for chronological age.”",
    plainEnglish: "How strong and densely packed your bones are. Over 90% of your adult skeleton is built before age 20! If estrogen stays low from missed periods, that bone loss can be permanent.",
    doctorDefinition: "The quantitative measurement of bone mineral content per unit area assessed via dual-energy X-ray absorptiometry (DEXA), heavily dependent on pubertal estrogen exposure.",
    howToSayIt: "“Because I had amenorrhea for over six months, should we order a baseline DEXA scan to check my bone mineral density Z-score?”",
  },
  {
    id: "glycogen",
    term: "Glycogen (Muscle & Liver Storage)",
    pronunciation: "GLY-kuh-jin",
    moduleId: "play",
    moduleTitle: "Athlete Health",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Sports nutrition note: “Depleted glycogen reserves following two-a-day practices; counsel on acute carbohydrate restoration.”",
    plainEnglish: "The body's rapid-access storage battery for carbohydrates, packed inside your muscles and liver. During high-intensity sprints, jumps, or fast breaks, your muscles run directly on glycogen. If you under-fuel or skip carbs, your tanks run dry and you 'hit the wall' (sudden exhaustion, heavy legs, and brain fog).",
    doctorDefinition: "A multibranched polysaccharide of glucose that serves as a form of energy storage in animals, primarily synthesized and stored in hepatocytes and skeletal myocytes to buffer blood glucose and power anaerobic glycolysis.",
    howToSayIt: "“I noticed my sprint speed and stamina drop halfway through intense practices. Could we review my daily carbohydrate intake to ensure my muscle glycogen stores are fully replenished?”",
  },
  {
    id: "recovery-window-3-1",
    term: "3:1 Recovery Window (Carb-to-Protein Ratio)",
    pronunciation: "three to one ree-KUV-er-ee",
    moduleId: "play",
    moduleTitle: "Athlete Health",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Post-exercise recovery protocol: “Administer 1.0–1.2 g/kg CHO paired with 0.3 g/kg protein within 45 min post-bout to optimize insulin-mediated glycogen resynthesis.”",
    plainEnglish: "The golden 30- to 45-minute window right after a grueling workout or game when muscle cells act like open sponges. Consuming 3 to 4 grams of easily digestible carbohydrates for every 1 gram of protein (like chocolate milk, a smoothie, or a banana with Greek yogurt) speeds up glycogen refilling by up to 200% and halts muscle breakdown.",
    doctorDefinition: "The biphasic post-exercise metabolic window characterized by elevated insulin sensitivity and GLUT4 translocation, during which co-ingestion of carbohydrates and essential amino acids at a 3:1 or 4:1 ratio maximizes rates of glycogen synthase activity and myofibrillar protein synthesis.",
    howToSayIt: "“What portable snack combos meet the 3:1 carb-to-protein ratio so I can fuel my recovery within 45 minutes of games?”",
  },
  {
    id: "fha",
    term: "Functional Hypothalamic Amenorrhea (FHA)",
    pronunciation: "funk-shun-ul hy-poh-thuh-LAM-ik ay-men-or-EE-uh",
    moduleId: "play",
    moduleTitle: "Athlete Health",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Endocrine note: “Low serum LH/FSH with estradiol <20 pg/mL in female cross-country runner; clinical presentation consistent with FHA secondary to energetic deficit.”",
    plainEnglish: "When the control center of your brain (the hypothalamus) decides that your body is burning too much energy or under too much physical/mental stress, so it deliberately pauses your reproductive system to protect your life. Your ovaries stop receiving hormone pulses, estrogen crashes, and periods disappear.",
    doctorDefinition: "A form of chronic anovulation and hypogonadotropic hypogonadism resulting from suppressed gonadotropin-releasing hormone (GnRH) pulsatility induced by low energy availability, psychological stress, or excessive exercise volume, without identifiable organic or anatomical disease.",
    howToSayIt: "“Since my periods stopped after increasing my training mileage, could this be Functional Hypothalamic Amenorrhea? I'd like to address the underlying energy deficit rather than masking it with birth control pills.”",
  },
  {
    id: "naid-foot-strike",
    term: "Non-Anemic Iron Deficiency (NAID) & Foot-Strike Hemolysis",
    pronunciation: "non uh-NEE-mik EYE-ern dih-FISH-en-see",
    moduleId: "play",
    moduleTitle: "Athlete Health",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Hematology note: “Microtrauma hemolysis; serum ferritin 12 ng/mL with normal Hgb/Hct; athlete presents with exertional fatigue and lactic acid intolerance.”",
    plainEnglish: "You don't have to be officially 'anemic' to feel wiped out! Runners and jumping athletes physically crush red blood cells inside the capillaries of their soles every time their feet strike the hard ground (foot-strike hemolysis). You also lose iron through heavy sweating. When your ferritin storage drops below 30 ng/mL, your endurance drops even if your regular blood counts look 'normal'.",
    doctorDefinition: "Depleted somatic iron stores (ferritin <30 ng/mL) with preserved hemoglobin and hematocrit, frequently exacerbated in endurance athletes by intravascular hemolysis from mechanical ground reaction forces (foot-strike hemolysis), gastrointestinal micro-bleeding, and hepcidin-mediated absorption blocks.",
    howToSayIt: "“Could we check my ferritin levels rather than just a basic hemoglobin test? As a runner, I'm concerned about foot-strike hemolysis and non-anemic iron deficiency impacting my performance.”",
  },
  {
    id: "estrogen-bone-shield",
    term: "Estrogen Bone Shield (Athletic Osteopenia)",
    pronunciation: "ES-troh-jin BOHN SHEELD",
    moduleId: "play",
    moduleTitle: "Athlete Health",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Dual-energy X-ray absorptiometry: “Z-score -1.6 at femoral neck; adolescent athletic osteopenia secondary to chronic hypoestrogenism.”",
    plainEnglish: "Estrogen acts like a natural bulletproof shield for young bones by keeping bone-dissolving cells in check. Teen and young adult years are the ONLY window when your body deposits high-density bone mass. If missing periods rob your body of estrogen, bone density drops rapidly (osteopenia), opening the door to stress fractures in feet, shins, or hips.",
    doctorDefinition: "The protective skeletal regulatory mechanism whereby circulating 17β-estradiol binds osteoblast and osteocyte estrogen receptors (ER-alpha) to inhibit RANKL-induced osteoclastic bone resorption; hypoestrogenemia in active adolescents impairs peak bone mass acquisition, predisposing to premature micro-fractures.",
    howToSayIt: "“Because I haven't had a period in several months, I am worried about the loss of estrogen's protective effect on my bones. How can we assess my bone mineral density?”",
  },
  {
    id: "electrolytes-hyponatremia",
    term: "Electrolytes & Exercise-Associated Hyponatremia (EAH)",
    pronunciation: "ee-lek-troh-lytes / hy-poh-nuh-TREE-mee-uh",
    moduleId: "play",
    moduleTitle: "Athlete Health",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Post-event medical tent note: “Serum sodium 129 mEq/L following 4-hour competition in high heat; diagnosis of exercise-associated hyponatremia due to over-hydration with hypotonic water.”",
    plainEnglish: "Essential mineral salts (sodium, potassium, magnesium, and chloride) that conduct electrical signals to contract your muscles and keep your heart beating steadily. If you sweat heavily and drink huge amounts of plain water without sodium, you dilute your blood's salt levels (hyponatremia), which causes severe muscle cramps, nausea, confusion, and dizziness.",
    doctorDefinition: "Essential ionized minerals regulating osmotic pressure, fluid homeostasis, and neuromuscular transmission; excessive consumption of hypotonic fluids relative to sweat sodium losses during prolonged exertion causes exercise-associated hyponatremia (serum Na+ <135 mmol/L).",
    howToSayIt: "“During long training sessions in the heat, how should I balance water intake with sodium electrolytes to prevent muscle cramps and hyponatremia?”",
  },
  {
    id: "iron-inhibitors-facilitators",
    term: "Iron Blockers (Tannins & Phytates) vs. Facilitators (Vitamin C)",
    pronunciation: "TAN-inz and FY-tayts vs uh-SKOR-bik ASS-id",
    moduleId: "play",
    moduleTitle: "Athlete Health",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Clinical nutrition assessment: “Impaired non-heme iron bioavailability attributed to concurrent consumption of polyphenol/tannin-rich beverages with meals.”",
    plainEnglish: "Plant-based iron (non-heme iron in spinach, beans, and lentils) needs help getting absorbed into your bloodstream. Tannins (found in coffee and tea) and phytates (in unsoaked whole grains) bind to iron like handcuffs, blocking up to 70% of absorption. But pairing plant iron with Vitamin C (ascorbic acid, like citrus, bell peppers, or strawberries) triples absorption!",
    doctorDefinition: "Nutritional biochemical interactions affecting intestinal divalent metal transporter 1 (DMT1) uptake; polyphenols (tannins) and phytic acid form insoluble chelates with ferric iron (Fe3+), whereas ascorbic acid reduces ferric to soluble ferrous iron (Fe2+), dramatically enhancing mucosal absorption.",
    howToSayIt: "“Since I eat a largely plant-based diet, should I separate coffee and tea from my meals and pair iron-rich foods with Vitamin C to maximize absorption?”",
  },
  {
    id: "overtraining-syndrome",
    term: "Overtraining Syndrome (OTS) & Autonomic Exhaustion",
    pronunciation: "oh-ver-TRAYN-ing SIN-drohm",
    moduleId: "play",
    moduleTitle: "Athlete Health",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Sports medicine note: “Persistent parasympathetic exhaustion and exercise intolerance; clinical diagnosis of Overtraining Syndrome.”",
    plainEnglish: "When extreme physical training outpaces your body's ability to recover. Instead of getting faster and stronger, your nervous system burns out, your waking heart rate spikes, sleep fractures, and performance collapses.",
    doctorDefinition: "A maladaptive neuroendocrine and autonomic condition characterized by chronic performance decrements persisting for weeks to months despite prolonged rest, accompanied by hormonal dysregulation and mood disturbances.",
    howToSayIt: "“My resting heart rate is elevated, I feel chronically exhausted, and my times are getting worse. Could we evaluate for overtraining syndrome rather than just increasing mileage?”",
  },
  {
    id: "low-t3-syndrome",
    term: "Low T3 Syndrome (Euthyroid Sick Syndrome in Athletes)",
    pronunciation: "LO TEE-three SIN-drohm",
    moduleId: "play",
    moduleTitle: "Athlete Health",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Endocrine lab report: “Suppressed Free T3 at 2.1 pg/mL with normal TSH; consistent with non-thyroidal illness syndrome secondary to energetic deficit.”",
    plainEnglish: "When your body is not getting enough food to match your workouts, your liver shuts down the conversion of thyroid hormone (T4 into active T3). This puts your body in 'emergency battery saver mode' to slow down your metabolism, making your hands and feet feel freezing cold.",
    doctorDefinition: "An adaptive neuroendocrine downregulation wherein low energy availability suppresses hepatic 5'-deiodinase activity, blunting active triiodothyronine (T3) to decrease resting metabolic rate without primary thyroid gland pathology.",
    howToSayIt: "“I am freezing even in warm rooms and feeling sluggish despite training hard. Could we check my Free T3 levels to see if low energy availability is downregulating my metabolism?”",
  },
  {
    id: "hpa-axis-cortisol",
    term: "HPA Axis Dysregulation & Nocturnal Cortisol",
    pronunciation: "H-P-A AK-sis / KOR-tih-sawl",
    moduleId: "play",
    moduleTitle: "Athlete Health",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Endocrinology note: “Hypercortisolemia with blunted diurnal variation; nocturnal cortisol spikes disrupting deep slow-wave sleep architecture.”",
    plainEnglish: "The communication network between your brain and adrenal glands. When you overtrain without enough food, this system stays stuck in emergency 'fight or flight' mode. Cortisol spikes at 2 AM instead of morning, waking you up in a sweat with a racing heart and shutting down your reproductive hormones.",
    doctorDefinition: "Dysregulation of the hypothalamic-pituitary-adrenal axis driven by chronic uncompensated physiological stress, leading to blunted diurnal cortisol rhythms, nocturnal cortisol surges, and downstream suppression of hypothalamic GnRH pulsatility.",
    howToSayIt: "“I feel 'tired but wired' and keep waking up at 2 AM with a racing pulse. Could chronic training stress be throwing off my cortisol and adrenal rhythm?”",
  },

  // ==========================================
  // MODULE 9: THE BIGGER PICTURE (factors)
  // ==========================================
  {
    id: "period-poverty",
    term: "Period Poverty",
    pronunciation: "PEER-ee-ud POV-er-tee",
    moduleId: "factors",
    moduleTitle: "The Bigger Picture",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Social determinants of health (SDOH): “Patient reports inability to consistently afford menstrual products.”",
    plainEnglish: "The inability to afford or access menstrual hygiene products (pads, tampons, cups), clean private restrooms, or proper disposal bins, forcing students to miss school or use unsafe items.",
    doctorDefinition: "Lack of access to sanitary products, menstrual hygiene education, toilets, hand washing facilities, and waste management, exacerbating educational inequality.",
    howToSayIt: "“Our youth advocacy group is presenting data to the school board showing that period poverty directly lowers student attendance rates.”",
  },
  {
    id: "tampon-tax",
    term: "Tampon Tax",
    pronunciation: "TAM-pon taks",
    moduleId: "factors",
    moduleTitle: "The Bigger Picture",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Policy brief: “Legislative repeal of luxury excise classification on female hygiene supplies.”",
    plainEnglish: "An unfair sales tax placed on menstrual products by classifying them as non-essential 'luxury items,' while items like men's shaving cream or golf club memberships are often tax-exempt.",
    doctorDefinition: "State and municipal sales taxes levied against menstrual hygiene necessities through discriminatory classification as non-essential luxury commodities.",
    howToSayIt: "“Under menstrual equity legislation, we are lobbying state representatives to repeal the sales tax on essential menstrual healthcare supplies.”",
  },
  {
    id: "maternity-desert",
    term: "Reproductive Care Desert",
    pronunciation: "DEZ-ert",
    moduleId: "factors",
    moduleTitle: "The Bigger Picture",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Public health index: “Rural county designated maternal health desert with zero practicing OB/GYN clinicians.”",
    plainEnglish: "A county, town, or rural area where there are zero obstetricians, gynecologists, or hospitals with birthing centers, forcing people to travel hours just to get basic reproductive care.",
    doctorDefinition: "A geographic region characterized by a severe lack of obstetric and gynecologic resources, defined by having no hospitals providing obstetric care and no OB/GYN providers.",
    howToSayIt: "“Because our rural county is classified as a reproductive healthcare desert, what telehealth and mobile clinic resources are available to our patients?”",
  },
  {
    id: "medical-interpreter",
    term: "Certified Medical Interpreter",
    pronunciation: "in-TER-pruh-ter",
    moduleId: "factors",
    moduleTitle: "The Bigger Picture",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Chart documentation: “Informed consent obtained with Spanish certified medical interpreter (#39281) via telehealth.”",
    plainEnglish: "A professional translator trained specifically in medical words who ensures doctors and patients understand each other clearly. Under federal law, clinics must provide one for free!",
    doctorDefinition: "A credentialed healthcare communication specialist legally mandated under Title VI of the Civil Rights Act to provide accurate, unbiased linguistic translation in clinical settings.",
    howToSayIt: "“I have the right under federal law to a qualified, certified medical interpreter in my preferred language during this clinical appointment.”",
  },
  {
    id: "health-literacy",
    term: "Health Literacy & Self-Advocacy",
    pronunciation: "helth LIT-er-uh-see",
    moduleId: "factors",
    moduleTitle: "The Bigger Picture",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Adolescent transition protocol: “Health literacy screening demonstrates competent patient self-advocacy skills.”",
    plainEnglish: "Having the knowledge, confidence, and vocabulary to understand what a doctor tells you, ask the right questions, and make informed choices that honor your own body.",
    doctorDefinition: "The degree to which individuals have the ability to find, understand, and use information and services to inform health-related decisions and actions for themselves and others.",
    howToSayIt: "“Improving adolescent health literacy empowers young patients to self-advocate and dramatically reduces diagnostic delays for chronic conditions.”",
  },
  {
    id: "gender-research-gap",
    term: "The Gender Research Gap",
    pronunciation: "JEN-der ree-SURCH gap",
    moduleId: "factors",
    moduleTitle: "The Bigger Picture",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Health equity brief: “The historical gender research gap in biomedical cohorts contributes to protracted diagnostic intervals for female patients.”",
    plainEnglish: "The historical and enduring reality that most medical research, drug trials, and symptom guides were tested almost exclusively on male cells, male animals, and men. This created a massive blind spot where conditions affecting women take longer to diagnose and treatments are less tailored.",
    doctorDefinition: "The systemic underrepresentation or historical exclusion of female subjects in biomedical research and clinical trials, leading to medical knowledge calibrated predominantly to male physiology.",
    howToSayIt: "“Because of the historical gender research gap, what does current clinical literature show about how this condition and its medications specifically present in female biology?”",
  },
  {
    id: "nih-revitalization-act",
    term: "NIH Revitalization Act (1993)",
    pronunciation: "en-eye-AYCH ree-vy-tuh-luh-ZAY-shun akt",
    moduleId: "factors",
    moduleTitle: "The Bigger Picture",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Public health mandate: “42 U.S.C. 289a-2 compliance mandating the inclusion of women and racial minorities in all NIH-funded clinical research.”",
    plainEnglish: "The landmark United States federal law passed in 1993 that finally made it mandatory for government-funded medical clinical trials to include women and girls. Prior to this law, most prescription drug safety guidelines were built without testing on female hormonal cycles.",
    doctorDefinition: "United States public law (P.L. 103-43) establishing statutory mandates for the National Institutes of Health to ensure women and minorities are included as clinical trial subjects and that trials are designed to analyze sex differences.",
    howToSayIt: "“The 1993 NIH Revitalization Act was the turning point requiring clinical trials to include women. Are there sex-disaggregated clinical trial results available for this treatment?”",
  },
  {
    id: "diagnostic-delay",
    term: "Diagnostic Delay (Average 7–10 Years)",
    pronunciation: "dy-ug-NAHS-tik dee-LAY",
    moduleId: "factors",
    moduleTitle: "The Bigger Picture",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Epidemiological profile: “Endometriosis cohort exhibits a mean diagnostic delay of 7.5 years across initial presentations.”",
    plainEnglish: "The delay between when a patient first reports symptoms to a doctor and when they finally receive an accurate diagnosis. For gynecological conditions like endometriosis and PCOS, this delay averages 7 to 10 years because adolescent pain is frequently normalized as 'just bad cramps.'",
    doctorDefinition: "The time interval between the initial onset or presentation of disease symptoms and the definitive clinical, radiological, or histological diagnosis.",
    howToSayIt: "“Given that the average diagnostic delay for endometriosis is 7 to 10 years, I want to proactively investigate my symptoms now rather than waiting years while they worsen.”",
  },
  {
    id: "symptom-tracking",
    term: "Objective Symptom Tracking & Journaling",
    pronunciation: "ub-JEK-tiv SIMP-tum TRAK-ing",
    moduleId: "factors",
    moduleTitle: "The Bigger Picture",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Clinical intake: “Patient presents with structured 90-day objective symptom log documenting pain frequency, bleeding volume, and medication response.”",
    plainEnglish: "The practice of keeping a concrete, dated record of symptoms (timing, 1–10 pain scale, interference with school/sports, pad count, and medications taken). Presenting objective data transforms vague conversations into undeniable clinical evidence that doctors take seriously.",
    doctorDefinition: "The prospective, systematic recording of quantifiable patient-reported outcomes (PROs), pain scales, and physiological events to facilitate accurate differential diagnosis and ongoing tracking over time.",
    howToSayIt: "“I brought a 3-month objective symptom journal detailing my pain scores, school absences, and exact medication responses so we can evaluate the patterns together.”",
  },
  {
    id: "second-opinion",
    term: "Second Opinion & Specialist Consultation",
    pronunciation: "SEK-und uh-PIN-yun",
    moduleId: "factors",
    moduleTitle: "The Bigger Picture",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Care plan: “Patient elective request for secondary specialist consultation regarding surgical vs. medical management.”",
    plainEnglish: "Consulting an independent second doctor or specialist to review your symptoms, test results, and treatment plan. It is a completely standard, routine medical right and the hallmark of self-advocacy—never feel guilty or worried about hurting a doctor's feelings!",
    doctorDefinition: "A formal consultation with an independent qualified clinician to verify a preliminary diagnosis, evaluate proposed therapeutic interventions, or explore alternative management strategies.",
    howToSayIt: "“I appreciate your assessment, but because my symptoms remain unmanaged, I would like to seek a second opinion from a specialized gynecologist. Can your office coordinate the records transfer?”",
  },
  {
    id: "medical-gaslighting",
    term: "Medical Gaslighting & Symptom Invalidation",
    pronunciation: "MED-ih-kul GAS-ly-ting",
    moduleId: "factors",
    moduleTitle: "The Bigger Picture",
    categoryColor: "bg-light-teal text-deep-teal border-deep-teal/30",
    chartJargon: "Clinical advocacy note: “Patient history notable for recurrent dismissal of debilitating menstrual symptoms prior to subspecialty referral.”",
    plainEnglish: "When doctors or clinical providers brush off, trivialize, or minimize your real physical pain by blaming it on 'normal teenage stress', 'dramatics', or 'anxiety.' It is a recognized systemic problem that contributes to multi-year diagnostic delays. Knowing your rights, bringing objective symptom logs, and asking providers to chart their refusals protects your care.",
    doctorDefinition: "The systematic invalidation or trivialization of a patient's reported symptoms by healthcare professionals, frequently resulting in prolonged diagnostic latency, therapeutic neglect, and secondary psychological distress.",
    howToSayIt: "“I feel my symptoms are being attributed strictly to anxiety or normal cramps. I would like you to document in my chart that we are not ordering further diagnostic evaluations today despite my severe pain.”",
  },
];

export function LittleHealthDictionary({
  compact = false,
  initialModuleId,
}: {
  compact?: boolean;
  initialModuleId?: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>(initialModuleId || "all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Sync if initialModuleId prop changes (e.g. user opens different module)
  useEffect(() => {
    if (initialModuleId) {
      setActiveTab(initialModuleId);
    }
  }, [initialModuleId]);

  // Compute counts per module
  const moduleCounts = useMemo(() => {
    const counts: Record<string, number> = { all: DICTIONARY_ENTRIES.length };
    DICTIONARY_ENTRIES.forEach((entry) => {
      counts[entry.moduleId] = (counts[entry.moduleId] || 0) + 1;
    });
    return counts;
  }, []);

  const activeModuleMeta = useMemo(() => {
    return MODULE_TABS.find((t) => t.id === activeTab) || MODULE_TABS[0];
  }, [activeTab]);

  const filteredEntries = useMemo(() => {
    return DICTIONARY_ENTRIES.filter((entry) => {
      const matchesModule = activeTab === "all" || entry.moduleId === activeTab;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesModule;

      const matchesSearch =
        entry.term.toLowerCase().includes(q) ||
        entry.plainEnglish.toLowerCase().includes(q) ||
        entry.pronunciation.toLowerCase().includes(q) ||
        entry.moduleTitle.toLowerCase().includes(q) ||
        entry.doctorDefinition.toLowerCase().includes(q) ||
        (entry.chartJargon && entry.chartJargon.toLowerCase().includes(q));

      return matchesModule && matchesSearch;
    });
  }, [searchQuery, activeTab]);

  const getTabButtonClass = (tab: ModuleTab) => {
    const isSelected = activeTab === tab.id;

    if (isSelected) {
      switch (tab.groupColor) {
        case "purple":
          return "bg-purple-600 text-white border-2 border-purple-800 shadow-xs font-extrabold scale-[1.02]";
        case "teal":
          return "bg-light-teal text-deep-teal border-2 border-deep-teal shadow-xs font-extrabold scale-[1.02]";
        case "pink":
          return "bg-soft-pink text-raspberry border-2 border-raspberry shadow-xs font-extrabold scale-[1.02]";
        case "coral":
          return "bg-[#FFE1DB] text-[#B83F68] border-2 border-coral shadow-xs font-extrabold scale-[1.02]";
        default:
          return "bg-amber-400 text-slate-950 border-2 border-amber-600 shadow-xs font-extrabold scale-[1.02]";
      }
    }

    // Inactive state
    switch (tab.groupColor) {
      case "purple":
        return "bg-white text-purple-900 border border-purple-300 hover:bg-purple-100/60";
      case "teal":
        return "bg-white text-deep-teal/80 border border-light-teal/70 hover:bg-light-teal/20";
      case "pink":
        return "bg-white text-raspberry/80 border border-soft-pink/70 hover:bg-soft-pink/20";
      case "coral":
        return "bg-white text-[#B83F68]/80 border border-coral/50 hover:bg-[#FFE1DB]/30";
      default:
        return "bg-white text-charcoal/75 border border-amber-300 hover:bg-amber-100/50";
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-amber-50/70 via-white to-orange-50/30 border-2 border-amber-300/80 p-5 sm:p-6 shadow-sm space-y-4">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs shrink-0">
            <BookOpen className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-serif font-bold text-lg sm:text-xl text-deep-teal m-0">
                Little Health Dictionary & Medical Jargon Buster
              </h4>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-200 text-amber-950 px-2.5 py-0.5 rounded-full border border-amber-300">
                Plain English + Chart Code
              </span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/75 m-0 font-sans mt-0.5">
              Doctor shorthand, chart buzzwords, and tricky medical terms translated into clear, empowering language. <span className="font-semibold text-deep-teal">(This is education, not medical advice.)</span>
            </p>
          </div>
        </div>

        <div className="text-xs text-charcoal/70 font-semibold shrink-0 bg-white px-3 py-1.5 rounded-full border border-amber-200 shadow-2xs self-start sm:self-center">
          Showing <span className="font-bold text-deep-teal">{filteredEntries.length}</span> {filteredEntries.length === 1 ? "word" : "words"}
        </div>
      </div>

      {/* Module Tabs Navigation */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-charcoal/70 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Select a Topic or Jargon Tab:</span>
          </span>
          {activeTab !== "all" && (
            <button
              onClick={() => setActiveTab("all")}
              className="text-[11px] font-bold text-deep-teal hover:text-raspberry underline transition-colors"
            >
              View All Words & Jargon ({DICTIONARY_ENTRIES.length})
            </button>
          )}
        </div>

        {/* Scrollable Tab Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
          {MODULE_TABS.map((tab) => {
            const count = moduleCounts[tab.id] || 0;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setExpandedId(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${getTabButtonClass(
                  tab
                )}`}
              >
                {tab.id === "jargon" && (
                  <Stethoscope className="w-3 h-3 text-current shrink-0" />
                )}
                <span>{tab.shortLabel}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    activeTab === tab.id
                      ? "bg-black/20 text-white"
                      : "bg-black/5 text-charcoal/70"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Explanation Banner */}
      <div className="px-3.5 py-2.5 rounded-xl bg-amber-100/50 border border-amber-200/80 flex items-center justify-between gap-3 text-xs text-charcoal/85">
        <div className="flex items-center gap-2">
          <span className="font-bold text-deep-teal">{activeModuleMeta.label}:</span>
          <span className="text-charcoal/75">{activeModuleMeta.tagline}</span>
        </div>
        {activeTab !== "all" && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-deep-teal border border-amber-200 shrink-0">
            {filteredEntries.length} Terms
          </span>
        )}
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${activeTab === "all" ? "all words & jargon" : `${activeModuleMeta.shortLabel} terms`} (e.g. WNL, R/O, idiopathic, dysmenorrhea, prostaglandins)...`}
          className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-amber-300 text-xs sm:text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-amber-400 font-sans shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-charcoal/40 hover:text-charcoal transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dictionary Word Cards Grid */}
      <div
        className={`grid grid-cols-1 ${
          compact ? "gap-3" : "sm:grid-cols-2 gap-3.5"
        } max-h-[480px] overflow-y-auto pr-1 scrollbar-thin`}
      >
        {filteredEntries.length === 0 ? (
          <div className="col-span-full p-8 text-center bg-white rounded-xl border border-amber-200 text-charcoal/70 text-xs sm:text-sm space-y-2">
            <p className="font-semibold text-charcoal/90 m-0">
              No terms found matching &ldquo;{searchQuery}&rdquo; in {activeModuleMeta.label}.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="text-xs font-bold text-deep-teal hover:underline pt-1"
            >
              Clear search & view all words →
            </button>
          </div>
        ) : (
          filteredEntries.map((entry) => {
            const isExpanded = expandedId === entry.id;

            return (
              <div
                key={entry.id}
                className="p-4 rounded-xl bg-white border-2 border-amber-200/90 shadow-2xs hover:shadow-xs transition-all space-y-2.5 flex flex-col justify-between hover:border-amber-400"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h5 className="font-serif font-bold text-base text-deep-teal m-0 leading-tight">
                        {entry.term}
                      </h5>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-charcoal/70 bg-amber-50 px-2 py-0.5 rounded mt-1 border border-amber-200/70 font-semibold">
                        <Volume2 className="w-3 h-3 text-amber-700" />
                        &ldquo;{entry.pronunciation}&rdquo;
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${entry.categoryColor} shrink-0`}
                    >
                      {entry.moduleTitle}
                    </span>
                  </div>

                  {/* Doctor Jargon / Chart Note Callout */}
                  {entry.chartJargon && (
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-sans text-slate-800 flex items-start gap-1.5 mt-2 shadow-2xs">
                      <FileText className="w-3.5 h-3.5 text-slate-600 mt-0.5 shrink-0" />
                      <div className="leading-snug">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 block">
                          Doctor / Chart Jargon:
                        </span>
                        <span className="italic text-[11px] text-slate-800 font-mono">
                          {entry.chartJargon}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Plain English Translation */}
                  <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/70 text-xs text-charcoal/90 leading-relaxed font-sans mt-2">
                    <strong className="text-amber-950 font-bold block mb-0.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Plain English Meaning:</span>
                    </strong>
                    {entry.plainEnglish}
                  </div>
                </div>

                {/* Expandable Clinical Details & Doctor Script */}
                <div>
                  {isExpanded ? (
                    <div className="space-y-2.5 pt-2 border-t border-amber-100 text-xs animate-in fade-in duration-150">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5 mb-0.5">
                          <Stethoscope className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                          <span>Clinical Pathology Definition:</span>
                        </span>
                        <p className="text-slate-800 italic text-[11.5px] m-0 leading-relaxed">
                          {entry.doctorDefinition}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 text-[11.5px] leading-relaxed">
                        <strong className="block mb-0.5 font-bold flex items-center gap-1.5 text-emerald-900">
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>What to say in your appointment:</span>
                        </strong>
                        {entry.howToSayIt}
                      </div>

                      <button
                        onClick={() => setExpandedId(null)}
                        className="text-[11px] font-bold text-amber-900 hover:underline pt-0.5 block"
                      >
                        Hide clinical details ↑
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setExpandedId(entry.id)}
                      className="text-[11.5px] font-bold text-deep-teal hover:text-raspberry transition-colors flex items-center gap-1 pt-1 group"
                    >
                      <span>How to say this to a doctor</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
