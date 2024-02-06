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
    },
  },
  plugins: [],
} satisfies Config;
