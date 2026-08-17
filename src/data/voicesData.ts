export interface YouthVoice {
  id: string;
  quote: string;
  author: string;
  age: number;
  category?: string;
  date?: string;
}

export const INITIAL_VOICES: YouthVoice[] = [
  {
    id: "v-1",
    quote: "I wish someone had told me irregular periods were this common before I panicked for a year straight thinking I was broken.",
    author: "Shared anonymously",
    age: 17,
    category: "Cycle Sense",
    date: "Recent"
  },
  {
    id: "v-2",
    quote: "Coming to a workshop with my sister made it so much less awkward to ask questions. We finally have words to talk about things at home.",
    author: "Shared anonymously",
    age: 15,
    category: "Workshops",
    date: "Recent"
  },
  {
    id: "v-3",
    quote: "Learning about PCOS early meant I didn't spiral into shame when I got diagnosed at 19. I already knew what questions to ask my gynecologist.",
    author: "Shared anonymously",
    age: 20,
    category: "Body Conditions",
    date: "Recent"
  },
  {
    id: "v-4",
    quote: "As a student athlete, my coach never talked about periods. ReproUs taught me how to fuel my body properly instead of passing out from iron deficiency.",
    author: "Shared anonymously",
    age: 18,
    category: "Play Strong",
    date: "Recent"
  },
  {
    id: "v-5",
    quote: "My parents only spoke Spanish and sex ed at school was absent. Finding resources in our language changed everything for my whole family.",
    author: "Shared anonymously",
    age: 21,
    category: "Language Access",
    date: "Recent"
  }
];
