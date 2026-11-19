"use client";

import { useEffect, type RefObject } from "react";

/**
 * Keyboard and screen-reader focus for a full-screen layer (a lesson, a pop-up).
 * While `active`:
 * - everything outside `ref` is inert, so Tab and screen readers stay inside the layer;
 * - focus moves to `ref` (give it tabIndex={-1});
 * - on close, focus returns to `returnTo()` if it finds an element, else to the element that had focus
 *   when the layer opened (if it is still on the page), else to #main.
 * `returnTo` is read when the layer closes, so it can look up an element that was re-rendered meanwhile.
 */
export function useDialogFocus(
  active: boolean,
  ref: RefObject<HTMLElement>,
  returnTo?: () => HTMLElement | null
) {
  useEffect(() => {
    if (!active) return;
    const root = ref.current;
    if (!root) return;

    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    // Make every sibling of the layer, and of each of its ancestors up to <body>, inert.
    const madeInert: HTMLElement[] = [];
    let node: HTMLElement = root;
    while (node.parentElement) {
      const parent = node.parentElement;
      for (const sibling of Array.from(parent.children)) {
        if (sibling === node || !(sibling instanceof HTMLElement)) continue;
        if (sibling.tagName === "SCRIPT" || sibling.tagName === "STYLE" || sibling.hasAttribute("inert")) continue;
        sibling.setAttribute("inert", "");
        madeInert.push(sibling);
      }
      if (parent === document.body) break;
      node = parent;
    }

    root.focus({ preventScroll: true });

    return () => {
      madeInert.forEach((el) => el.removeAttribute("inert"));
      const target =
        returnTo?.() ?? (opener && opener.isConnected ? opener : null) ?? document.getElementById("main");
      target?.focus({ preventScroll: true });
    };
    // returnTo is read at close time on purpose; re-running on every render would re-focus the layer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, ref]);
}
