/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/main.js"],
  theme: {
    extend: {
      colors: {
        'custom-gold-1': '#F0E6D2',
        'custom-gold-2': '#785A28',
        'custom-gold-3': '#C89B3C',
        'custom-blue-1': '#061C25',
        'custom-blue-2': '#08D7F7',
        'custom-blue-3': '#091428',
        'custom-blue-4': '#CDFAFA',
      },
      fontFamily: {
        'custom-title': ['PT Serif', 'serif'],
        'custom-body': ['PT Sans', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fade: 'fade-in 1s ease-in-out',
      },
    },
  },
  plugins: [],
}

