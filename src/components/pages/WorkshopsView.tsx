"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Sparkles,
  Camera,
  HeartHandshake
} from "lucide-react";
import {
  WORKSHOP_STEPS,
  SAMPLE_AGENDA,
  WORKSHOP_REVIEWS,
  UPCOMING_SESSIONS,
  WorkshopSession,
} from "@/data/workshopsData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { rsvpWorkshop, requestWorkshopVisit } from "@/lib/api";

export function WorkshopsView() {
  const [selectedSession, setSelectedSession] = useState<WorkshopSession | null>(null);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestOrg, setRequestOrg] = useState("");
  const [requestName, setRequestName] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [requestNotes, setRequestNotes] = useState("");
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSession || !rsvpName || !rsvpEmail) return;

    setIsSubmittingRsvp(true);
    await rsvpWorkshop({
      session_id: selectedSession.id,
      attendee_name: rsvpName,
      email: rsvpEmail,
    });
    setIsSubmittingRsvp(false);
    setRsvpSuccess(true);
    setTimeout(() => {
      setSelectedSession(null);
      setRsvpSuccess(false);
      setRsvpName("");
      setRsvpEmail("");
    }, 2200);
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestOrg || !requestName || !requestEmail) return;

    setIsSubmittingRequest(true);
    await requestWorkshopVisit({
      organization_name: requestOrg,
      contact_name: requestName,
      email: requestEmail,
      notes: requestNotes,
    });
    setIsSubmittingRequest(false);
    setRequestSuccess(true);
    setTimeout(() => {
      setIsRequestModalOpen(false);
      setRequestSuccess(false);
      setRequestOrg("");
      setRequestName("");
      setRequestEmail("");
      setRequestNotes("");
    }, 2200);
  };

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12 flex flex-col gap-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-[13px] font-bold font-sans uppercase tracking-wider text-berry mb-2">
          Workshops
        </div>
        <h1 className="text-4xl md:text-[64px] lg:text-[72px] font-normal font-serif text-plum leading-[1.08] mb-4">
          Free, interactive workshops
        </h1>
        <p className="text-[17px] md:text-[18px] text-ink/80 leading-relaxed mb-6 font-sans">
          Hands-on 90-minute sessions in schools and community centers. No tests, no awkwardness — just real facts, honest discussion, and practical skills.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {WORKSHOP_STEPS.map((step, idx) => {
          const borderOutline =
            idx % 3 === 0
              ? "border-2 border-deep-teal"
              : idx % 3 === 1
              ? "border-2 border-coral"
              : "border-2 border-raspberry";
          const numBg =
            idx % 3 === 0
              ? "bg-deep-teal text-white"
              : idx % 3 === 1
              ? "bg-coral text-white"
              : "bg-raspberry text-white";

          return (
            <Card
              key={step.step}
              className={`p-6 text-center bg-white ${borderOutline} shadow-xs hover:shadow-hover transition-all`}
            >
              <div className={`w-10 h-10 rounded-full ${numBg} flex items-center justify-center font-bold text-base mx-auto mb-3 font-sans`}>
                {step.step}
              </div>
              <h3 className="text-xl md:text-[22px] font-normal font-serif text-deep-teal mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-[14px] text-charcoal/80 leading-relaxed m-0 font-sans">
                {step.desc}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Sample Agenda */}
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-center mb-6">
          <div className="text-xs font-extrabold uppercase tracking-wider text-deep-teal">
            Sample Agenda • 90 Minutes
          </div>
        </div>
        <Card className="p-4 md:p-8 divide-y divide-deep-teal/10 bg-white shadow-xs border-2 border-deep-teal">
          {SAMPLE_AGENDA.map((item, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-4 py-4 first:pt-0 last:pb-0 items-baseline">
              <div className="font-serif font-bold text-berry w-24 flex-shrink-0 text-base">
                {item.time}
              </div>
              <div>
                <b className="block text-sm md:text-base text-ink">{item.title}</b>
                <span className="text-xs md:text-sm text-ink/75 leading-relaxed">{item.detail}</span>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Past Workshops Visual Gallery */}
      <div>
        <div className="text-center mb-6">
          <div className="text-xs font-extrabold uppercase tracking-wider text-berry/75">
            From Past Workshops
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="aspect-square rounded-2xl bg-yellow-deep flex items-center justify-center text-cream-card shadow-sm hover:scale-[1.02] transition-transform">
            <Camera className="w-8 h-8" />
          </div>
          <div className="aspect-square rounded-2xl bg-blush-deep flex items-center justify-center text-berry shadow-sm hover:scale-[1.02] transition-transform">
            <Users className="w-8 h-8" />
          </div>
          <div className="aspect-square rounded-2xl bg-berry flex items-center justify-center text-cream-card shadow-sm hover:scale-[1.02] transition-transform">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="aspect-square rounded-2xl bg-yellow flex items-center justify-center text-berry shadow-sm hover:scale-[1.02] transition-transform">
            <HeartHandshake className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* What Attendees Said */}
      <div>
        <div className="text-center mb-8">
          <div className="text-xs font-extrabold uppercase tracking-wider text-berry/75">
            What People Said
          </div>
          <p className="text-xs text-charcoal/60 font-sans mt-1">
            (These quotes are mockups for demonstration purposes)
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WORKSHOP_REVIEWS.map((r, i) => {
            const borderOutline =
              i % 3 === 0
                ? "border-2 border-deep-teal"
                : i % 3 === 1
                ? "border-2 border-coral"
                : "border-2 border-raspberry";

            return (
              <Card key={i} className={`p-6 flex flex-col justify-between bg-white shadow-xs ${borderOutline}`}>
                <p className="font-serif text-base text-deep-teal leading-relaxed mb-4 italic">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div className="text-xs font-extrabold text-charcoal/70 font-sans">
                  — {r.attendee}, age {r.age} <span className="font-normal text-charcoal/50">(mockup quote)</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Upcoming Sessions Grid */}
      <div>
        <div className="text-center mb-8">
          <div className="text-[13px] font-bold font-sans uppercase tracking-wider text-deep-teal mb-2">
            Upcoming Sessions
          </div>
          <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-normal font-serif text-deep-teal leading-[1.15]">
            Join an upcoming free workshop
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UPCOMING_SESSIONS.map((session, idx) => {
            const borderOutline =
              idx % 3 === 0
                ? "border-2 border-deep-teal"
                : idx % 3 === 1
                ? "border-2 border-coral"
                : "border-2 border-raspberry";

            return (
              <Card key={session.id} className={`p-7 flex flex-col justify-between text-center items-center bg-white shadow-xs ${borderOutline}`}>
                <div>
                  <div className="font-serif text-3xl font-bold text-deep-teal mb-2">
                    {session.date}
                  </div>
                  <div className="text-[13px] font-bold font-sans text-raspberry uppercase tracking-wider mb-2">
                    {session.topic}
                  </div>
                  <p className="text-[14px] text-charcoal/75 mb-4 font-sans">
                    {session.time} • {session.location}
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light-teal/50 text-deep-teal border border-deep-teal/20 text-[13px] font-semibold mb-6 font-sans">
                    <Users className="w-3.5 h-3.5" />
                    {session.spotsLeft} spots available
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedSession(session)}
                  className="w-full text-[14px] font-semibold bg-raspberry hover:bg-raspberry/90 text-white"
                >
                  RSVP for Free
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Request Workshop for School or Group Banner */}
      <div className="rounded-3xl bg-berry text-cream-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="max-w-xl text-center md:text-left">
          <h2 className="text-3xl md:text-[42px] lg:text-[48px] font-normal font-serif text-cream-card mb-2 leading-[1.15]">
            Bring ReproUs to your school or group
          </h2>
          <p className="text-[17px] md:text-[18px] text-cream-card/90 m-0 leading-relaxed font-sans">
            We will travel to you or host a dedicated virtual session for your class, youth organization, or community center.
          </p>
        </div>
        <Button
          onClick={() => setIsRequestModalOpen(true)}
          size="lg"
          className="bg-white text-raspberry font-bold hover:bg-white/95 hover:text-raspberry active:bg-white/90 active:text-raspberry focus-visible:text-raspberry shadow-md whitespace-nowrap flex-shrink-0"
        >
          Request a workshop
        </Button>
      </div>

      {/* RSVP Modal */}
      <Dialog open={!!selectedSession} onOpenChange={(open) => !open && setSelectedSession(null)}>
        <DialogContent className="max-w-md">
          {selectedSession && (
            <div>
              <DialogHeader className="mb-4">
                <DialogTitle>Reserve Your Free Spot</DialogTitle>
                <DialogDescription>
                  {selectedSession.topic} • {selectedSession.date} ({selectedSession.time})
                </DialogDescription>
              </DialogHeader>

              {rsvpSuccess ? (
                <div className="p-6 text-center flex flex-col items-center gap-2">
                  <CheckCircle2 className="w-12 h-12 text-green-600 animate-bounce" />
                  <h4 className="font-serif text-xl font-bold text-plum">You&apos;re All Set!</h4>
                  <p className="text-xs text-ink/80">
                    We saved your spot. See you at {selectedSession.location}!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-bold text-berry mb-1">Your Name or Alias</label>
                    <Input
                      required
                      placeholder="e.g. Alex"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-berry mb-1">Email for Confirmation</label>
                    <Input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                    />
                  </div>
                  <p className="text-[11px] text-ink/60 italic m-0">
                    * No payment required. You will receive a reminder email 24 hours prior.
                  </p>
                  <Button type="submit" disabled={isSubmittingRsvp} className="w-full mt-2">
                    {isSubmittingRsvp ? "Reserving..." : "Confirm RSVP"}
                  </Button>
                </form>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* School / Group Request Modal */}
      <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader className="mb-4">
            <DialogTitle>Request a ReproUs Workshop</DialogTitle>
            <DialogDescription>
              Tell us about your group and we will coordinate dates and curriculum fit with you.
            </DialogDescription>
          </DialogHeader>

          {requestSuccess ? (
            <div className="p-6 text-center flex flex-col items-center gap-2">
              <CheckCircle2 className="w-12 h-12 text-green-600 animate-bounce" />
              <h4 className="font-serif text-xl font-bold text-plum">Request Sent!</h4>
              <p className="text-xs text-ink/80">
                Our outreach coordinator will reach out to you within 2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRequestSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-berry mb-1">School / Organization Name</label>
                <Input
                  required
                  placeholder="e.g. Lincoln High School or Youth Club"
                  value={requestOrg}
                  onChange={(e) => setRequestOrg(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-berry mb-1">Contact Name</label>
                  <Input
                    required
                    placeholder="Your Name"
                    value={requestName}
                    onChange={(e) => setRequestName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-berry mb-1">Contact Email</label>
                  <Input
                    type="email"
                    required
                    placeholder="contact@school.edu"
                    value={requestEmail}
                    onChange={(e) => setRequestEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-berry mb-1">Notes / Target Age Group</label>
                <Textarea
                  placeholder="Estimated number of students, preferred dates or topics..."
                  value={requestNotes}
                  onChange={(e) => setRequestNotes(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isSubmittingRequest} className="w-full mt-2">
                {isSubmittingRequest ? "Submitting..." : "Submit Workshop Request"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
