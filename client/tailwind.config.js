/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "#1c1c1c",
        darkBackground: "#151515",
        muted: "#c0c1c7",
        body: "#8e919b",
        border: "#424244",
        success: "#1c9749",
        danger: "#e11d48",
        warning: "#ffc107",
      },
    },
  },
  plugins: [],
}

