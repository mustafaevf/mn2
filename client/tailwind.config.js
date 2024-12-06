/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      textColor: {
        primary: "#fff",
        secondary: "#dae2f5",
        dop: "#e6eeff",
      },
      colors: {
        background: "#161b2e",
        opacity: "#161b2efc",
        secondary: "#1b2238",
        modal: "#1c233a",
        block: "#242c48",
        primary: "",
        white: "#fff",
        player1: "#df3f4b",
        player2: "#8845dd",
        player3: "#50bf36",
        player4: "#dea921"
      },
      borderRadius: {
        lg: "1.25rem",
        sm: ".25rem",
        md: ".75rem"
      }
    },
  },
  plugins: [],
}

