import type { Metadata } from "next";
import Image from "next/image";
import { ProjectLinks, ProjectTags } from "@/components/project-meta";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Works",
  description: "Every project, from idea to production.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-24 sm:px-8">
      <h1 className="font-display text-[clamp(40px,5vw,72px)] font-light tracking-tight">All work</h1>
      <p className="mt-3 text-muted">Every project, each one live.</p>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.slug} className="flex flex-col overflow-hidden rounded-[18px] border border-line bg-panel">
            <div className="relative aspect-16/10 border-b border-line">
              <Image
                src={p.screenshot}
                alt=""
                fill
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-sm text-mint">{p.kind}</p>
              <h2 className="mt-1 font-display text-2xl">{p.name}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.blurb}</p>
              <ProjectTags project={p} size="compact" />
              <ProjectLinks project={p} size="compact" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
