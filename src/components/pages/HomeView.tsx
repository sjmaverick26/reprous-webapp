"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { PageId } from "@/components/layout/Navbar";
import { PillarPath } from "@/components/shared/PillarPath";

interface HomeViewProps {
  onNavigate: (page: PageId, categoryId?: string) => void;
  onSelectLang?: (lang: string) => void;
}

const linkClass =
  "inline-flex min-h-[44px] items-center gap-2 text-base font-semibold underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm transition-colors duration-150";

export function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div className="flex w-full min-w-0 flex-col text-charcoal">
      {/* 1. Hero: her line, one primary action, one text link */}
      <section
        id="hero"
        className="w-full bg-light-teal py-16 md:py-24 scroll-mt-20 md:scroll-mt-24"
      >
        <div className="mx-auto flex w-full max-w-6xl min-w-0 flex-col items-center px-4 text-center md:px-6">
          <h1 className="mb-6 max-w-full font-serif text-h1 font-normal text-balance text-deep-teal">
            Know your body.
            <br />
            Know{" "}
            <span className="relative inline-block text-raspberry">
              what to ask.
              <span
                className="pointer-events-none absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-coral"
                aria-hidden="true"
              />
            </span>
          </h1>

          <p className="mb-8 max-w-[65ch] font-sans text-body text-pretty text-charcoal-light">
            Clear, accessible health education for girls — understanding your biology, recognizing symptoms, and advocating for your care.
          </p>

          <div className="flex flex-col items-center justify-center gap-x-6 gap-y-2 sm:flex-row sm:flex-wrap">
            {/* The one filled action is the first lesson; the story is the quiet second door. */}
            <button
              type="button"
              onClick={() => onNavigate("hub")}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-raspberry px-7 py-3 font-sans text-base font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-raspberry-dark motion-press motion-arrow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry focus-visible:ring-offset-2 active:bg-raspberry-dark"
            >
              <span>Start learning</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("story")}
              className={`${linkClass} text-deep-teal focus-visible:ring-deep-teal`}
            >
              Why ReproUs exists
            </button>
          </div>
        </div>
      </section>

      {/* 2. Her three actions: the one deep-teal band */}
      <section
        id="commitment"
        className="w-full bg-deep-teal py-16 text-white scroll-mt-20 md:py-24 md:scroll-mt-24"
      >
        <div className="mx-auto w-full max-w-6xl min-w-0 px-4 md:px-6">
          <div data-reveal="" className="mx-auto mb-12 flex max-w-3xl flex-col items-center text-center md:mb-16">
            <h2 className="mb-4 font-serif text-h2 font-normal text-balance text-white">
              You shouldn&apos;t need to become an expert to be taken seriously.
            </h2>
            <p className="max-w-[65ch] font-sans text-body text-pretty text-light-teal">
              ReproUs helps girls understand their bodies, recognize symptoms, and build the confidence to ask informed questions about their health.
            </p>
          </div>

          <PillarPath onNavigate={onNavigate} className="mx-auto max-w-xl lg:max-w-none" />
        </div>
      </section>

      {/* 3. Closing: her sentence names Learn and Youth Voices, so the band offers exactly those two */}
      <section
        id="voices-band"
        className="w-full bg-warm-cream py-16 scroll-mt-20 md:py-24 md:scroll-mt-24"
      >
        <div data-reveal="" className="mx-auto flex w-full max-w-6xl min-w-0 flex-col items-center px-4 text-center md:px-6">
          <h2 className="mb-4 max-w-3xl font-serif text-h3 font-normal text-balance text-deep-teal">
            You&apos;re not alone in figuring this out.
          </h2>
          <p className="mb-8 max-w-[65ch] font-sans text-body text-pretty text-charcoal-light">
            Browse Learn topics, or hear directly from other young people in Youth Voices.
          </p>
          <div className="flex flex-col items-center justify-center gap-x-6 gap-y-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => onNavigate("hub")}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-raspberry px-7 py-3 font-sans text-base font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-raspberry-dark motion-press motion-arrow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry focus-visible:ring-offset-2 active:bg-raspberry-dark"
            >
              <span>Start learning</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("voices")}
              className={`${linkClass} text-deep-teal focus-visible:ring-deep-teal`}
            >
              <span>Read Youth Voices</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
