"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  RefreshCw,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Search,
  X,
  ShieldCheck,
  ChevronRight,
  RotateCcw
} from "lucide-react";
import { MYTHS_DATA, MythItem, MythSource } from "@/data/mythsData";
import { EducationalReferences } from "@/components/shared/EducationalReferences";
import { PageId } from "@/components/layout/Navbar";

interface MythsViewProps {
  onNavigate?: (page: PageId, categoryOrTab?: string) => void;
}

export function MythsView({ onNavigate }: MythsViewProps) {
  // Track which card IDs are currently revealed
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSourceModal, setActiveSourceModal] = useState<{
    myth: MythItem;
    source: MythSource;
  } | null>(null);

  const categories = [
    { id: "all", label: "All Myths & Facts" },
    { id: "pain", label: "Periods & Pain" },
    { id: "cycles", label: "Cycle Irregularity" },
    { id: "athletes", label: "Female Athlete Health" },
    { id: "pcos", label: "PCOS & Hormones" },
    { id: "fertility", label: "Pregnancy & Fertility" },
    { id: "stis", label: "STIs & Prevention" },
    { id: "hygiene", label: "Menstrual Hygiene" },
  ];

  // Filter myths based on category and search query
  const filteredMyths = useMemo(() => {
    return MYTHS_DATA.filter((item) => {
      const matchesCat =
        selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCat;

      const matchesSearch =
        item.myth.toLowerCase().includes(q) ||
        item.quickFact.toLowerCase().includes(q) ||
        item.explanation.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.source.organization.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const revealAll = () => {
    if (revealedIds.size === filteredMyths.length) {
      setRevealedIds(new Set());
    } else {
      setRevealedIds(new Set(filteredMyths.map((m) => m.id)));
    }
  };

  const openSourceModal = (e: React.MouseEvent, item: MythItem) => {
    e.stopPropagation();
    setActiveSourceModal({ myth: item, source: item.source });
  };

  return (
    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-12 flex flex-col gap-10">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-light-teal text-deep-teal font-sans font-bold text-[12.5px] uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-coral" />
          Interactive Medical Myth-Buster
        </div>
        <h1 className="text-4xl md:text-[56px] lg:text-[64px] font-normal font-serif text-deep-teal leading-[1.1] mb-4">
          Separating Myths from Medical Reality
        </h1>
        <p className="text-[17px] md:text-[19px] text-charcoal/80 leading-relaxed font-sans max-w-2xl">
          From pain and cycle regularity to athlete health and fertility, misinformation can harm your health. Tap <strong className="text-raspberry font-semibold">&ldquo;Reveal the facts →&rdquo;</strong> to unpack clinical explanations and verified medical sources.
        </p>

        {/* Global Controls: Search + Reveal All */}
        <div className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-3 mt-8">
          <div className="relative w-full flex-1">
            <Search className="w-4 h-4 text-deep-teal/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search myths by condition, pain, cycle..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white border border-deep-teal/20 text-[14.5px] text-charcoal placeholder:text-charcoal/45 focus:outline-none focus:ring-2 focus:ring-raspberry focus:border-transparent transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={revealAll}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-semibold font-sans text-deep-teal bg-white border border-deep-teal/25 hover:bg-light-teal/50 hover:border-deep-teal/40 transition-all shadow-sm whitespace-nowrap active:scale-[0.98]"
          >
            {revealedIds.size === filteredMyths.length && filteredMyths.length > 0 ? (
              <>
                <RotateCcw className="w-4 h-4 text-coral" />
                Reset All to Myths
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 text-raspberry" />
                Reveal All Facts ({filteredMyths.length})
              </>
            )}
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap max-w-4xl mx-auto">
        {categories.map((c) => {
          const isActive = selectedCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-[13.5px] md:text-[14px] font-semibold font-sans transition-all border ${
                isActive
                  ? "bg-deep-teal border-deep-teal text-white shadow-sm"
                  : "bg-white border-deep-teal/20 text-deep-teal hover:bg-light-teal/60"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Result Count Indicator */}
      <div className="flex items-center justify-between text-[13.5px] font-medium font-sans text-charcoal/70 border-b border-deep-teal/10 pb-2">
        <span>
          Showing <strong>{filteredMyths.length}</strong> {filteredMyths.length === 1 ? "card" : "cards"}
          {selectedCategory !== "all" && ` in ${categories.find(c => c.id === selectedCategory)?.label}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        <span className="text-xs text-charcoal/60">
          {revealedIds.size} of {filteredMyths.length} revealed
        </span>
      </div>

      {/* Empty State */}
      {filteredMyths.length === 0 && (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-deep-teal/15 shadow-sm">
          <HelpCircle className="w-10 h-10 text-coral mx-auto mb-3" />
          <h3 className="text-xl font-serif text-deep-teal mb-2">No matching myths found</h3>
          <p className="text-[15px] text-charcoal/70 font-sans mb-4">
            Try adjusting your search terms or clearing the category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-full bg-deep-teal text-white text-sm font-semibold font-sans hover:bg-deep-teal/90"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Interactive Myth & Fact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredMyths.map((item) => {
          const isRevealed = revealedIds.has(item.id);

          return (
            <div
              key={item.id}
              className={`rounded-3xl transition-all duration-300 flex flex-col justify-between border ${
                isRevealed
                  ? "bg-white border-deep-teal/30 shadow-md ring-1 ring-deep-teal/15"
                  : "bg-white border-deep-teal/15 shadow-sm hover:shadow-hover hover:border-deep-teal/30"
              }`}
            >
              {/* Card Main Body */}
              <div className="p-6 md:p-7 flex flex-col gap-4">
                {/* Card Top Pill Row */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    {isRevealed ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-sans tracking-wide bg-deep-teal text-white">
                        <CheckCircle2 className="w-3.5 h-3.5 text-coral" />
                        FACT · MEDICAL REALITY
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-sans tracking-wide bg-coral/15 text-raspberry">
                        <HelpCircle className="w-3.5 h-3.5 text-coral" />
                        MYTH
                      </span>
                    )}

                    <span className="text-xs font-semibold font-sans text-deep-teal/70 px-2.5 py-0.5 rounded-full bg-light-teal/50">
                      {item.categoryLabel}
                    </span>
                  </div>

                  <span className="text-[12px] font-medium font-sans text-charcoal/60 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-deep-teal" />
                    Clinically Sourced
                  </span>
                </div>

                {/* State A: Unrevealed / Myth State */}
                {!isRevealed ? (
                  <div className="flex flex-col gap-5 py-2">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-raspberry font-sans block mb-1">
                        Common Misconception
                      </span>
                      <blockquote className="text-2xl md:text-[28px] font-normal font-serif text-deep-teal leading-snug border-l-4 border-coral pl-4 my-1">
                        &ldquo;{item.myth}&rdquo;
                      </blockquote>
                    </div>

                    <p className="text-[15px] text-charcoal/70 font-sans leading-relaxed m-0">
                      This statement is commonly shared among peers and social platforms, but conflicts directly with clinical guidelines. Uncover the underlying physiology and medical evidence.
                    </p>

                    {/* Prominent CTA: Reveal the facts → */}
                    <div className="pt-2">
                      <button
                        onClick={() => toggleReveal(item.id)}
                        className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-[15px] font-bold font-sans text-white bg-raspberry hover:bg-raspberry/90 hover:gap-3 transition-all shadow-sm active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry"
                      >
                        <span>Reveal the facts</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* State B: Revealed / Fact & Educational Explanation */
                  <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                    {/* The Original Myth Reference */}
                    <div className="p-3 rounded-2xl bg-coral/10 border border-coral/20 flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-raspberry font-sans block">
                          Original Myth:
                        </span>
                        <p className="text-[14px] font-serif italic text-charcoal/80 m-0">
                          &ldquo;{item.myth}&rdquo;
                        </p>
                      </div>
                      <button
                        onClick={() => toggleReveal(item.id)}
                        className="text-[12px] font-semibold text-deep-teal hover:text-raspberry underline whitespace-nowrap font-sans shrink-0 pt-0.5"
                      >
                        Hide Fact
                      </button>
                    </div>

                    {/* Quick Fact Headline */}
                    <div>
                      <h3 className="text-xl md:text-[22px] font-semibold font-serif text-deep-teal leading-snug">
                        {item.quickFact}
                      </h3>
                    </div>

                    {/* Full Educational Explanation */}
                    <div className="text-[15px] text-charcoal/90 font-sans leading-relaxed space-y-2">
                      <p className="m-0">{item.explanation}</p>
                    </div>

                    {/* Key Takeaways Box */}
                    {item.takeaways && item.takeaways.length > 0 && (
                      <div className="p-4 rounded-2xl bg-light-teal/40 border border-deep-teal/15 flex flex-col gap-2">
                        <span className="text-[12px] font-bold uppercase tracking-wider text-deep-teal font-sans flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-deep-teal" />
                          Key Clinical Takeaways
                        </span>
                        <ul className="space-y-1.5 m-0 pl-4 list-disc text-[13.5px] font-sans text-charcoal/85 leading-relaxed">
                          {item.takeaways.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* CARD FOOTER: Always include Sources link at the bottom of these cards */}
              <div className="px-6 py-4 border-t border-deep-teal/10 bg-light-teal/20 rounded-b-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Mandatory Sources Link */}
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-deep-teal shrink-0" />
                  <div className="text-[13px] font-sans">
                    <span className="font-bold text-deep-teal">Sources: </span>
                    <button
                      onClick={(e) => openSourceModal(e, item)}
                      className="font-semibold text-raspberry hover:underline inline-flex items-center gap-1 text-left"
                      title="View full peer-reviewed clinical citation"
                    >
                      <span>{item.source.organization}</span>
                      <ExternalLink className="w-3 h-3 inline" />
                    </button>
                  </div>
                </div>

                {/* Secondary Actions on Footer */}
                <div className="flex items-center gap-2 shrink-0">
                  {isRevealed && item.learnCategory && onNavigate && (
                    <button
                      onClick={() => onNavigate("hub", item.learnCategory)}
                      className="inline-flex items-center gap-1 text-[12.5px] font-bold font-sans text-deep-teal hover:text-coral transition-colors"
                    >
                      <span>{item.learnCategoryLabel || "Learn Hub"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => toggleReveal(item.id)}
                    className="text-[12px] font-semibold font-sans text-charcoal/65 hover:text-charcoal px-2.5 py-1 rounded-md hover:bg-black/5 transition-colors"
                  >
                    {isRevealed ? "Show Myth" : "Reveal Fact →"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Source Citation Modal */}
      {activeSourceModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-teal/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setActiveSourceModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="source-modal-title"
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-deep-teal/20 flex flex-col gap-5 relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-deep-teal/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-light-teal flex items-center justify-center text-deep-teal">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="source-modal-title" className="text-lg font-bold font-serif text-deep-teal m-0">
                    Peer-Reviewed Clinical Source
                  </h3>
                  <span className="text-xs font-medium font-sans text-charcoal/60">
                    Evidence-Based Verification
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveSourceModal(null)}
                className="p-1.5 rounded-full text-charcoal/50 hover:text-charcoal hover:bg-deep-teal/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-3 font-sans">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-raspberry block">
                  Authoring Medical Body
                </span>
                <p className="text-[16px] font-bold text-deep-teal m-0">
                  {activeSourceModal.source.organization}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60 block">
                  Clinical Guideline / Study
                </span>
                <p className="text-[15px] font-semibold text-charcoal m-0">
                  &ldquo;{activeSourceModal.source.title}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {activeSourceModal.source.guidelineNumber && (
                  <div className="p-2.5 rounded-xl bg-light-teal/30 border border-deep-teal/10">
                    <span className="text-[11px] font-bold text-deep-teal/70 uppercase tracking-wider block">
                      Guideline ID
                    </span>
                    <span className="text-[13px] font-semibold text-deep-teal">
                      {activeSourceModal.source.guidelineNumber}
                    </span>
                  </div>
                )}
                {activeSourceModal.source.citationYear && (
                  <div className="p-2.5 rounded-xl bg-light-teal/30 border border-deep-teal/10">
                    <span className="text-[11px] font-bold text-deep-teal/70 uppercase tracking-wider block">
                      Published / Status
                    </span>
                    <span className="text-[13px] font-semibold text-deep-teal">
                      {activeSourceModal.source.citationYear}
                    </span>
                  </div>
                )}
              </div>

              {activeSourceModal.source.keyFinding && (
                <div className="p-3.5 rounded-xl bg-soft-pink/40 border border-raspberry/15 text-[13.5px] text-charcoal/85 leading-relaxed">
                  <strong className="text-raspberry font-bold block mb-1">
                    Clinical Consensus Finding:
                  </strong>
                  {activeSourceModal.source.keyFinding}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-deep-teal/10">
              {activeSourceModal.myth.learnCategory && onNavigate && (
                <button
                  onClick={() => {
                    const cat = activeSourceModal.myth.learnCategory;
                    setActiveSourceModal(null);
                    if (cat) onNavigate("hub", cat);
                  }}
                  className="px-4 py-2 rounded-full text-xs font-bold font-sans text-deep-teal bg-light-teal/50 hover:bg-light-teal border border-deep-teal/20 transition-colors"
                >
                  Explore Topic in Learn →
                </button>
              )}
              {activeSourceModal.source.url && (
                <a
                  href={activeSourceModal.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold font-sans text-white bg-deep-teal hover:bg-deep-teal/90 transition-colors shadow-sm"
                >
                  <span>Visit Guideline Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => setActiveSourceModal(null)}
                className="px-4 py-2 rounded-full text-xs font-semibold font-sans text-charcoal/70 hover:text-charcoal hover:bg-black/5 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verified Clinical & Educational References at page bottom */}
      <EducationalReferences
        customTitle="Verified Clinical & Myth-Busting Guidelines"
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
            title: "Dysmenorrhea and Endometriosis in the Adolescent: Evidence-Based Assessment",
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
