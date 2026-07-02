import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FAF7F2",
        "canvas-soft": "#F2EDE5",
        elevated: "#FFFFFF",
        recessed: "#E5DED2",
        ink: {
          primary: "#344854",
          secondary: "#5A6C76",
          muted: "#8B9499",
          "on-dark": "#E8F0F2",
        },
        brand: {
          green: "#2E7547",
          turquoise: "#B0DFE0",
          "turquoise-deep": "#7BAFB0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
