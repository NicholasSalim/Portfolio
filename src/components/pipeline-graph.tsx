"use client";

import { useEffect, useRef, useState } from "react";
import { pipeline } from "@/content/pipeline";

const STEP_MS = 380;

// Lights the steps one after another, once, the first time the graph is on
// screen. With reduced motion it starts fully lit.
export function PipelineGraph() {
  const ref = useRef<HTMLOListElement>(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off sync with a media query
      setLit(pipeline.length);
      return;
    }
    let timer: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let n = 0;
        timer = setInterval(() => {
          n += 1;
          setLit(n);
          if (n >= pipeline.length) clearInterval(timer);
        }, STEP_MS);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, []);

  return (
    <ol
      ref={ref}
      aria-label="How every project ships, from idea to deploy"
      className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-2 gap-y-3 md:grid md:grid-cols-7 md:gap-0"
    >
      {pipeline.map((step, i) => {
        const on = i < lit;
        const last = i === pipeline.length - 1;
        return (
          <li key={step.name} className="relative flex items-center md:justify-center">
            <span
              className={`relative z-10 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors duration-300 md:w-[82%] md:text-center ${
                on ? "border-mint bg-lit text-fg" : "border-line bg-panel text-muted"
              } ${last && on ? "shadow-[0_0_24px_-4px_var(--mint)]" : ""}`}
            >
              {step.name}
            </span>
            {!last && (
              <span aria-hidden="true" className="absolute top-1/2 left-[91%] hidden h-px w-[18%] bg-line md:block">
                <span
                  className={`block h-full origin-left bg-mint transition-transform duration-300 ${
                    i + 1 < lit ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
