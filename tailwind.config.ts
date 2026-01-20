import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#4682b4", // Steel blue - main brand color
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-opensans)", "Arial", "Helvetica", "sans-serif"],
        eurostile: ['"eurostile"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
