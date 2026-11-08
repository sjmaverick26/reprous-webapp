"use client";

import React, { useState, useEffect } from "react";
import { ExternalLink, Quote, Clock, Plus } from "lucide-react";
import { INITIAL_VOICES, YouthVoice } from "@/data/voicesData";
import { FAQS_DATA } from "@/data/faqsData";
import { siteLinks } from "@/data/siteLinks";
import { EducationalReferences } from "@/components/shared/EducationalReferences";
import { PageId } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

/** "toolkit" now lives in Resources; "ask" and "qa" both mean the anonymous Q&A section. */
export type CommunityTab = "stories" | "qa" | "ask" | "toolkit";

interface VoicesViewProps {
  initialTab?: CommunityTab | string;
  autoOpenSubmit?: boolean;
  onNavigate?: (page: PageId, categoryId?: string) => void;
}

// ---------------------------------------------------------------------------
// Shared look (DESIGN.md)
// ---------------------------------------------------------------------------
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-2";
const card = "rounded-2xl border border-[#E5E1DC] bg-white p-5 shadow-sm md:p-6";
const btnPrimary = cn(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-raspberry px-6 py-2.5 text-center text-base font-semibold text-white transition-colors duration-200 hover:bg-raspberry-dark motion-press motion-arrow",
  focusRing
);
const btnSecondary = cn(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-deep-teal bg-white px-6 py-2.5 text-center text-base font-semibold text-deep-teal transition-colors duration-200 hover:bg-light-teal motion-press motion-arrow",
  focusRing
);
const sectionInner = "mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24";
const h2Class = "font-serif text-h2 font-normal text-deep-teal text-balance";
const h3Class = "font-serif text-h3 font-normal text-deep-teal text-balance";
const bodyText = "text-body text-charcoal text-pretty max-w-[65ch]";

// Her four story types.
const STORY_TYPES = [
  "Personal stories",
  "Poetry & creative writing",
  "Perspectives on health education",
  "Navigating care & self-advocacy"
] as const;
type StoryType = (typeof STORY_TYPES)[number];

// Existing stories mapped by their current category. Unclear -> "Personal stories".
const CATEGORY_TO_TYPE: Record<string, StoryType> = {
  "Cycle Sense": "Personal stories",
  "Play Strong": "Personal stories",
  Workshops: "Perspectives on health education",
  "Language Access": "Perspectives on health education",
  "Body Conditions": "Navigating care & self-advocacy"
};
const storyTypeOf = (voice: YouthVoice): StoryType =>
  (voice.category && CATEGORY_TO_TYPE[voice.category]) || "Personal stories";

// Story grid: equal card widths (2-up from 768, 3-up from 1024); a short last row is centred, never stretched.
const storyCell = "w-full md:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)] md:grow-0 md:shrink-0";

