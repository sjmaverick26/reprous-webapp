"use client";

import React from "react";
import { Mail } from "lucide-react";
import { siteLinks } from "@/data/siteLinks";
import { PageId } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

interface ContactViewProps {
  /** Kept so older callers still compile. The three old tabs are gone: there is one contact panel. */
  initialTab?: string;
  /** Optional: lets the hotline note link to the Resources page. */
  onNavigate?: (page: PageId, categoryOrTab?: string) => void;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-2";
const card = "rounded-2xl border border-[#E5E1DC] bg-white p-5 shadow-sm md:p-8";
const btnPrimary = cn(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-raspberry px-6 py-2.5 text-center text-base font-semibold text-white transition-colors duration-200 hover:bg-raspberry-dark motion-press motion-arrow",
  focusRing
);
const btnSecondary = cn(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-deep-teal bg-white px-6 py-2.5 text-center text-base font-semibold text-deep-teal transition-colors duration-200 hover:bg-light-teal motion-press motion-arrow",
  focusRing
);
const h2Class = "font-serif text-h3 font-normal text-deep-teal text-balance";

export function ContactView({ onNavigate }: ContactViewProps) {
  const email = siteLinks.contactEmail;
  const ambassadorMailto = `mailto:${email}?subject=${encodeURIComponent("Youth Ambassador application")}`;

  return (
    <div className="font-sans text-charcoal">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        {/* Header */}
        <header className="max-w-3xl">
          <h1 className="font-serif text-h1 font-normal text-deep-teal text-balance">Contact Us</h1>
          <p className="mt-5 max-w-2xl text-body text-charcoal text-pretty">
            Whether you want to bring a free workshop to your school, partner with our clinical advisory network, or ask a question — we&apos;re here for you.
          </p>
        </header>

        {/* One panel: email, then ambassadors */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className={cn(card, "flex flex-col justify-between gap-8")}>
            <div>
              <h2 className={h2Class}>General Inquiries</h2>
              <p className="max-w-[65ch] mt-3 text-body text-charcoal text-pretty">
                Have a question about our organization, media inquiries, or partnering with your youth center or health clinic?
              </p>
            </div>
            <div>
              <a href={`mailto:${email}`} className={btnPrimary}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Email {email}</span>
              </a>
            </div>
          </div>

          <div className={cn(card, "flex flex-col justify-between gap-8")}>
            <div>
              <h2 className={h2Class}>Become a ReproUs Youth Ambassador</h2>
              <p className="max-w-[65ch] mt-3 text-body text-charcoal text-pretty">
                Youth Ambassadors are the heart of ReproUs. You will lead peer discussions, host interactive resource tables at school, help organize workshops, and advocate for reproductive health equity in your community.
              </p>
            </div>
            <div>
              <a href={ambassadorMailto} className={btnSecondary}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Email us to apply</span>
              </a>
            </div>
          </div>
        </div>

        {/* Hotline note */}
        <div className="mt-12 max-w-3xl rounded-2xl bg-warm-cream p-5 md:p-6">
          <p className="max-w-[65ch] text-body text-charcoal text-pretty">
            <strong>In need of immediate support or medical advice?</strong> Please refer to our 24/7 confidential hotlines on the{" "}
            {onNavigate ? (
              <button
                type="button"
                onClick={() => onNavigate("resources", "help")}
                className={cn(
                  "inline font-semibold text-deep-teal underline underline-offset-4 hover:text-deep-teal-dark",
                  focusRing
                )}
              >
                Resources page
              </button>
            ) : (
              <span className="font-semibold">Resources page</span>
            )}
            .
          </p>
        </div>
      </div>
    </div>
  );
}
