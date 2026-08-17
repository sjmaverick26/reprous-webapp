"use client";

import React, { useState } from "react";
import { Sparkles, RefreshCw, CheckCircle, HelpCircle } from "lucide-react";
import { MYTHS_DATA, MythItem } from "@/data/mythsData";
import { Badge } from "@/components/ui/badge";

export function MythsView() {
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Myths" },
    { id: "cycles", label: "Periods & Pain" },
    { id: "fertility", label: "Pregnancy & Fertility" },
    { id: "conditions", label: "PCOS & Health" },
    { id: "stis", label: "STIs & Testing" },
    { id: "athletes", label: "Active Bodies" },
  ];

  const filteredMyths = MYTHS_DATA.filter((m) =>
    activeCategory === "all" ? true : m.category === activeCategory
  );

  const toggleFlip = (id: string) => {
    const next = new Set(flippedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setFlippedIds(next);
  };

  const flipAll = () => {
    if (flippedIds.size === filteredMyths.length) {
      setFlippedIds(new Set());
    } else {
      setFlippedIds(new Set(filteredMyths.map((m) => m.id)));
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12 flex flex-col gap-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-extrabold uppercase tracking-wider text-berry/75 mb-2">
          Myths &amp; Facts
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-berry mb-4">
          Tap a card to flip it
        </h1>
        <p className="text-base text-ink/80 leading-relaxed">
          There is a lot of misinformation out there. Tap any card below to reveal the medical reality behind common myths.
        </p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={flipAll}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-berry bg-cream-card px-4 py-2 rounded-full border border-berry/20 hover:bg-blush shadow-sm transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {flippedIds.size === filteredMyths.length ? "Flip All Back to Myth" : "Flip All to Fact"}
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
              activeCategory === c.id
                ? "bg-berry border-berry text-cream-card shadow-sm"
                : "bg-cream-card border-berry/20 text-berry hover:bg-blush-deep"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* 3D Flip Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMyths.map((item) => {
          const isFlipped = flippedIds.has(item.id);

          return (
            <div
              key={item.id}
              onClick={() => toggleFlip(item.id)}
              className="perspective-1000 h-60 cursor-pointer group focus:outline-none"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleFlip(item.id);
                }
              }}
              role="button"
              aria-label={`Myth: ${item.myth}. Tap to reveal fact.`}
            >
              <div
                className={`relative w-full h-full transform-style-3d transition-transform duration-500 rounded-[22px] shadow-sm group-hover:shadow-hover ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* Front Face: Myth */}
                <div className="absolute inset-0 backface-hidden rounded-[22px] p-6 bg-blush-deep flex flex-col justify-between border border-berry/10 select-none">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-berry/80 flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5" /> Myth
                      </span>
                      <span className="text-[10px] text-ink/60 font-bold">Tap to flip</span>
                    </div>
                    <p className="font-bold text-base md:text-[17px] text-ink leading-snug mt-2">
                      &ldquo;{item.myth}&rdquo;
                    </p>
                  </div>
                  <div className="text-[11px] font-bold text-berry/80 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 group-hover:rotate-45 transition-transform" />
                    Reveal the medical fact
                  </div>
                </div>

                {/* Back Face: Fact */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[22px] p-6 bg-berry text-cream-card flex flex-col justify-between border border-berry-dark select-none shadow-inner">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-yellow-deep flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-yellow-deep" /> Medical Fact
                      </span>
                      <span className="text-[10px] text-cream-card/70 font-bold">Tap to flip back</span>
                    </div>
                    <p className="font-semibold text-sm md:text-base text-cream-card leading-relaxed mt-1">
                      {item.fact}
                    </p>
                  </div>
                  {item.detail && (
                    <p className="text-[11px] text-cream-card/75 italic m-0 pt-2 border-t border-cream-card/15">
                      {item.detail}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
