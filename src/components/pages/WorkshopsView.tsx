"use client";

import React from "react";
import { Calendar, Mail } from "lucide-react";
import { WORKSHOP_STEPS } from "@/data/workshopsData";
import { siteLinks } from "@/data/siteLinks";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-2";
const card = "rounded-2xl border border-[#E5E1DC] bg-white p-5 shadow-sm md:p-6";
const h2Class = "font-serif text-h2 font-normal text-deep-teal text-balance";

export function WorkshopsView() {
  const requestMailto = `mailto:${siteLinks.contactEmail}?subject=${encodeURIComponent("Workshop request")}`;

  return (
    <div className="font-sans text-charcoal">
      {/* Header */}
      <header className="mx-auto max-w-6xl px-4 pb-10 pt-16 md:px-6 md:pb-14 md:pt-20">
        <h1 className="max-w-4xl font-serif text-h1 font-normal text-deep-teal text-balance">
          Free, Interactive Workshops
        </h1>
        <p className="mt-5 max-w-2xl text-body text-charcoal text-pretty">
          Hands-on 90-minute sessions in schools and community centers. No tests, no awkwardness — just real facts, honest discussion, and practical skills.
        </p>
      </header>

      {/* What to expect */}
      <section className="bg-warm-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <h2 className={h2Class}>What to expect</h2>
          {/* Four steps: one column below 1024, one full row of four from 1024 (no orphan); title and text rows align */}
          <ul className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-4">
            {WORKSHOP_STEPS.map((step) => (
              <li key={step.step} className={cn(card, "grid gap-2 lg:row-span-2 lg:grid-rows-subgrid")}>
                <h3 className="font-sans text-lg font-semibold text-deep-teal text-balance">{step.title}</h3>
                <p className="max-w-[65ch] text-base text-charcoal text-pretty">{step.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Upcoming workshops: none yet */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <h2 className={h2Class}>Join an upcoming free workshop</h2>
          <div className={cn(card, "mt-8 flex items-start gap-4 md:p-8")}>
            <Calendar className="mt-1 h-6 w-6 shrink-0 text-deep-teal" aria-hidden="true" />
            <p className="text-lg font-semibold text-deep-teal">No upcoming workshops yet</p>
          </div>
        </div>
      </section>

      {/* Bring ReproUs to your school or group: a light band, so a light ground always meets the deep-teal footer */}
      <section className="bg-light-teal">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-16 md:flex-row md:items-center md:px-6 md:py-24">
          <div className="max-w-xl">
            <h2 className="font-serif text-h2 font-normal text-deep-teal text-balance">
              Bring ReproUs to your school or group
            </h2>
            <p className="max-w-[65ch] mt-4 text-body text-charcoal text-pretty">
              We will travel to you or host a dedicated virtual session for your class, youth organization, or community center.
            </p>
          </div>
          <a
            href={requestMailto}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-raspberry px-6 py-2.5 text-center text-base font-semibold text-white transition-colors duration-200 hover:bg-raspberry-dark",
              focusRing
            )}
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span>Request a workshop</span>
          </a>
        </div>
      </section>
    </div>
  );
}
