/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        zenkaku: ["'Zen Kaku Gothic New'", "sans-serif"],
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
      },
      screens: {
        xs: "450px",
        xxs: "320px" 
      },
    },
  },
  plugins: [],
};