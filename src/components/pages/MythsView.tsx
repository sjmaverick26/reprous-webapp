"use client";

import React, { useState } from "react";
import { Sparkles, RefreshCw, CheckCircle, HelpCircle } from "lucide-react";
import { MYTHS_DATA, MythItem } from "@/data/mythsData";
import { Badge } from "@/components/ui/badge";
import { EducationalReferences, ReferenceItem } from "@/components/shared/EducationalReferences";

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
        <div className="text-[13px] md:text-[14px] font-bold uppercase tracking-wider text-berry mb-2 font-sans">
          Myths &amp; Facts
        </div>
        <h1 className="text-4xl md:text-[64px] lg:text-[72px] font-normal font-serif text-plum leading-[1.08] mb-4">
          Tap a card to flip it
        </h1>
        <p className="text-[17px] md:text-[19px] text-ink/80 leading-relaxed font-sans">
          There is a lot of misinformation out there. Tap any card below to reveal the medical reality behind common myths.
        </p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={flipAll}
            className="inline-flex items-center gap-2 text-[14px] md:text-[15px] font-semibold text-berry bg-cream-card px-5 py-2.5 rounded-full border border-berry/20 hover:bg-blush shadow-sm transition-colors font-sans"
          >
            <RefreshCw className="w-4 h-4" />
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
            className={`px-3.5 py-1.5 rounded-full text-[13.5px] md:text-[14px] font-semibold font-sans transition-all border ${
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
              className="perspective-1000 h-64 cursor-pointer group focus:outline-none"
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
                      <span className="text-[13px] font-bold uppercase tracking-wider text-berry flex items-center gap-1.5 font-sans">
                        <HelpCircle className="w-4 h-4" /> Myth
                      </span>
                      <span className="text-[13px] text-ink/65 font-semibold font-sans">Tap to flip</span>
                    </div>
                    <p className="font-bold text-lg md:text-[19px] text-ink leading-snug mt-2 font-sans">
                      &ldquo;{item.myth}&rdquo;
                    </p>
                  </div>
                  <div className="text-[13.5px] font-semibold text-berry flex items-center gap-1.5 font-sans">
                    <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
                    Reveal the medical fact
                  </div>
                </div>

                {/* Back Face: Fact */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[22px] p-6 bg-berry text-cream-card flex flex-col justify-between border border-berry-dark select-none shadow-inner">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[13px] font-bold uppercase tracking-wider text-gold flex items-center gap-1.5 font-sans">
                        <CheckCircle className="w-4 h-4 text-gold" /> Medical Fact
                      </span>
                      <span className="text-[13px] text-cream-card/80 font-semibold font-sans">Tap to flip back</span>
                    </div>
                    <p className="font-semibold text-[16px] md:text-[17px] text-cream-card leading-relaxed mt-1 font-sans">
                      {item.fact}
                    </p>
                  </div>
                  {item.detail && (
                    <p className="text-[13px] md:text-[13.5px] text-cream-card/85 italic m-0 pt-2 border-t border-cream-card/15 font-sans">
                      {item.detail}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Verified Clinical & Educational References */}
      <EducationalReferences
        customTitle="Myth-Busting Clinical References"
        customItems={[
          {
            number: "01",
            type: "Research article",
            title: "Dispelling Menstrual & Contraceptive Misinformation in Adolescent Populations",
            source: "Journal of Pediatric & Adolescent Gynecology (JPAG)",
            linkText: "View Published Study",
          },
          {
            number: "02",
            type: "Clinical guideline",
            title: "Addressing Health Misinformation: Evidence-Based Communication in Reproductive Medicine",
            source: "American College of Obstetricians and Gynecologists (ACOG)",
            linkText: "Read ACOG Statement",
          },
          {
            number: "03",
            type: "Patient education resource",
            title: "Myth vs. Reality: Debunking Reproductive, Cycle, and Fertility Misconceptions",
            source: "Office on Women's Health (HHS) & CDC Health Literacy Project",
            linkText: "Explore Fact Library",
          },
          {
            number: "04",
            type: "Additional reading",
            title: "The Anatomy of a Myth: How Stigma and Fear Shape What We Believe About Our Bodies",
            source: "ReproUs Evidence-Based Dialogue Series",
            linkText: "Read Article",
          },
        ]}
      />
    </div>
  );
}
