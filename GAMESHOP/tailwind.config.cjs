/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./index.html",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors:{
        dark: "#242424"
      },
      screens: {
        "xs": "620px",
      },
      spacing: {
        "4.5": "1.125rem",
      }
    },
  },
  plugins: [],
}
