import Link from "next/link";
import { PipelineGraph } from "@/components/pipeline-graph";
import { ProjectSheet } from "@/components/project-sheet";
import { pipeline } from "@/content/pipeline";
import { featuredProjects, hasMoreProjects } from "@/content/projects";
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
  const contact = [
    site.email && { label: "Email", href: `mailto:${site.email}`, text: site.email },
    { label: "GitHub", href: site.github, text: site.github.replace("https://", "") },
    site.linkedin && { label: "LinkedIn", href: site.linkedin, text: site.linkedin.replace(/^https:\/\/(www\.)?/, "") },
  ].filter(Boolean) as { label: string; href: string; text: string }[];

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
          I&apos;m {site.name}, an {site.role}. I take web apps from idea to production with coding agents, through the
          same pipeline every time.
        </p>
        <div className="mt-14 sm:mt-16">
          <PipelineGraph />
        </div>
      </section>

      <section id="work" className="scroll-mt-8 pt-28 pb-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className={sectionHeading}>What came out</h2>
            <p className="mt-3 text-muted">Each one is live. Open one to see what makes it different.</p>
          </div>
          {hasMoreProjects() && (
            <Link href="/work" className="text-[15px] text-mint hover:underline">
              More projects
            </Link>
          )}
        </div>
        <div className="mt-12">
          {featured.map((p, i) => (
            <ProjectSheet key={p.slug} project={p} index={i} priority={i === 0} />
          ))}
        </div>
      </section>

      <section id="how-i-ship" className="scroll-mt-8 py-24">
        <h2 className={sectionHeading}>How I ship</h2>
        <p className="mt-3 max-w-[38em] text-muted">
          The agents write the code. I decide what gets built, define what &quot;working&quot; means, and make sure
          nothing ships until it is.
        </p>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pipeline.map((step, i) => (
            <li key={step.name} className="flex flex-col bg-panel p-6">
              <span className="font-display text-sm text-mint">{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl">{step.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{step.detail}</p>
              <p className="mt-auto pt-5 text-[13px] text-fg/80">{step.tools.join(", ")}</p>
            </li>
          ))}
          <li className="hidden bg-bg lg:block" aria-hidden="true" />
        </ol>
      </section>

      <section id="skills" className="py-24">
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

      <section id="about" className="grid scroll-mt-8 gap-12 py-24 md:grid-cols-2">
        <div>
          <h2 className={sectionHeading}>About</h2>
          <p className="mt-6 max-w-[34em] text-lg leading-relaxed text-muted">
            I build software by directing coding agents rather than typing every line myself. My job is the part agents
            can&apos;t do alone: deciding what to build, writing it down precisely, defining the tests that prove it
            works, and refusing to ship until it does. Every project here went from an idea to a live, tested app that
            way.
          </p>
        </div>
        <div id="contact" className="scroll-mt-8">
          <h2 className={sectionHeading}>Get in touch</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {contact.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="flex items-baseline justify-between gap-6 py-4 transition-colors hover:text-mint"
                >
                  <span className="font-display text-xl">{c.label}</span>
                  <span className="truncate text-[15px] text-muted">{c.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
