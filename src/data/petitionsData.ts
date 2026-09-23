export interface PetitionItem {
  id: string;
  title: string;
  target: string;
  summary: string;
  fullDemands: string[];
  currentSignatures: number;
  targetSignatures: number;
  legislativeGoalType?: string;
  legislativeMilestone?: string;
  category: "schools" | "policy" | "access" | "healthcare";
  location: string;
  organizer: string;
  realWorldCampaign: string;
  billOrInitiative?: string;
  externalUrl: string;
  petitionPlatform?: string;
  coalitionUrl?: string;
  billUrl?: string;
}

export interface AdvocacyCampaignLink {
  title: string;
  organization: string;
  description: string;
  url: string;
  badge: string;
}

export const PETITIONS_DATA: PetitionItem[] = [
  {
    id: "petition-1",
    title: "Free Menstrual Products in All Public Middle & High Schools",
    target: "State Board of Education & State Legislative Education Committees",
    summary: "Over 1 in 4 students who menstruate report missing school due to lack of access to pads or tampons. We demand fully-stocked, free menstrual product dispensers in every student restroom.",
    fullDemands: [
      "Install and maintain free menstrual hygiene dispensers in all female and gender-neutral student restrooms.",
      "Allocate dedicated recurring state funding for school district product supplies.",
      "Ensure products are available without requiring students to ask the school nurse or main office."
    ],
    currentSignatures: 21840,
    targetSignatures: 25000,
    legislativeGoalType: "State Legislative Hearing Threshold",
    legislativeMilestone: "25,000 constituent signatures to mandate State Legislative Education Committee public testimony and dedicated recurring budget line items.",
    category: "schools",
    location: "Statewide Campaign",
    organizer: "Youth Reproductive Equity Coalition",
    realWorldCampaign: "PERIOD. (The Menstrual Movement) & Alliance for Period Supplies",
    billOrInitiative: "Menstrual Equity for All Act (H.R. 3646 & State Model Legislation)",
    externalUrl: "https://actionnetwork.org/letters/urge-your-legislator-to-support-the-menstrual-equity-for-all-act",
    petitionPlatform: "Action Network",
    coalitionUrl: "https://period.org/take-action",
    billUrl: "https://www.congress.gov/bill/118th-congress/house-bill/3646"
  },
  {
    id: "petition-2",
    title: "Mandate Medically-Accurate, Comprehensive Sex Education Across All Districts",
    target: "State Department of Education & State Senate Education Policy Committee",
    summary: "Every young person deserves honest, science-backed health education that covers consent, puberty, contraception, and healthy relationships — not outdated abstinence-only curriculum.",
    fullDemands: [
      "Standardize statewide curriculum to require medically accurate, age-appropriate reproductive health education.",
      "Mandate comprehensive training for health educators and guest facilitators.",
      "Include topics on consent, mental well-being, healthy relationships, and STI prevention."
    ],
    currentSignatures: 19450,
    targetSignatures: 25000,
    legislativeGoalType: "State Statutory Curriculum Reform Milestone",
    legislativeMilestone: "25,000 verified signatures to mandate legislative committee debate on replacing abstinence-only curricula with statutory comprehensive sex ed standards.",
    category: "policy",
    location: "Statewide / Multi-District",
    organizer: "ReproUs Youth Advocates & Student Leaders",
    realWorldCampaign: "Advocates for Youth & SIECUS (Sex Ed for Social Change)",
    billOrInitiative: "Real Education and Access for Healthy Youth Act (REHYA)",
    externalUrl: "https://actionnetwork.org/petitions/minnesota-needs-real-sex-ed",
    petitionPlatform: "Action Network",
    coalitionUrl: "https://advocatesforyouth.org/issue/sex-education/",
    billUrl: "https://siecus.org/take-action/"
  },
  {
    id: "petition-3",
    title: "Protect & Expand Confidential Healthcare Access for Minors",
    target: "U.S. Department of Health and Human Services (HHS) & State Insurance Commissioners",
    summary: "Fear of breach of privacy prevents thousands of teens from seeking STI testing, birth control, and mental health counseling. We call on clinics and insurers to guarantee total confidentiality for minor care.",
    fullDemands: [
      "Prevent automated Explanation of Benefits (EOB) statements that expose sensitive reproductive services to policyholders.",
      "Ensure zero out-of-pocket copays for confidential adolescent STI and contraceptive visits at community clinics.",
      "Provide youth with clear, transparent privacy guarantees at check-in."
    ],
    currentSignatures: 42380,
    targetSignatures: 50000,
    legislativeGoalType: "Federal Administrative Rulemaking Petition",
    legislativeMilestone: "50,000 signatures for formal petition delivery to the HHS Office for Civil Rights and Title X National Directorate to halt automated billing disclosures.",
    category: "healthcare",
    location: "National Initiative",
    organizer: "Adolescent Health Rights Alliance",
    realWorldCampaign: "National Family Planning & Reproductive Health Association (NFPRHA)",
    billOrInitiative: "Title X Minor Confidentiality Protection Framework & Right to Contraception Act",
    externalUrl: "https://actionnetwork.org/petitions/sign-now-right-to-contraception",
    petitionPlatform: "Action Network",
    coalitionUrl: "https://www.nationalfamilyplanning.org",
    billUrl: "https://www.guttmacher.org/state-policy/explore/overview-minors-consent-law"
  },
  {
    id: "petition-4",
    title: "Expand Free STI Testing & Prevention in Community Youth Centers",
    target: "County Health Departments & Municipal Public Health Oversight Boards",
    summary: "Community centers and after-school hubs should provide barrier-free access to rapid confidential STI testing, barrier methods, and prevention counseling in trusted youth spaces.",
    fullDemands: [
      "Fund mobile community testing clinics at local youth centers and public parks on weekends.",
      "Provide free barrier methods (condoms, dental dams) in all public recreation centers.",
      "Train peer youth educators to conduct stigma-free intake and resource navigation."
    ],
    currentSignatures: 12640,
    targetSignatures: 15000,
    legislativeGoalType: "Municipal Health Budget Allocation Threshold",
    legislativeMilestone: "15,000 signatures to compel City Councils and County Commissioners to allocate dedicated grants for mobile adolescent screening clinics.",
    category: "access",
    location: "City & County Hubs",
    organizer: "Urban Youth Health Project",
    realWorldCampaign: "National Coalition of STD Directors (NCSD) & CDC GetTested",
    billOrInitiative: "Community Adolescent STI Testing & Prevention Grants",
    externalUrl: "https://actionnetwork.org/petitions/minnesota-needs-real-sex-ed",
    petitionPlatform: "Action Network",
    coalitionUrl: "https://www.ncsddc.org",
    billUrl: "https://gettested.cdc.gov"
  },
  {
    id: "petition-5",
    title: "Pass the Federal Menstrual Equity for All Act (H.R. 3646)",
    target: "118th U.S. Congress (House Education and the Workforce & Senate HELP Committees)",
    summary: "Mandate free menstrual hygiene products across public middle and high schools, colleges, federal prisons, and homeless shelters via federal Title I grants.",
    fullDemands: [
      "Provide federal grant assistance through the Department of Education to stock school dispensers.",
      "Incentivize state colleges and universities to provide free pads and tampons in campus buildings.",
      "Require all federal correctional and detention facilities to provide unrationed menstrual supplies."
    ],
    currentSignatures: 86720,
    targetSignatures: 100000,
    legislativeGoalType: "Congressional Floor Markup & Coalition Delivery Goal",
    legislativeMilestone: "100,000 constituent signatures for national coalition delivery to Congressional Leadership ahead of the House Committee on Education and the Workforce markup.",
    category: "policy",
    location: "Federal Legislation (U.S. Capitol)",
    organizer: "Congressional Menstrual Equity Coalition & Rep. Grace Meng",
    realWorldCampaign: "Congress.gov Official Federal Bill Tracker",
    billOrInitiative: "Federal Bill H.R. 3646",
    externalUrl: "https://actionnetwork.org/letters/urge-your-legislator-to-support-the-menstrual-equity-for-all-act",
    petitionPlatform: "Action Network",
    coalitionUrl: "https://period.org/take-action",
    billUrl: "https://www.congress.gov/bill/118th-congress/house-bill/3646"
  },
  {
    id: "petition-6",
    title: "National Student Action: Free Emergency Contraception & Telehealth on Campuses",
    target: "University Boards of Regents & State Higher Education Coordinating Commissions",
    summary: "College students across the country are organizing for 24/7 campus wellness vending machines stocking free or at-cost emergency contraception and confidential telehealth access.",
    fullDemands: [
      "Install accessible campus wellness vending machines with emergency contraception and barrier methods.",
      "Guarantee confidential adolescent and student reproductive health telehealth visits without parental billing alerts.",
      "Provide free rapid fentanyl test strips and emergency overdose reversal (Narcan) in student unions."
    ],
    currentSignatures: 21150,
    targetSignatures: 25000,
    legislativeGoalType: "Higher Education System-Wide Policy Threshold",
    legislativeMilestone: "25,000 collegiate signatures to mandate University Boards of Regents votes on installing 24/7 wellness vending machines and barrier-free contraception.",
    category: "access",
    location: "Nationwide College Campuses",
    organizer: "Student Reproductive Rights Campus Coalition",
    realWorldCampaign: "Free The Pill Campus Action & Advocates for Youth",
    billOrInitiative: "Campus Reproductive Equity Action Network",
    externalUrl: "https://www.change.org/p/uic-administration-put-free-menstrual-products-in-bathrooms-on-campus",
    petitionPlatform: "Change.org",
    coalitionUrl: "https://advocatesforyouth.org/campaigns/free-the-pill/",
    billUrl: "https://actionnetwork.org/petitions/sign-now-right-to-contraception"
  },
  {
    id: "petition-7",
    title: "Pass the Black Maternal Health Momnibus Act & Fund 365-Day Postpartum Medicaid",
    target: "118th U.S. Congress & Federal Department of Health and Human Services (HHS)",
    summary: "Over 84% of maternal deaths in the U.S. are clinically preventable. Black women are 3 to 4 times more likely to die from pregnancy complications due to systemic dismissal and implicit bias. We call on Congress to pass the complete Momnibus legislative package, mandate 365-day postpartum Medicaid across all states, and fund community doulas.",
    fullDemands: [
      "Pass all 13 bills in the bipartisan Black Maternal Health Momnibus Act (H.R. 3305 / S. 1606).",
      "Mandate continuous 12-month postpartum Medicaid coverage across all 50 states and territories.",
      "Fund independent Maternal Mortality Review Committees (MMRCs) and hospital anti-bias accountability programs (inspired by 4Kira4Moms).",
      "Invest in community birth centers, certified midwives, and perinatal mental health infrastructure."
    ],
    currentSignatures: 47010,
    targetSignatures: 51200,
    legislativeGoalType: "Official Action Network Legislative Campaign Goal",
    legislativeMilestone: "51,200 signatures for official national petition presentation to the Congressional Black Maternal Health Caucus and HHS Secretary to enact all 13 Momnibus titles (H.R. 3305).",
    category: "policy",
    location: "Federal / U.S. Capitol",
    organizer: "Black Mamas Matter Alliance & 4Kira4Moms Youth Advocates",
    realWorldCampaign: "Black Mamas Matter Alliance (BMMA) & 4Kira4Moms",
    billOrInitiative: "Black Maternal Health Momnibus Act (H.R. 3305)",
    externalUrl: "https://actionnetwork.org/forms/sign-the-petition-support-saving-black-lives-support-the-black-maternal-health-momnibus-act",
    petitionPlatform: "Action Network",
    coalitionUrl: "https://www.4kira4moms.com/get-involved",
    billUrl: "https://www.congress.gov/bill/118th-congress/house-bill/3305"
  }
];

