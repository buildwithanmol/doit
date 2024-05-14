import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        karantina: "var(--font-karantina)",
        kanit: "var(--font-kanit)",
      },
      colors: {
        primary: "#1E2029",
        secondary: "#E3E3E3",
        accent: "#E1FE02",
      },
    },
  },
  plugins: [],
};
export default config;
