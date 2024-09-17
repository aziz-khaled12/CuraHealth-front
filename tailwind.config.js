/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBg: "#F7F7F7",
        primary: "#0D3B66",
        buttonBg: "#D9D9D9",
        primaryText: "#ffffff",
        lightText: "#9B9B9B",
        darkText: "#000000"
      }
    },
  },
  plugins: [],
}