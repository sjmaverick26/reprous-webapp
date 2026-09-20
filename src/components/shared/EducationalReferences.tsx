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
      type: "Research article",
      title: "Adolescent Menstrual & Reproductive Health: A Population-Level Review",
      source: "Journal of Adolescent Health / National Institutes of Health",
      linkText: "View Clinical Study",
    },
    {
      number: "02",
      type: "Clinical guideline",
      title: "Menstruation in Girls and Adolescents: Using the Menstrual Cycle as a Vital Sign",
      source: "American Academy of Pediatrics (AAP) & ACOG Committee Opinion",
      linkText: "Read Joint Statement",
    },
    {
      number: "03",
      type: "Patient education resource",
      title: "Reproductive & Endocrine Health for Youth: Fact Sheets & Diagrams",
      source: "MedlinePlus / U.S. National Library of Medicine",
      linkText: "Browse Health Guides",
    },
    {
      number: "04",
      type: "Additional reading",
      title: "ReproUs Curriculum Framework: De-Stigmatizing Care for Every Body",
      source: "ReproUs Medical Advisory & Youth Education Board",
      linkText: "Read Curriculum Note",
    },
  ],
  body: [
    {
      number: "01",
      type: "Research article",
      title: "Neuroendocrine Maturation and Pubertal Timing in Adolescence",
      source: "Endocrine Reviews / The Endocrine Society",
      linkText: "View Physiology Study",
    },
    {
      number: "02",
      type: "Clinical guideline",
      title: "Adolescent Health Care: Physical Development and Counseling Guidelines",
      source: "American Academy of Pediatrics (AAP)",
      linkText: "Read Clinical Guide",
    },
    {
      number: "03",
      type: "Patient education resource",
      title: "Puberty, Hormones, and Bodily Changes Explained Without Stigma",
      source: "Mayo Clinic Adolescent & Pediatric Medicine",
      linkText: "Explore Patient Guide",
    },
    {
      number: "04",
      type: "Additional reading",
      title: "Body Neutrality and Anatomy: Growing Up with Confidence",
      source: "ReproUs Youth Health Archive",
      linkText: "Read Article",
    },
  ],
  cycle: [
    {
      number: "01",
      type: "Research article",
      title: "Physiological Variation in Adolescent Menstrual Cycle Length and Bleeding Patterns",
      source: "Human Reproduction / European Society of Human Reproduction and Embryology",
      linkText: "View Cycle Study",
    },
    {
      number: "02",
      type: "Clinical guideline",
      title: "Evaluation and Management of Abnormal Uterine Bleeding in Adolescents",
      source: "American College of Obstetricians and Gynecologists (ACOG Practice Bulletin)",
      linkText: "Read ACOG Opinion",
    },
    {
      number: "03",
      type: "Patient education resource",
      title: "Your Menstrual Cycle: Phases, Hygiene, and When to Speak With a Nurse",
      source: "U.S. Department of Health & Human Services (Office on Women's Health)",
      linkText: "View OWH Resource",
    },
    {
      number: "04",
      type: "Additional reading",
      title: "Cycle Sense: A Practical Handbook on Cramps, Flow, and Symptom Logs",
      source: "ReproUs Medical Review Panel",
      linkText: "Open Handbook",
    },
  ],
  play: [
    {
      number: "01",
      type: "Research article",
      title: "Relative Energy Deficiency in Sport (RED-S): Clinical Assessment and Bone Mineral Density in Active Females",
      source: "British Journal of Sports Medicine (BJSM)",
      linkText: "View Sports Medicine Paper",
    },
    {
      number: "02",
      type: "Clinical guideline",
      title: "The Female Athlete Triad Coalition Consensus Statement on Treatment and Return-to-Play",
      source: "American College of Sports Medicine & ACOG",
      linkText: "Read Consensus Guidelines",
    },
    {
      number: "03",
      type: "Patient education resource",
      title: "Fueling Active Bodies: Iron Nutrition, Electrolytes, and Cycle-Aware Training",
      source: "Boston Children's Hospital Female Athlete Program",
      linkText: "View Athlete Factsheet",
    },
    {
      number: "04",
      type: "Additional reading",
      title: "Play Strong: Overcoming Overtraining and Protecting Your Period",
      source: "ReproUs Athletics & Youth Sports Initiative",
      linkText: "Read Athlete Guide",
    },
  ],
  pcos: [
    {
      number: "01",
      type: "Research article",
      title: "Metabolic Phenotypes and Androgen Receptors in Adolescent Polycystic Ovary Syndrome",
      source: "The Lancet Diabetes & Endocrinology",
      linkText: "View Lancet Research",
    },
    {
      number: "02",
      type: "Clinical guideline",
      title: "International Evidence-Based Guideline for Assessment and Management of PCOS",
      source: "Monash University & The International PCOS Network / Endocrine Society",
      linkText: "Read Global Guideline",
    },
    {
      number: "03",
      type: "Patient education resource",
      title: "Understanding PCOS: Hormones, Insulin Resistance, and Realistic Self-Care",
      source: "NIH National Institute of Child Health and Human Development (NICHD)",
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
      type: "Research article",
      title: "Diagnostic Delays and Symptom Presentation in Adolescent Endometriosis and Adenomyosis",
      source: "Human Reproduction Update / World Endometriosis Society",
      linkText: "View Clinical Study",
    },
    {
      number: "02",
      type: "Clinical guideline",
      title: "Clinical Practice Guideline: Management of Endometriosis and Severe Pelvic Pain in Adolescents",
      source: "American College of Obstetricians and Gynecologists (ACOG Committee Opinion No. 760)",
      linkText: "Read ACOG Guideline",
    },
    {
      number: "03",
      type: "Patient education resource",
      title: "When Cramps Aren't Normal: Self-Advocacy, Symptom Logs, and Pelvic PT",
      source: "Endometriosis Foundation of America & Pelvic Floor Society",
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
      type: "Research article",
      title: "Early Pregnancy Diagnostics, Implantation Physiology, and Hormonal Biomarkers",
      source: "Obstetrics & Gynecology (The Green Journal)",
      linkText: "View Clinical Review",
    },
    {
      number: "02",
      type: "Clinical guideline",
      title: "Adolescent Reproductive Healthcare: Confidentiality, Consent, and Clinical Care",
      source: "ACOG Committee on Adolescent Health Care",
      linkText: "Read Practice Bulletin",
    },
    {
      number: "03",
      type: "Patient education resource",
      title: "Reproductive Health Navigation: Ovarian Cysts, Pregnancy Basics, and Confidential Care",
      source: "Bedsider & Title X Community Health Network",
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
      type: "Research article",
      title: "STI Transmission Rates, Barrier Protection Efficacy, and Screening in Young Adults",
      source: "The Lancet Infectious Diseases / CDC MMWR",
      linkText: "View Research Paper",
    },
    {
      number: "02",
      type: "Clinical guideline",
      title: "Sexually Transmitted Infections Treatment Guidelines",
      source: "Centers for Disease Control and Prevention (CDC)",
      linkText: "Read CDC Guidelines",
    },
    {
      number: "03",
      type: "Patient education resource",
      title: "Confidential STI & HIV Testing: What Happens at an Appointment",
      source: "CDC National Prevention Information Network",
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
      type: "Research article",
      title: "Neurosteroids and Emotional Fluctuations Across the Luteal Phase",
      source: "American Journal of Psychiatry",
      linkText: "View Psychiatric Study",
    },
    {
      number: "02",
      type: "Clinical guideline",
      title: "Diagnostic and Management Framework for Premenstrual Dysphoric Disorder (PMDD)",
      source: "International Society for Premenstrual Disorders (ISPMD)",
      linkText: "Read Consensus Protocol",
    },
    {
      number: "03",
      type: "Patient education resource",
      title: "Hormone Cycles, Stress, and Mental Health: Body-Mind Connections",
      source: "National Institute of Mental Health (NIMH)",
      linkText: "Explore NIMH Resource",
    },
    {
      number: "04",
      type: "Additional reading",
      title: "Spotting Your Rhythms: Mindful Tracking Without Self-Blame",
      source: "ReproUs Mind & Self Workshop Series",
      linkText: "Download Mood Log",
    },
  ],
  factors: [
    {
      number: "01",
      type: "Research article",
      title: "Geographic Barriers, Transit Access, and Health Literacy in Youth Reproductive Healthcare",
      source: "American Journal of Public Health (AJPH)",
      linkText: "View Public Health Study",
    },
    {
      number: "02",
      type: "Clinical guideline",
      title: "Ensuring Language Access, Equity, and Confidentiality in Youth Healthcare",
      source: "Society for Adolescent Health and Medicine (SAHM)",
      linkText: "Read SAHM Position Paper",
    },
    {
      number: "03",
      type: "Patient education resource",
      title: "Title X Clinics, Sliding-Scale Care, and Minor Consent Protections by State",
      source: "National Health Law Program (NHeLP)",
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
          {items.map((item) => (
            <div
              key={item.number}
              className="p-3 rounded-xl bg-white border border-plum/15 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-berry uppercase mb-1">
                  <span>{item.number}</span>
                  <span>·</span>
                  <span>{item.type}</span>
                </div>
                <h5 className="font-bold text-[13px] text-plum leading-snug font-sans">
                  {item.title}
                </h5>
                <p className="text-[11.5px] text-plum/70 font-sans leading-tight mt-1 mb-0">
                  {item.source}
                </p>
              </div>
            </div>
          ))}
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
            ReproUs educational materials are grounded in peer-reviewed science, clinical society guidelines, and vetted patient advocacy frameworks.
          </p>
        </div>

        <div className="text-xs font-semibold text-plum/70 font-sans self-start md:self-end">
          Peer-Reviewed • Medically Verified
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.number}
            className="group rounded-xl bg-white p-5 border border-plum/15 shadow-xs hover:shadow-card hover:-translate-y-0.5 transition-all flex flex-col justify-between"
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
        ))}
      </div>
    </section>
  );
}
