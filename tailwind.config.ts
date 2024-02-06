import { geekblue } from "@ant-design/colors";
import type { Config } from "tailwindcss";

export default {
  important: "#__next",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: geekblue[5],
      },
      animation: {
        "fade-in-up": "fade-in-up 0.2s ease-out",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "scale(1.05)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
