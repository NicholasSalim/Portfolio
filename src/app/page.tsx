import Link from "next/link";
import { ContactIcons } from "@/components/contact-icons";
import { PipelineGraph } from "@/components/pipeline-graph";
import { ProjectSheet } from "@/components/project-sheet";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";

const skills: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { group: "Backend and data", items: ["Node.js", "PostgreSQL", "Supabase", "Prisma", "REST APIs"] },
  { group: "AI", items: ["LLM APIs", "Text-to-speech"] },
  { group: "Agentic workflow", items: ["Coding agents", "Agent skills", "MCP"] },
  { group: "Shipping", items: ["Git", "GitHub Actions", "Vercel", "Vitest", "Playwright"] },
];

const sectionHeading = "font-display text-[clamp(34px,4vw,56px)] font-light tracking-tight";

export default function Home() {
  const featured = featuredProjects();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8">
      <section className="pt-14 pb-10 text-center sm:pt-20">
        <p className="mb-6 inline-flex items-center gap-2.5 text-[15px] text-mint">
          <span className="size-2 rounded-full bg-mint shadow-[0_0_0_4px_rgb(126_220_192/0.15)]" aria-hidden="true" />
          {site.availability}
        </p>
        <h1 className="mx-auto max-w-[13ch] font-display text-[clamp(44px,6.2vw,92px)] leading-none font-light tracking-tight">
          Ideas in, production apps out.
        </h1>
        <p className="mx-auto mt-7 max-w-[34em] text-lg leading-relaxed text-muted">
          Hello, I&apos;m {site.name}. I take web apps from idea to production, through the same pipeline every time.
        </p>
        <div className="mt-14 sm:mt-16">
          <PipelineGraph />
        </div>
      </section>

      <section id="work" className="scroll-mt-24 pt-28 pb-10">
        <h2 className={sectionHeading}>What came out</h2>
        <p className="mt-3 text-muted">Each one is live, with its source on GitHub.</p>
        <div className="mt-12">
          {featured.map((p, i) => (
            <ProjectSheet key={p.slug} project={p} index={i} priority={i === 0} />
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href="/work"
            className="rounded-[10px] border border-line px-5 py-3 text-[15px] transition-colors hover:border-mint hover:text-mint"
          >
            More projects
          </Link>
        </div>
      </section>

      <section id="stack" className="scroll-mt-24 py-24">
        <h2 className={sectionHeading}>What I work with</h2>
        <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {skills.map((s) => (
            <div key={s.group}>
              <dt className="font-display text-lg">{s.group}</dt>
              <dd className="mt-3">
                <ul className="space-y-1.5 text-[15px] text-muted">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="about" className="grid scroll-mt-24 gap-12 py-24 md:grid-cols-2">
        <div>
          <h2 className={sectionHeading}>About</h2>
          <p className="mt-6 max-w-[24em] font-display text-2xl leading-snug">
            Full-stack, from the database to the deploy.
          </p>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-muted">
            I&apos;m a full-stack developer building web apps: the interface, the API, the data model, authentication
            and app security. I work with coding agents, skills and MCP, helping me ship faster while specs, tests and
            CI keep every release reliable.
          </p>
        </div>
        <div id="contact" className="scroll-mt-24">
          <h2 className={sectionHeading}>Get in touch</h2>
          <ContactIcons />
        </div>
      </section>
    </div>
  );
}
