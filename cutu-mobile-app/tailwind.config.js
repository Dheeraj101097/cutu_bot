/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        "surface-light": "var(--color-surface-light)",
        "background-light": "var(--color-background-light)",
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Outfit", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "12px",
        card: "20px",
        "card-lg": "24px",
        hero: "28px",
        pill: "9999px",
        input: "16px",
      },
      boxShadow: {
        glass: "0 4px 24px -1px rgba(0,0,0,0.06), 0 2px 8px -2px rgba(0,0,0,0.04)",
        "glass-lg": "0 8px 32px -4px rgba(0,0,0,0.08)",
        soft: "0 2px 12px rgba(74,103,91,0.12)",
        "glow-sm": "0 0 20px rgba(74,103,91,0.25)",
        "inner-card": "inset 0 1px 0 0 rgba(74,103,91,0.08)",
      },
      backdropBlur: { glass: "20px" },
      minHeight: { tap: "44px" },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        scaleIn: { "0%": { opacity: "0", transform: "scale(0.96)" }, "100%": { opacity: "1", transform: "scale(1)" } },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.25s ease-out",
      },
    },
  },
  plugins: [],
}
