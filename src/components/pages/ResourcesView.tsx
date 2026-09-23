"use client";

import React, { useState, useEffect } from "react";
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
  ArrowRight,
  ChevronDown,
  Copy,
  Check,
  ShieldCheck,
  HeartHandshake,
  MessageSquare,
  LifeBuoy,
  Megaphone,
  Building2,
  AlertTriangle
} from "lucide-react";
import { CLINICS_DATA, HOTLINES_DATA, Clinic, Hotline } from "@/data/clinicsData";
import { PETITIONS_DATA, REAL_WORLD_ADVOCACY_LINKS, PetitionItem } from "@/data/petitionsData";
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
import { cn } from "@/lib/utils";

interface ResourcesViewProps {
  onNavigate: (page: PageId, categoryOrTab?: string) => void;
  initialCategory?: "all" | "help" | "petitions";
}

const ADVOCACY_LETTER_TEMPLATES = [
  {
    id: "school-period-products",
    title: "School Principal & Board: Free Restroom Menstrual Dispensers",
    targetAudience: "School Principals, School Boards, Student Councils",
    category: "Schools & Period Equity",
    text: `Dear [Principal / School Board Members],

My name is [Your Name], and I am a student at [School Name]. I am writing to respectfully request that our school install and maintain free menstrual hygiene product dispensers in all female and gender-neutral student restrooms.

Across the United States, 1 in 4 menstruating students report missing class or struggling with lack of access to period supplies during the school day. Requiring students to walk to the nurse's office or main office creates unnecessary anxiety, disruptions to learning time, and stigma around a normal biological process.

Under the federal Menstrual Equity for All framework, access to menstrual hygiene is recognized as an essential educational equity issue, just like soap and toilet paper. Providing free dispensers ensures no student ever misses class or feels embarrassed because of their period.

Thank you for your leadership and dedication to student health and dignity. I would welcome the opportunity to meet briefly to discuss how we can implement this.

Sincerely,
[Your Name]
[Grade / Student Club]
[Contact Email]`
  },
  {
    id: "momnibus-legislation",
    title: "Congress & State Legislators: Support Black Maternal Health Momnibus Act (H.R. 3305)",
    targetAudience: "Members of Congress, State Representatives, Health Committees",
    category: "Federal Policy & Maternal Health",
    text: `Dear [Representative / Senator Name],

My name is [Your Name], and I am a constituent from [Your City / Zip Code]. I am writing to urge you to co-sponsor and vote YES on the bipartisan Black Maternal Health Momnibus Act (H.R. 3305 / S. 1606).

According to the CDC, more than 84% of pregnancy-related deaths in our nation are clinically preventable. Black birthing people are 3 to 4 times more likely to die from pregnancy complications due to systemic dismissal, inadequate postpartum coverage, and implicit bias.

The Momnibus Act provides comprehensive, evidence-based solutions by:
1. Mandating and funding continuous 365-day postpartum Medicaid coverage across all states.
2. Diversifying and growing the perinatal workforce by funding community doulas and midwives.
3. Strengthening hospital maternal mortality review committees (MMRCs) and anti-bias accountability programs.

Every family deserves safe, dignified maternal care. Please protect our community's mothers and infants by supporting the Momnibus Act.

Sincerely,
[Your Name]
[Address / Zip Code]
[Contact Email]`
  }
];

