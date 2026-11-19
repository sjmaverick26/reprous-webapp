"use client";

import React, { useState, useMemo, useRef } from "react";
import { useDialogFocus } from "@/components/shared/useDialogFocus";
import {
  RefreshCw,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Search,
  X,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { MYTHS_DATA, MythItem, MythSource } from "@/data/mythsData";
import { EducationalReferences } from "@/components/shared/EducationalReferences";
import { PageId } from "@/components/layout/Navbar";
import { keepUnits } from "@/components/shared/keepUnits";

interface MythsViewProps {
  onNavigate?: (page: PageId, categoryOrTab?: string) => void;
  /** True when shown inside the Learn page (no extra page padding). */
  embedded?: boolean;
}

export function MythsView({ onNavigate, embedded = false }: MythsViewProps) {
  // Track which card IDs are currently revealed
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSourceModal, setActiveSourceModal] = useState<{
    myth: MythItem;
    source: MythSource;
  } | null>(null);
  // The sources pop-up takes keyboard focus while open and gives it back to its "Sources" button.
  const sourceDialogRef = useRef<HTMLDivElement>(null);
  const sourceOpenerRef = useRef<HTMLElement | null>(null);
  useDialogFocus(activeSourceModal !== null, sourceDialogRef, () => sourceOpenerRef.current);

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

  // Reveal All / Reset act on the cards in view, so the label is right after any filter or search.
  const allFilteredRevealed = filteredMyths.length > 0 && filteredMyths.every((m) => revealedIds.has(m.id));

  // Columns each card spans from 1024: wide cards fill the last row, so rows are never half empty.
  const spanOf = (idx: number) => {
    const count = filteredMyths.length;
    const rest = count % 3;
    if (count === 1) return 3;
    return (rest === 2 && idx === 0) || (rest === 1 && (idx === 0 || idx === count - 1)) ? 2 : 1;
  };
  // Which row each card sits in from 1024, and the rows that hold a revealed card.
  const rowOf: number[] = [];
  {
    let row = 0;
    let col = 0;
    filteredMyths.forEach((_, idx) => {
      const cols = spanOf(idx);
      if (col + cols > 3) {
        row += 1;
        col = 0;
      }
      rowOf.push(row);
      col += cols;
    });
  }
  const revealedRows = new Set(filteredMyths.flatMap((m, idx) => (revealedIds.has(m.id) ? [rowOf[idx]] : [])));
  const revealAll = () => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      filteredMyths.forEach((m) => (allFilteredRevealed ? next.delete(m.id) : next.add(m.id)));
      return next;
    });
  };

  const openSourceModal = (e: React.MouseEvent, item: MythItem) => {
    e.stopPropagation();
    sourceOpenerRef.current = e.currentTarget as HTMLElement;
    setActiveSourceModal({ myth: item, source: item.source });
  };

  // Close the source modal with Escape
  React.useEffect(() => {
    if (!activeSourceModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveSourceModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeSourceModal]);

  const outlineBtn =
    "inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full text-sm font-semibold font-sans text-deep-teal bg-white border border-deep-teal hover:bg-light-teal transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-2";

  return (
    <div
      className={`w-full min-w-0 max-w-6xl mx-auto flex flex-col gap-8 text-charcoal font-sans ${
        embedded ? "" : "px-4 md:px-6 py-12 md:py-16"
      }`}
    >
      {/* Header Section */}
      <div className="max-w-3xl">
        <h1 className="text-h2 font-normal font-serif text-deep-teal text-balance m-0 mb-4">
          Separating Myths from Medical Reality
        </h1>
        <p className="text-body text-charcoal-light text-pretty max-w-[36rem] m-0">
          From pain and cycle regularity to athlete health and fertility, misinformation can harm your health. Tap <strong className="text-deep-teal font-semibold">&ldquo;Reveal the facts&nbsp;→&rdquo;</strong> to unpack clinical explanations and verified sources. <span className="block mt-2 text-small">(This content is for health education, not medical advice.)</span>
        </p>

        {/* Global Controls: Search + Reveal All */}
        {/* Her hint sits above the field as its label, so it wraps instead of being clipped */}
        <div className="w-full max-w-xl mt-6">
          <label htmlFor="myths-search" className="block mb-2 text-sm font-semibold text-deep-teal text-pretty">
            Search myths by condition, pain, cycle...
          </label>
          <div className="w-full flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative w-full flex-1">
            <Search className="w-5 h-5 text-charcoal-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
            <input
              id="myths-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full h-12 pl-12 pr-12 rounded-full bg-white border border-[#E5E1DC] text-base text-charcoal placeholder:text-charcoal-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full text-charcoal-light hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            )}
          </div>

          <button type="button" onClick={revealAll} className={`${outlineBtn} h-12 whitespace-nowrap`}>
            {allFilteredRevealed ? (
              <>
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                Reset All to Myths
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" aria-hidden="true" />
                Reveal All Facts ({filteredMyths.length})
              </>
            )}
          </button>
        </div>
        </div>
      </div>

      {/* Category filters: scrolls inside its own row on phones, wraps on larger screens */}
      <div role="group" aria-label="Filter myths by topic" className="flex gap-2 overflow-x-auto md:flex-wrap md:overflow-visible pb-1">
        {categories.map((c) => {
          const isActive = selectedCategory === c.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelectedCategory(c.id)}
              className={`shrink-0 min-h-[44px] px-4 rounded-full text-sm font-semibold font-sans whitespace-nowrap border-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal focus-visible:ring-offset-2 ${
                isActive
                  ? "bg-light-teal border-deep-teal text-deep-teal"
                  : "bg-white border-[#E5E1DC] text-deep-teal hover:border-deep-teal"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Result Count Indicator */}
      <p className="text-small text-charcoal-light border-b border-[#E5E1DC] pb-2 m-0 [overflow-wrap:anywhere]" aria-live="polite">
        Showing <strong>{filteredMyths.length}</strong> {filteredMyths.length === 1 ? "card" : "cards"}
        {selectedCategory !== "all" && ` in ${categories.find((c) => c.id === selectedCategory)?.label}`}
        {searchQuery && ` matching "${searchQuery}"`}
      </p>

      {/* Empty State */}
      {filteredMyths.length === 0 && (
        <div className="text-center py-12 px-4 bg-white rounded-2xl border border-[#E5E1DC] shadow-sm">
          <HelpCircle className="w-10 h-10 text-deep-teal mx-auto mb-3" aria-hidden="true" />
          <h3 className="text-2xl font-serif font-normal text-deep-teal text-balance mb-2">No matching myths found</h3>
          <p className="mx-auto max-w-[36rem] text-base text-charcoal-light mb-4">
            Try adjusting your search terms or clearing the category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className={outlineBtn}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Interactive Myth & Fact Cards Grid */}
      {/* One column below 1024; three from 1024, with wide cards filling the last row (no half-empty rows) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredMyths.map((item, idx) => {
          const isRevealed = revealedIds.has(item.id);
          const cols = spanOf(idx);
          const span = cols === 3 ? "lg:col-span-3" : cols === 2 ? "lg:col-span-2" : "";
          // From 1024 the cards of a row share their row lines (button and sources on one line) unless a card in
          // that row is revealed; then each card keeps its own flow, so no button drops far below its quote.
          const aligned = !revealedRows.has(rowOf[idx]);

          return (
            <div
              key={item.id}
              className={`rounded-2xl flex flex-col justify-between lg:row-span-2 ${aligned ? "lg:grid lg:grid-cols-1 lg:grid-rows-subgrid lg:gap-0" : "lg:self-start"} bg-white border border-[#E5E1DC] shadow-sm ${span}`}
            >
              {/* Card Main Body */}
              <div className="p-5 md:p-6 flex flex-1 flex-col gap-4">
                {/* Status + topic */}
                <div className="flex items-center gap-3 flex-wrap">
                  {isRevealed ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-small font-semibold bg-deep-teal text-white">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      Fact
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-small font-semibold bg-soft-pink-light text-deep-teal border border-coral">
                      <HelpCircle className="w-4 h-4" aria-hidden="true" />
                      Myth
                    </span>
                  )}
                  <span className="text-small text-charcoal-light">{item.categoryLabel}</span>
                </div>

                {!isRevealed ? (
                  <div className="flex flex-1 flex-col gap-5">
                    <blockquote className="text-2xl font-normal font-serif text-deep-teal leading-snug text-balance rounded-2xl bg-soft-pink-light p-4 m-0">
                      &ldquo;{item.myth}&rdquo;
                    </blockquote>
                    <div className={aligned ? "mt-auto" : ""}>
                      <button type="button" onClick={() => toggleReveal(item.id)} className={outlineBtn}>
                        <span>Reveal the facts</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {/* The original myth, kept as a quiet line */}
                    <div className="flex items-start justify-between gap-3 rounded-2xl bg-soft-pink-light px-4 py-3">
                      <p className="max-w-[36rem] text-base italic text-charcoal-light text-pretty m-0">
                        &ldquo;{item.myth}&rdquo;
                      </p>
                      <button
                        type="button"
                        onClick={() => toggleReveal(item.id)}
                        className="min-h-[44px] px-2 -my-2 text-small font-semibold text-deep-teal underline hover:text-deep-teal-dark whitespace-nowrap shrink-0 transition-colors duration-150"
                      >
                        Hide Fact
                      </button>
                    </div>

                    <h3 className="text-2xl font-normal font-serif text-deep-teal leading-snug text-balance m-0">
                      {item.quickFact}
                    </h3>

                    <p className="max-w-[36rem] text-base text-charcoal text-pretty leading-relaxed m-0 whitespace-pre-line">{item.explanation}</p>

                    {item.takeaways && item.takeaways.length > 0 && (
                      <div>
                        <p className="text-base font-semibold text-deep-teal m-0 mb-2">Key Clinical Takeaways</p>
                        <ul className="space-y-1.5 m-0 pl-5 list-disc text-base text-charcoal leading-relaxed">
                          {item.takeaways.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer: sources + link back to the matching module */}
              <div className="px-5 md:px-6 py-3 border-t border-[#E5E1DC] flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3 font-sans">
                <button
                  type="button"
                  onClick={(e) => openSourceModal(e, item)}
                  className="min-h-[44px] inline-flex items-center gap-2 text-small text-left text-deep-teal hover:underline"
                  title="View full clinical citation"
                >
                  <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="font-semibold">Sources: </span>
                    <span className="font-semibold">{item.source.organization}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </button>

                {isRevealed && item.learnCategory && onNavigate && (
                  <button
                    type="button"
                    onClick={() => onNavigate("hub", item.learnCategory)}
                    className="min-h-[44px] inline-flex items-center gap-1 text-small font-semibold text-deep-teal hover:underline"
                  >
                    <span>{item.learnCategoryLabel || "Learn Hub"}</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Source Citation Modal */}
      {activeSourceModal && (
        <div
          ref={sourceDialogRef}
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 outline-none"
          onClick={() => setActiveSourceModal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="source-modal-title"
        >
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-deep-teal flex flex-col gap-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pr-10">
              <h3 id="source-modal-title" className="text-2xl font-normal font-serif text-deep-teal text-balance m-0">
                Verified Clinical Source
              </h3>
              <button
                type="button"
                onClick={() => setActiveSourceModal(null)}
                className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center rounded-full text-charcoal-light hover:text-charcoal hover:bg-warm-cream transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-teal"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-3 font-sans">
              <div>
                <p className="text-small font-semibold text-charcoal-light m-0">Authoring Medical Body</p>
                <p className="text-base font-semibold text-deep-teal m-0">{activeSourceModal.source.organization}</p>
              </div>

              <div>
                <p className="text-small font-semibold text-charcoal-light m-0">Clinical Guideline / Study</p>
                <p className="text-base font-semibold text-charcoal m-0">
                  &ldquo;{activeSourceModal.source.title}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeSourceModal.source.guidelineNumber && (
                  <div>
                    <p className="text-small font-semibold text-charcoal-light m-0">Guideline ID</p>
                    <p className="max-w-[36rem] text-base text-charcoal m-0">{keepUnits(activeSourceModal.source.guidelineNumber)}</p>
                  </div>
                )}
                {activeSourceModal.source.citationYear && (
                  <div>
                    <p className="text-small font-semibold text-charcoal-light m-0">Published / Status</p>
                    <p className="max-w-[36rem] text-base text-charcoal m-0">{activeSourceModal.source.citationYear}</p>
                  </div>
                )}
              </div>

              {activeSourceModal.source.keyFinding && (
                <div className="rounded-2xl bg-light-teal-light p-4">
                  <p className="text-base font-semibold text-deep-teal m-0 mb-1">Clinical Consensus Finding</p>
                  <p className="max-w-[36rem] text-base text-charcoal text-pretty leading-relaxed m-0">
                    {activeSourceModal.source.keyFinding}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-[#E5E1DC]">
              {activeSourceModal.myth.learnCategory && onNavigate && (
                <button
                  type="button"
                  onClick={() => {
                    const cat = activeSourceModal.myth.learnCategory;
                    setActiveSourceModal(null);
                    if (cat) onNavigate("hub", cat);
                  }}
                  className={outlineBtn}
                >
                  Explore Topic in Learn →
                </button>
              )}
              {activeSourceModal.source.url && (
                <a
                  href={activeSourceModal.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full text-sm font-semibold font-sans text-white bg-raspberry hover:bg-raspberry-dark transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-raspberry focus-visible:ring-offset-2"
                >
                  <span>Visit Guideline Site</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
              <button
                type="button"
                onClick={() => setActiveSourceModal(null)}
                className="min-h-[44px] px-4 rounded-full text-sm font-semibold font-sans text-deep-teal underline hover:text-deep-teal-dark transition-colors duration-150"
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
            url: "https://www.jpagonline.org",
          },
          {
            number: "02",
            type: "Clinical guideline",
            title: "Dysmenorrhea and Endometriosis in the Adolescent: Evidence-Based Assessment",
            source: "American College of Obstetricians and Gynecologists (ACOG)",
            linkText: "Read ACOG Statement",
            url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2018/12/dysmenorrhea-and-endometriosis-in-the-adolescent",
          },
          {
            number: "03",
            type: "Patient education resource",
            title: "Myth vs. Reality: Debunking Reproductive, Cycle, and Fertility Misconceptions",
            source: "Office on Women's Health (HHS) & CDC Health Literacy Project",
            linkText: "Explore Fact Library",
            url: "https://www.womenshealth.gov/menstrual-cycle",
          },
          {
            number: "04",
            type: "Additional reading",
            title: "The Anatomy of a Myth: How Stigma and Fear Shape What We Believe About Our Bodies",
            source: "ReproUs Evidence-Based Dialogue Series",
            linkText: "Read Article",
            url: "https://www.who.int/news/item/22-06-2022-who-statement-on-menstrual-health-and-rights",
          },
        ]}
      />
    </div>
  );
}
