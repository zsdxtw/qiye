/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A5F",
          light: "#2C5282",
          dark: "#15293F",
          50: "#F0F4F8",
          100: "#D9E2EC",
        },
        accent: {
          DEFAULT: "#D4AF37",
          light: "#E5C158",
          dark: "#B8941F",
        },
        success: "#38A169",
        warning: "#DD6B20",
        danger: "#E53E3E",
        info: "#3182CE",
        card: "#F7F8FA",
        ink: {
          DEFAULT: "#1A202C",
          soft: "#4A5568",
          mute: "#718096",
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', '"PingFang SC"', "system-ui", "sans-serif"],
        mono: ['"Inter"', "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["24px", { lineHeight: "32px", fontWeight: "700" }],
        h2: ["20px", { lineHeight: "28px", fontWeight: "600" }],
        h3: ["17px", { lineHeight: "24px", fontWeight: "600" }],
        body: ["15px", { lineHeight: "22px" }],
        caption: ["13px", { lineHeight: "18px" }],
        mini: ["11px", { lineHeight: "16px" }],
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(30,58,95,0.06), 0 1px 2px rgba(30,58,95,0.04)",
        float: "0 8px 24px rgba(30,58,95,0.12)",
        glow: "0 0 24px rgba(212,175,55,0.25)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(212,175,55,0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "pulse-gold": "pulse-gold 2s infinite",
      },
    },
  },
  plugins: [],
};
