/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonCyan: "#00f3ff",
        neonPink: "#ff00ff",
        neonPurple: "#b026ff",
        darkBg: "#040410",
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "'Inter'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
    },
  },
  plugins: [],
}
