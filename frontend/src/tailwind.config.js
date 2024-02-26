/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#01063C",
        "medium-purple": "#C28EFA",
        "bright-blue": "#1033F5",
        "background-gray": "#313030",
        "background-dark-gray": "#181818",
        "bright-purple": "#534891",
      },
    },
  },
  plugins: [],
};
