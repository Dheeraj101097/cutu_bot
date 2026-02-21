/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // CUTU Bot — Light & cool palette (UrbanNook / crop-modelling inspired)
        cutu: {
          bg: "#f8fafc",
          "bg-elevated": "#ffffff",
          surface: "rgba(255,255,255,0.72)",
          "surface-strong": "rgba(255,255,255,0.92)",
          primary: "#0ea5e9",
          "primary-light": "#38bdf8",
          "primary-soft": "#bae6fd",
          accent: "#06b6d4",
          "accent-pastel": "#a5f3fc",
          muted: "#94a3b8",
          text: "#1e293b",
          "text-secondary": "#64748b",
          lavender: "#c7d2fe",
          mint: "#a7f3d0",
          sky: "#e0f2fe",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Outfit", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 4px 24px -1px rgba(0,0,0,0.06), 0 2px 8px -2px rgba(0,0,0,0.04)",
        "glass-lg": "0 8px 32px -4px rgba(0,0,0,0.08), 0 4px 16px -4px rgba(0,0,0,0.04)",
        soft: "0 2px 12px rgba(14,165,233,0.08)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
