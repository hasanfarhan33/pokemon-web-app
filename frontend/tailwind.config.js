/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        jersey: ['"Jersey 10"', "serif"], 
        press: ["'Press Start 2P'", "cursive"]
      }
    },
  },
  plugins: [],
}

