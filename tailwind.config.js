import colors from "tailwindcss/colors"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: "#2383E2",
      primaryHover: "#0576D5",
      primaryActive: "#0068c3",
      secondary: "#e60000",
      secondaryHover: "#d60000",
      secondaryActive: "#cc0000",
    },
    extend: {
      fontFamily: {
        sans: ["SegoeUI", "Arial"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
