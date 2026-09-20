"use client";

import React, { useState } from "react";
import {
  MessageSquareHeart,
  Award,
  Send,
  Sparkles,
  CheckCircle2,
  Download,
  Mail,
  Users,
  Star,
  HelpCircle,
  Clock,
  ShieldCheck,
  GraduationCap
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  submitProgramFeedback,
  submitAmbassadorApplication,
  submitGeneralInquiry
} from "@/lib/api";
import { cn } from "@/lib/utils";

type ContactTab = "feedback" | "ambassador" | "inquiry";

export function ContactView({ initialTab = "feedback" }: { initialTab?: ContactTab }) {
  const [activeTab, setActiveTab] = useState<ContactTab>(initialTab);

  // Feedback State
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackRole, setFeedbackRole] = useState<string>("Youth / Student");
  const [feedbackCategory, setFeedbackCategory] = useState<string>("Learning Hub & Articles");
  const [feedbackText, setFeedbackText] = useState("");
  const [topicSuggestions, setTopicSuggestions] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Ambassador State
  const [ambName, setAmbName] = useState("");
  const [ambEmail, setAmbEmail] = useState("");
  const [ambAge, setAmbAge] = useState("");
  const [ambSchool, setAmbSchool] = useState("");
  const [ambCity, setAmbCity] = useState("");
  const [ambStatement, setAmbStatement] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Workshop Facilitation",
    "School Outreach"
  ]);
  const [ambSubmitting, setAmbSubmitting] = useState(false);
  const [ambSuccess, setAmbSuccess] = useState(false);

  // Inquiry State
  const [inqName, setInqName] = useState("");
  const [inqEmail, setInqEmail] = useState("");
  const [inqSubject, setInqSubject] = useState("General Question");
  const [inqMessage, setInqMessage] = useState("");
  const [inqSubmitting, setInqSubmitting] = useState(false);
  const [inqSuccess, setInqSuccess] = useState(false);

  const interestOptions = [
    "Workshop Facilitation",
    "School Outreach",
    "Social Media & Content",
    "Grassroots Petitions & Advocacy",
    "Peer Mentorship",
    "Community Resource Mapping"
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    setFeedbackSubmitting(true);
    await submitProgramFeedback({
      role: feedbackRole,
      rating: feedbackRating,
      feedback: feedbackText,
      topicSuggestions,
      email: isAnonymous ? undefined : feedbackEmail,
      isAnonymous
    });
    setFeedbackSubmitting(false);
    setFeedbackSuccess(true);
    setTimeout(() => {
      setFeedbackSuccess(false);
      setFeedbackText("");
      setTopicSuggestions("");
      setFeedbackEmail("");
    }, 3500);
  };

  const handleAmbassadorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ambName || !ambEmail || !ambStatement) return;

    setAmbSubmitting(true);
    await submitAmbassadorApplication({
      fullName: ambName,
      email: ambEmail,
      age: ambAge,
      schoolOrOrg: ambSchool,
      city: ambCity,
      statement: ambStatement,
      interests: selectedInterests
    });
    setAmbSubmitting(false);
    setAmbSuccess(true);
    setTimeout(() => {
      setAmbSuccess(false);
      setAmbName("");
      setAmbEmail("");
      setAmbAge("");
      setAmbSchool("");
      setAmbCity("");
      setAmbStatement("");
    }, 3500);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inqName || !inqEmail || !inqMessage) return;

    setInqSubmitting(true);
    await submitGeneralInquiry({
      name: inqName,
      email: inqEmail,
      subject: inqSubject,
      message: inqMessage
    });
    setInqSubmitting(false);
    setInqSuccess(true);
    setTimeout(() => {
      setInqSuccess(false);
      setInqName("");
      setInqEmail("");
      setInqMessage("");
    }, 3500);
  };

  const handleDownloadModule = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [
        "ReproUs Youth Ambassador Training Module (Self-Paced Guide)\n\n" +
          "1. Core Principles: Non-judgmental language, active listening, affirming youth autonomy.\n" +
          "2. Workshop Facilitation: Running the 90-minute session, handling anonymous question boxes.\n" +
          "3. Resource Navigation: How to connect peers with local Title X sliding-scale clinics.\n" +
          "4. Crisis Protocols: Recognizing when to hand off to 24/7 confidential hotlines.\n\n" +
          "© ReproUs Education Network"
      ],
      { type: "text/plain" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "ReproUs-Ambassador-Training-Module.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12 flex flex-col gap-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-[13px] md:text-[14px] font-bold uppercase tracking-wider text-berry mb-2 font-sans">
          Get in Touch &amp; Join the Movement
        </div>
        <h1 className="text-4xl md:text-[64px] lg:text-[72px] font-normal font-serif text-plum leading-[1.08] mb-4">
          Contact Us
        </h1>
        <p className="text-[17px] md:text-[19px] text-ink/85 leading-relaxed font-sans">
          Whether you want to share feedback on our curriculum, apply to become a Youth Ambassador, or bring a free workshop to your school — we&apos;re here for you.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-full bg-cream-card border border-berry/10 shadow-sm max-w-full overflow-x-auto">
          <button
            onClick={() => setActiveTab("feedback")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full text-[14.5px] font-semibold font-sans transition-all whitespace-nowrap",
              activeTab === "feedback"
                ? "bg-berry text-cream-card shadow-sm"
                : "text-ink hover:text-berry hover:bg-blush"
            )}
          >
            <MessageSquareHeart className="w-4 h-4" />
            Program Feedback
          </button>

          <button
            onClick={() => setActiveTab("ambassador")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full text-[14.5px] font-semibold font-sans transition-all whitespace-nowrap",
              activeTab === "ambassador"
                ? "bg-berry text-cream-card shadow-sm"
                : "text-ink hover:text-berry hover:bg-blush"
            )}
          >
            <Award className="w-4 h-4" />
            Become Youth Ambassador
          </button>

          <button
            onClick={() => setActiveTab("inquiry")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full text-[14.5px] font-semibold font-sans transition-all whitespace-nowrap",
              activeTab === "inquiry"
                ? "bg-berry text-cream-card shadow-sm"
                : "text-ink hover:text-berry hover:bg-blush"
            )}
          >
            <Send className="w-4 h-4" />
            Direct Inquiry
          </button>
        </div>
      </div>

      {/* TAB 1: FEEDBACK ABOUT THIS PROGRAM */}
      {activeTab === "feedback" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          {/* Info Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card className="p-7 bg-gradient-to-br from-yellow/30 via-cream-card to-blush/30 border-2 border-yellow-deep/40">
              <div className="w-12 h-12 rounded-2xl bg-yellow/60 flex items-center justify-center text-berry mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl md:text-[34px] font-normal text-plum mb-3 leading-[1.2]">
                Help Us Keep Growing
              </h2>
              <p className="text-[15px] md:text-[16px] text-ink/85 leading-relaxed mb-4 font-sans">
                ReproUs is built by and for young people. Your feedback directly shapes the new topics we research, the workshops we design, and how we bust myths.
              </p>
              <ul className="space-y-2.5 text-[13.5px] md:text-[14px] text-ink/80 mb-6 font-sans">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-berry flex-shrink-0" />
                  <span>100% anonymous option — share honestly</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-berry flex-shrink-0" />
                  <span>Reviewed weekly by our youth advisory board</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-berry flex-shrink-0" />
                  <span>Suggest topics we haven&apos;t covered yet</span>
                </li>
              </ul>

              <div className="p-4 rounded-2xl bg-cream-card border border-berry/10 text-[13px] md:text-[13.5px] text-ink/75 font-sans">
                💡 <b>Looking to ask a private health question?</b> Head to the{" "}
                <span className="font-bold text-berry">Q&amp;A page</span> where medical reviewers answer anonymous questions.
              </div>
            </Card>
          </div>

          {/* Feedback Form */}
          <Card className="lg:col-span-7 p-8 shadow-card">
            {feedbackSuccess ? (
              <div className="py-12 px-6 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-16 h-16 text-green-600 animate-bounce" />
                <h3 className="font-serif text-2xl md:text-[30px] font-normal text-plum">
                  Thank You for Your Feedback!
                </h3>
                <p className="text-[15px] text-ink/80 max-w-md font-sans">
                  Your thoughts help us make ReproUs safer, clearer, and more empowering for everyone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-5">
                <div>
                  <h3 className="font-serif text-2xl md:text-[30px] font-normal text-plum mb-1 leading-snug">
                    Feedback About This Program
                  </h3>
                  <p className="text-[14px] text-ink/70 font-sans">
                    Tell us how we are doing and what we can do better.
                  </p>
                </div>

                {/* Rating selection */}
                <div>
                  <label className="block text-[13px] md:text-[14px] font-bold uppercase tracking-wider text-berry mb-2 font-sans">
                    Overall Experience Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFeedbackRating(star)}
                        className={cn(
                          "p-2 rounded-xl border transition-all flex items-center gap-1 text-[14px] font-bold font-sans",
                          feedbackRating >= star
                            ? "bg-yellow border-yellow-deep text-ink shadow-sm"
                            : "bg-cream-card border-berry/10 text-ink/50 hover:bg-blush"
                        )}
                      >
                        <Star
                          className={cn(
                            "w-4 h-4",
                            feedbackRating >= star ? "fill-ink text-ink" : "text-ink/40"
                          )}
                        />
                        <span>{star}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Role selection */}
                <div>
                  <label className="block text-[13px] md:text-[14px] font-bold uppercase tracking-wider text-berry mb-2 font-sans">
                    I am a...
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Youth / Student",
                      "Educator / Teacher",
                      "Parent / Guardian",
                      "Healthcare Worker",
                      "Community Member"
                    ].map((role) => (
                      <button
                        type="button"
                        key={role}
                        onClick={() => setFeedbackRole(role)}
                        className={cn(
                          "px-3.5 py-1.5 rounded-full text-[13.5px] md:text-[14px] font-semibold font-sans transition-all border",
                          feedbackRole === role
                            ? "bg-berry text-cream-card border-berry"
                            : "bg-cream-card text-ink border-berry/15 hover:bg-blush"
                        )}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Focus Area */}
                <div>
                  <label className="block text-[13px] md:text-[14px] font-bold uppercase tracking-wider text-berry mb-2 font-sans">
                    Area of Feedback
                  </label>
                  <select
                    value={feedbackCategory}
                    onChange={(e) => setFeedbackCategory(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-berry/20 bg-cream-card text-[15px] font-semibold font-sans text-ink focus:outline-none focus:ring-2 focus:ring-berry"
                  >
                    <option value="Learning Hub & Articles">Learning Hub &amp; Articles</option>
                    <option value="In-Person Workshops">In-Person Workshops</option>
                    <option value="Q&A & Anonymity">Q&amp;A Section &amp; Anonymity</option>
                    <option value="Myths & Interactive Tools">Myths &amp; Interactive Tools</option>
                    <option value="Website Usability & Accessibility">Website Usability &amp; Accessibility</option>
                    <option value="Other / General">Other / General</option>
                  </select>
                </div>

                {/* Main feedback text */}
                <div>
                  <label className="block text-[13px] md:text-[14px] font-bold uppercase tracking-wider text-berry mb-2 font-sans">
                    What worked well? What could be improved? *
                  </label>
                  <Textarea
                    required
                    rows={4}
                    placeholder="Share your thoughts, reactions, or suggestions..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="text-[15px] font-sans"
                  />
                </div>

                {/* Topic suggestions */}
                <div>
                  <label className="block text-[13px] md:text-[14px] font-bold uppercase tracking-wider text-berry mb-2 font-sans">
                    Topics or Features You&apos;d Like to See Added (Optional)
                  </label>
                  <Input
                    placeholder="e.g. PCOS management tips, athlete guides, more translations..."
                    value={topicSuggestions}
                    onChange={(e) => setTopicSuggestions(e.target.value)}
                    className="text-[15px] font-sans"
                  />
                </div>

                {/* Anonymous Toggle & Email */}
                <div className="flex flex-col gap-3 pt-2 border-t border-berry/10">
                  <label className="flex items-center gap-2.5 cursor-pointer text-[13.5px] font-bold text-ink font-sans">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 rounded text-berry focus:ring-berry accent-berry"
                    />
                    <span>Submit 100% Anonymously (No email stored)</span>
                  </label>

                  {!isAnonymous && (
                    <div>
                      <label className="block text-[13px] font-bold text-berry mb-1 font-sans">
                        Your Email (Optional, if you&apos;d like a reply)
                      </label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={feedbackEmail}
                        onChange={(e) => setFeedbackEmail(e.target.value)}
                        className="text-[15px] font-sans"
                      />
                    </div>
                  )}
                </div>

                <Button type="submit" disabled={feedbackSubmitting} className="w-full mt-2" size="lg">
                  {feedbackSubmitting ? "Submitting Feedback..." : "Send Feedback"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      )}

      {/* TAB 2: BECOME YOUTH AMBASSADOR */}
      {activeTab === "ambassador" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          {/* Ambassador Program Overview */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card className="p-7 bg-cream-card border-2 border-yellow-deep shadow-card">
              <Badge variant="default" className="mb-3">
                Youth Leadership
              </Badge>
              <h2 className="font-serif text-2xl md:text-[34px] font-normal text-plum mb-3 leading-[1.2]">
                Become a ReproUs Youth Ambassador
              </h2>
              <p className="text-[15px] md:text-[16px] text-ink/85 leading-relaxed mb-6 font-sans">
                Youth Ambassadors are the heart of ReproUs. You will lead peer discussions, host interactive resource tables at school, help organize workshops, and advocate for reproductive health equity in your community.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-xl bg-yellow/50 flex items-center justify-center text-berry flex-shrink-0 font-bold text-xs">
                    🌟
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-plum font-sans">Leadership &amp; Mentorship</h4>
                    <p className="text-[13.5px] text-ink/75 m-0 font-sans">
                      Work alongside trained health educators and adolescent health clinicians.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-xl bg-blush-deep/50 flex items-center justify-center text-berry flex-shrink-0 font-bold text-xs">
                    📜
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-plum font-sans">Verified Volunteer Hours</h4>
                    <p className="text-[13.5px] text-ink/75 m-0 font-sans">
                      Earn community service hours, recommendation letters, and leadership certificates.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-xl bg-berry/10 flex items-center justify-center text-berry flex-shrink-0 font-bold text-xs">
                    🎒
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-plum font-sans">Ambassador Kit &amp; Swag</h4>
                    <p className="text-[13.5px] text-ink/75 m-0 font-sans">
                      Get printed pocket guides, stickers, pin badges, and demo educational kits.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleDownloadModule}
                variant="ghost"
                className="w-full gap-2 text-[13.5px] font-semibold font-sans"
              >
                <Download className="w-4 h-4" />
                Download Ambassador Training Guide (PDF/Text)
              </Button>
            </Card>
          </div>

          {/* Ambassador Application Form */}
          <Card className="lg:col-span-7 p-8 shadow-card">
            {ambSuccess ? (
              <div className="py-12 px-6 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-16 h-16 text-green-600 animate-bounce" />
                <h3 className="font-serif text-2xl md:text-[30px] font-normal text-plum">
                  Application Received, {ambName}!
                </h3>
                <p className="text-[15px] text-ink/80 max-w-md font-sans">
                  We&apos;re so excited to have you join our ambassador network. We will email you within 2-3 business days with your orientation materials and next cohort details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAmbassadorSubmit} className="flex flex-col gap-4">
                <div>
                  <h3 className="font-serif text-2xl md:text-[30px] font-normal text-plum mb-1 leading-snug">
                    Youth Ambassador Application
                  </h3>
                  <p className="text-[14px] text-ink/70 font-sans">
                    Open to high school and college students (Ages 14–24). No prior experience necessary.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] md:text-[14px] font-bold text-berry mb-1 font-sans">Full Name *</label>
                    <Input
                      required
                      placeholder="e.g. Jordan Rivera"
                      value={ambName}
                      onChange={(e) => setAmbName(e.target.value)}
                      className="text-[15px] font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] md:text-[14px] font-bold text-berry mb-1 font-sans">Email Address *</label>
                    <Input
                      type="email"
                      required
                      placeholder="jordan@example.com"
                      value={ambEmail}
                      onChange={(e) => setAmbEmail(e.target.value)}
                      className="text-[15px] font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[13px] md:text-[14px] font-bold text-berry mb-1 font-sans">Age / Grade *</label>
                    <Input
                      required
                      placeholder="e.g. 17 / 11th Grade"
                      value={ambAge}
                      onChange={(e) => setAmbAge(e.target.value)}
                      className="text-[15px] font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] md:text-[14px] font-bold text-berry mb-1 font-sans">School / Organization *</label>
                    <Input
                      required
                      placeholder="e.g. Central High"
                      value={ambSchool}
                      onChange={(e) => setAmbSchool(e.target.value)}
                      className="text-[15px] font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] md:text-[14px] font-bold text-berry mb-1 font-sans">City / State *</label>
                    <Input
                      required
                      placeholder="e.g. Austin, TX"
                      value={ambCity}
                      onChange={(e) => setAmbCity(e.target.value)}
                      className="text-[15px] font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] md:text-[14px] font-bold text-berry mb-2 font-sans">
                    What areas are you most interested in? (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((interest) => {
                      const isSelected = selectedInterests.includes(interest);
                      return (
                        <button
                          type="button"
                          key={interest}
                          onClick={() => handleInterestToggle(interest)}
                          className={cn(
                            "px-3.5 py-1.5 rounded-full text-[13.5px] font-semibold font-sans transition-all border",
                            isSelected
                              ? "bg-yellow text-ink border-yellow-deep font-bold"
                              : "bg-cream-card text-ink/75 border-berry/15 hover:bg-blush"
                          )}
                        >
                          {isSelected ? "✓ " : "+ "}
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] md:text-[14px] font-bold text-berry mb-1 font-sans">
                    Why do you want to be a ReproUs Ambassador? *
                  </label>
                  <Textarea
                    required
                    rows={4}
                    placeholder="Tell us a little about yourself and why reproductive health education matters to you or your peers..."
                    value={ambStatement}
                    onChange={(e) => setAmbStatement(e.target.value)}
                    className="text-[15px] font-sans"
                  />
                </div>

                <Button type="submit" disabled={ambSubmitting} className="w-full mt-2" size="lg">
                  {ambSubmitting ? "Submitting Application..." : "Submit Ambassador Application"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      )}

      {/* TAB 3: DIRECT INQUIRY & OUTREACH */}
      {activeTab === "inquiry" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
          {/* Quick Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card className="p-7 bg-cream-card shadow-card">
              <h2 className="font-serif text-2xl md:text-[34px] font-normal text-plum mb-3 leading-[1.2]">
                General Inquiries
              </h2>
              <p className="text-[15px] md:text-[16px] text-ink/85 leading-relaxed mb-6 font-sans">
                Have a question about our organization, media inquiries, or partnering with your youth center or health clinic?
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-berry/10 flex items-center justify-center text-berry">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[12px] md:text-[13px] font-bold text-ink/60 uppercase tracking-wider block font-sans">Email Us Directly</span>
                    <a
                      href="mailto:hello@reprous.org"
                      className="text-[15px] md:text-[16px] font-bold text-berry hover:underline font-sans"
                    >
                      hello@reprous.org
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow/40 flex items-center justify-center text-berry">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[12px] md:text-[13px] font-bold text-ink/60 uppercase tracking-wider block font-sans">Response Time</span>
                    <span className="text-[15px] md:text-[16px] font-bold text-ink font-sans">Usually within 24–48 hours</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blush-deep/50 flex items-center justify-center text-berry">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[12px] md:text-[13px] font-bold text-ink/60 uppercase tracking-wider block font-sans">Privacy Guarantee</span>
                    <span className="text-[15px] md:text-[16px] font-bold text-ink font-sans">Strictly confidential communication</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-yellow/30 border border-yellow-deep/30 text-[13px] md:text-[13.5px] text-ink/80 font-sans">
                🚨 <b>In need of immediate support or medical advice?</b> Please refer to our 24/7 confidential hotlines on the{" "}
                <span className="font-bold text-berry">Resources page</span>.
              </div>
            </Card>
          </div>

          {/* Inquiry Form */}
          <Card className="lg:col-span-7 p-8 shadow-card">
            {inqSuccess ? (
              <div className="py-12 px-6 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-16 h-16 text-green-600 animate-bounce" />
                <h3 className="font-serif text-2xl md:text-[30px] font-normal text-plum">
                  Message Sent!
                </h3>
                <p className="text-[15px] text-ink/80 max-w-md font-sans">
                  Thank you for reaching out. Our team will get back to you shortly at {inqEmail}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="flex flex-col gap-4">
                <div>
                  <h3 className="font-serif text-2xl md:text-[30px] font-normal text-plum mb-1 leading-snug">
                    Send Us a Message
                  </h3>
                  <p className="text-[14px] text-ink/70 font-sans">
                    Fill out the form below and we will route your inquiry to the right coordinator.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] md:text-[14px] font-bold text-berry mb-1 font-sans">Your Name *</label>
                    <Input
                      required
                      placeholder="Your Name"
                      value={inqName}
                      onChange={(e) => setInqName(e.target.value)}
                      className="text-[15px] font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] md:text-[14px] font-bold text-berry mb-1 font-sans">Your Email *</label>
                    <Input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={inqEmail}
                      onChange={(e) => setInqEmail(e.target.value)}
                      className="text-[15px] font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] md:text-[14px] font-bold text-berry mb-1 font-sans">Subject / Reason for Inquiry *</label>
                  <select
                    value={inqSubject}
                    onChange={(e) => setInqSubject(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-berry/20 bg-cream-card text-[15px] font-semibold font-sans text-ink focus:outline-none focus:ring-2 focus:ring-berry"
                  >
                    <option value="General Question">General Question</option>
                    <option value="School / Organization Partnership">School / Organization Partnership</option>
                    <option value="Clinic or Healthcare Resource Listing">Clinic or Healthcare Resource Listing</option>
                    <option value="Media & Press Inquiry">Media &amp; Press Inquiry</option>
                    <option value="Volunteer / Collaboration">Volunteer / Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] md:text-[14px] font-bold text-berry mb-1 font-sans">Message *</label>
                  <Textarea
                    required
                    rows={5}
                    placeholder="How can we help or collaborate?"
                    value={inqMessage}
                    onChange={(e) => setInqMessage(e.target.value)}
                    className="text-[15px] font-sans"
                  />
                </div>

                <Button type="submit" disabled={inqSubmitting} className="w-full mt-2" size="lg">
                  {inqSubmitting ? "Sending Message..." : "Send Message"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
