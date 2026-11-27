"use client";

import React, { useState, useEffect, useId } from "react";
import {
  Phone,
  Download,
  ExternalLink,
  Copy,
  Check,
  AlertTriangle,
  MessageSquare,
  Plus,
} from "lucide-react";
import { HOTLINES_DATA, Hotline } from "@/data/clinicsData";
import { PETITIONS_DATA, REAL_WORLD_ADVOCACY_LINKS } from "@/data/petitionsData";
import { SYMPTOMS_DATA, SYMPTOM_LOG_TEMPLATE } from "@/data/symptomsData";
import { PageId } from "@/components/layout/Navbar";
import { cn, scrollMotion } from "@/lib/utils";
import { titleText } from "@/components/shared/keepUnits";
import { TabStrip } from "@/components/shared/TabStrip";
import { CoreThreeRule } from "@/components/shared/CoreThreeRule";

interface ResourcesViewProps {
  onNavigate: (page: PageId, categoryOrTab?: string) => void;
  /** all | tracker | toolkit | help | library | petitions. Anything else is treated as "all". */
  initialCategory?: string;
}

// ---------------------------------------------------------------------------
// Shared look (DESIGN.md): one card, one primary button, one secondary, text links.
// ---------------------------------------------------------------------------
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-2";
const btnPrimary = cn(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-raspberry px-6 py-2.5 text-center text-base font-semibold text-white transition-colors duration-200 hover:bg-raspberry-dark motion-press motion-arrow",
  focusRing
);
const btnSecondary = cn(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-deep-teal bg-white px-6 py-2.5 text-center text-base font-semibold text-deep-teal transition-colors duration-200 hover:bg-light-teal motion-press motion-arrow",
  focusRing
);
const textLink = cn(
  "inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-deep-teal underline-offset-4 hover:underline",
  focusRing
);
const sectionInner = "mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24";
// Coral underline: a small warm accent under each section heading (decoration only).
const headAccent = "after:mt-3 after:block after:h-1 after:w-12 after:rounded-full after:bg-coral";
const h3Class = cn("font-serif text-h3 font-normal text-deep-teal text-balance", headAccent);
const cardTitle = "font-sans text-lg font-semibold text-deep-teal text-balance";
// Callouts: a tinted ground, no side bar.
const tintTeal = "rounded-2xl bg-light-teal-light p-5";
const tintPink = "rounded-2xl bg-soft-pink-light p-5";
const bodyText = "text-body text-charcoal text-pretty max-w-[36rem]";

const ADVOCACY_LETTER_TEMPLATES = [
  {
    id: "school-period-products",
    title: "School Principal & Board: Free Restroom Menstrual Dispensers",
    targetAudience: "School Principals, School Boards, Student Councils",
    category: "Schools & Period Equity",
    text: `Dear [Principal / School Board Members],

My name is [Your Name], and I am a student at [School Name]. I am writing to respectfully request that our school install and maintain free menstrual hygiene product dispensers in all female and gender-neutral student restrooms.

Across the United States, 1 in 4 menstruating students report missing class or struggling with lack of access to period supplies during the school day. Requiring students to walk to the nurse's office or main office creates unnecessary anxiety, disruptions to learning time, and stigma around a normal biological process.

Under the federal Menstrual Equity for All framework, access to menstrual hygiene is recognized as an essential educational equity issue, just like soap and toilet paper. Providing free dispensers ensures no student ever misses class or feels embarrassed because of their period.

Thank you for your leadership and dedication to student health and dignity. I would welcome the opportunity to meet briefly to discuss how we can implement this.

Sincerely,
[Your Name]
[Grade / Student Club]
[Contact Email]`
  },
  {
    id: "momnibus-legislation",
    title: "Congress & State Legislators: Support Black Maternal Health Momnibus Act (H.R. 3305)",
    targetAudience: "Members of Congress, State Representatives, Health Committees",
    category: "Federal Policy & Maternal Health",
    text: `Dear [Representative / Senator Name],

My name is [Your Name], and I am a constituent from [Your City / Zip Code]. I am writing to urge you to co-sponsor and vote YES on the bipartisan Black Maternal Health Momnibus Act (H.R. 3305 / S. 1606).

According to the CDC, more than 84% of pregnancy-related deaths in our nation are clinically preventable. Black mothers are 3 to 4 times more likely to die from pregnancy complications due to systemic dismissal, inadequate postpartum coverage, and implicit bias.

The Momnibus Act provides comprehensive, evidence-based solutions by:
1. Mandating and funding continuous 365-day postpartum Medicaid coverage across all states.
2. Diversifying and growing the perinatal workforce by funding community doulas and midwives.
3. Strengthening hospital maternal mortality review committees (MMRCs) and anti-bias accountability programs.

Every family deserves safe, dignified maternal care. Please protect our community's mothers and infants by supporting the Momnibus Act.

Sincerely,
[Your Name]
[Address / Zip Code]
[Contact Email]`
  }
];

