"use client";

import React, { useState, useMemo, useEffect } from "react";
import { BookOpen, Search, Volume2, Sparkles, X, ChevronRight, Stethoscope, MessageSquare } from "lucide-react";

export interface DictionaryEntry {
  id: string;
  term: string;
  pronunciation: string;
  moduleId: "body" | "cycle" | "conditions" | "pcos" | "endo" | "realtalk" | "mind" | "play" | "factors";
  moduleTitle: string;
  categoryColor: string;
  plainEnglish: string;
  doctorDefinition: string;
  howToSayIt: string;
}

export interface ModuleTab {
  id: string; // "all" | "body" | "cycle" | etc.
  label: string;
  shortLabel: string;
  groupColor: "teal" | "pink" | "coral" | "all";
  tagline: string;
}

export const MODULE_TABS: ModuleTab[] = [
  {
    id: "all",
    label: "All Modules",
    shortLabel: "All Words",
    groupColor: "all",
    tagline: "Explore all tricky medical and health words across every ReproUs module.",
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
    tagline: "Tricky words on period poverty, the tampon tax, and medical interpreter rights.",
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
  // MODULE 1: BODY BASICS (body)
  // ==========================================
  {
    id: "menarche",
    term: "Menarche",
    pronunciation: "men-AR-kee",
    moduleId: "body",
    moduleTitle: "Body Basics",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
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
    plainEnglish: "Known as the 'pregnancy hormone.' It is produced by the early placenta right after an egg implants in the uterus. Home urine tests detect this hormone.",
    doctorDefinition: "A heterodimeric glycoprotein hormone secreted by the syncytiotrophoblast of the blastocyst that stimulates continuous corpus luteal progesterone synthesis.",
    howToSayIt: "“Could we run a quantitative serum hCG blood test to accurately measure my hormone levels rather than relying on a home urine test?”",
  },
  {
    id: "speculum",
    term: "Speculum",
    pronunciation: "SPEK-yuh-lum",
    moduleId: "conditions",
    moduleTitle: "Reproductive Care",
    categoryColor: "bg-[#FFE1DB] text-[#B83F68] border-coral/40",
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
    plainEnglish: "Recurrent deep pelvic pain or burning before, during, or after sexual intercourse or tampon insertion, often caused by pelvic floor muscle spasms in defense against chronic pain.",
    doctorDefinition: "Persistent or recurrent genital or deep pelvic pain occurring in association with sexual intercourse or penetrative exam, frequently complicated by pelvic floor hypertonicity.",
    howToSayIt: "“I experience deep pelvic pain with tampon insertion and intimacy. Would pelvic floor physical therapy help relax these muscles?”",
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
    plainEnglish: "How strong and densely packed your bones are. Over 90% of your adult skeleton is built before age 20! If estrogen stays low from missed periods, that bone loss can be permanent.",
    doctorDefinition: "The quantitative measurement of bone mineral content per unit area assessed via dual-energy X-ray absorptiometry (DEXA), heavily dependent on pubertal estrogen exposure.",
    howToSayIt: "“Because I had amenorrhea for over six months, should we order a baseline DEXA scan to check my bone mineral density Z-score?”",
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
    plainEnglish: "Having the knowledge, confidence, and vocabulary to understand what a doctor tells you, ask the right questions, and make informed choices that honor your own body.",
    doctorDefinition: "The degree to which individuals have the ability to find, understand, and use information and services to inform health-related decisions and actions for themselves and others.",
    howToSayIt: "“Improving adolescent health literacy empowers young patients to self-advocate and dramatically reduces diagnostic delays for chronic conditions.”",
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
        entry.doctorDefinition.toLowerCase().includes(q);

      return matchesModule && matchesSearch;
    });
  }, [searchQuery, activeTab]);

  const getTabButtonClass = (tab: ModuleTab) => {
    const isSelected = activeTab === tab.id;

    if (isSelected) {
      switch (tab.groupColor) {
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
                Little Health Dictionary
              </h4>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-200 text-amber-950 px-2.5 py-0.5 rounded-full border border-amber-300">
                Plain English Jargon Buster
              </span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/75 m-0 font-sans mt-0.5">
              Hard medical words translated into plain English with phonetic pronunciations and appointment scripts.
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
            <span>Select a Module Tab:</span>
          </span>
          {activeTab !== "all" && (
            <button
              onClick={() => setActiveTab("all")}
              className="text-[11px] font-bold text-deep-teal hover:text-raspberry underline transition-colors"
            >
              View All Words ({DICTIONARY_ENTRIES.length})
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
                <span>{tab.shortLabel}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    activeTab === tab.id
                      ? "bg-black/15 text-current"
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
            {filteredEntries.length} Hard Words
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
          placeholder={`Search ${activeTab === "all" ? "all words" : `${activeModuleMeta.shortLabel} words`} (e.g. dysmenorrhea, prostaglandins, laparoscopy)...`}
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
        } max-h-[460px] overflow-y-auto pr-1 scrollbar-thin`}
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

                  {/* Plain English Translation */}
                  <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/70 text-xs text-charcoal/90 leading-relaxed font-sans mt-2">
                    <strong className="text-amber-950 font-bold block mb-0.5 flex items-center gap-1">
                      <span>✨ Plain English Meaning:</span>
                    </strong>
                    {entry.plainEnglish}
                  </div>
                </div>

                {/* Expandable Clinical Details & Doctor Script */}
                <div>
                  {isExpanded ? (
                    <div className="space-y-2.5 pt-2 border-t border-amber-100 text-xs animate-in fade-in duration-150">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1 mb-0.5">
                          <Stethoscope className="w-3 h-3 text-slate-600" />
                          <span>Clinical Pathology Definition:</span>
                        </span>
                        <p className="text-slate-800 italic text-[11.5px] m-0 leading-relaxed">
                          {entry.doctorDefinition}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 text-[11.5px] leading-relaxed">
                        <strong className="block mb-0.5 font-bold flex items-center gap-1 text-emerald-900">
                          <MessageSquare className="w-3 h-3 text-emerald-700" />
                          <span>💬 What to say in your appointment:</span>
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
