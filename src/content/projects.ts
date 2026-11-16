// Every project on the site. To add one: add an entry here and drop a
// 1440x900 screenshot in public/work/<slug>.png. The order here is the order
// on the site; the first FEATURED_COUNT appear on the home page.

export type Highlight = {
  title: string;
  body: string;
  tech: string[];
};

export type Project = {
  slug: string;
  name: string;
  kind: string;
  blurb: string;
  tags: string[];
  url: string;
  repo: string;
  screenshot: string;
  highlights: Highlight[];
};

export const FEATURED_COUNT = 3;

export const projects: Project[] = [
  {
    slug: "regear",
    name: "ReGear",
    kind: "Marketplace MVP",
    blurb:
      "A marketplace for used electronics where every listing carries a structured condition report instead of a vague description.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Zod"],
    url: "https://regear-alpha.vercel.app/",
    repo: "https://github.com/NicholasSalim/ReGear",
    screenshot: "/work/regear.png",
    highlights: [
      {
        title: "Condition reports, not descriptions",
        body: "Each category has its own spec fields and checklist. Sellers grade every check, battery health and cosmetics, and the validation rejects reports that contradict themselves, like a failed check graded \"Like New\".",
        tech: ["TypeScript", "Zod"],
      },
      {
        title: "An item can't be sold twice",
        body: "Checkout reserves the item in a single database transaction. Payment sits in escrow until the buyer accepts the item, unpaid orders expire after 30 minutes, and returns and disputes freeze the payout.",
        tech: ["PostgreSQL", "Prisma"],
      },
      {
        title: "Search that search engines can read",
        body: "Filters are plain forms, so they work without JavaScript and every result page has a crawlable URL. Trigram indexes keep \"contains\" searches fast as listings grow.",
        tech: ["Server Components", "pg_trgm"],
      },
      {
        title: "Light, safe images",
        body: "Uploads are validated, re-encoded to WebP and stripped of metadata, then served as AVIF or WebP at the right size for each screen.",
        tech: ["sharp", "next/image"],
      },
      {
        title: "Trust built in",
        body: "Sellers verify with an ID document kept in private storage, and only its last four characters are stored. Admins work from a review queue, dispute threads and an audit log.",
        tech: ["Private storage", "Audit log"],
      },
      {
        title: "Tested against a real database",
        body: "Integration tests run against a migrated PostgreSQL database, not mocks. The site is in Indonesian and English.",
        tech: ["Vitest", "i18n"],
      },
    ],
  },
  {
    slug: "tldwatch",
    name: "TLDWatch",
    kind: "AI summarization app",
    blurb:
      "Paste a YouTube link, long text or a file and get a summary you can read or listen to, in about a minute.",
    tags: ["Next.js", "Supabase", "LLM APIs", "Text-to-speech"],
    url: "https://tldwatch.vercel.app/",
    repo: "https://github.com/NicholasSalim/TLDWatch",
    screenshot: "/work/tldwatch.png",
    highlights: [
      {
        title: "An LLM that watches the video",
        body: "Gemini reads the video, PDF, image or text and writes three summary lengths with key points, timestamps or page references, and a verdict on whether the original is worth your time.",
        tech: ["Gemini API", "YouTube Data API"],
      },
      {
        title: "Listen instead of read",
        body: "Summaries can be read aloud by the device's own voices, or by natural AI voices for signed-in users.",
        tech: ["ElevenLabs", "Web Speech API"],
      },
      {
        title: "Rules that don't depend on any vendor",
        body: "Limits, ownership and file checks live in a framework-free core. Every outside service sits behind an interface, so the tests run against in-memory fakes and never call an API.",
        tech: ["Ports and adapters", "Vitest"],
      },
      {
        title: "Costs kept in check",
        body: "A YouTube summary is made once and shared by link. Daily limits apply per guest, per network and per member, with a global cap on video minutes and voice characters.",
        tech: ["Supabase Postgres", "Signed cookies"],
      },
      {
        title: "Uploads handled carefully",
        body: "Files are checked by their contents in the browser and again on the server, stored privately only while they're summarized, then deleted. A daily job cleans up anything left behind.",
        tech: ["Supabase Storage", "Vercel Cron"],
      },
      {
        title: "Checked on every push",
        body: "GitHub Actions runs the type check, lint and tests on every pull request and every push to main.",
        tech: ["GitHub Actions"],
      },
    ],
  },
  {
    slug: "warroomstats",
    name: "WarRoomStats",
    kind: "API-driven stats dashboard",
    blurb:
      "Clan, war and player stats for Clash of Clans, pulled live from the official game API and cached so pages stay quick.",
    tags: ["Next.js", "REST API", "Caching", "Playwright"],
    url: "https://warroomstats-alpha.vercel.app/",
    repo: "https://github.com/NicholasSalim/WarRoomStats",
    screenshot: "/work/warroomstats.png",
    highlights: [
      {
        title: "One cache for every request",
        body: "Every API call goes through a single cache boundary, with a lifetime set per endpoint and a short one for failures. Different spellings of the same clan tag share one cache entry and one upstream call.",
        tech: ["Next.js Cache Components", "cacheLife"],
      },
      {
        title: "Pages that stream in",
        body: "Each page sends its layout straight away and streams the slower stats in as they arrive, so nothing waits on the slowest call.",
        tech: ["React Suspense", "Streaming"],
      },
      {
        title: "Nothing unchecked reaches a page",
        body: "Every API response is validated against a schema. Errors come back as typed results, so each page shows a specific message instead of crashing.",
        tech: ["Zod", "TypeScript"],
      },
      {
        title: "The API token stays on the server",
        body: "The API client is server-only, so the token never reaches the browser. Each visitor's IP is rate limited before requests reach the API.",
        tech: ["server-only", "Proxy rate limiting"],
      },
      {
        title: "Built and tested without the real API",
        body: "A fixture mode serves recorded API data, so development and end-to-end tests run without a token. The build refuses to ship to Vercel with fixtures switched on.",
        tech: ["Playwright", "Fixtures"],
      },
      {
        title: "Checked on every push",
        body: "GitHub Actions runs unit tests, type checks and lint on every push.",
        tech: ["GitHub Actions", "Vitest"],
      },
    ],
  },
];

export function featuredProjects(list: Project[] = projects): Project[] {
  return list.slice(0, FEATURED_COUNT);
}

export function hasMoreProjects(list: Project[] = projects): boolean {
  return list.length > FEATURED_COUNT;
}

export function getProject(slug: string, list: Project[] = projects): Project | undefined {
  return list.find((p) => p.slug === slug);
}
