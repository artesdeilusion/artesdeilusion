export const SITE = {
  name: "Artes de Ilusión",
  host: "artesdeilusion.com",
  url: "https://artesdeilusion.com",
  title: "Artes de Ilusión — AI and software companies",
  tagline: "Building and running companies.",
  subtitle: "A group focused on AI, software, and digital products.",
  email: "info@artesdeilusion.com",
  founded: 2020,
} as const;

export const NAV = [
  { label: "About", href: "/about" },
  { label: "Investments", href: "/investments" },
  { label: "Investors", href: "/investors" },
  { label: "Contact", href: "/contact" },
] as const;

export const CITIES = [
  "ISTANBUL",
  "ANTALYA",
  "LONDON",
  "DUBAI",
  "BERLIN",
  "NEW YORK",
  "MADRID",
  "RIYADH",
  "MOSCOW",
  "AMSTERDAM",
] as const;

export const ABOUT = {
  kicker: "About us",
  title: "Operators at the head of many companies.",
  body: "Artes de Ilusión sits at the head of a portfolio of companies in AI, software, and digital products. We don't just invest — we lead, build, and run them.",
  whatWeDo:
    "We build and operate companies across software and AI. Our team handles product, engineering, and day-to-day execution across the group.",
  whyAi:
    "AI companies are a core part of what we do. We start them, back them, and run them with the same standards as the rest of the group.",
  pillars: [
    {
      title: "Leadership",
      body: "We sit at the head of the companies we run.",
    },
    {
      title: "Execution",
      body: "Plans matter when they ship.",
    },
    {
      title: "Long-term building",
      body: "We build for years, not for a single project.",
    },
  ],
} as const;

export const SECTORS = {
  kicker: "Sectors we operate in",
  intro:
    "We lead companies across technology and digital industries — with a particular focus on AI and software.",
  items: [
    {
      title: "Artificial Intelligence",
      body: "AI products, models, and automation companies we found and run.",
    },
    {
      title: "Software & SaaS",
      body: "Software businesses and platforms under our group.",
    },
    {
      title: "Digital Products",
      body: "Consumer and B2B digital products we operate day to day.",
    },
    {
      title: "Technology Operations",
      body: "The systems, infrastructure, and teams that keep our companies running.",
    },
    {
      title: "Venture Building",
      body: "New companies started inside the group and grown on their own.",
    },
    {
      title: "Brand & Experience",
      body: "Identity, product design, and digital experience across the portfolio.",
    },
  ],
} as const;

export const RUN_BUILD = {
  kicker: "What we run & build",
  items: [
    {
      title: "AI Startups",
      body: "AI companies we found, fund, and operate — from idea to market.",
    },
    {
      title: "Software",
      body: "Software businesses we own and run under our umbrella.",
    },
    {
      title: "Operating Companies",
      body: "Businesses we lead every day — strategy, product, team, and delivery.",
    },
    {
      title: "Technology",
      body: "Platforms, tools, and systems that power our portfolio companies.",
    },
    {
      title: "New Ventures",
      body: "Ideas we start and grow into standalone companies.",
    },
  ],
} as const;

