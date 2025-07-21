/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        form: "772px",
      },
      colors: {
        "point-blue": "#6991eb",
        "accent-blue": "#5091FF",
        "light-blue": "#F5F9FF",
        "main-text": "#333d4e",
        "secondary-text": "#2F3B43",
        "muted-text": "#5B6266",
        "light-text": "#A1A2AB",
        "dark-navy": "#494c5f",
        "topic-text": "#002C2CB2",
        divider: "#9DA6AD",
        "light-border": "#CED9E1",
        "dark-border": "#546A78",
        "light-gray": "#edeef0",
        "pastel-blue": "#ecf1f6",
        "tag-background": "#758A8A",
        "icon-gray": "#858585",
      },
      backgroundColor: {
        default: "#F3F7FA",
        "light-gray": "#edeef0",
        "pastel-blue": "#ecf1f6",
        "light-blue": "#F5F9FF",
        "tag-background": "#758A8A",
      },
      textColor: {
        "main-text": "#2F3B43",
        "secondary-text": "#333d4e",
        "muted-text": "#5B6266",
        "light-text": "#A1A2AB",
        "dark-navy": "#494c5f",
        "point-blue": "#6991eb",
        "accent-blue": "#5091FF",
        "topic-text": "#002C2CB2",
      },
      borderColor: {
        divider: "#9DA6AD",
        "light-border": "#CED9E1",
        "dark-border": "#546A78",
        "dark-navy": "#494c5f",
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
    },
  },
  plugins: [],
};
