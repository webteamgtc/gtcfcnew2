/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "#03060f", 900: "#050a18", 800: "#0a1328", 700: "#111d3a", 600: "#1a2a4f", 500: "#26396a" },
        gold: { 100: "#f8ecc9", 200: "#f3dca4", 300: "#e8cf96", 400: "#d8b56e", 500: "#c9a35b", 600: "#a87a35", 700: "#7d5a24" },
        ink: { 950: "#000000", 900: "#0b0c0f", 800: "#16181d", 700: "#1f2229", 600: "#2a2f3d" },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Inter", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-grad": "linear-gradient(180deg,#f3dca4 0%,#d8b56e 45%,#a87a35 100%)",
        "gold-sheen": "linear-gradient(110deg,#a87a35 0%,#f3dca4 45%,#fff6dc 50%,#f3dca4 55%,#a87a35 100%)",
      },
      keyframes: {
        sheen: { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: { sheen: "sheen 6s linear infinite", marquee: "marquee 40s linear infinite" },
    },
  },
  plugins: [],
};
