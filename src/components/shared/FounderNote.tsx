import React from "react";
import { ReproUsMark } from "@/components/shared/ReproUsMark";

// Drop the founder photo into /public and set its path here, e.g. "/founder.jpg".
// While this is empty, a quiet designed frame with the ReproUs mark is shown.
const FOUNDER_PHOTO = "";

interface FounderNoteProps {
  photoSrc?: string;
  className?: string;
}

export function FounderNote({ photoSrc = FOUNDER_PHOTO, className = "" }: FounderNoteProps) {
  return (
    <figure className={`m-0 flex w-full max-w-[240px] min-w-0 flex-col gap-3 ${className}`}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#E5E1DC] bg-light-teal">
        {photoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoSrc}
            alt="Founder of ReproUs"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
            <ReproUsMark size={72} />
          </div>
        )}
      </div>
      {!photoSrc && (
        <figcaption className="font-sans text-small text-charcoal-light">
          Founder photo coming soon
        </figcaption>
      )}
    </figure>
  );
}
