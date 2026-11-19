"use client";

import React from "react";
import { ArrowRight, BookOpen, Search, ShieldCheck } from "lucide-react";
import type { PageId } from "@/components/layout/Navbar";

export type PillarId = "learn" | "recognize" | "advocate";

interface PathLink {
  label: string;
  page: PageId;
  tab?: string;
  href: string;
}

interface PathStop {
  id: PillarId;
  title: string;
  body: string;
  icon: React.ReactNode;
  chip: string;
  delay: string;
  links: PathLink[];
}

// Her three actions (session 1, 5 Nov) with her current card lines. Same targets as the Home cards.
const STOPS: PathStop[] = [
  {
    id: "learn",
    title: "Learn about your body",
    body: "Grasp how your hormones, cycles, and anatomy function in clear, plain language without shame or medical jargon.",
    icon: <BookOpen className="h-6 w-6 text-deep-teal" aria-hidden="true" />,
    chip: "bg-light-teal",
    delay: "0s",
    links: [{ label: "Start learning", page: "hub", href: "/#/learn" }],
  },
  {
    id: "recognize",
    title: "Recognize and understand symptoms",
    body: "Identify symptoms that are often dismissed or normalized—like severe period pain, missing cycles, and chronic fatigue.",
    icon: <Search className="h-6 w-6 text-deep-teal-dark" aria-hidden="true" />,
    chip: "bg-coral",
    delay: "1.2s",
    links: [{ label: "Symptom tracker", page: "resources", tab: "tracker", href: "/#/resources/tracker" }],
  },
  {
    id: "advocate",
    title: "Advocate for your health",
    body: "Build the vocabulary, questions, and symptom logs to be taken seriously by clinicians, parents, and coaches.",
    icon: <ShieldCheck className="h-6 w-6 text-white" aria-hidden="true" />,
    chip: "bg-raspberry",
    delay: "2.4s",
    links: [
      { label: "Self-advocacy tools", page: "resources", tab: "toolkit", href: "/#/resources/toolkit" },
      { label: "Ask a question anonymously", page: "voices", tab: "ask", href: "/#/voices/ask" },
    ],
  },
];

interface PillarPathProps {
  /** Doors only: node + title (the title is the link). No card line, no extra links. */
  compact?: boolean;
  /** Marks one stop as the current step. */
  active?: PillarId;
  /** "dark" = on the deep-teal band (default); "light" = on a light ground. */
  tone?: "dark" | "light";
  /** Inside the app: route through the view switcher. Without it, links are plain hash URLs. */
  onNavigate?: (page: PageId, tab?: string) => void;
  className?: string;
}

/**
 * Her three actions as one path: Learn → Recognize → Advocate.
 * <1024: vertical, dashed connector on the left edge, stops stacked.
 * ≥1024: horizontal, three nodes on one dashed line; title / line / links rows share a subgrid so they align.
 */
export function PillarPath({ compact = false, active, tone = "dark", onNavigate, className = "" }: PillarPathProps) {
  const dark = tone === "dark";
  const titleColor = dark ? "text-white" : "text-deep-teal";
  const bodyColor = dark ? "text-white" : "text-charcoal";
  const linkColor = dark
    ? "text-white focus-visible:ring-white focus-visible:ring-offset-deep-teal"
    : "text-deep-teal focus-visible:ring-deep-teal focus-visible:ring-offset-warm-cream";
  const connector = dark ? "border-light-teal-dark" : "border-deep-teal-light";
  const nodeRing = dark ? "ring-2 ring-white" : "ring-4 ring-white shadow-node";
  const rows = compact ? "lg:row-span-2" : "lg:row-span-4";

  const go = (l: PathLink) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate) return;
    e.preventDefault();
    onNavigate(l.page, l.tab);
  };

  const linkClass = `inline-flex min-h-[44px] items-center gap-2 rounded-sm font-sans text-base font-semibold underline-offset-4 transition-colors duration-150 hover:underline focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${linkColor}`;

  return (
    <ol
      data-reveal-stagger=""
      className={`m-0 flex list-none flex-col gap-10 p-0 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0 ${className}`}
    >
      {STOPS.map((s, i) => {
        const isActive = active === s.id;
        const isLast = i === STOPS.length - 1;
        const first = s.links[0];
        return (
          <li
            key={s.id}
            aria-current={isActive ? "step" : undefined}
            className={`relative flex min-w-0 gap-5 lg:grid lg:grid-rows-subgrid lg:gap-0 ${rows}`}
          >
            {!isLast && (
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute left-[27px] top-[68px] -bottom-8 w-0 border-l-2 border-dashed lg:bottom-auto lg:left-[72px] lg:-right-4 lg:top-[27px] lg:h-0 lg:w-auto lg:border-l-0 lg:border-t-2 ${connector}`}
              />
            )}

            <span
              className={`animate-pillar-float relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full lg:mb-6 ${s.chip} ${
                isActive ? "ring-4 ring-soft-pink" : nodeRing
              }`}
              style={{ animationDelay: s.delay }}
            >
              {s.icon}
            </span>

            <div className="flex min-w-0 flex-col pt-2 lg:contents">
              <h3 className={`m-0 font-serif text-2xl font-normal text-balance ${titleColor} ${compact ? "" : "mb-2"}`}>
                {compact ? (
                  <a
                    href={first.href}
                    onClick={go(first)}
                    className={`inline-block rounded-sm py-1.5 underline-offset-4 transition-colors duration-150 hover:underline focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${linkColor}`}
                  >
                    {s.title}
                    <ArrowRight className="ml-2 inline-block h-5 w-5 align-middle" aria-hidden="true" />
                  </a>
                ) : (
                  s.title
                )}
              </h3>

              {!compact && (
                <>
                  <p className={`m-0 mb-3 max-w-[36rem] font-sans text-base text-pretty ${bodyColor}`}>{s.body}</p>
                  <div className="flex flex-col items-start">
                    {s.links.map((l) => (
                      <a key={l.label} href={l.href} onClick={go(l)} className={`${linkClass} text-left`}>
                        <span>{l.label}</span>
                        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
