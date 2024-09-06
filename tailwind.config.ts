// tailwind.config.js
import type { Config } from "tailwindcss";
import plugin from "tailwindcss";

const config: {
  plugins: (plugin | ((options?: Partial<{ strategy: "base" | "class" }>) => { handler: () => void }))[];
  theme: { extend: { colors: { background: string; foreground: string } } };
  content: string[]
} = {
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
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;
