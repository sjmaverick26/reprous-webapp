"use client";

import React from "react";
import { ArrowRight, BookOpen, Search, ShieldCheck, ExternalLink } from "lucide-react";
import { PageId } from "@/components/layout/Navbar";
import { FounderNote } from "@/components/shared/FounderNote";

interface StoryViewProps {
  onNavigate?: (page: PageId, categoryId?: string) => void;
}

const sourceLink =
  "inline-flex min-h-[44px] items-center gap-2 font-sans text-base font-semibold underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm transition-colors duration-150";

const evidence = [
  {
    title: "Conditions are minimized as “just bad periods.”",
    body: (
      <>
        Endometriosis takes an average of <strong>7 to 10 years</strong> to be diagnosed, with patients consulting 4 to 5 clinicians. Because heavy menstrual bleeding and debilitating pelvic pain were historically dismissed as emotional or &ldquo;normal,&rdquo; progressive inflammatory damage is often caught late.
      </>
    ),
    href: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/12/dysmenorrhea-and-endometriosis-in-the-adolescent",
    source: "ACOG Committee Opinion No. 760",
  },
  {
    title: "Dosages were tested primarily on male biology.",
    body: (
      <>
        Women experience adverse drug reactions at <strong>nearly twice the rate of men</strong>. Because pharmaceutical trials historically excluded female hormonal cycles, differences in gastrointestinal transit, fat distribution, and liver enzyme clearance were overlooked. In 2013, the FDA had to halve the recommended dose of zolpidem for women.
      </>
    ),
    href: "https://bsd.biomedcentral.com/articles/10.1186/s13293-020-00308-5",
    source: "Nature / BMC: Sex-Bias in Biomedical Research",
  },
  {
    title: "Female pain is more often labeled psychological.",
    body: (
      <>
        In a landmark emergency medicine study on acute abdominal pain, women waited an average of <strong>16 minutes longer</strong> to receive analgesia than men presenting with identical pain scores, and were significantly less likely to receive opioid pain relief. Published clinical research demonstrates that female pain is disproportionately categorized as psychogenic or emotional.
      </>
    ),
    href: "https://onlinelibrary.wiley.com/doi/10.1111/j.1553-2712.2008.00100.x",
    source: "Academic Emergency Medicine Study",
  },
];

const moreSources = [
  {
    href: "https://orwh.od.nih.gov/sex-gender/nih-policy-sex-biological-variable",
    name: "NIH ORWH Policy",
    note: "Inclusion of Women in Clinical Research & Sex as a Biological Variable Mandate",
  },
  {
    href: "https://www.thelancet.com/series/gender-equality-norms-health",
    name: "The Lancet Series",
    note: "Advancing the Science of Women’s Health & Eliminating Evidence Gaps",
  },
  {
    href: "https://www.fda.gov/consumers/womens-health",
    name: "FDA Office of Women’s Health",
    note: "Sex-Specific Dosage Adjustments & Drug Safety in Female Patients",
  },
];

const pillars = [
  {
    id: "learn",
    title: "Learn",
    icon: <BookOpen className="h-5 w-5 text-deep-teal" aria-hidden="true" />,
    chip: "bg-light-teal",
    rule: "border-t-deep-teal",
    desc: "Understand your body and how it works — including reproductive biology, hormonal cycles, and female athlete physiology.",
  },
  {
    id: "recognize",
    title: "Recognize",
    icon: <Search className="h-5 w-5 text-deep-teal-dark" aria-hidden="true" />,
    chip: "bg-coral",
    rule: "border-t-coral",
    desc: "Spot symptoms that shouldn't be overlooked or dismissed, such as severe pain, cycle irregularity, PCOS, and RED-S.",
  },
  {
    id: "advocate",
    title: "Advocate",
    icon: <ShieldCheck className="h-5 w-5 text-white" aria-hidden="true" />,
    chip: "bg-raspberry",
    rule: "border-t-raspberry",
    desc: "Build the vocabulary, questions, and confidence to prepare for healthcare visits and advocate for the care you deserve.",
  },
];

