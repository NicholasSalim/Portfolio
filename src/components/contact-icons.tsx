import type { ReactNode } from "react";
import { site } from "@/content/site";

const icons: Record<string, ReactNode> = {
  Email: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  GitHub: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  ),
  LinkedIn: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1v5.46h-4v-4.84c0-1.16-.02-2.64-1.61-2.64-1.61 0-1.86 1.26-1.86 2.56v4.92h-3.93v-11Z" />
    </svg>
  ),
};

export function ContactIcons() {
  const links = [
    site.email && { label: "Email", href: `mailto:${site.email}`, text: site.email },
    { label: "GitHub", href: site.github, text: site.github.replace("https://", "") },
    site.linkedin && { label: "LinkedIn", href: site.linkedin, text: site.linkedin.replace(/^https:\/\/(www\.)?/, "") },
  ].filter(Boolean) as { label: string; href: string; text: string }[];

  return (
    <ul className="mt-6 divide-y divide-line border-y border-line">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target={l.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            className="group flex items-center justify-between gap-6 py-4 transition-colors hover:text-mint"
          >
            <span className="text-fg group-hover:text-mint">
              {icons[l.label]}
              <span className="sr-only">{l.label}</span>
            </span>
            <span className="truncate text-[15px] text-muted group-hover:text-mint">{l.text}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