const APPOINTMENT_RULES = [
  {
    title: "Rule 1: Bring Written Notes",
    text: "When you enter an exam room, anxiety can make symptoms difficult to recall. Write your top 3 concerns in your phone notes ahead of time."
  },
  {
    title: "Rule 2: State Your Primary Goal First",
    text: "Start the visit with: “My main priority today is figuring out why my period cramps keep me from going to school, and what diagnostic steps we can take.”"
  },
  {
    title: "Rule 3: Ask for Next Steps & Timeline",
    text: "Before leaving, ask: “If these symptoms continue over the next 4 weeks, what is our next diagnostic step?”"
  }
];

const LOG_PARAMETERS = [
  {
    title: "Severity Scale",
    text: "Score pain 1-10 and note whether standard OTC medications provide relief."
  },
  {
    title: "Functional Impact",
    text: "Record specific activities missed: school days, sports practices, or sleep disruption."
  },
  {
    title: "Cycle Timing",
    text: "Note cycle day (Day 1 = first day of full bleeding) and how many days symptoms persist."
  },
  {
    title: "Associated Signs",
    text: "Track nausea, bowel/urinary changes, dizziness, or fatigue alongside bleeding."
  }
];

const SPEAK_UP_SCRIPTS = [
  {
    id: "s1",
    title: "Script: Introducing Symptoms",
    text: "“I have documented my symptoms across the last three cycles. My pain averages an 8 out of 10 and prevents me from attending school. What diagnostic evaluation or blood work do you recommend to investigate this?”"
  },
  {
    id: "s2",
    title: "Script: If Your Symptoms Are Dismissed",
    text: "“Could you please note in my electronic health record that I reported these symptoms today, and document why further diagnostic testing or specialist referral is not indicated at this time?”"
  }
];

// COMPLIANCE (round 2, droppable): Dose hidden until KP rules (Herdy, 18 Nov 2026). Thresholds in this list;
// it only fed the maternal warning-sign collapsible in Get help now, which is off. Original:
// const MATERNAL_WARNING_SIGNS = [
//   "Severe persistent headache",
//   "Dizziness or fainting spells",
//   "Vision changes or seeing spots",
//   "Fever of 100.4°F or higher",
//   "Extreme swelling of face or hands",
//   "Chest pain or rapid heartbeat",
//   "Severe shortness of breath",
//   "Severe abdominal / upper stomach pain",
//   "Heavy vaginal bleeding or clots",
//   "Fluid leaking before 37 weeks",
//   "Decreased baby movement",
//   "Overwhelming sadness or panic"
// ];

// Crisis lines first, then the rest. Display order only: no numbers are added or changed.
const HOTLINE_ORDER: Record<string, number> = { crisis: 0, lgbtq: 1, safety: 2, reproductive: 3, maternal: 4 };
const sortedHotlines: Hotline[] = [...HOTLINES_DATA].sort(
  (a, b) => (HOTLINE_ORDER[a.category ?? ""] ?? 9) - (HOTLINE_ORDER[b.category ?? ""] ?? 9)
);

