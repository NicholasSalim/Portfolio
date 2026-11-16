"use client";

import { useEffect, useState } from "react";

// How close to the bottom of the page (in px) the button appears.
const NEAR_BOTTOM = 400;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const fromBottom = document.documentElement.scrollHeight - (scrollY + innerHeight);
      setVisible(scrollY > innerHeight && fromBottom < NEAR_BOTTOM);
    };
    check();
    addEventListener("scroll", check, { passive: true });
    addEventListener("resize", check);
    return () => {
      removeEventListener("scroll", check);
      removeEventListener("resize", check);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => {
        const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
        scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
      }}
      className={`fixed right-4 bottom-4 z-30 grid size-11 place-items-center rounded-full border border-line bg-panel text-fg shadow-lg transition-[opacity,translate] duration-300 ease-out hover:border-mint hover:text-mint sm:right-8 sm:bottom-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
