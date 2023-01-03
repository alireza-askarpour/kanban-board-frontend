const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: "#3346F8",
      primaryHover: "#2136F7",
      primaryActive: "#081CDE",
      secondary: "#e60000",
      secondaryHover: "#d60000",
      secondaryActive: "#cc0000"
    },
    extend: {
      fontFamily: {
        sans: ["SegoeUI", "Arial"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
