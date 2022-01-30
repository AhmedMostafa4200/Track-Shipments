module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "#B2B3B2",
        green: "#36B600",
        dark: "#2D354F",
        red: "#F40105",
        onhold: "#F9BA02",
        white: "#FFF",
      },
      spacing: {
        "175%": "175%",
        0.5: "0.5px",
      },
      screens: {
        "extra-sm": "400px",
      },
    },
  },
  fontFamily: {
    Cairo: ["Cairo", "sans-serif"],
  },
  plugins: [],
};
