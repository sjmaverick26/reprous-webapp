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
    languages: ["English", "Español", "Tiếng Việt"]
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
    languages: ["English", "Español", "Kreyòl", "العربية"]
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
    languages: ["English", "Español"]
  }
];

export const HOTLINES_DATA: Hotline[] = [
  {
    name: "Reproductive Health National Helpline",
    number: "1-800-230-7526",
    sms: "Text REPRO to 741741",
    hours: "24/7 / Free & Confidential",
    desc: "Speak or text directly with trained educators about reproductive health, birth control, and urgent questions."
  },
  {
    name: "Crisis Text Line",
    number: "741741",
    sms: "Text HOME to 741741",
    hours: "24/7 / Free & Confidential",
    desc: "Free, 24/7 support for anyone in crisis. Connect with a crisis counselor over SMS text message."
  },
  {
    name: "The Trevor Project",
    number: "1-866-488-7386",
    sms: "Text START to 678-678",
    hours: "24/7 / Free & Confidential",
    desc: "Confidential suicide prevention and crisis intervention for LGBTQ young people."
  },
  {
    name: "National Domestic & Relationship Abuse Hotline",
    number: "1-800-799-7233",
    sms: "Text START to 88788",
    hours: "24/7 / Multilingual",
    desc: "Confidential assistance, safety planning, and resources for safe relationships."
  }
];
