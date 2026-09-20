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
        serif: ["var(--font-fraunces)", "Fraunces", "Georgia", "serif"],
        sans: ["var(--font-nunito-sans)", "Nunito Sans", "system-ui", "sans-serif"],
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
