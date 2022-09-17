const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...colors,
      primary: "#3346F8",
      primaryHover: "#2136F7",
      primaryActive: "#081CDE",
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", "Arial", "Helvetica", "sans-serif"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
}
