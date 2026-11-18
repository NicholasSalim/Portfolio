"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_THEME, THEME_ATTRIBUTE, THEME_KEY, THEMES, isTheme, type Theme } from "@/lib/theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: [THEME_ATTRIBUTE] });
  return () => observer.disconnect();
}

function read(): Theme {
  const value = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  return isTheme(value) ? value : DEFAULT_THEME;
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, read, () => DEFAULT_THEME);
  const next = THEMES.find((t) => t !== theme) ?? DEFAULT_THEME;

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.setAttribute(THEME_ATTRIBUTE, next);
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch {}
      }}
      aria-label={`Switch to ${next} mode`}
      className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-mint hover:text-fg"
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
