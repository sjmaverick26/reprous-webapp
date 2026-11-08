"use client";

import { useEffect } from "react";

/**
 * Soft scroll reveal for elements marked `data-reveal` (and the children of `data-reveal-stagger`).
 * Only elements below the fold at mount are hidden, and only when JS runs and the visitor
 * allows motion, so nothing is ever hidden with JS off, under reduced motion or when printing.
 * Pass the values that change the visible view, so newly mounted content is picked up.
 */
export function useReveal(deps: unknown[]) {
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let observer: IntersectionObserver | null = null;
    // Wait one frame so the new view has laid out.
    const frame = requestAnimationFrame(() => {
      const root = document.getElementById("main");
      if (!root) return;

      const targets: HTMLElement[] = [];
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => targets.push(el));
      root.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
        Array.from(group.children).forEach((child, i) => {
          const el = child as HTMLElement;
          el.setAttribute("data-reveal", "");
          el.style.transitionDelay = `${Math.min(i, 5) * 70}ms`;
          targets.push(el);
        });
      });

      const fold = window.innerHeight * 0.92;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            el.setAttribute("data-reveal", "in");
            observer?.unobserve(el);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );

      targets.forEach((el) => {
        if (el.getAttribute("data-reveal") === "in") return;
        // Already on screen: show as is, no animation.
        if (el.getBoundingClientRect().top < fold) {
          el.setAttribute("data-reveal", "in");
          el.style.transitionDelay = "";
          return;
        }
        el.setAttribute("data-reveal", "pending");
        observer?.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      // Never leave anything hidden behind when the view changes.
      document.querySelectorAll<HTMLElement>('[data-reveal="pending"]').forEach((el) => el.setAttribute("data-reveal", "in"));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
