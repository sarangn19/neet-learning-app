/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Lingora Design System
        'violet': {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        'lime': {
          400: '#a3e635',
          500: '#84cc16',
          600: '#65a30d',
        },
        'teal': {
          400: '#2dd4bf',
          500: '#14b8a6',
        },
        'rose': {
          400: '#fb7185',
          500: '#f43f5e',
        },
        'amber': {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        // Semantic tokens
        'primary': '#6d28d9',      // Deep violet
        'primary-light': '#7c3aed',
        'primary-dark': '#5b21b6',
        'cta': '#84cc16',          // Electric lime
        'cta-dark': '#65a30d',
        'correct': '#14b8a6',      // Teal
        'wrong': '#f43f5e',        // Rose
        'hearts': '#f43f5e',       // Rose
        'streak': '#f59e0b',       // Amber
        'xp': '#f59e0b',          // Amber
        // Legacy compatibility
        'brand-green': '#84cc16',
        'brand-green-dark': '#65a30d',
        'brand-blue': '#7c3aed',
        'brand-red': '#f43f5e',
        'brand-yellow': '#f59e0b',
        'brand-purple': '#6d28d9',
        'brand-orange': '#f59e0b',
        'gray-100': '#f7f7f7',
        'gray-200': '#e5e5e5',
        'gray-300': '#cfcfcf',
        'gray-400': '#afafaf',
        'gray-500': '#777777',
      },
      fontFamily: {
        'satoshi': ['Satoshi', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        '3d': '0 4px 0 0 #65a30d',
        '3d-active': '0 2px 0 0 #65a30d',
        '3d-sm': '0 3px 0 0 #65a30d',
        '3d-sm-active': '0 1px 0 0 #65a30d',
      },
      animation: {
        'bounce-slight': 'bounce-slight 0.5s ease-in-out',
        'shake': 'shake 0.5s ease-in-out',
        'pop': 'pop 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'bounce-slight': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-8px)' },
          '75%': { transform: 'translateX(8px)' },
        },
        'pop': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
