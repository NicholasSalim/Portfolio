"use client";

import { useEffect, useRef } from "react";

const IDLE_MS = 900;
const INTERACTIVE = "a, button, [role='button'], input, select, textarea, label";

// A small mint glow that follows the mouse while it moves and fades out when
// it stops or rests on anything clickable. Mouse and trackpad only; skipped
// entirely for reduced motion.
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let idle: ReturnType<typeof setTimeout> | undefined;
    let x = 0;
    let y = 0;

    const onMove = (e: PointerEvent) => {
      clearTimeout(idle);
      if (e.target instanceof Element && e.target.closest(INTERACTIVE)) {
        cancelAnimationFrame(frame);
        frame = 0;
        el.style.opacity = "0";
        return;
      }
      x = e.clientX;
      y = e.clientY;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          el.style.transform = `translate(${x}px, ${y}px)`;
          el.style.opacity = "1";
        });
      }
      idle = setTimeout(() => (el.style.opacity = "0"), IDLE_MS);
    };
    const hide = () => (el.style.opacity = "0");

    addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", hide);
      cancelAnimationFrame(frame);
      clearTimeout(idle);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-40 -mt-[60px] -ml-[60px] size-[120px] rounded-full opacity-0 transition-opacity duration-500 ease-out"
      style={{ background: "radial-gradient(circle, var(--glow) 0%, transparent 70%)" }}
    />
  );
}
