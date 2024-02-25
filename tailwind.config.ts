import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // typography: {
    //   default: {
    //     css: {
    //       pre: null,
    //       code: null,
    //       "code::before": null,
    //       "code::after": null,
    //       "pre code": null,
    //       "pre code::before": null,
    //       "pre code::after": null,
    //     },
    //   },
    // },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
export default config;
