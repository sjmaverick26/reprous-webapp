// Corinne's three Learn groups (her nav commits, 11 Nov): one list for the nav menu and the Learn page.
// Labels are hers, word for word.
export type LearnGroupId = "athlete" | "hormonal" | "reproductive";

export interface LearnGroup {
  id: LearnGroupId;
  label: string;
  /** Tailwind classes for the group's colour (her dots: teal / raspberry / coral). */
  dot: string;
  categories: { id: string; label: string }[];
}

export const LEARN_GROUPS: LearnGroup[] = [
  {
    id: "athlete",
    label: "Female athlete health & Accessibility",
    dot: "bg-deep-teal",
    categories: [
      { id: "play", label: "Female Athlete Health" },
      { id: "mind", label: "Mind & Self-Advocacy" },
      { id: "factors", label: "The Bigger Picture" },
    ],
  },
  {
    id: "hormonal",
    label: "Hormonal Health",
    dot: "bg-raspberry",
    categories: [
      { id: "pcos", label: "PCOS & Hormonal Health" },
      { id: "cycle", label: "Cycle Sense & Menstruation" },
      { id: "realtalk", label: "Real Talk & STIs" },
    ],
  },
  {
    id: "reproductive",
    label: "Reproductive Health",
    dot: "bg-coral",
    categories: [
      { id: "endo", label: "Endometriosis & Reproductive Pain" },
      { id: "body", label: "Body Basics & Hormones" },
      { id: "conditions", label: "Pregnancy & Reproductive Care" },
    ],
  },
];

/** Her quick links (Learn and Home dropdowns, 11 Nov), mapped to where each tool lives now. */
export const LEARN_QUICK_LINKS: { label: string; page: "hub" | "resources"; tab: string }[] = [
  { label: "Health Dictionary & Medical Terms", page: "hub", tab: "words" },
  { label: "Medical Myth-Buster Cards", page: "hub", tab: "myths" },
  { label: "Interactive Symptom Tracker Tool", page: "resources", tab: "tracker" },
];
