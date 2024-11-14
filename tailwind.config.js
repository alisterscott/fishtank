/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'sway': 'sway 4s ease-in-out infinite',
        'bubble': 'bubble 10s infinite',
      },
    },
  },
  plugins: [],
};