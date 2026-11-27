"use client";

import React from "react";
import { siteLinks } from "@/data/siteLinks";
import { CoreThreeRule } from "@/components/shared/CoreThreeRule";

// Every line here was checked against the live site (27 Nov 2026): it loads only from its own domain,
// sets no cookies, and writes nothing to the browser until a visitor saves lesson progress.
// If the site adds analytics, a new embed or a form, update this page in the same change.
const LAST_UPDATED = "27 November 2026";

const sectionHead = "font-serif text-2xl font-normal leading-[1.2] text-deep-teal text-balance";
const bodyText = "mt-3 max-w-[36rem] text-base text-charcoal text-pretty";

export function PrivacyView() {
  const email = siteLinks.contactEmail;
  return (
    <div className="font-sans text-charcoal">
      <header className="bg-light-teal">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 md:px-6 md:pb-14 md:pt-20">
          <h1 className="max-w-4xl font-serif text-h1 font-normal text-deep-teal text-balance">Privacy</h1>
          <CoreThreeRule className="mt-5" />
          <p className="mt-5 max-w-2xl text-body text-charcoal text-pretty">
            ReproUs has no accounts, no ads, no analytics and no cookies. Here is exactly what happens when you use the site.
          </p>
        </div>
      </header>

      <div className="bg-warm-cream">
        <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 md:px-6 md:py-16">
          <section>
            <h2 className={sectionHead}>Your lesson progress</h2>
            <p className={bodyText}>
              When you finish lessons in Learn, your progress is saved only in this browser on your device (in local
              storage, under the name <code className="text-sm">reprous_user_progress_v1</code>). It is never sent to us or
              anyone else. Clearing your browser data removes it.
            </p>
          </section>

          <section>
            <h2 className={sectionHead}>Hosting</h2>
            <p className={bodyText}>
              The site is hosted by Vercel. Like any web host, Vercel receives the basic details your browser sends to load a
              page, such as your IP address and browser type. Vercel&apos;s own privacy policy covers how it handles them.
              ReproUs sets no cookies, and the fonts are served from this site, not from Google.
            </p>
          </section>

          <section>
            <h2 className={sectionHead}>Lesson videos</h2>
            <p className={bodyText}>
              Lesson videos use YouTube&apos;s privacy-enhanced mode (youtube-nocookie.com) and load only when you press play.
              Once a video plays, or if you choose &ldquo;Watch on YouTube&rdquo;, YouTube&apos;s privacy policy applies.
            </p>
          </section>

          <section>
            <h2 className={sectionHead}>Stories, questions and email</h2>
            <p className={bodyText}>
              The site itself collects no personal details. When story and anonymous-question submissions open, they will
              happen in a form run by ReproUs on an outside form service, whose own privacy policy applies. Nothing is
              published without your OK. If you email us, your message goes to the ReproUs inbox.
            </p>
          </section>

          <section>
            <h2 className={sectionHead}>Questions</h2>
            <p className={bodyText}>
              Questions about privacy? Email{" "}
              <a
                href={`mailto:${email}`}
                className="font-semibold text-deep-teal underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-2"
              >
                {email}
              </a>
              .
            </p>
            <p className="mt-6 text-sm text-charcoal-light">Last updated {LAST_UPDATED}.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
