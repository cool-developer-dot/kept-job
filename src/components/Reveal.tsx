"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Section wrapper with two jobs:
 *  - adds `in-view` once, the first time the section scrolls into view (drives `.rv` / `.ml` reveals);
 *  - toggles `is-live` while the section is on (or near) the screen. Loops are only declared under
 *    `.is-live`, so sections you have scrolled past stop animating.
 */
export default function Reveal({ id, className = "", children }: { id?: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const once = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in-view");
          once.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    once.observe(el);

    const live = new IntersectionObserver(([e]) => el.classList.toggle("is-live", e.isIntersecting), {
      threshold: 0,
      rootMargin: "120px 0px 120px 0px",
    });
    live.observe(el);

    return () => {
      once.disconnect();
      live.disconnect();
    };
  }, []);

  return (
    <section ref={ref} id={id} className={className}>
      {children}
    </section>
  );
}
