import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: "#31154f",
        accent: "#ffc10d",
        comp1: "#ce6b00",
        comp2: "#ccdb29",
        comp3: "#d7c4df"
      },
      boxShadow: {
        card: "0 8px 24px rgba(49,21,79,0.08)"
      }
    },
    fontFamily: {
      heading: ["Century Gothic", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      body: ["PT Serif", "Georgia", "'Times New Roman'", "serif"]
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}