type GroupId = "toolkit" | "help" | "petitions";

const GROUP_TABS: { id: GroupId; label: string }[] = [
  { id: "toolkit", label: "Self-advocacy toolkit" },
  { id: "help", label: "Get help now" },
  { id: "petitions", label: "Take action" }
];

// initialCategory -> which tab opens. Anything else (all, library, unknown) opens the toolkit.
const TAB_FOR: Record<string, GroupId> = {
  tracker: "toolkit",
  toolkit: "toolkit",
  help: "help",
  petitions: "petitions",
  action: "petitions"
};

// initialCategory -> element id to scroll to. "all" (and anything unknown) does not scroll.
const SCROLL_TARGETS: Record<string, string> = {
  tracker: "symptom-tracker-section",
  toolkit: "toolkit",
  help: "help",
  petitions: "petitions",
  action: "petitions"
};

const rowFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-deep-teal";
const accordionBox =
  "divide-y divide-[#E5E1DC] overflow-hidden rounded-2xl border border-[#E5E1DC] border-t-4 bg-white shadow-sm";
// Warm accents: each tab carries one of her three pillar colours on its boxes' top edge.
const edgeTeal = "border-t-deep-teal";
const edgeCoral = "border-t-coral";
const edgeRaspberry = "border-t-raspberry";
const panelInner = "mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16";