export const PORTFOLIO = {
  kicker: "Investments",
  title: "Where we invest.",
  intro:
    "Short notes on the areas we care about — what is broken, what has to work, and why we stay involved in operations.",
  items: [
    {
      id: "local-commerce",
      sector: "City · Consumer",
      name: "Local commerce & urban demand",
      thesis:
        "In dense neighborhoods, people still find deals through chats, flyers, and half-working apps. Big marketplaces often skip these small, frequent purchases.",
      research: [
        "Students and young professionals usually look at price first, then what friends do. They rarely stay loyal to one app. What works is simple: see the offer, go there, pay less at the counter.",
        "Merchants care about cost and hassle more than flashy metrics. If staff can apply a discount without a long training session, adoption is easier. Maps and local guides help only when they are useful.",
        "We prefer to win one city properly before expanding. That means local partners and steady work on the ground, not only ads.",
      ],
    },
    {
      id: "ai-professional",
      sector: "AI · Professional",
      name: "AI for regulated professional work",
      thesis:
        "Jobs built around documents and rules are poorly served by generic chat tools. Real value is in software that drafts, finds sources, and fits how firms already work.",
      research: [
        "A lot of time goes into first drafts, checking laws or rules, and moving files through official systems. Wrong answers are expensive. So quality of sources, clear citations, and firm controls matter more than a clever chat box.",
        "Local rules and privacy requirements knock out shallow tools early. We look for products built for professionals who need reliability, not novelty.",
        "Once workflows and data connections are in place, switching becomes hard. We invest when the model is part of a full pipeline — draft, research, review, export — not a thin demo.",
      ],
    },
    {
      id: "consumer-health-info",
      sector: "Health · Consumer",
      name: "Consumer health information at the shelf",
      thesis:
        "At the supermarket shelf, labels are long and personal rules are hard to apply quickly. Clear answers at that moment beat another food diary.",
      research: [
        "Most people will not read a full ingredient list when they are in a hurry. They want a straight answer: okay for me or not — in plain language.",
        "The hard part is data: barcodes, ingredients, diet and allergen filters. The app is only useful if that layer is solid and does not overclaim.",
        "Many health apps fail when they become daily homework. We like products that help at the moment of buying, then offer more detail only if the user wants it.",
      ],
    },
    {
      id: "ops-agents",
      sector: "AI · Operations",
      name: "Autonomous agents for operations",
      thesis:
        "Hotels, venues, and ops teams still treat phones and inboxes as if volume never spikes. Voice and message agents help when they finish tasks inside real systems, not when they only bounce people around.",
      research: [
        "Common problems: missed calls at night, rigid phone menus, staff typing the same booking again and again. The point is coverage at peak times, not replacing every human conversation.",
        "People write on many channels. One system with memory and tools beats several separate bots. Connection to CRM and booking systems is what makes a pilot real.",
        "We prefer narrow jobs with clear outcomes you can measure. Wide “AI receptionist for everything” products rarely hold up. We fund cases where the agent can complete the task.",
      ],
    },
    {
      id: "real-economy-services",
      sector: "Services · Real economy",
      name: "Digitised field services",
      thesis:
        "Many on-the-ground services still run on phone calls, unclear prices, and uneven quality. Software that quotes, books, and sends insured crews makes the work repeatable.",
      research: [
        "Buyers and operators complain about the same things: vague quotes, slow booking, uneven results. Clear estimates from simple inputs reduce back-and-forth before anyone is sent out.",
        "Supply is local and often seasonal. What matters is density in specific areas — enough partners and capacity — more than national advertising. Getting a slot quickly matters.",
        "These businesses move slower than pure software, and that is fine. We treat them as operating companies that use software for pricing, scheduling, and trust.",
      ],
    },
  ],
} as const;

export const SNAPSHOT = [
  { value: "2020", label: "Founded" },
  { value: "5", label: "Focus areas" },
  { value: "10+", label: "Cities" },
  { value: "AI", label: "Main focus" },
] as const;

export const ALLOCATION = [
  { label: "Artificial Intelligence", weight: 42 },
  { label: "Software & SaaS", weight: 28 },
  { label: "Consumer Digital", weight: 18 },
  { label: "Venture Building", weight: 12 },
] as const;

export const CONTACT_GUIDE = {
  intro:
    "Write with a clear subject, keep it short, and say what you need from us.",
  topics: [
    {
      title: "Investor relations",
      body: "Portfolio overview, partnership talks, or a call with the team.",
      subject: "IR — introduction",
    },
    {
      title: "Co-building & ventures",
      body: "New company ideas or partnerships where we can lead product and operations.",
      subject: "Venture — proposal",
    },
    {
      title: "Holdings & companies",
      body: "Questions about a company in the group. For product support, contact that company directly.",
      subject: "Holding — [company name]",
    },
    {
      title: "Press & introductions",
      body: "Media, speaking, or introductions. Include context, deadline, and what you need.",
      subject: "Press — request",
    },
  ],
  how: [
    "Email info@artesdeilusion.com.",
    "Put the topic in the subject line using the guide above.",
    "In a few lines: who you are, why you are writing, and the ask.",
    "Attach only what helps — a short deck or one-pager if needed.",
  ],
  note: "We usually reply within a few business days when there is a clear fit.",
} as const;

export const INVESTORS = {
  kicker: "Investors",
  title: "Work with people who run the companies.",
  body: "We run a portfolio of AI and software companies. Partners deal with the team that builds and operates — not a slide-only relationship.",
  note: "Figures show focus mix only. They are not audited financials.",
  stats: [
    { value: "Multi", label: "Operating companies" },
    { value: "AI", label: "Main focus" },
    { value: "10+", label: "Cities we operate from" },
    { value: "2020", label: "Group founded" },
  ],
  points: [
    "Direct access to the operating team.",
    "Updates on companies we lead and start.",
    "Talks on co-building, capital, and new ventures.",
  ],
  ctaTitle: "Long-term partners only.",
  ctaBody: "If you bring capital or a company worth running together, write to us.",
} as const;
