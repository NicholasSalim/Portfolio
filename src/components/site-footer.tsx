import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-6xl border-t border-line px-4 py-8 text-sm text-muted sm:px-8">
      Designed and built by {site.name}
    </footer>
  );
}
