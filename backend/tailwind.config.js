/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        root: '#0A1428',
        card: '#111827',
        border: '#1F2937',
        'text-primary': '#F3F4F6',
        'text-secondary': '#9CA3AF',
        'lol-gold': '#C89B3C',
        'electric-blue': '#00AEEF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        beaufort: ['Beaufort for LoL', 'serif'],
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-out',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
} 