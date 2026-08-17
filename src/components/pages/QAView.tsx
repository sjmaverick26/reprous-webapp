"use client";

import React, { useState } from "react";
import { HelpCircle, Send, CheckCircle2, Search } from "lucide-react";
import { FAQS_DATA } from "@/data/faqsData";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { submitQuestion } from "@/lib/api";

export function QAView() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questionCat, setQuestionCat] = useState("general");
  const [ageRange, setAgeRange] = useState("16-18");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "cycles", label: "Cycles & Periods" },
    { id: "health", label: "Pain & Symptoms" },
    { id: "privacy", label: "Privacy & Confidentiality" },
    { id: "workshops", label: "Workshops" },
  ];

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchesCat = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setIsSubmitting(true);
    await submitQuestion({
      question: questionText,
      category: questionCat,
      age_range: ageRange,
    });
    setIsSubmitting(false);
    setSubmitSuccess(true);

    setTimeout(() => {
      setIsSubmitModalOpen(false);
      setSubmitSuccess(false);
      setQuestionText("");
    }, 2200);
  };

  return (
    <div className="max-w-[760px] mx-auto px-6 py-12 flex flex-col gap-10">
      {/* Header */}
      <div className="text-center">
        <div className="text-xs font-extrabold uppercase tracking-wider text-berry/75 mb-2">
          Q&amp;A
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-berry mb-4">
          Questions, answered plainly
        </h1>
        <p className="text-base text-ink/80 leading-relaxed max-w-xl mx-auto">
          Every question submitted is completely anonymous. Real answers from our medical educators, with no clinical jargon.
        </p>
      </div>

      {/* Search & Category Pills */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-ink/50 absolute left-3.5 top-3.5" />
          <Input
            placeholder="Search questions (e.g. cramps, irregular, anonymous)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                activeCategory === c.id
                  ? "bg-berry border-berry text-cream-card shadow-sm"
                  : "bg-cream-card border-berry/20 text-berry hover:bg-blush-deep"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion FAQ list */}
      <div className="bg-cream-card rounded-3xl p-6 md:p-8 shadow-card">
        {filteredFaqs.length === 0 ? (
          <p className="text-sm text-ink/70 text-center py-6">
            No matching questions found. Feel free to submit your own below!
          </p>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>

      {/* Submit Question Action */}
      <div className="text-center pt-2">
        <Button
          onClick={() => setIsSubmitModalOpen(true)}
          size="lg"
          className="gap-2 shadow-md"
        >
          <HelpCircle className="w-4 h-4" />
          Submit your own anonymous question
        </Button>
      </div>

      {/* Question Submission Modal */}
      <Dialog open={isSubmitModalOpen} onOpenChange={setIsSubmitModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ask a Question Anonymously</DialogTitle>
            <DialogDescription>
              No names, no tracking. Answers are reviewed by clinicians and added to the community library.
            </DialogDescription>
          </DialogHeader>

          {submitSuccess ? (
            <div className="p-6 text-center flex flex-col items-center gap-2">
              <CheckCircle2 className="w-12 h-12 text-green-600 animate-bounce" />
              <h4 className="font-serif text-xl font-bold text-berry">Question Submitted!</h4>
              <p className="text-xs text-ink/80">
                Thank you! We answer every question and regularly update the Q&amp;A directory.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitQuestion} className="flex flex-col gap-4 mt-2">
              <div>
                <label className="block text-xs font-bold text-berry mb-1">
                  What would you like to know?
                </label>
                <Textarea
                  required
                  rows={4}
                  placeholder="Ask anything about your body, periods, hormones, or relationships..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-berry mb-1">Topic Category</label>
                  <select
                    value={questionCat}
                    onChange={(e) => setQuestionCat(e.target.value)}
                    className="flex h-12 w-full rounded-xl border border-berry/20 bg-cream-card px-3 text-xs font-bold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry"
                  >
                    <option value="general">General Anatomy &amp; Puberty</option>
                    <option value="cycles">Periods &amp; Cramps</option>
                    <option value="conditions">PCOS &amp; Endometriosis</option>
                    <option value="realtalk">STIs &amp; Consent</option>
                    <option value="privacy">Clinic &amp; Privacy Questions</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-berry mb-1">Age Range (Optional)</label>
                  <select
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                    className="flex h-12 w-full rounded-xl border border-berry/20 bg-cream-card px-3 text-xs font-bold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry"
                  >
                    <option value="under-15">13–15</option>
                    <option value="16-18">16–18</option>
                    <option value="19-24">19–24</option>
                    <option value="25+">25+</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-ink/70">
                🔒 100% anonymous — no IP logging or cookies stored.
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending..." : "Submit Question Anonymously"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
