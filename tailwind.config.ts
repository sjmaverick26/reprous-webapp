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
        white: "#FFFFFF",
        "light-teal": {
          DEFAULT: "#D8EFED",
          light: "#EDF8F7",
          dark: "#BBE4E1",
        },
        "deep-teal": {
          DEFAULT: "#175B5C",
          dark: "#0F3D3E",
          light: "#207274",
        },
        raspberry: {
          DEFAULT: "#B83F68",
          dark: "#962D50",
          light: "#D04D79",
        },
        coral: {
          DEFAULT: "#F47A6A",
          dark: "#DE5E4D",
          light: "#F89B8F",
        },
        "soft-pink": {
          DEFAULT: "#F5D9DE",
          light: "#FAF0F2",
          dark: "#E8BCC4",
        },
        "warm-cream": {
          DEFAULT: "#FFF8F0",
          light: "#FFFDF9",
          dark: "#F5EADB",
        },
        charcoal: {
          DEFAULT: "#29272A",
          light: "#434045",
          muted: "#666269",
        },
        // Semantic mapping & backward compatibility
        "page-bg": "#D8EFED",
        "card-bg": "#FFFFFF",
        plum: {
          DEFAULT: "#175B5C", // Deep Teal
          dark: "#0F3D3E",
          light: "#207274",
        },
        berry: {
          DEFAULT: "#B83F68", // Raspberry
          dark: "#962D50",
          light: "#D04D79",
        },
        gold: {
          DEFAULT: "#F47A6A", // Coral
          light: "#F89B8F",
          dark: "#DE5E4D",
        },
        yellow: {
          DEFAULT: "#F47A6A",
          deep: "#F47A6A",
        },
        teal: {
          DEFAULT: "#175B5C",
          deep: "#175B5C",
          accent: "#B83F68",
          light: "#D8EFED",
        },
        ivory: {
          DEFAULT: "#D8EFED", // Main homepage background: Light Teal
          warm: "#FFF8F0",    // Warm Cream
          darker: "#F5D9DE",  // Soft Pink
        },
        "dusty-rose": {
          DEFAULT: "#F5D9DE", // Soft Pink
          light: "#FAF0F2",
        },
        sage: {
          DEFAULT: "#D8EFED", // Light Teal
          light: "#EDF8F7",
          dark: "#BBE4E1",
        },
        lavender: {
          DEFAULT: "#F5D9DE", // Soft Pink
          light: "#FAF0F2",
          dark: "#E8BCC4",
        },
        ink: "#29272A",
        "cream-card": "#FFFFFF",
      },
      fontFamily: {
        serif: ["var(--font-dm-serif)", "DM Serif Display", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["clamp(42px, 5.5vw + 1rem, 72px)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        h2: ["clamp(32px, 3.5vw + 0.5rem, 50px)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        h3: ["clamp(24px, 2.5vw + 0.25rem, 36px)", { lineHeight: "1.2" }],
        body: ["18px", { lineHeight: "1.6" }],
        small: ["14px", { lineHeight: "1.4" }],
        nav: ["14.5px", { lineHeight: "1.3" }],
        btn: ["15.5px", { lineHeight: "1.3", fontWeight: "600" }],
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
        "3xl": "20px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(59,36,48,0.06)",
        hover: "0 14px 28px rgba(59,36,48,0.11)",
        node: "0 4px 0 rgba(59,36,48,0.15)",
        "node-active": "0 0 0 4px rgba(235,203,114,0.4), 0 4px 0 rgba(59,36,48,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
