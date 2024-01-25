/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-green": "#75dab4",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        playFair: ["Play Fair Display", "serif"],
      },
    },
  },
  plugins: [],
};
