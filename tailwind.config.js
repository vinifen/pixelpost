/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dark-blue-gradient': 'linear-gradient(180deg, #1B1E27, #333641)',
      },
    },
  },
  plugins: [],
}
