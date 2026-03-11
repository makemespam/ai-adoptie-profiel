import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "Alfa Slab One", "serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
      colors: {
        "bureautje": {
          black: "#111111",
          mint: "#C8F5C8",
          "mint-light": "#D8F5D8",
          "oerwoud": "#2D7A3A",
          "donker-blad": "#1A4D2E",
          "licht-mint": "#7BC47F",
        },
      },
    },
  },
  plugins: [],
};

export default config;
