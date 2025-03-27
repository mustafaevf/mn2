// @type {import('tailwindcss').Config}
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      textColor: {
        primary: "#fff",
        secondary: "#abb2cf",
      },
      colors: {
        background: "#0c0c0c",
        header: "#141414",
        ui: "#232c48",
        secondary: "#191919",
        opacity: "rgba(15, 20, 28, .75)",
        hover: "#232c48",
        box: "#262f4c",
        box2: "#1c233a",
        border: "#2f3959",
        icon: "#737373",
      },
      borderRadius: {
        lg: "1.25rem",
        sm: "10px",
        md: ".75rem"
      },
      fontSize: {
        xs: "0.75rem",  // 12px
        sm: "0.875rem", // 14px
        base: "1rem",   // 16px (по умолчанию)
        lg: "1.125rem", // 18px
        xl: "1.25rem",  // 20px
        "2xl": "1.5rem",  // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem",  // 36px
        "5xl": "3rem",     // 48px
      }
    },
  },
  plugins: [],
}

