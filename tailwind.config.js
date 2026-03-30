/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e3a5f', 900: '#0f1d32' },
        danger: { 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c' },
        accent: { 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706' },
        dark: { 800: '#1a1a2e', 900: '#0d0d1a', 950: '#060610' },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        hebrew: ['Heebo', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
