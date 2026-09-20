export interface PetitionItem {
  id: string;
  title: string;
  target: string;
  summary: string;
  fullDemands: string[];
  currentSignatures: number;
  targetSignatures: number;
  category: "schools" | "policy" | "access" | "healthcare";
  location: string;
  organizer: string;
}

export const PETITIONS_DATA: PetitionItem[] = [
  {
    id: "petition-1",
    title: "Free Menstrual Products in All Public Middle & High Schools",
    target: "State Board of Education & State Legislature",
    summary: "Over 1 in 4 students who menstruate report missing school due to lack of access to pads or tampons. We demand fully-stocked, free menstrual product dispensers in every student restroom.",
    fullDemands: [
      "Install and maintain free menstrual hygiene dispensers in all female and gender-neutral student restrooms.",
      "Allocate dedicated recurring state funding for school district product supplies.",
      "Ensure products are available without requiring students to ask the school nurse or main office."
    ],
    currentSignatures: 8420,
    targetSignatures: 10000,
    category: "schools",
    location: "Statewide Campaign",
    organizer: "Youth Reproductive Equity Coalition"
  },
  {
    id: "petition-2",
    title: "Mandate Medically-Accurate, Comprehensive Sex Education Across All Districts",
    target: "State Department of Education",
    summary: "Every young person deserves honest, science-backed health education that covers consent, puberty, contraception, and healthy relationships — not outdated abstinence-only curriculum.",
    fullDemands: [
      "Standardize statewide curriculum to require medically accurate, age-appropriate reproductive health education.",
      "Mandate comprehensive training for health educators and guest facilitators.",
      "Include topics on consent, mental well-being, healthy relationships, and STI prevention."
    ],
    currentSignatures: 6150,
    targetSignatures: 7500,
    category: "policy",
    location: "Statewide / Multi-District",
    organizer: "ReproUs Youth Advocates & Student Leaders"
  },
  {
    id: "petition-3",
    title: "Protect & Expand Confidential Healthcare Access for Minors",
    target: "Department of Health & Human Services",
    summary: "Fear of breach of privacy prevents thousands of teens from seeking STI testing, birth control, and mental health counseling. We call on clinics and insurers to guarantee total confidentiality for minor care.",
    fullDemands: [
      "Prevent automated Explanation of Benefits (EOB) statements that expose sensitive reproductive services to policyholders.",
      "Ensure zero out-of-pocket copays for confidential adolescent STI and contraceptive visits at community clinics.",
      "Provide youth with clear, transparent privacy guarantees at check-in."
    ],
    currentSignatures: 4890,
    targetSignatures: 5000,
    category: "healthcare",
    location: "National Initiative",
    organizer: "Adolescent Health Rights Alliance"
  },
  {
    id: "petition-4",
    title: "Expand Free STI Testing & Prevention in Community Youth Centers",
    target: "County Health Departments & Municipal Councils",
    summary: "Community centers and after-school hubs should provide barrier-free access to rapid confidential STI testing, barrier methods, and prevention counseling in trusted youth spaces.",
    fullDemands: [
      "Fund mobile community testing clinics at local youth centers and public parks on weekends.",
      "Provide free barrier methods (condoms, dental dams) in all public recreation centers.",
      "Train peer youth educators to conduct stigma-free intake and resource navigation."
    ],
    currentSignatures: 3280,
    targetSignatures: 5000,
    category: "access",
    location: "City & County Hubs",
    organizer: "Urban Youth Health Project"
  }
];