function CopyButton({
  text,
  label,
  done,
  onCopy
}: {
  text: string;
  label: string;
  done: boolean;
  onCopy: (text: string) => void;
}) {
  return (
    <button type="button" onClick={() => onCopy(text)} className={btnSecondary}>
      {done ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      <span aria-live="polite">{done ? "Copied" : label}</span>
    </button>
  );
}

/** One accordion row: a heading with a button (aria-expanded) and a panel. Rows sit inside `accordionBox`. */
function Collapsible({
  title,
  level = 3,
  open,
  onToggle,
  children
}: {
  title: string;
  level?: 3 | 4;
  open?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
}) {
  const uid = useId();
  const [innerOpen, setInnerOpen] = useState(false);
  const isOpen = open ?? innerOpen;
  const Heading = `h${level}` as "h3" | "h4";
  return (
    <div>
      <Heading className="m-0 font-sans text-lg font-semibold">
        <button
          type="button"
          id={`${uid}-btn`}
          aria-expanded={isOpen}
          aria-controls={`${uid}-panel`}
          onClick={() => (onToggle ? onToggle() : setInnerOpen((o) => !o))}
          className={cn(
            "flex min-h-11 w-full items-center justify-between gap-4 px-5 py-3 text-left transition-colors duration-200 hover:bg-light-teal md:px-6",
            "font-sans text-lg font-semibold text-deep-teal",
            rowFocus
          )}
        >
          <span className="text-balance">{title}</span>
          <Plus
            className={cn("h-5 w-5 shrink-0 text-raspberry transition-transform duration-200", isOpen && "rotate-45")}
            aria-hidden="true"
          />
        </button>
      </Heading>
      <div id={`${uid}-panel`} role="region" aria-labelledby={`${uid}-btn`} hidden={!isOpen} className="motion-panel px-5 pb-6 pt-1 md:px-6">
        {isOpen && children}
      </div>
    </div>
  );
}

export function ResourcesView({ onNavigate, initialCategory = "all" }: ResourcesViewProps) {
  const [tab, setTab] = useState<GroupId>(() => TAB_FOR[initialCategory] ?? "toolkit");
  const [openSymptomId, setOpenSymptomId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const scrollToId = (id: string) => {
    if (typeof document === "undefined") return;
    document.getElementById(id)?.scrollIntoView({ behavior: scrollMotion(), block: "start" });
  };

  // Open the requested tab (and scroll to its target) when the view opens or the category changes.
  useEffect(() => {
    setTab(TAB_FOR[initialCategory] ?? "toolkit");
    const target = SCROLL_TARGETS[initialCategory];
    if (!target) return;
    const t = setTimeout(() => scrollToId(target), 80);
    return () => clearTimeout(t);
  }, [initialCategory]);

  // The tab is part of the address (#/resources/help), so reload and Back return to it.
  const rememberTab = (id: GroupId) => {
    if (typeof window !== "undefined") window.history.replaceState(window.history.state, "", `#/resources/${id}`);
  };

  const selectTab = (id: GroupId) => {
    setTab(id);
    rememberTab(id);
    // If the page was scrolled past the top of the panel, bring the new panel into view.
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < 120) scrollToId(id);
    }, 0);
  };

  const copyText = async (key: string, text: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return; // the browser blocked copying: don't claim it worked
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 2500);
  };

  const handleDownloadLogTemplate = () => {
    const element = document.createElement("a");
    const file = new Blob([SYMPTOM_LOG_TEMPLATE], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "ReproUs-Symptom-Tracking-Log.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="font-sans text-charcoal">
      {/* Header */}
      {/* Warm band (lightest soft pink): the Youth Voices header has a band too; cream would merge into the toolkit panel. */}
      <header className="bg-soft-pink-light">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 md:px-6 md:pb-14 md:pt-20">
        <h1 className="max-w-4xl font-serif text-h1 font-normal text-deep-teal text-balance">
          How to get help &amp; take action
        </h1>
        <CoreThreeRule className="mt-5" />
        <p className="mt-5 max-w-[36rem] text-body text-charcoal text-pretty">
          When it&apos;s time for more than education — here is where to turn. Connect with 24/7 confidential hotlines, youth rights guides, and join real-world legislative petitions.
        </p>
        </div>
      </header>

      {/* Sticky tabs */}
      <div className="sticky top-16 z-40 border-b border-[#E5E1DC] bg-white">
        {/* Phones: one strip, labels whole on up to 2 lines (no sideways scroll, no cut label). */}
        <TabStrip
          tabs={GROUP_TABS}
          selected={tab}
          onSelect={selectTab}
          onKeySelect={(id) => {
            setTab(id);
            rememberTab(id);
          }}
          label="Resources sections"
          // Every label ends on two or more words: 375+ one row ("Get help now" and "Take action" on one line);
          // under 375 the toolkit takes its own row and the other two sit side by side, all on one line.
          phoneCols="grid-cols-2 [&>:first-child]:col-span-2 min-[375px]:grid-cols-[1.3fr_1.15fr_1fr] min-[375px]:[&>:first-child]:col-span-1"
          className="mx-auto max-w-6xl px-4 py-2 md:px-6"
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SELF-ADVOCACY TOOLKIT */}
      {/* ------------------------------------------------------------------ */}
      {tab === "toolkit" && (
        <section role="tabpanel" id="toolkit" aria-labelledby="tab-toolkit" className="motion-panel scroll-mt-32 bg-warm-cream">
          <div className={panelInner}>
            {/* No H2 here: it only repeated the tab's name. */}
            <p className={bodyText}>
              Practical tools to help you track your symptoms, prepare for appointments, and speak up with confidence.
            </p>

            <div id="symptom-tracker-section" className="mt-10 scroll-mt-32">
              <h2 className={h3Class}>Symptom Tracker &amp; Clinical Guide</h2>
              <p className={cn(bodyText, "mt-3")}>
                Too often, adolescent reproductive symptoms are dismissed as &ldquo;just growing pains&rdquo; or normal cramps. Use this guide to identify patterns, build an objective symptom log, and know what to ask your doctor.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={handleDownloadLogTemplate} className={btnPrimary}>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span>Download Log (.txt)</span>
                </button>
                <CopyButton
                  text={SYMPTOM_LOG_TEMPLATE}
                  label="Copy 60–90 Day Log Template"
                  done={copiedKey === "log-template"}
                  onCopy={(t) => copyText("log-template", t)}
                />
              </div>

              <div className={cn(accordionBox, edgeTeal, "mt-8")}>
                {SYMPTOMS_DATA.map((symptom) => (
                  <Collapsible
                    key={symptom.id}
                    level={3}
                    title={symptom.name}
                    open={openSymptomId === symptom.id}
                    onToggle={() => setOpenSymptomId((cur) => (cur === symptom.id ? null : symptom.id))}
                  >
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-base font-semibold text-deep-teal">What it can be associated with:</h4>
                          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-base text-charcoal">
                            {symptom.associatedWith.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-deep-teal">What you can track in your log:</h4>
                          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-base text-charcoal">
                            {symptom.whatToTrack.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-base font-semibold text-deep-teal">Questions you can ask a healthcare provider:</h4>
                          <ul className="mt-2 list-disc space-y-2 pl-5 text-base text-charcoal">
                            {symptom.questionsToAsk.map((item, i) => (
                              <li key={i}>&ldquo;{item}&rdquo;</li>
                            ))}
                          </ul>
                        </div>
                        {/* Dose hidden until KP rules (Herdy, 18 Nov 2026): the lines are commented out in
                            symptomsData.ts, so this whole box (heading included) stays off until they return. */}
                        {symptom.whenToSeekCare && (
                          <div className={tintPink}>
                            <h4 className="text-base font-semibold text-deep-teal">When to seek medical care:</h4>
                            <p className="mt-1 max-w-[36rem] text-base text-charcoal text-pretty">{symptom.whenToSeekCare}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigate("hub", symptom.learnCategory)}
                      className={cn(textLink, "mt-4")}
                    >
                      {symptom.learnLabel}
                    </button>
                  </Collapsible>
                ))}
              </div>
              <p className="mt-4 max-w-[65ch] text-sm text-charcoal-light text-pretty">
                <strong>Important Clinical Note:</strong> This symptom tracking information is compiled for health education and self-advocacy preparation, not medical diagnosis. If symptoms persist or cause you concern, consult a healthcare professional.
              </p>
            </div>

            <div className={cn(accordionBox, edgeCoral, "mt-12")}>
              <Collapsible title="How to Build an Objective Symptom Log">
                <p className="max-w-[36rem] text-base text-charcoal text-pretty">
                  Clinicians respond to concrete numbers and timelines rather than vague recollections. Log these 4 parameters:
                </p>
                <dl className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {LOG_PARAMETERS.map((p) => (
                    <div key={p.title}>
                      <dt className="text-base font-semibold text-deep-teal">{p.title}</dt>
                      <dd className="mt-1 text-base text-charcoal">{p.text}</dd>
                    </div>
                  ))}
                </dl>
              </Collapsible>
              <Collapsible title="Preparing for an Appointment: 3 Rules for Clarity">
                <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                  {APPOINTMENT_RULES.map((rule, i) => (
                    <li key={rule.title} className={i % 2 ? tintPink : tintTeal}>
                      {/* Decorative step number: the title already says "Rule 1" for screen readers. */}
                      <span
                        aria-hidden="true"
                        className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-coral font-serif text-lg leading-none text-charcoal"
                      >
                        {i + 1}
                      </span>
                      <h4 className="font-sans text-base font-semibold text-deep-teal">{rule.title}</h4>
                      <p className="mt-1 max-w-[36rem] text-base text-charcoal text-pretty">{rule.text}</p>
                    </li>
                  ))}
                </ul>
              </Collapsible>
              <Collapsible title="Verbatim Scripts for Clinical Visits">
                <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {SPEAK_UP_SCRIPTS.map((script, i) => (
                    <li key={script.id} className={cn(i % 2 ? tintPink : tintTeal, "flex flex-col items-start gap-4")}>
                      <div>
                        <h4 className="font-sans text-base font-semibold text-deep-teal">{script.title}</h4>
                        <p className="mt-1 max-w-[36rem] text-lg text-charcoal text-pretty">{script.text}</p>
                      </div>
                      <CopyButton
                        text={script.text}
                        label="Copy"
                        done={copiedKey === script.id}
                        onCopy={(t) => copyText(script.id, t)}
                      />
                    </li>
                  ))}
                </ul>
              </Collapsible>
            </div>

            <p className="mt-6">
              <button type="button" onClick={() => onNavigate("hub", "words")} className={textLink}>
                Looking up a clinical term? See Health Dictionary &amp; Medical Terms
              </button>
            </p>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* GET HELP NOW */}
      {/* ------------------------------------------------------------------ */}
      {tab === "help" && (
        <section role="tabpanel" id="help" aria-labelledby="tab-help" className="motion-panel scroll-mt-32">
          <div className={panelInner}>
            {/* No H2 here: it only repeated the tab's name. */}
            {/* COMPLIANCE (round 2, droppable): Dose hidden until KP rules (Herdy, 18 Nov 2026). The intro promises the
                maternal warning signs, which are hidden below, so the whole sentence is off while they are. Original:
            <p className={bodyText}>
              Confidential 24/7 hotlines, adolescent privacy guarantees, and maternal warning signs triage.
            </p>
            */}

            <div className={cn(tintPink, "mt-8 flex items-start gap-4 md:p-6")}>
              <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-raspberry" aria-hidden="true" />
              <div>
                <h2 className="font-sans text-lg font-semibold text-deep-teal">
                  Emergency &amp; Life-Threatening Situations
                </h2>
                <p className="mt-1 max-w-[36rem] text-base text-charcoal text-pretty">
                  If you or someone you know is experiencing acute severe bleeding, sudden chest pain, difficulty breathing, suicidal thoughts, or immediate domestic danger: <strong>call 911</strong> or proceed directly to the nearest emergency department immediately. You do not need insurance to receive emergency stabilization.
                </p>
              </div>
            </div>

            <h2 className={cn(h3Class, "mt-12")}>24/7 Confidential Hotlines &amp; Text Lines</h2>
            <p className="mt-2 max-w-[36rem] text-base text-charcoal-light text-pretty">
              Always free, confidential, and staffed by trained educators &amp; crisis clinicians.
            </p>
            {/* One directory of rows: no half-empty card rows at any width */}
            <ul className="mt-6 divide-y divide-[#E5E1DC] rounded-2xl border border-[#E5E1DC] border-t-4 border-t-coral bg-white shadow-sm">
              {sortedHotlines.map((hotline) => (
                <li
                  key={hotline.name}
                  className="grid grid-cols-1 gap-4 px-5 py-5 md:px-6 xl:grid-cols-12 xl:items-center xl:gap-6"
                >
                  <div className="xl:col-span-4">
                    <h3 className={cardTitle}>{hotline.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-deep-teal">{hotline.hours}</p>
                  </div>
                  <div className="xl:col-span-5">
                    <p className="max-w-[36rem] text-base text-charcoal text-pretty">{hotline.desc}</p>
                    {hotline.sms && (
                      <p className="mt-3 flex items-start gap-2 text-sm font-semibold text-charcoal">
                        <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-coral-dark" aria-hidden="true" />
                        {/* Display only: phone numbers ("1-833-TLC-MAMA") never split at a hyphen */}
                        <span>
                          {hotline.sms.split(/(\(?[0-9A-Z]+(?:-[0-9A-Z]+)+\)?)/g).map((part, i) =>
                            /-/.test(part) && /[0-9]/.test(part) ? (
                              <span key={i} className="whitespace-nowrap">
                                {part}
                              </span>
                            ) : (
                              part
                            )
                          )}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="xl:col-span-3 xl:justify-self-end">
                    {/* 5-6 digit short codes (741741) are text lines; 988 and full numbers are calls */}
                    {!/^\d{5,6}$/.test(hotline.number.replace(/[^0-9]/g, "")) ? (
                      <a href={`tel:${hotline.number.replace(/[^0-9]/g, "")}`} className={btnSecondary}>
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        <span>Call <span className="whitespace-nowrap">{hotline.number}</span></span>
                      </a>
                    ) : (
                      <a href={`sms:${hotline.number.replace(/[^0-9]/g, "")}`} className={btnSecondary}>
                        <MessageSquare className="h-4 w-4" aria-hidden="true" />
                        <span>Text <span className="whitespace-nowrap">{hotline.number}</span></span>
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className={cn(accordionBox, edgeRaspberry, "mt-12")}>
              <Collapsible title="Know Your Rights: Confidential Adolescent Care Guide">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div>
                    <h4 className="font-sans text-base font-semibold text-deep-teal">Title X Federal Protection</h4>
                    <p className="mt-2 max-w-[36rem] text-base text-charcoal text-pretty">
                      Under federal Title X guidelines, youth and minors have the absolute legal right to receive confidential contraceptive counseling, STI testing, and pregnancy checks at any Title X clinic without parental consent or notification.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans text-base font-semibold text-deep-teal">Preventing Insurance EOB Letters</h4>
                    <p className="mt-2 max-w-[36rem] text-base text-charcoal text-pretty">
                      If you use your parent&apos;s insurance, an &quot;Explanation of Benefits&quot; (EOB) mailer could be sent home. Tell clinic staff: <em>&quot;I need this visit confidential. Please suppress the EOB or charge on your sliding fee scale.&quot;</em>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans text-base font-semibold text-deep-teal">Front Desk Check-in Script</h4>
                    <p className="mt-2 max-w-[36rem] text-base text-charcoal text-pretty">
                      Say to reception: <em>&quot;Hi, I am here for confidential reproductive services. I would like to be seen under your sliding scale program and ensure no mail or texts are sent to my family home.&quot;</em>
                    </p>
                  </div>
                </div>
              </Collapsible>
              {/* COMPLIANCE (round 2, droppable): Dose hidden until KP rules (Herdy, 18 Nov 2026). The maternal
                  warning-sign row carries symptom thresholds ("Fever of 100.4°F or higher", "before 37 weeks"), so the
                  whole collapsible is off. Original row (signs list: MATERNAL_WARNING_SIGNS, commented out above):
              <Collapsible title="Urgent Maternal Warning Signs (CDC Hear Her Protocol)">
                <p className="max-w-[36rem] text-base text-charcoal text-pretty">
                  During pregnancy and for up to 1 full year postpartum, these warning signs require urgent medical evaluation — do not allow symptoms to be dismissed:
                </p>
                <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                  {MATERNAL_WARNING_SIGNS.map((sign) => (
                    <li key={sign} className="flex items-start gap-3 text-base text-charcoal">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </Collapsible>
              */}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAKE ACTION */}
      {/* ------------------------------------------------------------------ */}
      {tab === "petitions" && (
        <section role="tabpanel" id="petitions" aria-labelledby="tab-petitions" className="motion-panel scroll-mt-32 bg-warm-cream">
          <div className={panelInner}>
            {/* No H2 here: it only repeated the tab's name. */}
            <p className={bodyText}>
              Add your voice to active legislative campaigns and download pre-drafted advocacy letters.
            </p>

            <ul className="mt-8 divide-y divide-[#E5E1DC] rounded-2xl border border-[#E5E1DC] border-t-4 border-t-raspberry bg-white shadow-sm">
              {PETITIONS_DATA.map((petition) => (
                <li key={petition.id} className="px-5 py-5 md:px-6">
                  <p className="text-sm font-semibold text-deep-teal">
                    {petition.location} • {petition.organizer}
                  </p>
                  <h2 className={cn(cardTitle, "mt-1")}>{titleText(petition.title)}</h2>
                  <p className="mt-1 text-sm font-semibold text-charcoal-light">Target: {petition.target}</p>
                  <div className="mt-3">
                    <a
                      href={petition.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={btnSecondary}
                    >
                      <span>Open petition</span>
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </div>
                  <details className="group mt-1">
                    <summary
                      className={cn(
                        "flex min-h-11 cursor-pointer list-none items-center gap-2 font-sans text-base font-semibold text-deep-teal underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden",
                        focusRing
                      )}
                    >
                      <Plus className="h-5 w-5 shrink-0 text-raspberry transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
                      Details and key demands
                    </summary>
                    <p className="mt-1 max-w-[36rem] text-base text-charcoal text-pretty">{petition.summary}</p>
                    <h3 className="mt-3 font-sans text-base font-semibold text-deep-teal">Key Demands</h3>
                    <ul className="mt-1 list-disc space-y-1.5 pl-5 text-base text-charcoal">
                      {petition.fullDemands.map((demand, idx) => (
                        <li key={idx}>{demand}</li>
                      ))}
                    </ul>
                    {petition.legislativeMilestone && (
                      <p className="mt-3 text-sm text-charcoal-light">
                        <strong>{petition.legislativeGoalType || "Legislative Threshold"}:</strong>{" "}
                        {petition.legislativeMilestone}
                      </p>
                    )}
                    {petition.billOrInitiative && (
                      <a
                        href={petition.billUrl || petition.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(textLink, "mt-1 text-sm")}
                      >
                        <span>{petition.billOrInitiative}</span>
                        <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </details>
                </li>
              ))}
            </ul>

            <div className={cn(accordionBox, edgeCoral, "mt-10")}>
              <Collapsible title="Pre-Written Advocacy Letter Templates">
                <p className="max-w-[36rem] text-base text-charcoal text-pretty">
                  Ready-to-use letters to send to your school principal, district superintendent, or elected officials. Copy with 1 click and customize!
                </p>
                <ul className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {ADVOCACY_LETTER_TEMPLATES.map((letter, i) => (
                    <li key={letter.id} className={cn(i % 2 ? tintPink : tintTeal, "flex flex-col items-start gap-3")}>
                      <div>
                        <p className="text-sm font-semibold text-deep-teal">{letter.category}</p>
                        <h4 className={cn(cardTitle, "mt-1")}>{letter.title}</h4>
                      </div>
                      <details className="group w-full">
                        <summary
                          className={cn(
                            "flex min-h-11 cursor-pointer list-none items-center gap-2 font-sans text-base font-semibold text-deep-teal underline-offset-4 hover:underline [&::-webkit-details-marker]:hidden",
                            focusRing
                          )}
                        >
                          <Plus className="h-5 w-5 shrink-0 text-raspberry transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
                          Read the letter
                        </summary>
                        <p className="mt-1 max-w-[36rem] whitespace-pre-wrap text-base text-charcoal">{letter.text}</p>
                      </details>
                      <div className="flex flex-wrap items-center gap-3">
                        <CopyButton
                          text={letter.text}
                          label="Copy Letter Template"
                          done={copiedKey === letter.id}
                          onCopy={(t) => copyText(letter.id, t)}
                        />
                        <span className="text-sm text-charcoal-light">Paste into email or print</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Collapsible>
              <Collapsible title="National Advocacy & Legislative Coalitions">
                <p className="max-w-[36rem] text-base text-charcoal text-pretty">
                  Direct access to verified non-profit networks driving federal bills and state-level policy change:
                </p>
                <ul className="mt-5 divide-y divide-[#E5E1DC] border-y border-[#E5E1DC]">
                  {REAL_WORLD_ADVOCACY_LINKS.map((link) => (
                    <li key={link.url} className="grid grid-cols-1 gap-1 py-4 lg:grid-cols-12 lg:gap-6">
                      <div className="lg:col-span-5">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn("text-balance font-sans text-lg font-semibold text-deep-teal underline-offset-4 hover:underline", focusRing)}
                      >
                        {link.title}
                        <ExternalLink className="ml-1.5 inline h-3.5 w-3.5 align-baseline" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                      <p className="mt-1 text-sm font-semibold text-deep-teal">{link.organization}</p>
                      </div>
                      <p className="mt-1 text-base text-charcoal text-pretty lg:col-span-7 lg:mt-0">{link.description}</p>
                    </li>
                  ))}
                </ul>
              </Collapsible>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