/** Link-out block for a form she runs. Empty URL -> calm "open soon" state. No on-site form. */
function SubmitBlock({
  id,
  heading,
  body,
  buttonLabel,
  url,
  primary,
  centered
}: {
  id?: string;
  heading: string;
  body?: string;
  buttonLabel: string;
  url: string;
  primary?: boolean;
  /** Centred layout (Corinne's 0b96676: centred community voice board). */
  centered?: boolean;
}) {
  const ready = url.trim() !== "";
  return (
    <div id={id} className={cn(card, "scroll-mt-32 md:p-8", centered && "flex flex-col items-center text-center")}>
      <h3 className={cn(h3Class, centered && "max-w-2xl text-balance")}>{heading}</h3>
      {body && <p className={cn(bodyText, "mt-3", centered && "mx-auto max-w-xl")}>{body}</p>}
      <div className={cn("mt-6", centered && "w-full max-w-2xl")}>
        {ready ? (
          <div className={cn("flex flex-col gap-2", centered ? "items-center" : "items-start")}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={primary ? btnPrimary : btnSecondary}
            >
              <span>{buttonLabel}</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <p className="text-sm text-charcoal-light">Opens a form run by ReproUs</p>
          </div>
        ) : (
          <div className="rounded-2xl bg-soft-pink-light p-5">
            <p className={cn("flex items-center gap-2 text-base font-semibold text-deep-teal", centered && "justify-center")}>
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>Submissions open soon</span>
            </p>
            <p className={cn("max-w-[65ch] mt-1 text-base text-charcoal text-pretty", centered && "mx-auto")}>
              You&apos;ll be able to post anonymously, and nothing is published without your OK.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function VoicesView({
  initialTab = "stories",
  autoOpenSubmit = false,
  onNavigate
}: VoicesViewProps) {
  const [typeFilter, setTypeFilter] = useState<"all" | StoryType>("all");

  const scrollToId = (id: string) => {
    if (typeof document === "undefined") return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // "qa" / "ask" / autoOpenSubmit -> scroll to the Q&A section. "toolkit" moved to Resources.
  useEffect(() => {
    if (initialTab === "toolkit") {
      onNavigate?.("resources", "toolkit");
      return;
    }
    if (initialTab === "qa" || initialTab === "ask" || autoOpenSubmit) {
      const t = setTimeout(() => scrollToId("ask"), 80);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTab, autoOpenSubmit]);

  const visibleVoices = INITIAL_VOICES.filter(
    (v) => typeFilter === "all" || storyTypeOf(v) === typeFilter
  );

  return (
    <div className="font-sans text-charcoal">
      {/* Header */}
      <header className="bg-soft-pink-light">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 md:px-6 md:pb-14 md:pt-20">
        {/* Pillar marker: Advocate */}
        <p className="m-0 mb-4 inline-flex items-center gap-2.5 text-base font-semibold text-deep-teal">
          <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full bg-raspberry ring-4 ring-soft-pink" />
          Advocate
        </p>
        <h1 className="max-w-4xl font-serif text-h1 font-normal text-deep-teal text-balance">
          Youth Voices
        </h1>
        <p className="mt-5 max-w-2xl text-body text-charcoal text-pretty">
          Real stories from peers navigating bodily changes, and confidential clinical answers to questions you might feel nervous asking.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => scrollToId("stories")} className={btnSecondary}>
            Stories
          </button>
          <button type="button" onClick={() => scrollToId("ask")} className={btnSecondary}>
            Anonymous Q&amp;A
          </button>
        </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* STORIES */}
      {/* ------------------------------------------------------------------ */}
      <section id="stories" className="scroll-mt-32 bg-warm-cream">
        <div className={sectionInner}>
          <h2 className={h2Class}>Real Stories, Shared on Purpose</h2>
          <p className={cn(bodyText, "mt-4")}>
            Personal reflections and lived discoveries from youth who navigated identical bodily changes and medical questions.
          </p>
          <p className="mt-2 text-sm text-charcoal-light italic text-pretty">
            (Note: Peer quotes are curated for educational empowerment.)
          </p>

          {/* Type filter */}
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by type">
            {(["all", ...STORY_TYPES] as const).map((t) => {
              const selected = typeFilter === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTypeFilter(t)}
                  aria-pressed={selected}
                  className={cn(
                    "min-h-11 rounded-full border-2 px-4 text-sm font-semibold transition-colors duration-200",
                    focusRing,
                    selected
                      ? "border-deep-teal bg-deep-teal text-white"
                      : "border-[#E5E1DC] bg-white text-deep-teal hover:border-deep-teal"
                  )}
                >
                  {t === "all" ? "All" : t}
                </button>
              );
            })}
          </div>

          {/* Stories grid */}
          {visibleVoices.length === 0 ? (
            <div className={cn(card, "mt-8 md:p-8")}>
              <p className="max-w-[65ch] text-base text-charcoal">Nothing here yet.</p>
              <button
                type="button"
                onClick={() => scrollToId("share")}
                className="mt-2 inline-flex min-h-11 items-center text-base font-semibold text-deep-teal underline-offset-4 hover:underline"
              >
                Share yours
              </button>
            </div>
          ) : (
            <ul key={typeFilter} data-reveal-stagger="" className="motion-panel mt-8 flex flex-wrap justify-center gap-6">
              {visibleVoices.map((voice) => (
                <li key={voice.id} className={cn(card, "flex flex-col justify-between gap-6", storyCell)}>
                  <div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-light-teal" aria-hidden="true">
                      <Quote className="h-4 w-4 text-deep-teal" />
                    </span>
                    <blockquote className="mt-3 max-w-[65ch] text-lg text-deep-teal text-pretty">
                      &ldquo;{voice.quote}&rdquo;
                    </blockquote>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E5E1DC] pt-4">
                    <p className="text-sm font-semibold text-charcoal-light">
                      — {voice.author}
                      {typeof voice.age === "number" ? `, ages ${voice.age <= 15 ? "13–15" : voice.age <= 18 ? "16–18" : "19+"}` : ""}
                    </p>
                    <span className="rounded-full bg-light-teal px-3 py-1 text-sm font-semibold text-deep-teal text-balance">
                      {storyTypeOf(voice)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div data-reveal="" className="mt-12">
            <SubmitBlock
              id="share"
              heading="Share what you wish someone had told you."
              body="Did you have an experience with a doctor, a period surprise, or a lesson about your body that helped you? Your reflection could help another young person feel less alone."
              buttonLabel="Share your story"
              url={siteLinks.storyFormUrl}
              primary
              centered
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ANONYMOUS Q&A */}
      {/* ------------------------------------------------------------------ */}
      <section id="ask" className="scroll-mt-32">
        <div className={sectionInner}>
          <h2 className={h2Class}>Questions, Answered Plainly</h2>
          <p className={cn(bodyText, "mt-4")}>Real answers written plainly from clinical guidelines.</p>

          <div data-reveal="" className="mt-8 divide-y divide-[#E5E1DC] rounded-2xl border border-[#E5E1DC] bg-white shadow-sm">
            {FAQS_DATA.map((faq) => (
              <details key={faq.id} className="group px-5 md:px-6">
                <summary
                  className={cn(
                    "flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 font-sans text-lg font-semibold text-deep-teal [&::-webkit-details-marker]:hidden",
                    focusRing
                  )}
                >
                  <span className="text-pretty">{faq.question}</span>
                  <Plus
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-deep-teal transition-transform duration-200 group-open:rotate-45"
                  />
                </summary>
                <p className="pb-5 text-base text-charcoal text-pretty max-w-[65ch]">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div data-reveal="" className="mt-12">
            <SubmitBlock
              heading="Ask an Anonymous Question"
              buttonLabel="Ask an anonymous question"
              url={siteLinks.questionFormUrl}
            />
          </div>

          <div className="mt-12">
            <EducationalReferences customTitle="Q&A Evidence Base & Medical Sources" />
          </div>
        </div>
      </section>
    </div>
  );
}
