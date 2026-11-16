import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-line px-4 py-8 text-sm text-muted sm:px-8">
      <span>{site.name}</span>
      {site.source && (
        <a href={site.source} className="hover:text-fg">
          Source on GitHub
        </a>
      )}
    </footer>
  );
}
