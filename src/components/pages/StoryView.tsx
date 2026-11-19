"use client";

import React from "react";
import { ArrowRight, ExternalLink, Plus } from "lucide-react";
import { PageId } from "@/components/layout/Navbar";
import { FounderNote } from "@/components/shared/FounderNote";
import { keepUnits, titleText } from "@/components/shared/keepUnits";

interface StoryViewProps {
  onNavigate?: (page: PageId, categoryId?: string) => void;
}

const sourceLink =
  "inline-flex min-h-[44px] items-center gap-2 font-sans text-base font-semibold underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm transition-colors duration-150";

// Source line in the evidence cards: first lines align whether a source name takes one line or two.
const evidenceLink =
  "inline-flex min-h-[44px] items-start gap-2 py-2.5 font-sans text-base font-semibold underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm transition-colors duration-150";

// Research rows on the deep-teal band: closed by default, they open in place (her accordion look).
const summaryRow =
  "flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 transition-colors duration-200 hover:bg-light-teal md:px-6 [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep-teal";
// min-w-0 + a short glue run: the longest title still wraps beside its "+" on a 320 phone.
const rowTitle = "m-0 min-w-0 font-serif text-2xl font-normal leading-[1.2] text-deep-teal text-balance";
const rowIcon = "h-5 w-5 shrink-0 text-deep-teal transition-transform duration-200 group-open:rotate-45";

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
        Women experience adverse drug reactions at <strong>nearly twice the rate of men</strong>. Because pharmaceutical trials historically excluded female hormonal cycles, differences in gastrointestinal transit, fat distribution, and liver enzyme clearance were overlooked.
        {/* Dose hidden until KP rules (Herdy, 18 Nov 2026). Original last sentence: "In 2013, the FDA had to halve the recommended dose of zolpidem for women." */}
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

// What makes ReproUs different: her 3 short points, in her words, go here (wireframe About §3).
// While this is empty the section isn't rendered.
const DIFFERENCES: string[] = [];

