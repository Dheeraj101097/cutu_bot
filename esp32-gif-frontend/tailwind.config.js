/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Minimalist Palette
        "nook-bg-dark": "#0a0a0a", // Deepest Black
        "nook-bg-light": "#f4f4f0", // Warm Paper White (Urban Nook style)
        "nook-text-dark": "#ffffff",
        "nook-text-light": "#1a1a1a",
        "nook-accent": "#d4af37", // Muted Gold
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