export const REAL_WORLD_ADVOCACY_LINKS: AdvocacyCampaignLink[] = [
  {
    title: "Black Maternal Health Momnibus Act (H.R. 3305 / S. 1606)",
    organization: "Black Mamas Matter Alliance & 4Kira4Moms",
    description: "Landmark federal legislation to eliminate maternal mortality disparities, fund community doulas, and safeguard mothers and families. Directly sign the national petition form.",
    url: "https://actionnetwork.org/forms/sign-the-petition-support-saving-black-lives-support-the-black-maternal-health-momnibus-act",
    badge: "Sign Live (Action Network)",
  },
  {
    title: "Menstrual Equity for All Act & Free School Supplies",
    organization: "PERIOD.org & Alliance for Period Supplies",
    description: "Urge your federal representatives to fund free menstrual products in public school restrooms and Title I programs via pre-formatted legislative letters.",
    url: "https://actionnetwork.org/letters/urge-your-legislator-to-support-the-menstrual-equity-for-all-act",
    badge: "Send Letter (Action Network)",
  },
  {
    title: "Comprehensive Medically Accurate Sex Ed Campaign",
    organization: "Advocates for Youth & SIECUS",
    description: "Demand youth access to evidence-backed, trauma-informed, inclusive sex education in all public schools and community health centers.",
    url: "https://actionnetwork.org/petitions/minnesota-needs-real-sex-ed",
    badge: "Sign Live (Action Network)",
  },
  {
    title: "Right to Contraception & Minor Healthcare Privacy",
    organization: "NFPRHA & Adolescent Health Rights Alliance",
    description: "National campaign safeguarding statutory rights to birth control, emergency contraception, and confidential youth healthcare access without disclosure.",
    url: "https://actionnetwork.org/petitions/sign-now-right-to-contraception",
    badge: "Sign Live (Action Network)",
  },
  {
    title: "National Coalition of STD Directors (NCSD) Youth Action",
    organization: "NCSD Public Health Coalition",
    description: "Public health advocacy fighting for congressional funding for adolescent rapid STI screening, community youth clinics, and barrier access.",
    url: "https://ncsddc.org",
    badge: "Advocacy Coalition",
  },
  {
    title: "Change.org Reproductive Health & Student Rights Hub",
    organization: "Change.org Youth Coalition",
    description: "Explore, sign, and launch citizen-led petitions for campus menstrual dispensers, Title IX protection, and youth reproductive healthcare equity nationwide.",
    url: "https://www.change.org/t/reproductive-rights-en-us",
    badge: "Browse Change.org",
  },
  {
    title: "Congress.gov H.R. 3646 Legislative Bill Tracker",
    organization: "U.S. House of Representatives",
    description: "Read official bill text, co-sponsors, committee hearings, and legislative status for the Menstrual Equity for All Act directly on Congress.gov.",
    url: "https://www.congress.gov/bill/118th-congress/house-bill/3646",
    badge: "Federal Tracker",
  },
];
