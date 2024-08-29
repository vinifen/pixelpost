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
      colors: {
        'primary-color-text': '#EEEEEE',
        'secundary-color-text': '#D9D9D9',
        'primary-button' : 'rgba(66,76,92,0.7)',
      },
    },
  },
  plugins: [],
}
