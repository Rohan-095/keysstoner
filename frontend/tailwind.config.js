/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy:     "#0d1c3f",
        navyMid:  "#18345f",
        navyDeep: "#091428",
        navyCard: "#16284a",
        gold:     "#e6a817",
        goldLight:"#f5c842",
      },
    },
  },
  plugins: [],
};
