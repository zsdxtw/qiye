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
        accent: "var(--accent)",
        accent2: "var(--accent2)",
        "accent-soft": "var(--accent-soft)",
        bg: "var(--bg)",
        bg2: "var(--bg2)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        rule: "var(--rule)",
        warn: "var(--warn)",
        "warn-soft": "var(--warn-soft)",
        ok: "var(--ok)",
        "ok-soft": "var(--ok-soft)",
        amber: "var(--amber)",
        "amber-soft": "var(--amber-soft)",
        "dark-bg1": "var(--dark-bg1)",
        "dark-bg2": "var(--dark-bg2)",
        "dark-bg3": "var(--dark-bg3)",
        "dark-ink": "var(--dark-ink)",
        "dark-muted": "var(--dark-muted)",
      },
      fontFamily: {
        display: ['Outfit', '"Noto Sans CJK SC"', '"PingFang SC"', 'sans-serif'],
        sans: ['"Work Sans"', '"Noto Sans CJK SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Noto Sans CJK SC"', 'monospace'],
      },
      fontSize: {
        h1: ['1.7rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        h2: ['1.18rem', { lineHeight: '1.3', fontWeight: '700' }],
        h3: ['1rem', { lineHeight: '1.4', fontWeight: '700' }],
        body: ['16px', { lineHeight: '1.7' }],
        xs: ['0.82rem', { lineHeight: '1.5' }],
        '2xs': ['0.72rem', { lineHeight: '1.4', fontWeight: '600' }],
      },
      borderRadius: {
        card: '12px',
        'card-sm': '8px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(14,21,37,.06)',
        'card-hover': '0 6px 18px rgba(14,21,37,.10)',
      },
      maxWidth: {
        content: '1040px',
      },
    },
  },
  plugins: [],
};
