import type { Project } from "@/content/projects";

// The tech list and the GitHub / live site links for a project. The home page
// deck uses the large size; the /work grid uses the compact one.
type Size = "large" | "compact";

const styles: Record<Size, { tags: string; tag: string; links: string; github: string; live: string }> = {
  large: {
    tags: "mt-6",
    tag: "px-3 py-1.5 text-[13px]",
    links: "flex-wrap gap-3 pt-8",
    github:
      "rounded-[10px] bg-mint px-4.5 py-2.75 text-[15px] font-medium text-mint-ink transition-opacity hover:opacity-90",
    live: "rounded-[10px] border border-line px-4.5 py-2.75 text-[15px] transition-colors hover:border-mint",
  },
  compact: {
    tags: "mt-4",
    tag: "px-2.5 py-1 text-[12px]",
    links: "gap-4 pt-5 text-[15px]",
    github: "text-mint hover:underline",
    live: "text-muted hover:text-fg",
  },
};

export function ProjectTags({ project, size }: { project: Project; size: Size }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${styles[size].tags}`} aria-label="Built with">
      {project.tags.map((t) => (
        <li key={t} className={`rounded-lg bg-bg text-muted ${styles[size].tag}`}>
          {t}
        </li>
      ))}
    </ul>
  );
}

export function ProjectLinks({ project, size }: { project: Project; size: Size }) {
  return (
    <div className={`mt-auto flex ${styles[size].links}`}>
      <a href={project.repo} target="_blank" rel="noreferrer" className={styles[size].github}>
        View on GitHub
      </a>
      <a href={project.url} target="_blank" rel="noreferrer" className={styles[size].live}>
        Live site
      </a>
    </div>
  );
}
