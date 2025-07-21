/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        form: "772px",
      },
      colors: {
        "light-gray": "#edeef0",
        "dark-navy": "#494c5f",
        "pastel-blue": "#ecf1f6",
        "main-text": "#333d4e",
        divider: "#9DA6AD",
        "point-blue": "#6991eb",
      },
      backgroundColor: {
        default: "#F3F7FA",
        "light-gray": "#edeef0",
        "pastel-blue": "#ecf1f6",
      },
      textColor: {
        "dark-navy": "#494c5f",
        "main-text": "#2F3B43",
        "point-blue": "#6991eb",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      borderColor: {
        "dark-navy": "#494c5f",
        divider: "#9DA6AD",
        "point-blue": "#6991eb",
      },
    },
  },
  plugins: [],
};
