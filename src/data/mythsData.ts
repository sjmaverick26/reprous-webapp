export interface MythItem {
  id: string;
  category: "fertility" | "cycles" | "general" | "conditions" | "stis" | "athletes";
  myth: string;
  fact: string;
  detail?: string;
}

export const MYTHS_DATA: MythItem[] = [
  {
    id: "myth-1",
    category: "fertility",
    myth: "You can't get pregnant during your period.",
    fact: "It's less likely, but sperm can survive inside the reproductive tract for up to 5 days — it's still biologically possible, especially with shorter cycles.",
    detail: "If someone has a shorter menstrual cycle (e.g. 21 days), ovulation can occur shortly after bleeding stops."
  },
  {
    id: "myth-2",
    category: "cycles",
    myth: "Irregular periods always mean something is seriously wrong.",
    fact: "Many temporary factors affect regularity — stress, changing sleep, travel, nutrition, and illness. Persistent irregularity over 3+ months is worth checking, but it's not automatically a catastrophe.",
    detail: "Especially in teens and young adults, the reproductive hormone feedback loop is still maturing."
  },
  {
    id: "myth-3",
    category: "general",
    myth: "Only girls need to learn about reproductive health and periods.",
    fact: "Everyone benefits from understanding reproductive biology — partners, brothers, fathers, friends, and coaches all become more supportive, respectful allies.",
    detail: "Comprehensive education dismantles stigma, builds empathy, and improves community health for all genders."
  },
  {
    id: "myth-4",
    category: "conditions",
    myth: "PCOS means you can never get pregnant.",
    fact: "PCOS can make ovulation irregular, but many people with PCOS conceive naturally or with straightforward medical support and cycle tracking.",
    detail: "Nutrition adjustments, ovulation-inducing medications, and hormonal balance therapies are highly successful."
  },
  {
    id: "myth-5",
    category: "stis",
    myth: "You'll know right away if you have an STI.",
    fact: "Most common STIs (like chlamydia, HPV, and gonorrhea) frequently have zero noticeable symptoms — regular confidential testing is the only way to know for sure.",
    detail: "Asymptomatic infections can still be transmitted and cause long-term inflammation if left untreated."
  },
  {
    id: "myth-6",
    category: "cycles",
    myth: "Cramps just mean you have low pain tolerance.",
    fact: "Severe cramps can be a sign of biological conditions like endometriosis or adenomyosis — intense, debilitating pain is real medical data, not a personal flaw.",
    detail: "You deserve to be taken seriously by healthcare professionals when pain limits your daily routine."
  },
  {
    id: "myth-7",
    category: "athletes",
    myth: "Losing your period is just a badge of honor for being a dedicated athlete.",
    fact: "Losing your period (amenorrhea) signals an energy deficiency (RED-S) that weakens bones and impairs heart and metabolic health.",
    detail: "A regular menstrual cycle is considered the fifth vital sign of athletic recovery and health."
  }
];
