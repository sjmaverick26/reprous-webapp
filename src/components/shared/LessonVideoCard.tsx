"use client";

import React, { useState } from "react";
import { LessonVideo } from "@/data/hubData";
import { CheckCircle2, Play, ExternalLink, ShieldCheck, Clock, Award } from "lucide-react";

interface LessonVideoCardProps {
  video: LessonVideo;
  themeColor?: string;
}

export function LessonVideoCard({ video, themeColor = "#175B5C" }: LessonVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="rounded-2xl border border-deep-teal/20 bg-white p-4 md:p-6 shadow-sm space-y-4">
      {/* Header & Reviewer Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-deep-teal/10 pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-deep-teal mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Medically Reviewed Video</span>
            <span className="text-charcoal/40">•</span>
            <span className="inline-flex items-center gap-1 text-charcoal/60 font-semibold lowercase">
              <Clock className="w-3 h-3" /> {video.duration}
            </span>
          </div>
          <h4 className="text-base md:text-xl font-serif font-bold text-deep-teal">
            {video.title}
          </h4>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span>{video.source}</span>
        </div>
      </div>

      {/* Video Player / Embed Canvas */}
      <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-video shadow-md group">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-slate-950 via-slate-900 to-slate-800">
            {/* Play Button Overlay */}
            <button
              onClick={() => setIsPlaying(true)}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-deep-teal/90 group-hover:bg-deep-teal text-white flex items-center justify-center shadow-2xl transition-all duration-200 group-hover:scale-110 focus:outline-none focus:ring-4 focus:ring-deep-teal/40"
              aria-label={`Play video: ${video.title}`}
            >
              <Play className="w-7 h-7 md:w-9 md:h-9 ml-1 fill-white" />
            </button>
            <div className="mt-3 text-white font-bold text-sm md:text-base max-w-md">
              {video.title}
            </div>
            <div className="text-slate-300 text-xs mt-1">
              Curated by ReproUs Medical Advisory • Source: {video.source}
            </div>
          </div>
        )}
      </div>

      {/* Medical Verification Banner */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs md:text-sm text-charcoal/85">
          <strong className="text-deep-teal">Medical Standard: </strong>
          {video.medicalReviewer}. Content conforms to evidence-based clinical practice guidelines.
        </div>
      </div>

      {/* Key Video Takeaways */}
      <div>
        <h5 className="font-bold text-deep-teal text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Key Video Highlights:
        </h5>
        <ul className="space-y-2 text-xs md:text-sm text-charcoal/85">
          {video.keyHighlights.map((hl, i) => (
            <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50/70 border border-gray-200/60">
              <span className="w-5 h-5 rounded-full bg-deep-teal/10 text-deep-teal font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span>{hl}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* External link fallback */}
      <div className="pt-2 flex justify-end">
        <a
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-charcoal/70 hover:text-deep-teal underline transition-colors"
        >
          <span>Watch on YouTube</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
