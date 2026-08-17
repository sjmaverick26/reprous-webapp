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
        card: "0 12px 30px rgba(58,44,46,0.08)",
        hover: "0 14px 26px rgba(58,44,46,0.12)",
        node: "0 4px 0 rgba(58,44,46,0.15)",
        "node-active": "0 0 0 6px rgba(240,194,94,0.35), 0 4px 0 rgba(58,44,46,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
