import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "var(--ivory)",
        plum: "var(--plum)",
        "dusty-rose": "var(--dusty-rose)",
        sage: "var(--sage)",
        gold: "var(--gold)",
        lavender: "var(--lavender)",
        white: "var(--white)",
        blush: {
          DEFAULT: "var(--blush)",
          deep: "var(--blush-deep)",
        },
        yellow: {
          DEFAULT: "var(--yellow)",
          deep: "var(--yellow-deep)",
        },
        berry: {
          DEFAULT: "var(--berry)",
          dark: "var(--berry-dark)",
        },
        ink: "var(--ink)",
        "cream-card": "var(--cream-card)",
      },
      fontFamily: {
        serif: ["var(--font-dm-serif)", "DM Serif Display", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["clamp(44px, 5.5vw + 1rem, 72px)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        h2: ["clamp(32px, 3.5vw + 0.5rem, 50px)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        h3: ["clamp(24px, 2.5vw + 0.25rem, 36px)", { lineHeight: "1.2" }],
        body: ["18px", { lineHeight: "1.6" }],
        small: ["14px", { lineHeight: "1.4" }],
        nav: ["14.5px", { lineHeight: "1.3" }],
        btn: ["15.5px", { lineHeight: "1.3", fontWeight: "600" }],
      },
      borderRadius: {
        "3xl": "24px",
      },
      boxShadow: {
        card: "0 12px 30px rgba(59,36,48,0.08)",
        hover: "0 14px 26px rgba(59,36,48,0.12)",
        node: "0 4px 0 rgba(59,36,48,0.15)",
        "node-active": "0 0 0 6px rgba(235,203,114,0.35), 0 4px 0 rgba(59,36,48,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
