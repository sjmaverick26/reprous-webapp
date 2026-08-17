export interface FAQItem {
  id: string;
  category: "cycles" | "privacy" | "workshops" | "general" | "health";
  question: string;
  answer: string;
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-1",
    category: "cycles",
    question: "Is it normal for my cycle to be irregular?",
    answer: "Very common, especially in the first couple of years after your period starts. The brain-ovary hormonal axis takes time to establish a predictable rhythm. If it has been irregular for a long stretch (over 3+ months) or comes with severe pain, it's worth a checkup — but occasional irregularity on its own usually isn't a red flag."
  },
  {
    id: "faq-2",
    category: "privacy",
    question: "Can I ask something anonymously?",
    answer: "Yes — every question submitted to ReproUs is 100% anonymous by default. No account, email, or real name is ever required. Our medical review team answers questions directly on this page to help everyone."
  },
  {
    id: "faq-3",
    category: "workshops",
    question: "Do I need my parent's permission to attend a workshop?",
    answer: "No. Our community workshops are completely open and free to attend for youth and young adults, with no permission slips or prior sign-ups required. Walk-ins are always welcome."
  },
  {
    id: "faq-4",
    category: "general",
    question: "What if I don't see my question here?",
    answer: "Submit your question using the form below! Our team reviews submissions weekly and provides plain-language answers. Plus, your question might be added to our library to help the next person who wonders the exact same thing."
  },
  {
    id: "faq-5",
    category: "health",
    question: "How do I know if my cramps are 'too bad'?",
    answer: "Mild to moderate cramping manageable with heat pads or standard over-the-counter pain relievers is common. However, if your pain causes you to miss school or work, leaves you bedridden, or doesn't respond to ibuprofen/naproxen, that is severe pain that should be checked for conditions like endometriosis or fibroids."
  },
  {
    id: "faq-6",
    category: "health",
    question: "How often should I get tested for STIs?",
    answer: "Healthcare guidelines recommend annual screening for sexually active young adults under 25, or whenever you start seeing a new sexual partner. Most tests are simple urine samples or quick swabs."
  },
  {
    id: "faq-7",
    category: "privacy",
    question: "Are reproductive healthcare clinic visits confidential for minors?",
    answer: "In most states and jurisdictions, Title X funded family planning clinics provide confidential reproductive health services, STI testing, and birth control counseling to teens without notifying parents. You can always ask the clinic staff about their confidentiality policies when you check in."
  }
];
