// Every project on the site. To add one: add an entry here and drop a
// 1440x900 screenshot in public/work/<slug>.png. The order here is the order
// on the site; the first FEATURED_COUNT appear on the home page.

export type Project = {
  slug: string;
  name: string;
  kind: string;
  blurb: string;
  tags: string[];
  url: string;
  repo: string;
  screenshot: string;
};

const FEATURED_COUNT = 3;

export const projects: Project[] = [
  {
    slug: "regear",
    name: "ReGear",
    kind: "Marketplace MVP",
    blurb:
      "A marketplace for used electronics where every listing carries a structured condition report instead of a vague description.",
    tags: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "Prisma", "OAuth", "Supabase", "Leaflet"],
    url: "https://regear-alpha.vercel.app/",
    repo: "https://github.com/NicholasSalim/ReGear",
    screenshot: "/work/regear.png",
  },
  {
    slug: "tldwatch",
    name: "TLDWatch",
    kind: "AI summarization app",
    blurb:
      "Paste a YouTube link, long text or a file and get a summary you can read or listen to, in about a minute.",
    tags: ["Next.js", "Tailwind CSS", "Gemini API", "ElevenLabs API", "Supabase", "OAuth"],
    url: "https://tldwatch.vercel.app/",
    repo: "https://github.com/NicholasSalim/TLDWatch",
    screenshot: "/work/tldwatch.png",
  },
  {
    slug: "warroomstats",
    name: "WarRoomStats",
    kind: "API-driven stats dashboard",
    blurb:
      "Clan, war and player stats for Clash of Clans, pulled live from the official game API and cached so pages stay quick.",
    tags: ["Next.js", "Tailwind CSS", "REST API", "Redis", "Caching", "Rate limiting"],
    url: "https://warroomstats-alpha.vercel.app/",
    repo: "https://github.com/NicholasSalim/WarRoomStats",
    screenshot: "/work/warroomstats.png",
  },
];

export const featuredProjects = projects.slice(0, FEATURED_COUNT);
