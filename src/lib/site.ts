export const SITE = {
  name: "Artes de Ilusión",
  host: "artesdeilusion.com",
  url: "https://artesdeilusion.com",
  title: "Artes de Ilusión — AI and software companies",
  tagline: "Building and running companies.",
  subtitle:
    "An operating group that builds, backs, and runs companies in AI, software, and digital products.",
  email: "info@artesdeilusion.com",
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

export const CITY_PHOTOS = [
  { name: "New York", slug: "new-york", src: "/cities/new-york.jpg" },
  { name: "Dubai", slug: "dubai", src: "/cities/dubai.jpg" },
  { name: "London", slug: "london", src: "/cities/london.jpg" },
  { name: "Istanbul", slug: "istanbul", src: "/cities/istanbul.jpg" },
  { name: "Berlin", slug: "berlin", src: "/cities/berlin.jpg" },
  { name: "Amsterdam", slug: "amsterdam", src: "/cities/amsterdam.jpg" },
  { name: "Madrid", slug: "madrid", src: "/cities/madrid.jpg" },
  { name: "Riyadh", slug: "riyadh", src: "/cities/riyadh.jpg" },
] as const;

export const ABOUT = {
  kicker: "About us",
  title: "Operators at the head of many companies.",
  body: "Artes de Ilusión sits at the head of a portfolio of companies in AI, software, and digital products. We don't only invest — we lead, build, and run them. Most of our time goes into the work itself: product, engineering, hiring, and the slow job of turning an idea into a company that stands on its own.",
  whatWeDo:
    "We build and operate companies across software and AI. For some we are the founders; for others we come in early and take on real responsibility. Either way the team handles product, engineering, and day-to-day execution across the group, instead of sitting on the outside with a quarterly call. When a company needs a hire, a decision, or a rewrite, we are in the room for it.",
  whyAi:
    "AI is a core part of what we do, not a label we attach to everything. We start AI companies, back them, and run them with the same standards as the rest of the group: real users, honest metrics, and software that works when no one is watching. We are more interested in products that quietly do a job every day than in demos that look clever once.",
  pillars: [
    {
      title: "Leadership",
      body: "We sit at the head of the companies we run and make the calls that matter, not just the ones that are easy.",
    },
    {
      title: "Execution",
      body: "Plans only count when they ship. We measure ourselves by what reaches users, not by what reaches a slide.",
    },
    {
      title: "Long-term building",
      body: "We build for years, not for a single launch. The companies we care about are the ones still growing long after the first release.",
    },
  ],
} as const;

export const SECTORS = {
  kicker: "Sectors we operate in",
  intro:
    "We lead companies across technology and digital industries, with a particular weight on AI and software. The common thread is simple: we go where we can do the work ourselves, and where staying close to product and operations actually changes the outcome.",
  items: [
    {
      title: "Artificial Intelligence",
      body: "AI products, models, and automation companies we found and run — built for a specific job, measured by whether they finish it.",
    },
    {
      title: "Software & SaaS",
      body: "Software businesses and platforms under our group, where steady product work compounds into something durable.",
    },
    {
      title: "Digital Products",
      body: "Consumer and B2B digital products we operate day to day, from first users to a team that can carry them.",
    },
    {
      title: "Technology Operations",
      body: "The systems, infrastructure, and teams that keep our companies running — the unglamorous layer that decides whether the rest holds.",
    },
    {
      title: "Venture Building",
      body: "New companies started inside the group, given room and support, then grown until they stand on their own.",
    },
    {
      title: "Brand & Experience",
      body: "Identity, product design, and digital experience across the portfolio, so the work looks as considered as it is built.",
    },
  ],
} as const;

export const RUN_BUILD = {
  kicker: "What we run & build",
  items: [
    {
      title: "AI startups",
      body: "AI companies we found, fund, and operate — from the first idea to a product in the market.",
    },
    {
      title: "Software",
      body: "Software businesses we own and run under our umbrella, improved release by release.",
    },
    {
      title: "Operating companies",
      body: "Businesses we lead every day — strategy, product, team, and delivery, not just capital.",
    },
    {
      title: "Technology",
      body: "Platforms, tools, and systems that power our portfolio and make each new company faster to start.",
    },
    {
      title: "New ventures",
      body: "Ideas we start from scratch and grow into standalone companies with their own teams.",
    },
  ],
} as const;

export const APPROACH = {
  kicker: "Investments",
  title: "How we invest, and how we work.",
  intro:
    "A longer read on the way we choose where to put money and time, what we do once we are in, and the standards we hold ourselves to.",
  lead: "We are an operating group, not a passive fund. Capital is where a relationship starts, not where it ends. Most of what we bring shows up after the money does — in the product decisions, the hiring, and the quiet, repeated work of making a company run. What follows is how we actually do it.",
  sections: [
    {
      heading: "We invest where we can do the work",
      body: [
        "We only commit when we can contribute more than money. If we cannot help build the product, shape the team, or improve how the company operates, we are the wrong partner, and we say so early. That one rule removes most of what crosses our desk, and it keeps the rest honest.",
        "This also means we stay inside a circle we understand. We go deep in AI, software, and digital products because that is where our own hands are useful. When something sits far outside that circle, we would rather pass than pretend, however good the opportunity looks on paper.",
      ],
    },
    {
      heading: "We read a company by its operations",
      body: [
        "Before we decide anything, we look at how the work gets done. How does a change reach users? Who makes the hard calls, and how fast? What breaks when volume doubles? The answers tell us far more than a forecast does, because they describe a company as it is rather than as it hopes to be.",
        "We spend time with the people doing the work, not only the people presenting it. A team that is clear about what is broken is a better sign than one with an answer for everything. We are drawn to groups that treat their own problems honestly, because that is the habit that compounds.",
      ],
    },
    {
      heading: "We stay in the room",
      body: [
        "Once we are in, we work. That can mean sitting with the product, helping with a difficult hire, rewriting a process that no longer fits, or simply being available when a decision cannot wait. We are not there to supervise from a distance; we are there to carry part of the load.",
        "We try to be the partner we would want: direct, present, and willing to disagree without drama. Founders keep the wheel. Our job is to make the drive easier and the destination larger, and to be useful on the ordinary days, not only the dramatic ones.",
      ],
    },
    {
      heading: "We build for years",
      body: [
        "We are not looking for a quick exit. The companies we care about are the ones that are still growing long after the first release, and that kind of result rarely arrives on a convenient timeline. We would rather hold something good for a long time than trade it for something merely fast.",
        "A long horizon changes how we behave day to day. We favor durable decisions over clever ones, steady releases over big reveals, and teams that can outlast any single product. Patience is not passivity; it is a bet that consistent work beats bursts of attention.",
      ],
    },
    {
      heading: "We keep few commitments",
      body: [
        "We would rather do a small number of things properly than spread ourselves across many and help with none. A short list is a feature: it means every company gets real attention, and it keeps us honest about what we can actually carry.",
        "When we say no — which is most of the time — it is usually because we could not add enough, not because the idea lacked merit. Focus is the only way we know to keep the promise that we will be genuinely useful rather than politely absent.",
      ],
    },
    {
      heading: "We measure what is real",
      body: [
        "We care about outcomes that hold up: users who come back, products that work under load, teams that keep shipping. Vanity numbers are easy to produce and easy to see through, so we try not to produce them and we try not to be fooled by them.",
        "Inside our companies we push for honest reporting, even when the honest number is uncomfortable. A clear view of what is not working is worth more than a flattering chart, because it is the only thing you can actually act on.",
      ],
    },
    {
      heading: "How to work with us",
      body: [
        "If you are building something in AI, software, or digital products and you want a partner who will be in the work with you, we would like to hear from you. We are most useful early, when direction and execution still matter more than polish.",
        "The simplest way to start is a short, direct note: what you are building, who it is for, and where you are stuck. We read everything, and when there is a real fit, we move quickly.",
      ],
    },
  ],
} as const;

export const SNAPSHOT = [
  { value: "Multi", label: "Companies" },
  { value: "AI", label: "Main focus" },
  { value: "10+", label: "Cities" },
  { value: "Daily", label: "In operations" },
] as const;

export const ALLOCATION = [
  { label: "Artificial Intelligence", weight: 42 },
  { label: "Software & SaaS", weight: 28 },
  { label: "Consumer Digital", weight: 18 },
  { label: "Venture Building", weight: 12 },
] as const;

export const CONTACT_GUIDE = {
  intro:
    "Write with a clear subject, keep it short, and say plainly what you need from us. A few honest lines will always get a better reply than a long, polished one.",
  topics: [
    {
      title: "Investor relations",
      body: "A portfolio overview, a partnership conversation, or a call with the team.",
      subject: "IR — introduction",
    },
    {
      title: "Co-building & ventures",
      body: "New company ideas or partnerships where we can lead product and operations alongside you.",
      subject: "Venture — proposal",
    },
    {
      title: "Holdings & companies",
      body: "Questions about a company in the group. For product support, reach that company directly and you will get there faster.",
      subject: "Holding — [company name]",
    },
    {
      title: "Press & introductions",
      body: "Media, speaking, or introductions. Include context, any deadline, and exactly what you need.",
      subject: "Press — request",
    },
  ],
  how: [
    "Email info@artesdeilusion.com.",
    "Put the topic in the subject line using the guide above.",
    "In a few lines: who you are, why you are writing, and the ask.",
    "Attach only what helps — a short deck or one-pager if needed, nothing more.",
  ],
  note: "We read every message and usually reply within a few business days when there is a clear fit.",
} as const;

export const INVESTORS = {
  kicker: "Investors",
  title: "Work with people who run the companies.",
  body: "We run a portfolio of AI and software companies, and partners deal with the team that builds and operates them — not a slide-only relationship. You get the people making the decisions, speaking plainly about what is working and what is not.",
  note: "Figures show focus mix only. They are not audited financials.",
  stats: [
    { value: "Multi", label: "Operating companies" },
    { value: "AI", label: "Main focus" },
    { value: "10+", label: "Cities we operate from" },
    { value: "Daily", label: "In the work" },
  ],
  points: [
    "Direct access to the operating team, not a layer in between.",
    "Honest updates on the companies we lead and start — the hard parts included.",
    "Open conversations about co-building, capital, and new ventures.",
  ],
  ctaTitle: "Long-term partners only.",
  ctaBody: "If you bring capital or a company worth running together, write to us.",
} as const;