export function ResourcesView({ onNavigate, initialCategory = "all" }: ResourcesViewProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "help" | "petitions">(initialCategory);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [hotlineFilter, setHotlineFilter] = useState<string>("all");
  const [petitionFilter, setPetitionFilter] = useState<string>("all");
  const [copiedLetterId, setCopiedLetterId] = useState<string | null>(null);

  // Modals
  const [isClinicModalOpen, setIsClinicModalOpen] = useState(false);
  const [zipQuery, setZipQuery] = useState("");
  const [isHotlinesModalOpen, setIsHotlinesModalOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<(typeof ADVOCACY_LETTER_TEMPLATES)[0] | null>(null);

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

  // Sync when initialCategory changes from Navbar navigation
  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const categoryOptions: {
    id: "all" | "help" | "petitions";
    label: string;
    badge: string;
    icon: string;
    desc: string;
  }[] = [
    {
      id: "all",
      label: "All Resources (Overview)",
      badge: "Full Hub",
      icon: "🌐",
      desc: "Complete directory: hotlines, clinic finder, youth petitions, and leadership modules"
    },
    {
      id: "help",
      label: "How to Get Help",
      badge: "Immediate Care",
      icon: "🆘",
      desc: "24/7 confidential hotlines, free clinic finder, crisis support & minor privacy rights"
    },
    {
      id: "petitions",
      label: "Take Action",
      badge: "Advocacy",
      icon: "✍️",
      desc: "Active youth petitions, Momnibus Act, menstrual equity & school board letter toolkit"
    }
  ];

  const filteredClinics = CLINICS_DATA.filter((c) =>
    zipQuery.trim() === ""
      ? true
      : c.zip.includes(zipQuery.trim()) ||
        c.city.toLowerCase().includes(zipQuery.trim().toLowerCase())
  );

  const filteredHotlines = HOTLINES_DATA.filter((h) => {
    if (hotlineFilter === "all") return true;
    return h.category === hotlineFilter;
  });

  const filteredPetitions = petitions.filter((p) => {
    if (petitionFilter === "all") return true;
    return p.category === petitionFilter;
  });

  const handleCopyLetter = (letterId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLetterId(letterId);
    setTimeout(() => {
      setCopiedLetterId(null);
    }, 2500);
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

  const selectCategory = (cat: "all" | "help" | "petitions") => {
    setActiveCategory(cat);
    setIsCategoryDropdownOpen(false);
    if (cat === "help") {
      setTimeout(() => {
        document.getElementById("how-to-get-help-section")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else if (cat === "petitions") {
      setTimeout(() => {
        document.getElementById("petitions-section")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-10 md:py-14 flex flex-col gap-12 font-sans">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-pink/70 text-raspberry text-[13px] font-bold uppercase tracking-wider mb-3">
          <HeartHandshake className="w-3.5 h-3.5 text-coral" />
          <span>Resources &amp; Action Ecosystem</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal font-serif text-plum leading-[1.1] mb-4">
          How to get help &amp; take action
        </h1>
        <p className="text-[17px] sm:text-[18px] text-ink/85 leading-relaxed font-sans max-w-2xl mx-auto">
          When it&apos;s time for more than education — here is where to turn. Connect with 24/7 confidential hotlines, free clinics, youth rights guides, and join real-world legislative petitions.
        </p>
      </div>

      {/* DROPDOWN MENU & CATEGORY SELECTOR HUB */}
      <div className="rounded-2xl bg-white border-2 border-deep-teal/20 p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Dropdown Trigger */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-charcoal/70 whitespace-nowrap hidden sm:inline">
            Jump to Section:
          </span>

          <div className="relative flex-1 md:w-84">
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-ivory border-2 border-deep-teal/30 hover:border-deep-teal text-left font-sans font-semibold text-[14.5px] text-plum focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral transition-all cursor-pointer shadow-xs"
              aria-label="Select Resource Category"
              aria-expanded={isCategoryDropdownOpen}
            >
              <span className="flex items-center gap-2 truncate">
                <span className="text-lg">{categoryOptions.find((o) => o.id === activeCategory)?.icon}</span>
                <span className="font-bold text-plum truncate">
                  {categoryOptions.find((o) => o.id === activeCategory)?.label}
                </span>
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-plum/70 shrink-0 ml-2 transition-transform duration-200",
                  isCategoryDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown Menu Popup */}
            {isCategoryDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-full md:w-96 z-50 bg-white rounded-xl shadow-2xl border border-plum/20 p-2 flex flex-col gap-1.5 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-charcoal/60 border-b border-plum/10 flex items-center justify-between">
                  <span>Resources Navigation</span>
                  <span className="text-coral">3 Primary Views</span>
                </div>
                {categoryOptions.map((opt) => {
                  const isSelected = activeCategory === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => selectCategory(opt.id)}
                      className={cn(
                        "w-full text-left px-3.5 py-3 rounded-lg transition-colors flex items-start gap-3 cursor-pointer group",
                        isSelected
                          ? "bg-deep-teal text-white font-bold shadow-xs"
                          : "hover:bg-ivory text-plum"
                      )}
                    >
                      <span className="text-xl shrink-0 mt-0.5">{opt.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span
                            className={cn(
                              "text-[14px] leading-tight font-bold",
                              isSelected ? "text-white" : "text-plum group-hover:text-raspberry"
                            )}
                          >
                            {opt.label}
                          </span>
                          <span
                            className={cn(
                              "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0",
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-coral/10 text-coral border border-coral/20"
                            )}
                          >
                            {opt.badge}
                          </span>
                        </div>
                        <span
                          className={cn(
                            "text-[12px] line-clamp-2 leading-relaxed block",
                            isSelected ? "text-white/85" : "text-plum/70"
                          )}
                        >
                          {opt.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick Tab Pills */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {categoryOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => selectCategory(opt.id)}
              className={cn(
                "px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold font-sans transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer",
                activeCategory === opt.id
                  ? "bg-deep-teal text-white shadow-xs scale-[1.02]"
                  : "bg-ivory text-plum/80 hover:text-plum hover:bg-white border border-deep-teal/20"
              )}
            >
              <span>{opt.icon}</span>
              <span>{opt.label.split("(")[0].trim()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW CARDS (Visible when activeCategory === "all") */}
      {activeCategory === "all" && (
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-plum">Directory Overview</h2>
            <span className="text-xs font-semibold text-charcoal/70">
              6 Pathways to Support &amp; Leadership
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Find Free Clinic */}
            <Card className="p-6 flex flex-col justify-between hover:shadow-hover transition-all bg-white border border-deep-teal/15">
              <div>
                <div className="w-10 h-10 rounded-xl bg-light-teal/60 flex items-center justify-center text-deep-teal mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-plum mb-2">
                  Find a Free Clinic
                </h3>
                <p className="text-[14.5px] text-ink/80 leading-relaxed mb-6">
                  Search verified no-cost or sliding-scale clinics offering confidential STI tests, contraception, pregnancy testing, and exams.
                </p>
              </div>
              <Button
                onClick={() => selectCategory("help")}
                variant="ghost"
                className="w-full text-deep-teal hover:bg-light-teal/50 font-bold"
              >
                Search Clinics →
              </Button>
            </Card>

            {/* Card 2: 24/7 Hotlines */}
            <Card className="p-6 flex flex-col justify-between hover:shadow-hover transition-all bg-white border border-deep-teal/15">
              <div>
                <div className="w-10 h-10 rounded-xl bg-soft-pink flex items-center justify-center text-raspberry mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-plum mb-2">
                  Talk to Someone Now
                </h3>
                <p className="text-[14.5px] text-ink/80 leading-relaxed mb-6">
                  24/7 confidential phone and SMS lines staffed by certified counselors for reproductive questions, maternal mental health, and crisis.
                </p>
              </div>
              <Button
                onClick={() => selectCategory("help")}
                variant="ghost"
                className="w-full text-raspberry hover:bg-soft-pink font-bold"
              >
                See 24/7 Hotlines →
              </Button>
            </Card>

            {/* Card 3: Petitions & Grassroots Action */}
            <Card className="p-6 flex flex-col justify-between border-2 border-coral/30 bg-cream-card hover:shadow-hover transition-all">
              <div>
                <div className="w-10 h-10 rounded-xl bg-coral/15 flex items-center justify-center text-coral mb-4">
                  <PenLine className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl md:text-2xl font-serif text-plum">
                    Youth Petitions
                  </h3>
                  <Badge variant="default" className="text-[10px] uppercase bg-coral text-white">
                    7 Active
                  </Badge>
                </div>
                <p className="text-[14.5px] text-ink/80 leading-relaxed mb-6">
                  Add your name to student and coalition campaigns for free period products in schools, the Momnibus Act, and minor privacy rights.
                </p>
              </div>
              <Button
                onClick={() => selectCategory("petitions")}
                variant="default"
                className="w-full gap-1.5 bg-deep-teal text-white hover:bg-deep-teal/90 font-bold"
              >
                Explore Active Petitions
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Card>

            {/* Card 4: Workshops */}
            <Card className="p-6 flex flex-col justify-between hover:shadow-hover transition-all bg-white border border-deep-teal/15">
              <div>
                <div className="w-10 h-10 rounded-xl bg-yellow/40 flex items-center justify-center text-charcoal mb-4">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-plum mb-2">
                  Student Workshops
                </h3>
                <p className="text-[14.5px] text-ink/80 leading-relaxed mb-6">
                  Interactive 90-minute agendas, anonymous question boxes, and school visit booking for student groups.
                </p>
              </div>
              <Button
                onClick={() => onNavigate("workshops")}
                variant="ghost"
                className="w-full text-plum hover:bg-ivory font-bold"
              >
                Workshop Schedules →
              </Button>
            </Card>

            {/* Card 5: Ambassador Program */}
            <Card className="p-6 flex flex-col justify-between hover:shadow-hover transition-all bg-white border border-deep-teal/15">
              <div>
                <div className="w-10 h-10 rounded-xl bg-light-teal/50 flex items-center justify-center text-deep-teal mb-4">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-plum mb-2">
                  Youth Ambassadors
                </h3>
                <p className="text-[14.5px] text-ink/80 leading-relaxed mb-6">
                  Represent ReproUs on your campus, run peer resource tables, and receive certified health advocacy training.
                </p>
              </div>
              <Button
                onClick={() => onNavigate("contact", "ambassador")}
                variant="ghost"
                className="w-full text-deep-teal hover:bg-light-teal/40 font-bold"
              >
                Apply as Ambassador →
              </Button>
            </Card>

            {/* Card 6: Download Training Module */}
            <Card className="p-6 flex flex-col justify-between hover:shadow-hover transition-all bg-white border border-deep-teal/15">
              <div>
                <div className="w-10 h-10 rounded-xl bg-soft-pink/70 flex items-center justify-center text-raspberry mb-4">
                  <Download className="w-5 h-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-plum mb-2">
                  Training Module
                </h3>
                <p className="text-[14.5px] text-ink/80 leading-relaxed mb-6">
                  Self-paced student guide covering non-judgmental discussions, healthcare access, and crisis escalation protocols.
                </p>
              </div>
              <Button
                onClick={handleDownloadModule}
                variant="ghost"
                className="w-full gap-2 text-raspberry hover:bg-soft-pink/50 font-bold"
              >
                <Download className="w-4 h-4" />
                Download Guide (.txt)
              </Button>
            </Card>
          </div>
        </section>
      )}

      {/* SECTION 1: HOW TO GET HELP (Visible if 'all' or 'help') */}
      {(activeCategory === "all" || activeCategory === "help") && (
        <section
          id="how-to-get-help-section"
          className="flex flex-col gap-8 pt-4 border-t-2 border-deep-teal/15"
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-pink text-raspberry text-[13px] font-bold uppercase tracking-wider mb-2">
                <LifeBuoy className="w-3.5 h-3.5 text-coral" />
                <span>Immediate Support &amp; Care Directory</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-plum">
                How to Get Help
              </h2>
              <p className="text-[16px] sm:text-[17px] text-ink/80 max-w-2xl mt-1 mb-0 leading-relaxed">
                Confidential 24/7 hotlines, verified free clinics, adolescent privacy guarantees, and maternal warning signs triage.
              </p>
            </div>

            <Button
              onClick={() => setIsClinicModalOpen(true)}
              variant="outline"
              className="border-deep-teal/30 hover:bg-light-teal/50 text-deep-teal font-bold gap-2 shrink-0"
            >
              <Search className="w-4 h-4" />
              Quick Clinic Zip Search
            </Button>
          </div>

          {/* Emergency Crisis Callout Banner */}
          <div className="rounded-2xl bg-raspberry/10 border-2 border-raspberry/25 p-5 md:p-6 flex items-start gap-4 shadow-xs">
            <AlertTriangle className="w-6 h-6 text-raspberry shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold font-serif text-lg text-raspberry">
                Emergency &amp; Life-Threatening Situations
              </h4>
              <p className="text-[14px] text-charcoal/90 leading-relaxed m-0">
                If you or someone you know is experiencing acute severe bleeding, sudden chest pain, difficulty breathing, suicidal thoughts, or immediate domestic danger: <strong>call 911</strong> or proceed directly to the nearest emergency department immediately. You do not need insurance to receive emergency stabilization.
              </p>
            </div>
          </div>

          {/* 24/7 HOTLINES DIRECTORY */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-plum flex items-center gap-2">
                  <Phone className="w-5 h-5 text-coral" />
                  <span>24/7 Confidential Hotlines &amp; Text Lines</span>
                </h3>
                <p className="text-xs text-charcoal/70 mt-0.5 mb-0">
                  Always free, confidential, and staffed by trained educators &amp; crisis clinicians.
                </p>
              </div>

              {/* Hotline Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: "all", label: "All Hotlines" },
                  { id: "maternal", label: "Maternal Health" },
                  { id: "reproductive", label: "Reproductive" },
                  { id: "crisis", label: "Crisis Support" },
                  { id: "lgbtq", label: "LGBTQ+ Youth" },
                  { id: "safety", label: "Safety / Domestic" }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setHotlineFilter(f.id)}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                      hotlineFilter === f.id
                        ? "bg-raspberry text-white shadow-xs"
                        : "bg-white text-plum/70 hover:bg-soft-pink border border-plum/15"
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hotline Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredHotlines.map((hotline, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-deep-teal/15 shadow-xs hover:shadow-card transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif font-bold text-lg text-plum leading-snug">
                        {hotline.name}
                      </h4>
                      {hotline.badge && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-soft-pink text-raspberry shrink-0 border border-raspberry/15">
                          {hotline.badge}
                        </span>
                      )}
                    </div>
                    <span className="inline-block text-[11px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md">
                      ✓ {hotline.hours}
                    </span>
                    <p className="text-[13.5px] text-charcoal/80 leading-relaxed m-0">
                      {hotline.desc}
                    </p>
                  </div>

                  {/* Call & Text Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-deep-teal/10 flex-wrap">
                    <a
                      href={`tel:${hotline.number.replace(/[^0-9]/g, "")}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-deep-teal text-white hover:bg-deep-teal/90 text-xs font-bold transition-colors shadow-2xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-coral" />
                      <span>Call {hotline.number}</span>
                    </a>

                    {hotline.sms && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-light-teal text-deep-teal border border-deep-teal/20 text-xs font-bold">
                        <MessageSquare className="w-3.5 h-3.5 text-coral" />
                        <span>{hotline.sms}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INLINE CLINIC FINDER */}
          <div className="rounded-2xl bg-light-teal/30 border-2 border-deep-teal/20 p-5 md:p-7 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-deep-teal flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-coral" />
                  <span>Verified Free &amp; Sliding-Scale Health Clinics</span>
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/75 mt-0.5 mb-0">
                  Search by zip code or city. All listed clinics offer confidential care, teen consultations, and interpreter services.
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-3" />
                <Input
                  placeholder="Zip code (e.g. 90210) or City..."
                  className="pl-9 bg-white border-deep-teal/25 rounded-xl h-10 text-sm"
                  value={zipQuery}
                  onChange={(e) => setZipQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredClinics.length === 0 ? (
                <div className="col-span-full p-8 text-center bg-white rounded-xl border border-deep-teal/15">
                  <p className="text-sm text-charcoal/70 mb-2">No clinics matched your search query.</p>
                  <Button onClick={() => setZipQuery("")} variant="outline" size="sm">
                    Clear Search Filter
                  </Button>
                </div>
              ) : (
                filteredClinics.map((clinic) => (
                  <div
                    key={clinic.id}
                    className="p-5 rounded-xl bg-white border border-deep-teal/15 shadow-xs flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="font-serif font-bold text-base text-plum leading-snug">
                          {clinic.name}
                        </h4>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-yellow/60 text-ink shrink-0">
                          Zip {clinic.zip}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal/80 mb-1">
                        {clinic.address}, {clinic.city}
                      </p>
                      <p className="text-xs font-semibold text-deep-teal mb-2">
                        📞 {clinic.phone} • {clinic.hours}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {clinic.services.map((svc, i) => (
                          <span
                            key={i}
                            className="text-[10.5px] font-medium px-2 py-0.5 rounded bg-ivory text-plum border border-plum/10"
                          >
                            {svc}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-deep-teal/10 space-y-1">
                      {clinic.busAccessible && (
                        <div className="text-[11px] font-semibold text-green-800 flex items-center gap-1">
                          <span>🚍 Public Transit / Bus Line Accessible</span>
                        </div>
                      )}
                      {clinic.languages && (
                        <p className="text-[11px] text-charcoal/70 m-0">
                          🌐 <strong>Languages:</strong> {clinic.languages.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* KNOW YOUR RIGHTS: ADOLESCENT CONFIDENTIALITY */}
          <div className="rounded-2xl bg-white border border-deep-teal/20 p-6 md:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-deep-teal" />
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-plum">
                Know Your Rights: Confidential Adolescent Care Guide
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-4 rounded-xl bg-ivory border border-deep-teal/15 space-y-2">
                <h4 className="font-bold text-sm text-deep-teal flex items-center gap-1.5">
                  <span>🏛️</span>
                  <span>Title X Federal Protection</span>
                </h4>
                <p className="text-xs text-charcoal/80 leading-relaxed m-0">
                  Under federal Title X guidelines, youth and minors have the absolute legal right to receive confidential contraceptive counseling, STI testing, and pregnancy checks at any Title X clinic without parental consent or notification.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-ivory border border-deep-teal/15 space-y-2">
                <h4 className="font-bold text-sm text-raspberry flex items-center gap-1.5">
                  <span>🛡️</span>
                  <span>Preventing Insurance EOB Letters</span>
                </h4>
                <p className="text-xs text-charcoal/80 leading-relaxed m-0">
                  If you use your parent&apos;s insurance, an &quot;Explanation of Benefits&quot; (EOB) mailer could be sent home. Tell clinic staff: <em>&quot;I need this visit confidential. Please suppress the EOB or charge on your sliding fee scale.&quot;</em>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-ivory border border-deep-teal/15 space-y-2">
                <h4 className="font-bold text-sm text-coral flex items-center gap-1.5">
                  <span>💬</span>
                  <span>Front Desk Check-in Script</span>
                </h4>
                <p className="text-xs text-charcoal/80 leading-relaxed m-0">
                  Say to reception: <em>&quot;Hi, I am here for confidential reproductive services. I would like to be seen under your sliding scale program and ensure no mail or texts are sent to my family home.&quot;</em>
                </p>
              </div>
            </div>
          </div>

          {/* URGENT MATERNAL WARNING SIGNS (CDC Hear Her Protocol) */}
          <div className="rounded-2xl bg-ivory border-2 border-coral/25 p-6 md:p-7 space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-coral" />
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-plum">
                Urgent Maternal Warning Signs (CDC Hear Her Protocol)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/80 m-0">
              During pregnancy and for up to 1 full year postpartum, these warning signs require urgent medical evaluation — do not allow symptoms to be dismissed:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-1 text-xs text-plum font-semibold">
              {[
                "Severe persistent headache",
                "Dizziness or fainting spells",
                "Vision changes or seeing spots",
                "Fever of 100.4°F or higher",
                "Extreme swelling of face or hands",
                "Chest pain or rapid heartbeat",
                "Severe shortness of breath",
                "Severe abdominal / upper stomach pain",
                "Heavy vaginal bleeding or clots",
                "Fluid leaking before 37 weeks",
                "Decreased baby movement",
                "Overwhelming sadness or panic"
              ].map((sign, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-white border border-coral/20 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-coral shrink-0" />
                  <span className="leading-snug">{sign}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: PETITIONS & TAKE ACTION (Visible if 'all' or 'petitions') */}
      {(activeCategory === "all" || activeCategory === "petitions") && (
        <section
          id="petitions-section"
          className="flex flex-col gap-8 pt-4 border-t-2 border-coral/20"
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral/15 text-coral text-[13px] font-bold uppercase tracking-wider mb-2">
                <Megaphone className="w-3.5 h-3.5" />
                <span>Grassroots Advocacy &amp; Legislation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-plum">
                Take Action &amp; Petitions
              </h2>
              <p className="text-[16px] sm:text-[17px] text-ink/80 max-w-2xl mt-1 mb-0 leading-relaxed">
                Add your voice to active legislative campaigns, sign community pledges, propose local school initiatives, and download pre-drafted advocacy letters.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <Button
                onClick={() => setIsProposeModalOpen(true)}
                variant="outline"
                className="gap-2 border-coral/30 hover:bg-coral/10 text-coral font-bold cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                Propose a Petition
              </Button>
            </div>
          </div>

          {/* Petition Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: "all", label: "All Campaigns" },
              { id: "policy", label: "Federal & State Policy" },
              { id: "schools", label: "School & Campus Rights" },
              { id: "access", label: "Community Healthcare Access" },
              { id: "healthcare", label: "Minor Privacy Protections" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setPetitionFilter(f.id)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
                  petitionFilter === f.id
                    ? "bg-deep-teal text-white shadow-xs"
                    : "bg-white text-plum/70 hover:bg-ivory border border-deep-teal/15"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* PETITIONS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPetitions.map((petition) => {
              const percent = Math.min(
                100,
                Math.round((petition.currentSignatures / petition.targetSignatures) * 100)
              );
              const isSigned = signedPetitionIds.includes(petition.id);

              return (
                <Card
                  key={petition.id}
                  className="p-6 md:p-7 flex flex-col justify-between bg-white border border-deep-teal/20 shadow-xs hover:shadow-card transition-all"
                >
                  <div>
                    {/* Location & Category Badges */}
                    <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
                      <span className="text-[12px] font-bold font-sans uppercase tracking-wider text-raspberry">
                        {petition.location} • {petition.organizer}
                      </span>
                      <Badge variant="outline" className="capitalize text-[11px] border-deep-teal/25 text-deep-teal">
                        {petition.category}
                      </Badge>
                    </div>

                    {/* Live Coalition & Bill Badges */}
                    <div className="flex items-center gap-2 mb-3.5 flex-wrap">
                      <a
                        href={petition.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-bold bg-light-teal text-deep-teal border border-deep-teal/25 hover:bg-deep-teal hover:text-white transition-all shadow-2xs group"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-coral group-hover:text-white shrink-0" />
                        <span>Live Coalition: {petition.realWorldCampaign.split("&")[0].trim()}</span>
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

                    <h3 className="text-xl sm:text-2xl font-serif text-plum mb-2 leading-snug">
                      {petition.title}
                    </h3>

                    <p className="text-xs font-bold text-charcoal/70 mb-2">
                      Target: {petition.target}
                    </p>

                    <p className="text-sm text-ink/85 leading-relaxed mb-4">
                      {petition.summary}
                    </p>

                    {/* Demands preview */}
                    <div className="p-4 rounded-xl bg-ivory border border-deep-teal/10 mb-5">
                      <h4 className="text-xs font-extrabold text-deep-teal uppercase tracking-wider mb-2">
                        Key Demands:
                      </h4>
                      <ul className="space-y-1 text-xs text-charcoal/80 list-disc list-inside">
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
                        <span className="text-raspberry">
                          {petition.currentSignatures.toLocaleString()} signatures
                        </span>
                        <span className="text-charcoal/70">
                          Goal: {petition.targetSignatures.toLocaleString()} ({percent}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-soft-pink/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-raspberry transition-all duration-500 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    {/* Dual Action Buttons */}
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
                  </div>
                </Card>
              );
            })}
          </div>

          {/* STUDENT ADVOCACY TOOLKIT: PRE-WRITTEN LETTERS */}
          <div className="rounded-2xl bg-white border-2 border-coral/25 p-6 md:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral/10 text-coral text-xs font-bold uppercase tracking-wider mb-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Student Action Toolkit</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-plum">
                  Pre-Written Advocacy Letter Templates
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/80 mt-1 mb-0">
                  Ready-to-use letters to send to your school principal, district superintendent, or elected officials. Copy with 1 click and customize!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {ADVOCACY_LETTER_TEMPLATES.map((letter) => {
                const isCopied = copiedLetterId === letter.id;
                return (
                  <div
                    key={letter.id}
                    className="p-5 rounded-xl bg-ivory border border-deep-teal/20 flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold text-coral uppercase tracking-wider">
                          {letter.category}
                        </span>
                        <span className="text-[11px] text-charcoal/60">
                          Target: {letter.targetAudience.split(",")[0]}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-plum mb-3">
                        {letter.title}
                      </h4>
                      <div className="p-3.5 rounded-lg bg-white border border-plum/10 text-xs text-charcoal/80 font-mono max-h-48 overflow-y-auto leading-relaxed whitespace-pre-wrap">
                        {letter.text}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-deep-teal/10">
                      <Button
                        onClick={() => handleCopyLetter(letter.id, letter.text)}
                        variant="default"
                        size="sm"
                        className={cn(
                          "gap-1.5 font-bold text-xs h-9 px-4 transition-all cursor-pointer",
                          isCopied
                            ? "bg-green-700 text-white"
                            : "bg-deep-teal text-white hover:bg-deep-teal/90"
                        )}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Copied to Clipboard! ✓</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Letter Template</span>
                          </>
                        )}
                      </Button>
                      <span className="text-[11px] text-charcoal/60">
                        Paste into email or print
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* VERIFIED NATIONAL ADVOCACY DIRECTORY */}
          <div className="p-6 md:p-8 rounded-2xl bg-light-teal/25 border border-deep-teal/20 space-y-4">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-deep-teal flex items-center gap-2">
              <Building2 className="w-5 h-5 text-coral" />
              <span>National Advocacy &amp; Legislative Coalitions</span>
            </h3>
            <p className="text-xs sm:text-sm text-charcoal/80 m-0">
              Direct access to verified non-profit networks driving federal bills and state-level policy change:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              {REAL_WORLD_ADVOCACY_LINKS.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white border border-deep-teal/15 hover:border-deep-teal hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-1 mb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-coral">
                        {link.badge}
                      </span>
                      <ExternalLink className="w-3 h-3 text-charcoal/40 group-hover:text-deep-teal" />
                    </div>
                    <h4 className="font-serif font-bold text-sm text-plum group-hover:text-raspberry leading-snug">
                      {link.title}
                    </h4>
                    <p className="text-[11.5px] text-charcoal/70 line-clamp-2 m-0 leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-deep-teal flex items-center gap-1 pt-1">
                    <span>{link.organization}</span>
                    <span>→</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SIGN PETITION PLEDGE MODAL */}
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
                  <Button type="submit" disabled={isSigning} className="w-full mt-2 bg-deep-teal text-white hover:bg-deep-teal/90">
                    {isSigning ? "Recording Signature..." : "Record Community Pledge"}
                  </Button>
                </form>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* PROPOSE PETITION MODAL */}
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
              <Button type="submit" disabled={isSubmittingProp} className="w-full mt-2 bg-deep-teal text-white hover:bg-deep-teal/90">
                {isSubmittingProp ? "Submitting Proposal..." : "Submit Petition Proposal"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* CLINIC SEARCH MODAL */}
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
                  className="p-4 rounded-xl bg-ivory border border-deep-teal/15 flex flex-col gap-2"
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
    </div>
  );
}
