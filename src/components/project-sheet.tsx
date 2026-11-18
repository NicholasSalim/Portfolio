import Image from "next/image";
import type { Project } from "@/content/projects";
import { ProjectLinks, ProjectTags } from "./project-meta";

// One sheet of the stacked deck on the home page. Sheets are sticky with a
// slightly larger offset each, so they pile up as you scroll.
export function ProjectSheet({ project, index, priority }: { project: Project; index: number; priority?: boolean }) {
  return (
    <article
      style={{ top: `${88 + index * 24}px` }}
      className="sticky mb-10 grid gap-8 rounded-[22px] border border-line bg-panel p-6 shadow-[0_-20px_60px_-24px_rgb(0_0_0/0.45)] sm:p-7 md:min-h-[460px] md:grid-cols-[1fr_1.45fr]"
    >
      <div className="flex flex-col">
        <p className="text-[15px] text-mint">{project.kind}</p>
        <h3 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-[44px]">{project.name}</h3>
        <p className="mt-4 leading-relaxed text-muted">{project.blurb}</p>
        <ProjectTags project={project} size="large" />
        <ProjectLinks project={project} size="large" />
      </div>
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="group relative block min-h-[220px] overflow-hidden rounded-[14px] border border-line"
      >
        <Image
          src={project.screenshot}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 768px) 640px, 100vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </a>
    </article>
  );
}
