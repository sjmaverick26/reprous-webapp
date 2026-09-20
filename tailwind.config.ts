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
        ivory: {
          DEFAULT: "#FFF8F3",
          warm: "#FFF8F3",
          darker: "#FAF1EC",
        },
        plum: {
          DEFAULT: "#3B2430",
          dark: "#2A1822",
          light: "#523344",
        },
        berry: {
          DEFAULT: "#8E3F5C",
          dark: "#6F2E45",
          light: "#A85371",
        },
        "dusty-rose": {
          DEFAULT: "#D99AAA",
          light: "#E8B8C4",
        },
        sage: {
          DEFAULT: "#A8B7A1",
          light: "#C2CEC0",
          dark: "#87997E",
        },
        gold: {
          DEFAULT: "#EBCB72",
          light: "#F3DC9B",
          dark: "#D6B250",
        },
        lavender: {
          DEFAULT: "#E8DFEA",
          light: "#F3EDF5",
          dark: "#CFBED3",
        },
        // Semantic and legacy palette mappings
        "page-bg": "#FFF8F3",
        "deep-teal": "#3B2430", // Harmonized to Dark Plum
        "teal-accent": "#8E3F5C", // Harmonized to Berry
        teal: {
          DEFAULT: "#3B2430",
          deep: "#3B2430",
          accent: "#8E3F5C",
          light: "#A8B7A1",
        },
        raspberry: "#8E3F5C", // Harmonized to Berry
        coral: {
          DEFAULT: "#EBCB72", // Harmonized to Soft Gold
          deep: "#D99AAA",   // Harmonized to Dusty Rose
        },
        "soft-pink": "#E8DFEA", // Harmonized to Lavender
        "light-teal": "#A8B7A1", // Harmonized to Sage
        charcoal: "#3B2430",    // Harmonized to Dark Plum
        ink: "#3B2430",         // Harmonized to Dark Plum
        blush: {
          DEFAULT: "#FFF8F3",
          deep: "#FAF1EC",
        },
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