export function StoryView({ onNavigate }: StoryViewProps = {}) {
  const hasDifferences = DIFFERENCES.length > 0;

  // About ends on Learn (one filled button); the ambassador link stays quiet, at the very end.
  const closing = onNavigate ? (
    <div className="mt-12 flex flex-col items-start gap-10">
      <button
        type="button"
        onClick={() => onNavigate("hub")}
        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-raspberry px-7 py-3 font-sans text-base font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-raspberry-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry focus-visible:ring-offset-2 active:bg-raspberry-dark"
      >
        <span>Start learning</span>
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className="w-full border-t border-[#E5E1DC] pt-4">
        <button
          type="button"
          onClick={() => onNavigate("contact", "ambassador")}
          className={`${sourceLink} text-deep-teal focus-visible:ring-deep-teal`}
        >
          Become a Youth Ambassador
        </button>
      </div>
    </div>
  ) : null;

  return (
    <div className="flex w-full min-w-0 flex-col text-charcoal">
      {/* 1. The problem */}
      <section className="w-full bg-light-teal py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-6xl min-w-0 grid-cols-1 items-start gap-10 px-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
          <div className="min-w-0 max-w-3xl">
            <h1 className="mb-6 font-serif text-h1 font-normal text-balance text-deep-teal">
              Why ReproUs Exists
            </h1>
            <p className="mb-4 max-w-[36rem] font-sans text-body text-pretty text-deep-teal">
              Too many girls grow up knowing what a &ldquo;normal&rdquo; period is supposed to look like &mdash; but not what to do when something feels wrong.
            </p>
            <p className="max-w-[36rem] font-sans text-body text-pretty text-charcoal-light">
              For generations, gaps in health research and education have left important questions about girls&apos; and women&apos;s health unanswered, misunderstood, or overlooked. Conditions like PCOS, endometriosis, and the Female Athlete Triad can be difficult to recognize, especially when young people aren&apos;t taught what signs to look for or what questions to ask. We believe understanding your body is the first step toward advocating for your health.
            </p>
          </div>
          <FounderNote />
        </div>
      </section>

      {/* 2. What happens when questions aren't asked: the one deep-teal band.
          Her heading and intro lead (5/12); the research sits under it as closed rows (7/12), text unchanged. */}
      <section id="research-gap" className="w-full bg-deep-teal py-16 text-white md:py-24">
        <div className="mx-auto grid w-full max-w-6xl min-w-0 grid-cols-1 items-start gap-10 px-4 md:px-6 lg:grid-cols-12 lg:gap-12">
          <div data-reveal="" className="min-w-0 lg:col-span-5">
            <h2 className="mb-4 font-serif text-h2 font-normal text-balance text-white">
              What happens when questions aren&apos;t asked?
            </h2>
            <p className="max-w-[36rem] font-sans text-body text-pretty text-white">
              Until the 1993 NIH Revitalization Act, women and girls were routinely excluded from clinical trials. For generations, medical textbooks, dosage recommendations, and diagnostic criteria were based almost exclusively on male physiology. Today, that enduring data gap directly influences diagnostic delays, medication safety, and how seriously female pain is treated.
            </p>
          </div>

          <div
            data-reveal=""
            className="min-w-0 divide-y divide-[#E5E1DC] overflow-hidden rounded-2xl border border-[#E5E1DC] bg-white text-charcoal lg:col-span-7"
          >
            {evidence.map((e) => (
              <details key={e.title} className="group">
                <summary className={summaryRow}>
                  <h3 className={rowTitle}>{titleText(e.title, 16)}</h3>
                  <Plus className={rowIcon} aria-hidden="true" />
                </summary>
                <div className="px-5 pb-5 md:px-6">
                  <p className="max-w-[36rem] font-sans text-base text-pretty text-charcoal">{e.body}</p>
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${evidenceLink} mt-2 text-deep-teal focus-visible:ring-deep-teal`}
                  >
                    <span className="min-w-0 text-balance">{keepUnits(e.source)}</span>
                    <ExternalLink className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              </details>
            ))}

            <details className="group">
              <summary className={summaryRow}>
                <h3 className={rowTitle}>{titleText("Peer-Reviewed Literature & Institutional Research Citations")}</h3>
                <Plus className={rowIcon} aria-hidden="true" />
              </summary>
              <div className="px-5 pb-5 md:px-6">
                <p className="mb-2 font-sans text-small text-charcoal-light">
                  Educational reference links · Not medical advice
                </p>
                <ul className="m-0 list-none p-0">
                  {moreSources.map((s) => (
                    <li key={s.href} className="min-w-0">
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/src flex min-h-[44px] flex-col justify-center rounded-sm py-2 font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal"
                      >
                        <span className="inline-flex items-center gap-2 text-base font-semibold text-deep-teal underline-offset-4 group-hover/src:underline">
                          <span className="min-w-0 text-balance">{s.name}</span>
                          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </span>
                        <span className="text-small text-charcoal-light text-pretty">{s.note}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* 3. Mission */}
      <section className="w-full bg-warm-cream py-16 md:py-24">
        <div data-reveal="" className="mx-auto w-full max-w-6xl min-w-0 px-4 md:px-6">
          <div className="min-w-0 max-w-3xl">
            <h2 className="mb-6 font-serif text-h2 font-normal text-balance text-deep-teal">
              Accessible Education for Every Girl
            </h2>
            <p className="mb-4 max-w-[36rem] font-sans text-body text-pretty text-deep-teal">
              ReproUs gives girls accessible health education focused on reproductive biology, female athlete physiology, and under-recognized conditions like PCOS and endometriosis.
            </p>
            <p className="max-w-[36rem] font-sans text-body text-pretty text-charcoal-light">
              Through interactive learning, workshops, and self-advocacy tools, we turn complicated health information into knowledge that young people can actually use.
            </p>
          </div>
          {!hasDifferences && closing}
        </div>
      </section>

      {/* 4. What makes ReproUs different (her points, when she sends them), then one way forward */}
      {hasDifferences && (
        <section className="w-full bg-white py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl min-w-0 px-4 md:px-6">
            <h2 className="mb-8 max-w-3xl font-serif text-h2 font-normal text-balance text-deep-teal">
              What makes ReproUs different
            </h2>
            <ul data-reveal-stagger="" className="m-0 grid list-none grid-cols-1 gap-6 p-0 lg:grid-cols-3">
              {DIFFERENCES.map((d) => (
                <li
                  key={d}
                  className="min-w-0 max-w-[36rem] rounded-2xl border border-[#E5E1DC] bg-white p-5 font-sans text-base text-pretty text-charcoal md:p-6"
                >
                  {d}
                </li>
              ))}
            </ul>
            {closing}
          </div>
        </section>
      )}
    </div>
  );
}
