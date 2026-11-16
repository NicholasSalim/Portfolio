import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.name}, ${project.kind}`,
    description: project.blurb,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { images: [{ url: project.screenshot, width: 1440, height: 900 }] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="mx-auto max-w-6xl px-4 pt-6 pb-24 sm:px-8">
      <Link href="/#work" className="text-[15px] text-muted hover:text-fg">
        Back to work
      </Link>

      <header className="mt-10 grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
        <div>
          <p className="text-[15px] text-mint">{project.kind}</p>
          <h1 className="mt-2 font-display text-[clamp(48px,7vw,104px)] leading-none font-light tracking-tight">
            {project.name}
          </h1>
        </div>
        <div>
          <p className="text-lg leading-relaxed text-muted">{project.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-[10px] bg-mint px-4.5 py-2.75 text-[15px] font-medium text-mint-ink transition-opacity hover:opacity-90"
            >
              Open live site
            </a>
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="rounded-[10px] border border-line px-4.5 py-2.75 text-[15px] transition-colors hover:border-mint"
            >
              Source on GitHub
            </a>
          </div>
        </div>
      </header>

      <div className="relative mt-14 aspect-16/10 overflow-hidden rounded-[22px] border border-line">
        <Image
          src={project.screenshot}
          alt={`${project.name} home page`}
          fill
          priority
          sizes="(min-width: 1152px) 1088px, 100vw"
          className="object-cover object-top"
        />
      </div>

      <section className="mt-24" aria-labelledby="different">
        <h2 id="different" className="font-display text-[clamp(30px,3.6vw,48px)] font-light tracking-tight">
          What makes it different
        </h2>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line md:grid-cols-2">
          {project.highlights.map((h) => (
            <li key={h.title} className="flex flex-col bg-panel p-7">
              <h3 className="font-display text-2xl">{h.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{h.body}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label="Technology">
                {h.tech.map((t) => (
                  <li key={t} className="rounded-lg border border-mint/40 px-3 py-1 text-[13px] text-mint">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8" aria-label="Built with">
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li key={t} className="rounded-lg bg-panel px-3 py-1.5 text-[13px] text-muted">
              {t}
            </li>
          ))}
        </ul>
        {next !== project && (
          <Link href={`/work/${next.slug}`} className="group text-right">
            <span className="block text-sm text-muted">Next project</span>
            <span className="font-display text-2xl group-hover:text-mint">{next.name}</span>
          </Link>
        )}
      </section>
    </article>
  );
}
