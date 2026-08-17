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
  CheckCircle2
} from "lucide-react";
import { CLINICS_DATA, HOTLINES_DATA, Clinic } from "@/data/clinicsData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12 flex flex-col gap-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-extrabold uppercase tracking-wider text-berry/75 mb-2">
          Resources
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-berry mb-4">
          How to get help
        </h1>
        <p className="text-base text-ink/85 leading-relaxed">
          When it&apos;s time for more than information — here is where to actually go. Verified free and sliding-scale clinics, hotlines, and leadership opportunities.
        </p>
      </div>

      {/* 6 Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Find a free clinic */}
        <Card className="p-7 flex flex-col justify-between hover:shadow-hover transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-yellow/40 flex items-center justify-center text-berry mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-berry mb-2">
              Find a free clinic near you
            </h3>
            <p className="text-sm text-ink/80 leading-relaxed mb-6">
              Search by zip code for verified no-cost or sliding-scale reproductive health clinics offering STI testing, contraception, and exams.
            </p>
          </div>
          <Button
            onClick={() => setIsClinicModalOpen(true)}
            variant="ghost"
            className="w-full sm:w-auto self-start"
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
            <h3 className="text-xl font-bold text-berry mb-2">
              Talk to someone now
            </h3>
            <p className="text-sm text-ink/80 leading-relaxed mb-6">
              Confidential hotlines and SMS text lines staffed 24/7 by real trained educators and crisis counselors.
            </p>
          </div>
          <Button
            onClick={() => setIsHotlinesModalOpen(true)}
            variant="ghost"
            className="w-full sm:w-auto self-start"
          >
            See hotlines
          </Button>
        </Card>

        {/* Card 3: Workshop Preview */}
        <Card className="p-7 flex flex-col justify-between hover:shadow-hover transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-berry/10 flex items-center justify-center text-berry mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-berry mb-2">
              See a workshop preview
            </h3>
            <p className="text-sm text-ink/80 leading-relaxed mb-6">
              Sample 90-minute agendas, testimonials, and upcoming session dates — see what happens before you go.
            </p>
          </div>
          <Button
            onClick={() => onNavigate("workshops")}
            variant="ghost"
            className="w-full sm:w-auto self-start"
          >
            Preview a workshop
          </Button>
        </Card>

        {/* Card 4: Request Visit */}
        <Card className="p-7 flex flex-col justify-between hover:shadow-hover transition-all">
          <div>
            <div className="w-10 h-10 rounded-xl bg-yellow-deep/30 flex items-center justify-center text-berry mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-berry mb-2">
              Request a school or youth group visit
            </h3>
            <p className="text-sm text-ink/80 leading-relaxed mb-6">
              Bring ReproUs educators directly to your classroom, after-school club, or community center.
            </p>
          </div>
          <Button
            onClick={() => onNavigate("workshops")}
            variant="ghost"
            className="w-full sm:w-auto self-start"
          >
            Request a visit
          </Button>
        </Card>

        {/* Card 5: Ambassador Program */}
        <Card className="p-7 flex flex-col justify-between border-2 border-yellow-deep bg-cream-card hover:shadow-hover transition-all">
          <div>
            <Badge variant="default" className="mb-3">
              Leadership
            </Badge>
            <h3 className="text-xl font-bold text-berry mb-2">
              Become a Youth Ambassador
            </h3>
            <p className="text-sm text-ink/80 leading-relaxed mb-6">
              Represent ReproUs at your high school or college campus, run resource tables, and co-facilitate workshops with training and mentorship provided.
            </p>
          </div>
          <Button
            onClick={() => setIsAmbassadorModalOpen(true)}
            variant="ghost"
            className="w-full sm:w-auto self-start"
          >
            Apply to be an ambassador
          </Button>
        </Card>

        {/* Card 6: Download Training Module */}
        <Card className="p-7 flex flex-col justify-between border-2 border-yellow-deep bg-cream-card hover:shadow-hover transition-all">
          <div>
            <Badge variant="default" className="mb-3">
              Self-Paced Guide
            </Badge>
            <h3 className="text-xl font-bold text-berry mb-2">
              Download the Ambassador training module
            </h3>
            <p className="text-sm text-ink/80 leading-relaxed mb-6">
              A comprehensive guide covering how to discuss reproductive topics comfortably, answer tough questions, and navigate healthcare access.
            </p>
          </div>
          <Button
            onClick={handleDownloadModule}
            variant="ghost"
            className="w-full sm:w-auto self-start gap-2"
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
          <h3 className="text-lg font-bold text-ink mb-1">
            Access isn&apos;t one-size-fits-all
          </h3>
          <p className="text-sm text-ink/90 leading-relaxed m-0">
            We know transportation, insurance status, and language barriers often stand in the way of care. Every clinic listed above includes notes on public transit accessibility, certified interpreter availability, and free confidential teen services.
          </p>
        </div>
      </div>

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
                    <h4 className="font-bold text-berry text-base">{clinic.name}</h4>
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
                  <h4 className="font-bold text-berry text-base">{h.name}</h4>
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

      {/* Ambassador Application Modal */}
      <Dialog open={isAmbassadorModalOpen} onOpenChange={setIsAmbassadorModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Youth Ambassador Application</DialogTitle>
            <DialogDescription>
              Join our peer educator network! Training and mentorship provided.
            </DialogDescription>
          </DialogHeader>

          {ambassadorSuccess ? (
            <div className="p-6 text-center flex flex-col items-center gap-2">
              <CheckCircle2 className="w-12 h-12 text-green-600 animate-bounce" />
              <h4 className="font-serif text-xl font-bold text-berry">Application Received!</h4>
              <p className="text-xs text-ink/80">
                We will email you with orientation details soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setAmbassadorSuccess(true);
                setTimeout(() => {
                  setIsAmbassadorModalOpen(false);
                  setAmbassadorSuccess(false);
                }, 2000);
              }}
              className="flex flex-col gap-3"
            >
              <div>
                <label className="block text-xs font-bold text-berry mb-1">Your Name</label>
                <Input required placeholder="First and Last Name" />
              </div>
              <div>
                <label className="block text-xs font-bold text-berry mb-1">Email Address</label>
                <Input type="email" required placeholder="name@example.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-berry mb-1">School or Community Group</label>
                <Input required placeholder="e.g. Westside High" />
              </div>
              <Button type="submit" className="w-full mt-2">
                Submit Ambassador Application
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
