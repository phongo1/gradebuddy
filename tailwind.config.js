/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'light-bg': '#F1F6F9',
        'blue1': '#394867',
        'blue2': '#212A3E',
        'grey': '9BA4B5',
      },
    },
  },
  plugins: [],
}