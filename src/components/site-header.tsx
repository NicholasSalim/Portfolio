import Link from "next/link";
import { site } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 sm:px-8">
      <Link href="/" className="font-display text-lg tracking-tight">
        {site.name}
      </Link>
      <nav aria-label="Main" className="flex items-center gap-6 text-[15px] text-muted">
        <Link href="/#work" className="hidden hover:text-fg sm:inline">
          Work
        </Link>
        <Link href="/#how-i-ship" className="hidden hover:text-fg sm:inline">
          How I ship
        </Link>
        <Link href="/#about" className="hidden hover:text-fg sm:inline">
          About
        </Link>
        {site.resume && (
          <a href={site.resume} download className="hover:text-fg">
            Résumé ↓
          </a>
        )}
        <ThemeToggle />
      </nav>
    </header>
  );
}
