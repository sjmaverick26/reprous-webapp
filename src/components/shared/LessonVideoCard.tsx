"use client";

import React, { useState } from "react";
import { LessonVideo } from "@/data/hubData";
import { CheckCircle2, Play, ExternalLink, ShieldCheck, Clock, Award } from "lucide-react";

interface LessonVideoCardProps {
  video: LessonVideo;
  themeColor?: string;
}

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-2";

export function LessonVideoCard({ video, themeColor = "#175B5C" }: LessonVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="rounded-2xl border border-[#E5E1DC] bg-white p-5 md:p-6 space-y-4 font-sans">
      {/* Header & source */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-[#E5E1DC] pb-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-deep-teal mb-1">
            <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Clinical Education Video</span>
            <span className="text-charcoal-light" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 text-charcoal-light lowercase">
              <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" /> {video.duration}
            </span>
          </div>
          <h4 className="text-lg font-sans font-semibold text-deep-teal m-0">{video.title}</h4>
        </div>
        <div className="flex items-center gap-1.5 self-start text-sm font-semibold text-charcoal-light">
          <Award className="w-4 h-4 text-deep-teal shrink-0" aria-hidden="true" />
          <span>{video.source}</span>
        </div>
      </div>

      {/* Video player / embed */}
      <div className="relative rounded-xl overflow-hidden bg-deep-teal-dark aspect-video">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center">
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white text-deep-teal hover:bg-light-teal flex items-center justify-center transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-light-teal"
              aria-label={`Play video: ${video.title}`}
            >
              <Play className="w-7 h-7 md:w-9 md:h-9 ml-1 fill-deep-teal" aria-hidden="true" />
            </button>
            <div className="mt-3 text-white font-semibold text-sm md:text-base max-w-md">{video.title}</div>
            <div className="text-light-teal text-xs sm:text-sm mt-1">
              Curated from Educational Sources • Source: {video.source}
            </div>
          </div>
        )}
      </div>

      {/* Clinical guidelines note */}
      <div className="p-4 rounded-xl bg-light-teal-light flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-deep-teal shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-sm md:text-base text-charcoal">
          <strong className="font-semibold text-deep-teal">Clinical Standard: </strong>
          {video.medicalReviewer}. Content conforms to evidence-based clinical practice guidelines.
        </div>
      </div>

      {/* Key video takeaways */}
      <div>
        <h5 className="font-semibold text-deep-teal text-sm mb-2 flex items-center gap-1.5 m-0">
          <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
          Key Video Highlights:
        </h5>
        <ul className="m-0 p-0 list-none space-y-2 text-sm md:text-base text-charcoal">
          {video.keyHighlights.map((hl, i) => (
            <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-warm-cream">
              <span className="w-6 h-6 rounded-full bg-light-teal text-deep-teal font-semibold text-xs flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <span className="min-w-0">{hl}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* External link fallback */}
      <div className="flex justify-end">
        <a
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 min-h-11 px-2 rounded-full text-sm font-semibold text-deep-teal underline underline-offset-4 hover:text-deep-teal-dark transition-colors duration-150 ${FOCUS_RING}`}
        >
          <span>Watch on YouTube</span>
          <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
