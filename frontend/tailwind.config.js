/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '1/2': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
        'full': '100%',
      },
      backgroundImage: {
        'dark-blue-gradient': 'linear-gradient(180deg, #1B1E27, #333641)',
        'canvas-background': 'url(/images/canvas-background.jpg)', // Corrigido o nome da chave
      },
      colors: {
        'primary-color-text': '#EEEEEE',
        'secundary-color-text': '#D9D9D9',
        'primary-button': 'rgba(66,76,92,0.7)',
        'secundary-button': '#6D6E74',
      },
      screens: {
        'xs': '470px',
        'xxs': '360px',
      },
    },
  },
  plugins: [],
}
