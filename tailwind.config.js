/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'base': '18px',  // Now 1rem = 18px
        'lg': '1.25rem', // 22.5px
      },
    },
  },
  plugins: [],
}