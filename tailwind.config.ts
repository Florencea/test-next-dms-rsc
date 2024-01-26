import type { Config } from "tailwindcss";

export default {
  important: "#__next",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#722ed1",
      },
    },
  },
  plugins: [],
} satisfies Config;
