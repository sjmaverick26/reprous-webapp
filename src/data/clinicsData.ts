export interface Clinic {
  id: string;
  name: string;
  address: string;
  city: string;
  zip: string;
  phone: string;
  hours: string;
  services: string[];
  slidingScale: boolean;
  busAccessible: boolean;
  languages: string[];
}

export interface Hotline {
  name: string;
  number: string;
  sms?: string;
  hours: string;
  desc: string;
  category?: "maternal" | "crisis" | "reproductive" | "safety" | "lgbtq";
  badge?: string;
}

export const CLINICS_DATA: Clinic[] = [
  {
    id: "clinic-1",
    name: "Hope Community Health Center",
    address: "742 Evergreen Terrace",
    city: "Metro City",
    zip: "90210",
    phone: "(555) 234-5678",
    hours: "Mon-Fri 8:00 AM - 6:00 PM, Sat 9:00 AM - 1:00 PM",
    services: ["Free STI Testing", "Confidential Birth Control", "Pregnancy Testing", "General Checkups"],
    slidingScale: true,
    busAccessible: true,
    languages: ["English", "Español", "中文 (Chinese)", "Tiếng Việt", "Français (French)", "Certified Tele-Interpreters"]
  },
  {
    id: "clinic-2",
    name: "Eastside Youth Wellness Clinic",
    address: "1050 E 14th Street",
    city: "Eastside",
    zip: "90212",
    phone: "(555) 876-5432",
    hours: "Mon-Thu 9:00 AM - 7:00 PM, Fri 9:00 AM - 5:00 PM",
    services: ["Teen & Youth Care", "Confidential Consults", "Free Condoms & Emergency Contraception", "Mental Health"],
    slidingScale: true,
    busAccessible: true,
    languages: ["English", "Español", "العربية", "اردو (Urdu)", "دری (Dari)", "Kiswahili (Swahili)"]
  },
  {
    id: "clinic-3",
    name: "Valley Community Health Alliance",
    address: "3300 Valley Way",
    city: "North Valley",
    zip: "90215",
    phone: "(555) 345-6789",
    hours: "Mon-Fri 8:30 AM - 5:00 PM",
    services: ["Reproductive Health", "Pap Smears", "PrEP & HIV Services", "Nutritional Counseling"],
    slidingScale: true,
    busAccessible: true,
    languages: ["English", "Español", "한국어 (Korean)", "中文 (Chinese)", "24/7 Medical Interpretation Line"]
  }
];

export const HOTLINES_DATA: Hotline[] = [
  {
    name: "National Maternal Mental Health Hotline",
    number: "1-833-852-6262",
    sms: "Call or Text 1-833-852-6262 (1-833-TLC-MAMA)",
    hours: "24/7 / Free & Confidential",
    desc: "24/7 confidential support for pregnant, postpartum, and nursing mothers & families in English and Spanish, plus 60+ languages via live interpreters.",
    category: "maternal",
    badge: "Maternal Health"
  },
  {
    name: "Reproductive Health National Helpline",
    number: "1-800-230-7526",
    sms: "Text REPRO to 741741",
    hours: "24/7 / Free & Confidential",
    desc: "Speak or text directly with trained health navigators about reproductive options, contraception, pregnancy testing, and confidential care.",
    category: "reproductive",
    badge: "Reproductive Care"
  },
  {
    name: "Crisis Text Line",
    number: "741741",
    sms: "Text HOME to 741741",
    hours: "24/7 / Free & Confidential",
    desc: "Free 24/7 support for anyone experiencing intense anxiety, emotional distress, or crisis. Connect instantly with a crisis counselor over text.",
    category: "crisis",
    badge: "Crisis Support"
  },
  {
    name: "988 Suicide & Crisis Lifeline",
    number: "988",
    sms: "Call or Text 988",
    hours: "24/7 / Free & Confidential",
    desc: "Free, nationwide 24/7 confidential service providing support for individuals in mental distress or seeking prevention guidance.",
    category: "crisis",
    badge: "Mental Health"
  },
  {
    name: "The Trevor Project Lifeline",
    number: "1-866-488-7386",
    sms: "Text START to 678-678",
    hours: "24/7 / Free & Confidential",
    desc: "Confidential suicide prevention, mental wellness, and crisis intervention specifically dedicated to LGBTQ+ youth and young adults.",
    category: "lgbtq",
    badge: "LGBTQ+ Youth"
  },
  {
    name: "Love is Respect / Domestic & Relationship Safety",
    number: "1-866-331-9474",
    sms: "Text LOVEIS to 22522",
    hours: "24/7 / Multilingual",
    desc: "Confidential teen and youth dating abuse support, relationship safety planning, healthy boundaries, and domestic security.",
    category: "safety",
    badge: "Relationship Safety"
  },
  {
    name: "All-Options Talkline",
    number: "1-888-493-0092",
    hours: "Mon-Fri 10am-1am ET, Sat-Sun 10am-6pm ET",
    desc: "Peer-based peer counseling and non-judgmental support for pregnancy decisions, parenting, birth control, and reproductive loss.",
    category: "reproductive",
    badge: "Peer Support"
  }
];
