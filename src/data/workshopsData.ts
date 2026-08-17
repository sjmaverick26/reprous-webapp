export interface WorkshopSession {
  id: string;
  date: string;
  time: string;
  location: string;
  address: string;
  spotsLeft: string;
  isOnline: boolean;
  topic: string;
}

export interface WorkshopReview {
  quote: string;
  attendee: string;
  age: number;
}

export const WORKSHOP_STEPS = [
  {
    step: 1,
    title: "Show up, no prep needed",
    desc: "Walk in any time in the first 10 minutes — nothing to bring, nothing to study."
  },
  {
    step: 2,
    title: "Interactive lesson",
    desc: "A facilitator walks through one topic using visuals, models, and real examples — not a boring lecture."
  },
  {
    step: 3,
    title: "Open & Anonymous Q&A",
    desc: "Anonymous question cards — ask anything, out loud or dropped into our private question box."
  },
  {
    step: 4,
    title: "Take-home resources",
    desc: "A printed pocket guide plus direct contact info if you think of questions later."
  }
];

export const SAMPLE_AGENDA = [
  { time: "6:00 PM", title: "Doors open & Welcome", detail: "Grab a seat, free healthy snacks and drinks available" },
  { time: "6:10 PM", title: "Topic of the day", detail: "This session: Cycle Sense, pain management & myths busted" },
  { time: "6:45 PM", title: "Small group breakout (optional)", detail: "Hands-on activities — or just sit back and listen" },
  { time: "7:10 PM", title: "Anonymous Q&A Box", detail: "Every question submitted on paper gets a direct, honest answer" },
  { time: "7:25 PM", title: "Resources & Wrap-Up", detail: "Free take-home guide + how to stay connected" }
];

export const WORKSHOP_REVIEWS: WorkshopReview[] = [
  { quote: "I went in nervous and left actually laughing. Way less awkward than I thought.", attendee: "Attendee", age: 16 },
  { quote: "The facilitator answered my anonymous question so honestly I almost teared up.", attendee: "Attendee", age: 19 },
  { quote: "Brought my little sister. We talked the whole car ride home about everything we learned.", attendee: "Attendee", age: 21 },
  { quote: "Nobody made me feel stupid for asking basic questions about my own anatomy.", attendee: "Attendee", age: 17 }
];

export const UPCOMING_SESSIONS: WorkshopSession[] = [
  {
    id: "session-1",
    date: "Aug 12",
    time: "6:00 PM – 7:30 PM",
    location: "Community Center · Room B",
    address: "450 Main St, Central City",
    spotsLeft: "8 spots left",
    isOnline: false,
    topic: "Cycle Sense & Pain Management"
  },
  {
    id: "session-2",
    date: "Aug 19",
    time: "5:30 PM – 7:00 PM",
    location: "Eastside Public Library",
    address: "1200 MLK Jr Blvd, Eastside",
    spotsLeft: "Open enrollment",
    isOnline: false,
    topic: "Body Basics & Anatomy 101"
  },
  {
    id: "session-3",
    date: "Aug 26",
    time: "6:30 PM – 7:45 PM",
    location: "Online · Live Interactive Zoom",
    address: "Zoom link sent upon RSVP",
    spotsLeft: "Open enrollment",
    isOnline: true,
    topic: "Real Talk: STIs, Consent & Safe Choices"
  }
];
