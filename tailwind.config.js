/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#58cc02',
        'brand-green-dark': '#4cb201',
        'brand-blue': '#1cb0f6',
        'brand-red': '#ff4b4b',
        'brand-yellow': '#ffc800',
        'brand-purple': '#ce82ff',
        'brand-orange': '#ff9600',
        'gray-100': '#f7f7f7',
        'gray-200': '#e5e5e5',
        'gray-300': '#cfcfcf',
        'gray-400': '#afafaf',
        'gray-500': '#777777',
      },
      fontFamily: {
        'satoshi': ['Satoshi', 'system-ui', 'sans-serif'],
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
