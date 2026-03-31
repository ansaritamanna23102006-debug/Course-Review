/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFFAF0',
        'pastel-green': '#A8D5BA',
        'dark-green': '#5B8C5A',
        'light-green': '#D4E7D9',
      },
    },
  },
  plugins: [],
}
