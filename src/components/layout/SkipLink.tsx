"use client";

/**
 * "Skip to content": moves focus to the main content without changing the address.
 * The views live in the URL hash (#/learn/pcos), so following href="#main" would replace the
 * current view's address and a reload would land on Home. With JS off it still works as a plain link.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      onClick={(event) => {
        const main = document.getElementById("main");
        if (!main) return;
        event.preventDefault();
        main.focus();
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-raspberry focus:px-5 focus:py-3 focus:text-base focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-deep-teal focus:ring-offset-2"
    >
      Skip to content
    </a>
  );
}