export function StoryView({ onNavigate }: StoryViewProps = {}) {
  return (
    <div className="flex w-full min-w-0 flex-col text-charcoal">
      {/* 1. The problem */}
      <section className="w-full bg-light-teal py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl min-w-0 px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="mb-6 font-serif text-h1 font-normal text-balance text-deep-teal">
              Why ReproUs Exists
            </h1>
            <p className="mb-4 font-sans text-body font-medium text-pretty text-deep-teal">
              Too many girls grow up knowing what a &ldquo;normal&rdquo; period is supposed to look like &mdash; but not what to do when something feels wrong.
            </p>
            <p className="font-sans text-body text-pretty text-charcoal-light">
              For generations, gaps in health research and education have left important questions about girls&apos; and women&apos;s health unanswered, misunderstood, or overlooked. Conditions like PCOS, endometriosis, and the Female Athlete Triad can be difficult to recognize, especially when young people aren&apos;t taught what signs to look for or what questions to ask. We believe understanding your body is the first step toward advocating for your health.
            </p>
          </div>
        </div>
      </section>

      {/* 2. What happens when questions aren't asked: the one deep-teal band */}
      <section id="research-gap" className="w-full bg-deep-teal py-16 text-white md:py-24">
        <div className="mx-auto w-full max-w-6xl min-w-0 px-4 md:px-6">
          <div className="mb-10 max-w-3xl md:mb-12">
            <h2 className="mb-4 font-serif text-h2 font-normal text-balance text-white">
              What happens when questions aren&apos;t asked?
            </h2>
            <p className="font-sans text-body text-pretty text-white">
              Until the 1993 NIH Revitalization Act, women and girls were routinely excluded from clinical trials. For generations, medical textbooks, dosage recommendations, and diagnostic criteria were based almost exclusively on male physiology. Today, that enduring data gap directly influences diagnostic delays, medication safety, and how seriously female pain is treated.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {evidence.map((e) => (
              <article
                key={e.title}
                className="flex min-w-0 flex-col rounded-2xl border border-[#E5E1DC] bg-white p-5 text-charcoal md:p-6"
              >
                <h3 className="mb-3 font-serif text-xl font-normal text-balance text-deep-teal md:text-2xl">
                  {e.title}
                </h3>
                <p className="mb-4 font-sans text-base text-pretty text-charcoal">{e.body}</p>
                <div className="mt-auto border-t border-[#E5E1DC] pt-2">
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${sourceLink} text-deep-teal focus-visible:ring-deep-teal`}
                  >
                    <span className="min-w-0">{e.source}</span>
                    <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 border-t border-light-teal pt-8">
            <h3 className="mb-1 font-sans text-base font-semibold text-white">
              Peer-Reviewed Literature &amp; Institutional Research Citations
            </h3>
            <p className="mb-4 font-sans text-small text-light-teal">
              Educational reference links · Not medical advice
            </p>
            <ul className="m-0 grid list-none grid-cols-1 gap-x-8 p-0 md:grid-cols-3">
              {moreSources.map((s) => (
                <li key={s.href} className="min-w-0">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[44px] flex-col justify-center py-2 font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
                  >
                    <span className="inline-flex items-center gap-2 text-base font-semibold text-white underline-offset-4 group-hover:underline">
                      <span className="min-w-0">{s.name}</span>
                      <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </span>
                    <span className="text-small text-light-teal">{s.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Mission, beside the founder photo slot */}
      <section className="w-full bg-warm-cream py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-6xl min-w-0 grid-cols-1 items-start gap-10 px-4 md:grid-cols-[minmax(0,1fr)_240px] md:gap-16 md:px-6">
          <div className="min-w-0 max-w-3xl">
            <h2 className="mb-6 font-serif text-h2 font-normal text-balance text-deep-teal">
              Accessible Education for Every Girl
            </h2>
            <p className="mb-4 font-sans text-body font-medium text-pretty text-deep-teal">
              ReproUs gives girls accessible health education focused on reproductive biology, female athlete physiology, and under-recognized conditions like PCOS and endometriosis.
            </p>
            <p className="font-sans text-body text-pretty text-charcoal-light">
              Through interactive learning, workshops, and self-advocacy tools, we turn complicated health information into knowledge that young people can actually use.
            </p>
          </div>
          <FounderNote />
        </div>
      </section>

      {/* 4. How we do it, then one way forward */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-6xl min-w-0 px-4 md:px-6">
          <h2 className="mb-8 font-serif text-h3 font-normal text-balance text-deep-teal">
            Learn. Recognize. Advocate.
          </h2>
          <ul className="m-0 mb-12 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-3 md:gap-6">
            {pillars.map((p) => (
              <li key={p.id} className={`min-w-0 border-t-4 pt-5 ${p.rule}`}>
                <span
                  className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${p.chip}`}
                >
                  {p.icon}
                </span>
                <h3 className="mb-2 font-serif text-xl font-normal text-deep-teal">{p.title}</h3>
                <p className="m-0 font-sans text-base text-pretty text-charcoal">{p.desc}</p>
              </li>
            ))}
          </ul>

          {onNavigate && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <button
                type="button"
                onClick={() => onNavigate("hub")}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-raspberry px-7 py-3 font-sans text-btn text-white shadow-sm transition-colors duration-150 hover:bg-raspberry-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry focus-visible:ring-offset-2 active:bg-raspberry-dark"
              >
                <span>Start learning</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate("contact", "ambassador")}
                className={`${sourceLink} text-deep-teal focus-visible:ring-deep-teal`}
              >
                Become a Youth Ambassador
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
