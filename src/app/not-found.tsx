import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReproUsMark } from "@/components/shared/ReproUsMark";
import { PillarPath } from "@/components/shared/PillarPath";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <main id="main" tabIndex={-1} className="flex-1 w-full bg-warm-cream text-charcoal outline-none">
        <div className="mx-auto w-full max-w-6xl min-w-0 px-4 py-16 md:px-6 md:py-24">
          <Link
            href="/"
            className="mb-12 inline-flex min-h-[44px] items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-2 focus-visible:ring-offset-warm-cream md:mb-16"
          >
            <ReproUsMark size={40} />
            <span className="inline-flex items-center font-serif text-2xl tracking-tight text-deep-teal">
              <span>Repro</span>
              <span className="mx-1 inline-block h-2 w-2 rounded-full bg-coral" aria-hidden="true" />
              <span>Us</span>
            </span>
            <span className="sr-only">Home</span>
          </Link>

          <h1 className="mb-12 max-w-3xl font-serif text-h1 font-normal text-balance text-deep-teal md:mb-16">
            This page doesn&apos;t exist
          </h1>

          <PillarPath compact tone="light" className="max-w-xl lg:max-w-none" />

          <div className="mt-12 md:mt-16">
            <Link
              href="/"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-[1.5px] border-deep-teal bg-transparent px-7 py-3 font-sans text-base font-semibold text-deep-teal transition-colors duration-150 hover:bg-light-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-2 focus-visible:ring-offset-warm-cream"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
