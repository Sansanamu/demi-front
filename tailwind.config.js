/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#539074',
        txgreen: '#006537',
      },
      boxShadow: {
        'inner-md': 'inset 0 4px 6px rgba(0, 0, 0, 0.1)',
        'inner-lg': 'inset 0 6px 10px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
