"use client";

import React from "react";
import { ExternalLink, BookOpen, FileCheck, HeartHandshake, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ReferenceItem {
  number: string;
  type: "Research article" | "Clinical guideline" | "Patient education resource" | "Additional reading";
  title: string;
  source: string;
  linkText?: string;
  url?: string;
}

interface EducationalReferencesProps {
  categoryId?: string | null;
  customTitle?: string;
  customItems?: ReferenceItem[];
  compact?: boolean;
  className?: string;
}

const DEFAULT_REFERENCES: Record<string, ReferenceItem[]> = {
  default: [
    {
      number: "01",
      type: "Clinical guideline",
      title: "Menstruation in Girls and Adolescents: Using the Menstrual Cycle as a Vital Sign (Committee Opinion No. 651)",
      source: "American College of Obstetricians and Gynecologists (ACOG)",
      url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2015/12/menstruation-in-girls-and-adolescents-using-the-menstrual-cycle-as-a-vital-sign",
      linkText: "Read ACOG Clinical Opinion",
    },
    {
      number: "02",
      type: "Clinical guideline",
      title: "Textbook of Adolescent Gynecology & Pubertal Endocrinology",
      source: "The Global Library of Women's Medicine (GLOWM / FIGO)",
      url: "https://www.glowm.com",
      linkText: "Explore GLOWM Guidelines",
    },
    {
      number: "03",
      type: "Research article",
      title: "Adolescent Menstrual & Reproductive Health: A Population-Level Review",
      source: "Journal of Adolescent Health / National Institutes of Health",
      url: "https://www.jahonline.org",
      linkText: "View Clinical Study",
    },
    {
      number: "04",
      type: "Patient education resource",
      title: "Reproductive & Endocrine Health for Youth: Fact Sheets & Diagrams",
      source: "MedlinePlus / U.S. National Library of Medicine",
      url: "https://medlineplus.gov/teensemualhealth.html",
      linkText: "Browse Health Guides",
    },
  ],
  body: [
    {
      number: "01",
      type: "Research article",
      title: "Neuroendocrine Maturation and Pubertal Timing in Adolescence",
      source: "Endocrine Reviews / The Endocrine Society",
      url: "https://academic.oup.com/edrv",
      linkText: "View Physiology Study",
    },
    {
      number: "02",
      type: "Clinical guideline",
      title: "Adolescent Health Care: Physical Development and Counseling Guidelines",
      source: "American Academy of Pediatrics (AAP)",
      url: "https://www.aap.org",
      linkText: "Read Clinical Guide",
    },
    {
      number: "03",
      type: "Clinical guideline",
      title: "Textbook of Adolescent Health: Tanner Staging & Biological Variation",
      source: "The Global Library of Women's Medicine (GLOWM / FIGO)",
      url: "https://www.glowm.com",
      linkText: "Read GLOWM Chapter",
    },
    {
      number: "04",
      type: "Patient education resource",
      title: "Puberty, Hormones, and Bodily Changes Explained Without Stigma",
      source: "Mayo Clinic Adolescent & Pediatric Medicine",
      url: "https://www.mayoclinic.org",
      linkText: "Explore Patient Guide",
    },
  ],
  cycle: [
    {
      number: "01",
      type: "Clinical guideline",
      title: "Evaluation and Management of Abnormal Uterine Bleeding in Adolescents",
      source: "American College of Obstetricians and Gynecologists (ACOG Practice Bulletin)",
      url: "https://www.acog.org/clinical/clinical-guidance/practice-bulletin",
      linkText: "Read ACOG Opinion",
    },
    {
      number: "02",
      type: "Research article",
      title: "Physiological Variation in Adolescent Menstrual Cycle Length and Bleeding Patterns",
      source: "Human Reproduction / European Society of Human Reproduction and Embryology",
      url: "https://academic.oup.com/humrep",
      linkText: "View Cycle Study",
    },
    {
      number: "03",
      type: "Patient education resource",
      title: "Your Menstrual Cycle: Phases, Hygiene, and When to Speak With a Nurse",
      source: "U.S. Department of Health & Human Services (Office on Women's Health)",
      url: "https://www.womenshealth.gov/menstrual-cycle",
      linkText: "View OWH Resource",
    },
    {
      number: "04",
      type: "Additional reading",
      title: "Cycle Sense: A Practical Handbook on Cramps, Flow, and Symptom Logs",
      source: "ReproUs Advisory Resources",
      linkText: "Open Handbook",
    },
  ],
  play: [
    {
      number: "01",
      type: "Clinical guideline",
      title: "2023 International Olympic Committee (IOC) Consensus Statement on RED-S",
      source: "British Journal of Sports Medicine (BJSM) & IOC",
      url: "https://bjsm.bmj.com/content/57/17/1073",
      linkText: "Read IOC Consensus",
    },
    {
      number: "02",
      type: "Clinical guideline",
      title: "The Female Athlete Triad: Coalition Consensus Statement on Treatment and Return-to-Play",
      source: "American College of Sports Medicine (ACSM) & ACOG",
      url: "https://www.acog.org",
      linkText: "Read Consensus Guidelines",
    },
    {
      number: "03",
      type: "Research article",
      title: "ISSN Position Stand: Nutritional Considerations for Active Females and Menstrual Phase Periodization",
      source: "Journal of the International Society of Sports Nutrition (JISSN)",
      url: "https://jissn.biomedcentral.com",
      linkText: "View JISSN Research",
    },
    {
      number: "04",
      type: "Patient education resource",
      title: "Fueling Active Bodies: Iron Nutrition, Electrolytes, and Cycle-Aware Training",
      source: "Boston Children's Hospital Female Athlete Program",
      url: "https://www.childrenshospital.org/centers-and-services/programs/f_n/female-athlete-program",
      linkText: "View Athlete Factsheet",
    },
  ],
  pcos: [
    {
      number: "01",
      type: "Clinical guideline",
      title: "International Evidence-Based Guideline for Assessment and Management of PCOS",
      source: "Monash University & The International PCOS Network / Endocrine Society",
      url: "https://www.monash.edu/medicine/mchri/pcos",
      linkText: "Read Global Guideline",
    },
    {
      number: "02",
      type: "Research article",
      title: "Metabolic Phenotypes and Androgen Receptors in Adolescent Polycystic Ovary Syndrome",
      source: "The Lancet Diabetes & Endocrinology",
      url: "https://www.thelancet.com/journals/landia/home",
      linkText: "View Lancet Research",
    },
    {
      number: "03",
      type: "Patient education resource",
      title: "Understanding PCOS: Hormones, Insulin Resistance, and Realistic Self-Care",
      source: "NIH National Institute of Child Health and Human Development (NICHD)",
      url: "https://www.nichd.nih.gov/health/topics/pcos",
      linkText: "Explore NIH Guide",
    },
    {
      number: "04",
      type: "Additional reading",
      title: "Hormone Harmony: De-Mystifying Androgens, Hirsutism, and Irregular Cycles",
      source: "ReproUs Clinical Community Guides",
      linkText: "Read Guide",
    },
  ],
  endo: [
    {
      number: "01",
      type: "Clinical guideline",
      title: "Clinical Practice Guideline: Management of Endometriosis and Severe Pelvic Pain in Adolescents (Committee Opinion No. 760)",
      source: "American College of Obstetricians and Gynecologists (ACOG)",
      url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/12/dysmenorrhea-and-endometriosis-in-the-adolescent",
      linkText: "Read ACOG Guideline",
    },
    {
      number: "02",
      type: "Research article",
      title: "Diagnostic Delays and Symptom Presentation in Adolescent Endometriosis and Adenomyosis",
      source: "Human Reproduction Update / World Endometriosis Society",
      url: "https://academic.oup.com/humupd",
      linkText: "View Clinical Study",
    },
    {
      number: "03",
      type: "Patient education resource",
      title: "When Cramps Aren't Normal: Self-Advocacy, Symptom Logs, and Pelvic PT",
      source: "Endometriosis Foundation of America & Pelvic Floor Society",
      url: "https://www.endofound.org",
      linkText: "View Patient Checklist",
    },
    {
      number: "04",
      type: "Additional reading",
      title: "Speaking Up to Clinicians: Scripted Questions for Unexplained Pelvic Pain",
      source: "ReproUs Patient Advocacy Network",
      linkText: "Download Script",
    },
  ],
  conditions: [
    {
      number: "01",
      type: "Clinical guideline",
      title: "Adolescent Reproductive Healthcare: Confidentiality, Consent, and Clinical Care",
      source: "American College of Obstetricians and Gynecologists (ACOG)",
      url: "https://www.acog.org",
      linkText: "Read ACOG Bulletin",
    },
    {
      number: "02",
      type: "Research article",
      title: "Early Pregnancy Diagnostics, Implantation Physiology, and Hormonal Biomarkers",
      source: "Obstetrics & Gynecology (The Green Journal)",
      url: "https://journals.lww.com/greenjournal",
      linkText: "View Clinical Review",
    },
    {
      number: "03",
      type: "Patient education resource",
      title: "Reproductive Health Navigation: Ovarian Cysts, Pregnancy Basics, and Confidential Care",
      source: "Bedsider & Title X Community Health Network",
      url: "https://www.bedsider.org",
      linkText: "Browse Clinic Directory",
    },
    {
      number: "04",
      type: "Additional reading",
      title: "Ovarian Health & Cyst Navigation: What's Typical vs. What Needs Ultrasound",
      source: "ReproUs Health Library",
      linkText: "Read Patient Note",
    },
  ],
  realtalk: [
    {
      number: "01",
      type: "Clinical guideline",
      title: "Sexually Transmitted Infections Treatment Guidelines",
      source: "Centers for Disease Control and Prevention (CDC)",
      url: "https://www.cdc.gov/std/treatment-guidelines/default.htm",
      linkText: "Read CDC Guidelines",
    },
    {
      number: "02",
      type: "Research article",
      title: "STI Transmission Rates, Barrier Protection Efficacy, and Screening in Young Adults",
      source: "The Lancet Infectious Diseases / CDC MMWR",
      url: "https://www.cdc.gov/mmwr",
      linkText: "View Research Paper",
    },
    {
      number: "03",
      type: "Patient education resource",
      title: "Confidential STI & HIV Testing: What Happens at an Appointment",
      source: "CDC National Prevention Information Network",
      url: "https://gettested.cdc.gov",
      linkText: "Find Testing Center",
    },
    {
      number: "04",
      type: "Additional reading",
      title: "Consent in Practice: Navigating Boundaries, Safer Sex, and Direct Communication",
      source: "ReproUs Youth Dialogue Series",
      linkText: "Read Article",
    },
  ],
  mind: [
    {
      number: "01",
      type: "Clinical guideline",
      title: "Mental Health Disorders in Adolescents: Screening, Referral, and Primary Care (Committee Opinion No. 705)",
      source: "American College of Obstetricians and Gynecologists (ACOG)",
      url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/07/mental-health-disorders-in-adolescents",
      linkText: "Read ACOG Clinical Opinion",
    },
    {
      number: "02",
      type: "Clinical guideline",
      title: "Practice Parameter for the Assessment and Treatment of Children and Adolescents with Depressive and Mood Disorders",
      source: "American Academy of Child & Adolescent Psychiatry (AACAP)",
      url: "https://www.jaacap.org",
      linkText: "View AACAP Practice Guidelines",
    },
    {
      number: "03",
      type: "Clinical guideline",
      title: "Textbook of Adolescent Health: Neuroendocrine Maturation and Pubertal Transition",
      source: "The Global Library of Women's Medicine (GLOWM / FIGO)",
      url: "https://www.glowm.com",
      linkText: "Explore GLOWM Guidelines",
    },
    {
      number: "04",
      type: "Patient education resource",
      title: "The Teen Brain: 7 Things to Know About Prefrontal Cortex Remodeling & Limbic Sensitivity",
      source: "National Institute of Mental Health (NIMH) / NIH",
      url: "https://www.nimh.nih.gov/health/publications/the-teen-brain-7-things-to-know",
      linkText: "Explore NIMH Brain Guide",
    },
  ],
  factors: [
    {
      number: "01",
      type: "Clinical guideline",
      title: "Ensuring Language Access, Equity, and Confidentiality in Youth Healthcare",
      source: "Society for Adolescent Health and Medicine (SAHM)",
      url: "https://www.adolescenthealth.org",
      linkText: "Read SAHM Position Paper",
    },
    {
      number: "02",
      type: "Research article",
      title: "Geographic Barriers, Transit Access, and Health Literacy in Youth Reproductive Healthcare",
      source: "American Journal of Public Health (AJPH)",
      url: "https://ajph.aphapublications.org",
      linkText: "View Public Health Study",
    },
    {
      number: "03",
      type: "Patient education resource",
      title: "Title X Clinics, Sliding-Scale Care, and Minor Consent Protections by State",
      source: "National Health Law Program (NHeLP) & Guttmacher Institute",
      url: "https://www.guttmacher.org/state-policy/explore/overview-minors-consent-law",
      linkText: "View Legal Rights Map",
    },
    {
      number: "04",
      type: "Additional reading",
      title: "Community Advocacy Guide: Breaking Down Transportation and Language Barriers",
      source: "ReproUs Youth Ambassador Movement",
      linkText: "Open Toolkit",
    },
  ],
};

export function EducationalReferences({
  categoryId,
  customTitle,
  customItems,
  compact = false,
  className = "",
}: EducationalReferencesProps) {
  const items = customItems || (categoryId && DEFAULT_REFERENCES[categoryId]) || DEFAULT_REFERENCES.default;

  const getTypeIcon = (type: ReferenceItem["type"]) => {
    switch (type) {
      case "Research article":
        return <BookOpen className="w-3.5 h-3.5 text-berry" />;
      case "Clinical guideline":
        return <FileCheck className="w-3.5 h-3.5 text-plum" />;
      case "Patient education resource":
        return <HeartHandshake className="w-3.5 h-3.5 text-berry" />;
      case "Additional reading":
        return <Bookmark className="w-3.5 h-3.5 text-plum" />;
    }
  };

  if (compact) {
    return (
      <div className={cn("mt-6 pt-5 border-t border-plum/15 font-sans", className)}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-berry bg-ivory-darker px-2.5 py-0.5 rounded border border-plum/10">
            ✦ Clinical &amp; Educational References
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((item) => {
            const content = (
              <div
                key={item.number}
                className="p-3.5 rounded-xl bg-white border border-plum/15 flex flex-col justify-between shadow-xs hover:border-berry/40 transition-all h-full"
              >
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <span className="text-[11px] font-bold text-berry uppercase">
                      {item.number} · {item.type}
                    </span>
                    {item.url && (
                      <ExternalLink className="w-3 h-3 text-plum/60 shrink-0" />
                    )}
                  </div>
                  <h5 className="font-bold text-[13px] text-plum leading-snug font-sans">
                    {item.title}
                  </h5>
                  <p className="text-[11.5px] text-plum/70 font-sans leading-tight mt-1 mb-0">
                    {item.source}
                  </p>
                </div>
                {item.url && (
                  <div className="mt-2 pt-2 border-t border-plum/10 text-[11px] font-bold text-deep-teal flex items-center gap-1">
                    <span>{item.linkText || "View Clinical Source"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                )}
              </div>
            );

            if (item.url) {
              return (
                <a
                  key={item.number}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline group focus:outline-none"
                >
                  {content}
                </a>
              );
            }
            return content;
          })}
        </div>
      </div>
    );
  }

  return (
    <section className={cn("w-full mt-12 pt-8 border-t border-plum/15 font-sans", className)}>
      {/* Section Eyebrow & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11.5px] font-bold tracking-widest uppercase text-berry mb-1.5">
            <span className="text-gold">✦</span>
            <span>VERIFIED CLINICAL SOURCES</span>
          </div>
          <h3 className="text-2xl md:text-[28px] font-normal font-serif text-plum leading-tight tracking-tight">
            {customTitle || "Evidence & Educational References"}
          </h3>
          <p className="text-[14px] md:text-[15px] text-plum/80 font-sans mt-1 mb-0 max-w-2xl">
            ReproUs educational materials are grounded in evidence-based research and clinical guidelines from the American College of Obstetricians and Gynecologists (ACOG), The Global Library of Women&apos;s Medicine (GLOWM / FIGO), the American Academy of Pediatrics (AAP), and the International Olympic Committee (IOC).
          </p>
        </div>

        <div className="text-xs font-semibold text-plum/70 font-sans self-start md:self-end">
          Evidence-Based • Clinically Grounded
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const card = (
            <div
              key={item.number}
              className="group rounded-xl bg-white p-5 border border-plum/15 shadow-xs hover:shadow-card hover:-translate-y-0.5 transition-all flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-serif font-bold text-xl text-gold tracking-tight">
                    {item.number}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-plum bg-ivory px-2.5 py-0.5 rounded border border-plum/10">
                    {getTypeIcon(item.type)}
                    <span>{item.type}</span>
                  </span>
                </div>

                <h4 className="font-bold text-[14.5px] text-plum leading-snug mb-1.5 group-hover:text-berry transition-colors">
                  {item.title}
                </h4>

                <p className="text-[12.5px] text-plum/75 leading-relaxed m-0">
                  {item.source}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-plum/10 flex items-center justify-between text-[12px] font-semibold text-plum/80 group-hover:text-berry transition-colors">
                <span>{item.linkText || "Clinical Evidence"}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          );

          if (item.url) {
            return (
              <a
                key={item.number}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline focus:outline-none"
              >
                {card}
              </a>
            );
          }
          return card;
        })}
      </div>
    </section>
  );
}
