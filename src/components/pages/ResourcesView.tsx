"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Calendar,
  GraduationCap,
  Download,
  AlertCircle,
  Search,
  ExternalLink,
  CheckCircle2,
  FileText,
  Users,
  PenLine,
  PlusCircle,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { CLINICS_DATA, HOTLINES_DATA, Clinic } from "@/data/clinicsData";
import { PETITIONS_DATA, PetitionItem, REAL_WORLD_ADVOCACY_LINKS } from "@/data/petitionsData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { signPetitionApi, submitCommunityPetition } from "@/lib/api";
import { PageId } from "@/components/layout/Navbar";

interface ResourcesViewProps {
  onNavigate: (page: PageId) => void;
}

export function ResourcesView({ onNavigate }: ResourcesViewProps) {
  const [isClinicModalOpen, setIsClinicModalOpen] = useState(false);
  const [zipQuery, setZipQuery] = useState("");
  const [isHotlinesModalOpen, setIsHotlinesModalOpen] = useState(false);
  const [isAmbassadorModalOpen, setIsAmbassadorModalOpen] = useState(false);
  const [ambassadorSuccess, setAmbassadorSuccess] = useState(false);

  // Petitions State
  const [petitions, setPetitions] = useState<PetitionItem[]>(PETITIONS_DATA);
  const [selectedPetition, setSelectedPetition] = useState<PetitionItem | null>(null);
  const [signerName, setSignerName] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [signerZip, setSignerZip] = useState("");
  const [signerComment, setSignerComment] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [signSuccess, setSignSuccess] = useState(false);
  const [signedPetitionIds, setSignedPetitionIds] = useState<string[]>([]);

  // Propose Petition Modal State
  const [isProposeModalOpen, setIsProposeModalOpen] = useState(false);
  const [propTitle, setPropTitle] = useState("");
  const [propTarget, setPropTarget] = useState("");
  const [propSummary, setPropSummary] = useState("");
  const [propDemands, setPropDemands] = useState("");
  const [propName, setPropName] = useState("");
  const [propEmail, setPropEmail] = useState("");
  const [propLocation, setPropLocation] = useState("");
  const [isSubmittingProp, setIsSubmittingProp] = useState(false);
  const [propSuccess, setPropSuccess] = useState(false);

  const filteredClinics = CLINICS_DATA.filter((c) =>
    zipQuery.trim() === ""
      ? true
      : c.zip.includes(zipQuery.trim()) ||
        c.city.toLowerCase().includes(zipQuery.trim().toLowerCase())
  );

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

  const handleSignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPetition || !signerName || !signerEmail) return;

    setIsSigning(true);
    await signPetitionApi({
      petitionId: selectedPetition.id,
      signerName,
      email: signerEmail,
      zipCode: signerZip,
      comment: signerComment
    });
    setIsSigning(false);
    setSignSuccess(true);

    // Update local signature count
    setPetitions((prev) =>
      prev.map((p) =>
        p.id === selectedPetition.id
          ? { ...p, currentSignatures: p.currentSignatures + 1 }
          : p
      )
    );
    setSignedPetitionIds((prev) => [...prev, selectedPetition.id]);

    setTimeout(() => {
      setSelectedPetition(null);
      setSignSuccess(false);
      setSignerName("");
      setSignerEmail("");
      setSignerZip("");
      setSignerComment("");
    }, 2400);
  };

  const handleProposeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propTitle || !propTarget || !propSummary || !propName || !propEmail) return;

    setIsSubmittingProp(true);
    await submitCommunityPetition({
      title: propTitle,
      target: propTarget,
      summary: propSummary,
      demands: propDemands,
      proposerName: propName,
      proposerEmail: propEmail,
      location: propLocation
    });
    setIsSubmittingProp(false);
    setPropSuccess(true);
    setTimeout(() => {
      setIsProposeModalOpen(false);
      setPropSuccess(false);
      setPropTitle("");
      setPropTarget("");
      setPropSummary("");
      setPropDemands("");
      setPropName("");
      setPropEmail("");
      setPropLocation("");
    }, 2400);
  };

  const scrollToPetitions = () => {
    const el = document.getElementById("petitions-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12 flex flex-col gap-14">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-[13px] font-bold font-sans uppercase tracking-wider text-berry/75 mb-2">
          Resources &amp; Advocacy
        </div>
        <h1 className="text-4xl md:text-[64px] lg:text-[72px] font-normal font-serif text-plum leading-[1.08] mb-4">
          How to get help &amp; take action
        </h1>
        <p className="text-[17px] md:text-[18px] text-ink/85 leading-relaxed font-sans">
          When it&apos;s time for more than information — here is where to actually go. Verified free clinics, confidential 24/7 hotlines, leadership programs, and youth-led advocacy petitions.
        </p>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Find a free clinic */}
        <Card className="p-7 flex flex-col justify-between hover:shadow-hover transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-yellow/40 flex items-center justify-center text-berry mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-2xl md:text-[30px] font-normal font-serif text-plum mb-2 leading-snug">
              Find a free clinic near you
            </h3>
            <p className="text-[15px] md:text-[16px] text-ink/80 leading-relaxed mb-6 font-sans">
              Search by zip code for verified no-cost or sliding-scale reproductive health clinics offering STI testing, contraception, and exams.
            </p>
          </div>
          <Button
            onClick={() => setIsClinicModalOpen(true)}
            variant="ghost"
            className="w-full self-start"
          >
            Search clinics
          </Button>
        </Card>

        {/* Card 2: Hotlines */}
        <Card className="p-7 flex flex-col justify-between hover:shadow-hover transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blush-deep/50 flex items-center justify-center text-berry mb-4">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-2xl md:text-[30px] font-normal font-serif text-plum mb-2 leading-snug">
              Talk to someone now
            </h3>
            <p className="text-[15px] md:text-[16px] text-ink/80 leading-relaxed mb-6 font-sans">
              Confidential hotlines and SMS text lines staffed 24/7 by real trained educators and crisis counselors.
            </p>
          </div>
          <Button
            onClick={() => setIsHotlinesModalOpen(true)}
            variant="ghost"
            className="w-full self-start"
          >
            See hotlines
          </Button>
        </Card>

        {/* Card 3: Petitions & Grassroots Action */}
        <Card className="p-7 flex flex-col justify-between border-2 border-yellow-deep bg-cream-card hover:shadow-hover transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-yellow/60 flex items-center justify-center text-berry mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-2xl md:text-[30px] font-normal font-serif text-plum leading-snug">
                Youth-Led Petitions
              </h3>
              <Badge variant="default" className="text-[11px] uppercase">
                Active Campaigns
              </Badge>
            </div>
            <p className="text-[15px] md:text-[16px] text-ink/80 leading-relaxed mb-6 font-sans">
              Support student campaigns fighting for free menstrual products in schools, comprehensive health education, and minor privacy rights.
            </p>
          </div>
          <Button
            onClick={scrollToPetitions}
            variant="default"
            className="w-full self-start gap-1.5"
          >
            View Active Petitions
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Card>

        {/* Card 4: Workshop Preview */}
        <Card className="p-7 flex flex-col justify-between hover:shadow-hover transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-berry/10 flex items-center justify-center text-berry mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-2xl md:text-[30px] font-normal font-serif text-plum mb-2 leading-snug">
              See a workshop preview
            </h3>
            <p className="text-[15px] md:text-[16px] text-ink/80 leading-relaxed mb-6 font-sans">
              Sample 90-minute agendas, testimonials, and upcoming session dates — see what happens before you go.
            </p>
          </div>
          <Button
            onClick={() => onNavigate("workshops")}
            variant="ghost"
            className="w-full self-start"
          >
            Preview a workshop
          </Button>
        </Card>

        {/* Card 5: Ambassador Program */}
        <Card className="p-7 flex flex-col justify-between hover:shadow-hover transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-yellow-deep/30 flex items-center justify-center text-berry mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-2xl md:text-[30px] font-normal font-serif text-plum mb-2 leading-snug">
              Become a Youth Ambassador
            </h3>
            <p className="text-[15px] md:text-[16px] text-ink/80 leading-relaxed mb-6 font-sans">
              Represent ReproUs at your campus, run resource tables, and co-facilitate workshops with leadership training provided.
            </p>
          </div>
          <Button
            onClick={() => onNavigate("contact")}
            variant="ghost"
            className="w-full self-start"
          >
            Apply to be an ambassador
          </Button>
        </Card>

        {/* Card 6: Download Training Module */}
        <Card className="p-7 flex flex-col justify-between hover:shadow-hover transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blush-deep/50 flex items-center justify-center text-berry mb-4">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-2xl md:text-[30px] font-normal font-serif text-plum mb-2 leading-snug">
              Ambassador training module
            </h3>
            <p className="text-[15px] md:text-[16px] text-ink/80 leading-relaxed mb-6 font-sans">
              A comprehensive self-paced guide covering how to discuss reproductive topics comfortably and navigate healthcare access.
            </p>
          </div>
          <Button
            onClick={handleDownloadModule}
            variant="ghost"
            className="w-full self-start gap-2"
          >
            <Download className="w-4 h-4" />
            Download module (PDF/Text)
          </Button>
        </Card>
      </div>

      {/* Access Note Card */}
      <div className="rounded-2xl bg-yellow p-6 md:p-8 flex gap-4 items-start shadow-sm">
        <AlertCircle className="w-7 h-7 text-ink flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-xl md:text-2xl font-bold font-serif text-ink mb-1">
            Access isn&apos;t one-size-fits-all
          </h3>
          <p className="text-[15px] md:text-[16px] text-ink/90 leading-relaxed m-0 font-sans">
            We know transportation, insurance status, and language barriers often stand in the way of care. Every clinic listed above includes notes on public transit accessibility, certified interpreter availability, and free confidential teen services.
          </p>
        </div>
      </div>

      {/* PETITIONS & ADVOCACY SECTION */}
      <section id="petitions-section" className="flex flex-col gap-8 pt-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow/50 text-berry text-[13px] font-bold font-sans uppercase tracking-wider mb-2.5">
              <PenLine className="w-3.5 h-3.5" />
              Grassroots Advocacy &amp; Policy
            </div>
            <h2 className="text-3xl md:text-[44px] lg:text-[50px] font-normal font-serif text-plum leading-[1.15]">
              Active Youth Petitions
            </h2>
            <p className="text-[17px] md:text-[18px] text-ink/80 max-w-xl mt-1 mb-0 font-sans">
              Add your name to student and community-driven campaigns fighting for equitable health policy, free period products, and youth privacy protections.
            </p>
          </div>

          <Button
            onClick={() => setIsProposeModalOpen(true)}
            variant="ghost"
            className="gap-2 self-start md:self-end border border-berry/20 bg-cream-card hover:bg-blush"
          >
            <PlusCircle className="w-4 h-4" />
            Start / Propose a Petition
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {petitions.map((petition) => {
            const percent = Math.min(
              100,
              Math.round((petition.currentSignatures / petition.targetSignatures) * 100)
            );
            const isSigned = signedPetitionIds.includes(petition.id);

            return (
              <Card
                key={petition.id}
                className="p-7 flex flex-col justify-between bg-cream-card border border-berry/15 shadow-card hover:shadow-hover transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
                    <span className="text-[13px] font-bold font-sans uppercase tracking-wider text-berry/75">
                      {petition.location} • {petition.organizer}
                    </span>
                    <Badge variant="outline" className="capitalize text-[12px]">
                      {petition.category}
                    </Badge>
                  </div>

                  {/* Real-World Campaign & Bill Badge */}
                  <div className="flex items-center gap-2 mb-3.5 flex-wrap">
                    <a
                      href={petition.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-bold bg-light-teal text-deep-teal border border-deep-teal/25 hover:bg-deep-teal hover:text-white transition-all shadow-2xs group"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-coral group-hover:text-white shrink-0" />
                      <span>Live Coalition: {petition.realWorldCampaign}</span>
                    </a>

                    {petition.billOrInitiative && (
                      <a
                        href={petition.billUrl || petition.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-raspberry bg-soft-pink/70 hover:bg-soft-pink px-2.5 py-0.5 rounded-lg border border-raspberry/25 transition-colors"
                      >
                        <span>🏛️ {petition.billOrInitiative}</span>
                        <ExternalLink className="w-3 h-3 ml-0.5 shrink-0" />
                      </a>
                    )}
                  </div>

                  <h3 className="text-2xl md:text-[28px] font-normal font-serif text-plum mb-2 leading-snug">
                    {petition.title}
                  </h3>

                  <p className="text-xs font-bold text-ink/65 mb-3">
                    Target: {petition.target}
                  </p>

                  <p className="text-sm text-ink/85 leading-relaxed mb-6">
                    {petition.summary}
                  </p>

                  {/* Demands preview */}
                  <div className="p-4 rounded-xl bg-blush/40 border border-berry/10 mb-6">
                    <h4 className="text-xs font-extrabold text-berry uppercase tracking-wider mb-2">
                      Key Demands:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-ink/80 list-disc list-inside">
                      {petition.fullDemands.map((demand, idx) => (
                        <li key={idx} className="leading-snug">
                          {demand}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-berry">
                        {petition.currentSignatures.toLocaleString()} signatures
                      </span>
                      <span className="text-ink/70">
                        Goal: {petition.targetSignatures.toLocaleString()} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full h-3 bg-blush-deep/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-berry transition-all duration-500 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Dual Action Buttons: Community Pledge + Live Real-World Petition */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <Button
                      onClick={() => setSelectedPetition(petition)}
                      disabled={isSigned}
                      variant={isSigned ? "ghost" : "default"}
                      className={`w-full gap-1.5 font-bold text-xs sm:text-sm h-11 ${
                        isSigned
                          ? "text-green-700 bg-green-50 border border-green-300"
                          : "bg-deep-teal text-white hover:bg-deep-teal/90"
                      }`}
                    >
                      {isSigned ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                          <span>Pledged on ReproUs ✓</span>
                        </>
                      ) : (
                        <>
                          <PenLine className="w-4 h-4 shrink-0" />
                          <span>Sign Community Pledge</span>
                        </>
                      )}
                    </Button>

                    <a
                      href={petition.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-deep-teal/25 bg-white text-deep-teal hover:bg-light-teal/50 hover:border-deep-teal font-bold text-xs sm:text-sm h-11 px-3 transition-all shadow-2xs text-center"
                    >
                      <span>Sign Real Petition</span>
                      <ExternalLink className="w-3.5 h-3.5 text-raspberry shrink-0" />
                    </a>
                  </div>

                  {petition.externalUrl && (
                    <div className="mt-3.5 pt-2.5 border-t border-deep-teal/10 flex items-center justify-between gap-2 text-[11.5px] font-sans">
                      <span className="text-charcoal/70 truncate">
                        Linked Host: <strong className="text-deep-teal">{petition.realWorldCampaign}</strong>
                      </span>
                      <a
                        href={petition.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-raspberry hover:underline inline-flex items-center gap-1 shrink-0"
                      >
                        <span>Official Platform</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Verified National Petitions & Real-World Grassroots Campaigns */}
        <div className="rounded-3xl bg-white p-7 md:p-9 border border-deep-teal/15 shadow-sm mt-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-deep-teal/10 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light-teal text-deep-teal text-[12.5px] font-bold font-sans uppercase tracking-wider mb-2 border border-deep-teal/20">
                <ExternalLink className="w-3.5 h-3.5" />
                Live Verified Campaigns &amp; Petitions
              </div>
              <h3 className="text-2xl md:text-[30px] font-normal font-serif text-deep-teal">
                Real-World Advocacy &amp; Legislative Petitions
              </h3>
              <p className="text-[15.5px] md:text-[16.5px] text-charcoal/80 font-sans mt-1 max-w-2xl leading-relaxed">
                The petitions on ReproUs reflect real active grassroots campaigns across school boards, state legislatures, and Congress. You can take direct action and sign live petitions hosted by verified non-profit partner organizations or track official federal bills below:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REAL_WORLD_ADVOCACY_LINKS.map((link) => (
              <div
                key={link.title}
                className="rounded-2xl p-5 bg-[#FFF8F0] border border-deep-teal/15 flex flex-col justify-between hover:shadow-hover hover:border-deep-teal/30 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-deep-teal/15 text-deep-teal">
                      {link.badge}
                    </span>
                    <span className="text-xs font-semibold text-charcoal/60 truncate">
                      {link.organization}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-normal text-deep-teal mb-2 leading-snug group-hover:text-raspberry transition-colors">
                    {link.title}
                  </h4>
                  <p className="text-[13.5px] text-charcoal/80 leading-relaxed font-sans mb-4">
                    {link.description}
                  </p>
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full pt-3 text-[13px] font-bold font-sans text-raspberry border-t border-deep-teal/10 group-hover:underline"
                >
                  <span>Visit Official Campaign</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Petition Modal */}
      <Dialog open={!!selectedPetition} onOpenChange={(open) => !open && setSelectedPetition(null)}>
        <DialogContent className="max-w-md">
          {selectedPetition && (
            <div>
              <DialogHeader className="mb-3">
                <DialogTitle>Sign Petition Pledge</DialogTitle>
                <DialogDescription>
                  {selectedPetition.title}
                </DialogDescription>
              </DialogHeader>

              {/* Real World Direct Outbound Banner */}
              <div className="p-3.5 rounded-2xl bg-light-teal/50 border border-deep-teal/20 text-xs text-charcoal/90 space-y-1.5 mb-4">
                <div className="flex items-center justify-between font-bold text-deep-teal">
                  <span className="flex items-center gap-1.5">
                    <ExternalLink className="w-4 h-4 text-coral shrink-0" />
                    Official Live Petition Link:
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-white border border-deep-teal/20 text-deep-teal">
                    National Coalition
                  </span>
                </div>
                <p className="text-[11.5px] leading-relaxed m-0 text-charcoal/80">
                  This community initiative supports <strong>{selectedPetition.realWorldCampaign}</strong> ({selectedPetition.billOrInitiative || "Grassroots Initiative"}).
                  Add your name to the ReproUs student ledger below, or sign the official petition directly on the host website:
                </p>
                <a
                  href={selectedPetition.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-raspberry hover:underline text-xs pt-1"
                >
                  <span>Sign Live on {selectedPetition.realWorldCampaign.split("&")[0].trim()} ↗</span>
                </a>
              </div>

              {signSuccess ? (
                <div className="p-6 text-center flex flex-col items-center gap-3">
                  <CheckCircle2 className="w-12 h-12 text-green-600 animate-bounce" />
                  <h4 className="font-serif text-xl font-bold text-deep-teal">Pledge Recorded!</h4>
                  <p className="text-xs text-charcoal/80">
                    Thank you for standing up for youth reproductive rights. Next, please add your name to the official live national petition:
                  </p>
                  {selectedPetition.externalUrl && (
                    <div className="mt-2 pt-3 border-t border-deep-teal/15 w-full text-left bg-light-teal/50 p-4 rounded-xl space-y-2.5">
                      <p className="text-xs text-charcoal/80 font-bold mb-0">Official Host Campaign:</p>
                      <p className="text-xs text-charcoal/70 mb-1">{selectedPetition.realWorldCampaign}</p>
                      <a
                        href={selectedPetition.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm h-11 px-4 rounded-xl bg-deep-teal text-white hover:bg-deep-teal/90 shadow-sm transition-all"
                      >
                        <span>Sign Live on {selectedPetition.realWorldCampaign.split("&")[0].trim()}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSignSubmit} className="flex flex-col gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-raspberry mb-1">Your Full Name *</label>
                    <Input
                      required
                      placeholder="e.g. Maya Chen"
                      value={signerName}
                      onChange={(e) => setSignerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-raspberry mb-1">Email Address *</label>
                    <Input
                      type="email"
                      required
                      placeholder="maya@example.com"
                      value={signerEmail}
                      onChange={(e) => setSignerEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-raspberry mb-1">Zip Code / City</label>
                    <Input
                      placeholder="e.g. 90210"
                      value={signerZip}
                      onChange={(e) => setSignerZip(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-raspberry mb-1">
                      Why does this matter to you? (Optional Public Comment)
                    </label>
                    <Textarea
                      rows={2}
                      placeholder="Add a brief reason why you are signing..."
                      value={signerComment}
                      onChange={(e) => setSignerComment(e.target.value)}
                    />
                  </div>
                  {selectedPetition.externalUrl && (
                    <div className="p-2.5 rounded-lg bg-light-teal/40 border border-deep-teal/10 text-[11.5px] text-charcoal/80 flex items-center justify-between gap-2">
                      <span className="truncate">Modeled after: {selectedPetition.realWorldCampaign}</span>
                      <a
                        href={selectedPetition.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-raspberry hover:underline inline-flex items-center gap-1 shrink-0"
                      >
                        <span>Official Action</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                  <p className="text-[11px] text-charcoal/65 italic m-0">
                    * Your email will not be published publicly. We only count verified signatures.
                  </p>
                  <Button type="submit" disabled={isSigning} className="w-full mt-2">
                    {isSigning ? "Recording Signature..." : "Record Community Pledge"}
                  </Button>
                </form>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Propose Petition Modal */}
      <Dialog open={isProposeModalOpen} onOpenChange={setIsProposeModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader className="mb-4">
            <DialogTitle>Propose a Community Petition</DialogTitle>
            <DialogDescription>
              Lead change in your school district, city, or campus. Submit a petition for the ReproUs youth coalition to review and amplify.
            </DialogDescription>
          </DialogHeader>

          {propSuccess ? (
            <div className="p-6 text-center flex flex-col items-center gap-2">
              <CheckCircle2 className="w-12 h-12 text-green-600 animate-bounce" />
              <h4 className="font-serif text-xl font-bold text-plum">Petition Proposed!</h4>
              <p className="text-xs text-ink/80">
                Our advocacy team will review your proposal and follow up with you within 2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleProposeSubmit} className="flex flex-col gap-3.5">
              <div>
                <label className="block text-xs font-bold text-berry mb-1">Petition Title *</label>
                <Input
                  required
                  placeholder="e.g. Provide Free Menstrual Products in Central High Restrooms"
                  value={propTitle}
                  onChange={(e) => setPropTitle(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-berry mb-1">Target Decision Maker *</label>
                  <Input
                    required
                    placeholder="e.g. School Board / City Council"
                    value={propTarget}
                    onChange={(e) => setPropTarget(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-berry mb-1">Location / Campus *</label>
                  <Input
                    required
                    placeholder="e.g. Chicago Public Schools"
                    value={propLocation}
                    onChange={(e) => setPropLocation(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-berry mb-1">Summary / Context *</label>
                <Textarea
                  required
                  rows={2}
                  placeholder="Explain why this issue is important in your community..."
                  value={propSummary}
                  onChange={(e) => setPropSummary(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-berry mb-1">Key Action Demands *</label>
                <Textarea
                  required
                  rows={2}
                  placeholder="What specific actions do you want leadership to take?"
                  value={propDemands}
                  onChange={(e) => setPropDemands(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-berry mb-1">Your Name / Group *</label>
                  <Input
                    required
                    placeholder="Your Name or Club"
                    value={propName}
                    onChange={(e) => setPropName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-berry mb-1">Contact Email *</label>
                  <Input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={propEmail}
                    onChange={(e) => setPropEmail(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" disabled={isSubmittingProp} className="w-full mt-2">
                {isSubmittingProp ? "Submitting Proposal..." : "Submit Petition Proposal"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Clinic Search Modal */}
      <Dialog open={isClinicModalOpen} onOpenChange={setIsClinicModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Find Free &amp; Sliding-Scale Clinics</DialogTitle>
            <DialogDescription>
              Filter clinics by zip code or city. All listed clinics offer confidential care.
            </DialogDescription>
          </DialogHeader>

          <div className="my-2 relative">
            <Search className="w-4 h-4 text-ink/50 absolute left-3.5 top-3.5" />
            <Input
              placeholder="Search by Zip Code (e.g. 90210) or City..."
              className="pl-10"
              value={zipQuery}
              onChange={(e) => setZipQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto pr-1">
            {filteredClinics.length === 0 ? (
              <p className="text-xs text-ink/70 text-center py-6">
                No clinics found matching that search. Try another zip code or clear the search.
              </p>
            ) : (
              filteredClinics.map((clinic) => (
                <div
                  key={clinic.id}
                  className="p-4 rounded-xl bg-blush/40 border border-berry/10 flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-plum text-base">{clinic.name}</h4>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow text-ink">
                      Zip {clinic.zip}
                    </span>
                  </div>
                  <p className="text-xs text-ink/80 m-0">
                    {clinic.address}, {clinic.city} • <b>{clinic.phone}</b>
                  </p>
                  <p className="text-xs text-ink/70 m-0">Hours: {clinic.hours}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {clinic.services.map((s, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded bg-cream-card text-berry border border-berry/10"
                      >
                        {s}
                      </span>
                    ))}
                    {clinic.busAccessible && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-green-100 text-green-900">
                        🚍 Bus Line Accessible
                      </span>
                    )}
                  </div>
                  {clinic.languages && clinic.languages.length > 0 && (
                    <p className="text-[11.5px] text-plum/85 m-0 font-sans mt-0.5">
                      🌐 <strong className="text-plum">Languages &amp; Interpretation:</strong>{" "}
                      <span className="text-ink/80">{clinic.languages.join(", ")}</span>
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Hotlines Modal */}
      <Dialog open={isHotlinesModalOpen} onOpenChange={setIsHotlinesModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>24/7 Confidential Hotlines</DialogTitle>
            <DialogDescription>
              Direct, anonymous phone numbers and SMS text lines for immediate support.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-2">
            {HOTLINES_DATA.map((h, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-blush/40 border border-berry/10 flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-plum text-base">{h.name}</h4>
                  <span className="text-[11px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    {h.hours}
                  </span>
                </div>
                <p className="text-xs text-ink/80 m-0">{h.desc}</p>
                <div className="flex items-center gap-3 mt-2">
                  <a
                    href={`tel:${h.number.replace(/[^0-9]/g, "")}`}
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-cream-card bg-berry px-3 py-1.5 rounded-full hover:bg-berry-dark"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call {h.number}
                  </a>
                  {h.sms && (
                    <span className="text-xs font-bold text-berry">
                      💬 {h.sms}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
