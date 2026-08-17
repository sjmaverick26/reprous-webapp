"use client";

import React, { useState } from "react";
import { MessageSquarePlus, Heart, Send, CheckCircle2, Sparkles } from "lucide-react";
import { INITIAL_VOICES, YouthVoice } from "@/data/voicesData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AccessMini } from "@/components/shared/AccessMini";
import { submitStory } from "@/lib/api";

export function VoicesView() {
  const [voices, setVoices] = useState<YouthVoice[]>(INITIAL_VOICES);
  const [storyInput, setStoryInput] = useState("");
  const [authorAlias, setAuthorAlias] = useState("");
  const [authorAge, setAuthorAge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyInput.trim()) return;

    setIsSubmitting(true);
    const res = await submitStory({
      story: storyInput,
      author_alias: authorAlias.trim() || "Shared anonymously",
      age: authorAge ? parseInt(authorAge, 10) : 17,
    });
    setIsSubmitting(false);

    // Optimistically prepend to list
    const newVoice: YouthVoice = {
      id: `v-${Date.now()}`,
      quote: storyInput,
      author: authorAlias.trim() || "Shared anonymously",
      age: authorAge ? parseInt(authorAge, 10) : 17,
      date: "Just now",
    };
    setVoices([newVoice, ...voices]);
    setSubmitSuccess(true);
    setStoryInput("");
    setAuthorAlias("");
    setAuthorAge("");

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 4000);
  };

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12 flex flex-col gap-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-extrabold uppercase tracking-wider text-berry/75 mb-2">
          Youth Voices
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-berry mb-4">
          Real stories, shared on purpose
        </h1>
        <p className="text-base text-ink/80 leading-relaxed mb-6">
          Personal stories, questions, and reflections from young people who have navigated the exact same bodily changes, anxieties, and discoveries.
        </p>
        <AccessMini
          text="Stories can be submitted by text, voice memo, or in your own language — we'll translate it."
          className="mx-auto shadow-sm"
        />
      </div>

      {/* Voices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {voices.map((voice) => (
          <Card
            key={voice.id}
            className="p-7 flex flex-col justify-between hover:shadow-hover transition-all"
          >
            <div>
              <p className="font-serif text-lg font-normal text-berry leading-relaxed mb-6 italic">
                &ldquo;{voice.quote}&rdquo;
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-berry/10">
              <span className="text-xs font-extrabold text-ink/75">
                — {voice.author}, age {voice.age}
              </span>
              {voice.category && (
                <span className="text-[11px] font-bold text-berry/70 bg-blush px-2.5 py-0.5 rounded-full">
                  {voice.category}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Add Your Voice Box */}
      <div className="rounded-3xl bg-berry text-cream-card p-8 md:p-12 shadow-lg">
        <div className="max-w-xl mb-6">
          <div className="flex items-center gap-2 text-yellow-deep text-xs font-extrabold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            Community Board
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-cream-card mb-2">
            Add your voice
          </h2>
          <p className="text-sm md:text-base text-cream-card/90 m-0 leading-relaxed">
            Share a story, a memory, or an encouragement for someone else. 100% anonymous by default, and never shared without your consent.
          </p>
        </div>

        {submitSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-yellow-deep text-ink flex items-center gap-3 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Thank you for sharing your story! It is now posted to the Youth Voices board.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Textarea
            required
            rows={3}
            placeholder="Share your experience with periods, puberty, doctor visits, or learning about your body..."
            value={storyInput}
            onChange={(e) => setStoryInput(e.target.value)}
            className="bg-cream-card text-ink placeholder:text-ink/50"
          />

          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <Input
              placeholder="Alias / Signature (e.g. Shared anonymously or Jordan)"
              value={authorAlias}
              onChange={(e) => setAuthorAlias(e.target.value)}
              className="bg-cream-card text-ink sm:w-1/2 placeholder:text-ink/50"
            />
            <Input
              type="number"
              min={12}
              max={30}
              placeholder="Age (e.g. 17)"
              value={authorAge}
              onChange={(e) => setAuthorAge(e.target.value)}
              className="bg-cream-card text-ink sm:w-1/4 placeholder:text-ink/50"
            />
            <Button
              type="submit"
              variant="yellow"
              disabled={isSubmitting}
              className="w-full sm:w-auto ml-auto px-8 gap-2"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Posting..." : "Share Story"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
